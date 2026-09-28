// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-print-files-mapping-index-1c2b82",
  "name": "制造执行 - 标签绑定条码功能校验",
  "displayName": "标签绑定条码",
  "route": "/iMES6/ImesPrintFilesMapping/Index",
  "sourceRoute": "/iMES6/ImesPrintFilesMapping/Index",
  "menuCode": "iMES6_PrintFilesMapping",
  "breadcrumb": "条码管理 / 产品条码管理 / 标签绑定条码",
  "sourceFile": "src/views/iMES6/ImesPrintFilesMapping/Index.vue",
  "dataSchema": {
    "columns": [
      "PrintFileId",
      "IsDefault",
      "CustomerId",
      "PartTypeId",
      "PartClassId",
      "PartNo",
      "WoNo",
      "formMode",
      "SiteOperationId",
      "AutoPrintFlag",
      "Enabled",
      "LabelType",
      "SqlContent"
    ],
    "required": [
      "PrintFileId",
      "IsDefault",
      "AutoPrintFlag",
      "Enabled",
      "LabelType",
      "SqlContent"
    ],
    "fields": [
      {
        "key": "PrintFileId",
        "label": "标签文件名称",
        "required": true
      },
      {
        "key": "IsDefault",
        "label": "默认",
        "required": true
      },
      {
        "key": "CustomerId",
        "label": "客户",
        "required": false
      },
      {
        "key": "PartTypeId",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "PartClassId",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "WoNo",
        "label": "工单",
        "required": false
      },
      {
        "key": "formMode",
        "label": "选择其中一项",
        "required": false
      },
      {
        "key": "SiteOperationId",
        "label": "打印工序",
        "required": false
      },
      {
        "key": "AutoPrintFlag",
        "label": "自动打印",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "LabelType",
        "label": "标签类型",
        "required": true
      },
      {
        "key": "SqlContent",
        "label": "数据源SQL",
        "required": true
      }
    ],
    "example": {
      "PrintFileId": "自动化样例001",
      "IsDefault": "默认测试值",
      "CustomerId": "客户测试值",
      "PartTypeId": "物料类别测试值",
      "PartClassId": "物料子类测试值",
      "PartNo": "AT-001",
      "WoNo": "工单测试值",
      "formMode": "选择其中一项测试值",
      "SiteOperationId": "打印工序测试值",
      "AutoPrintFlag": "自动打印测试值",
      "Enabled": "是否激活测试值",
      "LabelType": "标签类型测试值",
      "SqlContent": "数据源SQL测试值"
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
        "PrintFileId": "自动化样例001",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "WoNo": "工单测试值",
        "formMode": "选择其中一项测试值",
        "SiteOperationId": "打印工序测试值",
        "AutoPrintFlag": "自动打印测试值",
        "Enabled": "是否激活测试值",
        "LabelType": "标签类型测试值",
        "SqlContent": "数据源SQL测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-d37ed",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addNewForm",
      "permission": "Add",
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
          "key": "PrintFileId",
          "label": "标签文件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "IsDefault",
          "label": "默认",
          "required": true,
          "example": "默认测试值"
        },
        {
          "key": "CustomerId",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "PartTypeId",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "PartClassId",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WoNo",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "formMode",
          "label": "选择其中一项",
          "required": false,
          "example": "选择其中一项测试值"
        },
        {
          "key": "SiteOperationId",
          "label": "打印工序",
          "required": false,
          "example": "打印工序测试值"
        },
        {
          "key": "AutoPrintFlag",
          "label": "自动打印",
          "required": true,
          "example": "自动打印测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "LabelType",
          "label": "标签类型",
          "required": true,
          "example": "标签类型测试值"
        },
        {
          "key": "SqlContent",
          "label": "数据源SQL",
          "required": true,
          "example": "数据源SQL测试值"
        }
      ],
      "testData": {
        "PrintFileId": "自动化样例001",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "WoNo": "工单测试值",
        "formMode": "选择其中一项测试值",
        "SiteOperationId": "打印工序测试值",
        "AutoPrintFlag": "自动打印测试值",
        "Enabled": "是否激活测试值",
        "LabelType": "标签类型测试值",
        "SqlContent": "数据源SQL测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
      "menuTriggerLabel": "",
      "rowAction": true,
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
