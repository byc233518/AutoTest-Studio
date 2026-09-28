// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-produce-plan2-index-64ba0f",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/SmtProducePlan2/Index",
  "sourceRoute": "/iMES/SmtProducePlan2/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtProducePlan2/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "ORDER_QUANTITY",
      "MOVEMENT",
      "DESCRIPTION",
      "PLAN_TYPE",
      "LINE_ID",
      "NATIONALITY",
      "STANDARD_WORKING_TIME",
      "PLAN_DATE_BEGIN",
      "START_DATE",
      "SITE_OPERATION_ID",
      "OPERATION_NAME"
    ],
    "required": [
      "WO_NO",
      "ORDER_QUANTITY",
      "LINE_ID",
      "START_DATE",
      "SITE_OPERATION_ID"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "ORDER_QUANTITY",
        "label": "订单量",
        "required": true
      },
      {
        "key": "MOVEMENT",
        "label": "料号",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "规格",
        "required": false
      },
      {
        "key": "PLAN_TYPE",
        "label": "线体类型",
        "required": false
      },
      {
        "key": "LINE_ID",
        "label": "线体名称",
        "required": true
      },
      {
        "key": "NATIONALITY",
        "label": "国家",
        "required": false
      },
      {
        "key": "STANDARD_WORKING_TIME",
        "label": "标工产能",
        "required": false
      },
      {
        "key": "PLAN_DATE_BEGIN",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "START_DATE",
        "label": "时间",
        "required": true
      },
      {
        "key": "SITE_OPERATION_ID",
        "label": "工序名称",
        "required": true
      },
      {
        "key": "OPERATION_NAME",
        "label": "工序名称",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "ORDER_QUANTITY": "订单量测试值",
      "MOVEMENT": "AT-001",
      "DESCRIPTION": "规格测试值",
      "PLAN_TYPE": "线体类型测试值",
      "LINE_ID": "自动化样例001",
      "NATIONALITY": "国家测试值",
      "STANDARD_WORKING_TIME": "标工产能测试值",
      "PLAN_DATE_BEGIN": "2026-08-01",
      "START_DATE": "2026-08-01",
      "SITE_OPERATION_ID": "自动化样例001",
      "OPERATION_NAME": "自动化样例001"
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
        "ORDER_QUANTITY": "订单量测试值",
        "MOVEMENT": "AT-001",
        "DESCRIPTION": "规格测试值",
        "PLAN_TYPE": "线体类型测试值",
        "LINE_ID": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "STANDARD_WORKING_TIME": "标工产能测试值",
        "PLAN_DATE_BEGIN": "2026-08-01",
        "START_DATE": "2026-08-01",
        "SITE_OPERATION_ID": "自动化样例001",
        "OPERATION_NAME": "自动化样例001"
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
          "key": "ORDER_QUANTITY",
          "label": "订单量",
          "required": true,
          "example": "订单量测试值"
        },
        {
          "key": "MOVEMENT",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "PLAN_TYPE",
          "label": "线体类型",
          "required": false,
          "example": "线体类型测试值"
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
          "required": false,
          "example": "国家测试值"
        },
        {
          "key": "STANDARD_WORKING_TIME",
          "label": "标工产能",
          "required": false,
          "example": "标工产能测试值"
        },
        {
          "key": "PLAN_DATE_BEGIN",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "START_DATE",
          "label": "时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "SITE_OPERATION_ID",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "ORDER_QUANTITY": "订单量测试值",
        "MOVEMENT": "AT-001",
        "DESCRIPTION": "规格测试值",
        "PLAN_TYPE": "线体类型测试值",
        "LINE_ID": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "STANDARD_WORKING_TIME": "标工产能测试值",
        "PLAN_DATE_BEGIN": "2026-08-01",
        "START_DATE": "2026-08-01",
        "SITE_OPERATION_ID": "自动化样例001",
        "OPERATION_NAME": "自动化样例001"
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
          "key": "ORDER_QUANTITY",
          "label": "订单量",
          "required": true,
          "example": "订单量测试值"
        },
        {
          "key": "MOVEMENT",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "PLAN_TYPE",
          "label": "线体类型",
          "required": false,
          "example": "线体类型测试值"
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
          "required": false,
          "example": "国家测试值"
        },
        {
          "key": "STANDARD_WORKING_TIME",
          "label": "标工产能",
          "required": false,
          "example": "标工产能测试值"
        },
        {
          "key": "PLAN_DATE_BEGIN",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "START_DATE",
          "label": "时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "SITE_OPERATION_ID",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "ORDER_QUANTITY": "订单量测试值",
        "MOVEMENT": "AT-001",
        "DESCRIPTION": "规格测试值",
        "PLAN_TYPE": "线体类型测试值",
        "LINE_ID": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "STANDARD_WORKING_TIME": "标工产能测试值",
        "PLAN_DATE_BEGIN": "2026-08-01",
        "START_DATE": "2026-08-01",
        "SITE_OPERATION_ID": "自动化样例001",
        "OPERATION_NAME": "自动化样例001"
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
      "key": "5f1787916c-14b1962ec3-14b19",
      "type": "导入入口",
      "name": "批量导入业务入口校验",
      "label": "批量导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击批量导入",
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
      "key": "ef879b4ced-4cccae178a-36172",
      "type": "导出入口",
      "name": "数据导出业务入口校验",
      "label": "数据导出",
      "handler": "exportDataEvent",
      "permission": "ExportPlanDataToExcel",
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
    },
    {
      "key": "5f1787916c-a939e0cddc-a939e",
      "type": "导入入口",
      "name": "导入模板业务入口校验",
      "label": "导入模板",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入模板",
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
      "key": "ef879b4ced-89e0ac4a10-8d139",
      "type": "导出入口",
      "name": "模板导出业务入口校验",
      "label": "模板导出",
      "handler": "exportTmp(0)",
      "permission": "ExportTPL",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击模板导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
