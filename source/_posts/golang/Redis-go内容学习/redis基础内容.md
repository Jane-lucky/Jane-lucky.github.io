---
title: (一) redis
categories: 
- [golang, redis]
tags:
- redis
---

redis key是进制安全的，这也就是说可以使用任意的二进制队列作为键值。

- 键值不建议过长，例如1024字节的键值就是不可取的，不仅是因为内存，也是因为在取值对比键值的时候的消耗。
- 键值太短也不太建议。

# 数据类型

## 字符类型——strings

字符作为最常见的类型，它也是极其有用的，例如抓取页面或者html框架内容等。

采用`SET`、`GET`命令来设置键值内容，值的最大不得超过与512MB。

```shell
127.0.0.1:6379> set name zhangsan
OK
127.0.0.1:6379> get name
"zhangsan"
127.0.0.1:6379>
```

incr可以将字符串值转换为interge，并逐步递增。

`MSET`、`MGET`可以设置多组和获取多组的键值内容。

```shell
127.0.0.1:6379> mset a 10 b 20 c 30
OK
127.0.0.1:6379> mget a b c
1) "10"
2) "20"
3) "30"
127.0.0.1:6379> incr a
(integer) 11
127.0.0.1:6379> mget a b c
1) "11"
2) "20"
3) "30"

```

## 判断字符是否存在或是否插入成功

```shell
127.0.0.1:6379> set mykey hello
OK
#查看键值类型
127.0.0.1:6379> type mykey
string
#判断键是否成功，存在返回1，不存在返回0
127.0.0.1:6379> EXISTS mykey
(integer) 1
127.0.0.1:6379> del mykey
(integer) 1
127.0.0.1:6379> EXISTS mykey
(integer) 0


```

## 设置过期时间

```shell
127.0.0.1:6379> set key somvalue
OK
#设置过期时间为5秒
127.0.0.1:6379> EXPIRE key 5
(integer) 1
127.0.0.1:6379> get key
"somvalue"
127.0.0.1:6379> get key
(nil)
#查看具体过期的时间倒计时时间
127.0.0.1:6379> ttl key
(integer) -2
```

