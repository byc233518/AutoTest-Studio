const scenarios = [
  {
    id: 'SCN-SAMPLE-OPEN',
    key: 'sample-open-page',
    appId: 'APP-SAMPLE',
    moduleId: 'MOD-SAMPLE-NAV',
    module: '示例 / 导航',
    name: '打开页面',
    description: '打开 Bing 首页，确认搜索框可见。覆盖最常用的访问与断言。',
    priority: 'P0',
    status: 'published',
    version: '1.0.0',
    owner: '示例',
    scriptEntry: 'tests/sample-open-page.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: [],
      required: [],
      example: {}
    }
  },
  {
    id: 'SCN-SAMPLE-FORM',
    key: 'sample-form-submit',
    appId: 'APP-SAMPLE',
    moduleId: 'MOD-SAMPLE-FORM',
    module: '示例 / 表单',
    name: '表单填写与提交',
    description: '在 Bing 搜索框填写关键词并提交，确认进入结果页。覆盖表单填写与提交。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '示例',
    scriptEntry: 'tests/sample-form-submit.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: ['记录编码', '记录名称', '经办人', '分类', '说明'],
      required: ['记录编码', '记录名称'],
      example: {
        记录编码: 'AT-001',
        记录名称: 'Playwright',
        经办人: '测试员',
        分类: '示例',
        说明: '在 Bing 搜索框填写并提交'
      }
    }
  },
  {
    id: 'SCN-SAMPLE-SEARCH',
    key: 'sample-search',
    appId: 'APP-SAMPLE',
    moduleId: 'MOD-SAMPLE-QUERY',
    module: '示例 / 查询',
    name: '查询与筛选',
    description: '在 Bing 按关键字搜索，确认结果区域包含该关键字。覆盖查询类操作。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '示例',
    scriptEntry: 'tests/sample-search.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: ['关键字'],
      required: ['关键字'],
      example: { 关键字: 'Playwright' }
    }
  },
  {
    id: 'SCN-SAMPLE-DATA',
    key: 'sample-data-driven',
    appId: 'APP-SAMPLE',
    moduleId: 'MOD-SAMPLE-FORM',
    module: '示例 / 表单',
    name: '数据驱动执行',
    description: '同一脚本按数据集每一行在 Bing 搜索一次。覆盖数据驱动回归。',
    priority: 'P2',
    status: 'published',
    version: '1.0.0',
    owner: '示例',
    scriptEntry: 'tests/sample-data-driven.spec.js',
    dependsOn: ['sample-form-submit'],
    dataSchema: {
      columns: ['记录编码', '记录名称'],
      required: ['记录编码', '记录名称'],
      example: {
        记录编码: 'AT-ROW-001',
        记录名称: 'TypeScript'
      }
    }
  }
];

const apps = [
  { id: 'APP-SAMPLE', key: 'sample-app', name: '示例应用', description: '开源初始化自带的通用操作示例，可删除后换成你的被测系统。', sort: 1 }
];

const modules = [
  { id: 'MOD-SAMPLE-NAV', appId: 'APP-SAMPLE', name: '导航', prefix: 'SampleNav', sort: 1 },
  { id: 'MOD-SAMPLE-FORM', appId: 'APP-SAMPLE', name: '表单', prefix: 'SampleForm', sort: 2 },
  { id: 'MOD-SAMPLE-QUERY', appId: 'APP-SAMPLE', name: '查询', prefix: 'SampleQuery', sort: 3 }
];

export const SAMPLE_SCENARIO_KEYS = scenarios.map((scenario) => scenario.key);

export function seedPlatform(database, {
  preserveExisting = false
} = {}) {
  if (!database.getUserByUsername('admin')) {
    database.createUser({
      id: 'USR-ADMIN',
      username: 'admin',
      displayName: '平台管理员',
      role: 'admin',
      password: 'Admin123!'
    });
  }
  if (!database.getUserByUsername('tester')) {
    database.createUser({
      id: 'USR-TESTER',
      username: 'tester',
      displayName: '测试人员',
      role: 'tester',
      password: 'Tester123!'
    });
  }
  if (!database.getUserByUsername('maintainer')) {
    database.createUser({
      id: 'USR-MAINTAINER',
      username: 'maintainer',
      displayName: '场景维护员',
      role: 'maintainer',
      password: 'Maintainer123!'
    });
  }

  database.ensureProject({
    id: 'PRJ-AUTOTEST',
    name: 'AutoTest Studio',
    description: '通用自动化测试项目（可替换为任意被测系统）'
  });
  for (const env of [
    {
      id: 'ENV-TEST',
      key: 'test',
      name: '测试环境',
      baseUrl: 'https://www.bing.com',
      username: '',
      password: '',
      isDefault: true,
      sort: 1
    },
    {
      id: 'ENV-STAGING',
      key: 'staging',
      name: '预发环境',
      baseUrl: 'https://www.bing.com',
      username: '',
      password: '',
      isDefault: false,
      sort: 2
    }
  ]) {
    const existing = database.getEnvironmentById(env.id) || database.getEnvironmentByKey(env.key);
    if (!preserveExisting || !existing) database.ensureEnvironment(env);
  }
  for (const app of apps) {
    database.ensureApp(app);
  }
  for (const module of modules) {
    database.ensureModule(module);
  }
  for (const scenario of scenarios) {
    const existing = database.getScenarioById(scenario.id) || database.getScenarioByKey(scenario.key);
    if (!preserveExisting || !existing) {
      database.ensureScenario({ ...scenario, projectId: 'PRJ-AUTOTEST' });
    }
  }
  if (!database.listEntities('suite').length) {
    database.createEntity({
      id: 'STE-SMOKE',
      type: 'suite',
      name: '示例冒烟',
      payload: {
        description: '覆盖 Bing 打开首页、搜索提交、结果查询与数据驱动。',
        scenarioKeys: SAMPLE_SCENARIO_KEYS,
        executionMode: 'headless'
      },
      createdBy: 'system',
      prefix: 'STE'
    });
  }
  if (!database.listEntities('notification').length) {
    database.createEntity({
      id: 'NOT-INAPP',
      type: 'notification',
      name: '站内通知',
      payload: { channel: 'in-app', events: ['run-failed', 'schedule-failed'] },
      createdBy: 'system',
      prefix: 'NOT'
    });
  }
}
