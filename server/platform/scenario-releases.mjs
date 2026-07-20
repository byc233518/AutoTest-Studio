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

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  return value;
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
    scriptEntry: snapshot.scriptEntry || '',
    snapshot,
    scriptLength: Buffer.byteLength(row.script_content || '', 'utf8'),
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
  const fromSnapshot = from.snapshot || {};
  const toSnapshot = to.snapshot || {};
  const equal = (left, right) => JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right));
  const scriptChanged = from.scriptHash !== to.scriptHash || fromSnapshot.scriptEntry !== toSnapshot.scriptEntry;
  const schemaChanged = !equal(fromSnapshot.dataSchema || {}, toSnapshot.dataSchema || {});
  const scenarioKeys = ['name', 'description', 'module', 'appId', 'moduleId', 'priority', 'owner', 'dependsOn'];
  const scenarioChanged = scenarioKeys.some((key) => !equal(fromSnapshot[key], toSnapshot[key]));
  const changedKeys = [];
  if (schemaChanged) changedKeys.push('dataSchema');
  if (from.scriptHash !== to.scriptHash) changedKeys.push('scriptContent');
  if (from.scriptHash !== to.scriptHash) changedKeys.push('scriptHash');
  if (fromSnapshot.scriptEntry !== toSnapshot.scriptEntry) changedKeys.push('scriptEntry');
  scenarioKeys.filter((key) => !equal(fromSnapshot[key], toSnapshot[key])).forEach((key) => changedKeys.push(key));
  return {
    from,
    to,
    snapshots: { from: fromSnapshot, to: toSnapshot },
    scriptChanged,
    schemaChanged,
    scenarioChanged,
    changedKeys,
    changes: { snapshot: fromSnapshot, compareTo: toSnapshot }
  };
}

export function compareScenarioDraft({ database, scenario, scriptContent = '', releaseId } = {}) {
  if (!database || !scenario) return null;
  const releases = listScenarioReleases(database, scenario.id);
  const release = releaseId
    ? getScenarioRelease(database, scenario.id, releaseId)
    : releases[0];
  if (!release) return null;

  const draft = snapshotFromScenario(scenario, {
    scriptEntry: scenario.script_entry || scenario.scriptEntry || '',
    scriptContent
  });
  const published = release.snapshot || {};
  const equal = (left, right) => JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right));
  const scriptChanged = draft.scriptHash !== release.scriptHash || draft.scriptEntry !== published.scriptEntry;
  const schemaChanged = !equal(draft.dataSchema || {}, published.dataSchema || {});
  const scenarioKeys = ['name', 'description', 'module', 'appId', 'moduleId', 'priority', 'owner', 'dependsOn'];
  const scenarioChangedKeys = scenarioKeys.filter((key) => !equal(draft[key], published[key]));
  const scenarioChanged = scenarioChangedKeys.length > 0;
  const labels = [scriptChanged && '脚本', schemaChanged && '字段', scenarioChanged && '基本信息'].filter(Boolean);

  return {
    release,
    version: release.version,
    changed: labels.length > 0,
    summary: labels.length ? `${labels.join('、')}有变化` : '内容一致',
    scriptChanged,
    schemaChanged,
    scenarioChanged,
    changedKeys: [
      ...(scriptChanged ? ['script'] : []),
      ...(schemaChanged ? ['dataSchema'] : []),
      ...scenarioChangedKeys
    ],
    changes: {
      script: { changed: scriptChanged },
      schema: { changed: schemaChanged },
      scenario: { changed: scenarioChanged, keys: scenarioChangedKeys }
    },
    snapshots: { draft, release: published }
  };
}

export function restoreScenarioRelease({ database, scenarioId, releaseId, scriptEntry }) {
  const row = database?.getScenarioReleaseById(releaseId);
  if (!row || row.scenario_id !== scenarioId) return null;
  let snapshot;
  try { snapshot = JSON.parse(row.snapshot_json || '{}'); } catch { return null; }
  const scenario = database.restoreScenarioRelease(scenarioId, releaseId, {
    ...snapshot,
    ...(scriptEntry ? { scriptEntry } : {})
  });
  return scenario ? { release: publicRelease(row), scriptContent: row.script_content, scenario } : null;
}

export { publicRelease, snapshotFromScenario };
