// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-ims-custom-report-loading-ims-custom-report-search-index-cb1f6a",
  "name": "基座系统 - 高级查询（未配置菜单）功能校验",
  "displayName": "高级查询（未配置菜单）",
  "route": "/ImsCustomReportLoading/ImsCustomReportSearch/index",
  "sourceRoute": "/ImsCustomReportLoading/ImsCustomReportSearch/index",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 高级查询（未配置菜单）",
  "sourceFile": "src/views/ImsCustomReportLoading/ImsCustomReportSearch/index.vue",
  "dataSchema": {
    "columns": [
      "PARAM_VALUE"
    ],
    "required": [],
    "fields": [
      {
        "key": "PARAM_VALUE",
        "label": "参数值",
        "required": false
      }
    ],
    "example": {
      "PARAM_VALUE": "参数值测试值"
    }
  },
  "workflows": [
    {
      "key": "page-load",
      "type": "页面加载",
      "name": "页面加载与交互区域校验",
      "executionPolicy": "只读校验",
      "steps": [
        "打开真实业务路由",
        "等待微前端和加载遮罩结束",
        "校验标题、权限和交互区域"
      ],
      "assertions": [
        "目标路由不是登录页或404",
        "页面无权限错误和阻塞骨架屏",
        "页面存在真实交互区域"
      ],
      "mutatesData": false
    }
  ]
});
