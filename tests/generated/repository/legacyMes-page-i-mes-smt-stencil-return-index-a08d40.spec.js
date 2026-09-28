// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-stencil-return-index-a08d40",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SmtStencilReturn/Index",
  "sourceRoute": "/iMES/SmtStencilReturn/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtStencilReturn/Index.vue",
  "dataSchema": {
    "columns": [
      "IS_RETURN",
      "STENCIL_NO",
      "LOCATION",
      "WorkNo"
    ],
    "required": [],
    "fields": [
      {
        "key": "IS_RETURN",
        "label": "是否原位归还",
        "required": false
      },
      {
        "key": "STENCIL_NO",
        "label": "钢网编号",
        "required": false
      },
      {
        "key": "LOCATION",
        "label": "归还储位",
        "required": false
      },
      {
        "key": "WorkNo",
        "label": "归还者",
        "required": false
      }
    ],
    "example": {
      "IS_RETURN": "是否原位归还测试值",
      "STENCIL_NO": "AT-001",
      "LOCATION": "归还储位测试值",
      "WorkNo": "归还者测试值"
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
        "IS_RETURN": "是否原位归还测试值",
        "STENCIL_NO": "AT-001",
        "LOCATION": "归还储位测试值",
        "WorkNo": "归还者测试值"
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
