# AutoTest Studio

这是通用的 Windows 桌面自动化测试客户端，面向任意浏览器 Web 系统。  
默认本机离线运行：Playwright 脚本、测试数据、执行环境、测试计划和报告保存在用户选择的项目目录中；不同项目使用独立数据库和物理目录。

被测对象不绑定行业：通过项目内的「环境配置」指定 Base URL、账号与变量即可切换客户或产品。新项目默认带 Bing 公开站点上的几条通用操作示例。

## 技术栈

| 层级 | 技术 |
|------|------|
| 桌面壳 | Electron 40 + electron-builder |
| 前端 | Vue 3 + Vue Router + Pinia + Element Plus + Vite 7 |
| 后端 / API | Node.js 22+、Express 5、SQLite（桌面内嵌） |
| 自动化 | Playwright（优先本机 Chrome，其次 Edge） |
| 本地录制器 | 桌面客户端内录制（Playwright codegen） |

示例被测系统的仓库路径见 `AGENTS.md` 附录、`docs/项目索引.md`。

## 核心能力

- 多项目：支持创建、注册和切换项目，每个项目的用例、数据、录制、报告和 SQLite 数据库均物理隔离。
- 用例库：使用任意层级目录管理用例；支持树形选择、JSON 用例包导入导出。
- 测试数据：支持 JSON、CSV、Excel 导入、在线动态字段维护、规则生成和可选 AI 生成。
- 脚本工作台：支持 Playwright 脚本录制、上传、CodeMirror 编辑、版本归档和字段合约同步。
- 执行中心：支持无头、有头和 UI 模式，多环境切换，并按 `scriptEntry` 精确执行；默认在桌面本机跑 Playwright。
- 测试计划：可选择多个可执行用例与数据集顺序执行，并结合 AI 或规则生成测试报告。
- 报告模板：可维护报告模块、是否含截图、输出 Markdown / HTML / Word，并切换当前启用模板。
- 系统配置：主题、AI、测试单位 / 人员 / 落款、本机浏览器选择。
- 环境配置：每个项目可维护多个环境及其 Base URL、测试账号、密码和全局变量。
- 报告中心：展示执行状态、过程截图、录像回放、失败数据下载。
- 字段与数据：脚本字段和平台字段可选择以平台为准、以脚本为准或合并；已有数据集时字段变化会进入迁移向导。

本期聚焦浏览器 UI 自动化，暂不提供接口测试功能。

测试人员操作见：`docs/测试人员使用手册.md`。

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

新建桌面项目只初始化几条面向 Bing 的通用操作示例（打开页面、表单提交、查询、数据驱动），不再自动导入代码扫描生成的历史用例。请把环境 Base URL 改成你的被测系统，再通过录制、新建或用例包导入加入真实用例。升级已有项目不会删除其中已经维护的历史用例。

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

## 项目整包导入导出

左上角项目菜单提供 **导出项目** / **导入项目**：

- 导出：把当前项目的清单、SQLite、用例脚本、数据集、录制、执行与报告打成 `.zip`（不含 `tmp/`）。
- 导入：选择项目包和一个空目录，解压后注册为本地项目并打开。若本机已有相同项目 ID，会自动分配新 ID，避免覆盖已有项目。

项目包包含环境账号等本地配置，请只在可信电脑之间传递。

## Web / API 开发模式（可选）

仅调试前端或 Express API、不启动 Electron 时可用。数据写入仓库下 `platform-data/`，与桌面项目目录模型不同。

```powershell
npm install
npm start
```

默认访问：`http://localhost:3050`

演示账号：`tester` / `Tester123!`，`admin` / `Admin123!`

## 默认被测环境

新建项目后，默认环境指向公开可访问的 Bing，便于开箱试用：

- `AUTOTEST_BASE_URL=https://www.bing.com`

接入你自己的系统时，在「环境配置」里改成目标地址与账号即可。

如需用环境变量覆盖开发机默认值：

```powershell
$env:AUTOTEST_BASE_URL='https://www.bing.com'
npm start
```
## 本地录制

### 桌面客户端内录制

在「测试用例」打开用例详情 →「脚本与录制」→ 选择环境 →「开始录制」。录制与复核均在桌面客户端内完成。

离线命令行录制（开发机）：

```powershell
npm run record:local -- --offline --url "https://www.bing.com/" --output "tests/recordings/offline-bing.spec.js"
```

离线模式只生成脚本，不连接平台。生成后可在用例详情中上传绑定。

## 本机执行说明

桌面客户端默认在本机执行 Playwright（无头 / 有头 / UI），录制与执行均集成在同一桌面程序中。

## 可执行录制脚本规范

录制器生成的 Playwright 操作脚本需要补充数据字段和断言后，才能成为可复用场景脚本。平台支持在脚本中声明 `testDataSchema`，上传或录制绑定时会自动回写到场景的测试数据字段。

推荐模板：

```js
const { test, expect } = require('@playwright/test');
const { defineRecordedTests } = require(process.cwd() + '/tests/support/recorded-script');

const testDataSchema = {
  columns: ['记录编码', '记录名称'],
  required: ['记录编码', '记录名称'],
  example: {
    记录编码: 'AT-001',
    记录名称: 'Playwright'
  }
};
exports.testDataSchema = testDataSchema;

defineRecordedTests(test, '表单填写与提交', testDataSchema, async ({ page }, data) => {
  await page.goto(process.env.AUTOTEST_BASE_URL || 'https://www.bing.com');

  const query = data.记录名称 || data.记录编码;
  await page.locator('#sb_form_q').fill(query);
  await page.locator('#sb_form_q').press('Enter');

  await expect(page).toHaveURL(/[?&]q=/i);
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

每个场景默认保留最近 10 个脚本版本。版本文件存放在当前项目目录下，例如：

```text
<项目目录>/cases/... 对应脚本旁的版本归档
```

（Web 调试模式仍可能使用仓库 `platform-data/scripts/_versions/`。）

场景发布是另一条不可变快照链：每次点击“发布当前草稿”都会保存场景字段、脚本入口和脚本内容，版本可比较，也可恢复为新的草稿继续编辑。

## 开发与验证

```powershell
npm test
npm run test:e2e
```

桌面项目数据写入用户选择的项目目录；Web 调试模式数据默认写入：

- `platform-data/platform.sqlite`
- `platform-data/uploads/`
- `platform-data/reports/`
- `platform-data/scripts/`

Playwright 原始结果仍可能写入：

- `test-results/runs/<运行时间>/`

## 样本数据说明

在用例详情中可下载 Excel 模板，填写后上传。客户端会校验必填列，通过后才可执行。

支持格式：`.json`、`.csv`、`.xlsx`

## Runner 模式

默认使用真实 Playwright Runner。开发验证平台流程可用 mock：

```powershell
$env:AUTOTEST_RUN_MODE='mock'
npm start
```

## 使用文档

- 测试人员操作：`docs/测试人员使用手册.md`
- 部署与安全：`docs/部署与安全说明.md`
- 前端开发：`docs/Vue前端开发说明.md`
- 示例被测系统索引：`docs/项目索引.md`
