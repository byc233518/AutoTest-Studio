const EXECUTION_MODE_OPTIONS = new Set(['headless', 'headed', 'ui']);

export function normalizeExecutionMode(mode = 'headless') {
  const normalized = String(mode || 'headless').trim().toLowerCase();
  if (!EXECUTION_MODE_OPTIONS.has(normalized)) {
    throw new Error('执行模式无效');
  }
  return normalized;
}

export function buildPlaywrightCliArgs(mode = 'headless') {
  const normalized = normalizeExecutionMode(mode);
  if (normalized === 'headed') return ['--headed'];
  if (normalized === 'ui') return ['--headed'];
  return [];
}
