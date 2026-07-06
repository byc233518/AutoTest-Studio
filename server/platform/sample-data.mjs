function sequence(index) {
  return String(index + 1).padStart(3, '0');
}

function sampleValue(column, scenarioKey, index) {
  const seq = sequence(index);
  if (column.includes('编号') || column.includes('编码')) {
    if (scenarioKey.includes('customer')) return `AT-CUST-${seq}`;
    if (scenarioKey.includes('vendor')) return `AT-VEN-${seq}`;
    if (scenarioKey.includes('part')) return `AT-PART-${seq}`;
    return `AT-${seq}`;
  }
  if (column.includes('名称')) {
    if (scenarioKey.includes('customer')) return `自动化客户${seq}`;
    if (scenarioKey.includes('vendor')) return `自动化供应商${seq}`;
    if (scenarioKey.includes('part')) return `自动化物料${seq}`;
    return `自动化样例${seq}`;
  }
  if (column.includes('联系人')) return `测试员${seq}`;
  if (column.includes('类别')) return '自动化';
  if (column.includes('地址')) return `上海测试地址${seq}`;
  if (column.includes('天数')) return '0';
  if (column.includes('单位')) return 'PCS';
  if (column.includes('规格')) return `自动化规格${seq}`;
  if (column.includes('用户名')) return 'byc';
  if (column.includes('密码')) return 'Abcd1234';
  return `样例${seq}`;
}

export function generateSampleRows(scenario, count = 3) {
  const schema = JSON.parse(scenario.data_schema);
  const safeCount = Math.max(1, Math.min(Number(count) || 3, 20));
  return Array.from({ length: safeCount }, (_, index) => {
    return Object.fromEntries(schema.columns.map((column) => [column, sampleValue(column, scenario.key, index)]));
  });
}

export function rowsToCsv(rows, columns) {
  const escape = (value) => {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return `\uFEFF${columns.map(escape).join(',')}\n${rows.map((row) => columns.map((column) => escape(row[column])).join(',')).join('\n')}\n`;
}
