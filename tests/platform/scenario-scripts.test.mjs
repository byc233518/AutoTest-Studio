import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';
import { extractScriptDataSchema, resolveScenarioScriptPath } from '../../server/platform/scenario-scripts.mjs';

test('脚本路径解析拒绝越过工作区和平台数据目录', () => {
  const options = { workspaceRoot: 'D:/workspace', dataDir: 'D:/workspace/platform-data' };

  assert.equal(resolveScenarioScriptPath({
    ...options,
    scriptEntry: 'platform-data/../../server/app.mjs'
  }), null);
  assert.equal(resolveScenarioScriptPath({
    ...options,
    scriptEntry: '../../outside.spec.js'
  }), null);
});

test('脚本字段解析支持 testDataSchema 和 JSON 注释声明', () => {
  assert.deepEqual(extractScriptDataSchema(`
    export const testDataSchema = {
      columns: ['locatorCode', 'locatorName', 'locatorCode'],
      required: ['locatorCode', 'missing'],
      example: { locatorCode: 'KW-001', locatorName: '一号库位' }
    };
  `), {
    columns: ['locatorCode', 'locatorName'],
    required: ['locatorCode'],
    example: { locatorCode: 'KW-001', locatorName: '一号库位' },
    fields: [
      { key: 'locatorCode', label: 'locatorCode', type: 'text', required: true, example: 'KW-001' },
      { key: 'locatorName', label: 'locatorName', type: 'text', required: false, example: '一号库位' }
    ]
  });

  assert.deepEqual(extractScriptDataSchema(`
    /* @autotest-data-schema
    {"columns":["customerCode","customerName"],"required":["customerCode"],"example":{"customerCode":"C001","customerName":"测试客户"}}
    */
  `), {
    columns: ['customerCode', 'customerName'],
    required: ['customerCode'],
    example: { customerCode: 'C001', customerName: '测试客户' },
    fields: [
      { key: 'customerCode', label: 'customerCode', type: 'text', required: true, example: 'C001' },
      { key: 'customerName', label: 'customerName', type: 'text', required: false, example: '测试客户' }
    ]
  });
});

test('脚本字段解析仅接受静态 AST 值，且不会误伤字符串中的括号或关键字', () => {
  const staticSchema = extractScriptDataSchema(`
    const testDataSchema = {
      fields: [{
        key: 'customerCode',
        label: '客户(process)导入',
        type: 'text',
        required: true,
        example: 'import process()'
      }]
    };
  `);
  assert.deepEqual(staticSchema, {
    columns: ['customerCode'],
    required: ['customerCode'],
    example: { customerCode: 'import process()' },
    fields: [{
      key: 'customerCode',
      label: '客户(process)导入',
      type: 'text',
      required: true,
      example: 'import process()'
    }]
  });

  for (const source of [
    `const testDataSchema = { columns: makeColumns(), required: [], example: {} };`,
    `const testDataSchema = { ...baseSchema };`,
    `const testDataSchema = { ['columns']: ['code'], required: [], example: {} };`,
    `const testDataSchema = { columns() { return ['code']; } };`
  ]) {
    assert.equal(extractScriptDataSchema(source), null);
  }
});

test('脚本字段解析公共 API 对非文本输入不抛异常', () => {
  for (const source of [null, 1, {}, []]) {
    assert.doesNotThrow(() => extractScriptDataSchema(source));
    assert.equal(extractScriptDataSchema(source), null);
  }
});

test('脚本字段解析拒绝重复顶层 testDataSchema 声明', () => {
  const source = `var testDataSchema = { columns: ['first'], required: [], example: { first: '' } };
var testDataSchema = { columns: ['second'], required: [], example: { second: '' } };`;
  assert.equal(extractScriptDataSchema(source), null);
});

