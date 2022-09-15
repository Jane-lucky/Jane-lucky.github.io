---
title: 互斥锁-sync.Mutex
categories: 
- [golang, Golang包]
tags: sync
---

# 概念

go语言中的一种互斥锁，保证同步的一种工具。

实现协程对互斥资源的访问，其中，`Lock()`用于争夺锁资源，`Unlock()`用于释放锁资源并唤醒等待队列中的协程。在正常的使用情况下（如代码所示），只有进入临界区的协程会执行`Unlock()`。因此，**同一时刻只有一个协程可以执行`Unlock()`方法**。

# 作用

- 避免多个线程在同一个时刻操作同一数据块。
- 协调多个线程，避免在同一时刻执行同一个代码块

# 用法

```go
var mu sync.Mutex
mu.Lock() // 加锁
// 执行业务逻辑
mu.Unlock() // 释放锁
```

# 原理

## 数据结构

```go
//结构体
type Mutex struct {
    //互斥锁
	state int32
	sema  uint32
}
//常量
const (
	mutexLocked = 1 << iota // mutex is locked
	mutexWoken
	mutexStarving
	mutexWaiterShift = iota

	starvationThresholdNs = 1e6
)
```

**状态二进制表示**

| 字段             | 十进制 | 二进制 | 名称     |
| ---------------- | ------ | ------ | -------- |
| mutexLocked      | 1      | 0001   | 加锁     |
| mutexUnLocked    | 0      | 0000   | 未加锁   |
| mutexWoken       | 2      | 0010   | 唤醒     |
| mutexStarving    | 4      | 0100   | 饥饿     |
| mutexWaiterShift | 3      | 0011   | 代表位移 |



## 接口

```
type Locker interface {
	Lock()
	Unlock()
}
```

### Lock

1. 单协程获取锁，通过CAS把state状态从0设置成1，加锁成功后返回

```go
func (m *Mutex) Lock() {
	// Fast path: grab unlocked mutex.
    //CSA判断锁的状态，如果执行CAS把互斥锁状态从0设置成1，则加锁成功，返回
	if atomic.CompareAndSwapInt32(&m.state, 0, mutexLocked) {
        //race检测
		if race.Enabled {
			race.Acquire(unsafe.Pointer(m))
		}
		return
	}
	// 存在多个线程，设置失败之后，表示存在冲突，执行该方式
	m.lockSlow()
}
```

### lockSlow

```go
func (m *Mutex) lockSlow() {
	var waitStartTime int64
    //饥饿状态
	starving := false
    //唤醒状态
	awoke := false
    //循环次数
	iter := 0
    //当前锁的状态
	old := m.state
    //循环
	for {
		// Don't spin in starvation mode, ownership is handed off to waiters
		// so we won't be able to acquire the mutex anyway.
        //不要在饥饿模式下旋转，所有权将移交给服务员，所以我门不再获得锁
        //判断old&(0001|0100)==0001——》old&0101是否等于0001，则old只能为0001（加锁）等，不可能是被唤醒或者饥饿状态
		if old&(mutexLocked|mutexStarving) == mutexLocked && runtime_canSpin(iter) {
			// Active spinning makes sense.
			// Try to set mutexWoken flag to inform Unlock
			// to not wake other blocked goroutines.
            //将自己的状态以及锁的状态设置为唤醒，这样当Unlock的时候就不会去唤醒其它被阻塞的goroutine了
			if !awoke && old&mutexWoken == 0 && old>>mutexWaiterShift != 0 &&
				atomic.CompareAndSwapInt32(&m.state, old, old|mutexWoken) {
				awoke = true
			}
            //自主旋转
			runtime_doSpin()
			iter++
            //更新锁的状态
			old = m.state
			continue
		}
        
          // 到了这一步， state的状态可能是：
          // 1. 锁还没有被释放，锁处于正常状态
          // 2. 锁还没有被释放， 锁处于饥饿状态
          // 3. 锁已经被释放， 锁处于正常状态
          // 4. 锁已经被释放， 锁处于饥饿状态
          //
		new := old
		// Don't try to acquire starving mutex, new arriving goroutines must queue.
        //获取不是饥饿锁状态，新到达的协程在队列中
        //old&0100==0000
		if old&mutexStarving == 0 {
			new |= mutexLocked
		}
		if old&(mutexLocked|mutexStarving) != 0 {
			new += 1 << mutexWaiterShift
		}
		// The current goroutine switches mutex to starvation mode.
		// But if the mutex is currently unlocked, don't do the switch.
		// Unlock expects that starving mutex has waiters, which will not
		// be true in this case.
		if starving && old&mutexLocked != 0 {
			new |= mutexStarving
		}
		if awoke {
			// The goroutine has been woken from sleep,
			// so we need to reset the flag in either case.
			if new&mutexWoken == 0 {
				throw("sync: inconsistent mutex state")
			}
			new &^= mutexWoken
		}
		if atomic.CompareAndSwapInt32(&m.state, old, new) {
			if old&(mutexLocked|mutexStarving) == 0 {
				break // locked the mutex with CAS
			}
			// If we were already waiting before, queue at the front of the queue.
			queueLifo := waitStartTime != 0
			if waitStartTime == 0 {
				waitStartTime = runtime_nanotime()
			}
			runtime_SemacquireMutex(&m.sema, queueLifo, 1)
			starving = starving || runtime_nanotime()-waitStartTime > starvationThresholdNs
			old = m.state
			if old&mutexStarving != 0 {
				// If this goroutine was woken and mutex is in starvation mode,
				// ownership was handed off to us but mutex is in somewhat
				// inconsistent state: mutexLocked is not set and we are still
				// accounted as waiter. Fix that.
				if old&(mutexLocked|mutexWoken) != 0 || old>>mutexWaiterShift == 0 {
					throw("sync: inconsistent mutex state")
				}
				delta := int32(mutexLocked - 1<<mutexWaiterShift)
				if !starving || old>>mutexWaiterShift == 1 {
					// Exit starvation mode.
					// Critical to do it here and consider wait time.
					// Starvation mode is so inefficient, that two goroutines
					// can go lock-step infinitely once they switch mutex
					// to starvation mode.
					delta -= mutexStarving
				}
				atomic.AddInt32(&m.state, delta)
				break
			}
			awoke = true
			iter = 0
		} else {
			old = m.state
		}
	}

	if race.Enabled {
		race.Acquire(unsafe.Pointer(m))
	}
}

// Unlock unlocks m.
// It is a run-time error if m is not locked on entry to Unlock.
//
// A locked Mutex is not associated with a particular goroutine.
// It is allowed for one goroutine to lock a Mutex and then
// arrange for another goroutine to unlock it.
func (m *Mutex) Unlock() {
	if race.Enabled {
		_ = m.state
		race.Release(unsafe.Pointer(m))
	}

	// Fast path: drop lock bit.
	new := atomic.AddInt32(&m.state, -mutexLocked)
	if new != 0 {
		// Outlined slow path to allow inlining the fast path.
		// To hide unlockSlow during tracing we skip one extra frame when tracing GoUnblock.
		m.unlockSlow(new)
	}
}


```



