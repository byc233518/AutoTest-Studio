// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-product-scrap-mst-index-6db05e",
  "name": "旧版制造执行 - 序列号（未配置菜单）功能校验",
  "displayName": "序列号（未配置菜单）",
  "route": "/iMES/SfcsProductScrapMst/Index",
  "sourceRoute": "/iMES/SfcsProductScrapMst/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 序列号（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsProductScrapMst/Index.vue",
  "dataSchema": {
    "columns": [
      "MANAGE_TYPE",
      "LINE_ID",
      "SITE_ID",
      "MSG",
      "SN",
      "WO_NO",
      "PART_NO",
      "PART_NAME",
      "WIP_OPERATION",
      "PROCESS_QTY",
      "SCRAP_QTY",
      "PRODUCE_ORGANIZE",
      "WAREHOUSE",
      "STATUS",
      "DOC_NO",
      "APPLY_NO",
      "datarange"
    ],
    "required": [
      "MANAGE_TYPE",
      "LINE_ID",
      "SITE_ID",
      "MSG",
      "PRODUCE_ORGANIZE",
      "WAREHOUSE"
    ],
    "fields": [
      {
        "key": "MANAGE_TYPE",
        "label": "管控类型",
        "required": true
      },
      {
        "key": "LINE_ID",
        "label": "线别",
        "required": true
      },
      {
        "key": "SITE_ID",
        "label": "报废地点",
        "required": true
      },
      {
        "key": "MSG",
        "label": "报废原因",
        "required": true
      },
      {
        "key": "SN",
        "label": "产品条码",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "规格",
        "required": false
      },
      {
        "key": "WIP_OPERATION",
        "label": "在制工序",
        "required": false
      },
      {
        "key": "PROCESS_QTY",
        "label": "在制数",
        "required": false
      },
      {
        "key": "SCRAP_QTY",
        "label": "报废数",
        "required": false
      },
      {
        "key": "PRODUCE_ORGANIZE",
        "label": "组织",
        "required": true
      },
      {
        "key": "WAREHOUSE",
        "label": "入库仓库",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "DOC_NO",
        "label": "报废单号",
        "required": false
      },
      {
        "key": "APPLY_NO",
        "label": "入库申请单",
        "required": false
      },
      {
        "key": "datarange",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "MANAGE_TYPE": "管控类型测试值",
      "LINE_ID": "线别测试值",
      "SITE_ID": "报废地点测试值",
      "MSG": "报废原因测试值",
      "SN": "AT-001",
      "WO_NO": "AT-001",
      "PART_NO": "AT-001",
      "PART_NAME": "规格测试值",
      "WIP_OPERATION": "在制工序测试值",
      "PROCESS_QTY": "在制数测试值",
      "SCRAP_QTY": "报废数测试值",
      "PRODUCE_ORGANIZE": "组织测试值",
      "WAREHOUSE": "入库仓库测试值",
      "STATUS": "Y",
      "DOC_NO": "AT-001",
      "APPLY_NO": "入库申请单测试值",
      "datarange": "2026-08-01"
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
        "MstSearch"
      ],
      "testData": {
        "MANAGE_TYPE": "管控类型测试值",
        "LINE_ID": "线别测试值",
        "SITE_ID": "报废地点测试值",
        "MSG": "报废原因测试值",
        "SN": "AT-001",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "PART_NAME": "规格测试值",
        "WIP_OPERATION": "在制工序测试值",
        "PROCESS_QTY": "在制数测试值",
        "SCRAP_QTY": "报废数测试值",
        "PRODUCE_ORGANIZE": "组织测试值",
        "WAREHOUSE": "入库仓库测试值",
        "STATUS": "Y",
        "DOC_NO": "AT-001",
        "APPLY_NO": "入库申请单测试值",
        "datarange": "2026-08-01"
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
      "permission": "SfcsProductScrapMstSaveData",
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
          "key": "MANAGE_TYPE",
          "label": "管控类型",
          "required": true,
          "example": "管控类型测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": true,
          "example": "线别测试值"
        },
        {
          "key": "SITE_ID",
          "label": "报废地点",
          "required": true,
          "example": "报废地点测试值"
        },
        {
          "key": "MSG",
          "label": "报废原因",
          "required": true,
          "example": "报废原因测试值"
        },
        {
          "key": "SN",
          "label": "产品条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "WIP_OPERATION",
          "label": "在制工序",
          "required": false,
          "example": "在制工序测试值"
        },
        {
          "key": "PROCESS_QTY",
          "label": "在制数",
          "required": false,
          "example": "在制数测试值"
        },
        {
          "key": "SCRAP_QTY",
          "label": "报废数",
          "required": false,
          "example": "报废数测试值"
        },
        {
          "key": "PRODUCE_ORGANIZE",
          "label": "组织",
          "required": true,
          "example": "组织测试值"
        },
        {
          "key": "WAREHOUSE",
          "label": "入库仓库",
          "required": true,
          "example": "入库仓库测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "DOC_NO",
          "label": "报废单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "APPLY_NO",
          "label": "入库申请单",
          "required": false,
          "example": "入库申请单测试值"
        },
        {
          "key": "datarange",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "MANAGE_TYPE": "管控类型测试值",
        "LINE_ID": "线别测试值",
        "SITE_ID": "报废地点测试值",
        "MSG": "报废原因测试值",
        "SN": "AT-001",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "PART_NAME": "规格测试值",
        "WIP_OPERATION": "在制工序测试值",
        "PROCESS_QTY": "在制数测试值",
        "SCRAP_QTY": "报废数测试值",
        "PRODUCE_ORGANIZE": "组织测试值",
        "WAREHOUSE": "入库仓库测试值",
        "STATUS": "Y",
        "DOC_NO": "AT-001",
        "APPLY_NO": "入库申请单测试值",
        "datarange": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-c0f80",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "MstDelete",
      "permission": "SfcsProductScrapMstDelete",
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
      "key": "7e002f9936-09cbc97ae2-3fa40",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submit",
      "permission": "SfcsProductScrapMstSubmit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交",
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
      "key": "7e002f9936-fe945e5a0d-6a919",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "showCheck",
      "permission": "SfcsProductScrapMstCheck",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
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
      "key": "7e002f9936-257bd22961-da137",
      "type": "业务动作",
      "name": "取消审核业务入口校验",
      "label": "取消审核",
      "handler": "CancelAudit",
      "permission": "SfcsProductScrapMstUnCheck",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消审核",
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
      "key": "13fd57e65b-b13d6a34ec-c388b",
      "type": "新增表单",
      "name": "创建入库申请业务入口校验",
      "label": "创建入库申请",
      "handler": "showCreateWarehousingApply",
      "permission": "SfcsProductScrapMstCreateWarehousingApply",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击创建入库申请",
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
          "key": "MANAGE_TYPE",
          "label": "管控类型",
          "required": true,
          "example": "管控类型测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": true,
          "example": "线别测试值"
        },
        {
          "key": "SITE_ID",
          "label": "报废地点",
          "required": true,
          "example": "报废地点测试值"
        },
        {
          "key": "MSG",
          "label": "报废原因",
          "required": true,
          "example": "报废原因测试值"
        },
        {
          "key": "SN",
          "label": "产品条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "WIP_OPERATION",
          "label": "在制工序",
          "required": false,
          "example": "在制工序测试值"
        },
        {
          "key": "PROCESS_QTY",
          "label": "在制数",
          "required": false,
          "example": "在制数测试值"
        },
        {
          "key": "SCRAP_QTY",
          "label": "报废数",
          "required": false,
          "example": "报废数测试值"
        },
        {
          "key": "PRODUCE_ORGANIZE",
          "label": "组织",
          "required": true,
          "example": "组织测试值"
        },
        {
          "key": "WAREHOUSE",
          "label": "入库仓库",
          "required": true,
          "example": "入库仓库测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "DOC_NO",
          "label": "报废单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "APPLY_NO",
          "label": "入库申请单",
          "required": false,
          "example": "入库申请单测试值"
        },
        {
          "key": "datarange",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "MANAGE_TYPE": "管控类型测试值",
        "LINE_ID": "线别测试值",
        "SITE_ID": "报废地点测试值",
        "MSG": "报废原因测试值",
        "SN": "AT-001",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "PART_NAME": "规格测试值",
        "WIP_OPERATION": "在制工序测试值",
        "PROCESS_QTY": "在制数测试值",
        "SCRAP_QTY": "报废数测试值",
        "PRODUCE_ORGANIZE": "组织测试值",
        "WAREHOUSE": "入库仓库测试值",
        "STATUS": "Y",
        "DOC_NO": "AT-001",
        "APPLY_NO": "入库申请单测试值",
        "datarange": "2026-08-01"
      }
    },
    {
      "key": "faea8c1db9-9b18613a60-b552d",
      "type": "查看详情",
      "name": "查看图片业务入口校验",
      "label": "查看图片",
      "handler": "childTableImgPreview(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看图片",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    }
  ]
});
