// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-wo-finished-history-index-116bc7",
  "name": "旧版制造执行 - 线体（未配置菜单）功能校验",
  "displayName": "线体（未配置菜单）",
  "route": "/iMES/SfcsWoFinishedHistory/Index",
  "sourceRoute": "/iMES/SfcsWoFinishedHistory/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 线体（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsWoFinishedHistory/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "OPERATION_LINE_NAME",
      "WO_NO",
      "PART_NO",
      "FINISHED",
      "START_TIME",
      "END_TIME"
    ],
    "required": [],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": false
      },
      {
        "key": "OPERATION_LINE_NAME",
        "label": "输入关键字搜索",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "FINISHED",
        "label": "结单状态",
        "required": false
      },
      {
        "key": "START_TIME",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "END_TIME",
        "label": "结束时间",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "OPERATION_LINE_NAME": "输入关键字搜索测试值",
      "WO_NO": "AT-001",
      "PART_NO": "AT-001",
      "FINISHED": "Y",
      "START_TIME": "2026-08-01",
      "END_TIME": "2026-08-01"
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
        "searchListForm",
        "searchClick"
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "OPERATION_LINE_NAME": "输入关键字搜索测试值",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "FINISHED": "Y",
        "START_TIME": "2026-08-01",
        "END_TIME": "2026-08-01"
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
      "key": "ef879b4ced-188896795f-18889",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "",
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
    },
    {
      "key": "ef879b4ced-4c95a69342-d4b34",
      "type": "导出入口",
      "name": "导出选中业务入口校验",
      "label": "导出选中",
      "handler": "exportChoosen",
      "permission": "",
      "menuTriggerLabel": "导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出选中",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-ef6f64becd-e5c25",
      "type": "导出入口",
      "name": "加入导出队列业务入口校验",
      "label": "加入导出队列",
      "handler": "pushInExportQuque",
      "permission": "",
      "menuTriggerLabel": "导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击加入导出队列",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-45c33c87e5-66e24",
      "type": "导出入口",
      "name": "导出当前页业务入口校验",
      "label": "导出当前页",
      "handler": "exportCurrentPage",
      "permission": "",
      "menuTriggerLabel": "导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出当前页",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-112bdfc8e6-674a6",
      "type": "导出入口",
      "name": "全量导出业务入口校验",
      "label": "全量导出",
      "handler": "exportAllData",
      "permission": "",
      "menuTriggerLabel": "导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击全量导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-471af88fec-d4674",
      "type": "导出入口",
      "name": "确认导出业务入口校验",
      "label": "确认导出",
      "handler": "handleMakeSureExportQuque",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击确认导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
