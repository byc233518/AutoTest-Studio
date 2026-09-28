// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-equipment-operation-index-34e471",
  "name": "旧版制造执行 - 采集类型（未配置菜单）功能校验",
  "displayName": "采集类型（未配置菜单）",
  "route": "/iMES/EquipmentOperation/Index",
  "sourceRoute": "/iMES/EquipmentOperation/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 采集类型（未配置菜单）",
  "sourceFile": "src/views/iMES/EquipmentOperation/Index.vue",
  "dataSchema": {
    "columns": [
      "COLLECT_TYPE",
      "EQUIPMENT_CATEGORY",
      "EQUIPMENT_CODE",
      "PART_NO",
      "WO_NO",
      "START_TIME",
      "END_TIME"
    ],
    "required": [],
    "fields": [
      {
        "key": "COLLECT_TYPE",
        "label": "采集类型",
        "required": false
      },
      {
        "key": "EQUIPMENT_CATEGORY",
        "label": "设备类型",
        "required": false
      },
      {
        "key": "EQUIPMENT_CODE",
        "label": "设备编码",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "START_TIME",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "END_TIME",
        "label": "结束时间",
        "required": false
      }
    ],
    "example": {
      "COLLECT_TYPE": "采集类型测试值",
      "EQUIPMENT_CATEGORY": "设备类型测试值",
      "EQUIPMENT_CODE": "AT-001",
      "PART_NO": "AT-001",
      "WO_NO": "工单测试值",
      "START_TIME": "2026-08-01",
      "END_TIME": "2026-08-01"
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
        "COLLECT_TYPE": "采集类型测试值",
        "EQUIPMENT_CATEGORY": "设备类型测试值",
        "EQUIPMENT_CODE": "AT-001",
        "PART_NO": "AT-001",
        "WO_NO": "工单测试值",
        "START_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
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
