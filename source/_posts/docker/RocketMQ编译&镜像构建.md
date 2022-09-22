---
title: Aarch64编译RocketMQ 4.7.1&镜像构建
categories: 
- docker
tags:
- RocketMQ
hide: true
---



# 编译

## 依赖下载安装

```shell
yum install java-1.8.0-openjdk* -y
#maven安装
wget https://archive.apache.org/dist/maven/maven-3/3.6.1/binaries/apache-maven-3.6.1-bin.tar.gz
tar -zxvf apache-maven-3.6.1-bin.tar.gz
rm -rf /usr/local/maven
mv apache-maven-3.6.1 /usr/local/maven
#vim /etc/profile 可采用命令追加
MAVEN_HOME=/usr/local/maven
export PATH=${MAVEN_HOME}/bin:$PATH
source /etc/profile
mvn -v
```

## 编译安装

```shell
wget -c https://github.com/apache/rocketmq/archive/refs/tags/rocketmq-all-4.7.1.tar.gz
tar -xf rocketmq-all-4.7.1.tar.gz
cd rocketmq-rocketmq-all-4.7.1
mvn -Prelease-all -DskipTests clean install -U
```

# 镜像构建

```shell
[root@ecs-5e66 image-build]$ git clone https://github.com/apache/rocketmq-docker.git
[root@ecs-5e66 image-build]$ cd rocketmq-docker/image-build
[root@ecs-5e66 image-build]$ git diff Dockerfile-centos
diff --git a/image-build/Dockerfile-centos b/image-build/Dockerfile-centos
index 3f72e8d..00707e2 100644
--- a/image-build/Dockerfile-centos
+++ b/image-build/Dockerfile-centos
@@ -17,7 +17,7 @@

 FROM centos:7

-RUN yum install -y java-1.8.0-openjdk-devel.x86_64 unzip gettext nmap-ncat openssl, which gnupg, telnet \
+RUN yum install -y java-1.8.0-openjdk-devel unzip gettext nmap-ncat openssl, which gnupg, telnet \
  && yum clean all -y

 # FROM openjdk:8-jdk
@@ -47,17 +47,17 @@ ENV ROCKETMQ_HOME  /home/rocketmq/rocketmq-${ROCKETMQ_VERSION}
 WORKDIR  ${ROCKETMQ_HOME}

 RUN set -eux; \
-    curl -L https://archive.apache.org/dist/rocketmq/${ROCKETMQ_VERSION}/rocketmq-all-${ROCKETMQ_VERSION}-bin-release.zip -o rocketmq.zip; \
-    curl -L https://archive.apache.org/dist/rocketmq/${ROCKETMQ_VERSION}/rocketmq-all-${ROCKETMQ_VERSION}-bin-release.zip.asc -o rocketmq.zip.asc; \
+    curl -L 172.17.0.15:80/rocketmq-all-${ROCKETMQ_VERSION}-bin-release.zip -o rocketmq.zip; \
+#    curl -L https://archive.apache.org/dist/rocketmq/${ROCKETMQ_VERSION}/rocketmq-all-${ROCKETMQ_VERSION}-bin-release.zip.asc -o rocketmq.zip.asc; \
     #https://www.apache.org/dist/rocketmq/KEYS
-       curl -L https://www.apache.org/dist/rocketmq/KEYS -o KEYS; \
-       \
-       gpg --import KEYS; \
-    gpg --batch --verify rocketmq.zip.asc rocketmq.zip ; \
+#      curl -L https://www.apache.org/dist/rocketmq/KEYS -o KEYS; \
+#      \
+#      gpg --import KEYS; \
+#    gpg --batch --verify rocketmq.zip.asc rocketmq.zip ; \
     unzip rocketmq.zip ; \
        mv rocketmq*/* . ; \
        rmdir rocketmq-*  ; \
-       rm rocketmq.zip rocketmq.zip.asc KEYS
+       rm rocketmq.zip

 # add scripts
 COPY scripts/ ${ROCKETMQ_HOME}/bin/
@@ -84,7 +84,7 @@ RUN mv ${ROCKETMQ_HOME}/bin/runbroker-customize.sh ${ROCKETMQ_HOME}/bin/runbroke
 RUN export JAVA_OPT=" -Duser.home=/opt"

 # Add ${JAVA_HOME}/lib/ext as java.ext.dirs
-RUN sed -i 's/${JAVA_HOME}\/jre\/lib\/ext/${JAVA_HOME}\/jre\/lib\/ext:${JAVA_HOME}\/lib\/ext/' ${ROCKETMQ_HOME}/bin/tools.sh
+RUN sed -i 's/${JAVA_HOME}\/jre\/lib\/ext/${JAVA_HOME}\/jre\/lib\/ext:${JAVA_HOME}\/lib\/ext:\/usr\/lib\/jvm\/java-1.8.0-openjdk-1.8.0.342.b07-1.el7_9.aarch64\/jre\/lib\/ext/' ${ROCKETMQ_HOME}/bin/

 USER ${user}

[root@ecs-5e66 image-build]$ sh build-image.sh 4.5.0 centos
```

# 验证

```shell
[rocketmq@323f9159d4c7 bin]$ sh mqnamesrv &
[1] 92
[rocketmq@323f9159d4c7 bin]$ sh mqbroker -n localhost:9876 aut**ateTopicEnable=true &
[2] 131
[rocketmq@323f9159d4c7 bin]$ exit./mqadmin updateTopic -c DefaultCluster -n 127.0.0.1:9876 -t wangli-topic
[rocketmq@323f9159d4c7 bin]$ The broker[323f9159d4c7, 172.17.0.2:10911] boot success. serializeType=JSON and name server is localhost:9876
[rocketmq@323f9159d4c7 bin]$ ./mqadmin updateTopic -c DefaultCluster -n 127.0.0.1:9876 -t wangli-topic
create topic to 172.17.0.2:10911 success.

```