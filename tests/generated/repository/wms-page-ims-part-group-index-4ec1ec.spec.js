// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-part-group-index-4ec1ec",
  "name": "仓储管理 - 物料组管理功能校验",
  "displayName": "物料组管理",
  "route": "/ImsPartGroup/Index",
  "sourceRoute": "/ImsPartGroup/Index",
  "menuCode": "ImsPartGroup",
  "breadcrumb": "基础设定 / 基础数据 / 物料组管理",
  "sourceFile": "src/views/ImsPartGroup/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "Name",
      "Description",
      "Category",
      "Enabled",
      "PartNo",
      "localData",
      "Data"
    ],
    "required": [
      "Code",
      "Name"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "分组编码",
        "required": true
      },
      {
        "key": "Name",
        "label": "分组名称",
        "required": true
      },
      {
        "key": "Description",
        "label": "分组描述",
        "required": false
      },
      {
        "key": "Category",
        "label": "分类",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "localData",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "Code": "AT-001",
      "Name": "自动化样例001",
      "Description": "自动化测试备注001",
      "Category": "分类测试值",
      "Enabled": "Y",
      "PartNo": "AT-001",
      "localData": "AT-001",
      "Data": "输入关键字搜索测试值"
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
        "imsPartGroupDtlSearch()",
        "search"
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Category": "分类测试值",
        "Enabled": "Y",
        "PartNo": "AT-001",
        "localData": "AT-001",
        "Data": "输入关键字搜索测试值"
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
      "permission": "ImsPartGroupMstAdd",
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
          "key": "Code",
          "label": "分组编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "分组名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "分组描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Category",
          "label": "分类",
          "required": false,
          "example": "分类测试值"
        },
        {
          "key": "Enabled",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "localData",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Category": "分类测试值",
        "Enabled": "Y",
        "PartNo": "AT-001",
        "localData": "AT-001",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "7e002f9936-196e111309-fd628",
      "type": "业务动作",
      "name": "初始化业务入口校验",
      "label": "初始化",
      "handler": "init",
      "permission": "ImsPartGroupMstInit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位初始化",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsPartGroupMstEdit",
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
          "key": "Code",
          "label": "分组编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "分组名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "分组描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Category",
          "label": "分类",
          "required": false,
          "example": "分类测试值"
        },
        {
          "key": "Enabled",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "localData",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Category": "分类测试值",
        "Enabled": "Y",
        "PartNo": "AT-001",
        "localData": "AT-001",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsPartGroupMstRemove",
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
    },
    {
      "key": "5f1787916c-4d42a46878-4d42a",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
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
      "key": "ef879b4ced-a3afb210fe-83a8a",
      "type": "导出入口",
      "name": "下载模板业务入口校验",
      "label": "下载模板",
      "handler": "downExcelTpl",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
