// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-line-workorder-index-fed4bc",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/SmtLineWorkorder/Index",
  "sourceRoute": "/iMES/SmtLineWorkorder/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtLineWorkorder/Index.vue",
  "dataSchema": {
    "columns": [
      "PrintName",
      "ATTRIBUTE1",
      "PACKET_MARKING",
      "ATTRIBUTE3",
      "ATTRIBUTE4"
    ],
    "required": [],
    "fields": [
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "ATTRIBUTE1",
        "label": "组织名称",
        "required": false
      },
      {
        "key": "PACKET_MARKING",
        "label": "分组标记",
        "required": false
      },
      {
        "key": "ATTRIBUTE3",
        "label": "项目名称",
        "required": false
      },
      {
        "key": "ATTRIBUTE4",
        "label": "项目标记",
        "required": false
      }
    ],
    "example": {
      "PrintName": "自动化样例001",
      "ATTRIBUTE1": "自动化样例001",
      "PACKET_MARKING": "分组标记测试值",
      "ATTRIBUTE3": "自动化样例001",
      "ATTRIBUTE4": "项目标记测试值"
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
        "PrintName": "自动化样例001",
        "ATTRIBUTE1": "自动化样例001",
        "PACKET_MARKING": "分组标记测试值",
        "ATTRIBUTE3": "自动化样例001",
        "ATTRIBUTE4": "项目标记测试值"
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
