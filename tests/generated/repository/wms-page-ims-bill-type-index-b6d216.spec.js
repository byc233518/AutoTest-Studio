// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-bill-type-index-b6d216",
  "name": "仓储管理 - 单据注册功能校验",
  "displayName": "单据注册",
  "route": "/ImsBillType/Index",
  "sourceRoute": "/ImsBillType/Index",
  "menuCode": "ImsBillType",
  "breadcrumb": "系统管理 / 系统配置 / 单据注册",
  "sourceFile": "src/views/ImsBillType/Index.vue",
  "dataSchema": {
    "columns": [
      "NewBillTypeCode",
      "NewBillTypeName",
      "NewBillTypeErpType",
      "MenuEnName",
      "CopyBillTypeCode",
      "IsDeletedExitType",
      "BillType",
      "BillName",
      "Io",
      "Description",
      "ExName"
    ],
    "required": [
      "NewBillTypeCode",
      "NewBillTypeName",
      "MenuEnName",
      "CopyBillTypeCode",
      "BillType",
      "BillName",
      "ExName"
    ],
    "fields": [
      {
        "key": "NewBillTypeCode",
        "label": "单据编码 - 新",
        "required": true
      },
      {
        "key": "NewBillTypeName",
        "label": "单据名称 - 新",
        "required": true
      },
      {
        "key": "NewBillTypeErpType",
        "label": "ERP单据类型 - 新",
        "required": false
      },
      {
        "key": "MenuEnName",
        "label": "所要产生的新单据对应的菜单的英文名",
        "required": true
      },
      {
        "key": "CopyBillTypeCode",
        "label": "单据编码 - 所要复制的对象单据类型编码",
        "required": true
      },
      {
        "key": "IsDeletedExitType",
        "label": "新单据已存在是否删除",
        "required": false
      },
      {
        "key": "BillType",
        "label": "类型编码",
        "required": true
      },
      {
        "key": "BillName",
        "label": "单据名称",
        "required": true
      },
      {
        "key": "Io",
        "label": "交易方式",
        "required": false
      },
      {
        "key": "Description",
        "label": "单据说明",
        "required": false
      },
      {
        "key": "ExName",
        "label": "扩展名",
        "required": true
      }
    ],
    "example": {
      "NewBillTypeCode": "单据编码 - 新测试值",
      "NewBillTypeName": "单据名称 - 新测试值",
      "NewBillTypeErpType": "ERP单据类型 - 新测试值",
      "MenuEnName": "所要产生的新单据对应的菜单的英文名测试值",
      "CopyBillTypeCode": "AT-001",
      "IsDeletedExitType": "新单据已存在是否删除测试值",
      "BillType": "AT-001",
      "BillName": "自动化样例001",
      "Io": "交易方式测试值",
      "Description": "自动化测试备注001",
      "ExName": "扩展名测试值"
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
        "imsBillTypeExSearch()"
      ],
      "testData": {
        "NewBillTypeCode": "单据编码 - 新测试值",
        "NewBillTypeName": "单据名称 - 新测试值",
        "NewBillTypeErpType": "ERP单据类型 - 新测试值",
        "MenuEnName": "所要产生的新单据对应的菜单的英文名测试值",
        "CopyBillTypeCode": "AT-001",
        "IsDeletedExitType": "新单据已存在是否删除测试值",
        "BillType": "AT-001",
        "BillName": "自动化样例001",
        "Io": "交易方式测试值",
        "Description": "自动化测试备注001",
        "ExName": "扩展名测试值"
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
      "permission": "ImsBillTypeAdd",
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
          "key": "NewBillTypeCode",
          "label": "单据编码 - 新",
          "required": true,
          "example": "单据编码 - 新测试值"
        },
        {
          "key": "NewBillTypeName",
          "label": "单据名称 - 新",
          "required": true,
          "example": "单据名称 - 新测试值"
        },
        {
          "key": "NewBillTypeErpType",
          "label": "ERP单据类型 - 新",
          "required": false,
          "example": "ERP单据类型 - 新测试值"
        },
        {
          "key": "MenuEnName",
          "label": "所要产生的新单据对应的菜单的英文名",
          "required": true,
          "example": "所要产生的新单据对应的菜单的英文名测试值"
        },
        {
          "key": "CopyBillTypeCode",
          "label": "单据编码 - 所要复制的对象单据类型编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "IsDeletedExitType",
          "label": "新单据已存在是否删除",
          "required": false,
          "example": "新单据已存在是否删除测试值"
        },
        {
          "key": "BillType",
          "label": "类型编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "BillName",
          "label": "单据名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Io",
          "label": "交易方式",
          "required": false,
          "example": "交易方式测试值"
        },
        {
          "key": "Description",
          "label": "单据说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ExName",
          "label": "扩展名",
          "required": true,
          "example": "扩展名测试值"
        }
      ],
      "testData": {
        "NewBillTypeCode": "单据编码 - 新测试值",
        "NewBillTypeName": "单据名称 - 新测试值",
        "NewBillTypeErpType": "ERP单据类型 - 新测试值",
        "MenuEnName": "所要产生的新单据对应的菜单的英文名测试值",
        "CopyBillTypeCode": "AT-001",
        "IsDeletedExitType": "新单据已存在是否删除测试值",
        "BillType": "AT-001",
        "BillName": "自动化样例001",
        "Io": "交易方式测试值",
        "Description": "自动化测试备注001",
        "ExName": "扩展名测试值"
      }
    },
    {
      "key": "7e002f9936-4edd1d0087-d3361",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "dialogFormVisible = !dialogFormVisible",
      "permission": "ImsBillTypeCopy",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位复制",
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
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsBillTypeEdit",
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
          "key": "NewBillTypeCode",
          "label": "单据编码 - 新",
          "required": true,
          "example": "单据编码 - 新测试值"
        },
        {
          "key": "NewBillTypeName",
          "label": "单据名称 - 新",
          "required": true,
          "example": "单据名称 - 新测试值"
        },
        {
          "key": "NewBillTypeErpType",
          "label": "ERP单据类型 - 新",
          "required": false,
          "example": "ERP单据类型 - 新测试值"
        },
        {
          "key": "MenuEnName",
          "label": "所要产生的新单据对应的菜单的英文名",
          "required": true,
          "example": "所要产生的新单据对应的菜单的英文名测试值"
        },
        {
          "key": "CopyBillTypeCode",
          "label": "单据编码 - 所要复制的对象单据类型编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "IsDeletedExitType",
          "label": "新单据已存在是否删除",
          "required": false,
          "example": "新单据已存在是否删除测试值"
        },
        {
          "key": "BillType",
          "label": "类型编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "BillName",
          "label": "单据名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Io",
          "label": "交易方式",
          "required": false,
          "example": "交易方式测试值"
        },
        {
          "key": "Description",
          "label": "单据说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ExName",
          "label": "扩展名",
          "required": true,
          "example": "扩展名测试值"
        }
      ],
      "testData": {
        "NewBillTypeCode": "单据编码 - 新测试值",
        "NewBillTypeName": "单据名称 - 新测试值",
        "NewBillTypeErpType": "ERP单据类型 - 新测试值",
        "MenuEnName": "所要产生的新单据对应的菜单的英文名测试值",
        "CopyBillTypeCode": "AT-001",
        "IsDeletedExitType": "新单据已存在是否删除测试值",
        "BillType": "AT-001",
        "BillName": "自动化样例001",
        "Io": "交易方式测试值",
        "Description": "自动化测试备注001",
        "ExName": "扩展名测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsBillTypeDelete",
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
