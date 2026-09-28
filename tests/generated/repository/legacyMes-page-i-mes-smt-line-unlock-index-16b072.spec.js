// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-line-unlock-index-16b072",
  "name": "旧版制造执行 - 解锁内容（未配置菜单）功能校验",
  "displayName": "解锁内容（未配置菜单）",
  "route": "/iMES/SmtLineUnlock/Index",
  "sourceRoute": "/iMES/SmtLineUnlock/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 解锁内容（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtLineUnlock/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "MESHINE",
      "LINE_NO",
      "LOT_NO",
      "RESULT",
      "BOM_VERSION",
      "STATUS",
      "CONTENT",
      "ID"
    ],
    "required": [],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "MESHINE",
        "label": "机种名称",
        "required": false
      },
      {
        "key": "LINE_NO",
        "label": "生产线别",
        "required": false
      },
      {
        "key": "LOT_NO",
        "label": "检测编号",
        "required": false
      },
      {
        "key": "RESULT",
        "label": "检测结果",
        "required": false
      },
      {
        "key": "BOM_VERSION",
        "label": "BOM版本",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "CONTENT",
        "label": "解锁报告",
        "required": false
      },
      {
        "key": "ID",
        "label": "工单号",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "MESHINE": "自动化样例001",
      "LINE_NO": "生产线别测试值",
      "LOT_NO": "AT-001",
      "RESULT": "检测结果测试值",
      "BOM_VERSION": "BOM版本测试值",
      "STATUS": "Y",
      "CONTENT": "解锁报告测试值",
      "ID": "AT-001"
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
        "WO_NO": "AT-001",
        "MESHINE": "自动化样例001",
        "LINE_NO": "生产线别测试值",
        "LOT_NO": "AT-001",
        "RESULT": "检测结果测试值",
        "BOM_VERSION": "BOM版本测试值",
        "STATUS": "Y",
        "CONTENT": "解锁报告测试值",
        "ID": "AT-001"
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
