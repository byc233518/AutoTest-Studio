// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-app-management-ca7677",
  "name": "基座系统 - 应用管理功能校验",
  "displayName": "应用管理",
  "route": "/AppManagement",
  "sourceRoute": "/AppManagement",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 应用管理",
  "sourceFile": "src/views/Admin/Development/AppManagement/index.vue",
  "dataSchema": {
    "columns": [
      "name",
      "code",
      "type",
      "status",
      "createTime"
    ],
    "required": [],
    "fields": [
      {
        "key": "name",
        "label": "应用名称",
        "required": false
      },
      {
        "key": "code",
        "label": "应用代码",
        "required": false
      },
      {
        "key": "type",
        "label": "应用类型",
        "required": false
      },
      {
        "key": "status",
        "label": "状态",
        "required": false
      },
      {
        "key": "createTime",
        "label": "创建时间",
        "required": false
      }
    ],
    "example": {
      "name": "自动化样例001",
      "code": "应用代码测试值",
      "type": "应用类型测试值",
      "status": "Y",
      "createTime": "2026-08-01"
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
      "key": "4aa22a22ac-a7f814c0a4-e718a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEdit(scope.row)",
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
          "key": "name",
          "label": "应用名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "code",
          "label": "应用代码",
          "required": false,
          "example": "应用代码测试值"
        },
        {
          "key": "type",
          "label": "应用类型",
          "required": false,
          "example": "应用类型测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "createTime",
          "label": "创建时间",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "name": "自动化样例001",
        "code": "应用代码测试值",
        "type": "应用类型测试值",
        "status": "Y",
        "createTime": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-416f6",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(scope.row)",
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
