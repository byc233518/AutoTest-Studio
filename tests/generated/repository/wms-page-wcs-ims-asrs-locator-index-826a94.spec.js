// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-wcs-ims-asrs-locator-index-826a94",
  "name": "仓储管理 - 立库储位管理功能校验",
  "displayName": "立库储位管理",
  "route": "/Wcs/ImsAsrsLocator/Index",
  "sourceRoute": "/Wcs/ImsAsrsLocator/Index",
  "menuCode": "ImsAsrsLocator",
  "breadcrumb": "仓库管理 / 立库管理 / 立库储位管理",
  "sourceFile": "src/views/Wcs/ImsAsrsLocator/Index.vue",
  "dataSchema": {
    "columns": [
      "LocatorCode",
      "LocatorType",
      "MappingCode",
      "StoreCode",
      "DeviceCode",
      "LocatorIndex",
      "LocatorStatus",
      "ContainerCode",
      "ContainerType",
      "toPosition",
      "Data"
    ],
    "required": [
      "LocatorCode",
      "LocatorStatus"
    ],
    "fields": [
      {
        "key": "LocatorCode",
        "label": "储位码",
        "required": true
      },
      {
        "key": "LocatorType",
        "label": "储位类型",
        "required": false
      },
      {
        "key": "MappingCode",
        "label": "配对码",
        "required": false
      },
      {
        "key": "StoreCode",
        "label": "区域",
        "required": false
      },
      {
        "key": "DeviceCode",
        "label": "设备码",
        "required": false
      },
      {
        "key": "LocatorIndex",
        "label": "储位索引号",
        "required": false
      },
      {
        "key": "LocatorStatus",
        "label": "储位状态",
        "required": true
      },
      {
        "key": "ContainerCode",
        "label": "容器号",
        "required": false
      },
      {
        "key": "ContainerType",
        "label": "容器类型",
        "required": false
      },
      {
        "key": "toPosition",
        "label": "目的位置",
        "required": false
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "LocatorCode": "储位码测试值",
      "LocatorType": "储位类型测试值",
      "MappingCode": "配对码测试值",
      "StoreCode": "区域测试值",
      "DeviceCode": "设备码测试值",
      "LocatorIndex": "储位索引号测试值",
      "LocatorStatus": "Y",
      "ContainerCode": "容器号测试值",
      "ContainerType": "容器类型测试值",
      "toPosition": "目的位置测试值",
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
        "search"
      ],
      "testData": {
        "LocatorCode": "储位码测试值",
        "LocatorType": "储位类型测试值",
        "MappingCode": "配对码测试值",
        "StoreCode": "区域测试值",
        "DeviceCode": "设备码测试值",
        "LocatorIndex": "储位索引号测试值",
        "LocatorStatus": "Y",
        "ContainerCode": "容器号测试值",
        "ContainerType": "容器类型测试值",
        "toPosition": "目的位置测试值",
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
      "permission": "ImsAsrsLocatorAdd",
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
          "key": "LocatorCode",
          "label": "储位码",
          "required": true,
          "example": "储位码测试值"
        },
        {
          "key": "LocatorType",
          "label": "储位类型",
          "required": false,
          "example": "储位类型测试值"
        },
        {
          "key": "MappingCode",
          "label": "配对码",
          "required": false,
          "example": "配对码测试值"
        },
        {
          "key": "StoreCode",
          "label": "区域",
          "required": false,
          "example": "区域测试值"
        },
        {
          "key": "DeviceCode",
          "label": "设备码",
          "required": false,
          "example": "设备码测试值"
        },
        {
          "key": "LocatorIndex",
          "label": "储位索引号",
          "required": false,
          "example": "储位索引号测试值"
        },
        {
          "key": "LocatorStatus",
          "label": "储位状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "ContainerCode",
          "label": "容器号",
          "required": false,
          "example": "容器号测试值"
        },
        {
          "key": "ContainerType",
          "label": "容器类型",
          "required": false,
          "example": "容器类型测试值"
        },
        {
          "key": "toPosition",
          "label": "目的位置",
          "required": false,
          "example": "目的位置测试值"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "LocatorCode": "储位码测试值",
        "LocatorType": "储位类型测试值",
        "MappingCode": "配对码测试值",
        "StoreCode": "区域测试值",
        "DeviceCode": "设备码测试值",
        "LocatorIndex": "储位索引号测试值",
        "LocatorStatus": "Y",
        "ContainerCode": "容器号测试值",
        "ContainerType": "容器类型测试值",
        "toPosition": "目的位置测试值",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "7e002f9936-e541f1bdde-6d428",
      "type": "业务动作",
      "name": "批量出库业务入口校验",
      "label": "批量出库",
      "handler": "AgvOut",
      "permission": "ImsAsrsAgvOut",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位批量出库",
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
      "permission": "ImsAsrsLocatorEdit",
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
          "key": "LocatorCode",
          "label": "储位码",
          "required": true,
          "example": "储位码测试值"
        },
        {
          "key": "LocatorType",
          "label": "储位类型",
          "required": false,
          "example": "储位类型测试值"
        },
        {
          "key": "MappingCode",
          "label": "配对码",
          "required": false,
          "example": "配对码测试值"
        },
        {
          "key": "StoreCode",
          "label": "区域",
          "required": false,
          "example": "区域测试值"
        },
        {
          "key": "DeviceCode",
          "label": "设备码",
          "required": false,
          "example": "设备码测试值"
        },
        {
          "key": "LocatorIndex",
          "label": "储位索引号",
          "required": false,
          "example": "储位索引号测试值"
        },
        {
          "key": "LocatorStatus",
          "label": "储位状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "ContainerCode",
          "label": "容器号",
          "required": false,
          "example": "容器号测试值"
        },
        {
          "key": "ContainerType",
          "label": "容器类型",
          "required": false,
          "example": "容器类型测试值"
        },
        {
          "key": "toPosition",
          "label": "目的位置",
          "required": false,
          "example": "目的位置测试值"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "LocatorCode": "储位码测试值",
        "LocatorType": "储位类型测试值",
        "MappingCode": "配对码测试值",
        "StoreCode": "区域测试值",
        "DeviceCode": "设备码测试值",
        "LocatorIndex": "储位索引号测试值",
        "LocatorStatus": "Y",
        "ContainerCode": "容器号测试值",
        "ContainerType": "容器类型测试值",
        "toPosition": "目的位置测试值",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsAsrsLocatorRemove",
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
