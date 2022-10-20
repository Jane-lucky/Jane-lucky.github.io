---
title: ingress-nginx安装部署
categories: 
- k8s
tags:
- k8s
- ingress-nginx
---



# ingress-nginx 1.1.1

环境:

Ubuntu 20.04 

k8s v1.23.4

Arch:x86、arm均可（需要更换对应架构的镜像）

## 安装

下载部署文件，可直接[获取](),该yaml已修改：

```shell
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

修改文件:

- 修改镜像，文件中的镜像本地无法获取，需要修改成国内的镜像，本文档采用阿里的镜像。
- 添加`hostNetwork: true`属性，确保直接使用 K8s 物理机的 DNS 来解析域名，而不再使用 K8s 内部的 DNS 来解析域名。
- 修改svc类型为`nodePort`类型。

```
root@master:/data# cat deploy.yaml | grep image:
329:          image: registry.cn-hangzhou.aliyuncs.com/google_containers/nginx-ingress-controller:v1.1.0
611:          image: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-webhook-certgen:v1.1.1
663:          image: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-webhook-certgen:v1.1.1


root@master:/data# cat deploy.yaml | grep host
325:      hostNetwork: true

root@master:/data/jiatong# cat deploy.yaml | grep type -n
250:  type: ClusterIP
276:  type: NodePort
```

部署成功

```shell
root@master:/data# kubectl apply -f deploy.yaml
root@master:/data# kubectl get po,svc -n ingress-nginx -o wide
NAME                                            READY   STATUS      RESTARTS   AGE   IP               NODE   NOMINATED NODE   READINESS GATES
pod/ingress-nginx-admission-create-rvrbm        0/1     Completed   0          19m   10.244.167.157   node   <none>           <none>
pod/ingress-nginx-admission-patch-44llj         0/1     Completed   1          19m   10.244.167.156   node   <none>           <none>
pod/ingress-nginx-controller-85b88695bf-j9m7g   1/1     Running     0          19m   10.100.93.157    node   <none>           <none>

NAME                                         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE   SELECTOR
service/ingress-nginx-controller             NodePort    10.100.205.184   <none>        80:30052/TCP,443:30149/TCP   19m   app.kubernetes.io/component=controller,app.kubernetes.io/instance=ingress-nginx,app.kubernetes.io/name=ingress-nginx
service/ingress-nginx-controller-admission   ClusterIP   10.110.114.167   <none>        443/TCP                      19m   app.kubernetes.io/component=controller,app.kubernetes.io/instance=ingress-nginx,app.kubernetes.io/name=ingress-nginx

```

## 测试验证

`app-deployment.yaml`、`ingress-http.yaml`参见文末

```shell
root@master:/data# kubectl apply -f app-deployment.yaml
root@master:/data# kubectl apply -f ingress-http.yaml
#查看状态
root@master:/data# kubectl get po,svc -o wide
NAME                                     READY   STATUS    RESTARTS   AGE   IP               NODE   NOMINATED NODE   READINESS GATES
pod/nginx-deployment-6975f7f8b5-bpkdp    1/1     Running   0          41h   10.244.167.133   node   <none>           <none>

NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE   SELECTOR
service/kubernetes       ClusterIP   10.96.0.1        <none>        443/TCP    62d   <none>
service/nginx-service    ClusterIP   10.104.236.179   <none>        80/TCP     41h   app=nginx-app
root@master:/data# kubectl get ing
NAME           CLASS    HOSTS   ADDRESS          PORTS   AGE
ingress-http   <none>   *       10.100.205.184   80      22m
root@master:/data# curl -I 10.100.93.157
HTTP/1.1 200 OK
Date: Thu, 20 Oct xxxx 02:14:06 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 25 Jan xxxx 15:03:52 GMT
ETag: "61f01158-267"
Accept-Ranges: bytes
```

## 总结

1. ingress在部署时添加`hostNetwork: true`参数：

- 添加host名称：需要master节点配置/etc/hosts,域名（自己的虚拟域名）可以访问，ip访问失效

- 不添加host参数：ip成功访问，域名在配置/etc/hosts之后访问成功

2. ingress在部署时未添加`hostNetwork: true`参数：均不能访问

## 验证文件

`app-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: default
spec:
  selector:
    matchLabels:
      app: nginx-app
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.21.6
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: default
spec:
  selector:
    app: nginx-app
  ports:
  - name: nginx-port
    port: 80
    targetPort: 80
    protocol: TCP
```

`ingress-http.yaml`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-http
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  #- host: nginx.mytest.org
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
```