import { crc32, deflateRawSync, inflateRawSync } from 'node:zlib';

const LOCAL_HEADER = 0x04034b50;
const CENTRAL_HEADER = 0x02014b50;
const EOCD = 0x06054b50;
const UTF8_FLAG = 0x0800;

export class ZipArchiveError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'ZipArchiveError';
    this.code = code;
  }
}

function dosDateTime(date = new Date()) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function writeUInt16(buffer, offset, value) {
  buffer.writeUInt16LE(value, offset);
}

function writeUInt32(buffer, offset, value) {
  buffer.writeUInt32LE(value >>> 0, offset);
}

function normalizeZipPath(value) {
  const name = String(value || '').replaceAll('\\', '/').replace(/^\/+/, '');
  if (!name || name.endsWith('/')) {
    throw new ZipArchiveError('INVALID_ZIP_PATH', `压缩包路径无效：${value}`);
  }
  const segments = name.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new ZipArchiveError('INVALID_ZIP_PATH', `压缩包路径非法：${value}`);
  }
  return segments.join('/');
}

function compressEntry(data) {
  const uncompressed = Buffer.from(data);
  if (uncompressed.length >= 0xffff_ffff) {
    throw new ZipArchiveError('ZIP64_REQUIRED', '单个文件超过 4GB，暂不支持');
  }
  const deflated = deflateRawSync(uncompressed);
  const useStore = deflated.length >= uncompressed.length;
  return {
    method: useStore ? 0 : 8,
    uncompressed,
    compressed: useStore ? uncompressed : deflated,
    crc: crc32(uncompressed) >>> 0
  };
}

export function createZipBuffer(entries, { modifiedAt = new Date() } = {}) {
  if (!Array.isArray(entries) || !entries.length) {
    throw new ZipArchiveError('EMPTY_ARCHIVE', '压缩包不能为空');
  }
  const { dosTime, dosDate } = dosDateTime(modifiedAt);
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const entry of entries) {
    const name = normalizeZipPath(entry.name);
    const nameBuffer = Buffer.from(name, 'utf8');
    const packed = compressEntry(entry.data);
    const local = Buffer.alloc(30 + nameBuffer.length);
    writeUInt32(local, 0, LOCAL_HEADER);
    writeUInt16(local, 4, 20);
    writeUInt16(local, 6, UTF8_FLAG);
    writeUInt16(local, 8, packed.method);
    writeUInt16(local, 10, dosTime);
    writeUInt16(local, 12, dosDate);
    writeUInt32(local, 14, packed.crc);
    writeUInt32(local, 18, packed.compressed.length);
    writeUInt32(local, 22, packed.uncompressed.length);
    writeUInt16(local, 26, nameBuffer.length);
    writeUInt16(local, 28, 0);
    nameBuffer.copy(local, 30);

    const central = Buffer.alloc(46 + nameBuffer.length);
    writeUInt32(central, 0, CENTRAL_HEADER);
    writeUInt16(central, 4, 20);
    writeUInt16(central, 6, 20);
    writeUInt16(central, 8, UTF8_FLAG);
    writeUInt16(central, 10, packed.method);
    writeUInt16(central, 12, dosTime);
    writeUInt16(central, 14, dosDate);
    writeUInt32(central, 16, packed.crc);
    writeUInt32(central, 20, packed.compressed.length);
    writeUInt32(central, 24, packed.uncompressed.length);
    writeUInt16(central, 28, nameBuffer.length);
    writeUInt16(central, 30, 0);
    writeUInt16(central, 32, 0);
    writeUInt16(central, 34, 0);
    writeUInt16(central, 36, 0);
    writeUInt32(central, 38, 0);
    writeUInt32(central, 42, offset);
    nameBuffer.copy(central, 46);

    locals.push(local, packed.compressed);
    centrals.push(central);
    offset += local.length + packed.compressed.length;
  }

  const centralDirectory = Buffer.concat(centrals);
  if (offset >= 0xffff_ffff || centralDirectory.length >= 0xffff_ffff || entries.length > 0xffff) {
    throw new ZipArchiveError('ZIP64_REQUIRED', '项目包过大，暂不支持 Zip64');
  }
  const eocd = Buffer.alloc(22);
  writeUInt32(eocd, 0, EOCD);
  writeUInt16(eocd, 4, 0);
  writeUInt16(eocd, 6, 0);
  writeUInt16(eocd, 8, entries.length);
  writeUInt16(eocd, 10, entries.length);
  writeUInt32(eocd, 12, centralDirectory.length);
  writeUInt32(eocd, 16, offset);
  writeUInt16(eocd, 20, 0);
  return Buffer.concat([...locals, centralDirectory, eocd]);
}

