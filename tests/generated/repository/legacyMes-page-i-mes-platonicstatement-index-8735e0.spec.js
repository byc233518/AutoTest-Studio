// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-platonicstatement-index-8735e0",
  "name": "旧版制造执行 - 不良分析报表功能校验",
  "displayName": "不良分析报表",
  "route": "/iMES/Platonicstatement/Index",
  "sourceRoute": "/iMES/Platonicstatement/Index",
  "menuCode": "iMES_Platonicstatement",
  "breadcrumb": "报表中心 / 品质管理 / 不良分析报表",
  "sourceFile": "src/views/iMES/Platonicstatement/Index.vue",
  "dataSchema": {
    "columns": [
      "ATTRIBUTE1",
      "WO_NO",
      "PART_NO"
    ],
    "required": [],
    "fields": [
      {
        "key": "ATTRIBUTE1",
        "label": "订单",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      }
    ],
    "example": {
      "ATTRIBUTE1": "订单测试值",
      "WO_NO": "工单测试值",
      "PART_NO": "AT-001"
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
        "ATTRIBUTE1": "订单测试值",
        "WO_NO": "工单测试值",
        "PART_NO": "AT-001"
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
    },
    {
      "key": "ef879b4ced-188896795f-e9df5",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "exportData",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
