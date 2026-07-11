export function checkScenarioDependencies(database, scenario) {
  const keys = JSON.parse(scenario.depends_on || '[]');
  return keys.map((key) => {
    const dep = database.getScenarioByKey(key);
    if (!dep) {
      return { key, status: 'missing', message: '依赖场景不存在' };
    }
    const passed = database.getLatestPassedRunForScenario(dep.id);
    return {
      key,
      name: dep.name,
      status: passed ? 'ready' : 'pending',
      lastRunId: passed?.id || null,
      message: passed ? '最近执行已通过' : '尚无成功执行记录，请先执行该依赖场景'
    };
  });
}

export function assertDependenciesReady(checks) {
  const missing = checks.filter((check) => check.status !== 'ready');
  if (missing.length) {
    const err = new Error(`依赖未就绪: ${missing.map((check) => check.key).join(', ')}`);
    err.missing = missing;
    throw err;
  }
}
