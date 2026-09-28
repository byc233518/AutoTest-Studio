// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-produce-plan-index-eb2231",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/SmtProducePlan/Index",
  "sourceRoute": "/iMES/SmtProducePlan/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtProducePlan/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "DESCRIPTION",
      "LINE_ID",
      "NATIONALITY",
      "PART_NO",
      "CLASS_NO",
      "PLAN_QUANTITY",
      "WORK_HOURS",
      "PASS_QTY",
      "WO_TYPE",
      "LINE_NAME",
      "SPECIFICATIONS",
      "INBOUND_TIME",
      "WORK_PERSON",
      "INBOUND_QTY",
      "FAIL_QTY",
      "OREDER_NO",
      "PickerData",
      "PLAN_DATE"
    ],
    "required": [
      "WO_NO",
      "DESCRIPTION",
      "LINE_ID",
      "NATIONALITY",
      "CLASS_NO",
      "PLAN_QUANTITY",
      "WORK_HOURS",
      "PASS_QTY",
      "WO_TYPE",
      "INBOUND_TIME",
      "WORK_PERSON",
      "INBOUND_QTY",
      "FAIL_QTY",
      "PLAN_DATE"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "备注",
        "required": true
      },
      {
        "key": "LINE_ID",
        "label": "线体名称",
        "required": true
      },
      {
        "key": "NATIONALITY",
        "label": "国家",
        "required": true
      },
      {
        "key": "PART_NO",
        "label": "成品料号",
        "required": false
      },
      {
        "key": "CLASS_NO",
        "label": "班次",
        "required": true
      },
      {
        "key": "PLAN_QUANTITY",
        "label": "计划生产数",
        "required": true
      },
      {
        "key": "WORK_HOURS",
        "label": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`",
        "required": true
      },
      {
        "key": "PASS_QTY",
        "label": "良品数",
        "required": true
      },
      {
        "key": "WO_TYPE",
        "label": "工单类型",
        "required": true
      },
      {
        "key": "LINE_NAME",
        "label": "线体名称",
        "required": false
      },
      {
        "key": "SPECIFICATIONS",
        "label": "规格",
        "required": false
      },
      {
        "key": "INBOUND_TIME",
        "label": "报工日期",
        "required": true
      },
      {
        "key": "WORK_PERSON",
        "label": "投入人数",
        "required": true
      },
      {
        "key": "INBOUND_QTY",
        "label": "报工数量",
        "required": true
      },
      {
        "key": "FAIL_QTY",
        "label": "报废数",
        "required": true
      },
      {
        "key": "OREDER_NO",
        "label": "生产订单",
        "required": false
      },
      {
        "key": "PickerData",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "PLAN_DATE",
        "label": "选择日期时间",
        "required": true
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "DESCRIPTION": "自动化测试备注001",
      "LINE_ID": "自动化样例001",
      "NATIONALITY": "国家测试值",
      "PART_NO": "AT-001",
      "CLASS_NO": "班次测试值",
      "PLAN_QUANTITY": "计划生产数测试值",
      "WORK_HOURS": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`测试值",
      "PASS_QTY": "良品数测试值",
      "WO_TYPE": "工单类型测试值",
      "LINE_NAME": "自动化样例001",
      "SPECIFICATIONS": "规格测试值",
      "INBOUND_TIME": "2026-08-01",
      "WORK_PERSON": "投入人数测试值",
      "INBOUND_QTY": "1",
      "FAIL_QTY": "报废数测试值",
      "OREDER_NO": "生产订单测试值",
      "PickerData": "2026-08-01",
      "PLAN_DATE": "2026-08-01"
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
        "handleSearch"
      ],
      "testData": {
        "WO_NO": "AT-001",
        "DESCRIPTION": "自动化测试备注001",
        "LINE_ID": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "PART_NO": "AT-001",
        "CLASS_NO": "班次测试值",
        "PLAN_QUANTITY": "计划生产数测试值",
        "WORK_HOURS": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`测试值",
        "PASS_QTY": "良品数测试值",
        "WO_TYPE": "工单类型测试值",
        "LINE_NAME": "自动化样例001",
        "SPECIFICATIONS": "规格测试值",
        "INBOUND_TIME": "2026-08-01",
        "WORK_PERSON": "投入人数测试值",
        "INBOUND_QTY": "1",
        "FAIL_QTY": "报废数测试值",
        "OREDER_NO": "生产订单测试值",
        "PickerData": "2026-08-01",
        "PLAN_DATE": "2026-08-01"
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
      "key": "13fd57e65b-2cd9e6ce81-2b973",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "AddClick",
      "permission": "SmtProducePlanAdd",
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
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "LINE_ID",
          "label": "线体名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "NATIONALITY",
          "label": "国家",
          "required": true,
          "example": "国家测试值"
        },
        {
          "key": "PART_NO",
          "label": "成品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CLASS_NO",
          "label": "班次",
          "required": true,
          "example": "班次测试值"
        },
        {
          "key": "PLAN_QUANTITY",
          "label": "计划生产数",
          "required": true,
          "example": "计划生产数测试值"
        },
        {
          "key": "WORK_HOURS",
          "label": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`",
          "required": true,
          "example": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`测试值"
        },
        {
          "key": "PASS_QTY",
          "label": "良品数",
          "required": true,
          "example": "良品数测试值"
        },
        {
          "key": "WO_TYPE",
          "label": "工单类型",
          "required": true,
          "example": "工单类型测试值"
        },
        {
          "key": "LINE_NAME",
          "label": "线体名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "SPECIFICATIONS",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "INBOUND_TIME",
          "label": "报工日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "WORK_PERSON",
          "label": "投入人数",
          "required": true,
          "example": "投入人数测试值"
        },
        {
          "key": "INBOUND_QTY",
          "label": "报工数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "FAIL_QTY",
          "label": "报废数",
          "required": true,
          "example": "报废数测试值"
        },
        {
          "key": "OREDER_NO",
          "label": "生产订单",
          "required": false,
          "example": "生产订单测试值"
        },
        {
          "key": "PickerData",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PLAN_DATE",
          "label": "选择日期时间",
          "required": true,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "DESCRIPTION": "自动化测试备注001",
        "LINE_ID": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "PART_NO": "AT-001",
        "CLASS_NO": "班次测试值",
        "PLAN_QUANTITY": "计划生产数测试值",
        "WORK_HOURS": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`测试值",
        "PASS_QTY": "良品数测试值",
        "WO_TYPE": "工单类型测试值",
        "LINE_NAME": "自动化样例001",
        "SPECIFICATIONS": "规格测试值",
        "INBOUND_TIME": "2026-08-01",
        "WORK_PERSON": "投入人数测试值",
        "INBOUND_QTY": "1",
        "FAIL_QTY": "报废数测试值",
        "OREDER_NO": "生产订单测试值",
        "PickerData": "2026-08-01",
        "PLAN_DATE": "2026-08-01"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-892f2",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick",
      "permission": "SmtProducePlanSave",
      "menuTriggerLabel": "",
      "rowAction": false,
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
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "LINE_ID",
          "label": "线体名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "NATIONALITY",
          "label": "国家",
          "required": true,
          "example": "国家测试值"
        },
        {
          "key": "PART_NO",
          "label": "成品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CLASS_NO",
          "label": "班次",
          "required": true,
          "example": "班次测试值"
        },
        {
          "key": "PLAN_QUANTITY",
          "label": "计划生产数",
          "required": true,
          "example": "计划生产数测试值"
        },
        {
          "key": "WORK_HOURS",
          "label": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`",
          "required": true,
          "example": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`测试值"
        },
        {
          "key": "PASS_QTY",
          "label": "良品数",
          "required": true,
          "example": "良品数测试值"
        },
        {
          "key": "WO_TYPE",
          "label": "工单类型",
          "required": true,
          "example": "工单类型测试值"
        },
        {
          "key": "LINE_NAME",
          "label": "线体名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "SPECIFICATIONS",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "INBOUND_TIME",
          "label": "报工日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "WORK_PERSON",
          "label": "投入人数",
          "required": true,
          "example": "投入人数测试值"
        },
        {
          "key": "INBOUND_QTY",
          "label": "报工数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "FAIL_QTY",
          "label": "报废数",
          "required": true,
          "example": "报废数测试值"
        },
        {
          "key": "OREDER_NO",
          "label": "生产订单",
          "required": false,
          "example": "生产订单测试值"
        },
        {
          "key": "PickerData",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PLAN_DATE",
          "label": "选择日期时间",
          "required": true,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "DESCRIPTION": "自动化测试备注001",
        "LINE_ID": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "PART_NO": "AT-001",
        "CLASS_NO": "班次测试值",
        "PLAN_QUANTITY": "计划生产数测试值",
        "WORK_HOURS": "`投入工时/小时(MAX:${WorkHoursForm.WORK_HOURS})`测试值",
        "PASS_QTY": "良品数测试值",
        "WO_TYPE": "工单类型测试值",
        "LINE_NAME": "自动化样例001",
        "SPECIFICATIONS": "规格测试值",
        "INBOUND_TIME": "2026-08-01",
        "WORK_PERSON": "投入人数测试值",
        "INBOUND_QTY": "1",
        "FAIL_QTY": "报废数测试值",
        "OREDER_NO": "生产订单测试值",
        "PickerData": "2026-08-01",
        "PLAN_DATE": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-eb037",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "RemoveClick",
      "permission": "SmtProducePlandelete",
      "menuTriggerLabel": "",
      "rowAction": false,
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
    },
    {
      "key": "5f1787916c-60e2bcad85-60e2b",
      "type": "导入入口",
      "name": "导入业务入口校验",
      "label": "导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入",
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
      "key": "ef879b4ced-4cccae178a-674a6",
      "type": "导出入口",
      "name": "数据导出业务入口校验",
      "label": "数据导出",
      "handler": "exportAllData",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击数据导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
