import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { loadRecordedRows, recordedTitle } = require('../support/recorded-script.js');
const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('录制脚本辅助库从 JMOM_DATASET_PATH 读取多行数据并补齐行号', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'jmom-recorded-'));
  t.after(async () => rm(dir, { recursive: true, force: true }));
  const datasetPath = path.join(dir, 'rows.json');
  await writeFile(datasetPath, JSON.stringify([
    { locatorCode: 'KW-001', locatorName: '一号库位' },
    { locatorCode: 'KW-002', locatorName: '二号库位' }
  ]), 'utf8');
  const previous = process.env.JMOM_DATASET_PATH;
  process.env.JMOM_DATASET_PATH = datasetPath;
  t.after(() => {
    if (previous === undefined) delete process.env.JMOM_DATASET_PATH;
    else process.env.JMOM_DATASET_PATH = previous;
  });

  const rows = loadRecordedRows({
    columns: ['locatorCode', 'locatorName', 'warehouseCode'],
    example: { locatorCode: 'KW-EXAMPLE', locatorName: '示例库位', warehouseCode: 'WMS01' }
  });

  assert.equal(rows.length, 2);
  assert.deepEqual(rows.map((row) => row.__rowNumber), [1, 2]);
  assert.equal(rows[0].warehouseCode, '');
  assert.equal(recordedTitle('库位维护录入', rows[0]), '库位维护录入 - KW-001 #1');
});

test('录制脚本辅助库没有数据集时回退到 testDataSchema.example', (t) => {
  const previous = process.env.JMOM_DATASET_PATH;
  delete process.env.JMOM_DATASET_PATH;
  t.after(() => {
    if (previous === undefined) delete process.env.JMOM_DATASET_PATH;
    else process.env.JMOM_DATASET_PATH = previous;
  });

  const rows = loadRecordedRows({
    columns: ['locatorCode', 'locatorName'],
    example: { locatorCode: 'KW-EXAMPLE', locatorName: '示例库位' }
  });

  assert.deepEqual(rows, [{ locatorCode: 'KW-EXAMPLE', locatorName: '示例库位', __rowNumber: 1 }]);
});

test('参数化录制脚本可被 Playwright 正常收集', async (t) => {
  const dir = await mkdtemp(path.join(workspaceRoot, '.recorded-playwright-'));
  t.after(async () => rm(dir, { recursive: true, force: true }));
  const helperPath = path.resolve(workspaceRoot, 'tests/support/recorded-script.js');
  const specPath = path.resolve(dir, 'recorded.spec.js');
  const configPath = path.resolve(dir, 'playwright.config.cjs');

  await writeFile(specPath, [
    "const { test } = require('@playwright/test');",
    `const { defineRecordedTests } = require(${JSON.stringify(helperPath)});`,
    "defineRecordedTests(test, '采集过站', { example: { code: 'BAR001' } }, async ({ page }, data) => {});",
    ''
  ].join('\n'), 'utf8');
  await writeFile(configPath, "module.exports = { testDir: '.', reporter: 'list' };\n", 'utf8');

  const result = spawnSync(process.execPath, [
    path.resolve(workspaceRoot, 'node_modules/playwright/cli.js'),
    'test',
    path.basename(specPath),
    '--config',
    path.basename(configPath),
    '--list'
  ], { cwd: dir, encoding: 'utf8' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /采集过站 - BAR001 #1/);
});
