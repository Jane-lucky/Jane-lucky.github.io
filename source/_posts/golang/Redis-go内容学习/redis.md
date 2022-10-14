---
title: (一) redis go学习——基础操作
categories: 
- [golang, redis-go学习]
tags:
- redis
---



# 概念

### 优点

- 性能高
- 数据类型丰富
- 原子
- 丰富的特性



# 连接

```go
package main

import (
	"fmt"

	"github.com/go-redis/redis"
)

func main() {
	fmt.Println("Testing Golang Redis")

	client := redis.NewClient(&redis.Options{
		Addr:     "172.17.0.4:6379",
		Password: "",
		DB:       0,
	})

	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

}

```

# 键值操作

## GET&SET

```go
	err = client.Set("name", "zhang", 0).Err()
	if err != nil {
		panic(err)
	}
	var val string
	val, err = client.Get("name").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("name的值为:", val)
```

