import { normalizeRecordingCode } from './recording-codes.mjs';

const LAUNCH_MODES = new Set(['record', 'execute']);
const OPERATION_CODE_PATTERN = /^[A-HJ-NP-Z2-9]{8}$/;

function normalizePlatformOrigin(platformUrl) {
  let parsed;
  try {
    parsed = new URL(String(platformUrl || '').trim());
  } catch {
    throw new TypeError('平台地址必须是有效的 HTTP 或 HTTPS 地址');
  }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw new TypeError('平台地址必须是有效的 HTTP 或 HTTPS 地址');
  }
  return parsed.origin;
}

function normalizeOperationCode(code) {
  const raw = normalizeRecordingCode(code);
  if (!OPERATION_CODE_PATTERN.test(raw)) {
    throw new TypeError('操作码必须是 8 位有效字符');
  }
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export function buildDesktopLaunchUrl({ mode, platformUrl, code } = {}) {
  if (!LAUNCH_MODES.has(mode)) {
    throw new TypeError('桌面启动模式只允许 record 或 execute');
  }
  const query = new URLSearchParams({
    platform: normalizePlatformOrigin(platformUrl),
    code: normalizeOperationCode(code)
  });
  return `jmom-recorder://${mode}?${query}`;
}
