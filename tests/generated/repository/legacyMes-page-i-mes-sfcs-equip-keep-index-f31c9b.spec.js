// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-keep-index-f31c9b",
  "name": "旧版制造执行 - 设备点检作业功能校验",
  "displayName": "设备点检作业",
  "route": "/iMES/SfcsEquipKeep/Index",
  "sourceRoute": "/iMES/SfcsEquipKeep/Index",
  "menuCode": "iMES_SfcsEquipKeep",
  "breadcrumb": "设备管理 / 设备管理 / 设备点检作业",
  "sourceFile": "src/views/iMES/SfcsEquipKeep/Index.vue",
  "dataSchema": {
    "columns": [
      "PRODUCT_NO",
      "STATION_ID",
      "CATEGROY",
      "KEEP_TYPENAME",
      "EQUIP_STATUS",
      "REPAIR_USER",
      "CATEGORY",
      "KEEP_TYPE",
      "EQUIP_NAME",
      "KEEP_CHECK_STATUS",
      "KEEP_USER",
      "value2",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "PRODUCT_NO",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "STATION_ID",
        "label": "存放地点",
        "required": false
      },
      {
        "key": "CATEGROY",
        "label": "设备分类",
        "required": false
      },
      {
        "key": "KEEP_TYPENAME",
        "label": "保养类型",
        "required": false
      },
      {
        "key": "EQUIP_STATUS",
        "label": "设备状态",
        "required": false
      },
      {
        "key": "REPAIR_USER",
        "label": "维修责任人",
        "required": false
      },
      {
        "key": "CATEGORY",
        "label": "选择设备类型",
        "required": false
      },
      {
        "key": "KEEP_TYPE",
        "label": "选择保养类型",
        "required": false
      },
      {
        "key": "EQUIP_NAME",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "KEEP_CHECK_STATUS",
        "label": "选择单据状态",
        "required": false
      },
      {
        "key": "KEEP_USER",
        "label": "点检人",
        "required": false
      },
      {
        "key": "value2",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "Key",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "PRODUCT_NO": "AT-001",
      "STATION_ID": "存放地点测试值",
      "CATEGROY": "设备分类测试值",
      "KEEP_TYPENAME": "保养类型测试值",
      "EQUIP_STATUS": "Y",
      "REPAIR_USER": "维修责任人测试值",
      "CATEGORY": "选择设备类型测试值",
      "KEEP_TYPE": "选择保养类型测试值",
      "EQUIP_NAME": "AT-001",
      "KEEP_CHECK_STATUS": "Y",
      "KEEP_USER": "点检人测试值",
      "value2": "2026-08-01",
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
        "search_but",
        "searchUserList"
      ],
      "testData": {
        "PRODUCT_NO": "AT-001",
        "STATION_ID": "存放地点测试值",
        "CATEGROY": "设备分类测试值",
        "KEEP_TYPENAME": "保养类型测试值",
        "EQUIP_STATUS": "Y",
        "REPAIR_USER": "维修责任人测试值",
        "CATEGORY": "选择设备类型测试值",
        "KEEP_TYPE": "选择保养类型测试值",
        "EQUIP_NAME": "AT-001",
        "KEEP_CHECK_STATUS": "Y",
        "KEEP_USER": "点检人测试值",
        "value2": "2026-08-01",
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "SfcsEquipKeepAdd",
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
          "key": "PRODUCT_NO",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "STATION_ID",
          "label": "存放地点",
          "required": false,
          "example": "存放地点测试值"
        },
        {
          "key": "CATEGROY",
          "label": "设备分类",
          "required": false,
          "example": "设备分类测试值"
        },
        {
          "key": "KEEP_TYPENAME",
          "label": "保养类型",
          "required": false,
          "example": "保养类型测试值"
        },
        {
          "key": "EQUIP_STATUS",
          "label": "设备状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "REPAIR_USER",
          "label": "维修责任人",
          "required": false,
          "example": "维修责任人测试值"
        },
        {
          "key": "CATEGORY",
          "label": "选择设备类型",
          "required": false,
          "example": "选择设备类型测试值"
        },
        {
          "key": "KEEP_TYPE",
          "label": "选择保养类型",
          "required": false,
          "example": "选择保养类型测试值"
        },
        {
          "key": "EQUIP_NAME",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "KEEP_CHECK_STATUS",
          "label": "选择单据状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "KEEP_USER",
          "label": "点检人",
          "required": false,
          "example": "点检人测试值"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "PRODUCT_NO": "AT-001",
        "STATION_ID": "存放地点测试值",
        "CATEGROY": "设备分类测试值",
        "KEEP_TYPENAME": "保养类型测试值",
        "EQUIP_STATUS": "Y",
        "REPAIR_USER": "维修责任人测试值",
        "CATEGORY": "选择设备类型测试值",
        "KEEP_TYPE": "选择保养类型测试值",
        "EQUIP_NAME": "AT-001",
        "KEEP_CHECK_STATUS": "Y",
        "KEEP_USER": "点检人测试值",
        "value2": "2026-08-01",
        "Key": "输入关键字搜索测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-0a6da",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but",
      "permission": "SfcsEquipKeepedit",
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
          "key": "PRODUCT_NO",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "STATION_ID",
          "label": "存放地点",
          "required": false,
          "example": "存放地点测试值"
        },
        {
          "key": "CATEGROY",
          "label": "设备分类",
          "required": false,
          "example": "设备分类测试值"
        },
        {
          "key": "KEEP_TYPENAME",
          "label": "保养类型",
          "required": false,
          "example": "保养类型测试值"
        },
        {
          "key": "EQUIP_STATUS",
          "label": "设备状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "REPAIR_USER",
          "label": "维修责任人",
          "required": false,
          "example": "维修责任人测试值"
        },
        {
          "key": "CATEGORY",
          "label": "选择设备类型",
          "required": false,
          "example": "选择设备类型测试值"
        },
        {
          "key": "KEEP_TYPE",
          "label": "选择保养类型",
          "required": false,
          "example": "选择保养类型测试值"
        },
        {
          "key": "EQUIP_NAME",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "KEEP_CHECK_STATUS",
          "label": "选择单据状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "KEEP_USER",
          "label": "点检人",
          "required": false,
          "example": "点检人测试值"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "Key",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "PRODUCT_NO": "AT-001",
        "STATION_ID": "存放地点测试值",
        "CATEGROY": "设备分类测试值",
        "KEEP_TYPENAME": "保养类型测试值",
        "EQUIP_STATUS": "Y",
        "REPAIR_USER": "维修责任人测试值",
        "CATEGORY": "选择设备类型测试值",
        "KEEP_TYPE": "选择保养类型测试值",
        "EQUIP_NAME": "AT-001",
        "KEEP_CHECK_STATUS": "Y",
        "KEEP_USER": "点检人测试值",
        "value2": "2026-08-01",
        "Key": "输入关键字搜索测试值"
      }
    },
    {
      "key": "7e002f9936-317d201b33-b514a",
      "type": "业务动作",
      "name": "取消提交业务入口校验",
      "label": "取消提交",
      "handler": "cancel_Submit",
      "permission": "SfcsEquipKeepedit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消提交",
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
      "key": "726b6ec55f-3755f56f2f-4d9e1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but()",
      "permission": "SfcsEquipKeepdelete",
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
    },
    {
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "SfcsEquipKeepAudit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
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
      "key": "7e002f9936-903be22a4a-b3c44",
      "type": "业务动作",
      "name": "提交审核业务入口校验",
      "label": "提交审核",
      "handler": "SubmitReview_but",
      "permission": "SfcsEquipKeepreview",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交审核",
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
      "key": "5f1787916c-34edcfef47-526bd",
      "type": "导入入口",
      "name": "拍照上传业务入口校验",
      "label": "拍照上传",
      "handler": "SubmintDialog",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击拍照上传",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    }
  ]
});
