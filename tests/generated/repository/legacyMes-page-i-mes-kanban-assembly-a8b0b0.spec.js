// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-kanban-assembly-a8b0b0",
  "name": "旧版制造执行 - 装配看板功能校验",
  "displayName": "装配看板",
  "route": "/iMES/Kanban/Assembly",
  "sourceRoute": "/iMES/Kanban/Assembly",
  "menuCode": "iMES_Assembly",
  "breadcrumb": "看板中心 / DIP看板管理 / 装配看板",
  "sourceFile": "src/views/iMES/Kanban/Assembly.vue",
  "dataSchema": {
    "columns": [
      "lineId",
      "WO_NO"
    ],
    "required": [],
    "fields": [
      {
        "key": "lineId",
        "label": "线体",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      }
    ],
    "example": {
      "lineId": "线体测试值",
      "WO_NO": "工单测试值"
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
