// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-portal-scheme-manage-index-0c9381",
  "name": "基座系统 - 方案管理功能校验",
  "displayName": "方案管理",
  "route": "/Portal/SchemeManage/Index",
  "sourceRoute": "/Portal/SchemeManage/Index",
  "menuCode": "SchemeManage",
  "breadcrumb": "系统管理 / 门户管理 / 方案管理",
  "sourceFile": "src/views/Portal/SchemeManage/Index.vue",
  "dataSchema": {
    "columns": [
      "PsName",
      "PsCode",
      "SchemeType",
      "SchemaScene",
      "AppId",
      "PcRemark",
      "ApplicableRoles",
      "OrgIds",
      "UseState",
      "SysPreset"
    ],
    "required": [
      "PsName",
      "PsCode",
      "SchemaScene",
      "AppId"
    ],
    "fields": [
      {
        "key": "PsName",
        "label": "方案名称",
        "required": true
      },
      {
        "key": "PsCode",
        "label": "方案编码",
        "required": true
      },
      {
        "key": "SchemeType",
        "label": "方案类型",
        "required": false
      },
      {
        "key": "SchemaScene",
        "label": "方案场景",
        "required": true
      },
      {
        "key": "AppId",
        "label": "模块",
        "required": true
      },
      {
        "key": "PcRemark",
        "label": "方案说明",
        "required": false
      },
      {
        "key": "ApplicableRoles",
        "label": "适用角色",
        "required": false
      },
      {
        "key": "OrgIds",
        "label": "适用组织",
        "required": false
      },
      {
        "key": "UseState",
        "label": "使用状态",
        "required": false
      },
      {
        "key": "SysPreset",
        "label": "系统预设",
        "required": false
      }
    ],
    "example": {
      "PsName": "自动化样例001",
      "PsCode": "AT-001",
      "SchemeType": "方案类型测试值",
      "SchemaScene": "方案场景测试值",
      "AppId": "模块测试值",
      "PcRemark": "自动化测试备注001",
      "ApplicableRoles": "适用角色测试值",
      "OrgIds": "适用组织测试值",
      "UseState": "Y",
      "SysPreset": "系统预设测试值"
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
        "PsName": "自动化样例001",
        "PsCode": "AT-001",
        "SchemeType": "方案类型测试值",
        "SchemaScene": "方案场景测试值",
        "AppId": "模块测试值",
        "PcRemark": "自动化测试备注001",
        "ApplicableRoles": "适用角色测试值",
        "OrgIds": "适用组织测试值",
        "UseState": "Y",
        "SysPreset": "系统预设测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-28995",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openAddDialog",
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
          "key": "PsName",
          "label": "方案名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PsCode",
          "label": "方案编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "SchemeType",
          "label": "方案类型",
          "required": false,
          "example": "方案类型测试值"
        },
        {
          "key": "SchemaScene",
          "label": "方案场景",
          "required": true,
          "example": "方案场景测试值"
        },
        {
          "key": "AppId",
          "label": "模块",
          "required": true,
          "example": "模块测试值"
        },
        {
          "key": "PcRemark",
          "label": "方案说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ApplicableRoles",
          "label": "适用角色",
          "required": false,
          "example": "适用角色测试值"
        },
        {
          "key": "OrgIds",
          "label": "适用组织",
          "required": false,
          "example": "适用组织测试值"
        },
        {
          "key": "UseState",
          "label": "使用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SysPreset",
          "label": "系统预设",
          "required": false,
          "example": "系统预设测试值"
        }
      ],
      "testData": {
        "PsName": "自动化样例001",
        "PsCode": "AT-001",
        "SchemeType": "方案类型测试值",
        "SchemaScene": "方案场景测试值",
        "AppId": "模块测试值",
        "PcRemark": "自动化测试备注001",
        "ApplicableRoles": "适用角色测试值",
        "OrgIds": "适用组织测试值",
        "UseState": "Y",
        "SysPreset": "系统预设测试值"
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
      "key": "4aa22a22ac-a7f814c0a4-f2968",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openEditDialog(scope.row)",
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
          "key": "PsName",
          "label": "方案名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PsCode",
          "label": "方案编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "SchemeType",
          "label": "方案类型",
          "required": false,
          "example": "方案类型测试值"
        },
        {
          "key": "SchemaScene",
          "label": "方案场景",
          "required": true,
          "example": "方案场景测试值"
        },
        {
          "key": "AppId",
          "label": "模块",
          "required": true,
          "example": "模块测试值"
        },
        {
          "key": "PcRemark",
          "label": "方案说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ApplicableRoles",
          "label": "适用角色",
          "required": false,
          "example": "适用角色测试值"
        },
        {
          "key": "OrgIds",
          "label": "适用组织",
          "required": false,
          "example": "适用组织测试值"
        },
        {
          "key": "UseState",
          "label": "使用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SysPreset",
          "label": "系统预设",
          "required": false,
          "example": "系统预设测试值"
        }
      ],
      "testData": {
        "PsName": "自动化样例001",
        "PsCode": "AT-001",
        "SchemeType": "方案类型测试值",
        "SchemaScene": "方案场景测试值",
        "AppId": "模块测试值",
        "PcRemark": "自动化测试备注001",
        "ApplicableRoles": "适用角色测试值",
        "OrgIds": "适用组织测试值",
        "UseState": "Y",
        "SysPreset": "系统预设测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-416f6",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(scope.row)",
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
