export async function api(path, options = {}) {
  const response = await fetch(path, { credentials: 'include', ...options, headers: { ...(options.body instanceof FormData ? {} : { 'content-type': 'application/json' }), ...(options.headers || {}) } });
  const text = await response.text();
  const body = text && (response.headers.get('content-type') || '').includes('application/json') ? JSON.parse(text) : text;
  if (!response.ok) throw new Error(body?.message || '请求失败');
  return body;
}
