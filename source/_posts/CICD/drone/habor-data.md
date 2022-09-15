---
title: shell脚本获取habor仓库信息
categories: 
- [CICD, drone]
tags:
- harbor
- drone
- docker
---



## 描述

镜像获取harbor工程中所有的仓库、镜像名称、镜像版本、镜像架构

可作为drone插件使用

## 制作步骤

build.sh

```shell
#!/bin/sh

#镜像清单文件，将获取到的镜像信息存到该文件中
File=harbor-`date '+%Y-%m-%d'`.csv

#配置的为drone的变量
USER=$PLUGIN_ADMIN
PASS=$PLUGIN_PASSWORD
TOU=$PLUGIN_ADDRESS
HURL="https://$TOU/api/v2.0"

## 获取Harbor中有哪些项目（Project）
Project_List=$(curl -k  -s -u "$USER:$PASS" $HURL/projects | sed 's/,/\n/g' | grep -w name | awk -F "\"" '{print $4}')

for Project in $Project_List;do
  # 循环获取每个项目下所有的镜像
# Image_Names=$(curl -k  -s -u "$USER:$PASS"  -X GET $HURL/search?q=$Project -H "Content-Type: application/json" | python -m json.tool | grep "repository_name" | awk -F "/" '{print $2}' | awk -F "\"" '{print $1}')
 Image_Names=$(curl -k  -s -u "$USER:$PASS"  -X GET $HURL/search?q=$Project -H "Content-Type: application/json" | sed 's/,/\n/g' | grep "repository_name" | awk -F "\"" '{print $4}' | awk -F "$Project" '{$1="";print}' | awk -F "/" '{$1="";print}' | awk '$1=$1' | sed 's/ /%252F/g')
   for Image in $Image_Names;do
#    echo "https://$TOU/$Project/$Image" >> $allImage
    # 循环获取每个镜像所有的标签（版本）
    Image_Tags=$(curl -k  -s -u "$USER:$PASS" $HURL/projects/$Project/repositories/$Image/artifacts | sed 's/,/\n/g' | grep name | sed -e 's/.\{8\}//' -e 's/"$//' )
        for Tag in $Image_Tags;do
        arch=$(curl -k  -s -u "$USER:$PASS" $HURL/projects/$Project/repositories/$Image/artifacts/$Tag  | sed 's/,/\n/g' | grep architecture | awk -F "\"" '{print $6}')
        # 将获取到的镜像完整路径存档到镜像清单文件
        #echo "https://$TOU/$Project/$Image:$Tag" | grep -v Base | grep -v Image | grep -v CentOS >>  $File
        image=$(echo "$Image" | sed 's/%252F/\//g')
         echo "$TOU,$Project,$image,$Tag,$arch,docker pull $TOU/$Project/$image:$Tag" >>  /opt/$File
        done
    done
done
exec "$@"
```

Dockerfile

```dockerfile
FROM alpine:3.14.6

COPY build.sh /bin/

RUN chmod +x /bin/build.sh

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk -Uuv add curl ca-certificates
ENTRYPOINT /bin/build.sh

```

## 使用

drone

```yaml
kind: pipeline
type: docker
name: default

platform:
    os: linux
    arch: amd64
    
volumes:
  - name: harbor
    host:
      path: /data/harbor/Doc
steps:
- name: greeting
  image: IP:8085/image_amd64/harbor_data:v1
  settings:
    admin: admin
    password: Harbor12345
    address: IP:8085
  volumes: 
  - name: harbor
    path: /opt/
```

docker 命令行

```shell
docker run -it --rm -e PLUGIN_ADMIN=admin -e PLUGIN_PASSWORD=Harbor12345 -e PLUGIN_ADDRESS=IP:8085 -v $PWD:/opt/ IP:8085/image_amd64/harbor_data:v1 sh
```

## 结果

会在映射目录保存harbor-`date '+%Y-%m-%d'`格式的文件