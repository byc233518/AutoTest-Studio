import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, '..');

const repositories = [
  {
    key: 'base',
    label: '基座系统',
    appId: 'APP-BASE',
    frontend: process.env.JMOM_BASE_FRONTEND || 'F:\\workspace\\jmom\\jmom.vue',
    backend: process.env.JMOM_BASE_BACKEND || 'F:\\workspace\\jmom\\ims-jmom'
  },
  {
    key: 'mes',
    label: '制造执行',
    appId: 'APP-MES',
    frontend: process.env.JMOM_MES_FRONTEND || 'F:\\workspace\\jmom\\imes.vue',
    backend: process.env.JMOM_MES_BACKEND || 'F:\\workspace\\jmom\\imes.api'
  },
  {
    key: 'wms',
    label: '仓储管理',
    appId: 'APP-WMS',
    frontend: process.env.JMOM_WMS_FRONTEND || 'F:\\workspace\\jmom\\iWMS5.Vue',
    backend: process.env.JMOM_WMS_BACKEND || 'F:\\workspace\\jmom\\iWMS5'
  },
  {
    key: 'qms',
    label: '质量管理',
    appId: 'APP-QMS',
    frontend: process.env.JMOM_QMS_FRONTEND || 'F:\\workspace\\jmom\\IQMS.VUE',
    backend: process.env.JMOM_QMS_BACKEND || 'F:\\workspace\\IQMS'
  },
  {
    key: 'tpm',
    label: '设备管理',
    appId: 'APP-TPM',
    frontend: process.env.JMOM_TPM_FRONTEND || 'F:\\workspace\\jmom\\itpm.vue',
    backend: process.env.JMOM_TPM_BACKEND || 'F:\\workspace\\jmom\\ITPM.API'
  },
  {
    key: 'legacyMes',
    label: '旧版制造执行',
    appId: 'APP-LEGACY-MES',
    frontend: process.env.JMOM_LEGACY_MES_FRONTEND || 'F:\\workspace\\ims.vue.d2',
    backend: process.env.JMOM_LEGACY_MES_BACKEND || 'F:\\workspace\\jz.ims'
  }
];

const generatedJsonPath = path.resolve(workspaceRoot, 'server', 'platform', 'repository-scenarios.generated.json');
const generatedDocPath = path.resolve(workspaceRoot, 'docs', '代码仓库全量测试场景.md');
const menuCatalogPath = path.resolve(scriptDir, 'data', 'system-menu-route-names.generated.json');
const generatedScriptsDir = path.resolve(workspaceRoot, 'tests', 'generated', 'repository');
const generatedScriptsIndexPath = path.resolve(generatedScriptsDir, 'index.generated.json');
const excludedMenuAppIds = new Set(['426886906724421']);

const excludedSegments = new Set([
  'component', 'components', 'modal', 'model', 'template', 'templates', 'modules',
  'editor', 'pageeditor', 'sysformeditor', 'basicsettingpanel', 'designpanel',
  'importsettingpanel', 'searchdata', 'seniorsearch', 'seniorcolumn', 'reportbuttongroup',
  'ganttchart'
]);

const curatedRoutes = new Set([
  '/login',
  '/ImportConfig',
  '/Manager/Index',
  '/ImsCustomer/Index',
  '/ImsVendor/Index',
  '/ImsPart/Index',
  '/ImsLocator/Index',
  '/ImsStock/Index',
  '/iMES6/ProductConfiguration/Wo/Index',
  '/iMES6/SfcsFactoryModeling/Index',
  '/iMES6/ProductConfiguration/WoBom/Index',
  '/iMES6/DesktopReportWork/Index'
]);

const actionPattern = /(新增|添加|创建|编辑|修改|删除|移除|保存|提交|审核|审批|批准|确认|查询|搜索|重置|导入|导出|同步|启用|禁用|冻结|解冻|封存|解封|打印|下载|上传|撤销|作废|发布|配置|分配|锁定|解锁|切分|合并|复制|初始化|登记|排程|报工|过站|盘点|收料|发料|退料|入库|出库|调拨|转储|备料|领料|领用|归还|架模|退模|上线|下线|清洗|替换|接收|检验|复检|返工|返修|报废|报修|送修|维修|保养|试模|作业|完成|开启|关闭|查看|详情)/;
const ignoredButtonPattern = /^(?:确定|确 定|取消|取 消|关闭|返回|上一步|下一步|保存)$/;
const genericNamePattern = /^(?:操作|提示|成功|失败|错误提示|新增|编辑|修改|删除|查询|搜索|重置|导入|导出|保存|提交|确认|取消|关闭|请输入|请选择)$/;
const sourceMutatingActionPattern = /(保存|提交|审核|审批|批准|确认|同步|启用|禁用|冻结|解冻|封存|解封|撤销|作废|发布|分配|锁定|解锁|切分|合并|复制|初始化|登记|排程|报工|过站|盘点|收料|发料|退料|入库|出库|调拨|转储|备料|领料|领用|归还|架模|退模|上线|下线|清洗|替换|接收|检验|复检|返工|返修|报废|报修|送修|维修|保养|试模|完成|开启|关闭|一键配置)/;

function normalizeSlashes(value) {
  return String(value).replaceAll('\\', '/');
}

function stableHash(value, length = 10) {
  return createHash('sha1').update(String(value)).digest('hex').slice(0, length);
}

function slug(value) {
  const normalized = String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return normalized || stableHash(value);
}

function uniqueBy(values, identity) {
  const result = [];
  const seen = new Set();
  for (const value of values.filter(Boolean)) {
    const key = identity(value);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }
  return result;
}

function unique(values) {
  return uniqueBy(values, (value) => value);
}

function hasChinese(value) {
  return /[\u3400-\u9fff]/u.test(String(value || ''));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function exists(target) {
  return stat(target).then(() => true, () => false);
}

async function walkFiles(root) {
  const files = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (['.git', 'node_modules', 'bin', 'obj', 'dist'].includes(entry.name)) continue;
      const absolute = path.resolve(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else files.push(absolute);
    }
  }
  await visit(root);
  return files;
}

