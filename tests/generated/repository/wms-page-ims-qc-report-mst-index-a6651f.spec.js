// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-report-mst-index-a6651f",
  "name": "仓储管理 - 检验报告管理功能校验",
  "displayName": "检验报告管理",
  "route": "/ImsQcReportMst/Index",
  "sourceRoute": "/ImsQcReportMst/Index",
  "menuCode": "ImsQcReportMst",
  "breadcrumb": "品质管理 / 报告审核 / 检验报告管理",
  "sourceFile": "src/views/ImsQcReportMst/Index.vue",
  "dataSchema": {
    "columns": [
      "ReportHiCode",
      "QcHiCode",
      "Result",
      "LooseNumber",
      "OaMsg"
    ],
    "required": [
      "Result",
      "LooseNumber"
    ],
    "fields": [
      {
        "key": "ReportHiCode",
        "label": "报告编号",
        "required": false
      },
      {
        "key": "QcHiCode",
        "label": "检验编号",
        "required": false
      },
      {
        "key": "Result",
        "label": "审批结果",
        "required": true
      },
      {
        "key": "LooseNumber",
        "label": "宽收数量",
        "required": true
      },
      {
        "key": "OaMsg",
        "label": "审核备注",
        "required": false
      }
    ],
    "example": {
      "ReportHiCode": "AT-001",
      "QcHiCode": "AT-001",
      "Result": "审批结果测试值",
      "LooseNumber": "1",
      "OaMsg": "自动化测试备注001"
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
        "ReportHiCode": "AT-001",
        "QcHiCode": "AT-001",
        "Result": "审批结果测试值",
        "LooseNumber": "1",
        "OaMsg": "自动化测试备注001"
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
      "key": "7e002f9936-fe945e5a0d-fd190",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "examine(scope.row)",
      "permission": "ImsQcReportMstCheck",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-a6af8fd557-110a8",
      "type": "业务动作",
      "name": "宽收审核业务入口校验",
      "label": "宽收审核",
      "handler": "looseExamine(scope.row)",
      "permission": "ImsQcReportMstLooseExamine",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位宽收审核",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-11c26f9b44-c8c32",
      "type": "查看详情",
      "name": "查看报表业务入口校验",
      "label": "查看报表",
      "handler": "report(scope.row)",
      "permission": "ImsQcReportMstReport",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看报表",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-3c977df7ce-ca592",
      "type": "业务动作",
      "name": "打印业务入口校验",
      "label": "打印",
      "handler": "reportPrint(scope.row)",
      "permission": "ImsQcReportMstPrint",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    }
  ]
});
