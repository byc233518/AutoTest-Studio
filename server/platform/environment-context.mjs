const VARIABLE_KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function validValue(value) {
  return value === null
    || typeof value === 'string'
    || typeof value === 'boolean'
    || (typeof value === 'number' && Number.isFinite(value));
}

export function environmentVariablesObject(environment = {}) {
  let variables = environment.variables;
  if (variables === undefined) {
    try {
      variables = JSON.parse(environment.variables_json || '[]');
    } catch {
      variables = [];
    }
  }
  if (!Array.isArray(variables)) return {};

  const result = Object.create(null);
  for (const item of variables) {
    const key = typeof item?.key === 'string' ? item.key.trim() : '';
    if (!VARIABLE_KEY_PATTERN.test(key) || DANGEROUS_KEYS.has(key) || !validValue(item?.value)) continue;
    result[key] = item.value;
  }
  return { ...result };
}
