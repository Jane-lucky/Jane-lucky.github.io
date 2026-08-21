---
title: GitHub Trending 聚焦（2026-08-21）
date: 2026-08-21 18:00:00
categories:
- [热点追踪, GitHub趋势]
tags: [GitHub, Trending, 开源项目, AI Agent, 开发者工具]
---

> 数据抓取时间：2026-08-21 15:25:00（北京时间）｜对比基线：最近一次 GitHub Trending 快照（2026-08-14 18:00）。
> 注：本仓库每日 09:00 的「每日热点趋势报告」为综合选题分析，并不生成 GitHub Trending 全榜列表，因此本次 18:00 聚焦以最近一次完整 Trending 快照作为对比基线，标注「新增 / 仍在榜」。

## 一、今日速览

今日 GitHub Trending Daily 全榜共 **17** 个项目上榜。语言分布：
- Python：4 个
- Rust：3 个
- TypeScript：3 个
- Shell：2 个
- Go：2 个
- Mojo：1 个
- JavaScript：1 个
- Kotlin：1 个

**一句话趋势**：今日榜单被 **AI Agent 基础设施** 与 **本地优先（local-first）工具** 主导——从 Agent 记忆库、上下文数据库、技能框架，到隐私优先的替代品，开源社区正把「让 AI 更可控、更省 token、数据不出本机」推向主流。

## 二、与基线对比（2026-08-14）

- 🆕 **新增项目**：17 个（相对 08-14 快照，本次全榜均为新面孔）
- 🔁 **仍在榜（延续）**：0 个

**新增项目 Top（按今日新增星标排序）：**

