// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-report-form-mo-full-set-simulation-index-98309e",
  "name": "仓储管理 - 工单齐套查询功能校验",
  "displayName": "工单齐套查询",
  "route": "/ReportForm/Mo/FullSetSimulation/Index",
  "sourceRoute": "/ReportForm/Mo/FullSetSimulation/Index",
  "menuCode": "FullSetSimulation",
  "breadcrumb": "报表中心 / 仓库报表 / 工单齐套查询",
  "sourceFile": "src/views/ReportForm/Mo/FullSetSimulation/Index.vue",
  "dataSchema": {
    "columns": [
      "Mo",
      "PartCode",
      "PartName",
      "PartDesc",
      "Qty",
      "IsLess",
      "MoLine",
      "Unit",
      "LessQty",
      "DisQty",
      "StockQty",
      "PlanStartDate"
    ],
    "required": [],
    "fields": [
      {
        "key": "Mo",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PartCode",
        "label": "成品料号",
        "required": false
      },
      {
        "key": "PartName",
        "label": "成品名称",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "成品规格",
        "required": false
      },
      {
        "key": "Qty",
        "label": "数量",
        "required": false
      },
      {
        "key": "IsLess",
        "label": "是否齐套",
        "required": false
      },
      {
        "key": "MoLine",
        "label": "行号",
        "required": false
      },
      {
        "key": "Unit",
        "label": "单位",
        "required": false
      },
      {
        "key": "LessQty",
        "label": "欠料数量",
        "required": false
      },
      {
        "key": "DisQty",
        "label": "分配数量",
        "required": false
      },
      {
        "key": "StockQty",
        "label": "库存数量",
        "required": false
      },
      {
        "key": "PlanStartDate",
        "label": "开工日期",
        "required": false
      }
    ],
    "example": {
      "Mo": "AT-001",
      "PartCode": "AT-001",
      "PartName": "自动化样例001",
      "PartDesc": "成品规格测试值",
      "Qty": "1",
      "IsLess": "是否齐套测试值",
      "MoLine": "行号测试值",
      "Unit": "单位测试值",
      "LessQty": "1",
      "DisQty": "1",
      "StockQty": "1",
      "PlanStartDate": "2026-08-01"
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
        "Mo": "AT-001",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "成品规格测试值",
        "Qty": "1",
        "IsLess": "是否齐套测试值",
        "MoLine": "行号测试值",
        "Unit": "单位测试值",
        "LessQty": "1",
        "DisQty": "1",
        "StockQty": "1",
        "PlanStartDate": "2026-08-01"
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
