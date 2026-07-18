import { createHash } from 'node:crypto';
import { parse } from 'acorn';
import { normalizeSchema } from './schema-sync.mjs';

function parseSchema(value) {
  try { return normalizeSchema(typeof value === 'string' ? JSON.parse(value || '{}') : value); } catch { return normalizeSchema({}); }
}

function snapshotFromScenario(scenario, { scriptEntry, scriptContent }) {
  return {
    name: scenario.name,
    description: scenario.description,
    module: scenario.module,
    appId: scenario.app_id ?? scenario.appId ?? '',
    moduleId: scenario.module_id ?? scenario.moduleId ?? '',
    priority: scenario.priority,
    owner: scenario.owner,
    version: scenario.version,
    dependsOn: scenario.depends_on ? JSON.parse(scenario.depends_on || '[]') : (scenario.dependsOn || []),
    dataSchema: parseSchema(scenario.data_schema ?? scenario.dataSchema),
    scriptEntry: scriptEntry || scenario.script_entry || scenario.scriptEntry || '',
    scriptHash: createHash('sha256').update(scriptContent).digest('hex')
  };
}

export function buildScenarioReleaseInput({ scenario, scriptContent = '', scriptEntry, createdBy = '' }) {
  const snapshot = snapshotFromScenario(scenario, { scriptEntry, scriptContent });
  return {
    scenarioId: scenario.id,
    snapshotJson: JSON.stringify(snapshot),
    scriptContent,
    scriptHash: createHash('sha256').update(scriptContent).digest('hex'),
    createdBy
  };
}

export function validateScenarioReleaseScript(scriptContent = '') {
  try {
    parse(scriptContent, { ecmaVersion: 'latest', sourceType: 'module' });
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function publicRelease(row) {
  if (!row) return null;
  let snapshot = {};
  try { snapshot = JSON.parse(row.snapshot_json || '{}'); } catch {}
  return {
    id: row.id,
    scenarioId: row.scenario_id,
    versionNo: row.version_no,
    version: `v${row.version_no}`,
    snapshot,
    scriptContent: row.script_content,
    scriptHash: row.script_hash,
    createdBy: row.created_by,
    createdAt: row.created_at
  };
}

export function createScenarioRelease({ database, scenario, scriptContent = '', scriptEntry, createdBy = '' }) {
  if (!database || !scenario) throw new TypeError('scenario is required');
  const row = database.createScenarioRelease(buildScenarioReleaseInput({ scenario, scriptContent, scriptEntry, createdBy }));
  return publicRelease(row);
}

export function listScenarioReleases(database, scenarioId) {
  return (database?.listScenarioReleases(scenarioId) || []).map(publicRelease);
}

export function getScenarioRelease(database, scenarioId, releaseId) {
  const row = database?.getScenarioReleaseById(releaseId);
  return row && (!scenarioId || row.scenario_id === scenarioId) ? publicRelease(row) : null;
}

export function compareScenarioRelease(database, scenarioId, releaseId, toReleaseId) {
  const from = getScenarioRelease(database, scenarioId, releaseId);
  const releases = listScenarioReleases(database, scenarioId);
  const to = toReleaseId ? getScenarioRelease(database, scenarioId, toReleaseId) : releases.find((item) => item.id !== releaseId) || from;
  if (!from || !to) return null;
  return { from, to, changes: { snapshot: from.snapshot, compareTo: to.snapshot } };
}

export function restoreScenarioRelease({ database, scenarioId, releaseId }) {
  const release = getScenarioRelease(database, scenarioId, releaseId);
  if (!release) return null;
  const scenario = database.restoreScenarioRelease(scenarioId, releaseId, release.snapshot);
  return scenario ? { release, scenario } : null;
}

export { publicRelease, snapshotFromScenario };
