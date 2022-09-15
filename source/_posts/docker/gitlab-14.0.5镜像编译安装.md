---
title: gitlab-14.0.5镜像编译安装
categories: 
- docker
tags:
- gitlab
---

*注:其中CE和EE的安装包括镜像构建方式相同*

## 直接安装gitlab

```
curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | bash
apt-get install gitlab-ee=14.0.5-ee.0
```

## 下载gitlab

```
wget --content-disposition https://packages.gitlab.com/gitlab/gitlab-ee/packages/ubuntu/focal/gitlab-ee_14.0.5-ee.0_arm64.deb/download.deb
```

获取gitlab源码

```shell
[root@ecs-5e66 gitlab]$ git clone https://gitlab.com/gitlab-org/omnibus-gitlab.git
Cloning into 'omnibus-gitlab'...
remote: Enumerating objects: 148163, done.
remote: Counting objects: 100% (16/16), done.
remote: Compressing objects: 100% (16/16), done.
remote: Total 148163 (delta 8), reused 0 (delta 0), pack-reused 148147
Receiving objects: 100% (148163/148163), 24.69 MiB | 6.92 MiB/s, done.
Resolving deltas: 100% (94777/94777), done.
[root@ecs-5e66 gitlab]$ cd omnibus-gitlab/
[root@ecs-5e66 omnibus-gitlab]$ git checkout 14.0.5+ee.0
Note: checking out '14.0.5+ee.0'.
....

HEAD is now at fe10a61... Update VERSION to 14.0.5-ee

```

## 构建gitlab

```shell
#切换分支
[root@ecs-5e66 omnibus-gitlab]$ cd docker
[root@ecs-5e66 docker]$
[root@ecs-5e66 docker]$ cat << EOF > RELEASE
> RELEASE_PACKAGE=gitlab-ee
> RELEASE_VERSION=14.0.5-ee
> DOWNLOAD_URL=https://packages.gitlab.com/gitlab/gitlab-ee/packages/ubuntu/focal/gitlab-ee_14.0.5-ee.0_arm64.deb/download.deb
#需要添加依赖libatomic1
[root@ecs-5e66 docker]$ git diff
diff --git a/docker/Dockerfile b/docker/Dockerfile
index d07c1f4..602d412 100644
--- a/docker/Dockerfile
+++ b/docker/Dockerfile
@@ -14,6 +14,7 @@ RUN apt-get update -q \
       openssh-server \
       tzdata \
       wget \
+      libatomic1 \
     && rm -rf /var/lib/apt/lists/*

 # Use BusyBox
[root@ecs-5e66 docker]$ docker build -t gitlab/gitlab-ee:14.0.5 .
Sending build context to Docker daemon  28.67kB
Step 1/18 : FROM ubuntu:20.04
 ---> d5ca7a445605
Step 2/18 : MAINTAINER GitLab Inc. <support@gitlab.com>
 ---> Using cache
 ---> fbceb05a9c47
Step 3/18 : SHELL ["/bin/sh", "-c"]
 ---> Using cache
 ---> acf3fce3b499
Step 4/18 : ENV LANG=C.UTF-8
......
Step 18/18 : HEALTHCHECK --interval=60s --timeout=30s --retries=5 CMD /opt/gitlab/bin/gitlab-healthcheck --fail --max-time 10
 ---> Running in 5b6cac9a902a
Removing intermediate container 5b6cac9a902a
 ---> 9bb5a07d8303
Successfully built 9bb5a07d8303
Successfully tagged gitlab/gitlab-ee:14.0.5
```