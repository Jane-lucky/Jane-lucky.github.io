---
title: (一) RabbitMQ go教程——Hello World
categories: 
- [golang, RabbitMQ-go教程]
tags:
- RabbitMQ

---

使用GO RabbitMQ client

在该示例中，会分别写一个生产者一个消费者，其中生产者发送简单的消息，消费者获取信息并打印。

![python-one](Hello-world/python-one.png)

# send.go

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

//定义一个helper函数来接受处理错误
func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s:%s", msg, err)
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

	//作为发送者，需要声明队列：向队列中推送消息
	q, err := ch.QueueDeclare(
		"hello",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "failed to declare a queue")

    //设置context包，context:可以轻松地将请求范围的值、取消信号和截止日期跨 API 边界传递给处理请求所涉及的所有 goroutine
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	//定义的队列是幂等的，消息内容是byte数组
	body := "Hello World"

	err = ch.PublishWithContext(ctx,
		"",
		q.Name,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	failOnError(err, "Failed to publish a message")
	log.Printf("[x] Sent %s\n", body)
}

```

# receive.go

```go
package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s:%s", err, msg)
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

	//声明队列，先于发布者开始消费者，需要确保队列在消费的时候是存在的
	q, err := ch.QueueDeclare(
		"hello",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "failed to declare a queue")
	//将告诉服务段请在队列中传输消息，我们将在管道中读取到该消息
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

	//var forever chan struct{}
	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
		}
	}()
	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

```



# 运行

```shell
ubuntu@root:~/go/src/gotest/send$  go run send.go
2022/09/20 15:28:31 [x] Sent Hello World
ubuntu@root:~/go/src/gotest/recevice$  go run receive.go
2022/09/20 15:28:18  [*] Waiting for messages. To exit press CTRL+C
2022/09/20 15:28:31 Receiced a message: Hello World
panic: Receiced a message: Hello World
......
```

消费者将打印通过RabbitMQ从发布者那里得到的消息。使用者将持续运行，等待消息（使用Ctrl-C停止它），因此请尝试从另一个终端运行发布者。

如果要检查队列，可以使用`rabbitmqctl list_queues`

查看[第二节](http://jane-lucky.github.io/2022/09/20/golang/RabbitMQ-go教程/Hello-world/)创建简单的工作队列
