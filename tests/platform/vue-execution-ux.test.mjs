import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('执行记录页提供已确认的四类筛选和重置入口', async () => {
  const source = await readFile('frontend/src/views/RunsView.vue', 'utf8');

  assert.match(source, /filters\.keyword/);
  assert.match(source, /filters\.status/);
  assert.match(source, /filters\.scenarioId/);
  assert.match(source, /filters\.dateRange/);
  assert.match(source, /filteredRuns/);
  assert.match(source, /resetFilters/);
  assert.match(source, /暂无符合条件的执行记录/);
});

test('场景历史会切换执行记录页并传入场景筛选', async () => {
  const source = await readFile('frontend/src/App.vue', 'utf8');

  assert.match(source, /:scenario-filter="runScenarioFilter"/);
  assert.match(source, /@history="openRunHistory"/);
  assert.match(source, /runScenarioFilter\.value\s*=\s*scenario\?\.id/);
});
