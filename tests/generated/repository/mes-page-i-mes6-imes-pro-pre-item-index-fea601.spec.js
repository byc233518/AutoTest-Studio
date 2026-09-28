// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-pro-pre-item-index-fea601",
  "name": "制造执行 - 确认项目功能校验",
  "displayName": "确认项目",
  "route": "/iMES6/ImesProPreItem/Index",
  "sourceRoute": "/iMES6/ImesProPreItem/Index",
  "menuCode": "iMES6_ImesProPreItem",
  "breadcrumb": "生产管理 / 产前确认 / 确认项目",
  "sourceFile": "src/views/iMES6/ImesProPreItem/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "ItemType",
      "Name",
      "Tools",
      "Enabled",
      "Remark"
    ],
    "required": [
      "ItemType",
      "Name"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "确认编码",
        "required": false
      },
      {
        "key": "ItemType",
        "label": "项目类型",
        "required": true
      },
      {
        "key": "Name",
        "label": "确认名称",
        "required": true
      },
      {
        "key": "Tools",
        "label": "使用工具",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "Remark",
        "label": "描述",
        "required": false
      }
    ],
    "example": {
      "Code": "AT-001",
      "ItemType": "项目类型测试值",
      "Name": "自动化样例001",
      "Tools": "使用工具测试值",
      "Enabled": "Y",
      "Remark": "自动化测试备注001"
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
        "Code": "AT-001",
        "ItemType": "项目类型测试值",
        "Name": "自动化样例001",
        "Tools": "使用工具测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-526a8",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor",
      "permission": "Add",
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
          "key": "Code",
          "label": "确认编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ItemType",
          "label": "项目类型",
          "required": true,
          "example": "项目类型测试值"
        },
        {
          "key": "Name",
          "label": "确认名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Tools",
          "label": "使用工具",
          "required": false,
          "example": "使用工具测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "ItemType": "项目类型测试值",
        "Name": "自动化样例001",
        "Tools": "使用工具测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
      "permission": "Edit",
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
          "key": "Code",
          "label": "确认编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ItemType",
          "label": "项目类型",
          "required": true,
          "example": "项目类型测试值"
        },
        {
          "key": "Name",
          "label": "确认名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Tools",
          "label": "使用工具",
          "required": false,
          "example": "使用工具测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "ItemType": "项目类型测试值",
        "Name": "自动化样例001",
        "Tools": "使用工具测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001"
      }
    }
  ]
});
