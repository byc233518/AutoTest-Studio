import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';

function listScenarioTests(scenarioKey) {
  const result = spawnSync(process.execPath, [
    path.resolve('node_modules', 'playwright', 'cli.js'),
    'test',
    'tests/wms-master-data.spec.js',
    '--list'
  ], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      JMOM_SCENARIO_KEY: scenarioKey,
      JMOM_DATASET_PATH: ''
    },
    encoding: 'utf8'
  });

  return {
    status: result.status,
    output: `${result.stdout}\n${result.stderr}`
  };
}

test('WMS 场景按平台选择只列出当前场景用例', () => {
  const customer = listScenarioTests('wms-customer-create');

  assert.equal(customer.status, 0);
  assert.match(customer.output, /WMS/);
  assert.match(customer.output, /客户/);
  assert.doesNotMatch(customer.output, /供应商/);
  assert.doesNotMatch(customer.output, /物料/);
  assert.doesNotMatch(customer.output, /No tests found/);
  assert.doesNotMatch(customer.output, /Total: 0 tests/);
});
