// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-scraper-clean-index-c003a6",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SfcsScraperClean/Index",
  "sourceRoute": "/iMES/SfcsScraperClean/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsScraperClean/Index.vue",
  "dataSchema": {
    "columns": [
      "SCRAPER_NO",
      "Status",
      "ProductCount",
      "SiteName",
      "PrintCount",
      "CLEAN_USER",
      "LastCleanTime",
      "INSPECT_RESULT"
    ],
    "required": [],
    "fields": [
      {
        "key": "SCRAPER_NO",
        "label": "刮刀号",
        "required": false
      },
      {
        "key": "Status",
        "label": "当前状态",
        "required": false
      },
      {
        "key": "ProductCount",
        "label": "过板数量",
        "required": false
      },
      {
        "key": "SiteName",
        "label": "使用的线体",
        "required": false
      },
      {
        "key": "PrintCount",
        "label": "已使用次数",
        "required": false
      },
      {
        "key": "CLEAN_USER",
        "label": "清洗人",
        "required": false
      },
      {
        "key": "LastCleanTime",
        "label": "上次清洗时间",
        "required": false
      },
      {
        "key": "INSPECT_RESULT",
        "label": "检查结果",
        "required": false
      }
    ],
    "example": {
      "SCRAPER_NO": "刮刀号测试值",
      "Status": "Y",
      "ProductCount": "1",
      "SiteName": "使用的线体测试值",
      "PrintCount": "已使用次数测试值",
      "CLEAN_USER": "清洗人测试值",
      "LastCleanTime": "2026-08-01",
      "INSPECT_RESULT": "检查结果测试值"
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
        "searchClick"
      ],
      "testData": {
        "SCRAPER_NO": "刮刀号测试值",
        "Status": "Y",
        "ProductCount": "1",
        "SiteName": "使用的线体测试值",
        "PrintCount": "已使用次数测试值",
        "CLEAN_USER": "清洗人测试值",
        "LastCleanTime": "2026-08-01",
        "INSPECT_RESULT": "检查结果测试值"
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
