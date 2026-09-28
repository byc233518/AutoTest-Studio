import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { DatabaseSync } from 'node:sqlite';
import { createPlatformDatabase } from '../../server/platform/database.mjs';
import { createRun, executeRun } from '../../server/platform/runner.mjs';
import { createTestContext } from './helpers/test-context.mjs';

test('环境列表包含两个种子环境且密码脱敏', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/environments', { headers: { cookie } });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.environments.length >= 2, true);
  assert.deepEqual(
    body.environments.map((env) => env.key).slice(0, 2),
    ['test', 'staging']
  );
  assert.equal(body.environments.every((env) => env.password === undefined), true);
  assert.equal(body.environments.every((env) => env.passwordMasked === '********'), true);
  assert.equal(body.environments.every((env) => Array.isArray(env.variables)), true);
  assert.deepEqual(body.environments.find((env) => env.key === 'test').variables, []);
  assert.equal(body.environments.find((env) => env.key === 'test').isDefault, true);
});

test('任意登录用户都可以创建新环境', async (t) => {
  const ctx = await createTestContext(t);
  const testerCookie = await ctx.loginCookie('tester', 'Tester123!');

  const created = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'dev',
      name: '开发环境',
      baseUrl: 'http://127.0.0.1:3000',
      username: 'byc',
      password: 'Abcd1234',
      variables: [
        { key: 'warehouseCode', value: 'WH-DEV-01' },
        { key: 'approvalRequired', value: false }
      ],
      sort: 3
    })
  });
  assert.equal(created.status, 201);
  const env = await created.json();
  assert.equal(env.key, 'dev');
  assert.equal(env.passwordMasked, '********');
  assert.equal(env.password, undefined);
  assert.deepEqual(env.variables, [
    { key: 'warehouseCode', value: 'WH-DEV-01' },
    { key: 'approvalRequired', value: false }
  ]);

  const updated = await ctx.fetch(`/api/environments/${env.id}`, {
    method: 'PUT',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '开发环境 A',
      variables: [{ key: 'tenantId', value: 'TENANT-A' }]
    })
  });
  assert.equal(updated.status, 200);
  assert.deepEqual((await updated.json()).variables, [{ key: 'tenantId', value: 'TENANT-A' }]);

  const renamed = await ctx.fetch(`/api/environments/${env.id}`, {
    method: 'PUT',
    headers: { cookie: testerCookie, 'content-type': 'application/json' },
    body: JSON.stringify({ name: '开发环境 B' })
  });
  assert.equal(renamed.status, 200);
  assert.deepEqual((await renamed.json()).variables, [{ key: 'tenantId', value: 'TENANT-A' }]);
});

test('环境全局变量拒绝非法标识、危险键、重名和非标量值', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const cases = [
    ['非数组', { tenantId: 'A' }],
    ['空值', null],
    ['非法标识', [{ key: 'tenant-id', value: 'A' }]],
    ['危险键', [{ key: '__proto__', value: 'A' }]],
    ['重名', [{ key: 'tenantId', value: 'A' }, { key: 'tenantId', value: 'B' }]],
    ['缺少值', [{ key: 'tenantId' }]],
    ['非标量值', [{ key: 'tenantId', value: { nested: true } }]]
  ];

  for (const [label, variables] of cases) {
    await t.test(label, async () => {
      const response = await ctx.fetch('/api/environments', {
        method: 'POST',
        headers: { cookie, 'content-type': 'application/json' },
        body: JSON.stringify({
          key: `invalid-${label}`,
          name: label,
          baseUrl: 'http://127.0.0.1:3000',
          username: 'tester',
          password: 'secret',
          variables
        })
      });
      assert.equal(response.status, 400);
    });
  }
});

test('旧数据库环境表自动补充 variables_json 并默认为空数组', async (t) => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-env-migration-'));
  const databasePath = path.resolve(rootDir, 'legacy.sqlite');
  const legacy = new DatabaseSync(databasePath);
  legacy.exec(`
    CREATE TABLE environments (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      base_url TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      sort INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    INSERT INTO environments
      (id, key, name, base_url, username, password, is_default, sort, created_at, updated_at)
    VALUES
      ('ENV-LEGACY', 'legacy', '旧环境', 'http://127.0.0.1', 'tester', 'secret', 1, 1, '2026-01-01', '2026-01-01');
  `);
  legacy.close();

  const database = createPlatformDatabase(databasePath);
  t.after(async () => {
    database.close();
    await rm(rootDir, { recursive: true, force: true });
  });

  const columns = database.raw.prepare('PRAGMA table_info(environments)').all().map((column) => column.name);
  assert.equal(columns.includes('variables_json'), true);
  assert.equal(database.getEnvironmentByKey('legacy').variables_json, '[]');
});

