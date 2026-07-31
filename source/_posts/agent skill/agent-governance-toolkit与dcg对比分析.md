---
title: agent-governance-toolkit 与 dcg：全面治理框架 vs 单点命令防线
categories:
- agent skill
tags:
- AI安全
- AI Agent
- dcg
- agent-governance-toolkit
- 安全工具分析
- 微软
---

# agent-governance-toolkit 与 dcg：全面治理框架 vs 单点命令防线

## 一句话概括

**agent-governance-toolkit（AGT）是微软出品的 AI Agent 全面治理框架，管的是"工具调用层的策略、身份、审计"；dcg（destructive_command_guard）是一个高性能命令守卫，管的是"破坏性 shell/git 命令执行前拦截"。一个是企业级安保体系，一个是安检门——定位不同，但可以互补。**

---

## 两个工具分别是什么？

### agent-governance-toolkit（AGT）

微软出品的开源治理工具包，定位是 **Policy enforcement（策略执行）、zero-trust identity（零信任身份）、execution sandboxing（执行沙箱）、reliability engineering（可靠性工程）**，官方宣称覆盖 OWASP Agentic Top 10 全部 10 项风险。

- 安装：`pip install agent-governance-toolkit[full]`
- 核心用法：用 `govern()` 包装任意工具函数，每次调用都经过策略引擎检查

```python
from agentmesh.governance import govern

safe_tool = govern(my_tool, policy="policy.yaml")  # 每次调用都检查、记录、强制
```

```yaml
# policy.yaml
apiVersion: governance.toolkit/v1
name: production-policy
default_action: allow
rules:
  - name: block-destructive
    condition: "action.type in ['drop', 'delete', 'truncate']"
    action: deny
  - name: require-approval-for-send
    condition: "action.type == 'send_email'"
    action: require_approval
    approvers: ["security-team"]
```

- 多语言 SDK：TypeScript / .NET / Rust / Go
- 支持 MCP server 集成，Claude Code 可装为插件
- 关键特性：策略引擎（YAML 规则）、人工审批流（require_approval + approvers）、防篡改审计日志、零信任身份（回答"哪个 agent 干的"）

### destructive_command_guard（dcg）

Dicklesworthstone 开源的命令守卫，定位是 **"在破坏性命令执行之前拦截它们"** 的高性能 Hook。支持 Claude Code、Codex CLI、Gemini CLI、Copilot CLI、Cursor、Grok、OpenCode、Aider 等主流 AI 编程工具。

- 安装：`curl -fsSL ".../install.sh" | bash -s -- --easy-mode`
- 底层 Rust + SIMD 加速，亚毫秒延迟
- 开箱即用：默认阻止 `git reset --hard`、`rm -rf ./src`、`DROP TABLE users` 等
- 50+ 安全规则包：数据库、Kubernetes、Docker、AWS/GCP/Azure、Terraform 等
- 智能上下文检测：`grep "rm -rf"`（查数据）不拦，`rm -rf /`（执行）拦
- Heredoc/内联脚本扫描：能发现 `python -c "os.remove(...)"` 这类隐藏破坏

---

## 核心区别对比

| 维度 | **agent-governance-toolkit (AGT)** | **destructive_command_guard (dcg)** |
|---|---|---|
| 出品方 | 微软（Microsoft） | Dicklesworthstone（个人开源） |
| 定位 | AI Agent 全面治理框架 | AI 编码代理的命令级安全钩子 |
| 拦截层级 | **工具调用层**（应用代码内，可管任意工具：send_email、query_database、drop_table） | **Shell/Git 命令层**（进程执行前的 hook） |
| 实现 | Python 库 + TS/.NET/Rust/Go SDK | Rust 高性能二进制 |
| 覆盖范围 | OWASP Agentic Top 10 全部 10 项 | 只覆盖"破坏性命令"这一类 |
| 身份追踪 | ✅ 零信任身份（能回答"哪个 agent 干的"） | ❌ 无 |
| 审计能力 | ✅ 防篡改审计日志（策略、请求、放行/拒绝原因全记录） | ❌ 仅终端输出拒绝面板 |
| 审批流 | ✅ `require_approval` + 指定审批人 | ❌ 直接拦截 + 建议替代命令 |
| 部署方式 | 代码集成（pip + 包装工具函数） | 零配置（curl 安装 + 自动配置 agent hooks） |
| 性能开销 | 每次工具调用走策略引擎 | 亚毫秒（SIMD 加速） |
| 上手难度 | 需要写策略、改代码 | 装完即用 |

