// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-tms-warehouse-manager-reserve-mission-index-a4c9ea",
  "name": "仓储管理 - 未配置菜单页面（ReserveMission）功能校验",
  "displayName": "未配置菜单页面（ReserveMission）",
  "route": "/TMS/WarehouseManager/ReserveMission/index",
  "sourceRoute": "/TMS/WarehouseManager/ReserveMission/index",
  "menuCode": "",
  "breadcrumb": "仓储管理 / 未配置菜单 / 未配置菜单页面（ReserveMission）",
  "sourceFile": "src/views/TMS/WarehouseManager/ReserveMission/index.vue",
  "dataSchema": {
    "columns": [
      "查询关键字"
    ],
    "required": [],
    "fields": [
      {
        "key": "查询关键字",
        "label": "查询关键字",
        "required": false
      }
    ],
    "example": {
      "查询关键字": "查询关键字测试值"
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
    }
  ]
});
