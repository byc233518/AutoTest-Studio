import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildScenarioTree,
  filterScenariosByTree,
  findScenarioTreeNode,
  splitScenarioMenuPath
} from '../../web/scenario-tree.mjs';

const apps = [
  { id: 'APP-WMS', name: '仓储管理', sort: 2 },
  { id: 'APP-MES', name: '制造执行', sort: 3 }
];

const modules = [
  { id: 'MOD-WMS-CUSTOMER', appId: 'APP-WMS', name: '客户管理', sort: 1 },
  { id: 'MOD-WMS-VENDOR', appId: 'APP-WMS', name: '供应商管理', sort: 2 },
  { id: 'MOD-WMS-LOCATOR', appId: 'APP-WMS', name: '库位维护', sort: 3 },
  { id: 'MOD-MES-BARCODE', appId: 'APP-MES', name: '条码报工', sort: 1 }
];

const scenarios = [
  {
    id: 'SCN-CUSTOMER',
    key: 'wms-customer-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-CUSTOMER',
    name: '客户主数据录入',
    module: '基础设定 / 基础数据 / 客户档案',
    actions: ['新增', '编辑', '删除']
  },
  {
    id: 'SCN-VENDOR',
    key: 'wms-vendor-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-VENDOR',
    name: '供应商主数据录入',
    module: '基础设定 / 基础数据 / 供应商'
  },
  {
    id: 'SCN-LOCATOR',
    key: 'wms-locator-create',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-LOCATOR',
    name: '库位维护录入',
    module: '基础设定 / 仓库建模 / 储位管理'
  },
  {
    id: 'SCN-BARCODE',
    key: 'mes-barcode-report',
    appId: 'APP-MES',
    moduleId: 'MOD-MES-BARCODE',
    name: '条码报工全流程',
    module: '生产管理 / 生产作业 / 条码报工'
  }
];

test('场景分类树按真实业务菜单上移一级且不把页面和功能按钮作为分类', () => {
  const tree = buildScenarioTree(apps, modules, scenarios);
  const wms = tree.apps.find((item) => item.id === 'APP-WMS');
  const basicSetting = wms.children.find((item) => item.label === '基础设定');
  const baseData = basicSetting.children.find((item) => item.label === '基础数据');
  const warehouseModeling = basicSetting.children.find((item) => item.label === '仓库建模');

  assert.equal(tree.total, 4);
  assert.equal(wms.scenarioCount, 3);
  assert.deepEqual(baseData.children, []);
  assert.deepEqual(warehouseModeling.children, []);
  assert.equal(findScenarioTreeNode(tree.apps, baseData.id).scenarioCount, 2);
  assert.equal(JSON.stringify(tree).includes('客户档案'), false);
  assert.equal(JSON.stringify(tree).includes('供应商'), false);
  assert.equal(JSON.stringify(tree).includes('储位管理'), false);
  assert.equal(JSON.stringify(tree).includes('新增'), false);
  assert.equal(JSON.stringify(tree).includes('编辑'), false);
  assert.equal(JSON.stringify(tree).includes('删除'), false);
});

test('菜单路径只按带空格的层级分隔符拆分，不拆分菜单名称中的斜杠', () => {
  assert.deepEqual(
    splitScenarioMenuPath('生产管理 / 工厂建模 / 车间/线体建模'),
    ['生产管理', '工厂建模', '车间/线体建模']
  );
});

test('只有页面末级的场景上移后直接归入业务系统', () => {
  const tree = buildScenarioTree(apps, modules, [{
    id: 'SCN-STANDALONE',
    key: 'wms-standalone-page',
    appId: 'APP-WMS',
    moduleId: 'MOD-WMS-CUSTOMER',
    name: '独立页面校验',
    module: '独立页面'
  }]);
  const wms = tree.apps.find((item) => item.id === 'APP-WMS');

  assert.equal(wms.scenarioCount, 1);
  assert.deepEqual(wms.children, []);
});

test('选择任一父级菜单时包含其全部子菜单场景', () => {
  const tree = buildScenarioTree(apps, modules, scenarios);
  const basicSetting = findScenarioTreeNode(tree.apps, 'CATEGORY:APP-WMS:%E5%9F%BA%E7%A1%80%E8%AE%BE%E5%AE%9A');
  const filtered = filterScenariosByTree(scenarios, { scenarioIds: basicSetting.scenarioIds });

  assert.deepEqual(filtered.map((item) => item.key), [
    'wms-customer-create',
    'wms-vendor-create',
    'wms-locator-create'
  ]);
});

test('搜索关键字会与菜单层级过滤条件叠加', () => {
  const tree = buildScenarioTree(apps, modules, scenarios);
  const wms = tree.apps.find((item) => item.id === 'APP-WMS');
  const filtered = filterScenariosByTree(scenarios, {
    scenarioIds: wms.scenarioIds,
    keyword: '供应商',
    moduleNames: new Map(modules.map((module) => [module.id, module.name]))
  });

  assert.deepEqual(filtered.map((item) => item.key), ['wms-vendor-create']);
});
