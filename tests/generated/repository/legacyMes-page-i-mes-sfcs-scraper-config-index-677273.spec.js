// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-scraper-config-index-677273",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SfcsScraperConfig/Index",
  "sourceRoute": "/iMES/SfcsScraperConfig/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsScraperConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "SCRAPER_NO",
      "LOCATION",
      "CREATE_TIME",
      "SCRAPER_TYPE",
      "MAX_USE_FLAG",
      "CUSTOM_MAX_USED_COUNT",
      "ENABLED",
      "ORGANIZE_ID",
      "Key"
    ],
    "required": [
      "SCRAPER_NO",
      "LOCATION",
      "CREATE_TIME",
      "SCRAPER_TYPE",
      "CUSTOM_MAX_USED_COUNT",
      "ORGANIZE_ID"
    ],
    "fields": [
      {
        "key": "SCRAPER_NO",
        "label": "刮刀号",
        "required": true
      },
      {
        "key": "LOCATION",
        "label": "储位",
        "required": true
      },
      {
        "key": "CREATE_TIME",
        "label": "入库日期",
        "required": true
      },
      {
        "key": "SCRAPER_TYPE",
        "label": "刮刀类型",
        "required": true
      },
      {
        "key": "MAX_USE_FLAG",
        "label": "是否启用最大数量",
        "required": false
      },
      {
        "key": "CUSTOM_MAX_USED_COUNT",
        "label": "最大使用数量",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "Key",
        "label": "刮刀编号",
        "required": false
      }
    ],
    "example": {
      "SCRAPER_NO": "刮刀号测试值",
      "LOCATION": "储位测试值",
      "CREATE_TIME": "2026-08-01",
      "SCRAPER_TYPE": "刮刀类型测试值",
      "MAX_USE_FLAG": "1",
      "CUSTOM_MAX_USED_COUNT": "1",
      "ENABLED": "是否激活测试值",
      "ORGANIZE_ID": "组织架构测试值",
      "Key": "AT-001"
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
        "SCRAPER_NO": "刮刀号测试值",
        "LOCATION": "储位测试值",
        "CREATE_TIME": "2026-08-01",
        "SCRAPER_TYPE": "刮刀类型测试值",
        "MAX_USE_FLAG": "1",
        "CUSTOM_MAX_USED_COUNT": "1",
        "ENABLED": "是否激活测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "Key": "AT-001"
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
      "permission": "SfcsScraperConfigAdd",
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
          "key": "SCRAPER_NO",
          "label": "刮刀号",
          "required": true,
          "example": "刮刀号测试值"
        },
        {
          "key": "LOCATION",
          "label": "储位",
          "required": true,
          "example": "储位测试值"
        },
        {
          "key": "CREATE_TIME",
          "label": "入库日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "SCRAPER_TYPE",
          "label": "刮刀类型",
          "required": true,
          "example": "刮刀类型测试值"
        },
        {
          "key": "MAX_USE_FLAG",
          "label": "是否启用最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "CUSTOM_MAX_USED_COUNT",
          "label": "最大使用数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "Key",
          "label": "刮刀编号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "SCRAPER_NO": "刮刀号测试值",
        "LOCATION": "储位测试值",
        "CREATE_TIME": "2026-08-01",
        "SCRAPER_TYPE": "刮刀类型测试值",
        "MAX_USE_FLAG": "1",
        "CUSTOM_MAX_USED_COUNT": "1",
        "ENABLED": "是否激活测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "Key": "AT-001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsScraperConfigEdit",
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
          "key": "SCRAPER_NO",
          "label": "刮刀号",
          "required": true,
          "example": "刮刀号测试值"
        },
        {
          "key": "LOCATION",
          "label": "储位",
          "required": true,
          "example": "储位测试值"
        },
        {
          "key": "CREATE_TIME",
          "label": "入库日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "SCRAPER_TYPE",
          "label": "刮刀类型",
          "required": true,
          "example": "刮刀类型测试值"
        },
        {
          "key": "MAX_USE_FLAG",
          "label": "是否启用最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "CUSTOM_MAX_USED_COUNT",
          "label": "最大使用数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "Key",
          "label": "刮刀编号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "SCRAPER_NO": "刮刀号测试值",
        "LOCATION": "储位测试值",
        "CREATE_TIME": "2026-08-01",
        "SCRAPER_TYPE": "刮刀类型测试值",
        "MAX_USE_FLAG": "1",
        "CUSTOM_MAX_USED_COUNT": "1",
        "ENABLED": "是否激活测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "Key": "AT-001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-e5305",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick({ ID: row.ID }, row.$index)",
      "permission": "SfcsScraperConfigRemove",
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
