export async function api(path, options = {}) {
  let response;
  try {
    response = await fetch(path, { credentials: 'include', ...options, headers: { ...(options.body instanceof FormData ? {} : { 'content-type': 'application/json' }), ...(options.headers || {}) } });
  } catch (cause) {
    const error = new Error(`无法连接平台服务：${path}`);
    error.code = 'NETWORK_ERROR';
    error.path = path;
    error.cause = cause;
    throw error;
  }
  const text = await response.text();
  const body = text && (response.headers.get('content-type') || '').includes('application/json') ? JSON.parse(text) : text;
  if (!response.ok) {
    const error = new Error(body?.message || '请求失败');
    error.status = response.status;
    error.data = body;
    throw error;
  }
  return body;
}
