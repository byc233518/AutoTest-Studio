import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('应用模块和环境管理页面不再按角色进入只读模式', async () => {
  const [catalog, environments] = await Promise.all([
    readFile('frontend/src/views/CatalogManagementView.vue', 'utf8'),
    readFile('frontend/src/views/EnvironmentsView.vue', 'utf8')
  ]);

  assert.doesNotMatch(catalog, /store\.user\?\.role|:readonly="readonly"/);
  assert.doesNotMatch(environments, /store\.user\?\.role|:readonly="readonly"/);
});

test('登录页演示账号不再展示角色分工', async () => {
  const source = await readFile('frontend/src/views/LoginView.vue', 'utf8');

  assert.doesNotMatch(source, /测试人员|场景维护员|管理员|执行场景、维护测试数据|管理场景、应用和模块|管理环境和全部平台配置/);
  assert.match(source, /演示账号/);
  assert.match(source, /tester/);
  assert.match(source, /maintainer/);
  assert.match(source, /admin/);
});
