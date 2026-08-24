---
title: GitHub Trending 聚焦（2026-08-24）
date: 2026-08-24 18:00:00
categories:
- [热点追踪, GitHub趋势]
tags: [GitHub, Trending, 开源项目, AI Agent, 开发者工具, Python, Rust, TypeScript, Go]
---

> 数据抓取时间：2026-08-24 18:06:04（北京时间）。对比基线：**2026-08-23 18:00** 同系统完整快照。
> 对比口径：本仓库 09:00 任务为综合热点选题分析，不输出 GitHub Trending 全榜，故无同日 09:00 GitHub 快照可比。本次以最近一次完整 Trending 快照（08-23 18:00）为基线，按「单日新增星标数（stars today）」量化热度速度，标注 **新增 / 上升 / 下降 / 跌出**；其中「新增 / 跌出」为相对昨日榜单的进出，「上升 / 下降」为仍在榜项目今昨单日增量的变化。

## 一、今日速览

今日 GitHub Trending Daily 全榜共 **18** 个项目上榜。语言分布：
- Rust：5 个
- Python：5 个
- JavaScript：2 个
- Shell：2 个
- TypeScript：2 个
- Unknown：1 个
- HTML：1 个

**一句话趋势**：今日榜单被 **「AI 编程平权」与「本地优先 Agent」** 双主线主导——一边是「免费用 Claude Code / Codex」、社区插件市场、把技术书变成 Claude Code 技能这类**降低 AI 编程门槛**的工具集中涌入；另一边是 local-first 的 Agent 工作区、个人记忆大脑、Bitwarden 兼容服务器等**隐私优先 / 数据不出本机**项目持续升温。同时老牌强者 openai/codex 单日增量由 1544 跳到 2715，热度仍在加速。

## 二、与基线对比（2026-08-23 18:00）

- 🆕 **新增项目**：13 个（昨日未上榜，今日冲入）
- 🔁 **仍在榜（延续）**：5 个（其中 🟢上升 / 🔴下降 / ➖持平 见下表）
- ⬇️ **跌出榜单**：12 个（昨日上榜，今日未进 daily）

### 仍在榜项目热度变化（上升 / 下降）

