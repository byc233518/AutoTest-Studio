// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-report-result-index-28c58b",
  "name": "仓储管理 - 宽收审核报表功能校验",
  "displayName": "宽收审核报表",
  "route": "/ImsQcReportResult/Index",
  "sourceRoute": "/ImsQcReportResult/Index",
  "menuCode": "ImsQcReportResult",
  "breadcrumb": "品质管理 / 报告审核 / 宽收审核报表",
  "sourceFile": "src/views/ImsQcReportResult/Index.vue",
  "dataSchema": {
    "columns": [
      "HiCode",
      "CheckCount",
      "Result",
      "Qty",
      "Remark"
    ],
    "required": [
      "HiCode",
      "Result",
      "Qty"
    ],
    "fields": [
      {
        "key": "HiCode",
        "label": "检验编号",
        "required": true
      },
      {
        "key": "CheckCount",
        "label": "来料数量",
        "required": false
      },
      {
        "key": "Result",
        "label": "审批结果",
        "required": true
      },
      {
        "key": "Qty",
        "label": "宽收数量",
        "required": true
      },
      {
        "key": "Remark",
        "label": "审核备注",
        "required": false
      }
    ],
    "example": {
      "HiCode": "AT-001",
      "CheckCount": "1",
      "Result": "审批结果测试值",
      "Qty": "1",
      "Remark": "自动化测试备注001"
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
        "HiCode": "AT-001",
        "CheckCount": "1",
        "Result": "审批结果测试值",
        "Qty": "1",
        "Remark": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-58d1b",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add",
      "permission": "ImsQcReportResultAdd",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false,
      "fields": [
        {
          "key": "HiCode",
          "label": "检验编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CheckCount",
          "label": "来料数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "Result",
          "label": "审批结果",
          "required": true,
          "example": "审批结果测试值"
        },
        {
          "key": "Qty",
          "label": "宽收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "Remark",
          "label": "审核备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "HiCode": "AT-001",
        "CheckCount": "1",
        "Result": "审批结果测试值",
        "Qty": "1",
        "Remark": "自动化测试备注001"
      }
    },
    {
      "key": "7e002f9936-a6af8fd557-f3cc7",
      "type": "业务动作",
      "name": "宽收审核业务入口校验",
      "label": "宽收审核",
      "handler": "looseExamine",
      "permission": "ImsQcReportResultLooseExamine",
      "menuTriggerLabel": "",
      "rowAction": false,
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
    }
  ]
});
