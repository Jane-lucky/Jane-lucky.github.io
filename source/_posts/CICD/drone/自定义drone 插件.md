---
title: 自定义droe 插件
categories: 
- [CICD, drone]
tags:
- drone
- docker
---



# drone插件

**制作原理：**参照变量的方式（PLUGIN_）

制作脚本文件——》封装镜像——》插件完成，编写drone文件验证正确性

插件也仅仅时dockers 容器，也就意味着可以采用任何语言来实现插件。如下是基于bash和go语言构成插件内容.

## 基于bash的插件制作

1. 制作脚本文件

```
#! /bin/sh

curl -X ${PLUGIN_METHOD} -d ${PLUGIN_BODY} ${PLUGIN_URL}
```

1. 制作Dockerfile文件

```
FROM alpine:3.14.6

COPY build.sh /bin/

RUN chmod +x /bin/build.sh

RUN apk -Uuv add curl ca-certificates
ENTRYPOINT /bin/build.sh
```

构建镜像：docker build -t test:v1 .

1. .drone.yml文件

```
kind: pipeline
type: docker
name: default

steps:
- name: greeting
  image: test:v1
  settings:
    url: http://hook.acme.com
    method: post
    body: |
      hello world

node:
  foo: bar
```

## 基于go语言的插件

1. 编写需求对应的go文件

```
package main

import (
    "net/http"
    "os"
    "strings"
)

func main() {
    body := strings.NewReader(
        os.Getenv("PLUGIN_BODY"),
    )

    _, err := http.NewRequest(
        os.Getenv("PLUGIN_METHOD"),
        os.Getenv("PLUGIN_URL"),
        body,
    )
    if err != nil {
        os.Exit(1)
    }
}
```

go build -o wehook