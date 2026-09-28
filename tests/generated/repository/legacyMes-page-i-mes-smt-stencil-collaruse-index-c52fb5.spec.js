// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-stencil-collaruse-index-c52fb5",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SmtStencilCollaruse/Index",
  "sourceRoute": "/iMES/SmtStencilCollaruse/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtStencilCollaruse/Index.vue",
  "dataSchema": {
    "columns": [
      "STENCIL_NO",
      "WorkNo",
      "TENSION_A",
      "TENSION_B",
      "TENSION_C",
      "TENSION_D",
      "TENSION_E"
    ],
    "required": [],
    "fields": [
      {
        "key": "STENCIL_NO",
        "label": "网板编号",
        "required": false
      },
      {
        "key": "WorkNo",
        "label": "领用者工号",
        "required": false
      },
      {
        "key": "TENSION_A",
        "label": "张力上点",
        "required": false
      },
      {
        "key": "TENSION_B",
        "label": "张力下点",
        "required": false
      },
      {
        "key": "TENSION_C",
        "label": "张力左点",
        "required": false
      },
      {
        "key": "TENSION_D",
        "label": "张力右点",
        "required": false
      },
      {
        "key": "TENSION_E",
        "label": "张力中点",
        "required": false
      }
    ],
    "example": {
      "STENCIL_NO": "AT-001",
      "WorkNo": "领用者工号测试值",
      "TENSION_A": "张力上点测试值",
      "TENSION_B": "张力下点测试值",
      "TENSION_C": "张力左点测试值",
      "TENSION_D": "张力右点测试值",
      "TENSION_E": "张力中点测试值"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "STENCIL_NO": "AT-001",
        "WorkNo": "领用者工号测试值",
        "TENSION_A": "张力上点测试值",
        "TENSION_B": "张力下点测试值",
        "TENSION_C": "张力左点测试值",
        "TENSION_D": "张力右点测试值",
        "TENSION_E": "张力中点测试值"
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
      "key": "7e002f9936-caa341bda1-94d88",
      "type": "业务动作",
      "name": "网板领用业务入口校验",
      "label": "网板领用",
      "handler": "preserveClick",
      "permission": "SmtStencilCollaruseSave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位网板领用",
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
