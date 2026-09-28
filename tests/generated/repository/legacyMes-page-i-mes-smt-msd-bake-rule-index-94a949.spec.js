// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-msd-bake-rule-index-94a949",
  "name": "旧版制造执行 - 超时下限(Min)（未配置菜单）功能校验",
  "displayName": "超时下限(Min)（未配置菜单）",
  "route": "/iMES/SmtMsdBakeRule/Index",
  "sourceRoute": "/iMES/SmtMsdBakeRule/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 超时下限(Min)（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtMsdBakeRule/Index.vue",
  "dataSchema": {
    "columns": [
      "LEVEL_CODE",
      "MIN_THICKNESS",
      "MIN_OPEN_TEMPERATURE",
      "MIN_OPEN_HUMIDITY",
      "BAKE_TEMPERATURE",
      "MIN_OVER_TIME",
      "ENABLED",
      "BAKE_TIME",
      "MAX_THICKNESS",
      "MAX_OPEN_TEMPERATURE",
      "MAX_OPEN_HUMIDITY",
      "BAKE_HUMIDITY",
      "MAX_OVER_TIME"
    ],
    "required": [
      "LEVEL_CODE",
      "BAKE_TEMPERATURE",
      "MIN_OVER_TIME",
      "BAKE_TIME",
      "BAKE_HUMIDITY",
      "MAX_OVER_TIME"
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
        "key": "MIN_OPEN_TEMPERATURE",
        "label": "暴露最小温度",
        "required": false
      },
      {
        "key": "MIN_OPEN_HUMIDITY",
        "label": "暴露最小湿度",
        "required": false
      },
      {
        "key": "BAKE_TEMPERATURE",
        "label": "烘烤温度",
        "required": true
      },
      {
        "key": "MIN_OVER_TIME",
        "label": "超时下限(Min)",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否可用",
        "required": false
      },
      {
        "key": "BAKE_TIME",
        "label": "烘烤时间(Min)",
        "required": true
      },
      {
        "key": "MAX_THICKNESS",
        "label": "最大厚度",
        "required": false
      },
      {
        "key": "MAX_OPEN_TEMPERATURE",
        "label": "暴露最大温度",
        "required": false
      },
      {
        "key": "MAX_OPEN_HUMIDITY",
        "label": "暴露最大湿度",
        "required": false
      },
      {
        "key": "BAKE_HUMIDITY",
        "label": "烘烤湿度",
        "required": true
      },
      {
        "key": "MAX_OVER_TIME",
        "label": "超时上限(Min)",
        "required": true
      }
    ],
    "example": {
      "LEVEL_CODE": "元件等级测试值",
      "MIN_THICKNESS": "最小厚度测试值",
      "MIN_OPEN_TEMPERATURE": "暴露最小温度测试值",
      "MIN_OPEN_HUMIDITY": "暴露最小湿度测试值",
      "BAKE_TEMPERATURE": "烘烤温度测试值",
      "MIN_OVER_TIME": "超时下限(Min)测试值",
      "ENABLED": "是否可用测试值",
      "BAKE_TIME": "烘烤时间(Min)测试值",
      "MAX_THICKNESS": "最大厚度测试值",
      "MAX_OPEN_TEMPERATURE": "暴露最大温度测试值",
      "MAX_OPEN_HUMIDITY": "暴露最大湿度测试值",
      "BAKE_HUMIDITY": "烘烤湿度测试值",
      "MAX_OVER_TIME": "超时上限(Min)测试值"
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
        "MIN_OPEN_TEMPERATURE": "暴露最小温度测试值",
        "MIN_OPEN_HUMIDITY": "暴露最小湿度测试值",
        "BAKE_TEMPERATURE": "烘烤温度测试值",
        "MIN_OVER_TIME": "超时下限(Min)测试值",
        "ENABLED": "是否可用测试值",
        "BAKE_TIME": "烘烤时间(Min)测试值",
        "MAX_THICKNESS": "最大厚度测试值",
        "MAX_OPEN_TEMPERATURE": "暴露最大温度测试值",
        "MAX_OPEN_HUMIDITY": "暴露最大湿度测试值",
        "BAKE_HUMIDITY": "烘烤湿度测试值",
        "MAX_OVER_TIME": "超时上限(Min)测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-1a47f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick({\r\n              ID: 0,\r\n              LEVEL_CODE: '',\r\n              MIN_THICKNESS: 0,\r\n              MAX_THICKNESS: 0,\r\n              MIN_OPEN_TEMPERATURE: 0,\r\n              MAX_OPEN_TEMPERATURE: 0,\r\n              MIN_OPEN_HUMIDITY: 0,\r\n              MAX_OPEN_HUMIDITY: 0,\r\n              BAKE_TEMPERATURE: 0,\r\n              BAKE_HUMIDITY: 0,\r\n              BAKE_TIME: 0,\r\n              ENABLED: 'Y',\r\n              CLEAR_OPEN_TIME: '',\r\n              MIN_OVER_TIME: 0,\r\n              MAX_OVER_TIME: 0\r\n            })",
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
          "key": "MIN_OPEN_TEMPERATURE",
          "label": "暴露最小温度",
          "required": false,
          "example": "暴露最小温度测试值"
        },
        {
          "key": "MIN_OPEN_HUMIDITY",
          "label": "暴露最小湿度",
          "required": false,
          "example": "暴露最小湿度测试值"
        },
        {
          "key": "BAKE_TEMPERATURE",
          "label": "烘烤温度",
          "required": true,
          "example": "烘烤温度测试值"
        },
        {
          "key": "MIN_OVER_TIME",
          "label": "超时下限(Min)",
          "required": true,
          "example": "超时下限(Min)测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        },
        {
          "key": "BAKE_TIME",
          "label": "烘烤时间(Min)",
          "required": true,
          "example": "烘烤时间(Min)测试值"
        },
        {
          "key": "MAX_THICKNESS",
          "label": "最大厚度",
          "required": false,
          "example": "最大厚度测试值"
        },
        {
          "key": "MAX_OPEN_TEMPERATURE",
          "label": "暴露最大温度",
          "required": false,
          "example": "暴露最大温度测试值"
        },
        {
          "key": "MAX_OPEN_HUMIDITY",
          "label": "暴露最大湿度",
          "required": false,
          "example": "暴露最大湿度测试值"
        },
        {
          "key": "BAKE_HUMIDITY",
          "label": "烘烤湿度",
          "required": true,
          "example": "烘烤湿度测试值"
        },
        {
          "key": "MAX_OVER_TIME",
          "label": "超时上限(Min)",
          "required": true,
          "example": "超时上限(Min)测试值"
        }
      ],
      "testData": {
        "LEVEL_CODE": "元件等级测试值",
        "MIN_THICKNESS": "最小厚度测试值",
        "MIN_OPEN_TEMPERATURE": "暴露最小温度测试值",
        "MIN_OPEN_HUMIDITY": "暴露最小湿度测试值",
        "BAKE_TEMPERATURE": "烘烤温度测试值",
        "MIN_OVER_TIME": "超时下限(Min)测试值",
        "ENABLED": "是否可用测试值",
        "BAKE_TIME": "烘烤时间(Min)测试值",
        "MAX_THICKNESS": "最大厚度测试值",
        "MAX_OPEN_TEMPERATURE": "暴露最大温度测试值",
        "MAX_OPEN_HUMIDITY": "暴露最大湿度测试值",
        "BAKE_HUMIDITY": "烘烤湿度测试值",
        "MAX_OVER_TIME": "超时上限(Min)测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-49c7a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "addClick(row)",
      "permission": "ImsMsdRSave",
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
          "key": "MIN_OPEN_TEMPERATURE",
          "label": "暴露最小温度",
          "required": false,
          "example": "暴露最小温度测试值"
        },
        {
          "key": "MIN_OPEN_HUMIDITY",
          "label": "暴露最小湿度",
          "required": false,
          "example": "暴露最小湿度测试值"
        },
        {
          "key": "BAKE_TEMPERATURE",
          "label": "烘烤温度",
          "required": true,
          "example": "烘烤温度测试值"
        },
        {
          "key": "MIN_OVER_TIME",
          "label": "超时下限(Min)",
          "required": true,
          "example": "超时下限(Min)测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        },
        {
          "key": "BAKE_TIME",
          "label": "烘烤时间(Min)",
          "required": true,
          "example": "烘烤时间(Min)测试值"
        },
        {
          "key": "MAX_THICKNESS",
          "label": "最大厚度",
          "required": false,
          "example": "最大厚度测试值"
        },
        {
          "key": "MAX_OPEN_TEMPERATURE",
          "label": "暴露最大温度",
          "required": false,
          "example": "暴露最大温度测试值"
        },
        {
          "key": "MAX_OPEN_HUMIDITY",
          "label": "暴露最大湿度",
          "required": false,
          "example": "暴露最大湿度测试值"
        },
        {
          "key": "BAKE_HUMIDITY",
          "label": "烘烤湿度",
          "required": true,
          "example": "烘烤湿度测试值"
        },
        {
          "key": "MAX_OVER_TIME",
          "label": "超时上限(Min)",
          "required": true,
          "example": "超时上限(Min)测试值"
        }
      ],
      "testData": {
        "LEVEL_CODE": "元件等级测试值",
        "MIN_THICKNESS": "最小厚度测试值",
        "MIN_OPEN_TEMPERATURE": "暴露最小温度测试值",
        "MIN_OPEN_HUMIDITY": "暴露最小湿度测试值",
        "BAKE_TEMPERATURE": "烘烤温度测试值",
        "MIN_OVER_TIME": "超时下限(Min)测试值",
        "ENABLED": "是否可用测试值",
        "BAKE_TIME": "烘烤时间(Min)测试值",
        "MAX_THICKNESS": "最大厚度测试值",
        "MAX_OPEN_TEMPERATURE": "暴露最大温度测试值",
        "MAX_OPEN_HUMIDITY": "暴露最大湿度测试值",
        "BAKE_HUMIDITY": "烘烤湿度测试值",
        "MAX_OVER_TIME": "超时上限(Min)测试值"
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
