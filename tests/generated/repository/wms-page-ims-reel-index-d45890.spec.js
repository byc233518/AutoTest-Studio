// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-reel-index-d45890",
  "name": "仓储管理 - 条码查询功能校验",
  "displayName": "条码查询",
  "route": "/ImsReel/Index",
  "sourceRoute": "/ImsReel/Index",
  "menuCode": "ImsReel",
  "breadcrumb": "条码管理 / 物料条码管理 / 条码查询",
  "sourceFile": "src/views/ImsReel/Index.vue",
  "dataSchema": {
    "columns": [
      "Reel",
      "PartNo",
      "DateCode",
      "ExpireDate",
      "LotCode",
      "SicId",
      "LocatorId"
    ],
    "required": [
      "DateCode",
      "LotCode",
      "SicId"
    ],
    "fields": [
      {
        "key": "Reel",
        "label": "条码",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "DateCode",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "ExpireDate",
        "label": "到期日期",
        "required": false
      },
      {
        "key": "LotCode",
        "label": "生产批次",
        "required": true
      },
      {
        "key": "SicId",
        "label": "入库库别",
        "required": true
      },
      {
        "key": "LocatorId",
        "label": "储位",
        "required": false
      }
    ],
    "example": {
      "Reel": "AT-001",
      "PartNo": "AT-001",
      "DateCode": "2026-08-01",
      "ExpireDate": "2026-08-01",
      "LotCode": "生产批次测试值",
      "SicId": "入库库别测试值",
      "LocatorId": "储位测试值"
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
        "Reel": "AT-001",
        "PartNo": "AT-001",
        "DateCode": "2026-08-01",
        "ExpireDate": "2026-08-01",
        "LotCode": "生产批次测试值",
        "SicId": "入库库别测试值",
        "LocatorId": "储位测试值"
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
      "key": "4aa22a22ac-0bcf517fdf-9ead4",
      "type": "编辑表单",
      "name": "条码修改业务入口校验",
      "label": "条码修改",
      "handler": "edit",
      "permission": "ImsReelEdit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击条码修改",
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
          "key": "Reel",
          "label": "条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DateCode",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ExpireDate",
          "label": "到期日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LotCode",
          "label": "生产批次",
          "required": true,
          "example": "生产批次测试值"
        },
        {
          "key": "SicId",
          "label": "入库库别",
          "required": true,
          "example": "入库库别测试值"
        },
        {
          "key": "LocatorId",
          "label": "储位",
          "required": false,
          "example": "储位测试值"
        }
      ],
      "testData": {
        "Reel": "AT-001",
        "PartNo": "AT-001",
        "DateCode": "2026-08-01",
        "ExpireDate": "2026-08-01",
        "LotCode": "生产批次测试值",
        "SicId": "入库库别测试值",
        "LocatorId": "储位测试值"
      }
    },
    {
      "key": "faea8c1db9-1ebb050a35-d430d",
      "type": "查看详情",
      "name": "初始化入库业务入口校验",
      "label": "初始化入库",
      "handler": "openInitStockConfirm",
      "permission": "ImsReelInitStock",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击初始化入库",
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
