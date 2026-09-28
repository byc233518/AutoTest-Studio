// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-defects-index-7d9c31",
  "name": "制造执行 - 维修管理功能校验",
  "displayName": "维修管理",
  "route": "/iMES6/ImesDefects/Index",
  "sourceRoute": "/iMES6/ImesDefects/Index",
  "menuCode": "ImesDefects",
  "breadcrumb": "生产管理 / 维修返工 / 维修管理",
  "sourceFile": "src/views/iMES6/ImesDefects/Index.vue",
  "dataSchema": {
    "columns": [
      "ScrapTotQty",
      "PackingCapacity",
      "BoxQty",
      "PrintName"
    ],
    "required": [
      "PrintName"
    ],
    "fields": [
      {
        "key": "ScrapTotQty",
        "label": "报废数量",
        "required": false
      },
      {
        "key": "PackingCapacity",
        "label": "包装容量",
        "required": false
      },
      {
        "key": "BoxQty",
        "label": "箱子数量",
        "required": false
      },
      {
        "key": "PrintName",
        "label": "打印机",
        "required": true
      }
    ],
    "example": {
      "ScrapTotQty": "1",
      "PackingCapacity": "1",
      "BoxQty": "1",
      "PrintName": "打印机测试值"
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
        "ScrapTotQty": "1",
        "PackingCapacity": "1",
        "BoxQty": "1",
        "PrintName": "打印机测试值"
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
      "key": "13fd57e65b-75fddf3a97-aff17",
      "type": "新增表单",
      "name": "批次送修业务入口校验",
      "label": "批次送修",
      "handler": "openFormEditor('Batch')",
      "permission": "Add",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批次送修",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-aa3b2c0eff-129e0",
      "type": "新增表单",
      "name": "序列号送修业务入口校验",
      "label": "序列号送修",
      "handler": "openFormEditor('SN')",
      "permission": "Add",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击序列号送修",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-d66e1bd517-d3e1f",
      "type": "新增表单",
      "name": "批量报废业务入口校验",
      "label": "批量报废",
      "handler": "openDefectiveScrap",
      "permission": "BacthScrapSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量报废",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-2b83a4cb9c-be45f",
      "type": "查看详情",
      "name": "维修业务入口校验",
      "label": "维修",
      "handler": "goRepair(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击维修",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-373c90eee1-f5d0f",
      "type": "查看详情",
      "name": "查看不良原因业务入口校验",
      "label": "查看不良原因",
      "handler": "openWareView(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看不良原因",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-9b18613a60-9d21b",
      "type": "查看详情",
      "name": "查看图片业务入口校验",
      "label": "查看图片",
      "handler": "openImageView(row)",
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
