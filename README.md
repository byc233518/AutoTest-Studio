# JMOM 测试自动化平台

这是面向 JMOM B/S 系统的测试自动化平台。平台把 Playwright 脚本、测试数据、执行环境和执行报告集中管理，测试人员可以通过网页选择场景、维护样本数据、录制或上传脚本，并查看执行过程、截图、录像和报告。

## 核心能力

- 场景库：登录、客户、供应商、物料、库位、采购、销售、Excel 导入、MES 工单、车间线体、条码过站等场景。
- 测试数据：支持 CSV/Excel 上传、在线表格维护、规则样例生成和可选 AI 生成。
- 执行中心：基于 Playwright Runner，支持 headless、headed、UI 实时观察模式，多环境切换，并按 `scriptEntry` 精确执行。
- 报告中心：展示执行状态、HTML 报告、过程截图、录像回放、失败数据下载。
- 场景工作台：场景只分“草稿”和“已发布”，所有登录用户都可创建、编辑、执行和发布；每次发布都会保存一个不可变版本快照。
- 脚本管理：支持上传脚本、CodeMirror 在线编辑、本地录制自动绑定、三步复核、脚本/字段合约同步；脚本保存最近 10 个版本，可防止误操作。
- 字段与数据：脚本字段和平台字段可选择以平台为准、以脚本为准或合并；已有数据集时字段变化会进入迁移向导，创建新数据集并保留源数据。

完善路线图见：`docs/superpowers/specs/2026-07-09-完善路线图-design.md`

## 启动平台

```powershell
npm install
npm start
```

默认访问地址：

- `http://localhost:3050`

默认平台账号：

| 账号类型 | 账号 | 密码 |
| --- | --- | --- |
| 演示账号 | tester | Tester123! |
| 演示账号 | maintainer | Maintainer123! |
| 演示账号 | admin | Admin123! |

## Docker 部署

```bash
cd docker
docker-compose up -d --build
```

如果 Docker 安装提供的是 CLI 插件，也可以使用：

```bash
docker compose up -d --build
```

服务默认映射到宿主机 `3050` 端口。SQLite、上传文件和执行报告持久化在 `platform-data/`。容器基于 Node 22 Alpine，使用系统 Chromium，并通过 Xvfb 支持 headed 和 UI 模式执行。

在目标服务器完成代码更新后，也可以在仓库根目录执行：

```bash
sh docker/docker-deploy.sh
```

该脚本会修复平台数据目录权限、构建镜像、启动或更新容器并执行健康检查，也可以通过 Jenkins 的 Publish over SSH 在远端调用。

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

## 本地录制

普通测试同事推荐使用绿色免安装录制器，无需安装 Node.js、npm、Playwright 或 .NET Runtime。

在线绑定流程：

1. 在场景详情的“脚本与录制”页签点击“开始录制”。
2. 下载并解压 `JMOM本地录制器-win-x64.zip`。
3. 浏览器会优先通过 `jmom-recorder://record` 一键唤起工具；未唤起时双击 `JMOM录制器.exe`，输入平台显示的 8 位录制码。
4. 在 Playwright Inspector 中完成操作并关闭窗口。
5. 录制器会自动上传脚本，平台打开三步复核：确认字段、确认成功条件、确认最终脚本。
6. 复核应用后，场景保持草稿，可立即本地验证或发布生成版本。

录制码有效期为 30 分钟，且只能使用一次。

离线录制流程：

```powershell
npm run record:local -- --offline --url "http://172.16.100.11:46069/#/login" --output "tests/recordings/offline-login.spec.js"
```

离线模式只生成脚本，不连接测试平台。生成后可在平台的场景详情中选择该脚本手工上传并绑定。

在线命令兼容模式：

```powershell
npm run record:local -- --id REC-xxx --token TOKEN --url "http://172.16.100.11:46069/#/login" --platform "http://localhost:3050"
```

免安装录制器需要先在 Windows 构建机执行：

```powershell
npm run build:recorder
```

然后将 `dist/JMOM本地录制器-win-x64.zip` 上传到服务器仓库后重新部署。完整说明见 `docs/免安装录制器使用说明.md`。

