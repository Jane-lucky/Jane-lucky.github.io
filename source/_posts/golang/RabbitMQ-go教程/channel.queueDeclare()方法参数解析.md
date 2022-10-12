---
title: Go 第三方库之 amqp
categories: 
- [golang, RabbitMQ-go教程]
tags:
- RabbitMQ

---



# 创建队列——QueueDeclare



## channel.queueDeclare()方法

```go
func (*amqp.Channel).QueueDeclare(name string, durable bool, autoDelete bool, exclusive bool, noWait bool, args amqp.Table) (amqp.Queue, error)

func (ch *Channel) QueueDeclare(name string, durable, autoDelete, exclusive, noWait bool, args Table) (Queue, error) {
	if err := args.Validate(); err != nil {
		return Queue{}, err
	}

	req := &queueDeclare{
		Queue:      name,
		Passive:    false,
		Durable:    durable,
		AutoDelete: autoDelete,
		Exclusive:  exclusive,
		NoWait:     noWait,
		Arguments:  args,
	}
	res := &queueDeclareOk{}

	if err := ch.call(req, res); err != nil {
		return Queue{}, err
	}

	if req.wait() {
		return Queue{
			Name:      res.Queue,
			Messages:  int(res.MessageCount),
			Consumers: int(res.ConsumerCount),
		}, nil
	}

	return Queue{Name: name}, nil
}
```

## 参数解析

**name string:**队列的名称，也可以是空的，如果为空的话，系统内部会自动生成一个名称。

**durable bool:**是否持久化

持久化表示数据队列的持久化设置；

- `true`:rabbitMQ重启之后队列信息不会丢失，重启之后会读取数据库。
- `false`：队列存放在内存中。

**autoDelete bool:**是否自动删除

当为`true`的时候。当所有的消费者都与该队列断开连接的时候，该队列会自动进行删除。

**exclusive bool:**是否排外

如果一个队列声明为排他队列，那么仅对首次声明的连接可见，其余连接不可见。

基于连接可见，同个连接的不同管道是可以同时访问同一连接创建的排他队列的

**noWait bool:**

**args amqp.Table:**

# 连接-connection

```shell
amqp.Dial("amqp://guest:guest@172.17.0.2:5672"）
```

# 管道创建-Channel

# 消息投递（1）-PublishWithContext

```go
Channel.PublishWithContext(ctx context.Context, exchange, key string, mandatory, immediate bool, msg Publishing)
```

# 绑定——bind

## 交换器绑定——ExchangeBind

```go
func (ch *Channel) ExchangeBind(destination, key, source string, noWait bool, args Table) error 
```

生产者发送消息至交换器(source)中，交换器source根据路由键找到与其匹配得另一个destination中，进而存储在destination绑定得队列queue中。

## 队列绑定——QueueBind

```go
func (ch *Channel) QueueBind(name, key, exchange string, noWait bool, args Table) error
```

交换器类型是fanout, 不用指定路由键, 消息会发送到与此交换器绑定的所有队列
