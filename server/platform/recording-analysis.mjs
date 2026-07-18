import { parse } from 'acorn';
import * as walk from 'acorn-walk';
import MagicString from 'magic-string';

const INPUT_METHODS = new Map([
  ['fill', 'text'],
  ['type', 'text'],
  ['selectOption', 'select'],
  ['check', 'checkbox'],
  ['setInputFiles', 'file']
]);

const EXPECT_METHODS = new Map([
  ['toBeVisible', 'visible'],
  ['toHaveText', 'text'],
  ['toHaveValue', 'value'],
  ['toHaveURL', 'url']
]);

function warning(message) {
  return { supported: false, warnings: [message], fields: [], assertions: [] };
}

function staticValue(node) {
  if (!node) return undefined;
  if (node.type === 'Literal' && ['string', 'number', 'boolean'].includes(typeof node.value)) return node.value;
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0].value.cooked;
  if (node.type === 'ArrayExpression') {
    const values = node.elements.map(staticValue);
    return values.some((value) => value === undefined) ? undefined : values;
  }
  return undefined;
}

function propertyName(member) {
  if (member?.type !== 'MemberExpression') return '';
  if (!member.computed && member.property.type === 'Identifier') return member.property.name;
  return member.computed ? String(staticValue(member.property) ?? '') : '';
}

function objectPropertyValue(node, name) {
  if (node?.type !== 'ObjectExpression') return undefined;
  const property = node.properties.find((item) => item.type === 'Property'
    && (item.key.name === name || item.key.value === name));
  return property ? staticValue(property.value) : undefined;
}

function staticObject(node) {
  if (node?.type !== 'ObjectExpression') return undefined;
  const entries = node.properties.map((property) => {
    const key = property.key?.name ?? property.key?.value;
    const value = staticValue(property.value);
    return key === undefined || value === undefined ? undefined : [key, value];
  });
  return entries.some((entry) => !entry) ? undefined : Object.fromEntries(entries);
}

function locatorDetails(node) {
  if (node?.type !== 'CallExpression' || node.callee.type !== 'MemberExpression') return '';
  const method = propertyName(node.callee);
  if (!['getByLabel', 'getByPlaceholder', 'getByRole', 'getByText'].includes(method)) return '';
  if (method === 'getByRole') {
    const role = staticValue(node.arguments[0]);
    const options = staticObject(node.arguments[1]) || {};
    const value = options.name ?? role;
    return role === undefined || value === undefined ? '' : { kind: method, value, role, options };
  }
  const value = staticValue(node.arguments[0]);
  return value === undefined ? '' : { kind: method, value };
}

function locatorLabel(node) {
  const locator = locatorDetails(node);
  return locator && (typeof locator.value === 'string' || typeof locator.value === 'number') ? String(locator.value) : '';
}

function isPlaywrightTestCall(node) {
  return node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'test';
}