test('脚本保存会保留最近 10 个版本并支持恢复', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-version-demo', name: '脚本版本演示' })
  });
  assert.equal(created.status, 201);

  const uploadForm = new FormData();
  uploadForm.append('file', new Blob(['// version 0'], { type: 'text/javascript' }), 'versioned.spec.js');
  const uploaded = await ctx.fetch('/api/scenarios/script-version-demo/script', {
    method: 'POST',
    headers: { cookie },
    body: uploadForm
  });
  assert.equal(uploaded.status, 201);

  for (let index = 1; index <= 12; index += 1) {
    const saved = await ctx.fetch('/api/scenarios/script-version-demo/script', {
      method: 'PUT',
      headers: { cookie, 'content-type': 'application/json' },
      body: JSON.stringify({ fileName: 'versioned.spec.js', content: `// version ${index}` })
    });
    assert.equal(saved.status, 200);
  }

  const versionsResponse = await ctx.fetch('/api/scenarios/script-version-demo/script/versions', { headers: { cookie } });
  assert.equal(versionsResponse.status, 200);
  const versionsBody = await versionsResponse.json();
  assert.equal(versionsBody.versions.length, 10);
  assert.equal(versionsBody.versions[0].fileName, 'versioned.spec.js');

  const restore = await ctx.fetch(`/api/scenarios/script-version-demo/script/versions/${versionsBody.versions[0].id}/restore`, {
    method: 'POST',
    headers: { cookie }
  });
  assert.equal(restore.status, 200);

  const source = await ctx.fetch('/api/scenarios/script-version-demo/script', { headers: { cookie } });
  assert.equal(source.status, 200);
  assert.equal((await source.json()).content, '// version 11');
});

test('测试人员可以上传脚本并绑定到已有场景', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-upload-demo', name: '脚本上传演示' })
  });
  assert.equal(created.status, 201);

  const form = new FormData();
  const script = `const { test, expect } = require('@playwright/test');
test('uploaded script', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.+/);
});
`;
  form.append('file', new Blob([script], { type: 'text/javascript' }), 'demo.spec.js');

  const upload = await ctx.fetch('/api/scenarios/script-upload-demo/script', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(upload.status, 201);
  const body = await upload.json();
  assert.match(body.scriptEntry, /platform-data\/scripts\/script-upload-demo\/demo\.spec\.js$/);

  const detail = await ctx.fetch('/api/scenarios/script-upload-demo', { headers: { cookie } });
  assert.equal(detail.status, 200);
  assert.equal((await detail.json()).scriptEntry, body.scriptEntry);

  const source = await ctx.fetch('/api/scenarios/script-upload-demo/script', { headers: { cookie } });
  assert.equal(source.status, 200);
  const sourceBody = await source.json();
  assert.equal(sourceBody.fileName, 'demo.spec.js');
  assert.equal(sourceBody.content, script);
});

test('上传脚本会自动解析 testDataSchema 并绑定测试数据字段', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-schema-demo', name: '脚本字段绑定演示' })
  });
  assert.equal(created.status, 201);

  const script = `const { test, expect } = require('@playwright/test');
const { defineRecordedTests } = require(process.cwd() + '/tests/support/recorded-script');

const testDataSchema = {
  columns: ['locatorCode', 'locatorName', 'warehouseCode'],
  required: ['locatorCode', 'locatorName'],
  example: {
    locatorCode: 'KW-001',
    locatorName: '自动化库位001',
    warehouseCode: 'WMS01'
  }
};
exports.testDataSchema = testDataSchema;

defineRecordedTests(test, '库位维护录入', testDataSchema, async ({ page }, data) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.+/);
  await page.getByRole('textbox', { name: '库位编码' }).fill(data.locatorCode);
});
`;
  const form = new FormData();
  form.append('file', new Blob([script], { type: 'text/javascript' }), 'locator.spec.js');

  const uploaded = await ctx.fetch('/api/scenarios/script-schema-demo/script', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(uploaded.status, 201);
  const uploadedBody = await uploaded.json();
  assert.deepEqual(uploadedBody.dataSchema, {
    columns: ['locatorCode', 'locatorName', 'warehouseCode'],
    required: ['locatorCode', 'locatorName'],
    example: {
      locatorCode: 'KW-001',
      locatorName: '自动化库位001',
      warehouseCode: 'WMS01'
    },
    fields: [
      { key: 'locatorCode', label: 'locatorCode', type: 'text', required: true, example: 'KW-001' },
      { key: 'locatorName', label: 'locatorName', type: 'text', required: true, example: '自动化库位001' },
      { key: 'warehouseCode', label: 'warehouseCode', type: 'text', required: false, example: 'WMS01' }
    ]
  });

  const detail = await ctx.fetch('/api/scenarios/script-schema-demo', { headers: { cookie } });
  assert.equal(detail.status, 200);
  assert.deepEqual((await detail.json()).dataSchema, uploadedBody.dataSchema);
});

