// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-plan-index-9af482",
  "name": "旧版制造执行 - 计划开拉日期（未配置菜单）功能校验",
  "displayName": "计划开拉日期（未配置菜单）",
  "route": "/iMES/MesPlan/Index",
  "sourceRoute": "/iMES/MesPlan/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 计划开拉日期（未配置菜单）",
  "sourceFile": "src/views/iMES/MesPlan/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_IDS",
      "PHYSICAL_LOCATION",
      "WO_NO",
      "startDateRange",
      "STATUS"
    ],
    "required": [
      "LINE_IDS",
      "PHYSICAL_LOCATION"
    ],
    "fields": [
      {
        "key": "LINE_IDS",
        "label": "线体",
        "required": true
      },
      {
        "key": "PHYSICAL_LOCATION",
        "label": "车间",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "订单号",
        "required": false
      },
      {
        "key": "startDateRange",
        "label": "计划开拉日期",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "LINE_IDS": "线体测试值",
      "PHYSICAL_LOCATION": "车间测试值",
      "WO_NO": "AT-001",
      "startDateRange": "2026-08-01",
      "STATUS": "Y"
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
        "LINE_IDS": "线体测试值",
        "PHYSICAL_LOCATION": "车间测试值",
        "WO_NO": "AT-001",
        "startDateRange": "2026-08-01",
        "STATUS": "Y"
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
      "key": "4aa22a22ac-26107529c1-26107",
      "type": "编辑表单",
      "name": "批量修改线体业务入口校验",
      "label": "批量修改线体",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量修改线体",
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
          "key": "LINE_IDS",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "PHYSICAL_LOCATION",
          "label": "车间",
          "required": true,
          "example": "车间测试值"
        },
        {
          "key": "WO_NO",
          "label": "订单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "startDateRange",
          "label": "计划开拉日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "LINE_IDS": "线体测试值",
        "PHYSICAL_LOCATION": "车间测试值",
        "WO_NO": "AT-001",
        "startDateRange": "2026-08-01",
        "STATUS": "Y"
      }
    },
    {
      "key": "4aa22a22ac-3c794aad22-5d533",
      "type": "编辑表单",
      "name": "批量修改完成日期业务入口校验",
      "label": "批量修改完成日期",
      "handler": "openMstFormDialog(['PLAND_END_TIME'])",
      "permission": "",
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
          "key": "LINE_IDS",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "PHYSICAL_LOCATION",
          "label": "车间",
          "required": true,
          "example": "车间测试值"
        },
        {
          "key": "WO_NO",
          "label": "订单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "startDateRange",
          "label": "计划开拉日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "LINE_IDS": "线体测试值",
        "PHYSICAL_LOCATION": "车间测试值",
        "WO_NO": "AT-001",
        "startDateRange": "2026-08-01",
        "STATUS": "Y"
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
      "permission": "",
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
      "permission": "",
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
          "key": "LINE_IDS",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "PHYSICAL_LOCATION",
          "label": "车间",
          "required": true,
          "example": "车间测试值"
        },
        {
          "key": "WO_NO",
          "label": "订单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "startDateRange",
          "label": "计划开拉日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "LINE_IDS": "线体测试值",
        "PHYSICAL_LOCATION": "车间测试值",
        "WO_NO": "AT-001",
        "startDateRange": "2026-08-01",
        "STATUS": "Y"
      }
    },
    {
      "key": "5f1787916c-4d42a46878-4d42a",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-8bf52524d7-56093",
      "type": "导出入口",
      "name": "导出模板业务入口校验",
      "label": "导出模板",
      "handler": "handleExportTpl",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
