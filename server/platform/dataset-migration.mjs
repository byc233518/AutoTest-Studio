import { normalizeSchema } from './schema-sync.mjs';

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function error(message, extra = {}) {
  return { ...extra, message };
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function keyOf(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function rawSchemaKeys(schema) {
  if (!isObject(schema)) return null;
  const hasColumns = Object.hasOwn(schema, 'columns');
  const hasFields = Object.hasOwn(schema, 'fields');
  if (!hasColumns && !hasFields) return null;
  if (hasColumns && !Array.isArray(schema.columns)) return null;
  if (hasFields && !Array.isArray(schema.fields)) return null;
  const columns = hasColumns ? schema.columns.map(keyOf) : null;
  const fields = hasFields
    ? schema.fields.map((field) => isObject(field) ? keyOf(field.key) : '')
    : null;
  if (columns && fields) {
    if (columns.length !== fields.length) return null;
    const columnSet = new Set(columns);
    if (fields.some((key) => !columnSet.has(key))) return null;
  }
  return fields || columns;
}

function validateInput(input) {
  const errors = [];
  if (!isObject(input)) return [error('迁移参数必须是对象')];

  const { rows, targetSchema, mappings, defaults } = input;
  if (!Array.isArray(rows) || rows.some((row) => !isObject(row))) {
    errors.push(error('rows 必须是对象数组'));
  }

  const targetKeys = rawSchemaKeys(targetSchema);
  if (!targetKeys || targetKeys.some((key) => !key || DANGEROUS_KEYS.has(key)) || new Set(targetKeys).size !== targetKeys.length) {
    errors.push(error('targetSchema 必须包含唯一且安全的字段'));
  }
  if (isObject(targetSchema) && Object.hasOwn(targetSchema, 'required') && !Array.isArray(targetSchema.required)) {
    errors.push(error('targetSchema.required 必须是数组'));
  }
  if (isObject(targetSchema) && Object.hasOwn(targetSchema, 'example') && !isObject(targetSchema.example)) {
    errors.push(error('targetSchema.example 必须是对象'));
  }
  if (!Array.isArray(mappings)) errors.push(error('mappings 必须是数组'));
  if (!isObject(defaults)) errors.push(error('defaults 必须是对象'));
  if (errors.length) return errors;

  const targetSet = new Set(targetKeys);
  const required = Array.isArray(targetSchema.required) ? targetSchema.required.map(keyOf) : [];
  if (required.some((key) => !key || DANGEROUS_KEYS.has(key) || !targetSet.has(key))) {
    errors.push(error('required 包含未知目标字段'));
  }
  if (new Set(required).size !== required.length) errors.push(error('required 包含重复字段'));

  const sourceSet = new Set();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (DANGEROUS_KEYS.has(key)) errors.push(error('源数据包含危险字段', { field: key }));
      sourceSet.add(key);
    }
  }

  const seenFrom = new Set();
  const seenTo = new Set();
  for (const [index, mapping] of mappings.entries()) {
    if (!isObject(mapping)) {
      errors.push(error('字段映射必须是对象', { index }));
      continue;
    }
    const from = keyOf(mapping.from);
    const to = keyOf(mapping.to);
    if (!from || !to) {
      errors.push(error('字段映射必须包含 from 和 to', { index }));
      continue;
    }
    if (DANGEROUS_KEYS.has(from) || DANGEROUS_KEYS.has(to)) {
      errors.push(error('字段映射包含危险字段', { index }));
      continue;
    }
    if (seenFrom.has(from)) errors.push(error('源字段映射重复', { index, field: from }));
    if (seenTo.has(to)) errors.push(error('目标字段映射重复', { index, field: to }));
    seenFrom.add(from);
    seenTo.add(to);
    if (!sourceSet.has(from)) errors.push(error('字段映射包含未知源字段', { index, field: from }));
    if (!targetSet.has(to)) errors.push(error('字段映射包含未知目标字段', { index, field: to }));
  }

  for (const key of Object.keys(defaults)) {
    if (DANGEROUS_KEYS.has(key)) errors.push(error('默认值包含危险字段', { field: key }));
    else if (!targetSet.has(key)) errors.push(error('默认值包含未知目标字段', { field: key }));
  }
  return errors;
}

export function migrateRows(input) {
  try {
    const inputErrors = validateInput(input);
    if (inputErrors.length) return { rows: [], errors: inputErrors };

    const { rows, targetSchema, mappings, defaults } = input;
    const schema = normalizeSchema(targetSchema);
    const sourceByTarget = new Map(mappings.map(({ from, to }) => [keyOf(to), keyOf(from)]));
    const migratedRows = rows.map((source) => {
      const row = {};
      for (const target of schema.columns) {
        const sourceKey = sourceByTarget.get(target) || target;
        if (Object.hasOwn(source, sourceKey)) row[target] = source[sourceKey];
        else if (Object.hasOwn(defaults, target)) row[target] = defaults[target];
        else row[target] = '';
      }
      return row;
    });
    const errors = [];
    for (const [index, row] of migratedRows.entries()) {
      for (const field of schema.required) {
        if (row[field] === null || row[field] === undefined || String(row[field]).trim() === '') {
          errors.push({ row: index + 1, field, message: '必填字段不能为空' });
        }
      }
    }
    return { rows: migratedRows, errors };
  } catch {
    return { rows: [], errors: [error('迁移参数无法读取')] };
  }
}
