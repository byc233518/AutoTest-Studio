// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-production-plan-plan-index-a6ab1d",
  "name": "制造执行 - 生产排程功能校验",
  "displayName": "生产排程",
  "route": "/iMES6/ProductionPlan/Plan/Index",
  "sourceRoute": "/iMES6/ProductionPlan/Plan/Index",
  "menuCode": "iMES6Scheduling",
  "breadcrumb": "生产管理 / 生产计划 / 生产排程",
  "sourceFile": "src/views/iMES6/ProductionPlan/Plan/Index.vue",
  "dataSchema": {
    "columns": [
      "WoNo",
      "PartNo",
      "PlanQty",
      "LineId",
      "TeamId",
      "AllotStatus"
    ],
    "required": [
      "PlanQty",
      "LineId",
      "TeamId"
    ],
    "fields": [
      {
        "key": "WoNo",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "PlanQty",
        "label": "拆分数",
        "required": true
      },
      {
        "key": "LineId",
        "label": "线体",
        "required": true
      },
      {
        "key": "TeamId",
        "label": "班组",
        "required": true
      },
      {
        "key": "AllotStatus",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "WoNo": "AT-001",
      "PartNo": "AT-001",
      "PlanQty": "拆分数测试值",
      "LineId": "线体测试值",
      "TeamId": "班组测试值",
      "AllotStatus": "Y"
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
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PlanQty": "拆分数测试值",
        "LineId": "线体测试值",
        "TeamId": "班组测试值",
        "AllotStatus": "Y"
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
      "key": "faea8c1db9-c8fb6c58df-280d0",
      "type": "查看详情",
      "name": "线体分配业务入口校验",
      "label": "线体分配",
      "handler": "openAssignDialog('line')",
      "permission": "LineAssign",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击线体分配",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-9ec24b9957-dd519",
      "type": "查看详情",
      "name": "设备分配业务入口校验",
      "label": "设备分配",
      "handler": "openAssignDialog('device')",
      "permission": "DeviceAssign",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击设备分配",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
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
          "key": "WoNo",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PlanQty",
          "label": "拆分数",
          "required": true,
          "example": "拆分数测试值"
        },
        {
          "key": "LineId",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "TeamId",
          "label": "班组",
          "required": true,
          "example": "班组测试值"
        },
        {
          "key": "AllotStatus",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "WoNo": "AT-001",
        "PartNo": "AT-001",
        "PlanQty": "拆分数测试值",
        "LineId": "线体测试值",
        "TeamId": "班组测试值",
        "AllotStatus": "Y"
      }
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
    }
  ]
});
