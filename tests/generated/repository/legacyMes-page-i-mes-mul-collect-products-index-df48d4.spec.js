// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mul-collect-products-index-df48d4",
  "name": "旧版制造执行 - 工装设备（未配置菜单）功能校验",
  "displayName": "工装设备（未配置菜单）",
  "route": "/iMES/MulCollectProducts/Index",
  "sourceRoute": "/iMES/MulCollectProducts/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 工装设备（未配置菜单）",
  "sourceFile": "src/views/iMES/MulCollectProducts/Index.vue",
  "dataSchema": {
    "columns": [
      "InputData",
      "OldValue",
      "Remark",
      "CapacityReportQty",
      "DefectReportQty",
      "DEFECT_LOC",
      "OPERATION_LINE_ID",
      "StationID",
      "PrintName",
      "DATA",
      "StationName",
      "OPERATION_SITE_NAME"
    ],
    "required": [],
    "fields": [
      {
        "key": "InputData",
        "label": "输入：",
        "required": false
      },
      {
        "key": "OldValue",
        "label": "旧值：",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注：",
        "required": false
      },
      {
        "key": "CapacityReportQty",
        "label": "良品数量",
        "required": false
      },
      {
        "key": "DefectReportQty",
        "label": "不良数量",
        "required": false
      },
      {
        "key": "DEFECT_LOC",
        "label": "不良位号",
        "required": false
      },
      {
        "key": "OPERATION_LINE_ID",
        "label": "线体名称",
        "required": false
      },
      {
        "key": "StationID",
        "label": "工位",
        "required": false
      },
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "DATA",
        "label": "输入数据",
        "required": false
      },
      {
        "key": "StationName",
        "label": "工位",
        "required": false
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "名称",
        "required": false
      }
    ],
    "example": {
      "InputData": "输入：测试值",
      "OldValue": "旧值：测试值",
      "Remark": "备注：测试值",
      "CapacityReportQty": "1",
      "DefectReportQty": "1",
      "DEFECT_LOC": "不良位号测试值",
      "OPERATION_LINE_ID": "自动化样例001",
      "StationID": "工位测试值",
      "PrintName": "自动化样例001",
      "DATA": "输入数据测试值",
      "StationName": "工位测试值",
      "OPERATION_SITE_NAME": "自动化样例001"
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
        "InputData": "输入：测试值",
        "OldValue": "旧值：测试值",
        "Remark": "备注：测试值",
        "CapacityReportQty": "1",
        "DefectReportQty": "1",
        "DEFECT_LOC": "不良位号测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "StationID": "工位测试值",
        "PrintName": "自动化样例001",
        "DATA": "输入数据测试值",
        "StationName": "工位测试值",
        "OPERATION_SITE_NAME": "自动化样例001"
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
      "key": "7e002f9936-33c630ac26-47b2e",
      "type": "业务动作",
      "name": "提交报工业务入口校验",
      "label": "提交报工",
      "handler": "batchSubmit",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交报工",
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
      "key": "7e002f9936-da5e0a52a7-9d156",
      "type": "业务动作",
      "name": "撤销报工业务入口校验",
      "label": "撤销报工",
      "handler": "batchReset",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位撤销报工",
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
