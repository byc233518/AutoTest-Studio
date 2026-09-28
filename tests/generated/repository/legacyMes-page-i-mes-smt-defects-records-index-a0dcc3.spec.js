// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-defects-records-index-a0dcc3",
  "name": "旧版制造执行 - 班别（未配置菜单）功能校验",
  "displayName": "班别（未配置菜单）",
  "route": "/iMES/SmtDefectsRecords/Index",
  "sourceRoute": "/iMES/SmtDefectsRecords/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 班别（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtDefectsRecords/Index.vue",
  "dataSchema": {
    "columns": [
      "DEFECT_DATE",
      "ALL_QTY",
      "WORK_CLASS",
      "LOCATION",
      "LINE_ID",
      "DEFECT_CODE",
      "MODEL",
      "DEFECT_QTY",
      "REMARK"
    ],
    "required": [
      "DEFECT_DATE",
      "ALL_QTY",
      "WORK_CLASS",
      "LOCATION",
      "LINE_ID",
      "DEFECT_CODE",
      "MODEL",
      "DEFECT_QTY"
    ],
    "fields": [
      {
        "key": "DEFECT_DATE",
        "label": "日期",
        "required": true
      },
      {
        "key": "ALL_QTY",
        "label": "送维修数量",
        "required": true
      },
      {
        "key": "WORK_CLASS",
        "label": "班别",
        "required": true
      },
      {
        "key": "LOCATION",
        "label": "维修不良位置",
        "required": true
      },
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": true
      },
      {
        "key": "DEFECT_CODE",
        "label": "不良现象",
        "required": true
      },
      {
        "key": "MODEL",
        "label": "机种",
        "required": true
      },
      {
        "key": "DEFECT_QTY",
        "label": "维修不良数量",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "DEFECT_DATE": "2026-08-01",
      "ALL_QTY": "1",
      "WORK_CLASS": "班别测试值",
      "LOCATION": "维修不良位置测试值",
      "LINE_ID": "线体测试值",
      "DEFECT_CODE": "不良现象测试值",
      "MODEL": "机种测试值",
      "DEFECT_QTY": "1",
      "REMARK": "自动化测试备注001"
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
        "search_but"
      ],
      "testData": {
        "DEFECT_DATE": "2026-08-01",
        "ALL_QTY": "1",
        "WORK_CLASS": "班别测试值",
        "LOCATION": "维修不良位置测试值",
        "LINE_ID": "线体测试值",
        "DEFECT_CODE": "不良现象测试值",
        "MODEL": "机种测试值",
        "DEFECT_QTY": "1",
        "REMARK": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增",
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
          "key": "DEFECT_DATE",
          "label": "日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ALL_QTY",
          "label": "送维修数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "WORK_CLASS",
          "label": "班别",
          "required": true,
          "example": "班别测试值"
        },
        {
          "key": "LOCATION",
          "label": "维修不良位置",
          "required": true,
          "example": "维修不良位置测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "DEFECT_CODE",
          "label": "不良现象",
          "required": true,
          "example": "不良现象测试值"
        },
        {
          "key": "MODEL",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "DEFECT_QTY",
          "label": "维修不良数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "DEFECT_DATE": "2026-08-01",
        "ALL_QTY": "1",
        "WORK_CLASS": "班别测试值",
        "LOCATION": "维修不良位置测试值",
        "LINE_ID": "线体测试值",
        "DEFECT_CODE": "不良现象测试值",
        "MODEL": "机种测试值",
        "DEFECT_QTY": "1",
        "REMARK": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑",
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
          "key": "DEFECT_DATE",
          "label": "日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ALL_QTY",
          "label": "送维修数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "WORK_CLASS",
          "label": "班别",
          "required": true,
          "example": "班别测试值"
        },
        {
          "key": "LOCATION",
          "label": "维修不良位置",
          "required": true,
          "example": "维修不良位置测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "DEFECT_CODE",
          "label": "不良现象",
          "required": true,
          "example": "不良现象测试值"
        },
        {
          "key": "MODEL",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "DEFECT_QTY",
          "label": "维修不良数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "DEFECT_DATE": "2026-08-01",
        "ALL_QTY": "1",
        "WORK_CLASS": "班别测试值",
        "LOCATION": "维修不良位置测试值",
        "LINE_ID": "线体测试值",
        "DEFECT_CODE": "不良现象测试值",
        "MODEL": "机种测试值",
        "DEFECT_QTY": "1",
        "REMARK": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除",
        "校验删除确认提示",
        "点击取消且不删除数据"
      ],
      "assertions": [
        "出现删除确认提示",
        "取消后确认框关闭"
      ],
      "mutatesData": false
    }
  ]
});
