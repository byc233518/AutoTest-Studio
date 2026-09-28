import path from 'node:path';
import { isAllowedScriptFile } from './scenario-scripts.mjs';

export const SCENARIO_PACKAGE_VERSION = 1;
const SCENARIO_KEY_PATTERN = /^[a-z0-9]+(?:-+[a-z0-9]+)*$/;
const LEGACY_SCENARIO_KEY_PATTERN = /^legacyMes(?:-+[a-z0-9]+)+$/;
const WINDOWS_RESERVED_NAME = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;

export class ScenarioPackageError extends Error {
  constructor(message, code = 'INVALID_SCENARIO_PACKAGE', status = 400) {
    super(message);
    this.name = 'ScenarioPackageError';
    this.code = code;
    this.status = status;
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    && [Object.prototype, null].includes(Object.getPrototypeOf(value));
}

function text(value, label, { required = false, fallback = '' } = {}) {
  if (value === undefined || value === null) value = fallback;
  if (typeof value !== 'string') throw new ScenarioPackageError(`${label}必须是字符串`);
  const result = value.trim();
  if (required && !result) throw new ScenarioPackageError(`${label}不能为空`);
  return result;
}

function scenarioKey(value, label = '用例 key') {
  if (typeof value !== 'string'
    || (!SCENARIO_KEY_PATTERN.test(value) && !LEGACY_SCENARIO_KEY_PATTERN.test(value))) {
    throw new ScenarioPackageError(`${label}只能包含小写字母、数字和分隔用的单个连字符`);
  }
  return value;
}

function normalizeDirectory(value) {
  const directory = text(value, '用例目录');
  if (!directory) return '';
  if (path.posix.isAbsolute(directory) || path.win32.isAbsolute(directory) || /[:\u0000-\u001f]/.test(directory)) {
    throw new ScenarioPackageError('用例目录必须是相对目录');
  }
  const segments = directory.replaceAll('\\', '/').split('/').map(segment => segment.trim());
  if (segments.some(segment => !segment || segment === '.' || segment === '..')) {
    throw new ScenarioPackageError('用例目录不能包含空目录、. 或 ..');
  }
  return segments.join('/');
}

function normalizeScript(script, key) {
  if (script === undefined || script === null) return null;
  if (!isObject(script)) throw new ScenarioPackageError(`用例 ${key} 的脚本必须是对象或 null`);
  const fileName = script.fileName;
  if (typeof fileName !== 'string' || !fileName || fileName !== fileName.trim()
    || path.posix.basename(fileName) !== fileName || path.win32.basename(fileName) !== fileName
    || /[<>:"/\\|?*%\u0000-\u001f]/.test(fileName) || /[. ]$/.test(fileName)
    || WINDOWS_RESERVED_NAME.test(fileName) || !isAllowedScriptFile(fileName)) {
    throw new ScenarioPackageError(`用例 ${key} 的脚本文件名无效：只能使用不含路径的 .js、.cjs 或 .mjs 文件名`);
  }
  if (typeof script.content !== 'string') throw new ScenarioPackageError(`用例 ${key} 的脚本源码必须是字符串`);
  return { fileName, content: script.content };
}

function cloneDataSchema(value, key) {
  if (value === undefined || value === null) return {};
  if (!isObject(value)) throw new ScenarioPackageError(`用例 ${key} 的 dataSchema 必须是对象`);
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    throw new ScenarioPackageError(`用例 ${key} 的 dataSchema 必须是可序列化的 JSON 对象`);
  }
}

function normalizeScenario(value, index) {
  if (!isObject(value)) throw new ScenarioPackageError(`第 ${index + 1} 个用例必须是对象`);
  const key = scenarioKey(value.key);
  const directory = normalizeDirectory(value.directory ?? value.module);
  const dependsOn = value.dependsOn ?? [];
  if (!Array.isArray(dependsOn)) throw new ScenarioPackageError(`用例 ${key} 的 dependsOn 必须是数组`);
  const dependencyKeys = dependsOn.map(dependency => scenarioKey(dependency, `用例 ${key} 的前置 key`));
  if (new Set(dependencyKeys).size !== dependencyKeys.length) throw new ScenarioPackageError(`用例 ${key} 的前置依赖重复`);
  if (dependencyKeys.includes(key)) throw new ScenarioPackageError(`用例 ${key} 不能依赖自身`);
  return {
    key,
    name: text(value.name, `用例 ${key} 的名称`, { required: true }),
    description: text(value.description, `用例 ${key} 的说明`),
    directory,
    module: directory,
    priority: text(value.priority, `用例 ${key} 的优先级`, { fallback: 'P1' }),
    owner: text(value.owner, `用例 ${key} 的负责人`),
    dataSchema: cloneDataSchema(value.dataSchema, key),
    dependsOn: dependencyKeys,
    script: normalizeScript(value.script, key)
  };
}

/** Validate the whole input before the caller persists any scenario or script. */
export function parseScenarioPackage(input, { existingKeys = [] } = {}) {
  let value = input;
  if (Buffer.isBuffer(value)) value = value.toString('utf8');
  if (typeof value === 'string') {
    try { value = JSON.parse(value.replace(/^\uFEFF/, '')); }
    catch { throw new ScenarioPackageError('用例包不是有效的 JSON'); }
  }
  if (!isObject(value) || value.version !== SCENARIO_PACKAGE_VERSION) {
    throw new ScenarioPackageError(`不支持的用例包版本，仅支持 version: ${SCENARIO_PACKAGE_VERSION}`, 'UNSUPPORTED_SCENARIO_PACKAGE_VERSION');
  }
  if (!Array.isArray(value.scenarios) || value.scenarios.length === 0) throw new ScenarioPackageError('用例包 scenarios 必须是非空数组');
  const scenarios = value.scenarios.map(normalizeScenario);
  const seen = new Set();
  for (const scenario of scenarios) {
    if (seen.has(scenario.key)) throw new ScenarioPackageError(`用例包包含重复 key：${scenario.key}`, 'DUPLICATE_SCENARIO_KEY');
    seen.add(scenario.key);
  }
  if (!Array.isArray(existingKeys) && !(existingKeys instanceof Set)) throw new ScenarioPackageError('existingKeys 必须是 key 数组或 Set');
  const existing = new Set(existingKeys);
  const conflicts = scenarios.map(scenario => scenario.key).filter(key => existing.has(key));
  if (conflicts.length) {
    const error = new ScenarioPackageError(`已有同名 key 的用例，未导入任何内容：${conflicts.join('、')}`, 'SCENARIO_KEY_CONFLICT', 409);
    error.conflictingKeys = conflicts;
    throw error;
  }
  return { version: SCENARIO_PACKAGE_VERSION, scenarios };
}

function fromStoredJson(value, fallback, label) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); }
  catch { throw new ScenarioPackageError(`${label}不是有效的 JSON`); }
}

/** Entries are { scenario, script: { fileName, content } | null }; no I/O occurs here. */
export function createScenarioPackage(entries) {
  if (!Array.isArray(entries)) throw new ScenarioPackageError('导出内容必须是用例数组');
  const scenarios = entries.map((entry, index) => {
    if (!isObject(entry) || !isObject(entry.scenario)) throw new ScenarioPackageError(`第 ${index + 1} 个导出项缺少 scenario`);
    const scenario = entry.scenario;
    return {
      key: scenario.key, name: scenario.name, description: scenario.description,
      directory: scenario.directory ?? scenario.module, module: scenario.module,
      priority: scenario.priority, owner: scenario.owner,
      dataSchema: fromStoredJson(scenario.dataSchema ?? scenario.data_schema, {}, '字段定义'),
      dependsOn: fromStoredJson(scenario.dependsOn ?? scenario.depends_on, [], '前置依赖'),
      script: entry.script ?? null
    };
  });
  return parseScenarioPackage({ version: SCENARIO_PACKAGE_VERSION, scenarios });
}
