import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { migrateRows } from '../../server/platform/dataset-migration.mjs';
import { createPlatformDatabase } from '../../server/platform/database.mjs';

test('重命名字段并为新增必填字段应用默认值', () => {
  const result = migrateRows({
    rows: [{ code: 'C001', name: '客户一' }],
    targetSchema: {
      columns: ['customerCode', 'name', 'enabled'],
      required: ['customerCode', 'enabled'],
      example: { customerCode: '', name: '', enabled: '是' }
    },
    mappings: [{ from: 'code', to: 'customerCode' }],
    defaults: { enabled: '是' }
  });

  assert.deepEqual(result.rows, [{ customerCode: 'C001', name: '客户一', enabled: '是' }]);
  assert.deepEqual(result.errors, []);
});

test('保留源数据中的空值并报告必填字段错误', () => {
  const result = migrateRows({
    rows: [{ code: 'C001', enabled: '' }],
    targetSchema: { columns: ['customerCode', 'enabled'], required: ['enabled'], example: {} },
    mappings: [{ from: 'code', to: 'customerCode' }],
    defaults: { enabled: '是' }
  });

  assert.deepEqual(result.rows, [{ customerCode: 'C001', enabled: '' }]);
  assert.deepEqual(result.errors, [{ row: 1, field: 'enabled', message: '必填字段不能为空' }]);
});

test('畸形输入和无效字段映射只返回错误而不抛异常', () => {
  const invalidInputs = [
    null,
    { rows: {}, targetSchema: { columns: ['code'] }, mappings: [], defaults: {} },
    { rows: [], targetSchema: [], mappings: [], defaults: {} },
    { rows: [], targetSchema: { columns: ['code'], fields: [{ key: 'other' }] }, mappings: [], defaults: {} },
    { rows: [], targetSchema: { columns: ['code'], required: ['code', 'code'] }, mappings: [], defaults: {} },
    { rows: [], targetSchema: { columns: ['code'] }, mappings: {}, defaults: {} },
    { rows: [], targetSchema: { columns: ['code'] }, mappings: [], defaults: [] },
    { rows: [{ code: 'C001' }], targetSchema: { columns: ['code'] }, mappings: [{ from: 'code', to: 'code' }, { from: 'code', to: 'code' }], defaults: {} },
    { rows: [{ code: 'C001', name: '客户一' }], targetSchema: { columns: ['code'] }, mappings: [{ from: 'code', to: 'code' }, { from: 'name', to: 'code' }], defaults: {} },
    { rows: [{ code: 'C001' }], targetSchema: { columns: ['code'] }, mappings: [{ from: 'missing', to: 'code' }], defaults: {} },
    { rows: [{ code: 'C001' }], targetSchema: { columns: ['code'] }, mappings: [{ from: 'code', to: 'missing' }], defaults: {} },
    { rows: [{ code: 'C001' }], targetSchema: { columns: ['code'] }, mappings: [{ from: '__proto__', to: 'code' }], defaults: {} },
    { rows: [{ code: 'C001' }], targetSchema: { columns: ['code'] }, mappings: [], defaults: { missing: 'x' } }
  ];

  for (const input of invalidInputs) {
    assert.doesNotThrow(() => migrateRows(input));
    assert.ok(migrateRows(input).errors.length > 0);
  }
});

test('旧 datasets 表重复启动迁移时只新增一次追溯字段', async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), 'autotest-dataset-migration-'));
  const filename = path.join(directory, 'legacy.sqlite');
  t.after(() => rm(directory, { recursive: true, force: true }));
  const legacy = new DatabaseSync(filename);
  legacy.exec(`
    CREATE TABLE datasets (
      id TEXT PRIMARY KEY,
      scenario_id TEXT NOT NULL,
      name TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      rows_path TEXT NOT NULL,
      row_count INTEGER NOT NULL,
      validation_status TEXT NOT NULL,
      uploaded_by TEXT NOT NULL,
      errors TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);
  legacy.close();

  const first = createPlatformDatabase(filename);
  first.close();
  const second = createPlatformDatabase(filename);
  const columns = second.raw.prepare('PRAGMA table_info(datasets)').all();
  second.close();

  assert.equal(columns.filter((column) => column.name === 'schema_snapshot').length, 1);
  assert.equal(columns.filter((column) => column.name === 'source_dataset_id').length, 1);
  assert.equal(columns.filter((column) => column.name === 'migration_json').length, 1);
  assert.equal(columns.find((column) => column.name === 'schema_snapshot').notnull, 1);
  assert.equal(columns.find((column) => column.name === 'migration_json').notnull, 1);
});
