// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-import-excel-index-912e4e",
  "name": "旧版制造执行 - 生产导入基本资料功能校验",
  "displayName": "生产导入基本资料",
  "route": "/iMES/ImportExcel/Index",
  "sourceRoute": "/iMES/ImportExcel/Index",
  "menuCode": "IMES_ImportExcelData",
  "breadcrumb": "系统管理 / 系统配置 / 生产导入基本资料",
  "sourceFile": "src/views/iMES/ImportExcel/Index.vue",
  "dataSchema": {
    "columns": [
      "REFERENCE_SQL",
      "LISTVALIDATION_SQL"
    ],
    "required": [
      "REFERENCE_SQL"
    ],
    "fields": [
      {
        "key": "REFERENCE_SQL",
        "label": "相关联SQL语句",
        "required": true
      },
      {
        "key": "LISTVALIDATION_SQL",
        "label": "删除",
        "required": false
      }
    ],
    "example": {
      "REFERENCE_SQL": "相关联SQL语句测试值",
      "LISTVALIDATION_SQL": "删除测试值"
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
      "permission": "ImportExcelAdd",
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
          "label": "相关联SQL语句",
          "required": true,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "LISTVALIDATION_SQL",
          "label": "删除",
          "required": false,
          "example": "删除测试值"
        }
      ],
      "testData": {
        "REFERENCE_SQL": "相关联SQL语句测试值",
        "LISTVALIDATION_SQL": "删除测试值"
      }
    },
    {
      "key": "5f1787916c-4d42a46878-c35ff",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "beforeUpload",
      "permission": "ImportExcelSave",
      "menuTriggerLabel": "",
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
          "label": "相关联SQL语句",
          "required": true,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "LISTVALIDATION_SQL",
          "label": "删除",
          "required": false,
          "example": "删除测试值"
        }
      ],
      "testData": {
        "REFERENCE_SQL": "相关联SQL语句测试值",
        "LISTVALIDATION_SQL": "删除测试值"
      }
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
    }
  ]
});
