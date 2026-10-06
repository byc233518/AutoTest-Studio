import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { scenarioRequiresDataset } from '../../server/platform/datasets.mjs';
import { createTestContext } from './helpers/test-context.mjs';

test('没有数据字段时不要求测试数据', () => {
  assert.equal(scenarioRequiresDataset({ data_schema: '{"columns":[],"required":[]}' }), false);
  assert.equal(scenarioRequiresDataset({ dataSchema: { columns: ['关键字'], required: ['关键字'] } }), true);
});

async function uploadCustomerDataset(ctx, cookie, suffix) {
  const form = new FormData();
  const csv = [
    '记录编码,记录名称,经办人,分类,说明',
    `AT-${suffix},示例记录${suffix},测试员,自动化,上海`
  ].join('\n');
  form.append('file', new Blob([csv], { type: 'text/csv' }), `records-${suffix}.csv`);
  form.append('name', `表单回归样本${suffix}`);
  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(response.status, 201);
  return response.json();
}

const migrationRequest = {
  targetSchema: {
    columns: ['档案编码', '记录名称', '启用'],
    required: ['档案编码', '启用'],
    example: { 档案编码: '', 记录名称: '', 启用: '是' }
  },
  mappings: [{ from: '记录编码', to: '档案编码' }],
  defaults: { 启用: '是' }
};

function migrationTargetDir(ctx, scenarioId) {
  return path.resolve(ctx.app.locals.paths.uploadsDir, scenarioId);
}

function assertWithinUploads(ctx, filePath) {
  const relative = path.relative(ctx.app.locals.paths.uploadsDir, filePath);
  assert.ok(relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), filePath);
}

test('测试人员可以上传 CSV 样本数据并创建执行任务', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const csv = '\uFEFF记录编码,记录名称,经办人,分类,说明\nAT-001,示例记录001,测试员,自动化,上海\n';
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'records.csv');
  form.append('name', '表单回归样本');

  const upload = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', {
    method: 'POST',
    headers: { cookie },
    body: form
  });

  assert.equal(upload.status, 201);
  const dataset = await upload.json();
  assert.equal(dataset.name, '表单回归样本');
  assert.equal(dataset.rowCount, 1);
  assert.equal(dataset.validationStatus, 'valid');

  const loaded = await ctx.fetch(`/api/scenarios/sample-form-submit/datasets/${dataset.id}`, {
    headers: { cookie }
  });
  assert.equal(loaded.status, 200);
  const loadedBody = await loaded.json();
  assert.equal(loadedBody.id, dataset.id);
  assert.deepEqual(loadedBody.rows, [{
    记录编码: 'AT-001',
    记录名称: '示例记录001',
    经办人: '测试员',
    分类: '自动化',
    说明: '上海'
  }]);

  const run = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test' })
  });

  assert.equal(run.status, 202);
  const runBody = await run.json();
  assert.match(runBody.runId, /^RUN-/);
  assert.equal(runBody.status, 'queued');
  assert.equal(runBody.executionMode, 'ui');

  await ctx.waitForRun(runBody.runId);
});

test('Excel 或 CSV 导入先解析到统一表格且不会直接创建数据集', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const csv = '记录编码,记录名称,经办人,分类,说明\nAT-002,预览客户,李四,经销商,苏州\n';
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'preview.csv');

  const preview = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/preview', {
    method: 'POST',
    headers: { cookie },
    body: form
  });
  assert.equal(preview.status, 200);
  const body = await preview.json();
  assert.equal(body.fileName, 'preview.csv');
  assert.equal(body.rows.length, 1);
  assert.equal(body.rows[0].记录编码, 'AT-002');

  const datasets = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', { headers: { cookie } });
  assert.equal(datasets.status, 200);
  assert.equal((await datasets.json()).length, 0);
});

