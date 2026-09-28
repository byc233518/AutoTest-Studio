// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-ims-custom-report-loading-index-sys-message-group-mst-mst-name-sys-mes-f9974c",
  "name": "基座系统 - 消息群组管理功能校验",
  "displayName": "消息群组管理",
  "route": "/ImsCustomReportLoading/Index/SYS_MESSAGE_GROUP_MST?mst_name=SYS_MESSAGE_GROUP_MST",
  "sourceRoute": "/ImsCustomReportLoading/Index",
  "menuCode": "SYS_MESSAGE_GROUP_MST",
  "breadcrumb": "系统管理 / 消息推送 / 消息群组管理",
  "sourceFile": "src/views/ImsCustomReportLoading/Index.vue",
  "dataSchema": {
    "columns": [
      "PARAM_VALUE"
    ],
    "required": [],
    "fields": [
      {
        "key": "PARAM_VALUE",
        "label": "参数值",
        "required": false
      }
    ],
    "example": {
      "PARAM_VALUE": "参数值测试值"
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
      "sourceHandlers": [],
      "testData": {
        "PARAM_VALUE": "参数值测试值"
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
      "key": "3d81345303-3d81345303-c5923",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "handleClear",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "runtime-business-buttons",
      "type": "运行时业务按钮",
      "name": "运行时权限业务按钮加载校验",
      "executionPolicy": "只读校验",
      "steps": [
        "读取当前菜单和账号真实渲染的权限按钮",
        "排除查询和重置按钮",
        "自动执行导出、下载、打印或查看等只读动作",
        "其他可能写数据的动作只验证入口"
      ],
      "assertions": [
        "至少一个运行时业务按钮可见且可用",
        "只读动作产生下载、请求或界面反馈"
      ],
      "sourceCandidates": [
        {
          "label": "导入/导出",
          "handler": "",
          "permission": ""
        },
        {
          "label": "导入数据",
          "handler": "handleTableConfigCommand('data-import', 'main')",
          "permission": "Import"
        },
        {
          "label": "导出数据",
          "handler": "handleTableConfigCommand('data-export', 'main')",
          "permission": "Export"
        }
      ],
      "mutatesData": false
    }
  ]
});
