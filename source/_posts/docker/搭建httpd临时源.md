---
title: 搭建httpd临时源
categories: 
- docker
tags:
- httpd

---

# docker搭建临时源

```shell
[root@ecs-5e66 jdk-src]$ docker run -itd --name httptest -v $PWD:/usr/local/apache2/htdocs/ httpd:alpine
6e4536e60d4971eb7cdeb11d22aeed64fa87d763c240373e3a82994de0358b74
[root@ecs-5e66 jdk-src]$ docker inspect httptest | grep Ip
            "IpcMode": "private",
[root@ecs-5e66 jdk-src]$ docker inspect httptest | grep IP
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.41",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
                    "IPAMConfig": null,
                    "IPAddress": "172.17.0.41",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,


```

# 获取文件

```shell
[jiatong@ecs-5e66 jdk]$ wget 172.17.0.41:80/jdk-8u301-linux-aarch64.tar.gz
--2022-09-14 14:52:17--  http://172.17.0.41/jdk-8u301-linux-aarch64.tar.gz
Connecting to 172.17.0.41:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 74283479 (71M) [application/x-gzip]
Saving to: ‘jdk-8u301-linux-aarch64.tar.gz’

100%[====================================================================================================================================================================>] 74,283,479  --.-K/s   in 0.09s

2022-09-14 14:52:17 (797 MB/s) - ‘jdk-8u301-linux-aarch64.tar.gz’ saved [74283479/74283479]
```

