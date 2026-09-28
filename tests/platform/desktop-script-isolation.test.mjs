import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';
import { saveScenarioScriptContent, resolveScenarioScriptPath } from '../../server/platform/scenario-scripts.mjs';
import { stageScenarioExecution } from '../../server/platform/runner.mjs';

const execFileAsync = promisify(execFile);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('编辑内置脚本时复制到当前项目而不改写共享运行目录', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'autotest-script-isolation-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const workspaceRoot = path.resolve(root, 'runtime');
  const dataDir = path.resolve(root, 'project');
  const scriptsDir = path.resolve(dataDir, 'cases');
  const seedPath = path.resolve(workspaceRoot, 'tests', 'seed.spec.js');
  await mkdir(path.dirname(seedPath), { recursive: true });
  await writeFile(seedPath, '// shared seed\n', 'utf8');

  const saved = await saveScenarioScriptContent({
    workspaceRoot,
    dataDir,
    scriptsDir,
    scenarioKey: 'isolated-case',
    existingScriptEntry: 'tests/seed.spec.js',
    fileName: 'seed.spec.js',
    content: '// project edit\n'
  });

  assert.equal(await readFile(seedPath, 'utf8'), '// shared seed\n');
  assert.equal(saved.scriptEntry, 'platform-data/cases/isolated-case/seed.spec.js');
  assert.equal(await readFile(resolveScenarioScriptPath({ workspaceRoot, dataDir, scriptEntry: saved.scriptEntry }), 'utf8'), '// project edit\n');
});

test('项目目录脚本经临时执行工作区后可解析内置 Playwright', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'autotest-script-stage-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const scriptsDir = path.resolve(root, 'cases');
  const sourcePath = path.resolve(scriptsDir, 'external-case', 'external.spec.js');
  await mkdir(path.dirname(sourcePath), { recursive: true });
  await writeFile(sourcePath, "const { test } = require('@playwright/test');\ntest('external project script', async () => {});\n", 'utf8');
  const staged = await stageScenarioExecution({
    workspaceRoot: repositoryRoot,
    temporaryDir: path.resolve(root, 'tmp'),
    scriptsDir
  }, 'RUN-STAGE', sourcePath);
  t.after(() => staged.cleanup());

  const { stdout, stderr } = await execFileAsync(process.execPath, [
    path.resolve(repositoryRoot, 'node_modules', 'playwright', 'cli.js'),
    'test',
    '--list',
    '--config',
    path.resolve(repositoryRoot, 'playwright.config.js')
  ], {
    cwd: repositoryRoot,
    env: { ...process.env, AUTOTEST_SCENARIO_SCRIPT: staged.scriptPath },
    windowsHide: true
  });
  assert.match(`${stdout}\n${stderr}`, /external project script/);
});
