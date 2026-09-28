function bySortThenName(left, right) {
  return (left.sort ?? 0) - (right.sort ?? 0) || String(left.name).localeCompare(String(right.name), 'zh-CN');
}

export function splitScenarioMenuPath(value) {
  return String(value || '')
    .split(' / ')
    .map((item) => item.trim())
    .filter(Boolean);
}

function categoryId(appId, path) {
  return `CATEGORY:${appId}:${path.map((item) => encodeURIComponent(item)).join('/')}`;
}

function addScenarioToCategory(parent, appId, path, scenarioIdentity) {
  let current = parent;
  const currentPath = [];
  for (const label of path) {
    currentPath.push(label);
    let child = current.children.find((item) => item.label === label);
    if (!child) {
      child = {
        id: categoryId(appId, currentPath),
        appId,
        label,
        type: 'menu',
        path: [...currentPath],
        scenarioIds: [],
        scenarioCount: 0,
        children: []
      };
      current.children.push(child);
    }
    if (!child.scenarioIds.includes(scenarioIdentity)) child.scenarioIds.push(scenarioIdentity);
    child.scenarioCount = child.scenarioIds.length;
    current = child;
  }
}

export function buildScenarioTree(apps, modules, scenarios) {
  const moduleById = new Map(modules.map((module) => [module.id, module]));

  return {
    total: scenarios.length,
    apps: [...apps].sort(bySortThenName).map((app) => {
      const appScenarios = scenarios.filter((scenario) => scenario.appId === app.id);
      const appNode = {
        ...app,
        label: app.name,
        type: 'app',
        scenarioIds: appScenarios.map((scenario) => scenario.id || scenario.key),
        scenarioCount: appScenarios.length,
        children: []
      };
      for (const scenario of appScenarios) {
        const module = moduleById.get(scenario.moduleId);
        const menuPath = splitScenarioMenuPath(scenario.module);
        const categoryPath = menuPath.length
          ? menuPath.slice(0, -1)
          : [module?.name || '未配置菜单'];
        addScenarioToCategory(
          appNode,
          app.id,
          categoryPath,
          scenario.id || scenario.key
        );
      }
      return appNode;
    })
  };
}

export function findScenarioTreeNode(nodes, id) {
  for (const node of nodes || []) {
    if (node.id === id) return node;
    const nested = findScenarioTreeNode(node.children, id);
    if (nested) return nested;
  }
  return null;
}

export function filterScenariosByTree(scenarios, {
  appId = '',
  moduleId = '',
  scenarioIds,
  keyword = '',
  moduleNames = new Map()
} = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase();
  const selectedScenarioIds = scenarioIds == null ? null : new Set(scenarioIds);

  return scenarios.filter((scenario) => {
    const matchesKeyword = !normalizedKeyword || [
      scenario.name,
      scenario.module,
      moduleNames.get(scenario.moduleId),
      scenario.key,
      scenario.description
    ].join(' ').toLowerCase().includes(normalizedKeyword);
    const matchesApp = !appId || scenario.appId === appId;
    const matchesModule = !moduleId || scenario.moduleId === moduleId;
    const matchesCategory = !selectedScenarioIds || selectedScenarioIds.has(scenario.id || scenario.key);

    return matchesKeyword && matchesApp && matchesModule && matchesCategory;
  });
}
