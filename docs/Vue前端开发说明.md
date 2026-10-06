# Vue 3 + Element Plus 前端说明

产品 UI 位于 `frontend/`，由 **Electron 桌面壳** 加载；日常交付以桌面安装包为主。

技术栈：Vue 3 Composition API、Element Plus、Pinia、Vite、Vue Router。

## 桌面开发（推荐）

```powershell
npm install
npm.cmd run desktop
```

会先构建 `web-dist/`，再启动 Electron。Electron 内嵌 Express，按当前项目目录读写 SQLite 与资产文件。

仅改前端时可热更调试：

```powershell
npm.cmd run build:web
npm.cmd run desktop
```

## Web / API 调试（可选）

无 Electron、只调页面与接口时：

```powershell
npm start
npm run dev:web
```

- Vite：`http://localhost:5173`（API 代理到 `3050`）
- Express：`http://localhost:3050`

该模式使用仓库下的 `platform-data/`，**不是**桌面项目目录模型；联调真实多项目请用桌面模式。

## 生产构建

```powershell
npm.cmd run build:web
npm.cmd run desktop:package
```

前端产物写入 `web-dist/`。桌面与 `npm start` 均优先托管该目录；旧 `web/` 仅作未构建时的兼容回退。

## 主题

Element Plus 主色为 `#765ee8`，侧边栏为深色导航。主题变量见 `frontend/src/styles.css`；通用设置中可切换浅色 / 深色 / 跟随系统。

## 主要页面与组件

| 能力 | 路径 |
|------|------|
| 测试用例 | `frontend/src/views/ScenariosView.vue` |
| 测试计划 | `frontend/src/views/TestPlansView.vue` |
| 执行报告 | `frontend/src/views/RunsView.vue` |
| 环境配置 | `frontend/src/views/EnvironmentsView.vue` |
| AI 配置 | `frontend/src/views/AiSettingsView.vue` |
| 报告模板 | `frontend/src/views/ReportTemplatesView.vue` |
| 通用设置 | `frontend/src/views/SystemSettingsView.vue` |
| 执行配置与数据 | `frontend/src/components/RunDialog.vue` |
| 用例详情 / 脚本 | `frontend/src/components/ScenarioDrawer.vue` |
| 执行证据 | `frontend/src/components/RunDetailDrawer.vue` |
| 项目切换 | `frontend/src/components/ProjectSwitcher.vue` |

桌面壳与项目注册表见 `desktop/`（`main.mjs`、`project-registry.mjs`）。
