import { parse } from 'acorn';
import { ancestor } from 'acorn-walk';
import MagicString from 'magic-string';

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function emptySchema() {
  return { columns: [], required: [], example: {}, fields: [] };
}

function text(value, fallback = '') {
  try {
    if (value === null || value === undefined) return fallback;
    return String(value).trim();
  } catch {
    return fallback;
  }
}

function safeValue(value) {
  try {
    return value === null || value === undefined ? '' : String(value);
  } catch {
    return '';
  }
}

function validKey(value) {
  const key = text(value);
  return key && !DANGEROUS_KEYS.has(key) ? key : '';
}

function mappingEntry(mapping) {
  try {
    if (!mapping || typeof mapping !== 'object' || Array.isArray(mapping)) return null;
    return { from: text(mapping.from), to: text(mapping.to) };
  } catch {
    return null;
  }
}

function analyzeMappings(mappings, scriptSchema, platformSchema) {
  const result = new Map();
  const invalidMappings = [];
  try {
    const sources = scriptSchema ? new Set(scriptSchema.columns) : null;
    const destinations = new Set(platformSchema.columns);
    const seenFrom = new Set();
    const seenTo = new Set();
    if (!Array.isArray(mappings)) {
      return { result, invalidMappings: [{ index: null, kind: 'invalid-mapping' }] };
    }
    for (let index = 0; index < mappings.length; index += 1) {
      const entry = mappingEntry(mappings[index]);
      if (!entry) {
        invalidMappings.push({ index, kind: 'invalid-mapping' });
        continue;
      }
      const { from, to } = entry;
      if (!from || !to) {
        invalidMappings.push({ index, kind: 'invalid-mapping', from, to });
        continue;
      }
      if (DANGEROUS_KEYS.has(from) || DANGEROUS_KEYS.has(to)) {
        invalidMappings.push({ index, kind: 'dangerous-key', from, to });
        continue;
      }
      if (seenFrom.has(from)) {
        invalidMappings.push({ index, kind: 'duplicate-from', from, to });
        continue;
      }
      if (seenTo.has(to)) {
        invalidMappings.push({ index, kind: 'duplicate-to', from, to });
        seenFrom.add(from);
        continue;
      }
      seenFrom.add(from);
      seenTo.add(to);
      if (sources && !sources.has(from)) {
        invalidMappings.push({ index, kind: 'unknown-from', from, to });
        continue;
      }
      if (!destinations.has(to)) {
        invalidMappings.push({ index, kind: 'unknown-to', from, to });
        continue;
      }
      result.set(from, to);
    }
  } catch {
    return { result: new Map(), invalidMappings: [{ index: null, kind: 'invalid-mapping' }] };
  }
  return { result, invalidMappings };
}

export function normalizeSchema(input) {
  try {
    if (!input || typeof input !== 'object' || Array.isArray(input)) return emptySchema();
    const legacyRequired = new Set(Array.isArray(input.required)
      ? input.required.map(validKey).filter(Boolean)
      : []);
    const legacyExample = input.example && typeof input.example === 'object' && !Array.isArray(input.example)
      ? input.example
      : {};
    const fields = [];
    const seen = new Set();
    const addField = (rawField, fromLegacy = false) => {
      if (!rawField || typeof rawField !== 'object' || Array.isArray(rawField)) return;
      const key = validKey(rawField.key);
      if (!key || seen.has(key)) return;
      seen.add(key);
      const label = text(rawField.label) || key;
      const type = text(rawField.type) || 'text';
      const hasExample = Object.hasOwn(rawField, 'example');
      let example = hasExample ? safeValue(rawField.example) : '';
      if (fromLegacy || !hasExample) example = safeValue(legacyExample[key]);
      fields.push({
        key,
        label,
        type,
        required: Boolean(rawField.required) || legacyRequired.has(key),
        example
      });
    };

    if (Array.isArray(input.fields)) {
      for (const field of input.fields) addField(field);
    }
    if (!fields.length && Array.isArray(input.columns)) {
      for (const column of input.columns) {
        const key = validKey(column);
        addField({ key, required: legacyRequired.has(key), example: legacyExample[key] }, true);
      }
    }
    return {
      columns: fields.map((field) => field.key),
      required: fields.filter((field) => field.required).map((field) => field.key),
      example: Object.fromEntries(fields.map((field) => [field.key, field.example])),
      fields
    };
  } catch {
    return emptySchema();
  }
}

