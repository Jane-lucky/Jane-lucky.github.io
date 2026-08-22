---
title: GitHub Trending 聚焦（2026-08-22 18:00）
date: 2026-08-22 18:00:00
categories:
- 热点追踪
- GitHub趋势
tags: [GitHub, Trending, 开源项目, 开发者工具, Python, TypeScript, Go, Rust, Agent, AI]
---

每日 18:00 GitHub Trending 聚焦。本期基于 **2026-08-22 18:13** 实时抓取的 Trending Daily 全榜（共 17 个项目）及 Python / TypeScript / Go / Rust 四大语言分榜，结合 GitHub REST API 补充的 topics、License、主页等元数据，重点分析今日新增亮点与可落地场景。

> **对比口径说明**：
> 本工作区的 09:00 任务当前仅推送至飞书、未落盘为结构化快照，因此今天 **无同日 09:00 可比数据**。本报告回退到 **最近一次落盘快照 2026-08-21-18-00** 做跨期对比（清单级新增 / 退出 + 持续在榜项目的累计 Star 增量作为“上升”代理信号）。
> 若需严格的 9:00→18:00 intraday 对比，建议让 09:00 任务把快照落盘到 `data/hot-spots/github-trending-2026-08-22-09-00.json`（本脚本会自动识别并切换为 intraday 模式）。

---

## 📊 今日总览

- **抓取时间**：2026-08-22 18:09:40
- **全榜项目数**：17
- **分语言榜规模**：Python 16 · TypeScript 19 · Go 23 · Rust 18
- **对比基线**：最近一次落盘快照 2026-08-21-18-00（全榜 17 个）
- **新增**：8 个 ｜ **退出**：8 个 ｜ **持续在榜**：9 个

**语言分布（全榜）**：

- Python：3 个
- JavaScript：3 个
- TypeScript：3 个
- Shell：2 个
- C++：2 个
- Rust：1 个
- Kotlin：1 个
- Mojo：1 个
- Go：1 个

> 📝 **语言口径说明**：全榜 Top 10 的「语言」列取 GitHub REST API 检测的**主语言**（可能与其 Trending 归类语言不同，例如 `microsoft/TypeScript` 主语言被 GitHub 检测为 Go）；各语言分榜 Top 5 的「语言」列统一取该分榜归类语言，以保证表内一致。

**全榜 Top 10（按今日新增 Star）**：

