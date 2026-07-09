import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { buttonTextPattern } = require('../support/jmom-ui.js');

test('Element UI 按钮匹配允许中文字符之间存在空格', () => {
  assert.equal(buttonTextPattern('确定').test('确 定'), true);
  assert.equal(buttonTextPattern('保存').test('保 存'), true);
  assert.equal(buttonTextPattern('新增').test('新增'), true);
  assert.equal(buttonTextPattern('新增').test('新 增'), true);
});

test('Element UI 按钮匹配支持多个可选按钮文案', () => {
  const pattern = buttonTextPattern(['确定', '保存']);

  assert.equal(pattern.test('确 定'), true);
  assert.equal(pattern.test('保 存'), true);
  assert.equal(pattern.test('取消'), false);
});
