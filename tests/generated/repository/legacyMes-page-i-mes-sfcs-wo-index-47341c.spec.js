// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-wo-index-47341c",
  "name": "旧版制造执行 - 销售订单号（未配置菜单）功能校验",
  "displayName": "销售订单号（未配置菜单）",
  "route": "/iMES/SfcsWo/Index",
  "sourceRoute": "/iMES/SfcsWo/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 销售订单号（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsWo/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "MODEL",
      "ROUTE_NAME",
      "TURNIN_TYPE",
      "CUSTOMER_ORDER",
      "START_DATE",
      "TARGET_QTY",
      "PART_NO",
      "OEM_PN",
      "PLANT_CODE",
      "CLASSIFICATION",
      "WO_TYPE",
      "DUE_DATE",
      "ATTRIBUTE8",
      "ATTRIBUTE9",
      "ATTRIBUTE10",
      "ATTRIBUTE11",
      "ATTRIBUTE1",
      "BU_CODE",
      "without"
    ],
    "required": [
      "WO_NO",
      "START_DATE",
      "CLASSIFICATION",
      "DUE_DATE",
      "BU_CODE"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "ROUTE_NAME",
        "label": "制程",
        "required": false
      },
      {
        "key": "TURNIN_TYPE",
        "label": "是否自动存仓",
        "required": false
      },
      {
        "key": "CUSTOMER_ORDER",
        "label": "客户订单号",
        "required": false
      },
      {
        "key": "START_DATE",
        "label": "计划投产日期",
        "required": true
      },
      {
        "key": "TARGET_QTY",
        "label": "数量",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "OEM_PN",
        "label": "客户料号",
        "required": false
      },
      {
        "key": "PLANT_CODE",
        "label": "厂部",
        "required": false
      },
      {
        "key": "CLASSIFICATION",
        "label": "工单类别",
        "required": true
      },
      {
        "key": "WO_TYPE",
        "label": "工单类型",
        "required": false
      },
      {
        "key": "DUE_DATE",
        "label": "计划完成日期",
        "required": true
      },
      {
        "key": "ATTRIBUTE8",
        "label": "生产单位",
        "required": false
      },
      {
        "key": "ATTRIBUTE9",
        "label": "库存单位",
        "required": false
      },
      {
        "key": "ATTRIBUTE10",
        "label": "库存目标量",
        "required": false
      },
      {
        "key": "ATTRIBUTE11",
        "label": "换算比例",
        "required": false
      },
      {
        "key": "ATTRIBUTE1",
        "label": "销售订单号",
        "required": false
      },
      {
        "key": "BU_CODE",
        "label": "制造群",
        "required": true
      },
      {
        "key": "without",
        "label": "计划投产日期",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "MODEL": "规格测试值",
      "ROUTE_NAME": "制程测试值",
      "TURNIN_TYPE": "是否自动存仓测试值",
      "CUSTOMER_ORDER": "AT-001",
      "START_DATE": "2026-08-01",
      "TARGET_QTY": "1",
      "PART_NO": "AT-001",
      "OEM_PN": "AT-001",
      "PLANT_CODE": "厂部测试值",
      "CLASSIFICATION": "工单类别测试值",
      "WO_TYPE": "工单类型测试值",
      "DUE_DATE": "2026-08-01",
      "ATTRIBUTE8": "生产单位测试值",
      "ATTRIBUTE9": "库存单位测试值",
      "ATTRIBUTE10": "库存目标量测试值",
      "ATTRIBUTE11": "换算比例测试值",
      "ATTRIBUTE1": "AT-001",
      "BU_CODE": "制造群测试值",
      "without": "2026-08-01"
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
        "WO_NO": "AT-001",
        "MODEL": "规格测试值",
        "ROUTE_NAME": "制程测试值",
        "TURNIN_TYPE": "是否自动存仓测试值",
        "CUSTOMER_ORDER": "AT-001",
        "START_DATE": "2026-08-01",
        "TARGET_QTY": "1",
        "PART_NO": "AT-001",
        "OEM_PN": "AT-001",
        "PLANT_CODE": "厂部测试值",
        "CLASSIFICATION": "工单类别测试值",
        "WO_TYPE": "工单类型测试值",
        "DUE_DATE": "2026-08-01",
        "ATTRIBUTE8": "生产单位测试值",
        "ATTRIBUTE9": "库存单位测试值",
        "ATTRIBUTE10": "库存目标量测试值",
        "ATTRIBUTE11": "换算比例测试值",
        "ATTRIBUTE1": "AT-001",
        "BU_CODE": "制造群测试值",
        "without": "2026-08-01"
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
    }
  ]
});
