// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-product-components-index-a6bcc0",
  "name": "旧版制造执行 - 料号（未配置菜单）功能校验",
  "displayName": "料号（未配置菜单）",
  "route": "/iMES/SfcsProductComponents/Index",
  "sourceRoute": "/iMES/SfcsProductComponents/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 料号（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsProductComponents/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "ODM_COMPONENT_PN",
      "CUSTOMER_COMPONENT_PN"
    ],
    "required": [
      "PART_NO",
      "ODM_COMPONENT_PN",
      "CUSTOMER_COMPONENT_PN"
    ],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "ODM_COMPONENT_PN",
        "label": "零件料号",
        "required": true
      },
      {
        "key": "CUSTOMER_COMPONENT_PN",
        "label": "客户零件料号",
        "required": true
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "ODM_COMPONENT_PN": "AT-001",
      "CUSTOMER_COMPONENT_PN": "AT-001"
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
        "ODM_COMPONENT_PN": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001"
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
      "key": "13fd57e65b-0d81f3965a-73f5f",
      "type": "新增表单",
      "name": "新增零件料号业务入口校验",
      "label": "新增零件料号",
      "handler": "addPartsAssemblyClick(null)",
      "permission": "SfcsProductComponentsSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增零件料号",
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
          "key": "ODM_COMPONENT_PN",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPONENT_PN",
          "label": "客户零件料号",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ODM_COMPONENT_PN": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001"
      }
    },
    {
      "key": "13fd57e65b-594d3474d9-4e0b8",
      "type": "新增表单",
      "name": "新增零件附件业务入口校验",
      "label": "新增零件附件",
      "handler": "addPartsAndAccessoriesClick(null)",
      "permission": "SfcsProductComponentsSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增零件附件",
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
          "key": "ODM_COMPONENT_PN",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPONENT_PN",
          "label": "客户零件料号",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ODM_COMPONENT_PN": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001"
      }
    },
    {
      "key": "13fd57e65b-f39c175dc9-03700",
      "type": "新增表单",
      "name": "新增替代料维护业务入口校验",
      "label": "新增替代料维护",
      "handler": "addAlternativeMaterialsClick(null)",
      "permission": "SfcsProductComponentsSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增替代料维护",
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
          "key": "ODM_COMPONENT_PN",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPONENT_PN",
          "label": "客户零件料号",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ODM_COMPONENT_PN": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001"
      }
    },
    {
      "key": "13fd57e65b-80f5758389-644b3",
      "type": "新增表单",
      "name": "新增替代料附件业务入口校验",
      "label": "新增替代料附件",
      "handler": "addSubstituteAccessoriesClick(null)",
      "permission": "SfcsProductComponentsSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增替代料附件",
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
          "key": "ODM_COMPONENT_PN",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPONENT_PN",
          "label": "客户零件料号",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ODM_COMPONENT_PN": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001"
      }
    }
  ]
});
