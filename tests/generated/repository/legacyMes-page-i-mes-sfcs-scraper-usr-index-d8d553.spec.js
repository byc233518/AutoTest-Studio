// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-scraper-usr-index-d8d553",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SfcsScraperUsr/Index",
  "sourceRoute": "/iMES/SfcsScraperUsr/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsScraperUsr/Index.vue",
  "dataSchema": {
    "columns": [
      "SCRAPER_NO",
      "Status",
      "WorkerNo",
      "Collar",
      "LOCATION"
    ],
    "required": [],
    "fields": [
      {
        "key": "SCRAPER_NO",
        "label": "刮刀号",
        "required": false
      },
      {
        "key": "Status",
        "label": "当前状态",
        "required": false
      },
      {
        "key": "WorkerNo",
        "label": "借用人工号",
        "required": false
      },
      {
        "key": "Collar",
        "label": "操作",
        "required": false
      },
      {
        "key": "LOCATION",
        "label": "储位",
        "required": false
      }
    ],
    "example": {
      "SCRAPER_NO": "刮刀号测试值",
      "Status": "Y",
      "WorkerNo": "借用人工号测试值",
      "Collar": "操作测试值",
      "LOCATION": "储位测试值"
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
