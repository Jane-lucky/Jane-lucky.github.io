---
title: docker镜像获取失败
categories: 
- docker
tags:
- docker

---

# docker pull失败

最经在虚机中下载docker镜像，之前已经可以成功`docker pull`下来，今天都获取失败，均报如下错误，但有的又可以正常下载：

```shell
ubuntu@root:~/Desktop$ sudo docker pull rabbitmq:3.9.22-alpine
Error response from daemon: Get "https://registry-1.docker.io/v2/": x509: certificate is valid for *.helpapp.io, not registry-1.docker.io
ubuntu@root:~/Desktop$ docker logout
Removing login credentials for https://index.docker.io/v1/
ubuntu@root:~/Desktop$ sudo docker pull rabbitmq:3.9.22
3.9.22: Pulling from library/rabbitmq
675920708c8b: Already exists 
......
21d42f925919: Already exists 
Digest: sha256:fa2a3e972323d5e3a426acec7159b460aa06b07a3732cebb4892fe65446048d6
Status: Downloaded newer image for rabbitmq:3.9.22
docker.io/library/rabbitmq:3.9.22
```



# 解决方法(玄学，下午下载又成功了，可能是网络问题)

查看网上好多解决方法，表示国内把hub禁了（大概率不需要），不能下载，需要切换docker下载镜像的源配置文件

```shell
ubuntu@root:~/Desktop$ cat /etc/docker/daemon.json 
{
    "registry-mirrors": ["https://registry.docker-cn.com","http://hub-mirror.c.163.com"],
    "live-restore": true
}
```

但配置文件之后，不能正常下载。

1. 换到其他云环境，依旧不能正常下载，报错为获取超时，后续尝试成功，可能是因为网络问题，建议如果下载失败，之后没准就成功了，玄学：

```shell
[root@ecs-arm-k8s-master01 ~]# docker pull rabbitmq:3.9.22-alpine
Error response from daemon: Head "https://registry-1.docker.io/v2/library/rabbitmq/manifests/3.9.22-alpine": net/http: TLS handshake timeout
```

2. 之前在云服务器上也有相同的下载问题，但极大可能都是其他人在环境有登陆docker，可能导致镜像获取不到，一般`docker logout`就可以解决。

   ```shell
   you are load balancing between two (or more) registries, and you did not configure the shared secret properly
   your are load balancing, and one of your registry is not configured properly to use the shared storage
   ```

   

