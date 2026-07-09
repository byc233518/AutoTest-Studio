import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPlaywrightCliArgs, normalizeExecutionMode } from '../../server/platform/execution-mode.mjs';

test('执行模式默认使用无头模式', () => {
  assert.equal(normalizeExecutionMode(), 'headless');
  assert.deepEqual(buildPlaywrightCliArgs('headless'), []);
});

test('有头模式会转换为 Playwright headed 参数', () => {
  assert.equal(normalizeExecutionMode('headed'), 'headed');
  assert.deepEqual(buildPlaywrightCliArgs('headed'), ['--headed']);
});

test('UI 模式会转换为可实时观察的 headed 参数', () => {
  assert.equal(normalizeExecutionMode('ui'), 'ui');
  assert.deepEqual(buildPlaywrightCliArgs('ui'), ['--headed']);
});

test('未知执行模式会被拒绝', () => {
  assert.throws(() => normalizeExecutionMode('debugger'), /执行模式无效/);
});
