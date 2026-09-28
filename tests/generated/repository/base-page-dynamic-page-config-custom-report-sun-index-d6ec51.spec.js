// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-dynamic-page-config-custom-report-sun-index-d6ec51",
  "name": "基座系统 - 孙表编辑详情（未配置菜单）功能校验",
  "displayName": "孙表编辑详情（未配置菜单）",
  "route": "/DynamicPageConfig/CustomReportSun/Index",
  "sourceRoute": "/DynamicPageConfig/CustomReportSun/Index",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 孙表编辑详情（未配置菜单）",
  "sourceFile": "src/views/DynamicPageConfig/CustomReportSun/Index.vue",
  "dataSchema": {
    "columns": [
      "查询关键字"
    ],
    "required": [],
    "fields": [
      {
        "key": "查询关键字",
        "label": "查询关键字",
        "required": false
      }
    ],
    "example": {
      "查询关键字": "查询关键字测试值"
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
