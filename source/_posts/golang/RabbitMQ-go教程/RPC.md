---
title: (六) RabbitMQ go教程——远程过程调用（RPC）
categories: 
- [golang, RabbitMQ-go教程]
tags:
- RabbitMQ
---

在之前的学习中，有学习如何使用工作队列在多个 工人中使用时间消耗任务。

但如果我们需要在远程电脑上运行一个函数同时等待结果，这就是另外一种方式，通常成为该方式为远程过程调用。

使用RabbitMQ构建RPC系统：一个客户端和一个可伸缩（scalable）的RPC服务端,由于我们没有任何值得分发的耗时任务，我们将创建一个返回斐波那契数列的虚拟的RPC服务

*尽管RPC在电脑中是一个十分常见的模型，但它十分重要。当程序员不知道函数调用是本地函数调用还是慢速 RPC 时，就会出现问题。像这样的混乱会导致不可预测的系统，并增加调试不必要的复杂性。滥用RPC可能会导致无法维护的意大利面条式代码而不是简化软件*

# 回调队列

在rabbitMQ上使用RPC是很简单的，客户端传递一个请求消息，服务端回复一个响应消息。为了可以接收到响应我们需要在请求中携带一个回调队列。

```go
q, err := ch.QueueDeclare(
  "",    // name
  false, // durable
  false, // delete when unused
  true,  // exclusive
  false, // noWait
  nil,   // arguments
)

ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

err = ch.PublishWithContext(ctx,
  "",          // exchange
  "rpc_queue", // routing key
  false,       // mandatory
  false,       // immediate
  amqp.Publishing{
    ContentType:   "text/plain",
    CorrelationId: corrId,
    ReplyTo:       q.Name,
    Body:          []byte(strconv.Itoa(n)),
})
```

