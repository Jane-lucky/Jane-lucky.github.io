---
title: ccache安装及使用
categories: 
- 编译安装
tags:
- ccache
---

## 简介

在处理一些较大规模工程时，编译会花费较长的时间。ccache会在第一遍编译时时间较长，之后的编译会成倍的提速。

**基本原理：**通过头文件告诉缓存到源文件中而改进构建性能，因而通过减少每一步编译时添加头文件所需的时间而提高构建速度。

第一趟编译ccache缓存GCC的"-E"的输出，编译选项以及.o文件到$HOME/.ccache。第二次编译尽量利用缓存，必要时更新缓存。

## 安装

```shell
[root@68ab9a9c9a49 ccache-3.2.4]# yum install gcc make cmake -y

[root@68ab9a9c9a49 home]# wget http://samba.org/ftp/ccache/ccache-3.2.4.tar.gz
[root@68ab9a9c9a49 home]# tar -zxf ccache-3.2.4.tar.gz
[root@68ab9a9c9a49 home]# ls
ccache-3.2.4  ccache-3.2.4.tar.gz
[root@68ab9a9c9a49 home]# cd ccache-3.2.4
#配置安装
[root@68ab9a9c9a49 ccache-3.2.4]# /home/ccache-3.2.4/configure -prefix=/usr/local/ccache-3.2.4
configure: Configuring ccache
checking build system type... aarch64-unknown-linux-gnu
checking host system type... aarch64-unknown-linux-gnu
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables...
checking whether we are cross compiling... no
checking for suffix of object files... o
checking whether we are using the GNU C compiler... yes
.......
#编译安装
[root@034ebb878219 ccache-3.2.4]# make -j4
[root@68ab9a9c9a49 ccache-3.2.4]# make install
/usr/bin/install -c -d /usr/local/ccache-3.2.4/bin
/usr/bin/install -c -m 755 ccache /usr/local/ccache-3.2.4/bin
/usr/bin/install -c -d /usr/local/ccache-3.2.4/share/man/man1
/usr/bin/install -c -m 644 ./ccache.1 /usr/local/ccache-3.2.4/share/man/man1/

[root@68ab9a9c9a49 home]# cd /usr/bin/
[root@68ab9a9c9a49 bin]# ln -s /usr/local/ccache-3.2.4/bin/ccache ccache

[root@68ab9a9c9a49 usr]# ccache --v
ccache version 3.2.4

Copyright (C) 2002-2007 Andrew Tridgell
Copyright (C) 2009-2015 Joel Rosdahl

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 3 of the License, or (at your option) any later
version.

```

## 编译加速使用（mysql编译）

### ccache加入环境变量，取代C编译器：

```
cp ccache /usr/local/bin/
ln -s ccache /usr/local/bin/gcc
ln -s ccache /usr/local/bin/g++
ln -s ccache /usr/local/bin/cc
ln -s ccache /usr/local/bin/c++
```

yum安装以缓存的形式进行安装，目录挂载，本地源

可以大量的减少安装等待的时间

```
yum install --downloadonly 包名
```

在 ccache 中使用 -s 命令行选项来获得关于高速缓存性能的统计数据。

### MYSQL 5.7.X编译

#### 方法一

将sh文件后台执行，`sh test.sh &> /tmp/test.log`

mysql版本：5.7.36

时间消耗：21 minutes

第一次使用 ccache 编译那个文件时，您将不会看到有任何的帮助，因为编译信息还没有被高速缓存。

ccache获取的缓存的数据

```shel
[root@74c8c1b5bfab home]# ccache -s
cache directory                     /root/.ccache
primary config                      /root/.ccache/ccache.conf
secondary config      (readonly)    /usr/local/ccache-3.2.4/etc/ccache.conf
cache hit (direct)                    36
cache hit (preprocessed)              23
cache miss                          2239
called for link                      508
called for preprocessing              20
compile failed                        19
preprocessor error                    20
no input file                          3
files in cache                      4715
cache size                           1.6 GB
max cache size                       5.0 GB
```

#### 方法二

**前提：**.cacahe文件中已经获取到编译的缓存

```shell
docker run -itd --name ccachtest -v $PWD/yumcache/:/home/lamp -v $PWD/ccache/:/root/.ccache -v $PWD/ccache-3.2.4:/usr/local/ccache-3.2.4 centos:7
```

时间消耗：Total:4 minutes

1. yum下载采用缓存的方式进行

   `-v $PWD/yumcache/:/home/lamp`

2. ccache不必每次都进行编译

   `-v $PWD/ccache-3.2.4:/usr/local/ccache-3.2.4`	

3. 缓存/root/.ccache文件目录

   `-v $PWD/ccache/:/root/.ccache`

#### 同缓存编译不同版本

参考方法二，仅修改mysql的版本：5.7.35

时间消耗:19 minutes

ccache获取的缓存的数据

```shell
[root@0a200c0bc3fd .ccache]# ccache -s
cache directory                     /root/.ccache
primary config                      /root/.ccache/ccache.conf
secondary config      (readonly)    /usr/local/ccache-3.2.4/etc/ccache.conf
cache hit (direct)                  2544
cache hit (preprocessed)              68
cache miss                          4386
called for link                     1630
called for preprocessing              60
compile failed                        57
preprocessor error                    62
no input file                         11
files in cache                      9245
cache size                           3.1 GB
max cache size                       5.0 GB
```

