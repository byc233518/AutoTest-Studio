// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-qms-inspection-report-index-fba329",
  "name": "质量管理 - 检验单号（未配置菜单）功能校验",
  "displayName": "检验单号（未配置菜单）",
  "route": "/QMS/InspectionReport/index",
  "sourceRoute": "/QMS/InspectionReport/index",
  "menuCode": "",
  "breadcrumb": "质量管理 / 未配置菜单 / 检验单号（未配置菜单）",
  "sourceFile": "src/views/QMS/InspectionReport/index.vue",
  "dataSchema": {
    "columns": [
      "result",
      "remarks"
    ],
    "required": [],
    "fields": [
      {
        "key": "result",
        "label": "检验结果",
        "required": false
      },
      {
        "key": "remarks",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "result": "检验结果测试值",
      "remarks": "自动化测试备注001"
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
      "key": "13fd57e65b-d22ba317af-df14e",
      "type": "新增表单",
      "name": "创建检验报告业务入口校验",
      "label": "创建检验报告",
      "handler": "handleCreateReport",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击创建检验报告",
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
          "key": "result",
          "label": "检验结果",
          "required": false,
          "example": "检验结果测试值"
        },
        {
          "key": "remarks",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "result": "检验结果测试值",
        "remarks": "自动化测试备注001"
      }
    },
    {
      "key": "7e002f9936-09cbc97ae2-8e4c1",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "handleSubmitReport",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交",
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
