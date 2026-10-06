import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { createProjectPathStore, isWithinProjectRoot } from './project-paths.mjs';

const SCENARIO_KEY_PATTERN = /^[a-z0-9]+(?:-+[a-z0-9]+)*$/;
const LEGACY_SCENARIO_KEY_PATTERN = /^legacyMes(?:-+[a-z0-9]+)+$/;

function now() {
  return new Date().toISOString();
}

function environmentInvariantError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function scenarioBatchError(code, message, details = {}) {
  return Object.assign(new Error(message), { code, ...details });
}

function repairEnvironmentDefaults(db) {
  const environments = db.prepare(`
    SELECT id, is_default, sort, name
    FROM environments
    ORDER BY is_default DESC, sort, name, id
  `).all();
  if (!environments.length) return;

  const defaultId = environments[0].id;
  db.exec('BEGIN IMMEDIATE');
  try {
    db.prepare(`
      UPDATE environments
      SET is_default = CASE WHEN id = ? THEN 1 ELSE 0 END
    `).run(defaultId);
    db.exec('COMMIT');
  } catch (error) {
    if (db.isTransaction) db.exec('ROLLBACK');
    throw error;
  }
}

function listMatchingFiles(rootDir, fileName, matches = []) {
  if (!existsSync(rootDir)) return matches;
  for (const entry of readdirSync(rootDir, { withFileTypes: true })) {
    const candidate = path.resolve(rootDir, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) listMatchingFiles(candidate, fileName, matches);
    else if (entry.name === fileName) matches.push(candidate);
  }
  return matches;
}

function legacySuffixCandidate(storedPath, baseDir) {
  const marker = path.basename(baseDir).toLocaleLowerCase('en-US');
  const parts = String(storedPath).split(/[\\/]+/);
  let markerIndex = -1;
  for (let index = 0; index < parts.length; index += 1) {
    if (parts[index].toLocaleLowerCase('en-US') === marker) markerIndex = index;
  }
  return markerIndex >= 0 && markerIndex < parts.length - 1
    ? path.resolve(baseDir, ...parts.slice(markerIndex + 1))
    : null;
}

function migrateStoredPath(pathStore, storedPath, { baseDir, preferred = [] }) {
  if (storedPath == null || storedPath === '') return null;
  if (!path.isAbsolute(storedPath) || isWithinProjectRoot(pathStore.root, storedPath)) {
    return pathStore.store(storedPath);
  }

  const candidates = [
    ...preferred,
    legacySuffixCandidate(storedPath, baseDir)
  ].filter(Boolean).filter((candidate) => isWithinProjectRoot(pathStore.root, candidate));
  const existing = candidates.find((candidate) => existsSync(candidate));
  if (existing) return pathStore.store(existing);

  const matches = listMatchingFiles(baseDir, path.basename(storedPath));
  if (matches.length === 1) return pathStore.store(matches[0]);

  const fallback = candidates[0] || path.resolve(baseDir, path.basename(storedPath));
  return pathStore.store(fallback);
}

function migrateStoredProjectPaths(db, pathStore, { uploadsDir, reportsDir }) {
  pathStore.store(uploadsDir);
  pathStore.store(reportsDir);
  db.exec('BEGIN IMMEDIATE');
  try {
    const datasets = db.prepare(`
      SELECT datasets.id, datasets.scenario_id, datasets.file_path, datasets.rows_path, scenarios.key AS scenario_key
      FROM datasets
      LEFT JOIN scenarios ON scenarios.id = datasets.scenario_id
    `).all();
    const updateDataset = db.prepare('UPDATE datasets SET file_path = ?, rows_path = ? WHERE id = ?');
    for (const dataset of datasets) {
      const directories = [dataset.scenario_key, dataset.scenario_id].filter(Boolean);
      const preferred = (storedPath) => directories.map((directory) => path.resolve(uploadsDir, directory, path.basename(storedPath)));
      updateDataset.run(
        migrateStoredPath(pathStore, dataset.file_path, { baseDir: uploadsDir, preferred: preferred(dataset.file_path) }),
        migrateStoredPath(pathStore, dataset.rows_path, { baseDir: uploadsDir, preferred: preferred(dataset.rows_path) }),
        dataset.id
      );
    }

    const updateRun = db.prepare('UPDATE runs SET report_path = ? WHERE id = ?');
    for (const run of db.prepare('SELECT id, report_path FROM runs WHERE report_path IS NOT NULL').all()) {
      updateRun.run(migrateStoredPath(pathStore, run.report_path, {
        baseDir: reportsDir,
        preferred: [path.resolve(reportsDir, run.id)]
      }), run.id);
    }

    const updatePlanRun = db.prepare('UPDATE test_plan_runs SET report_path = ? WHERE id = ?');
    for (const run of db.prepare('SELECT id, report_path FROM test_plan_runs WHERE report_path IS NOT NULL').all()) {
      updatePlanRun.run(migrateStoredPath(pathStore, run.report_path, {
        baseDir: reportsDir,
        preferred: [path.resolve(reportsDir, 'plan-runs', run.id, 'report.md')]
      }), run.id);
    }

    const updateArtifact = db.prepare('UPDATE run_artifacts SET file_path = ? WHERE id = ?');
    const artifacts = db.prepare(`
      SELECT run_artifacts.id, run_artifacts.run_id, run_artifacts.file_name, run_artifacts.file_path,
             runs.report_path
      FROM run_artifacts
      LEFT JOIN runs ON runs.id = run_artifacts.run_id
    `).all();
    for (const artifact of artifacts) {
      const reportDir = artifact.report_path
        ? pathStore.resolve(artifact.report_path)
        : path.resolve(reportsDir, artifact.run_id);
      updateArtifact.run(migrateStoredPath(pathStore, artifact.file_path, {
        baseDir: reportsDir,
        preferred: [path.resolve(reportDir, artifact.file_name)]
      }), artifact.id);
    }
    db.exec('COMMIT');
  } catch (error) {
    if (db.isTransaction) db.exec('ROLLBACK');
    throw error;
  }
}

