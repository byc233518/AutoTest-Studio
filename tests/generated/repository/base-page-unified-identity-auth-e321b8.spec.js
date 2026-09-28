// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-unified-identity-auth-e321b8",
  "name": "基座系统 - 统一身份认证功能校验",
  "displayName": "统一身份认证",
  "route": "/UnifiedIdentityAuth",
  "sourceRoute": "/UnifiedIdentityAuth",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 统一身份认证",
  "sourceFile": "src/views/Admin/System/UnifiedIdentityAuth/index.vue",
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
    },
    {
      "key": "7e002f9936-59d89e86db-59d89",
      "type": "业务动作",
      "name": "开始配置业务入口校验",
      "label": "开始配置",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击开始配置",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    }
  ]
});