| # | 项目 | 今日 ★ | 总 ★ | 语言 | 一句话简介 |
|---|------|------:|------:|------|-----------|
| 1 | [sponsors/mattpocock](https://github.com/sponsors/mattpocock) | 3,362 | 230,522 | Shell | Skills for Real Engineers. Straight from |
| 2 | [sponsors/AprilNEA](https://github.com/sponsors/AprilNEA) | 1,380 | 13,307 | Rust | ⚡️A native, local-first alternative to L |
| 3 | [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 1,201 | 114,301 | Python | 利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。Gener |
| 4 | [mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer) | 1,053 | 2,385 | Kotlin | Visualize your year in travel using your |
| 5 | [sponsors/santifer](https://github.com/sponsors/santifer) | 921 | 67,661 | JavaScript | Open-source AI job search: scan job port |
| 6 | [modular/modular](https://github.com/modular/modular) | 913 | 28,759 | Mojo | The Modular Platform (includes MAX & Moj |
| 7 | [sponsors/obra](https://github.com/sponsors/obra) | 790 | 275,836 | Shell | An agentic skills framework &amp; softwa |
| 8 | [cursor/plugins](https://github.com/cursor/plugins) | 388 | 4,503 | TypeScript | Cursor plugin specification and official |
| 9 | [sponsors/affaan-m](https://github.com/sponsors/affaan-m) | 357 | 241,932 | JavaScript | The agent harness performance optimizati |
| 10 | [PostHog/posthog](https://github.com/PostHog/posthog) | 335 | 38,402 | Python | :hedgehog: PostHog is the leading platfo |

---

## 🔥 今日榜内「飙升」（动量信号）

以 `stars today` 为动量指标，以下项目在今日全榜中增长最快，代表当下最热的方向：

- **[sponsors/mattpocock](https://github.com/sponsors/mattpocock)** — 今日 +3,362 ★（累计 230,522 ★）· Shell
- **[sponsors/AprilNEA](https://github.com/sponsors/AprilNEA)** — 今日 +1,380 ★（累计 13,307 ★）· Rust
- **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** — 今日 +1,201 ★（累计 114,301 ★）· Python
- **[mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer)** — 今日 +1,053 ★（累计 2,385 ★）· Kotlin
- **[sponsors/santifer](https://github.com/sponsors/santifer)** — 今日 +921 ★（累计 67,661 ★）· JavaScript
- **[modular/modular](https://github.com/modular/modular)** — 今日 +913 ★（累计 28,759 ★）· Mojo

---

## 🔄 与基线对比（新增 / 上升 / 下降）

对比对象：最近一次落盘快照 2026-08-21-18-00。两期跨期换手明显，本期全榜 **8 个为新增、8 个已退出、9 个持续在榜**。由于非同日数据，以下“上升”以持续在榜项目的累计 Star 增量近似表示。

### 🆕 新增（共 8 个，按动量取 Top 10）

- **[sponsors/affaan-m](https://github.com/sponsors/affaan-m)** — 今日 +357 ★ · JavaScript · The agent harness performance optimization system.
- **[apache/maka](https://github.com/apache/maka)** — 今日 +148 ★ · TypeScript · Apache Maka (Incubating) is a local-first AI agent
- **[ruvnet/ruflo](https://github.com/ruvnet/ruflo)** — 今日 +140 ★ · TypeScript · 🌊 The original agent meta-harness. Deploy intellig
- **[microsoft/TypeScript](https://github.com/microsoft/TypeScript)** — 今日 +65 ★ · Go · TypeScript is a superset of JavaScript that compil
- **[elder-plinius/OBLITERATUS](https://github.com/elder-plinius/OBLITERATUS)** — 今日 +63 ★ · Python · OBLITERATE THE CHAINS THAT BIND YOU
- **[sponsors/TryGhost](https://github.com/sponsors/TryGhost)** — 今日 +32 ★ · JavaScript · Independent technology for modern publishing, memb
- **[microsoft/onnxruntime](https://github.com/microsoft/onnxruntime)** — 今日 +5 ★ · C++ · ONNX Runtime: cross-platform, high performance ML 
- **[protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)** — 今日 +4 ★ · C++ · Protocol Buffers - Google's data interchange forma

<details><summary>查看完整新增清单（8 个）</summary>

- sponsors/affaan-m
- apache/maka
- ruvnet/ruflo
- microsoft/TypeScript
- elder-plinius/OBLITERATUS
- sponsors/TryGhost
- microsoft/onnxruntime
- protocolbuffers/protobuf

</details>

### ⬆️ 持续在榜且累计 Star 上升 Top 10

- **[sponsors/mattpocock](https://github.com/sponsors/mattpocock)** — 较基线累计 +2,640 ★
- **[sponsors/AprilNEA](https://github.com/sponsors/AprilNEA)** — 较基线累计 +941 ★
- **[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)** — 较基线累计 +871 ★
- **[sponsors/santifer](https://github.com/sponsors/santifer)** — 较基线累计 +582 ★
- **[sponsors/obra](https://github.com/sponsors/obra)** — 较基线累计 +546 ★
- **[modular/modular](https://github.com/modular/modular)** — 较基线累计 +445 ★
- **[mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer)** — 较基线累计 +437 ★
- **[cursor/plugins](https://github.com/cursor/plugins)** — 较基线累计 +276 ★
- **[PostHog/posthog](https://github.com/PostHog/posthog)** — 较基线累计 +275 ★

<details><summary>查看已退出清单（8 个，对比 最近一次落盘快照 2026-08-21-18-00）</summary>

- RyanCodrai/turbovec
- Tencent/AI-Infra-Guard
- agent-substrate/substrate
- akitaonrails/ai-memory
- chaitanyagiri/munder-difflin
- makeplane/plane
- sponsors/JuliusBrussee
- volcengine/OpenViking

</details>

---

## 🌟 重点新增 / 高动量项目亮点与场景

下面挑选项目动量最强、且技术与产业价值高的项目，逐项拆解亮点与可落地场景。

### sponsors/affaan-m

**项目地址**：https://github.com/sponsors/affaan-m  
**今日新增 Star**：357 ★ ｜ **累计**：241,932 ★ ｜ **Fork**：36,671  
**语言**：JavaScript ｜ **License**：未标注

**核心亮点**

- 核心定位：The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond.

**应用场景**

- AI Agent / 智能体：作为 Agent 能力底座或工具集成
- 安全：漏洞扫描 / 防护 / 审计
- 性能优化：高吞吐 / 低延迟场景

### apache/maka

**项目地址**：https://github.com/apache/maka  
**今日新增 Star**：148 ★ ｜ **累计**：2,118 ★ ｜ **Fork**：245  
**语言**：TypeScript ｜ **License**：Apache-2.0
**Topics**：agent-runtime, ai, ai-agent, apache, cli, desktop, electron, event-sourcing, incubator, llm, local-first, maka, tool-use, typescript

**核心亮点**

- 核心定位：Apache Maka (Incubating) is a local-first AI agent workspace. Model messages, tool calls, tool results, permission decisions, and termination events are recorded as an append-only log.
- 技术标签：agent-runtime, ai, ai-agent, apache, cli, desktop, electron, event-sourcing
- 开源协议：Apache-2.0（可商用 / 二次分发需遵守协议）

**应用场景**

- AI Agent / 智能体：作为 Agent 能力底座或工具集成
- 大模型应用：基于 LLM 的对话 / 生成 / 推理
- 开发者工具：命令行效率提升

### ruvnet/ruflo

**项目地址**：https://github.com/ruvnet/ruflo  
**今日新增 Star**：140 ★ ｜ **累计**：68,768 ★ ｜ **Fork**：8,255  
**语言**：TypeScript ｜ **License**：MIT
**主页**：https://Cognitum.One
**Topics**：agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents, claude-code, codex, dsh-plugin, harness, mcp-server, multi-agent, multi-agent-systems, npm, skills, swarm, swarm-intelligence, typescript

**核心亮点**

- 核心定位：🌊 The original agent meta-harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, RAG integration, and native Claude Code / Codex / Hermes and many more Integrated
- 技术标签：agentic-ai, agentic-framework, agentic-workflow, agents, ai-agents, ai-assistant, ai-skills, autonomous-agents
- 官方主页：https://Cognitum.One
- 开源协议：MIT（可商用 / 二次分发需遵守协议）

**应用场景**

- AI Agent / 智能体：作为 Agent 能力底座或工具集成
- 检索增强（RAG）：构建知识库问答与文档检索
- 工作流：任务编排与协作

### microsoft/TypeScript

**项目地址**：https://github.com/microsoft/TypeScript  
**今日新增 Star**：65 ★ ｜ **累计**：110,429 ★ ｜ **Fork**：13,745  
**语言**：Go ｜ **License**：Apache-2.0
**主页**：https://www.typescriptlang.org
**Topics**：javascript, language, typechecker, typescript

**核心亮点**

- 核心定位：TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- 技术标签：javascript, language, typechecker, typescript
- 官方主页：https://www.typescriptlang.org
- 开源协议：Apache-2.0（可商用 / 二次分发需遵守协议）

**应用场景**

- 通用技术工具：可结合团队具体场景二次开发或集成

### elder-plinius/OBLITERATUS

**项目地址**：https://github.com/elder-plinius/OBLITERATUS  
**今日新增 Star**：63 ★ ｜ **累计**：7,894 ★ ｜ **Fork**：1,438  
**语言**：Python ｜ **License**：AGPL-3.0
**主页**：https://huggingface.co/spaces/pliny-the-prompter/

**核心亮点**

- 核心定位：OBLITERATE THE CHAINS THAT BIND YOU
- 官方主页：https://huggingface.co/spaces/pliny-the-prompter/
- 开源协议：AGPL-3.0（可商用 / 二次分发需遵守协议）

**应用场景**

- 通用技术工具：可结合团队具体场景二次开发或集成

### sponsors/TryGhost

**项目地址**：https://github.com/sponsors/TryGhost  
**今日新增 Star**：32 ★ ｜ **累计**：55,000 ★ ｜ **Fork**：11,909  
**语言**：JavaScript ｜ **License**：未标注

**核心亮点**

- 核心定位：Independent technology for modern publishing, memberships, subscriptions and newsletters.

**应用场景**

- 通用技术工具：可结合团队具体场景二次开发或集成

### microsoft/onnxruntime

**项目地址**：https://github.com/microsoft/onnxruntime  
**今日新增 Star**：5 ★ ｜ **累计**：21,558 ★ ｜ **Fork**：4,152  
**语言**：C++ ｜ **License**：MIT
**主页**：https://onnxruntime.ai
**Topics**：ai-framework, deep-learning, hardware-acceleration, machine-learning, neural-networks, onnx, pytorch, scikit-learn, tensorflow

**核心亮点**

- 核心定位：ONNX Runtime: cross-platform, high performance ML inferencing and training accelerator
- 技术标签：ai-framework, deep-learning, hardware-acceleration, machine-learning, neural-networks, onnx, pytorch, scikit-learn
- 官方主页：https://onnxruntime.ai
- 开源协议：MIT（可商用 / 二次分发需遵守协议）

**应用场景**

- 性能优化：高吞吐 / 低延迟场景

### protocolbuffers/protobuf

**项目地址**：https://github.com/protocolbuffers/protobuf  
**今日新增 Star**：4 ★ ｜ **累计**：71,800 ★ ｜ **Fork**：16,237  
**语言**：C++ ｜ **License**：NOASSERTION
**主页**：http://protobuf.dev
**Topics**：marshalling, protobuf, protobuf-runtime, protoc, protocol-buffers, protocol-compiler, rpc, serialization

**核心亮点**

- 核心定位：Protocol Buffers - Google's data interchange format
- 技术标签：marshalling, protobuf, protobuf-runtime, protoc, protocol-buffers, protocol-compiler, rpc, serialization
- 官方主页：http://protobuf.dev
- 开源协议：NOASSERTION（可商用 / 二次分发需遵守协议）

**应用场景**

- 通用技术工具：可结合团队具体场景二次开发或集成

---

## 🧭 分语言趋势速览

### Python Top 5

| 项目 | 今日 ★ | 总 ★ | 语言 | 简介 |
|------|------:|------:|------|------|
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 1,201 | 114,300 | Python | 利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。Generat |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | 654 | 31,817 | Python | Self-evolving Context Database for AI Agen |
| [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard) | 434 | 5,352 | Python | A full-stack AI Red Teaming platform secur |
| [PostHog/posthog](https://github.com/PostHog/posthog) | 335 | 38,402 | Python | 🦔 PostHog is the leading platform for buil |
| [sponsors/mukul975](https://github.com/sponsors/mukul975) | 243 | 30,574 | Python | 817 structured cybersecurity skills for AI |

### TypeScript Top 5

| 项目 | 今日 ★ | 总 ★ | 语言 | 简介 |
|------|------:|------:|------|------|
| [sponsors/diegosouzapw](https://github.com/sponsors/diegosouzapw) | 768 | 52,909 | Typescript | Never stop coding. Free MIT AI gateway: on |
| [stablyai/orca](https://github.com/stablyai/orca) | 724 | 50,911 | Typescript | Orca is the ADE for working with a fleet o |
| [makeplane/plane](https://github.com/makeplane/plane) | 579 | 57,019 | Typescript | 🔥🔥🔥 Open-source Jira, Linear, Monday, and  |
| [cursor/plugins](https://github.com/cursor/plugins) | 388 | 4,503 | Typescript | Cursor plugin specification and official p |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | 193 | 201,583 | Typescript | Fair-code workflow automation platform wit |

### Go Top 5

| 项目 | 今日 ★ | 总 ★ | 语言 | 简介 |
|------|------:|------:|------|------|
| [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) | 673 | 38,659 | Go | Sub2API 一站式开源中转服务，让 Claude、Openai 、Gemini、 |
| [sponsors/JuliusBrussee](https://github.com/sponsors/JuliusBrussee) | 590 | 100,234 | Go | 🪨 why use many token when few token do tri |
| [agent-substrate/substrate](https://github.com/agent-substrate/substrate) | 243 | 1,588 | Go | Agent Substrate: the core system |
| [kubernetes/kubernetes](https://github.com/kubernetes/kubernetes) | 147 | 124,867 | Go | Production-Grade Container Scheduling and  |
| [QuantumNous/new-api](https://github.com/QuantumNous/new-api) | 131 | 45,901 | Go | A unified AI model hub for aggregation &am |

### Rust Top 5

| 项目 | 今日 ★ | 总 ★ | 语言 | 简介 |
|------|------:|------:|------|------|
| [openai/codex](https://github.com/openai/codex) | 4,159 | 111,962 | Rust | Lightweight coding agent that runs in your |
| [sponsors/AprilNEA](https://github.com/sponsors/AprilNEA) | 1,380 | 13,307 | Rust | ⚡️A native, local-first alternative to Log |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | 467 | 4,000 | Rust | Solution for long term memory for agent co |
| [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec) | 350 | 16,217 | Rust | A vector index built on TurboQuant, writte |
| [nautechsystems/nautilus_trader](https://github.com/nautechsystems/nautilus_trader) | 300 | 27,199 | Rust | Production-grade Rust-native trading engin |

---

## 💡 趋势洞察与行动建议

### 今日焦点

- **sponsors/mattpocock**（Shell，今日 +3,362 ★）：Skills for Real Engineers. Straight from my .agents director
- **sponsors/AprilNEA**（Rust，今日 +1,380 ★）：⚡️A native, local-first alternative to Logitech Options+, wr
- **harry0703/MoneyPrinterTurbo**（Python，今日 +1,201 ★）：利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。Generate HD short videos 
- **mahlernim/google-timeline-visualizer**（Kotlin，今日 +1,053 ★）：Visualize your year in travel using your Google Location His
- **sponsors/santifer**（JavaScript，今日 +921 ★）：Open-source AI job search: scan job portals, evaluate listin

### 行动建议

- **对开发者**：关注榜内高动量方向，优先试用与自身技术栈契合的项目（如 Agent 记忆/上下文、向量检索、短视频自动化）。
- **对投资者/企业**：持续跟踪“榜单常客”与新增黑马，注意区分短期流量与长期价值（看 License、主页、commit 活跃度）。
- **对安全/合规团队**：对进入 Trending 的 AI/Agent 类项目保持关注，评估引入风险与开源协议合规性。

---

**数据来源**：GitHub Trending（Daily）实时抓取 + GitHub REST API 元数据增强，抓取于 2026-08-22 18:09:40。对比基线：最近一次落盘快照 2026-08-21-18-00。

**参考链接**：

- sponsors/mattpocock: https://github.com/sponsors/mattpocock
- sponsors/AprilNEA: https://github.com/sponsors/AprilNEA
- harry0703/MoneyPrinterTurbo: https://github.com/harry0703/MoneyPrinterTurbo
- mahlernim/google-timeline-visualizer: https://github.com/mahlernim/google-timeline-visualizer
- sponsors/santifer: https://github.com/sponsors/santifer
- modular/modular: https://github.com/modular/modular
- sponsors/obra: https://github.com/sponsors/obra
- cursor/plugins: https://github.com/cursor/plugins
- sponsors/affaan-m: https://github.com/sponsors/affaan-m
- PostHog/posthog: https://github.com/PostHog/posthog
- apache/maka: https://github.com/apache/maka
- ruvnet/ruflo: https://github.com/ruvnet/ruflo