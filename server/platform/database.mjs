import { DatabaseSync } from 'node:sqlite';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

function now() {
  return new Date().toISOString();
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
      depends_on TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS environments (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      base_url TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
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
      dataset_id TEXT NOT NULL,
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
      const id = scenario.id || this.nextId('SCN');
      const project = this.getDefaultProject();
      db.prepare(`
        INSERT INTO scenarios
        (id, key, project_id, app_id, module_id, module, name, description, priority, status, version, owner, script_entry, data_schema, depends_on, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        scenario.key,
        scenario.projectId || project?.id || 'PRJ-JMOM',
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
      return this.getScenarioById(id);
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
            script_entry = ?, data_schema = ?, depends_on = ?, owner = ?, version = ?, updated_at = ?
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
            WHEN 'auth-login' THEN 0
            WHEN 'wms-customer-create' THEN 1
            WHEN 'wms-vendor-create' THEN 2
            WHEN 'wms-part-create' THEN 3
            WHEN 'wms-locator-create' THEN 4
            WHEN 'wms-po-create' THEN 5
            WHEN 'wms-so-create' THEN 6
            WHEN 'mes-workorder-create' THEN 7
            WHEN 'mes-workshop-line-create' THEN 8
            WHEN 'mes-barcode-pass' THEN 9
            WHEN 'mes-barcode-report' THEN 10
            WHEN 'base-excel-import' THEN 11
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
      if (existing) {
        db.prepare(`
          UPDATE environments
          SET key = ?, name = ?, base_url = ?, username = ?, password = ?, is_default = ?, sort = ?, updated_at = ?
          WHERE id = ?
        `).run(
          env.key,
          env.name,
          env.baseUrl,
          env.username,
          env.password,
          env.isDefault ? 1 : 0,
          env.sort ?? 0,
          now(),
          existing.id
        );
        return this.getEnvironmentById(existing.id);
      }
      return this.createEnvironment(env);
    },
    createEnvironment(env) {
      const id = env.id || this.nextId('ENV');
      if (env.isDefault) {
        db.prepare('UPDATE environments SET is_default = 0').run();
      }
      db.prepare(`
        INSERT INTO environments
        (id, key, name, base_url, username, password, is_default, sort, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        env.key,
        env.name,
        env.baseUrl,
        env.username,
        env.password,
        env.isDefault ? 1 : 0,
        env.sort ?? 0,
        now(),
        now()
      );
      return this.getEnvironmentById(id);
    },
    updateEnvironment(id, patch) {
      const current = this.getEnvironmentById(id);
      if (!current) return null;
      if (patch.isDefault) {
        db.prepare('UPDATE environments SET is_default = 0').run();
      }
      const next = {
        key: patch.key ?? current.key,
        name: patch.name ?? current.name,
        base_url: patch.baseUrl ?? current.base_url,
        username: patch.username ?? current.username,
        password: patch.password ?? current.password,
        is_default: patch.isDefault !== undefined ? (patch.isDefault ? 1 : 0) : current.is_default,
        sort: patch.sort ?? current.sort
      };
      db.prepare(`
        UPDATE environments
        SET key = ?, name = ?, base_url = ?, username = ?, password = ?, is_default = ?, sort = ?, updated_at = ?
        WHERE id = ?
      `).run(next.key, next.name, next.base_url, next.username, next.password, next.is_default, next.sort, now(), id);
      return this.getEnvironmentById(id);
    },
    deleteEnvironment(id) {
      return db.prepare('DELETE FROM environments WHERE id = ?').run(id).changes > 0;
    },
    getLatestPassedRunForScenario(scenarioId) {
      return db.prepare(`
        SELECT * FROM runs
        WHERE scenario_id = ? AND status = 'passed'
        ORDER BY finished_at DESC, created_at DESC
        LIMIT 1
      `).get(scenarioId);
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
        dataset.filePath,
        dataset.rowsPath,
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
      return db.prepare('SELECT * FROM datasets WHERE scenario_id = ? ORDER BY created_at DESC').all(scenarioId);
    },
    getDatasetById(id) {
      return db.prepare('SELECT * FROM datasets WHERE id = ?').get(id);
    },
    beginTransaction() {
      db.exec('BEGIN IMMEDIATE');
    },
    commitTransaction() {
      db.exec('COMMIT');
    },
    rollbackTransaction() {
      if (db.isTransaction) db.exec('ROLLBACK');
    },
    createRun(run) {
      db.prepare(`
        INSERT INTO runs
        (id, scenario_id, dataset_id, environment, execution_mode, execution_location, status, triggered_by, started_at, finished_at, summary, report_path, error, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        run.id,
        run.scenarioId,
        run.datasetId,
        run.environment,
        run.executionMode || 'headless',
        run.executionLocation || 'server',
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
    listRunsForScenario(scenarioId, limit = 10) {
      return db.prepare('SELECT * FROM runs WHERE scenario_id = ? ORDER BY created_at DESC LIMIT ?').all(scenarioId, limit);
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
  if (scenarioColumns.length && !scenarioColumns.includes('depends_on')) {
    db.exec("ALTER TABLE scenarios ADD COLUMN depends_on TEXT NOT NULL DEFAULT '[]'");
  }
  const runColumns = tableColumns(db, 'runs');
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
}
