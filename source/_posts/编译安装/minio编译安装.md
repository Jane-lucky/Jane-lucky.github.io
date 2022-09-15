---
title: minio编译失败问题分析&编译安装
categories: 
- 编译安装
tags:
- minio
---



# 问题原因

下载编译minio，编译出现报错

# 问题分析&解决

1. 查看是否go版本较低导致

   可升级go版本，

   注：可以`cat go.mod`查看mod的go版本，可匹配，如果安装的不匹配，git下载之后，需要执行`go mod tidy`根据环境修改mod文件。

   以下为go 1.18安装步骤

   ```shell
   wget https://studygolang.com/dl/golang/go1.18.linux-arm64.tar.gz
   tar -zxvf go1.18.linux-arm64.tar.gz  -C /usr/local/
   vim /etc/profile
   #最后一行写入
   export PATH=$PATH:/usr/local/go/bin
   
   source /etc/profile
   go env
   
   #导入go代理
   #export GOPROXY=https://goproxy.io,direct
   export GOPROXY=https://proxy.golang.org,direct
   ```

2. make过程中出现校验码不同

   ```shell
   go: downloading github.com/google/pprof v0.0.0-20211214055906-6f57359322fd
   verifying github.com/go-openapi/spec@v0.20.5: checksum mismatch
           downloaded: h1:7VP8zufGZEIV+zfSwHGTWgbMINz/WhW3oFsA47Rhjsk=
           go.sum:     h1:skHa8av4VnAtJU5zyAUXrrdK/NDiVX8lchbG+BfcdrE=
   
   SECURITY ERROR
   This download does NOT match an earlier download recorded in go.sum.
   The bits may have been replaced on the origin server, or an attacker may
   have intercepted the download attempt.
   
   For more information, see 'go help module-auth'.
   make: *** [build] Error 1
   
   ```

   

   - 在 `go.sum` 文件存在的时候，则会使用 `go.sum` 里面记录的依赖 hash 和实际下载的依赖 hash 进行对比， 如果不匹配，会出现报错；
   - 如果 `go.sum` 不存在，则使用 `GOSUMDB` （默认是 [sum.golang.org](https://link.juejin.cn/?target=https%3A%2F%2Fsum.golang.org%2F)）对实际下载的依赖 hash 进行检查，如果不匹配，则出现错误；

   解决方案

   - 删除go.sum或者清除缓存,编译，如果编译过程中出现超时，可重复执行该步骤

     ```shell
     go clean -modcache
     rm -f go.sum
     #查看代理设置go env GOPROXY，采用默认的：https://proxy.golang.org,direct，
     #修改：export GOPROXY=https://proxy.golang.org,direct
     go mod tidy
      make
     ```

   - **如果已经删除go.sum之后，mod的时候报错文件依旧不匹配，可采用该方法** `GOSUMDB`，即 `export GOSUMDB=off`

     *如果设置了 GOSUMDB 为 “off” 或者使用 go get 的时候启用了`-insecure`参数，Go 不会去对下载的依赖包做安全校验，存在一定的安全隐患，不建议*

     ```shell
     go clean -modcache
     rm -f go.sum
      export GOSUMDB=off
     go mod tidy
     make
     ```

   编译成功

# 编译

## MinIO Server 安装

**仅是编译minio,不存在配置及验证，如果验证，可参考[Huawei Kunpeng Innovation Center Flagship Store](https://ic-openlabs.huawei.com/client/#/knowledge/details?id=R1S1584D0021871822019121922381091416527)**

### 安装依赖

```shell
[root@8154395e1759 /]# yum install vim wget git make -y
#安装go
[root@8154395e1759 /]# wget https://studygolang.com/dl/golang/go1.18.linux-arm64.tar.gz
[root@8154395e1759 /]# tar -zxvf go1.18.linux-arm64.tar.gz  -C /usr/local/

#配置环境变量
[root@8154395e1759 /]# cat /etc/profile | tail -n 2
unset -f pathmunge
export PATH=$PATH:/usr/local/go/bin
[root@8154395e1759 /]# go version
go version go1.18 linux/arm64

#参看go代理的配置
[root@8154395e1759 /]#  go env GOPROXY
https://proxy.golang.org,direct
```

### 下载minion

```shell
[root@8154395e1759 /]#  git clone https://github.com/minio/minio.git
[root@8154395e1759 /]# cd minio/
#更新与编译环境对应的依赖
[root@8154395e1759 minio]# go mod tidy
```

### 编译

```shell
[root@8154395e1759 minio]# make
[root@8154395e1759 minio]# make
Error generating git commit-time:  parsing time "%cI" as "2006-01-02T15:04:05Z07:00": cannot parse "%cI" as "2006"
exit status 1
Checking dependencies
Building minio binary to './minio'
[root@8154395e1759 minio]# ls -al ./minio
-rwxr-xr-x 1 root root 119773941 Sep  6 08:02 ./minio
```

## MinIO Client 安装

### 下载&编译

```shell
[root@8154395e1759 /]# git clone https://github.com/minio/mc.git
[root@8154395e1759 /]# cd mc/
#更新与编译环境对应的依赖
[root@8154395e1759 mc]# go mod tidy
[root@8154395e1759 mc]# make
Error generating git commit-time:  parsing time "%cI" as "2006-01-02T15:04:05Z07:00": cannot parse "%cI" as "2006"
exit status 1
Checking dependencies
Building mc binary to './mc'
[root@8154395e1759 mc]# ls -al ./mc
-rwxr-xr-x 1 root root 32852718 Sep  6 08:18 ./mc

```