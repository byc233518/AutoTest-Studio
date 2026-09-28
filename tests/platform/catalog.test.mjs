import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

const repositoryCatalog = JSON.parse(
  await readFile(new URL('../../server/platform/repository-scenarios.generated.json', import.meta.url), 'utf8')
);

const coreScenarioKeys = [
  'auth-login',
  'wms-customer-create',
  'wms-vendor-create',
  'wms-part-create',
  'wms-locator-create',
  'wms-po-create',
  'wms-so-create',
  'mes-workorder-create',
  'mes-workshop-line-create',
  'mes-barcode-pass',
  'mes-barcode-report',
  'base-excel-import',
  'wms-stock-query',
  'mes-wobom-query',
  'base-user-create'
];

test('平台种子数据包含核心发布场景和代码仓库草稿场景', async (t) => {
  const ctx = await createTestContext(t);
  const response = await ctx.fetch('/api/scenarios', {
    headers: { cookie: await ctx.loginCookie('tester', 'Tester123!') }
  });

  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.project.name, 'JMOM');
  const scenarioByKey = new Map(body.scenarios.map((scenario) => [scenario.key, scenario]));
  const coreScenarios = coreScenarioKeys.map((key) => scenarioByKey.get(key));
  assert.equal(coreScenarios.every(Boolean), true);
  assert.equal(coreScenarios.every((scenario) => scenario.status === 'published'), true);

  const generatedKeys = new Set(repositoryCatalog.scenarios.map((scenario) => scenario.key));
  const generatedScenarios = body.scenarios.filter((scenario) => generatedKeys.has(scenario.key));
  assert.equal(generatedScenarios.length, repositoryCatalog.summary.scenarios);
  assert.equal(generatedScenarios.every((scenario) => scenario.status === 'draft'), true);
  assert.equal(generatedScenarios.every((scenario) => (
    scenario.scriptEntry === repositoryCatalog.scenarios.find((item) => item.key === scenario.key)?.scriptEntry
  )), true);
  assert.deepEqual(
    Object.fromEntries(repositoryCatalog.sources.map((source) => [source.key, source.scenarios])),
    { base: 217, mes: 71, wms: 140, qms: 13, tpm: 36, legacyMes: 322 }
  );
  assert.equal(body.scenarios.length, coreScenarioKeys.length + repositoryCatalog.summary.scenarios);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'wms-customer-create').dataSchema.required.includes('客户编号'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'wms-customer-create').module, '基础设定 / 基础数据 / 客户档案');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'wms-stock-query').module, '仓库管理 / 库存管理 / 库存管理');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-workorder-create').scriptEntry, 'tests/mes-production.spec.js');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-workorder-create').module, '生产管理 / 生产计划 / 工单管理');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-barcode-report').module, '生产管理 / 生产作业 / 条码报工');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-workshop-line-create').dataSchema.required.includes('线体名称'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-barcode-pass').dataSchema.required.includes('条码'), true);
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'base-user-create').scriptEntry, 'tests/base-user.spec.js');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'wms-stock-query').scriptEntry, 'tests/wms-stock.spec.js');
  assert.equal(body.scenarios.find((scenario) => scenario.key === 'mes-wobom-query').dependsOn.includes('mes-workorder-create'), true);
});

test('普通测试人员可以发布场景', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const script = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ content: 'export const testDataSchema={columns:[\'客户编号\'],required:[\'客户编号\']};', fileName: 'wms-customer-create.spec.js' })
  });
  assert.equal(script.status, 200);
  const response = await ctx.fetch('/api/scenarios/wms-customer-create/publish', {
    method: 'POST',
    headers: { cookie }
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, 'published');
  assert.equal(body.version, 'v1');
});
