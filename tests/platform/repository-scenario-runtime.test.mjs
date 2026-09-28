import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const {
  inputValueFor,
  scenarioTestData
} = require('../../tests/support/repository-scenario');

test('仓库场景运行时按控件类型生成可填写值', () => {
  assert.equal(inputValueFor('number', '无效数字'), '1');
  assert.equal(inputValueFor('date', '无效日期'), '2026-08-01');
  assert.equal(inputValueFor('datetime-local', ''), '2026-08-01T08:00');
  assert.equal(inputValueFor('text', 'AT-001'), 'AT-001');
});

test('仓库场景没有外部数据集时使用脚本中的非空样例', () => {
  const previous = process.env.JMOM_DATASET_PATH;
  delete process.env.JMOM_DATASET_PATH;
  try {
    assert.deepEqual(scenarioTestData({
      dataSchema: { example: { Code: 'AT-001', Name: '自动化样例001' } }
    }), { Code: 'AT-001', Name: '自动化样例001' });
  } finally {
    if (previous == null) delete process.env.JMOM_DATASET_PATH;
    else process.env.JMOM_DATASET_PATH = previous;
  }
});
