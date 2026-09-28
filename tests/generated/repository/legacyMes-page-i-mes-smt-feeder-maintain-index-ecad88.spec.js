// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-feeder-maintain-index-ecad88",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SmtFeederMaintain/Index",
  "sourceRoute": "/iMES/SmtFeederMaintain/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtFeederMaintain/Index.vue",
  "dataSchema": {
    "columns": [
      "MAINTAIN_KIND",
      "FEEDER",
      "DESCRIPTION"
    ],
    "required": [],
    "fields": [
      {
        "key": "MAINTAIN_KIND",
        "label": "维护类型",
        "required": false
      },
      {
        "key": "FEEDER",
        "label": "料架编号",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": false
      }
    ],
    "example": {
      "MAINTAIN_KIND": "维护类型测试值",
      "FEEDER": "AT-001",
      "DESCRIPTION": "自动化测试备注001"
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
