// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-call-record-index-0885fc",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/CallRecord/Index",
  "sourceRoute": "/iMES/CallRecord/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/CallRecord/Index.vue",
  "dataSchema": {
    "columns": [
      "HANDLE_STATUS",
      "HANDLE_CONTENT",
      "OPERATION_LINE_ID",
      "STATUS",
      "CALL_TYPE_CODE",
      "calldate",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "HANDLE_STATUS",
        "label": "处理结果",
        "required": false
      },
      {
        "key": "HANDLE_CONTENT",
        "label": "处理说明",
        "required": false
      },
      {
        "key": "OPERATION_LINE_ID",
        "label": "线体",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "CALL_TYPE_CODE",
        "label": "呼叫类型",
        "required": false
      },
      {
        "key": "calldate",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "Key",
        "label": "呼叫编号、工位",
        "required": false
      }
    ],
    "example": {
      "HANDLE_STATUS": "处理结果测试值",
      "HANDLE_CONTENT": "自动化测试备注001",
      "OPERATION_LINE_ID": "线体测试值",
      "STATUS": "Y",
      "CALL_TYPE_CODE": "呼叫类型测试值",
      "calldate": "2026-08-01",
      "Key": "呼叫编号、工位测试值"
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
        "doFilter"
      ],
      "testData": {
        "HANDLE_STATUS": "处理结果测试值",
        "HANDLE_CONTENT": "自动化测试备注001",
        "OPERATION_LINE_ID": "线体测试值",
        "STATUS": "Y",
        "CALL_TYPE_CODE": "呼叫类型测试值",
        "calldate": "2026-08-01",
        "Key": "呼叫编号、工位测试值"
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
      "key": "13fd57e65b-7a3893e241-a72f7",
      "type": "新增表单",
      "name": "添加处理结果业务入口校验",
      "label": "添加处理结果",
      "handler": "day_view_but(scope.row)",
      "permission": "AddCallRecordHandle",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加处理结果",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false,
      "fields": [
        {
          "key": "HANDLE_STATUS",
          "label": "处理结果",
          "required": false,
          "example": "处理结果测试值"
        },
        {
          "key": "HANDLE_CONTENT",
          "label": "处理说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "OPERATION_LINE_ID",
          "label": "线体",
          "required": false,
          "example": "线体测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CALL_TYPE_CODE",
          "label": "呼叫类型",
          "required": false,
          "example": "呼叫类型测试值"
        },
        {
          "key": "calldate",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "Key",
          "label": "呼叫编号、工位",
          "required": false,
          "example": "呼叫编号、工位测试值"
        }
      ],
      "testData": {
        "HANDLE_STATUS": "处理结果测试值",
        "HANDLE_CONTENT": "自动化测试备注001",
        "OPERATION_LINE_ID": "线体测试值",
        "STATUS": "Y",
        "CALL_TYPE_CODE": "呼叫类型测试值",
        "calldate": "2026-08-01",
        "Key": "呼叫编号、工位测试值"
      }
    }
  ]
});
