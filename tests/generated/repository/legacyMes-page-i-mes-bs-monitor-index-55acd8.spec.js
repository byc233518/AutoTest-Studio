// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-bs-monitor-index-55acd8",
  "name": "旧版制造执行 - 产品信息（未配置菜单）功能校验",
  "displayName": "产品信息（未配置菜单）",
  "route": "/iMES/BsMonitor/index",
  "sourceRoute": "/iMES/BsMonitor/index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 产品信息（未配置菜单）",
  "sourceFile": "src/views/iMES/BsMonitor/index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "PART_NO",
      "PART_NAME",
      "PART_DESC",
      "CONTROL_METHOD"
    ],
    "required": [],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": false
      },
      {
        "key": "CONTROL_METHOD",
        "label": "管控方式",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "PART_DESC": "规格测试值",
      "CONTROL_METHOD": "管控方式测试值"
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
