import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes } from 'node:crypto';

function now() {
  return new Date().toISOString();
}

function hashPassword(password, salt) {
  return createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

export function createPasswordHash(password, salt = randomBytes(8).toString('hex')) {
  return `${salt}:${hashPassword(password, salt)}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  return hashPassword(password, salt) === hash;
}

export function createPlatformDatabase(filename) {
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
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS runs (
      id TEXT PRIMARY KEY,
      scenario_id TEXT NOT NULL,
      dataset_id TEXT NOT NULL,
      environment TEXT NOT NULL,
      execution_mode TEXT NOT NULL DEFAULT 'headless',
      status TEXT NOT NULL,
      triggered_by TEXT NOT NULL,
      started_at TEXT,
      finished_at TEXT,
      summary TEXT NOT NULL,
      report_path TEXT,
      error TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_by TEXT,
      updated_at TEXT NOT NULL
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
  `);
  migrateLegacySchema(db);

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
    ensureProject(project) {
      db.prepare('INSERT OR IGNORE INTO projects (id, name, description) VALUES (?, ?, ?)')
        .run(project.id, project.name, project.description);
    },
    ensureApp(app) {
      db.prepare('INSERT OR IGNORE INTO apps (id, key, name, description, sort) VALUES (?, ?, ?, ?, ?)')
        .run(app.id, app.key, app.name, app.description, app.sort);
    },
    ensureModule(module) {
      db.prepare('INSERT OR IGNORE INTO modules (id, app_id, name, prefix, sort) VALUES (?, ?, ?, ?, ?)')
        .run(module.id, module.appId, module.name, module.prefix, module.sort ?? 0);
    },
    ensureScenario(scenario) {
      const existing = this.getScenarioById(scenario.id);
      if (existing) {
        db.prepare(`
          UPDATE scenarios
          SET app_id = ?, module_id = ?, module = ?, name = ?, description = ?, data_schema = ?, updated_at = ?
          WHERE id = ?
        `).run(
          scenario.appId,
          scenario.moduleId,
          scenario.module,
          scenario.name,
          scenario.description,
          JSON.stringify(scenario.dataSchema),
          now(),
          scenario.id
        );
        return;
      }
      db.prepare(`
        INSERT OR IGNORE INTO scenarios
        (id, key, project_id, app_id, module_id, module, name, description, priority, status, version, owner, script_entry, data_schema, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        now(),
        now()
      );
    },
    listApps() {
      return db.prepare('SELECT * FROM apps ORDER BY sort, name').all();
    },
    listModules(appId) {
      if (appId) {
        return db.prepare('SELECT * FROM modules WHERE app_id = ? ORDER BY sort, name').all(appId);
      }
      return db.prepare('SELECT * FROM modules ORDER BY app_id, sort, name').all();
    },
    getDefaultProject() {
      return db.prepare('SELECT * FROM projects ORDER BY id LIMIT 1').get();
    },
    listScenarios() {
      return db.prepare(`
        SELECT * FROM scenarios
        ORDER BY
          CASE key
            WHEN 'auth-login' THEN 0
            WHEN 'wms-customer-create' THEN 1
            WHEN 'wms-vendor-create' THEN 2
            WHEN 'wms-part-create' THEN 3
            WHEN 'mes-workorder-create' THEN 4
            WHEN 'mes-workshop-line-create' THEN 5
            WHEN 'mes-barcode-pass' THEN 6
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
    updateScenarioStatus(id, status) {
      db.prepare('UPDATE scenarios SET status = ?, updated_at = ? WHERE id = ?').run(status, now(), id);
      return this.getScenarioById(id);
    },
    createDataset(dataset) {
      db.prepare(`
        INSERT INTO datasets
        (id, scenario_id, name, file_name, file_path, rows_path, row_count, validation_status, uploaded_by, errors, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        dataset.id,
        dataset.scenarioId,
        dataset.name,
        dataset.fileName,
        dataset.filePath,
        dataset.rowsPath,
        dataset.rowCount,
        dataset.validationStatus,
        dataset.uploadedBy,
        JSON.stringify(dataset.errors),
        now()
      );
      return this.getDatasetById(dataset.id);
    },
    listDatasets(scenarioId) {
      return db.prepare('SELECT * FROM datasets WHERE scenario_id = ? ORDER BY created_at DESC').all(scenarioId);
    },
    getDatasetById(id) {
      return db.prepare('SELECT * FROM datasets WHERE id = ?').get(id);
    },
    createRun(run) {
      db.prepare(`
        INSERT INTO runs
        (id, scenario_id, dataset_id, environment, execution_mode, status, triggered_by, started_at, finished_at, summary, report_path, error, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        run.id,
        run.scenarioId,
        run.datasetId,
        run.environment,
        run.executionMode || 'headless',
        run.status,
        run.triggeredBy,
        run.startedAt || null,
        run.finishedAt || null,
        JSON.stringify(run.summary || {}),
        run.reportPath || null,
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
        report_path: patch.reportPath ?? current.report_path,
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
      return db.prepare('SELECT * FROM runs WHERE id = ?').get(id);
    },
    listRuns() {
      return db.prepare(`
        SELECT runs.* FROM runs
        ORDER BY created_at DESC
        LIMIT 100
      `).all();
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
        artifact.filePath,
        artifact.url,
        now()
      );
      return artifact;
    },
    listRunArtifacts(runId) {
      return db.prepare('SELECT * FROM run_artifacts WHERE run_id = ? ORDER BY created_at, id').all(runId);
    }
  };
}

function tableColumns(db, tableName) {
  return db.prepare(`PRAGMA table_info(${tableName})`).all().map((column) => column.name);
}

function migrateLegacySchema(db) {
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
  const runColumns = tableColumns(db, 'runs');
  if (runColumns.length && !runColumns.includes('execution_mode')) {
    db.exec("ALTER TABLE runs ADD COLUMN execution_mode TEXT NOT NULL DEFAULT 'headless'");
  }
}
