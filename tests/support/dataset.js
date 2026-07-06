const fs = require('node:fs');
const { config } = require('./config');

const scenarioKey = process.env.JMOM_SCENARIO_KEY || '';
const datasetPath = process.env.JMOM_DATASET_PATH || '';

function loadRows() {
  if (!datasetPath) {
    return [];
  }
  return JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
}

function shouldRun(key) {
  return !scenarioKey || scenarioKey === key;
}

function rowsFor(key, fallbackFactory) {
  const rows = loadRows();
  if (scenarioKey === key && rows.length) {
    return rows;
  }
  return [fallbackFactory(config.runTag)];
}

module.exports = { rowsFor, shouldRun };
