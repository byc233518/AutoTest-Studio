// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-resource-rules-index-6111ba",
  "name": "旧版制造执行 - 输入关键字搜索（未配置菜单）功能校验",
  "displayName": "输入关键字搜索（未配置菜单）",
  "route": "/iMES/SmtResourceRules/Index",
  "sourceRoute": "/iMES/SmtResourceRules/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 输入关键字搜索（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtResourceRules/Index.vue",
  "dataSchema": {
    "columns": [
      "OBJECT_ID",
      "ROUTE_OPERATION_ID",
      "STANDARD_FLAG",
      "EXPOSE_FLAG",
      "CATEGORY_ID",
      "STANDARD_TIME",
      "VALID_FLAG",
      "ENABLED",
      "CATEGORY_NAME",
      "Key"
    ],
    "required": [
      "OBJECT_ID",
      "ROUTE_OPERATION_ID",
      "CATEGORY_ID",
      "STANDARD_TIME"
    ],
    "fields": [
      {
        "key": "OBJECT_ID",
        "label": "名称",
        "required": true
      },
      {
        "key": "ROUTE_OPERATION_ID",
        "label": "工序",
        "required": true
      },
      {
        "key": "STANDARD_FLAG",
        "label": "计算流程时间(分钟)",
        "required": false
      },
      {
        "key": "EXPOSE_FLAG",
        "label": "检验暴露期",
        "required": false
      },
      {
        "key": "CATEGORY_ID",
        "label": "料号",
        "required": true
      },
      {
        "key": "STANDARD_TIME",
        "label": "标准时间(分钟)",
        "required": true
      },
      {
        "key": "VALID_FLAG",
        "label": "检验有效时间",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否有效",
        "required": false
      },
      {
        "key": "CATEGORY_NAME",
        "label": "料号",
        "required": false
      },
      {
        "key": "Key",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "OBJECT_ID": "自动化样例001",
      "ROUTE_OPERATION_ID": "工序测试值",
      "STANDARD_FLAG": "计算流程时间(分钟)测试值",
      "EXPOSE_FLAG": "检验暴露期测试值",
      "CATEGORY_ID": "AT-001",
      "STANDARD_TIME": "标准时间(分钟)测试值",
      "VALID_FLAG": "2026-08-01",
      "ENABLED": "Y",
      "CATEGORY_NAME": "AT-001",
      "Key": "输入关键字搜索测试值"
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
        "searchQueryList",
        "searchClick"
      ],
      "testData": {
        "OBJECT_ID": "自动化样例001",
        "ROUTE_OPERATION_ID": "工序测试值",
        "STANDARD_FLAG": "计算流程时间(分钟)测试值",
        "EXPOSE_FLAG": "检验暴露期测试值",
        "CATEGORY_ID": "AT-001",
        "STANDARD_TIME": "标准时间(分钟)测试值",
        "VALID_FLAG": "2026-08-01",
        "ENABLED": "Y",
        "CATEGORY_NAME": "AT-001",
        "Key": "输入关键字搜索测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-eb072",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent('add')",
      "permission": "SmtResourceRulesAdd",
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
          "key": "OBJECT_ID",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ROUTE_OPERATION_ID",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "STANDARD_FLAG",
          "label": "计算流程时间(分钟)",
          "required": false,
          "example": "计算流程时间(分钟)测试值"
        },
        {
          "key": "EXPOSE_FLAG",
          "label": "检验暴露期",
          "required": false,
          "example": "检验暴露期测试值"
        },
        {
          "key": "CATEGORY_ID",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "STANDARD_TIME",
          "label": "标准时间(分钟)",
          "required": true,
          "example": "标准时间(分钟)测试值"
        },
        {
          "key": "VALID_FLAG",
          "label": "检验有效时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "OBJECT_ID": "自动化样例001",
        "ROUTE_OPERATION_ID": "工序测试值",
        "STANDARD_FLAG": "计算流程时间(分钟)测试值",
        "EXPOSE_FLAG": "检验暴露期测试值",
        "CATEGORY_ID": "AT-001",
        "STANDARD_TIME": "标准时间(分钟)测试值",
        "VALID_FLAG": "2026-08-01",
        "ENABLED": "Y",
        "CATEGORY_NAME": "AT-001",
        "Key": "输入关键字搜索测试值"
      }
    },
    {
      "key": "13fd57e65b-bfbe4e18fc-ff12b",
      "type": "新增表单",
      "name": "批量新增业务入口校验",
      "label": "批量新增",
      "handler": "insertEvent('batchAdd')",
      "permission": "SmtResourceRulesAdd",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量新增",
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
          "key": "OBJECT_ID",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ROUTE_OPERATION_ID",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "STANDARD_FLAG",
          "label": "计算流程时间(分钟)",
          "required": false,
          "example": "计算流程时间(分钟)测试值"
        },
        {
          "key": "EXPOSE_FLAG",
          "label": "检验暴露期",
          "required": false,
          "example": "检验暴露期测试值"
        },
        {
          "key": "CATEGORY_ID",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "STANDARD_TIME",
          "label": "标准时间(分钟)",
          "required": true,
          "example": "标准时间(分钟)测试值"
        },
        {
          "key": "VALID_FLAG",
          "label": "检验有效时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "OBJECT_ID": "自动化样例001",
        "ROUTE_OPERATION_ID": "工序测试值",
        "STANDARD_FLAG": "计算流程时间(分钟)测试值",
        "EXPOSE_FLAG": "检验暴露期测试值",
        "CATEGORY_ID": "AT-001",
        "STANDARD_TIME": "标准时间(分钟)测试值",
        "VALID_FLAG": "2026-08-01",
        "ENABLED": "Y",
        "CATEGORY_NAME": "AT-001",
        "Key": "输入关键字搜索测试值"
      }
    },
    {
      "key": "5f1787916c-8fb6f00ec5-8fb6f",
      "type": "导入入口",
      "name": "导入文件业务入口校验",
      "label": "导入文件",
      "handler": "",
      "permission": "SmtResourceRulesImport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入文件",
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
      "key": "4aa22a22ac-a7f814c0a4-31725",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editRow(row, row.$index)",
      "permission": "SmtResourceRulesEdit",
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
          "key": "OBJECT_ID",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ROUTE_OPERATION_ID",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "STANDARD_FLAG",
          "label": "计算流程时间(分钟)",
          "required": false,
          "example": "计算流程时间(分钟)测试值"
        },
        {
          "key": "EXPOSE_FLAG",
          "label": "检验暴露期",
          "required": false,
          "example": "检验暴露期测试值"
        },
        {
          "key": "CATEGORY_ID",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "STANDARD_TIME",
          "label": "标准时间(分钟)",
          "required": true,
          "example": "标准时间(分钟)测试值"
        },
        {
          "key": "VALID_FLAG",
          "label": "检验有效时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ENABLED",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "OBJECT_ID": "自动化样例001",
        "ROUTE_OPERATION_ID": "工序测试值",
        "STANDARD_FLAG": "计算流程时间(分钟)测试值",
        "EXPOSE_FLAG": "检验暴露期测试值",
        "CATEGORY_ID": "AT-001",
        "STANDARD_TIME": "标准时间(分钟)测试值",
        "VALID_FLAG": "2026-08-01",
        "ENABLED": "Y",
        "CATEGORY_NAME": "AT-001",
        "Key": "输入关键字搜索测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SmtResourceRulesRemove",
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
