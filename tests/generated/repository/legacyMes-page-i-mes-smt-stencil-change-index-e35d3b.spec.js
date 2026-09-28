// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-stencil-change-index-e35d3b",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SmtStencilChange/Index",
  "sourceRoute": "/iMES/SmtStencilChange/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtStencilChange/Index.vue",
  "dataSchema": {
    "columns": [
      "STENCIL_NO",
      "LOCATION",
      "NewLocation"
    ],
    "required": [
      "STENCIL_NO",
      "LOCATION",
      "NewLocation"
    ],
    "fields": [
      {
        "key": "STENCIL_NO",
        "label": "钢网编号",
        "required": true
      },
      {
        "key": "LOCATION",
        "label": "旧储位",
        "required": true
      },
      {
        "key": "NewLocation",
        "label": "新储位",
        "required": true
      }
    ],
    "example": {
      "STENCIL_NO": "AT-001",
      "LOCATION": "旧储位测试值",
      "NewLocation": "新储位测试值"
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
