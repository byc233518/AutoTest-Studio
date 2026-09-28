import { readFileSync } from 'node:fs';

const repositoryCatalog = JSON.parse(
  readFileSync(new URL('./repository-scenarios.generated.json', import.meta.url), 'utf8')
);

const scenarios = [
  {
    id: 'SCN-AUTH-LOGIN',
    key: 'auth-login',
    appId: 'APP-BASE',
    moduleId: 'MOD-BASE-AUTH',
    module: '系统入口 / 登录认证',
    name: '登录验证',
    description: '验证被测系统测试环境账号可登录并进入首页。',
    priority: 'P0',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/auth-login.spec.js',
    dependsOn: [],
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
    module: '基础设定 / 基础数据 / 客户档案',
    name: '客户主数据录入',
    description: '通过 WMS 客户档案页面新增客户并按编号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dependsOn: [],
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
    module: '基础设定 / 基础数据 / 供应商',
    name: '供应商主数据录入',
    description: '通过 WMS 供应商页面新增供应商并按编号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dependsOn: [],
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
    module: '基础设定 / 基础数据 / 料号管理',
    name: '物料主数据录入',
    description: '通过 WMS 料号管理页面新增物料并按料号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dependsOn: [],
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
  },
  {
    id: 'SCN-WMS-LOCATOR',
    key: 'wms-locator-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-LOCATOR',
    module: '基础设定 / 仓库建模 / 储位管理',
    name: '库位维护录入',
    description: '通过 WMS 储位维护页面新增储位并按储位码查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-master-data.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: [
        '储位码',
        '储位名称',
        '公司',
        '仓库',
        '捡料区',
        '储存区',
        '楼层',
        '部门',
        '区域',
        '货架号',
        '货架面',
        '容量',
        '储位类型',
        '库位编码'
      ],
      required: [
        '储位码',
        '储位名称',
        '公司',
        '仓库',
        '捡料区',
        '储存区',
        '楼层',
        '部门',
        '区域',
        '货架号',
        '货架面',
        '容量',
        '储位类型'
      ],
      example: {
        储位码: 'AT-LOC-001',
        储位名称: '自动化储位001',
        公司: '自动化公司',
        仓库: '自动化仓库',
        捡料区: 'PA01',
        储存区: 'SA01',
        楼层: '1',
        部门: '自动化部门',
        区域: 'A',
        货架号: 'R01',
        货架面: '正面',
        容量: '100',
        储位类型: '普通',
        库位编码: ''
      }
    }
  },
  {
    id: 'SCN-WMS-PO',
    key: 'wms-po-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-PO',
    module: '配置中心 / 表单管理 / 导入配置',
    name: '采购订单创建',
    description:
      '采购订单（ImsPoMst）无独立 CRUD 页面，通过 Excel 导入创建。本场景验证导入配置页就绪，并文档化导入列 schema；实际建单依赖供应商与物料主数据。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-order.spec.js',
    dependsOn: ['wms-vendor-create', 'wms-part-create'],
    dataSchema: {
      columns: [
        '采购订单号',
        '订单类型',
        '供应商编号',
        '行项目',
        '物料编码',
        '订单数量',
        '接收库位编码',
        '交货日',
        '采购单位',
        '库存单位'
      ],
      required: [
        '采购订单号',
        '订单类型',
        '供应商编号',
        '行项目',
        '物料编码',
        '订单数量',
        '接收库位编码',
        '交货日',
        '采购单位',
        '库存单位'
      ],
      example: {
        采购订单号: 'AT-PO-001',
        订单类型: '标准采购',
        供应商编号: 'AT-VEN-001',
        行项目: '10',
        物料编码: 'AT-PART-001',
        订单数量: '100',
        接收库位编码: 'AT-SIC-001',
        交货日: '2026-07-15',
        采购单位: 'PCS',
        库存单位: 'PCS'
      }
    }
  },
  {
    id: 'SCN-WMS-SO',
    key: 'wms-so-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-SO',
    module: '配置中心 / 表单管理 / 导入配置',
    name: '销售订单创建',
    description:
      '销售订单（ImsSoMst）无独立 CRUD 页面，通过 Excel 导入创建。本场景验证导入配置页就绪，并文档化导入列 schema；实际建单依赖客户与物料主数据。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-order.spec.js',
    dependsOn: ['wms-customer-create', 'wms-part-create'],
    dataSchema: {
      columns: ['销单号', '销单日期', '销单类型', '客户编号', '行号', '物料编码', '开单数量', '单位', '库位编码'],
      required: ['销单号', '销单日期', '销单类型', '客户编号', '行号', '物料编码', '开单数量', '单位', '库位编码'],
      example: {
        销单号: 'AT-SO-001',
        销单日期: '2026-07-08',
        销单类型: '标准销售',
        客户编号: 'AT-CUST-001',
        行号: '10',
        物料编码: 'AT-PART-001',
        开单数量: '50',
        单位: 'PCS',
        库位编码: 'AT-SIC-001'
      }
    }
  },
  {
    id: 'SCN-MES-WORKORDER',
    key: 'mes-workorder-create',
    appId: 'APP-MES',
    moduleId: 'MOD-MES-WORKORDER',
    module: '生产管理 / 生产计划 / 工单管理',
    name: '生产工单创建',
    description: '通过 MES 生产工单页面创建虚拟工单，并按工单号或客户订单号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/mes-production.spec.js',
    dependsOn: ['wms-part-create'],
    dataSchema: {
      columns: ['物料编码', '工单类型', '工单状态', '目标量', '车间名称', '客户订单号', '客户料号', '客户品名', '客户规格', '开始日期', '完工日期', '客户交期'],
      required: ['物料编码', '工单类型', '工单状态', '目标量', '开始日期', '完工日期'],
      example: {
        物料编码: 'AT-PART-001',
        工单类型: '正常',
        工单状态: '已创建',
        目标量: '10',
        车间名称: '自动化车间001',
        客户订单号: 'AT-CO-001',
        客户料号: 'AT-OEM-001',
        客户品名: '自动化客户品名001',
        客户规格: '自动化客户规格',
        开始日期: '2026-07-08',
        完工日期: '2026-07-09',
        客户交期: '2026-07-15'
      }
    }
  },
  {
    id: 'SCN-MES-WORKSHOP-LINE',
    key: 'mes-workshop-line-create',
    appId: 'APP-MES',
    moduleId: 'MOD-MES-WORKSHOP-LINE',
    module: '基础设定 / 工厂建模 / 工厂建模',
    name: '车间/线体创建',
    description: '通过 MES 工厂建模页面创建车间和线体，并验证树形结构及列表数据。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/mes-production.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: ['车间编码', '车间名称', '线体编码', '线体名称', '工段', '所属工序', '区域序号'],
      required: ['车间名称', '线体名称'],
      example: {
        车间编码: 'AT-WS-001',
        车间名称: '自动化车间001',
        线体编码: 'AT-LINE-001',
        线体名称: '自动化线体001',
        工段: '总装',
        所属工序: '总装',
        区域序号: '1'
      }
    }
  },
  {
    id: 'SCN-MES-BARCODE-PASS',
    key: 'mes-barcode-pass',
    appId: 'APP-MES',
    moduleId: 'MOD-MES-BARCODE-PASS',
    module: '生产管理 / 生产作业 / 条码报工',
    name: '条码过站',
    description: '打开 MES 生产作业看板（桌面方案编码如 S20250032），选择参与排程的线体后扫码过站。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/mes-production.spec.js',
    dependsOn: ['mes-workorder-create', 'mes-workshop-line-create'],
    dataSchema: {
      columns: ['作业看板编码', '工单号', '线体ID', '车间名称', '线体名称', '工序名称', '条码', '良品数', '次品数', '是否扫码提交'],
      required: ['作业看板编码', '工单号', '条码'],
      example: {
        作业看板编码: 'S20250032',
        工单号: 'AT-WO-001',
        线体ID: '',
        车间名称: '自动化车间001',
        线体名称: '自动化线体001',
        工序名称: '总装',
        条码: 'AT-SN-001',
        良品数: '1',
        次品数: '0',
        是否扫码提交: '是'
      }
    }
  },
  {
    id: 'SCN-MES-BARCODE-REPORT',
    key: 'mes-barcode-report',
    appId: 'APP-MES',
    moduleId: 'MOD-MES-BARCODE-REPORT',
    module: '生产管理 / 生产作业 / 条码报工',
    name: '条码报工全流程',
    description: '创建工单、生成 10 个条码、配置工艺路线，进入条码报工页面选择线体/工序/工单后逐个扫码报工。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/mes-barcode-report.spec.js',
    dependsOn: ['wms-part-create'],
    dataSchema: {
      columns: [
        '物料编码', '目标量', '条码数量', '条码前缀', '变化位数',
        '车间编码', '车间名称', '线体编码', '线体名称', '工段', '所属工序', '区域序号',
        '工艺名称', '来源模板', '作业看板编码', '工序名称',
        '客户订单号', '客户料号', '客户品名', '客户规格', '开始日期', '完工日期', '客户交期'
      ],
      required: ['物料编码', '条码数量', '车间名称', '线体名称', '作业看板编码', '工序名称'],
      example: {
        物料编码: 'AT-PART-001',
        目标量: '10',
        条码数量: '10',
        条码前缀: 'AT-SN-001',
        变化位数: '4',
        车间编码: 'AT-WS-001',
        车间名称: '自动化车间001',
        线体编码: 'AT-LINE-001',
        线体名称: '自动化线体001',
        工段: '总装',
        所属工序: '总装',
        区域序号: '1',
        工艺名称: 'AT-ROUTE-001',
        来源模板: '',
        作业看板编码: 'S20250032',
        工序名称: '总装',
        客户订单号: 'AT-CO-001',
        客户料号: 'AT-OEM-001',
        客户品名: '自动化客户品名001',
        客户规格: '自动化客户规格',
        开始日期: '2026-07-08',
        完工日期: '2026-07-09',
        客户交期: '2026-07-15'
      }
    }
  },
  {
    id: 'SCN-BASE-EXCEL-IMPORT',
    key: 'base-excel-import',
    appId: 'APP-BASE',
    moduleId: 'MOD-BASE-IMPORT',
    module: '配置中心 / 表单管理 / 导入配置',
    name: 'Excel 批量导入',
    description: '打开导入配置页（#/ImportConfig），验证页面加载及基本信息/导出模板等能力入口可用。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/base-import-excel.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: ['基本信息名称', '表名', '项目标题', 'Excel栏位', '是否可空值'],
      required: ['基本信息名称', '表名'],
      example: {
        基本信息名称: '客户导入',
        表名: 'ImsCustomer',
        项目标题: '客户编号',
        Excel栏位: 'CustomerCode',
        是否可空值: '否'
      }
    }
  },
  {
    id: 'SCN-BASE-USER-CREATE',
    key: 'base-user-create',
    appId: 'APP-BASE',
    moduleId: 'MOD-BASE-USER',
    module: '系统管理 / 用户权限 / 用户管理',
    name: '用户管理新增',
    description: '通过基座用户管理页面新增用户，自动选择当前环境可用的角色、用户类型和组织架构，并按账号查询验证。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/base-user.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: ['用户账号', '用户昵称'],
      required: ['用户账号', '用户昵称'],
      example: {
        用户账号: 'AT-USER-001',
        用户昵称: '自动化用户001'
      }
    }
  },
  {
    id: 'SCN-WMS-STOCK-QUERY',
    key: 'wms-stock-query',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-STOCK',
    module: '仓库管理 / 库存管理 / 库存管理',
    name: '库存查询与追溯入口',
    description: '打开 WMS 库存查询页面，验证库存主表及子条码、收料单据、捡料单据和库存交易日志追溯入口可用。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/wms-stock.spec.js',
    dependsOn: [],
    dataSchema: {
      columns: [],
      required: [],
      example: {}
    }
  },
  {
    id: 'SCN-MES-WOBOM-QUERY',
    key: 'mes-wobom-query',
    appId: 'APP-MES',
    moduleId: 'MOD-MES-WOBOM',
    module: '生产管理 / 生产计划 / 生产BOM',
    name: '生产 BOM 查询与同步入口',
    description: '打开 MES 生产 BOM 页面，验证列表加载、全量同步和按单号同步入口可用。',
    priority: 'P1',
    status: 'published',
    version: '1.0.0',
    owner: '自动化负责人',
    scriptEntry: 'tests/mes-wobom.spec.js',
    dependsOn: ['mes-workorder-create'],
    dataSchema: {
      columns: [],
      required: [],
      example: {}
    }
  }
];

