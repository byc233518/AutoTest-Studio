// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-cyc-ctl-index-90fa74",
  "name": "仓储管理 - 盘点方案功能校验",
  "displayName": "盘点方案",
  "route": "/ImsCycCtl/Index",
  "sourceRoute": "/ImsCycCtl/Index",
  "menuCode": "ImsCycCtl",
  "breadcrumb": "仓库管理 / 库存盘点 / 盘点方案",
  "sourceFile": "src/views/ImsCycCtl/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "CompanyId",
      "Type",
      "Description",
      "CardSize"
    ],
    "required": [
      "Code",
      "Type",
      "CardSize"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "控制编码",
        "required": true
      },
      {
        "key": "CompanyId",
        "label": "公司",
        "required": false
      },
      {
        "key": "Type",
        "label": "盘点类型",
        "required": true
      },
      {
        "key": "Description",
        "label": "备注说明",
        "required": false
      },
      {
        "key": "CardSize",
        "label": "盘卡大小",
        "required": true
      }
    ],
    "example": {
      "Code": "AT-001",
      "CompanyId": "公司测试值",
      "Type": "盘点类型测试值",
      "Description": "自动化测试备注001",
      "CardSize": "盘卡大小测试值"
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
        "CompanyId": "公司测试值",
        "Type": "盘点类型测试值",
        "Description": "自动化测试备注001",
        "CardSize": "盘卡大小测试值"
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
      "permission": "ImsCycCtlAdd",
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
          "label": "控制编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CompanyId",
          "label": "公司",
          "required": false,
          "example": "公司测试值"
        },
        {
          "key": "Type",
          "label": "盘点类型",
          "required": true,
          "example": "盘点类型测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CardSize",
          "label": "盘卡大小",
          "required": true,
          "example": "盘卡大小测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "CompanyId": "公司测试值",
        "Type": "盘点类型测试值",
        "Description": "自动化测试备注001",
        "CardSize": "盘卡大小测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsCycCtlEdit",
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
          "label": "控制编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CompanyId",
          "label": "公司",
          "required": false,
          "example": "公司测试值"
        },
        {
          "key": "Type",
          "label": "盘点类型",
          "required": true,
          "example": "盘点类型测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CardSize",
          "label": "盘卡大小",
          "required": true,
          "example": "盘卡大小测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "CompanyId": "公司测试值",
        "Type": "盘点类型测试值",
        "Description": "自动化测试备注001",
        "CardSize": "盘卡大小测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsCycCtlRemove",
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
