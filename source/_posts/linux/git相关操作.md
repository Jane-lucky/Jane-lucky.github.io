---
title: git相关操作命令
categories: 
- linux
tags:
- linux
---

# git remote

使用git remote set-url命令从SSH到HTTPS的远程URL,设置之后，可无需输入密码进行`git push`等操作

```shell
git remote set-url origin https://token@github.com/username/repositoryName
```

验证是否改变

```shell
git remote -v
origin	https://token@github.com/username/repositoryName (fetch)
origin	https://token@github.com/username/repositoryName (push)
#origin	为远程地址的别名
```

