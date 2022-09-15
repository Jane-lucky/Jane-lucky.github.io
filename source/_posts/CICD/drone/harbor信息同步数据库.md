---
title: harbor镜像内容自动化同步metabese
categories: 
- [CICD, drone]
tags:
- harbor
- drone
- docker
---



## 作用

获取harbor中信息，包括仓库、镜像名称、版本、架构等，存储到metabase对应的数据库中。

## Drone自动化工程

```yaml
kind: pipeline
type: docker
name: default

volumes:
- name: harbor
  host:
    path: /data/harbor/Doc

steps:
- name: greeting
  image: IP:8085/images/harbor_data:v1
  settings:
    admin: admin
    password: Harbor12345
    address: IP:8085
  volumes: 
  - name: harbor
    path: /opt/
  
- name: harbor_table
  image: IP:8085/images/harbor_database:v1
  #数据库环境信息
  settings:
    database: testdb
    user: postgres
    password: 123456
    host: IP
    port: 10590
  volumes:
  - name: harbor
    path: /opt/
  commands:
  - python /harbor_flush.py
#私有镜像获取密钥
image_pull_secrets:
- dockerconfigjson
#选择运行服务器
node:
  foo: bar
```

## IP:8085/images/harbor_data:v1、IP:8085/images/harbor_database:v1的使用方式

### IP:8085/images/harbor_data:v1

**作用：**获取私有仓库（harbor）中所有的镜像所属仓库、镜像名称、架构等信息，并保存成.csv的格式（*后续可优化成保存文件格式自选*）

**参数：**

admin:harbor登录账号

password：密码

address：harbor仓库地址

```
admin: XXX
password: XXX
address: XX.XX.XX.XX:8085
```

**注意**

如果需要获取.csv的文件，需要映射容器内部的opt目录获取。

### IP:8085/images/harbor_database:v1

**作用：**将前者获取到的镜像信息更新至数据库中，该数据库仅为pg数据库（*后续可优化成数据库的选取，类似MySQL、pg等等*）

**参数：**

database:数据库名称

user:用户名

password：数据库密码

host：服务器地址

port：数据库服务器端口

```
    database: xx
    user: xx
    password: xx
    host: xx
    port: xx
```

**注意**

.csv的文件，需要将文件映射容器内部的opt目录进行获取。

## harbor镜像获取设置

密码管理

```
echo -n 'admin:Harbor12345' | base64
```

镜像管理

name: dockerconfigjson

value: 

```json
{
    "auths": {
        "XX.XX.XX.XX:8085": {
            "auth": "YWRtaW46SGFyYm9yMTIzNDU="
        }
    }
}
```

**作用：**通过该设置获取私有仓库镜像