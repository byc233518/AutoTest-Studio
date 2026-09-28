// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-feeder-config-index-7f603b",
  "name": "旧版制造执行 - 使用区间（未配置菜单）功能校验",
  "displayName": "使用区间（未配置菜单）",
  "route": "/iMES/SmtFeederConfig/Index",
  "sourceRoute": "/iMES/SmtFeederConfig/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 使用区间（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtFeederConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "FEEDER",
      "SUPPLIER",
      "FTYPE",
      "FSIZE",
      "FBODYMARK",
      "STATUS",
      "DESCRIPTION",
      "ORGANIZE_ID",
      "FEEDER_TYPE",
      "BETWEEN_STATUS",
      "OUTSIDE_STATUS"
    ],
    "required": [
      "FEEDER",
      "SUPPLIER",
      "FTYPE",
      "FSIZE",
      "FBODYMARK",
      "STATUS",
      "DESCRIPTION",
      "ORGANIZE_ID",
      "BETWEEN_STATUS",
      "OUTSIDE_STATUS"
    ],
    "fields": [
      {
        "key": "FEEDER",
        "label": "料架编号",
        "required": true
      },
      {
        "key": "SUPPLIER",
        "label": "供应商",
        "required": true
      },
      {
        "key": "FTYPE",
        "label": "类型",
        "required": true
      },
      {
        "key": "FSIZE",
        "label": "尺寸",
        "required": true
      },
      {
        "key": "FBODYMARK",
        "label": "本体编码",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": true
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "FEEDER_TYPE",
        "label": "飞达类型",
        "required": false
      },
      {
        "key": "BETWEEN_STATUS",
        "label": "区间内状态",
        "required": true
      },
      {
        "key": "OUTSIDE_STATUS",
        "label": "超区间状态",
        "required": true
      }
    ],
    "example": {
      "FEEDER": "AT-001",
      "SUPPLIER": "供应商测试值",
      "FTYPE": "类型测试值",
      "FSIZE": "尺寸测试值",
      "FBODYMARK": "AT-001",
      "STATUS": "Y",
      "DESCRIPTION": "自动化测试备注001",
      "ORGANIZE_ID": "组织架构测试值",
      "FEEDER_TYPE": "飞达类型测试值",
      "BETWEEN_STATUS": "Y",
      "OUTSIDE_STATUS": "Y"
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
        "FEEDER": "AT-001",
        "SUPPLIER": "供应商测试值",
        "FTYPE": "类型测试值",
        "FSIZE": "尺寸测试值",
        "FBODYMARK": "AT-001",
        "STATUS": "Y",
        "DESCRIPTION": "自动化测试备注001",
        "ORGANIZE_ID": "组织架构测试值",
        "FEEDER_TYPE": "飞达类型测试值",
        "BETWEEN_STATUS": "Y",
        "OUTSIDE_STATUS": "Y"
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
      "key": "13fd57e65b-2cd9e6ce81-51611",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(null)",
      "permission": "SmtFeederAdd",
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
          "key": "FEEDER",
          "label": "料架编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "SUPPLIER",
          "label": "供应商",
          "required": true,
          "example": "供应商测试值"
        },
        {
          "key": "FTYPE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "FSIZE",
          "label": "尺寸",
          "required": true,
          "example": "尺寸测试值"
        },
        {
          "key": "FBODYMARK",
          "label": "本体编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "FEEDER_TYPE",
          "label": "飞达类型",
          "required": false,
          "example": "飞达类型测试值"
        },
        {
          "key": "BETWEEN_STATUS",
          "label": "区间内状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "OUTSIDE_STATUS",
          "label": "超区间状态",
          "required": true,
          "example": "Y"
        }
      ],
      "testData": {
        "FEEDER": "AT-001",
        "SUPPLIER": "供应商测试值",
        "FTYPE": "类型测试值",
        "FSIZE": "尺寸测试值",
        "FBODYMARK": "AT-001",
        "STATUS": "Y",
        "DESCRIPTION": "自动化测试备注001",
        "ORGANIZE_ID": "组织架构测试值",
        "FEEDER_TYPE": "飞达类型测试值",
        "BETWEEN_STATUS": "Y",
        "OUTSIDE_STATUS": "Y"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SmtFeederEdit",
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
          "key": "FEEDER",
          "label": "料架编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "SUPPLIER",
          "label": "供应商",
          "required": true,
          "example": "供应商测试值"
        },
        {
          "key": "FTYPE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "FSIZE",
          "label": "尺寸",
          "required": true,
          "example": "尺寸测试值"
        },
        {
          "key": "FBODYMARK",
          "label": "本体编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "FEEDER_TYPE",
          "label": "飞达类型",
          "required": false,
          "example": "飞达类型测试值"
        },
        {
          "key": "BETWEEN_STATUS",
          "label": "区间内状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "OUTSIDE_STATUS",
          "label": "超区间状态",
          "required": true,
          "example": "Y"
        }
      ],
      "testData": {
        "FEEDER": "AT-001",
        "SUPPLIER": "供应商测试值",
        "FTYPE": "类型测试值",
        "FSIZE": "尺寸测试值",
        "FBODYMARK": "AT-001",
        "STATUS": "Y",
        "DESCRIPTION": "自动化测试备注001",
        "ORGANIZE_ID": "组织架构测试值",
        "FEEDER_TYPE": "飞达类型测试值",
        "BETWEEN_STATUS": "Y",
        "OUTSIDE_STATUS": "Y"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SmtFeederRemove",
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
