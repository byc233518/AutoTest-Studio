import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createTestContext } from './helpers/test-context.mjs';
import { resolveScenarioScriptPath } from '../../server/platform/scenario-scripts.mjs';
import { buildLocalExecutionBundle } from '../../server/platform/local-executions.mjs';

const recordedSource = `const { test, expect } = require('@playwright/test');
test('录制字段', async ({ page }) => {
  await page.getByLabel('客户编号').fill('C-001');
  await expect(page).toHaveURL(/.+/);
});
`;

async function createRecording(ctx, cookie, key = 'recording-review-demo') {
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key, name: key })
  });
  assert.equal(created.status, 201);
  const started = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioKey: key, location: 'local', environmentKey: 'test' })
  });
  assert.equal(started.status, 201);
  const recording = await started.json();
  const form = new FormData();
  form.append('token', recording.uploadToken);
  form.append('file', new Blob([recordedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  const uploaded = await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: form });
  assert.equal(uploaded.status, 200);
  return { recording, uploaded: await uploaded.json() };
}

test('录制上传写入分析结果、保持草稿并对重复内容幂等', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const { recording, uploaded } = await createRecording(ctx, cookie);
  assert.equal(uploaded.status, 'draft');
  assert.equal(uploaded.analysis.supported, true);
  assert.equal(uploaded.analysis.fields[0].label, '客户编号');
  assert.equal(uploaded.scenario.status, 'draft');
  const meta = JSON.parse(await readFile(`${ctx.app.locals.paths.recordingsDir}/${recording.id}.meta.json`, 'utf8'));
  assert.deepEqual(meta.analysis, uploaded.analysis);
  assert.equal(await readFile(meta.outputPath, 'utf8'), recordedSource);
  const detail = await ctx.fetch(`/api/recordings/${recording.id}`, { headers: { cookie } });
  assert.equal((await detail.json()).analysis.fields.length, 1);

  const duplicate = new FormData();
  duplicate.append('token', recording.uploadToken);
  duplicate.append('file', new Blob([recordedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  const repeated = await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: duplicate });
  assert.equal(repeated.status, 200);
  assert.equal((await repeated.json()).analysis.fields.length, 1);
});

