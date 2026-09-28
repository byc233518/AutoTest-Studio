import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

let reviewHelpers = {};
try {
  reviewHelpers = await import('../../frontend/src/recording-review.mjs');
} catch {
  // Assertions below report the missing contract as a normal RED failure.
}

test('录制轮询只允许当前 generation、录制和场景写回状态', async () => {
  const source = await readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8');

  assert.match(source, /recordRequestGeneration/);
  assert.match(source, /invalidateRecordingRequests/);
  assert.match(source, /isCurrentRecordingRequest/);
  assert.match(source, /recordingId/);
  assert.match(source, /scenarioKey/);
  assert.match(source, /generation/);
  assert.match(source, /await api\(`\/api\/recordings\/\$\{request\.recordingId\}`\)[\s\S]+if \(!isCurrentRecordingRequest/);
  assert.match(source, /stopRecordPolling\(\)[\s\S]+invalidateRecordingRequests\(\)/);
  assert.match(source, /async function open\(item\)\s*\{\s*stopRecordPolling\(\)/);
  assert.match(source, /watch\(visible,[\s\S]+stopRecordPolling/);
});

test('三字段合并链归入最终字段且重定向直接依赖', () => {
  assert.equal(typeof reviewHelpers.analyzeFieldMerges, 'function');
  assert.equal(typeof reviewHelpers.redirectMergeDependents, 'function');
  const fields = [
    { candidateId: 'field-a', mergeTo: 'field-b' },
    { candidateId: 'field-b', mergeTo: 'field-c' },
    { candidateId: 'field-c', mergeTo: '' }
  ];

  const analyzed = reviewHelpers.analyzeFieldMerges(fields);
  assert.deepEqual(analyzed.errors, []);
  assert.deepEqual(analyzed.candidateIdsByTarget.get('field-c'), ['field-a', 'field-b', 'field-c']);

  const redirected = reviewHelpers.redirectMergeDependents(fields, 'field-b', 'field-c');
  assert.equal(redirected.find((field) => field.candidateId === 'field-a').mergeTo, 'field-c');
});

test('字段合并环返回明确错误而不是遗漏候选', () => {
  assert.equal(typeof reviewHelpers.analyzeFieldMerges, 'function');
  const analyzed = reviewHelpers.analyzeFieldMerges([
    { candidateId: 'field-a', mergeTo: 'field-b' },
    { candidateId: 'field-b', mergeTo: 'field-a' }
  ]);

  assert.match(analyzed.errors.join('\n'), /循环/);
});

test('未编辑的 role 和 placeholder locator 保持原结构', () => {
  assert.equal(typeof reviewHelpers.buildAssertionPayload, 'function');
  const role = { kind: 'getByRole', value: '保存', role: 'button', options: { name: '保存', exact: true } };
  const placeholder = { kind: 'getByPlaceholder', value: '请输入客户编号' };

  assert.deepEqual(reviewHelpers.buildAssertionPayload({ type: 'visible', target: '保存', originalTarget: '保存', locator: role }).locator, role);
  assert.deepEqual(reviewHelpers.buildAssertionPayload({ type: 'value', target: '请输入客户编号', originalTarget: '请输入客户编号', expected: 'C001', locator: placeholder }).locator, placeholder);
});

test('编辑断言目标和切换 URL 类型会生成兼容 locator', () => {
  assert.equal(typeof reviewHelpers.buildAssertionPayload, 'function');
  const editedRole = reviewHelpers.buildAssertionPayload({
    type: 'visible',
    target: '提交',
    originalTarget: '保存',
    locator: { kind: 'getByRole', value: '保存', role: 'button', options: { name: '保存' } }
  });
  assert.deepEqual(editedRole.locator, { kind: 'getByRole', value: '提交', role: 'button', options: { name: '提交' } });

  const asUrl = reviewHelpers.buildAssertionPayload({ type: 'url', target: '', expected: '/success', locator: editedRole.locator });
  assert.deepEqual(asUrl.locator, { kind: 'page' });

  const fromUrl = reviewHelpers.buildAssertionPayload({ type: 'value', target: '客户编号', expected: 'C001', locator: { kind: 'page' } });
  assert.deepEqual(fromUrl.locator, { kind: 'getByLabel', value: '客户编号' });
});

test('切换为 value 断言时即使目标未变也重建输入型 locator', () => {
  assert.equal(typeof reviewHelpers.buildAssertionPayload, 'function');
  const payload = reviewHelpers.buildAssertionPayload({
    type: 'value',
    target: '客户编号',
    originalTarget: '客户编号',
    expected: 'C001',
    locator: { kind: 'getByText', value: '客户编号' }
  });

  assert.deepEqual(payload.locator, { kind: 'getByLabel', value: '客户编号' });
});
