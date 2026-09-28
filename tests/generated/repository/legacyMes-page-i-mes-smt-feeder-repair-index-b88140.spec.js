// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-feeder-repair-index-b88140",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SmtFeederRepair/Index",
  "sourceRoute": "/iMES/SmtFeederRepair/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtFeederRepair/Index.vue",
  "dataSchema": {
    "columns": [
      "feeder",
      "REASON_CODE",
      "DAMAGE_PART",
      "METHOD",
      "RESULT"
    ],
    "required": [
      "feeder",
      "REASON_CODE",
      "DAMAGE_PART",
      "METHOD",
      "RESULT"
    ],
    "fields": [
      {
        "key": "feeder",
        "label": "料架",
        "required": true
      },
      {
        "key": "REASON_CODE",
        "label": "根本原因",
        "required": true
      },
      {
        "key": "DAMAGE_PART",
        "label": "损坏部件",
        "required": true
      },
      {
        "key": "METHOD",
        "label": "维修方法",
        "required": true
      },
      {
        "key": "RESULT",
        "label": "维修结果",
        "required": true
      }
    ],
    "example": {
      "feeder": "料架测试值",
      "REASON_CODE": "根本原因测试值",
      "DAMAGE_PART": "损坏部件测试值",
      "METHOD": "维修方法测试值",
      "RESULT": "维修结果测试值"
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
