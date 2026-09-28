# AutoTest Studio

这是通用的 Windows 桌面自动化测试客户端，面向任意浏览器 Web 系统。  
客户端默认完全本地离线运行，把 Playwright 脚本、测试数据、执行环境、测试计划和执行报告保存在用户选择的项目目录中；不同项目使用独立数据库和物理目录。当前版本保留 Web 服务边界，后续可以在不改变项目数据模型的前提下接入服务端能力。

被测对象不绑定行业：通过项目内的「环境配置」指定 Base URL、账号与变量即可切换客户或产品。仓库内制造业 MES/WMS 相关用例与索引仅为当前演示样例。

## 技术栈

| 层级 | 技术 |
|------|------|
| 桌面壳 | Electron 40 + electron-builder |
| 前端 | Vue 3 + Vue Router + Pinia + Element Plus + Vite 7 |
| 后端 / API | Node.js 22+、Express 5、SQLite |
| 自动化 | Playwright（优先本机 Chrome，其次 Edge） |
| 本地录制器 | .NET 10 WinForms 绿色免安装包 |
| 可选部署 | Docker Compose |

示例被测系统的仓库路径与版本差异见 `AGENTS.md` 附录、`docs/项目索引.md`。

## 核心能力

- 多项目：支持创建、注册和切换项目，每个项目的用例、数据、录制、报告和 SQLite 数据库均物理隔离。
- 用例库：使用任意层级目录管理用例，不再维护应用和模块；支持树形选择、JSON 用例包导入导出。
- 测试数据：支持 JSON、CSV、Excel 导入、在线动态字段维护、规则生成和可选 AI 生成。
- 脚本工作台：支持 Playwright 脚本录制、上传、CodeMirror 编辑、版本归档和字段合约同步。
- 执行中心：支持无头、有头和 UI 模式，多环境切换，并按 `scriptEntry` 精确执行。
- 测试计划：可选择多个用例顺序执行，并结合 AI 或规则降级生成 Markdown 测试报告。
- 系统配置：支持浅色、深色、跟随系统主题，以及 AI、测试单位、测试人员和报告落款配置。
- 环境配置：每个项目可维护多个环境及其 Base URL、测试账号、密码和全局变量。
- 报告中心：展示执行状态、HTML 报告、过程截图、录像回放、失败数据下载。
- 字段与数据：脚本字段和平台字段可选择以平台为准、以脚本为准或合并；已有数据集时字段变化会进入迁移向导，创建新数据集并保留源数据。

本期聚焦浏览器 UI 自动化，暂不提供接口测试功能。

完善路线图见：`docs/superpowers/specs/2026-07-09-完善路线图-design.md`

## 使用桌面客户端

开发环境启动：

```powershell
npm install
npm.cmd run desktop
```

构建 Windows x64 离线安装包：

```powershell
npm.cmd run desktop:package
```

安装包包含客户端运行所需的 Node.js 和用于测试录像的 FFmpeg，不再内置用于测试执行的 Playwright Chromium 或 Chromium Headless Shell。目标电脑需要安装 Google Chrome 或 Microsoft Edge；客户端优先使用 Chrome，未安装 Chrome 时使用 Edge。有头、无头执行及脚本录制均使用检测到的系统浏览器，并使用独立的临时用户目录，不读取日常浏览器的账号和个人数据。

构建机只需准备与当前 Playwright 版本匹配的 FFmpeg：

```powershell
npx.cmd playwright install ffmpeg
```

打包过程不会下载组件；需要复用其他缓存目录时，可通过 `AUTOTEST_DESKTOP_BROWSER_CACHE` 指定。

卸载时会弹出「是否保留历史数据」提示：

- 选「是」：保留 `%APPDATA%` 下的项目列表、偏好与默认项目数据，便于重装后续用。
- 选「否」：删除上述工作台应用数据。
- 静默卸载默认保留数据；如需清理可附加参数 `--delete-app-data`。
- 用户自行选择目录创建的测试项目不会随卸载删除。

