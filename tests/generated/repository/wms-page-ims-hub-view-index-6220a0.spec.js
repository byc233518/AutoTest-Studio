// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-hub-view-index-6220a0",
  "name": "仓储管理 - 同步视图功能校验",
  "displayName": "同步视图",
  "route": "/ImsHubView/Index",
  "sourceRoute": "/ImsHubView/Index",
  "menuCode": "HubView",
  "breadcrumb": "系统管理 / 数据同步 / 同步视图",
  "sourceFile": "src/views/ImsHubView/Index.vue",
  "dataSchema": {
    "columns": [
      "serversName",
      "ProcessFlag",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "serversName",
        "label": "服务",
        "required": false
      },
      {
        "key": "ProcessFlag",
        "label": "处理结果",
        "required": false
      },
      {
        "key": "Key",
        "label": "编号",
        "required": false
      }
    ],
    "example": {
      "serversName": "服务测试值",
      "ProcessFlag": "处理结果测试值",
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
        "查询",
        "搜索"
      ],
      "trigger": "button",
      "sourceHandlers": [
        "getLoad"
      ],
      "testData": {
        "serversName": "服务测试值",
        "ProcessFlag": "处理结果测试值",
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
