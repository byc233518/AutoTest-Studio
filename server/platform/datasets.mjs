import { readFile } from 'node:fs/promises';
import path from 'node:path';
import readXlsxFile from 'read-excel-file/node';

function normalizeCell(value) {
  return String(value ?? '').trim();
}

function parseCsv(raw) {
  const text = raw.replace(/^\uFEFF/, '');
  const rows = text.split(/\r?\n/).filter((line) => line.trim().length > 0).map((line) => {
    const cells = [];
    let current = '';
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      if (char === '"' && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        cells.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    cells.push(current);
    return cells.map(normalizeCell);
  });
  const headers = rows.shift() || [];
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, normalizeCell(row[index])]))).filter((row) => {
    return Object.values(row).some((value) => value !== '');
  });
}

export async function parseDatasetFile(filePath, originalName) {
  const ext = path.extname(originalName).toLowerCase();
  if (ext === '.xlsx') {
    const sheetRows = await readXlsxFile(filePath);
    const headers = (sheetRows.shift() || []).map(normalizeCell);
    const rows = sheetRows.map((row) => {
      return Object.fromEntries(headers.map((header, index) => [header, normalizeCell(row[index])]));
    }).filter((row) => Object.values(row).some((value) => value !== ''));
    return { rows };
  }
  const raw = await readFile(filePath, 'utf8');
  if (ext === '.json') {
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, ''));
    const rows = Array.isArray(parsed) ? parsed : parsed?.rows;
    if (!Array.isArray(rows) || rows.some((row) => !row || typeof row !== 'object' || Array.isArray(row))) {
      throw new TypeError('JSON 测试数据必须是对象数组或包含 rows 对象数组');
    }
    return { rows };
  }
  return { rows: parseCsv(raw) };
}

export function validateRows(rows, schema) {
  const errors = [];
  const headers = new Set(Object.keys(rows[0] || {}));
  for (const required of schema.required || []) {
    if (!headers.has(required)) {
      errors.push(`缺少必填列: ${required}`);
    }
  }
  if (errors.length) {
    return errors;
  }
  rows.forEach((row, rowIndex) => {
    for (const required of schema.required || []) {
      if (!normalizeCell(row[required])) {
        errors.push(`第 ${rowIndex + 2} 行缺少必填值: ${required}`);
      }
    }
  });
  if (!rows.length) {
    errors.push('样本数据至少需要一行');
  }
  return errors;
}