const apps = [
  { id: 'APP-BASE', key: 'autotest-base', name: '基座系统', description: '基座登录、权限、导入导出与平台能力。', sort: 1 },
  { id: 'APP-WMS', key: 'autotest-wms', name: '仓储管理', description: '客户、供应商、物料、库位、采购和销售业务。', sort: 2 },
  { id: 'APP-MES', key: 'autotest-mes', name: '制造执行', description: '工单、投料、工艺路线、流程卡与生产执行。', sort: 3 },
  { id: 'APP-QMS', key: 'autotest-qms', name: '质量管理', description: '抽样方案、检验作业、SPC 分析与质量报表。', sort: 4 },
  { id: 'APP-TPM', key: 'autotest-tpm', name: '设备管理', description: '模具、钢网、刮刀、飞达与设备互联管理。', sort: 5 },
  { id: 'APP-LEGACY-MES', key: 'autotest-legacy-mes', name: '旧版制造执行', description: '旧版 MES 的生产、质量、设备和报表功能。', sort: 6 }
];

const modules = [
  { id: 'MOD-BASE-AUTH', appId: 'APP-BASE', name: '登录认证', prefix: 'Auth', sort: 1 },
  { id: 'MOD-BASE-IMPORT', appId: 'APP-BASE', name: '表格批量导入', prefix: 'ImportExcel', sort: 2 },
  { id: 'MOD-BASE-USER', appId: 'APP-BASE', name: '用户管理', prefix: 'User', sort: 3 },
  { id: 'MOD-WMS-CUSTOMER', appId: 'APP-WMS', name: '客户管理', prefix: 'ImsCustomer', sort: 1 },
  { id: 'MOD-WMS-PART', appId: 'APP-WMS', name: '物料管理', prefix: 'ImsPart', sort: 2 },
  { id: 'MOD-WMS-VENDOR', appId: 'APP-WMS', name: '供应商管理', prefix: 'ImsVendor', sort: 3 },
  { id: 'MOD-WMS-LOCATOR', appId: 'APP-WMS', name: '库位维护', prefix: 'ImsLocator', sort: 4 },
  { id: 'MOD-WMS-PO', appId: 'APP-WMS', name: '采购订单', prefix: 'ImsPoMst', sort: 5 },
  { id: 'MOD-WMS-SO', appId: 'APP-WMS', name: '销售订单', prefix: 'ImsSoMst', sort: 6 },
  { id: 'MOD-WMS-STOCK', appId: 'APP-WMS', name: '库存查询', prefix: 'ImsStock', sort: 7 },
  { id: 'MOD-MES-WORKORDER', appId: 'APP-MES', name: '生产工单', prefix: 'ProductionMangement', sort: 1 },
  { id: 'MOD-MES-WORKSHOP-LINE', appId: 'APP-MES', name: '车间/线体建模', prefix: 'SfcsFactoryModeling', sort: 2 },
  { id: 'MOD-MES-BARCODE-PASS', appId: 'APP-MES', name: '条码过站', prefix: 'ProductProcessing', sort: 3 },
  { id: 'MOD-MES-BARCODE-REPORT', appId: 'APP-MES', name: '条码报工', prefix: 'DesktopReportWork', sort: 4 },
  { id: 'MOD-MES-WOBOM', appId: 'APP-MES', name: '生产 BOM', prefix: 'WoBom', sort: 5 }
];

