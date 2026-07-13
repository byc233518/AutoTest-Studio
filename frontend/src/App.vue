<template>
  <LoginView v-if="!store.user" />
  <el-container v-else class="shell">
    <el-aside width="224px" class="sidebar">
      <div class="brand"><div class="brand-mark">J</div><div><strong>JMOM</strong><span>测试平台</span></div></div>
      <el-menu :default-active="view" @select="view=$event" background-color="transparent" text-color="#d9d4ff" active-text-color="#fff">
        <el-menu-item index="scenarios"><el-icon><Collection /></el-icon><span>测试场景</span></el-menu-item>
        <el-menu-item index="runs"><el-icon><DataAnalysis /></el-icon><span>执行与报告</span></el-menu-item>
        <el-sub-menu index="settings"><template #title><el-icon><Setting /></el-icon><span>设置</span></template><el-menu-item index="apps">应用管理</el-menu-item><el-menu-item index="modules">模块管理</el-menu-item><el-menu-item index="environments">环境管理</el-menu-item><el-menu-item index="ai">AI 设置</el-menu-item></el-sub-menu>
      </el-menu>
      <div class="sidebar-help"><el-icon><Guide /></el-icon><div><strong>快速上手</strong><span>选择场景 → 准备数据 → 执行并查看证据</span></div></div>
    </el-aside>
    <el-container>
      <el-header class="topbar"><div><h1>{{title}}</h1><span>{{subtitle}}</span></div><div class="top-actions"><el-tag :type="store.runnerMode==='mock'?'warning':'success'" effect="light">{{store.runnerMode==='mock'?'模拟 Runner':'真实 Runner'}}</el-tag><el-dropdown><el-button circle><el-icon><User /></el-icon></el-button><template #dropdown><el-dropdown-menu><el-dropdown-item>{{store.user.displayName}}</el-dropdown-item><el-dropdown-item divided @click="store.logout">退出登录</el-dropdown-item></el-dropdown-menu></template></el-dropdown></div></el-header>
      <el-main><ScenariosView v-if="view==='scenarios'" @history="openRunHistory"/><RunsView v-else-if="view==='runs'" :scenario-filter="runScenarioFilter"/><EnvironmentsView v-else-if="view==='environments'"/><AiSettingsView v-else-if="view==='ai'"/><CatalogManagementView v-else :type="view"/></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import{computed,onMounted,ref}from'vue';import{Collection,DataAnalysis,Setting,Guide,User}from'@element-plus/icons-vue';import{ElMessage}from'element-plus';import{usePlatformStore}from'./stores/platform';import LoginView from'./views/LoginView.vue';import ScenariosView from'./views/ScenariosView.vue';import RunsView from'./views/RunsView.vue';import EnvironmentsView from'./views/EnvironmentsView.vue';import AiSettingsView from'./views/AiSettingsView.vue';import CatalogManagementView from'./views/CatalogManagementView.vue';
const store=usePlatformStore(),view=ref('scenarios'),runScenarioFilter=ref('');const titles={scenarios:['测试场景','准备数据并执行自动化回归'],runs:['执行与报告','直观查看业务结果、步骤、截图和录像'],apps:['应用管理','维护测试资产分类'],modules:['模块管理','维护业务模块'],environments:['环境管理','配置被测系统和执行账号'],ai:['AI 设置','配置智能测试数据生成']};const title=computed(()=>titles[view.value]?.[0]),subtitle=computed(()=>titles[view.value]?.[1]);onMounted(async()=>{try{await store.bootstrap()}catch(e){if(e.message!=='请先登录')ElMessage.error(e.message)}});function openRunHistory(scenario){runScenarioFilter.value=scenario?.id||'';view.value='runs';store.loadRuns()}
</script>
