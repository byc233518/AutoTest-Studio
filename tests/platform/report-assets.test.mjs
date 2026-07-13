import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('HTML 报告可以加载 Playwright 生成的嵌套截图和视频', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const reportDir = path.resolve(ctx.app.locals.paths.reportsDir, 'RUN-HTML-ASSETS');
  const dataDir = path.resolve(reportDir, 'html', 'data');

  await mkdir(dataDir, { recursive: true });
  await writeFile(path.resolve(reportDir, 'index.html'), '<!doctype html><title>Playwright report</title>', 'utf8');
  await writeFile(path.resolve(dataDir, 'result.png'), Buffer.from('image-content'));
  await writeFile(path.resolve(dataDir, 'recording.webm'), Buffer.from('video-content'));

  ctx.app.locals.database.createRun({
    id: 'RUN-HTML-ASSETS',
    scenarioId: dataset.scenarioId,
    datasetId: dataset.id,
    environment: 'test',
    executionMode: 'ui',
    status: 'passed',
    triggeredBy: 'USR-TESTER',
    summary: { total: 1, passed: 1, failed: 0, skipped: 0 },
    reportPath: reportDir
  });

  const screenshot = await ctx.fetch('/api/runs/RUN-HTML-ASSETS/report-file/data/result.png', { headers: { cookie } });
  assert.equal(screenshot.status, 200);
  assert.match(screenshot.headers.get('content-type'), /image\/png/);
  assert.equal(await screenshot.text(), 'image-content');

  const video = await ctx.fetch('/api/runs/RUN-HTML-ASSETS/report-file/data/recording.webm', { headers: { cookie } });
  assert.equal(video.status, 200);
  assert.match(video.headers.get('content-type'), /video\/webm/);
  assert.equal(await video.text(), 'video-content');
});