test('JSON 对象数组可以导入统一表格', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const rows = [{
    记录编码: 'AT-JSON',
    记录名称: 'JSON 客户',
    经办人: '测试员',
    分类: '自动化',
    说明: '深圳'
  }];
  form.append('file', new Blob([JSON.stringify({ rows })], { type: 'application/json' }), 'customers.json');

  const preview = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/preview', {
    method: 'POST',
    headers: { cookie },
    body: form
  });

  assert.equal(preview.status, 200);
  assert.deepEqual((await preview.json()).rows, rows);
});

test('可以下载包含当前场景字段和示例行的 Excel 模板', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/template.xlsx', {
    headers: { cookie }
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /spreadsheetml/);
  assert.match(response.headers.get('content-disposition') || '', /sample-form-submit-template\.xlsx/);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(await response.arrayBuffer()));
  const worksheet = workbook.getWorksheet('测试数据');
  assert.deepEqual(worksheet.getRow(1).values.slice(1), ['记录编码', '记录名称', '经办人', '分类', '说明']);
  assert.equal(worksheet.getCell('A2').value, 'AT-001');
  assert.equal(worksheet.getCell('A1').note, '必填字段');
});

test('创建执行任务时可以选择有头模式和 UI 模式', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);

  const headed = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionMode: 'headed' })
  });
  assert.equal(headed.status, 202);
  const headedBody = await headed.json();
  assert.equal(headedBody.executionMode, 'headed');

  const ui = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionMode: 'ui' })
  });
  assert.equal(ui.status, 202);
  const uiBody = await ui.json();
  assert.equal(uiBody.executionMode, 'ui');

  await ctx.waitForRun(headedBody.runId);
  await ctx.waitForRun(uiBody.runId);
});

test('创建执行任务时拒绝未知执行模式', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const dataset = await ctx.uploadCustomerDataset(cookie);

  const response = await ctx.fetch('/api/runs', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ scenarioId: dataset.scenarioId, datasetId: dataset.id, environment: 'test', executionMode: 'debugger' })
  });

  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, '执行模式无效');
});

test('上传缺少必填列的样本数据会返回校验错误', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const form = new FormData();
  const csv = '记录名称,经办人\n示例记录001,测试员\n';
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'bad-records.csv');
  form.append('name', '错误样本');

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', {
    method: 'POST',
    headers: { cookie },
    body: form
  });

  assert.equal(response.status, 422);
  const body = await response.json();
  assert.equal(body.message, '样本数据校验失败');
  assert.deepEqual(body.errors, ['缺少必填列: 记录编码']);
});

test('字段迁移预览返回新行且不会写入数据集或修改场景 schema', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = await uploadCustomerDataset(ctx, cookie, '101');
  const beforeScenario = await ctx.fetch('/api/scenarios/sample-form-submit', { headers: { cookie } });
  const beforeSchema = (await beforeScenario.json()).dataSchema;

  const preview = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migration-preview', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(preview.status, 200);
  const body = await preview.json();
  assert.deepEqual(body.datasets[0].rows, [{ 档案编码: 'AT-101', 记录名称: '示例记录101', 启用: '是' }]);
  assert.deepEqual(body.datasets[0].errors, []);
  const datasets = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', { headers: { cookie } });
  assert.equal((await datasets.json()).length, 1);
  const afterScenario = await ctx.fetch('/api/scenarios/sample-form-submit', { headers: { cookie } });
  assert.deepEqual((await afterScenario.json()).dataSchema, beforeSchema);
});

