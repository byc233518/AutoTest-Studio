import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('录制与执行不再返回免安装协议启动地址', async (t) => {
  const ctx = await createTestContext(t, { recordMode: 'stub' });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const recordingResponse = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      location: 'local',
      environmentKey: 'test'
    })
  });
  assert.equal(recordingResponse.status, 400);
  assert.match((await recordingResponse.json()).message, /桌面客户端/);

  const serverRecording = await ctx.fetch('/api/recordings/start', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      location: 'server',
      environmentKey: 'test'
    })
  });
  assert.equal(serverRecording.status, 201);
  const recording = await serverRecording.json();
  assert.equal(recording.location, 'server');
  assert.equal(recording.desktopLaunchUrl, undefined);
  assert.equal(recording.recordCode, undefined);

  const dataset = await ctx.uploadCustomerDataset(cookie);
  const runResponse = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: dataset.scenarioId,
      datasetId: dataset.id,
      environment: 'test',
      executionLocation: 'local'
    })
  });
  assert.equal(runResponse.status, 400);
  assert.equal((await runResponse.json()).localExecution, undefined);
});
