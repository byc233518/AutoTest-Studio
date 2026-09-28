// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-stencil-storage-index-efbf4c",
  "name": "旧版制造执行 - 报废出柜（未配置菜单）功能校验",
  "displayName": "报废出柜（未配置菜单）",
  "route": "/iMES/SmtStencilStorage/Index",
  "sourceRoute": "/iMES/SmtStencilStorage/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 报废出柜（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtStencilStorage/Index.vue",
  "dataSchema": {
    "columns": [
      "STENCIL_NO",
      "LOCATION",
      "MANUFACTURE_TIME",
      "REMARK"
    ],
    "required": [
      "STENCIL_NO",
      "LOCATION"
    ],
    "fields": [
      {
        "key": "STENCIL_NO",
        "label": "钢网编号",
        "required": true
      },
      {
        "key": "LOCATION",
        "label": "钢网储位",
        "required": true
      },
      {
        "key": "MANUFACTURE_TIME",
        "label": "制造日期",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注明细",
        "required": false
      }
    ],
    "example": {
      "STENCIL_NO": "AT-001",
      "LOCATION": "钢网储位测试值",
      "MANUFACTURE_TIME": "2026-08-01",
      "REMARK": "备注明细测试值"
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
        "STENCIL_NO": "AT-001",
        "LOCATION": "钢网储位测试值",
        "MANUFACTURE_TIME": "2026-08-01",
        "REMARK": "备注明细测试值"
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
      "key": "7e002f9936-92ee3020d0-e9624",
      "type": "业务动作",
      "name": "报废出柜业务入口校验",
      "label": "报废出柜",
      "handler": "baofei",
      "permission": "ScrapStencilStore",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位报废出柜",
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
