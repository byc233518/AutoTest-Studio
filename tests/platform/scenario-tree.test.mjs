import assert from 'node:assert/strict';
import test from 'node:test';
import { buildScenarioTree, filterScenariosByTree } from '../../web/scenario-tree.mjs';

const apps = [
  { id: 'APP-BASE', name: '基座系统', sort: 1 },
  { id: 'APP-WMS', name: 'WMS 仓储管理', sort: 2 },
  { id: 'APP-MES', name: 'MES 制造执行', sort: 3 }
];

const modules = [
  { id: 'MOD-BASE-AUTH', appId: 'APP-BASE', name: '登录认证', prefix: 'Auth', sort: 1 },
  { id: 'MOD-WMS-CUSTOMER', appId: 'APP-WMS', name: '客户管理', prefix: 'ImsCustomer', sort: 1 },
  { id: 'MOD-WMS-PART', appId: 'APP-WMS', name: '物料管理', prefix: 'ImsPart', sort: 2 },
  { id: 'MOD-WMS-VENDOR', appId: 'APP-WMS', name: '供应商管理', prefix: 'ImsVendor', sort: 3 },
  { id: 'MOD-WMS-LOCATOR', appId: 'APP-WMS', name: '库位维护', prefix: 'ImsLocator', sort: 4 }
];

const scenarios = [
  { key: 'auth-login', appId: 'APP-BASE', moduleId: 'MOD-BASE-AUTH', name: '登录验证', module: '基座 / Auth' },
  { key: 'wms-customer-create', appId: 'APP-WMS', moduleId: 'MOD-WMS-CUSTOMER', name: '客户主数据录入', module: 'WMS / ImsCustomer' },
  { key: 'wms-vendor-create', appId: 'APP-WMS', moduleId: 'MOD-WMS-VENDOR', name: '供应商主数据录入', module: 'WMS / ImsVendor' },
  { key: 'wms-part-create', appId: 'APP-WMS', moduleId: 'MOD-WMS-PART', name: '物料主数据录入', module: 'WMS / ImsPart' }
];

test('场景分类树按应用和模块汇总场景数量', () => {
  const tree = buildScenarioTree(apps, modules, scenarios);
  const wms = tree.apps.find((item) => item.id === 'APP-WMS');

  assert.equal(tree.total, 4);
  assert.equal(wms.scenarioCount, 3);
  assert.deepEqual(
    wms.modules.map((item) => [item.name, item.scenarioCount]),
    [
      ['客户管理', 1],
      ['物料管理', 1],
      ['供应商管理', 1],
      ['库位维护', 0]
    ]
  );
});

test('选择应用节点时只显示该应用下的测试场景', () => {
  const filtered = filterScenariosByTree(scenarios, { appId: 'APP-WMS' });

  assert.deepEqual(
    filtered.map((item) => item.key),
    ['wms-customer-create', 'wms-vendor-create', 'wms-part-create']
  );
});

test('选择模块节点时只显示该模块下的测试场景', () => {
  const filtered = filterScenariosByTree(scenarios, { appId: 'APP-WMS', moduleId: 'MOD-WMS-CUSTOMER' });

  assert.deepEqual(filtered.map((item) => item.key), ['wms-customer-create']);
});

test('搜索关键字会与树形节点过滤条件叠加', () => {
  const filtered = filterScenariosByTree(scenarios, { appId: 'APP-WMS', keyword: '供应商' });

  assert.deepEqual(filtered.map((item) => item.key), ['wms-vendor-create']);
});
