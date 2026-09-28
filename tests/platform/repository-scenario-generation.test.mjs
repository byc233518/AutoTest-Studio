import assert from 'node:assert/strict';
import { access, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  generateRepositoryScenarios,
  repositoryScenarioMarkdown
} from '../../scripts/generate-repository-scenarios.mjs';
import { buildLocalExecutionBundle } from '../../server/platform/local-executions.mjs';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const catalogPath = path.resolve(workspaceRoot, 'server', 'platform', 'repository-scenarios.generated.json');
const docPath = path.resolve(workspaceRoot, 'docs', '代码仓库全量测试场景.md');
const scriptsIndexPath = path.resolve(workspaceRoot, 'tests', 'generated', 'repository', 'index.generated.json');
const chinesePattern = /[\u3400-\u9fff]/u;

async function readCatalog() {
  return JSON.parse(await readFile(catalogPath, 'utf8'));
}

test('代码仓库生成目录使用中文命名、真实菜单路由和独立脚本', async () => {
  const catalog = await readCatalog();
  const scenarioKeys = catalog.scenarios.map((scenario) => scenario.key);
  const scenarioIds = catalog.scenarios.map((scenario) => scenario.id);
  const moduleIds = catalog.modules.map((module) => module.id);
  const knownModuleIds = new Set(moduleIds);
  const menuUrls = catalog.scenarios.filter((scenario) => scenario.menu).map((scenario) => scenario.menu.linkUrl.toLowerCase());
  const scriptIndex = JSON.parse(await readFile(scriptsIndexPath, 'utf8'));

  assert.equal(catalog.version, 2);
  assert.equal(new Set(scenarioKeys).size, scenarioKeys.length);
  assert.equal(new Set(scenarioIds).size, scenarioIds.length);
  assert.equal(new Set(moduleIds).size, moduleIds.length);
  assert.equal(new Set(menuUrls).size, menuUrls.length);
  assert.equal(catalog.scenarios.length, catalog.summary.scenarios);
  assert.equal(catalog.modules.length, catalog.summary.modules);
  assert.equal(catalog.scenarios.reduce((sum, scenario) => sum + scenario.testCases.length, 0), catalog.summary.testCases);
  assert.equal(catalog.scenarios.every((scenario) => knownModuleIds.has(scenario.moduleId)), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.route.startsWith('/')), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.status === 'draft'), true);
  assert.equal(catalog.scenarios.every((scenario) => chinesePattern.test(scenario.name)), true);
  assert.equal(catalog.scenarios.every((scenario) => chinesePattern.test(scenario.module)), true);
  assert.equal(catalog.modules.every((module) => chinesePattern.test(module.name)), true);
  assert.equal(catalog.sources.every((source) => chinesePattern.test(source.label)), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.testCases.length > 0), true);
  assert.equal(catalog.scenarios.every((scenario) => (
    new Set(scenario.testCases.map((item) => item.name)).size === scenario.testCases.length
  )), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.testCases.every((item) => item.mutatesData === false)), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.testCases.every((item) => (
    item.executionPolicy
    && item.steps?.length > 0
    && item.assertions?.length > 0
  ))), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.testCases
    .filter((item) => item.type === '业务动作' && item.sourceMutatesData)
    .every((item) => item.executionPolicy === '只校验入口，不执行数据变更')), true);
  assert.equal(catalog.scenarios.every((scenario) => {
    const menuTriggers = new Set(scenario.testCases.map((item) => item.menuTriggerLabel).filter(Boolean));
    return scenario.testCases.every((item) => !(item.type === '业务动作' && menuTriggers.has(item.label)));
  }), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.dataSchema.columns.length > 0), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.dataSchema.columns.every((column) => (
    String(scenario.dataSchema.example[column] ?? '').trim().length > 0
  ))), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.scriptEntry.startsWith('tests/generated/repository/')), true);
  assert.equal(catalog.scenarios.every((scenario) => scenario.scriptEntry.endsWith('.spec.js')), true);
  assert.deepEqual(catalog.sources.map((source) => source.key), ['base', 'mes', 'wms', 'qms', 'tpm', 'legacyMes']);
  assert.equal(catalog.sources.reduce((sum, source) => sum + source.scenarios, 0), catalog.summary.scenarios);
  assert.equal(scriptIndex.files.length, catalog.scenarios.length);
  assert.deepEqual([...scriptIndex.files].sort(), catalog.scenarios.map((scenario) => scenario.scriptEntry).sort());
  assert.equal(catalog.summary.coveredMenuRoutes + catalog.summary.unresolvedMenuRoutes, catalog.summary.menuRoutes);
  assert.equal(catalog.summary.excludedMenuRoutes, 23);
  assert.equal(catalog.unresolvedMenus.length, catalog.summary.unresolvedMenuRoutes);
  assert.equal(catalog.unresolvedMenus.every((menu) => chinesePattern.test(menu.name) && chinesePattern.test(menu.breadcrumb)), true);
  assert.equal(catalog.unresolvedMenus.every((menu) => chinesePattern.test(menu.reason)), true);

  for (const source of catalog.sources) {
    const sourceRootAvailable = await access(source.frontend).then(() => true, () => false);
    if (!sourceRootAvailable) continue;
    const sourceScenarios = catalog.scenarios.filter((scenario) => scenario.system === source.key);
    assert.equal(sourceScenarios.length, source.scenarios);
    for (const scenario of sourceScenarios) {
      await access(path.resolve(source.frontend, scenario.sourceFile));
      await access(path.resolve(workspaceRoot, scenario.scriptEntry));
    }
  }
});

