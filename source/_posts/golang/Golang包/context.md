---
title: context源码学习
categories: 
- [golang, Golang包]
---

go:1.18.5

# context包架构布局

| 类型            | 名称   | 作用                                                         |
| --------------- | ------ | ------------------------------------------------------------ |
| Context         | 接口   | 定义了 Context 接口的四个方法                                |
| emptyCtx        | 结构体 | 实现了 Context 接口，它其实是个空的 context                  |
| CancelFunc      | 函数   | 取消函数                                                     |
| canceler        | 接口   | context 取消接口，定义了两个方法                             |
| cancelCtx       | 结构体 | 可以被取消                                                   |
| timerCtx        | 结构体 | 超时会被取消                                                 |
| valueCtx        | 结构体 | 可以存储 k-v 对                                              |
| Background      | 函数   | 返回一个空的 context，常作为根 context                       |
| TODO            | 函数   | 返回一个空的 context，常用于重构时期，没有合适的 context 可用 |
| WithCancel      | 函数   | 基于父 context，生成一个可以取消的 context                   |
| newCancelCtx    | 函数   | 创建一个可取消的 context                                     |
| propagateCancel | 函数   | 向下传递 context 节点间的取消关系                            |
| parentCancelCtx | 函数   | 找到第一个可取消的父节点                                     |
| removeChild     | 函数   | 去掉父节点的孩子节点                                         |
| init            | 函数   | 包初始化                                                     |
| WithDeadline    | 函数   | 创建一个有 deadline 的 context                               |
| WithTimeout     | 函数   | 创建一个有 timeout 的 context                                |
| WithValue       | 函数   | 创建一个存储 k-v 对的 context                                |

# 源码

## 接口

### **context**

定义4个方法，都是幂等，也就是多次执行返回的结果一致。

```go
type Context interface {
	// 返回context是否会被取消以及自动取消的时间
	Deadline() (deadline time.Time, ok bool)

	//context被取消或deadline的时候，返回一个关闭的chan
	Done() <-chan struct{}

	//Done之后，返回context的原因
	Err() error

	//获取key对应的alue
	Value(key any) any
}

```

### **canceler**

说明context是可以取消的。

- “取消”操作应该是建议性，而非强制性

caller 不应该去关心、干涉 callee 的情况，决定如何以及何时 return 是 callee 的责任。caller 只需发送“取消”信息，callee 根据收到的信息来做进一步的决策，因此接口并没有定义 cancel 方法。

- “取消”操作应该可传递

“取消”某个函数时，和它相关联的其他函数也应该“取消”。因此，`Done()` 方法返回一个只读的 channel，所有相关函数监听此 channel。一旦 channel 关闭，通过 channel 的“广播机制”，所有监听者都能收到。

```go
type canceler interface {
	cancel(removeFromParent bool, err error)
	Done() <-chan struct{}
}
```

## 结构体

### emptyCtx

它被包装成：

```go
var (
    //BackGround返回一个非空的context，且绝不会被取消，没有值和取消时间。通常用在main函数、初始化和测试中或者作为输入请求的高context
// Background returns a non-nil, empty Context. It is never canceled, has no
// values, and has no deadline. It is typically used by the main function,
// initialization, and tests, and as the top-level Context for incoming
// requests.
	background = new(emptyCtx)
    //TODO返回一个非空的context，代码可以使用context。当不清楚采用那种context或者不确定是都有用可以采用TODO，
// TODO returns a non-nil, empty Context. Code should use context.TODO when
// it's unclear which Context to use or it is not yet available (because the
// surrounding function has not yet been extended to accept a Context
// parameter).
	todo       = new(emptyCtx)
)
```

background通常用在main函数中，作为context的根节点。

### cancelCtx

可取消的context，他可以确保父被取消的时候，其余的子context也会被取消。

```go
//
type cancelCtx struct {
	Context

	mu       sync.Mutex            // protects following fields
	done     atomic.Value          // of chan struct{}, created lazily, closed by first cancel call
	children map[canceler]struct{} // set to nil by the first cancel call
	err      error                 // set to non-nil by the first cancel call
}
```

其中，value、Done、String、Err等均实现了canceler方法。

`Done`方法的实现

```go
func (c *cancelCtx) Done() <-chan struct{} {
	d := c.done.Load()
	if d != nil {
		return d.(chan struct{})
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	d = c.done.Load()
	if d == nil {
		d = make(chan struct{})
		c.done.Store(d)
	}
	return d.(chan struct{})
}
```

函数返回的是一个只读的 channel，而且没有地方向这个 channel 里面写数据。所以，直接调用读这个 channel，协程会被 block 住。一般通过搭配 select 来使用。一旦关闭，就会立即读出零值。

`value`方法实现:返回取消的key值

```go
func (c *cancelCtx) Value(key any) any {
	if key == &cancelCtxKey {
		return c
	}
	return value(c.Context, key)
}
```

`cancel`方法实现

关闭所有的channel。

