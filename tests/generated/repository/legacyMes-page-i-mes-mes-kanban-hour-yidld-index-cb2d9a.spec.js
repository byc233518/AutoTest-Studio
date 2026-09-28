// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-kanban-hour-yidld-index-cb2d9a",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/MesKanbanHourYidld/Index",
  "sourceRoute": "/iMES/MesKanbanHourYidld/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/MesKanbanHourYidld/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "WO_NO",
      "PART_NO",
      "REPORT_CONTENT",
      "BEGIN_TIME",
      "END_TIME"
    ],
    "required": [],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "REPORT_CONTENT",
        "label": "报告内容",
        "required": false
      },
      {
        "key": "BEGIN_TIME",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "END_TIME",
        "label": "结束日期",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "WO_NO": "工单测试值",
      "PART_NO": "AT-001",
      "REPORT_CONTENT": "报告内容测试值",
      "BEGIN_TIME": "2026-08-01",
      "END_TIME": "2026-08-01"
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
        "searchClick"
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "WO_NO": "工单测试值",
        "PART_NO": "AT-001",
        "REPORT_CONTENT": "报告内容测试值",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
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
