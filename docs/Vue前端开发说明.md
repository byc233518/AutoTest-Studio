# Vue 3 + Element Plus 前端说明

平台前端已迁移到 `frontend/`：

- Vue 3 Composition API
- Element Plus
- Pinia
- Vite

## 开发

```powershell
npm start
npm run dev:web
```

Vite 开发地址为 `http://localhost:5173`，API 自动代理到 `http://localhost:3050`。

## 生产构建

```powershell
npm run build:web
npm start
```

构建产物写入 `web-dist/`。Express 检测到该目录后优先托管 Vue 应用；旧 `web/` 仅作为未构建时的兼容回退，不参与正常生产运行。

## 主题

Element Plus 主色为 `#765ee8`，侧边栏继续使用深紫色渐变。主题变量位于 `frontend/src/styles.css`。

## 页面

- 测试场景：`frontend/src/views/ScenariosView.vue`
- 执行配置与在线数据：`frontend/src/components/RunDialog.vue`
- 场景数据与脚本录制：`frontend/src/components/ScenarioDrawer.vue`
- 执行与报告：`frontend/src/views/RunsView.vue`
- 截图录像证据：`frontend/src/components/RunDetailDrawer.vue`
- 环境与 AI：`frontend/src/views/EnvironmentsView.vue`、`frontend/src/views/AiSettingsView.vue`
