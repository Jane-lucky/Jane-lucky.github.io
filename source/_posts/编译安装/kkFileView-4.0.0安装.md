---
title: kkFileView-4.0.0编译安装 
categories: 
- 编译安装
tags:
- kkFileView
---

**获取源码**

```shell
git clone https://gitee.com/kekingcn/file-online-preview.git
cd file-online-preview/
git checkout v4.0.0
```

## centos 7.6 安装

### 安装依赖

```shell
yum install git wget vim libreoffice java-11-openjdk maven -y
java -version
mvn -v
#/usr/lib64/libreoffice
```

### 修改原文档中的配置文件

```shell
git diff
diff --git a/server/src/main/bin/startup.sh b/server/src/main/bin/startup.sh
index cae3d3b..413c957 100644
--- a/server/src/main/bin/startup.sh
+++ b/server/src/main/bin/startup.sh
@@ -1,5 +1,5 @@
 #!/bin/bash
-DIR_HOME=("/opt/openoffice.org3" "/opt/libreoffice" "/opt/libreoffice6.1" "/opt/libreoffice7.0" "/opt/libreoffice7.1" "/opt/openoffice4" "/usr/lib/openoffice" "/usr/lib/libreoffice")
+DIR_HOME=("/opt/openoffice.org3" "/opt/libreoffice" "/opt/libreoffice6.1" "/opt/libreoffice7.0" "/opt/libreoffice7.1" "/opt/openoffice4" "/usr/lib/openoffice" "/usr/lib64/libreoffice")
 FLAG=
 OFFICE_HOME=
 KKFILEVIEW_BIN_FOLDER=$(cd "$(dirname "$0")";pwd)
diff --git a/server/src/main/config/application.properties b/server/src/main/config/application.properties
index fd79f6d..b78e4c2 100644
--- a/server/src/main/config/application.properties
+++ b/server/src/main/config/application.properties
@@ -27,7 +27,7 @@ office.plugin.task.timeout = 5m
 file.dir = ${KK_FILE_DIR:default}
 #openoffice home<E8><B7><AF><E5><BE><84>
 #office.home = C:\\Program Files (x86)\\OpenOffice 4
-office.home = ${KK_OFFICE_HOME:default}
+office.home = /usr/lib64/libreoffice
```

### mvn构建

```shell
mvn clean package -DskipTests -Prelease
```

## 验证

```shell
#生成对应的
cd server/target/
tar -zxvf kkFileView-4.0.0.tar.gz
cd kkFileView-4.0.0/bin
./start.sh
```

