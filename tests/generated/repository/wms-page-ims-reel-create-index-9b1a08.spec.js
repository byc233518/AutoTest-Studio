// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-reel-create-index-9b1a08",
  "name": "仓储管理 - 条码生成功能校验",
  "displayName": "条码生成",
  "route": "/ImsReelCreate/Index",
  "sourceRoute": "/ImsReelCreate/Index",
  "menuCode": "ImsReelCreate",
  "breadcrumb": "条码管理 / 物料条码管理 / 条码生成",
  "sourceFile": "src/views/ImsReelCreate/Index.vue",
  "dataSchema": {
    "columns": [
      "PartId",
      "VendorId",
      "LotCode",
      "DateCode",
      "ExpireDate",
      "OrigQty",
      "BcdQty",
      "TailQty",
      "totalQty",
      "Sn",
      "Special"
    ],
    "required": [
      "PartId",
      "VendorId",
      "LotCode",
      "DateCode",
      "ExpireDate",
      "OrigQty",
      "BcdQty"
    ],
    "fields": [
      {
        "key": "PartId",
        "label": "物料编码",
        "required": true
      },
      {
        "key": "VendorId",
        "label": "供应商",
        "required": true
      },
      {
        "key": "LotCode",
        "label": "生产批次",
        "required": true
      },
      {
        "key": "DateCode",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "ExpireDate",
        "label": "到期日期",
        "required": true
      },
      {
        "key": "OrigQty",
        "label": "包装数量",
        "required": true
      },
      {
        "key": "BcdQty",
        "label": "条码张数",
        "required": true
      },
      {
        "key": "TailQty",
        "label": "尾数",
        "required": false
      },
      {
        "key": "totalQty",
        "label": "总数",
        "required": false
      },
      {
        "key": "Sn",
        "label": "序列号",
        "required": false
      },
      {
        "key": "Special",
        "label": "库存标识",
        "required": false
      }
    ],
    "example": {
      "PartId": "AT-001",
      "VendorId": "供应商测试值",
      "LotCode": "生产批次测试值",
      "DateCode": "2026-08-01",
      "ExpireDate": "2026-08-01",
      "OrigQty": "1",
      "BcdQty": "条码张数测试值",
      "TailQty": "尾数测试值",
      "totalQty": "总数测试值",
      "Sn": "序列号测试值",
      "Special": "库存标识测试值"
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
    }
  ]
});
