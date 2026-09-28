// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-lookup-index-d54aae",
  "name": "仓储管理 - 仓库字典管理功能校验",
  "displayName": "仓库字典管理",
  "route": "/ImsLookup/Index",
  "sourceRoute": "/ImsLookup/Index",
  "menuCode": "ImsLookup",
  "breadcrumb": "系统管理 / 配置字典 / 仓库字典管理",
  "sourceFile": "src/views/ImsLookup/Index.vue",
  "dataSchema": {
    "columns": [
      "Key",
      "Value",
      "Type",
      "Description"
    ],
    "required": [
      "Key",
      "Value",
      "Type"
    ],
    "fields": [
      {
        "key": "Key",
        "label": "键",
        "required": true
      },
      {
        "key": "Value",
        "label": "值",
        "required": true
      },
      {
        "key": "Type",
        "label": "类型",
        "required": true
      },
      {
        "key": "Description",
        "label": "描述",
        "required": false
      }
    ],
    "example": {
      "Key": "键测试值",
      "Value": "值测试值",
      "Type": "类型测试值",
      "Description": "自动化测试备注001"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "Key": "键测试值",
        "Value": "值测试值",
        "Type": "类型测试值",
        "Description": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-fcaed",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add(0)",
      "permission": "ImsLookupAdd",
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
          "key": "Key",
          "label": "键",
          "required": true,
          "example": "键测试值"
        },
        {
          "key": "Value",
          "label": "值",
          "required": true,
          "example": "值测试值"
        },
        {
          "key": "Type",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Key": "键测试值",
        "Value": "值测试值",
        "Type": "类型测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsLookupEdit",
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
          "key": "Key",
          "label": "键",
          "required": true,
          "example": "键测试值"
        },
        {
          "key": "Value",
          "label": "值",
          "required": true,
          "example": "值测试值"
        },
        {
          "key": "Type",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Key": "键测试值",
        "Value": "值测试值",
        "Type": "类型测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsLookupRemove",
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