export function diffSchemas(platformSchema, scriptSchema, mappings = []) {
  const platform = normalizeSchema(platformSchema);
  const script = normalizeSchema(scriptSchema);
  const { result: mappingByFrom, invalidMappings } = analyzeMappings(mappings, script, platform);
  const platformByKey = new Map(platform.fields.map((field) => [field.key, field]));
  const matchedPlatform = new Set();
  const matchedScript = new Set();
  const renamed = [];
  const changed = [];

  for (const scriptField of script.fields) {
    const targetKey = mappingByFrom.get(scriptField.key) || scriptField.key;
    const platformField = platformByKey.get(targetKey);
    if (!platformField) continue;
    matchedScript.add(scriptField.key);
    matchedPlatform.add(platformField.key);
    if (scriptField.key !== platformField.key) {
      renamed.push({ from: scriptField.key, to: platformField.key });
    }
    const changes = {};
    for (const property of ['required', 'type', 'label', 'example']) {
      if (scriptField[property] !== platformField[property]) {
        changes[property] = { script: scriptField[property], platform: platformField[property] };
      }
    }
    if (Object.keys(changes).length) {
      changed.push({ key: platformField.key, from: scriptField.key, to: platformField.key, changes });
    }
  }

  const added = platform.fields.filter((field) => !matchedPlatform.has(field.key));
  const removed = script.fields.filter((field) => !matchedScript.has(field.key));
  return {
    added,
    removed,
    renamed,
    changed,
    invalidMappings,
    hasChanges: Boolean(added.length || removed.length || renamed.length || changed.length || invalidMappings.length)
  };
}

function conflict(kind, node, message) {
  return {
    kind,
    line: node?.loc?.start?.line || 1,
    column: node?.loc?.start?.column || 0,
    message
  };
}