export function seedPlatform(database, {
  preserveExisting = false,
  includeRepositoryCatalog = true
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
    description: '制造业 MES + WMS 一体化平台自动化测试项目'
  });
  for (const env of [
    {
      id: 'ENV-TEST',
      key: 'test',
      name: '测试环境',
      baseUrl: 'http://172.16.100.11:46069',
      username: 'byc',
      password: 'Abcd1234',
      isDefault: true,
      sort: 1
    },
    {
      id: 'ENV-STAGING',
      key: 'staging',
      name: '预发环境',
      baseUrl: 'http://172.16.100.11:46069',
      username: 'byc',
      password: 'Abcd1234',
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
  const seedModules = includeRepositoryCatalog ? [...modules, ...repositoryCatalog.modules] : modules;
  for (const module of seedModules) {
    database.ensureModule(module);
  }
  const seedScenarios = includeRepositoryCatalog ? [...scenarios, ...repositoryCatalog.scenarios] : scenarios;
  for (const scenario of seedScenarios) {
    const existing = database.getScenarioById(scenario.id) || database.getScenarioByKey(scenario.key);
    if (!preserveExisting || !existing) {
      database.ensureScenario({ ...scenario, projectId: 'PRJ-AUTOTEST' });
    }
  }
  if (includeRepositoryCatalog && !preserveExisting) {
    database.syncGeneratedCatalog({
      scenarioIds: repositoryCatalog.scenarios.map((scenario) => scenario.id),
      moduleIds: repositoryCatalog.modules.map((module) => module.id)
    });
  }
  if (!database.listEntities('suite').length) {
    database.createEntity({ id: 'STE-SMOKE', type: 'suite', name: '核心冒烟测试', payload: { description: '登录、主数据和核心生产链快速验证', scenarioKeys: ['auth-login', 'wms-customer-create', 'wms-part-create', 'mes-workorder-create'], executionMode: 'headless' }, createdBy: 'system', prefix: 'STE' });
    database.createEntity({ id: 'STE-WMS-MASTER', type: 'suite', name: 'WMS 主数据初始化', payload: { description: '按依赖顺序准备客户、供应商、物料和库位', scenarioKeys: ['wms-customer-create', 'wms-vendor-create', 'wms-part-create', 'wms-locator-create'], executionMode: 'headless' }, createdBy: 'system', prefix: 'STE' });
    database.createEntity({ id: 'STE-MES-FLOW', type: 'suite', name: 'MES 生产链回归', payload: { description: '工单、线体、过站和报工流程', scenarioKeys: ['mes-workorder-create', 'mes-workshop-line-create', 'mes-barcode-pass', 'mes-barcode-report'], executionMode: 'headless' }, createdBy: 'system', prefix: 'STE' });
  }
  if (!database.listEntities('notification').length) database.createEntity({ id: 'NOT-INAPP', type: 'notification', name: '站内通知', payload: { channel: 'in-app', events: ['run-failed', 'schedule-failed'] }, createdBy: 'system', prefix: 'NOT' });
}
