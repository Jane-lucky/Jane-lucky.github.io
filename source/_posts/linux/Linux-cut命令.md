---
title: linux 常见文本处理命令
categories: 
- linux
tags:
- linux
---

## 文本处理

| 类型           | 命令            |
| -------------- | --------------- |
| 查看文件       | cat、more、less |
| 文件摘选       | head、tail      |
| 提取文件内容   | cut、awk、grep  |
| 文件排序与比较 | wc、sort、diff  |
| 文本操作工具   | sed、tr         |

## CUT

文件内容的查看，显示行中的指定部分，删除文件中的指定字段。

cut的工作就是“剪”，具体的说就是在文件中负责剪切数据用的。cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出。

```shell
Mandatory arguments to long options are mandatory for short options too.
  -b, --bytes=LIST        select only these bytes
  -c, --characters=LIST   select only these characters
  -d, --delimiter=DELIM   use DELIM instead of TAB for field delimiter
  -f, --fields=LIST       select only these fields;  also print any line
                            that contains no delimiter character, unless
                            the -s option is specified
  -n                      with -b: don't split multibyte characters
      --complement        complement the set of selected bytes, characters
                            or fields
  -s, --only-delimited    do not print lines not containing delimiters
      --output-delimiter=STRING  use STRING as the output delimiter
                            the default is to use the input delimiter
      --help     display this help and exit
      --version  output version information and exit
```

### 实例

```shell
[root@k8s-node1 localhost]# cat test.txt
No Name Mark Percent
01 tom 69 91
02 jack 71 87
03 alex 68 98
[root@k8s-node1 localhost]# cut -f2 -d" " test.txt
Name
tom
jack
alex
[root@k8s-node1 localhost]# cut -f2- -d" " test.txt
Name Mark Percent
tom 69 91
jack 71 87
alex 68 98
[root@k8s-node1 localhost]# cut -c 2 test.txt
o
1
2
3

```