---

## 设计哲学差异

### AGT：不跟 prompt 较劲

AGT 的核心理念是：**"请遵守规则"只是对一个随机性系统的礼貌请求**。微软引用 OWASP LLM01:2025 和 ICLR 2025 论文（对 GPT-4o、Claude 3 等模型的自适应攻击成功率 100%）说明：模型层的防御本质上是概率性的，不可靠。

所以 AGT 选择在**确定性应用代码**中拦截每一次工具调用——策略引擎拒绝的动作不是"不太可能发生"，而是**结构性不可能发生**。这是"请求 agent 表现好"与"让 agent 无法作恶"之间的本质区别。

### dcg：抓住唯一有效的干预窗口

dcg 的切入点是运行时命令拦截：命令已经生成但还没执行，这中间有几百微秒的空隙。它不试图理解 agent 的"意图"，只做模式匹配——命令是否匹配危险模式库，匹配就拦。

它的设计约束很明确：

| 硬约束 | dcg 的应对 |
|---|---|
| 不能拖慢 agent 工作流 | Rust + SIMD，亚毫秒延迟 |
| 不能误伤正常操作 | 智能上下文检测（区分"查 rm -rf"和"执行 rm -rf"） |
| 不能有漏网之鱼 | 50+ 规则包 + heredoc/内联脚本扫描 |
| 不能依赖 LLM 自觉 | 进程级 Hook，与模型无关 |

---

## 适用场景

### 选 AGT 当主力

- **多 Agent 系统**：多个 agent 共享 API key，出事需要定位"哪个 agent 干的"
- **需要监管合规**：审计人员要防篡改的决策记录
- **工具面广**：不止 shell，还要管 send_email、数据库、Web 请求等
- **需要人工审批流**：高危操作必须指定审批人签字
- **已用 Python/TS/.NET 技术栈**，愿意做代码集成

### 选 dcg 当主力

- **个人开发者 / 小团队**：用 Claude Code、Codex 等 AI 编程工具，怕手滑删库
- **要零配置**：装完自动接入所有已装 agent 的 hooks
- **只要守住命令破坏这一条线**：git reset --hard、rm -rf、DROP TABLE
- **对延迟敏感**：亚毫秒级，完全无感
- **不想改业务代码**

---

## 两者能组合吗？

**能，而且是推荐的组合方式。**

- **dcg 做系统级硬防线**：无论 agent 是什么、prompt 怎么被注入，Shell 执行层永远有一道物理闸门。它不依赖任何框架，是最后一道保险。
- **AGT 做治理中台**：在工具调用层统一策略、身份、审计、审批，覆盖 dcg 管不到的工具（邮件、数据库、Web）和管不了的问题（谁干的、为什么放行、如何追溯）。

一个形象的比喻：dcg 是楼下的保安，AGT 是整栋楼的安防中控——保安负责拦住带刀的人，中控负责门禁、监控、审批和事后追溯。两者各司其职，不冲突。

> 注意：如果你的 AgentGuard 方案已经用 dcg 作为系统级硬规则，要补的正是 AGT 提供的"身份 + 审计 + 审批"这三块。

---

## 结论与选型建议

| 你的情况 | 建议 |
|---|---|
| 个人用 AI 编程工具，怕误删 | 装 dcg 就够了 |
| 企业多 Agent 系统，要合规审计 | 上 AGT |
| 已有 dcg，想补身份/审计/审批 | AGT 是天然补位 |
| 想要"命令防线 + 治理中台"双保险 | dcg + AGT 组合 |

**一句话总结：dcg 解决"这条命令能不能执行"，AGT 解决"这个 agent 该不该做这件事、做了有没有记录"。问题层级不同，不是替代关系，是纵深防御的不同层。**

---

## 参考链接

- [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit)
- [Dicklesworthstone/destructive_command_guard](https://github.com/Dicklesworthstone/destructive_command_guard)
- [dcg 安全纵深分析：它防得住什么，防不住什么](/2026/07/29/agent%20skill/dcg-安全纵深分析/)
