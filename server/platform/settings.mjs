export function maskApiKey(apiKey = '') {
  if (!apiKey) return '';
  if (apiKey.length <= 8) return `${apiKey.slice(0, 2)}****${apiKey.slice(-2)}`;
  return `${apiKey.slice(0, 4)}********${apiKey.slice(-4)}`;
}

export function publicLlmSetting(row) {
  if (!row) {
    return {
      provider: '',
      model: '',
      baseUrl: '',
      apiKeyMasked: '',
      enabled: false,
      updatedAt: ''
    };
  }
  const value = JSON.parse(row.value);
  return {
    provider: value.provider || '',
    model: value.model || '',
    baseUrl: value.baseUrl || '',
    apiKeyMasked: maskApiKey(value.apiKey || ''),
    enabled: Boolean(value.enabled),
    updatedAt: row.updated_at
  };
}
