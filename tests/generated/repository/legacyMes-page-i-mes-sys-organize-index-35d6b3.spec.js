// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sys-organize-index-35d6b3",
  "name": "旧版制造执行 - 输入关键字进行过滤（未配置菜单）功能校验",
  "displayName": "输入关键字进行过滤（未配置菜单）",
  "route": "/iMES/SysOrganize/Index",
  "sourceRoute": "/iMES/SysOrganize/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 输入关键字进行过滤（未配置菜单）",
  "sourceFile": "src/views/iMES/SysOrganize/Index.vue",
  "dataSchema": {
    "columns": [
      "ORGANIZE_NAME",
      "PARENT_ORGANIZE_ID",
      "ORGANIZE_TYPE_ID",
      "ENABLED",
      "REMARK",
      "USER_NAME",
      "STATUS",
      "CREATOR",
      "filterText",
      "Key",
      "filterCheckedUserText"
    ],
    "required": [
      "ORGANIZE_NAME",
      "PARENT_ORGANIZE_ID",
      "ORGANIZE_TYPE_ID",
      "CREATOR"
    ],
    "fields": [
      {
        "key": "ORGANIZE_NAME",
        "label": "名称",
        "required": true
      },
      {
        "key": "PARENT_ORGANIZE_ID",
        "label": "上级架构",
        "required": true
      },
      {
        "key": "ORGANIZE_TYPE_ID",
        "label": "类型",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "USER_NAME",
        "label": "用户",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "是否有效",
        "required": false
      },
      {
        "key": "CREATOR",
        "label": "创建人",
        "required": true
      },
      {
        "key": "filterText",
        "label": "输入关键字进行过滤",
        "required": false
      },
      {
        "key": "Key",
        "label": "输入关键字搜索",
        "required": false
      },
      {
        "key": "filterCheckedUserText",
        "label": "筛选用户",
        "required": false
      }
    ],
    "example": {
      "ORGANIZE_NAME": "自动化样例001",
      "PARENT_ORGANIZE_ID": "上级架构测试值",
      "ORGANIZE_TYPE_ID": "类型测试值",
      "ENABLED": "Y",
      "REMARK": "自动化测试备注001",
      "USER_NAME": "用户测试值",
      "STATUS": "Y",
      "CREATOR": "创建人测试值",
      "filterText": "输入关键字进行过滤测试值",
      "Key": "输入关键字搜索测试值",
      "filterCheckedUserText": "筛选用户测试值"
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
        "ORGANIZE_NAME": "自动化样例001",
        "PARENT_ORGANIZE_ID": "上级架构测试值",
        "ORGANIZE_TYPE_ID": "类型测试值",
        "ENABLED": "Y",
        "REMARK": "自动化测试备注001",
        "USER_NAME": "用户测试值",
        "STATUS": "Y",
        "CREATOR": "创建人测试值",
        "filterText": "输入关键字进行过滤测试值",
        "Key": "输入关键字搜索测试值",
        "filterCheckedUserText": "筛选用户测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-f861f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent",
      "permission": "SysOrganizeAdd",
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
          "key": "ORGANIZE_NAME",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PARENT_ORGANIZE_ID",
          "label": "上级架构",
          "required": true,
          "example": "上级架构测试值"
        },
        {
          "key": "ORGANIZE_TYPE_ID",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "USER_NAME",
          "label": "用户",
          "required": false,
          "example": "用户测试值"
        },
        {
          "key": "STATUS",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CREATOR",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        },
        {
          "key": "filterCheckedUserText",
          "label": "筛选用户",
          "required": false,
          "example": "筛选用户测试值"
        }
      ],
      "testData": {
        "ORGANIZE_NAME": "自动化样例001",
        "PARENT_ORGANIZE_ID": "上级架构测试值",
        "ORGANIZE_TYPE_ID": "类型测试值",
        "ENABLED": "Y",
        "REMARK": "自动化测试备注001",
        "USER_NAME": "用户测试值",
        "STATUS": "Y",
        "CREATOR": "创建人测试值",
        "filterText": "输入关键字进行过滤测试值",
        "Key": "输入关键字搜索测试值",
        "filterCheckedUserText": "筛选用户测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-39400",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row)",
      "permission": "LoadUserOrganizeedit",
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
          "key": "ORGANIZE_NAME",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PARENT_ORGANIZE_ID",
          "label": "上级架构",
          "required": true,
          "example": "上级架构测试值"
        },
        {
          "key": "ORGANIZE_TYPE_ID",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "USER_NAME",
          "label": "用户",
          "required": false,
          "example": "用户测试值"
        },
        {
          "key": "STATUS",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CREATOR",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        },
        {
          "key": "filterCheckedUserText",
          "label": "筛选用户",
          "required": false,
          "example": "筛选用户测试值"
        }
      ],
      "testData": {
        "ORGANIZE_NAME": "自动化样例001",
        "PARENT_ORGANIZE_ID": "上级架构测试值",
        "ORGANIZE_TYPE_ID": "类型测试值",
        "ENABLED": "Y",
        "REMARK": "自动化测试备注001",
        "USER_NAME": "用户测试值",
        "STATUS": "Y",
        "CREATOR": "创建人测试值",
        "filterText": "输入关键字进行过滤测试值",
        "Key": "输入关键字搜索测试值",
        "filterCheckedUserText": "筛选用户测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-10b2c",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row)",
      "permission": "PersonnelDelete",
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
