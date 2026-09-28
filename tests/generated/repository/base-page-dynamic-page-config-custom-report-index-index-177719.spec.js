// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-dynamic-page-config-custom-report-index-index-177719",
  "name": "基座系统 - 脚本导出（未配置菜单）功能校验",
  "displayName": "脚本导出（未配置菜单）",
  "route": "/DynamicPageConfig/CustomReportIndex/Index",
  "sourceRoute": "/DynamicPageConfig/CustomReportIndex/Index",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 脚本导出（未配置菜单）",
  "sourceFile": "src/views/DynamicPageConfig/CustomReportIndex/Index.vue",
  "dataSchema": {
    "columns": [
      "REPORT_TITLE",
      "REPORT_CODE",
      "TERMINAL"
    ],
    "required": [],
    "fields": [
      {
        "key": "REPORT_TITLE",
        "label": "报表名称",
        "required": false
      },
      {
        "key": "REPORT_CODE",
        "label": "报表编码",
        "required": false
      },
      {
        "key": "TERMINAL",
        "label": "终端类型",
        "required": false
      }
    ],
    "example": {
      "REPORT_TITLE": "自动化样例001",
      "REPORT_CODE": "AT-001",
      "TERMINAL": "终端类型测试值"
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
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": false,
          "example": "终端类型测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值"
      }
    },
    {
      "key": "ef879b4ced-4ad38d72c9-5a84f",
      "type": "导出入口",
      "name": "脚本导出业务入口校验",
      "label": "脚本导出",
      "handler": "exportSql",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击脚本导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-dc5fb7a696-dc5fb",
      "type": "导入入口",
      "name": "配置导入业务入口校验",
      "label": "配置导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导入",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-ba43305377-e9df5",
      "type": "导出入口",
      "name": "配置导出业务入口校验",
      "label": "配置导出",
      "handler": "exportData",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-cefbe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(scope.row)",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": false,
          "example": "终端类型测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-78e8f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row)",
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
