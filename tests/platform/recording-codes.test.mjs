import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createRecordingCode,
  createRecordingCodeLimiter,
  hashRecordingCode,
  normalizeRecordingCode,
  verifyRecordingCode
} from '../../server/platform/recording-codes.mjs';

test('录制码使用不易混淆的 8 位字符并按四位分组', () => {
  const value = createRecordingCode({
    randomBytes: () => Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]),
    now: new Date('2026-07-14T05:00:00.000Z')
  });

  assert.match(value.code, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(normalizeRecordingCode(` ${value.code.toLowerCase()} `), value.code.replace('-', ''));
  assert.equal(value.expiresAt, '2026-07-14T05:30:00.000Z');
});

test('录制码只保存摘要并拒绝错误、过期或已消费的值', () => {
  const code = '7K3P-W9QM';
  const meta = {
    recordCodeHash: hashRecordingCode(code),
    recordCodeExpires: '2026-07-14T05:30:00.000Z',
    recordCodeUsedAt: null
  };

  assert.equal(verifyRecordingCode(meta, code, new Date('2026-07-14T05:00:00.000Z')).ok, true);
  assert.equal(verifyRecordingCode(meta, '8K3P-W9QM', new Date('2026-07-14T05:00:00.000Z')).ok, false);
  assert.equal(verifyRecordingCode(meta, code, new Date('2026-07-14T06:00:00.000Z')).ok, false);
  assert.equal(
    verifyRecordingCode(
      { ...meta, recordCodeUsedAt: '2026-07-14T05:01:00.000Z' },
      code,
      new Date('2026-07-14T05:02:00.000Z')
    ).ok,
    false
  );
});

test('同一来源一分钟最多允许 10 次失败解析', () => {
  const limiter = createRecordingCodeLimiter({ windowMs: 60_000, maxFailures: 10 });
  for (let index = 0; index < 10; index += 1) {
    limiter.fail('127.0.0.1', index * 1000);
  }

  assert.equal(limiter.check('127.0.0.1', 10_000).allowed, false);
  assert.equal(limiter.check('127.0.0.1', 61_000).allowed, true);
});
