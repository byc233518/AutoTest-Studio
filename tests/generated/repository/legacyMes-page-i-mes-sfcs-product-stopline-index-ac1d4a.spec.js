// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-product-stopline-index-ac1d4a",
  "name": "旧版制造执行 - 选择（未配置菜单）功能校验",
  "displayName": "选择（未配置菜单）",
  "route": "/iMES/SfcsProductStopline/Index",
  "sourceRoute": "/iMES/SfcsProductStopline/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 选择（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsProductStopline/Index.vue",
  "dataSchema": {
    "columns": [
      "STOPLINE_MODE",
      "STOP_OPERATION_CODE",
      "ALARM_CRITERIA",
      "STOP_CRITERIA",
      "DIVISION_CRITERIA",
      "DIVISION_START",
      "DIVISION_UNIT",
      "ALARM_INTERVAL",
      "ENABLED",
      "part_no",
      "route_id"
    ],
    "required": [
      "STOPLINE_MODE",
      "STOP_OPERATION_CODE",
      "ALARM_CRITERIA",
      "STOP_CRITERIA",
      "DIVISION_CRITERIA",
      "DIVISION_START",
      "ALARM_INTERVAL",
      "part_no",
      "route_id"
    ],
    "fields": [
      {
        "key": "STOPLINE_MODE",
        "label": "停线管控模式",
        "required": true
      },
      {
        "key": "STOP_OPERATION_CODE",
        "label": "停线管控工序",
        "required": true
      },
      {
        "key": "ALARM_CRITERIA",
        "label": "警告标准",
        "required": true
      },
      {
        "key": "STOP_CRITERIA",
        "label": "停线标准",
        "required": true
      },
      {
        "key": "DIVISION_CRITERIA",
        "label": "分割标准",
        "required": true
      },
      {
        "key": "DIVISION_START",
        "label": "开始计算切入点",
        "required": true
      },
      {
        "key": "DIVISION_UNIT",
        "label": "单位",
        "required": false
      },
      {
        "key": "ALARM_INTERVAL",
        "label": "警报间隔",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "part_no",
        "label": "料号",
        "required": true
      },
      {
        "key": "route_id",
        "label": "制程",
        "required": true
      }
    ],
    "example": {
      "STOPLINE_MODE": "停线管控模式测试值",
      "STOP_OPERATION_CODE": "停线管控工序测试值",
      "ALARM_CRITERIA": "警告标准测试值",
      "STOP_CRITERIA": "停线标准测试值",
      "DIVISION_CRITERIA": "分割标准测试值",
      "DIVISION_START": "开始计算切入点测试值",
      "DIVISION_UNIT": "单位测试值",
      "ALARM_INTERVAL": "警报间隔测试值",
      "ENABLED": "是否激活测试值",
      "part_no": "AT-001",
      "route_id": "制程测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-8be5f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "createData",
      "permission": "SfcsProductStoplineSave",
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
          "key": "STOPLINE_MODE",
          "label": "停线管控模式",
          "required": true,
          "example": "停线管控模式测试值"
        },
        {
          "key": "STOP_OPERATION_CODE",
          "label": "停线管控工序",
          "required": true,
          "example": "停线管控工序测试值"
        },
        {
          "key": "ALARM_CRITERIA",
          "label": "警告标准",
          "required": true,
          "example": "警告标准测试值"
        },
        {
          "key": "STOP_CRITERIA",
          "label": "停线标准",
          "required": true,
          "example": "停线标准测试值"
        },
        {
          "key": "DIVISION_CRITERIA",
          "label": "分割标准",
          "required": true,
          "example": "分割标准测试值"
        },
        {
          "key": "DIVISION_START",
          "label": "开始计算切入点",
          "required": true,
          "example": "开始计算切入点测试值"
        },
        {
          "key": "DIVISION_UNIT",
          "label": "单位",
          "required": false,
          "example": "单位测试值"
        },
        {
          "key": "ALARM_INTERVAL",
          "label": "警报间隔",
          "required": true,
          "example": "警报间隔测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "route_id",
          "label": "制程",
          "required": true,
          "example": "制程测试值"
        }
      ],
      "testData": {
        "STOPLINE_MODE": "停线管控模式测试值",
        "STOP_OPERATION_CODE": "停线管控工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "STOP_CRITERIA": "停线标准测试值",
        "DIVISION_CRITERIA": "分割标准测试值",
        "DIVISION_START": "开始计算切入点测试值",
        "DIVISION_UNIT": "单位测试值",
        "ALARM_INTERVAL": "警报间隔测试值",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_id": "制程测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-cff74",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editRow(row)",
      "permission": "SfcsProductStoplineedit",
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
          "key": "STOPLINE_MODE",
          "label": "停线管控模式",
          "required": true,
          "example": "停线管控模式测试值"
        },
        {
          "key": "STOP_OPERATION_CODE",
          "label": "停线管控工序",
          "required": true,
          "example": "停线管控工序测试值"
        },
        {
          "key": "ALARM_CRITERIA",
          "label": "警告标准",
          "required": true,
          "example": "警告标准测试值"
        },
        {
          "key": "STOP_CRITERIA",
          "label": "停线标准",
          "required": true,
          "example": "停线标准测试值"
        },
        {
          "key": "DIVISION_CRITERIA",
          "label": "分割标准",
          "required": true,
          "example": "分割标准测试值"
        },
        {
          "key": "DIVISION_START",
          "label": "开始计算切入点",
          "required": true,
          "example": "开始计算切入点测试值"
        },
        {
          "key": "DIVISION_UNIT",
          "label": "单位",
          "required": false,
          "example": "单位测试值"
        },
        {
          "key": "ALARM_INTERVAL",
          "label": "警报间隔",
          "required": true,
          "example": "警报间隔测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "route_id",
          "label": "制程",
          "required": true,
          "example": "制程测试值"
        }
      ],
      "testData": {
        "STOPLINE_MODE": "停线管控模式测试值",
        "STOP_OPERATION_CODE": "停线管控工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "STOP_CRITERIA": "停线标准测试值",
        "DIVISION_CRITERIA": "分割标准测试值",
        "DIVISION_START": "开始计算切入点测试值",
        "DIVISION_UNIT": "单位测试值",
        "ALARM_INTERVAL": "警报间隔测试值",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_id": "制程测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SfcsProductStoplinedelete",
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
