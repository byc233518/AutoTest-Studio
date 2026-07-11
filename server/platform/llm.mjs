import { generateSampleRows, rowsToCsv } from './sample-data.mjs';
import { validateRows } from './datasets.mjs';

export { rowsToCsv };

export async function generateSampleRowsSmart(database, scenario, options = {}) {
  const count = options.count || 3;
  const useLlm = Boolean(options.useLlm);
  if (!useLlm) {
    const rows = generateSampleRows(scenario, count);
    return { rows, source: 'rules', fallbackReason: null };
  }
  try {
    const setting = database.getSetting('llm');
    const value = setting ? JSON.parse(setting.value) : null;
    if (!value?.enabled || !value?.apiKey) {
      throw new Error('LLM 未配置或未启用');
    }
    const rows = await callLlmForRows(value, scenario, count);
    const schema = JSON.parse(scenario.data_schema);
    const errors = validateRows(rows, schema);
    if (errors.length) {
      throw new Error('LLM 生成数据未通过校验');
    }
    return { rows, source: 'llm', fallbackReason: null };
  } catch (error) {
    const rows = generateSampleRows(scenario, count);
    return { rows, source: 'rules', fallbackReason: error.message };
  }
}

async function callLlmForRows(setting, scenario, count) {
  if (!setting.baseUrl) {
    throw new Error('未配置 LLM baseUrl');
  }
  const schema = JSON.parse(scenario.data_schema);
  const response = await fetch(`${setting.baseUrl.replace(/\/$/, '')}/chat/completions`, {
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
          content: `为场景 ${scenario.key} (${scenario.name}) 生成 ${count} 行测试数据。列: ${schema.columns.join(',')}。必填: ${(schema.required || []).join(',')}。示例: ${JSON.stringify(schema.example || {})}。返回 JSON 数组，每项为对象。`
        }
      ],
      temperature: 0.2
    })
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
}
