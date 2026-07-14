# 测试平台整页菜单与框架样式优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 JMOM 自动化测试平台改造成与参考截图一致的浅色管理后台框架，并保留现有页面切换和业务功能。

**Architecture:** 在现有 Vue 3 `App.vue` 中重组应用外壳，继续使用 `view` 状态驱动页面内容；新增独立的 `shell.css` 承担侧边栏、顶部栏、页签栏和响应式样式，避免干扰业务组件样式。使用现有 Node 测试风格增加源码契约测试，再通过 Vite 构建和浏览器交互验证视觉与行为。

**Tech Stack:** Vue 3、Element Plus、Pinia、Vite、Node.js Test Runner、Codex in-app Browser

---

## 文件结构

- Create: `frontend/src/shell.css` — 只负责登录后应用框架、导航、顶部栏、页签和响应式样式。
- Modify: `frontend/src/App.vue` — 重组应用框架模板，增加菜单图标、面包屑、页签和侧栏收起状态。
- Modify: `frontend/src/main.js` — 在基础业务样式之后引入 `shell.css`。
- Create: `tests/platform/vue-shell-style.test.mjs` — 验证框架结构、收起交互和关键视觉契约。
- Modify: `web-dist/index.html`、`web-dist/assets/*` — 由 `npm run build:web` 自动生成生产前端产物。

### Task 1: 建立应用框架源码契约测试

**Files:**
- Create: `tests/platform/vue-shell-style.test.mjs`

- [ ] **Step 1: 写入失败测试**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Vue 应用外壳包含参考截图的导航、顶部栏和页签结构', async () => {
  const [app, main, styles] = await Promise.all([
    readFile('frontend/src/App.vue', 'utf8'),
    readFile('frontend/src/main.js', 'utf8'),
    readFile('frontend/src/shell.css', 'utf8')
  ]);

  assert.match(main, /import '\.\/shell\.css'/);
  assert.match(app, /class="shell-brand"/);
  assert.match(app, /class="shell-menu"/);
  assert.match(app, /class="sidebar-toggle"/);
  assert.match(app, /class="app-breadcrumb"/);
  assert.match(app, /class="page-tabs"/);
  assert.match(app, /class="content-area"/);
  assert.match(styles, /--shell-sidebar-width:\s*248px/);
  assert.match(styles, /\.shell-menu \.el-menu-item\.is-active/);
  assert.match(styles, /\.page-tabs\s*{/);
  assert.match(styles, /\.content-area\s*{/);
});

