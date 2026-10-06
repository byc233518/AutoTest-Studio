import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

const jsonHeaders = (cookie) => ({ cookie, 'content-type': 'application/json' });

async function saveScript(ctx, cookie, key, field) {
  return ctx.fetch(`/api/scenarios/${key}/script`, {
    method: 'PUT',
    headers: jsonHeaders(cookie),
    body: JSON.stringify({
      fileName: `${key}.spec.js`,
      content: `export const testDataSchema={columns:['${field}'],required:[],example:{${field}:''}};\nexport default {};\n`
    })
  });
}

test('draft-compare 默认比较最新发布版并支持指定 releaseId', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const key = 'draft-compare-api';
  assert.equal((await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: jsonHeaders(cookie),
    body: JSON.stringify({ key, name: '初始名称', dataSchema: { columns: ['v1'], required: [], example: { v1: '' } } })
  })).status, 201);
  assert.equal((await saveScript(ctx, cookie, key, 'v1')).status, 200);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/publish`, { method: 'POST', headers: { cookie } })).status, 200);

  assert.equal((await ctx.fetch(`/api/scenarios/${key}`, {
    method: 'PUT',
    headers: jsonHeaders(cookie),
    body: JSON.stringify({ name: '第二版名称', dataSchema: { columns: ['v2'], required: [], example: { v2: '' } } })
  })).status, 200);
  assert.equal((await saveScript(ctx, cookie, key, 'v2')).status, 200);
  assert.equal((await ctx.fetch(`/api/scenarios/${key}/publish`, { method: 'POST', headers: { cookie } })).status, 200);
  const releases = await (await ctx.fetch(`/api/scenarios/${key}/releases`, { headers: { cookie } })).json();

  assert.equal((await ctx.fetch(`/api/scenarios/${key}`, {
    method: 'PUT',
    headers: jsonHeaders(cookie),
    body: JSON.stringify({ name: '当前草稿', dataSchema: { columns: ['draft'], required: [], example: { draft: '' } } })
  })).status, 200);
  assert.equal((await saveScript(ctx, cookie, key, 'draft')).status, 200);

  const latestResponse = await ctx.fetch(`/api/scenarios/${key}/releases/draft-compare`, { headers: { cookie } });
  assert.equal(latestResponse.status, 200);
  const latest = await latestResponse.json();
  assert.equal(latest.release.id, releases[0].id);
  assert.equal(latest.version, 'v2');
  assert.equal(latest.changed, true);
  assert.equal(latest.scriptChanged, true);
  assert.equal(latest.schemaChanged, true);
  assert.equal(latest.scenarioChanged, true);
  assert.deepEqual(latest.changes, {
    script: { changed: true },
    schema: { changed: true },
    scenario: { changed: true, keys: ['name'] }
  });

  const selectedResponse = await ctx.fetch(`/api/scenarios/${key}/releases/draft-compare?releaseId=${encodeURIComponent(releases[1].id)}`, { headers: { cookie } });
  assert.equal(selectedResponse.status, 200);
  const selected = await selectedResponse.json();
  assert.equal(selected.release.id, releases[1].id);
  assert.equal(selected.version, 'v1');
  assert.match(selected.summary, /脚本/);
  assert.match(selected.summary, /字段/);
  assert.match(selected.summary, /基本信息/);
});

test('draft-compare 对不存在的场景或 release 返回 404', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  assert.equal((await ctx.fetch('/api/scenarios/not-found/releases/draft-compare', { headers: { cookie } })).status, 404);
  assert.equal((await ctx.fetch('/api/scenarios/sample-form-submit/releases/draft-compare?releaseId=missing', { headers: { cookie } })).status, 404);
});
