// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-production-plan-daily-equipment-plan-index-920662",
  "name": "制造执行 - 设备日计划功能校验",
  "displayName": "设备日计划",
  "route": "/iMES6/ProductionPlan/DailyEquipmentPlan/Index",
  "sourceRoute": "/iMES6/ProductionPlan/DailyEquipmentPlan/Index",
  "menuCode": "iMES6_DailyEquipmentPlan",
  "breadcrumb": "生产管理 / 生产计划 / 设备日计划",
  "sourceFile": "src/views/iMES6/ProductionPlan/DailyEquipmentPlan/Index.vue",
  "dataSchema": {
    "columns": [
      "FileName",
      "PlanDate",
      "EquipNo",
      "EqName",
      "MoldCode",
      "MoldName",
      "WoNo",
      "PartNo",
      "PartName",
      "PartDesc",
      "DatePlanQty",
      "WoType",
      "SoNo",
      "DeliveryTime",
      "Remark"
    ],
    "required": [],
    "fields": [
      {
        "key": "FileName",
        "label": "文件名",
        "required": false
      },
      {
        "key": "PlanDate",
        "label": "计划日期",
        "required": false
      },
      {
        "key": "EquipNo",
        "label": "设备编码",
        "required": false
      },
      {
        "key": "EqName",
        "label": "设备名称",
        "required": false
      },
      {
        "key": "MoldCode",
        "label": "模具编码",
        "required": false
      },
      {
        "key": "MoldName",
        "label": "模具名称",
        "required": false
      },
      {
        "key": "WoNo",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "产品料号",
        "required": false
      },
      {
        "key": "PartName",
        "label": "品名",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "规格",
        "required": false
      },
      {
        "key": "DatePlanQty",
        "label": "分配数",
        "required": false
      },
      {
        "key": "WoType",
        "label": "工单类型",
        "required": false
      },
      {
        "key": "SoNo",
        "label": "销售单号",
        "required": false
      },
      {
        "key": "DeliveryTime",
        "label": "客户交期",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "FileName": "文件名测试值",
      "PlanDate": "2026-08-01",
      "EquipNo": "AT-001",
      "EqName": "自动化样例001",
      "MoldCode": "AT-001",
      "MoldName": "自动化样例001",
      "WoNo": "AT-001",
      "PartNo": "AT-001",
      "PartName": "自动化样例001",
      "PartDesc": "规格测试值",
      "DatePlanQty": "分配数测试值",
      "WoType": "工单类型测试值",
      "SoNo": "AT-001",
      "DeliveryTime": "2026-08-01",
      "Remark": "自动化测试备注001"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "FileName": "文件名测试值",
        "PlanDate": "2026-08-01",
        "EquipNo": "AT-001",
        "EqName": "自动化样例001",
        "MoldCode": "AT-001",
        "MoldName": "自动化样例001",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "规格测试值",
        "DatePlanQty": "分配数测试值",
        "WoType": "工单类型测试值",
        "SoNo": "AT-001",
        "DeliveryTime": "2026-08-01",
        "Remark": "自动化测试备注001"
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
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
      "key": "7e002f9936-d025c802d0-5e752",
      "type": "业务动作",
      "name": "打印条码业务入口校验",
      "label": "打印条码",
      "handler": "printBarcode",
      "permission": "PrintSn",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印条码",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
      "permission": "Edit",
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
          "key": "FileName",
          "label": "文件名",
          "required": false,
          "example": "文件名测试值"
        },
        {
          "key": "PlanDate",
          "label": "计划日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "EquipNo",
          "label": "设备编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "EqName",
          "label": "设备名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MoldCode",
          "label": "模具编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "MoldName",
          "label": "模具名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "WoNo",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PartDesc",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "DatePlanQty",
          "label": "分配数",
          "required": false,
          "example": "分配数测试值"
        },
        {
          "key": "WoType",
          "label": "工单类型",
          "required": false,
          "example": "工单类型测试值"
        },
        {
          "key": "SoNo",
          "label": "销售单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DeliveryTime",
          "label": "客户交期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "FileName": "文件名测试值",
        "PlanDate": "2026-08-01",
        "EquipNo": "AT-001",
        "EqName": "自动化样例001",
        "MoldCode": "AT-001",
        "MoldName": "自动化样例001",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "规格测试值",
        "DatePlanQty": "分配数测试值",
        "WoType": "工单类型测试值",
        "SoNo": "AT-001",
        "DeliveryTime": "2026-08-01",
        "Remark": "自动化测试备注001"
      }
    }
  ]
});
