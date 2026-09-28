// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equipment-category-index-039dc6",
  "name": "旧版制造执行 - 设备大类功能校验",
  "displayName": "设备大类",
  "route": "/iMES/SfcsEquipmentCategory/Index",
  "sourceRoute": "/iMES/SfcsEquipmentCategory/Index",
  "menuCode": "iMES_SfcsEquipmentCategory",
  "breadcrumb": "设备管理 / 设备管理 / 设备大类",
  "sourceFile": "src/views/iMES/SfcsEquipmentCategory/Index.vue",
  "dataSchema": {
    "columns": [
      "CATEGORY_NAME",
      "IDLIST"
    ],
    "required": [
      "CATEGORY_NAME",
      "IDLIST"
    ],
    "fields": [
      {
        "key": "CATEGORY_NAME",
        "label": "设备大类",
        "required": true
      },
      {
        "key": "IDLIST",
        "label": "设备分类",
        "required": true
      }
    ],
    "example": {
      "CATEGORY_NAME": "设备大类测试值",
      "IDLIST": "设备分类测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "",
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
          "key": "CATEGORY_NAME",
          "label": "设备大类",
          "required": true,
          "example": "设备大类测试值"
        },
        {
          "key": "IDLIST",
          "label": "设备分类",
          "required": true,
          "example": "设备分类测试值"
        }
      ],
      "testData": {
        "CATEGORY_NAME": "设备大类测试值",
        "IDLIST": "设备分类测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a6c71",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick",
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
    },
    {
      "key": "7e002f9936-be70be5a2e-be70b",
      "type": "业务动作",
      "name": "禁用业务入口校验",
      "label": "禁用",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位禁用",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