test('一次确认可以为多个源数据集原子创建可追溯的新数据集', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const sources = await Promise.all([
    uploadCustomerDataset(ctx, cookie, '201'),
    uploadCustomerDataset(ctx, cookie, '202')
  ]);

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: sources.map((dataset) => dataset.id) })
  });

  assert.equal(response.status, 201);
  const body = await response.json();
  assert.equal(body.datasets.length, 2);
  assert.deepEqual(new Set(body.datasets.map((dataset) => dataset.sourceDatasetId)), new Set(sources.map((dataset) => dataset.id)));
  for (const dataset of body.datasets) {
    assert.deepEqual(dataset.dataSchema.columns, migrationRequest.targetSchema.columns);
    assert.deepEqual(dataset.migration.mappings, migrationRequest.mappings);
    const loaded = await ctx.fetch(`/api/scenarios/sample-form-submit/datasets/${dataset.id}`, { headers: { cookie } });
    assert.equal(loaded.status, 200);
    const loadedBody = await loaded.json();
    assert.equal(loadedBody.rows.length, 1);
    assert.equal(loadedBody.rows[0].启用, '是');
  }
  const all = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', { headers: { cookie } });
  assert.equal((await all.json()).length, 4);
  for (const source of sources) {
    const loaded = await ctx.fetch(`/api/scenarios/sample-form-submit/datasets/${source.id}`, { headers: { cookie } });
    assert.ok(Object.hasOwn((await loaded.json()).rows[0], '记录编码'));
  }
});

test('任一数据集迁移校验失败时不创建数据库记录或文件', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const sources = await Promise.all([
    uploadCustomerDataset(ctx, cookie, '301'),
    uploadCustomerDataset(ctx, cookie, '302')
  ]);
  const targetDir = migrationTargetDir(ctx, sources[0].scenarioId);
  await mkdir(targetDir, { recursive: true });
  const filesBefore = new Set(await readdir(targetDir));
  const invalidRequest = {
    datasetIds: sources.map((dataset) => dataset.id),
    targetSchema: { columns: ['档案编码', '新增必填'], required: ['档案编码', '新增必填'] },
    mappings: [{ from: '记录编码', to: '档案编码' }],
    defaults: {}
  };

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify(invalidRequest)
  });

  assert.equal(response.status, 422);
  assert.ok((await response.json()).datasets.every((dataset) => dataset.errors.length > 0));
  const all = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', { headers: { cookie } });
  assert.equal((await all.json()).length, 2);
  assert.deepEqual(new Set(await readdir(targetDir)), filesBefore);
});

test('迁移拒绝不属于当前场景的数据集', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = await uploadCustomerDataset(ctx, cookie, '401');

  const response = await ctx.fetch('/api/scenarios/sample-search/datasets/migration-preview', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(response.status, 404);
  assert.equal((await response.json()).message, '测试数据集不属于当前场景');
});

test('迁移写入中断时回滚数据库并清理已创建文件', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const sources = await Promise.all([
    uploadCustomerDataset(ctx, cookie, '501'),
    uploadCustomerDataset(ctx, cookie, '502')
  ]);
  const targetDir = migrationTargetDir(ctx, sources[0].scenarioId);
  await mkdir(targetDir, { recursive: true });
  const filesBefore = new Set(await readdir(targetDir));
  const originalCreateDataset = ctx.app.locals.database.createDataset;
  let calls = 0;
  ctx.app.locals.database.createDataset = function createDatasetWithFailure(dataset) {
    calls += 1;
    if (calls === 2) throw new Error('模拟数据库写入失败');
    return originalCreateDataset.call(this, dataset);
  };

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: sources.map((dataset) => dataset.id) })
  });

  assert.equal(response.status, 500);
  const all = await ctx.fetch('/api/scenarios/sample-form-submit/datasets', { headers: { cookie } });
  assert.equal((await all.json()).length, 2);
  assert.deepEqual(new Set(await readdir(targetDir)), filesBefore);
});

test('创建场景拒绝非法业务 key', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');

  const response = await ctx.fetch('/api/scenarios', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ key: '../outside', name: '非法场景' })
  });

  assert.equal(response.status, 400);
  assert.equal((await response.json()).message, '场景 key 只能包含小写字母、数字和连字符，且不能以连字符开头或结尾');
  assert.equal(ctx.app.locals.database.getScenarioByKey('../outside'), undefined);
});

