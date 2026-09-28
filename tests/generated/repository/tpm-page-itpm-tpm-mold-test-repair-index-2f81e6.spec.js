// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-mold-test-repair-index-2f81e6",
  "name": "设备管理 - 返修任务管理功能校验",
  "displayName": "返修任务管理",
  "route": "/ITPM/TpmMoldTestRepair/Index",
  "sourceRoute": "/ITPM/TpmMoldTestRepair/Index",
  "menuCode": "TpmMoldTestRepair",
  "breadcrumb": "设备管理 / 模具管理 / 返修任务管理",
  "sourceFile": "src/views/ITPM/TpmMoldTestRepair/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "WoNo",
      "MoldInsertCode",
      "MoldInsertName",
      "PartCode",
      "PartName",
      "ClassType",
      "LocationCode",
      "VendorCode",
      "VendorName",
      "Status",
      "TestReason",
      "Name",
      "RepairContent",
      "RepairAnalysis",
      "RepairSolution",
      "RepairResult"
    ],
    "required": [
      "Code",
      "LocationCode",
      "RepairContent",
      "RepairAnalysis",
      "RepairSolution",
      "RepairResult"
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
        "required": false
      },
      {
        "key": "MoldInsertCode",
        "label": "模具/镶件编码",
        "required": false
      },
      {
        "key": "MoldInsertName",
        "label": "模具/镶件名称",
        "required": false
      },
      {
        "key": "PartCode",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "PartName",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "ClassType",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "LocationCode",
        "label": "储位编码",
        "required": true
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
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "TestReason",
        "label": "返修原因",
        "required": false
      },
      {
        "key": "Name",
        "label": "目的储位名称",
        "required": false
      },
      {
        "key": "RepairContent",
        "label": "返修内容",
        "required": true
      },
      {
        "key": "RepairAnalysis",
        "label": "返修分析",
        "required": true
      },
      {
        "key": "RepairSolution",
        "label": "解决方案",
        "required": true
      },
      {
        "key": "RepairResult",
        "label": "返修结果",
        "required": true
      }
    ],
    "example": {
      "Code": "AT-001",
      "WoNo": "AT-001",
      "MoldInsertCode": "AT-001",
      "MoldInsertName": "自动化样例001",
      "PartCode": "AT-001",
      "PartName": "自动化样例001",
      "ClassType": "物料子类测试值",
      "LocationCode": "AT-001",
      "VendorCode": "AT-001",
      "VendorName": "自动化样例001",
      "Status": "Y",
      "TestReason": "返修原因测试值",
      "Name": "自动化样例001",
      "RepairContent": "返修内容测试值",
      "RepairAnalysis": "返修分析测试值",
      "RepairSolution": "解决方案测试值",
      "RepairResult": "返修结果测试值"
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
        "MoldInsertCode": "AT-001",
        "MoldInsertName": "自动化样例001",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "ClassType": "物料子类测试值",
        "LocationCode": "AT-001",
        "VendorCode": "AT-001",
        "VendorName": "自动化样例001",
        "Status": "Y",
        "TestReason": "返修原因测试值",
        "Name": "自动化样例001",
        "RepairContent": "返修内容测试值",
        "RepairAnalysis": "返修分析测试值",
        "RepairSolution": "解决方案测试值",
        "RepairResult": "返修结果测试值"
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
      "key": "faea8c1db9-de7b4c9eeb-159b7",
      "type": "查看详情",
      "name": "接收业务入口校验",
      "label": "接收",
      "handler": "openReceiveModal",
      "permission": "Receive",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击接收",
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
    }
  ]
});
