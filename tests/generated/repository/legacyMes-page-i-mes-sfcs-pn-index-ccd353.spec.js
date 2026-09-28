// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-pn-index-ccd353",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/SfcsPn/Index",
  "sourceRoute": "/iMES/SfcsPn/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsPn/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "CUSTOMER_ID",
      "FAMILY_ID",
      "MODEL_ID",
      "BU_CODE",
      "CLASSIFICATION",
      "PRODUCT_KIND",
      "STAGE_CODE",
      "CUSTOMER",
      "FAMILY_NAME",
      "MODEL",
      "DOUBLE_SIDE",
      "LEAD_FLAG",
      "ATTRIBUTE2",
      "ATTRIBUTE3",
      "SHIP_FLAG",
      "EDI_FLAG",
      "WARRANTY_LIMIT",
      "TURNIN_TYPE",
      "PHASE_IN_DATE",
      "PHASE_OUT_DATE",
      "DESCRIPTION",
      "CATEGORY_MEANING",
      "CUSTOMER_PN",
      "Key",
      "key"
    ],
    "required": [
      "PART_NO",
      "CUSTOMER_ID",
      "FAMILY_ID",
      "MODEL_ID",
      "BU_CODE",
      "CLASSIFICATION",
      "PRODUCT_KIND",
      "STAGE_CODE",
      "CUSTOMER",
      "MODEL",
      "TURNIN_TYPE",
      "DESCRIPTION",
      "CATEGORY_MEANING"
    ],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "CUSTOMER_ID",
        "label": "客户",
        "required": true
      },
      {
        "key": "FAMILY_ID",
        "label": "产品系列",
        "required": true
      },
      {
        "key": "MODEL_ID",
        "label": "机种",
        "required": true
      },
      {
        "key": "BU_CODE",
        "label": "制造单位",
        "required": true
      },
      {
        "key": "CLASSIFICATION",
        "label": "厂部",
        "required": true
      },
      {
        "key": "PRODUCT_KIND",
        "label": "产品性质",
        "required": true
      },
      {
        "key": "STAGE_CODE",
        "label": "生产阶段",
        "required": true
      },
      {
        "key": "CUSTOMER",
        "label": "客户",
        "required": true
      },
      {
        "key": "FAMILY_NAME",
        "label": "产品系列",
        "required": false
      },
      {
        "key": "MODEL",
        "label": "机种",
        "required": true
      },
      {
        "key": "DOUBLE_SIDE",
        "label": "是否双面",
        "required": false
      },
      {
        "key": "LEAD_FLAG",
        "label": "是否有铅",
        "required": false
      },
      {
        "key": "ATTRIBUTE2",
        "label": "可循环使用",
        "required": false
      },
      {
        "key": "ATTRIBUTE3",
        "label": "易错产品",
        "required": false
      },
      {
        "key": "SHIP_FLAG",
        "label": "是否出货",
        "required": false
      },
      {
        "key": "EDI_FLAG",
        "label": "是否EDI数据",
        "required": false
      },
      {
        "key": "WARRANTY_LIMIT",
        "label": "保修期",
        "required": false
      },
      {
        "key": "TURNIN_TYPE",
        "label": "是否自动存仓",
        "required": true
      },
      {
        "key": "PHASE_IN_DATE",
        "label": "投入日期",
        "required": false
      },
      {
        "key": "PHASE_OUT_DATE",
        "label": "结束日期",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": true
      },
      {
        "key": "CATEGORY_MEANING",
        "label": "类别",
        "required": true
      },
      {
        "key": "CUSTOMER_PN",
        "label": "客户料号",
        "required": false
      },
      {
        "key": "Key",
        "label": "输入关键字搜索",
        "required": false
      },
      {
        "key": "key",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "CUSTOMER_ID": "客户测试值",
      "FAMILY_ID": "产品系列测试值",
      "MODEL_ID": "机种测试值",
      "BU_CODE": "制造单位测试值",
      "CLASSIFICATION": "厂部测试值",
      "PRODUCT_KIND": "产品性质测试值",
      "STAGE_CODE": "生产阶段测试值",
      "CUSTOMER": "客户测试值",
      "FAMILY_NAME": "产品系列测试值",
      "MODEL": "机种测试值",
      "DOUBLE_SIDE": "是否双面测试值",
      "LEAD_FLAG": "是否有铅测试值",
      "ATTRIBUTE2": "可循环使用测试值",
      "ATTRIBUTE3": "易错产品测试值",
      "SHIP_FLAG": "是否出货测试值",
      "EDI_FLAG": "是否EDI数据测试值",
      "WARRANTY_LIMIT": "保修期测试值",
      "TURNIN_TYPE": "是否自动存仓测试值",
      "PHASE_IN_DATE": "2026-08-01",
      "PHASE_OUT_DATE": "2026-08-01",
      "DESCRIPTION": "自动化测试备注001",
      "CATEGORY_MEANING": "类别测试值",
      "CUSTOMER_PN": "AT-001",
      "Key": "输入关键字搜索测试值",
      "key": "输入关键字搜索测试值"
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
        "searchClick"
      ],
      "testData": {
        "PART_NO": "AT-001",
        "CUSTOMER_ID": "客户测试值",
        "FAMILY_ID": "产品系列测试值",
        "MODEL_ID": "机种测试值",
        "BU_CODE": "制造单位测试值",
        "CLASSIFICATION": "厂部测试值",
        "PRODUCT_KIND": "产品性质测试值",
        "STAGE_CODE": "生产阶段测试值",
        "CUSTOMER": "客户测试值",
        "FAMILY_NAME": "产品系列测试值",
        "MODEL": "机种测试值",
        "DOUBLE_SIDE": "是否双面测试值",
        "LEAD_FLAG": "是否有铅测试值",
        "ATTRIBUTE2": "可循环使用测试值",
        "ATTRIBUTE3": "易错产品测试值",
        "SHIP_FLAG": "是否出货测试值",
        "EDI_FLAG": "是否EDI数据测试值",
        "WARRANTY_LIMIT": "保修期测试值",
        "TURNIN_TYPE": "是否自动存仓测试值",
        "PHASE_IN_DATE": "2026-08-01",
        "PHASE_OUT_DATE": "2026-08-01",
        "DESCRIPTION": "自动化测试备注001",
        "CATEGORY_MEANING": "类别测试值",
        "CUSTOMER_PN": "AT-001",
        "Key": "输入关键字搜索测试值",
        "key": "输入关键字搜索测试值"
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
      "key": "3d81345303-3d81345303-1ac74",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "cleanClick",
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
      "key": "13fd57e65b-2cd9e6ce81-77767",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(-1)",
      "permission": "SfcsPnAdd",
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
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_ID",
          "label": "客户",
          "required": true,
          "example": "客户测试值"
        },
        {
          "key": "FAMILY_ID",
          "label": "产品系列",
          "required": true,
          "example": "产品系列测试值"
        },
        {
          "key": "MODEL_ID",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "BU_CODE",
          "label": "制造单位",
          "required": true,
          "example": "制造单位测试值"
        },
        {
          "key": "CLASSIFICATION",
          "label": "厂部",
          "required": true,
          "example": "厂部测试值"
        },
        {
          "key": "PRODUCT_KIND",
          "label": "产品性质",
          "required": true,
          "example": "产品性质测试值"
        },
        {
          "key": "STAGE_CODE",
          "label": "生产阶段",
          "required": true,
          "example": "生产阶段测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": true,
          "example": "客户测试值"
        },
        {
          "key": "FAMILY_NAME",
          "label": "产品系列",
          "required": false,
          "example": "产品系列测试值"
        },
        {
          "key": "MODEL",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "DOUBLE_SIDE",
          "label": "是否双面",
          "required": false,
          "example": "是否双面测试值"
        },
        {
          "key": "LEAD_FLAG",
          "label": "是否有铅",
          "required": false,
          "example": "是否有铅测试值"
        },
        {
          "key": "ATTRIBUTE2",
          "label": "可循环使用",
          "required": false,
          "example": "可循环使用测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "易错产品",
          "required": false,
          "example": "易错产品测试值"
        },
        {
          "key": "SHIP_FLAG",
          "label": "是否出货",
          "required": false,
          "example": "是否出货测试值"
        },
        {
          "key": "EDI_FLAG",
          "label": "是否EDI数据",
          "required": false,
          "example": "是否EDI数据测试值"
        },
        {
          "key": "WARRANTY_LIMIT",
          "label": "保修期",
          "required": false,
          "example": "保修期测试值"
        },
        {
          "key": "TURNIN_TYPE",
          "label": "是否自动存仓",
          "required": true,
          "example": "是否自动存仓测试值"
        },
        {
          "key": "PHASE_IN_DATE",
          "label": "投入日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PHASE_OUT_DATE",
          "label": "结束日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CATEGORY_MEANING",
          "label": "类别",
          "required": true,
          "example": "类别测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        },
        {
          "key": "key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "CUSTOMER_ID": "客户测试值",
        "FAMILY_ID": "产品系列测试值",
        "MODEL_ID": "机种测试值",
        "BU_CODE": "制造单位测试值",
        "CLASSIFICATION": "厂部测试值",
        "PRODUCT_KIND": "产品性质测试值",
        "STAGE_CODE": "生产阶段测试值",
        "CUSTOMER": "客户测试值",
        "FAMILY_NAME": "产品系列测试值",
        "MODEL": "机种测试值",
        "DOUBLE_SIDE": "是否双面测试值",
        "LEAD_FLAG": "是否有铅测试值",
        "ATTRIBUTE2": "可循环使用测试值",
        "ATTRIBUTE3": "易错产品测试值",
        "SHIP_FLAG": "是否出货测试值",
        "EDI_FLAG": "是否EDI数据测试值",
        "WARRANTY_LIMIT": "保修期测试值",
        "TURNIN_TYPE": "是否自动存仓测试值",
        "PHASE_IN_DATE": "2026-08-01",
        "PHASE_OUT_DATE": "2026-08-01",
        "DESCRIPTION": "自动化测试备注001",
        "CATEGORY_MEANING": "类别测试值",
        "CUSTOMER_PN": "AT-001",
        "Key": "输入关键字搜索测试值",
        "key": "输入关键字搜索测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsPnEdit",
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
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_ID",
          "label": "客户",
          "required": true,
          "example": "客户测试值"
        },
        {
          "key": "FAMILY_ID",
          "label": "产品系列",
          "required": true,
          "example": "产品系列测试值"
        },
        {
          "key": "MODEL_ID",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "BU_CODE",
          "label": "制造单位",
          "required": true,
          "example": "制造单位测试值"
        },
        {
          "key": "CLASSIFICATION",
          "label": "厂部",
          "required": true,
          "example": "厂部测试值"
        },
        {
          "key": "PRODUCT_KIND",
          "label": "产品性质",
          "required": true,
          "example": "产品性质测试值"
        },
        {
          "key": "STAGE_CODE",
          "label": "生产阶段",
          "required": true,
          "example": "生产阶段测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": true,
          "example": "客户测试值"
        },
        {
          "key": "FAMILY_NAME",
          "label": "产品系列",
          "required": false,
          "example": "产品系列测试值"
        },
        {
          "key": "MODEL",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "DOUBLE_SIDE",
          "label": "是否双面",
          "required": false,
          "example": "是否双面测试值"
        },
        {
          "key": "LEAD_FLAG",
          "label": "是否有铅",
          "required": false,
          "example": "是否有铅测试值"
        },
        {
          "key": "ATTRIBUTE2",
          "label": "可循环使用",
          "required": false,
          "example": "可循环使用测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "易错产品",
          "required": false,
          "example": "易错产品测试值"
        },
        {
          "key": "SHIP_FLAG",
          "label": "是否出货",
          "required": false,
          "example": "是否出货测试值"
        },
        {
          "key": "EDI_FLAG",
          "label": "是否EDI数据",
          "required": false,
          "example": "是否EDI数据测试值"
        },
        {
          "key": "WARRANTY_LIMIT",
          "label": "保修期",
          "required": false,
          "example": "保修期测试值"
        },
        {
          "key": "TURNIN_TYPE",
          "label": "是否自动存仓",
          "required": true,
          "example": "是否自动存仓测试值"
        },
        {
          "key": "PHASE_IN_DATE",
          "label": "投入日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PHASE_OUT_DATE",
          "label": "结束日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CATEGORY_MEANING",
          "label": "类别",
          "required": true,
          "example": "类别测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        },
        {
          "key": "key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "CUSTOMER_ID": "客户测试值",
        "FAMILY_ID": "产品系列测试值",
        "MODEL_ID": "机种测试值",
        "BU_CODE": "制造单位测试值",
        "CLASSIFICATION": "厂部测试值",
        "PRODUCT_KIND": "产品性质测试值",
        "STAGE_CODE": "生产阶段测试值",
        "CUSTOMER": "客户测试值",
        "FAMILY_NAME": "产品系列测试值",
        "MODEL": "机种测试值",
        "DOUBLE_SIDE": "是否双面测试值",
        "LEAD_FLAG": "是否有铅测试值",
        "ATTRIBUTE2": "可循环使用测试值",
        "ATTRIBUTE3": "易错产品测试值",
        "SHIP_FLAG": "是否出货测试值",
        "EDI_FLAG": "是否EDI数据测试值",
        "WARRANTY_LIMIT": "保修期测试值",
        "TURNIN_TYPE": "是否自动存仓测试值",
        "PHASE_IN_DATE": "2026-08-01",
        "PHASE_OUT_DATE": "2026-08-01",
        "DESCRIPTION": "自动化测试备注001",
        "CATEGORY_MEANING": "类别测试值",
        "CUSTOMER_PN": "AT-001",
        "Key": "输入关键字搜索测试值",
        "key": "输入关键字搜索测试值"
      }
    }
  ]
});
