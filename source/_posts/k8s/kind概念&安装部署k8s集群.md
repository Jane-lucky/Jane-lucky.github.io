---
title: kind概念&安装部署k8s集群
date: 2022-09-15 09:23:08
categories: 
- k8s
tags:
- k8s
- kind
---





**kind：**kubernetes in docker。将k8s所有需要的组件，全部部署在一个docker容器中，一套开箱即用的k8s环境搭建方案

## Kind 相比于 Minikube 有什么优势呢？

**基于** [**Docker**](https://cloud.tencent.com/product/tke?from=10680) **而不是虚拟化**

Kind 不是打包一个虚拟化镜像，而是直接讲 K8S 组件运行在 Docker。带来了什么好处呢？

1. 不需要运行 GuestOS 占用资源更低。
2. 不基于虚拟化技术，可以在 VM 中使用。
3. 文件更小，更利于移植。

**支持多节点 K8S 集群和 HA**

Kind 支持多角色的节点部署，你可以通过配置文件控制你需要几个 Master 节点，几个 Worker 节点，以更好的模拟生产中的实际环境。

## 安装docker

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

## 安装kubectl(稳定最新版本 1.25.0)

```shell
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
chmod +x kubectl
mkdir -p ~/.local/bin
mv ./kubectl ~/.local/bin/kubectl
kubectl version --client
```



## 安装kind（根据kubectl的版本安装kind，不易出错可成功安装）

[Releases · kubernetes-sigs/kind · GitHub](https://github.com/kubernetes-sigs/kind/releases)

```shell
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.15.0/kind-linux-amd64
chmod +x kind
mv kind /usr/local/bin
```

## 安装一个k8s集群

```shell
[root@host-server ~]# kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.25.0) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Have a nice day! 👋
[root@host-server ~]# kubectl cluster-info --context kind-kind
Kubernetes control plane is running at https://127.0.0.1:45151
CoreDNS is running at https://127.0.0.1:45151/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.

[root@host-server home]# kind create cluster --name kind-2
Creating cluster "kind-2" ...
 ✓ Ensuring node image (kindest/node:v1.25.0) 🖼
 ✓ Preparing nodes 📦
 .....

```

## 删除集群

```
kind delete cluster
```

## 配置文件创建k8s集群

```shell
[root@host-server opt]# cat kind-config.yaml
kind: Cluster
#高版本默认是这个，版本较低的需要进行修改
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: control-plane
- role: control-plane
- role: worker
- role: worker
- role: worker
[root@host-server ~]# kind create cluster --config=kind-config.yaml
[root@host-server ~]# kind get clusters
kind
#构建成功之后node一直是notready的状态，可能是因为版本不对应
[root@host-server ~]# kubectl get node
NAME                  STATUS   ROLES           AGE     VERSION
kind-control-plane    Ready    control-plane   9m13s   v1.25.0
kind-control-plane2   Ready    control-plane   8m45s   v1.25.0
kind-control-plane3   Ready    control-plane   7m56s   v1.25.0
kind-worker           Ready    <none>          7m48s   v1.25.0
kind-worker2          Ready    <none>          7m48s   v1.25.0
kind-worker3          Ready    <none>          7m34s   v1.25.0
```

集群创建成功