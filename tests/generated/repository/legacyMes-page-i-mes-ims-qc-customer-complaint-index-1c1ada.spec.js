// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ims-qc-customer-complaint-index-1c1ada",
  "name": "旧版制造执行 - 客诉异常管理功能校验",
  "displayName": "客诉异常管理",
  "route": "/iMES/ImsQcCustomerComplaint/index",
  "sourceRoute": "/iMES/ImsQcCustomerComplaint/index",
  "menuCode": "iMES_ImsQcCustomerComplaint",
  "breadcrumb": "品质管理 / 客诉管理 / 客诉异常管理",
  "sourceFile": "src/views/iMES/ImsQcCustomerComplaint/index.vue",
  "dataSchema": {
    "columns": [
      "BILL_NO",
      "PREPARER",
      "FILLING_DATE",
      "CUSTOMER_COMPLAINT_DATE",
      "PRODUCT_TYPE",
      "BUSINESS",
      "CUSTOMER",
      "INFLUENCE_DEGREE",
      "DELIVERY_STAGE",
      "MODEL_PARTNO",
      "PRODUCTION_BELONG",
      "FACTORY",
      "PART_MATERIAL",
      "CUSTOMER_COMPLAINT_REMARK",
      "EXTERNAL_RESPONSIBILITY_DEP",
      "CUSTOMER_COMPLANT_LOCATION",
      "RETRANSMISSION_TIMES",
      "SHIPMENT_QUANTITY",
      "INTERNAL_RESPONSIBILITY_DEP",
      "CHECK_QUANTITY",
      "EXCEPTION_QUANTITY",
      "DEFECT_RATE",
      "CUSTOMER_RESPONSIBILITY",
      "CASE",
      "EXCEPTION_TYPE",
      "PART_NO_TYPE",
      "REASON_PLAN",
      "KA",
      "EXTERNAL_RESPONSIBILITY_RATE",
      "INTERNAL_RESPONSIBILITY_RATE",
      "CUSTOMER_RESPONSIBILITY_RATE"
    ],
    "required": [
      "BILL_NO",
      "PREPARER",
      "FILLING_DATE",
      "CUSTOMER_COMPLAINT_DATE"
    ],
    "fields": [
      {
        "key": "BILL_NO",
        "label": "单号",
        "required": true
      },
      {
        "key": "PREPARER",
        "label": "填表人",
        "required": true
      },
      {
        "key": "FILLING_DATE",
        "label": "填表日期",
        "required": true
      },
      {
        "key": "CUSTOMER_COMPLAINT_DATE",
        "label": "客诉日期",
        "required": true
      },
      {
        "key": "PRODUCT_TYPE",
        "label": "产品类别",
        "required": false
      },
      {
        "key": "BUSINESS",
        "label": "业务",
        "required": false
      },
      {
        "key": "CUSTOMER",
        "label": "客戶",
        "required": false
      },
      {
        "key": "INFLUENCE_DEGREE",
        "label": "影响度",
        "required": false
      },
      {
        "key": "DELIVERY_STAGE",
        "label": "出货阶段",
        "required": false
      },
      {
        "key": "MODEL_PARTNO",
        "label": "机种料号",
        "required": false
      },
      {
        "key": "PRODUCTION_BELONG",
        "label": "生产归属",
        "required": false
      },
      {
        "key": "FACTORY",
        "label": "厂别",
        "required": false
      },
      {
        "key": "PART_MATERIAL",
        "label": "零件料号",
        "required": false
      },
      {
        "key": "CUSTOMER_COMPLAINT_REMARK",
        "label": "客诉描述",
        "required": false
      },
      {
        "key": "EXTERNAL_RESPONSIBILITY_DEP",
        "label": "外部責任部门&佔比",
        "required": false
      },
      {
        "key": "CUSTOMER_COMPLANT_LOCATION",
        "label": "客诉发生地",
        "required": false
      },
      {
        "key": "RETRANSMISSION_TIMES",
        "label": "重发次数",
        "required": false
      },
      {
        "key": "SHIPMENT_QUANTITY",
        "label": "出货數量",
        "required": false
      },
      {
        "key": "INTERNAL_RESPONSIBILITY_DEP",
        "label": "內部責任部門",
        "required": false
      },
      {
        "key": "CHECK_QUANTITY",
        "label": "检查数量",
        "required": false
      },
      {
        "key": "EXCEPTION_QUANTITY",
        "label": "異常數量",
        "required": false
      },
      {
        "key": "DEFECT_RATE",
        "label": "不良率",
        "required": false
      },
      {
        "key": "CUSTOMER_RESPONSIBILITY",
        "label": "客户责任&占比",
        "required": false
      },
      {
        "key": "CASE",
        "label": "执案",
        "required": false
      },
      {
        "key": "EXCEPTION_TYPE",
        "label": "异常类型",
        "required": false
      },
      {
        "key": "PART_NO_TYPE",
        "label": "料件分类",
        "required": false
      },
      {
        "key": "REASON_PLAN",
        "label": "选择原因对策",
        "required": false
      },
      {
        "key": "KA",
        "label": "KA",
        "required": false
      },
      {
        "key": "EXTERNAL_RESPONSIBILITY_RATE",
        "label": "佔比",
        "required": false
      },
      {
        "key": "INTERNAL_RESPONSIBILITY_RATE",
        "label": "佔比",
        "required": false
      },
      {
        "key": "CUSTOMER_RESPONSIBILITY_RATE",
        "label": "佔比",
        "required": false
      }
    ],
    "example": {
      "BILL_NO": "AT-001",
      "PREPARER": "填表人测试值",
      "FILLING_DATE": "2026-08-01",
      "CUSTOMER_COMPLAINT_DATE": "2026-08-01",
      "PRODUCT_TYPE": "产品类别测试值",
      "BUSINESS": "业务测试值",
      "CUSTOMER": "客戶测试值",
      "INFLUENCE_DEGREE": "影响度测试值",
      "DELIVERY_STAGE": "出货阶段测试值",
      "MODEL_PARTNO": "AT-001",
      "PRODUCTION_BELONG": "生产归属测试值",
      "FACTORY": "厂别测试值",
      "PART_MATERIAL": "AT-001",
      "CUSTOMER_COMPLAINT_REMARK": "自动化测试备注001",
      "EXTERNAL_RESPONSIBILITY_DEP": "外部責任部门&佔比测试值",
      "CUSTOMER_COMPLANT_LOCATION": "客诉发生地测试值",
      "RETRANSMISSION_TIMES": "重发次数测试值",
      "SHIPMENT_QUANTITY": "出货數量测试值",
      "INTERNAL_RESPONSIBILITY_DEP": "內部責任部門测试值",
      "CHECK_QUANTITY": "1",
      "EXCEPTION_QUANTITY": "異常數量测试值",
      "DEFECT_RATE": "不良率测试值",
      "CUSTOMER_RESPONSIBILITY": "客户责任&占比测试值",
      "CASE": "执案测试值",
      "EXCEPTION_TYPE": "异常类型测试值",
      "PART_NO_TYPE": "料件分类测试值",
      "REASON_PLAN": "选择原因对策测试值",
      "KA": "KA测试值",
      "EXTERNAL_RESPONSIBILITY_RATE": "佔比测试值",
      "INTERNAL_RESPONSIBILITY_RATE": "佔比测试值",
      "CUSTOMER_RESPONSIBILITY_RATE": "佔比测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-20deb",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "AddClick('add')",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增",
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
          "key": "BILL_NO",
          "label": "单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PREPARER",
          "label": "填表人",
          "required": true,
          "example": "填表人测试值"
        },
        {
          "key": "FILLING_DATE",
          "label": "填表日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CUSTOMER_COMPLAINT_DATE",
          "label": "客诉日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCT_TYPE",
          "label": "产品类别",
          "required": false,
          "example": "产品类别测试值"
        },
        {
          "key": "BUSINESS",
          "label": "业务",
          "required": false,
          "example": "业务测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客戶",
          "required": false,
          "example": "客戶测试值"
        },
        {
          "key": "INFLUENCE_DEGREE",
          "label": "影响度",
          "required": false,
          "example": "影响度测试值"
        },
        {
          "key": "DELIVERY_STAGE",
          "label": "出货阶段",
          "required": false,
          "example": "出货阶段测试值"
        },
        {
          "key": "MODEL_PARTNO",
          "label": "机种料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PRODUCTION_BELONG",
          "label": "生产归属",
          "required": false,
          "example": "生产归属测试值"
        },
        {
          "key": "FACTORY",
          "label": "厂别",
          "required": false,
          "example": "厂别测试值"
        },
        {
          "key": "PART_MATERIAL",
          "label": "零件料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPLAINT_REMARK",
          "label": "客诉描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "EXTERNAL_RESPONSIBILITY_DEP",
          "label": "外部責任部门&佔比",
          "required": false,
          "example": "外部責任部门&佔比测试值"
        },
        {
          "key": "CUSTOMER_COMPLANT_LOCATION",
          "label": "客诉发生地",
          "required": false,
          "example": "客诉发生地测试值"
        },
        {
          "key": "RETRANSMISSION_TIMES",
          "label": "重发次数",
          "required": false,
          "example": "重发次数测试值"
        },
        {
          "key": "SHIPMENT_QUANTITY",
          "label": "出货數量",
          "required": false,
          "example": "出货數量测试值"
        },
        {
          "key": "INTERNAL_RESPONSIBILITY_DEP",
          "label": "內部責任部門",
          "required": false,
          "example": "內部責任部門测试值"
        },
        {
          "key": "CHECK_QUANTITY",
          "label": "检查数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "EXCEPTION_QUANTITY",
          "label": "異常數量",
          "required": false,
          "example": "異常數量测试值"
        },
        {
          "key": "DEFECT_RATE",
          "label": "不良率",
          "required": false,
          "example": "不良率测试值"
        },
        {
          "key": "CUSTOMER_RESPONSIBILITY",
          "label": "客户责任&占比",
          "required": false,
          "example": "客户责任&占比测试值"
        },
        {
          "key": "CASE",
          "label": "执案",
          "required": false,
          "example": "执案测试值"
        },
        {
          "key": "EXCEPTION_TYPE",
          "label": "异常类型",
          "required": false,
          "example": "异常类型测试值"
        },
        {
          "key": "PART_NO_TYPE",
          "label": "料件分类",
          "required": false,
          "example": "料件分类测试值"
        },
        {
          "key": "REASON_PLAN",
          "label": "选择原因对策",
          "required": false,
          "example": "选择原因对策测试值"
        },
        {
          "key": "KA",
          "label": "KA",
          "required": false,
          "example": "KA测试值"
        },
        {
          "key": "EXTERNAL_RESPONSIBILITY_RATE",
          "label": "佔比",
          "required": false,
          "example": "佔比测试值"
        },
        {
          "key": "INTERNAL_RESPONSIBILITY_RATE",
          "label": "佔比",
          "required": false,
          "example": "佔比测试值"
        },
        {
          "key": "CUSTOMER_RESPONSIBILITY_RATE",
          "label": "佔比",
          "required": false,
          "example": "佔比测试值"
        }
      ],
      "testData": {
        "BILL_NO": "AT-001",
        "PREPARER": "填表人测试值",
        "FILLING_DATE": "2026-08-01",
        "CUSTOMER_COMPLAINT_DATE": "2026-08-01",
        "PRODUCT_TYPE": "产品类别测试值",
        "BUSINESS": "业务测试值",
        "CUSTOMER": "客戶测试值",
        "INFLUENCE_DEGREE": "影响度测试值",
        "DELIVERY_STAGE": "出货阶段测试值",
        "MODEL_PARTNO": "AT-001",
        "PRODUCTION_BELONG": "生产归属测试值",
        "FACTORY": "厂别测试值",
        "PART_MATERIAL": "AT-001",
        "CUSTOMER_COMPLAINT_REMARK": "自动化测试备注001",
        "EXTERNAL_RESPONSIBILITY_DEP": "外部責任部门&佔比测试值",
        "CUSTOMER_COMPLANT_LOCATION": "客诉发生地测试值",
        "RETRANSMISSION_TIMES": "重发次数测试值",
        "SHIPMENT_QUANTITY": "出货數量测试值",
        "INTERNAL_RESPONSIBILITY_DEP": "內部責任部門测试值",
        "CHECK_QUANTITY": "1",
        "EXCEPTION_QUANTITY": "異常數量测试值",
        "DEFECT_RATE": "不良率测试值",
        "CUSTOMER_RESPONSIBILITY": "客户责任&占比测试值",
        "CASE": "执案测试值",
        "EXCEPTION_TYPE": "异常类型测试值",
        "PART_NO_TYPE": "料件分类测试值",
        "REASON_PLAN": "选择原因对策测试值",
        "KA": "KA测试值",
        "EXTERNAL_RESPONSIBILITY_RATE": "佔比测试值",
        "INTERNAL_RESPONSIBILITY_RATE": "佔比测试值",
        "CUSTOMER_RESPONSIBILITY_RATE": "佔比测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-b956a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "EditBtn(row)",
      "permission": "",
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
          "key": "BILL_NO",
          "label": "单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PREPARER",
          "label": "填表人",
          "required": true,
          "example": "填表人测试值"
        },
        {
          "key": "FILLING_DATE",
          "label": "填表日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CUSTOMER_COMPLAINT_DATE",
          "label": "客诉日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCT_TYPE",
          "label": "产品类别",
          "required": false,
          "example": "产品类别测试值"
        },
        {
          "key": "BUSINESS",
          "label": "业务",
          "required": false,
          "example": "业务测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客戶",
          "required": false,
          "example": "客戶测试值"
        },
        {
          "key": "INFLUENCE_DEGREE",
          "label": "影响度",
          "required": false,
          "example": "影响度测试值"
        },
        {
          "key": "DELIVERY_STAGE",
          "label": "出货阶段",
          "required": false,
          "example": "出货阶段测试值"
        },
        {
          "key": "MODEL_PARTNO",
          "label": "机种料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PRODUCTION_BELONG",
          "label": "生产归属",
          "required": false,
          "example": "生产归属测试值"
        },
        {
          "key": "FACTORY",
          "label": "厂别",
          "required": false,
          "example": "厂别测试值"
        },
        {
          "key": "PART_MATERIAL",
          "label": "零件料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPLAINT_REMARK",
          "label": "客诉描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "EXTERNAL_RESPONSIBILITY_DEP",
          "label": "外部責任部门&佔比",
          "required": false,
          "example": "外部責任部门&佔比测试值"
        },
        {
          "key": "CUSTOMER_COMPLANT_LOCATION",
          "label": "客诉发生地",
          "required": false,
          "example": "客诉发生地测试值"
        },
        {
          "key": "RETRANSMISSION_TIMES",
          "label": "重发次数",
          "required": false,
          "example": "重发次数测试值"
        },
        {
          "key": "SHIPMENT_QUANTITY",
          "label": "出货數量",
          "required": false,
          "example": "出货數量测试值"
        },
        {
          "key": "INTERNAL_RESPONSIBILITY_DEP",
          "label": "內部責任部門",
          "required": false,
          "example": "內部責任部門测试值"
        },
        {
          "key": "CHECK_QUANTITY",
          "label": "检查数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "EXCEPTION_QUANTITY",
          "label": "異常數量",
          "required": false,
          "example": "異常數量测试值"
        },
        {
          "key": "DEFECT_RATE",
          "label": "不良率",
          "required": false,
          "example": "不良率测试值"
        },
        {
          "key": "CUSTOMER_RESPONSIBILITY",
          "label": "客户责任&占比",
          "required": false,
          "example": "客户责任&占比测试值"
        },
        {
          "key": "CASE",
          "label": "执案",
          "required": false,
          "example": "执案测试值"
        },
        {
          "key": "EXCEPTION_TYPE",
          "label": "异常类型",
          "required": false,
          "example": "异常类型测试值"
        },
        {
          "key": "PART_NO_TYPE",
          "label": "料件分类",
          "required": false,
          "example": "料件分类测试值"
        },
        {
          "key": "REASON_PLAN",
          "label": "选择原因对策",
          "required": false,
          "example": "选择原因对策测试值"
        },
        {
          "key": "KA",
          "label": "KA",
          "required": false,
          "example": "KA测试值"
        },
        {
          "key": "EXTERNAL_RESPONSIBILITY_RATE",
          "label": "佔比",
          "required": false,
          "example": "佔比测试值"
        },
        {
          "key": "INTERNAL_RESPONSIBILITY_RATE",
          "label": "佔比",
          "required": false,
          "example": "佔比测试值"
        },
        {
          "key": "CUSTOMER_RESPONSIBILITY_RATE",
          "label": "佔比",
          "required": false,
          "example": "佔比测试值"
        }
      ],
      "testData": {
        "BILL_NO": "AT-001",
        "PREPARER": "填表人测试值",
        "FILLING_DATE": "2026-08-01",
        "CUSTOMER_COMPLAINT_DATE": "2026-08-01",
        "PRODUCT_TYPE": "产品类别测试值",
        "BUSINESS": "业务测试值",
        "CUSTOMER": "客戶测试值",
        "INFLUENCE_DEGREE": "影响度测试值",
        "DELIVERY_STAGE": "出货阶段测试值",
        "MODEL_PARTNO": "AT-001",
        "PRODUCTION_BELONG": "生产归属测试值",
        "FACTORY": "厂别测试值",
        "PART_MATERIAL": "AT-001",
        "CUSTOMER_COMPLAINT_REMARK": "自动化测试备注001",
        "EXTERNAL_RESPONSIBILITY_DEP": "外部責任部门&佔比测试值",
        "CUSTOMER_COMPLANT_LOCATION": "客诉发生地测试值",
        "RETRANSMISSION_TIMES": "重发次数测试值",
        "SHIPMENT_QUANTITY": "出货數量测试值",
        "INTERNAL_RESPONSIBILITY_DEP": "內部責任部門测试值",
        "CHECK_QUANTITY": "1",
        "EXCEPTION_QUANTITY": "異常數量测试值",
        "DEFECT_RATE": "不良率测试值",
        "CUSTOMER_RESPONSIBILITY": "客户责任&占比测试值",
        "CASE": "执案测试值",
        "EXCEPTION_TYPE": "异常类型测试值",
        "PART_NO_TYPE": "料件分类测试值",
        "REASON_PLAN": "选择原因对策测试值",
        "KA": "KA测试值",
        "EXTERNAL_RESPONSIBILITY_RATE": "佔比测试值",
        "INTERNAL_RESPONSIBILITY_RATE": "佔比测试值",
        "CUSTOMER_RESPONSIBILITY_RATE": "佔比测试值"
      }
    }
  ]
});