test('默认环境始终保留且环境改名会同步所有执行引用', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const createdResponse = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'plan-env',
      name: '计划环境',
      baseUrl: 'http://127.0.0.1:3001',
      username: 'tester',
      password: 'secret',
      isDefault: true
    })
  });
  assert.equal(createdResponse.status, 201);
  const createdEnvironment = await createdResponse.json();

  const unsetDefault = await ctx.fetch(`/api/environments/${createdEnvironment.id}`, {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ isDefault: false })
  });
  assert.equal(unsetDefault.status, 409);
  const afterUnset = await (await ctx.fetch('/api/environments', { headers: { cookie } })).json();
  assert.equal(afterUnset.environments.filter((item) => item.isDefault).length, 1);
  const originalDefault = afterUnset.environments.find((item) => item.key === 'test');
  const restoreDefault = await ctx.fetch(`/api/environments/${originalDefault.id}`, {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ isDefault: true })
  });
  assert.equal(restoreDefault.status, 200);

  const catalog = await (await ctx.fetch('/api/scenarios', { headers: { cookie } })).json();
  const scenario = catalog.scenarios[0];
  const planResponse = await ctx.fetch('/api/test-plans', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      name: '环境引用计划',
      environment: 'plan-env',
      executionMode: 'headless',
      items: [{ scenarioId: scenario.id }]
    })
  });
  assert.equal(planResponse.status, 201);
  const plan = await planResponse.json();
  const database = ctx.app.locals.database;
  const referencedRun = database.createRun({
    id: database.nextId('RUN'),
    scenarioId: scenario.id,
    datasetId: 'DST-ENV-REFERENCE',
    environment: 'plan-env',
    executionMode: 'headless',
    status: 'queued',
    triggeredBy: 'tester',
    summary: {}
  });
  const referencedPlanRun = database.createTestPlanRun({
    id: database.nextId('TPR'),
    testPlanId: plan.id,
    environment: 'plan-env',
    executionMode: 'headless',
    status: 'queued',
    triggeredBy: 'tester',
    planSnapshot: {}
  }, []);

  const renamed = await ctx.fetch(`/api/environments/${createdEnvironment.id}`, {
    method: 'PUT',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: 'plan-env-renamed' })
  });
  assert.equal(renamed.status, 200);
  const renamedPlan = await (await ctx.fetch(`/api/test-plans/${plan.id}`, { headers: { cookie } })).json();
  assert.equal(renamedPlan.environment, 'plan-env-renamed');
  assert.equal(database.getRunById(referencedRun.id).environment, 'plan-env-renamed');
  assert.equal(database.getTestPlanRunById(referencedPlanRun.id).environment, 'plan-env-renamed');

  const blockedDelete = await ctx.fetch(`/api/environments/${createdEnvironment.id}`, {
    method: 'DELETE',
    headers: { cookie }
  });
  assert.equal(blockedDelete.status, 409);
  assert.deepEqual(await blockedDelete.json().then(({ testPlanCount, activeRunCount, activePlanRunCount }) => ({
    testPlanCount,
    activeRunCount,
    activePlanRunCount
  })), { testPlanCount: 1, activeRunCount: 1, activePlanRunCount: 1 });

  assert.equal((await ctx.fetch(`/api/test-plans/${plan.id}`, { method: 'DELETE', headers: { cookie } })).status, 204);
  database.updateRun(referencedRun.id, { status: 'passed' });
  database.updateTestPlanRun(referencedPlanRun.id, { status: 'passed' });
  assert.equal((await ctx.fetch(`/api/environments/${createdEnvironment.id}`, { method: 'DELETE', headers: { cookie } })).status, 204);
  const finalEnvironments = await (await ctx.fetch('/api/environments', { headers: { cookie } })).json();
  assert.equal(finalEnvironments.environments.filter((item) => item.isDefault).length, 1);
});

test('环境存在排队或运行中的普通执行时禁止删除', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'active-run-env',
      name: '普通执行环境',
      baseUrl: 'http://127.0.0.1:3002',
      username: 'tester',
      password: 'secret'
    })
  });
  assert.equal(created.status, 201);
  const environment = await created.json();
  const database = ctx.app.locals.database;
  const scenario = database.listScenarios()[0];
  const run = database.createRun({
    id: database.nextId('RUN'),
    scenarioId: scenario.id,
    datasetId: 'DST-ACTIVE-REFERENCE',
    environment: environment.key,
    executionMode: 'headless',
    status: 'running',
    triggeredBy: 'tester',
    summary: {}
  });

  const blocked = await ctx.fetch(`/api/environments/${environment.id}`, { method: 'DELETE', headers: { cookie } });
  assert.equal(blocked.status, 409);
  assert.deepEqual(await blocked.json().then(({ testPlanCount, activeRunCount, activePlanRunCount }) => ({
    testPlanCount,
    activeRunCount,
    activePlanRunCount
  })), { testPlanCount: 0, activeRunCount: 1, activePlanRunCount: 0 });

  database.updateRun(run.id, { status: 'passed' });
  assert.equal((await ctx.fetch(`/api/environments/${environment.id}`, { method: 'DELETE', headers: { cookie } })).status, 204);
});

