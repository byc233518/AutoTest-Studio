<template>
  <LoginView v-if="!store.user" />
  <el-container
    v-else
    class="shell"
    :class="{ 'sidebar-collapsed': sidebarCollapsed }"
  >
    <el-aside
      class="sidebar"
      :width="sidebarCollapsed ? '76px' : '248px'"
    >
      <div class="shell-brand">
        <div class="brand-symbol" aria-hidden="true">
          <span class="brand-orb brand-orb-purple"></span>
          <span class="brand-orb brand-orb-blue"></span>
          <span class="brand-orb brand-orb-cyan"></span>
        </div>
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
      >
        <el-menu-item index="scenarios">
          <el-icon><Collection /></el-icon>
          <template #title>测试场景</template>
        </el-menu-item>
        <el-menu-item index="runs">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>执行与报告</template>
        </el-menu-item>
        <el-sub-menu index="settings">
          <template #title>
            <span class="settings-menu-title" @click="handleSettingsClick">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </span>
          </template>
          <el-menu-item index="apps">
            <el-icon><Grid /></el-icon>
            <template #title>应用管理</template>
          </el-menu-item>
          <el-menu-item index="modules">
            <el-icon><Menu /></el-icon>
            <template #title>模块管理</template>
          </el-menu-item>
          <el-menu-item index="environments">
            <el-icon><Location /></el-icon>
            <template #title>环境管理</template>
          </el-menu-item>
          <el-menu-item index="ai">
            <el-icon><MagicStick /></el-icon>
            <template #title>AI 设置</template>
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
        <span>{{ sidebarCollapsed ? '展开侧栏' : '收起侧栏' }}</span>
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
          <el-breadcrumb class="app-breadcrumb" separator="/">
            <el-breadcrumb-item>自动化测试</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="top-actions">
          <el-tag
            class="runner-tag"
            :type="store.runnerMode === 'mock' ? 'warning' : 'success'"
            effect="light"
          >
            {{ store.runnerMode === 'mock' ? '模拟 Runner' : '真实 Runner' }}
          </el-tag>
          <span class="notification-icon" aria-label="通知">
            <el-icon><Bell /></el-icon>
            <i aria-hidden="true"></i>
          </span>
          <span class="user-name">{{ store.user.displayName }}</span>
          <el-button class="logout-button" text @click="store.logout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出</span>
          </el-button>
        </div>
      </el-header>

      <div class="page-tabs" aria-label="页面标签">
        <button
          type="button"
          class="page-tab page-tab-home"
          :class="{ active: view === 'scenarios' }"
          @click="goToWorkbench"
        >
          <el-icon><House /></el-icon>
          <span>工作台</span>
        </button>
        <div class="page-tab page-tab-current active" aria-current="page">
          <span>{{ title }}</span>
          <el-icon class="page-tab-close" aria-hidden="true"><Close /></el-icon>
        </div>
      </div>

      <el-main class="content-area">
        <ScenariosView
          v-if="view === 'scenarios'"
          @history="openRunHistory"
        />
        <RunsView
          v-else-if="view === 'runs'"
          :scenario-filter="runScenarioFilter"
        />
        <EnvironmentsView v-else-if="view === 'environments'" />
        <AiSettingsView v-else-if="view === 'ai'" />
        <CatalogManagementView v-else :type="view" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  Bell,
  Close,
  Collection,
  DataAnalysis,
  Expand,
  Fold,
  Grid,
  House,
  Location,
  MagicStick,
  Menu,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePlatformStore } from './stores/platform';
import LoginView from './views/LoginView.vue';
import ScenariosView from './views/ScenariosView.vue';
import RunsView from './views/RunsView.vue';
import EnvironmentsView from './views/EnvironmentsView.vue';
import AiSettingsView from './views/AiSettingsView.vue';
import CatalogManagementView from './views/CatalogManagementView.vue';

const store = usePlatformStore();
const view = ref('scenarios');
const runScenarioFilter = ref('');
const sidebarCollapsed = ref(false);
let sidebarMediaQuery;

const titles = {
  scenarios: ['测试场景', '准备数据并执行自动化回归'],
  runs: ['执行与报告', '直观查看业务结果、步骤、截图和录像'],
  apps: ['应用管理', '维护测试资产分类'],
  modules: ['模块管理', '维护业务模块'],
  environments: ['环境管理', '配置被测系统和执行账号'],
  ai: ['AI 设置', '配置智能测试数据生成']
};

const title = computed(() => titles[view.value]?.[0]);

onMounted(async () => {
  sidebarMediaQuery = window.matchMedia('(max-width: 900px)');
  syncSidebarWithViewport(sidebarMediaQuery);
  sidebarMediaQuery.addEventListener('change', syncSidebarWithViewport);

  try {
    await store.bootstrap();
  } catch (error) {
    if (error.message !== '请先登录') ElMessage.error(error.message);
  }
});

onBeforeUnmount(() => {
  sidebarMediaQuery?.removeEventListener('change', syncSidebarWithViewport);
});

function handleMenuSelect(nextView) {
  view.value = nextView;
}

function handleSettingsClick() {
  if (sidebarCollapsed.value) sidebarCollapsed.value = false;
}

function syncSidebarWithViewport(event) {
  sidebarCollapsed.value = event.matches;
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
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