test('测试人员可以在线编辑已上传脚本并保留脚本入口', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-online-demo', name: '脚本在线编辑演示' })
  });
  assert.equal(created.status, 201);

  const uploadForm = new FormData();
  uploadForm.append('file', new Blob(['// initial'], { type: 'text/javascript' }), 'online.spec.js');
  const uploaded = await ctx.fetch('/api/scenarios/script-online-demo/script', {
    method: 'POST',
    headers: { cookie },
    body: uploadForm
  });
  assert.equal(uploaded.status, 201);
  const uploadedBody = await uploaded.json();
  const content = `import { test, expect } from '@playwright/test';
test('edited online', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/JMOM/);
});
`;

  const saved = await ctx.fetch('/api/scenarios/script-online-demo/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'online.spec.js', content })
  });
  assert.equal(saved.status, 200);
  const savedBody = await saved.json();
  assert.equal(savedBody.scriptEntry, uploadedBody.scriptEntry);
  assert.equal(savedBody.content, content);

  const source = await ctx.fetch('/api/scenarios/script-online-demo/script', { headers: { cookie } });
  assert.equal(source.status, 200);
  assert.deepEqual(await source.json(), {
    scenarioKey: 'script-online-demo',
    scriptEntry: savedBody.scriptEntry,
    fileName: 'online.spec.js',
    content
  });
});

test('在线编辑拒绝空脚本和非法扩展名', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const empty = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'empty.spec.js', content: '   ' })
  });
  assert.equal(empty.status, 400);
  assert.equal((await empty.json()).message, '脚本内容不能为空');

  const invalid = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ fileName: 'notes.txt', content: 'not a script' })
  });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).message, '仅支持 .js / .spec.js / .mjs 脚本文件');
});

test('服务端录制上传后可以绑定脚本到指定场景', async (t) => {
  const ctx = await createTestContext(t, { recordMode: 'stub' });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'script-record-demo', name: '脚本录制演示' })
  });
  assert.equal(created.status, 201);

  const rejected = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioKey: 'script-record-demo',
      environmentKey: 'test',
      location: 'local'
    })
  });
  assert.equal(rejected.status, 400);
  assert.match((await rejected.json()).message, /桌面客户端/);

  const started = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioKey: 'script-record-demo',
      environmentKey: 'test',
      location: 'server'
    })
  });
  assert.equal(started.status, 201);
  const recording = await started.json();
  assert.equal(recording.location, 'server');
  assert.equal(recording.scenarioKey, 'script-record-demo');
  assert.equal(recording.recordCode, undefined);
  assert.equal(recording.desktopLaunchUrl, undefined);
  assert.equal(recording.recorderDownloadUrl, undefined);

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const statusResponse = await ctx.fetch(`/api/recordings/${recording.id}`, { headers: { cookie } });
    assert.equal(statusResponse.status, 200);
    const statusBody = await statusResponse.json();
    if (!['waiting', 'recording'].includes(statusBody.status)) break;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }

  const form = new FormData();
  const script = `const { test, expect } = require('@playwright/test');
const testDataSchema = {
  columns: ['recordCode', 'recordName'],
  required: ['recordCode'],
  example: { recordCode: 'REC-001', recordName: '录制样例' }
};
test('local recorded script', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.+/);
});
`;
  form.append('file', new Blob([script], { type: 'text/javascript' }), `${recording.id}.spec.js`);

  const uploaded = await ctx.fetch(`/api/recordings/${recording.id}/upload`, {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(uploaded.status, 200);
  const body = await uploaded.json();
  assert.match(body.scriptEntry, /tests\/recordings\/REC-/);
  assert.equal(body.scenario.key, 'script-record-demo');
  assert.equal(body.scenario.scriptEntry, body.scriptEntry);
  assert.deepEqual(body.scenario.dataSchema, {
    columns: ['recordCode', 'recordName'],
    required: ['recordCode'],
    example: { recordCode: 'REC-001', recordName: '录制样例' },
    fields: [
      { key: 'recordCode', label: 'recordCode', type: 'text', required: true, example: 'REC-001' },
      { key: 'recordName', label: 'recordName', type: 'text', required: false, example: '录制样例' }
    ]
  });
});

test('上传非法脚本扩展名会被拒绝', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  form.append('file', new Blob(['not-a-script'], { type: 'text/plain' }), 'notes.txt');
  const response = await ctx.fetch('/api/scenarios/wms-customer-create/script', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, '仅支持 .js / .spec.js / .mjs 脚本文件');
});
