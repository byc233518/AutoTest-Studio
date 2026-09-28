// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sys-pda-menus-index-e618fa",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SysPdaMenus/Index",
  "sourceRoute": "/iMES/SysPdaMenus/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SysPdaMenus/Index.vue",
  "dataSchema": {
    "columns": [
      "ENABLED",
      "MENU_NAME",
      "MODULE_NAME",
      "FORM_NAME",
      "MENU_ID",
      "DESCRIPTION",
      "PARAM_INFO",
      "ORDER_SEQ",
      "Key"
    ],
    "required": [
      "MENU_NAME",
      "MODULE_NAME",
      "MENU_ID"
    ],
    "fields": [
      {
        "key": "ENABLED",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "MENU_NAME",
        "label": "菜单名称",
        "required": true
      },
      {
        "key": "MODULE_NAME",
        "label": "模块名称",
        "required": true
      },
      {
        "key": "FORM_NAME",
        "label": "页面名称",
        "required": false
      },
      {
        "key": "MENU_ID",
        "label": "菜单ID",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "说明",
        "required": false
      },
      {
        "key": "PARAM_INFO",
        "label": "参数配置",
        "required": false
      },
      {
        "key": "ORDER_SEQ",
        "label": "顺序号",
        "required": false
      },
      {
        "key": "Key",
        "label": "角色名称",
        "required": false
      }
    ],
    "example": {
      "ENABLED": "Y",
      "MENU_NAME": "自动化样例001",
      "MODULE_NAME": "自动化样例001",
      "FORM_NAME": "自动化样例001",
      "MENU_ID": "AT-001",
      "DESCRIPTION": "自动化测试备注001",
      "PARAM_INFO": "参数配置测试值",
      "ORDER_SEQ": "1",
      "Key": "自动化样例001"
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
        "ENABLED": "Y",
        "MENU_NAME": "自动化样例001",
        "MODULE_NAME": "自动化样例001",
        "FORM_NAME": "自动化样例001",
        "MENU_ID": "AT-001",
        "DESCRIPTION": "自动化测试备注001",
        "PARAM_INFO": "参数配置测试值",
        "ORDER_SEQ": "1",
        "Key": "自动化样例001"
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
      "permission": "SysPdaMenusAdd",
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
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "MENU_NAME",
          "label": "菜单名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MODULE_NAME",
          "label": "模块名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "FORM_NAME",
          "label": "页面名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MENU_ID",
          "label": "菜单ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PARAM_INFO",
          "label": "参数配置",
          "required": false,
          "example": "参数配置测试值"
        },
        {
          "key": "ORDER_SEQ",
          "label": "顺序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "Key",
          "label": "角色名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "ENABLED": "Y",
        "MENU_NAME": "自动化样例001",
        "MODULE_NAME": "自动化样例001",
        "FORM_NAME": "自动化样例001",
        "MENU_ID": "AT-001",
        "DESCRIPTION": "自动化测试备注001",
        "PARAM_INFO": "参数配置测试值",
        "ORDER_SEQ": "1",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-45f7b",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editBut(row, row.$index)",
      "permission": "SysPdaMenusEdit",
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
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "MENU_NAME",
          "label": "菜单名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MODULE_NAME",
          "label": "模块名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "FORM_NAME",
          "label": "页面名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MENU_ID",
          "label": "菜单ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PARAM_INFO",
          "label": "参数配置",
          "required": false,
          "example": "参数配置测试值"
        },
        {
          "key": "ORDER_SEQ",
          "label": "顺序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "Key",
          "label": "角色名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "ENABLED": "Y",
        "MENU_NAME": "自动化样例001",
        "MODULE_NAME": "自动化样例001",
        "FORM_NAME": "自动化样例001",
        "MENU_ID": "AT-001",
        "DESCRIPTION": "自动化测试备注001",
        "PARAM_INFO": "参数配置测试值",
        "ORDER_SEQ": "1",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SysPdaMenusDelete",
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
      "key": "7e002f9936-b56d9ac6c5-f1b2a",
      "type": "业务动作",
      "name": "确认业务入口校验",
      "label": "确认",
      "handler": "create('form')",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位确认",
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
