// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-spc-control-config-index-3af51b",
  "name": "质量管理 - 分析项功能校验",
  "displayName": "分析项",
  "route": "/SPC/ControlConfig/index",
  "sourceRoute": "/SPC/ControlConfig/index",
  "menuCode": "ControlConfig",
  "breadcrumb": "品质管理 / 功能菜单（SPC） / 分析项",
  "sourceFile": "src/views/SPC/ControlConfig/index.vue",
  "dataSchema": {
    "columns": [
      "ControlCode",
      "ControlName",
      "StatsType",
      "Enabled",
      "Remark",
      "FromDb",
      "DbType",
      "DbLinkId",
      "UseSql",
      "TableName",
      "Sql",
      "ParamValue"
    ],
    "required": [
      "ControlName",
      "StatsType",
      "DbType",
      "DbLinkId"
    ],
    "fields": [
      {
        "key": "ControlCode",
        "label": "分析项编码",
        "required": false
      },
      {
        "key": "ControlName",
        "label": "分析项名称",
        "required": true
      },
      {
        "key": "StatsType",
        "label": "统计类型",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "FromDb",
        "label": "是否数据库",
        "required": false
      },
      {
        "key": "DbType",
        "label": "数据库类型",
        "required": true
      },
      {
        "key": "DbLinkId",
        "label": "数据库名称",
        "required": true
      },
      {
        "key": "UseSql",
        "label": "是否SQL",
        "required": false
      },
      {
        "key": "TableName",
        "label": "数据库表名",
        "required": false
      },
      {
        "key": "Sql",
        "label": "SQL语句",
        "required": false
      },
      {
        "key": "ParamValue",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "ControlCode": "AT-001",
      "ControlName": "自动化样例001",
      "StatsType": "统计类型测试值",
      "Enabled": "Y",
      "Remark": "自动化测试备注001",
      "FromDb": "是否数据库测试值",
      "DbType": "数据库类型测试值",
      "DbLinkId": "自动化样例001",
      "UseSql": "是否SQL测试值",
      "TableName": "数据库表名测试值",
      "Sql": "SQL语句测试值",
      "ParamValue": "2026-08-01"
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
        "ControlCode": "AT-001",
        "ControlName": "自动化样例001",
        "StatsType": "统计类型测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "FromDb": "是否数据库测试值",
        "DbType": "数据库类型测试值",
        "DbLinkId": "自动化样例001",
        "UseSql": "是否SQL测试值",
        "TableName": "数据库表名测试值",
        "Sql": "SQL语句测试值",
        "ParamValue": "2026-08-01"
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
          "key": "ControlCode",
          "label": "分析项编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ControlName",
          "label": "分析项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StatsType",
          "label": "统计类型",
          "required": true,
          "example": "统计类型测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "FromDb",
          "label": "是否数据库",
          "required": false,
          "example": "是否数据库测试值"
        },
        {
          "key": "DbType",
          "label": "数据库类型",
          "required": true,
          "example": "数据库类型测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UseSql",
          "label": "是否SQL",
          "required": false,
          "example": "是否SQL测试值"
        },
        {
          "key": "TableName",
          "label": "数据库表名",
          "required": false,
          "example": "数据库表名测试值"
        },
        {
          "key": "Sql",
          "label": "SQL语句",
          "required": false,
          "example": "SQL语句测试值"
        },
        {
          "key": "ParamValue",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "ControlCode": "AT-001",
        "ControlName": "自动化样例001",
        "StatsType": "统计类型测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "FromDb": "是否数据库测试值",
        "DbType": "数据库类型测试值",
        "DbLinkId": "自动化样例001",
        "UseSql": "是否SQL测试值",
        "TableName": "数据库表名测试值",
        "Sql": "SQL语句测试值",
        "ParamValue": "2026-08-01"
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
      "key": "faea8c1db9-4f55ee1e68-83c6d",
      "type": "查看详情",
      "name": "详情业务入口校验",
      "label": "详情",
      "handler": "view(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击详情",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-abe49",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "showEditDialog(row)",
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
          "key": "ControlCode",
          "label": "分析项编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ControlName",
          "label": "分析项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StatsType",
          "label": "统计类型",
          "required": true,
          "example": "统计类型测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "FromDb",
          "label": "是否数据库",
          "required": false,
          "example": "是否数据库测试值"
        },
        {
          "key": "DbType",
          "label": "数据库类型",
          "required": true,
          "example": "数据库类型测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UseSql",
          "label": "是否SQL",
          "required": false,
          "example": "是否SQL测试值"
        },
        {
          "key": "TableName",
          "label": "数据库表名",
          "required": false,
          "example": "数据库表名测试值"
        },
        {
          "key": "Sql",
          "label": "SQL语句",
          "required": false,
          "example": "SQL语句测试值"
        },
        {
          "key": "ParamValue",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "ControlCode": "AT-001",
        "ControlName": "自动化样例001",
        "StatsType": "统计类型测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "FromDb": "是否数据库测试值",
        "DbType": "数据库类型测试值",
        "DbLinkId": "自动化样例001",
        "UseSql": "是否SQL测试值",
        "TableName": "数据库表名测试值",
        "Sql": "SQL语句测试值",
        "ParamValue": "2026-08-01"
      }
    }
  ]
});
