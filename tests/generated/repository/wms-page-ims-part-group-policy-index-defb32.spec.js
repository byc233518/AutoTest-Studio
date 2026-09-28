// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-part-group-policy-index-defb32",
  "name": "仓储管理 - 物料组策略管理功能校验",
  "displayName": "物料组策略管理",
  "route": "/ImsPartGroupPolicy/Index",
  "sourceRoute": "/ImsPartGroupPolicy/Index",
  "menuCode": "ImsPartGroupPolicy",
  "breadcrumb": "仓库管理 / 策略管理 / 物料组策略管理",
  "sourceFile": "src/views/ImsPartGroupPolicy/Index.vue",
  "dataSchema": {
    "columns": [
      "PolicyId",
      "PriorityLevel",
      "FifoDateType",
      "FifoAddDay",
      "Enabled"
    ],
    "required": [
      "PolicyId",
      "PriorityLevel",
      "FifoDateType",
      "FifoAddDay"
    ],
    "fields": [
      {
        "key": "PolicyId",
        "label": "策略名称",
        "required": true
      },
      {
        "key": "PriorityLevel",
        "label": "优先级",
        "required": true
      },
      {
        "key": "FifoDateType",
        "label": "日期类型",
        "required": true
      },
      {
        "key": "FifoAddDay",
        "label": "日期+n天",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否启用",
        "required": false
      }
    ],
    "example": {
      "PolicyId": "自动化样例001",
      "PriorityLevel": "优先级测试值",
      "FifoDateType": "日期类型测试值",
      "FifoAddDay": "日期+n天测试值",
      "Enabled": "Y"
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
        "PolicyId": "自动化样例001",
        "PriorityLevel": "优先级测试值",
        "FifoDateType": "日期类型测试值",
        "FifoAddDay": "日期+n天测试值",
        "Enabled": "Y"
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
      "key": "7e002f9936-196e111309-fd628",
      "type": "业务动作",
      "name": "初始化业务入口校验",
      "label": "初始化",
      "handler": "init",
      "permission": "ImsPartGroupPolicyInit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位初始化",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-2cd9e6ce81-11150",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add(1)",
      "permission": "ImsPartGroupPolicyAdd",
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
          "key": "PolicyId",
          "label": "策略名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PriorityLevel",
          "label": "优先级",
          "required": true,
          "example": "优先级测试值"
        },
        {
          "key": "FifoDateType",
          "label": "日期类型",
          "required": true,
          "example": "日期类型测试值"
        },
        {
          "key": "FifoAddDay",
          "label": "日期+n天",
          "required": true,
          "example": "日期+n天测试值"
        },
        {
          "key": "Enabled",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "PolicyId": "自动化样例001",
        "PriorityLevel": "优先级测试值",
        "FifoDateType": "日期类型测试值",
        "FifoAddDay": "日期+n天测试值",
        "Enabled": "Y"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-451e1",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(row)",
      "permission": "ImsPartGroupPolicyEdit",
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
          "key": "PolicyId",
          "label": "策略名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PriorityLevel",
          "label": "优先级",
          "required": true,
          "example": "优先级测试值"
        },
        {
          "key": "FifoDateType",
          "label": "日期类型",
          "required": true,
          "example": "日期类型测试值"
        },
        {
          "key": "FifoAddDay",
          "label": "日期+n天",
          "required": true,
          "example": "日期+n天测试值"
        },
        {
          "key": "Enabled",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "PolicyId": "自动化样例001",
        "PriorityLevel": "优先级测试值",
        "FifoDateType": "日期类型测试值",
        "FifoAddDay": "日期+n天测试值",
        "Enabled": "Y"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-9f5bf",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(row)",
      "permission": "ImsPartGroupPolicyRemove",
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
