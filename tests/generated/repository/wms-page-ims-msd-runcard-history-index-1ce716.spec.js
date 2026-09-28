// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-msd-runcard-history-index-1ce716",
  "name": "仓储管理 - 条码号（未配置菜单）功能校验",
  "displayName": "条码号（未配置菜单）",
  "route": "/ImsMsdRuncardHistory/Index",
  "sourceRoute": "/ImsMsdRuncardHistory/Index",
  "menuCode": "",
  "breadcrumb": "仓储管理 / 未配置菜单 / 条码号（未配置菜单）",
  "sourceFile": "src/views/ImsMsdRuncardHistory/Index.vue",
  "dataSchema": {
    "columns": [
      "ReelCode",
      "ActionCode",
      "Temperature",
      "Humidity",
      "TotalOpenTime",
      "Status",
      "BeginBy",
      "BeginTime",
      "EndBy",
      "ActualEndTime",
      "StandardEndTime",
      "ActionLocation",
      "LevelCode",
      "Thickness",
      "Description"
    ],
    "required": [
      "ReelCode",
      "ActionCode",
      "Temperature",
      "Humidity",
      "TotalOpenTime",
      "Status",
      "BeginBy",
      "BeginTime",
      "EndBy",
      "ActualEndTime",
      "StandardEndTime",
      "ActionLocation",
      "LevelCode",
      "Thickness",
      "Description"
    ],
    "fields": [
      {
        "key": "ReelCode",
        "label": "条码号",
        "required": true
      },
      {
        "key": "ActionCode",
        "label": "管控代码",
        "required": true
      },
      {
        "key": "Temperature",
        "label": "环境温度",
        "required": true
      },
      {
        "key": "Humidity",
        "label": "环境湿度",
        "required": true
      },
      {
        "key": "TotalOpenTime",
        "label": "总计暴露时间",
        "required": true
      },
      {
        "key": "Status",
        "label": "状态",
        "required": true
      },
      {
        "key": "BeginBy",
        "label": "开始管控人",
        "required": true
      },
      {
        "key": "BeginTime",
        "label": "管控开始时间",
        "required": true
      },
      {
        "key": "EndBy",
        "label": "管控结束人",
        "required": true
      },
      {
        "key": "ActualEndTime",
        "label": "实际管控结束时间",
        "required": true
      },
      {
        "key": "StandardEndTime",
        "label": "标准管控结束时间",
        "required": true
      },
      {
        "key": "ActionLocation",
        "label": "作业地点",
        "required": true
      },
      {
        "key": "LevelCode",
        "label": "潮敏等级",
        "required": true
      },
      {
        "key": "Thickness",
        "label": "元件厚度",
        "required": true
      },
      {
        "key": "Description",
        "label": "备注说明",
        "required": true
      }
    ],
    "example": {
      "ReelCode": "条码号测试值",
      "ActionCode": "管控代码测试值",
      "Temperature": "环境温度测试值",
      "Humidity": "环境湿度测试值",
      "TotalOpenTime": "2026-08-01",
      "Status": "Y",
      "BeginBy": "开始管控人测试值",
      "BeginTime": "2026-08-01",
      "EndBy": "管控结束人测试值",
      "ActualEndTime": "2026-08-01",
      "StandardEndTime": "2026-08-01",
      "ActionLocation": "作业地点测试值",
      "LevelCode": "潮敏等级测试值",
      "Thickness": "元件厚度测试值",
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
        "ReelCode": "条码号测试值",
        "ActionCode": "管控代码测试值",
        "Temperature": "环境温度测试值",
        "Humidity": "环境湿度测试值",
        "TotalOpenTime": "2026-08-01",
        "Status": "Y",
        "BeginBy": "开始管控人测试值",
        "BeginTime": "2026-08-01",
        "EndBy": "管控结束人测试值",
        "ActualEndTime": "2026-08-01",
        "StandardEndTime": "2026-08-01",
        "ActionLocation": "作业地点测试值",
        "LevelCode": "潮敏等级测试值",
        "Thickness": "元件厚度测试值",
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
      "permission": "ImsMsdRuncardHistoryAdd",
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
          "key": "ReelCode",
          "label": "条码号",
          "required": true,
          "example": "条码号测试值"
        },
        {
          "key": "ActionCode",
          "label": "管控代码",
          "required": true,
          "example": "管控代码测试值"
        },
        {
          "key": "Temperature",
          "label": "环境温度",
          "required": true,
          "example": "环境温度测试值"
        },
        {
          "key": "Humidity",
          "label": "环境湿度",
          "required": true,
          "example": "环境湿度测试值"
        },
        {
          "key": "TotalOpenTime",
          "label": "总计暴露时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "BeginBy",
          "label": "开始管控人",
          "required": true,
          "example": "开始管控人测试值"
        },
        {
          "key": "BeginTime",
          "label": "管控开始时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "EndBy",
          "label": "管控结束人",
          "required": true,
          "example": "管控结束人测试值"
        },
        {
          "key": "ActualEndTime",
          "label": "实际管控结束时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "StandardEndTime",
          "label": "标准管控结束时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ActionLocation",
          "label": "作业地点",
          "required": true,
          "example": "作业地点测试值"
        },
        {
          "key": "LevelCode",
          "label": "潮敏等级",
          "required": true,
          "example": "潮敏等级测试值"
        },
        {
          "key": "Thickness",
          "label": "元件厚度",
          "required": true,
          "example": "元件厚度测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": true,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "ReelCode": "条码号测试值",
        "ActionCode": "管控代码测试值",
        "Temperature": "环境温度测试值",
        "Humidity": "环境湿度测试值",
        "TotalOpenTime": "2026-08-01",
        "Status": "Y",
        "BeginBy": "开始管控人测试值",
        "BeginTime": "2026-08-01",
        "EndBy": "管控结束人测试值",
        "ActualEndTime": "2026-08-01",
        "StandardEndTime": "2026-08-01",
        "ActionLocation": "作业地点测试值",
        "LevelCode": "潮敏等级测试值",
        "Thickness": "元件厚度测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsMsdRuncardHistoryEdit",
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
          "key": "ReelCode",
          "label": "条码号",
          "required": true,
          "example": "条码号测试值"
        },
        {
          "key": "ActionCode",
          "label": "管控代码",
          "required": true,
          "example": "管控代码测试值"
        },
        {
          "key": "Temperature",
          "label": "环境温度",
          "required": true,
          "example": "环境温度测试值"
        },
        {
          "key": "Humidity",
          "label": "环境湿度",
          "required": true,
          "example": "环境湿度测试值"
        },
        {
          "key": "TotalOpenTime",
          "label": "总计暴露时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "BeginBy",
          "label": "开始管控人",
          "required": true,
          "example": "开始管控人测试值"
        },
        {
          "key": "BeginTime",
          "label": "管控开始时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "EndBy",
          "label": "管控结束人",
          "required": true,
          "example": "管控结束人测试值"
        },
        {
          "key": "ActualEndTime",
          "label": "实际管控结束时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "StandardEndTime",
          "label": "标准管控结束时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ActionLocation",
          "label": "作业地点",
          "required": true,
          "example": "作业地点测试值"
        },
        {
          "key": "LevelCode",
          "label": "潮敏等级",
          "required": true,
          "example": "潮敏等级测试值"
        },
        {
          "key": "Thickness",
          "label": "元件厚度",
          "required": true,
          "example": "元件厚度测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": true,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "ReelCode": "条码号测试值",
        "ActionCode": "管控代码测试值",
        "Temperature": "环境温度测试值",
        "Humidity": "环境湿度测试值",
        "TotalOpenTime": "2026-08-01",
        "Status": "Y",
        "BeginBy": "开始管控人测试值",
        "BeginTime": "2026-08-01",
        "EndBy": "管控结束人测试值",
        "ActualEndTime": "2026-08-01",
        "StandardEndTime": "2026-08-01",
        "ActionLocation": "作业地点测试值",
        "LevelCode": "潮敏等级测试值",
        "Thickness": "元件厚度测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsMsdRuncardHistoryRemove",
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
