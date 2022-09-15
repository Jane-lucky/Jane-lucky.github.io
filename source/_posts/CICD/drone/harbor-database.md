---
title: CSV数据同步pg
categories: 
- [CICD, drone]
tags:
- harbor
- drone
- docker
---



## 描述

更新harbor数据（harbor-`date '+%Y-%m-%d'`.csv）到数据库（pg）。

可作为drone插件（将传入的值作为环境变量获取）使用。

*注：该文档需要固定数据库类型，csv格式等*

## 制作步骤

harbor_flush.py

```python
# coding:utf-8
from io import StringIO
import pandas as pd
import psycopg2
import datetime
import os


if __name__ == '__main__':
#连接数据库，os.getenv获取环境变量
   conn=psycopg2.connect(database=os.getenv('PLUGIN_DATABASE'),user=os.getenv('PLUGIN_USER'),password=os.getenv('PLUGIN_PASSWORD'),host=os.getenv('PLUGIN_HOST'),port=os.getenv('PLUGIN_PORT'))
    print("Opened database successfully")
    cur=conn.cursor()
    #如果数据库不存在创建数据库
    cur.execute('''CREATE TABLE if not exists harbor_table (
        repoaddress VARCHAR(255),
        storehouse VARCHAR(255),
        image  VARCHAR(255),
        version  VARCHAR(255),
        arch  VARCHAR(255),
        command  VARCHAR(255)
        );''')

    print("Table created successfully")

    cur.execute("TRUNCATE TABLE harbor_table;")
    print("Table truncate successfully")
    conn.commit()
    filename='/opt/harbor-'+str(datetime.date.today())+'.csv'
    f=open(filename,'r',encoding='UTF-8')
    #同步csv文件
    try:
        cur.copy_from(f, 'harbor_table', sep=',', null='')
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)

    conn.close()
```

Dockerfile

```dockerfile
FROM python:3.9-alpine3.13
#下载依赖
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk add build-base postgresql-dev && \
    pip install psycopg2 pandas openpyxl
COPY harbor_flush.py ./
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
#同步数据库
steps:
- name: harbor_database
  image: IP:8085/image_amd64/harbor_database:v1
  settings:
    database: testdb
    user: postgres
    password: 123456
    host: 10.100.93.X
    port: 10590
  volumes: 
  - name: harbor
    path: /opt/
  commands:
  - python harbor_flush.py
```

docker 命令行

```shell
docker run -it --rm -e PLUGIN_DATBASE=testdb -e PLUGIN_USER=postgres -e PLUGIN_PASSWORD=123456 -e PLUGIN_HOST=10.100.93.X -e PLUGIN_PORT=10590 -v $PWD:/opt IP:8085/image_amd64/harbor_database:v1 sh
```

## 结果

成功写入数据库中

