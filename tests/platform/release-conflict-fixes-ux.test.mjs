import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse, compileScript } from '@vue/compiler-sfc';
import * as Vue from 'vue';
import { api } from '../../frontend/src/api.js';

async function setupScript(file, props, dependencies) {
  const source = await readFile(file, 'utf8');
  const { descriptor } = parse(source, { filename: file });
  let compiled = compileScript(descriptor, { id: `test-${Date.now()}-${Math.random()}` }).content;
  const dependencyKey = `__componentTest${Date.now()}${Math.random().toString(16).slice(2)}`;
  globalThis[dependencyKey] = { vue: Vue, ...dependencies };
  compiled = compiled
    .replace(/import \{([^}]+)\} from 'vue';/, `const {$1} = globalThis.${dependencyKey}.vue;`)
    .replace(/import \{([^}]+)\} from 'element-plus';/, `const {$1} = globalThis.${dependencyKey}.elementPlus;`)
    .replace(/import \{ api \} from '\.\.\/api';/, `const api = globalThis.${dependencyKey}.api;`);
  try {
    const module = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}#${Math.random()}`);
    let exposed = {};
    const emitted = [];
    const bindings = module.default.setup(Vue.reactive(props), {
      expose(value) { exposed = value; },
      emit(...args) { emitted.push(args); }
    });
    await Vue.nextTick();
    await Promise.resolve();
    return { source, exposed, bindings, emitted };
  } finally {
    delete globalThis[dependencyKey];
  }
}

const messages = { error() {}, info() {}, success() {}, warning() {} };

test('ScenarioReleases 的 beforeChange 拒绝发布或恢复时不调用变更 API', async () => {
  const calls = [];
  const guarded = [];
  let confirmations = 0;
  const component = await setupScript('frontend/src/components/ScenarioReleases.vue', {
    scenarioKey: 'guarded-scenario',
    currentScript: '',
    currentScenario: null,
    beforeChange(context) {
      guarded.push(context);
      return false;
    }
  }, {
    api: async (path, options) => {
      calls.push({ path, options });
      return [];
    },
    elementPlus: {
      ElMessage: messages,
      ElMessageBox: { async confirm() { confirmations += 1; } }
    }
  });

  assert.match(component.source, /beforeChange:\s*\{\s*type:\s*Function/);
  calls.length = 0;
  await component.exposed.publish();
  await component.exposed.restore({ id: 'release-1', version: 'v1' });

  assert.deepEqual(guarded, [
    { action: 'publish' },
    { action: 'restore', release: { id: 'release-1', version: 'v1' } }
  ]);
  assert.equal(confirmations, 0);
  assert.deepEqual(calls, []);
});

test('ScenarioReleases 通过只读 draft-compare API 比较草稿且不依赖 crypto.subtle', async () => {
  const calls = [];
  const expected = { version: 'v2', changed: true, summary: '脚本有变化', scriptChanged: true, schemaChanged: false, scenarioChanged: false };
  const component = await setupScript('frontend/src/components/ScenarioReleases.vue', {
    scenarioKey: 'draft-compare-scenario',
    currentScript: 'export default {};',
    currentScenario: { name: '草稿' },
    beforeChange: null
  }, {
    api: async (path) => {
      calls.push(path);
      if (path.endsWith('/releases')) return [{ id: 'release-2', version: 'v2' }];
      if (path.endsWith('/releases/draft-compare')) return expected;
      throw new Error(`未预期 API: ${path}`);
    },
    elementPlus: { ElMessage: messages, ElMessageBox: { confirm: async () => {} } }
  });

  assert.doesNotMatch(component.source, /crypto\?*\.subtle|scriptHash\s*\(/);
  calls.length = 0;
  await component.exposed.compareDraft();
  assert.deepEqual(calls, ['/api/scenarios/draft-compare-scenario/releases/draft-compare']);
  assert.deepEqual(component.bindings.draftComparison.value, expected);
});

test('api 在 409 时保留 status 和解析后的 data', async (t) => {
  const originalFetch = globalThis.fetch;
  const conflicts = [{ kind: 'dynamic-reference', line: 8, column: 17, message: '动态字段无法自动重命名' }];
  globalThis.fetch = async () => new Response(JSON.stringify({ message: '脚本 schema 存在冲突', conflicts }), {
    status: 409,
    headers: { 'content-type': 'application/json' }
  });
  t.after(() => { globalThis.fetch = originalFetch; });

  await assert.rejects(api('/api/scenarios/custom-merge/contract', { method: 'PUT', body: '{}' }), (error) => {
    assert.equal(error.message, '脚本 schema 存在冲突');
    assert.equal(error.status, 409);
    assert.deepEqual(error.data, { message: '脚本 schema 存在冲突', conflicts });
    return true;
  });
});

test('api 在网络中断时返回包含接口路径的中文错误', async (t) => {
  const originalFetch = globalThis.fetch;
  const cause = new TypeError('Failed to fetch');
  globalThis.fetch = async () => { throw cause; };
  t.after(() => { globalThis.fetch = originalFetch; });

  await assert.rejects(api('/api/scenarios/example/publish', { method: 'POST', body: '{}' }), (error) => {
    assert.equal(error.message, '无法连接平台服务：/api/scenarios/example/publish');
    assert.equal(error.code, 'NETWORK_ERROR');
    assert.equal(error.path, '/api/scenarios/example/publish');
    assert.equal(error.cause, cause);
    return true;
  });
});

test('SchemaSyncDialog 接收 409 conflicts 并精确展示 kind/line/column/message', async () => {
  const conflict = { kind: 'dynamic-reference', line: 8, column: 17, message: '动态字段无法自动重命名' };
  const component = await setupScript('frontend/src/components/SchemaSyncDialog.vue', {
    modelValue: false,
    scenarioKey: 'custom-merge'
  }, {
    api: async (path, options) => {
      if (!options) return {
        platformSchema: { columns: ['newCode'], required: [], example: {} },
        scriptSchema: { columns: ['oldCode'], required: [], example: {} },
        diff: {},
        conflicts: []
      };
      const error = new Error('脚本 schema 存在冲突');
      error.status = 409;
      error.data = { message: error.message, conflicts: [conflict] };
      throw error;
    },
    elementPlus: { ElMessage: messages }
  });

  component.bindings.resolution.value = 'merge';
  component.bindings.targetSchemaText.value = JSON.stringify({ columns: ['newCode'], required: [], example: {} });
  await component.bindings.save();

  assert.deepEqual(component.bindings.contract.value.conflicts, [conflict]);
  assert.equal(component.bindings.formatConflict(conflict), 'dynamic-reference | 第 8 行 | 第 17 列 | 动态字段无法自动重命名');
  assert.match(component.source, /:title="formatConflict\(conflict\)"/);
});
