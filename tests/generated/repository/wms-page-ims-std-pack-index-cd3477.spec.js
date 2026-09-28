// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-std-pack-index-cd3477",
  "name": "仓储管理 - 最小包装功能校验",
  "displayName": "最小包装",
  "route": "/ImsStdPack/Index",
  "sourceRoute": "/ImsStdPack/Index",
  "menuCode": "ImsStdPack",
  "breadcrumb": "基础设定 / 基础数据 / 最小包装",
  "sourceFile": "src/views/ImsStdPack/Index.vue",
  "dataSchema": {
    "columns": [
      "PartId",
      "VendorId",
      "Mpq",
      "localData",
      "Data"
    ],
    "required": [
      "PartId",
      "VendorId",
      "Mpq"
    ],
    "fields": [
      {
        "key": "PartId",
        "label": "物料编码",
        "required": true
      },
      {
        "key": "VendorId",
        "label": "供应商",
        "required": true
      },
      {
        "key": "Mpq",
        "label": "包装量",
        "required": true
      },
      {
        "key": "localData",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "PartId": "AT-001",
      "VendorId": "供应商测试值",
      "Mpq": "包装量测试值",
      "localData": "AT-001",
      "Data": "输入关键字搜索测试值"
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
        "search"
      ],
      "testData": {
        "PartId": "AT-001",
        "VendorId": "供应商测试值",
        "Mpq": "包装量测试值",
        "localData": "AT-001",
        "Data": "输入关键字搜索测试值"
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
      "permission": "ImsStdPackAdd",
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
          "key": "PartId",
          "label": "物料编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "VendorId",
          "label": "供应商",
          "required": true,
          "example": "供应商测试值"
        },
        {
          "key": "Mpq",
          "label": "包装量",
          "required": true,
          "example": "包装量测试值"
        },
        {
          "key": "localData",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "PartId": "AT-001",
        "VendorId": "供应商测试值",
        "Mpq": "包装量测试值",
        "localData": "AT-001",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsStdPackEdit",
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
          "key": "PartId",
          "label": "物料编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "VendorId",
          "label": "供应商",
          "required": true,
          "example": "供应商测试值"
        },
        {
          "key": "Mpq",
          "label": "包装量",
          "required": true,
          "example": "包装量测试值"
        },
        {
          "key": "localData",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "PartId": "AT-001",
        "VendorId": "供应商测试值",
        "Mpq": "包装量测试值",
        "localData": "AT-001",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsStdPackDelete",
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
