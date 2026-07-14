import path from 'node:path';
import { runRecording } from './lib/local-recording.mjs';

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

const options = parseArgs(process.argv.slice(2));
if (!options.id || !options.token || !options.startUrl) usage();

const cwd = process.cwd();
const outputPath = path.resolve(options.output || path.join(cwd, 'platform-data', 'recordings', `${options.id}.spec.js`));
const platform = options.platform || 'http://localhost:3050';

console.log('正在本机启动 Playwright Inspector...');
console.log(`目标地址: ${options.startUrl}`);
console.log(`输出脚本: ${path.relative(cwd, outputPath).replace(/\\/g, '/')}`);

try {
  const result = await runRecording({
    platform,
    recording: {
      id: options.id,
      token: options.token,
      startUrl: options.startUrl
    },
    paths: {
      root: cwd,
      nodeExecutable: process.execPath,
      playwrightCli: path.resolve(cwd, 'node_modules', 'playwright', 'cli.js'),
      browserPath: process.env.PLAYWRIGHT_BROWSERS_PATH || '',
      recordingsDir: path.dirname(outputPath)
    },
    outputPath,
    emit(event) {
      if (event.stage === 'uploading') console.log(event.message);
    }
  });
  console.log(`脚本已上传: ${result.scriptEntry}`);
  if (result.scenario?.name) {
    console.log(`已绑定场景: ${result.scenario.name} (${result.scenario.key})`);
  }
} catch (error) {
  console.error(error.message || '录制失败');
  process.exitCode = 1;
}
