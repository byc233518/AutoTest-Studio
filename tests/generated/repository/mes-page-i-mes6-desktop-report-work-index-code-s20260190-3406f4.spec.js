// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-desktop-report-work-index-code-s20260190-3406f4",
  "name": "制造执行 - 包装前检验（批次号）功能校验",
  "displayName": "包装前检验（批次号）",
  "route": "/iMES6/DesktopReportWork/Index?code=S20260190",
  "sourceRoute": "/iMES6/DesktopReportWork/Index",
  "menuCode": "DesktopCheckReport2",
  "breadcrumb": "生产管理 / 生产作业 / 包装前检验（批次号）",
  "sourceFile": "src/views/iMES6/DesktopReportWork/Index.vue",
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