function isEntryView(systemKey, relativeFile) {
  const normalized = normalizeSlashes(relativeFile);
  const segments = normalized.split('/');
  if (!/^index\.vue$/i.test(segments.at(-1))) return false;
  if (segments.some((segment) => (
    excludedSegments.has(segment.toLowerCase())
    || /^steppart_/i.test(segment)
    || /^(?:.*(?:modal|dialog)|components?|formeditor|formviewer)$/i.test(segment)
  ))) return false;
  if (segments[0].toLowerCase() === 'system') return false;

  if (systemKey === 'base') {
    if (segments[0] === 'Admin') return false;
    return segments.length <= 3;
  }
  if (systemKey === 'mes') return segments[0] === 'iMES6' && segments.length <= 4;
  if (systemKey === 'qms') return ['baseconfig', 'qms', 'spc'].includes(segments[0].toLowerCase()) && segments.length <= 4;
  if (systemKey === 'tpm') return segments[0].toLowerCase() === 'itpm' && segments.length <= 4;
  if (systemKey === 'legacyMes') return segments[0].toLowerCase() === 'imes' && segments.length <= 3;
  if (segments[0] === 'TMS' || segments[0] === 'ReportForm') return segments.length <= 4;
  return segments.length <= 3;
}

function routeFromView(relativeFile) {
  return `/${normalizeSlashes(relativeFile).replace(/\.vue$/i, '')}`;
}

