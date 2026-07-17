import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { RecordingError } from './lib/local-recording.mjs';
import { resolvePortableExecutionPaths, runLocalExecution } from './lib/local-execution.mjs';

export function parseExecutionArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--platform') options.platform = argv[++index];
    else if (argv[index] === '--code') options.code = argv[++index];
    else if (argv[index] === '--root') options.root = argv[++index];
  }
  return options;
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseExecutionArgs(argv);
  if (!options.root || !options.platform || !options.code) {
    throw new RecordingError('INVALID_ARGUMENTS', '缺少平台地址、执行码或工具目录');
  }
  return runLocalExecution({
    platform: options.platform,
    code: options.code,
    paths: resolvePortableExecutionPaths(options.root),
    emit(event) {
      process.stdout.write(`${JSON.stringify(event)}\n`);
    }
  });
}

const entryUrl = pathToFileURL(path.resolve(process.argv[1] || '')).href;
if (import.meta.url === entryUrl) {
  main().catch((error) => {
    process.stdout.write(`${JSON.stringify({
      type: 'error',
      code: error.code || 'LOCAL_EXECUTION_FAILED',
      message: error.message || '本地执行失败',
      retryable: false
    })}\n`);
    process.exitCode = 1;
  });
}
