import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { stripAnsi } from '../../scripts/summarize-results.mjs';

test('示例脚本过程步骤会推进到打开页面，而不是停在读取样本数据', async () => {
  const source = await readFile('tests/support/bing.js', 'utf8');
  assert.match(source, /stepId: 'browser'/);
  assert.match(source, /stepId: 'scenario'/);
  assert.match(source, /\/search/);
});

test('接口文案不再使用乱码中文', async () => {
  const source = await readFile('server/app.mjs', 'utf8');
  assert.match(source, /请先登录/);
  assert.match(source, /执行环境不存在/);
  assert.match(source, /等待执行引擎启动/);
  assert.doesNotMatch(source, /鎵ц/);
  assert.doesNotMatch(source, /璇烽€/);
  assert.doesNotMatch(source, /鎶ュ憡/);
  assert.doesNotMatch(source, /杩囩▼/);
  assert.doesNotMatch(source, /\?\? Runner \?\?/);
  assert.doesNotMatch(source, /Trace \?\?\?/);
});

test('执行失败详情会去掉 ANSI 颜色码', () => {
  const raw = 'Error: \u001b[2mexpect(\u001b[22m\u001b[31mpage\u001b[39m).toHaveURL failed';
  assert.equal(stripAnsi(raw), 'Error: expect(page).toHaveURL failed');
});
