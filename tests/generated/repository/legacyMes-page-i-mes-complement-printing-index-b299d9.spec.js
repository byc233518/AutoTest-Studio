// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-complement-printing-index-b299d9",
  "name": "旧版制造执行 - 打印类型（未配置菜单）功能校验",
  "displayName": "打印类型（未配置菜单）",
  "route": "/iMES/ComplementPrinting/Index",
  "sourceRoute": "/iMES/ComplementPrinting/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 打印类型（未配置菜单）",
  "sourceFile": "src/views/iMES/ComplementPrinting/Index.vue",
  "dataSchema": {
    "columns": [
      "PRINT_STATUS",
      "LABEL_TYPE",
      "OPERATOR",
      "Time",
      "PART_NO",
      "WO_NO",
      "CARTON_NO",
      "PALLET_NO",
      "PRINT_NO"
    ],
    "required": [],
    "fields": [
      {
        "key": "PRINT_STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "LABEL_TYPE",
        "label": "打印类型",
        "required": false
      },
      {
        "key": "OPERATOR",
        "label": "打印人员",
        "required": false
      },
      {
        "key": "Time",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "CARTON_NO",
        "label": "箱号",
        "required": false
      },
      {
        "key": "PALLET_NO",
        "label": "栈板编号",
        "required": false
      },
      {
        "key": "PRINT_NO",
        "label": "打印次数",
        "required": false
      }
    ],
    "example": {
      "PRINT_STATUS": "Y",
      "LABEL_TYPE": "打印类型测试值",
      "OPERATOR": "打印人员测试值",
      "Time": "2026-08-01",
      "PART_NO": "AT-001",
      "WO_NO": "AT-001",
      "CARTON_NO": "箱号测试值",
      "PALLET_NO": "AT-001",
      "PRINT_NO": "打印次数测试值"
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
        "PRINT_STATUS": "Y",
        "LABEL_TYPE": "打印类型测试值",
        "OPERATOR": "打印人员测试值",
        "Time": "2026-08-01",
        "PART_NO": "AT-001",
        "WO_NO": "AT-001",
        "CARTON_NO": "箱号测试值",
        "PALLET_NO": "AT-001",
        "PRINT_NO": "打印次数测试值"
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
      "key": "7e002f9936-3c977df7ce-5427a",
      "type": "业务动作",
      "name": "打印业务入口校验",
      "label": "打印",
      "handler": "printClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-224c909bdf-5cd3f",
      "type": "业务动作",
      "name": "重复打印业务入口校验",
      "label": "重复打印",
      "handler": "RepeatPrinting",
      "permission": "RepeatPrinting",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击重复打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    }
  ]
});
