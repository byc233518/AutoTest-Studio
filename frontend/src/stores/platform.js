import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../api';

export const usePlatformStore = defineStore('platform', () => {
  const user = ref(null), project = ref(null), scenarios = ref([]), environments = ref([]), runs = ref([]), llm = ref(null), runnerMode = ref('playwright'), desktopMode = ref(false);
  const loading = ref(false);
  let catalogLoadCount = 0;
  const readyScenarios = computed(() => scenarios.value.filter(item => item.readiness?.ready));
  async function loadHealth() {
    const health = await api('/api/health');
    runnerMode.value = health.runMode || 'playwright';
    desktopMode.value = Boolean(health.desktopMode);
    return health;
  }
  async function bootstrap() { await loadHealth(); user.value = await api('/api/me'); await Promise.all([loadCatalog(), loadRuns()]); }
  async function login(credentials) { await loadHealth(); user.value = await api('/api/auth/login', { method:'POST', body:JSON.stringify(credentials) }); await Promise.all([loadCatalog(), loadRuns()]); }
  async function logout() { await api('/api/auth/logout', { method:'POST', body:'{}' }); user.value = null; }
  async function loadCatalog() {
    catalogLoadCount += 1;
    loading.value = true;
    try {
      const [catalog, envData] = await Promise.all([api('/api/scenarios'), api('/api/environments')]);
      project.value = catalog.project;
      scenarios.value = catalog.scenarios;
      environments.value = envData.environments;
    } finally {
      catalogLoadCount -= 1;
      loading.value = catalogLoadCount > 0;
    }
  }
  async function loadRuns() { runs.value = await api('/api/runs'); }
  function mergeScenario(next) {
    if (!next?.key && !next?.id) return false;
    const index = scenarios.value.findIndex((item) => item.id === next.id || item.key === next.key);
    if (index < 0) return false;
    scenarios.value[index] = { ...scenarios.value[index], ...next };
    return true;
  }
  return { user,project,scenarios,environments,runs,llm,runnerMode,desktopMode,loading,readyScenarios,bootstrap,login,logout,loadCatalog,loadRuns,mergeScenario };
});
