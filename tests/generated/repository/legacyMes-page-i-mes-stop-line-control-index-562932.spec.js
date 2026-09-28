// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-stop-line-control-index-562932",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/StopLineControl/Index",
  "sourceRoute": "/iMES/StopLineControl/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/StopLineControl/Index.vue",
  "dataSchema": {
    "columns": [
      "STOPLINE_MODE",
      "STOP_OPERATION_ID",
      "ALARM_CRITERIA",
      "STOP_CRITERIA",
      "DIVISION_CRITERIA",
      "DIVISION_START",
      "ALARM_INTERVAL",
      "DIVISION_UNIT",
      "ENABLED",
      "CALL_CATEGORY_CODE",
      "CALL_TYPE_CODE",
      "CALL_TITLE",
      "CALL_CODE",
      "DESCRIPTION",
      "LINE_TYPE",
      "ORGANIZE_ID",
      "PART_NO"
    ],
    "required": [
      "STOPLINE_MODE",
      "STOP_OPERATION_ID",
      "ALARM_CRITERIA",
      "STOP_CRITERIA",
      "DIVISION_CRITERIA",
      "DIVISION_START",
      "ALARM_INTERVAL",
      "CALL_CATEGORY_CODE",
      "CALL_TYPE_CODE",
      "CALL_TITLE"
    ],
    "fields": [
      {
        "key": "STOPLINE_MODE",
        "label": "停线管控模式",
        "required": true
      },
      {
        "key": "STOP_OPERATION_ID",
        "label": "管控工序",
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
        "key": "ALARM_INTERVAL",
        "label": "警告间隔(PCS)",
        "required": true
      },
      {
        "key": "DIVISION_UNIT",
        "label": "单位",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否有效",
        "required": false
      },
      {
        "key": "CALL_CATEGORY_CODE",
        "label": "异常种类",
        "required": true
      },
      {
        "key": "CALL_TYPE_CODE",
        "label": "异常类型",
        "required": true
      },
      {
        "key": "CALL_TITLE",
        "label": "异常标题",
        "required": true
      },
      {
        "key": "CALL_CODE",
        "label": "异常代码",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "模板内容",
        "required": false
      },
      {
        "key": "LINE_TYPE",
        "label": "线体类别",
        "required": false
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "产品料号",
        "required": false
      }
    ],
    "example": {
      "STOPLINE_MODE": "停线管控模式测试值",
      "STOP_OPERATION_ID": "管控工序测试值",
      "ALARM_CRITERIA": "警告标准测试值",
      "STOP_CRITERIA": "停线标准测试值",
      "DIVISION_CRITERIA": "分割标准测试值",
      "DIVISION_START": "开始计算切入点测试值",
      "ALARM_INTERVAL": "警告间隔(PCS)测试值",
      "DIVISION_UNIT": "单位测试值",
      "ENABLED": "Y",
      "CALL_CATEGORY_CODE": "异常种类测试值",
      "CALL_TYPE_CODE": "异常类型测试值",
      "CALL_TITLE": "异常标题测试值",
      "CALL_CODE": "异常代码测试值",
      "DESCRIPTION": "模板内容测试值",
      "LINE_TYPE": "线体类别测试值",
      "ORGANIZE_ID": "组织架构测试值",
      "PART_NO": "AT-001"
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
        "MstSearch",
        "ControlLineSearch",
        "ContProdSearch"
      ],
      "testData": {
        "STOPLINE_MODE": "停线管控模式测试值",
        "STOP_OPERATION_ID": "管控工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "STOP_CRITERIA": "停线标准测试值",
        "DIVISION_CRITERIA": "分割标准测试值",
        "DIVISION_START": "开始计算切入点测试值",
        "ALARM_INTERVAL": "警告间隔(PCS)测试值",
        "DIVISION_UNIT": "单位测试值",
        "ENABLED": "Y",
        "CALL_CATEGORY_CODE": "异常种类测试值",
        "CALL_TYPE_CODE": "异常类型测试值",
        "CALL_TITLE": "异常标题测试值",
        "CALL_CODE": "异常代码测试值",
        "DESCRIPTION": "模板内容测试值",
        "LINE_TYPE": "线体类别测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "PART_NO": "AT-001"
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
      "key": "13fd57e65b-2cd9e6ce81-2f1ff",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "MstAdd",
      "permission": "StopLineControlAdd",
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
          "key": "STOP_OPERATION_ID",
          "label": "管控工序",
          "required": true,
          "example": "管控工序测试值"
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
          "key": "ALARM_INTERVAL",
          "label": "警告间隔(PCS)",
          "required": true,
          "example": "警告间隔(PCS)测试值"
        },
        {
          "key": "DIVISION_UNIT",
          "label": "单位",
          "required": false,
          "example": "单位测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CALL_CATEGORY_CODE",
          "label": "异常种类",
          "required": true,
          "example": "异常种类测试值"
        },
        {
          "key": "CALL_TYPE_CODE",
          "label": "异常类型",
          "required": true,
          "example": "异常类型测试值"
        },
        {
          "key": "CALL_TITLE",
          "label": "异常标题",
          "required": true,
          "example": "异常标题测试值"
        },
        {
          "key": "CALL_CODE",
          "label": "异常代码",
          "required": false,
          "example": "异常代码测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "模板内容",
          "required": false,
          "example": "模板内容测试值"
        },
        {
          "key": "LINE_TYPE",
          "label": "线体类别",
          "required": false,
          "example": "线体类别测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": false,
          "example": "组织架构测试值"
        },
        {
          "key": "PART_NO",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "STOPLINE_MODE": "停线管控模式测试值",
        "STOP_OPERATION_ID": "管控工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "STOP_CRITERIA": "停线标准测试值",
        "DIVISION_CRITERIA": "分割标准测试值",
        "DIVISION_START": "开始计算切入点测试值",
        "ALARM_INTERVAL": "警告间隔(PCS)测试值",
        "DIVISION_UNIT": "单位测试值",
        "ENABLED": "Y",
        "CALL_CATEGORY_CODE": "异常种类测试值",
        "CALL_TYPE_CODE": "异常类型测试值",
        "CALL_TITLE": "异常标题测试值",
        "CALL_CODE": "异常代码测试值",
        "DESCRIPTION": "模板内容测试值",
        "LINE_TYPE": "线体类别测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "PART_NO": "AT-001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-9f94a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "MSTeditClick(row)",
      "permission": "StopLineControlEdit",
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
          "key": "STOP_OPERATION_ID",
          "label": "管控工序",
          "required": true,
          "example": "管控工序测试值"
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
          "key": "ALARM_INTERVAL",
          "label": "警告间隔(PCS)",
          "required": true,
          "example": "警告间隔(PCS)测试值"
        },
        {
          "key": "DIVISION_UNIT",
          "label": "单位",
          "required": false,
          "example": "单位测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CALL_CATEGORY_CODE",
          "label": "异常种类",
          "required": true,
          "example": "异常种类测试值"
        },
        {
          "key": "CALL_TYPE_CODE",
          "label": "异常类型",
          "required": true,
          "example": "异常类型测试值"
        },
        {
          "key": "CALL_TITLE",
          "label": "异常标题",
          "required": true,
          "example": "异常标题测试值"
        },
        {
          "key": "CALL_CODE",
          "label": "异常代码",
          "required": false,
          "example": "异常代码测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "模板内容",
          "required": false,
          "example": "模板内容测试值"
        },
        {
          "key": "LINE_TYPE",
          "label": "线体类别",
          "required": false,
          "example": "线体类别测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": false,
          "example": "组织架构测试值"
        },
        {
          "key": "PART_NO",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "STOPLINE_MODE": "停线管控模式测试值",
        "STOP_OPERATION_ID": "管控工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "STOP_CRITERIA": "停线标准测试值",
        "DIVISION_CRITERIA": "分割标准测试值",
        "DIVISION_START": "开始计算切入点测试值",
        "ALARM_INTERVAL": "警告间隔(PCS)测试值",
        "DIVISION_UNIT": "单位测试值",
        "ENABLED": "Y",
        "CALL_CATEGORY_CODE": "异常种类测试值",
        "CALL_TYPE_CODE": "异常类型测试值",
        "CALL_TITLE": "异常标题测试值",
        "CALL_CODE": "异常代码测试值",
        "DESCRIPTION": "模板内容测试值",
        "LINE_TYPE": "线体类别测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "PART_NO": "AT-001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-38c9d",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "MSTdeleteClick(row)",
      "permission": "StopLineControldelete",
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
