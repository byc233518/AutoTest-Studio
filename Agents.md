# AutoTest Studio

## 项目概述

AutoTest Studio 是通用的浏览器 UI 自动化测试工作台。  
不绑定特定业务领域：任意可在 Chrome / Edge 中访问的 Web 系统，都可通过「项目 + 环境 + 用例 + 数据 + 执行 + 报告」完成回归。

默认以 Windows 桌面客户端离线运行；同时保留 Express Web API，便于本地调试与后续服务端接入。每个项目有独立目录与 SQLite 数据库，适合同时服务多套被测系统。

## 产品定位

| 能力 | 说明 |
|------|------|
| 通用性 | 被测对象由项目内环境配置决定（Base URL、账号、全局变量），不内置行业模型 |
| 多项目 | 不同客户 / 产品线 / 环境用独立项目隔离用例、数据与报告 |
| 以脚本为中心 | Playwright 脚本可录制、编辑、版本化；平台负责编排与证据沉淀 |
| 本期范围 | 浏览器 UI 自动化；暂不提供接口测试 |

当前仓库内仍保留一套制造业 MES/WMS 示例用例与索引，仅作演示与回归样例，**不代表产品边界**。

## AutoTest Studio 技术栈

| 层级 | 技术 |
|------|------|
| 桌面壳 | Electron 40 + electron-builder |
| 前端 | Vue 3 + Vue Router + Pinia + Element Plus + Vite 7 |
| 编辑器 | CodeMirror 6 |
| 后端 / API | Node.js 22+、Express 5、SQLite |
| 自动化引擎 | Playwright |
| 本地录制器 | .NET 10 WinForms（绿色免安装包） |
| 可选部署 | Docker Compose |

## 如何接入任意被测系统

1. 新建或注册一个桌面项目（独立目录 + SQLite）。
2. 在「环境配置」中填写 Base URL、测试账号与全局变量。
3. 录制或导入 Playwright 脚本，维护数据集。
4. 单条执行或编入测试计划，查看报告与录像。

平台不假设被测系统的前端框架、后端语言或业务模块命名。

## 测试自动化目标

减轻手工测试工作量，提升回归效率。通用痛点：
1. 测试数据准备繁琐
2. 界面操作重复
3. 场景多、难管理、证据难回溯

## 当前进度

- [x] 多项目桌面工作台与 Vue 3 + Element Plus 前端
- [x] 用例树、数据集、脚本录制/编辑、多环境执行
- [x] 测试计划与 Markdown / HTML 报告、截图与录像
- [x] AI 测试数据生成（LLM + 规则回退）
- [x] 自愈定位器基础版（候选链）
- [x] 示例被测系统：制造业 MES/WMS 核心场景沉淀

完善路线图见：`docs/superpowers/specs/2026-07-09-完善路线图-design.md`

---

## 附录：当前示例被测系统（可选参考）

> 以下仅描述本仓库演示用的一套样例环境与代码索引，可整段忽略。换客户 / 换产品时，以项目内环境与用例为准。

### 示例环境

- 地址: http://172.16.100.11:46069/
- 账号: byc
- 密码: Abcd1234
- 数据库: Oracle `172.16.100.11:1521`（用户 `JMOM` / `JZMES123`）

### 示例技术栈（按仓库现状）

| 系统 | 前端 | 后端目标框架 | ORM / 备注 |
|------|------|--------------|------------|
| 基座 | Vue 2 + Element UI + micro-app | .NET 6 | SqlSugar；JWT + Cookie |
| MES | Vue 2 | 主工程 .NET 10；少量 .NET 6 遗留 | SqlSugar |
| WMS | Vue 2 | 以 .NET 6 为主，另有 .NET 5 / .NET 8 | SqlSugar |
| QMS | Vue 2 | .NET 6 | SqlSugar |
| TPM | Vue 2 | .NET 6 | SqlSugar |

### 示例代码仓库

| 系统 | 前端 | 后端 |
|------|------|------|
| 基座 | `F:\workspace\jmom\jmom.vue` | `F:\workspace\jmom\ims-jmom` |
| MES | `F:\workspace\jmom\imes.vue` | `F:\workspace\jmom\imes.api` |
| WMS | `F:\workspace\jmom\iWMS5.Vue` | `F:\workspace\jmom\iWMS5` |
| QMS | `F:\workspace\jmom\IQMS.VUE` | `F:\workspace\IQMS` |
| TPM | `F:\workspace\jmom\itpm.vue` | `F:\workspace\jmom\ITPM.API` |
| 旧 MES | `F:\workspace\ims.vue.d2` | `F:\workspace\jz.ims` |

SRM 为独立系统，当前示例扫描不包含它。

模块菜单与场景优先级索引见：`docs/项目索引.md`（文档后半为示例系统索引）。
