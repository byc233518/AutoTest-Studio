import { spawn } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--id') options.id = argv[++index];
    else if (arg === '--token') options.token = argv[++index];
    else if (arg === '--url') options.startUrl = argv[++index];
    else if (arg === '--platform') options.platform = argv[++index];
    else if (arg === '--output') options.output = argv[++index];
  }
  return options;
}

function usage() {
  console.error('用法: npm run record:local -- --id REC-xxx --token TOKEN --url START_URL [--platform http://localhost:3050]');
  process.exit(1);
}

async function uploadRecording({ platform, id, token, filePath }) {
  const form = new FormData();
  form.append('token', token);
  form.append('file', new Blob([await readFile(filePath)], { type: 'text/javascript' }), path.basename(filePath));
  const response = await fetch(`${platform.replace(/\/+$/, '')}/api/recordings/${id}/upload`, {
    method: 'POST',
    body: form
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(body.message || `上传失败 (${response.status})`);
  }
  return body;
}

const options = parseArgs(process.argv.slice(2));
if (!options.id || !options.token || !options.startUrl) {
  usage();
}

const cwd = process.cwd();
const outputPath = path.resolve(options.output || path.join(cwd, 'platform-data', 'recordings', `${options.id}.spec.js`));
await mkdir(path.dirname(outputPath), { recursive: true });

const cli = path.resolve(cwd, 'node_modules', 'playwright', 'cli.js');
console.log(`正在本机启动 Playwright Inspector...`);
console.log(`目标地址: ${options.startUrl}`);
console.log(`输出脚本: ${path.relative(cwd, outputPath).replace(/\\/g, '/')}`);

const exitCode = await new Promise((resolve) => {
  const child = spawn(process.execPath, [
    cli,
    'codegen',
    '--target',
    'javascript',
    '-o',
    outputPath,
    options.startUrl
  ], {
    cwd,
    stdio: 'inherit',
    env: {
      ...process.env,
      JMOM_BASE_URL: options.startUrl.replace(/#.*$/, '').replace(/\/+$/, '')
    }
  });
  child.on('close', resolve);
});

if (!existsSync(outputPath)) {
  console.error('未生成脚本，录制已取消');
  process.exit(exitCode || 1);
}

const platform = options.platform || 'http://localhost:3050';
const result = await uploadRecording({
  platform,
  id: options.id,
  token: options.token,
  filePath: outputPath
});

console.log(`脚本已上传: ${result.scriptEntry}`);
if (result.scenario?.name) {
  console.log(`已绑定场景: ${result.scenario.name} (${result.scenario.key})`);
}
