// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-download-index-51a4dc",
  "name": "基座系统 - apk类（未配置菜单）功能校验",
  "displayName": "apk类（未配置菜单）",
  "route": "/Download/Index",
  "sourceRoute": "/Download/Index",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / apk类（未配置菜单）",
  "sourceFile": "src/views/Download/Index.vue",
  "dataSchema": {
    "columns": [
      "name",
      "version",
      "size"
    ],
    "required": [],
    "fields": [
      {
        "key": "name",
        "label": "软件名称",
        "required": false
      },
      {
        "key": "version",
        "label": "版本",
        "required": false
      },
      {
        "key": "size",
        "label": "大小",
        "required": false
      }
    ],
    "example": {
      "name": "自动化样例001",
      "version": "版本测试值",
      "size": "大小测试值"
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
      "key": "ef879b4ced-2b9d013177-a924e",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "handleDown(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
