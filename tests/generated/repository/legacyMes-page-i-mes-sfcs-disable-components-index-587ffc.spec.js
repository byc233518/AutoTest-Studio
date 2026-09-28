// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-disable-components-index-587ffc",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SfcsDisableComponents/index",
  "sourceRoute": "/iMES/SfcsDisableComponents/index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsDisableComponents/index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "CUSTOMER_COMPONENT_PN",
      "ENABLED",
      "UPDATEUSER",
      "BEGIN_DATE",
      "END_DATE",
      "DISABLE_COMPONENT_PN",
      "CREATEUSER"
    ],
    "required": [
      "WO_NO",
      "CUSTOMER_COMPONENT_PN",
      "DISABLE_COMPONENT_PN",
      "CREATEUSER"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "CUSTOMER_COMPONENT_PN",
        "label": "产品料号",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否可用",
        "required": false
      },
      {
        "key": "UPDATEUSER",
        "label": "修改人",
        "required": false
      },
      {
        "key": "BEGIN_DATE",
        "label": "有效起始日期",
        "required": false
      },
      {
        "key": "END_DATE",
        "label": "有效结束日期",
        "required": false
      },
      {
        "key": "DISABLE_COMPONENT_PN",
        "label": "禁用料号",
        "required": true
      },
      {
        "key": "CREATEUSER",
        "label": "创建人",
        "required": true
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "CUSTOMER_COMPONENT_PN": "AT-001",
      "ENABLED": "是否可用测试值",
      "UPDATEUSER": "修改人测试值",
      "BEGIN_DATE": "2026-08-01",
      "END_DATE": "2026-08-01",
      "DISABLE_COMPONENT_PN": "AT-001",
      "CREATEUSER": "创建人测试值"
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
        "WO_NO": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001",
        "ENABLED": "是否可用测试值",
        "UPDATEUSER": "修改人测试值",
        "BEGIN_DATE": "2026-08-01",
        "END_DATE": "2026-08-01",
        "DISABLE_COMPONENT_PN": "AT-001",
        "CREATEUSER": "创建人测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-77767",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(-1)",
      "permission": "SmtReplacePnAdd",
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
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPONENT_PN",
          "label": "产品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        },
        {
          "key": "UPDATEUSER",
          "label": "修改人",
          "required": false,
          "example": "修改人测试值"
        },
        {
          "key": "BEGIN_DATE",
          "label": "有效起始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_DATE",
          "label": "有效结束日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DISABLE_COMPONENT_PN",
          "label": "禁用料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CREATEUSER",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001",
        "ENABLED": "是否可用测试值",
        "UPDATEUSER": "修改人测试值",
        "BEGIN_DATE": "2026-08-01",
        "END_DATE": "2026-08-01",
        "DISABLE_COMPONENT_PN": "AT-001",
        "CREATEUSER": "创建人测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-45f7b",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editBut(row, row.$index)",
      "permission": "SmtReplacePnEdit",
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
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CUSTOMER_COMPONENT_PN",
          "label": "产品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        },
        {
          "key": "UPDATEUSER",
          "label": "修改人",
          "required": false,
          "example": "修改人测试值"
        },
        {
          "key": "BEGIN_DATE",
          "label": "有效起始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "END_DATE",
          "label": "有效结束日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DISABLE_COMPONENT_PN",
          "label": "禁用料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CREATEUSER",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "CUSTOMER_COMPONENT_PN": "AT-001",
        "ENABLED": "是否可用测试值",
        "UPDATEUSER": "修改人测试值",
        "BEGIN_DATE": "2026-08-01",
        "END_DATE": "2026-08-01",
        "DISABLE_COMPONENT_PN": "AT-001",
        "CREATEUSER": "创建人测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SmtReplacePnRemove",
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
