// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sopbrowse-index-dbc7f5",
  "name": "旧版制造执行 - 预览“作业指导书”（未配置菜单）功能校验",
  "displayName": "预览“作业指导书”（未配置菜单）",
  "route": "/iMES/SOPbrowse/Index",
  "sourceRoute": "/iMES/SOPbrowse/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 预览“作业指导书”（未配置菜单）",
  "sourceFile": "src/views/iMES/SOPbrowse/Index.vue",
  "dataSchema": {
    "columns": [
      "CALL_TYPE_CODE",
      "CALL_CODE",
      "CALL_CONTENT"
    ],
    "required": [],
    "fields": [
      {
        "key": "CALL_TYPE_CODE",
        "label": "消息类型",
        "required": false
      },
      {
        "key": "CALL_CODE",
        "label": "消息代码",
        "required": false
      },
      {
        "key": "CALL_CONTENT",
        "label": "消息内容",
        "required": false
      }
    ],
    "example": {
      "CALL_TYPE_CODE": "消息类型测试值",
      "CALL_CODE": "消息代码测试值",
      "CALL_CONTENT": "消息内容测试值"
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
