// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-product-hour-record-index-6fd287",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SfcsProductHourRecord/Index",
  "sourceRoute": "/iMES/SfcsProductHourRecord/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsProductHourRecord/Index.vue",
  "dataSchema": {
    "columns": [
      "BOX_NO",
      "WO_NO",
      "PART_NO",
      "NEED_MINUTES",
      "SN",
      "STATUS"
    ],
    "required": [],
    "fields": [
      {
        "key": "BOX_NO",
        "label": "周转箱",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "NEED_MINUTES",
        "label": "需保压时长(Min)",
        "required": false
      },
      {
        "key": "SN",
        "label": "SN",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "BOX_NO": "周转箱测试值",
      "WO_NO": "工单测试值",
      "PART_NO": "AT-001",
      "NEED_MINUTES": "需保压时长(Min)测试值",
      "SN": "SN测试值",
      "STATUS": "Y"
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
        "BOX_NO": "周转箱测试值",
        "WO_NO": "工单测试值",
        "PART_NO": "AT-001",
        "NEED_MINUTES": "需保压时长(Min)测试值",
        "SN": "SN测试值",
        "STATUS": "Y"
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
