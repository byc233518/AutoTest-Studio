import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

const jsonHeaders = (cookie) => ({ cookie, 'content-type': 'application/json' });

async function saveScript(ctx, cookie, key, content = "export const testDataSchema={columns:['id'],required:['id'],example:{id:'1'}};\nexport default {};\n") {
  return ctx.fetch(`/api/scenarios/${key}/script`, {
    method: 'PUT',
    headers: jsonHeaders(cookie),
    body: JSON.stringify({ fileName: `${key}.spec.js`, content })
  });
}

test('发布创建 v1/v2 快照并支持列表、详情、比较和恢复', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST', headers: jsonHeaders(cookie),
    body: JSON.stringify({ key: 'release-flow', name: '发布流程', dataSchema: { columns: ['id'], required: ['id'], example: { id: '1' } } })
  });
  assert.equal(created.status, 201);
  assert.equal((await saveScript(ctx, cookie, 'release-flow')).status, 200);

  const first = await ctx.fetch('/api/scenarios/release-flow/publish', { method: 'POST', headers: { cookie } });
  assert.equal(first.status, 200);
  assert.equal((await first.json()).version, 'v1');
  const secondScript = await saveScript(ctx, cookie, 'release-flow', "export const testDataSchema={columns:['id','name'],required:['id'],example:{id:'2',name:'n'}};\n");
  assert.equal(secondScript.status, 200);
  const second = await ctx.fetch('/api/scenarios/release-flow/publish', { method: 'POST', headers: { cookie } });
  assert.equal(second.status, 200);
  assert.equal((await second.json()).version, 'v2');

  const list = await ctx.fetch('/api/scenarios/release-flow/releases', { headers: { cookie } });
  assert.equal(list.status, 200);
  const releases = await list.json();
  assert.deepEqual(releases.map((item) => item.versionNo), [2, 1]);
  const detail = await ctx.fetch(`/api/scenarios/release-flow/releases/${releases[1].id}`, { headers: { cookie } });
  assert.equal(detail.status, 200);
  const release = await detail.json();
  assert.equal(release.versionNo, 1);
  assert.equal(release.snapshot.dataSchema.columns[0], 'id');
  assert.doesNotMatch(JSON.stringify(release.snapshot), /Tester123|password|apiKey/i);
  assert.equal(Object.hasOwn(release, 'scriptContent'), false);
  assert.equal(typeof release.scriptLength, 'number');

  const compare = await ctx.fetch(`/api/scenarios/release-flow/releases/${releases[1].id}/compare`, { headers: { cookie } });
  assert.equal(compare.status, 200);
  const comparison = await compare.json();
  assert.equal(comparison.from.versionNo, 1);
  assert.equal(comparison.to.versionNo, 2);
  assert.equal(comparison.scriptChanged, true);
  assert.equal(comparison.schemaChanged, true);
  assert.equal(comparison.scenarioChanged, false);
  assert.deepEqual(comparison.changedKeys, ['dataSchema', 'scriptContent', 'scriptHash']);
  assert.equal(Object.hasOwn(comparison.from, 'scriptContent'), false);

  const restored = await ctx.fetch(`/api/scenarios/release-flow/releases/${releases[1].id}/restore`, { method: 'POST', headers: { cookie } });
  assert.equal(restored.status, 200);
  const restoredBody = await restored.json();
  assert.equal(restoredBody.status, 'draft');
  assert.equal(restoredBody.version, 'v1');
  const current = await ctx.fetch('/api/scenarios/release-flow', { headers: { cookie } });
  assert.equal((await current.json()).dataSchema.columns.length, 1);
  const restoredScript = await ctx.fetch('/api/scenarios/release-flow/script', { headers: { cookie } });
  assert.match(await restoredScript.text(), /columns:\['id'\]/);
  const listAfter = await (await ctx.fetch('/api/scenarios/release-flow/releases', { headers: { cookie } })).json();
  assert.deepEqual(listAfter.map((item) => item.versionNo), [2, 1]);
});

