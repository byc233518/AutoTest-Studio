// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-quality-items-index-d09b36",
  "name": "旧版制造执行 - 全部检验类别（未配置菜单）功能校验",
  "displayName": "全部检验类别（未配置菜单）",
  "route": "/iMES/MesQualityItems/Index",
  "sourceRoute": "/iMES/MesQualityItems/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 全部检验类别（未配置菜单）",
  "sourceFile": "src/views/iMES/MesQualityItems/Index.vue",
  "dataSchema": {
    "columns": [
      "CHECK_TYPE",
      "CHECK_ITEM",
      "CHECK_DESC",
      "ORDER_NO",
      "QUANTIZE_TYPE",
      "REMARK",
      "ORGANIZE_ID",
      "ENABLED",
      "ISEMPTY"
    ],
    "required": [
      "CHECK_TYPE",
      "CHECK_ITEM",
      "CHECK_DESC",
      "ORDER_NO",
      "QUANTIZE_TYPE",
      "ORGANIZE_ID"
    ],
    "fields": [
      {
        "key": "CHECK_TYPE",
        "label": "检验类别",
        "required": true
      },
      {
        "key": "CHECK_ITEM",
        "label": "检验项目",
        "required": true
      },
      {
        "key": "CHECK_DESC",
        "label": "检验描述",
        "required": true
      },
      {
        "key": "ORDER_NO",
        "label": "排序",
        "required": true
      },
      {
        "key": "QUANTIZE_TYPE",
        "label": "有无量化标准",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否有效",
        "required": false
      },
      {
        "key": "ISEMPTY",
        "label": "是否可空",
        "required": false
      }
    ],
    "example": {
      "CHECK_TYPE": "检验类别测试值",
      "CHECK_ITEM": "检验项目测试值",
      "CHECK_DESC": "自动化测试备注001",
      "ORDER_NO": "排序测试值",
      "QUANTIZE_TYPE": "有无量化标准测试值",
      "REMARK": "自动化测试备注001",
      "ORGANIZE_ID": "组织架构测试值",
      "ENABLED": "Y",
      "ISEMPTY": "是否可空测试值"
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
        "CHECK_TYPE": "检验类别测试值",
        "CHECK_ITEM": "检验项目测试值",
        "CHECK_DESC": "自动化测试备注001",
        "ORDER_NO": "排序测试值",
        "QUANTIZE_TYPE": "有无量化标准测试值",
        "REMARK": "自动化测试备注001",
        "ORGANIZE_ID": "组织架构测试值",
        "ENABLED": "Y",
        "ISEMPTY": "是否可空测试值"
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
      "permission": "MesQualityItemsSaveData",
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
          "key": "CHECK_TYPE",
          "label": "检验类别",
          "required": true,
          "example": "检验类别测试值"
        },
        {
          "key": "CHECK_ITEM",
          "label": "检验项目",
          "required": true,
          "example": "检验项目测试值"
        },
        {
          "key": "CHECK_DESC",
          "label": "检验描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ORDER_NO",
          "label": "排序",
          "required": true,
          "example": "排序测试值"
        },
        {
          "key": "QUANTIZE_TYPE",
          "label": "有无量化标准",
          "required": true,
          "example": "有无量化标准测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "ISEMPTY",
          "label": "是否可空",
          "required": false,
          "example": "是否可空测试值"
        }
      ],
      "testData": {
        "CHECK_TYPE": "检验类别测试值",
        "CHECK_ITEM": "检验项目测试值",
        "CHECK_DESC": "自动化测试备注001",
        "ORDER_NO": "排序测试值",
        "QUANTIZE_TYPE": "有无量化标准测试值",
        "REMARK": "自动化测试备注001",
        "ORGANIZE_ID": "组织架构测试值",
        "ENABLED": "Y",
        "ISEMPTY": "是否可空测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-31725",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editRow(row, row.$index)",
      "permission": "MesQualityItemsSaveData",
      "menuTriggerLabel": "",
      "rowAction": true,
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
          "key": "CHECK_TYPE",
          "label": "检验类别",
          "required": true,
          "example": "检验类别测试值"
        },
        {
          "key": "CHECK_ITEM",
          "label": "检验项目",
          "required": true,
          "example": "检验项目测试值"
        },
        {
          "key": "CHECK_DESC",
          "label": "检验描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ORDER_NO",
          "label": "排序",
          "required": true,
          "example": "排序测试值"
        },
        {
          "key": "QUANTIZE_TYPE",
          "label": "有无量化标准",
          "required": true,
          "example": "有无量化标准测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "ISEMPTY",
          "label": "是否可空",
          "required": false,
          "example": "是否可空测试值"
        }
      ],
      "testData": {
        "CHECK_TYPE": "检验类别测试值",
        "CHECK_ITEM": "检验项目测试值",
        "CHECK_DESC": "自动化测试备注001",
        "ORDER_NO": "排序测试值",
        "QUANTIZE_TYPE": "有无量化标准测试值",
        "REMARK": "自动化测试备注001",
        "ORGANIZE_ID": "组织架构测试值",
        "ENABLED": "Y",
        "ISEMPTY": "是否可空测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "MesQualityItemsDelete",
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