function hashPassword(password, salt) {
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

export function createPasswordHash(password, salt = randomBytes(16).toString('hex')) {
  return 'scrypt:' + salt + ':' + scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password, stored) {
  const parts = stored.split(':');
  if (parts[0] === 'scrypt') {
    const actual = scryptSync(password, parts[1], 64);
    const expected = Buffer.from(parts[2], 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
  const [salt, hash] = parts;
  return hashPassword(password, salt) === hash;
}

export function createPlatformDatabase(filename, pathOptions = {}) {
  const db = new DatabaseSync(filename);
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS apps (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      sort INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      app_id TEXT NOT NULL,
      name TEXT NOT NULL,
      prefix TEXT NOT NULL,
      sort INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS scenarios (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      project_id TEXT NOT NULL,
      app_id TEXT NOT NULL DEFAULT '',
      module_id TEXT NOT NULL DEFAULT '',
      module TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL,
      version TEXT NOT NULL,
      owner TEXT NOT NULL,
      script_entry TEXT NOT NULL,
      data_schema TEXT NOT NULL,
      depends_on TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS scenario_releases (
      id TEXT PRIMARY KEY,
      scenario_id TEXT NOT NULL,
      version_no INTEGER NOT NULL,
      snapshot_json TEXT NOT NULL,
      script_content TEXT NOT NULL,
      script_hash TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE (scenario_id, version_no)
    );
    CREATE TABLE IF NOT EXISTS environments (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      base_url TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      variables_json TEXT NOT NULL DEFAULT '[]',
      is_default INTEGER NOT NULL DEFAULT 0,
      sort INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS datasets (
      id TEXT PRIMARY KEY,
      scenario_id TEXT NOT NULL,
      name TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      rows_path TEXT NOT NULL,
      row_count INTEGER NOT NULL,
      validation_status TEXT NOT NULL,
      uploaded_by TEXT NOT NULL,
      errors TEXT NOT NULL,
      schema_snapshot TEXT NOT NULL DEFAULT '{}',
      source_dataset_id TEXT,
      migration_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      scenario_id TEXT NOT NULL,
      scenario_name TEXT NOT NULL DEFAULT '',
      dataset_id TEXT NOT NULL,
      dataset_name TEXT NOT NULL DEFAULT '',
      environment TEXT NOT NULL,
      execution_mode TEXT NOT NULL DEFAULT 'headless',
      execution_location TEXT NOT NULL DEFAULT 'server',
      status TEXT NOT NULL,
      triggered_by TEXT NOT NULL,
      started_at TEXT,
      finished_at TEXT,
      summary TEXT NOT NULL,
      report_path TEXT,
      error TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS test_plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      environment TEXT NOT NULL,
      execution_mode TEXT NOT NULL,
      items_json TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS test_plan_runs (
      id TEXT PRIMARY KEY,
      test_plan_id TEXT NOT NULL,
      plan_snapshot_json TEXT NOT NULL,
      environment TEXT NOT NULL,
      execution_mode TEXT NOT NULL,
      status TEXT NOT NULL,
      total_items INTEGER NOT NULL DEFAULT 0,
      passed_items INTEGER NOT NULL DEFAULT 0,
      failed_items INTEGER NOT NULL DEFAULT 0,
      summary_json TEXT NOT NULL DEFAULT '{}',
      report_path TEXT,
      triggered_by TEXT NOT NULL,
      started_at TEXT,
      finished_at TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS test_plan_run_items (
      id TEXT PRIMARY KEY,
      test_plan_run_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      scenario_id TEXT NOT NULL,
      scenario_name TEXT NOT NULL DEFAULT '',
      dataset_id TEXT,
      dataset_name TEXT NOT NULL DEFAULT '',
      run_id TEXT,
      status TEXT NOT NULL,
      error TEXT,
      started_at TEXT,
      finished_at TEXT,
      UNIQUE (test_plan_run_id, position)
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_by TEXT,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS asset_tombstones (
      asset_type TEXT NOT NULL,
      asset_key TEXT NOT NULL,
      asset_id TEXT NOT NULL DEFAULT '',
      deleted_at TEXT NOT NULL,
      PRIMARY KEY (asset_type, asset_key)
    );
    CREATE TABLE IF NOT EXISTS run_artifacts (
      id TEXT PRIMARY KEY,
      run_id TEXT NOT NULL,
      type TEXT NOT NULL,
      label TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      url TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS platform_entities (
      id TEXT PRIMARY KEY, type TEXT NOT NULL, name TEXT NOT NULL, payload TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 1, created_by TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY, actor TEXT NOT NULL, action TEXT NOT NULL, target_type TEXT NOT NULL,
      target_id TEXT NOT NULL, detail TEXT NOT NULL, created_at TEXT NOT NULL
    );
  `);
  migrateLegacySchema(db);
  const pathStore = pathOptions.rootDir ? createProjectPathStore(pathOptions.rootDir) : null;
  if (pathStore) {
    migrateStoredProjectPaths(db, pathStore, {
      uploadsDir: path.resolve(pathOptions.uploadsDir || path.resolve(pathStore.root, 'uploads')),
      reportsDir: path.resolve(pathOptions.reportsDir || path.resolve(pathStore.root, 'reports'))
    });
  }
  repairEnvironmentDefaults(db);
  db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS environments_single_default
    ON environments (is_default)
    WHERE is_default = 1
  `);

  const storePath = (value) => pathStore ? pathStore.store(value) : value;
  const resolvePath = (value) => pathStore ? pathStore.resolve(value) : value;
  const hydrateDatasetPaths = (row) => row ? {
    ...row,
    file_path: resolvePath(row.file_path),
    rows_path: resolvePath(row.rows_path)
  } : row;
  const hydrateRunPath = (row) => row ? { ...row, report_path: resolvePath(row.report_path) } : row;
  const hydrateArtifactPath = (row) => row ? { ...row, file_path: resolvePath(row.file_path) } : row;

  return {
    raw: db,
    close() {
      db.close();
    },
    nextId(prefix) {
      const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
      return `${prefix}-${stamp}-${randomBytes(3).toString('hex').toUpperCase()}`;
    },
    createUser(user) {
      db.prepare(`
        INSERT INTO users (id, username, display_name, role, password_hash, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(user.id, user.username, user.displayName, user.role, createPasswordHash(user.password), now());
    },
    getUserByUsername(username) {
      return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    },
    verifyUser(username, password) {
      const user = this.getUserByUsername(username);
      if (!user || !verifyPassword(password, user.password_hash)) {
        return null;
      }
      return user;
    },
    createSession(userId) {
      const token = randomBytes(24).toString('hex');
      db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)').run(token, userId, now());
      return token;
    },
    getSession(token) {
      return db.prepare(`
        SELECT sessions.token, sessions.user_id, users.username, users.display_name, users.role
        FROM sessions
        JOIN users ON users.id = sessions.user_id
        WHERE sessions.token = ?
      `).get(token);
    },
    deleteSession(token) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    },
    hasAssetTombstone(assetType, assetKey) {
      return Boolean(db.prepare('SELECT 1 FROM asset_tombstones WHERE asset_type = ? AND asset_key = ?')
        .get(assetType, assetKey));
    },
    listAssetTombstones(assetType = '') {
      return assetType
        ? db.prepare('SELECT * FROM asset_tombstones WHERE asset_type = ? ORDER BY deleted_at, asset_key').all(assetType)
        : db.prepare('SELECT * FROM asset_tombstones ORDER BY asset_type, deleted_at, asset_key').all();
    },
    restoreAssetTombstones(rows) {
      if (!Array.isArray(rows)) throw new TypeError('资产墓碑必须是数组');
      db.exec('BEGIN IMMEDIATE');
      try {
        const restore = db.prepare(`
          INSERT INTO asset_tombstones (asset_type, asset_key, asset_id, deleted_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(asset_type, asset_key) DO UPDATE SET
            asset_id = excluded.asset_id,
            deleted_at = excluded.deleted_at
        `);
        for (const row of rows) {
          if (!row?.asset_type || !row?.asset_key || !row?.deleted_at) {
            throw new TypeError('资产墓碑数据无效');
          }
          restore.run(row.asset_type, row.asset_key, row.asset_id || '', row.deleted_at);
        }
        db.exec('COMMIT');
        return rows.length;
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    ensureProject(project) {
      db.prepare('INSERT OR IGNORE INTO projects (id, name, description) VALUES (?, ?, ?)')
        .run(project.id, project.name, project.description);
    },
    updateProject(id, patch) {
      const current = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
      if (!current) return null;
      db.prepare('UPDATE projects SET name = ?, description = ? WHERE id = ?')
        .run(
          patch.name ?? current.name,
          patch.description ?? current.description,
          id
        );
      return db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    },
    ensureApp(app) {
      const existing = this.getAppById(app.id) || this.getAppByKey(app.key);
      if (existing) {
        return this.updateApp(existing.id, app);
      }
      return this.createApp(app);
    },
    ensureModule(module) {
      const existing = this.getModuleById(module.id);
      if (existing) {
        return this.updateModule(existing.id, module);
      }
      return this.createModule(module);
    },
    ensureScenario(scenario) {
      if (this.hasAssetTombstone('scenario', scenario.key)) return null;
      const dependsOn = JSON.stringify(scenario.dependsOn || []);
      const existing = this.getScenarioById(scenario.id);
      if (existing) {
        db.prepare(`
          UPDATE scenarios
          SET app_id = ?, module_id = ?, module = ?, name = ?, description = ?,
              priority = ?, status = ?, script_entry = ?, data_schema = ?, depends_on = ?, updated_at = ?
          WHERE id = ?
        `).run(
          scenario.appId,
          scenario.moduleId,
          scenario.module,
          scenario.name,
          scenario.description,
          scenario.priority,
          scenario.status,
          scenario.scriptEntry,
          JSON.stringify(scenario.dataSchema),
          dependsOn,
          now(),
          scenario.id
        );
        return;
      }
      db.prepare(`
        INSERT OR IGNORE INTO scenarios
        (id, key, project_id, app_id, module_id, module, name, description, priority, status, version, owner, script_entry, data_schema, depends_on, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        scenario.id,
        scenario.key,
        scenario.projectId,
        scenario.appId,
        scenario.moduleId,
        scenario.module,
        scenario.name,
        scenario.description,
        scenario.priority,
        scenario.status,
        scenario.version,
        scenario.owner,
        scenario.scriptEntry,
        JSON.stringify(scenario.dataSchema),
        dependsOn,
        now(),
        now()
      );
    },
    createScenario(scenario) {
      if (!SCENARIO_KEY_PATTERN.test(scenario.key || '') && !LEGACY_SCENARIO_KEY_PATTERN.test(scenario.key || '')) {
        throw new TypeError('场景 key 只能包含小写字母、数字和连字符，且不能以连字符开头或结尾');
      }
      const id = scenario.id || this.nextId('SCN');
      const project = this.getDefaultProject();
      db.exec('BEGIN IMMEDIATE');
      try {
        db.prepare(`
          INSERT INTO scenarios
          (id, key, project_id, app_id, module_id, module, name, description, priority, status, version, owner, script_entry, data_schema, depends_on, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          id,
          scenario.key,
          scenario.projectId || project?.id || 'PRJ-AUTOTEST',
          scenario.appId || '',
          scenario.moduleId || '',
          scenario.module || '',
          scenario.name,
          scenario.description || '',
          scenario.priority || 'P2',
          scenario.status || 'draft',
          scenario.version || '0.1.0',
          scenario.owner || '',
          scenario.scriptEntry || '',
          JSON.stringify(scenario.dataSchema || { columns: [], required: [], example: {} }),
          JSON.stringify(scenario.dependsOn || []),
          now(),
          now()
        );
        db.prepare("DELETE FROM asset_tombstones WHERE asset_type = 'scenario' AND asset_key = ?").run(scenario.key);
        db.exec('COMMIT');
        return this.getScenarioById(id);
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    deleteScenario(id) {
      return db.prepare('DELETE FROM scenarios WHERE id = ?').run(id).changes > 0;
    },
    moveScenarios(ids, directory) {
      if (!Array.isArray(ids) || !ids.length) {
        throw new TypeError('请至少选择一个测试用例');
      }
      const placeholders = ids.map(() => '?').join(', ');
      db.exec('BEGIN IMMEDIATE');
      try {
        const existing = db.prepare(`SELECT id FROM scenarios WHERE id IN (${placeholders})`).all(...ids);
        const existingIds = new Set(existing.map((row) => row.id));
        const missingScenarioIds = ids.filter((id) => !existingIds.has(id));
        if (missingScenarioIds.length) {
          throw scenarioBatchError(
            'SCENARIOS_NOT_FOUND',
            `测试用例不存在: ${missingScenarioIds.join('、')}`,
            { missingScenarioIds }
          );
        }
        const update = db.prepare('UPDATE scenarios SET module = ?, updated_at = ? WHERE id = ?');
        const timestamp = now();
        for (const id of ids) update.run(directory, timestamp, id);
        db.exec('COMMIT');
        return ids.map((id) => this.getScenarioById(id));
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    deleteScenarios(ids) {
      if (!Array.isArray(ids) || !ids.length) {
        throw new TypeError('请至少选择一个测试用例');
      }
      const placeholders = ids.map(() => '?').join(', ');
      db.exec('BEGIN IMMEDIATE');
      try {
        const scenarios = db.prepare(`SELECT * FROM scenarios WHERE id IN (${placeholders})`).all(...ids);
        const scenarioById = new Map(scenarios.map((row) => [row.id, row]));
        const missingScenarioIds = ids.filter((id) => !scenarioById.has(id));
        if (missingScenarioIds.length) {
          throw scenarioBatchError(
            'SCENARIOS_NOT_FOUND',
            `测试用例不存在: ${missingScenarioIds.join('、')}`,
            { missingScenarioIds }
          );
        }

        const activeRuns = db.prepare(`
          SELECT id, scenario_id, status
          FROM runs
          WHERE scenario_id IN (${placeholders}) AND status IN ('queued', 'running')
        `).all(...ids);
        const activePlanItems = db.prepare(`
          SELECT test_plan_run_items.id, test_plan_run_items.scenario_id, test_plan_run_items.status
          FROM test_plan_run_items
          JOIN test_plan_runs ON test_plan_runs.id = test_plan_run_items.test_plan_run_id
          WHERE test_plan_run_items.scenario_id IN (${placeholders})
            AND test_plan_runs.status IN ('queued', 'running')
        `).all(...ids);
        if (activeRuns.length || activePlanItems.length) {
          throw scenarioBatchError(
            'SCENARIOS_IN_ACTIVE_RUN',
            '所选测试用例正在执行，完成后才能删除',
            {
              activeRunIds: activeRuns.map((row) => row.id),
              activePlanItemIds: activePlanItems.map((row) => row.id)
            }
          );
        }

        const selectedIds = new Set(ids);
        const selectedKeys = new Set(scenarios.map((row) => row.key));
        const updatedTestPlanIds = [];
        const deletedTestPlanIds = [];
        for (const plan of db.prepare('SELECT id, items_json FROM test_plans').all()) {
          const items = JSON.parse(plan.items_json || '[]');
          const remaining = items.filter((item) => !selectedIds.has(item?.scenarioId));
          if (remaining.length === items.length) continue;
          if (!remaining.length) {
            db.prepare('DELETE FROM test_plans WHERE id = ?').run(plan.id);
            deletedTestPlanIds.push(plan.id);
          } else {
            db.prepare('UPDATE test_plans SET items_json = ?, updated_at = ? WHERE id = ?')
              .run(JSON.stringify(remaining), now(), plan.id);
            updatedTestPlanIds.push(plan.id);
          }
        }

        const updatedDependencyScenarioIds = [];
        for (const candidate of db.prepare('SELECT id, depends_on FROM scenarios').all()) {
          if (selectedIds.has(candidate.id)) continue;
          const dependencies = JSON.parse(candidate.depends_on || '[]');
          const remaining = dependencies.filter((key) => !selectedKeys.has(key));
          if (remaining.length === dependencies.length) continue;
          db.prepare("UPDATE scenarios SET depends_on = ?, status = 'draft', updated_at = ? WHERE id = ?")
            .run(JSON.stringify(remaining), now(), candidate.id);
          updatedDependencyScenarioIds.push(candidate.id);
        }

        const datasets = db.prepare(`SELECT * FROM datasets WHERE scenario_id IN (${placeholders})`).all(...ids);
        const addTombstone = db.prepare(`
          INSERT INTO asset_tombstones (asset_type, asset_key, asset_id, deleted_at)
          VALUES ('scenario', ?, ?, ?)
          ON CONFLICT(asset_type, asset_key) DO UPDATE SET asset_id = excluded.asset_id, deleted_at = excluded.deleted_at
        `);
        const deletedAt = now();
        for (const scenario of scenarios) addTombstone.run(scenario.key, scenario.id, deletedAt);
        db.prepare(`DELETE FROM scenario_releases WHERE scenario_id IN (${placeholders})`).run(...ids);
        db.prepare(`DELETE FROM datasets WHERE scenario_id IN (${placeholders})`).run(...ids);
        db.prepare(`DELETE FROM scenarios WHERE id IN (${placeholders})`).run(...ids);
        db.exec('COMMIT');
        return {
          scenarios: ids.map((id) => scenarioById.get(id)),
          datasets: datasets.map(hydrateDatasetPaths),
          updatedTestPlanIds,
          deletedTestPlanIds,
          updatedDependencyScenarioIds
        };
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    updateScenario(key, patch) {
      const current = this.getScenarioByKey(key);
      if (!current) return null;
      const next = {
        name: patch.name ?? current.name,
        description: patch.description ?? current.description,
        module: patch.module ?? current.module,
        app_id: patch.appId ?? current.app_id,
        module_id: patch.moduleId ?? current.module_id,
        priority: patch.priority ?? current.priority,
        script_entry: patch.scriptEntry ?? current.script_entry,
        data_schema: patch.dataSchema !== undefined ? JSON.stringify(patch.dataSchema) : current.data_schema,
        depends_on: patch.dependsOn !== undefined ? JSON.stringify(patch.dependsOn) : current.depends_on,
        owner: patch.owner ?? current.owner,
        version: patch.version ?? current.version
      };
      db.prepare(`
        UPDATE scenarios
        SET name = ?, description = ?, module = ?, app_id = ?, module_id = ?, priority = ?,
            script_entry = ?, data_schema = ?, depends_on = ?, owner = ?, version = ?, status = 'draft', updated_at = ?
        WHERE key = ?
      `).run(
        next.name,
        next.description,
        next.module,
        next.app_id,
        next.module_id,
        next.priority,
        next.script_entry,
        next.data_schema,
        next.depends_on,
        next.owner,
        next.version,
        now(),
        key
      );
      return this.getScenarioByKey(key);
    },
    createScenarioRelease(release) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const next = Number(db.prepare('SELECT COALESCE(MAX(version_no), 0) + 1 AS value FROM scenario_releases WHERE scenario_id = ?').get(release.scenarioId).value);
        const id = release.id || this.nextId('REL');
        let snapshotJson = release.snapshotJson;
        try { const snapshot = JSON.parse(snapshotJson); snapshot.version = `v${next}`; snapshotJson = JSON.stringify(snapshot); } catch {}
        db.prepare(`
          INSERT INTO scenario_releases
          (id, scenario_id, version_no, snapshot_json, script_content, script_hash, created_by, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(id, release.scenarioId, next, snapshotJson, release.scriptContent, release.scriptHash, release.createdBy || '', now());
        db.exec('COMMIT');
        return this.getScenarioReleaseById(id);
      } catch (error) {
        try { db.exec('ROLLBACK'); } catch {}
        throw error;
      }
    },
    createScenarioReleaseAndPublish(release) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const next = Number(db.prepare('SELECT COALESCE(MAX(version_no), 0) + 1 AS value FROM scenario_releases WHERE scenario_id = ?').get(release.scenarioId).value);
        const id = release.id || this.nextId('REL');
        let snapshotJson = release.snapshotJson;
        try { const snapshot = JSON.parse(snapshotJson); snapshot.version = `v${next}`; snapshotJson = JSON.stringify(snapshot); } catch {}
        db.prepare(`
          INSERT INTO scenario_releases
          (id, scenario_id, version_no, snapshot_json, script_content, script_hash, created_by, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(id, release.scenarioId, next, snapshotJson, release.scriptContent, release.scriptHash, release.createdBy || '', now());
        db.prepare("UPDATE scenarios SET status = 'published', version = ?, updated_at = ? WHERE id = ?").run(`v${next}`, now(), release.scenarioId);
        db.exec('COMMIT');
        return { release: this.getScenarioReleaseById(id), scenario: this.getScenarioById(release.scenarioId) };
      } catch (error) {
        try { db.exec('ROLLBACK'); } catch {}
        throw error;
      }
    },
    listScenarioReleases(scenarioId) {
      return db.prepare('SELECT * FROM scenario_releases WHERE scenario_id = ? ORDER BY version_no DESC').all(scenarioId);
    },
    getScenarioReleaseById(id) {
      return db.prepare('SELECT * FROM scenario_releases WHERE id = ?').get(id);
    },
    getScenarioRelease(scenarioId, releaseId) {
      const row = this.getScenarioReleaseById(releaseId);
      return row && row.scenario_id === scenarioId ? row : null;
    },
    restoreScenarioRelease(scenarioId, releaseId, snapshot) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const current = this.getScenarioById(scenarioId);
        if (!current) {
          db.exec('ROLLBACK');
          return null;
        }
        db.prepare(`
          UPDATE scenarios
          SET name = ?, description = ?, module = ?, app_id = ?, module_id = ?, priority = ?,
              script_entry = ?, data_schema = ?, depends_on = ?, owner = ?, version = ?, status = 'draft', updated_at = ?
          WHERE id = ?
        `).run(snapshot.name ?? current.name, snapshot.description ?? current.description,
          snapshot.module ?? current.module, snapshot.appId ?? current.app_id, snapshot.moduleId ?? current.module_id,
          snapshot.priority ?? current.priority, snapshot.scriptEntry ?? current.script_entry,
          JSON.stringify(snapshot.dataSchema ?? JSON.parse(current.data_schema || '{}')),
          JSON.stringify(snapshot.dependsOn ?? JSON.parse(current.depends_on || '[]')),
          snapshot.owner ?? current.owner, snapshot.version ?? current.version, now(), scenarioId);
        db.exec('COMMIT');
        return this.getScenarioById(scenarioId);
      } catch (error) {
        try { db.exec('ROLLBACK'); } catch {}
        throw error;
      }
    },
    listApps() {
      return db.prepare('SELECT * FROM apps ORDER BY sort, name').all();
    },
    getAppById(id) {
      return db.prepare('SELECT * FROM apps WHERE id = ?').get(id);
    },
    getAppByKey(key) {
      return db.prepare('SELECT * FROM apps WHERE key = ?').get(key);
    },
    createApp(app) {
      const id = app.id || this.nextId('APP');
      db.prepare('INSERT INTO apps (id, key, name, description, sort) VALUES (?, ?, ?, ?, ?)')
        .run(id, app.key, app.name, app.description || '', app.sort ?? 99);
      return this.getAppById(id);
    },
    updateApp(id, patch) {
      const current = this.getAppById(id);
      if (!current) return null;
      db.prepare('UPDATE apps SET key = ?, name = ?, description = ?, sort = ? WHERE id = ?')
        .run(
          patch.key ?? current.key,
          patch.name ?? current.name,
          patch.description ?? current.description,
          patch.sort ?? current.sort,
          id
        );
      return this.getAppById(id);
    },
    getAppReferences(id) {
      return {
        modules: db.prepare('SELECT COUNT(*) AS count FROM modules WHERE app_id = ?').get(id).count,
        scenarios: db.prepare('SELECT COUNT(*) AS count FROM scenarios WHERE app_id = ?').get(id).count
      };
    },
    deleteApp(id) {
      return db.prepare('DELETE FROM apps WHERE id = ?').run(id).changes > 0;
    },
    listModules(appId) {
      if (appId) {
        return db.prepare('SELECT * FROM modules WHERE app_id = ? ORDER BY sort, name').all(appId);
      }
      return db.prepare('SELECT * FROM modules ORDER BY app_id, sort, name').all();
    },
    getModuleById(id) {
      return db.prepare('SELECT * FROM modules WHERE id = ?').get(id);
    },
    createModule(module) {
      const id = module.id || this.nextId('MOD');
      db.prepare('INSERT INTO modules (id, app_id, name, prefix, sort) VALUES (?, ?, ?, ?, ?)')
        .run(id, module.appId, module.name, module.prefix, module.sort ?? 99);
      return this.getModuleById(id);
    },
    updateModule(id, patch) {
      const current = this.getModuleById(id);
      if (!current) return null;
      db.prepare('UPDATE modules SET app_id = ?, name = ?, prefix = ?, sort = ? WHERE id = ?')
        .run(
          patch.appId ?? current.app_id,
          patch.name ?? current.name,
          patch.prefix ?? current.prefix,
          patch.sort ?? current.sort,
          id
        );
      return this.getModuleById(id);
    },
    countScenariosForModule(id) {
      return db.prepare('SELECT COUNT(*) AS count FROM scenarios WHERE module_id = ?').get(id).count;
    },
    deleteModule(id) {
      return db.prepare('DELETE FROM modules WHERE id = ?').run(id).changes > 0;
    },
    getDefaultProject() {
      return db.prepare('SELECT * FROM projects ORDER BY id LIMIT 1').get();
    },
    listScenarios() {
      return db.prepare(`
        SELECT * FROM scenarios
        ORDER BY
          CASE key
            WHEN 'sample-open-page' THEN 0
            WHEN 'sample-form-submit' THEN 1
            WHEN 'sample-search' THEN 2
            WHEN 'sample-data-driven' THEN 3
            ELSE 99
          END,
          priority,
          name
      `).all();
    },
    getScenarioByKey(key) {
      return db.prepare('SELECT * FROM scenarios WHERE key = ?').get(key);
    },
    getScenarioById(id) {
      return db.prepare('SELECT * FROM scenarios WHERE id = ?').get(id);
    },
    syncGeneratedCatalog({ scenarioIds, moduleIds }) {
      const expectedScenarios = new Set(scenarioIds || []);
      const expectedModules = new Set(moduleIds || []);
      if ([...expectedScenarios].some((id) => !id.startsWith('SCN-AUTO-'))
        || [...expectedModules].some((id) => !id.startsWith('MOD-AUTO-'))) {
        throw new TypeError('自动目录同步只接受 SCN-AUTO-* 和 MOD-AUTO-* 标识');
      }
      const staleScenarios = db.prepare("SELECT id FROM scenarios WHERE id LIKE 'SCN-AUTO-%'").all()
        .map((row) => row.id)
        .filter((id) => !expectedScenarios.has(id));
      const staleModules = db.prepare("SELECT id FROM modules WHERE id LIKE 'MOD-AUTO-%'").all()
        .map((row) => row.id)
        .filter((id) => !expectedModules.has(id));
      db.exec('BEGIN IMMEDIATE');
      try {
        for (const id of staleScenarios) {
          db.prepare('DELETE FROM run_artifacts WHERE run_id IN (SELECT id FROM runs WHERE scenario_id = ?)').run(id);
          db.prepare('DELETE FROM runs WHERE scenario_id = ?').run(id);
          db.prepare('DELETE FROM datasets WHERE scenario_id = ?').run(id);
          db.prepare('DELETE FROM scenario_releases WHERE scenario_id = ?').run(id);
          db.prepare('DELETE FROM scenarios WHERE id = ?').run(id);
        }
        let deletedModules = 0;
        for (const id of staleModules) {
          if (db.prepare('SELECT COUNT(*) AS count FROM scenarios WHERE module_id = ?').get(id).count) continue;
          deletedModules += db.prepare('DELETE FROM modules WHERE id = ?').run(id).changes;
        }
        db.exec('COMMIT');
        return { scenarios: staleScenarios.length, modules: deletedModules };
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    updateScenarioStatus(id, status) {
      db.prepare('UPDATE scenarios SET status = ?, updated_at = ? WHERE id = ?').run(status, now(), id);
      return this.getScenarioById(id);
    },
    listEnvironments() {
      return db.prepare('SELECT * FROM environments ORDER BY sort, name').all();
    },
    getEnvironmentByKey(key) {
      return db.prepare('SELECT * FROM environments WHERE key = ?').get(key);
    },
    getEnvironmentById(id) {
      return db.prepare('SELECT * FROM environments WHERE id = ?').get(id);
    },
    getDefaultEnvironment() {
      return db.prepare('SELECT * FROM environments WHERE is_default = 1 ORDER BY sort LIMIT 1').get()
        || db.prepare('SELECT * FROM environments ORDER BY sort, name LIMIT 1').get();
    },
    ensureEnvironment(env) {
      const existing = this.getEnvironmentById(env.id) || this.getEnvironmentByKey(env.key);
      if (!existing && this.hasAssetTombstone('environment', env.key)) return null;
      if (existing) {
        return this.updateEnvironment(existing.id, {
          key: env.key,
          name: env.name,
          baseUrl: env.baseUrl,
          username: env.username,
          password: env.password,
          variables: env.variables,
          isDefault: Boolean(env.isDefault),
          sort: env.sort ?? 0
        });
      }
      return this.createEnvironment(env);
    },
    createEnvironment(env) {
      const id = env.id || this.nextId('ENV');
      db.exec('BEGIN IMMEDIATE');
      try {
        const hasEnvironment = Boolean(db.prepare('SELECT 1 FROM environments LIMIT 1').get());
        const isDefault = Boolean(env.isDefault) || !hasEnvironment;
        if (isDefault) {
          db.prepare('UPDATE environments SET is_default = 0').run();
        }
        const timestamp = now();
        db.prepare(`
          INSERT INTO environments
          (id, key, name, base_url, username, password, variables_json, is_default, sort, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          id,
          env.key,
          env.name,
          env.baseUrl,
          env.username,
          env.password,
          JSON.stringify(env.variables ?? []),
          isDefault ? 1 : 0,
          env.sort ?? 0,
          timestamp,
          timestamp
        );
        db.prepare("DELETE FROM asset_tombstones WHERE asset_type = 'environment' AND asset_key = ?").run(env.key);
        db.exec('COMMIT');
        return this.getEnvironmentById(id);
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    updateEnvironment(id, patch) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const current = this.getEnvironmentById(id);
        if (!current) {
          db.exec('ROLLBACK');
          return null;
        }
        if (current.is_default && patch.isDefault === false) {
          throw environmentInvariantError(
            'DEFAULT_ENVIRONMENT_REQUIRED',
            '至少需要保留一个默认环境，请先设置其他环境为默认环境'
          );
        }
        const next = {
          key: patch.key ?? current.key,
          name: patch.name ?? current.name,
          base_url: patch.baseUrl ?? current.base_url,
          username: patch.username ?? current.username,
          password: patch.password ?? current.password,
          variables_json: patch.variables === undefined ? current.variables_json : JSON.stringify(patch.variables),
          is_default: patch.isDefault !== undefined ? (patch.isDefault ? 1 : 0) : current.is_default,
          sort: patch.sort ?? current.sort
        };
        if (next.is_default) {
          db.prepare('UPDATE environments SET is_default = 0 WHERE id <> ?').run(id);
        }
        db.prepare(`
          UPDATE environments
          SET key = ?, name = ?, base_url = ?, username = ?, password = ?, variables_json = ?, is_default = ?, sort = ?, updated_at = ?
          WHERE id = ?
        `).run(next.key, next.name, next.base_url, next.username, next.password, next.variables_json, next.is_default, next.sort, now(), id);
        if (next.key !== current.key) {
          db.prepare(`
            INSERT INTO asset_tombstones (asset_type, asset_key, asset_id, deleted_at)
            VALUES ('environment', ?, ?, ?)
            ON CONFLICT(asset_type, asset_key) DO UPDATE SET asset_id = excluded.asset_id, deleted_at = excluded.deleted_at
          `).run(current.key, current.id, now());
          db.prepare("DELETE FROM asset_tombstones WHERE asset_type = 'environment' AND asset_key = ?").run(next.key);
          db.prepare('UPDATE runs SET environment = ? WHERE environment = ?')
            .run(next.key, current.key);
          db.prepare('UPDATE test_plans SET environment = ?, updated_at = ? WHERE environment = ?')
            .run(next.key, now(), current.key);
          db.prepare('UPDATE test_plan_runs SET environment = ? WHERE environment = ?')
            .run(next.key, current.key);
        }
        db.exec('COMMIT');
        return this.getEnvironmentById(id);
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    deleteEnvironment(id) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const current = this.getEnvironmentById(id);
        if (!current) {
          db.exec('ROLLBACK');
          return false;
        }
        if (current.is_default) {
          throw environmentInvariantError(
            'DEFAULT_ENVIRONMENT_REQUIRED',
            '默认环境不能删除，请先设置其他环境为默认环境'
          );
        }
        const testPlanCount = Number(
          db.prepare('SELECT COUNT(*) AS count FROM test_plans WHERE environment = ?').get(current.key).count
        );
        const activeRunCount = Number(
          db.prepare("SELECT COUNT(*) AS count FROM runs WHERE environment = ? AND status IN ('queued', 'running')")
            .get(current.key).count
        );
        const activePlanRunCount = Number(
          db.prepare("SELECT COUNT(*) AS count FROM test_plan_runs WHERE environment = ? AND status IN ('queued', 'running')")
            .get(current.key).count
        );
        const references = testPlanCount + activeRunCount + activePlanRunCount;
        if (references > 0) {
          const usages = [
            testPlanCount ? `${testPlanCount} 个测试计划` : '',
            activeRunCount ? `${activeRunCount} 个执行任务` : '',
            activePlanRunCount ? `${activePlanRunCount} 个计划批次` : ''
          ].filter(Boolean);
          const error = environmentInvariantError(
            'ENVIRONMENT_IN_USE',
            `环境仍被 ${usages.join('、')}引用或使用，无法删除`
          );
          error.referenceCount = references;
          error.testPlanCount = testPlanCount;
          error.activeRunCount = activeRunCount;
          error.activePlanRunCount = activePlanRunCount;
          throw error;
        }
        db.prepare(`
          INSERT INTO asset_tombstones (asset_type, asset_key, asset_id, deleted_at)
          VALUES ('environment', ?, ?, ?)
          ON CONFLICT(asset_type, asset_key) DO UPDATE SET asset_id = excluded.asset_id, deleted_at = excluded.deleted_at
        `).run(current.key, current.id, now());
        const deleted = db.prepare('DELETE FROM environments WHERE id = ?').run(id).changes > 0;
        db.exec('COMMIT');
        return deleted;
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    countTestPlansForEnvironment(key) {
      return Number(db.prepare('SELECT COUNT(*) AS count FROM test_plans WHERE environment = ?').get(key).count);
    },
    getLatestPassedRunForScenario(scenarioId) {
      return hydrateRunPath(db.prepare(`
        SELECT * FROM runs
        WHERE scenario_id = ? AND status = 'passed'
        ORDER BY finished_at DESC, created_at DESC
        LIMIT 1
      `).get(scenarioId));
    },
    createDataset(dataset) {
      db.prepare(`
        INSERT INTO datasets
        (id, scenario_id, name, file_name, file_path, rows_path, row_count, validation_status, uploaded_by, errors,
         schema_snapshot, source_dataset_id, migration_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        dataset.id,
        dataset.scenarioId,
        dataset.name,
        dataset.fileName,
        storePath(dataset.filePath),
        storePath(dataset.rowsPath),
        dataset.rowCount,
        dataset.validationStatus,
        dataset.uploadedBy,
        JSON.stringify(dataset.errors),
        JSON.stringify(dataset.schemaSnapshot || {}),
        dataset.sourceDatasetId || null,
        JSON.stringify(dataset.migration || {}),
        now()
      );
      return this.getDatasetById(dataset.id);
    },
    listDatasets(scenarioId) {
      return db.prepare('SELECT * FROM datasets WHERE scenario_id = ? ORDER BY created_at DESC').all(scenarioId).map(hydrateDatasetPaths);
    },
    getDatasetById(id) {
      return hydrateDatasetPaths(db.prepare('SELECT * FROM datasets WHERE id = ?').get(id));
    },
    createDatasetsAtomically(datasets) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const created = datasets.map((dataset) => this.createDataset(dataset));
        db.exec('COMMIT');
        return created;
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    createRun(run) {
      const scenarioName = run.scenarioName || this.getScenarioById(run.scenarioId)?.name || run.scenarioId;
      const datasetName = run.datasetName || this.getDatasetById(run.datasetId)?.name || run.datasetId;
      db.prepare(`
        INSERT INTO runs
        (id, scenario_id, scenario_name, dataset_id, dataset_name, environment, execution_mode, execution_location,
         status, triggered_by, started_at, finished_at, summary, report_path, error, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        run.id,
        run.scenarioId,
        scenarioName,
        run.datasetId,
        datasetName,
        run.environment,
        run.executionMode || 'headless',
        run.executionLocation || 'server',
        run.status,
        run.triggeredBy,
        run.startedAt || null,
        run.finishedAt || null,
        JSON.stringify(run.summary || {}),
        storePath(run.reportPath || null),
        run.error || null,
        now()
      );
      return this.getRunById(run.id);
    },
    updateRun(id, patch) {
      const current = this.getRunById(id);
      const next = {
        status: patch.status ?? current.status,
        started_at: patch.startedAt ?? current.started_at,
        finished_at: patch.finishedAt ?? current.finished_at,
        summary: JSON.stringify(patch.summary ?? JSON.parse(current.summary || '{}')),
        report_path: storePath(patch.reportPath ?? current.report_path),
        error: patch.error ?? current.error
      };
      db.prepare(`
        UPDATE runs
        SET status = ?, started_at = ?, finished_at = ?, summary = ?, report_path = ?, error = ?
        WHERE id = ?
      `).run(next.status, next.started_at, next.finished_at, next.summary, next.report_path, next.error, id);
      return this.getRunById(id);
    },
    getRunById(id) {
      return hydrateRunPath(db.prepare('SELECT * FROM runs WHERE id = ?').get(id));
    },
    listRuns() {
      return db.prepare(`
        SELECT runs.* FROM runs
        ORDER BY created_at DESC
        LIMIT 100
      `).all().map(hydrateRunPath);
    },
    listRunsForScenario(scenarioId, limit = 10) {
      return db.prepare('SELECT * FROM runs WHERE scenario_id = ? ORDER BY created_at DESC LIMIT ?').all(scenarioId, limit).map(hydrateRunPath);
    },
    createTestPlan(plan) {
      const id = plan.id || this.nextId('TPL');
      const timestamp = now();
      db.prepare(`
        INSERT INTO test_plans
        (id, name, description, environment, execution_mode, items_json, created_by, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        plan.name,
        plan.description || '',
        plan.environment,
        plan.executionMode,
        JSON.stringify(plan.items || []),
        plan.createdBy || '',
        timestamp,
        timestamp
      );
      return this.getTestPlanById(id);
    },
    updateTestPlan(id, patch) {
      const current = this.getTestPlanById(id);
      if (!current) return null;
      db.prepare(`
        UPDATE test_plans
        SET name = ?, description = ?, environment = ?, execution_mode = ?, items_json = ?, updated_at = ?
        WHERE id = ?
      `).run(
        patch.name ?? current.name,
        patch.description ?? current.description,
        patch.environment ?? current.environment,
        patch.executionMode ?? current.execution_mode,
        JSON.stringify(patch.items ?? JSON.parse(current.items_json || '[]')),
        now(),
        id
      );
      return this.getTestPlanById(id);
    },
    deleteTestPlan(id) {
      return db.prepare('DELETE FROM test_plans WHERE id = ?').run(id).changes > 0;
    },
    getTestPlanById(id) {
      return db.prepare('SELECT * FROM test_plans WHERE id = ?').get(id);
    },
    listTestPlans() {
      return db.prepare('SELECT * FROM test_plans ORDER BY updated_at DESC, name').all();
    },
    createTestPlanRun(run, items) {
      db.exec('BEGIN IMMEDIATE');
      try {
        db.prepare(`
          INSERT INTO test_plan_runs
          (id, test_plan_id, plan_snapshot_json, environment, execution_mode, status, total_items,
           passed_items, failed_items, summary_json, report_path, triggered_by, started_at, finished_at, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          run.id,
          run.testPlanId,
          JSON.stringify(run.planSnapshot || {}),
          run.environment,
          run.executionMode,
          run.status || 'queued',
          items.length,
          0,
          0,
          '{}',
          null,
          run.triggeredBy || '',
          null,
          null,
          now()
        );
        const insertItem = db.prepare(`
          INSERT INTO test_plan_run_items
          (id, test_plan_run_id, position, scenario_id, scenario_name, dataset_id, dataset_name, run_id,
           status, error, started_at, finished_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        for (const item of items) {
          insertItem.run(
            item.id,
            run.id,
            item.position,
            item.scenarioId,
            item.scenarioName || item.scenarioId,
            item.datasetId || null,
            item.datasetName || '',
            null,
            'queued',
            null,
            null,
            null
          );
        }
        db.exec('COMMIT');
        return this.getTestPlanRunById(run.id);
      } catch (error) {
        if (db.isTransaction) db.exec('ROLLBACK');
        throw error;
      }
    },
    updateTestPlanRun(id, patch) {
      const current = this.getTestPlanRunById(id);
      if (!current) return null;
      db.prepare(`
        UPDATE test_plan_runs
        SET status = ?, passed_items = ?, failed_items = ?, summary_json = ?, report_path = ?,
            started_at = ?, finished_at = ?
        WHERE id = ?
      `).run(
        patch.status ?? current.status,
        patch.passedItems ?? current.passed_items,
        patch.failedItems ?? current.failed_items,
        JSON.stringify(patch.summary ?? JSON.parse(current.summary_json || '{}')),
        storePath(patch.reportPath ?? current.report_path),
        patch.startedAt ?? current.started_at,
        patch.finishedAt ?? current.finished_at,
        id
      );
      return this.getTestPlanRunById(id);
    },
    getTestPlanRunById(id) {
      return hydrateRunPath(db.prepare('SELECT * FROM test_plan_runs WHERE id = ?').get(id));
    },
    listTestPlanRuns(testPlanId) {
      return testPlanId
        ? db.prepare('SELECT * FROM test_plan_runs WHERE test_plan_id = ? ORDER BY created_at DESC').all(testPlanId).map(hydrateRunPath)
        : db.prepare('SELECT * FROM test_plan_runs ORDER BY created_at DESC').all().map(hydrateRunPath);
    },
    listScenarioSelectionRuns(limit = 20) {
      return db.prepare(`
        SELECT * FROM test_plan_runs
        WHERE test_plan_id LIKE 'BLK-%'
        ORDER BY created_at DESC, id DESC
        LIMIT ?
      `).all(limit).map(hydrateRunPath);
    },
    getTestPlanRunItemById(id) {
      return db.prepare('SELECT * FROM test_plan_run_items WHERE id = ?').get(id);
    },
    listTestPlanRunItems(testPlanRunId) {
      return db.prepare('SELECT * FROM test_plan_run_items WHERE test_plan_run_id = ? ORDER BY position').all(testPlanRunId);
    },
    updateTestPlanRunItem(id, patch) {
      const current = this.getTestPlanRunItemById(id);
      if (!current) return null;
      db.prepare(`
        UPDATE test_plan_run_items
        SET dataset_id = ?, run_id = ?, status = ?, error = ?, started_at = ?, finished_at = ?
        WHERE id = ?
      `).run(
        patch.datasetId ?? current.dataset_id,
        patch.runId ?? current.run_id,
        patch.status ?? current.status,
        patch.error ?? current.error,
        patch.startedAt ?? current.started_at,
        patch.finishedAt ?? current.finished_at,
        id
      );
      return this.getTestPlanRunItemById(id);
    },
    listEntities(type) {
      return db.prepare('SELECT * FROM platform_entities WHERE type = ? ORDER BY created_at DESC').all(type);
    },
    createEntity(entity) {
      const id = entity.id || this.nextId(entity.prefix || 'ENT');
      db.prepare('INSERT INTO platform_entities (id, type, name, payload, enabled, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .run(id, entity.type, entity.name, JSON.stringify(entity.payload || {}), entity.enabled === false ? 0 : 1, entity.createdBy || '', now(), now());
      return db.prepare('SELECT * FROM platform_entities WHERE id = ?').get(id);
    },
    updateEntity(id, patch) {
      const current = db.prepare('SELECT * FROM platform_entities WHERE id = ?').get(id);
      if (!current) return null;
      db.prepare('UPDATE platform_entities SET name = ?, payload = ?, enabled = ?, updated_at = ? WHERE id = ?')
        .run(patch.name ?? current.name, JSON.stringify(patch.payload ?? JSON.parse(current.payload)), patch.enabled === undefined ? current.enabled : (patch.enabled ? 1 : 0), now(), id);
      return db.prepare('SELECT * FROM platform_entities WHERE id = ?').get(id);
    },
    createAuditLog(log) {
      const id = this.nextId('AUD');
      db.prepare('INSERT INTO audit_logs (id, actor, action, target_type, target_id, detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(id, log.actor || '', log.action, log.targetType || '', log.targetId || '', JSON.stringify(log.detail || {}), now());
      return id;
    },
    listAuditLogs() {
      return db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 200').all();
    },
    getSetting(key) {
      return db.prepare('SELECT * FROM settings WHERE key = ?').get(key);
    },
    setSetting(key, value, userId) {
      db.prepare(`
        INSERT INTO settings (key, value, updated_by, updated_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_by = excluded.updated_by, updated_at = excluded.updated_at
      `).run(key, JSON.stringify(value), userId, now());
      return this.getSetting(key);
    },
    createRunArtifact(artifact) {
      db.prepare(`
        INSERT INTO run_artifacts (id, run_id, type, label, file_name, file_path, url, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        artifact.id,
        artifact.runId,
        artifact.type,
        artifact.label,
        artifact.fileName,
        storePath(artifact.filePath),
        artifact.url,
        now()
      );
      return artifact;
    },
    listRunArtifacts(runId) {
      return db.prepare('SELECT * FROM run_artifacts WHERE run_id = ? ORDER BY created_at, id').all(runId).map(hydrateArtifactPath);
    }
  };
}

function tableColumns(db, tableName) {
  return db.prepare(`PRAGMA table_info(${tableName})`).all().map((column) => column.name);
}

function migrateLegacySchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS scenario_releases (
      id TEXT PRIMARY KEY,
      scenario_id TEXT NOT NULL,
      version_no INTEGER NOT NULL,
      snapshot_json TEXT NOT NULL,
      script_content TEXT NOT NULL,
      script_hash TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE (scenario_id, version_no)
    );
  `);
  const moduleColumns = tableColumns(db, 'modules');
  if (moduleColumns.length && !moduleColumns.includes('app_id')) {
    db.exec('DROP TABLE modules');
    db.exec(`
      CREATE TABLE modules (
        id TEXT PRIMARY KEY,
        app_id TEXT NOT NULL,
        name TEXT NOT NULL,
        prefix TEXT NOT NULL,
        sort INTEGER NOT NULL DEFAULT 0
      );
    `);
  }
  const scenarioColumns = tableColumns(db, 'scenarios');
  if (scenarioColumns.length && !scenarioColumns.includes('app_id')) {
    db.exec("ALTER TABLE scenarios ADD COLUMN app_id TEXT NOT NULL DEFAULT ''");
  }
  if (scenarioColumns.length && !scenarioColumns.includes('module_id')) {
    db.exec("ALTER TABLE scenarios ADD COLUMN module_id TEXT NOT NULL DEFAULT ''");
  }
  if (scenarioColumns.length && !scenarioColumns.includes('depends_on')) {
    db.exec("ALTER TABLE scenarios ADD COLUMN depends_on TEXT NOT NULL DEFAULT '[]'");
  }
  const runColumns = tableColumns(db, 'runs');
  if (runColumns.length && !runColumns.includes('scenario_name')) {
    db.exec("ALTER TABLE runs ADD COLUMN scenario_name TEXT NOT NULL DEFAULT ''");
  }
  if (runColumns.length && !runColumns.includes('dataset_name')) {
    db.exec("ALTER TABLE runs ADD COLUMN dataset_name TEXT NOT NULL DEFAULT ''");
  }
  if (runColumns.length && !runColumns.includes('execution_mode')) {
    db.exec("ALTER TABLE runs ADD COLUMN execution_mode TEXT NOT NULL DEFAULT 'headless'");
  }
  if (runColumns.length && !runColumns.includes('execution_location')) {
    db.exec("ALTER TABLE runs ADD COLUMN execution_location TEXT NOT NULL DEFAULT 'server'");
  }
  const datasetColumns = tableColumns(db, 'datasets');
  if (datasetColumns.length && !datasetColumns.includes('schema_snapshot')) {
    db.exec("ALTER TABLE datasets ADD COLUMN schema_snapshot TEXT NOT NULL DEFAULT '{}'");
  }
  if (datasetColumns.length && !datasetColumns.includes('source_dataset_id')) {
    db.exec('ALTER TABLE datasets ADD COLUMN source_dataset_id TEXT');
  }
  if (datasetColumns.length && !datasetColumns.includes('migration_json')) {
    db.exec("ALTER TABLE datasets ADD COLUMN migration_json TEXT NOT NULL DEFAULT '{}'");
  }
  const environmentColumns = tableColumns(db, 'environments');
  if (environmentColumns.length && !environmentColumns.includes('variables_json')) {
    db.exec("ALTER TABLE environments ADD COLUMN variables_json TEXT NOT NULL DEFAULT '[]'");
  }
  const testPlanItemColumns = tableColumns(db, 'test_plan_run_items');
  if (testPlanItemColumns.length && !testPlanItemColumns.includes('scenario_name')) {
    db.exec("ALTER TABLE test_plan_run_items ADD COLUMN scenario_name TEXT NOT NULL DEFAULT ''");
  }
  if (testPlanItemColumns.length && !testPlanItemColumns.includes('dataset_name')) {
    db.exec("ALTER TABLE test_plan_run_items ADD COLUMN dataset_name TEXT NOT NULL DEFAULT ''");
  }
  db.exec(`
    UPDATE runs
    SET scenario_name = COALESCE(NULLIF(scenario_name, ''), (SELECT name FROM scenarios WHERE scenarios.id = runs.scenario_id), scenario_id),
        dataset_name = COALESCE(NULLIF(dataset_name, ''), (SELECT name FROM datasets WHERE datasets.id = runs.dataset_id), dataset_id)
    WHERE scenario_name = '' OR dataset_name = '';
    UPDATE test_plan_run_items
    SET scenario_name = COALESCE(NULLIF(scenario_name, ''), (SELECT name FROM scenarios WHERE scenarios.id = test_plan_run_items.scenario_id), scenario_id),
        dataset_name = CASE
          WHEN dataset_id IS NULL THEN ''
          ELSE COALESCE(NULLIF(dataset_name, ''), (SELECT name FROM datasets WHERE datasets.id = test_plan_run_items.dataset_id), dataset_id)
        END
    WHERE scenario_name = '' OR (dataset_id IS NOT NULL AND dataset_name = '');
  `);
}
