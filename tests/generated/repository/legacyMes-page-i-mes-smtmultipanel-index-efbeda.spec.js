// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smtmultipanel-index-efbeda",
  "name": "旧版制造执行 - 拼板编号（未配置菜单）功能校验",
  "displayName": "拼板编号（未配置菜单）",
  "route": "/iMES/SMTMultipanel/Index",
  "sourceRoute": "/iMES/SMTMultipanel/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 拼板编号（未配置菜单）",
  "sourceFile": "src/views/iMES/SMTMultipanel/Index.vue",
  "dataSchema": {
    "columns": [
      "sn",
      "BATCH_NO",
      "WO_NO",
      "SN"
    ],
    "required": [],
    "fields": [
      {
        "key": "sn",
        "label": "流水号",
        "required": false
      },
      {
        "key": "BATCH_NO",
        "label": "拼板编号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "SN",
        "label": "流水号",
        "required": false
      }
    ],
    "example": {
      "sn": "流水号测试值",
      "BATCH_NO": "AT-001",
      "WO_NO": "AT-001",
      "SN": "流水号测试值"
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
        "sn": "流水号测试值",
        "BATCH_NO": "AT-001",
        "WO_NO": "AT-001",
        "SN": "流水号测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-f861f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false,
      "fields": [
        {
          "key": "sn",
          "label": "流水号",
          "required": false,
          "example": "流水号测试值"
        },
        {
          "key": "BATCH_NO",
          "label": "拼板编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "SN",
          "label": "流水号",
          "required": false,
          "example": "流水号测试值"
        }
      ],
      "testData": {
        "sn": "流水号测试值",
        "BATCH_NO": "AT-001",
        "WO_NO": "AT-001",
        "SN": "流水号测试值"
      }
    }
  ]
});
