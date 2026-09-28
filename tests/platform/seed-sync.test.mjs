import assert from 'node:assert/strict';
import test from 'node:test';
import { createPlatformDatabase } from '../../server/platform/database.mjs';
import { seedPlatform } from '../../server/platform/seed.mjs';

const chinesePattern = /[\u3400-\u9fff]/u;

test('重复初始化会同步中文目录并仅清理失效的自动场景和模块', (t) => {
  const database = createPlatformDatabase(':memory:');
  t.after(() => database.close());
  seedPlatform(database);

  const currentAutoModule = database.listModules('APP-MES').find((module) => module.id.startsWith('MOD-AUTO-'));
  database.raw.prepare("UPDATE apps SET name = 'MES Manufacturing' WHERE id = 'APP-MES'").run();
  database.raw.prepare('UPDATE modules SET name = ? WHERE id = ?').run('DailyEquipmentPlan', currentAutoModule.id);

  database.createModule({ id: 'MOD-AUTO-STALE', appId: 'APP-MES', name: 'StaleModule', prefix: 'Stale', sort: 9999 });
  database.createScenario({
    id: 'SCN-AUTO-STALE',
    key: 'auto-stale-scenario',
    appId: 'APP-MES',
    moduleId: 'MOD-AUTO-STALE',
    module: 'StaleModule',
    name: 'StaleScenario',
    dataSchema: { columns: ['Code'], required: [], example: { Code: 'AT-001' } }
  });
  database.createDataset({
    id: 'DAT-AUTO-STALE',
    scenarioId: 'SCN-AUTO-STALE',
    name: '失效自动场景数据',
    fileName: 'stale.csv',
    filePath: 'stale.csv',
    rowsPath: 'stale.json',
    rowCount: 1,
    validationStatus: 'valid',
    uploadedBy: 'tester',
    errors: [],
    schemaSnapshot: { columns: ['Code'] }
  });
  database.createRun({
    id: 'RUN-AUTO-STALE',
    scenarioId: 'SCN-AUTO-STALE',
    datasetId: 'DAT-AUTO-STALE',
    environment: 'test',
    status: 'passed',
    triggeredBy: 'tester'
  });
  database.createRunArtifact({
    id: 'ART-AUTO-STALE',
    runId: 'RUN-AUTO-STALE',
    type: 'screenshot',
    label: '失效截图',
    fileName: 'stale.png',
    filePath: 'stale.png',
    url: '/reports/stale.png'
  });

  database.createModule({ id: 'MOD-MANUAL-KEEP', appId: 'APP-MES', name: 'ManualModule', prefix: 'Manual', sort: 9999 });
  database.createScenario({
    id: 'SCN-MANUAL-KEEP',
    key: 'manual-keep-scenario',
    appId: 'APP-MES',
    moduleId: 'MOD-MANUAL-KEEP',
    module: 'ManualModule',
    name: 'ManualScenario',
    dataSchema: { columns: ['Code'], required: [], example: { Code: 'M-001' } }
  });

  seedPlatform(database);

  assert.equal(database.getAppById('APP-MES').name, '制造执行');
  assert.equal(chinesePattern.test(database.getModuleById(currentAutoModule.id).name), true);
  assert.equal(database.getScenarioById('SCN-AUTO-STALE'), undefined);
  assert.equal(database.getModuleById('MOD-AUTO-STALE'), undefined);
  assert.equal(database.getDatasetById('DAT-AUTO-STALE'), undefined);
  assert.equal(database.getRunById('RUN-AUTO-STALE'), undefined);
  assert.equal(database.listRunArtifacts('RUN-AUTO-STALE').length, 0);
  assert.equal(database.getScenarioById('SCN-MANUAL-KEEP').name, 'ManualScenario');
  assert.equal(database.getModuleById('MOD-MANUAL-KEEP').name, 'ManualModule');
  assert.equal(database.getScenarioByKey('wms-customer-create').name, '客户主数据录入');
});

test('自动目录同步拒绝非自动前缀标识', (t) => {
  const database = createPlatformDatabase(':memory:');
  t.after(() => database.close());
  assert.throws(
    () => database.syncGeneratedCatalog({ scenarioIds: ['SCN-MANUAL'], moduleIds: [] }),
    /只接受 SCN-AUTO/
  );
});

test('精简种子只创建核心场景且不删除现有自动场景', (t) => {
  const database = createPlatformDatabase(':memory:');
  t.after(() => database.close());

  seedPlatform(database, {
    preserveExisting: true,
    includeRepositoryCatalog: false
  });

  const initialScenarios = database.listScenarios();
  assert.equal(initialScenarios.length, 15);
  assert.equal(initialScenarios.some((scenario) => scenario.id.startsWith('SCN-AUTO-')), false);
  assert.ok(database.getScenarioByKey('auth-login'));
  assert.ok(database.getScenarioByKey('wms-customer-create'));

  database.createModule({
    id: 'MOD-AUTO-LEGACY-KEEP',
    appId: 'APP-MES',
    name: '历史自动目录',
    prefix: 'LegacyKeep',
    sort: 9999
  });
  database.createScenario({
    id: 'SCN-AUTO-LEGACY-KEEP',
    key: 'auto-legacy-keep',
    appId: 'APP-MES',
    moduleId: 'MOD-AUTO-LEGACY-KEEP',
    module: '历史自动目录',
    name: '已有项目历史用例',
    dataSchema: { columns: [], required: [], example: {} }
  });

  seedPlatform(database, {
    preserveExisting: true,
    includeRepositoryCatalog: false
  });

  assert.equal(database.getScenarioById('SCN-AUTO-LEGACY-KEEP').name, '已有项目历史用例');
  assert.equal(database.getModuleById('MOD-AUTO-LEGACY-KEEP').name, '历史自动目录');
});
