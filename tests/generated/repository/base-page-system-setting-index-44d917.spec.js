// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-system-setting-index-44d917",
  "name": "基座系统 - 品牌管理功能校验",
  "displayName": "品牌管理",
  "route": "/SystemSetting/Index",
  "sourceRoute": "/SystemSetting/Index",
  "menuCode": "SystemSetting",
  "breadcrumb": "配置中心 / 运维中心 / 品牌管理",
  "sourceFile": "src/views/SystemSetting/Index.vue",
  "dataSchema": {
    "columns": [
      "SystemFullName",
      "SystemAliasEng",
      "SystemAlias",
      "FilePathSystemLogo",
      "FilePathMenuLogo",
      "FilePathBackground"
    ],
    "required": [
      "SystemFullName",
      "SystemAliasEng",
      "SystemAlias",
      "FilePathSystemLogo",
      "FilePathMenuLogo",
      "FilePathBackground"
    ],
    "fields": [
      {
        "key": "SystemFullName",
        "label": "系统全称",
        "required": true
      },
      {
        "key": "SystemAliasEng",
        "label": "系统英文简称",
        "required": true
      },
      {
        "key": "SystemAlias",
        "label": "系统中文别名",
        "required": true
      },
      {
        "key": "FilePathSystemLogo",
        "label": "系统LOGO",
        "required": true
      },
      {
        "key": "FilePathMenuLogo",
        "label": "导航栏缩略图",
        "required": true
      },
      {
        "key": "FilePathBackground",
        "label": "首页背景图",
        "required": true
      }
    ],
    "example": {
      "SystemFullName": "系统全称测试值",
      "SystemAliasEng": "系统英文简称测试值",
      "SystemAlias": "系统中文别名测试值",
      "FilePathSystemLogo": "系统LOGO测试值",
      "FilePathMenuLogo": "导航栏缩略图测试值",
      "FilePathBackground": "首页背景图测试值"
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
    }
  ]
});