test('无脚本发布失败且不产生 release，草稿可执行', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST', headers: jsonHeaders(cookie),
    body: JSON.stringify({ key: 'release-no-script', name: '无脚本发布' })
  });
  const scenario = await created.json();
  const publish = await ctx.fetch('/api/scenarios/release-no-script/publish', { method: 'POST', headers: { cookie } });
  assert.equal(publish.status, 400);
  const releases = await (await ctx.fetch('/api/scenarios/release-no-script/releases', { headers: { cookie } })).json();
  assert.equal(releases.length, 0);

  await saveScript(ctx, cookie, 'release-no-script');
  assert.equal(scenario.status, 'draft');
});

test('三个种子账号均可编辑和发布', async (t) => {
  const ctx = await createTestContext(t);
  for (const [username, password] of [['admin', 'Admin123!'], ['maintainer', 'Maintainer123!'], ['tester', 'Tester123!']]) {
    const cookie = await ctx.loginCookie(username, password);
    const key = `release-${username}`;
    assert.equal((await ctx.fetch('/api/scenarios', { method: 'POST', headers: jsonHeaders(cookie), body: JSON.stringify({ key, name: key }) })).status, 201);
    assert.equal((await saveScript(ctx, cookie, key)).status, 200);
    assert.equal((await ctx.fetch(`/api/scenarios/${key}/publish`, { method: 'POST', headers: { cookie } })).status, 200);
    assert.equal((await ctx.fetch(`/api/scenarios/${key}`, { method: 'PUT', headers: jsonHeaders(cookie), body: JSON.stringify({ description: 'updated' }) })).status, 200);
    assert.equal((await ctx.fetch(`/api/scenarios/${key}`, { headers: { cookie } }).then((r) => r.json())).status, 'draft');
  }
});

test('compare 对快照键顺序变化不报告 schema 变化', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  await ctx.fetch('/api/scenarios', { method: 'POST', headers: jsonHeaders(cookie), body: JSON.stringify({ key: 'release-canonical', name: '规范比较' }) });
  await saveScript(ctx, cookie, 'release-canonical', "export const testDataSchema={columns:['id','name'],required:['id'],example:{id:'1',name:'n'}};\n");
  await ctx.fetch('/api/scenarios/release-canonical/publish', { method: 'POST', headers: { cookie } });
  await saveScript(ctx, cookie, 'release-canonical', "export const testDataSchema={columns:['id','name'],required:['id'],example:{name:'n',id:'1'}};\n");
  await ctx.fetch('/api/scenarios/release-canonical/publish', { method: 'POST', headers: { cookie } });
  const releases = await (await ctx.fetch('/api/scenarios/release-canonical/releases', { headers: { cookie } })).json();
  const compare = await (await ctx.fetch(`/api/scenarios/release-canonical/releases/${releases[1].id}/compare`, { headers: { cookie } })).json();
  assert.equal(compare.schemaChanged, false);
});

test('恢复数据库失败时回滚脚本文件和场景入口', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  await ctx.fetch('/api/scenarios', { method: 'POST', headers: jsonHeaders(cookie), body: JSON.stringify({ key: 'release-atomic', name: '原子恢复' }) });
  await saveScript(ctx, cookie, 'release-atomic', "export const testDataSchema={columns:['old'],required:[]};\n");
  await ctx.fetch('/api/scenarios/release-atomic/publish', { method: 'POST', headers: { cookie } });
  await saveScript(ctx, cookie, 'release-atomic', "export const testDataSchema={columns:['new'],required:[]};\n");
  const before = await (await ctx.fetch('/api/scenarios/release-atomic', { headers: { cookie } })).json();
  const releases = await (await ctx.fetch('/api/scenarios/release-atomic/releases', { headers: { cookie } })).json();
  const original = ctx.app.locals.database.restoreScenarioRelease;
  ctx.app.locals.database.restoreScenarioRelease = () => { throw new Error('injected restore failure'); };
  const response = await ctx.fetch(`/api/scenarios/release-atomic/releases/${releases[0].id}/restore`, { method: 'POST', headers: { cookie } });
  ctx.app.locals.database.restoreScenarioRelease = original;
  assert.equal(response.status, 500);
  const after = await (await ctx.fetch('/api/scenarios/release-atomic', { headers: { cookie } })).json();
  assert.equal(after.scriptEntry, before.scriptEntry);
  assert.deepEqual(after.dataSchema, before.dataSchema);
  const script = await ctx.fetch('/api/scenarios/release-atomic/script', { headers: { cookie } });
  assert.match((await script.json()).content, /new/);
});

