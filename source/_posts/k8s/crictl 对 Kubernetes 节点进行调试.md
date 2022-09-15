---
title: crictl 对 Kubernetes 节点进行调试
categories: 
- k8s
tags:
- k8s
- kind
---



CRI 是一个插件接口，它使 kubelet 能够使用各种容器运行时，无需重新编译集群组件。

你需要在集群中的每个节点上都有一个可以正常工作的容器运行时， 这样kubelet 能启动pod及其容器。

而crictl是CRI兼容的容器运行时命令行接口。使用它来检查和调试kubernetes节点上的容器运行时和应用程序。

# 命令用法

```shell
root@kind-control-plane3:/# crictl help
NAME:
   crictl - client for CRI

USAGE:
   crictl [global options] command [command options] [arguments...]

VERSION:
   v1.24.0

COMMANDS:
   attach              Attach to a running container
   create              Create a new container
   exec                Run a command in a running container
   version             Display runtime version information
   images, image, img  List images
   inspect             Display the status of one or more containers
   inspecti            Return the status of one or more images
   imagefsinfo         Return image filesystem info
   inspectp            Display the status of one or more pods
   logs                Fetch the logs of a container
   port-forward        Forward local port to a pod
   ps                  List containers
   pull                Pull an image from a registry
   run                 Run a new container inside a sandbox
   runp                Run a new pod
   rm                  Remove one or more containers
   rmi                 Remove one or more images
   rmp                 Remove one or more pods
   pods                List pods
   start               Start one or more created containers
   info                Display information of the container runtime
   stop                Stop one or more running containers
   stopp               Stop one or more running pods
   update              Update one or more running containers
   config              Get and set crictl client configuration options
   stats               List container(s) resource usage statistics
   statsp              List pod resource usage statistics
   completion          Output shell completion code
   help, h             Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --config value, -c value            Location of the client config file. If not specified and the default does not exist, the program's directory is searched as well (default: "/etc/crictl.yaml") [$CRI_CONFIG_FILE]
   --debug, -D                         Enable debug mode (default: false)
   --image-endpoint value, -i value    Endpoint of CRI image manager service (default: uses 'runtime-endpoint' setting) [$IMAGE_SERVICE_ENDPOINT]
   --runtime-endpoint value, -r value  Endpoint of CRI container runtime service (default: uses in order the first successful one of [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]). Default is now deprecated and the endpoint should be set instead. [$CONTAINER_RUNTIME_ENDPOINT]
   --timeout value, -t value           Timeout of connecting to the server in seconds (e.g. 2s, 20s.). 0 or less is set to default (default: 2s)
   --help, -h                          show help (default: false)
   --version, -v                       print the version (default: false)

```



## 镜像

```shell
root@kind-control-plane3:/# crictl image -h
NAME:
   crictl images - List images
#获取宿主机中的镜像
USAGE:
   crictl images [command options] [REPOSITORY[:TAG]]

OPTIONS:
   --digests                 Show digests (default: false)
   --no-trunc                Show output without truncating the ID (default: false)
   --output value, -o value  Output format, One of: json|yaml|table
   #显示image的sha256 ID
   --quiet, -q               Only show image IDs (default: false)
   --verbose, -v             Show verbose info for images (default: false)
   --help, -h                show help (default: false)

```

## pod

```shell
root@kind-control-plane3:/# crictl pods -h
NAME:
   crictl pods - List pods

USAGE:
   crictl pods [command options] [arguments...]

OPTIONS:
   --id value                filter by pod id
   #根据标签打印pod
   --label value             filter by key=value label  (accepts multiple inputs)
   --last value, -n value    Show last n recently created pods. Set 0 for unlimited (default: 0)
   --latest, -l              Show the most recently created pod (default: false)
   #根据名称显示pod
   --name value              filter by pod name regular expression pattern
   --namespace value         filter by pod namespace regular expression pattern
   --no-trunc                Show output without truncating the ID (default: false)
   --output value, -o value  Output format, One of: json|yaml|table (default: "table")
   --quiet, -q               list only pod IDs (default: false)
   --state value, -s value   filter by pod state
   --verbose, -v             show verbose info for pods (default: false)
   --help, -h                show help (default: false)

```

## 在正在执行的容器上面执行命令

```shell
#查看运行的pod
root@kind-worker2:/# crictl pods
POD ID              CREATED             STATE               NAME                    NAMESPACE           ATTEMPT             RUNTIME
5fb86aa7066e8       44 minutes ago      Ready               nginx-76d6c9b8c-q9vbp   default             0                   (default)
a4add35241344       4 hours ago         Ready               kube-proxy-6447g        kube-system         0                   (default)
403d98dd85f0e       4 hours ago         Ready               kindnet-5mk2k           kube-system         0                   (default)
#查看运行的容器
root@kind-worker2:/# crictl ps
CONTAINER           IMAGE               CREATED             STATE               NAME                ATTEMPT             POD ID              POD
18cad97f205ca       2b7d6430f78d4       44 minutes ago      Running             nginx               0                   5fb86aa7066e8       nginx-76d6c9b8c-q9vbp
eb989888bde0d       d921cee849482       4 hours ago         Running             kindnet-cni         0                   403d98dd85f0e       kindnet-5mk2k
476b9aa0e666e       c12a8a85ef17f       4 hours ago         Running             kube-proxy          0                   a4add35241344       kube-proxy-6447g
#在运行的容器上执行命令
root@kind-worker2:/# crictl exec -i -t 18cad97f205ca ls
bin  boot  dev  docker-entrypoint.d  docker-entrypoint.sh  etc  home  lib  lib64  media  mnt  opt  proc  product_name  product_uuid  root  run  sbin  srv  sys  tmp  usr  var
#查看容器日志
root@kind-worker2:/# crictl logs 18cad97f205ca
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
......

```