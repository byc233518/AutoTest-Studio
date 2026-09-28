// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-first-check-info-index-f3cf3a",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/MesFirstCheckInfo/Index",
  "sourceRoute": "/iMES/MesFirstCheckInfo/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/MesFirstCheckInfo/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "DEPARTMENT",
      "Status",
      "RESULT_STATUS",
      "BATCH_NO",
      "PART",
      "BEGIN_TIME",
      "END_TIME",
      "LINE_NAME",
      "BATCH_QTY",
      "PART_NO",
      "PART_NAME",
      "PART_DESC",
      "PRODUCT_DATE",
      "NEW_PART",
      "PART_SN",
      "radio",
      "REMARK",
      "RESULT_REMARK"
    ],
    "required": [
      "DEPARTMENT",
      "BATCH_NO",
      "PART",
      "LINE_NAME",
      "BATCH_QTY",
      "PART_NO",
      "PART_NAME",
      "PART_DESC",
      "PRODUCT_DATE",
      "NEW_PART",
      "PART_SN",
      "radio"
    ],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": false
      },
      {
        "key": "DEPARTMENT",
        "label": "部门",
        "required": true
      },
      {
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "RESULT_STATUS",
        "label": "审核结果",
        "required": false
      },
      {
        "key": "BATCH_NO",
        "label": "批号",
        "required": true
      },
      {
        "key": "PART",
        "label": "产品编码/名称/规格",
        "required": true
      },
      {
        "key": "BEGIN_TIME",
        "label": "创建开始日期",
        "required": false
      },
      {
        "key": "END_TIME",
        "label": "创建结束日期",
        "required": false
      },
      {
        "key": "LINE_NAME",
        "label": "线体",
        "required": true
      },
      {
        "key": "BATCH_QTY",
        "label": "批量",
        "required": true
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": true
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": true
      },
      {
        "key": "PRODUCT_DATE",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "NEW_PART",
        "label": "新老产品",
        "required": true
      },
      {
        "key": "PART_SN",
        "label": "条码",
        "required": true
      },
      {
        "key": "radio",
        "label": "检验结果",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "RESULT_REMARK",
        "label": "判断说明",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "DEPARTMENT": "部门测试值",
      "Status": "Y",
      "RESULT_STATUS": "审核结果测试值",
      "BATCH_NO": "批号测试值",
      "PART": "产品编码/名称/规格测试值",
      "BEGIN_TIME": "2026-08-01",
      "END_TIME": "2026-08-01",
      "LINE_NAME": "线体测试值",
      "BATCH_QTY": "批量测试值",
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "PART_DESC": "规格测试值",
      "PRODUCT_DATE": "2026-08-01",
      "NEW_PART": "新老产品测试值",
      "PART_SN": "AT-001",
      "radio": "检验结果测试值",
      "REMARK": "自动化测试备注001",
      "RESULT_REMARK": "自动化测试备注001"
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
        "LINE_ID": "线体测试值",
        "DEPARTMENT": "部门测试值",
        "Status": "Y",
        "RESULT_STATUS": "审核结果测试值",
        "BATCH_NO": "批号测试值",
        "PART": "产品编码/名称/规格测试值",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01",
        "LINE_NAME": "线体测试值",
        "BATCH_QTY": "批量测试值",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "规格测试值",
        "PRODUCT_DATE": "2026-08-01",
        "NEW_PART": "新老产品测试值",
        "PART_SN": "AT-001",
        "radio": "检验结果测试值",
        "REMARK": "自动化测试备注001",
        "RESULT_REMARK": "自动化测试备注001"
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
          "key": "LINE_ID",
          "label": "线体",
          "required": false,
          "example": "线体测试值"
        },
        {
          "key": "DEPARTMENT",
          "label": "部门",
          "required": true,
          "example": "部门测试值"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "RESULT_STATUS",
          "label": "审核结果",
          "required": false,
          "example": "审核结果测试值"
        },
        {
          "key": "BATCH_NO",
          "label": "批号",
          "required": true,
          "example": "批号测试值"
        },
        {
          "key": "PART",
          "label": "产品编码/名称/规格",
          "required": true,
          "example": "产品编码/名称/规格测试值"
        },
        {
          "key": "BEGIN_TIME",
          "label": "创建开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "创建结束日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LINE_NAME",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "BATCH_QTY",
          "label": "批量",
          "required": true,
          "example": "批量测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": true,
          "example": "规格测试值"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "NEW_PART",
          "label": "新老产品",
          "required": true,
          "example": "新老产品测试值"
        },
        {
          "key": "PART_SN",
          "label": "条码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "radio",
          "label": "检验结果",
          "required": true,
          "example": "检验结果测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "RESULT_REMARK",
          "label": "判断说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "DEPARTMENT": "部门测试值",
        "Status": "Y",
        "RESULT_STATUS": "审核结果测试值",
        "BATCH_NO": "批号测试值",
        "PART": "产品编码/名称/规格测试值",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01",
        "LINE_NAME": "线体测试值",
        "BATCH_QTY": "批量测试值",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "规格测试值",
        "PRODUCT_DATE": "2026-08-01",
        "NEW_PART": "新老产品测试值",
        "PART_SN": "AT-001",
        "radio": "检验结果测试值",
        "REMARK": "自动化测试备注001",
        "RESULT_REMARK": "自动化测试备注001"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-5745e",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "AuditClick",
      "permission": "",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": false,
          "example": "线体测试值"
        },
        {
          "key": "DEPARTMENT",
          "label": "部门",
          "required": true,
          "example": "部门测试值"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "RESULT_STATUS",
          "label": "审核结果",
          "required": false,
          "example": "审核结果测试值"
        },
        {
          "key": "BATCH_NO",
          "label": "批号",
          "required": true,
          "example": "批号测试值"
        },
        {
          "key": "PART",
          "label": "产品编码/名称/规格",
          "required": true,
          "example": "产品编码/名称/规格测试值"
        },
        {
          "key": "BEGIN_TIME",
          "label": "创建开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "创建结束日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LINE_NAME",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "BATCH_QTY",
          "label": "批量",
          "required": true,
          "example": "批量测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": true,
          "example": "规格测试值"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "NEW_PART",
          "label": "新老产品",
          "required": true,
          "example": "新老产品测试值"
        },
        {
          "key": "PART_SN",
          "label": "条码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "radio",
          "label": "检验结果",
          "required": true,
          "example": "检验结果测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "RESULT_REMARK",
          "label": "判断说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "DEPARTMENT": "部门测试值",
        "Status": "Y",
        "RESULT_STATUS": "审核结果测试值",
        "BATCH_NO": "批号测试值",
        "PART": "产品编码/名称/规格测试值",
        "BEGIN_TIME": "2026-08-01",
        "END_TIME": "2026-08-01",
        "LINE_NAME": "线体测试值",
        "BATCH_QTY": "批量测试值",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "规格测试值",
        "PRODUCT_DATE": "2026-08-01",
        "NEW_PART": "新老产品测试值",
        "PART_SN": "AT-001",
        "radio": "检验结果测试值",
        "REMARK": "自动化测试备注001",
        "RESULT_REMARK": "自动化测试备注001"
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
    },
    {
      "key": "7e002f9936-5aad0ffad0-9a6c9",
      "type": "业务动作",
      "name": "检验情况业务入口校验",
      "label": "检验情况",
      "handler": "checkClick(row, row.$index)",
      "permission": "",
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
