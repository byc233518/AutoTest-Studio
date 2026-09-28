import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import path from 'node:path';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createTestContext } from './helpers/test-context.mjs';
import { resolveScenarioScriptPath } from '../../server/platform/scenario-scripts.mjs';
import { buildLocalExecutionBundle } from '../../server/platform/local-executions.mjs';

const recordedSource = `const { test, expect } = require('@playwright/test');
test('录制字段', async ({ page }) => {
  await page.getByLabel('客户编号').fill('C-001');
  await expect(page).toHaveURL(/.+/);
});
`;

async function createRecording(ctx, cookie, key = 'recording-review-demo', source = recordedSource) {
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
  form.append('file', new Blob([source], { type: 'text/javascript' }), `${recording.id}.spec.js`);
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
  const versionsBeforeChange = await (await ctx.fetch('/api/scenarios/recording-apply-demo/script/versions', { headers: { cookie } })).json();
  const changedApply = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, fields: [{ ...body.fields[0], key: 'customerCodeChanged' }] })
  });
  assert.equal(changedApply.status, 200);
  const changedContent = (await changedApply.clone().json()).script;
  const versionsAfterChange = await (await ctx.fetch('/api/scenarios/recording-apply-demo/script/versions', { headers: { cookie } })).json();
  assert.equal(versionsAfterChange.versions.length, versionsBeforeChange.versions.length + 1);
  const invalid = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, fields: [{ candidateId: 'missing', key: 'bad' }] })
  });
  assert.equal(invalid.status, 422);
  assert.equal((await (await ctx.fetch(`/api/scenarios/${appliedBody.scenario.key}/script`, { headers: { cookie } })).json()).content, changedContent);

  const platformSchema = { columns: ['customerNo'], required: ['customerNo'], example: { customerNo: 'C-001' } };
  assert.equal((await ctx.fetch('/api/scenarios/recording-apply-demo', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ dataSchema: platformSchema })
  })).status, 200);
  const contract = await ctx.fetch('/api/scenarios/recording-apply-demo/contract', { headers: { cookie } });
  assert.equal(contract.status, 200);
  assert.deepEqual((await contract.json()).scriptSchema.columns, ['customerCodeChanged']);
  const platformResolved = await ctx.fetch('/api/scenarios/recording-apply-demo/contract', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ resolution: 'platform', targetSchema: { columns: ['ignored'], required: [], example: {} }, mappings: [{ from: 'customerCodeChanged', to: 'customerNo' }] })
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

test('preview 返回真实参数化脚本且不会保存、改状态或创建版本', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const { recording, uploaded } = await createRecording(ctx, cookie, 'recording-preview-demo');
  const beforeScenario = await (await ctx.fetch('/api/scenarios/recording-preview-demo', { headers: { cookie } })).json();
  const beforeVersions = await (await ctx.fetch('/api/scenarios/recording-preview-demo/script/versions', { headers: { cookie } })).json();
  const body = {
    title: '预览客户脚本',
    fields: [{ candidateId: uploaded.analysis.fields[0].candidateId, candidateIds: [uploaded.analysis.fields[0].candidateId], key: 'customerCode', label: '客户编号', required: true }],
    assertions: uploaded.analysis.assertions
  };

  const preview = await ctx.fetch(`/api/recordings/${recording.id}/preview`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify(body)
  });
  assert.equal(preview.status, 200);
  const result = await preview.json();
  assert.match(result.source, /data\["customerCode"\]/);
  assert.deepEqual(result.schema.columns, ['customerCode']);
  assert.deepEqual(result.warnings, []);

  const afterScenario = await (await ctx.fetch('/api/scenarios/recording-preview-demo', { headers: { cookie } })).json();
  const afterVersions = await (await ctx.fetch('/api/scenarios/recording-preview-demo/script/versions', { headers: { cookie } })).json();
  const meta = JSON.parse(await readFile(`${ctx.app.locals.paths.recordingsDir}/${recording.id}.meta.json`, 'utf8'));
  assert.deepEqual(afterScenario, beforeScenario);
  assert.deepEqual(afterVersions, beforeVersions);
  assert.equal(meta.status, 'draft');
  assert.equal(meta.applied, undefined);
});

