import assert from 'node:assert/strict';
import test from 'node:test';
import { parse } from 'acorn';
import {
  diffSchemas,
  normalizeSchema,
  synchronizeScriptSchema
} from '../../server/platform/schema-sync.mjs';

test('规范化兼容旧字段模型并补齐 fields', () => {
  assert.deepEqual(normalizeSchema({
    columns: ['code', ' name ', 'code', '', null],
    required: ['code', 'missing', 'code'],
    example: { code: 'C-001', name: '名称' }
  }), {
    columns: ['code', 'name'],
    required: ['code'],
    example: { code: 'C-001', name: '名称' },
    fields: [
      { key: 'code', label: 'code', type: 'text', required: true, example: 'C-001' },
      { key: 'name', label: 'name', type: 'text', required: false, example: '名称' }
    ]
  });
});

test('规范化新字段模型会过滤无效或重复字段', () => {
  assert.deepEqual(normalizeSchema({
    fields: [
      { key: 'code', label: '编码', type: 'number', required: true, example: 1001 },
      { key: 'code', label: '重复' },
      { key: 'name' },
      { key: '   ' },
      null
    ]
  }), {
    columns: ['code', 'name'],
    required: ['code'],
    example: { code: '1001', name: '' },
    fields: [
      { key: 'code', label: '编码', type: 'number', required: true, example: '1001' },
      { key: 'name', label: 'name', type: 'text', required: false, example: '' }
    ]
  });
});

test('比较字段模型能识别映射重命名和属性变化', () => {
  const result = diffSchemas({
    fields: [{ key: 'customerCode', label: '客户编码', type: 'number', required: true, example: '1001' }]
  }, {
    fields: [{ key: 'code', label: '编码', type: 'text', required: false, example: 'C001' }]
  }, [{ from: 'code', to: 'customerCode' }]);

  assert.deepEqual(result.added, []);
  assert.deepEqual(result.removed, []);
  assert.deepEqual(result.renamed, [{ from: 'code', to: 'customerCode' }]);
  assert.deepEqual(result.changed, [{
    key: 'customerCode',
    from: 'code',
    to: 'customerCode',
    changes: {
      required: { script: false, platform: true },
      type: { script: 'text', platform: 'number' },
      label: { script: '编码', platform: '客户编码' },
      example: { script: 'C001', platform: '1001' }
    }
  }]);
  assert.equal(result.hasChanges, true);
});

test('比较字段模型能识别平台新增和脚本删除字段', () => {
  const result = diffSchemas(
    { columns: ['code', 'name'], required: ['code'], example: { code: 'C1', name: '名称' } },
    { columns: ['oldCode'], required: [], example: { oldCode: 'OLD' } }
  );

  assert.deepEqual(result.added.map((field) => field.key), ['code', 'name']);
  assert.deepEqual(result.removed.map((field) => field.key), ['oldCode']);
  assert.deepEqual(result.renamed, []);
  assert.deepEqual(result.changed, []);
  assert.equal(result.hasChanges, true);
});