新建桌面项目只初始化 15 个手工维护的核心用例，不再自动导入代码扫描生成的历史用例。现阶段先按登录、WMS 主数据和 MES 核心流程逐个完成真实环境验证；其他用例在验证脚本和数据后，再通过录制、新建或用例包导入逐批加入。升级已有项目不会删除其中已经维护的历史用例。

每个项目采用以下目录结构：

```text
<项目目录>/
├─ .autotest-studio/project.json
├─ .autotest-studio/project.sqlite
├─ cases/
├─ data/
├─ recordings/
├─ runs/
├─ reports/
└─ tmp/
```

取消注册项目只会从客户端列表中移除，不会删除项目目录及其中数据。

## Web 开发模式

```powershell
npm install
npm start
```

Web 开发服务默认访问地址：

- `http://localhost:3050`

默认平台账号：

| 账号类型 | 账号 | 密码 |
| --- | --- | --- |
| 演示账号 | tester | Tester123! |
| 演示账号 | maintainer | Maintainer123! |
| 演示账号 | admin | Admin123! |

## 服务端预留模式

现有 Express API 和 Docker 部署方式继续保留，用于开发调试及后续服务端接入。桌面客户端的默认工作流不依赖 Docker 或外部服务端。

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

## 示例被测环境（可替换）

下列变量仅对应仓库当前演示用环境，接入其他系统时改成目标地址与账号即可：

- `AUTOTEST_BASE_URL=http://172.16.100.11:46069`
- `AUTOTEST_USERNAME=byc`
- `AUTOTEST_PASSWORD=Abcd1234`

如需覆盖：

```powershell
$env:AUTOTEST_BASE_URL='http://172.16.100.11:46069'
$env:AUTOTEST_USERNAME='byc'
$env:AUTOTEST_PASSWORD='Abcd1234'
npm start
```
## 本地录制

普通测试同事推荐使用绿色免安装录制器，无需安装 Node.js、npm、Playwright 或 .NET Runtime。

在线绑定流程：

1. 在场景详情的“脚本与录制”页签点击“开始录制”。
2. 下载并解压 `AutoTest-Studio本地录制器-win-x64.zip`。
3. 浏览器会优先通过 `autotest-recorder://record` 一键唤起工具；未唤起时双击 `AutoTest-Studio录制器.exe`，输入平台显示的 8 位录制码。
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

然后将 `dist/AutoTest-Studio本地录制器-win-x64.zip` 上传到服务器仓库后重新部署。完整说明见 `docs/免安装录制器使用说明.md`。

## 测试人员本机执行

绿色免安装录制器现已同时提供“录制场景”和“执行场景”，测试人员无需安装 Node.js、Playwright、Chromium 或 .NET Runtime。

1. 在场景列表点击“执行”，将“执行位置”切换为“本机执行”。
2. 选择执行环境、浏览器模式和测试数据，创建执行任务。
3. 平台弹出本机执行窗口，优先通过 `autotest-recorder://execute` 一键唤起绿色工具。
4. 如果浏览器没有唤起工具，打开 `AutoTest-Studio录制器.exe`，功能选择“执行场景”，输入平台地址和 8 位一次性执行码。
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
  await page.goto(process.env.AUTOTEST_BASE_URL || 'http://172.16.100.11:46069/#/login');

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
4. 执行任务创建后，Runner 会把选中的数据集路径写入 `AUTOTEST_DATASET_PATH`。
5. `defineRecordedTests` 会读取 `AUTOTEST_DATASET_PATH`，按数据集每一行循环生成一个 Playwright test。

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

- `.json`
- `.csv`
- `.xlsx`

## Runner 模式

平台默认使用真实 Playwright Runner。开发测试时可使用 mock 模式快速验证平台流程：

```powershell
$env:AUTOTEST_RUN_MODE='mock'
npm start
```

## 使用文档

- 测试人员操作：`docs/测试人员使用手册.md`
- 免安装录制器：`docs/免安装录制器使用说明.md`
- 部署与安全：`docs/部署与安全说明.md`
- 产品完善设计：`docs/superpowers/specs/2026-07-11-用户体验与运营能力完善-design.md`