### Unlock

```go
func (m *Mutex) Unlock() {
	if race.Enabled {
		_ = m.state
		race.Release(unsafe.Pointer(m))
	}

	// Fast path: drop lock bit.
	new := atomic.AddInt32(&m.state, -mutexLocked)
	if new != 0 {
		// Outlined slow path to allow inlining the fast path.
		// To hide unlockSlow during tracing we skip one extra frame when tracing GoUnblock.
		m.unlockSlow(new)
	}
}

func (m *Mutex) unlockSlow(new int32) {
	if (new+mutexLocked)&mutexLocked == 0 {
		throw("sync: unlock of unlocked mutex")
	}
	if new&mutexStarving == 0 {
		old := new
		for {
			
			if old>>mutexWaiterShift == 0 || old&(mutexLocked|mutexWoken|mutexStarving) != 0 {
				return
			}
			// Grab the right to wake someone.
			new = (old - 1<<mutexWaiterShift) | mutexWoken
			if atomic.CompareAndSwapInt32(&m.state, old, new) {
				runtime_Semrelease(&m.sema, false, 1)
				return
			}
			old = m.state
		}
	} else {
		runtime_Semrelease(&m.sema, true, 1)
	}
}

```

### unlockSlow

```go
func (m *Mutex) unlockSlow(new int32) {
	if (new+mutexLocked)&mutexLocked == 0 {
		throw("sync: unlock of unlocked mutex")
	}
	if new&mutexStarving == 0 {
		old := new
		for {
			// If there are no waiters or a goroutine has already
			// been woken or grabbed the lock, no need to wake anyone.
			// In starvation mode ownership is directly handed off from unlocking
			// goroutine to the next waiter. We are not part of this chain,
			// since we did not observe mutexStarving when we unlocked the mutex above.
			// So get off the way.
			if old>>mutexWaiterShift == 0 || old&(mutexLocked|mutexWoken|mutexStarving) != 0 {
				return
			}
			// Grab the right to wake someone.
			new = (old - 1<<mutexWaiterShift) | mutexWoken
			if atomic.CompareAndSwapInt32(&m.state, old, new) {
				runtime_Semrelease(&m.sema, false, 1)
				return
			}
			old = m.state
		}
	} else {
		// Starving mode: handoff mutex ownership to the next waiter, and yield
		// our time slice so that the next waiter can start to run immediately.
		// Note: mutexLocked is not set, the waiter will set it after wakeup.
		// But mutex is still considered locked if mutexStarving is set,
		// so new coming goroutines won't acquire it.
		runtime_Semrelease(&m.sema, true, 1)
	}
}
```



### TryLock

```go
func (m *Mutex) TryLock() bool {
	old := m.state
	if old&(mutexLocked|mutexStarving) != 0 {
		return false
	}

	// There may be a goroutine waiting for the mutex, but we are
	// running now and can try to grab the mutex before that
	// goroutine wakes up.
	if !atomic.CompareAndSwapInt32(&m.state, old, old|mutexLocked) {
		return false
	}

	if race.Enabled {
		race.Acquire(unsafe.Pointer(m))
	}
	return true
}
```



# 参考链接

[[Go并发] - Mutex源码解析  ](https://juejin.cn/post/6958979192574705701)          
