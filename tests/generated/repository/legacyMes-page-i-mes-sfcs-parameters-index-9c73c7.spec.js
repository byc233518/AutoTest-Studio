// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-parameters-index-9c73c7",
  "name": "旧版制造执行 - 生产字典管理功能校验",
  "displayName": "生产字典管理",
  "route": "/iMES/SfcsParameters/Index",
  "sourceRoute": "/iMES/SfcsParameters/Index",
  "menuCode": "iMES_SfcsParameters",
  "breadcrumb": "系统管理 / 配置字典 / 生产字典管理",
  "sourceFile": "src/views/iMES/SfcsParameters/Index.vue",
  "dataSchema": {
    "columns": [
      "LOOKUP_TYPE",
      "LOOKUP_CODE",
      "DESCRIPTION",
      "ENABLED",
      "NAME",
      "MEANING",
      "CHINESE",
      "empty",
      "Key"
    ],
    "required": [
      "LOOKUP_TYPE",
      "LOOKUP_CODE",
      "DESCRIPTION",
      "ENABLED",
      "NAME",
      "MEANING",
      "CHINESE"
    ],
    "fields": [
      {
        "key": "LOOKUP_TYPE",
        "label": "类型（EN）",
        "required": true
      },
      {
        "key": "LOOKUP_CODE",
        "label": "代码",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "描述（EN）",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否可用",
        "required": true
      },
      {
        "key": "NAME",
        "label": "类型（CN）",
        "required": true
      },
      {
        "key": "MEANING",
        "label": "键值",
        "required": true
      },
      {
        "key": "CHINESE",
        "label": "描述（CN）",
        "required": true
      },
      {
        "key": "empty",
        "label": "类型",
        "required": false
      },
      {
        "key": "Key",
        "label": "类型",
        "required": false
      }
    ],
    "example": {
      "LOOKUP_TYPE": "类型（EN）测试值",
      "LOOKUP_CODE": "代码测试值",
      "DESCRIPTION": "描述（EN）测试值",
      "ENABLED": "是否可用测试值",
      "NAME": "类型（CN）测试值",
      "MEANING": "键值测试值",
      "CHINESE": "描述（CN）测试值",
      "empty": "类型测试值",
      "Key": "类型测试值"
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
        "getStatusList",
        "searchClick"
      ],
      "testData": {
        "LOOKUP_TYPE": "类型（EN）测试值",
        "LOOKUP_CODE": "代码测试值",
        "DESCRIPTION": "描述（EN）测试值",
        "ENABLED": "是否可用测试值",
        "NAME": "类型（CN）测试值",
        "MEANING": "键值测试值",
        "CHINESE": "描述（CN）测试值",
        "empty": "类型测试值",
        "Key": "类型测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-51611",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(null)",
      "permission": "SfcsParametersAdd",
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
          "key": "LOOKUP_TYPE",
          "label": "类型（EN）",
          "required": true,
          "example": "类型（EN）测试值"
        },
        {
          "key": "LOOKUP_CODE",
          "label": "代码",
          "required": true,
          "example": "代码测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述（EN）",
          "required": true,
          "example": "描述（EN）测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "NAME",
          "label": "类型（CN）",
          "required": true,
          "example": "类型（CN）测试值"
        },
        {
          "key": "MEANING",
          "label": "键值",
          "required": true,
          "example": "键值测试值"
        },
        {
          "key": "CHINESE",
          "label": "描述（CN）",
          "required": true,
          "example": "描述（CN）测试值"
        },
        {
          "key": "empty",
          "label": "类型",
          "required": false,
          "example": "类型测试值"
        },
        {
          "key": "Key",
          "label": "类型",
          "required": false,
          "example": "类型测试值"
        }
      ],
      "testData": {
        "LOOKUP_TYPE": "类型（EN）测试值",
        "LOOKUP_CODE": "代码测试值",
        "DESCRIPTION": "描述（EN）测试值",
        "ENABLED": "是否可用测试值",
        "NAME": "类型（CN）测试值",
        "MEANING": "键值测试值",
        "CHINESE": "描述（CN）测试值",
        "empty": "类型测试值",
        "Key": "类型测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsParametersEdit",
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
          "key": "LOOKUP_TYPE",
          "label": "类型（EN）",
          "required": true,
          "example": "类型（EN）测试值"
        },
        {
          "key": "LOOKUP_CODE",
          "label": "代码",
          "required": true,
          "example": "代码测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述（EN）",
          "required": true,
          "example": "描述（EN）测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "NAME",
          "label": "类型（CN）",
          "required": true,
          "example": "类型（CN）测试值"
        },
        {
          "key": "MEANING",
          "label": "键值",
          "required": true,
          "example": "键值测试值"
        },
        {
          "key": "CHINESE",
          "label": "描述（CN）",
          "required": true,
          "example": "描述（CN）测试值"
        },
        {
          "key": "empty",
          "label": "类型",
          "required": false,
          "example": "类型测试值"
        },
        {
          "key": "Key",
          "label": "类型",
          "required": false,
          "example": "类型测试值"
        }
      ],
      "testData": {
        "LOOKUP_TYPE": "类型（EN）测试值",
        "LOOKUP_CODE": "代码测试值",
        "DESCRIPTION": "描述（EN）测试值",
        "ENABLED": "是否可用测试值",
        "NAME": "类型（CN）测试值",
        "MEANING": "键值测试值",
        "CHINESE": "描述（CN）测试值",
        "empty": "类型测试值",
        "Key": "类型测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SfcsParametersRemove",
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