test('恢复跨 workspace 与 platform-data 脚本路径时使用实际保存入口', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/scenarios', {
    method: 'POST', headers: jsonHeaders(cookie),
    body: JSON.stringify({ key: 'release-paths', name: '跨路径恢复' })
  });
  assert.equal(created.status, 201);
  const workspaceEntry = 'tests/release-paths.spec.js';
  const workspacePath = `${ctx.app.locals.paths.workspaceRoot}/tests/release-paths.spec.js`;
  await (await import('node:fs/promises')).mkdir(`${ctx.app.locals.paths.workspaceRoot}/tests`, { recursive: true });
  await (await import('node:fs/promises')).writeFile(workspacePath, "export const testDataSchema={columns:['workspace'],required:[]};\n", 'utf8');
  ctx.app.locals.database.updateScenario('release-paths', { scriptEntry: workspaceEntry });
  const first = await ctx.fetch('/api/scenarios/release-paths/publish', { method: 'POST', headers: { cookie } });
  assert.equal(first.status, 200);
  const platformScript = await ctx.fetch('/api/scenarios/release-paths/script', {
    method: 'PUT',
    headers: jsonHeaders(cookie),
    body: JSON.stringify({ fileName: 'platform-release-paths.spec.js', content: "export const testDataSchema={columns:['platform'],required:[]};\n" })
  });
  assert.equal(platformScript.status, 200);
  const releases = await (await ctx.fetch('/api/scenarios/release-paths/releases', { headers: { cookie } })).json();
  const restored = await ctx.fetch(`/api/scenarios/release-paths/releases/${releases[0].id}/restore`, { method: 'POST', headers: { cookie } });
  assert.equal(restored.status, 200);
  const restoredScenario = await restored.json();
  assert.match(restoredScenario.scriptEntry, /^platform-data\//);
  const script = await ctx.fetch('/api/scenarios/release-paths/script', { headers: { cookie } });
  assert.match((await script.json()).content, /workspace/);
});

test('并发发布版本号唯一且连续', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const key = 'release-concurrent';
  assert.equal((await ctx.fetch('/api/scenarios', { method: 'POST', headers: jsonHeaders(cookie), body: JSON.stringify({ key, name: key }) })).status, 201);
  assert.equal((await saveScript(ctx, cookie, key)).status, 200);
  const responses = await Promise.all(Array.from({ length: 4 }, () => ctx.fetch(`/api/scenarios/${key}/publish`, { method: 'POST', headers: { cookie } })));
  assert.equal(responses.every((response) => response.status === 200), true);
  const releases = await (await ctx.fetch(`/api/scenarios/${key}/releases`, { headers: { cookie } })).json();
  assert.deepEqual(releases.map((release) => release.versionNo), [4, 3, 2, 1]);
});

test('草稿场景允许创建服务器和本地执行任务', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const unpublish = await ctx.fetch('/api/scenarios/wms-customer-create/unpublish', { method: 'POST', headers: { cookie } });
  assert.equal(unpublish.status, 200);
  const dataset = await ctx.uploadCustomerDataset(cookie);
  for (const executionLocation of ['server', 'local']) {
    const response = await ctx.fetch('/api/runs', {
      method: 'POST',
      headers: jsonHeaders(cookie),
      body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionLocation })
    });
    assert.equal(response.status, 202);
    const body = await response.json();
    if (executionLocation === 'server') await ctx.waitForRun(body.runId);
  }
});

