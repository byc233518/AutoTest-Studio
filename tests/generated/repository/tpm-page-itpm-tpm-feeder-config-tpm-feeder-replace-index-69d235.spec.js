// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-feeder-config-tpm-feeder-replace-index-69d235",
  "name": "设备管理 - 替换条码（未配置菜单）功能校验",
  "displayName": "替换条码（未配置菜单）",
  "route": "/ITPM/TpmFeederConfig/TpmFeederReplace/Index",
  "sourceRoute": "/ITPM/TpmFeederConfig/TpmFeederReplace/Index",
  "menuCode": "",
  "breadcrumb": "设备管理 / 未配置菜单 / 替换条码（未配置菜单）",
  "sourceFile": "src/views/ITPM/TpmFeederConfig/TpmFeederReplace/Index.vue",
  "dataSchema": {
    "columns": [
      "Feeder",
      "NewFeeder"
    ],
    "required": [
      "Feeder",
      "NewFeeder"
    ],
    "fields": [
      {
        "key": "Feeder",
        "label": "原飞达编号",
        "required": true
      },
      {
        "key": "NewFeeder",
        "label": "新飞达编号",
        "required": true
      }
    ],
    "example": {
      "Feeder": "AT-001",
      "NewFeeder": "AT-001"
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
