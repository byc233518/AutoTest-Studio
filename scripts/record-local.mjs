import path from 'node:path';
import { runOfflineRecording, runRecording } from './lib/local-recording.mjs';

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--id') options.id = argv[++index];
    else if (arg === '--token') options.token = argv[++index];
    else if (arg === '--url') options.startUrl = argv[++index];
    else if (arg === '--platform') options.platform = argv[++index];
    else if (arg === '--output') options.output = argv[++index];
    else if (arg === '--offline') options.offline = true;
  }
  return options;
}

function usage() {
  console.error('用法: npm run record:local -- --id REC-xxx --token TOKEN --url START_URL [--platform http://localhost:3050]');
  console.error('离线: npm run record:local -- --offline --url START_URL [--output tests/recordings/offline.spec.js]');
  process.exit(1);
}

const options = parseArgs(process.argv.slice(2));
if (!options.startUrl || (!options.offline && (!options.id || !options.token))) usage();

const cwd = process.cwd();
const defaultFileName = options.offline
  ? `OFFLINE-${new Date().toISOString().replace(/[:.]/g, '-')}.spec.js`
  : `${options.id}.spec.js`;
const outputPath = path.resolve(options.output || path.join(cwd, 'tests', 'recordings', defaultFileName));
const platform = options.platform || 'http://localhost:3050';

const paths = {
  root: cwd,
  nodeExecutable: process.execPath,
  playwrightCli: path.resolve(cwd, 'node_modules', 'playwright', 'cli.js'),
  browserPath: process.env.PLAYWRIGHT_BROWSERS_PATH || '',
  recordingsDir: path.dirname(outputPath)
};

console.log('正在本机启动 Playwright Inspector...');
console.log(`目标地址: ${options.startUrl}`);
console.log(`输出脚本: ${path.relative(cwd, outputPath).replace(/\\/g, '/')}`);

try {
  if (options.offline) {
    const result = await runOfflineRecording({
      startUrl: options.startUrl,
      paths,
      outputPath
    });
    console.log(`离线脚本已生成: ${path.relative(cwd, result.scriptPath).replace(/\\/g, '/')}`);
    console.log('可在测试平台的场景详情中手工上传并绑定该脚本。');
  } else {
    const result = await runRecording({
      platform,
      recording: {
        id: options.id,
        token: options.token,
        startUrl: options.startUrl
      },
      paths,
      outputPath,
      emit(event) {
        if (event.stage === 'uploading') console.log(event.message);
      }
    });
    console.log(`脚本已上传: ${result.scriptEntry}`);
    if (result.scenario?.name) {
      console.log(`已绑定场景: ${result.scenario.name} (${result.scenario.key})`);
    }
  }
} catch (error) {
  console.error(error.message || '录制失败');
  process.exitCode = 1;
}