## 测试人员本机执行

绿色免安装录制器现已同时提供“录制场景”和“执行场景”，测试人员无需安装 Node.js、Playwright、Chromium 或 .NET Runtime。

1. 在场景列表点击“执行”，将“执行位置”切换为“本机执行”。
2. 选择执行环境、浏览器模式和测试数据，创建执行任务。
3. 平台弹出本机执行窗口，优先通过 `jmom-recorder://execute` 一键唤起绿色工具。
4. 如果浏览器没有唤起工具，打开 `JMOM录制器.exe`，功能选择“执行场景”，输入平台地址和 8 位一次性执行码。
5. 工具在测试人员电脑上下载场景脚本与数据，运行 Playwright，并把报告、截图、录像和 Trace 自动上传平台。

本机执行任务在“执行与报告”中标记为“测试人员本机”，任务领取前显示排队中，领取后显示执行中。绿色包的构建命令仍为：

```powershell
npm run build:recorder
```

## 可执行录制脚本规范

录制器生成的 Playwright 操作脚本需要补充数据字段和断言后，才能成为可复用场景脚本。平台支持在脚本中声明 `testDataSchema`，上传或录制绑定时会自动回写到场景的测试数据字段。

推荐模板：

```js
const { test, expect } = require('@playwright/test');
const { defineRecordedTests } = require(process.cwd() + '/tests/support/recorded-script');

const testDataSchema = {
  columns: ['locatorCode', 'locatorName', 'warehouseCode'],
  required: ['locatorCode', 'locatorName', 'warehouseCode'],
  example: {
    locatorCode: 'KW-001',
    locatorName: '自动化库位001',
    warehouseCode: 'WMS01'
  }
};
exports.testDataSchema = testDataSchema;

defineRecordedTests(test, '库位维护录入', testDataSchema, async ({ page }, data) => {
  await page.goto(process.env.JMOM_BASE_URL || 'http://172.16.100.11:46069/#/login');

  await page.getByRole('textbox', { name: '库位编码' }).fill(data.locatorCode);
  await page.getByRole('textbox', { name: '库位名称' }).fill(data.locatorName);
  await page.getByRole('textbox', { name: '仓库' }).fill(data.warehouseCode);
  await page.getByRole('button', { name: '保存' }).click();

  await expect(page.getByText('保存成功')).toBeVisible();
  await expect(page.getByText(data.locatorCode)).toBeVisible();
});
```

闭环规则：

1. `testDataSchema.columns` 决定平台测试数据表格、Excel 模板、自动生成字段。
2. `required` 决定上传或手工保存数据时的必填校验。
3. `example` 是没有选择数据集时的本地回退样例。
4. 执行任务创建后，Runner 会把选中的数据集路径写入 `JMOM_DATASET_PATH`。
5. `defineRecordedTests` 会读取 `JMOM_DATASET_PATH`，按数据集每一行循环生成一个 Playwright test。

## 脚本版本管理

场景脚本在以下操作前会自动归档当前版本：

- 上传并绑定脚本
- 在线编辑保存脚本
- 录制脚本自动绑定
- 从历史版本恢复

每个场景默认保留最近 10 个脚本版本。版本文件存放在：

```text
platform-data/scripts/_versions/<scenarioKey>/
```

场景发布是另一条不可变快照链：每次点击“发布当前草稿”都会保存场景字段、脚本入口和脚本内容，版本可比较，也可恢复为新的草稿继续编辑。

## 开发与验证

```powershell
npm test
npm run test:e2e
```

平台数据默认写入：

- `platform-data/platform.sqlite`
- `platform-data/uploads/`
- `platform-data/reports/`
- `platform-data/scripts/`

Playwright 原始结果仍会写入：

- `test-results/runs/<运行时间>/`

## 样本数据说明

网页中进入场景详情后，可下载 Excel 模板，填写后上传。平台会校验必填列，校验通过后才会创建执行任务。

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
- 免安装录制器：`docs/免安装录制器使用说明.md`
- 部署与安全：`docs/部署与安全说明.md`
- 产品完善设计：`docs/superpowers/specs/2026-07-11-用户体验与运营能力完善-design.md`
