---
title: docker安装
categories: 
- docker
tags:
- docker
---

## 安装（一）

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

## 安装（二）

系统：centos 7.6

```shell
yum remove docker docker-common docker-selinux docker-engine
#安装依赖
yum install -y yum-utils device-mapper-persistent-data lvm2
#设置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum list docker-ce --showduplicates | sort -r

#安装docker

yum install -y docker-ce-20.10.8 docker-ce-cli-20.10.8 containerd.io 

#启动docker

systemctl daemon-reload

systemctl start docker

systemctl enable docker

#查看docker版本

docker version
```
