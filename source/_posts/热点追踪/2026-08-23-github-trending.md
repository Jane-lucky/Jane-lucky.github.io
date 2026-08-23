---
title: GitHub Trending 聚焦（2026-08-23）
date: 2026-08-23 18:00:00
categories:
- [热点追踪, GitHub趋势]
tags: [GitHub, Trending, 开源项目, AI Agent, 开发者工具, Python, Rust, TypeScript, Go]
---

> 数据抓取时间：2026-08-23 18:06:47（北京时间）。对比基线：**2026-08-22 18:00** 同系统快照（本仓库未配置 09:00 同日全榜抓取，故以最近一次完整快照为基线）。
> 对比口径：以「单日新增星标数（stars today）」作为热度速度指标对比昨日同时刻，避免被 GitHub 榜单展示顺序误导；排名变化一并列出供参考。

## 一、今日速览

今日 GitHub Trending Daily 全榜共 **17** 个项目上榜（注：今日全榜数量偏少，约为常见 25 条的 7 成，可能与周末流量或 GitHub 抽样有关）。语言分布：
- TypeScript：3 个
- Python：3 个
- Rust：2 个
- Shell：2 个
- Go：2 个
- JavaScript：1 个
- Mojo：1 个
- Unknown：1 个
- Kotlin：1 个
- HTML：1 个

**一句话趋势**：今日榜单被 **AI 编程基础设施** 与 **开发者工具链** 主导——OpenAI Codex、Claude Code、n8n、Plane 等从「昨日未上榜」重新冲回视野；同时腾讯 AI-Infra-Guard、Sub2API 等安全/聚合类工具崭露头角。整体是「老牌 AI 工具回潮 + 基础设施补位」的格局。

## 二、与基线对比（2026-08-22 18:00）

- 🆕 **新增项目**：8 个
- 🔁 **仍在榜**：9 个（其中 🟢上升 2 / 🔴下降 7 / ➖持平 0）

### 全榜项目状态一览（按今日榜单顺序）

