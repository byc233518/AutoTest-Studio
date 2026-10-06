function sequence(index) {
  return String(index + 1).padStart(3, '0');
}

function offsetDate(days) {
  const date = new Date('2026-07-08T00:00:00.000Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function sampleValue(column, scenarioKey, index, label = '') {
  const seq = sequence(index);
  const meaning = `${column}${label}`;
  if (/(?:日期|时间|交期|Date|Time)$/i.test(meaning)) return offsetDate(index);
  if (/(?:数量|数目|用量|容量|序号|索引|分配数|Qty|Count|Amount|Capacity|Index)$/i.test(meaning)) return '1';
  if (/(?:启用|有效|是否|状态|Enabled|Active|Flag|Status)$/i.test(meaning)) return 'Y';
  if (/(?:编号|编码|料号|单号|条码|Code|No|Number|Id)$/i.test(meaning)) return `AT-${seq}`;
  if (/(?:名称|品名|Name)$/i.test(meaning)) return `示例名称${seq}`;
  if (/(?:描述|备注|说明|Description|Remark|Desc)$/i.test(meaning)) return `示例说明${seq}`;
  if (column.includes('关键字') || column.includes('关键词')) return `示例任务${seq}`;
  if (column.includes('联系人') || column.includes('经办人')) return `测试员${seq}`;
  if (column.includes('类别') || column.includes('分类')) return '示例';
  if (column.includes('地址')) return `示例地址${seq}`;
  if (column.includes('用户名')) return 'demo';
  if (column.includes('密码')) return 'Pass123!';
  if (column.includes('天数')) return '0';
  if (column.includes('单位')) return 'PCS';
  if (column.includes('规格')) return `示例规格${seq}`;
  return `样例${seq}`;
}

export function generateSampleRows(scenario, count = 3, offset = 0) {
  const schema = JSON.parse(scenario.data_schema);
  const labels = new Map((schema.fields || []).map((field) => [field.key, field.label]));
  const safeCount = Math.max(1, Math.min(Number(count) || 3, 20));
  const safeOffset = Math.max(0, Number(offset) || 0);
  return Array.from({ length: safeCount }, (_, index) => {
    const rowIndex = safeOffset + index;
    return Object.fromEntries(schema.columns.map((column) => [
      column,
      sampleValue(column, scenario.key, rowIndex, labels.get(column) || '')
    ]));
  });
}

export function rowsToCsv(rows, columns) {
  const escape = (value) => {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return `\uFEFF${columns.map(escape).join(',')}\n${rows.map((row) => columns.map((column) => escape(row[column])).join(',')).join('\n')}\n`;
}
