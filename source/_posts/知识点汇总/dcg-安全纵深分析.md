---
title: dcg 安全纵深分析：它防得住什么，防不住什么
categories:
- 知识点汇总
tags:
- AI安全
- AI Agent
- dcg
- 安全工具分析
---

# dcg 安全纵深分析：它防得住什么，防不住什么

## 一句话概括

**dcg（Destructive Command Guard）是 AI 编程助手的命令安全守卫，在它擅长的领域做得很好，但对它能力边界的认知不清，比不用它更危险。**

---

## dcg 是什么？

[dcg](https://github.com/Dicklesworthstone/destructive_command_guard) 是一个高性能安全工具，作为 Hook 插入在 AI 编程助手（Claude Code、Codex、Gemini CLI、Copilot CLI、Cursor 等）和 Shell 之间。

它的工作方式很简单：Agent 每次要执行 shell 命令之前，dcg 先拦截下来，检查这条命令是否匹配预定义的"危险模式"库，匹配上了就阻止执行并提示替代方案。

底层用 Rust 实现，SIMD 加速，延迟控制在亚毫秒级别。

---

## 它的设计逻辑

把问题拆到最底层看，我们面对的核心矛盾是：

> 一个随机性系统（LLM）被允许向一个确定性系统（Shell）发送指令，而 Shell 会忠实地执行任何它收到的命令——包括那些不可逆的破坏操作。

dcg 选择的切入点是**运行时的命令拦截**，这是唯一有效的干预窗口——命令已经生成但还没执行，这中间有几百微秒的空隙。

从设计上看它必须满足几个硬约束：

| 硬约束 | dcg 的应对 | 评价 |
|---|---|---|
| 不能拖慢用户体验 | Rust + SIMD 加速，亚毫秒延迟 | ✅ |
| 不能误杀正常操作 | 白名单机制 + 规则分级 | ✅ 有 escape hatch |
| 必须开箱即用 | 核心包默认开启，不可禁用 | ✅ |
| 覆盖度要够广 | 50+ 安全包，模块化启用 | ⚠️ 大部分默认不开 |

---

## 它做对了什么

### 核心保护可靠

`core.filesystem` 和 `core.git` 两个包默认开启且**不可禁用**。这意味着最常见的破坏操作——`rm -rf`、`git reset --hard`、`git push --force`——在无配置情况下就有保护。

### 逃生机制合理

`DCG_BYPASS=1`、`dcg allow-once`、永久白名单，三级逃生设计。用户真需要跑危险命令时不会被锁死，但每次逃生都有日志记录。

### 模块化设计

安全包按领域拆分（数据库、K8s、Docker、云平台等），用户按需开启，不需要为不用场景的规则买单。

---

## 它的盲区

但任何签名匹配系统都有结构性上限。以下是我从八个角度做的穿透测试：

### 1. 多步攻击

dcg 逐条检查命令，但破坏可以分几步完成，每步单独看都不危险：

```bash
# 第一步：写脚本（看起来无害）
echo 'rm -rf / --no-preserve-root' > /tmp/x.sh

# 第二步：执行一个脚本文件（看起来也不危险）
bash /tmp/x.sh
```

更隐晦的版本是写入 Python 脚本再执行：
```bash
cat > /tmp/cleanup.py << 'EOF'
import shutil
shutil.rmtree('/home/user/project/src')
EOF
python3 /tmp/cleanup.py
```

**防御建议**：引入命令序列分析，检测"写入可执行文件 → 执行"的时序模式。

### 2. 跨语言内联

每种语言的单行命令都可以当作 shell 使用，每条绕过 dcg 的正则匹配：

```bash
python3 -c "import os; os.system('rm -rf /')"
ruby -e "system('rm -rf /')"
perl -e "system('rm -rf /')"
node -e "require('child_process').execSync('rm -rf /')"
```

dcg 声称能扫描内联脚本，但深度取决于实现——字符串拼接、变量插值、编码后的命令都可能绕过。

**防御建议**：对内联脚本做更深层的 AST 解析，而不是简单的字符串匹配。

### 3. 编译绕过

这是最彻底的绕过方式——编译执行完全不经过 Shell 的匹配路径：

```bash
# 写 C 代码（纯文本，无害）
echo '#include <stdio.h>' > /tmp/destroy.c
echo 'int main() { system("rm -rf /"); }' >> /tmp/destroy.c

# 编译（也不是危险命令）
gcc /tmp/destroy.c -o /tmp/destroy

# 执行（看起来只是一个普通程序）
/tmp/destroy    ← dcg 不拦截！
```

**防御建议**：这个问题在 Shell Hook 层面无解。更务实的方案是配合 seccomp/LSM 做系统调用级别的防护，或者让 Agent 运行在容器里。

### 4. 容器逃逸

如果 `containers.docker` 包没开（默认不开），这条命令完全放行：

```bash
docker run --rm -v /:/mnt ubuntu rm -rf /mnt
```

**防御建议**：容器相关安全包应当有更激进的默认策略，或者至少安装时提示开启。

### 5. 远程/编排执行

本地命令看起来完全无害，破坏发生在远端：

```bash
ssh other-server 'rm -rf /'
ansible all -m shell -a 'rm -rf /'
```

**防御建议**：SSH 命令的目标主机参数可以做更严格的模式匹配。

### 6. Agent 自毁防御

如果 Agent 被恶意提示词控制，它可以逐步解除 dcg 的保护：

```bash
# 写配置文件解除核心包保护
echo 'disabled_packs = ["core.git", "core.filesystem"]' >> ~/.config/dcg/config.toml

# 或积累白名单，慢慢蚕食防护边界
dcg allowlist add core.filesystem:recursive_rm -r "project cleanup"
```

**防御建议**：核心包的禁用应该要求用户手动确认，不能让 Agent 无感知关闭。

### 7. 环境变量逃生

`DCG_BYPASS=1` 作为逃生口设计合理，但这也意味着——如果 Agent 能设置环境变量，整个保护对这条命令就是 opt-out 的：

```bash
DCG_BYPASS=1 rm -rf /
```

**防御建议**：环境变量绕过至少应该产生一条高优先级告警日志。

### 8. 安全包默认不开

这是文档层面最容易被误解的点。dcg 宣称有 50+ 安全包覆盖数据库、K8s、Docker、云平台，但**没有配置文件时只启用三个核心包**。用户很容易以为"装上就全保护了"。

---

## 盲区汇总

| # | 攻击方式 | 严重度 | 本质原因 |
|---|---|---|---|
| 1 | 多步写入→执行 | 🔴 | 单命令检查，无上下文关联 |
| 2 | 跨语言内联 | 🟡 | 正则匹配深度有限 |
| 3 | 编译型攻击 | 🔴 | Shell Hook 无法拦截已编译程序 |
| 4 | 容器逃逸 | 🟡 | 安全包默认不开 |
| 5 | 远程/编排执行 | 🟡 | 本地命令安全，远端无保护 |
| 6 | Agent 自行解除防护 | 🔴 | 配置文件和环境变量可被 Agent 修改 |
| 7 | 环境变量绕过 | 🟡 | 逃生口设计，可被恶意利用 |
| 8 | 安全包范围误导 | 🟡 | 文档表述与默认行为有落差 |

---

## 真正有效的多层防御

单一工具永远不够。从底层逻辑推导，真正有效的策略应该是分层部署：

```
Layer 1：dcg — 拦截已知危险模式
    覆盖：rm -rf /、git reset --hard、DROP TABLE…
    盲区：多步攻击、编译绕过、跨语言绕过…
    
Layer 2：最小权限沙箱 — 即使漏了，破坏范围受控
    方案：Docker / Firejail / Bubblewrap / seccomp
    
Layer 3：变更预览 — 执行前让人看一眼
    方案：类似 git diff 的 "command diff"，汇总即将执行的变更
    
Layer 4：自动备份 — 最坏情况下还能恢复
    方案：定期快照、etckeeper、git auto-commit
```

每一层解决下一层的问题，没有哪一层是银弹。

---

## 使用建议

- **装，一定要装** — 它能挡住 90% 的常见意外破坏，值回票价
- **配合容器跑 Agent** — 即使 dcg 被绕过了，容器限制了爆炸半径
- **保持备份习惯** — 任何安全工具的最后一层都是"还能恢复"
- **理解边界** — 知道它防不住什么，比知道它防得住什么更重要

---

## 一张图总结

```
Agent 命令
    │
    ▼
dcg 拦截 ── 阻止 → 已知危险命令
    │
  放行
    ▼
沙箱环境 ── 限制 → 即使命令放行了，破坏范围有限
    │
    ▼
人工预览 ── 拦截 → 异常操作被肉眼发现
    │
    ▼
自动备份 ── 恢复 → 最坏情况也能回滚
```

---

## 相关链接

- [dcg GitHub 仓库](https://github.com/Dicklesworthstone/destructive_command_guard)
- [dcg 安装文档](https://github.com/Dicklesworthstone/destructive_command_guard#quick-install)
- [OWASP Agentic Top 10](https://owasp.org/www-project-agentic-top-10/)
