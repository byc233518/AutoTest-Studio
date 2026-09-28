// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-smt-placemen-monitor-index-b9a26b",
  "name": "制造执行 - 产品信息（未配置菜单）功能校验",
  "displayName": "产品信息（未配置菜单）",
  "route": "/iMES6/SmtPlacemenMonitor/Index",
  "sourceRoute": "/iMES6/SmtPlacemenMonitor/Index",
  "menuCode": "",
  "breadcrumb": "制造执行 / 未配置菜单 / 产品信息（未配置菜单）",
  "sourceFile": "src/views/iMES6/SmtPlacemenMonitor/Index.vue",
  "dataSchema": {
    "columns": [
      "LineCode",
      "LineId",
      "WoNo",
      "PartNo",
      "PartName",
      "PartDesc",
      "ControlMethod"
    ],
    "required": [
      "LineId",
      "WoNo"
    ],
    "fields": [
      {
        "key": "LineCode",
        "label": "区域编码",
        "required": false
      },
      {
        "key": "LineId",
        "label": "区域名称",
        "required": true
      },
      {
        "key": "WoNo",
        "label": "工单号",
        "required": true
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "PartName",
        "label": "品名",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "规格",
        "required": false
      },
      {
        "key": "ControlMethod",
        "label": "管控方式",
        "required": false
      }
    ],
    "example": {
      "LineCode": "AT-001",
      "LineId": "自动化样例001",
      "WoNo": "AT-001",
      "PartNo": "AT-001",
      "PartName": "自动化样例001",
      "PartDesc": "规格测试值",
      "ControlMethod": "管控方式测试值"
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
