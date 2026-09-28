// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-msdcontrol-operations-index-7135c1",
  "name": "旧版制造执行 - 料卷编号（未配置菜单）功能校验",
  "displayName": "料卷编号（未配置菜单）",
  "route": "/iMES/MSDControlOperations/Index",
  "sourceRoute": "/iMES/MSDControlOperations/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 料卷编号（未配置菜单）",
  "sourceFile": "src/views/iMES/MSDControlOperations/Index.vue",
  "dataSchema": {
    "columns": [
      "ReelCode",
      "ReelPartNO",
      "PartThickness",
      "PartLevelCode",
      "CurrentAction",
      "BeginTime",
      "PassedTime",
      "RatedControlTime",
      "TotalOpenTimeAfterBake",
      "CurrentArea",
      "ActionArea",
      "NewAction",
      "Humidity",
      "Temperature"
    ],
    "required": [],
    "fields": [
      {
        "key": "ReelCode",
        "label": "料卷编号",
        "required": false
      },
      {
        "key": "ReelPartNO",
        "label": "元件料号",
        "required": false
      },
      {
        "key": "PartThickness",
        "label": "元件厚度(mm)",
        "required": false
      },
      {
        "key": "PartLevelCode",
        "label": "元件等级",
        "required": false
      },
      {
        "key": "CurrentAction",
        "label": "当前操作",
        "required": false
      },
      {
        "key": "BeginTime",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "PassedTime",
        "label": "当前动作经历时间(H)",
        "required": false
      },
      {
        "key": "RatedControlTime",
        "label": "额定管控时间(H)",
        "required": false
      },
      {
        "key": "TotalOpenTimeAfterBake",
        "label": "暴露时间(H)",
        "required": false
      },
      {
        "key": "CurrentArea",
        "label": "当前区域",
        "required": false
      },
      {
        "key": "ActionArea",
        "label": "作业区域",
        "required": false
      },
      {
        "key": "NewAction",
        "label": "执行动作",
        "required": false
      },
      {
        "key": "Humidity",
        "label": "开封湿度",
        "required": false
      },
      {
        "key": "Temperature",
        "label": "开封温度",
        "required": false
      }
    ],
    "example": {
      "ReelCode": "AT-001",
      "ReelPartNO": "AT-001",
      "PartThickness": "元件厚度(mm)测试值",
      "PartLevelCode": "元件等级测试值",
      "CurrentAction": "当前操作测试值",
      "BeginTime": "2026-08-01",
      "PassedTime": "当前动作经历时间(H)测试值",
      "RatedControlTime": "额定管控时间(H)测试值",
      "TotalOpenTimeAfterBake": "暴露时间(H)测试值",
      "CurrentArea": "当前区域测试值",
      "ActionArea": "作业区域测试值",
      "NewAction": "执行动作测试值",
      "Humidity": "开封湿度测试值",
      "Temperature": "开封温度测试值"
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
