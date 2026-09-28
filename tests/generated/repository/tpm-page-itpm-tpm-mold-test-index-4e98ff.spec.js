// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-mold-test-index-4e98ff",
  "name": "设备管理 - 试模管理功能校验",
  "displayName": "试模管理",
  "route": "/ITPM/TpmMoldTest/Index",
  "sourceRoute": "/ITPM/TpmMoldTest/Index",
  "menuCode": "TpmMoldTest",
  "breadcrumb": "设备管理 / 模具管理 / 试模管理",
  "sourceFile": "src/views/ITPM/TpmMoldTest/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "WoNo",
      "PartNo",
      "PartName",
      "StartDate",
      "DueDate",
      "TargetQty",
      "MoldInsertId",
      "ClassType",
      "LocationCode",
      "VendorCode",
      "VendorName",
      "CavityNum",
      "PartSpecs",
      "PartWeight",
      "UtilizationRate",
      "Status",
      "Qty",
      "Equipment",
      "SolutionId",
      "Remark",
      "MoldInsertCode",
      "Name",
      "LocationId"
    ],
    "required": [
      "Code",
      "WoNo",
      "MoldInsertId",
      "Qty",
      "Equipment",
      "LocationId"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "任务单号",
        "required": true
      },
      {
        "key": "WoNo",
        "label": "关联单号",
        "required": true
      },
      {
        "key": "PartNo",
        "label": "产品编码",
        "required": false
      },
      {
        "key": "PartName",
        "label": "产品名称",
        "required": false
      },
      {
        "key": "StartDate",
        "label": "计划开工时间",
        "required": false
      },
      {
        "key": "DueDate",
        "label": "计划结束时间",
        "required": false
      },
      {
        "key": "TargetQty",
        "label": "数量",
        "required": false
      },
      {
        "key": "MoldInsertId",
        "label": "模具/镶件名称",
        "required": true
      },
      {
        "key": "ClassType",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "LocationCode",
        "label": "储位编码",
        "required": false
      },
      {
        "key": "VendorCode",
        "label": "供应商编码",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商名称",
        "required": false
      },
      {
        "key": "CavityNum",
        "label": "穴数",
        "required": false
      },
      {
        "key": "PartSpecs",
        "label": "物料规格",
        "required": false
      },
      {
        "key": "PartWeight",
        "label": "重量(KG)",
        "required": false
      },
      {
        "key": "UtilizationRate",
        "label": "利用率(%)",
        "required": false
      },
      {
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "Qty",
        "label": "试样数量",
        "required": true
      },
      {
        "key": "Equipment",
        "label": "试样设备",
        "required": true
      },
      {
        "key": "SolutionId",
        "label": "试模方案",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "MoldInsertCode",
        "label": "模具/镶件编码",
        "required": false
      },
      {
        "key": "Name",
        "label": "目的储位名称",
        "required": false
      },
      {
        "key": "LocationId",
        "label": "目的储位编码",
        "required": true
      }
    ],
    "example": {
      "Code": "AT-001",
      "WoNo": "AT-001",
      "PartNo": "AT-001",
      "PartName": "自动化样例001",
      "StartDate": "2026-08-01",
      "DueDate": "2026-08-01",
      "TargetQty": "1",
      "MoldInsertId": "自动化样例001",
      "ClassType": "物料子类测试值",
      "LocationCode": "AT-001",
      "VendorCode": "AT-001",
      "VendorName": "自动化样例001",
      "CavityNum": "穴数测试值",
      "PartSpecs": "物料规格测试值",
      "PartWeight": "重量(KG)测试值",
      "UtilizationRate": "利用率(%)测试值",
      "Status": "Y",
      "Qty": "1",
      "Equipment": "试样设备测试值",
      "SolutionId": "试模方案测试值",
      "Remark": "自动化测试备注001",
      "MoldInsertCode": "AT-001",
      "Name": "自动化样例001",
      "LocationId": "AT-001"
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
        "Code": "AT-001",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "StartDate": "2026-08-01",
        "DueDate": "2026-08-01",
        "TargetQty": "1",
        "MoldInsertId": "自动化样例001",
        "ClassType": "物料子类测试值",
        "LocationCode": "AT-001",
        "VendorCode": "AT-001",
        "VendorName": "自动化样例001",
        "CavityNum": "穴数测试值",
        "PartSpecs": "物料规格测试值",
        "PartWeight": "重量(KG)测试值",
        "UtilizationRate": "利用率(%)测试值",
        "Status": "Y",
        "Qty": "1",
        "Equipment": "试样设备测试值",
        "SolutionId": "试模方案测试值",
        "Remark": "自动化测试备注001",
        "MoldInsertCode": "AT-001",
        "Name": "自动化样例001",
        "LocationId": "AT-001"
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
      "key": "13fd57e65b-2cd9e6ce81-526a8",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor",
      "permission": "Add",
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
          "key": "Code",
          "label": "任务单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "WoNo",
          "label": "关联单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "产品编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "产品名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "StartDate",
          "label": "计划开工时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DueDate",
          "label": "计划结束时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "TargetQty",
          "label": "数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "MoldInsertId",
          "label": "模具/镶件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "LocationCode",
          "label": "储位编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorName",
          "label": "供应商名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "CavityNum",
          "label": "穴数",
          "required": false,
          "example": "穴数测试值"
        },
        {
          "key": "PartSpecs",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PartWeight",
          "label": "重量(KG)",
          "required": false,
          "example": "重量(KG)测试值"
        },
        {
          "key": "UtilizationRate",
          "label": "利用率(%)",
          "required": false,
          "example": "利用率(%)测试值"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Qty",
          "label": "试样数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "Equipment",
          "label": "试样设备",
          "required": true,
          "example": "试样设备测试值"
        },
        {
          "key": "SolutionId",
          "label": "试模方案",
          "required": false,
          "example": "试模方案测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "目的储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LocationId",
          "label": "目的储位编码",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "StartDate": "2026-08-01",
        "DueDate": "2026-08-01",
        "TargetQty": "1",
        "MoldInsertId": "自动化样例001",
        "ClassType": "物料子类测试值",
        "LocationCode": "AT-001",
        "VendorCode": "AT-001",
        "VendorName": "自动化样例001",
        "CavityNum": "穴数测试值",
        "PartSpecs": "物料规格测试值",
        "PartWeight": "重量(KG)测试值",
        "UtilizationRate": "利用率(%)测试值",
        "Status": "Y",
        "Qty": "1",
        "Equipment": "试样设备测试值",
        "SolutionId": "试模方案测试值",
        "Remark": "自动化测试备注001",
        "MoldInsertCode": "AT-001",
        "Name": "自动化样例001",
        "LocationId": "AT-001"
      }
    },
    {
      "key": "7e002f9936-f0c10dc8f0-d0c40",
      "type": "业务动作",
      "name": "任务确认业务入口校验",
      "label": "任务确认",
      "handler": "confirm",
      "permission": "Confirm",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位任务确认",
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
      "key": "faea8c1db9-e8bcbf1256-75ef8",
      "type": "查看详情",
      "name": "试模作业业务入口校验",
      "label": "试模作业",
      "handler": "openTestWorkModal",
      "permission": "TestWork",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击试模作业",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-df64bc0acc-d7f48",
      "type": "业务动作",
      "name": "打印单据业务入口校验",
      "label": "打印单据",
      "handler": "reportPrint",
      "permission": "PrintOrder",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印单据",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-fe945e5a0d-78761",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "audit",
      "permission": "Audit",
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
      "key": "faea8c1db9-bdd41ed27f-ec277",
      "type": "查看详情",
      "name": "归还业务入口校验",
      "label": "归还",
      "handler": "openReturnBackModal",
      "permission": "ReturnBack",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击归还",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-62e26d2141-e4788",
      "type": "业务动作",
      "name": "批准业务入口校验",
      "label": "批准",
      "handler": "approve",
      "permission": "Approve",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位批准",
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
          "key": "Code",
          "label": "任务单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "WoNo",
          "label": "关联单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "产品编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "产品名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "StartDate",
          "label": "计划开工时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DueDate",
          "label": "计划结束时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "TargetQty",
          "label": "数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "MoldInsertId",
          "label": "模具/镶件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "LocationCode",
          "label": "储位编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorName",
          "label": "供应商名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "CavityNum",
          "label": "穴数",
          "required": false,
          "example": "穴数测试值"
        },
        {
          "key": "PartSpecs",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PartWeight",
          "label": "重量(KG)",
          "required": false,
          "example": "重量(KG)测试值"
        },
        {
          "key": "UtilizationRate",
          "label": "利用率(%)",
          "required": false,
          "example": "利用率(%)测试值"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Qty",
          "label": "试样数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "Equipment",
          "label": "试样设备",
          "required": true,
          "example": "试样设备测试值"
        },
        {
          "key": "SolutionId",
          "label": "试模方案",
          "required": false,
          "example": "试模方案测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "目的储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LocationId",
          "label": "目的储位编码",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "StartDate": "2026-08-01",
        "DueDate": "2026-08-01",
        "TargetQty": "1",
        "MoldInsertId": "自动化样例001",
        "ClassType": "物料子类测试值",
        "LocationCode": "AT-001",
        "VendorCode": "AT-001",
        "VendorName": "自动化样例001",
        "CavityNum": "穴数测试值",
        "PartSpecs": "物料规格测试值",
        "PartWeight": "重量(KG)测试值",
        "UtilizationRate": "利用率(%)测试值",
        "Status": "Y",
        "Qty": "1",
        "Equipment": "试样设备测试值",
        "SolutionId": "试模方案测试值",
        "Remark": "自动化测试备注001",
        "MoldInsertCode": "AT-001",
        "Name": "自动化样例001",
        "LocationId": "AT-001"
      }
    }
  ]
});