| 状态 | 变化 | 项目 | 今日+⭐ | 昨日+⭐ |
| --- | --- | --- | --- | --- |
| 🟢 上升 | +1171 | [openai/codex](https://github.com/openai/codex) | 2,715 | 1,544 |
| 🔴 下降 | -236 | [sponsors/mattpocock](https://github.com/sponsors/mattpocock) | 2,447 | 2,683 |
| 🟢 上升 | +50 | [sponsors/AprilNEA](https://github.com/sponsors/AprilNEA) | 1,009 | 959 |
| 🔴 下降 | -214 | [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | 615 | 829 |
| 🟢 上升 | +16 | [sponsors/affaan-m](https://github.com/sponsors/affaan-m) | 427 | 411 |

### 跌出榜单（昨日上榜，今日未进 daily，按昨日增量排序）

- ⬇️ [sponsors/obra](https://github.com/sponsors/obra)（昨日 +592，总 276,426）
- ⬇️ [mahlernim/google-timeline-visualizer](https://github.com/mahlernim/google-timeline-visualizer)（昨日 +441，总 2,638）
- ⬇️ [modular/modular](https://github.com/modular/modular)（昨日 +395，总 28,910）
- ⬇️ [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)（昨日 +315，总 205,533）
- ⬇️ [PostHog/posthog](https://github.com/PostHog/posthog)（昨日 +286，总 38,733）
- ⬇️ [cursor/plugins](https://github.com/cursor/plugins)（昨日 +286，总 4,736）
- ⬇️ [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api)（昨日 +278，总 38,936）
- ⬇️ [makeplane/plane](https://github.com/makeplane/plane)（昨日 +263，总 57,393）
- ⬇️ [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)（昨日 +150，总 5,632）
- ⬇️ [n8n-io/n8n](https://github.com/n8n-io/n8n)（昨日 +149，总 202,006）
- ⬇️ [anthropics/claude-code](https://github.com/anthropics/claude-code)（昨日 +127，总 142,689）
- ⬇️ [microsoft/TypeScript](https://github.com/microsoft/TypeScript)（昨日 +104，总 110,600）

## 三、重点新增项目深度解析

下面挑选今日新增中**涨幅最高或最具场景级应用价值**的项目，做亮点与应用场景拆解。

### 1. Alishahryar1/free-claude-code

**项目地址**：https://github.com/Alishahryar1/free-claude-code
**今日新增**：1,081 ⭐ ｜ **总星标**：48,351 ｜ **语言**：Python ｜ **License**：MIT
**简介**：Use Claude Code, Codex, Pi, and OpenCode for free (1.3B+ free tokens) from your terminal, app, IDE, or phone like OpenClaw (voice supported + ToS friendly)

**趋势亮点**

终端/IDE/手机里免费用 Claude Code、Codex、Pi、OpenCode（号称 1.3B+ 免费额度，voice 支持且 ToS 友好）。今日新增 1081 ⭐，是全榜新面孔里涨幅最高的。

**主要特性**

- 多入口：终端、App、IDE、手机均可调用，支持语音
- 聚合 Claude Code / Codex / Pi / OpenCode 多个 Agent
- 主打「免费额度 + 合规友好」，降低个人上手门槛

**应用场景**

- **个人开发者**：零成本体验一线 AI 编程 Agent
- **学生 / 爱好者**：用语音在手机上做轻量编程
- **小团队**：在不采购企业版的前提下验证 Agent 工作流

### 2. basecamp/omarchy

**项目地址**：https://github.com/basecamp/omarchy
**今日新增**：750 ⭐ ｜ **总星标**：29,579 ｜ **语言**：Shell ｜ **License**：MIT
**简介**：Beautiful, Modern & Opinionated Linux

**趋势亮点**

Basecamp 出品的一套「漂亮、现代、有主张」的 Linux 桌面配置（Shell 驱动），把开发者从繁琐的环境调校里解放出来。今日新增 750 ⭐。

**主要特性**

- Opinionated 预设：开箱即用的现代化 Linux 桌面
- 以 Shell 脚本编排，可复现、可自定义
- 源自 Basecamp 团队的真实工作流沉淀

**应用场景**

- **开发者 / 极客**：一条命令拉起顺手的 Linux 工作环境
- **新机部署**：重装或换机后快速还原生产力环境
- **团队标准化**：统一开发机基线配置

### 3. NousResearch/hermes-agent

**项目地址**：https://github.com/NousResearch/hermes-agent
**今日新增**：454 ⭐ ｜ **总星标**：235,382 ｜ **语言**：Python ｜ **License**：MIT
**简介**：The agent that grows with you

**趋势亮点**

NousResearch 的「与你共同成长的 Agent」，主打长期陪伴式智能体。今日新增 454 ⭐，总星标已 23.5 万。

**主要特性**

- 成长型 Agent：随使用积累个性化上下文
- 面向 Claude / ChatGPT / Codex 多端兼容
- 社区活跃（topics 含 ai-agent、claude-code 等）

**应用场景**

- **重度 AI 用户**：把 Agent 当成可长期协作的搭档
- **工作流沉淀**：让 Agent 记住偏好与项目背景
- **研究 / 实验**：观察 Agent 个性化演进

### 4. sponsors/virgiliojr94

**项目地址**：https://github.com/sponsors/virgiliojr94
**今日新增**：417 ⭐ ｜ **总星标**：25,013 ｜ **语言**：Python ｜ **License**：—
**简介**：Turn any technical book PDF into a Claude Code skill — ready to study, reference, and use while you work.

**趋势亮点**

把任意技术书 PDF 一键转成 Claude Code 技能（skill）——可边读边用、边查边干。今日新增 417 ⭐。

**主要特性**

- PDF → Claude Code Skill 的自动化流水线
- 产出可直接在编码会话中引用的技能包
- 适合把手册、规范、论文变成可执行的上下文

**应用场景**

- **工程师**：把公司规范 / 框架文档转成可调用技能
- **学习者**：边读书边生成复习 / 查阅型技能
- **技术写作者**：把书稿沉淀为交互式知识

### 5. block/buzz

**项目地址**：https://github.com/block/buzz
**今日新增**：410 ⭐ ｜ **总星标**：30,334 ｜ **语言**：Rust ｜ **License**：Apache-2.0
**简介**：A hive mind communication platform

**趋势亮点**

Block 开源的「蜂群思维（hive mind）」通信平台，用 Rust 编写，主打群体 / 团队级实时协作通信。今日新增 410 ⭐。

**主要特性**

- Rust 实现，注重性能与可靠
- 面向团队 / 群体的通信与协同
- 开源可自托管，数据可控

**应用场景**

- **分布式团队**：自建可控的协作通信层
- **社区 / 组织**：把多个频道 / 群体编织成「蜂群」
- **隐私敏感场景**：自托管替代 SaaS 通信工具

### 6. freestylefly/awesome-gpt-image-2

**项目地址**：https://github.com/freestylefly/awesome-gpt-image-2
**今日新增**：401 ⭐ ｜ **总星标**：14,596 ｜ **语言**：JavaScript ｜ **License**：MIT
**简介**：Prompt as Code | GPT-Image2 工业级提示词引擎与模板库，530+ 个案例逆向工程，20+ 套工业级模板，并提炼出Skills，持续更新中

**趋势亮点**

GPT-Image-2 工业级提示词引擎与模板库：530+ 案例逆向工程、20+ 套工业级模板，并提炼成可复用的 Skills。今日新增 401 ⭐。

**主要特性**

- Prompt-as-Code：把高质量图像提示词工程化、模板化
- 530+ 逆向案例 + 20+ 工业模板，持续更新
- 提炼为 Skills，可嵌入自动化工作流

**应用场景**

- **设计 / 运营**：稳定产出风格一致的高质量图
- **AI 图像工作流**：把提示词沉淀为可复用资产
- **创业者**：批量生成营销 / 电商视觉

### 7. anthropics/claude-plugins-community

**项目地址**：https://github.com/anthropics/claude-plugins-community
**今日新增**：225 ⭐ ｜ **总星标**：1,149 ｜ **语言**：Python ｜ **License**：Apache-2.0
**简介**：Community plugin marketplace for Claude Cowork and Claude Code. Read-only mirror — submit plugins at clau.de/plugin-directory-submission.

**趋势亮点**

Anthropic 官方维护的 Claude Cowork / Claude Code 社区插件市场（只读镜像，插件经 clau.de 提交）。今日新增 225 ⭐。

**主要特性**

- 官方社区插件目录，质量与合规有背书
- 面向 Claude Code / Cowork 的扩展生态
- 提交走官方流程，便于治理

**应用场景**

- **Claude Code 用户**：一站式发现可信插件
- **插件作者**：借官方目录分发能力
- **企业**：在受控目录内选配扩展

### 8. Comfy-Org/ComfyUI

**项目地址**：https://github.com/Comfy-Org/ComfyUI
**今日新增**：201 ⭐ ｜ **总星标**：129,666 ｜ **语言**：Python ｜ **License**：GPL-3.0
**简介**：The most powerful and modular diffusion model GUI, api and backend with a graph/nodes interface.

**趋势亮点**

最强、最模块化的扩散模型 GUI / API / 后端，基于图（节点）编排。今日新增 201 ⭐，总星标近 13 万。

**主要特性**

- 节点式可视化工作流，灵活组合生成管线
- 后端 + API 一体，便于工程化集成
- 生态庞大（Stable Diffusion / PyTorch 等）

**应用场景**

- **AI 绘画 / 视频创作者**：搭复杂生成流水线
- **工程团队**：把图像生成嵌进自有服务
- **研究者**：快速实验模型与节点组合

### 9. sponsors/VoltAgent

**项目地址**：https://github.com/sponsors/VoltAgent
**今日新增**：156 ⭐ ｜ **总星标**：31,557 ｜ **语言**：Unknown ｜ **License**：—
**简介**：A curated collection of 1000+ agent skills from official dev teams and the community, compatible with Claude Code, Codex, Gemini CLI, Cursor, and more.

**趋势亮点**

1000+ 精选 Agent 技能合集，覆盖官方团队与社区，兼容 Claude Code、Codex、Gemini CLI、Cursor 等。今日新增 156 ⭐。

**主要特性**

- 1000+ 技能库，跨多家 Agent 兼容
- 官方 + 社区双来源，覆盖面广
- 即取即用的技能清单

**应用场景**

- **多 Agent 用户**：一个仓库补齐各端技能
- **新手**：快速借成熟技能上手 Agent
- **团队**：统一技能供给

### 10. ruvnet/ruflo

**项目地址**：https://github.com/ruvnet/ruflo
**今日新增**：131 ⭐ ｜ **总星标**：69,217 ｜ **语言**：TypeScript ｜ **License**：MIT
**简介**：🌊 The original agent meta-harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, RAG integration, and native Claude Code / Codex / Hermes and many more Integrated

**趋势亮点**

「原创 Agent 元编排（meta-harness）」：部署智能多体（swarm）、协调自治工作流、构建对话式 AI 系统，带自适应记忆与自学习。今日新增 131 ⭐。

**主要特性**

- 多体 swarm 编排 + 自治工作流协调
- 自适应记忆、自学习智能、RAG 集成
- 原生对接 Claude Code / Codex / Hermes

**应用场景**

- **Agent 平台构建者**：用元编排统筹多 Agent
- **复杂任务**：把大目标拆给 swarm 并行推进
- **研究**：多体协作 / swarm intelligence 实验

### 11. apache/maka

**项目地址**：https://github.com/apache/maka
**今日新增**：51 ⭐ ｜ **总星标**：2,515 ｜ **语言**：TypeScript ｜ **License**：Apache-2.0
**简介**：Apache Maka (Incubating) is a local-first AI agent workspace. Model messages, tool calls, tool results, permission decisions, and termination events are recorded as an append-only log.

**趋势亮点**

Apache 孵化中的 local-first AI Agent 工作区：把模型消息、工具调用、工具结果、权限决策、终止事件记录为「仅追加日志」。今日新增 51 ⭐。

**主要特性**

- Local-first：数据留在本地
- 事件溯源：全部交互以 append-only log 留存，可回放审计
- Apache 孵化，含 CLI / 桌面（Electron）形态

**应用场景**

- **注重隐私的团队**：本地运行、可审计的 Agent 工作区
- **合规场景**：完整留痕便于复盘与追溯
- **平台工程师**：基于事件溯源搭建可控 Agent 底座

### 12. tinyhumansai/openhuman

**项目地址**：https://github.com/tinyhumansai/openhuman
**今日新增**：39 ⭐ ｜ **总星标**：36,981 ｜ **语言**：Rust ｜ **License**：GPL-3.0
**简介**：Your Personal AI super intelligence. A brain that builds a local-first memory of your life, a fantastic orchestrator of agent fleets and workflows, and a deep researcher.

**趋势亮点**

「你的个人 AI 超级智能」：构建本地优先的人生记忆大脑，并作为 Agent 集群与工作流编排器、深度研究员。今日新增 39 ⭐，Rust 编写。

**主要特性**

- Local-first 个人记忆，数据不出本机
- Agent 集群 + 工作流编排 + 深度研究三合一
- Rust 实现，注重性能与隐私

**应用场景**

- **个人知识管理**：把记忆 / 经历交给本地大脑
- **自动化爱好者**：用编排器串起日常 Agent 流
- **研究者**：本地优先的深度调研助手

### 13. sponsors/dani-garcia

**项目地址**：https://github.com/sponsors/dani-garcia
**今日新增**：78 ⭐ ｜ **总星标**：66,030 ｜ **语言**：Rust ｜ **License**：—
**简介**：Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs

**趋势亮点**

Rust 编写的 Bitwarden 兼容服务器（原 bitwarden_rs）。今日新增 78 ⭐，总星标 6.6 万。

**主要特性**

- Bitwarden 兼容，可自托管密码管理
- Rust 实现，轻量高性能
- 隐私优先，数据完全自持

**应用场景**

- **注重隐私的用户**：自建密码管理服务
- **小团队**：内网部署可控的凭据库
- **自托管玩家**：替代官方云端订阅

## 四、分语言榜单

### Python（18 个）

- 🆕 **[Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code)** `Python` ⭐ +1,081（总 48,351） — Use Claude Code, Codex, Pi, and OpenCode for free (1.3B+ free tokens) from your terminal, app, IDE, or phone like OpenClaw (voice supported + ToS friendly)
- 🆕 **[sponsors/virgiliojr94](https://github.com/sponsors/virgiliojr94)** `Python` ⭐ +417（总 25,012） — Turn any technical book PDF into a Claude Code skill — ready to study, reference, and use while you work.
- 🆕 **[anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community)** `Python` ⭐ +225（总 1,149） — Community plugin marketplace for Claude Cowork and Claude Code. Read-only mirror — submit plugins at clau.de/plugin-directory-submission.
- 🆕 **[Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI)** `Python` ⭐ +201（总 129,666） — The most powerful and modular diffusion model GUI, api and backend with a graph/nodes interface.
- 🆕 **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)** `Python` ⭐ +454（总 235,382） — The agent that grows with you
- **[elder-plinius/OBLITERATUS](https://github.com/elder-plinius/OBLITERATUS)** `Python` ⭐ +30（总 8,001） — OBLITERATE THE CHAINS THAT BIND YOU
- **[PostHog/posthog](https://github.com/PostHog/posthog)** `Python` ⭐ +293（总 38,806） — 🦔 PostHog is the leading platform for building self-driving products. Our developer tools – AI observability, analytics, session replay, flags, experiments, error tracking, logs, and more – capture all the context agents need to diagnose problems, uncover opportunities, and ship fixes. Steer it all from Slack, web, desktop, or the MCP.
- **[Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)** `Python` ⭐ +60（总 186,848） — AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters.
- **[NVIDIA-NeMo/Speech](https://github.com/NVIDIA-NeMo/Speech)** `Python` ⭐ +38（总 18,293） — A scalable generative AI framework built for researchers and developers working on Large Language Models, Multimodal, and Speech AI (Automatic Speech Recognition and Text-to-Speech)
- **[anthropics/claude-code](https://github.com/anthropics/claude-code)** `Python` ⭐ +361（总 142,822） — Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows - all through natural language commands.
- **[sponsors/davila7](https://github.com/sponsors/davila7)** `Python` ⭐ +25（总 30,367） — CLI tool for configuring and monitoring Claude Code
- **[sponsors/django](https://github.com/sponsors/django)** `Python` ⭐ +40（总 88,761） — The Web framework for perfectionists with deadlines.
- **[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** `Python` ⭐ +193（总 11,487） — VoiceStudio is the open-source, fully-local ElevenLabs alternative — voice cloning, voice design, video dubbing, dictation, transcription &amp; audiobook creation in 646 languages.
- **[davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude)** `Python` ⭐ +9（总 3,331） — A single hub to find Claude Skills, Agents, Commands, Hooks, Plugins, and Marketplace collections to extend Claude Code, Claude Desktop, Agent SDK and OpenClaw
- **[sponsors/unclecode](https://github.com/sponsors/unclecode)** `Python` ⭐ +153（总 79,296） — 🚀🤖 Crawl4AI: Open-source LLM Friendly Web Crawler &amp; Scraper. Don't be shy, join here: https://discord.gg/jP8KfhDhyN
- **[bytedance/deer-flow](https://github.com/bytedance/deer-flow)** `Python` ⭐ +115（总 80,762） — An open-source long-horizon SuperAgent harness that researches, codes, and creates. With the help of sandboxes, memories, tools, skill, subagents and message gateway, it handles different levels of tasks that could take minutes to hours.
- **[shy3130/tick-stock-panel](https://github.com/shy3130/tick-stock-panel)** `Python` ⭐ +79（总 3,587） — TSP自托管、零运维的 A 股「选股 + 监控 + 回测」量化工作台 | 基于 TickFlow 数据源 | LLM能力驱使策略定制+个股分析+复盘 | 自由接入第三方数据源与个性化扩展数据 | 个人开源 ,非第三方官方项目
- **[666ghj/MiroFish](https://github.com/666ghj/MiroFish)** `Python` ⭐ +52（总 71,474） — A Simple and Universal Swarm Intelligence Engine, Predicting Anything. 简洁通用的群体智能引擎，预测万物

### Typescript（21 个）

- 🆕 **[apache/maka](https://github.com/apache/maka)** `TypeScript` ⭐ +51（总 2,515） — Apache Maka (Incubating) is a local-first AI agent workspace. Model messages, tool calls, tool results, permission decisions, and termination events are recorded as an append-only log.
- 🆕 **[ruvnet/ruflo](https://github.com/ruvnet/ruflo)** `TypeScript` ⭐ +131（总 69,217） — 🌊 The original agent meta-harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, RAG integration, and native Claude Code / Codex / Hermes and many more Integrated
- **[sponsors/anomalyco](https://github.com/sponsors/anomalyco)** `TypeScript` ⭐ +368（总 200,834） — The open source coding agent.
- **[sponsors/withastro](https://github.com/sponsors/withastro)** `TypeScript` ⭐ +43（总 61,991） — The web framework for content-driven websites. ⭐️ Star to support our work!
- **[bookorbit/bookorbit](https://github.com/bookorbit/bookorbit)** `TypeScript` ⭐ +204（总 3,076） — BookOrbit: Your Reading Space
- **[proliferate-ai/proliferate](https://github.com/proliferate-ai/proliferate)** `TypeScript` ⭐ +32（总 334） — The open-source AI IDE for Claude Code, Codex, OpenCode, and more. Run agents in parallel, locally or in the cloud, and build reusable workflows.
- **[facebook/astryx](https://github.com/facebook/astryx)** `TypeScript` ⭐ +27（总 12,293） — An open source design system that's fully customizable and agent ready
- **[sponsors/diegosouzapw](https://github.com/sponsors/diegosouzapw)** `TypeScript` ⭐ +597（总 54,101） — Never stop coding. Free MIT AI gateway: one endpoint, 350 providers (90+ free), 1200+ models Kimi, Claude, GPT, Gemini, GLM, DeepSeek, MiniMax. Works with Claude Code, Codex, Cursor, OpenCode, Cline &amp; Copilot. Quota-aware auto-fallback, RTK+Caveman compression saves 15-95% tokens, MCP/A2A, Desktop/PWA. Built by 450+ contributors
- **[sponsors/laurent22](https://github.com/sponsors/laurent22)** `TypeScript` ⭐ +11（总 56,076） — Joplin - the privacy-focused note taking app with sync capabilities for Windows, macOS, Linux, Android and iOS.
- **[sponsors/ibelick](https://github.com/sponsors/ibelick)** `TypeScript` ⭐ +94（总 7,535） — Skills for Design Engineers
- **[makeplane/plane](https://github.com/makeplane/plane)** `TypeScript` ⭐ +390（总 57,625） — 🔥🔥🔥 Open-source Jira, Linear, Monday, and ClickUp alternative. Plane is a modern project management platform to manage tasks, sprints, docs, and triage.
- **[can1357/oh-my-pi](https://github.com/can1357/oh-my-pi)** `TypeScript` ⭐ +229（总 26,987） — ⌥ Coding agent with the IDE wired in
- **[moeru-ai/airi](https://github.com/moeru-ai/airi)** `TypeScript` ⭐ +54（总 48,333） — 💖🧸 Self hosted, you-owned Grok Companion, a container of souls of waifu, cyber livings to bring them into our worlds, wishing to achieve Neuro-sama's altitude. Capable of realtime voice chat, Minecraft, Factorio playing. Web / macOS / Windows supported.
- **[sponsors/AnmolSaini16](https://github.com/sponsors/AnmolSaini16)** `TypeScript` ⭐ +216（总 11,850） — Beautiful map components. 100% Free, Zero config, one command setup.
- **[DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)** `TypeScript` ⭐ +3（总 51,389） — The repository for high quality TypeScript type definitions.
- **[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)** `TypeScript` ⭐ +35（总 106,652） — An open-source AI agent that brings the power of Gemini directly into your terminal.
- **[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)** `TypeScript` ⭐ +176（总 42,395） — Write HTML. Render video. Built for agents.
- **[twentyhq/twenty](https://github.com/twentyhq/twenty)** `TypeScript` ⭐ +57（总 55,434） — The open alternative to Salesforce, designed for AI.
- **[superset-sh/superset](https://github.com/superset-sh/superset)** `TypeScript` ⭐ +28（总 13,281） — Superset is an agentic IDE to orchestrate 100+ coding agents in parallel. Run any agent with your own subscription.
- **[sponsors/nocodb](https://github.com/sponsors/nocodb)** `TypeScript` ⭐ +25（总 64,697） — 🔥 🔥 🔥 A Free &amp; Self-hostable Airtable Alternative
- **[n8n-io/n8n](https://github.com/n8n-io/n8n)** `TypeScript` ⭐ +476（总 202,232） — Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.

### Go（20 个）

- **[microsoft/TypeScript](https://github.com/microsoft/TypeScript)** `Go` ⭐ +141（总 110,643） — TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- **[google/sam](https://github.com/google/sam)** `Go` ⭐ +138（总 636） — SAM Sovereign Agent Mesh
- **[kubernetes/minikube](https://github.com/kubernetes/minikube)** `Go` ⭐ +0（总 32,056） — Run Kubernetes locally
- **[sponsors/bjarneo](https://github.com/sponsors/bjarneo)** `Go` ⭐ +62（总 3,550） — cliamp - Terminal music player inspired by winamp
- **[github/github-mcp-server](https://github.com/github/github-mcp-server)** `Go` ⭐ +23（总 32,464） — GitHub's official MCP Server
- **[restic/restic](https://github.com/restic/restic)** `Go` ⭐ +21（总 35,691） — Fast, secure, efficient backup program
- **[Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api)** `Go` ⭐ +269（总 39,146） — Sub2API 一站式开源中转服务，让 Claude、Openai 、Gemini、Grok订阅统一接入，支持拼车共享，更高效分摊成本，原生工具无缝使用。
- **[charmbracelet/crush](https://github.com/charmbracelet/crush)** `Go` ⭐ +39（总 27,630） — Glamourous agentic coding for all 💘
- **[mvanhorn/printing-press-library](https://github.com/mvanhorn/printing-press-library)** `Go` ⭐ +7（总 1,953） — Official library of CLIs generated by the CLI Printing Press. Endorsed, tested, and community-contributed.
- **[compozy/compozy](https://github.com/compozy/compozy)** `Go` ⭐ +8（总 2,659） — An operating system for AI agents. Plug in the agent CLIs you already use (Claude Code, Codex, Gemini CLI, Cursor) and they become a team: they split the work, hand tasks to each other, run automated on jobs and loops, and share one project memory. You steer everything from the browser.
- **[opentofu/opentofu](https://github.com/opentofu/opentofu)** `Go` ⭐ +12（总 29,892） — OpenTofu lets you declaratively manage your cloud infrastructure.
- **[sponsors/MHSanaei](https://github.com/sponsors/MHSanaei)** `Go` ⭐ +49（总 45,184） — Xray panel supporting multi-protocol multi-user expire day &amp; traffic &amp; IP limit (Vmess, Vless, Trojan, ShadowSocks, Wireguard, Hysteria, Tunnel, Mixed, HTTP, Tun, MTProto)
- **[evanw/esbuild](https://github.com/evanw/esbuild)** `Go` ⭐ +0（总 40,016） — An extremely fast bundler for the web
- **[open-policy-agent/opa](https://github.com/open-policy-agent/opa)** `Go` ⭐ +4（总 12,148） — Open Policy Agent (OPA) is an open source, general-purpose policy engine.
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** `Go` ⭐ +103（总 21,294） — Fast, efficient, battle-tested at Alibaba's scale. Hybrid architecture code review tool: deterministic pipelines + LLM Agent, precise line-level comments, built-in multi-language ruleset (NPE, thread-safety, XSS, SQL injection), OpenAI &amp; Anthropic compatible.
- **[gastownhall/gastown](https://github.com/gastownhall/gastown)** `Go` ⭐ +21（总 17,754） — Gas Town - multi-agent workspace manager
- **[argoproj/argo-workflows](https://github.com/argoproj/argo-workflows)** `Go` ⭐ +2（总 16,931） — Workflow Engine for Kubernetes
- **[astaxie/TokenHub](https://github.com/astaxie/TokenHub)** `Go` ⭐ +3（总 1,165） — TokenHub gives enterprises a private gateway to unify AI model access and governance, making every request controllable, traceable, and attributable.
- **[k3s-io/k3s](https://github.com/k3s-io/k3s)** `Go` ⭐ +5（总 33,798） — Lightweight Kubernetes
- **[sponsors/bbernhard](https://github.com/sponsors/bbernhard)** `Go` ⭐ +7（总 2,793） — Dockerized Signal Messenger REST API

### Rust（19 个）

- **[openai/codex](https://github.com/openai/codex)** `Rust` ⭐ +2,715（总 116,515） — Lightweight coding agent that runs in your terminal
- **[sponsors/AprilNEA](https://github.com/sponsors/AprilNEA)** `Rust` ⭐ +1,009（总 15,392） — ⚡️A native, local-first alternative to Logitech Options+, written in Rust 🦀 — remap buttons, DPI, and SmartShift over HID++. No account, no telemetry.
- 🆕 **[block/buzz](https://github.com/block/buzz)** `Rust` ⭐ +410（总 30,334） — A hive mind communication platform
- 🆕 **[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)** `Rust` ⭐ +39（总 36,981） — Your Personal AI super intelligence. A brain that builds a local-first memory of your life, a fantastic orchestrator of agent fleets and workflows, and a deep researcher.
- 🆕 **[sponsors/dani-garcia](https://github.com/sponsors/dani-garcia)** `Rust` ⭐ +78（总 66,030） — Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs
- **[nautechsystems/nautilus_trader](https://github.com/nautechsystems/nautilus_trader)** `Rust` ⭐ +174（总 27,589） — Production-grade Rust-native trading engine with deterministic event-driven architecture
- **[sponsors/biomejs](https://github.com/sponsors/biomejs)** `Rust` ⭐ +9（总 25,633） — A toolchain for web projects, aimed to provide functionalities to maintain them. Biome offers formatter and linter, usable via CLI and LSP.
- **[vercel/turborepo](https://github.com/vercel/turborepo)** `Rust` ⭐ +15（总 31,002） — Build system optimized for JavaScript and TypeScript, written in Rust
- **[sponsors/sinelaw](https://github.com/sponsors/sinelaw)** `Rust` ⭐ +27（总 8,485） — Terminal based IDE &amp; text editor: easy, powerful and fast
- **[slint-ui/slint](https://github.com/slint-ui/slint)** `Rust` ⭐ +15（总 23,552） — Slint is an open-source declarative GUI toolkit to build native user interfaces for Rust, C++, JavaScript, or Python apps.
- **[sponsors/us](https://github.com/sponsors/us)** `Rust` ⭐ +38（总 711） — Fast, lightweight Firecrawl/Tavily alternative in Rust. Web scraper, crawler &amp; search API with MCP server for AI agents. Drop-in Firecrawl-compatible API (/scrape, /crawl, /search). 2.3x faster than Tavily, 1.5x faster than Firecrawl in 1K-URL benchmarks. 6 MB RAM, single binary. Self-host or use managed cloud.
- **[windmill-labs/windmill](https://github.com/windmill-labs/windmill)** `Rust` ⭐ +20（总 17,658） — Open-source developer platform to power your entire infra and turn scripts into webhooks, workflows and UIs. Fastest workflow engine (13x vs Airflow). Open-source alternative to Retool and Temporal.
- **[sponsors/erickochen](https://github.com/sponsors/erickochen)** `Rust` ⭐ +3（总 653） — Free, open-source terminal SSH manager and SSH config editor in Rust for macOS and Linux that keeps ~/.ssh/config in sync with 17 cloud providers, monitors live SSH tunnels and manages Docker and Podman containers fleet-wide. Plus scp, Vault SSH certs and an MCP server for AI agents.
- **[oven-sh/bun](https://github.com/oven-sh/bun)** `Rust` ⭐ +43（总 95,637） — Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one
- **[gitbutlerapp/gitbutler](https://github.com/gitbutlerapp/gitbutler)** `Rust` ⭐ +8（总 21,555） — The GitButler version control client, backed by Git, powered by Tauri/Rust/Svelte
- **[sponsors/oxc-project](https://github.com/sponsors/oxc-project)** `Rust` ⭐ +12（总 22,463） — ⚓ A collection of high-performance JavaScript tools.
- **[ruvnet/RuView](https://github.com/ruvnet/RuView)** `Rust` ⭐ +111（总 91,443） — π RuView turns commodity WiFi signals into real-time spatial intelligence, vital sign monitoring, and presence detection — all without a single pixel of video.
- **[rust-lang/rust-analyzer](https://github.com/rust-lang/rust-analyzer)** `Rust` ⭐ +5（总 16,787） — A Rust compiler front-end for IDEs
- **[gfx-rs/wgpu](https://github.com/gfx-rs/wgpu)** `Rust` ⭐ +7（总 17,851） — A cross-platform, safe, pure-Rust graphics API.

## 五、总结与趋势洞察

今日榜单折射出几条清晰主线：

1. **AI 编程「平权」浪潮**：free-claude-code（免费用一线 Agent）、claude-plugins-community（官方插件市场）、virgiliojr94（书→技能）、VoltAgent（千个技能库）集中出现，社区正把「用上、用好 AI 编程」的门槛一路打到底。
2. **Local-first / 隐私优先成共识**：apache/maka、tinyhumansai/openhuman、sponsors/dani-garcia（Bitwarden 兼容）等本地优先项目持续涌入，「数据不出本机 + 可审计」成为卖点。
3. **Agent 从「单兵」走向「群体 / 平台」**：ruflo（swarm 元编排）、hermes-agent（成长型 Agent）、block/buzz（蜂群通信）说明编排与协同是下一站。
4. **老牌强者仍在加速**：openai/codex 单日增量由 1544 → 2715，继续领跑仍在榜项目中的上升幅度。
5. **内容 / 图像生产工具长跑不衰**：awesome-gpt-image-2、ComfyUI 等名列新增，提示词工程化与扩散模型工作流仍是高频刚需。

> **行动建议**：开发者可优先试用 free-claude-code / claude-plugins-community 扩容 Agent 能力；注重隐私的团队关注 apache/maka、openhuman、dani-garcia；做多 Agent 系统的可参考 ruflo 的 swarm 编排范式。

---

**参考链接（今日全榜）**：

- openai/codex: https://github.com/openai/codex
- sponsors/mattpocock: https://github.com/sponsors/mattpocock
- Alishahryar1/free-claude-code: https://github.com/Alishahryar1/free-claude-code
- sponsors/AprilNEA: https://github.com/sponsors/AprilNEA
- basecamp/omarchy: https://github.com/basecamp/omarchy
- ripienaar/free-for-dev: https://github.com/ripienaar/free-for-dev
- NousResearch/hermes-agent: https://github.com/NousResearch/hermes-agent
- sponsors/affaan-m: https://github.com/sponsors/affaan-m
- sponsors/virgiliojr94: https://github.com/sponsors/virgiliojr94
- block/buzz: https://github.com/block/buzz
- freestylefly/awesome-gpt-image-2: https://github.com/freestylefly/awesome-gpt-image-2
- anthropics/claude-plugins-community: https://github.com/anthropics/claude-plugins-community
- Comfy-Org/ComfyUI: https://github.com/Comfy-Org/ComfyUI
- sponsors/VoltAgent: https://github.com/sponsors/VoltAgent
- ruvnet/ruflo: https://github.com/ruvnet/ruflo
- sponsors/dani-garcia: https://github.com/sponsors/dani-garcia
- apache/maka: https://github.com/apache/maka
- tinyhumansai/openhuman: https://github.com/tinyhumansai/openhuman
