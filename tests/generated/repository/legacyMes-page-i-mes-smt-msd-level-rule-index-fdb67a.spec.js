// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-msd-level-rule-index-fdb67a",
  "name": "旧版制造执行 - 使用周期(Y)（未配置菜单）功能校验",
  "displayName": "使用周期(Y)（未配置菜单）",
  "route": "/iMES/SmtMsdLevelRule/Index",
  "sourceRoute": "/iMES/SmtMsdLevelRule/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 使用周期(Y)（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtMsdLevelRule/Index.vue",
  "dataSchema": {
    "columns": [
      "LEVEL_CODE",
      "MIN_THICKNESS",
      "MAX_THICKNESS",
      "TEMPERATURE",
      "HUMIDITY",
      "FLOOR_LIFE",
      "ENABLED"
    ],
    "required": [
      "LEVEL_CODE",
      "TEMPERATURE",
      "HUMIDITY"
    ],
    "fields": [
      {
        "key": "LEVEL_CODE",
        "label": "元件等级",
        "required": true
      },
      {
        "key": "MIN_THICKNESS",
        "label": "最小厚度",
        "required": false
      },
      {
        "key": "MAX_THICKNESS",
        "label": "最大厚度",
        "required": false
      },
      {
        "key": "TEMPERATURE",
        "label": "暴露温度",
        "required": true
      },
      {
        "key": "HUMIDITY",
        "label": "暴露湿度",
        "required": true
      },
      {
        "key": "FLOOR_LIFE",
        "label": "使用周期(Y)",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "LEVEL_CODE": "元件等级测试值",
      "MIN_THICKNESS": "最小厚度测试值",
      "MAX_THICKNESS": "最大厚度测试值",
      "TEMPERATURE": "暴露温度测试值",
      "HUMIDITY": "暴露湿度测试值",
      "FLOOR_LIFE": "使用周期(Y)测试值",
      "ENABLED": "是否激活测试值"
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
        "LEVEL_CODE": "元件等级测试值",
        "MIN_THICKNESS": "最小厚度测试值",
        "MAX_THICKNESS": "最大厚度测试值",
        "TEMPERATURE": "暴露温度测试值",
        "HUMIDITY": "暴露湿度测试值",
        "FLOOR_LIFE": "使用周期(Y)测试值",
        "ENABLED": "是否激活测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-dc87a",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick({\r\n              ID: 0,\r\n              LEVEL_CODE: '',\r\n              MIN_THICKNESS: 0,\r\n              MAX_THICKNESS: 0,\r\n              TEMPERATURE: 0,\r\n              HUMIDITY: 0,\r\n              FLOOR_LIFE: 0,\r\n              ENABLED: ''\r\n            })",
      "permission": "",
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
          "key": "LEVEL_CODE",
          "label": "元件等级",
          "required": true,
          "example": "元件等级测试值"
        },
        {
          "key": "MIN_THICKNESS",
          "label": "最小厚度",
          "required": false,
          "example": "最小厚度测试值"
        },
        {
          "key": "MAX_THICKNESS",
          "label": "最大厚度",
          "required": false,
          "example": "最大厚度测试值"
        },
        {
          "key": "TEMPERATURE",
          "label": "暴露温度",
          "required": true,
          "example": "暴露温度测试值"
        },
        {
          "key": "HUMIDITY",
          "label": "暴露湿度",
          "required": true,
          "example": "暴露湿度测试值"
        },
        {
          "key": "FLOOR_LIFE",
          "label": "使用周期(Y)",
          "required": false,
          "example": "使用周期(Y)测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "LEVEL_CODE": "元件等级测试值",
        "MIN_THICKNESS": "最小厚度测试值",
        "MAX_THICKNESS": "最大厚度测试值",
        "TEMPERATURE": "暴露温度测试值",
        "HUMIDITY": "暴露湿度测试值",
        "FLOOR_LIFE": "使用周期(Y)测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-49c7a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "addClick(row)",
      "permission": "ImsSmtMsdLevelRuleSave",
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
          "key": "LEVEL_CODE",
          "label": "元件等级",
          "required": true,
          "example": "元件等级测试值"
        },
        {
          "key": "MIN_THICKNESS",
          "label": "最小厚度",
          "required": false,
          "example": "最小厚度测试值"
        },
        {
          "key": "MAX_THICKNESS",
          "label": "最大厚度",
          "required": false,
          "example": "最大厚度测试值"
        },
        {
          "key": "TEMPERATURE",
          "label": "暴露温度",
          "required": true,
          "example": "暴露温度测试值"
        },
        {
          "key": "HUMIDITY",
          "label": "暴露湿度",
          "required": true,
          "example": "暴露湿度测试值"
        },
        {
          "key": "FLOOR_LIFE",
          "label": "使用周期(Y)",
          "required": false,
          "example": "使用周期(Y)测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "LEVEL_CODE": "元件等级测试值",
        "MIN_THICKNESS": "最小厚度测试值",
        "MAX_THICKNESS": "最大厚度测试值",
        "TEMPERATURE": "暴露温度测试值",
        "HUMIDITY": "暴露湿度测试值",
        "FLOOR_LIFE": "使用周期(Y)测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
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
