import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import path from 'node:path';
import test from 'node:test';
import { runPlaywrightTask } from '../../scripts/lib/local-execution.mjs';

test('本地执行使用相对脚本路径调用 Playwright', async () => {
  const workspaceDir = path.resolve('portable', 'app', '.local-runs', 'RUN-LOCAL-1');
  let invocation;
  const spawnImpl = (command, args, options) => {
    invocation = { command, args, options };
    const child = new EventEmitter();
    queueMicrotask(() => child.emit('close', 0));
    return child;
  };

  const exitCode = await runPlaywrightTask({
    task: {
      runId: 'RUN-LOCAL-1',
      scenarioKey: 'mes-station-collect',
      executionMode: 'headed',
      environment: {
        baseUrl: 'http://127.0.0.1:46069',
        username: 'tester',
        password: 'secret'
      }
    },
    paths: {
      nodeExecutable: path.resolve('portable', 'runtime', 'node.exe'),
      playwrightCli: path.resolve('portable', 'app', 'node_modules', 'playwright', 'cli.js'),
      browserPath: path.resolve('portable', 'browsers')
    },
    workspace: {
      workspaceDir,
      scriptPath: path.resolve(workspaceDir, 'tests', 'recordings', 'collect.spec.js'),
      configPath: path.resolve(workspaceDir, 'playwright.config.cjs'),
      datasetPath: path.resolve(workspaceDir, 'dataset.json'),
      resultDir: path.resolve('portable', 'data', 'runs', 'RUN-LOCAL-1')
    },
    spawnImpl
  });

  assert.equal(exitCode, 0);
  assert.equal(invocation.args[2], 'tests/recordings/collect.spec.js');
  assert.equal(invocation.options.cwd, workspaceDir);
});
