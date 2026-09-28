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
  const datasetPath = process.env.JMOM_DATASET_PATH || '';
  if (datasetPath) {
    const rows = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    if (Array.isArray(rows) && rows.length) return normalizeRows(rows, schema);
  }
  return normalizeRows([schema.example || {}], schema);
}

function recordedTitle(title, row) {
  const label = row.name || row.code || row.locatorCode || row.customerCode || row.partCode || row.vendorCode || row.__rowNumber;
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
