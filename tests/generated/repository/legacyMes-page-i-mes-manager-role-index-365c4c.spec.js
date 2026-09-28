// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-manager-role-index-365c4c",
  "name": "旧版制造执行 - PC菜单（未配置菜单）功能校验",
  "displayName": "PC菜单（未配置菜单）",
  "route": "/iMES/ManagerRole/Index",
  "sourceRoute": "/iMES/ManagerRole/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / PC菜单（未配置菜单）",
  "sourceFile": "src/views/iMES/ManagerRole/Index.vue",
  "dataSchema": {
    "columns": [
      "Role_Name",
      "Role_Type",
      "Is_System",
      "Remark",
      "Key",
      "filterText",
      "filterPDA"
    ],
    "required": [
      "Role_Name",
      "Role_Type"
    ],
    "fields": [
      {
        "key": "Role_Name",
        "label": "角色名称",
        "required": true
      },
      {
        "key": "Role_Type",
        "label": "角色类型",
        "required": true
      },
      {
        "key": "Is_System",
        "label": "系统默认",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "Key",
        "label": "角色名称",
        "required": false
      },
      {
        "key": "filterText",
        "label": "输入关键字进行过滤",
        "required": false
      },
      {
        "key": "filterPDA",
        "label": "输入关键字进行过滤",
        "required": false
      }
    ],
    "example": {
      "Role_Name": "自动化样例001",
      "Role_Type": "角色类型测试值",
      "Is_System": "系统默认测试值",
      "Remark": "自动化测试备注001",
      "Key": "自动化样例001",
      "filterText": "输入关键字进行过滤测试值",
      "filterPDA": "输入关键字进行过滤测试值"
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
        "handleFilter"
      ],
      "testData": {
        "Role_Name": "自动化样例001",
        "Role_Type": "角色类型测试值",
        "Is_System": "系统默认测试值",
        "Remark": "自动化测试备注001",
        "Key": "自动化样例001",
        "filterText": "输入关键字进行过滤测试值",
        "filterPDA": "输入关键字进行过滤测试值"
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
      "key": "13fd57e65b-ee9475422f-8cee4",
      "type": "新增表单",
      "name": "新增角色业务入口校验",
      "label": "新增角色",
      "handler": "handleAddRole",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增角色",
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
          "key": "Role_Name",
          "label": "角色名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Role_Type",
          "label": "角色类型",
          "required": true,
          "example": "角色类型测试值"
        },
        {
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Key",
          "label": "角色名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "filterPDA",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        }
      ],
      "testData": {
        "Role_Name": "自动化样例001",
        "Role_Type": "角色类型测试值",
        "Is_System": "系统默认测试值",
        "Remark": "自动化测试备注001",
        "Key": "自动化样例001",
        "filterText": "输入关键字进行过滤测试值",
        "filterPDA": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-ad0b7",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEdit(scope)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
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
          "key": "Role_Name",
          "label": "角色名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Role_Type",
          "label": "角色类型",
          "required": true,
          "example": "角色类型测试值"
        },
        {
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Key",
          "label": "角色名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "filterPDA",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        }
      ],
      "testData": {
        "Role_Name": "自动化样例001",
        "Role_Type": "角色类型测试值",
        "Is_System": "系统默认测试值",
        "Remark": "自动化测试备注001",
        "Key": "自动化样例001",
        "filterText": "输入关键字进行过滤测试值",
        "filterPDA": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-3ddbb",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(scope)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
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
