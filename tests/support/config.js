function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function makeRunTag() {
  return new Date().toISOString().replace(/\D/g, '').slice(2, 14);
}

const config = {
  baseURL: trimTrailingSlash(process.env.JMOM_BASE_URL || 'http://172.16.100.11:46069'),
  username: process.env.JMOM_USERNAME || 'byc',
  password: process.env.JMOM_PASSWORD || 'Abcd1234',
  runTag: process.env.JMOM_DATA_TAG || makeRunTag()
};

module.exports = { config };

