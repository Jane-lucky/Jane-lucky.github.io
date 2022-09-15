---
title: 上传文件&&Template
categories: 
- [golang, gin框架]
---

## HTML模板

```go
	r.LoadHTMLGlob("templates/*")
	stu1 := &Student{Name: "Geektutu", Age: 20}
	stu2 := &Student{Name: "Jack", Age: 22}
	r.GET("/arr", func(c *gin.Context) {
		c.HTML(http.StatusOK, "arr.tmpl", gin.H{
			"title":  "World",
			"stuArr": [2]*Student{stu1, stu2},
		})
	})
```

```
<!-- templates/arr.tmpl -->
<html>
<body>
    <p>hello, {{.title}}</p>
    {{range $index, $ele := .stuArr }}
    <p>{{ $index }}: {{ $ele.Name }} is {{ $ele.Age }} years old</p>
    {{ end }}
</body>
</html>
```

结果：

```shell
ubuntu@root:~/Pictures$ curl http://localhost:8080/arr

<html>
<body>
    <p>hello, World</p>
    
    <p>0: Geektutu is 20 years old</p>
    
    <p>1: Jack is 22 years old</p>
    
</body>

```



## 文件上传

### 单文件上传

```go
	r.POST("/upload", func(c *gin.Context) {
		file, err := c.FormFile("upload")
		if err != nil {
			c.String(http.StatusBadRequest, "请求失败")
		}

		filename := file.Filename
		fmt.Println("文件名:", filename)

		//保存到本地服务器
		if err := c.SaveUploadedFile(file, filename); err != nil {
			c.String(http.StatusBadRequest, "保存失败 Error:%s", err.Error())
		}
		c.String(http.StatusOK, "上传成功")
	})
```

测试： 

curl -X POST http://localhost:8080/upload -F "upload=@文件目录地址" -H "Content-Type: multipart/form-data"
上传成功

### 多文件上传

```go
	r.POST("/uploads", func(c *gin.Context) {
		form, err := c.MultipartForm()
		if err != nil {
			c.String(http.StatusBadRequest, "请求失败")
		}
		files := form.File["uploads[]"]

		for _, file := range files {
			fmt.Println("文件名：", file)
			if err := c.SaveUploadedFile(file, file.Filename); err != nil {
				c.String(http.StatusBadRequest, "保存失败 Error:%s", err.Error())
			}
		}
		c.String(http.StatusOK, "上传成功")

	})
```

测试：

```shell
ubuntu@root:~/Pictures$ curl -X POST http://localhost:8080/uploads -F "upload[]=@/home/ubuntu/Pictures/Screenshot from 2022-08-25 10-26-07.png"  -F "upload[]=@/home/ubuntu/Pictures/Screenshot from 2022-08-25 10-26-38.png" -H "Content-Type: multipart/form-data"
上传成功
```

