// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-tongs-apply-index-c9644c",
  "name": "旧版制造执行 - 工装治具申请功能校验",
  "displayName": "工装治具申请",
  "route": "/iMES/MesTongsApply/Index",
  "sourceRoute": "/iMES/MesTongsApply/Index",
  "menuCode": "iMES_MesTongsApply",
  "breadcrumb": "设备管理 / 工装治具 / 工装治具申请",
  "sourceFile": "src/views/iMES/MesTongsApply/Index.vue",
  "dataSchema": {
    "columns": [
      "QTY",
      "TONGS_TYPE",
      "DEPARTMENT",
      "SOURCES",
      "NEED_DATE",
      "ORGANIZE_ID",
      "REMARK",
      "PART_NO",
      "PART_NAME",
      "PART_DESC",
      "VERSION",
      "STATUS",
      "without"
    ],
    "required": [
      "QTY",
      "TONGS_TYPE",
      "DEPARTMENT",
      "SOURCES",
      "NEED_DATE",
      "PART_NO",
      "VERSION"
    ],
    "fields": [
      {
        "key": "QTY",
        "label": "工装数量",
        "required": true
      },
      {
        "key": "TONGS_TYPE",
        "label": "工装名称",
        "required": true
      },
      {
        "key": "DEPARTMENT",
        "label": "部门",
        "required": true
      },
      {
        "key": "SOURCES",
        "label": "来源",
        "required": true
      },
      {
        "key": "NEED_DATE",
        "label": "需求日期",
        "required": true
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": false
      },
      {
        "key": "VERSION",
        "label": "版本号",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "without",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "QTY": "1",
      "TONGS_TYPE": "自动化样例001",
      "DEPARTMENT": "部门测试值",
      "SOURCES": "来源测试值",
      "NEED_DATE": "2026-08-01",
      "ORGANIZE_ID": "组织架构测试值",
      "REMARK": "自动化测试备注001",
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "PART_DESC": "规格测试值",
      "VERSION": "版本号测试值",
      "STATUS": "Y",
      "without": "2026-08-01"
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
        "QTY": "1",
        "TONGS_TYPE": "自动化样例001",
        "DEPARTMENT": "部门测试值",
        "SOURCES": "来源测试值",
        "NEED_DATE": "2026-08-01",
        "ORGANIZE_ID": "组织架构测试值",
        "REMARK": "自动化测试备注001",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "规格测试值",
        "VERSION": "版本号测试值",
        "STATUS": "Y",
        "without": "2026-08-01"
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
      "key": "7e002f9936-fe945e5a0d-5745e",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "AuditClick",
      "permission": "MesTongsApplyAuditData",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
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
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
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
          "key": "QTY",
          "label": "工装数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "TONGS_TYPE",
          "label": "工装名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "DEPARTMENT",
          "label": "部门",
          "required": true,
          "example": "部门测试值"
        },
        {
          "key": "SOURCES",
          "label": "来源",
          "required": true,
          "example": "来源测试值"
        },
        {
          "key": "NEED_DATE",
          "label": "需求日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": false,
          "example": "组织架构测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "VERSION",
          "label": "版本号",
          "required": true,
          "example": "版本号测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "without",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "QTY": "1",
        "TONGS_TYPE": "自动化样例001",
        "DEPARTMENT": "部门测试值",
        "SOURCES": "来源测试值",
        "NEED_DATE": "2026-08-01",
        "ORGANIZE_ID": "组织架构测试值",
        "REMARK": "自动化测试备注001",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "规格测试值",
        "VERSION": "版本号测试值",
        "STATUS": "Y",
        "without": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
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
