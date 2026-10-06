function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function makeRunTag() {
  return new Date().toISOString().replace(/\D/g, '').slice(2, 14);
}

const config = {
  baseURL: trimTrailingSlash(process.env.AUTOTEST_BASE_URL || 'https://www.bing.com'),
  username: process.env.AUTOTEST_USERNAME || '',
  password: process.env.AUTOTEST_PASSWORD || '',
  runTag: process.env.AUTOTEST_DATA_TAG || makeRunTag()
};

module.exports = { config };
