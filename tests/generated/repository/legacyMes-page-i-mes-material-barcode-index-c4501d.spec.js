// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-material-barcode-index-c4501d",
  "name": "旧版制造执行 - 料号（未配置菜单）功能校验",
  "displayName": "料号（未配置菜单）",
  "route": "/iMES/MaterialBarcode/Index",
  "sourceRoute": "/iMES/MaterialBarcode/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 料号（未配置菜单）",
  "sourceFile": "src/views/iMES/MaterialBarcode/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_ID",
      "REEL_QTY",
      "VENDOR_ID",
      "LOT_CODE",
      "DATE_CODE",
      "PRINT_QTY",
      "PO_NO",
      "inputData"
    ],
    "required": [
      "PART_ID",
      "REEL_QTY",
      "VENDOR_ID",
      "LOT_CODE",
      "DATE_CODE",
      "PRINT_QTY"
    ],
    "fields": [
      {
        "key": "PART_ID",
        "label": "料号",
        "required": true
      },
      {
        "key": "REEL_QTY",
        "label": "数量",
        "required": true
      },
      {
        "key": "VENDOR_ID",
        "label": "供应商",
        "required": true
      },
      {
        "key": "LOT_CODE",
        "label": "生产批次",
        "required": true
      },
      {
        "key": "DATE_CODE",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "PRINT_QTY",
        "label": "条码张数",
        "required": true
      },
      {
        "key": "PO_NO",
        "label": "采购订单号",
        "required": false
      },
      {
        "key": "inputData",
        "label": "条码解析",
        "required": false
      }
    ],
    "example": {
      "PART_ID": "AT-001",
      "REEL_QTY": "1",
      "VENDOR_ID": "供应商测试值",
      "LOT_CODE": "生产批次测试值",
      "DATE_CODE": "2026-08-01",
      "PRINT_QTY": "条码张数测试值",
      "PO_NO": "AT-001",
      "inputData": "条码解析测试值"
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
        "PART_ID": "AT-001",
        "REEL_QTY": "1",
        "VENDOR_ID": "供应商测试值",
        "LOT_CODE": "生产批次测试值",
        "DATE_CODE": "2026-08-01",
        "PRINT_QTY": "条码张数测试值",
        "PO_NO": "AT-001",
        "inputData": "条码解析测试值"
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
      "key": "3d81345303-3d81345303-05187",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "resetForm",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-1bc2e7752b-a004b",
      "type": "业务动作",
      "name": "保存并打印业务入口校验",
      "label": "保存并打印",
      "handler": "saveReelPrintInfo",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存并打印",
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