test('apply 成功保存数据驱动脚本，非法映射返回 422 且不覆盖原脚本，重复 apply 幂等', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const { recording, uploaded } = await createRecording(ctx, cookie, 'recording-apply-demo');
  const body = {
    title: '客户录制数据驱动',
    fields: [{ candidateId: uploaded.analysis.fields[0].candidateId, key: 'customerCode', label: '客户编号', type: 'text', example: 'C-001', required: true }],
    assertions: uploaded.analysis.assertions
  };
  const applied = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify(body)
  });
  assert.equal(applied.status, 200);
  const appliedBody = await applied.json();
  assert.match(appliedBody.script, /data\["customerCode"\]/);
  assert.equal(appliedBody.scenario.status, 'draft');
  assert.notEqual(appliedBody.scenario.scriptEntry, uploaded.scriptEntry);
  assert.match(appliedBody.scenario.scriptEntry, /platform-data\/scripts\/recording-apply-demo\/recording-apply-demo\.spec\.js$/);
  const firstScript = (await ctx.fetch(`/api/scenarios/${appliedBody.scenario.key}/script`, { headers: { cookie } })).json();
  const firstContent = (await firstScript).content;
  assert.equal(firstContent, appliedBody.script);
  assert.match(firstContent, /require\(process\.cwd\(\) \+ '\/tests\/support\/recorded-script'\)/);
  assert.doesNotThrow(() => new Function(firstContent));
  const savedPath = resolveScenarioScriptPath({
    workspaceRoot: ctx.app.locals.paths.workspaceRoot,
    dataDir: ctx.app.locals.paths.dataDir,
    scriptEntry: appliedBody.scenario.scriptEntry
  });
  const savedRequire = createRequire(savedPath);
  const helperRequest = process.cwd() + '/tests/support/recorded-script';
  assert.doesNotThrow(() => savedRequire.resolve(helperRequest));
  const helper = savedRequire(helperRequest);
  assert.equal(typeof helper.defineRecordedTests, 'function');

  const supportPath = path.resolve(ctx.app.locals.paths.workspaceRoot, 'tests', 'support', 'recorded-script.js');
  const rowsPath = path.resolve(ctx.app.locals.paths.dataDir, 'apply-rows.json');
  await mkdir(path.dirname(supportPath), { recursive: true });
  await writeFile(supportPath, "module.exports = { defineRecordedTests() {} };\n", 'utf8');
  await writeFile(rowsPath, '[{"customerCode":"C-001"}]\n', 'utf8');
  const bundle = await buildLocalExecutionBundle({
    workspaceRoot: ctx.app.locals.paths.workspaceRoot,
    dataDir: ctx.app.locals.paths.dataDir,
    scenario: ctx.app.locals.database.getScenarioByKey('recording-apply-demo'),
    dataset: { rows_path: rowsPath, name: 'apply rows' },
    environment: ctx.app.locals.database.getEnvironmentByKey('test')
  });
  assert.ok(bundle.files.some((file) => file.path === 'tests/support/recorded-script.js'));
  const repeated = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify(body)
  });
  assert.equal(repeated.status, 200);
  assert.equal((await repeated.json()).script, firstContent);
  const invalid = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, fields: [{ candidateId: 'missing', key: 'bad' }] })
  });
  assert.equal(invalid.status, 422);
  assert.equal((await (await ctx.fetch(`/api/scenarios/${appliedBody.scenario.key}/script`, { headers: { cookie } })).json()).content, firstContent);

  const platformSchema = { columns: ['customerNo'], required: ['customerNo'], example: { customerNo: 'C-001' } };
  assert.equal((await ctx.fetch('/api/scenarios/recording-apply-demo', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ dataSchema: platformSchema })
  })).status, 200);
  const contract = await ctx.fetch('/api/scenarios/recording-apply-demo/contract', { headers: { cookie } });
  assert.equal(contract.status, 200);
  assert.deepEqual((await contract.json()).scriptSchema.columns, ['customerCode']);
  const platformResolved = await ctx.fetch('/api/scenarios/recording-apply-demo/contract', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ resolution: 'platform', targetSchema: { columns: ['ignored'], required: [], example: {} }, mappings: [{ from: 'customerCode', to: 'customerNo' }] })
  });
  assert.equal(platformResolved.status, 200);
  assert.deepEqual((await platformResolved.json()).scenario.dataSchema.columns, ['customerNo']);
  assert.match((await (await ctx.fetch('/api/scenarios/recording-apply-demo/script', { headers: { cookie } })).json()).content, /data\[['"]customerNo['"]\]/);
  const merged = await ctx.fetch('/api/scenarios/recording-apply-demo/contract', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ resolution: 'merge', targetSchema: { columns: ['mergedCode'], required: [], example: { mergedCode: 'M-001' } }, mappings: [{ from: 'customerNo', to: 'mergedCode' }] })
  });
  assert.equal(merged.status, 200);
  assert.deepEqual((await merged.json()).scenario.dataSchema.columns, ['mergedCode']);
});