test('侧边栏支持显式收起并在窄屏自动使用紧凑模式', async () => {
  const [app, styles] = await Promise.all([
    readFile('frontend/src/App.vue', 'utf8'),
    readFile('frontend/src/shell.css', 'utf8')
  ]);

  assert.match(app, /const sidebarCollapsed=ref\(false\)/);
  assert.match(app, /function toggleSidebar\(\)/);
  assert.match(app, /:collapse="sidebarCollapsed"/);
  assert.match(app, /@open="handleMenuOpen"/);
  assert.match(app, /:aria-label="sidebarCollapsed\?'展开导航':'收起导航'"/);
  assert.match(styles, /\.shell\.sidebar-collapsed/);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)/);
  assert.match(styles, /@media\s*\(max-width:\s*640px\)/);
});
```

- [ ] **Step 2: 运行测试并确认失败原因正确**

Run:

```powershell
node --test tests/platform/vue-shell-style.test.mjs
```

Expected: FAIL，错误指向缺少 `frontend/src/shell.css`，证明测试覆盖的是尚未实现的新框架。

### Task 2: 实现浅色应用框架与导航交互

**Files:**
- Modify: `frontend/src/App.vue:1`
- Modify: `frontend/src/main.js:6`
- Create: `frontend/src/shell.css`
- Test: `tests/platform/vue-shell-style.test.mjs`

- [ ] **Step 1: 用完整框架模板替换 `App.vue`**

```vue
<template>
  <LoginView v-if="!store.user" />
  <el-container v-else class="shell" :class="{'sidebar-collapsed':sidebarCollapsed}">
    <el-aside :width="sidebarCollapsed?'76px':'248px'" class="sidebar">
      <div class="shell-brand">
        <div class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="brand-copy">
          <strong>JMOM</strong>
          <span>自动化测试平台</span>
        </div>
      </div>

      <el-menu
        class="shell-menu"
        :default-active="view"
        :default-openeds="['settings']"
        :collapse="sidebarCollapsed"
        :collapse-transition="false"
        @select="handleMenuSelect"
        @open="handleMenuOpen"
      >
        <el-menu-item index="scenarios" title="测试场景">
          <el-icon><Collection /></el-icon><template #title>测试场景</template>
        </el-menu-item>
        <el-menu-item index="runs" title="执行与报告">
          <el-icon><DataAnalysis /></el-icon><template #title>执行与报告</template>
        </el-menu-item>
        <el-sub-menu index="settings" title="设置">
          <template #title><el-icon><Setting /></el-icon><span>设置</span></template>
          <el-menu-item index="apps"><el-icon><Box /></el-icon><span>应用管理</span></el-menu-item>
          <el-menu-item index="modules"><el-icon><Grid /></el-icon><span>模块管理</span></el-menu-item>
          <el-menu-item index="environments"><el-icon><Monitor /></el-icon><span>环境管理</span></el-menu-item>
          <el-menu-item index="ai"><el-icon><Cpu /></el-icon><span>AI 设置</span></el-menu-item>
        </el-sub-menu>
      </el-menu>

      <button
        type="button"
        class="sidebar-toggle"
        :aria-label="sidebarCollapsed?'展开导航':'收起导航'"
        @click="toggleSidebar"
      >
        <el-icon><Expand v-if="sidebarCollapsed"/><Fold v-else/></el-icon>
        <span>收起导航</span>
      </button>
    </el-aside>

    <el-container class="workspace">
      <el-header class="topbar">
        <div class="topbar-leading">
          <button type="button" class="topbar-menu" aria-label="切换导航" @click="toggleSidebar">
            <el-icon><Menu /></el-icon>
          </button>
          <el-breadcrumb class="app-breadcrumb" separator="/">
            <el-breadcrumb-item>自动化测试</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="top-actions">
          <el-tag :type="store.runnerMode==='mock'?'warning':'success'" effect="light">
            {{store.runnerMode==='mock'?'模拟 Runner':'真实 Runner'}}
          </el-tag>
          <button type="button" class="notification-button" aria-label="通知"><el-icon><Bell /></el-icon></button>
          <span class="user-name">{{store.user.displayName}}</span>
          <el-button link type="danger" @click="store.logout">退出</el-button>
        </div>
      </el-header>

      <nav class="page-tabs" aria-label="页面页签">
        <button type="button" class="page-tab" @click="handleMenuSelect('scenarios')">
          <el-icon><Grid /></el-icon><span>工作台</span>
        </button>
        <div class="page-tab active">
          <el-icon><Menu /></el-icon><span>{{title}}</span><el-icon class="page-tab-close"><Close /></el-icon>
        </div>
      </nav>

      <el-main class="content-area">
        <ScenariosView v-if="view==='scenarios'" @history="openRunHistory"/>
        <RunsView v-else-if="view==='runs'" :scenario-filter="runScenarioFilter"/>
        <EnvironmentsView v-else-if="view==='environments'"/>
        <AiSettingsView v-else-if="view==='ai'"/>
        <CatalogManagementView v-else :type="view"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import{computed,onMounted,ref}from'vue';
import{Bell,Box,Close,Collection,Cpu,DataAnalysis,Expand,Fold,Grid,Menu,Monitor,Setting}from'@element-plus/icons-vue';
import{ElMessage}from'element-plus';
import{usePlatformStore}from'./stores/platform';
import LoginView from'./views/LoginView.vue';
import ScenariosView from'./views/ScenariosView.vue';
import RunsView from'./views/RunsView.vue';
import EnvironmentsView from'./views/EnvironmentsView.vue';
import AiSettingsView from'./views/AiSettingsView.vue';
import CatalogManagementView from'./views/CatalogManagementView.vue';

const store=usePlatformStore(),view=ref('scenarios'),runScenarioFilter=ref(''),sidebarCollapsed=ref(false);
const titles={scenarios:['测试场景','准备数据并执行自动化回归'],runs:['执行与报告','直观查看业务结果、步骤、截图和录像'],apps:['应用管理','维护测试资产分类'],modules:['模块管理','维护业务模块'],environments:['环境管理','配置被测系统和执行账号'],ai:['AI 设置','配置智能测试数据生成']};
const title=computed(()=>titles[view.value]?.[0]||'测试场景');

onMounted(async()=>{try{await store.bootstrap()}catch(e){if(e.message!=='请先登录')ElMessage.error(e.message)}});

