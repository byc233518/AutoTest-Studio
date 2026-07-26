import assert from 'node:assert/strict';
import test from 'node:test';

test('跨文件系统移动录制脚本时回退为复制并清理临时文件', async () => {
  const recordings = await import('../../server/platform/recordings.mjs');
  assert.equal(typeof recordings.moveRecordingUpload, 'function');

  const operations = [];
  const crossDeviceError = Object.assign(new Error('cross-device link not permitted'), { code: 'EXDEV' });
  await recordings.moveRecordingUpload('temporary-upload', 'recording-script', {
    renameImpl: async () => {
      operations.push('rename');
      throw crossDeviceError;
    },
    copyImpl: async () => operations.push('copy'),
    removeImpl: async () => operations.push('remove')
  });

  assert.deepEqual(operations, ['rename', 'copy', 'remove']);
});
