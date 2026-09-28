// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-driving-record-index-0fe217",
  "name": "旧版制造执行 - 选择线别（未配置菜单）功能校验",
  "displayName": "选择线别（未配置菜单）",
  "route": "/iMES/SmtDrivingRecord/Index",
  "sourceRoute": "/iMES/SmtDrivingRecord/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 选择线别（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtDrivingRecord/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "WO_NO",
      "TABLE_NO",
      "TEST_TIME",
      "POINT",
      "SEAL",
      "VALUE",
      "STANDER_VALUE"
    ],
    "required": [
      "LINE_ID",
      "WO_NO",
      "TABLE_NO",
      "TEST_TIME",
      "POINT",
      "SEAL",
      "VALUE",
      "STANDER_VALUE"
    ],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": true
      },
      {
        "key": "TABLE_NO",
        "label": "表单号",
        "required": true
      },
      {
        "key": "TEST_TIME",
        "label": "测试时间",
        "required": true
      },
      {
        "key": "POINT",
        "label": "元件位置",
        "required": true
      },
      {
        "key": "SEAL",
        "label": "元件封装",
        "required": true
      },
      {
        "key": "VALUE",
        "label": "测试值",
        "required": true
      },
      {
        "key": "STANDER_VALUE",
        "label": "标准值",
        "required": true
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "WO_NO": "工单测试值",
      "TABLE_NO": "AT-001",
      "TEST_TIME": "2026-08-01",
      "POINT": "元件位置测试值",
      "SEAL": "元件封装测试值",
      "VALUE": "测试值测试值",
      "STANDER_VALUE": "标准值测试值"
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
        "WO_NO": "工单测试值",
        "TABLE_NO": "AT-001",
        "TEST_TIME": "2026-08-01",
        "POINT": "元件位置测试值",
        "SEAL": "元件封装测试值",
        "VALUE": "测试值测试值",
        "STANDER_VALUE": "标准值测试值"
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
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "TABLE_NO",
          "label": "表单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TEST_TIME",
          "label": "测试时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "POINT",
          "label": "元件位置",
          "required": true,
          "example": "元件位置测试值"
        },
        {
          "key": "SEAL",
          "label": "元件封装",
          "required": true,
          "example": "元件封装测试值"
        },
        {
          "key": "VALUE",
          "label": "测试值",
          "required": true,
          "example": "测试值测试值"
        },
        {
          "key": "STANDER_VALUE",
          "label": "标准值",
          "required": true,
          "example": "标准值测试值"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "WO_NO": "工单测试值",
        "TABLE_NO": "AT-001",
        "TEST_TIME": "2026-08-01",
        "POINT": "元件位置测试值",
        "SEAL": "元件封装测试值",
        "VALUE": "测试值测试值",
        "STANDER_VALUE": "标准值测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-cefbe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(scope.row)",
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
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "TABLE_NO",
          "label": "表单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TEST_TIME",
          "label": "测试时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "POINT",
          "label": "元件位置",
          "required": true,
          "example": "元件位置测试值"
        },
        {
          "key": "SEAL",
          "label": "元件封装",
          "required": true,
          "example": "元件封装测试值"
        },
        {
          "key": "VALUE",
          "label": "测试值",
          "required": true,
          "example": "测试值测试值"
        },
        {
          "key": "STANDER_VALUE",
          "label": "标准值",
          "required": true,
          "example": "标准值测试值"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "WO_NO": "工单测试值",
        "TABLE_NO": "AT-001",
        "TEST_TIME": "2026-08-01",
        "POINT": "元件位置测试值",
        "SEAL": "元件封装测试值",
        "VALUE": "测试值测试值",
        "STANDER_VALUE": "标准值测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-78e8f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row)",
      "permission": "SmtDrivingRecordMstDel",
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