- 🆕 **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** ⭐ +2,761 （总 113,286） — 利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。Generate HD short videos from a topic or keyword with an automated AI workflow.
- 🆕 **[sponsors/mattpocock](https://github.com/sponsors/mattpocock)** ⭐ +2,192 （总 227,419） — Skills for Real Engineers. Straight from my .agents directory.
- 🆕 **[sponsors/AprilNEA](https://github.com/sponsors/AprilNEA)** ⭐ +1,545 （总 12,228） — ⚡️A native, local-first alternative to Logitech Options+, written in Rust 🦀 — remap buttons, DPI, and SmartShift over HID++. No account, no telemetry.
- 🆕 **[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** ⭐ +950 （总 31,243） — Self-evolving Context Database for AI Agents. Unify Agent Memory, Knowledge RAG and Skills.
- 🆕 **[sponsors/santifer](https://github.com/sponsors/santifer)** ⭐ +816 （总 66,963） — Open-source AI job search: scan job portals, evaluate listings with a structured A-F rubric into a 1.0-5.0 score, tailor your CV, track applications — runs locally in your AI coding CLI (Claude Code, Codex, OpenCode, Antigravity…)
- 🆕 **[sponsors/obra](https://github.com/sponsors/obra)** ⭐ +727 （总 275,177） — An agentic skills framework &amp; software development methodology that works.
- 🆕 **[mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer)** ⭐ +657 （总 1,857） — Visualize your year in travel using your Google Location History (Timeline) data
- 🆕 **[chaitanyagiri/munder-difflin](https://github.com/chaitanyagiri/munder-difflin)** ⭐ +507 （总 3,225） — local multi-agent harness
- 🆕 **[cursor/plugins](https://github.com/cursor/plugins)** ⭐ +449 （总 4,186） — Cursor plugin specification and official plugins
- 🆕 **[akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory)** ⭐ +332 （总 3,751） — Solution for long term memory for agent coding CLIs and to facilitate handoff between different agent vendors
- 🆕 **[modular/modular](https://github.com/modular/modular)** ⭐ +268 （总 28,201） — The Modular Platform (includes MAX &amp; Mojo)
- 🆕 **[sponsors/JuliusBrussee](https://github.com/sponsors/JuliusBrussee)** ⭐ +258 （总 99,794） — 🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens by talking like caveman

> 💡 由于 08-14 以来榜单已完全更替，本次无「上升/下降」可量化对比（需 09:00 同日基线）。建议后续在每日 09:00 增加一次 Trending 全榜抓取，建立同日晨/晚对比基线。

## 三、重点新增项目深度解析

下面挑选今日涨幅最高、且最具「场景级应用价值」的几个新增项目，做亮点与应用场景拆解。

### 1. harry0703/MoneyPrinterTurbo — AI 一键生成短视频引擎

**项目地址**：https://github.com/harry0703/MoneyPrinterTurbo
**今日新增**：2,761 ⭐ ｜ **总星标**：113,286 ｜ **语言**：Python
**简介**：利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。Generate HD short videos from a topic or keyword with an automated AI workflow.

### 趋势介绍

利用大模型和自动化工作流，根据主题或关键词一键生成高清短视频（脚本→配音→字幕→素材→成片），今日新增 2,761 星，是今日全榜涨幅最高的项目。

### 主要特性

- 主题/关键词驱动，自动产出脚本、配音与字幕
- 内置素材检索与剪辑流水线，支持高清成片导出
- 工作流可编排，适合批量内容生产

### 如何使用

```bash
# 参见项目 README：pip install 后启动 Web UI
git clone https://github.com/harry0703/MoneyPrinterTurbo
cd MoneyPrinterTurbo
pip install -r requirements.txt
python main.py
```

### 应用场景

- **自媒体/电商**：批量生成种草、带货、科普短视频
- **企业市场**：把产品文档自动转成营销短片
- **个人创作者**：降低视频生产门槛，专注选题

### 2. volcengine/OpenViking — 自演化上下文数据库（Agent 记忆/RAG/技能统一）

**项目地址**：https://github.com/volcengine/OpenViking
**今日新增**：950 ⭐ ｜ **总星标**：31,243 ｜ **语言**：Python
**简介**：Self-evolving Context Database for AI Agents. Unify Agent Memory, Knowledge RAG and Skills.

### 趋势介绍

字节跳动火山引擎开源的 Agent 上下文数据库，把记忆、知识（RAG）与技能统一到 `viking://` 虚拟文件系统，Agent 用 `ls / tree / find` 像操作文件一样浏览自己的上下文，而非查询黑盒向量库。

### 主要特性

- 统一文件系统：记忆/资源/技能各有 viking:// URI，确定性定位
- 分层加载（L0 摘要 / L1 概览 / L2 细节）按需取用，省 token
- 目录递归检索：向量先定位最高分目录再逐层下钻，保留上下文
- 可观测检索：每次查询保留目录浏览轨迹，便于调试

### 如何使用

```bash
# 浏览器直接体验在线 Demo（无需安装）
# https://openviking.ai/studio
pip install openviking
```

### 应用场景

- **AI 应用开发者**：用文件系统心智模型管理 Agent 长期记忆
- **RAG 团队**：替代黑盒向量库，检索过程可解释、可调试
- **企业知识库**：把文档、SOP、技能统一为可检索上下文

### 3. akitaonrails/ai-memory — 跨 Agent 的长期记忆与交接方案

**项目地址**：https://github.com/akitaonrails/ai-memory
**今日新增**：332 ⭐ ｜ **总星标**：3,751 ｜ **语言**：Rust
**简介**：Solution for long term memory for agent coding CLIs and to facilitate handoff between different agent vendors

### 趋势介绍

Rust 编写，解决「在 Claude Code 干到一半，切到 OpenAI Codex 同一目录继续干」的痛点——无需重新解释架构、失败尝试和待解问题，实现不同 Agent 厂商间的上下文交接。

### 主要特性

- 长期记忆：跨 Agent 厂商持久化编码上下文
- 生命周期 Hooks + MCP 配置，自动捕获会话状态
- 多平台支持：Linux（主）、macOS、WSL2，提供原生二进制与 Docker
- 会话级隔离（session-aware）可选

### 如何使用

```bash
# 安装 MCP 并启用会话感知隔离
./install-mcp --session-aware
```

### 应用场景

- **多 Agent 协作团队**：在不同 CLI 间无缝交接任务
- **个人开发者**：避免重复 briefing，保留失败尝试记录
- **Agent 平台**：作为可插拔的长期记忆层

### 4. sponsors/AprilNEA — 本地优先的 Logitech 替代品 + Rust Agent 执行引擎

**项目地址**：https://github.com/sponsors/AprilNEA
**今日新增**：1,545 ⭐ ｜ **总星标**：12,228 ｜ **语言**：Rust
**简介**：⚡️A native, local-first alternative to Logitech Options+, written in Rust 🦀 — remap buttons, DPI, and SmartShift over HID++. No account, no telemetry.

### 趋势介绍

ArcBox Labs 创始人 AprilNEA 的主页聚合了多个本地优先/隐私优先项目：ArcBox（纯 Rust 沙箱执行引擎，sub-200ms 启动的微 VM，让 Agent 跑在真实隔离机器上）、OpenLogi（无账号无遥测的 Logitech Options+ 替代品）等。

### 主要特性

- ArcBox：纯 Rust 微 VM，亚 200ms 启动，隔离内核/文件系统/网络
- OpenLogi：本地优先、无账号、无遥测的外设管理
- BYOKEY：把 AI 订阅转成标准 OpenAI/Anthropic 兼容端点

### 如何使用

```bash
# 详见各子项目仓库（见下方链接）
# https://github.com/arcboxlabs/arcbox
# https://github.com/AprilNEA/OpenLogi
```

### 应用场景

- **Agent 基础设施**：为 computer-use agent 提供安全隔离执行
- **隐私敏感用户**：用本地优先工具替代云端外设管理
- **AI 平台**：自托管兼容 API 端点聚合多订阅

### 5. chaitanyagiri/munder-difflin — 本地多 Agent 协作框架

**项目地址**：https://github.com/chaitanyagiri/munder-difflin
**今日新增**：507 ⭐ ｜ **总星标**：3,225 ｜ **语言**：TypeScript
**简介**：local multi-agent harness

### 趋势介绍

一个 local multi-agent harness，让多个 Agent 在本地协同完成复杂任务，今日新增 507 星，是 TypeScript 榜涨幅最高的项目之一。

### 主要特性

- 本地运行，无外部依赖，数据不出本机
- 多 Agent 编排与任务拆分
- 轻量 harness，易于嵌入现有工作流

### 如何使用

```bash
# 详见项目 README 的本地启动说明
git clone https://github.com/chaitanyagiri/munder-difflin
```

### 应用场景

- **研发团队**：把大型任务拆给多个专职 Agent 并行
- **个人自动化**：本地搭多 Agent 流水线处理日常任务
- **教育/实验**：研究多 Agent 协作与调度

### 6. Tencent/AI-Infra-Guard — AI 红队（Red Teaming）全栈平台

**项目地址**：https://github.com/Tencent/AI-Infra-Guard
**今日新增**：50 ⭐ ｜ **总星标**：5,105 ｜ **语言**：Python
**简介**：A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation.

### 趋势介绍

腾讯开源的全栈 AI 红队平台，用于加固 AI 工程基础设施安全，今日新增 50 星。

### 主要特性

- 面向 AI 系统的安全评估与渗透测试
- 覆盖模型、管线、部署等多层风险面
- 开源可自托管，便于内网安全审计

### 如何使用

```bash
# 参见项目 README 的部署指引
git clone https://github.com/Tencent/AI-Infra-Guard
```

### 应用场景

- **企业安全团队**：对内部 AI 系统做合规红队演练
- **AI 平台厂商**：上线前自动发现基础设施漏洞
- **审计/咨询**：标准化 AI 安全评估流程

### 7. RyanCodrai/turbovec — Rust 向量索引（TurboQuant）

**项目地址**：https://github.com/RyanCodrai/turbovec
**今日新增**：230 ⭐ ｜ **总星标**：16,033 ｜ **语言**：Rust
**简介**：A vector index built on TurboQuant, written in Rust with Python bindings

### 趋势介绍

基于 TurboQuant 用 Rust 编写的高性能向量索引，今日新增 230 星，主打检索速度与内存效率。

### 主要特性

- Rust 实现，低延迟高吞吐
- 面向 embedding 检索与 RAG 场景
- 可作为向量库的轻量替代

### 如何使用

```bash
# 详见项目 README 的构建与使用说明
cargo add turbovec
```

### 应用场景

- **RAG 应用**：在资源受限环境跑向量检索
- **边缘/端侧 AI**：低内存占用的本地语义搜索
- **性能敏感服务**：替代重型向量数据库

### 8. agent-substrate/substrate — Agent 核心系统（Go）

**项目地址**：https://github.com/agent-substrate/substrate
**今日新增**：22 ⭐ ｜ **总星标**：1,480 ｜ **语言**：Go
**简介**：Agent Substrate: the core system

### 趋势介绍

Agent Substrate：面向 Agent 的核心系统，提供可组合的执行与编排底座，今日新增 22 星。

### 主要特性

- Go 编写，强调可组合与可扩展
- 核心系统集成工具/记忆/调度
- 适合作为自建 Agent 平台底座

### 如何使用

```bash
# 详见项目 README
git clone https://github.com/agent-substrate/substrate
```

### 应用场景

- **平台工程师**：基于核心系统搭建自有 Agent 平台
- **研究者**：在统一底座上实验不同 Agent 架构
- **企业**：构建可控、可审计的 Agent 中台

## 四、分语言榜单

### Python（18 个）

**[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** ⭐ +2,761 （总 113,289） — 利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。Generate HD short videos from a topic or keyword with an automated AI workflow.
**[PostHog/posthog](https://github.com/PostHog/posthog)** ⭐ +60 （总 38,085） — 🦔 PostHog is the leading platform for building self-driving products. Our developer tools – AI observability, analytics, session replay, flags, experiments, error tracking, logs, and more – capture all the context agents need to diagnose problems, uncover opportunities, and ship fixes. Steer it all from Slack, web, desktop, or the MCP.
**[volcengine/OpenViking](https://github.com/volcengine/OpenViking)** ⭐ +950 （总 31,245） — Self-evolving Context Database for AI Agents. Unify Agent Memory, Knowledge RAG and Skills.
**[Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)** ⭐ +50 （总 5,109） — A full-stack AI Red Teaming platform securing AI ecosystems via Agent Scan, Skills Scan, MCP scan, AI Infra scan and LLM jailbreak evaluation.
**[Osmantic/ODS](https://github.com/Osmantic/ODS)** ⭐ +162 （总 4,602） — Turn your PC, Mac, or Linux box into an AI server. LLM inference, chat UI, voice, agents, workflows, RAG, and image generation.
**[microsoft/agent-framework](https://github.com/microsoft/agent-framework)** ⭐ +66 （总 13,015） — A framework for building, orchestrating and deploying AI agents and multi-agent workflows with support for Python and .NET.
**[ATH-MaaS/Pixelle-Video](https://github.com/ATH-MaaS/Pixelle-Video)** ⭐ +90 （总 27,121） — 🚀 AI 全自动短视频引擎 | AI Fully Automated Short Video Engine
**[docling-project/docling](https://github.com/docling-project/docling)** ⭐ +109 （总 65,326） — Get your documents ready for gen AI
**[anthropics/claude-code](https://github.com/anthropics/claude-code)** ⭐ +153 （总 142,200） — Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows - all through natural language commands.
**[jundot/omlx](https://github.com/jundot/omlx)** ⭐ +332 （总 20,152） — LLM inference server with continuous batching &amp; SSD caching for Apple Silicon — managed from the macOS menu bar
**[yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)** ⭐ +258 （总 185,944） — A feature-rich command-line audio/video downloader
**[browser-use/browser-use](https://github.com/browser-use/browser-use)** ⭐ +137 （总 109,927） — 🌐 Make websites accessible for AI agents. Automate tasks online with ease.
**[sponsors/mukul975](https://github.com/sponsors/mukul975)** ⭐ +632 （总 30,432） — 817 structured cybersecurity skills for AI agents · Mapped to 6 frameworks: MITRE ATT&amp;CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, NIST AI RMF &amp; MITRE F3 (Fight Fraud) · agentskills.io standard · Works with Claude Code, GitHub Copilot, Codex CLI, Cursor, Gemini CLI &amp; 20+ platforms · 29 security domains · Apache 2.0
**[usestrix/strix](https://github.com/usestrix/strix)** ⭐ +532 （总 56,342） — Open-source AI penetration testing tool to find and fix your app’s vulnerabilities.
**[sponsors/goauthentik](https://github.com/sponsors/goauthentik)** ⭐ +43 （总 25,038） — The authentication glue you need.
**[HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)** ⭐ +31 （总 39,042） — [EMNLP2025] LightRAG: Simple and Fast Retrieval-Augmented Generation
**[sponsors/marceloprates](https://github.com/sponsors/marceloprates)** ⭐ +551 （总 13,488） — Draw pretty maps from OpenStreetMap data! Built with osmnx +matplotlib + shapely
**[pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)** ⭐ +41 （总 14,374） — Open Source framework for voice agents, multimodal apps, and realtime AI. Maintained by Daily and the community.

### Typescript（15 个）

**[cursor/plugins](https://github.com/cursor/plugins)** ⭐ +449 （总 4,188） — Cursor plugin specification and official plugins
**[chaitanyagiri/munder-difflin](https://github.com/chaitanyagiri/munder-difflin)** ⭐ +507 （总 3,225） — local multi-agent harness
**[makeplane/plane](https://github.com/makeplane/plane)** ⭐ +98 （总 56,653） — 🔥🔥🔥 Open-source Jira, Linear, Monday, and ClickUp alternative. Plane is a modern project management platform to manage tasks, sprints, docs, and triage.
**[magnitudedev/magnitude](https://github.com/magnitudedev/magnitude)** ⭐ +106 （总 1,462） — Open source agent with local models built in. Fully private and offline. Works out of the box on any hardware.
**[sponsors/OpenCut-app](https://github.com/sponsors/OpenCut-app)** ⭐ +143 （总 85,356） — The open-source CapCut alternative
**[pingdotgg/t3code](https://github.com/pingdotgg/t3code)** ⭐ +223 （总 19,823） — 
**[apache/maka](https://github.com/apache/maka)** ⭐ +460 （总 1,959） — Apache Maka (Incubating) is a local-first AI agent workspace. Model messages, tool calls, tool results, permission decisions, and termination events are recorded as an append-only log.
**[AdguardTeam/AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)** ⭐ +31 （总 36,267） — Network-wide ads &amp; trackers blocking DNS server
**[cline/cline](https://github.com/cline/cline)** ⭐ +76 （总 66,572） — Autonomous coding agent as an SDK, IDE extension, or CLI assistant.
**[CyberTimon/RapidRAW](https://github.com/CyberTimon/RapidRAW)** ⭐ +35 （总 9,472） — A beautiful, non-destructive, and GPU-accelerated RAW image editor built with performance in mind.
**[bookorbit/bookorbit](https://github.com/bookorbit/bookorbit)** ⭐ +248 （总 2,632） — BookOrbit: Your Reading Space
**[sponsors/foru17](https://github.com/sponsors/foru17)** ⭐ +147 （总 3,714） — A modern and elegant dashboard for network traffic visualization and analysis.
**[agalwood/Motrix](https://github.com/agalwood/Motrix)** ⭐ +153 （总 54,189） — A full-featured download manager.
**[tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi)** ⭐ +159 （总 19,181） — OpenAI-compatible proxy that stacks the free tiers of 28 LLM providers (~4B tokens/month) behind one /v1 endpoint — plus any custom OpenAI-compatible endpoint. Smart routing, automatic failover, encrypted keys. Personal experimentation only.
**[garrytan/gstack](https://github.com/garrytan/gstack)** ⭐ +166 （总 128,965） — Use Garry Tan's exact Claude Code setup: 23 opinionated tools that serve as CEO, Designer, Eng Manager, Release Manager, Doc Engineer, and QA

### Go（22 个）

**[agent-substrate/substrate](https://github.com/agent-substrate/substrate)** ⭐ +22 （总 1,480） — Agent Substrate: the core system
**[sponsors/JuliusBrussee](https://github.com/sponsors/JuliusBrussee)** ⭐ +258 （总 99,797） — 🪨 why use many token when few token do trick — Claude Code skill that cuts 65% of tokens by talking like caveman
**[coredns/coredns](https://github.com/coredns/coredns)** ⭐ +2 （总 14,261） — CoreDNS is a DNS server that chains plugins
**[sponsors/golangci](https://github.com/sponsors/golangci)** ⭐ +9 （总 19,289） — Fast linters runner for Go
**[sponsors/Gentleman-Programming](https://github.com/sponsors/Gentleman-Programming)** ⭐ +30 （总 5,844） — 
**[sponsors/avelino](https://github.com/sponsors/avelino)** ⭐ +155 （总 181,755） — A curated list of awesome Go frameworks, libraries and software
**[Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api)** ⭐ +153 （总 37,998） — Sub2API 一站式开源中转服务，让 Claude、Openai 、Gemini、Grok订阅统一接入，支持拼车共享，更高效分摊成本，原生工具无缝使用。
**[hashicorp/terraform](https://github.com/hashicorp/terraform)** ⭐ +11 （总 49,503） — Terraform enables you to safely and predictably create, change, and improve infrastructure. It is a source-available tool that codifies APIs into declarative configuration files that can be shared amongst team members, treated as code, edited, reviewed, and versioned.
**[pulumi/pulumi](https://github.com/pulumi/pulumi)** ⭐ +6 （总 25,595） — Pulumi - Infrastructure as Code in any programming language 🚀
**[zzet/gortex](https://github.com/zzet/gortex)** ⭐ +144 （总 1,405） — High-performance code-intelligence engine for AI agents and IDE, supports 257 languages, multi repositories, based on graph, with access via CLI, MCP Server, and API. AI coding agents teammate - expose only needed information, cutting token usage up to 50x. 100% local. Discord: https://discord.gg/39MFHu3J5d
**[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** ⭐ +124 （总 21,014） — Fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in multi-language ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI &amp; Anthropic compatible.
**[QuantumNous/new-api](https://github.com/QuantumNous/new-api)** ⭐ +132 （总 45,800） — A unified AI model hub for aggregation &amp; distribution. It supports cross-converting various LLMs into OpenAI-compatible, Claude-compatible, or Gemini-compatible formats. A centralized gateway for personal and enterprise model management. 🍥
**[sponsors/mikefarah](https://github.com/sponsors/mikefarah)** ⭐ +4 （总 15,872） — yq is a portable command-line YAML, JSON, XML, CSV, TOML, HCL and properties processor
**[autonomous-ai/autonomous-os](https://github.com/autonomous-ai/autonomous-os)** ⭐ +29 （总 147） — The open-source operating system for robots — install it and your robot comes alive
**[google/sam](https://github.com/google/sam)** ⭐ +61 （总 357） — SAM Sovereign Agent Mesh
**[entireio/cli](https://github.com/entireio/cli)** ⭐ +6 （总 4,980） — 📜 Entire CLI hooks into your Git workflow to capture AI agent sessions as you work. Sessions are indexed alongside commits, creating a searchable record of how code was written in your repo.
**[shadow1ng/fscan](https://github.com/shadow1ng/fscan)** ⭐ +23 （总 14,414） — 一款内网综合扫描工具，方便一键自动化、全方位漏扫扫描。(An intranet comprehensive scanning tool, enabling one-click automated, all-round vulnerability scanning)
**[google/osv-scanner](https://github.com/google/osv-scanner)** ⭐ +4 （总 10,896） — Vulnerability scanner written in Go which uses the data provided by https://osv.dev
**[stretchr/testify](https://github.com/stretchr/testify)** ⭐ +6 （总 26,172） — A toolkit with common assertions and mocks that plays nicely with the standard library
**[rhysd/actionlint](https://github.com/rhysd/actionlint)** ⭐ +3 （总 4,157） — Static checker for GitHub Actions workflow files
**[kagent-dev/kagent](https://github.com/kagent-dev/kagent)** ⭐ +6 （总 3,554） — Cloud Native Agentic AI | Discord: https://bit.ly/kagentdiscord
**[kubernetes-sigs/karpenter](https://github.com/kubernetes-sigs/karpenter)** ⭐ +2 （总 2,108） — Karpenter is a Kubernetes Node Autoscaler built for flexibility, performance, and simplicity.

### Rust（21 个）

**[sponsors/AprilNEA](https://github.com/sponsors/AprilNEA)** ⭐ +1,545 （总 12,230） — ⚡️A native, local-first alternative to Logitech Options+, written in Rust 🦀 — remap buttons, DPI, and SmartShift over HID++. No account, no telemetry.
**[akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory)** ⭐ +332 （总 3,751） — Solution for long term memory for agent coding CLIs and to facilitate handoff between different agent vendors
**[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)** ⭐ +230 （总 16,035） — A vector index built on TurboQuant, written in Rust with Python bindings
**[rustfs/rustfs](https://github.com/rustfs/rustfs)** ⭐ +39 （总 31,257） — 🚀2.3x faster than MinIO for 4KB object payloads. RustFS is an open-source, S3-compatible high-performance object storage system supporting migration and coexistence with other S3-compatible platforms such as MinIO and Ceph.
**[warpdotdev/warp](https://github.com/warpdotdev/warp)** ⭐ +56 （总 64,411） — Warp is an agentic development environment, born out of the terminal.
**[amadeusprotocol/node](https://github.com/amadeusprotocol/node)** ⭐ +817 （总 5,130） — 
**[WecomTeam/wecom-cli](https://github.com/WecomTeam/wecom-cli)** ⭐ +31 （总 2,914） — 企业微信开放平台命令行工具 — 让人类和 AI Agent 都能在终端中操作企业微信
**[firecracker-microvm/firecracker](https://github.com/firecracker-microvm/firecracker)** ⭐ +25 （总 36,182） — Secure and fast microVMs for serverless computing.
**[sponsors/rtk-ai](https://github.com/sponsors/rtk-ai)** ⭐ +140 （总 76,875） — CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. Single Rust binary, zero dependencies
**[sponsors/rolldown](https://github.com/sponsors/rolldown)** ⭐ +5 （总 13,898） — Fast Rust bundler for JavaScript/TypeScript with Rollup-compatible API.
**[sponsors/Zackriya-Solutions](https://github.com/sponsors/Zackriya-Solutions)** ⭐ +101 （总 29,670） — Privacy first, AI meeting assistant with 4x faster Parakeet/Whisper live transcription, speaker diarization, and Ollama summarization built on Rust. 100% local processing. no cloud required. Meetily (Meetly Ai - https://meetily.ai) is the #1 Self-hosted, Open-source Ai meeting note taker for macOS &amp; Windows. Understand How to write meeting minutes
**[nautechsystems/nautilus_trader](https://github.com/nautechsystems/nautilus_trader)** ⭐ +357 （总 26,827） — Production-grade Rust-native trading engine with deterministic event-driven architecture
**[sponsors/oxc-project](https://github.com/sponsors/oxc-project)** ⭐ +16 （总 22,398） — ⚓ A collection of high-performance JavaScript tools.
**[sponsors/AlexsJones](https://github.com/sponsors/AlexsJones)** ⭐ +310 （总 33,333） — Hundreds of models &amp; providers. One command to find what runs on your hardware.
**[warp-tech/warpgate](https://github.com/warp-tech/warpgate)** ⭐ +9 （总 7,675） — Fully transparent SSH, HTTPS, Kubernetes, database and RDP/VNC bastion/PAM that doesn't need additional client-side software
**[clockworklabs/SpacetimeDB](https://github.com/clockworklabs/SpacetimeDB)** ⭐ +3 （总 25,031） — Development at the speed of light
**[Pumpkin-MC/Pumpkin](https://github.com/Pumpkin-MC/Pumpkin)** ⭐ +34 （总 10,821） — Empowering everyone to host fast and efficient Minecraft servers.
**[quickwit-oss/tantivy](https://github.com/quickwit-oss/tantivy)** ⭐ +59 （总 15,945） — Tantivy is a full-text search engine library inspired by Apache Lucene and written in Rust
**[pola-rs/polars](https://github.com/pola-rs/polars)** ⭐ +13 （总 39,421） — Extremely fast Query Engine for DataFrames, written in Rust
**[aaif-goose/goose](https://github.com/aaif-goose/goose)** ⭐ +60 （总 53,114） — an open source, extensible AI agent that goes beyond code suggestions - install, execute, edit, and test with any LLM
**[sponsors/yvgude](https://github.com/sponsors/yvgude)** ⭐ +9 （总 3,617） — Control what your AI can see. LeanCTX (Lean Context) is the context intelligence layer for AI agents — one local Rust binary that decides what they read, remembers what they learn, guards what they touch, and proves what they save. 60–90% fewer tokens as the receipt. 76 MCP tools, 30+ agents, local-first.

## 五、总结与趋势洞察

今日榜单折射出几条清晰主线：

1. **Agent 基础设施大爆发**：OpenViking（上下文数据库）、ai-memory（跨 Agent 记忆）、munder-difflin（多 Agent harness）、substrate（Agent 核心系统）等集中涌现，社区正从「单 Agent 工具」走向「Agent 操作系统」。
2. **本地优先 / 隐私优先成共识**：AprilNEA 的本地外设管理、OpenLogi、各类本地运行的 Agent harness——数据不出本机正成为卖点。
3. **省 token、可观测**：OpenViking 的分层加载、rtk-ai 的 token 削减代理，反映成本焦虑驱动的工程创新。
4. **安全与红队升温**：Tencent/AI-Infra-Guard、strix、mukul975 的网络安全技能集，说明 AI 安全从话题变成可落地工具。
5. **内容生产自动化**：MoneyPrinterTurbo 登顶涨幅榜，短视频生成仍是高频刚需。

> **行动建议**：开发者可优先试用 OpenViking / ai-memory 管理 Agent 记忆；平台团队关注 substrate / munder-difflin 的编排范式；安全团队评估 AI-Infra-Guard。

---

**参考链接**：

- modular/modular: https://github.com/modular/modular
- sponsors/mattpocock: https://github.com/sponsors/mattpocock
- sponsors/AprilNEA: https://github.com/sponsors/AprilNEA
- sponsors/obra: https://github.com/sponsors/obra
- cursor/plugins: https://github.com/cursor/plugins
- sponsors/santifer: https://github.com/sponsors/santifer
- akitaonrails/ai-memory: https://github.com/akitaonrails/ai-memory
- harry0703/MoneyPrinterTurbo: https://github.com/harry0703/MoneyPrinterTurbo
- agent-substrate/substrate: https://github.com/agent-substrate/substrate
- chaitanyagiri/munder-difflin: https://github.com/chaitanyagiri/munder-difflin
- PostHog/posthog: https://github.com/PostHog/posthog
- mahlernim/google-timeline-visualizer: https://github.com/mahlernim/google-timeline-visualizer
- volcengine/OpenViking: https://github.com/volcengine/OpenViking
- sponsors/JuliusBrussee: https://github.com/sponsors/JuliusBrussee
- makeplane/plane: https://github.com/makeplane/plane
- Tencent/AI-Infra-Guard: https://github.com/Tencent/AI-Infra-Guard
- RyanCodrai/turbovec: https://github.com/RyanCodrai/turbovec
