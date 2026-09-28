// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-plan-cap-report-index-62817e",
  "name": "旧版制造执行 - 计划开拉日期（未配置菜单）功能校验",
  "displayName": "计划开拉日期（未配置菜单）",
  "route": "/iMES/MesPlanCapReport/Index",
  "sourceRoute": "/iMES/MesPlanCapReport/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 计划开拉日期（未配置菜单）",
  "sourceFile": "src/views/iMES/MesPlanCapReport/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "startDateRange"
    ],
    "required": [],
    "fields": [
      {
        "key": "WO_NO",
        "label": "订单号",
        "required": false
      },
      {
        "key": "startDateRange",
        "label": "计划开拉日期",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "startDateRange": "2026-08-01"
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
    },
    {
      "key": "query",
      "type": "查询",
      "name": "列表查询并等待数据加载",
      "buttonLabels": [
        "搜索",
        "查询"
      ],
      "trigger": "button",
      "sourceHandlers": [
        "search"
      ],
      "testData": {
        "WO_NO": "AT-001",
        "startDateRange": "2026-08-01"
      },
      "executionPolicy": "只读校验",
      "steps": [
        "填写可编辑查询条件",
        "点击查询按钮或按回车",
        "等待数据加载完成"
      ],
      "assertions": [
        "查询入口可用",
        "加载遮罩结束",
        "列表、空状态或业务结果区域可见"
      ],
      "mutatesData": false
    }
  ]
});
