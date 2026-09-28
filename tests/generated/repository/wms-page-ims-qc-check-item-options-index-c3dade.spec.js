// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-check-item-options-index-c3dade",
  "name": "仓储管理 - 量化信息配置功能校验",
  "displayName": "量化信息配置",
  "route": "/ImsQcCheckItemOptions/Index",
  "sourceRoute": "/ImsQcCheckItemOptions/Index",
  "menuCode": "ImsQcCheckItemOptions",
  "breadcrumb": "品质管理 / 基础配置 / 量化信息配置",
  "sourceFile": "src/views/ImsQcCheckItemOptions/Index.vue",
  "dataSchema": {
    "columns": [
      "OptionType",
      "Code",
      "Name",
      "Description"
    ],
    "required": [
      "OptionType",
      "Name"
    ],
    "fields": [
      {
        "key": "OptionType",
        "label": "量化类型",
        "required": true
      },
      {
        "key": "Code",
        "label": "选项编码",
        "required": false
      },
      {
        "key": "Name",
        "label": "选项名称",
        "required": true
      },
      {
        "key": "Description",
        "label": "选项说明",
        "required": false
      }
    ],
    "example": {
      "OptionType": "量化类型测试值",
      "Code": "AT-001",
      "Name": "自动化样例001",
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
        "OptionType": "量化类型测试值",
        "Code": "AT-001",
        "Name": "自动化样例001",
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
      "key": "13fd57e65b-2cd9e6ce81-58d1b",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add",
      "permission": "ImsQcCheckItemOptionsAdd",
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
          "key": "OptionType",
          "label": "量化类型",
          "required": true,
          "example": "量化类型测试值"
        },
        {
          "key": "Code",
          "label": "选项编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "选项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "选项说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "OptionType": "量化类型测试值",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsQcCheckItemOptionsEdit",
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
          "key": "OptionType",
          "label": "量化类型",
          "required": true,
          "example": "量化类型测试值"
        },
        {
          "key": "Code",
          "label": "选项编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "选项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "选项说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "OptionType": "量化类型测试值",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsQcCheckItemOptionsDelete",
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
