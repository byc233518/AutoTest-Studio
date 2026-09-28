function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function makeRunTag() {
  return new Date().toISOString().replace(/\D/g, '').slice(2, 14);
}

const config = {
  baseURL: trimTrailingSlash(process.env.AUTOTEST_BASE_URL || 'http://172.16.100.11:46069'),
  username: process.env.AUTOTEST_USERNAME || 'byc',
  password: process.env.AUTOTEST_PASSWORD || 'Abcd1234',
  runTag: process.env.AUTOTEST_DATA_TAG || makeRunTag()
};

module.exports = { config };