test('apply 使用 candidateIds 将两个固定输入合并到同一字段', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = `const { test } = require('@playwright/test');\ntest('合并字段', async ({ page }) => {\n  await page.getByLabel('客户编码').fill('C-001');\n  await page.getByLabel('客户名称').fill('客户一');\n});\n`;
  const { recording, uploaded } = await createRecording(ctx, cookie, 'recording-merge-demo', source);
  const candidateIds = uploaded.analysis.fields.map((field) => field.candidateId);
  const response = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ title: '合并字段', fields: [{ candidateId: candidateIds[0], candidateIds, key: 'customer', label: '客户', required: true }], assertions: [] })
  });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.deepEqual(result.scenario.dataSchema.columns, ['customer']);
  assert.equal(result.script.match(/data\["customer"\]/g)?.length, 2);
});

test('重复上传原始录制不会回绑覆盖已应用脚本，且 apply 校验录制归属', async (t) => {
  const ctx = await createTestContext(t);
  const ownerCookie = await ctx.loginCookie('tester', 'Tester123!');
  const { recording, uploaded } = await createRecording(ctx, ownerCookie, 'recording-upload-after-apply');
  const fields = [{ candidateId: uploaded.analysis.fields[0].candidateId, key: 'customerCode', label: '客户编号', type: 'text', example: 'C-001', required: true }];
  const applied = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie: ownerCookie, 'content-type': 'application/json' }, body: JSON.stringify({ title: '已应用', fields, assertions: [] })
  });
  const appliedBody = await applied.json();
  const duplicate = new FormData();
  duplicate.append('token', recording.uploadToken);
  duplicate.append('file', new Blob([recordedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  const repeatedUpload = await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: duplicate });
  assert.equal(repeatedUpload.status, 200);
  const repeatedBody = await repeatedUpload.json();
  assert.equal(repeatedBody.scenario.scriptEntry, appliedBody.scenario.scriptEntry);
  assert.deepEqual(repeatedBody.scenario.dataSchema, appliedBody.scenario.dataSchema);

  const otherCookie = await ctx.loginCookie('admin', 'Admin123!');
  const rejected = await ctx.fetch(`/api/recordings/${recording.id}/apply`, {
    method: 'POST', headers: { cookie: otherCookie, 'content-type': 'application/json' }, body: JSON.stringify({ title: '越权', fields, assertions: [] })
  });
  assert.equal(rejected.status, 403);
});

test('录制首次上传后再次上传不同内容会先保存旧原始脚本版本', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const key = 'recording-upload-version-demo';
  const created = await ctx.fetch('/api/scenarios', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ key, name: key }) });
  assert.equal(created.status, 201);
  const started = await ctx.fetch('/api/recordings/start', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ scenarioKey: key, location: 'local' }) });
  const recording = await started.json();
  const firstForm = new FormData();
  firstForm.append('token', recording.uploadToken);
  firstForm.append('file', new Blob([recordedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  assert.equal((await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: firstForm })).status, 200);
  const changedSource = recordedSource.replace('C-001', 'C-002');
  const secondForm = new FormData();
  secondForm.append('token', recording.uploadToken);
  secondForm.append('file', new Blob([changedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  assert.equal((await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: secondForm })).status, 200);
  const versions = await (await ctx.fetch(`/api/scenarios/${key}/script/versions`, { headers: { cookie } })).json();
  assert.equal(versions.versions.length, 1);
  const archived = JSON.parse(await readFile(path.resolve(ctx.app.locals.paths.scriptsDir, '_versions', key, versions.versions[0].id), 'utf8'));
  assert.equal(archived.content, recordedSource);
});

