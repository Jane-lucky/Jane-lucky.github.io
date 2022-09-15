---
title: redis 5.0.6 arm镜像构建
categories: 
- docker
tags:
- redis
---

# 基础镜像 alpine

源码获取

```shell
wget https://github.com/docker-library/redis/raw/6ec0ad5628df2404509f776e9c70fbecf5364c10/5.0/alpine/Dockerfile
wget https://github.com/docker-library/redis/raw/6ec0ad5628df2404509f776e9c70fbecf5364c10/5.0/alpine/docker-entrypoint.sh
chmod +x docker-entrypoint.sh
```

# 注意

## 问题一

redis 5.0.X版本中，尽管官方已经提供了arm版本的redis镜像，但是在arm centos 7.6系统中，会出现page size的问题，因此建议重新获取dockerfile构建对应的镜像。

```shell
[root@ecs-5e66 jdk]$ docker logs redist
<jemalloc>: Unsupported system page size
<jemalloc>: Unsupported system page size

```

## 问题二

在构建过程中，由于redis的Dockerfile在不停的更新，包括对应的基础镜像，因此建议在构建过程中，采用对应的Dockerfile构建，而不仅仅是改变Dockerfile中的版本。