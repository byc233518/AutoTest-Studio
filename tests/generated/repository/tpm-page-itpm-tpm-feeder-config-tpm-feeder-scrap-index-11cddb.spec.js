// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-feeder-config-tpm-feeder-scrap-index-11cddb",
  "name": "设备管理 - 飞达报废（未配置菜单）功能校验",
  "displayName": "飞达报废（未配置菜单）",
  "route": "/ITPM/TpmFeederConfig/TpmFeederScrap/Index",
  "sourceRoute": "/ITPM/TpmFeederConfig/TpmFeederScrap/Index",
  "menuCode": "",
  "breadcrumb": "设备管理 / 未配置菜单 / 飞达报废（未配置菜单）",
  "sourceFile": "src/views/ITPM/TpmFeederConfig/TpmFeederScrap/Index.vue",
  "dataSchema": {
    "columns": [
      "Feeder",
      "ScrapReason"
    ],
    "required": [
      "Feeder",
      "ScrapReason"
    ],
    "fields": [
      {
        "key": "Feeder",
        "label": "飞达编号",
        "required": true
      },
      {
        "key": "ScrapReason",
        "label": "报废原因",
        "required": true
      }
    ],
    "example": {
      "Feeder": "AT-001",
      "ScrapReason": "报废原因测试值"
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