test('同步会替换脚本 schema 并安全重写 dot 与 bracket 字段引用', () => {
  const source = `export const testDataSchema = {
  columns: ['oldCode'],
  required: ['oldCode'],
  example: { oldCode: 'OLD' }
};

export async function execute(data) {
  return [data.oldCode, data['oldCode']];
}`;

  const result = synchronizeScriptSchema({
    source,
    targetSchema: {
      fields: [{ key: 'customerCode', label: '客户编码', type: 'text', required: true, example: 'C001' }]
    },
    mappings: [{ from: 'oldCode', to: 'customerCode' }]
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.conflicts, []);
  assert.match(result.source, /"fields": \[/);
  assert.match(result.source, /data\['customerCode'\]/);
  assert.doesNotMatch(result.source, /data\.oldCode|data\['oldCode'\]/);
});

test('同步会阻止动态字段访问和 data 别名逃逸', () => {
  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
const alias = data;
export function execute(data, key) {
  return data[key];
}`;

  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'new' }]
  });

  assert.equal(result.ok, false);
  assert.equal(result.source, source);
  assert.deepEqual(result.conflicts.map((conflict) => conflict.kind), ['data-alias', 'dynamic-reference']);
  assert.equal(result.conflicts[1].code, 'dynamic-data-access');
  assert.ok(result.conflicts.every((conflict) => Number.isInteger(conflict.line) && Number.isInteger(conflict.column)));
});

test('同步会拒绝缺少 schema 声明和语法错误', () => {
  const missing = synchronizeScriptSchema({
    source: 'export const value = data.old;',
    targetSchema: { columns: ['new'], required: [], example: { new: '' } }
  });
  assert.equal(missing.ok, false);
  assert.equal(missing.conflicts[0].kind, 'schema');

  const invalid = synchronizeScriptSchema({
    source: 'const testDataSchema = { columns: [ };',
    targetSchema: { columns: ['new'], required: [], example: { new: '' } }
  });
  assert.equal(invalid.ok, false);
  assert.equal(invalid.conflicts[0].kind, 'syntax');
  assert.match(invalid.conflicts[0].message, /语法/);
});

test('同步拒绝展开 data 且恶意或重复映射键不会注入源代码', () => {
  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) {
  return { ...data };
}`;
  const spread = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'new' }]
  });
  assert.equal(spread.ok, false);
  assert.equal(spread.conflicts[0].kind, 'data-spread');

  const safe = synchronizeScriptSchema({
    source: `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) { return data.old; }`,
    targetSchema: {
      columns: ["new']; globalThis.injected = true; //"],
      required: [],
      example: { "new']; globalThis.injected = true; //": '' }
    },
    mappings: [
      { from: 'old', to: "new']; globalThis.injected = true; //" }
    ]
  });
  assert.equal(safe.ok, true);
  assert.match(safe.source, /data\['new\\'\]; globalThis\.injected = true; \/\/'\]/);
  assert.doesNotMatch(safe.source, /globalThis\.injected = true; \/\/\]\s*;/);
});

test('同步遇到 data 作用域遮蔽时保持原文不改写', () => {
  const source = `export const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) {
  function helper() {
    const data = { old: 'local' };
    return data.old;
  }
  return [data.old, helper()];
}`;
  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'new' }]
  });

  assert.equal(result.ok, false);
  assert.equal(result.source, source);
  assert.equal(result.conflicts[0].kind, 'data-shadow');
});

test('同步保留可选链语义且只替换顶层唯一 schema', () => {
  const source = `function helper() {
  const testDataSchema = { columns: ['local'], required: [], example: { local: '' } };
  return testDataSchema;
}
export const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) { return data?.old; }`;
  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'new' }]
  });

  assert.equal(result.ok, true);
  assert.match(result.source, /columns: \['local'\]/);
  assert.match(result.source, /data\?\.\['new'\]/);
  assert.doesNotMatch(result.source, /data\?\.old/);
});

test('同步拒绝重复顶层 schema 和不存在于目标模型的映射字段', () => {
  const duplicate = synchronizeScriptSchema({
    source: `var testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
var testDataSchema = { columns: ['old2'], required: [], example: { old2: '' } };`,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } }
  });
  assert.equal(duplicate.ok, false);
  assert.equal(duplicate.conflicts[0].kind, 'schema');

  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) { return data.old; }`;
  const invalidMapping = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'missing' }]
  });
  assert.equal(invalidMapping.ok, false);
  assert.equal(invalidMapping.source, source);
  assert.equal(invalidMapping.conflicts[0].kind, 'unknown-to');
});

test('同步拒绝 catch 参数对 data 的作用域遮蔽', () => {
  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) {
  try { throw new Error('x'); } catch (data) { return data.old; }
}`;
  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'new' }]
  });

  assert.equal(result.ok, false);
  assert.equal(result.source, source);
  assert.equal(result.conflicts[0].kind, 'data-shadow');
});

