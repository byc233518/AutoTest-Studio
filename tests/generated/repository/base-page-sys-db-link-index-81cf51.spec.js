// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-sys-db-link-index-81cf51",
  "name": "基座系统 - 数据库连接功能校验",
  "displayName": "数据库连接",
  "route": "/SysDbLink/Index",
  "sourceRoute": "/SysDbLink/Index",
  "menuCode": "DataBaseLink",
  "breadcrumb": "配置中心 / 应用数据 / 数据库连接",
  "sourceFile": "src/views/SysDbLink/Index.vue",
  "dataSchema": {
    "columns": [
      "LinkCode",
      "LinkName",
      "DbType",
      "ConnectString",
      "Remark",
      "Enabled"
    ],
    "required": [
      "LinkCode",
      "LinkName",
      "DbType",
      "ConnectString"
    ],
    "fields": [
      {
        "key": "LinkCode",
        "label": "连接编号",
        "required": true
      },
      {
        "key": "LinkName",
        "label": "连接名称",
        "required": true
      },
      {
        "key": "DbType",
        "label": "数据库类型",
        "required": true
      },
      {
        "key": "ConnectString",
        "label": "连接字符串",
        "required": true
      },
      {
        "key": "Remark",
        "label": "说明",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "是否可用",
        "required": false
      }
    ],
    "example": {
      "LinkCode": "AT-001",
      "LinkName": "自动化样例001",
      "DbType": "数据库类型测试值",
      "ConnectString": "连接字符串测试值",
      "Remark": "自动化测试备注001",
      "Enabled": "是否可用测试值"
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
        "LinkCode": "AT-001",
        "LinkName": "自动化样例001",
        "DbType": "数据库类型测试值",
        "ConnectString": "连接字符串测试值",
        "Remark": "自动化测试备注001",
        "Enabled": "是否可用测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-58d1b",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add",
      "permission": "SysDbLinkAdd",
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
          "key": "LinkCode",
          "label": "连接编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LinkName",
          "label": "连接名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "DbType",
          "label": "数据库类型",
          "required": true,
          "example": "数据库类型测试值"
        },
        {
          "key": "ConnectString",
          "label": "连接字符串",
          "required": true,
          "example": "连接字符串测试值"
        },
        {
          "key": "Remark",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        }
      ],
      "testData": {
        "LinkCode": "AT-001",
        "LinkName": "自动化样例001",
        "DbType": "数据库类型测试值",
        "ConnectString": "连接字符串测试值",
        "Remark": "自动化测试备注001",
        "Enabled": "是否可用测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "SysDbLinkEdit",
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
          "key": "LinkCode",
          "label": "连接编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LinkName",
          "label": "连接名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "DbType",
          "label": "数据库类型",
          "required": true,
          "example": "数据库类型测试值"
        },
        {
          "key": "ConnectString",
          "label": "连接字符串",
          "required": true,
          "example": "连接字符串测试值"
        },
        {
          "key": "Remark",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        }
      ],
      "testData": {
        "LinkCode": "AT-001",
        "LinkName": "自动化样例001",
        "DbType": "数据库类型测试值",
        "ConnectString": "连接字符串测试值",
        "Remark": "自动化测试备注001",
        "Enabled": "是否可用测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "SysDbLinkDelete",
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
