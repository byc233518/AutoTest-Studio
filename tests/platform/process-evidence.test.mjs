import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

test('过程接口在没有录像截图时会显示测试步骤和可视化占位图', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);
  const reportDir = path.resolve(ctx.app.locals.paths.reportsDir, 'RUN-SKIPPED-EVIDENCE');
  const summary = {
    total: 1,
    passed: 0,
    failed: 0,
    skipped: 1,
    tests: [
      {
        title: 'WMS - 客户主数据录入 - AT-CUST-SKIP',
        project: 'chromium',
        status: 'skipped',
        durationMs: 0,
        error: ''
      }
    ]
  };

  await mkdir(reportDir, { recursive: true });
  await writeFile(path.resolve(reportDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  await writeFile(path.resolve(reportDir, 'index.html'), '<!doctype html><meta charset="utf-8"><title>report</title>', 'utf8');

  ctx.app.locals.database.createRun({
    id: 'RUN-SKIPPED-EVIDENCE',
    scenarioId: dataset.scenarioId,
    datasetId: dataset.id,
    environment: 'test',
    executionMode: 'ui',
    status: 'passed',
    triggeredBy: 'USR-TESTER',
    summary,
    reportPath: reportDir
  });

  const listResponse = await ctx.fetch('/api/runs', { headers: { cookie } });
  assert.equal(listResponse.status, 200);
  const listedRun = (await listResponse.json()).find((item) => item.runId === 'RUN-SKIPPED-EVIDENCE');
  assert.equal(listedRun.status, 'skipped');

  const response = await ctx.fetch('/api/runs/RUN-SKIPPED-EVIDENCE/process', { headers: { cookie } });
  assert.equal(response.status, 200);
  const process = await response.json();

  assert.equal(process.status, 'skipped');
  assert.match(process.currentStep, /未产生浏览器画面/);
  assert.equal(process.summary.skipped, 1);
  assert.equal(process.resultTests.length, 1);
  assert.equal(process.resultTests[0].status, 'skipped');
  assert.equal(process.evidence.skippedOnly, true);
  assert.equal(process.evidence.hasHtmlReport, true);
  assert.ok(process.latestScreenshotUrl);
  assert.equal(process.artifacts.some((artifact) => artifact.type === 'html-report'), true);
  assert.equal(process.artifacts.some((artifact) => artifact.type === 'screenshot'), true);

  const screenshot = await ctx.fetch(process.latestScreenshotUrl, { headers: { cookie } });
  assert.equal(screenshot.status, 200);
  assert.match(screenshot.headers.get('content-type'), /svg/);
  assert.match(await screenshot.text(), /未产生浏览器画面/);
});
