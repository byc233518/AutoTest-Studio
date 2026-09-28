// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-api-management-adaf69",
  "name": "基座系统 - API管理功能校验",
  "displayName": "API管理",
  "route": "/ApiManagement",
  "sourceRoute": "/ApiManagement",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / API管理",
  "sourceFile": "src/views/Admin/Development/ApiManagement/index.vue",
  "dataSchema": {
    "columns": [
      "path",
      "method",
      "description",
      "calls",
      "status"
    ],
    "required": [],
    "fields": [
      {
        "key": "path",
        "label": "API路径",
        "required": false
      },
      {
        "key": "method",
        "label": "方法",
        "required": false
      },
      {
        "key": "description",
        "label": "描述",
        "required": false
      },
      {
        "key": "calls",
        "label": "调用次数",
        "required": false
      },
      {
        "key": "status",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "path": "API路径测试值",
      "method": "方法测试值",
      "description": "自动化测试备注001",
      "calls": "调用次数测试值",
      "status": "Y"
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
