---
tilte: vim的常用操作
categories: 
- linux
tags:
- linux
---



## 相关命令

| 操作            | 解释                           |
| --------------- | ------------------------------ |
| vim -M test.log | 以只读的方式打开，不可强制保存 |
| vim +8 test.log | 编辑打开文档，光标停留的行数   |
| vim -R test.log | 以只读的方式打开，强制保存     |
| yy或者y         | 复制一行                       |
| p               | 光标后一行粘贴                 |
| dd              | 删除                           |
| 0               | 行尾                           |
| $               | 行首                           |
| :set nu         | 显示行数                       |
| /字符串+enter   | 查找字符串                     |
| :set hlsearch   | 查找字符串高亮                 |
| n               | 查找下一个                     |
| shift+n         | 查找上一个                     |
| :1.5s/new/old/g | 替换                           |
| ctrl+r          | 还原                           |
| u               | 撤销                           |
| P               | 光标前一行插入                 |