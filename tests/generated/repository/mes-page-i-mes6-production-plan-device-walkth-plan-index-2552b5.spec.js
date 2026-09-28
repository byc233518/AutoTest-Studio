// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-production-plan-device-walkth-plan-index-2552b5",
  "name": "制造执行 - 设备任务单计划功能校验",
  "displayName": "设备任务单计划",
  "route": "/iMES6/ProductionPlan/DeviceWalkthPlan/Index",
  "sourceRoute": "/iMES6/ProductionPlan/DeviceWalkthPlan/Index",
  "menuCode": "DeviceWalkthPlan",
  "breadcrumb": "生产管理 / 生产计划 / 设备任务单计划",
  "sourceFile": "src/views/iMES6/ProductionPlan/DeviceWalkthPlan/Index.vue",
  "dataSchema": {
    "columns": [
      "LineListName",
      "WorkShopName",
      "WoNo",
      "PartNo",
      "startDateRange"
    ],
    "required": [
      "LineListName",
      "WorkShopName"
    ],
    "fields": [
      {
        "key": "LineListName",
        "label": "区域",
        "required": true
      },
      {
        "key": "WorkShopName",
        "label": "车间",
        "required": true
      },
      {
        "key": "WoNo",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "startDateRange",
        "label": "计划开始日期",
        "required": false
      }
    ],
    "example": {
      "LineListName": "区域测试值",
      "WorkShopName": "车间测试值",
      "WoNo": "AT-001",
      "PartNo": "AT-001",
      "startDateRange": "2026-08-01"
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
        "LineListName": "区域测试值",
        "WorkShopName": "车间测试值",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "startDateRange": "2026-08-01"
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
      "key": "4aa22a22ac-e797121c86-e7971",
      "type": "编辑表单",
      "name": "批量修改区域业务入口校验",
      "label": "批量修改区域",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量修改区域",
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
          "key": "LineListName",
          "label": "区域",
          "required": true,
          "example": "区域测试值"
        },
        {
          "key": "WorkShopName",
          "label": "车间",
          "required": true,
          "example": "车间测试值"
        },
        {
          "key": "WoNo",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "startDateRange",
          "label": "计划开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "LineListName": "区域测试值",
        "WorkShopName": "车间测试值",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "startDateRange": "2026-08-01"
      }
    },
    {
      "key": "4aa22a22ac-3c794aad22-c93d7",
      "type": "编辑表单",
      "name": "批量修改完成日期业务入口校验",
      "label": "批量修改完成日期",
      "handler": "openMstFormDialog(['PlandEndTime'])",
      "permission": "BatchSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量修改完成日期",
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
          "key": "LineListName",
          "label": "区域",
          "required": true,
          "example": "区域测试值"
        },
        {
          "key": "WorkShopName",
          "label": "车间",
          "required": true,
          "example": "车间测试值"
        },
        {
          "key": "WoNo",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "startDateRange",
          "label": "计划开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "LineListName": "区域测试值",
        "WorkShopName": "车间测试值",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "startDateRange": "2026-08-01"
      }
    },
    {
      "key": "7e002f9936-c907e93643-c907e",
      "type": "业务动作",
      "name": "按完成日重排业务入口校验",
      "label": "按完成日重排",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位按完成日重排",
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
      "key": "7e002f9936-042577e97a-4823f",
      "type": "业务动作",
      "name": "取消排程业务入口校验",
      "label": "取消排程",
      "handler": "cancelWoPlan",
      "permission": "BatchDelete",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消排程",
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
      "key": "4aa22a22ac-21b7075eda-bad19",
      "type": "编辑表单",
      "name": "修改计划业务入口校验",
      "label": "修改计划",
      "handler": "openPlanDateEditor",
      "permission": "ReBuildLinePlanByOrder",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击修改计划",
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
          "key": "LineListName",
          "label": "区域",
          "required": true,
          "example": "区域测试值"
        },
        {
          "key": "WorkShopName",
          "label": "车间",
          "required": true,
          "example": "车间测试值"
        },
        {
          "key": "WoNo",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "startDateRange",
          "label": "计划开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "LineListName": "区域测试值",
        "WorkShopName": "车间测试值",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "startDateRange": "2026-08-01"
      }
    }
  ]
});