test('六个系统典型路由映射为真实中文菜单且技术标识保持稳定', async () => {
  const catalog = await readCatalog();
  const dataDictionary = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/SysDataDict/Index');
  const defects = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/iMES6/ImesDefects/Index');
  const partCharger = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/ImsPartCharger/Index');
  const samplingPlan = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/BaseConfig/SamplingPlan/Index');
  const mold = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/ITPM/TpmMold/Index');
  const legacyEquipment = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/iMES/SfcsEquipment/Index');
  const dailyEquipmentPlan = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/iMES6/ProductionPlan/DailyEquipmentPlan/Index');
  const burnApply = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/iMES6/ImesBurnApply/Index');
  const barcodeFilter = catalog.scenarios.find((scenario) => scenario.sourceRoute === '/ImsBcdFilterMst/Index');
  const dynamicDictionary = catalog.scenarios.find((scenario) => scenario.menu?.linkUrl === '/ImsCustomReportLoading/Index?mst_name=IMS_LOOKUP');

  assert.equal(dataDictionary.name, '基座系统 - 数据字典功能校验');
  assert.equal(dataDictionary.module, '系统管理 / 系统配置 / 数据字典');
  assert.equal(dataDictionary.key, 'base-page-sys-data-dict-index-4159c2');
  assert.equal(dataDictionary.id, 'SCN-AUTO-BASE-4159C288EF');
  assert.equal(dataDictionary.moduleId, 'MOD-AUTO-BASE-4159C288EF');
  assert.deepEqual(dataDictionary.dataSchema.required.sort(), ['Key', 'Type', 'Value']);
  assert.equal(dataDictionary.testCases.some((item) => item.type === '新增表单' && item.handler === 'add(0)'), true);
  assert.equal(dataDictionary.testCases.some((item) => item.type === '删除确认' && item.handler === 'remove(scope.row)'), true);

  assert.equal(defects.name, '制造执行 - 维修管理功能校验');
  assert.equal(defects.testCases.some((item) => item.label === '批次送修' && item.handler === "openFormEditor('Batch')"), true);
  assert.equal(partCharger.name, '仓储管理 - 品号负责人功能校验');
  assert.equal(partCharger.module, '基础设定 / 基础数据 / 品号负责人');
  assert.equal(samplingPlan.name, '质量管理 - 抽样方案功能校验');
  assert.equal(samplingPlan.module, '功能菜单（QMS2） / 基础数据 / 抽样方案');
  assert.equal(mold.name, '设备管理 - 模具管理功能校验');
  assert.equal(mold.module, '设备管理 / 模具管理 / 模具管理');
  assert.equal(mold.testCases.some((item) => item.type === '新增表单' && item.handler === 'openFormEditor'), true);
  assert.equal(mold.testCases.some((item) => item.label === '架模作业' && item.menuTriggerLabel === '操作作业'), true);
  assert.equal(mold.testCases.some((item) => item.type === '删除确认' && item.handler === 'deleteRecord(row)' && item.rowAction), true);
  assert.equal(legacyEquipment.name, '旧版制造执行 - 设备信息维护功能校验');
  assert.equal(legacyEquipment.module, '设备管理 / 设备管理 / 设备信息维护');
  assert.equal(dailyEquipmentPlan.dataSchema.columns.includes('PlanDate'), true);
  assert.equal(dailyEquipmentPlan.dataSchema.columns.includes('DatePlanQty'), true);
  assert.match(dailyEquipmentPlan.dataSchema.example.PlanDate, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(burnApply.dataSchema.required.includes('WoNo'), true);
  assert.equal(burnApply.dataSchema.columns.includes('ApplyNo'), true);
  assert.equal(barcodeFilter.dataSchema.required.includes('BcdType'), true);
  assert.equal(barcodeFilter.dataSchema.columns.includes('Separator'), true);
  assert.equal(dynamicDictionary.name, '基座系统 - 数据字典功能校验');
  assert.equal(dynamicDictionary.sourceRoute, '/ImsCustomReportLoading/Index');
  assert.equal(dynamicDictionary.route, '/ImsCustomReportLoading/Index/IMS_LOOKUP?mst_name=IMS_LOOKUP');
  assert.equal(dynamicDictionary.testCases.some((item) => item.label === '导入/导出'), false);
  assert.equal(dynamicDictionary.testCases.some((item) => item.type === '导入入口'), false);
  assert.equal(dynamicDictionary.testCases.some((item) => item.type === '导出入口'), false);
  assert.equal(dynamicDictionary.testCases.some((item) => item.type === '运行时业务按钮' && item.sourceCandidates.length > 0), true);
  assert.equal(Object.values(dynamicDictionary.testCases.find((item) => item.type === '查询').testData)
    .every((value) => String(value).trim().length > 0), true);
  assert.equal(catalog.scenarios.some((scenario) => scenario.menu?.appId === '426886906724421'), false);
  assert.equal(catalog.unresolvedMenus.filter((menu) => menu.appId === '426886906724421').length, 23);
  assert.equal(catalog.unresolvedMenus.filter((menu) => menu.appId === '426886906724421').every((menu) => menu.reason.includes('明确排除')), true);
});

test('代码仓库场景生成结果稳定且文档同步', async () => {
  const beforeCatalog = await readFile(catalogPath, 'utf8');
  const beforeDoc = await readFile(docPath, 'utf8');

  const first = await generateRepositoryScenarios({ write: false });
  const second = await generateRepositoryScenarios({ write: false });
  const firstCatalog = `${JSON.stringify(first, null, 2)}\n`;
  const firstDoc = repositoryScenarioMarkdown(first);
  const secondCatalog = `${JSON.stringify(second, null, 2)}\n`;
  const secondDoc = repositoryScenarioMarkdown(second);

  assert.equal(firstCatalog, beforeCatalog);
  assert.equal(firstDoc, beforeDoc);
  assert.equal(secondCatalog, firstCatalog);
  assert.equal(secondDoc, firstDoc);
});

test('每个仓库场景脚本固化真实路由、中文名称和源码工作流', async () => {
  const catalog = await readCatalog();
  for (const scenario of catalog.scenarios) {
    const source = await readFile(path.resolve(workspaceRoot, scenario.scriptEntry), 'utf8');
    assert.match(source, /defineRepositoryScenario\(/);
    assert.match(source, /步骤、测试数据、断言和数据安全策略/);
    assert.match(source, /"executionPolicy"/);
    assert.match(source, /"assertions"/);
    assert.match(source, /"dataSchema"/);
    assert.equal(source.includes(JSON.stringify(scenario.route)), true);
    assert.equal(source.includes(JSON.stringify(scenario.name)), true);
    for (const testCase of scenario.testCases) assert.equal(source.includes(JSON.stringify(testCase.name)), true);
  }
});

test('代码仓库场景的本机执行包包含独立脚本和通用业务执行器', async (t) => {
  const catalog = await readCatalog();
  const scenario = catalog.scenarios.find((item) => item.key === 'base-page-sys-data-dict-index-4159c2');
  const temporaryDir = await mkdtemp(path.join(tmpdir(), 'jmom-repository-scenario-'));
  t.after(() => rm(temporaryDir, { recursive: true, force: true }));
  const rowsPath = path.resolve(temporaryDir, 'rows.json');
  await writeFile(rowsPath, '[]\n', 'utf8');

  const bundle = await buildLocalExecutionBundle({
    workspaceRoot,
    dataDir: temporaryDir,
    scenario: {
      key: scenario.key,
      name: scenario.name,
      script_entry: scenario.scriptEntry
    },
    dataset: { name: '空数据集', rows_path: rowsPath },
    environment: {
      key: 'test',
      base_url: 'http://127.0.0.1:46069',
      username: 'tester',
      password: 'secret'
    }
  });

  assert.equal(bundle.files.some((file) => file.path === scenario.scriptEntry), true);
  assert.equal(bundle.files.some((file) => file.path === 'tests/support/repository-scenario.js'), true);
  assert.equal(bundle.files.some((file) => file.path === 'server/platform/repository-scenarios.generated.json'), false);
});
