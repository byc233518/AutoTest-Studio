// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-product-scrap-index-0c102c",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/ProductScrap/Index",
  "sourceRoute": "/iMES/ProductScrap/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/ProductScrap/Index.vue",
  "dataSchema": {
    "columns": [
      "SCRAP_USER",
      "scrapTime",
      "IS_SPECIAL",
      "SN"
    ],
    "required": [],
    "fields": [
      {
        "key": "SCRAP_USER",
        "label": "报废人员",
        "required": false
      },
      {
        "key": "scrapTime",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "IS_SPECIAL",
        "label": "是否特殊工序",
        "required": false
      },
      {
        "key": "SN",
        "label": "报废条码",
        "required": false
      }
    ],
    "example": {
      "SCRAP_USER": "报废人员测试值",
      "scrapTime": "2026-08-01",
      "IS_SPECIAL": "是否特殊工序测试值",
      "SN": "AT-001"
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
        "SCRAP_USER": "报废人员测试值",
        "scrapTime": "2026-08-01",
        "IS_SPECIAL": "是否特殊工序测试值",
        "SN": "AT-001"
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
      "key": "13fd57e65b-2cd9e6ce81-cfcc7",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "edit_but({})",
      "permission": "ProductScrapSave",
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
          "key": "SCRAP_USER",
          "label": "报废人员",
          "required": false,
          "example": "报废人员测试值"
        },
        {
          "key": "scrapTime",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "IS_SPECIAL",
          "label": "是否特殊工序",
          "required": false,
          "example": "是否特殊工序测试值"
        },
        {
          "key": "SN",
          "label": "报废条码",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "SCRAP_USER": "报废人员测试值",
        "scrapTime": "2026-08-01",
        "IS_SPECIAL": "是否特殊工序测试值",
        "SN": "AT-001"
      }
    },
    {
      "key": "5f1787916c-34edcfef47-526bd",
      "type": "导入入口",
      "name": "拍照上传业务入口校验",
      "label": "拍照上传",
      "handler": "SubmintDialog",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击拍照上传",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-819bd",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "delete_but(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除",
        "校验删除确认提示",
        "点击取消且不删除数据"
      ],
      "assertions": [
        "出现删除确认提示",
        "取消后确认框关闭"
      ],
      "mutatesData": false
    }
  ]
});
