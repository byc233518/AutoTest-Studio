// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-system-settings-fbcfb2",
  "name": "基座系统 - 系统配置功能校验",
  "displayName": "系统配置",
  "route": "/SystemSettings",
  "sourceRoute": "/SystemSettings",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 系统配置",
  "sourceFile": "src/views/Admin/System/SystemSettings/index.vue",
  "dataSchema": {
    "columns": [
      "platformName",
      "adminEmail",
      "timezone",
      "sessionTimeout",
      "maxLoginAttempts",
      "enableTwoFactor"
    ],
    "required": [],
    "fields": [
      {
        "key": "platformName",
        "label": "平台名称",
        "required": false
      },
      {
        "key": "adminEmail",
        "label": "管理员邮箱",
        "required": false
      },
      {
        "key": "timezone",
        "label": "时区设置",
        "required": false
      },
      {
        "key": "sessionTimeout",
        "label": "会话超时",
        "required": false
      },
      {
        "key": "maxLoginAttempts",
        "label": "登录失败限制",
        "required": false
      },
      {
        "key": "enableTwoFactor",
        "label": "启用双因子认证",
        "required": false
      }
    ],
    "example": {
      "platformName": "自动化样例001",
      "adminEmail": "管理员邮箱测试值",
      "timezone": "时区设置测试值",
      "sessionTimeout": "会话超时测试值",
      "maxLoginAttempts": "登录失败限制测试值",
      "enableTwoFactor": "启用双因子认证测试值"
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
      "key": "7e002f9936-bb79ec7c15-20468",
      "type": "业务动作",
      "name": "保存设置业务入口校验",
      "label": "保存设置",
      "handler": "handleSave",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存设置",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
