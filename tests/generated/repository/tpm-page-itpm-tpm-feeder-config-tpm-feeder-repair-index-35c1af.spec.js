// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-feeder-config-tpm-feeder-repair-index-35c1af",
  "name": "设备管理 - 飞达维修（未配置菜单）功能校验",
  "displayName": "飞达维修（未配置菜单）",
  "route": "/ITPM/TpmFeederConfig/TpmFeederRepair/Index",
  "sourceRoute": "/ITPM/TpmFeederConfig/TpmFeederRepair/Index",
  "menuCode": "",
  "breadcrumb": "设备管理 / 未配置菜单 / 飞达维修（未配置菜单）",
  "sourceFile": "src/views/ITPM/TpmFeederConfig/TpmFeederRepair/Index.vue",
  "dataSchema": {
    "columns": [
      "FeederNo",
      "ReasonCode",
      "DamagePart",
      "Method",
      "Result"
    ],
    "required": [
      "FeederNo",
      "ReasonCode",
      "DamagePart",
      "Method",
      "Result"
    ],
    "fields": [
      {
        "key": "FeederNo",
        "label": "飞达编号",
        "required": true
      },
      {
        "key": "ReasonCode",
        "label": "根本原因",
        "required": true
      },
      {
        "key": "DamagePart",
        "label": "损坏部件",
        "required": true
      },
      {
        "key": "Method",
        "label": "维修方法",
        "required": true
      },
      {
        "key": "Result",
        "label": "维修结果",
        "required": true
      }
    ],
    "example": {
      "FeederNo": "AT-001",
      "ReasonCode": "根本原因测试值",
      "DamagePart": "损坏部件测试值",
      "Method": "维修方法测试值",
      "Result": "维修结果测试值"
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
