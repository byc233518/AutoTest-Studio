// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-sys-organize-index-21f725",
  "name": "基座系统 - 组织架构功能校验",
  "displayName": "组织架构",
  "route": "/SysOrganize/Index",
  "sourceRoute": "/SysOrganize/Index",
  "menuCode": "SysOrganize",
  "breadcrumb": "系统管理 / 系统配置 / 组织架构",
  "sourceFile": "src/views/SysOrganize/Index.vue",
  "dataSchema": {
    "columns": [
      "ORGANIZE_CODE",
      "ORGANIZE_NAME",
      "PARENT_ORGANIZE_ID",
      "ORG_SHAPE",
      "ENABLED",
      "SHAPE_TYPE",
      "REMARK",
      "USER_NAME",
      "CREATOR",
      "filterText",
      "Key",
      "filterCheckedUserText"
    ],
    "required": [
      "ORGANIZE_CODE",
      "ORGANIZE_NAME",
      "PARENT_ORGANIZE_ID",
      "ORG_SHAPE",
      "CREATOR"
    ],
    "fields": [
      {
        "key": "ORGANIZE_CODE",
        "label": "组织编码",
        "required": true
      },
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
        "key": "ORG_SHAPE",
        "label": "组织形态",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "SHAPE_TYPE",
        "label": "形态类型",
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
      "ORGANIZE_CODE": "AT-001",
      "ORGANIZE_NAME": "自动化样例001",
      "PARENT_ORGANIZE_ID": "上级架构测试值",
      "ORG_SHAPE": "组织形态测试值",
      "ENABLED": "Y",
      "SHAPE_TYPE": "形态类型测试值",
      "REMARK": "自动化测试备注001",
      "USER_NAME": "用户测试值",
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
        "ORGANIZE_CODE": "AT-001",
        "ORGANIZE_NAME": "自动化样例001",
        "PARENT_ORGANIZE_ID": "上级架构测试值",
        "ORG_SHAPE": "组织形态测试值",
        "ENABLED": "Y",
        "SHAPE_TYPE": "形态类型测试值",
        "REMARK": "自动化测试备注001",
        "USER_NAME": "用户测试值",
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
          "key": "ORGANIZE_CODE",
          "label": "组织编码",
          "required": true,
          "example": "AT-001"
        },
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
          "key": "ORG_SHAPE",
          "label": "组织形态",
          "required": true,
          "example": "组织形态测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SHAPE_TYPE",
          "label": "形态类型",
          "required": false,
          "example": "形态类型测试值"
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
        "ORGANIZE_CODE": "AT-001",
        "ORGANIZE_NAME": "自动化样例001",
        "PARENT_ORGANIZE_ID": "上级架构测试值",
        "ORG_SHAPE": "组织形态测试值",
        "ENABLED": "Y",
        "SHAPE_TYPE": "形态类型测试值",
        "REMARK": "自动化测试备注001",
        "USER_NAME": "用户测试值",
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
          "key": "ORGANIZE_CODE",
          "label": "组织编码",
          "required": true,
          "example": "AT-001"
        },
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
          "key": "ORG_SHAPE",
          "label": "组织形态",
          "required": true,
          "example": "组织形态测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SHAPE_TYPE",
          "label": "形态类型",
          "required": false,
          "example": "形态类型测试值"
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
        "ORGANIZE_CODE": "AT-001",
        "ORGANIZE_NAME": "自动化样例001",
        "PARENT_ORGANIZE_ID": "上级架构测试值",
        "ORG_SHAPE": "组织形态测试值",
        "ENABLED": "Y",
        "SHAPE_TYPE": "形态类型测试值",
        "REMARK": "自动化测试备注001",
        "USER_NAME": "用户测试值",
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
