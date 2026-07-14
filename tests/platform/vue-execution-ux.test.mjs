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
  assert.match(source, /aria-label="执行状态"/);
  assert.match(source, /aria-label="测试场景"/);
});

test('场景历史会切换执行记录页并传入场景筛选', async () => {
  const source = await readFile('frontend/src/App.vue', 'utf8');

  assert.match(source, /:scenario-filter="runScenarioFilter"/);
  assert.match(source, /@history="openRunHistory"/);
  assert.match(source, /runScenarioFilter\.value\s*=\s*scenario\?\.id/);
});

test('场景执行创建成功后留在当前页并直接打开详情抽屉', async () => {
  const [app, scenarios] = await Promise.all([
    readFile('frontend/src/App.vue', 'utf8'),
    readFile('frontend/src/views/ScenariosView.vue', 'utf8')
  ]);

  assert.doesNotMatch(app, /@started="openRuns"/);
  assert.match(scenarios, /RunDetailDrawer/);
  assert.match(scenarios, /@started="handleStarted"/);
  assert.match(scenarios, /await store\.loadRuns\(\)/);
  assert.match(scenarios, /runDetailRef\.value\.open\(detailRun\)/);
});
