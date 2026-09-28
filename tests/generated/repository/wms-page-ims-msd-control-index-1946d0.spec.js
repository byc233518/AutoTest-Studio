// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-msd-control-index-1946d0",
  "name": "仓储管理 - MSD作业功能校验",
  "displayName": "MSD作业",
  "route": "/ImsMsdControl/Index",
  "sourceRoute": "/ImsMsdControl/Index",
  "menuCode": "ImsMsdControl",
  "breadcrumb": "仓库管理 / 湿敏管理 / MSD作业",
  "sourceFile": "src/views/ImsMsdControl/Index.vue",
  "dataSchema": {
    "columns": [
      "PartCode",
      "Thickness",
      "LevelCodeName",
      "CurrentActionName",
      "BeginTimeString",
      "PassedTime",
      "BakeRuleHours",
      "TotalOpenTimeAfterBake",
      "ActionLocation",
      "VendorCode",
      "VendorName",
      "PartDesc",
      "OrigQty",
      "Qty",
      "StatusString",
      "LotCode",
      "MSDAction",
      "BakeRuleId",
      "ReelCode"
    ],
    "required": [
      "ActionLocation",
      "MSDAction",
      "BakeRuleId",
      "ReelCode"
    ],
    "fields": [
      {
        "key": "PartCode",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "Thickness",
        "label": "厚度",
        "required": false
      },
      {
        "key": "LevelCodeName",
        "label": "湿敏等级",
        "required": false
      },
      {
        "key": "CurrentActionName",
        "label": "当前操作",
        "required": false
      },
      {
        "key": "BeginTimeString",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "PassedTime",
        "label": "当前动作经历时间",
        "required": false
      },
      {
        "key": "BakeRuleHours",
        "label": "额定管控时间",
        "required": false
      },
      {
        "key": "TotalOpenTimeAfterBake",
        "label": "烘烤后暴露时间",
        "required": false
      },
      {
        "key": "ActionLocation",
        "label": "当前区域",
        "required": true
      },
      {
        "key": "VendorCode",
        "label": "供应商代码",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商名称",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "料号描述",
        "required": false
      },
      {
        "key": "OrigQty",
        "label": "原始数量",
        "required": false
      },
      {
        "key": "Qty",
        "label": "当前数量",
        "required": false
      },
      {
        "key": "StatusString",
        "label": "状态",
        "required": false
      },
      {
        "key": "LotCode",
        "label": "批次号",
        "required": false
      },
      {
        "key": "MSDAction",
        "label": "执行动作",
        "required": true
      },
      {
        "key": "BakeRuleId",
        "label": "烘烤规则",
        "required": true
      },
      {
        "key": "ReelCode",
        "label": "料卷编号",
        "required": true
      }
    ],
    "example": {
      "PartCode": "AT-001",
      "Thickness": "厚度测试值",
      "LevelCodeName": "湿敏等级测试值",
      "CurrentActionName": "当前操作测试值",
      "BeginTimeString": "2026-08-01",
      "PassedTime": "2026-08-01",
      "BakeRuleHours": "2026-08-01",
      "TotalOpenTimeAfterBake": "2026-08-01",
      "ActionLocation": "当前区域测试值",
      "VendorCode": "供应商代码测试值",
      "VendorName": "自动化样例001",
      "PartDesc": "自动化测试备注001",
      "OrigQty": "1",
      "Qty": "1",
      "StatusString": "Y",
      "LotCode": "批次号测试值",
      "MSDAction": "执行动作测试值",
      "BakeRuleId": "烘烤规则测试值",
      "ReelCode": "AT-001"
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
        "PartCode": "AT-001",
        "Thickness": "厚度测试值",
        "LevelCodeName": "湿敏等级测试值",
        "CurrentActionName": "当前操作测试值",
        "BeginTimeString": "2026-08-01",
        "PassedTime": "2026-08-01",
        "BakeRuleHours": "2026-08-01",
        "TotalOpenTimeAfterBake": "2026-08-01",
        "ActionLocation": "当前区域测试值",
        "VendorCode": "供应商代码测试值",
        "VendorName": "自动化样例001",
        "PartDesc": "自动化测试备注001",
        "OrigQty": "1",
        "Qty": "1",
        "StatusString": "Y",
        "LotCode": "批次号测试值",
        "MSDAction": "执行动作测试值",
        "BakeRuleId": "烘烤规则测试值",
        "ReelCode": "AT-001"
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
      "key": "7e002f9936-09cbc97ae2-3fa40",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submit",
      "permission": "",
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
    }
  ]
});
