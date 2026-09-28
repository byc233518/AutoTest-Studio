// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-locator-utilization-index-242423",
  "name": "仓储管理 - 储位利用率功能校验",
  "displayName": "储位利用率",
  "route": "/ImsLocatorUtilization/Index",
  "sourceRoute": "/ImsLocatorUtilization/Index",
  "menuCode": "ImsLocatorUtilization",
  "breadcrumb": "仓库管理 / 库存管理 / 储位利用率",
  "sourceFile": "src/views/ImsLocatorUtilization/Index.vue",
  "dataSchema": {
    "columns": [
      "LocatorStatus",
      "localData",
      "Data"
    ],
    "required": [],
    "fields": [
      {
        "key": "LocatorStatus",
        "label": "库存状态",
        "required": false
      },
      {
        "key": "localData",
        "label": "区域",
        "required": false
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "LocatorStatus": "Y",
      "localData": "区域测试值",
      "Data": "输入关键字搜索测试值"
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
        "search()",
        "search"
      ],
      "testData": {
        "LocatorStatus": "Y",
        "localData": "区域测试值",
        "Data": "输入关键字搜索测试值"
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
