// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-report-form-qc-qc-recheck-list-index-5b3e7c",
  "name": "仓储管理 - 复检库存查询功能校验",
  "displayName": "复检库存查询",
  "route": "/ReportForm/Qc/QcRecheckList/Index",
  "sourceRoute": "/ReportForm/Qc/QcRecheckList/Index",
  "menuCode": "QcRecheckList",
  "breadcrumb": "品质管理 / 检验作业 / 复检库存查询",
  "sourceFile": "src/views/ReportForm/Qc/QcRecheckList/Index.vue",
  "dataSchema": {
    "columns": [
      "BuName",
      "SicName",
      "PartName",
      "NxtRecheck",
      "LstRecheckDays"
    ],
    "required": [],
    "fields": [
      {
        "key": "BuName",
        "label": "厂部",
        "required": false
      },
      {
        "key": "SicName",
        "label": "库别",
        "required": false
      },
      {
        "key": "PartName",
        "label": "品名/料号",
        "required": false
      },
      {
        "key": "NxtRecheck",
        "label": "下次复检时间",
        "required": false
      },
      {
        "key": "LstRecheckDays",
        "label": "距离上次复检天数",
        "required": false
      }
    ],
    "example": {
      "BuName": "厂部测试值",
      "SicName": "库别测试值",
      "PartName": "AT-001",
      "NxtRecheck": "2026-08-01",
      "LstRecheckDays": "距离上次复检天数测试值"
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
        "查询",
        "搜索"
      ],
      "trigger": "button",
      "sourceHandlers": [
        "search"
      ],
      "testData": {
        "BuName": "厂部测试值",
        "SicName": "库别测试值",
        "PartName": "AT-001",
        "NxtRecheck": "2026-08-01",
        "LstRecheckDays": "距离上次复检天数测试值"
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
      "key": "7e002f9936-3a30d546f6-4cf9e",
      "type": "业务动作",
      "name": "生成复检任务业务入口校验",
      "label": "生成复检任务",
      "handler": "generateRecheck",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位生成复检任务",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
