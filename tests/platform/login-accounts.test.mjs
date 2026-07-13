import test from 'node:test';import assert from 'node:assert/strict';import { readFile } from 'node:fs/promises';
test('登录页列出三个开发测试账号并支持快捷选择',async()=>{const source=await readFile('frontend/src/views/LoginView.vue','utf8');assert.match(source,/tester/);assert.match(source,/maintainer/);assert.match(source,/admin/);assert.match(source,/selectAccount/);assert.match(source,/临时显示/)});
