# JMOM 自动化测试平台

这是面向测试人员的 JMOM B/S 自动化测试平台。平台把 Playwright 脚本包装成可管理的测试场景，测试人员通过网页选择场景、上传样本数据、执行回归并查看报告。

## 一期能力

- 场景库：登录、客户/供应商/物料/库位、采购/销售订单（导入路径）、Excel 导入配置，以及 MES 工单/线体/条码过站。
- 样本数据：CSV/Excel 上传校验；规则化样例生成；可选 AI 生成（失败回退规则）。
- 执行中心：Playwright Runner；headless / headed / ui；多环境切换；按 scriptEntry 精确执行。
- 报告中心：执行状态、HTML 报告、过程截图与录像回放。
- 平台扩展：场景 CRUD / 发布下架、依赖检查、录制草稿入库。
- 权限：测试人员维护数据并执行；维护员/管理员管理场景与环境。

完善路线图：`docs/superpowers/specs/2026-07-09-完善路线图-design.md`

## 启动平台

```powershell
npm install
npm start
```

默认访问地址：

- `http://localhost:3050`

默认平台账号：

| 角色 | 账号 | 密码 |
|------|------|------|
| 测试人员 | tester | Tester123! |
| 场景维护员 | maintainer | Maintainer123! |
| 管理员 | admin | Admin123! |

### Docker Compose 部署

```bash
docker-compose up -d --build
```

若 Docker 安装提供的是 CLI 插件，也可使用 `docker compose up -d --build`。服务映射到宿主机 `3050` 端口，SQLite、上传文件和执行报告持久化在宿主机的 `platform-data/`。容器基于 Node 22 Alpine，使用系统 Chromium，并通过 Xvfb 支持有头模式和 UI 模式执行。

## JMOM 测试环境

默认被测环境来自 `Agents.md`：

- `JMOM_BASE_URL=http://172.16.100.11:46069`
- `JMOM_USERNAME=byc`
- `JMOM_PASSWORD=Abcd1234`

如需覆盖：

```powershell
$env:JMOM_BASE_URL='http://172.16.100.11:46069'
$env:JMOM_USERNAME='byc'
$env:JMOM_PASSWORD='Abcd1234'
npm start
```

## 开发与验证

```powershell
npm test
npm run test:e2e
```

平台数据默认写入：

- `platform-data/platform.sqlite`
- `platform-data/uploads/`
- `platform-data/reports/`

Playwright 原始结果仍会写入：

- `test-results/runs/<运行时间>/`

## 样本数据说明

网页中进入场景详情后，点击“下载CSV模板”，填写后上传。平台会校验必填列，校验通过后才能创建执行任务。

支持格式：

- `.csv`
- `.xlsx`

## Runner 模式

平台默认使用真实 Playwright Runner。开发测试时可使用 mock 模式快速验证平台流程：

```powershell
$env:JMOM_RUN_MODE='mock'
npm start
```

## 使用文档

- 测试人员操作：`docs/测试人员使用手册.md`
- 部署与安全：`docs/部署与安全说明.md`
- 产品完善设计：`docs/superpowers/specs/2026-07-11-用户体验与运营能力完善-design.md`

