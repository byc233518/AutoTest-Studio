// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-stencil-clean-index-970dee",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SmtStencilClean/Index",
  "sourceRoute": "/iMES/SmtStencilClean/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtStencilClean/Index.vue",
  "dataSchema": {
    "columns": [
      "STENCIL_NO",
      "LAST_CLEAN_TIME",
      "TENSION_A",
      "TENSION_B",
      "TENSION_C",
      "TENSION_D",
      "TENSION_E",
      "PrintCount",
      "WorkNo"
    ],
    "required": [],
    "fields": [
      {
        "key": "STENCIL_NO",
        "label": "钢网编号",
        "required": false
      },
      {
        "key": "LAST_CLEAN_TIME",
        "label": "上一次清洗时间",
        "required": false
      },
      {
        "key": "TENSION_A",
        "label": "张力点 上",
        "required": false
      },
      {
        "key": "TENSION_B",
        "label": "张力点 下",
        "required": false
      },
      {
        "key": "TENSION_C",
        "label": "张力点 左",
        "required": false
      },
      {
        "key": "TENSION_D",
        "label": "张力点 右",
        "required": false
      },
      {
        "key": "TENSION_E",
        "label": "张力点 中",
        "required": false
      },
      {
        "key": "PrintCount",
        "label": "已印刷次数",
        "required": false
      },
      {
        "key": "WorkNo",
        "label": "清洗及检查人",
        "required": false
      }
    ],
    "example": {
      "STENCIL_NO": "AT-001",
      "LAST_CLEAN_TIME": "2026-08-01",
      "TENSION_A": "张力点 上测试值",
      "TENSION_B": "张力点 下测试值",
      "TENSION_C": "张力点 左测试值",
      "TENSION_D": "张力点 右测试值",
      "TENSION_E": "张力点 中测试值",
      "PrintCount": "已印刷次数测试值",
      "WorkNo": "清洗及检查人测试值"
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
        "getLoadData"
      ],
      "testData": {
        "STENCIL_NO": "AT-001",
        "LAST_CLEAN_TIME": "2026-08-01",
        "TENSION_A": "张力点 上测试值",
        "TENSION_B": "张力点 下测试值",
        "TENSION_C": "张力点 左测试值",
        "TENSION_D": "张力点 右测试值",
        "TENSION_E": "张力点 中测试值",
        "PrintCount": "已印刷次数测试值",
        "WorkNo": "清洗及检查人测试值"
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
    }
  ]
});
