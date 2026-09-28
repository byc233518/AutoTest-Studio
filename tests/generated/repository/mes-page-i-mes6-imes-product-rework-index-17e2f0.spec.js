// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-product-rework-index-17e2f0",
  "name": "制造执行 - 返工作业功能校验",
  "displayName": "返工作业",
  "route": "/iMES6/ImesProductRework/Index",
  "sourceRoute": "/iMES6/ImesProductRework/Index",
  "menuCode": "ImesProductRework",
  "breadcrumb": "生产管理 / 维修返工 / 返工作业",
  "sourceFile": "src/views/iMES6/ImesProductRework/Index.vue",
  "dataSchema": {
    "columns": [
      "ReworkWoNo",
      "PartNo",
      "PartDesc",
      "RouteId",
      "ReworkOperationId",
      "ReworkType",
      "ReworkStatus",
      "ReworkTime",
      "ReworkUser",
      "ReworkRemark"
    ],
    "required": [],
    "fields": [
      {
        "key": "ReworkWoNo",
        "label": "工单",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "规格",
        "required": false
      },
      {
        "key": "RouteId",
        "label": "制程",
        "required": false
      },
      {
        "key": "ReworkOperationId",
        "label": "返工工序",
        "required": false
      },
      {
        "key": "ReworkType",
        "label": "返工类型",
        "required": false
      },
      {
        "key": "ReworkStatus",
        "label": "返工状态",
        "required": false
      },
      {
        "key": "ReworkTime",
        "label": "返工时间",
        "required": false
      },
      {
        "key": "ReworkUser",
        "label": "返工人",
        "required": false
      },
      {
        "key": "ReworkRemark",
        "label": "返工备注",
        "required": false
      }
    ],
    "example": {
      "ReworkWoNo": "工单测试值",
      "PartNo": "AT-001",
      "PartDesc": "规格测试值",
      "RouteId": "制程测试值",
      "ReworkOperationId": "返工工序测试值",
      "ReworkType": "返工类型测试值",
      "ReworkStatus": "Y",
      "ReworkTime": "2026-08-01",
      "ReworkUser": "返工人测试值",
      "ReworkRemark": "自动化测试备注001"
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
      "key": "7e002f9936-34fcfc1014-c662d",
      "type": "业务动作",
      "name": "制程返工业务入口校验",
      "label": "制程返工",
      "handler": "handleProcessRework",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位制程返工",
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
      "key": "7e002f9936-afe1e90a33-a6e5a",
      "type": "业务动作",
      "name": "仓库返工业务入口校验",
      "label": "仓库返工",
      "handler": "handleWarehouseRework",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位仓库返工",
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
