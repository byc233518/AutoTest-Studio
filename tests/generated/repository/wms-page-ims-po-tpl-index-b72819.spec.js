// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-po-tpl-index-b72819",
  "name": "仓储管理 - 采购订单标签打印功能校验",
  "displayName": "采购订单标签打印",
  "route": "/ImsPoTpl/Index",
  "sourceRoute": "/ImsPoTpl/Index",
  "menuCode": "ImsPoTpl",
  "breadcrumb": "条码管理 / 物料条码管理 / 采购订单标签打印",
  "sourceFile": "src/views/ImsPoTpl/Index.vue",
  "dataSchema": {
    "columns": [
      "OrigQty",
      "totalQty",
      "DateCode",
      "LotCode",
      "ExpireDate",
      "Description",
      "LogDesc"
    ],
    "required": [
      "OrigQty",
      "totalQty",
      "DateCode",
      "LotCode"
    ],
    "fields": [
      {
        "key": "OrigQty",
        "label": "包装数量",
        "required": true
      },
      {
        "key": "totalQty",
        "label": "生成数量",
        "required": true
      },
      {
        "key": "DateCode",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "LotCode",
        "label": "批次号",
        "required": true
      },
      {
        "key": "ExpireDate",
        "label": "到期日",
        "required": false
      },
      {
        "key": "Description",
        "label": "条码备注",
        "required": false
      },
      {
        "key": "LogDesc",
        "label": "操作备注",
        "required": false
      }
    ],
    "example": {
      "OrigQty": "1",
      "totalQty": "1",
      "DateCode": "2026-08-01",
      "LotCode": "批次号测试值",
      "ExpireDate": "到期日测试值",
      "Description": "自动化测试备注001",
      "LogDesc": "自动化测试备注001"
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
        "OrigQty": "1",
        "totalQty": "1",
        "DateCode": "2026-08-01",
        "LotCode": "批次号测试值",
        "ExpireDate": "到期日测试值",
        "Description": "自动化测试备注001",
        "LogDesc": "自动化测试备注001"
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
      "key": "726b6ec55f-3755f56f2f-2f13f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "hanldeImsPoTplDeleteReels",
      "permission": "ImsPoTplDeleteReels",
      "menuTriggerLabel": "",
      "rowAction": false,
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
