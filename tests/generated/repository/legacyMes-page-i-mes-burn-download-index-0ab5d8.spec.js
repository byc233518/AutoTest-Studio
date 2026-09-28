// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-burn-download-index-0ab5d8",
  "name": "旧版制造执行 - 键值（未配置菜单）功能校验",
  "displayName": "键值（未配置菜单）",
  "route": "/iMES/BurnDownload/Index",
  "sourceRoute": "/iMES/BurnDownload/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 键值（未配置菜单）",
  "sourceFile": "src/views/iMES/BurnDownload/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_CODE",
      "WO_NO",
      "DOWN_NO",
      "APPLY_NO",
      "CODE",
      "DEFECT_LOC",
      "SN_SITE_NUMBER",
      "CREATE_TIME",
      "beginAndEndTime"
    ],
    "required": [],
    "fields": [
      {
        "key": "PART_CODE",
        "label": "料号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "DOWN_NO",
        "label": "下载编号",
        "required": false
      },
      {
        "key": "APPLY_NO",
        "label": "申请编号",
        "required": false
      },
      {
        "key": "CODE",
        "label": "描述",
        "required": false
      },
      {
        "key": "DEFECT_LOC",
        "label": "不良位号",
        "required": false
      },
      {
        "key": "SN_SITE_NUMBER",
        "label": "数量",
        "required": false
      },
      {
        "key": "CREATE_TIME",
        "label": "下载时间",
        "required": false
      },
      {
        "key": "beginAndEndTime",
        "label": "下载开始",
        "required": false
      }
    ],
    "example": {
      "PART_CODE": "AT-001",
      "WO_NO": "AT-001",
      "DOWN_NO": "AT-001",
      "APPLY_NO": "AT-001",
      "CODE": "自动化测试备注001",
      "DEFECT_LOC": "不良位号测试值",
      "SN_SITE_NUMBER": "1",
      "CREATE_TIME": "2026-08-01",
      "beginAndEndTime": "下载开始测试值"
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
        "PART_CODE": "AT-001",
        "WO_NO": "AT-001",
        "DOWN_NO": "AT-001",
        "APPLY_NO": "AT-001",
        "CODE": "自动化测试备注001",
        "DEFECT_LOC": "不良位号测试值",
        "SN_SITE_NUMBER": "1",
        "CREATE_TIME": "2026-08-01",
        "beginAndEndTime": "下载开始测试值"
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
      "key": "ef879b4ced-2b9d013177-d831a",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "downClick",
      "permission": "GetDownAddress",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-866efd9004-092d6",
      "type": "业务动作",
      "name": "扫码过站业务入口校验",
      "label": "扫码过站",
      "handler": "ScanCodeClick(row, row.$index)",
      "permission": "SaveBurnSNByTrans",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位扫码过站",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
