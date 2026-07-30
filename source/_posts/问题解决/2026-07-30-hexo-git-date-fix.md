---
title: 🔧 Hexo 博客文章日期被全部刷新的解决方法
date: 2026-07-30 09:30:00
categories:
- [问题解决]
tags:
- Hexo
- Git
- GitHub Pages
- 踩坑记录
---

# 🔧 Hexo 博客文章日期被全部刷新的解决方法

## 问题现象

每次在 Hexo 博客发布一篇新文章后，git 记录里所有文章的 HTML 文件都显示为"今天修改"。上 GitHub 一看，每篇文章的修改时间都变成了今天，完全分不清哪些是新写的、哪些是以前的旧文章。

## 原因分析

Hexo 使用 `hexo generate` 命令生成静态 HTML 文件，输出到 `public/` 目录。在这个目录下：

- 每一篇文章会被重新渲染为独立的 HTML 文件
- 每篇文章的日期基于源码的 front-matter `date` 字段，**在生成的 HTML 里确实是正确的**
- 但问题是，**每次 `hexo generate` 会重新生成全部文件**——所有归档页、首页、分类页、标签页、每篇文章的 HTML，文件本身的修改时间戳都会更新

如果你的 `public/` 目录**之前被 git 跟踪过**（哪怕后来加了 `.gitignore`），git 会继续跟踪这些已经在库里的文件。所以当你 `git add` 并 `git commit` 时：

```
新文章.md          ✅ 正常变化
public/归档1.html  ❌ 也被 git 抓到变了
public/归档2.html  ❌ 也被 git 抓到变了
...242个文件全变了   😱
```

GitHub 的界面显示的是最后一次 commit 的时间，于是**所有文章看起来都变成了今天发布的**。

## 真相

**文章本身的日期（front-matter 里的 `date` 字段）并没有丢失**。hexo generate 生成的 HTML 里依然是正确的原始日期。问题出在 git 记录了 `public/` 目录下文件的时间戳变化，让你在 GitHub 上看到混乱的历史。

## 解决方案

### Step 1：确认 `.gitignore` 已有 `public/`

```bash
# 查看 .gitignore 是否已配置
cat .gitignore
```

应该包含：

```
node_modules/
public/
db.json
.DS_Store
*.log
```

### Step 2：把已跟踪的 `public/` 从 git 中移除

尽管 `.gitignore` 已经写了 `public/`，但**如果之前已经提交过 public 目录下的文件，git 会继续跟踪它们**。需要用 `git rm --cached` 解除跟踪（不会删除本地文件）：

```bash
# 从 git 跟踪中移除 public 目录（不删本地文件）
git rm -r --cached public/

# 也移除 db.json
git rm --cached db.json

# 提交清理
git commit -m "chore: untrack public/ and db.json from git"
git push
```

### Step 3：以后正确的发布流程

以后每次更新博客，按这个流程走：

```
1️⃣ 写 / 修改文章  →  source/_posts/ 下的 .md 文件
   
2️⃣ 本地生成 HTML →  hexo generate
   （public/ 会重建，但 git 不会跟踪它了）
   
3️⃣ 提交源码      →  git add . && git commit -m "add new post"
   （只提交 .md 源文件和配置变更）
   
4️⃣ 推送源分支    →  git push origin source
   
5️⃣ 部署到线上    →  hexo deploy
   （自动把 public/ 推送到 deploy 分支，GitHub Pages 读这个分支）
```

### 关键区别

| 操作 | 之前（错误） | 之后（正确） |
|------|-------------|-------------|
| `git commit` 会提交什么 | .md 源文件 + **全部 public/ 文件** | 只提交 .md 源文件和配置 |
| git 历史 | 每次 commit 所有文章日期都变 | 只有真正改过的文件 |
| 线上部署 | 靠手动推 public/ | 靠 `hexo deploy` 推 deploy 分支 |

## 额外提示

- 如果不想每次手动 `hexo generate` + `hexo deploy`，可以写一个简单的脚本或 GitHub Actions 自动执行
- 存档页、分类页、标签页每次生成都会更新——这是正常的，只要不被 git 跟踪就没问题
- 如果你的 GitHub Pages 从 `source` 分支读取（而不是 `deploy` 分支），需要检查分支设置

---

**踩坑时间：2026-07-30**  
**修复耗时：~5 分钟**  
**GitHub Pages + Hexo + git 的不离不弃组合拳，值得记录一篇 📝**
