import { generateSampleRows, rowsToCsv } from './sample-data.mjs';
import { validateRows } from './datasets.mjs';

export { rowsToCsv };

const DEFAULT_SAMPLE_DATA_TIMEOUT_MS = 30_000;
const MAX_SAMPLE_DATA_TIMEOUT_MS = 5 * 60_000;

function normalizeTimeoutMs(value, fallback) {
  const timeoutMs = Number(value);
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return fallback;
  return Math.min(timeoutMs, MAX_SAMPLE_DATA_TIMEOUT_MS);
}

export async function testLlmConnection(setting, { fetchImpl = globalThis.fetch, timeoutMs = 10_000 } = {}) {
  if (!setting?.baseUrl || !setting?.model || !setting?.apiKey) {
    throw new Error('AI 配置不完整');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(`${setting.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${setting.apiKey}`
      },
      body: JSON.stringify({
        model: setting.model,
        messages: [{ role: 'user', content: 'Reply with OK.' }],
        temperature: 0,
        max_tokens: 3
      }),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await response.json().catch(() => null);
    if (!body || (!body.id && !Array.isArray(body.choices))) {
      throw new Error('响应格式无效');
    }
    return true;
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('连接超时');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function generateSampleRowsSmart(database, scenario, options = {}) {
  const count = Math.max(1, Math.min(Number(options.count) || 3, 20));
  const offset = Math.max(0, Math.min(Number(options.offset) || 0, 100000));
  const rules = String(options.rules || '').trim();
  const useLlm = Boolean(options.useLlm);
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const timeoutMs = normalizeTimeoutMs(options.timeoutMs, DEFAULT_SAMPLE_DATA_TIMEOUT_MS);
  if (!useLlm) {
    const rows = generateSampleRows(scenario, count, offset);
    return { rows, source: 'rules', fallbackReason: null };
  }
  try {
    const setting = database.getSetting('llm');
    const value = setting ? JSON.parse(setting.value) : null;
    if (!value?.enabled || !value?.apiKey) {
      throw new Error('LLM 未配置或未启用');
    }
    const rows = await callLlmForRows(value, scenario, count, rules, offset, { fetchImpl, timeoutMs });
    const schema = JSON.parse(scenario.data_schema);
    const errors = validateRows(rows, schema);
    if (errors.length) {
      throw new Error('LLM 生成数据未通过校验');
    }
    return { rows, source: 'llm', fallbackReason: null };
  } catch (error) {
    const rows = generateSampleRows(scenario, count, offset);
    return { rows, source: 'rules', fallbackReason: error.message };
  }
}

async function callLlmForRows(
  setting,
  scenario,
  count,
  rules = '',
  offset = 0,
  { fetchImpl = globalThis.fetch, timeoutMs = DEFAULT_SAMPLE_DATA_TIMEOUT_MS } = {}
) {
  if (!setting.baseUrl) {
    throw new Error('未配置 LLM baseUrl');
  }
  const schema = JSON.parse(scenario.data_schema);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), normalizeTimeoutMs(timeoutMs, DEFAULT_SAMPLE_DATA_TIMEOUT_MS));
  try {
    const response = await fetchImpl(`${setting.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${setting.apiKey}`
      },
      body: JSON.stringify({
        model: setting.model,
        messages: [
          { role: 'system', content: '你是测试数据生成器，只返回 JSON 数组，不要 markdown。' },
          {
            role: 'user',
            content: `为场景 ${scenario.key} (${scenario.name}) 生成 ${count} 行测试数据。列: ${schema.columns.join(',')}。必填: ${(schema.required || []).join(',')}。示例: ${JSON.stringify(schema.example || {})}。当前表格已有 ${offset} 行，新数据不要与已有序号重复。${rules ? `额外生成规则: ${rules}。` : ''}返回 JSON 数组，每项为对象。`
          }
        ],
        temperature: 0.2
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      throw new Error(`LLM 请求失败: ${response.status}`);
    }
    const body = await response.json();
    const text = body.choices?.[0]?.message?.content || '';
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      throw new Error('LLM 返回无法解析');
    }
    return JSON.parse(match[0]);
  } catch (error) {
    if (controller.signal.aborted || error?.name === 'AbortError') {
      throw new Error('LLM 请求超时');
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
