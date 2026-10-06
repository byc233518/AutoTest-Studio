import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';
import { saveScenarioScriptContent } from '../../server/platform/scenario-scripts.mjs';
import { seedPlatform } from '../../server/platform/seed.mjs';

function scenarioPackage(...scenarios) {
  return { version: 1, scenarios };
}

function scenario(key, overrides = {}) {
  return {
    key,
    name: `导入用例 ${key}`,
    description: '用例包接口测试',
    directory: 'WMS/导入测试',
    priority: 'P1',
    owner: '测试员',
    dataSchema: { columns: ['code'], required: ['code'], example: { code: 'A001' } },
    dependsOn: [],
    script: {
      fileName: `${key}.spec.js`,
      content: "const { test } = require('@playwright/test');\ntest('imported', async () => {});\n"
    },
    ...overrides
  };
}

async function importPackage(ctx, value) {
  const form = new FormData();
  form.append('file', new Blob([JSON.stringify(value)], { type: 'application/json' }), 'scenarios.json');
  return ctx.fetch('/api/scenarios/import', { method: 'POST', body: form });
}

test('用例包可导入、导出脚本，并在 key 冲突时整体拒绝', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const key = 'package-api-case';
  const importedResponse = await importPackage(ctx, scenarioPackage(scenario(key)));
  assert.equal(importedResponse.status, 201);
  const imported = await importedResponse.json();
  assert.equal(imported.imported, 1);
  assert.equal(imported.scenarios[0].key, key);
  assert.equal(imported.scenarios[0].module, 'WMS/导入测试');
  assert.match(imported.scenarios[0].scriptEntry, /package-api-case/);

  const exportedResponse = await ctx.fetch('/api/scenarios/export');
  const exportedText = await exportedResponse.text();
  assert.equal(exportedResponse.status, 200, exportedText);
  assert.match(exportedResponse.headers.get('content-disposition'), /autotest-scenarios-\d{8}\.json/);
  const exported = JSON.parse(exportedText);
  const exportedCase = exported.scenarios.find((item) => item.key === key);
  assert.equal(exportedCase.script.fileName, `${key}.spec.js`);
  assert.match(exportedCase.script.content, /test\('imported'/);

  const conflictResponse = await importPackage(ctx, scenarioPackage(
    scenario('package-api-new-case'),
    scenario(key)
  ));
  assert.equal(conflictResponse.status, 409);
  const conflict = await conflictResponse.json();
  assert.equal(conflict.code, 'SCENARIO_KEY_CONFLICT');
  assert.deepEqual(conflict.conflictingKeys, [key]);
  assert.equal((await ctx.fetch('/api/scenarios/package-api-new-case')).status, 404);
});

test('用例包先完整校验，后项非法时不写入前项', async (t) => {
  const ctx = await createTestContext(t, { desktopMode: true });
  const response = await importPackage(ctx, scenarioPackage(
    scenario('package-atomic-first'),
    scenario('package-atomic-invalid', {
      script: { fileName: '../invalid.js', content: '' }
    })
  ));
  assert.equal(response.status, 400);
  assert.equal((await ctx.fetch('/api/scenarios/package-atomic-first')).status, 404);
});

test('用例包脚本写入中途失败时回滚已建记录和文件', async (t) => {
  let writes = 0;
  const ctx = await createTestContext(t, {
    desktopMode: true,
    scenarioPackageScriptWriter: async (options) => {
      writes += 1;
      if (writes === 2) throw new Error('模拟脚本磁盘写入失败');
      return saveScenarioScriptContent(options);
    }
  });
  const response = await importPackage(ctx, scenarioPackage(
    scenario('package-rollback-first'),
    scenario('package-rollback-second')
  ));
  assert.equal(response.status, 500);
  assert.equal((await ctx.fetch('/api/scenarios/package-rollback-first')).status, 404);
  assert.equal((await ctx.fetch('/api/scenarios/package-rollback-second')).status, 404);
  await assert.rejects(access(path.resolve(
    ctx.app.locals.paths.scriptsDir,
    'package-rollback-first',
    'package-rollback-first.spec.js'
  )));
});

test('用例包导入失败时恢复原有删除墓碑，避免种子用例重启后复活', async (t) => {
  let writes = 0;
  const ctx = await createTestContext(t, {
    desktopMode: true,
    scenarioPackageScriptWriter: async (options) => {
      writes += 1;
      if (writes === 2) throw new Error('模拟脚本磁盘写入失败');
      return saveScenarioScriptContent(options);
    }
  });
  const database = ctx.app.locals.database;
  const deletedSeedScenario = database.getScenarioByKey('sample-open-page');
  database.deleteScenarios([deletedSeedScenario.id]);
  assert.equal(database.hasAssetTombstone('scenario', 'sample-open-page'), true);

  const response = await importPackage(ctx, scenarioPackage(
    scenario('sample-open-page'),
    scenario('package-tombstone-rollback-second')
  ));
  assert.equal(response.status, 500);
  assert.equal(database.getScenarioByKey('sample-open-page'), undefined);
  assert.equal(database.getScenarioByKey('package-tombstone-rollback-second'), undefined);
  assert.equal(database.hasAssetTombstone('scenario', 'sample-open-page'), true);

  seedPlatform(database, { preserveExisting: true });
  assert.equal(database.getScenarioByKey('sample-open-page'), undefined);
});
