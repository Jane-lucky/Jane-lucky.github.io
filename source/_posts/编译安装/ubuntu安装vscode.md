---
title: ubuntu安装vscode
categories: 
- 编译安装
tags:
- vscode
---
### 在ubuntu的软件商城中安装code报错

Unable to install "Visual Studio Code": snap "code" has "install-snap" change in progress；

#### 问题原因&&解决

软件正在安装，所以不需要再次点击

```shell
ubuntu@root:~/Desktop/Doc$ snap changes
ID   Status  Spawn                   Ready                   Summary
1    Done    2022-02-23              yesterday at 11:37 CST  Initialize system state
2    Done    yesterday at 11:37 CST  yesterday at 11:37 CST  Initialize device
3    Done    yesterday at 11:42 CST  yesterday at 11:43 CST  Install "typora" snap from "latest/stable" channel
4    Done    yesterday at 14:03 CST  yesterday at 14:12 CST  Auto-refresh 4 snaps
5    Do      today at 11:06 CST      -                       Install "code" snap from "latest/stable" channel

```

### 从ubuntu软件商店下载的VScode无法输入中文，重新安装VScode 

**ubuntu 添加信任源**

```shell
ubuntu@root:~/Desktop$ wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
ubuntu@root:~/Desktop$ sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
[sudo] password for ubuntu: 
ubuntu@root:~/Desktop$ sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
ubuntu@root:~/Desktop$ rm -f packages.microsoft.gpg
ubuntu@root:~/Desktop$ sudo apt install apt-transport-https
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  gyp javascript-common libc-ares2 libjs-inherits libjs-is-typedarray libjs-psl libjs-typedarray-to-buffer libpython2-stdlib libpython2.7-minimal libpython2.7-stdlib libssl-dev libuv1-dev
  python-pkg-resources python2 python2-minimal python2.7 python2.7-minimal
Use 'sudo apt autoremove' to remove them.
The following NEW packages will be installed:
  apt-transport-https
0 upgraded, 1 newly installed, 0 to remove and 257 not upgraded.
Need to get 1,704 B of archives.
After this operation, 162 kB of additional disk space will be used.
Get:1 http://cn.archive.ubuntu.com/ubuntu focal-updates/universe amd64 apt-transport-https all 2.0.9 [1,704 B]
Fetched 1,704 B in 1s (2,988 B/s)        
Selecting previously unselected package apt-transport-https.
(Reading database ... 196975 files and directories currently installed.)
Preparing to unpack .../apt-transport-https_2.0.9_all.deb ...
Unpacking apt-transport-https (2.0.9) ...
Setting up apt-transport-https (2.0.9) ...
ubuntu@root:~/Desktop$ sudo apt update -y
ubuntu@root:~/Desktop$ sudo apt install code -y
```
下载之后重新打开，支持中文输入。



