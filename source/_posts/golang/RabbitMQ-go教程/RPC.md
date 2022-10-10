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

`CorrelationId`关联Id：在该队列中收到响应后，尚不清楚响应属于哪个请求。这个时候就该使用`correlation_id`这个属性了。针对每个请求我们将为其设置一个唯一值。随后，当我们在回调队列中收到消息时，我们将查看该属性，并基于这个属性将响应与请求进行匹配。如果我们看到未知的`correlation_id`值，则可以放心地丢弃该消息——它不属于我们的请求。

# 代码

`send.go`

服务器代码非常简单：

- 与往常一样，我们首先建立连接，通道并声明队列。
- 我们可能要运行多个服务器进程。为了将负载平均分配给多个服务器，我们需要在通道上设置`prefetch`设置。
- 我们使用`Channel.Consume`获取去队列，我们从队列中接收消息。然后，我们进入goroutine进行工作，并将响应发送回去。

```go
package main

import (
	"context"
	"log"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

//

//定义一个helper函数来接受处理错误
func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s:%s", msg, err)
	}
}

func randomString(l int) string {
	bytes := make([]byte, l)
	for i := 0; i < l; i++ {
		bytes[i] = byte(randInt(65, 90))
	}
	return string(bytes)
}
func randInt(min int, max int) int {
	return min + rand.Intn(max-min)
}
func fibonacciRPC(n int) (res int, err error) {
	//连接rabbitMQ服务端
	conn, err := amqp.Dial("amqp://guest:guest@172.17.0.2:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	//创建管道
	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"",
		false,
		false,
		true,
		false,
		nil,
	)

	failOnError(err, "Faild to declare a queue")

	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Failed to register a consumer")

	corrId := randomString(32)
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
	failOnError(err, "Failed to publish a message")

	for d := range msgs {
		if corrId == d.CorrelationId {
			res, err = strconv.Atoi(string(d.Body))
			failOnError(err, "Failed to convert body to integer")
			break
		}
	}

	return
}
func main() {
	rand.Seed(time.Now().UTC().UnixNano())
	n := bodyFrom(os.Args)
	log.Printf("[x] Requesting fib(%d)", n)
	res, err := fibonacciRPC(n)
	failOnError(err, "Failed to handle RPC request")

	log.Printf(" [.] Got %d", res)

}

func bodyFrom(args []string) int {
	var s string
	if len(args) < 2 || os.Args[1] == "" {
		s = "30"
	} else {
		s = strings.Join(args[1:], " ")
	}
	n, err := strconv.Atoi(s)
	failOnError(err, "Failed to convert arg to integer")
	return n
}

```

`receive.go`

```go
package main

import (
	"context"
	"log"
	"strconv"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s:%s", err, msg)
	}
}

func fib(n int) int {
	if n == 0 {
		return 0
	} else if n == 1 {
		return 1
	} else {
		return fib(n-2) + fib(n-1)
	}
}
func main() {
	//连接rabbitMQ服务端
	conn, err := amqp.Dial("amqp://guest:guest@172.17.0.2:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	//创建管道
	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"rpc_queue",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "failed to declare a queue")

	err = ch.Qos(
		1,
		0,
		false,
	)

	failOnError(err, "Failed to set QoS")

	//将告诉服务段请在队列中传输消息，我们将在管道中读取到该消息
	msgs, err := ch.Consume(
		q.Name,
		"",
		//false,
		false, //ack
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}
	//forever := make(chan bool)

	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
		defer cancel()
		for d := range msgs {
			n, err := strconv.Atoi(string(d.Body))
			failOnError(err, "Failed to convert body to integer")

			log.Printf("[.] fib*(%d)", n)
			response := fib(n)

			err = ch.PublishWithContext(ctx,
				"",
				d.ReplyTo,
				false,
				false,
				amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          []byte(strconv.Itoa(response)),
				})
			failOnError(err, "Faild to publish a message")
			d.Ack(false)
		}
	}()
	log.Printf(" [*] Awaiting RPC requests")
	<-forever
}

```

## 运行结果

```shell
ubuntu@root:~/go/src/gotest/send$ go run send.go 
2022/09/29 14:47:36 [x] Requesting fib(30)
2022/09/29 14:47:36  [.] Got 832040
ubuntu@root:~/go/src/gotest/send$ go run send.go 3
2022/09/29 14:47:46 [x] Requesting fib(3)
2022/09/29 14:47:46  [.] Got 2
ubuntu@root:~/go/src/gotest/send$ go run send.go 5
2022/09/29 14:47:54 [x] Requesting fib(5)
2022/09/29 14:47:54  [.] Got 5

ubuntu@root:~/go/src/gotest/recevice$ go run receive.go 
2022/09/29 14:44:22  [*] Awaiting RPC requests
2022/09/29 14:47:36 [.] fib*(30)
2022/09/29 14:47:46 [.] fib*(3)
2022/09/29 14:47:54 [.] fib*(5)
```

这里介绍的设计不是RPC服务的唯一可能的实现，但是它具有一些重要的优点：

- 如果RPC服务器太慢，则可以通过运行另一台RPC服务器来进行扩展。尝试在新控制台中运行另一个`rpc_server.go`。
- 在客户端，RPC只需要发送和接收一条消息。结果，RPC客户端只需要一个网络往返就可以处理单个RPC请求。

我们的代码仍然非常简单，并且不会尝试解决更复杂（但很重要）的问题，例如：

- 如果没有服务器在运行，客户端应如何反应？
- 客户端是否应该为RPC设置某种超时时间？
- 如果服务器发生故障并引发异常，是否应该将其转发给客户端？
- 在处理之前防止无效的传入消息（例如检查边界，类型）。
