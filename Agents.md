# AutoTest Studio

## 项目概述

AutoTest Studio 是面向制造业 MES（制造执行系统）+ WMS（仓库管理系统）一体化平台的自动化测试工作台。
被测系统前端采用 micro-app 微前端架构集成多个子应用。

## 被测系统技术栈

| 层级 | 技术 |
|------|------|
| 前端基座 | Vue 2 + Element UI + micro-app |
| 后端 | ASP.NET Core 6 + SqlSugar ORM |
| 数据库 | Oracle |
| 认证 | JWT Token + Cookie |

## 测试环境

- 地址: http://172.16.100.11:46069/
- 账号: byc
- 密码: Abcd1234

## 代码仓库

### 基座系统
- 前端: `F:\workspace\jmom\jmom.vue`
- 后端: `F:\workspace\jmom\ims-jmom`

### MES 制造执行
- 前端: `F:\workspace\jmom\imes.vue`
- 后端: `F:\workspace\jmom\imes.api`

### WMS 仓储管理
- 前端: `F:\workspace\jmom\iWMS5.Vue`
- 后端: `F:\workspace\jmom\iWMS5`

### QMS 质量管理
- 前端: `F:\workspace\jmom\IQMS.VUE`
- 后端: `F:\workspace\IQMS`

### TPM 设备管理
- 前端: `F:\workspace\jmom\itpm.vue`
- 后端: `F:\workspace\jmom\ITPM.API`

### 旧版 MES 制造执行
- 前端: `F:\workspace\ims.vue.d2`
- 后端: `F:\workspace\jz.ims`

SRM 是独立系统，本项目当前不扫描、不生成测试场景。

## 数据库连接

- 主机: 172.16.100.11:1521
- 用户名: JMOM
- 密码: JZMES123
- 类型: Oracle

## 项目索引

详细的功能模块索引、API 模块列表、测试场景优先级等，见：
- `docs/项目索引.md`

## 测试自动化目标

减轻手工测试工作量，提升测试效率。核心痛点：
1. 测试数据准备繁琐（每次测试前需手工录入大量基础数据）
2. 界面功能操作重复（跨界面逐条录入数据）
3. 场景多、管理难

## 当前进度

- [x] 代码分析与索引建立
- [x] 第一批核心场景自动化（登录 / 客户 / 物料 / 供应商）
- [x] MES 场景扩展（工单 / 车间线体 / 条码过站）
- [x] 执行过程录像回放（截图 / video / replay）
- [x] 高优场景扩展（库位 / 采购 / 销售 / Excel 导入）
- [x] 平台可扩展性（场景 CRUD、依赖链、多环境、精确 scriptEntry）
- [x] AI 测试数据生成（LLM + 规则回退）
- [x] 自愈定位器基础版（候选链）
- [x] 场景录制入库（草稿 stub，可扩展为 Codegen）

完善路线图见：`docs/superpowers/specs/2026-07-09-完善路线图-design.md`

## 模块前缀规则

| 前缀 | 含义 |
|------|------|
| Sys | 系统管理类 |
| Ims | 被测平台模块 |
| Imes | MES 制造执行模块 |
| Mes | MES 生产制造模块 |
| Prod | 生产执行 |
| Job | 任务调度 |
| ImsQc | 质量管理 |
| ImsSic | 库存控制 |
| ImsWh | 仓库系统 |

## 高优先级测试场景

1. 客户主数据录入 (WMS - ImsCustomer)
2. 物料主数据录入 (WMS - ImsPart)
3. 供应商主数据录入 (WMS - ImsVendor)
4. 库位维护 (WMS - ImsLocator)
5. 采购订单创建 (WMS - ImsPoMst)
6. 销售订单创建 (WMS - ImsSoMst)
7. 生产工单创建 (MES - ProductionMangement)
8. Excel 批量导入 (基座 - ImportExcel)
9. 登录验证 (基座 - Auth)
10. 用户管理 (基座 - User)
