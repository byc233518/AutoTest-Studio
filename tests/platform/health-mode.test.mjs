import test from 'node:test';import assert from 'node:assert/strict';import { createTestContext } from './helpers/test-context.mjs';
test('健康检查返回当前 Runner 模式',async t=>{const ctx=await createTestContext(t);const response=await ctx.fetch('/api/health');assert.equal(response.status,200);assert.equal((await response.json()).runMode,'mock')});
