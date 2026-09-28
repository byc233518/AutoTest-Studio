// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-call-content-config-index-f2aa8b",
  "name": "旧版制造执行 - 呼叫类型（未配置菜单）功能校验",
  "displayName": "呼叫类型（未配置菜单）",
  "route": "/iMES/CallContentConfig/Index",
  "sourceRoute": "/iMES/CallContentConfig/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 呼叫类型（未配置菜单）",
  "sourceFile": "src/views/iMES/CallContentConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "Call_Type_Code",
      "CALL_CODE",
      "Chinese",
      "Enabled",
      "CALL_TYPE_CODE",
      "Key"
    ],
    "required": [
      "Call_Type_Code",
      "CALL_CODE",
      "Chinese"
    ],
    "fields": [
      {
        "key": "Call_Type_Code",
        "label": "呼叫类型",
        "required": true
      },
      {
        "key": "CALL_CODE",
        "label": "呼叫内容代码",
        "required": true
      },
      {
        "key": "Chinese",
        "label": "呼叫内容",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "CALL_TYPE_CODE",
        "label": "类型",
        "required": false
      },
      {
        "key": "Key",
        "label": "呼叫内容代码或呼叫内容",
        "required": false
      }
    ],
    "example": {
      "Call_Type_Code": "呼叫类型测试值",
      "CALL_CODE": "呼叫内容代码测试值",
      "Chinese": "呼叫内容测试值",
      "Enabled": "是否激活测试值",
      "CALL_TYPE_CODE": "类型测试值",
      "Key": "呼叫内容代码或呼叫内容测试值"
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
        "Call_Type_Code": "呼叫类型测试值",
        "CALL_CODE": "呼叫内容代码测试值",
        "Chinese": "呼叫内容测试值",
        "Enabled": "是否激活测试值",
        "CALL_TYPE_CODE": "类型测试值",
        "Key": "呼叫内容代码或呼叫内容测试值"
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
      "permission": "CallContentConfigAdd",
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
          "key": "Call_Type_Code",
          "label": "呼叫类型",
          "required": true,
          "example": "呼叫类型测试值"
        },
        {
          "key": "CALL_CODE",
          "label": "呼叫内容代码",
          "required": true,
          "example": "呼叫内容代码测试值"
        },
        {
          "key": "Chinese",
          "label": "呼叫内容",
          "required": true,
          "example": "呼叫内容测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "CALL_TYPE_CODE",
          "label": "类型",
          "required": false,
          "example": "类型测试值"
        },
        {
          "key": "Key",
          "label": "呼叫内容代码或呼叫内容",
          "required": false,
          "example": "呼叫内容代码或呼叫内容测试值"
        }
      ],
      "testData": {
        "Call_Type_Code": "呼叫类型测试值",
        "CALL_CODE": "呼叫内容代码测试值",
        "Chinese": "呼叫内容测试值",
        "Enabled": "是否激活测试值",
        "CALL_TYPE_CODE": "类型测试值",
        "Key": "呼叫内容代码或呼叫内容测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "CallContentConfigedit",
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
          "key": "Call_Type_Code",
          "label": "呼叫类型",
          "required": true,
          "example": "呼叫类型测试值"
        },
        {
          "key": "CALL_CODE",
          "label": "呼叫内容代码",
          "required": true,
          "example": "呼叫内容代码测试值"
        },
        {
          "key": "Chinese",
          "label": "呼叫内容",
          "required": true,
          "example": "呼叫内容测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "CALL_TYPE_CODE",
          "label": "类型",
          "required": false,
          "example": "类型测试值"
        },
        {
          "key": "Key",
          "label": "呼叫内容代码或呼叫内容",
          "required": false,
          "example": "呼叫内容代码或呼叫内容测试值"
        }
      ],
      "testData": {
        "Call_Type_Code": "呼叫类型测试值",
        "CALL_CODE": "呼叫内容代码测试值",
        "Chinese": "呼叫内容测试值",
        "Enabled": "是否激活测试值",
        "CALL_TYPE_CODE": "类型测试值",
        "Key": "呼叫内容代码或呼叫内容测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "CallContentConfigdelete",
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
