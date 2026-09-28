// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-mold-application-index-be5fa6",
  "name": "设备管理 - 模具申请功能校验",
  "displayName": "模具申请",
  "route": "/ITPM/TpmMoldApplication/Index",
  "sourceRoute": "/ITPM/TpmMoldApplication/Index",
  "menuCode": "TpmMoldApplication",
  "breadcrumb": "设备管理 / 模具管理 / 模具申请",
  "sourceFile": "src/views/ITPM/TpmMoldApplication/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "ApplyDate",
      "ApplyUserAccount",
      "ApplyOrgName",
      "Qty",
      "Status",
      "Remark",
      "AuditResult"
    ],
    "required": [
      "Qty",
      "AuditResult"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "申请单编码",
        "required": false
      },
      {
        "key": "ApplyDate",
        "label": "申请日期",
        "required": false
      },
      {
        "key": "ApplyUserAccount",
        "label": "申请人",
        "required": false
      },
      {
        "key": "ApplyOrgName",
        "label": "申请部门",
        "required": false
      },
      {
        "key": "Qty",
        "label": "申请数量",
        "required": true
      },
      {
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "Remark",
        "label": "申请说明",
        "required": false
      },
      {
        "key": "AuditResult",
        "label": "审批结果",
        "required": true
      }
    ],
    "example": {
      "Code": "AT-001",
      "ApplyDate": "2026-08-01",
      "ApplyUserAccount": "申请人测试值",
      "ApplyOrgName": "申请部门测试值",
      "Qty": "1",
      "Status": "Y",
      "Remark": "自动化测试备注001",
      "AuditResult": "审批结果测试值"
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
        "Code": "AT-001",
        "ApplyDate": "2026-08-01",
        "ApplyUserAccount": "申请人测试值",
        "ApplyOrgName": "申请部门测试值",
        "Qty": "1",
        "Status": "Y",
        "Remark": "自动化测试备注001",
        "AuditResult": "审批结果测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-526a8",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor",
      "permission": "Add",
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
          "key": "Code",
          "label": "申请单编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ApplyDate",
          "label": "申请日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ApplyUserAccount",
          "label": "申请人",
          "required": false,
          "example": "申请人测试值"
        },
        {
          "key": "ApplyOrgName",
          "label": "申请部门",
          "required": false,
          "example": "申请部门测试值"
        },
        {
          "key": "Qty",
          "label": "申请数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "申请说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "AuditResult",
          "label": "审批结果",
          "required": true,
          "example": "审批结果测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "ApplyDate": "2026-08-01",
        "ApplyUserAccount": "申请人测试值",
        "ApplyOrgName": "申请部门测试值",
        "Qty": "1",
        "Status": "Y",
        "Remark": "自动化测试备注001",
        "AuditResult": "审批结果测试值"
      }
    },
    {
      "key": "7e002f9936-09cbc97ae2-3fa40",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submit",
      "permission": "Submit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-5ce60cb75d-1b8d2",
      "type": "查看详情",
      "name": "审批业务入口校验",
      "label": "审批",
      "handler": "openAuditModal",
      "permission": "Audit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击审批",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
    },
    {
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
      "permission": "Edit",
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
          "key": "Code",
          "label": "申请单编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ApplyDate",
          "label": "申请日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ApplyUserAccount",
          "label": "申请人",
          "required": false,
          "example": "申请人测试值"
        },
        {
          "key": "ApplyOrgName",
          "label": "申请部门",
          "required": false,
          "example": "申请部门测试值"
        },
        {
          "key": "Qty",
          "label": "申请数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "申请说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "AuditResult",
          "label": "审批结果",
          "required": true,
          "example": "审批结果测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "ApplyDate": "2026-08-01",
        "ApplyUserAccount": "申请人测试值",
        "ApplyOrgName": "申请部门测试值",
        "Qty": "1",
        "Status": "Y",
        "Remark": "自动化测试备注001",
        "AuditResult": "审批结果测试值"
      }
    }
  ]
});
