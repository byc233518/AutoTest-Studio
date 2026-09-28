import assert from 'node:assert/strict';
import test from 'node:test';
import { createRunFilters, filterRuns } from '../../frontend/src/run-filters.mjs';

const scenarios = [
  { id: 'SCN-LOGIN', name: '登录验证' },
  { id: 'SCN-CUSTOMER', name: '客户主数据录入' }
];

const runs = [
  { runId: 'RUN-LOGIN-001', scenarioId: 'SCN-LOGIN', status: 'passed', startedAt: '2026-07-12T09:00:00' },
  { runId: 'RUN-CUSTOMER-001', scenarioId: 'SCN-CUSTOMER', status: 'failed', startedAt: '2026-07-13T10:00:00' },
  { runId: 'RUN-CUSTOMER-002', scenarioId: 'SCN-CUSTOMER', status: 'passed', startedAt: '2026-07-14T11:00:00' }
];

test('关键词同时匹配执行编号和场景名称且不区分大小写', () => {
  assert.deepEqual(
    filterRuns(runs, scenarios, { ...createRunFilters(), keyword: 'run-login' }).map((item) => item.runId),
    ['RUN-LOGIN-001']
  );
  assert.deepEqual(
    filterRuns(runs, scenarios, { ...createRunFilters(), keyword: '客户主数据' }).map((item) => item.runId),
    ['RUN-CUSTOMER-001', 'RUN-CUSTOMER-002']
  );
});

test('状态、场景和日期范围使用并且关系组合过滤', () => {
  const filters = {
    ...createRunFilters(),
    status: 'failed',
    scenarioId: 'SCN-CUSTOMER',
    dateRange: ['2026-07-13', '2026-07-14']
  };

  assert.deepEqual(filterRuns(runs, scenarios, filters).map((item) => item.runId), ['RUN-CUSTOMER-001']);
});
