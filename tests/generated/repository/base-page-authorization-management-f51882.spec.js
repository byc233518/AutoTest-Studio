// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-authorization-management-f51882",
  "name": "基座系统 - 应用授权功能校验",
  "displayName": "应用授权",
  "route": "/AuthorizationManagement",
  "sourceRoute": "/AuthorizationManagement",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 应用授权",
  "sourceFile": "src/views/Admin/System/AuthorizationManagement/index.vue",
  "dataSchema": {
    "columns": [
      "tenant",
      "app",
      "permissions",
      "status",
      "expireTime"
    ],
    "required": [],
    "fields": [
      {
        "key": "tenant",
        "label": "租户",
        "required": false
      },
      {
        "key": "app",
        "label": "应用",
        "required": false
      },
      {
        "key": "permissions",
        "label": "权限范围",
        "required": false
      },
      {
        "key": "status",
        "label": "状态",
        "required": false
      },
      {
        "key": "expireTime",
        "label": "过期时间",
        "required": false
      }
    ],
    "example": {
      "tenant": "租户测试值",
      "app": "应用测试值",
      "permissions": "权限范围测试值",
      "status": "Y",
      "expireTime": "2026-08-01"
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
      "key": "13fd57e65b-f31d0722b7-96dc4",
      "type": "新增表单",
      "name": "新增授权业务入口校验",
      "label": "新增授权",
      "handler": "handleCreateAuth",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增授权",
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
          "key": "tenant",
          "label": "租户",
          "required": false,
          "example": "租户测试值"
        },
        {
          "key": "app",
          "label": "应用",
          "required": false,
          "example": "应用测试值"
        },
        {
          "key": "permissions",
          "label": "权限范围",
          "required": false,
          "example": "权限范围测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "expireTime",
          "label": "过期时间",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "tenant": "租户测试值",
        "app": "应用测试值",
        "permissions": "权限范围测试值",
        "status": "Y",
        "expireTime": "2026-08-01"
      }
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
          "key": "tenant",
          "label": "租户",
          "required": false,
          "example": "租户测试值"
        },
        {
          "key": "app",
          "label": "应用",
          "required": false,
          "example": "应用测试值"
        },
        {
          "key": "permissions",
          "label": "权限范围",
          "required": false,
          "example": "权限范围测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "expireTime",
          "label": "过期时间",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "tenant": "租户测试值",
        "app": "应用测试值",
        "permissions": "权限范围测试值",
        "status": "Y",
        "expireTime": "2026-08-01"
      }
    },
    {
      "key": "7e002f9936-9fcefd8dc8-b0367",
      "type": "业务动作",
      "name": "撤销业务入口校验",
      "label": "撤销",
      "handler": "handleRevoke(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位撤销",
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
