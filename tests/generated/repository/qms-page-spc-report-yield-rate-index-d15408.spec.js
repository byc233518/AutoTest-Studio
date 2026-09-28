// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-spc-report-yield-rate-index-d15408",
  "name": "质量管理 - 良品率报表功能校验",
  "displayName": "良品率报表",
  "route": "/SPC/Report/YieldRate/index",
  "sourceRoute": "/SPC/Report/YieldRate/index",
  "menuCode": "SpcYieldRateReport",
  "breadcrumb": "品质管理 / 功能菜单（SPC） / 良品率报表",
  "sourceFile": "src/views/SPC/Report/YieldRate/index.vue",
  "dataSchema": {
    "columns": [
      "Defectslimit"
    ],
    "required": [],
    "fields": [
      {
        "key": "Defectslimit",
        "label": "缺陷项显示数",
        "required": false
      }
    ],
    "example": {
      "Defectslimit": "缺陷项显示数测试值"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "Defectslimit": "缺陷项显示数测试值"
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
      "key": "faea8c1db9-f99627b53d-ce4ca",
      "type": "查看详情",
      "name": "查看分类业务入口校验",
      "label": "查看分类",
      "handler": "gotoControlGroup(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看分类",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-c9be30e2b9-7308c",
      "type": "查看详情",
      "name": "查看图表业务入口校验",
      "label": "查看图表",
      "handler": "previewAnalysisChart(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看图表",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    }
  ]
});