function parseSingleTest(source) {
  let ast;
  try {
    ast = parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch {
    return { error: '脚本语法无法解析，请修正后再分析。' };
  }

  const tests = [];
  walk.simple(ast, { CallExpression(node) { if (isPlaywrightTestCall(node)) tests.push(node); } });
  if (tests.length !== 1) return { error: '仅支持包含一个 Playwright test 的录制脚本。' };

  const testCall = tests[0];
  const callback = testCall.arguments.at(-1);
  if (!callback || !['ArrowFunctionExpression', 'FunctionExpression'].includes(callback.type)
    || callback.body.type !== 'BlockStatement') {
    return { error: '无法安全识别 Playwright test 回调函数。' };
  }
  return { ast, testCall, callback };
}

function collectScriptDetails(callback) {
  const fields = [];
  const assertions = [];
  walk.simple(callback.body, {
    CallExpression(node) {
      const method = propertyName(node.callee);
      const type = INPUT_METHODS.get(method);
      if (type && node.callee.type === 'MemberExpression') {
        const label = locatorLabel(node.callee.object);
        const value = method === 'check' ? true : staticValue(node.arguments[0]);
        if (label && value !== undefined) {
          fields.push({
            candidateId: `field-${fields.length + 1}`,
          label,
          type,
          example: value,
          value,
          valueNode: method === 'check' ? null : node.arguments[0],
          callNode: node
          });
        }
        return;
      }

      const assertionType = EXPECT_METHODS.get(method);
      const expected = node.callee?.object;
      if (!assertionType || expected?.type !== 'CallExpression' || expected.callee.type !== 'Identifier'
        || expected.callee.name !== 'expect') return;

      if (assertionType === 'url') {
        const value = staticValue(node.arguments[0]);
        if (value !== undefined) assertions.push({ type: 'url', value, locator: { kind: 'page' } });
        return;
      }
      const locator = locatorDetails(expected.arguments[0]);
      const label = locatorLabel(expected.arguments[0]);
      const value = staticValue(node.arguments[0]);
      if (assertionType === 'visible' && label) assertions.push({ type: 'visible', label, value: label, locator });
      if (assertionType !== 'visible' && label && value !== undefined) assertions.push({ type: assertionType, label, value, locator });
    }
  });
  return { fields, assertions };
}

function publicField(field) {
  return {
    candidateId: field.candidateId,
    label: field.label,
    type: field.type,
    example: field.example,
    value: field.value
  };
}

export function analyzeRecordedScript(source) {
  if (typeof source !== 'string' || !source.trim()) return warning('录制脚本不能为空。');
  const parsed = parseSingleTest(source);
  if (parsed.error) return warning(parsed.error);

  const { fields, assertions } = collectScriptDetails(parsed.callback);
  return { supported: true, warnings: [], fields: fields.map(publicField), assertions };
}

function schemaFromFields(fields) {
  const usable = fields.filter((field) => typeof field.key === 'string' && field.key.trim());
  return {
    columns: usable.map((field) => field.key),
    required: usable.filter((field) => field.required).map((field) => field.key),
    example: Object.fromEntries(usable.map((field) => [field.key, field.example ?? field.value ?? ''])),
    fields: usable.map((field) => ({
      key: field.key,
      label: field.label || field.key,
      type: field.type || 'text',
      required: Boolean(field.required)
    }))
  };
}

function validateFields(fields) {
  if (!Array.isArray(fields)) return ['字段配置必须是数组。'];
  const keys = new Set();
  const warnings = [];
  fields.forEach((field, index) => {
    if (!field || typeof field !== 'object' || Array.isArray(field)) {
      warnings.push(`第 ${index + 1} 个字段必须是对象。`);
      return;
    }
    if (typeof field.key !== 'string' || !field.key.trim()) {
      warnings.push(`第 ${index + 1} 个字段 key 不能为空。`);
      return;
    }
    if (keys.has(field.key)) warnings.push(`字段 key 不能重复：${field.key}。`);
    keys.add(field.key);
  });
  return warnings;
}

function locatorSource(locator) {
  if (!locator || typeof locator !== 'object') return { error: '断言缺少 locator 定位器。' };
  const { value } = locator;
  const kind = locator.kind === 'text' ? 'getByText' : locator.kind;
  if (kind === 'page') return { source: 'page', locator: { kind: 'page' } };
  if (!['getByLabel', 'getByPlaceholder', 'getByRole', 'getByText'].includes(kind) || value === undefined) {
    return { error: '断言 locator 不受支持或缺少 value。' };
  }
  if (kind === 'getByRole' && value && typeof value === 'object') {
    if (!value.role) return { error: 'getByRole 断言缺少 role。' };
    const options = value.name === undefined ? '' : `, { name: ${JSON.stringify(value.name)} }`;
    return { source: `page.getByRole(${JSON.stringify(value.role)}${options})`, locator: { kind, value: value.name ?? value.role, role: value.role, options: value.name === undefined ? {} : { name: value.name } } };
  }
  if (kind === 'getByRole') {
    const role = locator.role ?? value;
    const options = locator.options || {};
    if (typeof role !== 'string') return { error: 'getByRole 断言缺少 role。' };
    return { source: `page.getByRole(${JSON.stringify(role)}${Object.keys(options).length ? `, ${JSON.stringify(options)}` : ''})`, locator: { kind, value: options.name ?? role, role, options } };
  }
  return { source: `page.${kind}(${JSON.stringify(value)})`, locator: { kind, value } };
}

function normalizeAssertion(assertion) {
  if (!assertion || typeof assertion !== 'object') return { error: '断言必须是对象。' };
  const type = assertion.type;
  if (!['visible', 'text', 'value', 'url'].includes(type)) {
    return { error: `不支持的断言类型：${type || '空'}。` };
  }

  const legacyLocator = type === 'url'
    ? { kind: 'page' }
    : { kind: type === 'value' ? 'getByLabel' : 'getByText', value: assertion.label };
  const locator = locatorSource(assertion.locator || legacyLocator);
  if (locator.error) return locator;
  if (type === 'url' && locator.source !== 'page') return { error: 'URL 断言的 locator 必须是 page。' };
  if (type !== 'url' && locator.source === 'page') return { error: `${type} 断言不能使用 page 定位器。` };

  const expected = assertion.expected ?? assertion.value ?? (type === 'url' ? assertion.locator?.value : undefined);
  if (type !== 'visible' && expected === undefined) return { error: `${type} 断言缺少 expected。` };
  return { type, locator: locator.locator, source: locator.source, expected };
}

function assertionKey(assertion) {
  const expected = assertion.type === 'visible' ? undefined : assertion.expected;
  return `${assertion.type}|${JSON.stringify(assertion.locator)}|${JSON.stringify(expected)}`;
}

function wizardAssertionSource(assertion) {
  if (assertion.type === 'visible') {
    return `await expect(${assertion.source}).toBeVisible();`;
  }
  if (assertion.type === 'text') {
    return `await expect(${assertion.source}).toHaveText(${JSON.stringify(assertion.expected)});`;
  }
  if (assertion.type === 'value') {
    return `await expect(${assertion.source}).toHaveValue(${JSON.stringify(assertion.expected)});`;
  }
  return `await expect(page).toHaveURL(${JSON.stringify(assertion.expected)});`;
}

export function buildDataDrivenScript({ source, title, fields = [], assertions = [] } = {}) {
  const fieldWarnings = validateFields(fields);
  if (fieldWarnings.length) return { supported: false, warnings: fieldWarnings, source: '', script: '', schema: schemaFromFields([]) };
  const parsed = parseSingleTest(source);
  if (parsed.error) return { supported: false, warnings: [parsed.error], source: '', script: '', schema: schemaFromFields(fields) };

  const details = collectScriptDetails(parsed.callback);
  const fieldsByCandidate = new Map(fields.map((field) => [field.candidateId, field]));
  const rewritten = new MagicString(source);
  for (const candidate of details.fields) {
    const field = fieldsByCandidate.get(candidate.candidateId);
    if (!field?.key) continue;
    if (candidate.valueNode) {
      rewritten.overwrite(candidate.valueNode.start, candidate.valueNode.end, `data[${JSON.stringify(field.key)}]`);
    } else if (candidate.type === 'checkbox') {
      const locator = source.slice(candidate.callNode.callee.object.start, candidate.callNode.callee.object.end);
      rewritten.overwrite(candidate.callNode.start, candidate.callNode.end, `${locator}.setChecked(data[${JSON.stringify(field.key)}])`);
    }
  }

  const body = rewritten.slice(parsed.callback.body.start + 1, parsed.callback.body.end - 1).trim();
  const fixtureParam = parsed.callback.params.length ? source.slice(parsed.callback.params[0].start, parsed.callback.params[0].end) : '{}';
  const originalAssertionKeys = new Set(details.assertions.map(normalizeAssertion).filter((item) => !item.error).map(assertionKey));
  const warnings = [];
  const additions = [];
  for (const assertion of assertions) {
    const normalized = normalizeAssertion(assertion);
    if (normalized.error) {
      warnings.push(normalized.error);
    } else if (!originalAssertionKeys.has(assertionKey(normalized))) {
      additions.push(wizardAssertionSource(normalized));
    }
  }
  const callbackBody = [body, ...additions].filter(Boolean).join('\n  ');
  const schema = schemaFromFields(fields);
  const script = [
    "const { test, expect } = require('@playwright/test');",
    "const { defineRecordedTests } = require('../support/recorded-script');",
    '',
    `const dataSchema = ${JSON.stringify(schema, null, 2)};`,
    '',
    `defineRecordedTests(test, ${JSON.stringify(title || '录制脚本')}, dataSchema, async (${fixtureParam}, data) => {`,
    callbackBody ? `  ${callbackBody}` : '',
    '});',
    ''
  ].join('\n');
  return { supported: true, warnings, source: script, script, schema };
}