function isDataBinding(node, parent) {
  if (!parent) return false;
  if (parent.type === 'VariableDeclarator' && parent.id === node) return true;
  if ((parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression' || parent.type === 'ArrowFunctionExpression')
    && parent.params.includes(node)) return true;
  if (parent.type === 'CatchClause' && parent.param === node) return true;
  if ((parent.type === 'ImportSpecifier' || parent.type === 'ImportDefaultSpecifier' || parent.type === 'ImportNamespaceSpecifier')
    && parent.local === node) return true;
  return false;
}

function collectDataConflicts(ast) {
  const conflicts = [];
  const add = (kind, node, message) => conflicts.push({ ...conflict(kind, node, message), start: node.start });
  const variableBindings = [];
  const parameterBindings = [];
  const catchBindings = [];
  const importBindings = [];
  ancestor(ast, {
    VariableDeclarator(node) {
      if (node.id.type === 'Identifier' && node.id.name === 'data') variableBindings.push(node.id);
    },
    FunctionDeclaration(node) {
      parameterBindings.push(...node.params.filter((param) => param.type === 'Identifier' && param.name === 'data'));
    },
    FunctionExpression(node) {
      parameterBindings.push(...node.params.filter((param) => param.type === 'Identifier' && param.name === 'data'));
    },
    ArrowFunctionExpression(node) {
      parameterBindings.push(...node.params.filter((param) => param.type === 'Identifier' && param.name === 'data'));
    },
    CatchClause(node) {
      if (node.param?.type === 'Identifier' && node.param.name === 'data') catchBindings.push(node.param);
    },
    ImportDeclaration(node) {
      importBindings.push(...node.specifiers
        .filter((specifier) => specifier.local?.type === 'Identifier' && specifier.local.name === 'data')
        .map((specifier) => specifier.local));
    }
  });
  for (const binding of variableBindings) {
    add('data-shadow', binding, '检测到局部 data 变量，无法确定字段引用作用域');
  }
  for (const binding of parameterBindings.slice(1)) {
    add('data-shadow', binding, '检测到多个 data 参数，无法确定字段引用作用域');
  }
  for (const binding of catchBindings) {
    add('data-shadow', binding, '检测到 catch 作用域中的 data 参数，无法安全重命名');
  }
  for (const binding of importBindings) {
    add('data-shadow', binding, '检测到 import 的 data 绑定，无法安全重命名');
  }
  ancestor(ast, {
    MemberExpression(node) {
      if (node.object.type !== 'Identifier' || node.object.name !== 'data') return;
      if (node.computed && (node.property.type !== 'Literal' || typeof node.property.value !== 'string')) {
        add('dynamic-reference', node, '检测到动态 data 字段访问，无法安全重命名');
        conflicts.at(-1).code = 'dynamic-data-access';
      }
    },
    SpreadElement(node) {
      if (node.argument.type === 'Identifier' && node.argument.name === 'data') {
        add('data-spread', node, '检测到 data 展开，无法安全重命名');
      }
    },
    Identifier(node, parents) {
      if (node.name !== 'data') return;
      const parent = parents.at(-2);
      if (isDataBinding(node, parent)) return;
      if (parent?.type === 'MemberExpression' && parent.object === node) return;
      if (parent?.type === 'MemberExpression' && parent.property === node && !parent.computed) return;
      if (parent?.type === 'Property' && parent.key === node && parent.value !== node) return;
      if (parent?.type === 'SpreadElement') return;
      add('data-alias', node, '检测到 data 别名或逃逸引用，无法安全重命名');
    }
  });
  return conflicts.sort((left, right) => left.start - right.start).map(({ start, ...item }) => item);
}

function bracketStringLiteral(value) {
  return `'${JSON.stringify(value).slice(1, -1).replaceAll("'", "\\'")}'`;
}

function topLevelSchemaDeclarations(ast) {
  const declarations = [];
  for (const statement of ast.body) {
    const variableDeclaration = statement.type === 'VariableDeclaration'
      ? statement
      : statement.type === 'ExportNamedDeclaration' && statement.declaration?.type === 'VariableDeclaration'
        ? statement.declaration
        : null;
    if (!variableDeclaration) continue;
    declarations.push(...variableDeclaration.declarations.filter((node) => node.id.type === 'Identifier' && node.id.name === 'testDataSchema'));
  }
  return declarations;
}

function propertyName(node) {
  if (node.computed) return '';
  if (node.key.type === 'Identifier') return node.key.name;
  if (node.key.type === 'Literal' && (typeof node.key.value === 'string' || typeof node.key.value === 'number')) return String(node.key.value);
  return '';
}

function staticSchemaValue(node) {
  if (node?.type === 'Literal' && (node.value === null || ['string', 'number', 'boolean'].includes(typeof node.value))) {
    return { ok: true, value: node.value };
  }
  if (node?.type === 'ArrayExpression') {
    const values = [];
    for (const item of node.elements) {
      const parsed = staticSchemaValue(item);
      if (!parsed.ok) return parsed;
      values.push(parsed.value);
    }
    return { ok: true, value: values };
  }
  if (node?.type === 'ObjectExpression') {
    const value = Object.create(null);
    for (const property of node.properties) {
      if (property.type !== 'Property' || property.kind !== 'init' || property.method || property.computed || property.shorthand) {
        return { ok: false };
      }
      const key = propertyName(property);
      if (!key) return { ok: false };
      const parsed = staticSchemaValue(property.value);
      if (!parsed.ok) return parsed;
      value[key] = parsed.value;
    }
    return { ok: true, value };
  }
  return { ok: false };
}

function sourceSchemaKeys(initializer) {
  const parsed = staticSchemaValue(initializer);
  if (!parsed.ok) return null;
  try {
    return new Set(normalizeSchema(parsed.value).columns);
  } catch {
    return null;
  }
}

function targetSchemaIsValid(schema) {
  try {
    if (!schema || typeof schema !== 'object' || Array.isArray(schema)) return false;
    const hasColumns = Object.hasOwn(schema, 'columns');
    const hasFields = Object.hasOwn(schema, 'fields');
    if (!hasColumns && !hasFields) return false;
    if (hasColumns && !Array.isArray(schema.columns)) return false;
    if (hasFields && !Array.isArray(schema.fields)) return false;
    const columns = hasColumns ? schema.columns.map((value) => text(value)) : [];
    const fields = hasFields ? schema.fields.map((field) => {
      if (!field || typeof field !== 'object' || Array.isArray(field)) return '';
      return text(field.key);
    }) : [];
    const everyKeyIsSafe = (keys) => keys.every((key) => key && !DANGEROUS_KEYS.has(key) && keys.indexOf(key) === keys.lastIndexOf(key));
    if (!everyKeyIsSafe(columns) || !everyKeyIsSafe(fields)) return false;
    if (hasColumns && hasFields) {
      if (columns.length !== fields.length) return false;
      const columnSet = new Set(columns);
      if (columnSet.size !== fields.length || fields.some((key) => !columnSet.has(key))) return false;
    }
    return true;
  } catch {
    return false;
  }
}

function mappingConflicts(invalidMappings) {
  return invalidMappings.map((item) => conflict(item.kind, null, `字段映射无效: ${item.kind}`));
}

export function synchronizeScriptSchema(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, conflicts: [conflict('source', null, '同步参数必须是对象')], source: undefined };
  }
  let source;
  let targetSchema;
  let mappings;
  try {
    ({ source, targetSchema, mappings = [] } = input);
  } catch {
    return { ok: false, conflicts: [conflict('source', null, '无法读取同步参数')], source: undefined };
  }
  if (typeof source !== 'string') {
    return { ok: false, conflicts: [conflict('source', null, '脚本内容必须是文本')], source };
  }
  let ast;
  try {
    ast = parse(source, { ecmaVersion: 'latest', sourceType: 'module', locations: true });
  } catch (error) {
    return {
      ok: false,
      conflicts: [{
        kind: 'syntax',
        line: error.loc?.line || 1,
        column: error.loc?.column || 0,
        message: `脚本语法错误: ${error.message || '无法解析脚本'}`
      }],
      source
    };
  }

  const declarations = topLevelSchemaDeclarations(ast);
  const declaration = declarations[0];
  if (declarations.length !== 1 || declaration.init?.type !== 'ObjectExpression') {
    return { ok: false, conflicts: [conflict('schema', declaration, '未找到 testDataSchema 对象声明')], source };
  }
  const schemaSpread = declaration.init.properties.find((property) => property.type === 'SpreadElement');
  if (schemaSpread) {
    return { ok: false, conflicts: [conflict('schema-spread', schemaSpread, 'testDataSchema 不支持展开字段')], source };
  }

  const conflicts = collectDataConflicts(ast);
  if (conflicts.length) return { ok: false, conflicts, source };

  if (!targetSchemaIsValid(targetSchema)) {
    return { ok: false, conflicts: [conflict('target-schema', null, '目标字段模型无效或存在冲突字段')], source };
  }
  const target = normalizeSchema(targetSchema);
  const sourceKeys = sourceSchemaKeys(declaration.init);
  const sourceSchema = sourceKeys ? { columns: [...sourceKeys] } : null;
  const { result: mappingByFrom, invalidMappings } = analyzeMappings(mappings, sourceSchema, target);
  if (invalidMappings.length) return { ok: false, conflicts: mappingConflicts(invalidMappings), source };
  const output = new MagicString(source);
  output.overwrite(declaration.init.start, declaration.init.end, JSON.stringify(target, null, 2));
  ancestor(ast, {
    MemberExpression(node) {
      if (node.object.type !== 'Identifier' || node.object.name !== 'data') return;
      if (node.start >= declaration.init.start && node.end <= declaration.init.end) return;
      const key = node.computed ? node.property.value : node.property.name;
      const target = mappingByFrom.get(key);
      if (target) {
        const access = node.optional ? `data?.[${bracketStringLiteral(target)}]` : `data[${bracketStringLiteral(target)}]`;
        output.overwrite(node.start, node.end, access);
      }
    }
  });
  return { ok: true, conflicts: [], source: output.toString() };
}
