---
title: 第一个gin程序
categories: 
- [golang, gin框架]
---

## 路由

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.String(200, "Hello")
	})
	r.GET("/name", func(c *gin.Context) {
		c.String(http.StatusOK, "world")
	})
	
	r.Run() // listen and serve on 0.0.0.0:8080
}

```

1. 首先，我们使用了`gin.Default()`生成了一个实例，这个实例即 WSGI 应用程序。
2. 接下来，我们使用`r.Get("/", ...)`声明了一个路由，告诉 Gin 什么样的URL 能触发传入的函数，这个函数返回我们想要显示在用户浏览器中的信息。
3. 最后用 `r.Run()`函数来让应用运行在本地服务器上，默认监听端口是 _8080_，可以传入参数设置端口，例如`r.Run(":9999")`即运行在 _9999_端口。

### 解析路经参数

```go
	r.GET("/user/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, "Hello %s", name)
	})
```

### 解析qurey参数

```go
	r.POST("/form", func(c *gin.Context) {
		username := c.PostForm("username")
		//可设置默认的初始值
		password := c.DefaultPostForm("password", "000000")

		c.JSON(http.StatusOK, gin.H{
			"username": username,
			"password": password,
		})
	})
```

### 解析qurey&路经参数

```go
	r.POST("/posts", func(c *gin.Context) {
		id := c.Query("id")
		page := c.DefaultQuery("page", "0")
		username := c.PostForm("username")
		//可设置默认的初始值
		password := c.DefaultPostForm("password", "000000")

		c.JSON(http.StatusOK, gin.H{
			"id":       id,
			"page":     page,
			"username": username,
			"password": password,
		})
	})
```

curl "http://localhost:8080/posts?id=1&page=13"  -X POST -d 'username=geektutu&password=1234'
{"id":"1","page":"13","password":"1234","username":"geektutu"}

### map参数

```go
	r.POST("/post", func(c *gin.Context) {
		ids := c.QueryMap("ids")
		names := c.PostFormMap("names")

		c.JSON(http.StatusOK, gin.H{
			"ids":   ids,
			"names": names,
		})
	})
```

curl -g "http://localhost:9999/post?ids[Jack]=001&ids[Tom]=002" -X POST -d 'names[a]=Sam&names[b]=David'
{"ids":{"Jack":"001","Tom":"002"},"names":{"a":"Sam","b":"David"}}

### 重定向

```go
	r.GET("/redirect", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/index")
	})
	r.GET("/index", func(c *gin.Context) {
		c.Request.URL.Path = "/"
		r.HandleContext(c)
	})
	/**
	ubuntu@root:~/go$ curl http://localhost:8080/index
	Helloubuntu@root:~/go$ -i http://localhost:8080/redirect
	HTTP/1.1 301 Moved Permanently
	Content-Type: text/html; charset=utf-8
	Location: /index
	Date: Mon, 29 Aug 2022 09:08:43 GMT
Menu
New
Open
Saved
Save As
Export
Print
Themes
Preferences
About
Close

	Content-Length: 41

	<a href="/index">Moved Permanently</a>.

	*/
```

### 多组路由

利用分组路由可以更好地实现权限控制（将需要登陆鉴权的路由防盗同一组中去，简化权限控制）

划分一个模块一个路由，便于管理和查找相关的代码

```go
defaultHandler := func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"path": c.FullPath(),
		})
	}
	//https://geektutu.com/post/quick-go-gin.html
	//group v1
	v1 := r.Group("/v1")
	{
		v1.GET("/posts", defaultHandler)
		v1.GET("/series", defaultHandler)
	}

	//group v2
	v2 := r.Group("/v2")
	{
		v2.GET("/posts", defaultHandler)
		v2.GET("/series", defaultHandler)
	}
	
//ubuntu@root:~$ curl http://localhost:8080/v1/posts
//{"path":"/v1/posts"}
```



