// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-ai-permission-00ace7",
  "name": "基座系统 - AI权限功能校验",
  "displayName": "AI权限",
  "route": "/AiPermission",
  "sourceRoute": "/AiPermission",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / AI权限",
  "sourceFile": "src/views/Admin/System/AiPermission/index.vue",
  "dataSchema": {
    "columns": [
      "name"
    ],
    "required": [],
    "fields": [
      {
        "key": "name",
        "label": "角色名称",
        "required": false
      }
    ],
    "example": {
      "name": "自动化样例001"
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
      "key": "7e002f9936-2414b05835-a11a3",
      "type": "业务动作",
      "name": "全部保存业务入口校验",
      "label": "全部保存",
      "handler": "saveAll",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位全部保存",
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
