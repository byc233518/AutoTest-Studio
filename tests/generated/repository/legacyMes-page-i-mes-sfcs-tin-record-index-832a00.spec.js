// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-tin-record-index-832a00",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/SfcsTinRecord/Index",
  "sourceRoute": "/iMES/SfcsTinRecord/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsTinRecord/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "OUTPUT_DAY",
      "OUTPUT_NUM",
      "ADD_TIN",
      "RESULT",
      "DESCRIPTION",
      "BEGIN_TIME",
      "END_TIME"
    ],
    "required": [],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": false
      },
      {
        "key": "OUTPUT_DAY",
        "label": "产能日期",
        "required": false
      },
      {
        "key": "OUTPUT_NUM",
        "label": "产能数量",
        "required": false
      },
      {
        "key": "ADD_TIN",
        "label": "加锡量(KG)",
        "required": false
      },
      {
        "key": "RESULT",
        "label": "分析结果",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "结果描述",
        "required": false
      },
      {
        "key": "BEGIN_TIME",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "END_TIME",
        "label": "结束日期",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "OUTPUT_DAY": "2026-08-01",
      "OUTPUT_NUM": "1",
      "ADD_TIN": "加锡量(KG)测试值",
      "RESULT": "分析结果测试值",
      "DESCRIPTION": "自动化测试备注001",
      "BEGIN_TIME": "2026-08-01",
      "END_TIME": "2026-08-01"
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
        "LINE_ID": "线体测试值",
        "OUTPUT_DAY": "2026-08-01",
        "OUTPUT_NUM": "1",
        "ADD_TIN": "加锡量(KG)测试值",
        "RESULT": "分析结果测试值",
        "DESCRIPTION": "自动化测试备注001",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": false,
          "example": "线体测试值"
        },
        {
          "key": "OUTPUT_DAY",
          "label": "产能日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "OUTPUT_NUM",
          "label": "产能数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "ADD_TIN",
          "label": "加锡量(KG)",
          "required": false,
          "example": "加锡量(KG)测试值"
        },
        {
          "key": "RESULT",
          "label": "分析结果",
          "required": false,
          "example": "分析结果测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "结果描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "BEGIN_TIME",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "结束日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "OUTPUT_DAY": "2026-08-01",
        "OUTPUT_NUM": "1",
        "ADD_TIN": "加锡量(KG)测试值",
        "RESULT": "分析结果测试值",
        "DESCRIPTION": "自动化测试备注001",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
      }
    },
    {
      "key": "13fd57e65b-6c317ffe70-26fc3",
      "type": "新增表单",
      "name": "添加分析结果业务入口校验",
      "label": "添加分析结果",
      "handler": "AddAnalysisClick(row, row.$index)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加分析结果",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": false,
          "example": "线体测试值"
        },
        {
          "key": "OUTPUT_DAY",
          "label": "产能日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "OUTPUT_NUM",
          "label": "产能数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "ADD_TIN",
          "label": "加锡量(KG)",
          "required": false,
          "example": "加锡量(KG)测试值"
        },
        {
          "key": "RESULT",
          "label": "分析结果",
          "required": false,
          "example": "分析结果测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "结果描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "BEGIN_TIME",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "结束日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "OUTPUT_DAY": "2026-08-01",
        "OUTPUT_NUM": "1",
        "ADD_TIN": "加锡量(KG)测试值",
        "RESULT": "分析结果测试值",
        "DESCRIPTION": "自动化测试备注001",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": false,
          "example": "线体测试值"
        },
        {
          "key": "OUTPUT_DAY",
          "label": "产能日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "OUTPUT_NUM",
          "label": "产能数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "ADD_TIN",
          "label": "加锡量(KG)",
          "required": false,
          "example": "加锡量(KG)测试值"
        },
        {
          "key": "RESULT",
          "label": "分析结果",
          "required": false,
          "example": "分析结果测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "结果描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "BEGIN_TIME",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "结束日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "OUTPUT_DAY": "2026-08-01",
        "OUTPUT_NUM": "1",
        "ADD_TIN": "加锡量(KG)测试值",
        "RESULT": "分析结果测试值",
        "DESCRIPTION": "自动化测试备注001",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
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
