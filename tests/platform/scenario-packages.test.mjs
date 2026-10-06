import assert from 'node:assert/strict';
import test from 'node:test';
import { createScenarioPackage, parseScenarioPackage, ScenarioPackageError } from '../../server/platform/scenario-packages.mjs';

function scenario(overrides = {}) {
  return {
    key: 'customer-create', name: '客户创建', description: '创建客户并检查结果',
    module: 'WMS / 基础资料', priority: 'P0', owner: 'tester',
    dataSchema: { fields: [{ key: 'code', type: 'text', required: true, options: ['A', 'B'] }] },
    dependsOn: ['sample-open-page'],
    script: { fileName: 'customer.spec.js', content: "const { test } = require('@playwright/test');\n// 中文源码\r\n" },
    ...overrides
  };
}

function input(...scenarios) {
  return { version: 1, scenarios };
}

test('导出元数据及脚本可完整回读，不包含数据库路径与环境信息', () => {
  const original = scenario();
  const stored = {
    ...original, id: 'SCN-1', script_entry: 'F:\\private\\customer.spec.js',
    app_id: 'APP-OLD', environment: { password: 'do-not-export' },
    data_schema: JSON.stringify(original.dataSchema), depends_on: JSON.stringify(original.dependsOn)
  };
  delete stored.dataSchema;
  delete stored.dependsOn;
  const result = createScenarioPackage([{ scenario: stored, script: original.script }]);
  const parsed = parseScenarioPackage(Buffer.from(`\uFEFF${JSON.stringify(result)}`, 'utf8'));
  assert.deepEqual(parsed, result);
  assert.equal(parsed.scenarios[0].directory, 'WMS/基础资料');
  assert.equal(parsed.scenarios[0].module, parsed.scenarios[0].directory);
  assert.deepEqual(parsed.scenarios[0].dataSchema, original.dataSchema);
  assert.equal(parsed.scenarios[0].script.content, original.script.content);
  assert.doesNotMatch(JSON.stringify(parsed), /SCN-1|APP-OLD|private|do-not-export|script_entry/);
});

test('导入复制对象且保留外部依赖和无脚本草稿', () => {
  const original = input(scenario({ script: null, directory: ' MES\\生产执行 ' }));
  const parsed = parseScenarioPackage(original);
  assert.equal(parsed.scenarios[0].directory, 'MES/生产执行');
  assert.deepEqual(parsed.scenarios[0].dependsOn, ['sample-open-page']);
  assert.equal(parsed.scenarios[0].script, null);
  parsed.scenarios[0].dataSchema.fields[0].key = 'changed';
  parsed.scenarios[0].dependsOn.push('another');
  assert.equal(original.scenarios[0].dataSchema.fields[0].key, 'code');
  assert.deepEqual(original.scenarios[0].dependsOn, ['sample-open-page']);
});

test('严格校验版本、包结构和 JSON 格式', () => {
  for (const value of [null, [], {}, { version: '1', scenarios: [scenario()] }, { version: 2, scenarios: [scenario()] }]) {
    assert.throws(() => parseScenarioPackage(value), error => error instanceof ScenarioPackageError && error.code === 'UNSUPPORTED_SCENARIO_PACKAGE_VERSION');
  }
  for (const value of [{ version: 1 }, input(), { version: 1, scenarios: {} }, input(null)]) {
    assert.throws(() => parseScenarioPackage(value), ScenarioPackageError);
  }
  assert.throws(() => parseScenarioPackage('{invalid'), /有效的 JSON/);
});

test('拒绝非法 key、包内重复项及与已有用例冲突，输入不被修改', () => {
  for (const key of ['../test', 'a/b', 'UPPER', 'with space', '-a', 'a-', '', 42]) {
    assert.throws(() => parseScenarioPackage(input(scenario({ key }))), /key只能包含/);
  }
  assert.equal(parseScenarioPackage(input(scenario({ key: 'legacy--hash' }))).scenarios[0].key, 'legacy--hash');
  assert.equal(
    parseScenarioPackage(input(scenario({ key: 'legacyMes-page-index-a1b2c3' }))).scenarios[0].key,
    'legacyMes-page-index-a1b2c3'
  );
  assert.throws(() => parseScenarioPackage(input(scenario(), scenario())), error => error.code === 'DUPLICATE_SCENARIO_KEY');
  const original = input(scenario(), scenario({ key: 'order-create' }));
  const before = JSON.stringify(original);
  assert.throws(() => parseScenarioPackage(original, { existingKeys: new Set(['customer-create', 'order-create']) }), error => {
    assert.equal(error.code, 'SCENARIO_KEY_CONFLICT');
    assert.equal(error.status, 409);
    assert.deepEqual(error.conflictingKeys, ['customer-create', 'order-create']);
    return true;
  });
  assert.equal(JSON.stringify(original), before);
});

test('脚本文件名拒绝 Windows/Unix 路径、编码路径、设备名和不支持的扩展名', () => {
  const invalid = ['../case.js', '..\\case.js', 'dir/case.js', 'dir\\case.js', '/case.js', 'C:\\case.js', 'C:case.js', '\\\\server\\case.js', '%2e%2e%2fcase.js', 'case.js:stream', 'CON.js', 'lpt1.spec.js', 'case.js ', 'case.js.', 'case.ts', 'case.json', 'case.js.txt', 'bad\u0000.js', ''];
  for (const fileName of invalid) {
    assert.throws(() => parseScenarioPackage(input(scenario({ script: { fileName, content: '' } }))), /脚本文件名无效/, fileName);
  }
  for (const fileName of ['case.js', 'case.spec.js', 'case.cjs', 'case.mjs', '中文用例.spec.js']) {
    const parsed = parseScenarioPackage(input(scenario({ script: { fileName, content: '' } })));
    assert.equal(parsed.scenarios[0].script.fileName, fileName);
  }
});

test('不同用例可使用相同脚本文件名，不隐式合并或覆盖', () => {
  const parsed = parseScenarioPackage(input(scenario(), scenario({ key: 'second-case' })));
  assert.equal(parsed.scenarios.length, 2);
  assert.equal(parsed.scenarios[0].script.fileName, parsed.scenarios[1].script.fileName);
});

test('拒绝非法目录、元数据与前置依赖', () => {
  for (const directory of ['../cases', 'cases/..', '/cases', 'C:\\cases', 'cases//inner', './cases']) {
    assert.throws(() => parseScenarioPackage(input(scenario({ directory }))), /用例目录/);
  }
  for (const overrides of [{ name: '' }, { dataSchema: [] }, { dependsOn: 'sample-open-page' }, { dependsOn: ['a', 'a'] }, { dependsOn: ['customer-create'] }, { dependsOn: ['../a'] }, { script: { fileName: 'case.js', content: 123 } }]) {
    assert.throws(() => parseScenarioPackage(input(scenario(overrides))), ScenarioPackageError);
  }
});

test('损坏的数据库 JSON 不会被导出为空配置', () => {
  assert.throws(() => createScenarioPackage([{ scenario: { key: 'case-a', name: 'Case', data_schema: '{broken' }, script: null }]), /字段定义不是有效的 JSON/);
  assert.throws(() => createScenarioPackage([{ scenario: { key: 'case-a', name: 'Case', depends_on: '{broken' }, script: null }]), /前置依赖不是有效的 JSON/);
});
