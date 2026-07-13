import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../api';

export const usePlatformStore = defineStore('platform', () => {
  const user = ref(null), project = ref(null), scenarios = ref([]), apps = ref([]), modules = ref([]), environments = ref([]), runs = ref([]), llm = ref(null), runnerMode = ref('playwright');
  const loading = ref(false);
  const readyScenarios = computed(() => scenarios.value.filter(item => item.readiness?.ready));
  async function loadHealth() { runnerMode.value = (await api('/api/health')).runMode || 'playwright'; }
  async function bootstrap() { await loadHealth(); user.value = await api('/api/me'); await Promise.all([loadCatalog(), loadRuns()]); }
  async function login(credentials) { await loadHealth(); user.value = await api('/api/auth/login', { method:'POST', body:JSON.stringify(credentials) }); await Promise.all([loadCatalog(), loadRuns()]); }
  async function logout() { await api('/api/auth/logout', { method:'POST', body:'{}' }); user.value = null; }
  async function loadCatalog() { const [catalog, appData, moduleData, envData] = await Promise.all([api('/api/scenarios'),api('/api/apps'),api('/api/modules'),api('/api/environments')]); project.value=catalog.project; scenarios.value=catalog.scenarios; apps.value=appData.apps; modules.value=moduleData.modules; environments.value=envData.environments; }
  async function loadRuns() { runs.value = await api('/api/runs'); }
  function appName(id) { return apps.value.find(item=>item.id===id)?.name || '-'; }
  function moduleName(id) { return modules.value.find(item=>item.id===id)?.name || '-'; }
  return { user,project,scenarios,apps,modules,environments,runs,llm,runnerMode,loading,readyScenarios,bootstrap,login,logout,loadCatalog,loadRuns,appName,moduleName };
});
