<template>
  <el-config-provider :locale="elementLocale">
    <div v-if="!initialized" class="app-loading" v-loading="true" :element-loading-text="t('app.loadingProject')" />
    <LoginView v-else-if="!store.user" />
    <el-container v-else class="shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <el-aside class="sidebar" :width="sidebarCollapsed ? '68px' : '220px'">
        <div class="shell-brand">
          <div class="brand-symbol" aria-hidden="true"><span>A</span></div>
          <div class="brand-copy">
            <strong>AutoTest Studio</strong>
            <span>{{ t('app.brandSubtitle') }}</span>
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
            <template #title>{{ t('app.menu.scenarios') }}</template>
          </el-menu-item>
          <el-menu-item index="plans">
            <el-icon><Calendar /></el-icon>
            <template #title>{{ t('app.menu.plans') }}</template>
          </el-menu-item>
          <el-menu-item index="runs">
            <el-icon><DataAnalysis /></el-icon>
            <template #title>{{ t('app.menu.runs') }}</template>
          </el-menu-item>
          <el-sub-menu index="settings">
            <template #title>
              <span class="settings-menu-title" @click="handleSettingsClick">
                <el-icon><Setting /></el-icon>
                <span class="settings-menu-label">{{ t('app.menu.settings') }}</span>
              </span>
            </template>
            <el-menu-item index="environments">
              <el-icon><Location /></el-icon>
              <template #title>{{ t('app.menu.environments') }}</template>
            </el-menu-item>
            <el-menu-item index="ai">
              <el-icon><MagicStick /></el-icon>
              <template #title>{{ t('app.menu.ai') }}</template>
            </el-menu-item>
            <el-menu-item index="report-templates">
              <el-icon><Document /></el-icon>
              <template #title>{{ t('app.menu.reportTemplates') }}</template>
            </el-menu-item>
            <el-menu-item index="system">
              <el-icon><Tools /></el-icon>
              <template #title>{{ t('app.menu.system') }}</template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>

        <button
          type="button"
          class="sidebar-toggle"
          :aria-label="sidebarCollapsed ? t('app.expandSidebar') : t('app.collapseSidebar')"
          @click="toggleSidebar"
        >
          <el-icon><Expand v-if="sidebarCollapsed" /><Fold v-else /></el-icon>
          <span>{{ sidebarCollapsed ? t('app.expand') : t('app.collapse') }}</span>
        </button>
      </el-aside>

      <el-container class="shell-main">
        <el-header class="topbar">
          <div class="topbar-leading">
            <button
              type="button"
              class="topbar-menu-button"
              :aria-label="sidebarCollapsed ? t('app.expandSidebar') : t('app.collapseSidebar')"
              @click="toggleSidebar"
            >
              <el-icon><Menu /></el-icon>
            </button>
            <ProjectSwitcher />
            <el-divider direction="vertical" />
            <el-breadcrumb class="app-breadcrumb" separator="/">
              <el-breadcrumb-item>{{ t('app.workbench') }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="top-actions">
            <el-tag class="runner-tag" :type="store.runnerMode === 'mock' ? 'warning' : 'success'" effect="plain">
              {{ store.runnerMode === 'mock' ? t('app.runnerMock') : t('app.runnerReady') }}
            </el-tag>
            <PreferenceControls icon-only compact />
            <span class="user-name">{{ store.user.displayName }}</span>
            <el-button v-if="!store.desktopMode" class="logout-button" text @click="store.logout">
              <el-icon><SwitchButton /></el-icon>
              <span>{{ t('app.logout') }}</span>
            </el-button>
          </div>
        </el-header>

        <div class="page-tabs" :aria-label="title">
          <button type="button" class="page-tab page-tab-home" :class="{ active: view === 'scenarios' }" @click="goToWorkbench">
            <el-icon><House /></el-icon>
            <span>{{ t('app.caseLibrary') }}</span>
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
  </el-config-provider>
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
  Setting,
  SwitchButton,
  Tools
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePlatformStore } from './stores/platform';
import { useI18n } from './i18n';
import PreferenceControls from './components/PreferenceControls.vue';
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
const { t, elementLocale } = useI18n();
const initialized = ref(false);
const view = ref('scenarios');
const runScenarioFilter = ref('');
const sidebarCollapsed = ref(false);

const title = computed(() => {
  const map = {
    scenarios: t('app.menu.scenarios'),
    plans: t('app.menu.plans'),
    runs: t('app.menu.runs'),
    environments: t('app.menu.environments'),
    ai: t('app.menu.ai'),
    'report-templates': t('app.menu.reportTemplates'),
    system: t('app.menu.system')
  };
  return map[view.value] || t('app.menu.scenarios');
});

onMounted(async () => {
  try {
    await store.bootstrap();
  } catch (error) {
    if (error.message !== '请先登录' && error.message !== 'Please sign in') ElMessage.error(error.message);
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

function goToWorkbench() {
  view.value = 'scenarios';
}

function openRunHistory(scenario) {
  runScenarioFilter.value = scenario?.id || '';
  view.value = 'runs';
  store.loadRuns();
}
</script>