```go
func (c *cancelCtx) cancel(removeFromParent bool, err error) {
    //传入err
	if err == nil {
		panic("context: internal error: missing cancel error")
	}
	c.mu.Lock()
    //判断是否已经取消，因为Done之后会返回取消原因，因此采用err的的方法判断是否取消
	if c.err != nil {
		c.mu.Unlock()
		return // already canceled
	}
	c.err = err
	d, _ := c.done.Load().(chan struct{})
    //关闭channel，通知其他协程
	if d == nil {
		c.done.Store(closedchan)
	} else {
		close(d)
	}
    //遍历循环子context关闭
	for child := range c.children {
		// NOTE: acquiring the child's lock while holding parent's lock.
		child.cancel(false, err)
	}
    //子结点置空
	c.children = nil
	c.mu.Unlock()

    //如果为True，将自己从父节点删除
	if removeFromParent {
		removeChild(c.Context, c)
	}
}
```

**创建可取消的cancel方法**

```go
func WithCancel(parent Context) (ctx Context, cancel CancelFunc) {
	if parent == nil {
		panic("cannot create context from nil parent")
	}
	c := newCancelCtx(parent)
    //向上遍历可删除的父节点以及他的子结点进行删除
    //
	propagateCancel(parent, &c)
    //返回context和func，其中c.cancel(true, Canceled)已经默认需要将自己从父节点中删除。
	return &c, func() { c.cancel(true, Canceled) }
}

// newCancelCtx returns an initialized cancelCtx.
func newCancelCtx(parent Context) cancelCtx {
	return cancelCtx{Context: parent}
}
```

**在调用方法的时候，默认调用的cancel方法中传入的true，而在在执行该方法的内部循环取消子结点的时候child调用的cancel传入的是false**

1. 可取消的cancel的方法中传入的为true,将child进行删除

   `removeChild`方法

   ```go
   func removeChild(parent Context, child canceler) {
   //判断是否有可取消的父节点
   	p, ok := parentCancelCtx(parent)
   	//不存在，说明父节点已经取消
   	if !ok {
   		return
   	}
   	p.mu.Lock()
   	//判断child节点是否存在，存在delete
   	if p.children != nil {
   		delete(p.children, child)
   	}
   	p.mu.Unlock()
   }
   ```

   `parentCancelCtx`方法，查看父节点如何递归遍历删除

   ```go
   func parentCancelCtx(parent Context) (*cancelCtx, bool) {
       //done为一个结构体管道
   	done := parent.Done()
   	if done == closedchan || done == nil {
   		return nil, false
   	}
       //通过value值查找到匹配的parent.Done()
   	p, ok := parent.Value(&cancelCtxKey).(*cancelCtx)
   	if !ok {
   		return nil, false
   	}
       //如果没有，*cancelCtx已被包装在一个自定义实现中，提供了一个不同的完成通道，在这种情况下，我们不应该绕过它
   	pdone, _ := p.done.Load().(chan struct{})
   	if pdone != done {
   		return nil, false
   	}
   	return p, true
   }
   ```

   

例子：

mcCtx，childCtx 和正常的 parentContext不一样，因为它是一个自定义的结构体类型。

```go
package main

import (
	"context"
	"fmt"
	"time"
)

type Mycontext struct {
	context.Context
}

func main() {
	childCancel := true
	parentContext, parentFunc := context.WithCancel(context.Background())
	mcCtx := Mycontext{parentContext}

	childCtx, childFunc := context.WithCancel(mcCtx)

	if childCancel {
		childFunc()
	} else {
		parentFunc()
	}

	fmt.Println(parentContext) //context.Background.WithCancel
	fmt.Println(mcCtx) //{context.Background.WithCancel}
	fmt.Println(childCtx) //main.Mycontext.WithCancel

	time.Sleep(10 * time.Second)

}
```

### timerCtx

```go
type timerCtx struct {
    //基于cancelCtx
	cancelCtx
	timer *time.Timer // Under cancelCtx.mu.
    //设置Deadline的时间
	deadline time.Time
}
```

实现

```go
func (c *timerCtx) Deadline() (deadline time.Time, ok bool) {
	return c.deadline, true
}

func (c *timerCtx) String() string {
	return contextName(c.cancelCtx.Context) + ".WithDeadline(" +
		c.deadline.String() + " [" +
		time.Until(c.deadline).String() + "])"
}
//可取消的timeOut
func (c *timerCtx) cancel(removeFromParent bool, err error) {
    //调用cancelCtx的cancel方法
	c.cancelCtx.cancel(false, err)
	if removeFromParent {
		// Remove this timerCtx from its parent cancelCtx's children.
        //移除子节点
		removeChild(c.cancelCtx.Context, c)
	}
	c.mu.Lock()
    //判断c的时间，关掉定时器，不会再次取消
	if c.timer != nil {
		c.timer.Stop()
		c.timer = nil
	}
	c.mu.Unlock()
}
```

创建可取消的time context

