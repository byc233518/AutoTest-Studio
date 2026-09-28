// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-tongs-maintain-items-index-f7b0b2",
  "name": "旧版制造执行 - 工装治具保养项管理功能校验",
  "displayName": "工装治具保养项管理",
  "route": "/iMES/MesTongsMaintainItems/Index",
  "sourceRoute": "/iMES/MesTongsMaintainItems/Index",
  "menuCode": "iMES_MesTongsMaintainItems",
  "breadcrumb": "设备管理 / 工装治具 / 工装治具保养项管理",
  "sourceFile": "src/views/iMES/MesTongsMaintainItems/Index.vue",
  "dataSchema": {
    "columns": [
      "ITEM_TYPE",
      "TONGS_TYPE",
      "ITEM_NAME",
      "REMARK",
      "ENABLED"
    ],
    "required": [
      "TONGS_TYPE",
      "ITEM_NAME"
    ],
    "fields": [
      {
        "key": "ITEM_TYPE",
        "label": "事项类型",
        "required": false
      },
      {
        "key": "TONGS_TYPE",
        "label": "工装名称",
        "required": true
      },
      {
        "key": "ITEM_NAME",
        "label": "事项名称",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "描述",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "ITEM_TYPE": "事项类型测试值",
      "TONGS_TYPE": "自动化样例001",
      "ITEM_NAME": "自动化样例001",
      "REMARK": "自动化测试备注001",
      "ENABLED": "是否激活测试值"
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
        "ITEM_TYPE": "事项类型测试值",
        "TONGS_TYPE": "自动化样例001",
        "ITEM_NAME": "自动化样例001",
        "REMARK": "自动化测试备注001",
        "ENABLED": "是否激活测试值"
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
      "permission": "MesTongsMaintainItemsAdd",
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
          "key": "ITEM_TYPE",
          "label": "事项类型",
          "required": false,
          "example": "事项类型测试值"
        },
        {
          "key": "TONGS_TYPE",
          "label": "工装名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ITEM_NAME",
          "label": "事项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "ITEM_TYPE": "事项类型测试值",
        "TONGS_TYPE": "自动化样例001",
        "ITEM_NAME": "自动化样例001",
        "REMARK": "自动化测试备注001",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "MesTongsMaintainItemsedit",
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
          "key": "ITEM_TYPE",
          "label": "事项类型",
          "required": false,
          "example": "事项类型测试值"
        },
        {
          "key": "TONGS_TYPE",
          "label": "工装名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ITEM_NAME",
          "label": "事项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "ITEM_TYPE": "事项类型测试值",
        "TONGS_TYPE": "自动化样例001",
        "ITEM_NAME": "自动化样例001",
        "REMARK": "自动化测试备注001",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-e7c16",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "del_but(scope.row)",
      "permission": "MesTongsMaintainItemsdelete",
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
