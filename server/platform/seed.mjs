const scenarios = [
  {
    id: 'SCN-AUTH-LOGIN',
    key: 'auth-login',
    appId: 'APP-BASE',
    moduleId: 'MOD-BASE-AUTH',
    module: '基座 / Auth',
    name: '登录验证',
    description: '验证 JMOM 测试环境账号可登录并进入首页。',
    priority: 'P0',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/auth-login.spec.js',
    dataSchema: {
      columns: ['用户名', '密码'],
      required: ['用户名', '密码'],
      example: { 用户名: 'byc', 密码: 'Abcd1234' }
    }
  },
  {
    id: 'SCN-WMS-CUSTOMER',
    key: 'wms-customer-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-CUSTOMER',
    module: 'WMS / ImsCustomer',
    name: '客户主数据录入',
    description: '通过 WMS 客户档案页面新增客户并按编号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dataSchema: {
      columns: ['客户编号', '客户名称', '联系人', '客户类别', '客户地址'],
      required: ['客户编号', '客户名称', '联系人', '客户类别', '客户地址'],
      example: {
        客户编号: 'AT-CUST-001',
        客户名称: '自动化客户001',
        联系人: '测试员',
        客户类别: '自动化',
        客户地址: '上海'
      }
    }
  },
  {
    id: 'SCN-WMS-VENDOR',
    key: 'wms-vendor-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-VENDOR',
    module: 'WMS / ImsVendor',
    name: '供应商主数据录入',
    description: '通过 WMS 供应商页面新增供应商并按编号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dataSchema: {
      columns: ['供应商编号', '供应商名称', '联系人', '供应商类别', '供应商地址', '可提前送货天数'],
      required: ['供应商编号', '供应商名称', '联系人', '供应商类别', '供应商地址', '可提前送货天数'],
      example: {
        供应商编号: 'AT-VEN-001',
        供应商名称: '自动化供应商001',
        联系人: '测试员',
        供应商类别: '自动化',
        供应商地址: '上海',
        可提前送货天数: '0'
      }
    }
  },
  {
    id: 'SCN-WMS-PART',
    key: 'wms-part-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-PART',
    module: 'WMS / ImsPart',
    name: '物料主数据录入',
    description: '通过 WMS 料号管理页面新增物料并按料号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dataSchema: {
      columns: ['物料编码', '物料名称', '规格', '库存单位'],
      required: ['物料编码', '物料名称', '规格', '库存单位'],
      example: {
        物料编码: 'AT-PART-001',
        物料名称: '自动化物料001',
        规格: '自动化规格',
        库存单位: 'PCS'
      }
    }
  }
];

const apps = [
  { id: 'APP-BASE', key: 'jmom-base', name: '基座系统', description: 'JMOM 登录、权限、导入导出与平台能力。', sort: 1 },
  { id: 'APP-WMS', key: 'jmom-wms', name: 'WMS 仓储管理', description: '客户、供应商、物料、库位、采购和销售业务。', sort: 2 },
  { id: 'APP-MES', key: 'jmom-mes', name: 'MES 制造执行', description: '工单、投料、工艺路线、流程卡与生产执行。', sort: 3 }
];

const modules = [
  { id: 'MOD-BASE-AUTH', appId: 'APP-BASE', name: '登录认证', prefix: 'Auth', sort: 1 },
  { id: 'MOD-BASE-IMPORT', appId: 'APP-BASE', name: 'Excel 批量导入', prefix: 'ImportExcel', sort: 2 },
  { id: 'MOD-WMS-CUSTOMER', appId: 'APP-WMS', name: '客户管理', prefix: 'ImsCustomer', sort: 1 },
  { id: 'MOD-WMS-PART', appId: 'APP-WMS', name: '物料管理', prefix: 'ImsPart', sort: 2 },
  { id: 'MOD-WMS-VENDOR', appId: 'APP-WMS', name: '供应商管理', prefix: 'ImsVendor', sort: 3 },
  { id: 'MOD-WMS-LOCATOR', appId: 'APP-WMS', name: '库位维护', prefix: 'ImsLocator', sort: 4 },
  { id: 'MOD-MES-WORKORDER', appId: 'APP-MES', name: '生产工单', prefix: 'ProductionMangement', sort: 1 }
];

export function seedPlatform(database) {
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
    id: 'PRJ-JMOM',
    name: 'JMOM',
    description: '制造业 MES + WMS 一体化平台自动化测试项目'
  });
  for (const app of apps) {
    database.ensureApp(app);
  }
  for (const module of modules) {
    database.ensureModule(module);
  }
  for (const scenario of scenarios) {
    database.ensureScenario({ ...scenario, projectId: 'PRJ-JMOM' });
  }
}
