// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-system-setting-license-8d3a0a",
  "name": "基座系统 - 系统授权功能校验",
  "displayName": "系统授权",
  "route": "/SystemSetting/license",
  "sourceRoute": "/SystemSetting/license",
  "menuCode": "SystemLicense",
  "breadcrumb": "配置中心 / 运维中心 / 系统授权",
  "sourceFile": "src/views/SystemSetting/license.vue",
  "dataSchema": {
    "columns": [
      "AuthorityID",
      "AuthorityKey",
      "AuthorityInputDate",
      "AuthorityRemainingDays",
      "AuthorityExpiredDate",
      "AuthorityWarningDays",
      "AuthorityMesLineCount"
    ],
    "required": [],
    "fields": [
      {
        "key": "AuthorityID",
        "label": "注册码ID",
        "required": false
      },
      {
        "key": "AuthorityKey",
        "label": "注册码",
        "required": false
      },
      {
        "key": "AuthorityInputDate",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "AuthorityRemainingDays",
        "label": "有效期限(天)",
        "required": false
      },
      {
        "key": "AuthorityExpiredDate",
        "label": "失效时间",
        "required": false
      },
      {
        "key": "AuthorityWarningDays",
        "label": "提前提醒天数",
        "required": false
      },
      {
        "key": "AuthorityMesLineCount",
        "label": "线体数",
        "required": false
      }
    ],
    "example": {
      "AuthorityID": "AT-001",
      "AuthorityKey": "注册码测试值",
      "AuthorityInputDate": "2026-08-01",
      "AuthorityRemainingDays": "有效期限(天)测试值",
      "AuthorityExpiredDate": "2026-08-01",
      "AuthorityWarningDays": "提前提醒天数测试值",
      "AuthorityMesLineCount": "线体数测试值"
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
      "key": "4aa22a22ac-c9c77517fe-05da3",
      "type": "编辑表单",
      "name": "修改业务入口校验",
      "label": "修改",
      "handler": "openKeyEdit",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击修改",
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
          "key": "AuthorityID",
          "label": "注册码ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "AuthorityKey",
          "label": "注册码",
          "required": false,
          "example": "注册码测试值"
        },
        {
          "key": "AuthorityInputDate",
          "label": "开始时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AuthorityRemainingDays",
          "label": "有效期限(天)",
          "required": false,
          "example": "有效期限(天)测试值"
        },
        {
          "key": "AuthorityExpiredDate",
          "label": "失效时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AuthorityWarningDays",
          "label": "提前提醒天数",
          "required": false,
          "example": "提前提醒天数测试值"
        },
        {
          "key": "AuthorityMesLineCount",
          "label": "线体数",
          "required": false,
          "example": "线体数测试值"
        }
      ],
      "testData": {
        "AuthorityID": "AT-001",
        "AuthorityKey": "注册码测试值",
        "AuthorityInputDate": "2026-08-01",
        "AuthorityRemainingDays": "有效期限(天)测试值",
        "AuthorityExpiredDate": "2026-08-01",
        "AuthorityWarningDays": "提前提醒天数测试值",
        "AuthorityMesLineCount": "线体数测试值"
      }
    }
  ]
});
