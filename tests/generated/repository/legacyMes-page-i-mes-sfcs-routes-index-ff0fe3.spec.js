// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-routes-index-ff0fe3",
  "name": "旧版制造执行 - 新增产品制程（未配置菜单）功能校验",
  "displayName": "新增产品制程（未配置菜单）",
  "route": "/iMES/SfcsRoutes/Index",
  "sourceRoute": "/iMES/SfcsRoutes/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 新增产品制程（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsRoutes/Index.vue",
  "dataSchema": {
    "columns": [
      "ROUTE_NAME",
      "ROUTE_CLASS",
      "ROUTE_TYPE",
      "DESCRIPTION",
      "ENABLED",
      "CURRENT_OPERATION_NAME",
      "NAME",
      "REPAIR_DESCRIPTION"
    ],
    "required": [
      "ROUTE_NAME",
      "ROUTE_CLASS",
      "ROUTE_TYPE",
      "NAME"
    ],
    "fields": [
      {
        "key": "ROUTE_NAME",
        "label": "制程名称",
        "required": true
      },
      {
        "key": "ROUTE_CLASS",
        "label": "厂部",
        "required": true
      },
      {
        "key": "ROUTE_TYPE",
        "label": "类型",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "CURRENT_OPERATION_NAME",
        "label": "工序名称",
        "required": false
      },
      {
        "key": "NAME",
        "label": "工序名称",
        "required": true
      },
      {
        "key": "REPAIR_DESCRIPTION",
        "label": "工序名称",
        "required": false
      }
    ],
    "example": {
      "ROUTE_NAME": "自动化样例001",
      "ROUTE_CLASS": "厂部测试值",
      "ROUTE_TYPE": "类型测试值",
      "DESCRIPTION": "自动化测试备注001",
      "ENABLED": "是否激活测试值",
      "CURRENT_OPERATION_NAME": "自动化样例001",
      "NAME": "自动化样例001",
      "REPAIR_DESCRIPTION": "自动化样例001"
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
        "searchClick",
        "currentSearchClick",
        "repairSearchClick"
      ],
      "testData": {
        "ROUTE_NAME": "自动化样例001",
        "ROUTE_CLASS": "厂部测试值",
        "ROUTE_TYPE": "类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "CURRENT_OPERATION_NAME": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_DESCRIPTION": "自动化样例001"
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
      "key": "13fd57e65b-7ebcfe7515-7313c",
      "type": "新增表单",
      "name": "新增产品制程业务入口校验",
      "label": "新增产品制程",
      "handler": "addProductProcessClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增产品制程",
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
          "key": "ROUTE_NAME",
          "label": "制程名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ROUTE_CLASS",
          "label": "厂部",
          "required": true,
          "example": "厂部测试值"
        },
        {
          "key": "ROUTE_TYPE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "CURRENT_OPERATION_NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPAIR_DESCRIPTION",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "ROUTE_NAME": "自动化样例001",
        "ROUTE_CLASS": "厂部测试值",
        "ROUTE_TYPE": "类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "CURRENT_OPERATION_NAME": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "4aa22a22ac-e97b89112f-892f2",
      "type": "编辑表单",
      "name": "编辑产品制程业务入口校验",
      "label": "编辑产品制程",
      "handler": "editClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑产品制程",
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
          "key": "ROUTE_NAME",
          "label": "制程名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ROUTE_CLASS",
          "label": "厂部",
          "required": true,
          "example": "厂部测试值"
        },
        {
          "key": "ROUTE_TYPE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "CURRENT_OPERATION_NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPAIR_DESCRIPTION",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "ROUTE_NAME": "自动化样例001",
        "ROUTE_CLASS": "厂部测试值",
        "ROUTE_TYPE": "类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "CURRENT_OPERATION_NAME": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "13fd57e65b-e846bc3302-a6857",
      "type": "新增表单",
      "name": "新增第一行列表数据业务入口校验",
      "label": "新增第一行列表数据",
      "handler": "AddNew",
      "permission": "SfcsRoutesAdd",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增第一行列表数据",
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
          "key": "ROUTE_NAME",
          "label": "制程名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ROUTE_CLASS",
          "label": "厂部",
          "required": true,
          "example": "厂部测试值"
        },
        {
          "key": "ROUTE_TYPE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "CURRENT_OPERATION_NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPAIR_DESCRIPTION",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "ROUTE_NAME": "自动化样例001",
        "ROUTE_CLASS": "厂部测试值",
        "ROUTE_TYPE": "类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "CURRENT_OPERATION_NAME": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-0ede0",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, $rowIndex)",
      "permission": "SfcsRoutesRemove",
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
