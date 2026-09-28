// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-defect-maintainence-report-index-9dbd7b",
  "name": "旧版制造执行 - 主条件区（未配置菜单）功能校验",
  "displayName": "主条件区（未配置菜单）",
  "route": "/iMES/DefectMaintainenceReport/Index",
  "sourceRoute": "/iMES/DefectMaintainenceReport/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 主条件区（未配置菜单）",
  "sourceFile": "src/views/iMES/DefectMaintainenceReport/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "WO_NO",
      "USERS",
      "SN",
      "BEGIN_TIME",
      "END_TIME"
    ],
    "required": [],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "USERS",
        "label": "维修员",
        "required": false
      },
      {
        "key": "SN",
        "label": "流水号",
        "required": false
      },
      {
        "key": "BEGIN_TIME",
        "label": "起始时间",
        "required": false
      },
      {
        "key": "END_TIME",
        "label": "结束时间",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "WO_NO": "工单测试值",
      "USERS": "维修员测试值",
      "SN": "流水号测试值",
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
        "searchClick",
        "getDefectReportList"
      ],
      "testData": {
        "PART_NO": "AT-001",
        "WO_NO": "工单测试值",
        "USERS": "维修员测试值",
        "SN": "流水号测试值",
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
    },
    {
      "key": "ef879b4ced-188896795f-4e089",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "exportEvent",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
