// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-cyc-mst-index-7d9d7e",
  "name": "仓储管理 - 盘卡管理功能校验",
  "displayName": "盘卡管理",
  "route": "/ImsCycMst/Index",
  "sourceRoute": "/ImsCycMst/Index",
  "menuCode": "ImsCycMst",
  "breadcrumb": "仓库管理 / 库存盘点 / 盘卡管理",
  "sourceFile": "src/views/ImsCycMst/Index.vue",
  "dataSchema": {
    "columns": [
      "CtlCode",
      "StartLocatorCode",
      "EndLocatorCode",
      "PartChargeCodeList",
      "StartMoveDate",
      "EndMoveDate",
      "StartReceiveDate",
      "EndReceiveDate",
      "SicIdList",
      "ReelStatus",
      "IsCut",
      "PartCodeList",
      "ReelCodeList",
      "VendorCodeList",
      "PartCodeListStr",
      "ReelCodeListStr",
      "VendorCodeListStr",
      "Data"
    ],
    "required": [],
    "fields": [
      {
        "key": "CtlCode",
        "label": "控制编码",
        "required": false
      },
      {
        "key": "StartLocatorCode",
        "label": "储位起",
        "required": false
      },
      {
        "key": "EndLocatorCode",
        "label": "储位止",
        "required": false
      },
      {
        "key": "PartChargeCodeList",
        "label": "品号负责人",
        "required": false
      },
      {
        "key": "StartMoveDate",
        "label": "异动日期起",
        "required": false
      },
      {
        "key": "EndMoveDate",
        "label": "异动日期止",
        "required": false
      },
      {
        "key": "StartReceiveDate",
        "label": "收料日期起",
        "required": false
      },
      {
        "key": "EndReceiveDate",
        "label": "收料日期止",
        "required": false
      },
      {
        "key": "SicIdList",
        "label": "库别",
        "required": false
      },
      {
        "key": "ReelStatus",
        "label": "条码状态",
        "required": false
      },
      {
        "key": "IsCut",
        "label": "切分记录",
        "required": false
      },
      {
        "key": "PartCodeList",
        "label": "导入料号",
        "required": false
      },
      {
        "key": "ReelCodeList",
        "label": "导入条码",
        "required": false
      },
      {
        "key": "VendorCodeList",
        "label": "导入供应商",
        "required": false
      },
      {
        "key": "PartCodeListStr",
        "label": "内容",
        "required": false
      },
      {
        "key": "ReelCodeListStr",
        "label": "内容",
        "required": false
      },
      {
        "key": "VendorCodeListStr",
        "label": "内容",
        "required": false
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "CtlCode": "AT-001",
      "StartLocatorCode": "储位起测试值",
      "EndLocatorCode": "储位止测试值",
      "PartChargeCodeList": "品号负责人测试值",
      "StartMoveDate": "异动日期起测试值",
      "EndMoveDate": "异动日期止测试值",
      "StartReceiveDate": "收料日期起测试值",
      "EndReceiveDate": "收料日期止测试值",
      "SicIdList": "库别测试值",
      "ReelStatus": "Y",
      "IsCut": "切分记录测试值",
      "PartCodeList": "AT-001",
      "ReelCodeList": "AT-001",
      "VendorCodeList": "导入供应商测试值",
      "PartCodeListStr": "内容测试值",
      "ReelCodeListStr": "内容测试值",
      "VendorCodeListStr": "内容测试值",
      "Data": "输入关键字搜索测试值"
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
        "search"
      ],
      "testData": {
        "CtlCode": "AT-001",
        "StartLocatorCode": "储位起测试值",
        "EndLocatorCode": "储位止测试值",
        "PartChargeCodeList": "品号负责人测试值",
        "StartMoveDate": "异动日期起测试值",
        "EndMoveDate": "异动日期止测试值",
        "StartReceiveDate": "收料日期起测试值",
        "EndReceiveDate": "收料日期止测试值",
        "SicIdList": "库别测试值",
        "ReelStatus": "Y",
        "IsCut": "切分记录测试值",
        "PartCodeList": "AT-001",
        "ReelCodeList": "AT-001",
        "VendorCodeList": "导入供应商测试值",
        "PartCodeListStr": "内容测试值",
        "ReelCodeListStr": "内容测试值",
        "VendorCodeListStr": "内容测试值",
        "Data": "输入关键字搜索测试值"
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
      "key": "ef879b4ced-a8e538398f-0747d",
      "type": "导出入口",
      "name": "清单导出业务入口校验",
      "label": "清单导出",
      "handler": "dExport",
      "permission": "ImsCycMstExport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击清单导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "3d81345303-5a063315e4-ebae4",
      "type": "重置",
      "name": "盘卡重置业务入口校验",
      "label": "盘卡重置",
      "handler": "resetCycStock",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-cc9c8",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteCyc",
      "permission": "ImsCycMstDeleteByIds",
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
    },
    {
      "key": "7e002f9936-88d5e6a01a-a19ef",
      "type": "业务动作",
      "name": "提交撤回业务入口校验",
      "label": "提交撤回",
      "handler": "revokeCycCommit",
      "permission": "ImsCycFinishRevoke",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交撤回",
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
      "key": "faea8c1db9-bb952e935a-77eb8",
      "type": "查看详情",
      "name": "查看条码业务入口校验",
      "label": "查看条码",
      "handler": "openReelDialog(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看条码",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-4d42a46878-e3d4b",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "typeSelect('PartCode')",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    }
  ]
});
