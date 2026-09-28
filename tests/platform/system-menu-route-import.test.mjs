import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildMenuRouteCatalog } from '../../scripts/import-system-menu-routes.mjs';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const generatedPath = path.resolve(workspaceRoot, 'scripts', 'data', 'system-menu-route-names.generated.json');

test('真实菜单树保留中文面包屑并按基座代码生成动态运行路由', () => {
  const tree = [{
    Id: 1,
    Parent_Id: 0,
    Menu_Code: 'System',
    Menu_Name: '系统管理',
    Link_Url: 'System',
    children: [{
      Id: 2,
      Parent_Id: 1,
      Menu_Code: 'IMS_LOOKUP',
      Menu_Name: '数据字典',
      Link_Url: '/ImsCustomReportLoading/Index?mst_name=IMS_LOOKUP',
      children: []
    }]
  }];
  const catalog = buildMenuRouteCatalog(tree);
  assert.equal(catalog.summary.uniqueRoutes, 1);
  assert.deepEqual(catalog.routes[0], {
    id: '2',
    parentId: '1',
    menuCode: 'IMS_LOOKUP',
    name: '数据字典',
    originalName: '数据字典',
    linkUrl: '/ImsCustomReportLoading/Index?mst_name=IMS_LOOKUP',
    sourceRoute: '/ImsCustomReportLoading/Index',
    runtimeRoute: '/ImsCustomReportLoading/Index/IMS_LOOKUP?mst_name=IMS_LOOKUP',
    breadcrumb: '系统管理 / 数据字典',
    appId: '',
    appUrl: '',
    target: '',
    enabled: '',
    aliases: []
  });
});

test('真实菜单映射的完整地址去重且所有展示名称包含中文', async () => {
  const catalog = JSON.parse(await readFile(generatedPath, 'utf8'));
  const urls = catalog.routes.map((route) => route.linkUrl.toLowerCase());
  assert.equal(catalog.summary.uniqueRoutes, catalog.routes.length);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(catalog.routes.every((route) => /[\u3400-\u9fff]/u.test(route.name)), true);
  assert.equal(catalog.routes.every((route) => /[\u3400-\u9fff]/u.test(route.breadcrumb)), true);
  assert.equal(catalog.routes.find((route) => route.sourceRoute === '/SysDataDict/Index')?.name, '数据字典');
  assert.equal(catalog.routes.find((route) => route.sourceRoute === '/ImsPartCharger/Index')?.name, '品号负责人');
  assert.equal(catalog.routes.find((route) => route.sourceRoute === '/iMES6/ImesDefects/Index')?.name, '维修管理');
  assert.equal(catalog.routes.find((route) => route.sourceRoute === '/iMES6/SfcsFactoryModeling/Index')?.name, '工厂建模');
});
