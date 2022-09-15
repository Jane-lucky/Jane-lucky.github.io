---
title: wget知识点详解
categories: 
- linux
tags:
- linux
---

## wget

"world wide web"和"get"的结合，目前支持http、https以及ftp这三个TCP/IP协议下载。

### 特点

- 支持递归下载
- 支持代理服务器
- 恰当地转换页面中的连接
- 生成可在本地浏览的页面镜像

### 使用方法

1. `wget`下载单文件

2. `wget -O`：下载并以不同的文件名保存

   将下载连接的文件保存为boost_1_80.tar.gz

   ```shell
   wget -O boost_1_80.tar.gz https://boostorg.jfrog.io/artifactory/main/release/1.80.0/source/boost_1_80_0.tar.gz
   ```

3. `wget -c`:断点续传

4. `wget -q `:quiet (no output)——下载内容但不显示任何内容

5. `wget -P`：下载到指定目录

   ```shell
   wget -P/tmp https://boostorg.jfrog.io/artifactory/main/release/1.80.0/source/boost_1_80_0.tar.gz
   ```

   
