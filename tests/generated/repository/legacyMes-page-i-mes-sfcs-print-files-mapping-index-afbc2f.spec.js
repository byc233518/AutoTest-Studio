// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-print-files-mapping-index-afbc2f",
  "name": "旧版制造执行 - 清空（未配置菜单）功能校验",
  "displayName": "清空（未配置菜单）",
  "route": "/iMES/SfcsPrintFilesMapping/Index",
  "sourceRoute": "/iMES/SfcsPrintFilesMapping/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清空（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsPrintFilesMapping/Index.vue",
  "dataSchema": {
    "columns": [
      "PRINT_FILE_ID",
      "selected",
      "CUSTOMER_ID",
      "SITE_OPERATION_ID",
      "WO_NO",
      "PART_NO",
      "PRODUCT_FAMILY_NAME",
      "AUTO_PRINT_FLAG",
      "ENABLED",
      "PRODUCT_FAMILY_ID",
      "FAMILY_NAME"
    ],
    "required": [
      "PRINT_FILE_ID",
      "SITE_OPERATION_ID"
    ],
    "fields": [
      {
        "key": "PRINT_FILE_ID",
        "label": "标签文件名称",
        "required": true
      },
      {
        "key": "selected",
        "label": "选择其中一项",
        "required": false
      },
      {
        "key": "CUSTOMER_ID",
        "label": "客户",
        "required": false
      },
      {
        "key": "SITE_OPERATION_ID",
        "label": "打印工序",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PRODUCT_FAMILY_NAME",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "AUTO_PRINT_FLAG",
        "label": "自动打印",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
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
      "PRINT_FILE_ID": "自动化样例001",
      "selected": "选择其中一项测试值",
      "CUSTOMER_ID": "客户测试值",
      "SITE_OPERATION_ID": "打印工序测试值",
      "WO_NO": "工单测试值",
      "PART_NO": "AT-001",
      "PRODUCT_FAMILY_NAME": "物料类别测试值",
      "AUTO_PRINT_FLAG": "自动打印测试值",
      "ENABLED": "是否激活测试值",
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
        "ProdSearch2",
        "searchClick",
        "ProdSearch"
      ],
      "testData": {
        "PRINT_FILE_ID": "自动化样例001",
        "selected": "选择其中一项测试值",
        "CUSTOMER_ID": "客户测试值",
        "SITE_OPERATION_ID": "打印工序测试值",
        "WO_NO": "工单测试值",
        "PART_NO": "AT-001",
        "PRODUCT_FAMILY_NAME": "物料类别测试值",
        "AUTO_PRINT_FLAG": "自动打印测试值",
        "ENABLED": "是否激活测试值",
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
    }
  ]
});
