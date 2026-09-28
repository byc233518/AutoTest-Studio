// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-part-temp-warehouse-index-5a1c79",
  "name": "旧版制造执行 - 只查询库存大于0（未配置菜单）功能校验",
  "displayName": "只查询库存大于0（未配置菜单）",
  "route": "/iMES/MesPartTempWarehouse/Index",
  "sourceRoute": "/iMES/MesPartTempWarehouse/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 只查询库存大于0（未配置菜单）",
  "sourceFile": "src/views/iMES/MesPartTempWarehouse/Index.vue",
  "dataSchema": {
    "columns": [
      "REEL_ID",
      "PART_TYPE",
      "PART_NO",
      "PART_NAME",
      "DATE_CODE",
      "EXP_DATE",
      "QTY",
      "UNIT",
      "REMARK",
      "ENABLED",
      "PART_DESC",
      "USABLE_QTY",
      "LINE_ID"
    ],
    "required": [
      "REEL_ID",
      "PART_TYPE",
      "EXP_DATE",
      "QTY",
      "UNIT"
    ],
    "fields": [
      {
        "key": "REEL_ID",
        "label": "物料条码",
        "required": true
      },
      {
        "key": "PART_TYPE",
        "label": "物料类型",
        "required": true
      },
      {
        "key": "PART_NO",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "DATE_CODE",
        "label": "生产日期",
        "required": false
      },
      {
        "key": "EXP_DATE",
        "label": "保质期(天)",
        "required": true
      },
      {
        "key": "QTY",
        "label": "出库数量",
        "required": true
      },
      {
        "key": "UNIT",
        "label": "物料单位",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "启动状态",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "根据物料条码带出",
        "required": false
      },
      {
        "key": "USABLE_QTY",
        "label": "根据物料条码带出",
        "required": false
      },
      {
        "key": "LINE_ID",
        "label": "物料使用线别",
        "required": false
      }
    ],
    "example": {
      "REEL_ID": "AT-001",
      "PART_TYPE": "物料类型测试值",
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "DATE_CODE": "2026-08-01",
      "EXP_DATE": "保质期(天)测试值",
      "QTY": "1",
      "UNIT": "物料单位测试值",
      "REMARK": "自动化测试备注001",
      "ENABLED": "Y",
      "PART_DESC": "根据物料条码带出测试值",
      "USABLE_QTY": "根据物料条码带出测试值",
      "LINE_ID": "物料使用线别测试值"
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
        "REEL_ID": "AT-001",
        "PART_TYPE": "物料类型测试值",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "DATE_CODE": "2026-08-01",
        "EXP_DATE": "保质期(天)测试值",
        "QTY": "1",
        "UNIT": "物料单位测试值",
        "REMARK": "自动化测试备注001",
        "ENABLED": "Y",
        "PART_DESC": "根据物料条码带出测试值",
        "USABLE_QTY": "根据物料条码带出测试值",
        "LINE_ID": "物料使用线别测试值"
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
      "key": "7e002f9936-cb7c9a7bb3-3a141",
      "type": "业务动作",
      "name": "入库业务入口校验",
      "label": "入库",
      "handler": "WarehousingClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位入库",
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
      "key": "7e002f9936-bb22ac4a42-101d7",
      "type": "业务动作",
      "name": "出库业务入口校验",
      "label": "出库",
      "handler": "OutClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位出库",
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