test('脚本入口只允许受管目录，非法上传令牌会清理临时文件并限制大小', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const unsafe = await ctx.fetch('/api/scenarios/wms-customer-create', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ scriptEntry: 'server/app.mjs' })
  });
  assert.equal(unsafe.status, 400);
  const absolute = await ctx.fetch('/api/scenarios/wms-customer-create', {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ scriptEntry: path.resolve(ctx.app.locals.paths.workspaceRoot, 'server', 'app.mjs') })
  });
  assert.equal(absolute.status, 400);

  const started = await ctx.fetch('/api/recordings/start', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ location: 'local' }) });
  const recording = await started.json();
  const bad = new FormData();
  bad.append('token', 'invalid');
  bad.append('file', new Blob(['bad-script'], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  const rejected = await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: bad });
  assert.equal(rejected.status, 401);
  const tmpFiles = await readdir(path.resolve(ctx.app.locals.paths.dataDir, 'tmp'));
  assert.equal(tmpFiles.length, 0);

  const oversized = new FormData();
  oversized.append('token', recording.uploadToken);
  oversized.append('file', new Blob(['x'.repeat(1024 * 1024 + 1)], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  const tooLarge = await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: oversized });
  assert.equal(tooLarge.status, 413);
  assert.equal((await readdir(path.resolve(ctx.app.locals.paths.dataDir, 'tmp'))).length, 0);
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
    const contractBody = { resolution, targetSchema: resolution === 'platform' ? { columns: ['ignored'], required: [], example: {} } : targetSchema, mappings: resolution === 'platform' ? [{ from: 'oldCode', to: 'newCode' }] : resolution === 'merge' ? [{ from: 'oldCode', to: 'mergedCode' }] : [] };
    const versionsBefore = resolution === 'script' ? null : await (await ctx.fetch(`/api/scenarios/${key}/script/versions`, { headers: { cookie } })).json();
    const result = await ctx.fetch(`/api/scenarios/${key}/contract`, { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify(contractBody) });
    assert.equal(result.status, 200);
    const resultBody = await result.json();
    assert.equal(resultBody.scenario.status, 'draft');
    assert.deepEqual(resultBody.scenario.dataSchema.columns, resolution === 'script' ? ['oldCode'] : targetSchema.columns);
    if (resolution !== 'script') {
      const versionsAfter = await (await ctx.fetch(`/api/scenarios/${key}/script/versions`, { headers: { cookie } })).json();
      assert.equal(versionsAfter.versions.length, versionsBefore.versions.length + 1);
      const repeated = await ctx.fetch(`/api/scenarios/${key}/contract`, { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify(contractBody) });
      assert.equal(repeated.status, 200);
      const versionsRepeated = await (await ctx.fetch(`/api/scenarios/${key}/script/versions`, { headers: { cookie } })).json();
      assert.equal(versionsRepeated.versions.length, versionsAfter.versions.length);
    }
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
  assert.equal((await ctx.fetch(`/api/scenarios/${dynamicKey}`, {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ dataSchema: { columns: ['newCode'], required: [], example: { newCode: 'n' } } })
  })).status, 200);
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

test('merge 在脚本已匹配目标但平台 schema 不同时仍同步平台 schema', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const key = 'contract-merge-platform-drift';
  assert.equal((await ctx.fetch('/api/scenarios', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ key, name: key }) })).status, 201);
  const source = `const testDataSchema = { columns: ['targetCode'], required: [], example: { targetCode: 'T' } };\nconst { test } = require('@playwright/test');\ntest('merge drift', async ({ page }) => { await page.getByLabel('编号').fill(data.targetCode); });\n`;
  const form = new FormData();
  form.append('file', new Blob([source], { type: 'text/javascript' }), `${key}.spec.js`);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/script`, { method: 'POST', headers: { cookie }, body: form })).status, 201);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}`, { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ dataSchema: { columns: ['platformCode'], required: [], example: { platformCode: 'P' } } }) })).status, 200);
  const merged = await ctx.fetch(`/api/scenarios/${key}/contract`, {
    method: 'PUT', headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ resolution: 'merge', targetSchema: { columns: ['targetCode'], required: [], example: { targetCode: 'T' } }, mappings: [] })
  });
  assert.equal(merged.status, 200);
  assert.deepEqual((await merged.json()).scenario.dataSchema.columns, ['targetCode']);
});

