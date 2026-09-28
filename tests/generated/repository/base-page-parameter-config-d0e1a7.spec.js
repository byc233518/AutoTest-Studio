// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-parameter-config-d0e1a7",
  "name": "基座系统 - 参数配置功能校验",
  "displayName": "参数配置",
  "route": "/ParameterConfig",
  "sourceRoute": "/ParameterConfig",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 参数配置",
  "sourceFile": "src/views/Admin/System/ParameterConfig/index.vue",
  "dataSchema": {
    "columns": [
      "ParamName",
      "ParamValue",
      "SettingType",
      "Description"
    ],
    "required": [
      "ParamName",
      "ParamValue",
      "SettingType"
    ],
    "fields": [
      {
        "key": "ParamName",
        "label": "参数名称",
        "required": true
      },
      {
        "key": "ParamValue",
        "label": "参数值",
        "required": true
      },
      {
        "key": "SettingType",
        "label": "参数类型",
        "required": true
      },
      {
        "key": "Description",
        "label": "描述",
        "required": false
      }
    ],
    "example": {
      "ParamName": "自动化样例001",
      "ParamValue": "参数值测试值",
      "SettingType": "参数类型测试值",
      "Description": "自动化测试备注001"
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
        "ParamName": "自动化样例001",
        "ParamValue": "参数值测试值",
        "SettingType": "参数类型测试值",
        "Description": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-fcaed",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add(0)",
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
          "key": "ParamName",
          "label": "参数名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ParamValue",
          "label": "参数值",
          "required": true,
          "example": "参数值测试值"
        },
        {
          "key": "SettingType",
          "label": "参数类型",
          "required": true,
          "example": "参数类型测试值"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "ParamName": "自动化样例001",
        "ParamValue": "参数值测试值",
        "SettingType": "参数类型测试值",
        "Description": "自动化测试备注001"
      }
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
      "permission": "ConfigExport",
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
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
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
          "key": "ParamName",
          "label": "参数名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ParamValue",
          "label": "参数值",
          "required": true,
          "example": "参数值测试值"
        },
        {
          "key": "SettingType",
          "label": "参数类型",
          "required": true,
          "example": "参数类型测试值"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "ParamName": "自动化样例001",
        "ParamValue": "参数值测试值",
        "SettingType": "参数类型测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
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