test('同步拒绝 import 对 data 的模块绑定', () => {
  const source = `import { payload as data } from './payload.mjs';
const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute() { return data.old; }`;
  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [{ from: 'old', to: 'new' }]
  });

  assert.equal(result.ok, false);
  assert.equal(result.source, source);
  assert.equal(result.conflicts[0].kind, 'data-shadow');
});

test('同步跳过 schema initializer 内的 data 引用，且不抛出重叠替换错误', () => {
  const source = `const testDataSchema = {
  columns: [data.old],
  required: [],
  example: { old: '' }
};
export function execute(data) { return data.old; }`;
  let result;

  assert.doesNotThrow(() => {
    result = synchronizeScriptSchema({
      source,
      targetSchema: { columns: ['new'], required: [], example: { new: '' } },
      mappings: [{ from: 'old', to: 'new' }]
    });
  });
  assert.equal(result.ok, true);
  assert.match(result.source, /"columns": \[\s*"new"/);
  assert.match(result.source, /return data\['new'\]/);
});

test('字段差异报告映射输入错误，同步拒绝重复和幽灵映射', () => {
  const targetSchema = { columns: ['new'], required: [], example: { new: '' } };
  const sourceSchema = { columns: ['old'], required: [], example: { old: '' } };
  const mappings = [
    { from: 'ghost', to: 'new' },
    { from: 'old', to: 'new' },
    { from: 'old', to: 'new' },
    { from: '__proto__', to: 'new' },
    { from: 'old', to: 'constructor' }
  ];
  const diff = diffSchemas(targetSchema, sourceSchema, mappings);
  assert.deepEqual(diff.invalidMappings.map((item) => item.kind), [
    'unknown-from', 'duplicate-to', 'duplicate-from', 'dangerous-key', 'dangerous-key'
  ]);

  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
export function execute(data) { return data.old; }`;
  const result = synchronizeScriptSchema({ source, targetSchema, mappings: mappings.slice(0, 2) });
  assert.equal(result.ok, false);
  assert.equal(result.source, source);
  assert.deepEqual(result.conflicts.map((item) => item.kind), ['unknown-from', 'duplicate-to']);

  const dangerousTarget = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['constructor'], required: [], example: { constructor: '' } }
  });
  assert.equal(dangerousTarget.ok, false);
  assert.equal(dangerousTarget.source, source);
  assert.equal(dangerousTarget.conflicts[0].kind, 'target-schema');
});

test('同步产物可由 Acorn 解析并能在运行时读取重命名字段', () => {
  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };
const execute = (data) => data.old;`;
  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: 'N-001' } },
    mappings: [{ from: 'old', to: 'new' }]
  });

  assert.equal(result.ok, true);
  assert.doesNotThrow(() => parse(result.source, { ecmaVersion: 'latest', sourceType: 'script' }));
  assert.equal(new Function(`${result.source}; return execute({ new: 'N-001' });`)(), 'N-001');
});

test('同步公共 API 对无效输入和抛错映射 getter 返回冲突而不抛出', () => {
  const source = `const testDataSchema = { columns: ['old'], required: [], example: { old: '' } };`;
  const throwingMapping = {};
  Object.defineProperty(throwingMapping, 'from', { get() { throw new Error('boom'); } });

  for (const input of [null, [], 1, 'script']) {
    assert.doesNotThrow(() => synchronizeScriptSchema(input));
    assert.equal(synchronizeScriptSchema(input).ok, false);
  }
  const result = synchronizeScriptSchema({
    source,
    targetSchema: { columns: ['new'], required: [], example: { new: '' } },
    mappings: [throwingMapping, null, 1]
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.conflicts.map((item) => item.kind), ['invalid-mapping', 'invalid-mapping', 'invalid-mapping']);
});
