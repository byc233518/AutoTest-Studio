import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { summarizeResults } from './summarize-results.mjs';

function makeRunId() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

const cwd = process.cwd();
const resultDir = process.env.AUTOTEST_RESULT_DIR || path.resolve(cwd, 'test-results', 'runs', makeRunId());
const dataTag = process.env.AUTOTEST_DATA_TAG || makeRunId().replace(/\D/g, '').slice(2, 14);
const command = process.execPath;
const args = [path.resolve(cwd, 'node_modules', 'playwright', 'cli.js'), 'test', ...process.argv.slice(2)];
const env = {
  ...process.env,
  AUTOTEST_RESULT_DIR: resultDir,
  // Keep titles stable across Playwright main/worker processes.
  AUTOTEST_DATA_TAG: dataTag
};

fs.mkdirSync(resultDir, { recursive: true });

const exitCode = await new Promise((resolve) => {
  const child = spawn(command, args, { cwd, env, stdio: 'inherit' });
  child.on('close', resolve);
});

await summarizeResults(resultDir);
const latestRoot = process.env.AUTOTEST_RESULT_DIR
  ? path.dirname(resultDir)
  : path.resolve(cwd, 'test-results');
fs.mkdirSync(latestRoot, { recursive: true });
fs.writeFileSync(
  path.resolve(latestRoot, 'latest-run.txt'),
  path.relative(latestRoot, resultDir).replace(/\\/g, '/'),
  'utf8'
);

process.exit(exitCode ?? 1);
