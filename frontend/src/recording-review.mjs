export function analyzeFieldMerges(fields = []) {
  const activeFields = fields.filter((field) => field && !field.ignored);
  const byCandidateId = new Map(activeFields
    .filter((field) => typeof field.candidateId === 'string' && field.candidateId)
    .map((field) => [field.candidateId, field]));
  const candidateIdsByTarget = new Map();
  const errors = new Set();

  for (const field of activeFields) {
    if (!field.candidateId) continue;
    let current = field;
    const visited = new Set();
    while (current?.mergeTo) {
      if (visited.has(current.candidateId)) {
        errors.add(`字段合并存在循环：${current.candidateId}`);
        current = null;
        break;
      }
      visited.add(current.candidateId);
      const target = byCandidateId.get(current.mergeTo);
      if (!target) {
        errors.add(`字段合并目标不存在：${current.mergeTo}`);
        current = null;
        break;
      }
      current = target;
    }
    if (!current?.candidateId) continue;
    const candidateIds = candidateIdsByTarget.get(current.candidateId) || [];
    candidateIds.push(field.candidateId);
    candidateIdsByTarget.set(current.candidateId, candidateIds);
  }

  return { candidateIdsByTarget, errors: [...errors] };
}

export function redirectMergeDependents(fields, candidateId, targetId) {
  if (!candidateId || !targetId) return fields;
  return fields.map((field) => field.mergeTo === candidateId ? { ...field, mergeTo: targetId } : field);
}

export function buildAssertionPayload(item) {
  const target = String(item.target ?? '');
  const compatibleKindByType = {
    value: new Set(['getByLabel', 'getByPlaceholder', 'getByRole']),
    visible: new Set(['getByLabel', 'getByPlaceholder', 'getByRole', 'getByText']),
    text: new Set(['getByLabel', 'getByPlaceholder', 'getByRole', 'getByText'])
  };
  let locator;
  if (item.type === 'url') {
    locator = { kind: 'page' };
  } else if (item.locator?.kind && item.locator.kind !== 'page' && compatibleKindByType[item.type]?.has(item.locator.kind)) {
    if (target === String(item.originalTarget ?? target)) {
      locator = item.locator;
    } else if (item.locator.kind === 'getByRole') {
      locator = {
        ...item.locator,
        value: target,
        options: { ...(item.locator.options || {}), name: target }
      };
    } else {
      locator = { ...item.locator, value: target };
    }
  } else {
    locator = item.type === 'value'
      ? { kind: 'getByLabel', value: target }
      : { kind: 'getByText', value: target };
  }

  return {
    type: item.type,
    label: target,
    expected: item.type === 'visible' ? undefined : item.expected,
    locator
  };
}