function toggleSidebar(){sidebarCollapsed.value=!sidebarCollapsed.value}
function handleMenuOpen(index){if(index==='settings'&&sidebarCollapsed.value)sidebarCollapsed.value=false}
function handleMenuSelect(index){view.value=index}
function openRunHistory(scenario){runScenarioFilter.value=scenario?.id||'';view.value='runs';store.loadRuns()}
</script>
```

- [ ] **Step 2: 在 `main.js` 中引入框架样式**

在 `import './styles.css';` 后增加：

```js
import './shell.css';
```

- [ ] **Step 3: 创建 `shell.css`**

```css
:root {
  --shell-sidebar-width: 248px;
  --shell-sidebar-collapsed-width: 76px;
  --shell-header-height: 58px;
  --shell-tabs-height: 42px;
  --shell-primary: #7c3aed;
  --shell-primary-end: #5578ff;
  --shell-border: #e8ecf4;
  --shell-text: #17233d;
  --shell-muted: #73809a;
  --shell-bg: #f3f6fc;
  --shell-gradient: linear-gradient(135deg, var(--shell-primary), var(--shell-primary-end));
}

.shell {
  min-width: 0;
  min-height: 100%;
  background: var(--shell-bg);
}

.shell .sidebar {
  position: relative;
  display: flex;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  border-right: 1px solid var(--shell-border);
  background: #fff;
  box-shadow: 8px 0 24px rgba(31, 42, 68, .035);
  transition: width .2s ease;
}

.shell-brand {
  display: flex;
  min-height: 92px;
  align-items: center;
  gap: 13px;
  padding: 0 22px;
  border-bottom: 1px solid #f0f2f7;
  color: var(--shell-text);
}

.brand-mark {
  position: relative;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
}

.brand-mark i {
  position: absolute;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  opacity: .92;
  box-shadow: 0 8px 18px rgba(124, 58, 237, .22);
}

