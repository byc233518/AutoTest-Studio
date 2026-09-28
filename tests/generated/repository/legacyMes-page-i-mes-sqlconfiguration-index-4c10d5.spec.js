// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sqlconfiguration-index-4c10d5",
  "name": "旧版制造执行 - SQL 语句配置-MES功能校验",
  "displayName": "SQL 语句配置-MES",
  "route": "/iMES/SQLconfiguration/Index",
  "sourceRoute": "/iMES/SQLconfiguration/Index",
  "menuCode": "SQL 语句配置-MES",
  "breadcrumb": "系统管理 / 系统配置 / SQL 语句配置-MES",
  "sourceFile": "src/views/iMES/SQLconfiguration/Index.vue",
  "dataSchema": {
    "columns": [
      "TOTABLE_NAME",
      "DESC_CN",
      "DESC_EN",
      "USED_SEQUENCE",
      "REFERENCE_SQL",
      "LISTVALIDATION_SQL"
    ],
    "required": [
      "TOTABLE_NAME",
      "DESC_CN",
      "USED_SEQUENCE",
      "REFERENCE_SQL"
    ],
    "fields": [
      {
        "key": "TOTABLE_NAME",
        "label": "目标表名",
        "required": true
      },
      {
        "key": "DESC_CN",
        "label": "中文说明",
        "required": true
      },
      {
        "key": "DESC_EN",
        "label": "路由",
        "required": false
      },
      {
        "key": "USED_SEQUENCE",
        "label": "使用的序列",
        "required": true
      },
      {
        "key": "REFERENCE_SQL",
        "label": "相关联SQL语句",
        "required": true
      },
      {
        "key": "LISTVALIDATION_SQL",
        "label": "删除",
        "required": false
      }
    ],
    "example": {
      "TOTABLE_NAME": "目标表名测试值",
      "DESC_CN": "自动化测试备注001",
      "DESC_EN": "路由测试值",
      "USED_SEQUENCE": "使用的序列测试值",
      "REFERENCE_SQL": "相关联SQL语句测试值",
      "LISTVALIDATION_SQL": "删除测试值"
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
        "TOTABLE_NAME": "目标表名测试值",
        "DESC_CN": "自动化测试备注001",
        "DESC_EN": "路由测试值",
        "USED_SEQUENCE": "使用的序列测试值",
        "REFERENCE_SQL": "相关联SQL语句测试值",
        "LISTVALIDATION_SQL": "删除测试值"
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
      "permission": "SQLConfigurationAdd",
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
          "key": "TOTABLE_NAME",
          "label": "目标表名",
          "required": true,
          "example": "目标表名测试值"
        },
        {
          "key": "DESC_CN",
          "label": "中文说明",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "DESC_EN",
          "label": "路由",
          "required": false,
          "example": "路由测试值"
        },
        {
          "key": "USED_SEQUENCE",
          "label": "使用的序列",
          "required": true,
          "example": "使用的序列测试值"
        },
        {
          "key": "REFERENCE_SQL",
          "label": "相关联SQL语句",
          "required": true,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "LISTVALIDATION_SQL",
          "label": "删除",
          "required": false,
          "example": "删除测试值"
        }
      ],
      "testData": {
        "TOTABLE_NAME": "目标表名测试值",
        "DESC_CN": "自动化测试备注001",
        "DESC_EN": "路由测试值",
        "USED_SEQUENCE": "使用的序列测试值",
        "REFERENCE_SQL": "相关联SQL语句测试值",
        "LISTVALIDATION_SQL": "删除测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5572f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(row, row.$index)",
      "permission": "SQLconfigurationEdit",
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
          "key": "TOTABLE_NAME",
          "label": "目标表名",
          "required": true,
          "example": "目标表名测试值"
        },
        {
          "key": "DESC_CN",
          "label": "中文说明",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "DESC_EN",
          "label": "路由",
          "required": false,
          "example": "路由测试值"
        },
        {
          "key": "USED_SEQUENCE",
          "label": "使用的序列",
          "required": true,
          "example": "使用的序列测试值"
        },
        {
          "key": "REFERENCE_SQL",
          "label": "相关联SQL语句",
          "required": true,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "LISTVALIDATION_SQL",
          "label": "删除",
          "required": false,
          "example": "删除测试值"
        }
      ],
      "testData": {
        "TOTABLE_NAME": "目标表名测试值",
        "DESC_CN": "自动化测试备注001",
        "DESC_EN": "路由测试值",
        "USED_SEQUENCE": "使用的序列测试值",
        "REFERENCE_SQL": "相关联SQL语句测试值",
        "LISTVALIDATION_SQL": "删除测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a95f4",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(row, row.$index)",
      "permission": "SQLconfigurationDelete",
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
