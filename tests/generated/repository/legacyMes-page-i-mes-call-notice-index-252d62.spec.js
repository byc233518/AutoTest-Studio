// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-call-notice-index-252d62",
  "name": "旧版制造执行 - 消息通知记录功能校验",
  "displayName": "消息通知记录",
  "route": "/iMES/CallNotice/Index",
  "sourceRoute": "/iMES/CallNotice/Index",
  "menuCode": "iMES_CallNotice",
  "breadcrumb": "品质管理 / 消息中心 / 消息通知记录",
  "sourceFile": "src/views/iMES/CallNotice/Index.vue",
  "dataSchema": {
    "columns": [
      "CALL_TYPE_CODE",
      "STATUS",
      "calldate",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "CALL_TYPE_CODE",
        "label": "消息类型",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "calldate",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "Key",
        "label": "消息编号",
        "required": false
      }
    ],
    "example": {
      "CALL_TYPE_CODE": "消息类型测试值",
      "STATUS": "Y",
      "calldate": "2026-08-01",
      "Key": "AT-001"
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
        "search_but"
      ],
      "testData": {
        "CALL_TYPE_CODE": "消息类型测试值",
        "STATUS": "Y",
        "calldate": "2026-08-01",
        "Key": "AT-001"
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