test('环境存在排队或运行中的测试计划批次时禁止删除', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const created = await ctx.fetch('/api/environments', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({
      key: 'active-plan-run-env',
      name: '计划批次环境',
      baseUrl: 'http://127.0.0.1:3003',
      username: 'tester',
      password: 'secret'
    })
  });
  assert.equal(created.status, 201);
  const environment = await created.json();
  const database = ctx.app.locals.database;
  const planRun = database.createTestPlanRun({
    id: database.nextId('TPR'),
    testPlanId: 'TPL-ACTIVE-REFERENCE',
    environment: environment.key,
    executionMode: 'headless',
    status: 'queued',
    triggeredBy: 'tester',
    planSnapshot: {}
  }, []);

  const blocked = await ctx.fetch(`/api/environments/${environment.id}`, { method: 'DELETE', headers: { cookie } });
  assert.equal(blocked.status, 409);
  assert.deepEqual(await blocked.json().then(({ testPlanCount, activeRunCount, activePlanRunCount }) => ({
    testPlanCount,
    activeRunCount,
    activePlanRunCount
  })), { testPlanCount: 0, activeRunCount: 0, activePlanRunCount: 1 });

  database.updateTestPlanRun(planRun.id, { status: 'passed' });
  assert.equal((await ctx.fetch(`/api/environments/${environment.id}`, { method: 'DELETE', headers: { cookie } })).status, 204);
});

test('执行任务引用不存在的环境时直接失败', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const uploaded = await ctx.uploadCustomerDataset(cookie);
  const database = ctx.app.locals.database;
  const scenario = database.getScenarioByKey('wms-customer-create');
  const dataset = database.getDatasetById(uploaded.id);
  const run = createRun(database, {
    scenario,
    dataset,
    environment: 'missing-environment',
    executionMode: 'headless',
    triggeredBy: 'tester'
  });

  await executeRun(ctx.app, run.id);

  const failed = database.getRunById(run.id);
  assert.equal(failed.status, 'failed');
  assert.match(failed.error, /执行环境不存在：missing-environment/);
});

test('旧数据库存在多个或没有默认环境时启动会修复为一个默认环境', async (t) => {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'autotest-env-default-repair-'));
  const databasePath = path.resolve(rootDir, 'legacy.sqlite');
  const legacy = new DatabaseSync(databasePath);
  legacy.exec(`
    CREATE TABLE environments (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      base_url TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      is_default INTEGER NOT NULL DEFAULT 0,
      sort INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    INSERT INTO environments
      (id, key, name, base_url, username, password, is_default, sort, created_at, updated_at)
    VALUES
      ('ENV-A', 'env-a', '环境 A', 'http://a', 'tester', 'secret', 1, 2, '2026-01-01', '2026-01-01'),
      ('ENV-B', 'env-b', '环境 B', 'http://b', 'tester', 'secret', 1, 1, '2026-01-01', '2026-01-01');
  `);
  legacy.close();

  let database = createPlatformDatabase(databasePath);
  assert.deepEqual(database.listEnvironments().filter((item) => item.is_default).map((item) => item.key), ['env-b']);
  database.close();

  const mutate = new DatabaseSync(databasePath);
  mutate.exec('UPDATE environments SET is_default = 0');
  mutate.close();
  database = createPlatformDatabase(databasePath);
  t.after(async () => {
    database.close();
    await rm(rootDir, { recursive: true, force: true });
  });
  assert.deepEqual(database.listEnvironments().filter((item) => item.is_default).map((item) => item.key), ['env-b']);
});

test('执行与录制界面使用项目默认环境而不回退到固定 test key', async () => {
  const [runDialog, scenarioDrawer] = await Promise.all([
    readFile('frontend/src/components/RunDialog.vue', 'utf8'),
    readFile('frontend/src/components/ScenarioDrawer.vue', 'utf8')
  ]);
  assert.match(runDialog, /projectDefaultEnvironment\(\)/);
  assert.doesNotMatch(runDialog, /\|\|'test'/);
  assert.match(scenarioDrawer, /store\.environments\.find\(\(entry\) => entry\.isDefault\)\?\.key/);
  assert.match(scenarioDrawer, /store\.environments\[0\]\?\.key \|\| ''/);
  assert.doesNotMatch(scenarioDrawer, /ref\('test'\)|\|\|'test'/);
});
