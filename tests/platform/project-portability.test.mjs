import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, rename, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createApp } from '../../server/app.mjs';

async function openProject(rootDir) {
  await mkdir(path.resolve(rootDir, '.autotest-studio'), { recursive: true });
  const app = await createApp({
    workspaceRoot: path.resolve('.'),
    dataDir: rootDir,
    databasePath: path.resolve(rootDir, '.autotest-studio', 'project.sqlite'),
    uploadsDir: path.resolve(rootDir, 'data'),
    reportsDir: path.resolve(rootDir, 'reports'),
    recordingsDir: path.resolve(rootDir, 'recordings'),
    recordingScriptsDir: path.resolve(rootDir, 'cases'),
    scriptsDir: path.resolve(rootDir, 'cases'),
    temporaryDir: path.resolve(rootDir, 'tmp'),
    desktopMode: true,
    runMode: 'mock',
    silent: true
  });
  const server = createServer(app);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  return {
    app,
    fetch: (url, options) => fetch(`${origin}${url}`, options),
    async close() {
      await app.locals.shutdown();
      await new Promise((resolve) => server.close(resolve));
      app.locals.database.close();
    }
  };
}

async function waitForRun(project, runId) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const response = await project.fetch(`/api/runs/${runId}`);
    const run = await response.json();
    if (!['queued', 'running'].includes(run.status)) return run;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`执行任务未完成：${runId}`);
}

test('项目目录整体移动后仍能读取数据集和历史执行报告', async (t) => {
  const workspace = await mkdtemp(path.join(tmpdir(), 'autotest-portable-project-'));
  let project = null;
  t.after(async () => {
    await project?.close().catch(() => {});
    await rm(workspace, { recursive: true, force: true });
  });
  const oldRoot = path.resolve(workspace, 'old-location');
  const newRoot = path.resolve(workspace, 'new-location');
  await mkdir(oldRoot, { recursive: true });

  project = await openProject(oldRoot);
  const form = new FormData();
  form.append('name', '可迁移客户数据');
  form.append('file', new Blob([
    '记录编码,记录名称,经办人,分类,说明\nAT-MOVE-001,目录迁移客户,测试员,自动化,上海\n'
  ], { type: 'text/csv' }), 'portable.csv');
  const uploadResponse = await project.fetch('/api/scenarios/sample-form-submit/datasets', {
    method: 'POST',
    body: form
  });
  assert.equal(uploadResponse.status, 201);
  const dataset = await uploadResponse.json();

  const runResponse = await project.fetch('/api/runs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      scenarioId: dataset.scenarioId,
      datasetId: dataset.id,
      environment: 'test',
      executionMode: 'headless'
    })
  });
  assert.equal(runResponse.status, 202);
  const createdRun = await runResponse.json();
  const completedRun = await waitForRun(project, createdRun.runId);
  assert.equal(completedRun.status, 'passed');

  const rawDataset = project.app.locals.database.raw.prepare('SELECT * FROM datasets WHERE id = ?').get(dataset.id);
  const rawRun = project.app.locals.database.raw.prepare('SELECT * FROM runs WHERE id = ?').get(createdRun.runId);
  const rawArtifact = project.app.locals.database.raw.prepare('SELECT * FROM run_artifacts WHERE run_id = ? LIMIT 1').get(createdRun.runId);
  assert.equal(path.isAbsolute(rawDataset.rows_path), false);
  assert.equal(path.isAbsolute(rawRun.report_path), false);
  assert.equal(path.isAbsolute(rawArtifact.file_path), false);

  // 模拟旧版本数据库中的绝对地址，验证升级时会按新项目根目录迁移。
  project.app.locals.database.raw.prepare('UPDATE datasets SET file_path = ?, rows_path = ? WHERE id = ?').run(
    path.resolve(oldRoot, rawDataset.file_path),
    path.resolve(oldRoot, rawDataset.rows_path),
    dataset.id
  );
  project.app.locals.database.raw.prepare('UPDATE runs SET report_path = ? WHERE id = ?').run(
    path.resolve(oldRoot, rawRun.report_path),
    createdRun.runId
  );
  project.app.locals.database.raw.prepare('UPDATE run_artifacts SET file_path = ? WHERE run_id = ?').run(
    path.resolve(oldRoot, rawArtifact.file_path),
    createdRun.runId
  );
  await project.close();
  project = null;

  await rename(oldRoot, newRoot);
  project = await openProject(newRoot);

  const movedDatasetResponse = await project.fetch(`/api/scenarios/sample-form-submit/datasets/${dataset.id}`);
  assert.equal(movedDatasetResponse.status, 200);
  assert.equal((await movedDatasetResponse.json()).rows[0].记录编码, 'AT-MOVE-001');

  const reportResponse = await project.fetch(`/api/runs/${createdRun.runId}/report-file/index.html`);
  assert.equal(reportResponse.status, 200);
  assert.match(await reportResponse.text(), /表单填写与提交/);

  const reopenedDataset = project.app.locals.database.getDatasetById(dataset.id);
  const reopenedRun = project.app.locals.database.getRunById(createdRun.runId);
  const reopenedArtifact = project.app.locals.database.listRunArtifacts(createdRun.runId)[0];
  assert.equal(reopenedDataset.rows_path.startsWith(newRoot), true);
  assert.equal(reopenedRun.report_path.startsWith(newRoot), true);
  assert.equal(reopenedArtifact.file_path.startsWith(newRoot), true);
  assert.equal(reopenedDataset.rows_path.startsWith(oldRoot), false);

  const migratedDataset = project.app.locals.database.raw.prepare('SELECT * FROM datasets WHERE id = ?').get(dataset.id);
  const migratedRun = project.app.locals.database.raw.prepare('SELECT * FROM runs WHERE id = ?').get(createdRun.runId);
  const migratedArtifact = project.app.locals.database.raw.prepare('SELECT * FROM run_artifacts WHERE run_id = ? LIMIT 1').get(createdRun.runId);
  assert.equal(path.isAbsolute(migratedDataset.rows_path), false);
  assert.equal(path.isAbsolute(migratedRun.report_path), false);
  assert.equal(path.isAbsolute(migratedArtifact.file_path), false);
});
