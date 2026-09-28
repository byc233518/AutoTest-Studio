// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-system-monitoring-484434",
  "name": "基座系统 - 系统监控功能校验",
  "displayName": "系统监控",
  "route": "/SystemMonitoring",
  "sourceRoute": "/SystemMonitoring",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 系统监控",
  "sourceFile": "src/views/Admin/Operations/SystemMonitoring/index.vue",
  "dataSchema": {
    "columns": [
      "name",
      "status",
      "port",
      "uptime",
      "description"
    ],
    "required": [],
    "fields": [
      {
        "key": "name",
        "label": "服务名称",
        "required": false
      },
      {
        "key": "status",
        "label": "状态",
        "required": false
      },
      {
        "key": "port",
        "label": "端口",
        "required": false
      },
      {
        "key": "uptime",
        "label": "运行时间",
        "required": false
      },
      {
        "key": "description",
        "label": "描述",
        "required": false
      }
    ],
    "example": {
      "name": "自动化样例001",
      "status": "Y",
      "port": "端口测试值",
      "uptime": "2026-08-01",
      "description": "自动化测试备注001"
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
