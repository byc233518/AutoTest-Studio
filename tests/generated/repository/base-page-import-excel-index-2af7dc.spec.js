// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-import-excel-index-2af7dc",
  "name": "基座系统 - 数据导入功能校验",
  "displayName": "数据导入",
  "route": "/ImportExcel/Index",
  "sourceRoute": "/ImportExcel/Index",
  "menuCode": "ImportExcelData",
  "breadcrumb": "系统管理 / 系统配置 / 数据导入",
  "sourceFile": "src/views/ImportExcel/Index.vue",
  "dataSchema": {
    "columns": [
      "REFERENCE_SQL",
      "LISTVALIDATION_SQL",
      "table_name",
      "FieldValue"
    ],
    "required": [
      "REFERENCE_SQL",
      "table_name"
    ],
    "fields": [
      {
        "key": "REFERENCE_SQL",
        "label": "导入字段映射 SQL",
        "required": true
      },
      {
        "key": "LISTVALIDATION_SQL",
        "label": "模板下拉选项 SQL",
        "required": false
      },
      {
        "key": "table_name",
        "label": "基本信息名称",
        "required": true
      },
      {
        "key": "FieldValue",
        "label": "选择日期",
        "required": false
      }
    ],
    "example": {
      "REFERENCE_SQL": "导入字段映射 SQL测试值",
      "LISTVALIDATION_SQL": "模板下拉选项 SQL测试值",
      "table_name": "自动化样例001",
      "FieldValue": "2026-08-01"
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
          "key": "REFERENCE_SQL",
          "label": "导入字段映射 SQL",
          "required": true,
          "example": "导入字段映射 SQL测试值"
        },
        {
          "key": "LISTVALIDATION_SQL",
          "label": "模板下拉选项 SQL",
          "required": false,
          "example": "模板下拉选项 SQL测试值"
        },
        {
          "key": "table_name",
          "label": "基本信息名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "FieldValue",
          "label": "选择日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "REFERENCE_SQL": "导入字段映射 SQL测试值",
        "LISTVALIDATION_SQL": "模板下拉选项 SQL测试值",
        "table_name": "自动化样例001",
        "FieldValue": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-b31745bdff-a6c71",
      "type": "删除确认",
      "name": "删除模板确认框与取消操作",
      "label": "删除模板",
      "handler": "removeClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除模板",
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
      "key": "726b6ec55f-3755f56f2f-a95f4",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(row, row.$index)",
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
    },
    {
      "key": "5f1787916c-4d42a46878-c35ff",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "beforeUpload",
      "permission": "ImportExcelSave",
      "menuTriggerLabel": "v-no-more-click type=\"primary\"",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
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
      "key": "ef879b4ced-8bf52524d7-56093",
      "type": "导出入口",
      "name": "导出模板业务入口校验",
      "label": "导出模板",
      "handler": "handleExportTpl",
      "permission": "ExportTPL",
      "menuTriggerLabel": "v-no-more-click type=\"primary\"",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5572f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(row, row.$index)",
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
          "key": "REFERENCE_SQL",
          "label": "导入字段映射 SQL",
          "required": true,
          "example": "导入字段映射 SQL测试值"
        },
        {
          "key": "LISTVALIDATION_SQL",
          "label": "模板下拉选项 SQL",
          "required": false,
          "example": "模板下拉选项 SQL测试值"
        },
        {
          "key": "table_name",
          "label": "基本信息名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "FieldValue",
          "label": "选择日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "REFERENCE_SQL": "导入字段映射 SQL测试值",
        "LISTVALIDATION_SQL": "模板下拉选项 SQL测试值",
        "table_name": "自动化样例001",
        "FieldValue": "2026-08-01"
      }
    }
  ]
});
