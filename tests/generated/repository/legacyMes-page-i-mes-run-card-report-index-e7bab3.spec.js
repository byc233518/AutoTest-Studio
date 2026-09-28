// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-run-card-report-index-e7bab3",
  "name": "旧版制造执行 - 流水号（未配置菜单）功能校验",
  "displayName": "流水号（未配置菜单）",
  "route": "/iMES/RunCardReport/Index",
  "sourceRoute": "/iMES/RunCardReport/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 流水号（未配置菜单）",
  "sourceFile": "src/views/iMES/RunCardReport/Index.vue",
  "dataSchema": {
    "columns": [
      "SN",
      "WO_NO",
      "PART_NO",
      "CUSTOMER_PN",
      "CUSTOMER",
      "MODEL",
      "ROUTE_NAME",
      "PALLET_NO",
      "CURRENT_SITE",
      "CARTON_NO",
      "INPUT_TIME",
      "WIP_ROUTE",
      "RUNCARD_STATUS",
      "REMARK",
      "UID"
    ],
    "required": [],
    "fields": [
      {
        "key": "SN",
        "label": "流水号",
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
        "key": "CUSTOMER_PN",
        "label": "客户料号",
        "required": false
      },
      {
        "key": "CUSTOMER",
        "label": "客户",
        "required": false
      },
      {
        "key": "MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "ROUTE_NAME",
        "label": "制程",
        "required": false
      },
      {
        "key": "PALLET_NO",
        "label": "栈板",
        "required": false
      },
      {
        "key": "CURRENT_SITE",
        "label": "最后作业站",
        "required": false
      },
      {
        "key": "CARTON_NO",
        "label": "箱号",
        "required": false
      },
      {
        "key": "INPUT_TIME",
        "label": "投产时间",
        "required": false
      },
      {
        "key": "WIP_ROUTE",
        "label": "下一道工序",
        "required": false
      },
      {
        "key": "RUNCARD_STATUS",
        "label": "当前状态",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "UID",
        "label": "流水号UID",
        "required": false
      }
    ],
    "example": {
      "SN": "流水号测试值",
      "WO_NO": "工单测试值",
      "PART_NO": "AT-001",
      "CUSTOMER_PN": "AT-001",
      "CUSTOMER": "客户测试值",
      "MODEL": "规格测试值",
      "ROUTE_NAME": "制程测试值",
      "PALLET_NO": "栈板测试值",
      "CURRENT_SITE": "最后作业站测试值",
      "CARTON_NO": "箱号测试值",
      "INPUT_TIME": "2026-08-01",
      "WIP_ROUTE": "下一道工序测试值",
      "RUNCARD_STATUS": "Y",
      "REMARK": "自动化测试备注001",
      "UID": "AT-001"
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
        "SN": "流水号测试值",
        "WO_NO": "工单测试值",
        "PART_NO": "AT-001",
        "CUSTOMER_PN": "AT-001",
        "CUSTOMER": "客户测试值",
        "MODEL": "规格测试值",
        "ROUTE_NAME": "制程测试值",
        "PALLET_NO": "栈板测试值",
        "CURRENT_SITE": "最后作业站测试值",
        "CARTON_NO": "箱号测试值",
        "INPUT_TIME": "2026-08-01",
        "WIP_ROUTE": "下一道工序测试值",
        "RUNCARD_STATUS": "Y",
        "REMARK": "自动化测试备注001",
        "UID": "AT-001"
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
      "key": "ef879b4ced-188896795f-d2432",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "exportMultiSheetExcel",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
