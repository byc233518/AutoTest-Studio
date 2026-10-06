const fs = require('node:fs');
const { config } = require('./config');

const scenarioKey = process.env.AUTOTEST_SCENARIO_KEY || '';
const datasetPath = process.env.AUTOTEST_DATASET_PATH || '';

function loadRows() {
  if (!datasetPath) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  } catch (error) {
    throw new Error(`读取样本数据失败：${error.message}`);
  }
}

function shouldRun(key) {
  return !scenarioKey || scenarioKey === key;
}

function annotateRows(rows) {
  return rows.map((row, index) => ({ ...row, __rowNumber: index + 1 }));
}

function rowsFor(key, fallbackFactory) {
  const rows = loadRows();
  if (scenarioKey === key && rows.length) {
    return annotateRows(rows);
  }
  return annotateRows([fallbackFactory(config.runTag)]);
}

function testRowTitle(prefix, label, row) {
  const text = label || 'default';
  return `${prefix} - ${text} #${row.__rowNumber}`;
}

module.exports = { rowsFor, shouldRun, testRowTitle };
