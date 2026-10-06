import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';

function listScenarioTests(scenarioKey) {
  const result = spawnSync(process.execPath, [
    path.resolve('node_modules', 'playwright', 'cli.js'),
    'test',
    'tests/sample-form-submit.spec.js',
    '--list'
  ], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      AUTOTEST_SCENARIO_KEY: scenarioKey,
      AUTOTEST_DATASET_PATH: ''
    },
    encoding: 'utf8'
  });

  return {
    status: result.status,
    output: `${result.stdout}\n${result.stderr}`
  };
}

test('示例场景按平台选择只列出当前场景用例', () => {
  const form = listScenarioTests('sample-form-submit');

  assert.equal(form.status, 0);
  assert.match(form.output, /表单填写与提交/);
  assert.doesNotMatch(form.output, /查询与筛选/);
  assert.doesNotMatch(form.output, /打开 Bing/);
  assert.doesNotMatch(form.output, /No tests found/);
  assert.doesNotMatch(form.output, /Total: 0 tests/);
});
