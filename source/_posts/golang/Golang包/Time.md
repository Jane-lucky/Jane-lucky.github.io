---
title: time包方法详解
categories: 
- [golang, Golang包]
---

# time.Now

获取当前时间.

# time.Until

保存时间值t，用于评估直到时间t的持续时间

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	//获取当前时间
	t := time.Now()
	fmt.Println("Duration until t:", time.Until(t)) //Duration until t: -112ns
}

```

# time.AfterFunc

用于等待经过的时间，也就是在经历时间之后执行方法。

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	waitchan := make(chan int)
	time.AfterFunc(time.Second*5, func() {
		fmt.Println("AfterFunc excuted")
		waitchan <- 1
	})
	<-waitchan
}
```



