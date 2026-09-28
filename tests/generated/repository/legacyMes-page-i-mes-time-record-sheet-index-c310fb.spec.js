// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-time-record-sheet-index-c310fb",
  "name": "旧版制造执行 - 创建日期（未配置菜单）功能校验",
  "displayName": "创建日期（未配置菜单）",
  "route": "/iMES/TimeRecordSheet/Index",
  "sourceRoute": "/iMES/TimeRecordSheet/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 创建日期（未配置菜单）",
  "sourceFile": "src/views/iMES/TimeRecordSheet/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "WORK_TIME_TYPE",
      "OPERATION_NAME",
      "WOR_TIME",
      "MA_WOR_TIME",
      "PRE_TIME",
      "MA_PRE_TIME",
      "OTHER_TIME",
      "CREATOR",
      "date"
    ],
    "required": [
      "WO_NO",
      "WORK_TIME_TYPE",
      "OPERATION_NAME"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单",
        "required": true
      },
      {
        "key": "WORK_TIME_TYPE",
        "label": "工时类型",
        "required": true
      },
      {
        "key": "OPERATION_NAME",
        "label": "工序",
        "required": true
      },
      {
        "key": "WOR_TIME",
        "label": "人工加工工时(H)",
        "required": false
      },
      {
        "key": "MA_WOR_TIME",
        "label": "机器加工工时(H)",
        "required": false
      },
      {
        "key": "PRE_TIME",
        "label": "人工准备工时(H)",
        "required": false
      },
      {
        "key": "MA_PRE_TIME",
        "label": "机器准备工时(H)",
        "required": false
      },
      {
        "key": "OTHER_TIME",
        "label": "空闲工时(H)",
        "required": false
      },
      {
        "key": "CREATOR",
        "label": "创建人",
        "required": false
      },
      {
        "key": "date",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "工单测试值",
      "WORK_TIME_TYPE": "工时类型测试值",
      "OPERATION_NAME": "工序测试值",
      "WOR_TIME": "人工加工工时(H)测试值",
      "MA_WOR_TIME": "机器加工工时(H)测试值",
      "PRE_TIME": "人工准备工时(H)测试值",
      "MA_PRE_TIME": "机器准备工时(H)测试值",
      "OTHER_TIME": "空闲工时(H)测试值",
      "CREATOR": "创建人测试值",
      "date": "2026-08-01"
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
        "WO_NO": "工单测试值",
        "WORK_TIME_TYPE": "工时类型测试值",
        "OPERATION_NAME": "工序测试值",
        "WOR_TIME": "人工加工工时(H)测试值",
        "MA_WOR_TIME": "机器加工工时(H)测试值",
        "PRE_TIME": "人工准备工时(H)测试值",
        "MA_PRE_TIME": "机器准备工时(H)测试值",
        "OTHER_TIME": "空闲工时(H)测试值",
        "CREATOR": "创建人测试值",
        "date": "2026-08-01"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
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
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "WORK_TIME_TYPE",
          "label": "工时类型",
          "required": true,
          "example": "工时类型测试值"
        },
        {
          "key": "OPERATION_NAME",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "WOR_TIME",
          "label": "人工加工工时(H)",
          "required": false,
          "example": "人工加工工时(H)测试值"
        },
        {
          "key": "MA_WOR_TIME",
          "label": "机器加工工时(H)",
          "required": false,
          "example": "机器加工工时(H)测试值"
        },
        {
          "key": "PRE_TIME",
          "label": "人工准备工时(H)",
          "required": false,
          "example": "人工准备工时(H)测试值"
        },
        {
          "key": "MA_PRE_TIME",
          "label": "机器准备工时(H)",
          "required": false,
          "example": "机器准备工时(H)测试值"
        },
        {
          "key": "OTHER_TIME",
          "label": "空闲工时(H)",
          "required": false,
          "example": "空闲工时(H)测试值"
        },
        {
          "key": "CREATOR",
          "label": "创建人",
          "required": false,
          "example": "创建人测试值"
        },
        {
          "key": "date",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "WO_NO": "工单测试值",
        "WORK_TIME_TYPE": "工时类型测试值",
        "OPERATION_NAME": "工序测试值",
        "WOR_TIME": "人工加工工时(H)测试值",
        "MA_WOR_TIME": "机器加工工时(H)测试值",
        "PRE_TIME": "人工准备工时(H)测试值",
        "MA_PRE_TIME": "机器准备工时(H)测试值",
        "OTHER_TIME": "空闲工时(H)测试值",
        "CREATOR": "创建人测试值",
        "date": "2026-08-01"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "",
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
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "WORK_TIME_TYPE",
          "label": "工时类型",
          "required": true,
          "example": "工时类型测试值"
        },
        {
          "key": "OPERATION_NAME",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "WOR_TIME",
          "label": "人工加工工时(H)",
          "required": false,
          "example": "人工加工工时(H)测试值"
        },
        {
          "key": "MA_WOR_TIME",
          "label": "机器加工工时(H)",
          "required": false,
          "example": "机器加工工时(H)测试值"
        },
        {
          "key": "PRE_TIME",
          "label": "人工准备工时(H)",
          "required": false,
          "example": "人工准备工时(H)测试值"
        },
        {
          "key": "MA_PRE_TIME",
          "label": "机器准备工时(H)",
          "required": false,
          "example": "机器准备工时(H)测试值"
        },
        {
          "key": "OTHER_TIME",
          "label": "空闲工时(H)",
          "required": false,
          "example": "空闲工时(H)测试值"
        },
        {
          "key": "CREATOR",
          "label": "创建人",
          "required": false,
          "example": "创建人测试值"
        },
        {
          "key": "date",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "WO_NO": "工单测试值",
        "WORK_TIME_TYPE": "工时类型测试值",
        "OPERATION_NAME": "工序测试值",
        "WOR_TIME": "人工加工工时(H)测试值",
        "MA_WOR_TIME": "机器加工工时(H)测试值",
        "PRE_TIME": "人工准备工时(H)测试值",
        "MA_PRE_TIME": "机器准备工时(H)测试值",
        "OTHER_TIME": "空闲工时(H)测试值",
        "CREATOR": "创建人测试值",
        "date": "2026-08-01"
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