```
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc) {
	return WithDeadline(parent, time.Now().Add(timeout))
}
```

直接调用`WithDeadline`,添加超时时间。

```go
func WithDeadline(parent Context, d time.Time) (Context, CancelFunc) {
    //判断父节点是否为空
	if parent == nil {
		panic("cannot create context from nil parent")
	}
    //获取当前parent的时间和结果。如果父节点超时，会自动调用cancel函数。
	if cur, ok := parent.Deadline(); ok && cur.Before(d) {
		// The current deadline is already sooner than the new one.
		return WithCancel(parent)
	}
	c := &timerCtx{
		cancelCtx: newCancelCtx(parent),
		deadline:  d,
	}
    //挂靠父节点
	propagateCancel(parent, c)
    //获取距离到达dealine的时间
	dur := time.Until(d)
    //超时
	if dur <= 0 {
        //取消并返回
		c.cancel(true, DeadlineExceeded) // deadline has already passed
        
		return c, func() { c.cancel(false, Canceled) }
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.err == nil {
        //在到达超时的时间的时候，执行取消命令
		c.timer = time.AfterFunc(dur, func() {
			c.cancel(true, DeadlineExceeded)
		})
	}
    //是 true，也就是说取消的时候，需要将自己从父节点里删除。第二个参数则是一个固定的取消错误类型
    //返回的 cancelFunc 函数会传入 true。这样做的结果是：当调用返回的 cancelFunc 时，会将这个 context 从它的父节点里“除名”，因为父节点可能有很多子节点，你自己取消了，所以我要和你断绝关系，对其他人没影响。
	return c, func() { c.cancel(true, Canceled) }
}
```

### valueCtx

```go
type valueCtx struct {
	Context
	key, val any
}
```



## propagateCancel

父节点时取消子节点

```go
// propagateCancel arranges for child to be canceled when parent is.
func propagateCancel(parent Context, child canceler) {
    //父节点是空节点
	done := parent.Done()
	if done == nil {
		return // parent is never canceled
	}

	select {
	case <-done:
		// parent is already canceled
		child.cancel(false, parent.Err())
		return
	default:
	}

    //判断父节点是否可取消
	if p, ok := parentCancelCtx(parent); ok {
		p.mu.Lock()
        // 父节点已经被取消了，本节点（子节点）也要取消
		if p.err != nil {
			// parent has already been canceled
			child.cancel(false, p.err)
		} else {
			if p.children == nil {
				p.children = make(map[canceler]struct{})
			}	
            //挂到父节点
			p.children[child] = struct{}{}
		}
		p.mu.Unlock()
	} else {
        //没有找到可取消的父节点
		atomic.AddInt32(&goroutines, +1)
        //重新启动一个新协程，监控父节点和子节点
		go func() {
			select {
			case <-parent.Done():
				child.cancel(false, parent.Err())
			case <-child.Done():
			}
		}()
	}
}
```

# 使用

## 传递共享数据

通常使用WithValue()的方法共享数据

```go
package main

import (
	"context"
	"fmt"
)

func main() {
	ctx := context.Background()
	process(ctx) //process over. no trace_id

	ctx = context.WithValue(ctx, "traceId", "qwe-2011")
	process(ctx)//process over,trace_id=qwe-2011

}

func process(ctx context.Context) {
	traceID, ok := ctx.Value("traceId").(string)
	if ok {
		fmt.Printf("process over,trace_id=%s\n", traceID)
	} else {
		fmt.Printf("process over. no trace_id\n")
	}
}

```



## 取消goroutine&防止goroutine泄露

1. 取消goroutine

   ```go
   package main
   
   import (
   	"context"
   	"fmt"
   	"time"
   )
   
   func work1(ctx context.Context) {
   LABEL:
   	for {
   
   		select {
   		case <-ctx.Done():
   			break LABEL
   		default:
   			fmt.Println("...work1...")
   			time.Sleep(time.Second)
   		}
   	}
   }
   func work2(ctx context.Context) {
   LABEL:
   	for {
   
   		select {
   		case <-ctx.Done():
   			break LABEL
   		default:
   			fmt.Println("...work2...")
   			time.Sleep(time.Second)
   		}
   	}
   }
   func main() {
   	ctx, cancel := context.WithCancel(context.Background())
   	go work1(ctx)
   	go work2(ctx)
   
   	time.Sleep(time.Second * 5)
   	cancel()
   	fmt.Println("...cancel...")
   	go work2(ctx)
   	fmt.Println("...over...")
   
   }
   ```

   结果：

   ```shell
   ubuntu@root:~/go/src/gotest$ go run main.go 
   ...work2...
   ...work1...
   ...work1...
   ...work2...
   ...work2...
   ...work1...
   ...work1...
   ...work2...
   ...work2...
   ...work1...
   ...cancel...
   ...over...
   ```

2. 防止goroutine泄露

   

# 参考连接

[深度解密Go语言之context](https://www.cnblogs.com/qcrao-2018/p/11007503.html)
