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

function normalizeMappings(mappings) {
  const result = new Map();
  const destinations = new Set();
  if (!Array.isArray(mappings)) return result;
  for (const mapping of mappings) {
    const from = validKey(mapping?.from);
    const to = validKey(mapping?.to);
    if (!from || !to || result.has(from) || destinations.has(to)) continue;
    result.set(from, to);
    destinations.add(to);
  }
  return result;
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
  const mappingByFrom = normalizeMappings(mappings);
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
      changed.push({ from: scriptField.key, to: platformField.key, changes });
    }
  }

  const added = platform.fields.filter((field) => !matchedPlatform.has(field.key));
  const removed = script.fields.filter((field) => !matchedScript.has(field.key));
  return {
    added,
    removed,
    renamed,
    changed,
    hasChanges: Boolean(added.length || removed.length || renamed.length || changed.length)
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
    }
  });
  for (const binding of variableBindings) {
    add('data-shadow', binding, '检测到局部 data 变量，无法确定字段引用作用域');
  }
  for (const binding of parameterBindings.slice(1)) {
    add('data-shadow', binding, '检测到多个 data 参数，无法确定字段引用作用域');
  }
  ancestor(ast, {
    MemberExpression(node) {
      if (node.object.type !== 'Identifier' || node.object.name !== 'data') return;
      if (node.computed && (node.property.type !== 'Literal' || typeof node.property.value !== 'string')) {
        add('dynamic-data-access', node, '检测到动态 data 字段访问，无法安全重命名');
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

export function synchronizeScriptSchema({ source, targetSchema, mappings = [] } = {}) {
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

  const target = normalizeSchema(targetSchema);
  const mappingByFrom = normalizeMappings(mappings);
  const invalidMapping = [...mappingByFrom.entries()].find(([, to]) => !target.columns.includes(to));
  if (invalidMapping) {
    return {
      ok: false,
      conflicts: [conflict('mapping', null, `映射目标字段不存在: ${invalidMapping[1]}`)],
      source
    };
  }
  const output = new MagicString(source);
  output.overwrite(declaration.init.start, declaration.init.end, JSON.stringify(target, null, 2));
  ancestor(ast, {
    MemberExpression(node) {
      if (node.object.type !== 'Identifier' || node.object.name !== 'data') return;
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
