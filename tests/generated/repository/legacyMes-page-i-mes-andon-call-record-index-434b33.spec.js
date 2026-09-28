// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-andon-call-record-index-434b33",
  "name": "旧版制造执行 - 消息处理结果功能校验",
  "displayName": "消息处理结果",
  "route": "/iMES/AndonCallRecord/Index",
  "sourceRoute": "/iMES/AndonCallRecord/Index",
  "menuCode": "iMES_AndonCallRecord",
  "breadcrumb": "品质管理 / 消息中心 / 消息处理结果",
  "sourceFile": "src/views/iMES/AndonCallRecord/Index.vue",
  "dataSchema": {
    "columns": [
      "CALL_NO",
      "OPERATION_LINE_NAME",
      "Part_NO",
      "Part_Size",
      "WO_NO",
      "TO_USER",
      "CALL_CONTENT",
      "SOLUTION",
      "STATUS",
      "time",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "CALL_NO",
        "label": "消息编号",
        "required": false
      },
      {
        "key": "OPERATION_LINE_NAME",
        "label": "产线",
        "required": false
      },
      {
        "key": "Part_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "Part_Size",
        "label": "规格",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "TO_USER",
        "label": "责任归属",
        "required": false
      },
      {
        "key": "CALL_CONTENT",
        "label": "消息内容",
        "required": false
      },
      {
        "key": "SOLUTION",
        "label": "解决方案",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "time",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "Key",
        "label": "消息编号/工位",
        "required": false
      }
    ],
    "example": {
      "CALL_NO": "AT-001",
      "OPERATION_LINE_NAME": "产线测试值",
      "Part_NO": "AT-001",
      "Part_Size": "规格测试值",
      "WO_NO": "工单测试值",
      "TO_USER": "责任归属测试值",
      "CALL_CONTENT": "消息内容测试值",
      "SOLUTION": "解决方案测试值",
      "STATUS": "Y",
      "time": "2026-08-01",
      "Key": "消息编号/工位测试值"
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
        "CALL_NO": "AT-001",
        "OPERATION_LINE_NAME": "产线测试值",
        "Part_NO": "AT-001",
        "Part_Size": "规格测试值",
        "WO_NO": "工单测试值",
        "TO_USER": "责任归属测试值",
        "CALL_CONTENT": "消息内容测试值",
        "SOLUTION": "解决方案测试值",
        "STATUS": "Y",
        "time": "2026-08-01",
        "Key": "消息编号/工位测试值"
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
      "key": "13fd57e65b-7a3893e241-99afe",
      "type": "新增表单",
      "name": "添加处理结果业务入口校验",
      "label": "添加处理结果",
      "handler": "editClick(row, row.$index)",
      "permission": "",
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
          "key": "CALL_NO",
          "label": "消息编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "OPERATION_LINE_NAME",
          "label": "产线",
          "required": false,
          "example": "产线测试值"
        },
        {
          "key": "Part_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Part_Size",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "TO_USER",
          "label": "责任归属",
          "required": false,
          "example": "责任归属测试值"
        },
        {
          "key": "CALL_CONTENT",
          "label": "消息内容",
          "required": false,
          "example": "消息内容测试值"
        },
        {
          "key": "SOLUTION",
          "label": "解决方案",
          "required": false,
          "example": "解决方案测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "time",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "Key",
          "label": "消息编号/工位",
          "required": false,
          "example": "消息编号/工位测试值"
        }
      ],
      "testData": {
        "CALL_NO": "AT-001",
        "OPERATION_LINE_NAME": "产线测试值",
        "Part_NO": "AT-001",
        "Part_Size": "规格测试值",
        "WO_NO": "工单测试值",
        "TO_USER": "责任归属测试值",
        "CALL_CONTENT": "消息内容测试值",
        "SOLUTION": "解决方案测试值",
        "STATUS": "Y",
        "time": "2026-08-01",
        "Key": "消息编号/工位测试值"
      }
    }
  ]
});
