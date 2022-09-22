---
title: (三) RabbitMQ go教程——发布/订阅（publish/subscribe）
categories: 
- [golang, RabbitMQ-go教程]
tags:
- RabbitMQ

---

在之前的文章中，我们创建一个工作队列，假设在一个工作队列中每一个task都均由一个工人传输。

在本节中，将一条消息传输给多个消费者，该模式称为**发布/订阅（publish/subscribe）**

为了说明该模式，会创建一个日志系统：由两个程序组成（一个负责发出日志信息，另一个接收并打印）。

在日志系统中，每一个程序运行的接收副本都会得到消息。通过该方法我们可以运行一个接收者并将日志保存到磁盘，与此同时我门也可以运行另一个接收者同时看见该日志。

发布的日志信息将会对所有的接收者查看。



在之前的文章中，是直接通过队列传递的消息，接下来介绍在rabbit中的**消息模型**

消息模型的核心是生产者从来不直接向队列中发送任何消息，事实上，几乎所有的生产者都不知道消息会被传递到队列中。生产者会将消息发送至转换体中，它是一个十分简单的内容——一边接从所有的生产者中接收到消息，以便将消息推送到队列中。转换者必须明确的知道如何处理接收的消息。

![exchanges](publish/exchanges.png)

转换的变量主要有`direct`、`topic`、`headers`、`fanout`

```go
err = ch.ExchangeDeclare(
  "logs",   // name
  "fanout", // type
  true,     // durable
  false,    // auto-deleted
  false,    // internal
  false,    // no-wait
  nil,      // arguments
)
```



`fanout`是比较简单，从名字可以看出来，它仅是向它知道的队列去广播所有接收的消息。

# 临时队列

之前使用特殊名字的队列（hello），能够命名队列是很重要的——我门需要给工人指向相同的队列，在生产者和消费者之间分享队列名称是极其重要的。

但是对本次的日志来说并不，我们需要监听到所有的日志信息，而不仅是其中一个，我们也只对当前流动的消息感兴趣，而不是对旧消息感兴趣。

- 无论什么时候当我们连接rabbit的时候，都需要一个干净的、空的队列，为此我们随机创建一个队列名称或者让服务器随机为我们选择一个队列名称。
- 当不再连接的时候需要立即删除该队列。

在amqp中，当声明一个空字符串的队列时，会随机生成一个队列名称，定义执行状态为true，当关闭连接的时候，该队列会被删除。

```go
q, err := ch.QueueDeclare(
  "",    // name
  false, // durable
  false, // delete when unused
  true,  // exclusive
  false, // no-wait
  nil,   // arguments
)
```

# 绑定

![bindings](publish/bindings.png)

定义了一个`fanout`的转换体和队列，现在需要告诉转换体发送消息到队列中，该操作成为**绑定**

```go
err = ch.QueueBind(
  q.Name, // queue name
  "",     // routing key
  "logs", // exchange
  false,
  nil,
)
```

现在日志就被追加到队列中

# 完整代码

`receive.go`

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

	err = ch.ExchangeDeclare(
		"logs",   //name
		"fanout", //type
		true,     //durable
		false,    //auto-delete
		false,    //internal
		false,    //no-wait
		nil,      //arguments
	)
	failOnError(err, "failed to declare a queue")

	q, err := ch.QueueDeclare(
		"",
		false,
		false,
		true,
		false,
		nil,
	)
	failOnError(err, "failed to declare a queue")

	//绑定
	err = ch.QueueBind(
		q.Name,
		"",
		"logs",
		false,
		nil,
	)

	failOnError(err, "Failed to bind queue")

	//将告诉服务段请在队列中传输消息，我们将在管道中读取到该消息
	msgs, err := ch.Consume(
		q.Name,
		"",
		//false,
		true, //ack
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}
	//forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
		}
	}()
	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

```

`send.go`

```go
package main

import (
	"context"
	"log"
	"os"
	"strings"
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

	//作为发送者，需要声明一个转换体

	err = ch.ExchangeDeclare(
		"logs",   //name
		"fanout", //type
		true,     //durable
		false,    //auto-delete
		false,    //internal
		false,    //no-wait
		nil,      //arguments
	)
	failOnError(err, "failed to declare a queue")

	//设置context包，可以轻松地将请求范围的值、取消信号和截止日期跨 API 边界传递给处理请求所涉及的所有 goroutine
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	//定义的队列是幂等的，消息内容是byte数组
	body := bodyFrom(os.Args)
	//body := "Hello World"

	err = ch.PublishWithContext(ctx,
		"logs", //exchange
		" ",    //routing key
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	failOnError(err, "Failed to publish a message")
	log.Printf("[x] Sent %s\n", body)
}

func bodyFrom(args []string) string {
	var s string
	if (len(args) < 2) || os.Args[1] == "" {
		s = "Hello"
	} else {
		s = strings.Join(args[1:], " ")
	}
	return s
}

```



![runResult](publish/runResult.png)

```shell
root@2f82bf702d30:/# rabbitmqctl list_exchanges
Listing exchanges for vhost / ...
name	type
amq.topic	topic
logs	fanout
amq.match	headers
amq.direct	direct
amq.headers	headers
	direct
amq.fanout	fanout
amq.rabbitmq.trace	topic
root@2f82bf702d30:/# rabbitmqctl list_bindings
Listing bindings for vhost /...
source_name	source_kind	destination_name	destination_kind	routing_key	arguments
	exchange	hello	queue	hello	[]
	exchange	amq.gen-qoEkayPewVkEKGRdmcKKtw	queue	amq.gen-qoEkayPewVkEKGRdmcKKtw	[]
logs	exchange	amq.gen-qoEkayPewVkEKGRdmcKKtw	queue		[]

```

