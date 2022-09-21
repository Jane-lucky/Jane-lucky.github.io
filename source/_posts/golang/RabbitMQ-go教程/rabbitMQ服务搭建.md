---
title: RabbitMQ服务搭建
categories: 
- [golang, RabbitMQ-go教程]
tags:
- RabbitMQ

---

# 概念

RabbitMQ是一个消息代理，它接收和发送消息。可以认为是一个邮局：当你把你想要邮寄的邮件放进一个邮箱时，你可以确定邮差会将邮件送到收件人那。

与邮局不同的，RabbitMQ接收、存储和转发二进制数据块——消息。

## 术语

**生产者**意味着发送，发送消息的程序就是生产者。

**队列**一个较大的缓冲队列，生产者可以发送消息，消费者可以从里面获取消息。

**消费者**是一个主要等待接受消息的程序

# 镜像获取

获取RabbitMQ 管理端镜像

```
sudo docker rabbitmq:3.9.22-management
sudo docker run -itd --name rabbitmq -p 15672:15672 rabbitmq:3.9.22-management
```





