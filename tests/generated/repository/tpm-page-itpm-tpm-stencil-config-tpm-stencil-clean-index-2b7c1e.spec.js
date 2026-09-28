// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-stencil-config-tpm-stencil-clean-index-2b7c1e",
  "name": "设备管理 - 钢网清洗（未配置菜单）功能校验",
  "displayName": "钢网清洗（未配置菜单）",
  "route": "/ITPM/TpmStencilConfig/TpmStencilClean/Index",
  "sourceRoute": "/ITPM/TpmStencilConfig/TpmStencilClean/Index",
  "menuCode": "",
  "breadcrumb": "设备管理 / 未配置菜单 / 钢网清洗（未配置菜单）",
  "sourceFile": "src/views/ITPM/TpmStencilConfig/TpmStencilClean/Index.vue",
  "dataSchema": {
    "columns": [
      "StencilNo",
      "LastCleanTime",
      "TensionA",
      "TensionB",
      "TensionC",
      "TensionD",
      "TensionE",
      "PrintCount"
    ],
    "required": [
      "StencilNo"
    ],
    "fields": [
      {
        "key": "StencilNo",
        "label": "钢网编号",
        "required": true
      },
      {
        "key": "LastCleanTime",
        "label": "上一次清洗时间",
        "required": false
      },
      {
        "key": "TensionA",
        "label": "张力点上",
        "required": false
      },
      {
        "key": "TensionB",
        "label": "张力点下",
        "required": false
      },
      {
        "key": "TensionC",
        "label": "张力点左",
        "required": false
      },
      {
        "key": "TensionD",
        "label": "张力点右",
        "required": false
      },
      {
        "key": "TensionE",
        "label": "张力点中",
        "required": false
      },
      {
        "key": "PrintCount",
        "label": "已印刷次数",
        "required": false
      }
    ],
    "example": {
      "StencilNo": "AT-001",
      "LastCleanTime": "2026-08-01",
      "TensionA": "张力点上测试值",
      "TensionB": "张力点下测试值",
      "TensionC": "张力点左测试值",
      "TensionD": "张力点右测试值",
      "TensionE": "张力点中测试值",
      "PrintCount": "已印刷次数测试值"
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
        "StencilNo": "AT-001",
        "LastCleanTime": "2026-08-01",
        "TensionA": "张力点上测试值",
        "TensionB": "张力点下测试值",
        "TensionC": "张力点左测试值",
        "TensionD": "张力点右测试值",
        "TensionE": "张力点中测试值",
        "PrintCount": "已印刷次数测试值"
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
