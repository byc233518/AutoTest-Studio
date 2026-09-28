import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(file, 'utf8');

test('用例列表支持保留选择、全选筛选结果和清空选择', async () => {
  const source = await read('frontend/src/views/ScenariosView.vue');

  assert.match(source, /type="selection"/);
  assert.match(source, /reserve-selection/);
  assert.match(source, /@selection-change="handleSelectionChange"/);
  assert.match(source, /selectAllFiltered/);
  assert.match(source, /clearSelection/);
  assert.match(source, /全选筛选结果/);
  assert.match(source, /已选 \{\{ selectedCount \}\} 项/);
});

test('用例批量操作接入移动、删除和执行接口', async () => {
  const [view, moveDialog, runDialog] = await Promise.all([
    read('frontend/src/views/ScenariosView.vue'),
    read('frontend/src/components/ScenarioBatchMoveDialog.vue'),
    read('frontend/src/components/ScenarioBatchRunDialog.vue')
  ]);

  assert.match(view, /批量执行/);
  assert.match(view, /移动目录/);
  assert.match(view, /批量删除/);
  assert.match(view, /ElMessageBox\.confirm/);
  assert.match(view, /\/api\/scenarios\/batch\/delete/);
  assert.match(view, /Array\.isArray\(result\.cleanupWarnings\)/);
  assert.match(view, /本地文件未清理，可查看项目目录或重试/);
  assert.match(moveDialog, /<el-tree/);
  assert.match(moveDialog, /\/api\/scenarios\/batch\/move/);
  assert.match(moveDialog, /scenarioIds/);
  assert.match(moveDialog, /directory/);
  assert.match(runDialog, /\/api\/scenarios\/batch\/run/);
  assert.match(runDialog, /\/api\/test-plan-runs\/\$\{encodeURIComponent\(id\)\}/);
  assert.match(runDialog, /\/api\/test-plan-runs\/\$\{encodeURIComponent\(run\.id\)\}\/report/);
  assert.match(runDialog, /startPolling/);
  assert.match(runDialog, /测试报告/);
  assert.match(runDialog, /executionMode/);
  assert.match(runDialog, /store\.environments/);
  assert.match(view, /查看最近批次/);
  assert.match(view, /openLatestBatch/);
  assert.match(view, /api\('\/api\/scenarios\/batch\/runs\?limit=1'\)/);
  assert.match(runDialog, /defineEmits\(\['started', 'updated'\]\)/);
  assert.match(runDialog, /@closed="handleClosed"/);
});

test('项目切换会清空用例选择和批量弹窗状态', async () => {
  const source = await read('frontend/src/views/ScenariosView.vue');

  assert.match(source, /projectIdentity/);
  assert.match(source, /watch\(projectIdentity/);
  assert.match(source, /selectedId\.value = 'all'/);
  assert.match(source, /batchMoveRef\.value\?\.close\(\)/);
  assert.match(source, /batchRunRef\.value\?\.close\(\)/);
});
