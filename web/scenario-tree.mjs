function bySortThenName(left, right) {
  return (left.sort ?? 0) - (right.sort ?? 0) || String(left.name).localeCompare(String(right.name), 'zh-CN');
}

export function buildScenarioTree(apps, modules, scenarios) {
  const moduleCounts = new Map();
  const appCounts = new Map();

  for (const scenario of scenarios) {
    moduleCounts.set(scenario.moduleId, (moduleCounts.get(scenario.moduleId) || 0) + 1);
    appCounts.set(scenario.appId, (appCounts.get(scenario.appId) || 0) + 1);
  }

  return {
    total: scenarios.length,
    apps: [...apps].sort(bySortThenName).map((app) => ({
      ...app,
      scenarioCount: appCounts.get(app.id) || 0,
      modules: modules
        .filter((module) => module.appId === app.id)
        .sort(bySortThenName)
        .map((module) => ({
          ...module,
          scenarioCount: moduleCounts.get(module.id) || 0
        }))
    }))
  };
}

export function filterScenariosByTree(scenarios, { appId = '', moduleId = '', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return scenarios.filter((scenario) => {
    const matchesKeyword = !normalizedKeyword || [
      scenario.name,
      scenario.module,
      scenario.key,
      scenario.description
    ].join(' ').toLowerCase().includes(normalizedKeyword);
    const matchesApp = !appId || scenario.appId === appId;
    const matchesModule = !moduleId || scenario.moduleId === moduleId;

    return matchesKeyword && matchesApp && matchesModule;
  });
}
