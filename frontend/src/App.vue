<template>
  <div v-if="!initialized" class="app-loading" v-loading="true" element-loading-text="正在打开项目..." />
  <LoginView v-else-if="!store.user" />
  <el-container v-else class="shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <el-aside class="sidebar" :width="sidebarCollapsed ? '68px' : '220px'">
      <div class="shell-brand">
        <div class="brand-symbol" aria-hidden="true"><span>A</span></div>
        <div class="brand-copy">
          <strong>AutoTest Studio</strong>
          <span>测试自动化工作台</span>
        </div>
      </div>

      <el-menu
        class="shell-menu"
        :default-active="view"
        :default-openeds="['settings']"
        :collapse="sidebarCollapsed"
        :collapse-transition="false"
        @select="handleMenuSelect"
      >
        <el-menu-item index="scenarios">
          <el-icon><Collection /></el-icon>
          <template #title>测试用例</template>
        </el-menu-item>
        <el-menu-item index="plans">
          <el-icon><Calendar /></el-icon>
          <template #title>测试计划</template>
        </el-menu-item>
        <el-menu-item index="runs">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>执行报告</template>
        </el-menu-item>
        <el-sub-menu index="settings">
          <template #title>
            <span class="settings-menu-title" @click="handleSettingsClick">
              <el-icon><Setting /></el-icon>
              <span class="settings-menu-label">系统配置</span>
            </span>
          </template>
          <el-menu-item index="environments">
            <el-icon><Location /></el-icon>
            <template #title>环境配置</template>
          </el-menu-item>
          <el-menu-item index="ai">
            <el-icon><MagicStick /></el-icon>
            <template #title>AI 配置</template>
          </el-menu-item>
          <el-menu-item index="report-templates">
            <el-icon><Document /></el-icon>
            <template #title>报告模板</template>
          </el-menu-item>
          <el-menu-item index="system">
            <el-icon><Tools /></el-icon>
            <template #title>通用设置</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>

      <button
        type="button"
        class="sidebar-toggle"
        :aria-label="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
        @click="toggleSidebar"
      >
        <el-icon><Expand v-if="sidebarCollapsed" /><Fold v-else /></el-icon>
        <span>{{ sidebarCollapsed ? '展开' : '收起侧栏' }}</span>
      </button>
    </el-aside>

    <el-container class="shell-main">
      <el-header class="topbar">
        <div class="topbar-leading">
          <button
            type="button"
            class="topbar-menu-button"
            :aria-label="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
            @click="toggleSidebar"
          >
            <el-icon><Menu /></el-icon>
          </button>
          <ProjectSwitcher />
          <el-divider direction="vertical" />
          <el-breadcrumb class="app-breadcrumb" separator="/">
            <el-breadcrumb-item>本地工作台</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="top-actions">
          <el-tag class="runner-tag" :type="store.runnerMode === 'mock' ? 'warning' : 'success'" effect="plain">
            {{ store.runnerMode === 'mock' ? '模拟执行器' : 'Playwright 就绪' }}
          </el-tag>
          <el-tooltip :content="resolvedTheme === 'dark' ? '切换浅色主题' : '切换深色主题'">
            <button type="button" class="topbar-icon-button" aria-label="切换主题" @click="toggleTheme">
              <el-icon><Sunny v-if="resolvedTheme === 'dark'" /><Moon v-else /></el-icon>
            </button>
          </el-tooltip>
          <span class="user-name">{{ store.user.displayName }}</span>
          <el-button v-if="!store.desktopMode" class="logout-button" text @click="store.logout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出</span>
          </el-button>
        </div>
      </el-header>

      <div class="page-tabs" aria-label="当前页面">
        <button type="button" class="page-tab page-tab-home" :class="{ active: view === 'scenarios' }" @click="goToWorkbench">
          <el-icon><House /></el-icon>
          <span>用例库</span>
        </button>
        <div v-if="view !== 'scenarios'" class="page-tab page-tab-current active" aria-current="page">
          <span>{{ title }}</span>
        </div>
      </div>

      <el-main class="content-area">
        <ScenariosView v-if="view === 'scenarios'" @history="openRunHistory" />
        <TestPlansView v-else-if="view === 'plans'" />
        <RunsView v-else-if="view === 'runs'" :scenario-filter="runScenarioFilter" />
        <EnvironmentsView v-else-if="view === 'environments'" />
        <AiSettingsView v-else-if="view === 'ai'" />
        <ReportTemplatesView v-else-if="view === 'report-templates'" />
        <SystemSettingsView v-else-if="view === 'system'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import {
  Calendar,
  Collection,
  DataAnalysis,
  Document,
  Expand,
  Fold,
  House,
  Location,
  MagicStick,
  Menu,
  Moon,
  Setting,
  Sunny,
  SwitchButton,
  Tools
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePlatformStore } from './stores/platform';
import { useTheme } from './theme';
import ProjectSwitcher from './components/ProjectSwitcher.vue';
import LoginView from './views/LoginView.vue';
import ScenariosView from './views/ScenariosView.vue';
import TestPlansView from './views/TestPlansView.vue';
import RunsView from './views/RunsView.vue';
import EnvironmentsView from './views/EnvironmentsView.vue';
import AiSettingsView from './views/AiSettingsView.vue';
import ReportTemplatesView from './views/ReportTemplatesView.vue';
import SystemSettingsView from './views/SystemSettingsView.vue';

const store = usePlatformStore();
const { resolvedTheme, setTheme } = useTheme();
const initialized = ref(false);
const view = ref('scenarios');
const runScenarioFilter = ref('');
const sidebarCollapsed = ref(false);

const titles = {
  scenarios: '测试用例',
  plans: '测试计划',
  runs: '执行报告',
  environments: '环境配置',
  ai: 'AI 配置',
  'report-templates': '报告模板',
  system: '通用设置'
};
const title = computed(() => titles[view.value] || '测试用例');

onMounted(async () => {
  try {
    await store.bootstrap();
  } catch (error) {
    if (error.message !== '请先登录') ElMessage.error(error.message);
  } finally {
    initialized.value = true;
  }
});

function handleMenuSelect(nextView) {
  view.value = nextView;
}

function handleSettingsClick() {
  if (sidebarCollapsed.value) sidebarCollapsed.value = false;
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}

function toggleTheme() {
  setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark');
}

function goToWorkbench() {
  view.value = 'scenarios';
}

function openRunHistory(scenario) {
  runScenarioFilter.value = scenario?.id || '';
  view.value = 'runs';
  store.loadRuns();
}
</script>
