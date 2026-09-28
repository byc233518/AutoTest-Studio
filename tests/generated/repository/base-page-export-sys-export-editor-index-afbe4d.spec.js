// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-export-sys-export-editor-index-afbe4d",
  "name": "基座系统 - 导出文件名称（未配置菜单）功能校验",
  "displayName": "导出文件名称（未配置菜单）",
  "route": "/Export/SysExportEditor/index",
  "sourceRoute": "/Export/SysExportEditor/index",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 导出文件名称（未配置菜单）",
  "sourceFile": "src/views/Export/SysExportEditor/index.vue",
  "dataSchema": {
    "columns": [
      "FileName",
      "ModuleBtnId",
      "BtnName",
      "Remark",
      "Enabled"
    ],
    "required": [
      "FileName",
      "ModuleBtnId"
    ],
    "fields": [
      {
        "key": "FileName",
        "label": "导出文件名称",
        "required": true
      },
      {
        "key": "ModuleBtnId",
        "label": "绑定按钮",
        "required": true
      },
      {
        "key": "BtnName",
        "label": "按钮别名",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "FileName": "自动化样例001",
      "ModuleBtnId": "绑定按钮测试值",
      "BtnName": "按钮别名测试值",
      "Remark": "自动化测试备注001",
      "Enabled": "是否激活测试值"
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
