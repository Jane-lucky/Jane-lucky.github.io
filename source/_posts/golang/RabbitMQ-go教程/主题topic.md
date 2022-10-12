---
title: (五) RabbitMQ go教程——主题（topics）
categories: 
- [golang, RabbitMQ-go教程]
tags:
- RabbitMQ

---



上一个教程中，采用`direct`替换了`fanout`，获得了定向的日志传输和展现，但`direct`也是存在局限的：它不能基于多个条件进行路由。



在日志系统中，我们不仅仅是想获取定义严格的日志内容，而是任何资源发送的日志内容。为了实现这样的日志系统，将采用`topic`类型的转换器。

# Topic exchange

消息通过`topic`不会有随意的routing_key——它必须是一组内容像是来限制`dots`。内容为任意但要区别其他。例如：“stock.usd.nyse”、"nyse.vmw"、“quick.orange.rabbit”,最大为225bytes。



绑定的key也应该是同样的形式，`topic`和`direct`、`fanout`是存在相同的特征的，不同的只是匹配模式不同

![python-five](主题topic/python-five.png)

`topic`通过配置字符串的方式来进行消息队列的传输，

如果接收的字符为`#`，则表示接收所有的信息，与`fanout`相同，如果接收中存在`*`，则与`direct`相同

其中运行代码和第四节相同，仅改变交换类型

- \* (star) can substitute for exactly one word.
- \# (hash) can substitute for zero or more words.

# 运行结果

```shell
go run receive.go "#"
go run receive.go "kern.*"
go run receive.go "*.critical"
go run receive.go "kern.*" "*.critical"
go run send.go "kern.critical" "A critical kernel error"
```

