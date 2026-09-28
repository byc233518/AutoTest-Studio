// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ims-qc-defect-report-mst-index-a1f575",
  "name": "旧版制造执行 - 品质异常管理功能校验",
  "displayName": "品质异常管理",
  "route": "/iMES/ImsQcDefectReportMst/index",
  "sourceRoute": "/iMES/ImsQcDefectReportMst/index",
  "menuCode": "iMES_ImsQcDefectReportMst",
  "breadcrumb": "品质管理 / 检验作业 / 品质异常管理",
  "sourceFile": "src/views/iMES/ImsQcDefectReportMst/index.vue",
  "dataSchema": {
    "columns": [
      "DOC_NAME",
      "STATUS",
      "HI_CODE"
    ],
    "required": [],
    "fields": [
      {
        "key": "DOC_NAME",
        "label": "单据类别",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "HI_CODE",
        "label": "检验报告编号",
        "required": false
      }
    ],
    "example": {
      "DOC_NAME": "单据类别测试值",
      "STATUS": "Y",
      "HI_CODE": "AT-001"
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
        "DOC_NAME": "单据类别测试值",
        "STATUS": "Y",
        "HI_CODE": "AT-001"
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
      "key": "faea8c1db9-4f55ee1e68-5f094",
      "type": "查看详情",
      "name": "详情业务入口校验",
      "label": "详情",
      "handler": "detailsClick(row, row.$index)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击详情",
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