function findEocd(buffer) {
  const minimum = 22;
  if (buffer.length < minimum) {
    throw new ZipArchiveError('INVALID_ZIP', '不是有效的 ZIP 项目包');
  }
  const maxComment = Math.min(0xffff, buffer.length - minimum);
  for (let comment = 0; comment <= maxComment; comment += 1) {
    const offset = buffer.length - minimum - comment;
    if (buffer.readUInt32LE(offset) === EOCD && buffer.readUInt16LE(offset + 20) === comment) {
      return offset;
    }
  }
  throw new ZipArchiveError('INVALID_ZIP', '找不到 ZIP 目录');
}

function inflateEntry(method, compressed, expectedLength, crc) {
  const data = method === 0
    ? Buffer.from(compressed)
    : method === 8
      ? inflateRawSync(compressed)
      : null;
  if (!data) {
    throw new ZipArchiveError('UNSUPPORTED_ZIP', '项目包使用了不支持的压缩方式');
  }
  if (data.length !== expectedLength) {
    throw new ZipArchiveError('INVALID_ZIP', '项目包文件长度不匹配');
  }
  if ((crc32(data) >>> 0) !== (crc >>> 0)) {
    throw new ZipArchiveError('INVALID_ZIP', '项目包文件校验失败');
  }
  return data;
}

export function readZipBuffer(buffer) {
  const source = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  const eocd = findEocd(source);
  if (source.readUInt16LE(eocd + 4) !== 0 || source.readUInt16LE(eocd + 6) !== 0) {
    throw new ZipArchiveError('UNSUPPORTED_ZIP', '不支持分卷 ZIP 项目包');
  }
  const entryCount = source.readUInt16LE(eocd + 10);
  const centralSize = source.readUInt32LE(eocd + 12);
  const centralOffset = source.readUInt32LE(eocd + 16);
  if (entryCount === 0xffff || centralSize === 0xffff_ffff || centralOffset === 0xffff_ffff) {
    throw new ZipArchiveError('ZIP64_REQUIRED', '不支持 Zip64 项目包');
  }
  const entries = [];
  let cursor = centralOffset;
  const centralEnd = centralOffset + centralSize;
  for (let index = 0; index < entryCount; index += 1) {
    if (cursor + 46 > centralEnd || source.readUInt32LE(cursor) !== CENTRAL_HEADER) {
      throw new ZipArchiveError('INVALID_ZIP', 'ZIP 目录损坏');
    }
    const method = source.readUInt16LE(cursor + 10);
    const crc = source.readUInt32LE(cursor + 16);
    const compressedSize = source.readUInt32LE(cursor + 20);
    const uncompressedSize = source.readUInt32LE(cursor + 24);
    const nameLength = source.readUInt16LE(cursor + 28);
    const extraLength = source.readUInt16LE(cursor + 30);
    const commentLength = source.readUInt16LE(cursor + 32);
    const localOffset = source.readUInt32LE(cursor + 42);
    const name = source.subarray(cursor + 46, cursor + 46 + nameLength).toString('utf8');
    cursor += 46 + nameLength + extraLength + commentLength;
    if (name.endsWith('/')) continue;
    const safeName = normalizeZipPath(name);
    if (source.readUInt32LE(localOffset) !== LOCAL_HEADER) {
      throw new ZipArchiveError('INVALID_ZIP', `ZIP 文件头损坏：${safeName}`);
    }
    const localNameLength = source.readUInt16LE(localOffset + 26);
    const localExtraLength = source.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = source.subarray(dataStart, dataStart + compressedSize);
    entries.push({
      name: safeName,
      data: inflateEntry(method, compressed, uncompressedSize, crc)
    });
  }
  return entries;
}
