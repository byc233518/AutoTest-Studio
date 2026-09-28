import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApp } from '../../server/app.mjs';
import { createPlatformDatabase } from '../../server/platform/database.mjs';
import { createRun, executeRun } from '../../server/platform/runner.mjs';

test('客户端关闭时等待执行任务并持久化取消状态', async () => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-shutdown-'));
  const projectRoot = path.resolve(rootDir, 'project');
  const runtimeRoot = path.resolve(rootDir, 'runtime');
  const databasePath = path.resolve(projectRoot, '.autotest-studio', 'project.sqlite');
  const appOptions = {
    desktopMode: true,
    workspaceRoot: runtimeRoot,
    dataDir: projectRoot,
    databasePath,
    uploadsDir: path.resolve(projectRoot, 'data'),
    reportsDir: path.resolve(projectRoot, 'reports'),
    recordingsDir: path.resolve(projectRoot, 'recordings'),
    recordingScriptsDir: path.resolve(projectRoot, 'cases'),
    scriptsDir: path.resolve(projectRoot, 'cases'),
    temporaryDir: path.resolve(projectRoot, 'tmp'),
    runMode: 'mock',
    mockRunStepDelayMs: 80,
    silent: true
  };
  await mkdir(path.dirname(databasePath), { recursive: true });
  await mkdir(runtimeRoot, { recursive: true });

  let app;
  try {
    app = await createApp(appOptions);
    const database = app.locals.database;
    const scenario = database.getScenarioByKey('wms-customer-create');
    const rowsPath = path.resolve(projectRoot, 'data', 'shutdown-rows.json');
    await writeFile(rowsPath, JSON.stringify([{ 客户编号: 'SHUTDOWN-001' }]), 'utf8');
    const dataset = database.createDataset({
      id: database.nextId('DAT'),
      scenarioId: scenario.id,
      name: '关闭测试数据',
      fileName: 'shutdown-rows.json',
      filePath: rowsPath,
      rowsPath,
      rowCount: 1,
      validationStatus: 'valid',
      uploadedBy: 'USR-DESKTOP',
      errors: [],
      schemaSnapshot: JSON.parse(scenario.data_schema)
    });
    const run = createRun(database, {
      scenario,
      dataset,
      environment: database.getDefaultEnvironment().key,
      executionMode: 'headless',
      triggeredBy: 'USR-DESKTOP'
    });
    const task = executeRun(app, run.id);
    app.locals.trackExecutionTask(task);
    await new Promise((resolve) => setTimeout(resolve, 10));

    await app.locals.shutdown();
    const persisted = database.getRunById(run.id);
    assert.equal(persisted.status, 'failed');
    assert.match(persisted.error || '', /客户端已退出|停止测试执行/);
    database.close();
    app = null;

    const reopened = createPlatformDatabase(databasePath);
    assert.equal(reopened.getRunById(run.id).status, 'failed');
    reopened.close();
  } finally {
    app?.locals.database.close();
    await rm(rootDir, { recursive: true, force: true });
  }
});
