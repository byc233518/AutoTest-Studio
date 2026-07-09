function sequence(index) {
  return String(index + 1).padStart(3, '0');
}

function offsetDate(days) {
  const date = new Date('2026-07-08T00:00:00.000Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function sampleValue(column, scenarioKey, index) {
  const seq = sequence(index);
  if (scenarioKey === 'mes-workorder-create') {
    if (column === '物料编码') return `AT-PART-${seq}`;
    if (column === '工单类型') return '正常';
    if (column === '工单状态') return '已创建';
    if (column === '目标量') return '10';
    if (column === '车间名称') return `自动化车间${seq}`;
    if (column === '客户订单号') return `AT-CO-${seq}`;
    if (column === '客户料号') return `AT-OEM-${seq}`;
    if (column === '客户品名') return `自动化客户品名${seq}`;
    if (column === '客户规格') return `自动化客户规格${seq}`;
    if (column === '开始日期') return offsetDate(index);
    if (column === '完工日期') return offsetDate(index + 1);
    if (column === '客户交期') return offsetDate(index + 7);
  }
  if (scenarioKey === 'mes-workshop-line-create') {
    if (column === '车间编码') return `AT-WS-${seq}`;
    if (column === '车间名称') return `自动化车间${seq}`;
    if (column === '线体编码') return `AT-LINE-${seq}`;
    if (column === '线体名称') return `自动化线体${seq}`;
    if (column === '工段') return '总装';
    if (column === '所属工序') return '总装';
    if (column === '区域序号') return String(index + 1);
  }
  if (scenarioKey === 'mes-barcode-pass') {
    if (column === '作业看板编码') return 'DesktopReportWork';
    if (column === '工单号') return `AT-WO-${seq}`;
    if (column === '线体ID') return '';
    if (column === '车间名称') return `自动化车间${seq}`;
    if (column === '线体名称') return `自动化线体${seq}`;
    if (column === '工序名称') return '总装';
    if (column === '条码') return `AT-SN-${seq}`;
    if (column === '良品数') return '1';
    if (column === '次品数') return '0';
    if (column === '是否扫码提交') return '是';
  }
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
