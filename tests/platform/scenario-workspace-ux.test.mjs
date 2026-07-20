import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(file, 'utf8');

test('脚本编辑器使用 CodeMirror 并通过事务同步外部值', async () => {
  const source = await read('frontend/src/components/ScriptEditor.vue');
  assert.match(source, /EditorView/);
  assert.match(source, /javascript\(\)/);
  assert.match(source, /searchKeymap/);
  assert.match(source, /defaultKeymap/);
  assert.match(source, /historyKeymap/);
  assert.match(source, /defineModel|modelValue/);
  assert.match(source, /readonly/);
  assert.match(source, /errors/);
  assert.match(source, /view\.destroy\(\)/);
  assert.match(source, /dispatch\(/);
  assert.doesNotMatch(source, /new EditorView[\s\S]*watch\([^\n]*source[\s\S]*new EditorView/);
});

test('脚本编辑器提供行号、括号匹配、格式化和语法诊断', async () => {
  const [editor, drawer] = await Promise.all([
    read('frontend/src/components/ScriptEditor.vue'),
    read('frontend/src/components/ScenarioDrawer.vue')
  ]);
  assert.match(editor, /lineNumbers/);
  assert.match(editor, /bracketMatching/);
  assert.match(editor, /formatScript/);
  assert.match(editor, /parse|syntax/i);
  assert.match(editor, /diagnostic|lint|语法错误/i);
  assert.match(drawer, /savedScriptSource/);
  assert.match(drawer, /scriptDirty/);
  assert.match(drawer, /未保存/);
  assert.match(drawer, /与发布版比较/);
});

test('录制复核、合约同步和发布版本组件包含完整 API 闭环', async () => {
  const [review, sync, releases] = await Promise.all([
    read('frontend/src/components/RecordingReviewDialog.vue'),
    read('frontend/src/components/SchemaSyncDialog.vue'),
    read('frontend/src/components/ScenarioReleases.vue')
  ]);
  assert.match(review, /三步|字段/);
  assert.match(review, /成功条件|断言/);
  assert.match(review, /脚本预览/);
  assert.match(review, /\/api\/recordings\/\$\{[^}]+\}\/apply/);
  assert.match(review, /analysis/);
  assert.match(review, /fields/);
  assert.match(review, /assertions/);
  assert.match(sync, /GET|api\(/);
  assert.match(sync, /\/api\/scenarios\/\$\{[^}]+\}\/contract/);
  assert.match(sync, /resolution/);
  assert.match(sync, /platform/);
  assert.match(sync, /script/);
  assert.match(sync, /merge/);
  assert.match(sync, /mappings/);
  assert.match(sync, /conflicts/);
  assert.match(sync, /migrationRequired/);
  assert.match(releases, /publish/);
  assert.match(releases, /releases/);
  assert.match(releases, /compare/);
  assert.match(releases, /restore/);
  assert.match(releases, /draft/);
});

test('场景工作区保留五个页签并接入统一工作流组件', async () => {
  const source = await read('frontend/src/components/ScenarioDrawer.vue');
  for (const label of ['基本信息', '测试数据', '脚本与录制', '发布版本', '执行记录']) assert.match(source, new RegExp(label));
  assert.match(source, /ScriptEditor/);
  assert.match(source, /RecordingReviewDialog/);
  assert.match(source, /SchemaSyncDialog/);
  assert.match(source, /DatasetMigrationDialog/);
  assert.match(source, /@migration-required="schemaMigrationRequired"/);
  assert.match(source, /ScenarioReleases/);
  assert.match(source, /desktopLaunchUrl/);
  assert.match(source, /window\.location\.href/);
  assert.match(source, /复制录制码/);
  assert.match(source, /下载免安装录制器/);
  assert.match(source, /刷新状态/);
  assert.match(source, /analysis/);
});

test('场景工作区头部提供状态摘要、执行发布主操作和证据入口', async () => {
  const source = await read('frontend/src/components/ScenarioDrawer.vue');
  for (const label of ['场景状态', '当前脚本', '字段数量', '最近执行']) assert.match(source, new RegExp(label));
  assert.match(source, /RunDialog/);
  assert.match(source, /runRef\.open\(scenario/);
  assert.match(source, /发布当前草稿|立即发布/);
  assert.match(source, /报告与证据|过程证据/);
  assert.match(source, /RunDetailDrawer/);
});

test('草稿执行按钮仍使用统一 RunDialog 且不按状态禁用', async () => {
  const source = await read('frontend/src/views/ScenariosView.vue');
  assert.match(source, /RunDialog/);
  assert.match(source, /@click="runRef\.open\(row\)"/);
  assert.doesNotMatch(source, /:disabled="row\.status==='draft'"/);
});
