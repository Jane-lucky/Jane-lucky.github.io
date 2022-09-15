---
title: sync.Once 源码
categories: 
- [golang, Golang包]
tags: sync
---

# 概念

Go 标准库提供的使函数只执行一次的实现，常应用于单例模式。

# 原理

保证变量仅被初始化一次，线程安全，支持并发。

# 源码

因为源码很少，所以就直接全部复制上来了。

```go

package sync

import (
	"sync/atomic"
)

type Once struct {
    //标记是否完成初始化
	done uint32
    //互斥锁
	m    Mutex
}
// f 是对象初始化函数
func (o *Once) Do(f func()) {
	if atomic.LoadUint32(&o.done) == 0 {
		// Outlined slow-path to allow inlining of the fast-path.
		o.doSlow(f)
	}
}

func (o *Once) doSlow(f func()) {
	o.m.Lock()
	defer o.m.Unlock()
	if o.done == 0 {
		defer atomic.StoreUint32(&o.done, 1)
		f()
	}
}

```