test('contract 支持 platform、script、merge，动态冲突返回 409 且脚本不变', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = `const testDataSchema = { columns: ['oldCode'], required: [], example: { oldCode: 'x' } };\nconst { test } = require('@playwright/test');\ntest('contract', async ({ page }) => { await page.getByLabel('编号').fill(data.oldCode); });\n`;
  for (const [key, resolution, targetSchema] of [
    ['contract-platform-demo', 'platform', { columns: ['newCode'], required: [], example: { newCode: 'n' } }],
    ['contract-script-demo', 'script', { columns: ['scriptCode'], required: [], example: { scriptCode: 's' } }],
    ['contract-merge-demo', 'merge', { columns: ['mergedCode'], required: [], example: { mergedCode: 'm' } }]
  ]) {
    const created = await ctx.fetch('/api/scenarios', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ key, name: key }) });
    assert.equal(created.status, 201);
    const upload = new FormData();
    upload.append('file', new Blob([source], { type: 'text/javascript' }), `${key}.spec.js`);
    assert.equal((await ctx.fetch(`/api/scenarios/${key}/script`, { method: 'POST', headers: { cookie }, body: upload })).status, 201);
    if (resolution !== 'merge') {
      assert.equal((await ctx.fetch(`/api/scenarios/${key}`, {
        method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ dataSchema: targetSchema })
      })).status, 200);
    }
    const contract = await ctx.fetch(`/api/scenarios/${key}/contract`, { headers: { cookie } });
    assert.equal(contract.status, 200);
    assert.ok((await contract.json()).diff);
    const result = await ctx.fetch(`/api/scenarios/${key}/contract`, { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ resolution, targetSchema: resolution === 'platform' ? { columns: ['ignored'], required: [], example: {} } : targetSchema, mappings: resolution === 'platform' ? [{ from: 'oldCode', to: 'newCode' }] : resolution === 'merge' ? [{ from: 'oldCode', to: 'mergedCode' }] : [] }) });
    assert.equal(result.status, 200);
    const resultBody = await result.json();
    assert.equal(resultBody.scenario.status, 'draft');
    assert.deepEqual(resultBody.scenario.dataSchema.columns, resolution === 'script' ? ['oldCode'] : targetSchema.columns);
  }

  const dynamicKey = 'contract-dynamic-demo';
  assert.equal((await ctx.fetch('/api/scenarios', {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: dynamicKey, name: dynamicKey, dataSchema: { columns: ['oldCode'], required: [], example: { oldCode: 'x' } } })
  })).status, 201);
  const dynamicSource = `const testDataSchema = { columns: ['oldCode'], required: [], example: { oldCode: 'x' } };\nconst { test } = require('@playwright/test');\ntest('dynamic', async ({ page }) => { const field = 'oldCode'; await page.getByLabel('编号').fill(data[field]); });\n`;
  const dynamicUpload = new FormData();
  dynamicUpload.append('file', new Blob([dynamicSource], { type: 'text/javascript' }), `${dynamicKey}.spec.js`);
  assert.equal((await ctx.fetch(`/api/scenarios/${dynamicKey}/script`, { method: 'POST', headers: { cookie }, body: dynamicUpload })).status, 201);
  const beforeScript = await (await ctx.fetch(`/api/scenarios/${dynamicKey}/script`, { headers: { cookie } })).json();
  const beforeScenario = await (await ctx.fetch(`/api/scenarios/${dynamicKey}`, { headers: { cookie } })).json();
  const conflict = await ctx.fetch(`/api/scenarios/${dynamicKey}/contract`, {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ resolution: 'platform', targetSchema: { columns: ['newCode'], required: [], example: { newCode: 'n' } }, mappings: [{ from: 'oldCode', to: 'newCode' }] })
  });
  assert.equal(conflict.status, 409);
  assert.ok((await conflict.json()).conflicts.some((item) => item.code === 'dynamic-data-access'));
  assert.equal((await (await ctx.fetch(`/api/scenarios/${dynamicKey}/script`, { headers: { cookie } })).json()).content, beforeScript.content);
  assert.deepEqual((await (await ctx.fetch(`/api/scenarios/${dynamicKey}`, { headers: { cookie } })).json()).dataSchema, beforeScenario.dataSchema);
});

test('录制 review 和 contract 未登录返回 401，缺少脚本返回 404', async (t) => {
  const ctx = await createTestContext(t);
  assert.equal((await ctx.fetch('/api/recordings/REC-MISSING')).status, 401);
  assert.equal((await ctx.fetch('/api/recordings/REC-MISSING/apply', { method: 'POST' })).status, 401);
  assert.equal((await ctx.fetch('/api/scenarios/wms-customer-create/contract')).status, 401);
  assert.equal((await ctx.fetch('/api/scenarios/wms-customer-create/contract', { method: 'PUT' })).status, 401);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  assert.equal((await ctx.fetch('/api/recordings/REC-MISSING/apply', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: '{}' })).status, 404);
  assert.equal((await ctx.fetch('/api/scenarios/wms-customer-create/contract', { headers: { cookie } })).status, 404);
  assert.equal((await ctx.fetch('/api/scenarios/wms-customer-create/contract', { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ resolution: 'script' }) })).status, 404);
  assert.equal((await ctx.fetch('/api/scenarios/not-found/contract', { headers: { cookie } })).status, 404);
  assert.equal((await ctx.fetch('/api/scenarios/not-found/contract', { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ resolution: 'script' }) })).status, 404);
});
