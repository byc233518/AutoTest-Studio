// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-scraper-config-tpm-scraper-usr-index-70f842",
  "name": "设备管理 - 刮刀领用（未配置菜单）功能校验",
  "displayName": "刮刀领用（未配置菜单）",
  "route": "/ITPM/TpmScraperConfig/TpmScraperUsr/Index",
  "sourceRoute": "/ITPM/TpmScraperConfig/TpmScraperUsr/Index",
  "menuCode": "",
  "breadcrumb": "设备管理 / 未配置菜单 / 刮刀领用（未配置菜单）",
  "sourceFile": "src/views/ITPM/TpmScraperConfig/TpmScraperUsr/Index.vue",
  "dataSchema": {
    "columns": [
      "ScraperNo",
      "Status",
      "WorkerNo",
      "Location"
    ],
    "required": [
      "ScraperNo",
      "WorkerNo"
    ],
    "fields": [
      {
        "key": "ScraperNo",
        "label": "刮刀编号",
        "required": true
      },
      {
        "key": "Status",
        "label": "当前状态",
        "required": false
      },
      {
        "key": "WorkerNo",
        "label": "借用人工号",
        "required": true
      },
      {
        "key": "Location",
        "label": "储位",
        "required": false
      }
    ],
    "example": {
      "ScraperNo": "AT-001",
      "Status": "Y",
      "WorkerNo": "借用人工号测试值",
      "Location": "储位测试值"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "ScraperNo": "AT-001",
        "Status": "Y",
        "WorkerNo": "借用人工号测试值",
        "Location": "储位测试值"
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
