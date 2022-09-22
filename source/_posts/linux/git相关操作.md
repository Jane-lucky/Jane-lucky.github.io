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

# .gitignore

配置规则不生效，因为`.gitignore`只能忽略那些原来没有被track的文件，如果文件已经被纳入了版本管理，该文件内容是不生效的。

```shell
git rm -r --cached .
git add .
git commit -m "update .gitignore"
```

`.gitignore`文件内容

```.gitignore
_config.yml
.gitignore
.deploy_git/
```

