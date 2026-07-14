import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  RecordingError,
  resolvePortablePaths,
  runRecording
} from './lib/local-recording.mjs';

export function parsePortableArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--platform') options.platform = argv[++index];
    else if (arg === '--code') options.code = argv[++index];
    else if (arg === '--root') options.root = argv[++index];
  }
  return options;
}

export async function main(argv = process.argv.slice(2)) {
  const options = parsePortableArgs(argv);
  if (!options.platform || !options.code || !options.root) {
    throw new RecordingError('INVALID_ARGUMENTS', '缺少平台地址、录制码或录制器目录');
  }
  const paths = resolvePortablePaths(options.root);
  return runRecording({
    platform: options.platform,
    code: options.code,
    paths,
    codegenStdio: 'ignore',
    deleteOnSuccess: true,
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
      code: error.code || 'RECORDER_FAILED',
      message: error.message || '录制失败',
      retryable: error.code === 'UPLOAD_FAILED'
    })}\n`);
    process.exitCode = 1;
  });
}
