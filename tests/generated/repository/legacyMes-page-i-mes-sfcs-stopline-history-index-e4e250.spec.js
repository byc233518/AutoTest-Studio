// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-stopline-history-index-e4e250",
  "name": "旧版制造执行 - 是否锁定（未配置菜单）功能校验",
  "displayName": "是否锁定（未配置菜单）",
  "route": "/iMES/SfcsStoplineHistory/Index",
  "sourceRoute": "/iMES/SfcsStoplineHistory/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 是否锁定（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsStoplineHistory/Index.vue",
  "dataSchema": {
    "columns": [
      "BATCH_NO",
      "PART_NO",
      "STATUS",
      "ISSUE_MESSAGE",
      "SOLUTION",
      "ROOT_CAUSE",
      "RESPONSIBILITY",
      "OPERATION_SITE_NAME"
    ],
    "required": [
      "STATUS",
      "SOLUTION",
      "ROOT_CAUSE",
      "RESPONSIBILITY"
    ],
    "fields": [
      {
        "key": "BATCH_NO",
        "label": "单据号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "维护状态",
        "required": true
      },
      {
        "key": "ISSUE_MESSAGE",
        "label": "锁定原因",
        "required": false
      },
      {
        "key": "SOLUTION",
        "label": "解决方案",
        "required": true
      },
      {
        "key": "ROOT_CAUSE",
        "label": "原因分析",
        "required": true
      },
      {
        "key": "RESPONSIBILITY",
        "label": "责任归属",
        "required": true
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "站点",
        "required": false
      }
    ],
    "example": {
      "BATCH_NO": "单据号测试值",
      "PART_NO": "AT-001",
      "STATUS": "Y",
      "ISSUE_MESSAGE": "锁定原因测试值",
      "SOLUTION": "解决方案测试值",
      "ROOT_CAUSE": "原因分析测试值",
      "RESPONSIBILITY": "责任归属测试值",
      "OPERATION_SITE_NAME": "站点测试值"
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
        "BATCH_NO": "单据号测试值",
        "PART_NO": "AT-001",
        "STATUS": "Y",
        "ISSUE_MESSAGE": "锁定原因测试值",
        "SOLUTION": "解决方案测试值",
        "ROOT_CAUSE": "原因分析测试值",
        "RESPONSIBILITY": "责任归属测试值",
        "OPERATION_SITE_NAME": "站点测试值"
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
