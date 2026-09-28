// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-performance-analysis-da7434",
  "name": "基座系统 - 性能分析功能校验",
  "displayName": "性能分析",
  "route": "/PerformanceAnalysis",
  "sourceRoute": "/PerformanceAnalysis",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 性能分析",
  "sourceFile": "src/views/Admin/Operations/PerformanceAnalysis/index.vue",
  "dataSchema": {
    "columns": [
      "sql",
      "executionTime",
      "frequency",
      "database",
      "lastExecuted"
    ],
    "required": [],
    "fields": [
      {
        "key": "sql",
        "label": "SQL语句",
        "required": false
      },
      {
        "key": "executionTime",
        "label": "执行时间",
        "required": false
      },
      {
        "key": "frequency",
        "label": "执行频率",
        "required": false
      },
      {
        "key": "database",
        "label": "数据库",
        "required": false
      },
      {
        "key": "lastExecuted",
        "label": "最后执行时间",
        "required": false
      }
    ],
    "example": {
      "sql": "SQL语句测试值",
      "executionTime": "2026-08-01",
      "frequency": "执行频率测试值",
      "database": "数据库测试值",
      "lastExecuted": "2026-08-01"
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
