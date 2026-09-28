// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-reel-index-b47359",
  "name": "仓储管理 - 批量允收（未配置菜单）功能校验",
  "displayName": "批量允收（未配置菜单）",
  "route": "/ImsQcReel/Index",
  "sourceRoute": "/ImsQcReel/Index",
  "menuCode": "",
  "breadcrumb": "仓储管理 / 未配置菜单 / 批量允收（未配置菜单）",
  "sourceFile": "src/views/ImsQcReel/Index.vue",
  "dataSchema": {
    "columns": [
      "HiCode",
      "PartNo",
      "PartName",
      "PartDescription",
      "VendorName",
      "Sample",
      "CheckTxt",
      "CheckBy",
      "CrackedQty",
      "DeviceId",
      "DataType",
      "Description",
      "ErpBillType",
      "ErpBillNo"
    ],
    "required": [
      "CrackedQty"
    ],
    "fields": [
      {
        "key": "HiCode",
        "label": "检验单号",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "PartName",
        "label": "物料名",
        "required": false
      },
      {
        "key": "PartDescription",
        "label": "物料描述",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商",
        "required": false
      },
      {
        "key": "Sample",
        "label": "样本数量",
        "required": false
      },
      {
        "key": "CheckTxt",
        "label": "检验描述",
        "required": false
      },
      {
        "key": "CheckBy",
        "label": "检测员",
        "required": false
      },
      {
        "key": "CrackedQty",
        "label": "破坏数量",
        "required": true
      },
      {
        "key": "DeviceId",
        "label": "设备ID",
        "required": false
      },
      {
        "key": "DataType",
        "label": "破坏类型",
        "required": false
      },
      {
        "key": "Description",
        "label": "破坏原因",
        "required": false
      },
      {
        "key": "ErpBillType",
        "label": "ERP单据类型",
        "required": false
      },
      {
        "key": "ErpBillNo",
        "label": "ERP单据编号",
        "required": false
      }
    ],
    "example": {
      "HiCode": "AT-001",
      "PartNo": "AT-001",
      "PartName": "物料名测试值",
      "PartDescription": "自动化测试备注001",
      "VendorName": "供应商测试值",
      "Sample": "1",
      "CheckTxt": "自动化测试备注001",
      "CheckBy": "检测员测试值",
      "CrackedQty": "1",
      "DeviceId": "AT-001",
      "DataType": "破坏类型测试值",
      "Description": "破坏原因测试值",
      "ErpBillType": "ERP单据类型测试值",
      "ErpBillNo": "AT-001"
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
      "key": "7e002f9936-09cbc97ae2-3fa40",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submit",
      "permission": "ImsQcReelSubmit",
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
    },
    {
      "key": "7e002f9936-89bd1c6c15-bda28",
      "type": "业务动作",
      "name": "切分条码业务入口校验",
      "label": "切分条码",
      "handler": "DoCut",
      "permission": "ImsQcReelCut",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位切分条码",
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