| # | 项目 | 语言 | 今日新增 ⭐ | 总星标 | 状态 |
|----|------|------|-----------|--------|------|
| 1 | [openai/codex](https://github.com/openai/codex) | Rust | +1,544 | 114,506 | 🆕 新增 |
| 2 | [sponsors/mattpocock](https://github.com/sponsors/mattpocock) | Shell | +2,683 | 232,971 | 🔴 下降（-679） |
| 3 | [sponsors/affaan-m](https://github.com/sponsors/affaan-m) | JavaScript | +411 | 242,320 | 🟢 上升（+54） |
| 4 | [sponsors/obra](https://github.com/sponsors/obra) | Shell | +592 | 276,426 | 🔴 下降（-198） |
| 5 | [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) | Go | +278 | 38,936 | 🆕 新增 |
| 6 | [makeplane/plane](https://github.com/makeplane/plane) | TypeScript | +263 | 57,393 | 🆕 新增 |
| 7 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | +149 | 202,006 | 🆕 新增 |
| 8 | [anthropics/claude-code](https://github.com/anthropics/claude-code) | Python | +127 | 142,689 | 🆕 新增 |
| 9 | [sponsors/AprilNEA](https://github.com/sponsors/AprilNEA) | Rust | +959 | 14,308 | 🔴 下降（-421） |
| 10 | [modular/modular](https://github.com/modular/modular) | Mojo | +395 | 28,910 | 🔴 下降（-518） |
| 11 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | Unknown | +315 | 205,533 | 🆕 新增 |
| 12 | [mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer) | Kotlin | +441 | 2,638 | 🔴 下降（-612） |
| 13 | [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | HTML | +829 | 134,112 | 🆕 新增 |
| 14 | [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | Go | +104 | 110,600 | 🟢 上升（+39） |
| 15 | [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | +286 | 4,736 | 🔴 下降（-102） |
| 16 | [PostHog/posthog](https://github.com/PostHog/posthog) | Python | +286 | 38,733 | 🔴 下降（-49） |
| 17 | [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard) | Python | +150 | 5,632 | 🆕 新增 |

> 💡 说明：GitHub Trending 展示顺序并非严格按「单日新增星标」排序，故部分项目「排名下降」但「单日星标速度上升」（如 microsoft/TypeScript 65→104）属正常。本表状态以**星标速度**为准。

### 🆕 新增项目（相对昨日基线）

- 🆕 - **[openai/codex](https://github.com/openai/codex)** `Rust` ⭐ +1,544（总 114,506） — Lightweight coding agent that runs in your terminal
- 🆕 - **[ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev)** `HTML` ⭐ +829（总 134,112） — A list of SaaS, PaaS and IaaS offerings that have free tiers of interest to devops and infradev
- 🆕 - **[multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)** `Unknown` ⭐ +315（总 205,533） — A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls.
- 🆕 - **[Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api)** `Go` ⭐ +278（总 38,936） — Sub2API 一站式开源中转服务，让 Claude、Openai 、Gemini、Grok订阅统一接入，支持拼车共享，更高效分摊成本，原生工具无缝使用。
- 🆕 - **[makeplane/plane](https://github.com/makeplane/plane)** `TypeScript` ⭐ +263（总 57,393） — 🔥🔥🔥 Open-source Jira, Linear, Monday, and ClickUp alternative. Plane is a modern project management platform to manage tasks, sprints, docs, and triage.
- 🆕 - **[Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)** `Python` ⭐ +150（总 5,632） — A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation.
- 🆕 - **[n8n-io/n8n](https://github.com/n8n-io/n8n)** `TypeScript` ⭐ +149（总 202,006） — Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.
- 🆕 - **[anthropics/claude-code](https://github.com/anthropics/claude-code)** `Python` ⭐ +127（总 142,689） — Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows - all through natural language commands.

### 🟢 上升 / 🔴 下降 / ➖ 持平（昨日已在榜项目）

- 🔴 下降 sponsors/mattpocock：单日星标 3362 → 2683（-679），榜单排名 1 → 2
- 🔴 下降 sponsors/AprilNEA：单日星标 1380 → 959（-421），榜单排名 4 → 9
- 🔴 下降 sponsors/obra：单日星标 790 → 592（-198），榜单排名 7 → 4
- 🔴 下降 mahlernim/google-timeline-visualizer：单日星标 1053 → 441（-612），榜单排名 2 → 12
- 🟢 上升 sponsors/affaan-m：单日星标 357 → 411（+54），榜单排名 11 → 3
- 🔴 下降 modular/modular：单日星标 913 → 395（-518），榜单排名 10 → 10
- 🔴 下降 cursor/plugins：单日星标 388 → 286（-102），榜单排名 9 → 15
- 🔴 下降 PostHog/posthog：单日星标 335 → 286（-49），榜单排名 5 → 16
- 🟢 上升 microsoft/TypeScript：单日星标 65 → 104（+39），榜单排名 6 → 14

## 三、重点新增项目深度解析

以下挑选今日 8 个新增项目中涨幅最高、且最具「场景级应用价值」的几个，做亮点与应用场景拆解。

### 1. openai/codex — OpenAI 官方终端编程 Agent（Rust）

**项目地址**：https://github.com/openai/codex
**今日新增**：1,544 ⭐ ｜ **总星标**：114,506 ｜ **语言**：Rust
**简介**：Lightweight coding agent that runs in your terminal

**趋势介绍**

OpenAI 出品的轻量级命令行编程 Agent，直接在终端里理解代码库、执行任务、写测试、跑 git 流程。今日新增 **1,544** ⭐，是今日全榜涨幅最高的项目。

**主要特性**

- 终端原生：无需离开 shell 即可完成编码、重构、PR 生成
- Rust 实现，启动快、资源占用低
- 理解整个代码库上下文，适合多文件级改动
- 可与 CI、review 流程集成，自动化常规开发

**如何使用**

```bash
# 官方仓库（含安装说明）
git clone https://github.com/openai/codex
```

**应用场景**

- **研发团队**：把 routine 任务（补测试、修 lint、生成脚手架）交给 Agent
- **独立开发者**：加速原型开发与 bug 修复
- **平台工程**：嵌入内部开发流水线，提升交付速度

### 2. ripienaar/free-for-dev — 开发者免费资源汇总榜单（HTML）

**项目地址**：https://github.com/ripienaar/free-for-dev
**今日新增**：829 ⭐ ｜ **总星标**：134,112 ｜ **语言**：HTML
**简介**：A list of SaaS, PaaS and IaaS offerings that have free tiers of interest to devops and infradev

**趋势介绍**

知名的「free-for.dev」清单——汇总对 DevOps / 基础设施 / SaaS 开发者友好的、带免费档的云服务（SaaS/PaaS/IaaS）。今日新增 **829** ⭐。

**主要特性**

- 覆盖数百个带免费档的云服务，按类别组织
- 社区驱动、持续更新，是选型「先试后买」的第一站
- 纯静态站点，检索方便

**如何使用**

```bash
# 直接浏览在线清单
# https://free-for.dev
```

**应用场景**

- **初创团队**：零成本搭 MVP，按成长再付费
- **独立开发者 / 学生**：白嫖数据库、邮件、监控、CI 等基础设施
- **技术选型**：快速对比同类服务的免费额度

### 3. multica-ai/andrej-karpathy-skills — Karpathy 风格编码规范（CLAUDE.md）

**项目地址**：https://github.com/multica-ai/andrej-karpathy-skills
**今日新增**：315 ⭐ ｜ **总星标**：205,533 ｜ **语言**：Unknown
**简介**：A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls.

**趋势介绍**

一份从 Andrej Karpathy 关于「LLM 编码常见陷阱」的观察中提炼出的单文件 `CLAUDE.md`，放进仓库即可改善 Claude Code 等编程 Agent 的行为。语言标记为 Unknown（实为 Markdown/Skills 配置）。今日新增 **315** ⭐。

**主要特性**

- 单文件即插即用，零依赖
- 把知名工程实践沉淀为可复用的 Agent 指令
- 适合作为团队编码规范的起点

**如何使用**

```bash
# 将仓库内的 CLAUDE.md 复制到你的项目根目录即可生效
cp CLAUDE.md your-project/
```

**应用场景**

- **使用 Claude Code / Codex 的团队**：统一 AI 编码风格、规避常见坑
- **技术负责人**：把工程规范「编码」进 Agent
- **学习者**：从 Karpathy 的经验中理解 LLM 编码陷阱

### 4. Wei-Shaw/sub2api — 多订阅统一中转网关（Go）

**项目地址**：https://github.com/Wei-Shaw/sub2api
**今日新增**：278 ⭐ ｜ **总星标**：38,936 ｜ **语言**：Go
**简介**：Sub2API 一站式开源中转服务，让 Claude、Openai 、Gemini、Grok订阅统一接入，支持拼车共享，更高效分摊成本，原生工具无缝使用。

**趋势介绍**

一站式开源中转服务，把 Claude / OpenAI / Gemini / Grok 等订阅统一接入，支持「拼车共享」更高效地分摊成本，原生工具（如 Claude Code）可无缝对接。今日新增 **278** ⭐。

**主要特性**

- 多厂商订阅统一为兼容 API 端点
- 支持拼车/共享，降低个人与团队使用成本
- 原生兼容 Claude Code、Codex 等工具的调用方式
- Go 实现，易自托管部署

**如何使用**

```bash
# 详见项目 README 的自托管部署指引
git clone https://github.com/Wei-Shaw/sub2api
```

**应用场景**

- **个人开发者**：用一份配置打通多家模型订阅
- **小团队**：拼车分摊 API 成本
- **自建工具链**：把异构订阅收敛为统一网关

### 5. makeplane/plane — 开源版 Jira / Linear（TypeScript）

**项目地址**：https://github.com/makeplane/plane
**今日新增**：263 ⭐ ｜ **总星标**：57,393 ｜ **语言**：TypeScript
**简介**：🔥🔥🔥 Open-source Jira, Linear, Monday, and ClickUp alternative. Plane is a modern project management platform to manage tasks, sprints, docs, and triage.

**趋势介绍**

现代项目管理平台，对标 Jira、Linear、Monday、ClickUp，支持任务、Sprint、文档与分诊（triage）。今日新增 **263** ⭐。

**主要特性**

- 开源可自托管，数据自主可控
- 看板、Sprint、文档、Issue 跟踪一体化
- React + TypeScript 前端，PostgreSQL 存储，Docker 一键部署

**如何使用**

```bash
docker pull makeplane/plane-selfhosted
# 参考官方 docker-compose 启动
```

**应用场景**

- **团队**：用开源方案替代付费 PM 工具
- **注重数据主权的企业**：私有化部署项目管理
- **敏捷团队**：Sprint + 看板 + 文档闭环

### 6. Tencent/AI-Infra-Guard — 全栈 AI 红队安全平台（Python）

**项目地址**：https://github.com/Tencent/AI-Infra-Guard
**今日新增**：150 ⭐ ｜ **总星标**：5,632 ｜ **语言**：Python
**简介**：A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation.

**趋势介绍**

腾讯开源的全栈 AI 红队平台，通过 Agent Scan、Skills Scan、MCP Scan、AI Infra Scan 与 LLM 越狱评估来保障 AI 生态安全。今日新增 **150** ⭐。

**主要特性**

- 覆盖 Agent / Skills / MCP / 基础设施多层风险面
- 内置 LLM 越狱（jailbreak）评估
- 开源可自托管，便于内网安全审计

**如何使用**

```bash
# 详见项目 README 的部署指引
git clone https://github.com/Tencent/AI-Infra-Guard
```

**应用场景**

- **企业安全团队**：对内部 AI 系统做合规红队演练
- **AI 平台厂商**：上线前自动发现基础设施与 prompt 注入漏洞
- **审计 / 咨询**：标准化 AI 安全评估流程

### 7. n8n-io/n8n — 带原生 AI 能力的可视化工作流自动化（TypeScript）

**项目地址**：https://github.com/n8n-io/n8n
**今日新增**：149 ⭐ ｜ **总星标**：202,006 ｜ **语言**：TypeScript
**简介**：Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.

**趋势介绍**

Fair-code 工作流自动化平台，原生支持 AI，可视觉化搭建 + 自定义代码，自托管或云端，400+ 集成。今日新增 **149** ⭐。

**主要特性**

- 可视化编排 + 自定义代码，灵活度高
- 原生 AI / MCP 支持，可作 Agent 编排底座
- 400+ 集成，覆盖常见 SaaS 与内部系统
- 可自托管，数据不出域

**如何使用**

```bash
# 自托管（Docker）
docker run -it n8nio/n8n
```

**应用场景**

- **运维 / 效率团队**：把重复流程自动化
- **AI 应用开发者**：用 n8n 编排多 Agent 与工具
- **中小企业**：低代码接入 400+ 服务

### 8. anthropics/claude-code — Anthropic 官方终端编程 Agent（Python）

**项目地址**：https://github.com/anthropics/claude-code
**今日新增**：127 ⭐ ｜ **总星标**：142,689 ｜ **语言**：Python
**简介**：Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows - all through natural language commands.

**趋势介绍**

Claude Code 是 Anthropic 出品的 agentic 编程工具，活在终端里，理解你的代码库，通过自然语言执行常规任务、解释复杂代码、处理 git 流程。今日新增 **127** ⭐（昨日未上榜，今日重回视野）。

**主要特性**

- 深度理解代码库上下文
- 自然语言驱动：编码、解释、git 操作一体化
- 与 Claude 模型深度集成

**如何使用**

```bash
# 官方仓库（含安装说明）
git clone https://github.com/anthropics/claude-code
```

**应用场景**

- **日常编码**：加速理解大型代码库与重构
- **git 工作流**：自动处理分支、提交、PR
- **开发者提效**：把 routine 工作交给 Agent

## 四、分语言榜单

> 下列为各语言自己的 Daily Trending 页（数量多于全榜，因全榜存在跨语言交叉与抽样）。

### Python（16 个）

- **[anthropics/claude-code](https://github.com/anthropics/claude-code)** `Python` ⭐ +127（总 142,689） — Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows - all through natural language commands.
- **[PostHog/posthog](https://github.com/PostHog/posthog)** `Python` ⭐ +286（总 38,733） — 🦔 PostHog is the leading platform for building self-driving products. Our developer tools – AI observability, analytics, session replay, flags, experiments, error tracking, logs, and more – capture all the context agents need to diagnose problems, uncover opportunities, and ship fixes. Steer it all from Slack, web, desktop, or the MCP.
- **[Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)** `Python` ⭐ +150（总 5,632） — A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation.
- **[shy3130/tick-stock-panel](https://github.com/shy3130/tick-stock-panel)** `Python` ⭐ +82（总 3,492） — TSP自托管、零运维的 A 股「选股 + 监控 + 回测」量化工作台 | 基于 TickFlow 数据源 | LLM能力驱使策略定制+个股分析+复盘 | 自由接入第三方数据源与个性化扩展数据 | 个人开源 ,非TickFlow官方项目
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** `Python` ⭐ +462（总 109,670） — Turn any codebase, with its docs, SQL schemas, configs, and PDFs, into a queryable knowledge graph. A /graphify skill for Claude Code, Cursor, Codex, and Gemini CLI: local deterministic AST parsing, every edge explained, no vector store.
- **[forcedotcom/sf-skills](https://github.com/forcedotcom/sf-skills)** `Python` ⭐ +18（总 902） — Salesforce's curated collection of agent skills for building applications. Optimized for Agentforce Vibes, compatible with all AI tools.
- **[anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community)** `Python` ⭐ +190（总 682） — Community plugin marketplace for Claude Cowork and Claude Code. Read-only mirror — submit plugins at clau.de/plugin-directory-submission.
- **[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)** `Python` ⭐ +62（总 73,067） — A curated list of awesome Claude Skills, resources, and tools for customizing Claude AI workflows
- **[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** `Python` ⭐ +119（总 11,323） — VoiceStudio is the open-source, fully-local ElevenLabs alternative — voice cloning, voice design, video dubbing, dictation, transcription &amp; audiobook creation in 646 languages.
- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** `Python` ⭐ +443（总 234,543） — The agent that grows with you
- **[karpathy/nanoGPT](https://github.com/karpathy/nanoGPT)** `Python` ⭐ +66（总 62,416） — The simplest, fastest repository for training/finetuning medium-sized GPTs.
- **[sponsors/vllm-project](https://github.com/sponsors/vllm-project)** `Python` ⭐ +71（总 89,761） — A high-throughput and memory-efficient inference and serving engine for LLMs
- **[sponsors/swisskyrepo](https://github.com/sponsors/swisskyrepo)** `Python` ⭐ +36（总 80,294） — A list of useful payloads and bypass for Web Application Security and Pentest/CTF
- **[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)** `Python` ⭐ +295（总 74,281） — Give your AI agent eyes to see the entire internet. Read &amp; search Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — one CLI, zero API fees.
- **[browser-use/browser-harness](https://github.com/browser-use/browser-harness)** `Python` ⭐ +61（总 17,041） — Browser Harness | Self-healing harness that enables LLMs to complete any task.
- **[google/adk-samples](https://github.com/google/adk-samples)** `Python` ⭐ +17（总 10,217） — A collection of sample agents built with Agent Development Kit (ADK)

### Typescript（18 个）

- **[makeplane/plane](https://github.com/makeplane/plane)** `TypeScript` ⭐ +263（总 57,393） — 🔥🔥🔥 Open-source Jira, Linear, Monday, and ClickUp alternative. Plane is a modern project management platform to manage tasks, sprints, docs, and triage.
- **[n8n-io/n8n](https://github.com/n8n-io/n8n)** `TypeScript` ⭐ +149（总 202,006） — Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.
- **[cursor/plugins](https://github.com/cursor/plugins)** `TypeScript` ⭐ +286（总 4,736） — Cursor plugin specification and official plugins
- **[puppeteer/puppeteer](https://github.com/puppeteer/puppeteer)** `TypeScript` ⭐ +7（总 95,488） — JavaScript API for Chrome and Firefox
- **[sponsors/mksglu](https://github.com/sponsors/mksglu)** `TypeScript` ⭐ +39（总 20,097） — Context window optimization for AI coding agents. Sandboxes tool output (98% reduction), persists session memory, and enforces routing across 17 platforms via MCP + hooks.
- **[ItzCrazyKns/Vane](https://github.com/ItzCrazyKns/Vane)** `TypeScript` ⭐ +45（总 36,394） — Vane is an AI-powered answering engine.
- **[can1357/oh-my-pi](https://github.com/can1357/oh-my-pi)** `TypeScript` ⭐ +230（总 26,613） — ⌥ Coding agent with the IDE wired in
- **[apache/maka](https://github.com/apache/maka)** `TypeScript` ⭐ +171（总 2,181） — Apache Maka (Incubating) is a local-first AI agent workspace. Model messages, tool calls, tool results, permission decisions, and termination events are recorded as an append-only log.
- **[modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)** `TypeScript` ⭐ +35（总 89,795） — Model Context Protocol Servers
- **[tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi)** `TypeScript` ⭐ +107（总 19,409） — OpenAI-compatible proxy that stacks the free tiers of 28 LLM providers (~4B tokens/month) behind one /v1 endpoint — plus any custom OpenAI-compatible endpoint. Smart routing, automatic failover, encrypted keys. Personal experimentation only.
- **[anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts)** `TypeScript` ⭐ +13（总 17,514） — A collection of projects designed to help developers quickly get started with building deployable applications using the Claude API
- **[nocobase/nocobase](https://github.com/nocobase/nocobase)** `TypeScript` ⭐ +32（总 23,776） — NocoBase is an open-source AI + no-code platform for building business systems fast. Instead of generating everything from scratch, AI works on top of production-proven infrastructure and a WYSIWYG no-code interface, so you get both speed and reliability.
- **[sponsors/diegosouzapw](https://github.com/sponsors/diegosouzapw)** `TypeScript` ⭐ +641（总 53,469） — Never stop coding. Free MIT AI gateway: one endpoint, 340 providers (90+ free), 1200+ models — Kimi, Claude, GPT, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline &amp; Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 450+ contributors
- **[google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)** `TypeScript` ⭐ +9（总 8,153） — A library of Agent Skills designed to work with the Stitch MCP server. Each skill follows the Agent Skills open standard, for compatibility with coding agents such as Antigravity, Gemini CLI, Claude Code, Cursor.
- **[sponsors/anomalyco](https://github.com/sponsors/anomalyco)** `TypeScript` ⭐ +421（总 200,484） — The open source coding agent.
- **[TanStack/query](https://github.com/TanStack/query)** `TypeScript` ⭐ +2（总 50,185） — 🤖 Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.
- **[sponsors/open-metadata](https://github.com/sponsors/open-metadata)** `TypeScript` ⭐ +11（总 14,947） — The Open Context Layer for Data and AI , OpenMetadata is the open platform for building trusted data context and business semantics for humans, AI assistants, and agents.
- **[CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit)** `TypeScript` ⭐ +25（总 36,970） — The Frontend Stack for Agents &amp; Generative UI. React, Angular, Mobile, Slack, and more. Makers of the AG-UI Protocol

### Go（20 个）

- **[Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api)** `Go` ⭐ +278（总 38,936） — Sub2API 一站式开源中转服务，让 Claude、Openai 、Gemini、Grok订阅统一接入，支持拼车共享，更高效分摊成本，原生工具无缝使用。
- **[microsoft/TypeScript](https://github.com/microsoft/TypeScript)** `Go` ⭐ +104（总 110,600） — TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- **[agent-substrate/substrate](https://github.com/agent-substrate/substrate)** `Go` ⭐ +50（总 1,597） — Agent Substrate: the core system
- **[Tencent/WeKnora](https://github.com/Tencent/WeKnora)** `Go` ⭐ +65（总 20,394） — Open-source LLM knowledge platform: turn raw documents into a queryable RAG, an autonomous reasoning agent, and a self-maintaining Wiki.
- **[cloudnative-pg/cloudnative-pg](https://github.com/cloudnative-pg/cloudnative-pg)** `Go` ⭐ +6（总 9,185） — The most popular Kubernetes Operator for PostgreSQL.
- **[sponsors/JuliusBrussee](https://github.com/sponsors/JuliusBrussee)** `Go` ⭐ +298（总 100,405） — 🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens by talking like caveman
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** `Go` ⭐ +71（总 21,183） — Fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in multi-language ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI &amp; Anthropic compatible.
- **[QuantumNous/new-api](https://github.com/QuantumNous/new-api)** `Go` ⭐ +77（总 45,961） — A unified AI model hub for aggregation &amp; distribution. It supports cross-converting various LLMs into OpenAI-compatible, Claude-compatible, or Gemini-compatible formats. A centralized gateway for personal and enterprise model management. 🍥
- **[ethereum/go-ethereum](https://github.com/ethereum/go-ethereum)** `Go` ⭐ +4（总 51,307） — Go implementation of the Ethereum protocol
- **[etcd-io/etcd](https://github.com/etcd-io/etcd)** `Go` ⭐ +9（总 52,155） — Distributed reliable key-value store for the most critical data of a distributed system
- **[alibaba/skill-up](https://github.com/alibaba/skill-up)** `Go` ⭐ +14（总 672） — An evaluation and evolution tool for Agent Skills.
- **[envoyproxy/ai-gateway](https://github.com/envoyproxy/ai-gateway)** `Go` ⭐ +0（总 1,951） — Manages Unified Access to Generative AI Services built on Envoy Gateway
- **[henrygd/beszel](https://github.com/henrygd/beszel)** `Go` ⭐ +36（总 24,562） — Lightweight server monitoring with historical data, docker stats, and alerts.
- **[sponsors/glanceapp](https://github.com/sponsors/glanceapp)** `Go` ⭐ +17（总 36,541） — A self-hosted dashboard that puts all your feeds in one place
- **[entireio/cli](https://github.com/entireio/cli)** `Go` ⭐ +7（总 4,995） — 📜 Entire CLI hooks into your Git workflow to capture AI agent sessions as you work. Sessions are indexed alongside commits, creating a searchable record of how code was written in your repo.
- **[SagerNet/sing-box](https://github.com/SagerNet/sing-box)** `Go` ⭐ +20（总 37,212） — The universal proxy platform
- **[sponsors/dolthub](https://github.com/sponsors/dolthub)** `Go` ⭐ +13（总 24,255） — Dolt – Git for Data
- **[open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector)** `Go` ⭐ +8（总 7,443） — OpenTelemetry Collector
- **[ethereum-optimism/optimism](https://github.com/ethereum-optimism/optimism)** `Go` ⭐ +2（总 6,464） — Optimism is Ethereum, scaled.
- **[go-task/task](https://github.com/go-task/task)** `Go` ⭐ +6（总 16,028） — A fast, cross-platform build tool inspired by Make, designed for modern workflows.

### Rust（19 个）

- **[openai/codex](https://github.com/openai/codex)** `Rust` ⭐ +1,544（总 114,507） — Lightweight coding agent that runs in your terminal
- **[sponsors/AprilNEA](https://github.com/sponsors/AprilNEA)** `Rust` ⭐ +959（总 14,308） — ⚡️A native, local-first alternative to Logitech Options+, written in Rust 🦀 — remap buttons, DPI, and SmartShift over HID++. No account, no telemetry.
- **[nautechsystems/nautilus_trader](https://github.com/nautechsystems/nautilus_trader)** `Rust` ⭐ +324（总 27,369） — Production-grade Rust-native trading engine with deterministic event-driven architecture
- **[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)** `Rust` ⭐ +51（总 36,507） — Your Personal AI super intelligence. A brain that builds a local-first memory of your life, a fantastic orchestrator of agent fleets and workflows, and a deep researcher.
- **[oven-sh/bun](https://github.com/oven-sh/bun)** `Rust` ⭐ +50（总 95,595） — Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one
- **[sponsors/dani-garcia](https://github.com/sponsors/dani-garcia)** `Rust` ⭐ +68（总 65,858） — Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs
- **[aaif-goose/goose](https://github.com/aaif-goose/goose)** `Rust` ⭐ +81（总 53,280） — an open source, extensible AI agent that goes beyond code suggestions - install, execute, edit, and test with any LLM
- **[rust-lang/cargo](https://github.com/rust-lang/cargo)** `Rust` ⭐ +7（总 15,416） — The Rust package manager
- **[rustfs/rustfs](https://github.com/rustfs/rustfs)** `Rust` ⭐ +30（总 31,317） — 🚀2.3x faster than MinIO for 4KB object payloads. RustFS is an open-source, S3-compatible high-performance object storage system supporting migration and coexistence with other S3-compatible platforms such as MinIO and Ceph.
- **[block/buzz](https://github.com/block/buzz)** `Rust` ⭐ +564（总 29,855） — A hive mind communication platform
- **[pola-rs/polars](https://github.com/pola-rs/polars)** `Rust` ⭐ +14（总 39,452） — Extremely fast Query Engine for DataFrames, written in Rust
- **[sponsors/sinelaw](https://github.com/sponsors/sinelaw)** `Rust` ⭐ +47（总 8,459） — Terminal based IDE &amp; text editor: easy, powerful and fast
- **[lancedb/lancedb](https://github.com/lancedb/lancedb)** `Rust` ⭐ +11（总 11,247） — Developer-friendly OSS embedded retrieval library for multimodal AI. Search More; Manage Less.
- **[zellij-org/zellij](https://github.com/zellij-org/zellij)** `Rust` ⭐ +19（总 35,059） — A terminal workspace with batteries included
- **[windmill-labs/windmill](https://github.com/windmill-labs/windmill)** `Rust` ⭐ +14（总 17,630） — Open-source developer platform to power your entire infra and turn scripts into webhooks, workflows and UIs. Fastest workflow engine (13x vs Airflow). Open-source alternative to Retool and Temporal.
- **[sponsors/starship](https://github.com/sponsors/starship)** `Rust` ⭐ +19（总 59,551） — ☄🌌️ The minimal, blazing-fast, and infinitely customizable prompt for any shell!
- **[clockworklabs/SpacetimeDB](https://github.com/clockworklabs/SpacetimeDB)** `Rust` ⭐ +12（总 25,052） — Development at the speed of light
- **[spacedriveapp/spacedrive](https://github.com/spacedriveapp/spacedrive)** `Rust` ⭐ +12（总 38,831） — Spacedrive is an open source cross-platform file explorer, powered by a virtual distributed filesystem written in Rust.
- **[sponsors/us](https://github.com/sponsors/us)** `Rust` ⭐ +20（总 676） — Fast, lightweight Firecrawl/Tavily alternative in Rust. Web scraper, crawler &amp; search API with MCP server for AI agents. Drop-in Firecrawl-compatible API (/scrape, /crawl, /search). 2.3x faster than Tavily, 1.5x faster than Firecrawl in 1K-URL benchmarks. 6 MB RAM, single binary. Self-host or use managed cloud.

## 五、总结与趋势洞察

今日榜单折射出几条清晰主线：

1. **AI 编程 Agent 回潮**：openai/codex（+1544）、anthropics/claude-code（+127）同时冲上榜，加上 multica-ai 的 Karpathy 风格 CLAUDE.md，说明「终端原生编程 Agent + 可复用编码规范」仍是社区最强主线。
2. **开发者工具链补位**：n8n（自动化）、makeplane/plane（项目管理）、ripienaar/free-for-dev（免费资源）覆盖研发全流程，且多为可自托管方案，呼应「数据自主」诉求。
3. **安全与成本成为显性需求**：Tencent/AI-Infra-Guard（AI 红队）、Wei-Shaw/sub2api（多订阅聚合降本）上榜，反映 AI 工程从「能跑」走向「安全、可控、省钱」。
4. **老牌项目回潮、热度速度整体回落**：与昨日基线相比，9 个延续项目中仅 2 个单日星标速度上升（microsoft/TypeScript、sponsors/affaan-m），多数回落——属周末常态，需结合多日观察。

> **数据质量提示**：① 今日全榜仅 17 条，数量偏少；② microsoft/TypeScript 在 Trending 页被错误标注为「Go」（实为 TypeScript），已按页面原样保留并提示；③ multica-ai/andrej-karpathy-skills 语言标记为 Unknown（实为 Markdown/Skills 配置）。以上不影响排名与星标数据。

> **行动建议**：开发者可优先试用 openai/codex / claude-code 提升编码效率；平台团队关注 n8n / plane 的自托管编排；安全团队评估 Tencent/AI-Infra-Guard；注重成本者试用 sub2api 聚合订阅。

---

**参考链接**：

- openai/codex: https://github.com/openai/codex
- sponsors/mattpocock: https://github.com/sponsors/mattpocock
- sponsors/affaan-m: https://github.com/sponsors/affaan-m
- sponsors/obra: https://github.com/sponsors/obra
- Wei-Shaw/sub2api: https://github.com/Wei-Shaw/sub2api
- makeplane/plane: https://github.com/makeplane/plane
- n8n-io/n8n: https://github.com/n8n-io/n8n
- anthropics/claude-code: https://github.com/anthropics/claude-code
- sponsors/AprilNEA: https://github.com/sponsors/AprilNEA
- modular/modular: https://github.com/modular/modular
- multica-ai/andrej-karpathy-skills: https://github.com/multica-ai/andrej-karpathy-skills
- mahlernim/google-timeline-visualizer: https://github.com/mahlernim/google-timeline-visualizer
- ripienaar/free-for-dev: https://github.com/ripienaar/free-for-dev
- microsoft/TypeScript: https://github.com/microsoft/TypeScript
- cursor/plugins: https://github.com/cursor/plugins
- PostHog/posthog: https://github.com/PostHog/posthog
- Tencent/AI-Infra-Guard: https://github.com/Tencent/AI-Infra-Guard
