// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-runcard-ranger-rules-index-fff190",
  "name": "旧版制造执行 - 流水号规则（未配置菜单）功能校验",
  "displayName": "流水号规则（未配置菜单）",
  "route": "/iMES/SfcsRuncardRangerRules/Index",
  "sourceRoute": "/iMES/SfcsRuncardRangerRules/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 流水号规则（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsRuncardRangerRules/Index.vue",
  "dataSchema": {
    "columns": [
      "RangerRuleType",
      "CUSTOMER_ID",
      "PRODUCT_FAMILY_NAME",
      "PART_NO",
      "SALES_ORDER",
      "WO_NO",
      "FIX_HEADER",
      "RANGE_LENGTH",
      "DIGITAL",
      "FIX_TAIL",
      "RANGE_START_CODE",
      "ENABLED",
      "OPERATION_ID",
      "Key",
      "PRODUCT_FAMILY_ID",
      "FAMILY_NAME"
    ],
    "required": [
      "FIX_HEADER",
      "RANGE_LENGTH",
      "DIGITAL",
      "RANGE_START_CODE"
    ],
    "fields": [
      {
        "key": "RangerRuleType",
        "label": "流水范围类别",
        "required": false
      },
      {
        "key": "CUSTOMER_ID",
        "label": "客户",
        "required": false
      },
      {
        "key": "PRODUCT_FAMILY_NAME",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "成品料号",
        "required": false
      },
      {
        "key": "SALES_ORDER",
        "label": "销售单号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "FIX_HEADER",
        "label": "前导符",
        "required": true
      },
      {
        "key": "RANGE_LENGTH",
        "label": "流水范围长度",
        "required": true
      },
      {
        "key": "DIGITAL",
        "label": "进制",
        "required": true
      },
      {
        "key": "FIX_TAIL",
        "label": "结束符",
        "required": false
      },
      {
        "key": "RANGE_START_CODE",
        "label": "流水范围开始字符",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "OPERATION_ID",
        "label": "工序",
        "required": false
      },
      {
        "key": "Key",
        "label": "客户名称",
        "required": false
      },
      {
        "key": "PRODUCT_FAMILY_ID",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "FAMILY_NAME",
        "label": "物料类别",
        "required": false
      }
    ],
    "example": {
      "RangerRuleType": "流水范围类别测试值",
      "CUSTOMER_ID": "客户测试值",
      "PRODUCT_FAMILY_NAME": "物料类别测试值",
      "PART_NO": "AT-001",
      "SALES_ORDER": "AT-001",
      "WO_NO": "AT-001",
      "FIX_HEADER": "前导符测试值",
      "RANGE_LENGTH": "流水范围长度测试值",
      "DIGITAL": "进制测试值",
      "FIX_TAIL": "结束符测试值",
      "RANGE_START_CODE": "流水范围开始字符测试值",
      "ENABLED": "是否激活测试值",
      "OPERATION_ID": "工序测试值",
      "Key": "自动化样例001",
      "PRODUCT_FAMILY_ID": "物料类别测试值",
      "FAMILY_NAME": "物料类别测试值"
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
        "searchClient",
        "searchProduct",
        "searchWO_NO",
        "searchClick"
      ],
      "testData": {
        "RangerRuleType": "流水范围类别测试值",
        "CUSTOMER_ID": "客户测试值",
        "PRODUCT_FAMILY_NAME": "物料类别测试值",
        "PART_NO": "AT-001",
        "SALES_ORDER": "AT-001",
        "WO_NO": "AT-001",
        "FIX_HEADER": "前导符测试值",
        "RANGE_LENGTH": "流水范围长度测试值",
        "DIGITAL": "进制测试值",
        "FIX_TAIL": "结束符测试值",
        "RANGE_START_CODE": "流水范围开始字符测试值",
        "ENABLED": "是否激活测试值",
        "OPERATION_ID": "工序测试值",
        "Key": "自动化样例001",
        "PRODUCT_FAMILY_ID": "物料类别测试值",
        "FAMILY_NAME": "物料类别测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-5c559",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "eliminateClick",
      "permission": "SfcsRuncardRangerRulesAdd",
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
          "key": "RangerRuleType",
          "label": "流水范围类别",
          "required": false,
          "example": "流水范围类别测试值"
        },
        {
          "key": "CUSTOMER_ID",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "PRODUCT_FAMILY_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "PART_NO",
          "label": "成品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "SALES_ORDER",
          "label": "销售单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "FIX_HEADER",
          "label": "前导符",
          "required": true,
          "example": "前导符测试值"
        },
        {
          "key": "RANGE_LENGTH",
          "label": "流水范围长度",
          "required": true,
          "example": "流水范围长度测试值"
        },
        {
          "key": "DIGITAL",
          "label": "进制",
          "required": true,
          "example": "进制测试值"
        },
        {
          "key": "FIX_TAIL",
          "label": "结束符",
          "required": false,
          "example": "结束符测试值"
        },
        {
          "key": "RANGE_START_CODE",
          "label": "流水范围开始字符",
          "required": true,
          "example": "流水范围开始字符测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "OPERATION_ID",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "Key",
          "label": "客户名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PRODUCT_FAMILY_ID",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "FAMILY_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        }
      ],
      "testData": {
        "RangerRuleType": "流水范围类别测试值",
        "CUSTOMER_ID": "客户测试值",
        "PRODUCT_FAMILY_NAME": "物料类别测试值",
        "PART_NO": "AT-001",
        "SALES_ORDER": "AT-001",
        "WO_NO": "AT-001",
        "FIX_HEADER": "前导符测试值",
        "RANGE_LENGTH": "流水范围长度测试值",
        "DIGITAL": "进制测试值",
        "FIX_TAIL": "结束符测试值",
        "RANGE_START_CODE": "流水范围开始字符测试值",
        "ENABLED": "是否激活测试值",
        "OPERATION_ID": "工序测试值",
        "Key": "自动化样例001",
        "PRODUCT_FAMILY_ID": "物料类别测试值",
        "FAMILY_NAME": "物料类别测试值"
      }
    }
  ]
});
