const fs = require('node:fs');

function normalizeRows(rows, schema = {}) {
  const columns = Array.isArray(schema.columns) ? schema.columns : [];
  return rows.map((row, index) => ({
    ...Object.fromEntries(columns.map((column) => [column, row[column] ?? ''])),
    ...row,
    __rowNumber: index + 1
  }));
}

function loadRecordedRows(schema = {}) {
  const datasetPath = process.env.AUTOTEST_DATASET_PATH || '';
  if (datasetPath) {
    const rows = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    if (Array.isArray(rows) && rows.length) return normalizeRows(rows, schema);
  }
  return normalizeRows([schema.example || {}], schema);
}

function recordedTitle(title, row) {
  const skip = new Set(['__rowNumber']);
  const firstValue = Object.entries(row).find(([key, value]) => !skip.has(key) && value != null && String(value).trim())?.[1];
  const label = row.记录编码 || row.记录名称 || row.关键字 || row.name || row.code || firstValue || row.__rowNumber;
  return `${title} - ${label} #${row.__rowNumber}`;
}

function defineRecordedTests(test, title, schema, callback) {
  for (const row of loadRecordedRows(schema)) {
    test(recordedTitle(title, row), async ({ page }, testInfo) => callback({ page }, row, testInfo));
  }
}

module.exports = {
  defineRecordedTests,
  loadRecordedRows,
  recordedTitle
};