test('迁移旧的非法场景 key 时文件仍限制在 uploads 目录内', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = await uploadCustomerDataset(ctx, cookie, '601');
  const maliciousKey = '../outside';
  ctx.app.locals.database.raw.prepare('UPDATE scenarios SET key = ? WHERE id = ?').run(maliciousKey, source.scenarioId);

  const response = await ctx.fetch(`/api/scenarios/${encodeURIComponent(maliciousKey)}/datasets/migrate`, {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(response.status, 201);
  const migrated = (await response.json()).datasets[0];
  const row = ctx.app.locals.database.getDatasetById(migrated.id);
  assertWithinUploads(ctx, row.rows_path);
  assert.equal(path.dirname(row.rows_path), migrationTargetDir(ctx, source.scenarioId));
});

test('迁移文件 ID 首次碰撞时重试且不覆盖旧数据库和旧文件', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = await uploadCustomerDataset(ctx, cookie, '701');
  const targetDir = migrationTargetDir(ctx, source.scenarioId);
  await mkdir(targetDir, { recursive: true });
  const collisionPath = path.join(targetDir, `${source.id}.json`);
  await writeFile(collisionPath, '旧文件内容', { encoding: 'utf8', flag: 'wx' });
  const originalNextId = ctx.app.locals.database.nextId;
  let calls = 0;
  ctx.app.locals.database.nextId = function nextIdWithCollision(prefix) {
    calls += 1;
    return calls === 1 ? source.id : originalNextId.call(this, prefix);
  };

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(response.status, 201);
  const migrated = (await response.json()).datasets[0];
  assert.notEqual(migrated.id, source.id);
  assert.equal(await readFile(collisionPath, 'utf8'), '旧文件内容');
  assert.equal(ctx.app.locals.database.getDatasetById(source.id).name, source.name);
});

test('仅数据库存在全局 ID 碰撞时迁移会重试且不创建碰撞文件', async (t) => {
  const ctx = await createTestContext(t);
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = await uploadCustomerDataset(ctx, cookie, '751');
  const targetDir = migrationTargetDir(ctx, source.scenarioId);
  await mkdir(targetDir, { recursive: true });
  const collisionPath = path.join(targetDir, `${source.id}.json`);
  const originalNextId = ctx.app.locals.database.nextId;
  let calls = 0;
  ctx.app.locals.database.nextId = function nextIdWithDatabaseCollision(prefix) {
    calls += 1;
    return calls === 1 ? source.id : originalNextId.call(this, prefix);
  };

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(response.status, 201);
  const migrated = (await response.json()).datasets[0];
  assert.notEqual(migrated.id, source.id);
  assert.equal(ctx.app.locals.database.getDatasetById(source.id).name, source.name);
  await assert.rejects(readFile(collisionPath, 'utf8'), { code: 'ENOENT' });
});

test('第二个迁移文件真实写入失败时仅清理本请求已创建文件', async (t) => {
  const writtenPaths = [];
  let writes = 0;
  const ctx = await createTestContext(t, {
    migrationWriteFile: async (...args) => {
      writes += 1;
      if (writes === 2) throw new Error('模拟第二个文件写入失败');
      await writeFile(...args);
      writtenPaths.push(args[0]);
    }
  });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const sources = await Promise.all([
    uploadCustomerDataset(ctx, cookie, '801'),
    uploadCustomerDataset(ctx, cookie, '802')
  ]);
  const targetDir = migrationTargetDir(ctx, sources[0].scenarioId);
  await mkdir(targetDir, { recursive: true });
  const existingPath = path.join(targetDir, 'existing.json');
  await writeFile(existingPath, '既有文件', { encoding: 'utf8', flag: 'wx' });

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: sources.map((dataset) => dataset.id) })
  });

  assert.equal(response.status, 500);
  assert.equal(ctx.app.locals.database.listDatasets(sources[0].scenarioId).length, 2);
  assert.equal(await readFile(existingPath, 'utf8'), '既有文件');
  assert.equal(writtenPaths.length, 1);
  await assert.rejects(readFile(writtenPaths[0], 'utf8'), { code: 'ENOENT' });
});

