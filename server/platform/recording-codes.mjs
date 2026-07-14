import { createHash, randomBytes as secureRandomBytes, timingSafeEqual } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function normalizeRecordingCode(value = '') {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function hashRecordingCode(value) {
  return createHash('sha256').update(normalizeRecordingCode(value)).digest('hex');
}

export function createRecordingCode({
  randomBytes = secureRandomBytes,
  now = new Date(),
  ttlMs = 30 * 60 * 1000
} = {}) {
  const bytes = randomBytes(8);
  const raw = Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('');
  const code = `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
  return {
    code,
    hash: hashRecordingCode(code),
    expiresAt: new Date(now.getTime() + ttlMs).toISOString()
  };
}

export function verifyRecordingCode(meta, code, now = new Date()) {
  if (!meta?.recordCodeHash || meta.recordCodeUsedAt || !meta.recordCodeExpires) {
    return { ok: false };
  }
  if (new Date(meta.recordCodeExpires).getTime() < now.getTime()) {
    return { ok: false };
  }
  const actual = Buffer.from(hashRecordingCode(code), 'hex');
  const expected = Buffer.from(meta.recordCodeHash, 'hex');
  return { ok: actual.length === expected.length && timingSafeEqual(actual, expected) };
}

export function createRecordingCodeLimiter({ windowMs = 60_000, maxFailures = 10 } = {}) {
  const attempts = new Map();

  function active(key, now) {
    const values = (attempts.get(key) || []).filter((value) => now - value < windowMs);
    if (values.length) attempts.set(key, values);
    else attempts.delete(key);
    return values;
  }

  return {
    check(key, now = Date.now()) {
      const values = active(key, now);
      return {
        allowed: values.length < maxFailures,
        retryAfterMs: values.length ? windowMs - (now - values[0]) : 0
      };
    },
    fail(key, now = Date.now()) {
      const values = active(key, now);
      values.push(now);
      attempts.set(key, values);
    },
    clear(key) {
      attempts.delete(key);
    }
  };
}
