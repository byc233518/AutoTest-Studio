import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('测试人员可以用一次性执行码在本机领取场景并上传执行结果', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const scriptPath = path.resolve(ctx.app.locals.paths.workspaceRoot, 'tests', 'wms-master-data.spec.js');
  const supportPath = path.resolve(ctx.app.locals.paths.workspaceRoot, 'tests', 'support', 'config.js');
  await mkdir(path.dirname(scriptPath), { recursive: true });
  await mkdir(path.dirname(supportPath), { recursive: true });
  await writeFile(scriptPath, "const { test } = require('@playwright/test');\ntest('local', async () => {});\n", 'utf8');
  await writeFile(supportPath, "module.exports = { local: true };\n", 'utf8');

  const createdResponse = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: dataset.scenarioId,
      datasetId: dataset.id,
      environment: 'test',
      executionLocation: 'local',
      executionMode: 'headed'
    })
  });
  assert.equal(createdResponse.status, 202);
  const created = await createdResponse.json();
  assert.equal(created.executionLocation, 'local');
  assert.equal(created.status, 'queued');
  assert.match(created.localExecution.code, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);

  const claimedResponse = await ctx.fetch('/api/local-runs/resolve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: created.localExecution.code })
  });
  assert.equal(claimedResponse.status, 200);
  const claimed = await claimedResponse.json();
  assert.equal(claimed.runId, created.runId);
  assert.equal(claimed.scenarioKey, 'wms-customer-create');
  assert.equal(claimed.executionMode, 'headed');
  assert.equal(claimed.rows.length, 1);
  assert.ok(claimed.files.some((file) => file.path === 'tests/wms-master-data.spec.js'));
  assert.ok(claimed.files.some((file) => file.path === 'tests/support/config.js'));
  assert.equal(typeof claimed.environment.password, 'string');

  const reused = await ctx.fetch('/api/local-runs/resolve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: created.localExecution.code })
  });
  assert.equal(reused.status, 401);

  const summary = {
    total: 1,
    passed: 1,
    failed: 0,
    skipped: 0,
    tests: [{ title: 'local', status: 'passed' }]
  };
  const artifact = new FormData();
  artifact.append('token', claimed.token);
  artifact.append('path', 'summary.json');
  artifact.append('file', new Blob([JSON.stringify(summary)], { type: 'application/json' }), 'summary.json');
  const uploaded = await ctx.fetch(`/api/local-runs/${created.runId}/artifacts`, {
    method: 'POST',
    body: artifact
  });
  assert.equal(uploaded.status, 201);

  const finishedResponse = await ctx.fetch(`/api/local-runs/${created.runId}/finish`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ token: claimed.token, exitCode: 0 })
  });
  assert.equal(finishedResponse.status, 200);
  const finished = await finishedResponse.json();
  assert.equal(finished.status, 'passed');
  assert.equal(finished.executionLocation, 'local');
  assert.equal(finished.businessSummary.passedRows, 1);

  const detail = await ctx.fetch(`/api/runs/${created.runId}/process`, { headers: { cookie } });
  assert.equal(detail.status, 200);
  const process = await detail.json();
  assert.equal(process.executionLocation, 'local');
  assert.equal(process.status, 'passed');
  assert.ok(process.artifacts.some((item) => item.type === 'screenshot'));
  assert.ok(process.artifacts.some((item) => item.type === 'video'));
});

test('本地执行结果上传拒绝目录穿越路径', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const scriptPath = path.resolve(ctx.app.locals.paths.workspaceRoot, 'tests', 'wms-master-data.spec.js');
  await mkdir(path.dirname(scriptPath), { recursive: true });
  await writeFile(scriptPath, "const { test } = require('@playwright/test');\n", 'utf8');
  const createdResponse = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, executionLocation: 'local' })
  });
  const created = await createdResponse.json();
  const claimedResponse = await ctx.fetch('/api/local-runs/resolve', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ code: created.localExecution.code })
  });
  const claimed = await claimedResponse.json();
  const artifact = new FormData();
  artifact.append('token', claimed.token);
  artifact.append('path', '../outside.txt');
  artifact.append('file', new Blob(['bad']), 'outside.txt');
  const response = await ctx.fetch(`/api/local-runs/${created.runId}/artifacts`, { method: 'POST', body: artifact });
  assert.equal(response.status, 400);
});
