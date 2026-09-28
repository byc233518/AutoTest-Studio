// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-runcard-ranger-rules-index-931f13",
  "name": "制造执行 - 产品条码规则配置功能校验",
  "displayName": "产品条码规则配置",
  "route": "/iMES6/ImesRuncardRangerRules/Index",
  "sourceRoute": "/iMES6/ImesRuncardRangerRules/Index",
  "menuCode": "iMES6_RuncardRangerRules",
  "breadcrumb": "条码管理 / 产品条码管理 / 产品条码规则配置",
  "sourceFile": "src/views/iMES6/ImesRuncardRangerRules/Index.vue",
  "dataSchema": {
    "columns": [
      "formMode",
      "IsDefault",
      "CustomerId",
      "PartTypeId",
      "PartClassId",
      "PartNo",
      "SalesOrder",
      "WoNo",
      "FixHeader",
      "RangeLength",
      "OperationId",
      "FixTail",
      "RangeStartCode",
      "Digital",
      "Enabled",
      "LabelType",
      "SqlContent"
    ],
    "required": [
      "IsDefault",
      "RangeLength",
      "RangeStartCode",
      "Digital",
      "Enabled",
      "LabelType",
      "SqlContent"
    ],
    "fields": [
      {
        "key": "formMode",
        "label": "流水范围类别",
        "required": false
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
        "key": "SalesOrder",
        "label": "销售单号",
        "required": false
      },
      {
        "key": "WoNo",
        "label": "工单",
        "required": false
      },
      {
        "key": "FixHeader",
        "label": "前导符",
        "required": false
      },
      {
        "key": "RangeLength",
        "label": "流水范围长度",
        "required": true
      },
      {
        "key": "OperationId",
        "label": "打印工序",
        "required": false
      },
      {
        "key": "FixTail",
        "label": "结束符",
        "required": false
      },
      {
        "key": "RangeStartCode",
        "label": "流水范围开始字符",
        "required": true
      },
      {
        "key": "Digital",
        "label": "进制",
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
      "formMode": "流水范围类别测试值",
      "IsDefault": "默认测试值",
      "CustomerId": "客户测试值",
      "PartTypeId": "物料类别测试值",
      "PartClassId": "物料子类测试值",
      "PartNo": "AT-001",
      "SalesOrder": "AT-001",
      "WoNo": "工单测试值",
      "FixHeader": "前导符测试值",
      "RangeLength": "流水范围长度测试值",
      "OperationId": "打印工序测试值",
      "FixTail": "结束符测试值",
      "RangeStartCode": "流水范围开始字符测试值",
      "Digital": "进制测试值",
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
        "formMode": "流水范围类别测试值",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "SalesOrder": "AT-001",
        "WoNo": "工单测试值",
        "FixHeader": "前导符测试值",
        "RangeLength": "流水范围长度测试值",
        "OperationId": "打印工序测试值",
        "FixTail": "结束符测试值",
        "RangeStartCode": "流水范围开始字符测试值",
        "Digital": "进制测试值",
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
          "key": "formMode",
          "label": "流水范围类别",
          "required": false,
          "example": "流水范围类别测试值"
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
          "key": "SalesOrder",
          "label": "销售单号",
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
          "key": "FixHeader",
          "label": "前导符",
          "required": false,
          "example": "前导符测试值"
        },
        {
          "key": "RangeLength",
          "label": "流水范围长度",
          "required": true,
          "example": "流水范围长度测试值"
        },
        {
          "key": "OperationId",
          "label": "打印工序",
          "required": false,
          "example": "打印工序测试值"
        },
        {
          "key": "FixTail",
          "label": "结束符",
          "required": false,
          "example": "结束符测试值"
        },
        {
          "key": "RangeStartCode",
          "label": "流水范围开始字符",
          "required": true,
          "example": "流水范围开始字符测试值"
        },
        {
          "key": "Digital",
          "label": "进制",
          "required": true,
          "example": "进制测试值"
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
        "formMode": "流水范围类别测试值",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "SalesOrder": "AT-001",
        "WoNo": "工单测试值",
        "FixHeader": "前导符测试值",
        "RangeLength": "流水范围长度测试值",
        "OperationId": "打印工序测试值",
        "FixTail": "结束符测试值",
        "RangeStartCode": "流水范围开始字符测试值",
        "Digital": "进制测试值",
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
