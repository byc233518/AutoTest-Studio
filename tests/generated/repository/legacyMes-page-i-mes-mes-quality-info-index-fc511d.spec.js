// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-quality-info-index-fc511d",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/MesQualityInfo/Index",
  "sourceRoute": "/iMES/MesQualityInfo/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/MesQualityInfo/Index.vue",
  "dataSchema": {
    "columns": [
      "CHECK_TYPE",
      "EP_STATUS",
      "BATCH_QTY",
      "PART_NAME",
      "PRODUCT_DATE",
      "WORK_SHIFTS",
      "FIRST_ITEM_TYPE",
      "LINE_ID",
      "BATCH_NO",
      "PART_NO",
      "PART_DESC",
      "WORK_CLASS",
      "PCB_SIDE",
      "RESULT_STATUS",
      "REMARK",
      "STATUS",
      "Day"
    ],
    "required": [
      "CHECK_TYPE",
      "WORK_SHIFTS",
      "LINE_ID",
      "WORK_CLASS",
      "PCB_SIDE"
    ],
    "fields": [
      {
        "key": "CHECK_TYPE",
        "label": "检验类别",
        "required": true
      },
      {
        "key": "EP_STATUS",
        "label": "环保类型",
        "required": false
      },
      {
        "key": "BATCH_QTY",
        "label": "批量",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": false
      },
      {
        "key": "PRODUCT_DATE",
        "label": "生产日期",
        "required": false
      },
      {
        "key": "WORK_SHIFTS",
        "label": "班次",
        "required": true
      },
      {
        "key": "FIRST_ITEM_TYPE",
        "label": "首件类型",
        "required": false
      },
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": true
      },
      {
        "key": "BATCH_NO",
        "label": "批号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": false
      },
      {
        "key": "WORK_CLASS",
        "label": "班别",
        "required": true
      },
      {
        "key": "PCB_SIDE",
        "label": "板型",
        "required": true
      },
      {
        "key": "RESULT_STATUS",
        "label": "检验结果",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "检验备注",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "Day",
        "label": "生产日期",
        "required": false
      }
    ],
    "example": {
      "CHECK_TYPE": "检验类别测试值",
      "EP_STATUS": "环保类型测试值",
      "BATCH_QTY": "批量测试值",
      "PART_NAME": "自动化样例001",
      "PRODUCT_DATE": "2026-08-01",
      "WORK_SHIFTS": "班次测试值",
      "FIRST_ITEM_TYPE": "首件类型测试值",
      "LINE_ID": "线体测试值",
      "BATCH_NO": "批号测试值",
      "PART_NO": "AT-001",
      "PART_DESC": "规格测试值",
      "WORK_CLASS": "班别测试值",
      "PCB_SIDE": "板型测试值",
      "RESULT_STATUS": "检验结果测试值",
      "REMARK": "自动化测试备注001",
      "STATUS": "Y",
      "Day": "2026-08-01"
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
        "search_but"
      ],
      "testData": {
        "CHECK_TYPE": "检验类别测试值",
        "EP_STATUS": "环保类型测试值",
        "BATCH_QTY": "批量测试值",
        "PART_NAME": "自动化样例001",
        "PRODUCT_DATE": "2026-08-01",
        "WORK_SHIFTS": "班次测试值",
        "FIRST_ITEM_TYPE": "首件类型测试值",
        "LINE_ID": "线体测试值",
        "BATCH_NO": "批号测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "规格测试值",
        "WORK_CLASS": "班别测试值",
        "PCB_SIDE": "板型测试值",
        "RESULT_STATUS": "检验结果测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "Day": "2026-08-01"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "MesQualityInfoAdd",
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
          "key": "CHECK_TYPE",
          "label": "检验类别",
          "required": true,
          "example": "检验类别测试值"
        },
        {
          "key": "EP_STATUS",
          "label": "环保类型",
          "required": false,
          "example": "环保类型测试值"
        },
        {
          "key": "BATCH_QTY",
          "label": "批量",
          "required": false,
          "example": "批量测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "WORK_SHIFTS",
          "label": "班次",
          "required": true,
          "example": "班次测试值"
        },
        {
          "key": "FIRST_ITEM_TYPE",
          "label": "首件类型",
          "required": false,
          "example": "首件类型测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "BATCH_NO",
          "label": "批号",
          "required": false,
          "example": "批号测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "WORK_CLASS",
          "label": "班别",
          "required": true,
          "example": "班别测试值"
        },
        {
          "key": "PCB_SIDE",
          "label": "板型",
          "required": true,
          "example": "板型测试值"
        },
        {
          "key": "RESULT_STATUS",
          "label": "检验结果",
          "required": false,
          "example": "检验结果测试值"
        },
        {
          "key": "REMARK",
          "label": "检验备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Day",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "CHECK_TYPE": "检验类别测试值",
        "EP_STATUS": "环保类型测试值",
        "BATCH_QTY": "批量测试值",
        "PART_NAME": "自动化样例001",
        "PRODUCT_DATE": "2026-08-01",
        "WORK_SHIFTS": "班次测试值",
        "FIRST_ITEM_TYPE": "首件类型测试值",
        "LINE_ID": "线体测试值",
        "BATCH_NO": "批号测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "规格测试值",
        "WORK_CLASS": "班别测试值",
        "PCB_SIDE": "板型测试值",
        "RESULT_STATUS": "检验结果测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "Day": "2026-08-01"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-91c44",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "reviewClick",
      "permission": "MesQualityInfoAuditData",
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
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "MesQualityInfoEdit",
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
          "key": "CHECK_TYPE",
          "label": "检验类别",
          "required": true,
          "example": "检验类别测试值"
        },
        {
          "key": "EP_STATUS",
          "label": "环保类型",
          "required": false,
          "example": "环保类型测试值"
        },
        {
          "key": "BATCH_QTY",
          "label": "批量",
          "required": false,
          "example": "批量测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "WORK_SHIFTS",
          "label": "班次",
          "required": true,
          "example": "班次测试值"
        },
        {
          "key": "FIRST_ITEM_TYPE",
          "label": "首件类型",
          "required": false,
          "example": "首件类型测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "BATCH_NO",
          "label": "批号",
          "required": false,
          "example": "批号测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "WORK_CLASS",
          "label": "班别",
          "required": true,
          "example": "班别测试值"
        },
        {
          "key": "PCB_SIDE",
          "label": "板型",
          "required": true,
          "example": "板型测试值"
        },
        {
          "key": "RESULT_STATUS",
          "label": "检验结果",
          "required": false,
          "example": "检验结果测试值"
        },
        {
          "key": "REMARK",
          "label": "检验备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Day",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "CHECK_TYPE": "检验类别测试值",
        "EP_STATUS": "环保类型测试值",
        "BATCH_QTY": "批量测试值",
        "PART_NAME": "自动化样例001",
        "PRODUCT_DATE": "2026-08-01",
        "WORK_SHIFTS": "班次测试值",
        "FIRST_ITEM_TYPE": "首件类型测试值",
        "LINE_ID": "线体测试值",
        "BATCH_NO": "批号测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "规格测试值",
        "WORK_CLASS": "班别测试值",
        "PCB_SIDE": "板型测试值",
        "RESULT_STATUS": "检验结果测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "Day": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "MesQualityInfoDelete",
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
    },
    {
      "key": "7e002f9936-5aad0ffad0-0caec",
      "type": "业务动作",
      "name": "检验情况业务入口校验",
      "label": "检验情况",
      "handler": "Spotcheck_but(scope.row)",
      "permission": "MesQualityInfoAddOrDetail",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检验情况",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
