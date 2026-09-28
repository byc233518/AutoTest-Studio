import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');
const outputPath = path.resolve(scriptDir, 'data', 'system-menu-route-names.generated.json');
const sourcePath = process.argv[2];

function hasChinese(value) {
  return /[\u3400-\u9fff]/u.test(String(value || ''));
}

function chineseMenuName(name, code) {
  const value = String(name || '').trim();
  if (hasChinese(value)) return value;
  const technicalName = value || String(code || '').trim() || '未命名';
  if (/test|测试|^\d|tets/i.test(technicalName)) return `测试菜单（${technicalName}）`;
  return `功能菜单（${technicalName}）`;
}

function normalizePathname(value) {
  const normalized = String(value || '').trim().replaceAll('\\', '/');
  if (!normalized.startsWith('/')) return '';
  const [pathname] = normalized.split(/[?#]/, 1);
  return pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
}

function normalizeMenuUrl(value) {
  const normalized = String(value || '').trim().replaceAll('\\', '/');
  if (!normalized.startsWith('/')) return '';
  const hashIndex = normalized.indexOf('#');
  const withoutHash = hashIndex >= 0 ? normalized.slice(0, hashIndex) : normalized;
  const questionIndex = withoutHash.indexOf('?');
  const pathname = normalizePathname(withoutHash);
  if (questionIndex < 0) return pathname;
  const query = withoutHash.slice(questionIndex + 1).trim();
  return query ? `${pathname}?${query}` : pathname;
}

function runtimeRoute(linkUrl) {
  const questionIndex = linkUrl.indexOf('?');
  if (questionIndex < 0) return linkUrl;
  const pathname = linkUrl.slice(0, questionIndex);
  const query = linkUrl.slice(questionIndex + 1);
  if (!/(?:^|\/)(?:ImsBillMst|ImsCustomReportLoading)\//i.test(pathname)) return linkUrl;

  // 与 jmom.vue/src/router/index.js 的动态路由规则保持一致：取首个查询参数值作为唯一路径段。
  const firstValue = query.split('&', 1)[0]?.split('=').slice(1).join('=').trim();
  return firstValue ? `${pathname}/${decodeURIComponent(firstValue)}?${query}` : linkUrl;
}

function flattenMenus(nodes, parentBreadcrumb = [], result = []) {
  for (const node of nodes || []) {
    const name = chineseMenuName(node.Menu_Name, node.Menu_Code);
    const breadcrumb = [...parentBreadcrumb, name];
    const linkUrl = normalizeMenuUrl(node.Link_Url);
    if (linkUrl) {
      result.push({
        id: String(node.Id ?? ''),
        parentId: String(node.Parent_Id ?? ''),
        menuCode: String(node.Menu_Code ?? '').trim(),
        name,
        originalName: String(node.Menu_Name ?? '').trim(),
        linkUrl,
        sourceRoute: normalizePathname(linkUrl),
        runtimeRoute: runtimeRoute(linkUrl),
        breadcrumb: breadcrumb.join(' / '),
        appId: String(node.APP_ID ?? '').trim(),
        appUrl: String(node.AppUrl ?? '').trim(),
        target: String(node.Target ?? '').trim(),
        enabled: String(node.ENABLED ?? '').trim()
      });
    }
    flattenMenus(node.children, breadcrumb, result);
  }
  return result;
}

export function buildMenuRouteCatalog(menuTree) {
  const flattened = flattenMenus(menuTree);
  const byUrl = new Map();
  for (const item of flattened) {
    const identity = item.linkUrl.toLocaleLowerCase('en-US');
    const existing = byUrl.get(identity);
    if (!existing) {
      byUrl.set(identity, { ...item, aliases: [] });
      continue;
    }
    existing.aliases.push({
      id: item.id,
      name: item.name,
      breadcrumb: item.breadcrumb,
      appId: item.appId
    });
  }

  const routes = [...byUrl.values()].sort((left, right) => (
    left.linkUrl.localeCompare(right.linkUrl, 'zh-CN')
  ));
  return {
    version: 1,
    source: '真实系统菜单导出',
    summary: {
      menuNodes: flattened.length,
      uniqueRoutes: routes.length,
      duplicateRoutes: flattened.length - routes.length
    },
    routes
  };
}

export async function importSystemMenuRoutes(inputPath, { write = true } = {}) {
  if (!inputPath) throw new Error('请传入真实菜单 JSON 文件路径');
  const menuTree = JSON.parse(await readFile(path.resolve(inputPath), 'utf8'));
  const catalog = buildMenuRouteCatalog(menuTree);
  if (write) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  }
  return catalog;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  importSystemMenuRoutes(sourcePath)
    .then((catalog) => {
      console.log(`已导入 ${catalog.summary.uniqueRoutes} 个唯一菜单路由，合并 ${catalog.summary.duplicateRoutes} 个重复入口`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
