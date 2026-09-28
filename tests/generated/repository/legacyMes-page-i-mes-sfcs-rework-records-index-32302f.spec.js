// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-rework-records-index-32302f",
  "name": "旧版制造执行 - 开始时间（未配置菜单）功能校验",
  "displayName": "开始时间（未配置菜单）",
  "route": "/iMES/SfcsReworkRecords/Index",
  "sourceRoute": "/iMES/SfcsReworkRecords/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始时间（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsReworkRecords/Index.vue",
  "dataSchema": {
    "columns": [
      "SN",
      "DEFECT_CODE",
      "IS_CONFIRM",
      "inputBeginTime",
      "newcontent"
    ],
    "required": [],
    "fields": [
      {
        "key": "SN",
        "label": "产品条码",
        "required": false
      },
      {
        "key": "DEFECT_CODE",
        "label": "不良代码",
        "required": false
      },
      {
        "key": "IS_CONFIRM",
        "label": "状态",
        "required": false
      },
      {
        "key": "inputBeginTime",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "newcontent",
        "label": "确认维修完成内容",
        "required": false
      }
    ],
    "example": {
      "SN": "AT-001",
      "DEFECT_CODE": "不良代码测试值",
      "IS_CONFIRM": "Y",
      "inputBeginTime": "2026-08-01",
      "newcontent": "确认维修完成内容测试值"
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
        "SN": "AT-001",
        "DEFECT_CODE": "不良代码测试值",
        "IS_CONFIRM": "Y",
        "inputBeginTime": "2026-08-01",
        "newcontent": "确认维修完成内容测试值"
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
      "key": "ef879b4ced-1553af6b72-674a6",
      "type": "导出入口",
      "name": "导出文档业务入口校验",
      "label": "导出文档",
      "handler": "exportAllData",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出文档",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-b56d9ac6c5-d1ac2",
      "type": "业务动作",
      "name": "确认业务入口校验",
      "label": "确认",
      "handler": "handleConfirm(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位确认",
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
