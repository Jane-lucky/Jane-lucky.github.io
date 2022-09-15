---
title: http详解
---

# web工作

```go
package main

import (
	"fmt"
	"net/http"
	"strings"
)

func SayHello(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()       //解析参数
	fmt.Println(r.Form) //输出到服务器端的
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])

	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, " "))
	}

	fmt.Fprintln(w, "hello World")
}

func main() {
	http.HandleFunc("/", SayHello)
	http.ListenAndServe(":8080", nil)
}
```

## 概念

- request:用户请求信息，用来解析用户的请求信息。
- response:服务器需要反馈给客户端的信息。
- conn:请求链接
- handler:处理请求和生成返回信息的处理逻辑

## 执行流程

1. 建立监听，等待客户端的请求。

   `http.ListenAndServe(":8080", nil)`

   监听过程中会创建Server对象，之后调用`server.ListenAndServe()`方法，底层用tcp搭建了一个服务，最后调用`srv.Serve(ln)`监听端口

   ```go
   func (srv *Server) ListenAndServe() error {
   	if srv.shuttingDown() {
   		return ErrServerClosed
   	}
   	addr := srv.Addr
   	if addr == "" {
   		addr = ":http"
   	}
   	ln, err := net.Listen("tcp", addr)
   	if err != nil {
   		return err
   	}
   	return srv.Serve(ln)
   
   ```

2. Listen Socket 接受客户端的请求，进行通信。

   首先通过Listener接收请求：`l.Accept()`，其次创建一个Conn：`c := srv.newConn(rw)`，最后单独开了一个goroutine，把这个请求的数据当做参数扔给这个conn去服务：`go c.serve(connCtx)`。这个就是高并发体现了，用户的每一次请求都是在一个新的goroutine去服务，相互不影响。

3. 处理客户端请求，handler处理。

   conn首先会解析request:`w, err := c.readRequest(ctx)`, 然后获取相应的handler去处理请求:`serverHandler{c.server}.ServeHTTP(w, w.req)`，`ServeHTTP`的具体实现如下：

   ```go
   func (sh serverHandler) ServeHTTP(rw ResponseWriter, req *Request) {
   	handler := sh.srv.Handler
   	if handler == nil {
   		handler = DefaultServeMux
   	}
   	if req.RequestURI == "*" && req.Method == "OPTIONS" {
   		handler = globalOptionsHandler{}
   	}
   	handler.ServeHTTP(rw, req)
   }
   ```

   `sh.srv.Handler`就是我们刚才在调用函数`ListenAndServe`时候的第二个参数，我们前面例子传递的是nil，也就是为空，那么默认获取`handler = DefaultServeMux`,这个变量就是一个路由器，它用来匹配url跳转到其相应的handle函数，我们调用的代码里面第一句不是调用了`http.HandleFunc("/", sayhelloName)`。这个作用就是注册了请求/的路由规则，当请求uri为"/"，路由就会转到函数sayhelloName，DefaultServeMux会调用ServeHTTP方法，这个方法内部其实就是调用sayhelloName本身，最后通过写入response的信息反馈到客户端。