test('排他写入创建部分文件后抛错时 helper 立即清理 candidate', async (t) => {
  let candidatePath = '';
  const ctx = await createTestContext(t, {
    migrationWriteFile: async (filePath, data, options) => {
      candidatePath = filePath;
      await writeFile(filePath, data.slice(0, 8), options);
      throw new Error('模拟部分文件写入后失败');
    }
  });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const source = await uploadCustomerDataset(ctx, cookie, '851');
  const targetDir = migrationTargetDir(ctx, source.scenarioId);

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(response.status, 500);
  assert.ok(candidatePath);
  assert.deepEqual(await readdir(targetDir), []);
  await assert.rejects(readFile(candidatePath, 'utf8'), { code: 'ENOENT' });
  assert.equal(ctx.app.locals.database.listDatasets(source.scenarioId).length, 1);
});

test('文件写入后发生事务期全局 ID 竞争时返回 409 并保留竞争方记录', async (t) => {
  let ctx;
  let source;
  let candidatePath = '';
  const competingId = 'DS-CONCURRENT-CONFLICT';
  ctx = await createTestContext(t, {
    migrationWriteFile: async (filePath, data, options) => {
      candidatePath = filePath;
      await writeFile(filePath, data, options);
      const sourceRow = ctx.app.locals.database.getDatasetById(source.id);
      ctx.app.locals.database.createDataset({
        id: competingId,
        scenarioId: source.scenarioId,
        name: '竞争请求数据集',
        fileName: sourceRow.file_name,
        filePath: sourceRow.file_path,
        rowsPath: sourceRow.rows_path,
        rowCount: sourceRow.row_count,
        validationStatus: 'valid',
        uploadedBy: 'competing-request',
        errors: [],
        schemaSnapshot: migrationRequest.targetSchema,
        sourceDatasetId: source.id,
        migration: {}
      });
    }
  });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  source = await uploadCustomerDataset(ctx, cookie, '852');
  ctx.app.locals.database.nextId = () => competingId;

  const response = await ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [source.id] })
  });

  assert.equal(response.status, 409);
  assert.equal((await response.json()).message, '数据集 ID 冲突，请重试');
  assert.equal(ctx.app.locals.database.getDatasetById(competingId).name, '竞争请求数据集');
  await assert.rejects(readFile(candidatePath, 'utf8'), { code: 'ENOENT' });
});

test('两个并发迁移和一个常规数据集写入互不回滚', async (t) => {
  const ctx = await createTestContext(t, {
    migrationWriteFile: async (...args) => {
      await new Promise((resolve) => setImmediate(resolve));
      return writeFile(...args);
    }
  });
  const cookie = await ctx.loginCookie('tester', 'Tester123!');
  const sources = await Promise.all([
    uploadCustomerDataset(ctx, cookie, '901'),
    uploadCustomerDataset(ctx, cookie, '902')
  ]);
  const migration = (datasetId) => ctx.fetch('/api/scenarios/sample-form-submit/datasets/migrate', {
    method: 'POST',
    headers: { cookie, 'content-type': 'application/json' },
    body: JSON.stringify({ ...migrationRequest, datasetIds: [datasetId] })
  });

  const [first, second, regular] = await Promise.all([
    migration(sources[0].id),
    migration(sources[1].id),
    uploadCustomerDataset(ctx, cookie, '903')
  ]);

  assert.equal(first.status, 201);
  assert.equal(second.status, 201);
  assert.equal(regular.name, '表单回归样本903');
  assert.equal(ctx.app.locals.database.listDatasets(sources[0].scenarioId).length, 5);
});
