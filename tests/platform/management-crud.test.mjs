import assert from 'node:assert/strict';
import test from 'node:test';
import { createTestContext } from './helpers/test-context.mjs';

const jsonHeaders = (cookie) => ({ cookie, 'content-type': 'application/json' });

test('maintainer 可以新增、编辑、删除应用和模块，tester 无权维护', async (t) => {
  const ctx = await createTestContext(t);
  const maintainer = await ctx.loginCookie('maintainer', 'Maintainer123!');
  const tester = await ctx.loginCookie('tester', 'Tester123!');

  const forbidden = await ctx.fetch('/api/apps', {
    method: 'POST',
    headers: jsonHeaders(tester),
    body: JSON.stringify({ key: 'forbidden-app', name: '无权应用' })
  });
  assert.equal(forbidden.status, 403);

  const createdAppResponse = await ctx.fetch('/api/apps', {
    method: 'POST',
    headers: jsonHeaders(maintainer),
    body: JSON.stringify({ key: 'crud-app', name: 'CRUD 应用', description: '初始说明', sort: 20 })
  });
  assert.equal(createdAppResponse.status, 201);
  const createdApp = await createdAppResponse.json();
  assert.equal(createdApp.key, 'crud-app');

  const updatedAppResponse = await ctx.fetch(`/api/apps/${createdApp.id}`, {
    method: 'PUT',
    headers: jsonHeaders(maintainer),
    body: JSON.stringify({ name: 'CRUD 应用已更新', sort: 21 })
  });
  assert.equal(updatedAppResponse.status, 200);
  assert.equal((await updatedAppResponse.json()).name, 'CRUD 应用已更新');

  const createdModuleResponse = await ctx.fetch('/api/modules', {
    method: 'POST',
    headers: jsonHeaders(maintainer),
    body: JSON.stringify({ appId: createdApp.id, name: 'CRUD 模块', prefix: 'Crud', sort: 1 })
  });
  assert.equal(createdModuleResponse.status, 201);
  const createdModule = await createdModuleResponse.json();
  assert.equal(createdModule.appId, createdApp.id);

  const updatedModuleResponse = await ctx.fetch(`/api/modules/${createdModule.id}`, {
    method: 'PUT',
    headers: jsonHeaders(maintainer),
    body: JSON.stringify({ name: 'CRUD 模块已更新', prefix: 'CrudUpdated' })
  });
  assert.equal(updatedModuleResponse.status, 200);
  assert.equal((await updatedModuleResponse.json()).prefix, 'CrudUpdated');

  assert.equal((await ctx.fetch(`/api/modules/${createdModule.id}`, {
    method: 'DELETE',
    headers: { cookie: maintainer }
  })).status, 204);
  assert.equal((await ctx.fetch(`/api/apps/${createdApp.id}`, {
    method: 'DELETE',
    headers: { cookie: maintainer }
  })).status, 204);
});

test('删除有关联关系的应用和模块时返回清晰的 409', async (t) => {
  const ctx = await createTestContext(t);
  const maintainer = await ctx.loginCookie('maintainer', 'Maintainer123!');

  const seededAppConflict = await ctx.fetch('/api/apps/APP-WMS', {
    method: 'DELETE',
    headers: { cookie: maintainer }
  });
  assert.equal(seededAppConflict.status, 409);
  const appConflictBody = await seededAppConflict.json();
  assert.match(appConflictBody.message, /关联.*模块|模块.*关联/);
  assert.equal(appConflictBody.references.modules > 0, true);
  assert.equal(appConflictBody.references.scenarios > 0, true);

  const moduleConflict = await ctx.fetch('/api/modules/MOD-WMS-CUSTOMER', {
    method: 'DELETE',
    headers: { cookie: maintainer }
  });
  assert.equal(moduleConflict.status, 409);
  const moduleConflictBody = await moduleConflict.json();
  assert.match(moduleConflictBody.message, /关联.*场景|场景.*关联/);
  assert.equal(moduleConflictBody.scenarioCount > 0, true);
});

test('环境仅 admin 可新增、编辑、删除，默认环境禁止删除', async (t) => {
  const ctx = await createTestContext(t);
  const admin = await ctx.loginCookie('admin', 'Admin123!');
  const maintainer = await ctx.loginCookie('maintainer', 'Maintainer123!');

  const forbidden = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: jsonHeaders(maintainer),
    body: JSON.stringify({
      key: 'maintainer-env', name: '维护员环境', baseUrl: 'http://localhost', username: 'u', password: 'p'
    })
  });
  assert.equal(forbidden.status, 403);

  const createdResponse = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: jsonHeaders(admin),
    body: JSON.stringify({
      key: 'crud-env', name: 'CRUD 环境', baseUrl: 'http://localhost:3000', username: 'user', password: 'secret'
    })
  });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();

  const updatedResponse = await ctx.fetch(`/api/environments/${created.id}`, {
    method: 'PUT',
    headers: jsonHeaders(admin),
    body: JSON.stringify({ name: 'CRUD 环境已更新', baseUrl: 'http://localhost:3001' })
  });
  assert.equal(updatedResponse.status, 200);
  assert.equal((await updatedResponse.json()).name, 'CRUD 环境已更新');

  assert.equal((await ctx.fetch(`/api/environments/${created.id}`, {
    method: 'DELETE',
    headers: { cookie: admin }
  })).status, 204);

  const defaultConflict = await ctx.fetch('/api/environments/ENV-TEST', {
    method: 'DELETE',
    headers: { cookie: admin }
  });
  assert.equal(defaultConflict.status, 409);
  assert.match((await defaultConflict.json()).message, /默认环境/);
});
