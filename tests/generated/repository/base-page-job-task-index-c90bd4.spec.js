// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-job-task-index-c90bd4",
  "name": "基座系统 - 任务管理功能校验",
  "displayName": "任务管理",
  "route": "/JobTask/Index",
  "sourceRoute": "/JobTask/Index",
  "menuCode": "JobTask",
  "breadcrumb": "系统管理 / 数据同步 / 任务管理",
  "sourceFile": "src/views/JobTask/Index.vue",
  "dataSchema": {
    "columns": [
      "Name",
      "Address",
      "timerType",
      "ExecInterval",
      "Cron",
      "ExecType",
      "RunNow",
      "RunOnce",
      "ApiHeader",
      "Memo"
    ],
    "required": [
      "Name",
      "Address",
      "ExecInterval",
      "Cron",
      "ExecType",
      "RunNow",
      "RunOnce"
    ],
    "fields": [
      {
        "key": "Name",
        "label": "任务名称",
        "required": true
      },
      {
        "key": "Address",
        "label": "请求地址",
        "required": true
      },
      {
        "key": "timerType",
        "label": "定时器类型",
        "required": false
      },
      {
        "key": "ExecInterval",
        "label": "执行间隔(秒)",
        "required": true
      },
      {
        "key": "Cron",
        "label": "Cron表达式",
        "required": true
      },
      {
        "key": "ExecType",
        "label": "执行类型",
        "required": true
      },
      {
        "key": "RunNow",
        "label": "开始执行",
        "required": true
      },
      {
        "key": "RunOnce",
        "label": "只执行一次",
        "required": true
      },
      {
        "key": "ApiHeader",
        "label": "请求头",
        "required": false
      },
      {
        "key": "Memo",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "Name": "自动化样例001",
      "Address": "请求地址测试值",
      "timerType": "定时器类型测试值",
      "ExecInterval": "执行间隔(秒)测试值",
      "Cron": "Cron表达式测试值",
      "ExecType": "执行类型测试值",
      "RunNow": "开始执行测试值",
      "RunOnce": "只执行一次测试值",
      "ApiHeader": "请求头测试值",
      "Memo": "自动化测试备注001"
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
        "Name": "自动化样例001",
        "Address": "请求地址测试值",
        "timerType": "定时器类型测试值",
        "ExecInterval": "执行间隔(秒)测试值",
        "Cron": "Cron表达式测试值",
        "ExecType": "执行类型测试值",
        "RunNow": "开始执行测试值",
        "RunOnce": "只执行一次测试值",
        "ApiHeader": "请求头测试值",
        "Memo": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-58d1b",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add",
      "permission": "JobTaskAdd",
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
          "key": "Name",
          "label": "任务名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Address",
          "label": "请求地址",
          "required": true,
          "example": "请求地址测试值"
        },
        {
          "key": "timerType",
          "label": "定时器类型",
          "required": false,
          "example": "定时器类型测试值"
        },
        {
          "key": "ExecInterval",
          "label": "执行间隔(秒)",
          "required": true,
          "example": "执行间隔(秒)测试值"
        },
        {
          "key": "Cron",
          "label": "Cron表达式",
          "required": true,
          "example": "Cron表达式测试值"
        },
        {
          "key": "ExecType",
          "label": "执行类型",
          "required": true,
          "example": "执行类型测试值"
        },
        {
          "key": "RunNow",
          "label": "开始执行",
          "required": true,
          "example": "开始执行测试值"
        },
        {
          "key": "RunOnce",
          "label": "只执行一次",
          "required": true,
          "example": "只执行一次测试值"
        },
        {
          "key": "ApiHeader",
          "label": "请求头",
          "required": false,
          "example": "请求头测试值"
        },
        {
          "key": "Memo",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "Address": "请求地址测试值",
        "timerType": "定时器类型测试值",
        "ExecInterval": "执行间隔(秒)测试值",
        "Cron": "Cron表达式测试值",
        "ExecType": "执行类型测试值",
        "RunNow": "开始执行测试值",
        "RunOnce": "只执行一次测试值",
        "ApiHeader": "请求头测试值",
        "Memo": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "JobTaskEdit",
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
          "key": "Name",
          "label": "任务名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Address",
          "label": "请求地址",
          "required": true,
          "example": "请求地址测试值"
        },
        {
          "key": "timerType",
          "label": "定时器类型",
          "required": false,
          "example": "定时器类型测试值"
        },
        {
          "key": "ExecInterval",
          "label": "执行间隔(秒)",
          "required": true,
          "example": "执行间隔(秒)测试值"
        },
        {
          "key": "Cron",
          "label": "Cron表达式",
          "required": true,
          "example": "Cron表达式测试值"
        },
        {
          "key": "ExecType",
          "label": "执行类型",
          "required": true,
          "example": "执行类型测试值"
        },
        {
          "key": "RunNow",
          "label": "开始执行",
          "required": true,
          "example": "开始执行测试值"
        },
        {
          "key": "RunOnce",
          "label": "只执行一次",
          "required": true,
          "example": "只执行一次测试值"
        },
        {
          "key": "ApiHeader",
          "label": "请求头",
          "required": false,
          "example": "请求头测试值"
        },
        {
          "key": "Memo",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "Address": "请求地址测试值",
        "timerType": "定时器类型测试值",
        "ExecInterval": "执行间隔(秒)测试值",
        "Cron": "Cron表达式测试值",
        "ExecType": "执行类型测试值",
        "RunNow": "开始执行测试值",
        "RunOnce": "只执行一次测试值",
        "ApiHeader": "请求头测试值",
        "Memo": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "JobTaskDelete",
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