.brand-mark i:nth-child(1) { left: 0; top: 8px; background: #8b5cf6; }
.brand-mark i:nth-child(2) { left: 11px; top: 0; background: #6678ff; }
.brand-mark i:nth-child(3) { left: 13px; top: 15px; background: #45c8d7; }

.brand-copy { display: flex; min-width: 0; flex-direction: column; gap: 4px; }
.brand-copy strong { color: #101828; font-size: 20px; line-height: 1; }
.brand-copy span { color: var(--shell-muted); font-size: 12px; white-space: nowrap; }

.shell-menu {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 18px 10px;
  border-right: 0;
  background: transparent;
}

.shell-menu .el-menu-item,
.shell-menu .el-sub-menu__title {
  height: 50px;
  margin: 3px 0;
  border-radius: 9px;
  color: #52617b;
  font-weight: 500;
}

.shell-menu .el-menu-item:hover,
.shell-menu .el-sub-menu__title:hover { background: #f4f1ff; color: var(--shell-primary); }

.shell-menu .el-menu-item.is-active {
  background: var(--shell-gradient);
  color: #fff;
  box-shadow: 0 12px 24px rgba(124, 58, 237, .22);
}

.shell-menu .el-sub-menu .el-menu-item { min-width: 0; height: 44px; padding-left: 48px !important; }
.shell-menu .el-icon { font-size: 17px; }

.sidebar-toggle {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin: 10px 12px;
  border: 0;
  border-radius: 8px;
  background: #f6f7fb;
  color: #52617b;
  box-shadow: none;
}

.sidebar-toggle:hover { background: #f0edff; color: var(--shell-primary); transform: none; }

.shell.sidebar-collapsed .shell-brand { justify-content: center; padding-inline: 0; }
.shell.sidebar-collapsed .brand-copy,
.shell.sidebar-collapsed .sidebar-toggle span { display: none; }
.shell.sidebar-collapsed .sidebar-toggle { margin-inline: 14px; padding: 0; }

.workspace { min-width: 0; height: 100vh; overflow: hidden; }

.shell .topbar {
  display: flex;
  min-height: var(--shell-header-height);
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 28px;
  border-bottom: 1px solid var(--shell-border);
  background: rgba(255,255,255,.96);
}

.topbar-leading,.top-actions { display: flex; align-items: center; gap: 14px; }
.topbar-menu,.notification-button {
  display: grid;
  width: 32px;
  min-height: 32px;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: #65728a;
  box-shadow: none;
}
.topbar-menu:hover,.notification-button:hover { color: var(--shell-primary); transform: none; }
.app-breadcrumb { font-size: 14px; }
.app-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner { color: #17233d; font-weight: 600; }
.user-name { color: #27344d; font-size: 13px; font-weight: 600; white-space: nowrap; }

.page-tabs {
  display: flex;
  min-height: var(--shell-tabs-height);
  align-items: stretch;
  padding: 0 20px;
  border-bottom: 1px solid var(--shell-border);
  background: #fff;
}

.page-tab {
  position: relative;
  display: flex;
  min-width: 112px;
  min-height: var(--shell-tabs-height);
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 18px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #52617b;
  box-shadow: none;
  font-size: 13px;
}

button.page-tab:hover { background: #faf9ff; color: var(--shell-primary); transform: none; }
.page-tab.active { color: #17233d; font-weight: 600; }
.page-tab.active::after { position: absolute; right: 0; bottom: -1px; left: 0; height: 2px; background: var(--shell-primary); content: ''; }
.page-tab-close { margin-left: 5px; color: #98a2b3; font-size: 12px; }

.shell .content-area {
  height: calc(100vh - var(--shell-header-height) - var(--shell-tabs-height));
  overflow: auto;
  padding: 24px;
  background: linear-gradient(135deg,#f7f8fc 0%,#f1f5fc 55%,#eef3fb 100%);
}

@media (max-width: 900px) {
  .shell .sidebar { width: var(--shell-sidebar-collapsed-width) !important; }
  .shell-brand { justify-content: center; padding-inline: 0; }
  .brand-copy,.sidebar-toggle span { display: none; }
  .sidebar-toggle { margin-inline: 14px; padding: 0; }
  .shell-menu .el-menu-item,.shell-menu .el-sub-menu__title { justify-content: center; padding-inline: 0 !important; }
  .shell-menu .el-menu-item span,.shell-menu .el-sub-menu__title span,.shell-menu .el-sub-menu__icon-arrow { display: none; }
}

@media (max-width: 640px) {
  .shell .topbar { min-height: auto; align-items: flex-start; flex-direction: column; padding: 10px 14px; }
  .app-breadcrumb .el-breadcrumb__item:first-child { display: none; }
  .top-actions { width: 100%; justify-content: flex-end; }
  .page-tabs { padding-inline: 8px; }
  .page-tab { min-width: 96px; padding-inline: 10px; }
  .shell .content-area { height: calc(100vh - 116px); padding: 14px; }
}
```

- [ ] **Step 4: 运行契约测试并确认通过**

Run:

```powershell
node --test tests/platform/vue-shell-style.test.mjs
```

Expected: 2 tests PASS。

- [ ] **Step 5: 运行已有 Vue 前端测试避免回归**

Run:

```powershell
node --test tests/platform/vue-execution-ux.test.mjs tests/platform/run-filters.test.mjs
```

Expected: 5 tests PASS，场景历史跳转与执行筛选仍保持原行为。

- [ ] **Step 6: 提交源码与测试**

```powershell
git add frontend/src/App.vue frontend/src/main.js frontend/src/shell.css tests/platform/vue-shell-style.test.mjs
git commit -m "[feat] 优化测试平台应用框架样式"
```

### Task 3: 构建生产前端并运行完整测试

**Files:**
- Modify: `web-dist/index.html`
- Modify/Create/Delete: `web-dist/assets/index-*.css`
- Modify/Create/Delete: `web-dist/assets/index-*.js`

- [ ] **Step 1: 运行生产构建**

Run:

```powershell
npm.cmd run build:web
```

Expected: Vite 输出 `built in`，生成新的带哈希 CSS/JS 文件，退出码为 0。

- [ ] **Step 2: 运行完整 Node 测试套件**

Run:

```powershell
npm.cmd test
```

Expected: 所有 `tests/**/*.test.mjs` 测试通过，无失败项。

- [ ] **Step 3: 检查构建产物与工作区**

Run:

```powershell
git diff --check
git status --short
```

Expected: 不存在空白错误；仅包含本任务的 `web-dist` 变化和用户原有的 `README.md` 修改。

- [ ] **Step 4: 提交构建产物**

```powershell
git add web-dist
git commit -m "[build] 更新菜单样式前端产物"
```

### Task 4: 浏览器视觉与交互验证

**Files:**
- Verify: `frontend/src/App.vue`
- Verify: `frontend/src/shell.css`

- [ ] **Step 1: 定义目标流程并打开页面**

目标流程：`http://localhost:5174/` → 登录后的测试场景页 → 切换执行与报告、设置子菜单和侧栏收起 → 页面内容正确切换且框架保持稳定。

使用 Browser 插件复用当前本地页面，刷新后确认 URL 和标题为：

```text
URL: http://localhost:5174/
Title: JMOM 自动化测试平台
```

- [ ] **Step 2: 完成桌面端视觉检查**

在桌面视口检查以下可见证据：

```text
白色 248px 左侧栏
紫蓝渐变当前菜单
顶部面包屑与右侧 Runner/用户操作区
独立页签栏
浅灰蓝内容背景
无文字遮挡、横向溢出或框架错误遮罩
```

- [ ] **Step 3: 验证菜单切换与收起交互**

按顺序执行并检查状态：

```text
点击“执行与报告” → 面包屑和当前页签更新为“执行与报告”
点击“设置”并进入“环境管理” → 内容区显示环境管理页面
点击“收起导航” → 左栏缩为 76px、品牌与菜单文字隐藏、内容区扩展
点击顶部菜单按钮 → 左栏恢复 248px、文字重新显示
```

- [ ] **Step 4: 检查控制台与窄屏布局**

读取 `error` 和 `warn` 日志，预期无本次改造引入的 Vue/Element Plus 错误。将视口调整到约 900px 宽，确认侧栏进入紧凑模式，内容区无裁切或重叠；验证后恢复视口。

- [ ] **Step 5: 保存验证证据并报告**

保留一张桌面展开态和一张收起或窄屏态截图作为最终 QA 证据。最终报告说明构建、测试、交互、控制台和剩余风险。

### Task 5: 适配 ElephasCRM 风格的登录页左侧视觉

**Files:**
- Create: `frontend/src/assets/jmom-login-visual.svg`
- Modify: `frontend/src/views/LoginView.vue`
- Modify: `frontend/src/login.css`
- Create: `tests/platform/vue-login-style.test.mjs`

- [ ] **Step 1: 写入失败的登录页视觉契约测试**

测试读取登录组件、登录样式和本地 SVG，验证 `login-visual`、`login-visual-brand`、`login-capabilities`、`login-panel-shell`、三张 JMOM 能力卡、SVG 背景引用和 768px 响应式隐藏规则。读取缺失 SVG 时安全返回空字符串，使 RED 阶段由断言失败而不是 `ENOENT` 结束。

- [ ] **Step 2: 运行测试并确认 RED**

```powershell
node --test tests/platform/vue-login-style.test.mjs
```

Expected: 断言因登录页尚未包含参考结构而失败。

- [ ] **Step 3: 复制本地视觉素材**

将 `F:\workspace\ElephasCRM\web\src\assets\brand\client-login-bg.svg` 的完整内容写入 `frontend/src/assets/jmom-login-visual.svg`。素材必须进入当前仓库，不允许在 Vite 代码中使用跨仓库绝对路径。

- [ ] **Step 4: 调整登录页结构**

`LoginView.vue` 使用以下层级，同时保留现有表单、账号列表、`selectAccount` 和 `submit` 逻辑：

```vue
<div class="login-page">
  <section class="login-visual" aria-label="JMOM 自动化测试平台介绍">
    <div class="login-visual-brand">
      <div class="login-brand-symbol" aria-hidden="true"><i/><i/><i/></div>
      <div><h1>JMOM 自动化测试平台</h1><p>场景、数据、执行与证据的一体化工作台</p></div>
    </div>
    <div class="login-capabilities">
      <article><strong>场景管理</strong><small>脚本、数据、环境与依赖统一沉淀</small></article>
      <article><strong>执行闭环</strong><small>预检、执行、过程与结果全程追踪</small></article>
      <article><strong>证据回放</strong><small>步骤、截图、录像与报告集中查看</small></article>
    </div>
  </section>
  <section class="login-panel-shell" aria-label="登录">
    <!-- 原有 el-card 登录表单完整保留 -->
  </section>
</div>
```

- [ ] **Step 5: 实现参考布局样式**

`login.css` 覆盖旧登录样式：`.login-page` 使用 `jmom-login-visual.svg` 居中覆盖；`.login-panel-shell` 固定右侧 44.444444%；`.login-visual` 预留右侧面板宽度；品牌区和能力卡使用半透明白色、细边框、模糊和轻阴影；768px 以下隐藏 `.login-visual`，面板恢复普通文档流并占满视口。

- [ ] **Step 6: 验证与提交**

```powershell
node --test tests/platform/vue-login-style.test.mjs
node --test tests/platform/login-accounts.test.mjs
npm.cmd test
npm.cmd run build:web
git add frontend/src/assets/jmom-login-visual.svg frontend/src/views/LoginView.vue frontend/src/login.css tests/platform/vue-login-style.test.mjs
git commit -m "[feat] 优化登录页品牌视觉"
```

Expected: 新测试、登录账号回归和完整测试全部通过，Vite 构建成功；`web-dist` 在后续构建产物任务中单独提交。