function sourceRouteIdentity(value) {
  return String(value || '')
    .split(/[?#]/, 1)[0]
    .replaceAll('\\', '/')
    .replace(/\/+$/, '')
    .replace(/\/index$/i, '')
    .toLocaleLowerCase('en-US');
}

function leafName(relativeFile) {
  const segments = normalizeSlashes(relativeFile).split('/');
  return segments.at(-2) || segments[0];
}

function translatedText(fragment) {
  const translated = fragment.match(/\$t\(\s*['"`]([^'"`]{1,80})['"`]\s*\)/)?.[1];
  if (translated) return translated.trim();
  return fragment
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\{[\s\S]*?\}\}/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readActionDescriptors(source) {
  const actions = [];
  const templateSource = source.replace(/<!--[\s\S]*?-->/g, '');
  const buttonPattern = /<(el-button|a-button|button)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi;
  for (const match of templateSource.matchAll(buttonPattern)) {
    const position = match.index || 0;
    const insideDialog = Math.max(
      templateSource.lastIndexOf('<el-dialog', position),
      templateSource.lastIndexOf('<el-drawer', position)
    ) > Math.max(
      templateSource.lastIndexOf('</el-dialog', position),
      templateSource.lastIndexOf('</el-drawer', position)
    );
    if (insideDialog) continue;
    const attributes = match[2];
    const body = match[3];
    const label = translatedText(`${attributes} ${body}`);
    if (!label || label.length > 40 || ignoredButtonPattern.test(label) || !actionPattern.test(label)) continue;
    const handler = attributes.match(/@click(?:\.[\w-]+)*\s*=\s*(['"])([\s\S]*?)\1/)?.[2]?.trim() || '';
    const permission = attributes.match(/\$btnList\.(?:includes|indexOf)\(\s*['"]([^'"]+)['"]/)?.[1] || '';
    const dropdownMenuStart = templateSource.lastIndexOf('<el-dropdown-menu', position);
    const dropdownMenuEnd = templateSource.lastIndexOf('</el-dropdown-menu', position);
    let menuTriggerLabel = '';
    if (dropdownMenuStart > dropdownMenuEnd) {
      const dropdownStart = templateSource.lastIndexOf('<el-dropdown', dropdownMenuStart - 1);
      const triggerFragment = templateSource.slice(dropdownStart, dropdownMenuStart);
      const triggerMatch = [...triggerFragment.matchAll(/<el-button\b([^>]*)>([\s\S]*?)<\/el-button\s*>/gi)].at(-1);
      if (triggerMatch) menuTriggerLabel = translatedText(`${triggerMatch[1]} ${triggerMatch[2]}`);
    }
    actions.push({
      label,
      handler,
      permission,
      menuTriggerLabel,
      rowAction: /(?:scope\.)?row|scope\.row|slot-scope/i.test(`${attributes} ${handler}`),
      sourceMutatesData: sourceMutatingActionPattern.test(label)
    });
  }
  return uniqueBy(actions, (item) => `${item.label.toLocaleLowerCase('zh-CN')}:${item.handler}`);
}

function readBindingKey(fragment) {
  const binding = fragment.match(/(?:v-model(?:\.[\w-]+)*|:value|:model-value)\s*=\s*(['"])([^'"]+)\1/i)?.[2];
  if (!binding || /\[[^\]]+\]/.test(binding)) return '';
  return binding.match(/([A-Za-z_$][\w$]*)\s*$/)?.[1] || '';
}

function readTranslatedAttribute(attributes, names) {
  const pattern = new RegExp(`(?:${names.join('|')})\\s*=\\s*(['"])([\\s\\S]*?)\\1`, 'i');
  return translatedText(attributes.match(pattern)?.[2] || '');
}

function isRequiredField(source, key, attributes = '') {
  if (/\brequired(?:\s*=\s*['"]?(?:true|required)['"]?)?(?:\s|>|$)/i.test(attributes)) return true;
  const escapedKey = escapeRegExp(key);
  return new RegExp(`(?:['"]?${escapedKey}['"]?)\\s*:\\s*\\[[\\s\\S]{0,800}?required\\s*:\\s*true`).test(source);
}

function readFormFields(source) {
  const fields = [];
  const templateSource = source.replace(/<!--[\s\S]*?-->/g, '');
  const formItemPattern = /<(el-form-item|a-form-item)\b([^>]*)(?:\/>|>([\s\S]*?)<\/\1\s*>)/gi;
  for (const match of templateSource.matchAll(formItemPattern)) {
    const attributes = match[2];
    const body = match[3] || '';
    const literalKey = attributes.match(/\b(?:prop|name|field)\s*=\s*['"]([A-Za-z_$][\w$]*)['"]/)?.[1];
    const key = literalKey || readBindingKey(body);
    const label = readTranslatedAttribute(attributes, [':?label'])
      || translatedText(body.match(/<(?:template|span)\b[^>]*(?:slot|#)\s*=\s*['"]label['"][^>]*>([\s\S]*?)<\/(?:template|span)>/i)?.[1] || '');
    if (!key || !label || !hasChinese(label)) continue;
    fields.push({ key, label, required: isRequiredField(templateSource, key, attributes) });
  }
  return uniqueBy(fields, (item) => item.key);
}

function readInputFields(source) {
  const fields = [];
  const templateSource = source.replace(/<!--[\s\S]*?-->/g, '');
  const controlPattern = /<(?:el-input|el-input-number|el-select|el-date-picker|el-time-picker|el-cascader|el-autocomplete|a-input|a-input-number|a-select|a-date-picker)\b([^>]*)>/gi;
  for (const match of templateSource.matchAll(controlPattern)) {
    const attributes = match[1];
    const key = readBindingKey(attributes);
    const label = readTranslatedAttribute(attributes, [':?placeholder', 'aria-label']);
    if (!key || !label || !hasChinese(label) || /^(?:请输入|请选择)$/.test(label)) continue;
    fields.push({ key, label: label.replace(/^(?:请输入|请选择)/, ''), required: isRequiredField(templateSource, key) });
  }
  return uniqueBy(fields, (item) => item.key);
}

function readTableFields(source) {
  const fields = [];
  const templateSource = source.replace(/<!--[\s\S]*?-->/g, '');
  const columnPattern = /<(?:el-table-column|vxe-table-column|a-table-column)\b([^>]*)>/gi;
  for (const match of templateSource.matchAll(columnPattern)) {
    const attributes = match[1];
    const key = attributes.match(/\b(?:prop|field|data-index)\s*=\s*['"]([A-Za-z_$][\w$]*)['"]/)?.[1];
    const label = readTranslatedAttribute(attributes, [':?label', ':?title']);
    if (!key || !label || !hasChinese(label)) continue;
    fields.push({ key, label, required: false });
  }
  return uniqueBy(fields, (item) => item.key);
}

function readPageName(source, leaf) {
  const candidates = [];
  for (const match of source.matchAll(/(?:title|label)\s*=\s*['"]([^'"]{1,80})['"]/g)) {
    candidates.push(translatedText(match[1]));
  }
  for (const match of source.matchAll(/\$t\(\s*['"`]([^'"`]{2,40})['"`]\s*\)/g)) candidates.push(match[1].trim());
  const meaningful = candidates.find((value) => (
    hasChinese(value)
    && !genericNamePattern.test(value)
    && !/^(?:请输入|请选择|确认要|获取|上传|下载)/.test(value)
    && value.length <= 20
  ));
  return meaningful ? `${meaningful}（未配置菜单）` : `未配置菜单页面（${leaf}）`;
}

function endpointControllers(source) {
  const values = [];
  for (const match of source.matchAll(/MesTable\(\s*['"`]([A-Za-z0-9_]+)/g)) values.push(match[1]);
  for (const match of source.matchAll(/(?:get|post|put|delete)\(\s*['"`]\/?([A-Za-z][A-Za-z0-9_]+)\//g)) values.push(match[1]);
  for (const match of source.matchAll(/['"`]\/?([A-Z][A-Za-z0-9_]+)\/[A-Z][A-Za-z0-9_]+/g)) values.push(match[1]);
  return unique(values);
}

function importedComponentPath(source, componentName, absoluteFile, frontendRoot) {
  const pattern = new RegExp(`import\\s+${escapeRegExp(componentName)}\\s+from\\s+['\"]([^'\"]+)['\"]`);
  const specifier = source.match(pattern)?.[1];
  if (!specifier) return '';
  const unresolved = specifier.startsWith('@/')
    ? path.resolve(frontendRoot, 'src', specifier.slice(2))
    : path.resolve(path.dirname(absoluteFile), specifier);
  return path.extname(unresolved) ? unresolved : `${unresolved}.vue`;
}

async function sourceForView(absoluteFile, frontendRoot, visited = new Set()) {
  const identity = path.resolve(absoluteFile).toLocaleLowerCase('en-US');
  if (visited.has(identity)) return '';
  visited.add(identity);
  let source = await readFile(absoluteFile, 'utf8');
  const scriptSource = source.match(/<script\s+src=['"](.+?)['"]/i)?.[1];
  if (scriptSource) {
    const sibling = path.resolve(path.dirname(absoluteFile), scriptSource);
    if (await exists(sibling)) source += `\n${await readFile(sibling, 'utf8')}`;
  }
  const ownSource = source;
  const inheritedComponent = source.match(/\bextends\s*:\s*([A-Za-z_$][\w$]*)/)?.[1];
  if (inheritedComponent) {
    const inheritedFile = importedComponentPath(source, inheritedComponent, absoluteFile, frontendRoot);
    if (inheritedFile && await exists(inheritedFile)) {
      source += `\n${await sourceForView(inheritedFile, frontendRoot, visited)}`;
    }
  }
  const viewsRoot = path.resolve(frontendRoot, 'src', 'views');
  const localImports = [...ownSource.matchAll(/import\s+[A-Za-z_$][\w$]*\s+from\s+['"]([^'"]+\.vue)['"]/g)];
  for (const match of localImports) {
    const importedFile = match[1].startsWith('@/')
      ? path.resolve(frontendRoot, 'src', match[1].slice(2))
      : path.resolve(path.dirname(absoluteFile), match[1]);
    const relative = path.relative(viewsRoot, importedFile);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !await exists(importedFile)) continue;
    source += `\n${await sourceForView(importedFile, frontendRoot, visited)}`;
  }
  return source;
}

async function backendControllers(backendRoot) {
  const files = (await walkFiles(backendRoot)).filter((file) => /Controller\.cs$/i.test(file));
  return files.map((file) => ({
    name: path.basename(file).replace(/Controller\.cs$/i, ''),
    file: normalizeSlashes(path.relative(backendRoot, file))
  }));
}

function matchControllers({ leaf, endpoints, controllers }) {
  const candidates = unique([leaf, ...endpoints]).map((value) => value.toLowerCase());
  const exact = controllers.filter((controller) => candidates.includes(controller.name.toLowerCase()));
  if (exact.length) return exact;
  return controllers.filter((controller) => candidates.some((candidate) => (
    candidate.length >= 5 && (
      controller.name.toLowerCase().includes(candidate)
      || candidate.includes(controller.name.toLowerCase())
    )
  ))).slice(0, 3);
}

function adminRoutes(source) {
  const routes = [];
  const blockPattern = /\{\s*path:\s*['"]([^'"]+)['"][\s\S]*?meta:\s*\{[\s\S]*?title:\s*['"]([^'"]+)['"][\s\S]*?\}[\s\S]*?component:\s*_import\(['"]([^'"]+)['"]\)[\s\S]*?\}/g;
  for (const match of source.matchAll(blockPattern)) {
    routes.push({ route: `/${match[1]}`, title: match[2], component: match[3] });
  }
  return routes;
}

function classifyAction(action) {
  const label = action.label;
  if (/查询|搜索/.test(label)) return '查询';
  if (/重置/.test(label)) return '重置';
  if (/新增|添加|创建/.test(label)) return '新增表单';
  if (/编辑|修改/.test(label)) return '编辑表单';
  if (/删除|移除/.test(label)) return '删除确认';
  if (/导入|上传/.test(label) && !/导出/.test(label)) return '导入入口';
  if (/导出|下载/.test(label) && !/导入/.test(label)) return '导出入口';
  if (/查看|详情/.test(label)) return '查看详情';
  if (/^(?:open|go)[A-Z_]/.test(action.handler) && /送修|报废|登记|申请/.test(label)) return '新增表单';
  if (/^(?:open|go)[A-Z_]/.test(action.handler)) return '查看详情';
  return '业务动作';
}

function executionPolicy(type, action = {}) {
  if (type === '新增表单' || type === '编辑表单') return '填写表单后取消';
  if (type === '查看详情') return '打开详情后关闭';
  if (type === '删除确认') return '打开确认框后取消';
  if (type === '导入入口') return '打开导入界面但不上传';
  if (type === '导出入口') return '执行导出并校验下载或反馈';
  if (type === '业务动作' && action.sourceMutatesData) return '只校验入口，不执行数据变更';
  if (type === '业务动作') return '点击入口并校验页面反馈';
  return '只读校验';
}

function workflowSteps(type, action = {}) {
  if (type === '页面加载') return ['打开真实业务路由', '等待微前端和加载遮罩结束', '校验标题、权限和交互区域'];
  if (type === '查询') return ['填写可编辑查询条件', '点击查询按钮或按回车', '等待数据加载完成'];
  if (type === '重置') return ['填写一个可编辑查询条件', '点击重置', '校验查询条件恢复初始值'];
  if (type === '新增表单' || type === '编辑表单') return [`点击${action.label}`, '校验源码表单字段', '填写可编辑字段并校验回填', '取消关闭且不保存'];
  if (type === '查看详情') return [`点击${action.label}`, '校验详情区域真实打开', '关闭详情'];
  if (type === '删除确认') return [`点击${action.label}`, '校验删除确认提示', '点击取消且不删除数据'];
  if (type === '导入入口') return ['展开导入/导出菜单', `点击${action.label}`, '校验导入界面和文件选择控件', '关闭且不上传文件'];
  if (type === '导出入口') return ['展开导入/导出菜单', `点击${action.label}`, '校验下载、弹窗或操作反馈'];
  if (type === '运行时业务按钮') return ['读取运行时权限按钮', '排除查询和重置按钮', '校验至少一个业务按钮可用'];
  if (action.sourceMutatesData) return [`定位${action.label}`, '校验按钮可见且可用', '不点击以避免修改业务数据'];
  return [`点击${action.label}`, '校验路由、弹窗、抽屉、下载或消息反馈'];
}

function workflowAssertions(type, action = {}) {
  if (type === '页面加载') return ['目标路由不是登录页或404', '页面无权限错误和阻塞骨架屏', '页面存在真实交互区域'];
  if (type === '查询') return ['查询入口可用', '加载遮罩结束', '列表、空状态或业务结果区域可见'];
  if (type === '重置') return ['重置入口可用', '已填写查询条件恢复初始值'];
  if (type === '新增表单' || type === '编辑表单') return ['表单、弹窗、抽屉或编辑路由真实打开', '源码字段在界面中存在', '取消后编辑界面关闭'];
  if (type === '查看详情') return ['详情弹窗、抽屉或新路由真实打开'];
  if (type === '删除确认') return ['出现删除确认提示', '取消后确认框关闭'];
  if (type === '导入入口') return ['导入界面真实打开', '存在文件选择控件'];
  if (type === '导出入口') return ['产生下载、弹窗或明确操作反馈'];
  if (type === '运行时业务按钮') return ['至少一个运行时业务按钮可见且可用'];
  if (action.sourceMutatesData) return ['数据变更入口可见且可用', '测试过程不点击、不写入业务数据'];
  return ['操作后产生路由、弹窗、抽屉、下载或消息反馈'];
}

function buildWorkflows(source, actions, fields, examples, dynamicReport) {
  const workflows = [{
    key: 'page-load',
    type: '页面加载',
    name: '页面加载与交互区域校验',
    executionPolicy: executionPolicy('页面加载'),
    steps: workflowSteps('页面加载'),
    assertions: workflowAssertions('页面加载'),
    mutatesData: false
  }];
  const hasFastSearch = /<fast-search\b|@enter\s*=|@keyup\.enter/i.test(source);
  const queryActions = actions.filter((item) => classifyAction(item) === '查询');
  if (hasFastSearch || queryActions.length || dynamicReport) {
    workflows.push({
      key: 'query',
      type: '查询',
      name: '列表查询并等待数据加载',
      buttonLabels: unique([...queryActions.map((item) => item.label), '搜索', '查询']),
      trigger: queryActions.length || dynamicReport ? 'button' : 'enter',
      sourceHandlers: unique(queryActions.map((item) => item.handler)),
      testData: examples,
      executionPolicy: executionPolicy('查询'),
      steps: workflowSteps('查询'),
      assertions: workflowAssertions('查询'),
      mutatesData: false
    });
  }

  const menuTriggerLabels = new Set(actions.map((item) => item.menuTriggerLabel).filter(Boolean));
  for (const action of actions) {
    const type = classifyAction(action);
    if (type === '查询') continue;
    if (dynamicReport && type !== '重置') continue;
    if (type === '业务动作' && menuTriggerLabels.has(action.label)) continue;
    const actionKey = `${slug(type)}-${slug(action.label)}-${stableHash(action.handler || action.label, 5)}`;
    const workflow = {
      key: actionKey,
      type,
      name: type === '删除确认' ? `${action.label}确认框与取消操作` : `${action.label}业务入口校验`,
      label: action.label,
      handler: action.handler,
      permission: action.permission,
      menuTriggerLabel: action.menuTriggerLabel,
      rowAction: action.rowAction,
      sourceMutatesData: action.sourceMutatesData,
      executionPolicy: executionPolicy(type, action),
      steps: workflowSteps(type, action),
      assertions: workflowAssertions(type, action),
      mutatesData: false
    };
    if ((type === '新增表单' && /新增|添加|创建/.test(action.label)) || type === '编辑表单') {
      workflow.fields = fields.map((field) => ({ ...field, example: examples[field.key] }));
      workflow.testData = examples;
    }
    workflows.push(workflow);
  }

  if (dynamicReport) {
    workflows.push({
      key: 'runtime-business-buttons',
      type: '运行时业务按钮',
      name: '运行时权限业务按钮加载校验',
      executionPolicy: executionPolicy('运行时业务按钮'),
      steps: [
        '读取当前菜单和账号真实渲染的权限按钮',
        '排除查询和重置按钮',
        '自动执行导出、下载、打印或查看等只读动作',
        '其他可能写数据的动作只验证入口'
      ],
      assertions: ['至少一个运行时业务按钮可见且可用', '只读动作产生下载、请求或界面反馈'],
      sourceCandidates: actions
        .filter((item) => !['查询', '重置'].includes(classifyAction(item)))
        .map((item) => ({ label: item.label, handler: item.handler, permission: item.permission })),
      mutatesData: false
    });
  }
  const selected = new Map();
  for (const workflow of workflows) {
    const identity = `${workflow.type}:${workflow.label || workflow.key}`;
    const existing = selected.get(identity);
    if (!existing || (workflow.rowAction && !existing.rowAction)) selected.set(identity, workflow);
  }
  const result = [...selected.values()];
  const nameCounts = new Map();
  for (const workflow of result) nameCounts.set(workflow.name, (nameCounts.get(workflow.name) || 0) + 1);
  return result.map((workflow) => nameCounts.get(workflow.name) > 1
    ? { ...workflow, name: `${workflow.name}（${workflow.type}）` }
    : workflow);
}

function exampleForField(field) {
  const meaning = `${field.key}${field.label}`;
  if (/(?:日期|时间|交期|Date|Time)$/i.test(meaning)) return '2026-08-01';
  if (/(?:数量|数目|用量|容量|序号|索引|Qty|Count|Amount|Capacity|Index)$/i.test(meaning)) return '1';
  if (/(?:启用|有效|是否|状态|Enabled|Active|Flag|Status)$/i.test(meaning)) return 'Y';
  if (/(?:编号|编码|料号|单号|条码|Code|No|Number|Id)$/i.test(meaning)) return 'AT-001';
  if (/(?:名称|品名|Name)$/i.test(meaning)) return '自动化样例001';
  if (/(?:描述|备注|说明|Description|Remark|Desc)$/i.test(meaning)) return '自动化测试备注001';
  return `${field.label}测试值`;
}

function schemaForFields(fields) {
  const columns = fields.map((field) => field.key);
  const required = fields.filter((field) => field.required).map((field) => field.key);
  return {
    columns,
    required,
    fields,
    example: Object.fromEntries(fields.map((field) => [field.key, exampleForField(field)]))
  };
}

function generatedScriptSource(definition) {
  return `// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。\n`
    + `// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。\n`
    + `const { defineRepositoryScenario } = require('../../support/repository-scenario');\n\n`
    + `defineRepositoryScenario(${JSON.stringify(definition, null, 2)});\n`;
}

function entryIdentity(repositoryKey, route) {
  const routeSlug = slug(route).slice(0, 70);
  const routeHash = stableHash(`${repositoryKey}:${route}`);
  return {
    routeHash,
    moduleId: `MOD-AUTO-${repositoryKey.toUpperCase()}-${routeHash.toUpperCase()}`,
    scenarioId: `SCN-AUTO-${repositoryKey.toUpperCase()}-${routeHash.toUpperCase()}`,
    key: `${repositoryKey}-page-${routeSlug}-${routeHash.slice(0, 6)}`
  };
}

function toGeneratedEntry({ repository, route, sourceRoute, relativeFile, source, controllers, menu, title }) {
  const leaf = leafName(relativeFile);
  const actions = readActionDescriptors(source);
  const formFields = readFormFields(source);
  const inputFields = readInputFields(source);
  const tableFields = readTableFields(source);
  const fields = uniqueBy([
    ...formFields,
    ...inputFields,
    ...(formFields.length || inputFields.length ? [] : tableFields),
    ...(formFields.length || inputFields.length || tableFields.length
      ? []
      : [{ key: '查询关键字', label: '查询关键字', required: false }])
  ], (item) => item.key);
  const endpoints = endpointControllers(source);
  const matchedControllers = matchControllers({ leaf, endpoints, controllers });
  const displayName = menu?.name || (hasChinese(title) ? title : readPageName(source, leaf));
  const breadcrumb = menu?.breadcrumb || `${repository.label} / 未配置菜单 / ${displayName}`;
  const identity = entryIdentity(repository.key, route);
  const sourceFile = normalizeSlashes(path.relative(repository.frontend, path.resolve(repository.frontend, 'src', 'views', relativeFile)));
  const dynamicReport = /\/(?:ImsBillMst|ImsCustomReportLoading)\//i.test(sourceRoute) && route.includes('?');
  const dataSchema = schemaForFields(fields);
  const workflows = buildWorkflows(source, actions, fields, dataSchema.example, dynamicReport);
  const scriptEntry = `tests/generated/repository/${identity.key}.spec.js`;
  const controllerNames = matchedControllers.map((item) => item.name);
  const evidence = [
    menu ? `菜单 ${breadcrumb}` : '菜单 未配置',
    `运行路由 ${route}`,
    route !== sourceRoute ? `源码路由 ${sourceRoute}` : '',
    `前端 ${sourceFile}`,
    actions.length ? `源码动作 ${actions.map((item) => item.label).join('、')}` : '源码动作 页面加载与列表查询',
    controllerNames.length ? `后端 ${controllerNames.join('、')}Controller` : '后端 未发现同名控制器'
  ].filter(Boolean);
  const definition = {
    key: identity.key,
    name: `${repository.label} - ${displayName}功能校验`,
    displayName,
    route,
    sourceRoute,
    menuCode: menu?.menuCode || '',
    breadcrumb,
    sourceFile,
    dataSchema,
    workflows
  };

  return {
    module: {
      id: identity.moduleId,
      appId: repository.appId,
      name: displayName,
      prefix: menu?.menuCode || endpoints[0] || leaf,
      sort: 1000
    },
    scenario: {
      id: identity.scenarioId,
      key: identity.key,
      appId: repository.appId,
      moduleId: identity.moduleId,
      module: breadcrumb,
      name: definition.name,
      description: evidence.join('；'),
      priority: 'P2',
      status: 'draft',
      version: '0.2.0',
      owner: '待分配',
      scriptEntry,
      dependsOn: [],
      dataSchema,
      dataLifecycle: {
        mutatesData: false,
        cleanup: '新增和编辑只打开表单后取消；删除只打开确认框后取消；不产生测试数据'
      },
      route,
      sourceRoute,
      sourceFile,
      menu: menu ? {
        id: menu.id,
        code: menu.menuCode,
        name: menu.name,
        linkUrl: menu.linkUrl,
        breadcrumb: menu.breadcrumb,
        appId: menu.appId
      } : null,
      actions: actions.map((item) => item.label),
      actionDetails: actions,
      testCases: workflows,
      controllers: matchedControllers
    },
    script: {
      path: scriptEntry,
      content: generatedScriptSource(definition)
    }
  };
}

async function readMenuCatalog() {
  if (!await exists(menuCatalogPath)) {
    throw new Error('真实菜单路由映射不存在，请先运行 scenarios:menu:import');
  }
  return JSON.parse(await readFile(menuCatalogPath, 'utf8'));
}

async function discoverRepository(repository, menuCatalog) {
  if (!await exists(repository.frontend)) throw new Error(`前端仓库不存在: ${repository.frontend}`);
  if (!await exists(repository.backend)) throw new Error(`后端仓库不存在: ${repository.backend}`);

  const viewsRoot = path.resolve(repository.frontend, 'src', 'views');
  const [viewFiles, controllers] = await Promise.all([walkFiles(viewsRoot), backendControllers(repository.backend)]);
  const allViews = viewFiles
    .filter((file) => /\.vue$/i.test(file))
    .map((file) => ({ file, relativeFile: normalizeSlashes(path.relative(viewsRoot, file)) }));
  const menuSourceRoutes = new Set(menuCatalog.routes.map((item) => sourceRouteIdentity(item.sourceRoute)));
  const candidates = allViews.filter((candidate) => {
    const route = sourceRouteIdentity(routeFromView(candidate.relativeFile));
    return isEntryView(repository.key, candidate.relativeFile) || menuSourceRoutes.has(route);
  });

  const entries = [];
  for (const candidate of candidates) {
    const sourceRoute = routeFromView(candidate.relativeFile);
    const source = await sourceForView(candidate.file, repository.frontend);
    const menuRoutes = menuCatalog.routes.filter((item) => sourceRouteIdentity(item.sourceRoute) === sourceRouteIdentity(sourceRoute));
    if (curatedRoutes.has(sourceRoute)) {
      for (const menu of menuRoutes.filter((item) => item.runtimeRoute !== sourceRoute)) {
        entries.push(toGeneratedEntry({
          repository,
          route: menu.runtimeRoute,
          sourceRoute,
          relativeFile: candidate.relativeFile,
          source,
          controllers,
          menu
        }));
      }
      continue;
    }
    if (menuRoutes.length) {
      for (const menu of menuRoutes) {
        entries.push(toGeneratedEntry({
          repository,
          route: menu.runtimeRoute,
          sourceRoute,
          relativeFile: candidate.relativeFile,
          source,
          controllers,
          menu
        }));
      }
      continue;
    }
    entries.push(toGeneratedEntry({
      repository,
      route: sourceRoute,
      sourceRoute,
      relativeFile: candidate.relativeFile,
      source,
      controllers
    }));
  }

  if (repository.key === 'base') {
    const routeSource = await readFile(path.resolve(repository.frontend, 'src', 'router', 'admin-routes.js'), 'utf8');
    for (const item of adminRoutes(routeSource)) {
      if (curatedRoutes.has(item.route)) continue;
      const relativeFile = `${item.component.replace(/\/index$/i, '')}/index.vue`;
      const absoluteFile = path.resolve(viewsRoot, relativeFile);
      if (!await exists(absoluteFile)) continue;
      entries.push(toGeneratedEntry({
        repository,
        route: item.route,
        sourceRoute: item.route,
        relativeFile,
        source: await sourceForView(absoluteFile, repository.frontend),
        controllers,
        title: item.title
      }));
    }
  }

  const byRoute = new Map();
  for (const entry of entries) byRoute.set(entry.scenario.route.toLocaleLowerCase('en-US'), entry);
  return {
    repository,
    controllerCount: controllers.length,
    entries: [...byRoute.values()].sort((left, right) => left.scenario.route.localeCompare(right.scenario.route, 'zh-CN'))
  };
}

export function repositoryScenarioMarkdown(catalog) {
  const lines = [
    '# JMOM 代码仓库全量测试场景',
    '',
    '> 本文件由 `npm.cmd run scenarios:generate` 根据真实中文菜单、六套前端页面逻辑和六套后端 Controller 生成。已有专项手工场景不会重复生成；自动发现项以草稿状态进入平台。',
    '',
    `共发现 **${catalog.summary.scenarios}** 个菜单/代码页面场景、**${catalog.summary.testCases}** 个可执行测试用例、**${catalog.summary.modules}** 个模块，关联扫描 **${catalog.summary.controllers}** 个后端 Controller。`,
    '',
    '| 系统 | 场景数 | 用例数 | 前端仓库 | 后端仓库 | Controller 数 |',
    '| --- | ---: | ---: | --- | --- | ---: |'
  ];
  for (const source of catalog.sources) {
    lines.push(`| ${source.label} | ${source.scenarios} | ${source.testCases} | \`${source.frontend}\` | \`${source.backend}\` | ${source.controllers} |`);
  }
  lines.push('');
  for (const source of catalog.sources) {
    lines.push(`## ${source.label}`, '', '| 场景键 | 中文菜单/页面 | 运行路由 | 测试用例 | 代码证据 | 后端控制器 |', '| --- | --- | --- | --- | --- | --- |');
    for (const scenario of catalog.scenarios.filter((item) => item.system === source.key)) {
      const controllerText = scenario.controllers.map((item) => `${item.name}Controller`).join('、') || '-';
      const testCaseText = scenario.testCases.map((item) => item.name).join('、');
      lines.push(`| \`${scenario.key}\` | ${scenario.name} | \`${scenario.route}\` | ${testCaseText} | \`${scenario.sourceFile}\` | ${controllerText} |`);
    }
    lines.push('');
  }
  lines.push(
    '## 菜单源码覆盖',
    '',
    `真实菜单共 ${catalog.summary.menuRoutes} 个唯一可访问地址；其中 ${catalog.summary.coveredMenuRoutes} 个已由六个仓库中的页面或已有专项场景覆盖，${catalog.summary.unresolvedMenuRoutes} 个在六个仓库中没有对应页面源码。`,
    `未覆盖项中有 ${catalog.summary.excludedMenuRoutes} 个属于独立 SRM 系统，本轮按要求明确排除，不生成测试场景。`,
    ''
  );
  if (catalog.unresolvedMenus.length) {
    lines.push('| 未覆盖中文菜单 | 菜单地址 | 中文层级 | 原因 |', '| --- | --- | --- | --- |');
    for (const menu of catalog.unresolvedMenus) {
      lines.push(`| ${menu.name} | \`${menu.linkUrl}\` | ${menu.breadcrumb} | ${menu.reason} |`);
    }
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function repositoryPreferenceScore(repositoryKey, scenario) {
  const menuAppId = scenario.menu?.appId || '';
  if (menuAppId === '326038807613509') return repositoryKey === 'wms' ? 100 : 0;
  if (menuAppId === '632108536188997') return repositoryKey === 'mes' ? 100 : 0;
  if (menuAppId === '623553996980293') return repositoryKey === 'qms' ? 100 : 0;
  if (menuAppId === '625058497298501') return repositoryKey === 'tpm' ? 100 : 0;
  if (menuAppId === '469338449985605') return repositoryKey === 'legacyMes' ? 100 : 0;
  if (!menuAppId) return repositoryKey === 'base' ? 80 : 0;
  if (/^\/iMES6\//i.test(scenario.sourceRoute)) return repositoryKey === 'mes' ? 70 : 0;
  if (/^\/iMES\//i.test(scenario.sourceRoute)) return repositoryKey === 'legacyMes' ? 70 : 0;
  if (/^\/ITPM\//i.test(scenario.sourceRoute)) return repositoryKey === 'tpm' ? 70 : 0;
  if (/^\/(?:BaseConfig|QMS|SPC)\//i.test(scenario.sourceRoute)) return repositoryKey === 'qms' ? 70 : 0;
  if (/\/(?:ImsBillMst|ImsCustomReportLoading)\//i.test(scenario.sourceRoute)) return repositoryKey === 'base' ? 70 : 0;
  return repositoryKey === 'base' ? 20 : 10;
}

async function writeGeneratedScripts(scripts) {
  await mkdir(generatedScriptsDir, { recursive: true });
  let previous = { files: [] };
  if (await exists(generatedScriptsIndexPath)) {
    previous = JSON.parse(await readFile(generatedScriptsIndexPath, 'utf8'));
  }
  const nextFiles = new Set(scripts.map((item) => item.path));
  for (const stalePath of previous.files || []) {
    if (nextFiles.has(stalePath)) continue;
    const absolute = path.resolve(workspaceRoot, ...stalePath.split('/'));
    const relative = path.relative(generatedScriptsDir, absolute);
    if (!relative.startsWith('..') && !path.isAbsolute(relative) && /\.spec\.js$/i.test(absolute)) {
      await unlink(absolute).catch(() => {});
    }
  }
  await Promise.all(scripts.map((script) => {
    const absolute = path.resolve(workspaceRoot, ...script.path.split('/'));
    return writeFile(absolute, script.content, 'utf8');
  }));
  const index = {
    version: 1,
    files: [...nextFiles].sort((left, right) => left.localeCompare(right, 'zh-CN'))
  };
  await writeFile(generatedScriptsIndexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
}

export async function generateRepositoryScenarios({ write = true } = {}) {
  const menuCatalog = await readMenuCatalog();
  const discovered = await Promise.all(repositories.map((repository) => discoverRepository(repository, menuCatalog)));
  const discoveredEntries = discovered.flatMap((result) => result.entries.map((entry) => ({
    ...entry,
    repository: result.repository
  })));
  const selectedMenuEntries = new Map();
  const selectedEntries = [];
  for (const entry of discoveredEntries) {
    if (excludedMenuAppIds.has(entry.scenario.menu?.appId || '')) continue;
    const menuUrl = entry.scenario.menu?.linkUrl;
    if (!menuUrl) {
      selectedEntries.push(entry);
      continue;
    }
    const identity = menuUrl.toLocaleLowerCase('en-US');
    const existing = selectedMenuEntries.get(identity);
    if (!existing || repositoryPreferenceScore(entry.repository.key, entry.scenario) > repositoryPreferenceScore(existing.repository.key, existing.scenario)) {
      selectedMenuEntries.set(identity, entry);
    }
  }
  selectedEntries.push(...selectedMenuEntries.values());
  selectedEntries.sort((left, right) => (
    `${left.repository.key}:${left.scenario.route}`.localeCompare(`${right.repository.key}:${right.scenario.route}`, 'zh-CN')
  ));

  const scenarios = [];
  const moduleMap = new Map();
  const scripts = [];
  for (const { module, scenario, script, repository } of selectedEntries) {
    moduleMap.set(module.id, module);
    scenarios.push({ ...scenario, system: repository.key });
    scripts.push(script);
  }
  const modules = [...moduleMap.values()];

  const keys = scenarios.map((item) => item.key);
  if (new Set(keys).size !== keys.length) throw new Error('生成场景键存在重复');
  const scenarioIds = scenarios.map((item) => item.id);
  if (new Set(scenarioIds).size !== scenarioIds.length) throw new Error('生成场景 ID 存在重复');
  const moduleIds = modules.map((item) => item.id);
  if (new Set(moduleIds).size !== moduleIds.length) throw new Error('生成模块 ID 存在重复');
  if (scenarios.some((item) => !hasChinese(item.name))) throw new Error('生成场景名称必须包含中文');
  if (modules.some((item) => !hasChinese(item.name))) throw new Error('生成模块名称必须包含中文');

  const coveredMenuUrls = new Set(scenarios.filter((item) => item.menu).map((item) => item.menu.linkUrl.toLocaleLowerCase('en-US')));
  for (const menu of menuCatalog.routes) {
    if (curatedRoutes.has(menu.sourceRoute) && menu.runtimeRoute === menu.sourceRoute) {
      coveredMenuUrls.add(menu.linkUrl.toLocaleLowerCase('en-US'));
    }
  }
  const unresolvedMenus = menuCatalog.routes
    .filter((menu) => !coveredMenuUrls.has(menu.linkUrl.toLocaleLowerCase('en-US')))
    .map((menu) => ({
      ...menu,
      reason: excludedMenuAppIds.has(menu.appId)
        ? 'SRM 是独立系统，本轮明确排除'
        : '六个仓库未发现对应前端页面'
    }));

  const catalog = {
    version: 2,
    generator: 'scripts/generate-repository-scenarios.mjs',
    menuCatalog: 'scripts/data/system-menu-route-names.generated.json',
    summary: {
      scenarios: scenarios.length,
      testCases: scenarios.reduce((sum, item) => sum + item.testCases.length, 0),
      modules: modules.length,
      controllers: discovered.reduce((sum, item) => sum + item.controllerCount, 0),
      menuRoutes: menuCatalog.summary.uniqueRoutes,
      coveredMenuRoutes: coveredMenuUrls.size,
      unresolvedMenuRoutes: unresolvedMenus.length,
      excludedMenuRoutes: unresolvedMenus.filter((menu) => excludedMenuAppIds.has(menu.appId)).length
    },
    sources: discovered.map((item) => ({
      key: item.repository.key,
      label: item.repository.label,
      frontend: item.repository.frontend,
      backend: item.repository.backend,
      scenarios: scenarios.filter((scenario) => scenario.system === item.repository.key).length,
      testCases: scenarios.filter((scenario) => scenario.system === item.repository.key).reduce((sum, scenario) => sum + scenario.testCases.length, 0),
      controllers: item.controllerCount
    })),
    modules,
    scenarios,
    unresolvedMenus
  };

  if (write) {
    await Promise.all([
      mkdir(path.dirname(generatedJsonPath), { recursive: true }),
      mkdir(path.dirname(generatedDocPath), { recursive: true })
    ]);
    await Promise.all([
      writeFile(generatedJsonPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8'),
      writeFile(generatedDocPath, repositoryScenarioMarkdown(catalog), 'utf8'),
      writeGeneratedScripts(scripts)
    ]);
  }
  return catalog;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateRepositoryScenarios()
    .then((catalog) => {
      console.log(`已生成 ${catalog.summary.scenarios} 个场景、${catalog.summary.testCases} 个代码逻辑用例，覆盖 ${catalog.sources.map((item) => `${item.label} ${item.scenarios}`).join('、')}`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