test('已有数据集时字段合约变更要求先走数据迁移', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const key = 'contract-requires-migration';
  assert.equal((await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key, name: key, dataSchema: { columns: ['platformCode'], required: [], example: { platformCode: 'P' } } })
  })).status, 201);
  const dataset = new FormData();
  dataset.append('name', '旧字段数据');
  dataset.append('file', new Blob(['platformCode\nP-001\n'], { type: 'text/csv' }), 'data.csv');
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/datasets`, { method: 'POST', headers: { cookie }, body: dataset })).status, 201);
  const source = `const testDataSchema = { columns: ['scriptCode'], required: [], example: { scriptCode: 'S' } };\nconst { test } = require('@playwright/test');\ntest('migration required', async ({ page }) => { await page.getByLabel('编号').fill(data.scriptCode); });\n`;
  const form = new FormData();
  form.append('file', new Blob([source], { type: 'text/javascript' }), `${key}.spec.js`);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/script`, { method: 'POST', headers: { cookie }, body: form })).status, 201);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}`, {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ dataSchema: { columns: ['platformCode'], required: [], example: { platformCode: 'P' } } })
  })).status, 200);

  const result = await ctx.fetch(`/api/scenarios/${key}/contract`, {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ resolution: 'script', mappings: [] })
  });

  assert.equal(result.status, 409);
  const body = await result.json();
  assert.equal(body.code, 'MIGRATION_REQUIRED');
  assert.deepEqual(body.targetSchema.columns, ['scriptCode']);
  assert.deepEqual((await (await ctx.fetch(`/api/scenarios/${key}`, { headers: { cookie } })).json()).dataSchema.columns, ['platformCode']);
});

test('script 相同 schema 和 raw 相同上传都保持已发布场景不变', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const key = 'contract-script-noop-published';
  assert.equal((await ctx.fetch('/api/scenarios', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ key, name: key }) })).status, 201);
  const source = `const testDataSchema = { columns: ['code'], required: [], example: { code: 'C' } };\nconst { test } = require('@playwright/test');\ntest('noop', async () => {});\n`;
  const form = new FormData();
  form.append('file', new Blob([source], { type: 'text/javascript' }), `${key}.spec.js`);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/script`, { method: 'POST', headers: { cookie }, body: form })).status, 201);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/publish`, { method: 'POST', headers: { cookie } })).status, 200);
  const before = await (await ctx.fetch(`/api/scenarios/${key}`, { headers: { cookie } })).json();
  const scriptNoop = await ctx.fetch(`/api/scenarios/${key}/contract`, { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ resolution: 'script', mappings: [] }) });
  assert.equal(scriptNoop.status, 200);
  assert.equal((await scriptNoop.json()).scenario.status, 'published');

  const recordingKey = 'upload-raw-noop-published';
  assert.equal((await ctx.fetch('/api/scenarios', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ key: recordingKey, name: recordingKey }) })).status, 201);
  const started = await ctx.fetch('/api/recordings/start', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ scenarioKey: recordingKey, location: 'local' }) });
  const recording = await started.json();
  const upload = new FormData();
  upload.append('token', recording.uploadToken);
  upload.append('file', new Blob([recordedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  assert.equal((await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: upload })).status, 200);
  assert.equal((await ctx.fetch(`/api/scenarios/${recordingKey}`, { method: 'PUT', headers: { cookie, 'content-type': 'application/json' }, body: JSON.stringify({ dataSchema: { columns: ['manualCode'], required: [], example: { manualCode: 'M' } } }) })).status, 200);
  assert.equal((await ctx.fetch(`/api/scenarios/${recordingKey}/publish`, { method: 'POST', headers: { cookie } })).status, 200);
  const beforeRaw = await (await ctx.fetch(`/api/scenarios/${recordingKey}`, { headers: { cookie } })).json();
  const duplicate = new FormData();
  duplicate.append('token', recording.uploadToken);
  duplicate.append('file', new Blob([recordedSource], { type: 'text/javascript' }), `${recording.id}.spec.js`);
  assert.equal((await ctx.fetch(`/api/recordings/${recording.id}/upload`, { method: 'POST', body: duplicate })).status, 200);
  const after = await (await ctx.fetch(`/api/scenarios/${recordingKey}`, { headers: { cookie } })).json();
  assert.equal(after.status, 'published');
  assert.deepEqual(after.dataSchema.columns, ['manualCode']);
  assert.equal(after.scriptEntry, beforeRaw.scriptEntry);
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
