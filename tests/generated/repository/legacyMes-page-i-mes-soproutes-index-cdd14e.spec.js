// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-soproutes-index-cdd14e",
  "name": "旧版制造执行 - 名称（未配置菜单）功能校验",
  "displayName": "名称（未配置菜单）",
  "route": "/iMES/SOPRoutes/Index",
  "sourceRoute": "/iMES/SOPRoutes/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 名称（未配置菜单）",
  "sourceFile": "src/views/iMES/SOPRoutes/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "ROUTE_NAME",
      "PART_NO_NEW",
      "ROUTE_NAME_NEW",
      "DESCRIPTION_NEW",
      "STATUS",
      "value2"
    ],
    "required": [],
    "fields": [
      {
        "key": "PART_NO",
        "label": "原料号",
        "required": false
      },
      {
        "key": "ROUTE_NAME",
        "label": "原名称",
        "required": false
      },
      {
        "key": "PART_NO_NEW",
        "label": "料号",
        "required": false
      },
      {
        "key": "ROUTE_NAME_NEW",
        "label": "名称",
        "required": false
      },
      {
        "key": "DESCRIPTION_NEW",
        "label": "规格",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "value2",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "ROUTE_NAME": "自动化样例001",
      "PART_NO_NEW": "AT-001",
      "ROUTE_NAME_NEW": "自动化样例001",
      "DESCRIPTION_NEW": "规格测试值",
      "STATUS": "Y",
      "value2": "2026-08-01"
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
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "STATUS": "Y",
        "value2": "2026-08-01"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "AddOrModifySave",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "STATUS": "Y",
        "value2": "2026-08-01"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-0a6da",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but",
      "permission": "AddOrModifySave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "STATUS": "Y",
        "value2": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-4d9e1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but()",
      "permission": "Delete",
      "menuTriggerLabel": "",
      "rowAction": false,
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
    },
    {
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "AuditByIdAsync",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-257bd22961-413dc",
      "type": "业务动作",
      "name": "取消审核业务入口校验",
      "label": "取消审核",
      "handler": "CancelReview_but",
      "permission": "UnAuditByIdAsync",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消审核",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-4edd1d0087-28110",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "copy_but",
      "permission": "UnAuditByIdAsync",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位复制",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
