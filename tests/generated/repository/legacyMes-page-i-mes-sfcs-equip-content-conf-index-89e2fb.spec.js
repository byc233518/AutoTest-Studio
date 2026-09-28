// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-content-conf-index-89e2fb",
  "name": "旧版制造执行 - 设备点检事项功能校验",
  "displayName": "设备点检事项",
  "route": "/iMES/SfcsEquipContentConf/Index",
  "sourceRoute": "/iMES/SfcsEquipContentConf/Index",
  "menuCode": "iMES_equipContentConf",
  "breadcrumb": "设备管理 / 设备管理 / 设备点检事项",
  "sourceFile": "src/views/iMES/SfcsEquipContentConf/Index.vue",
  "dataSchema": {
    "columns": [
      "CATEGORY_ID",
      "KEEP_TYPE",
      "KEEP_CONTENT",
      "KEEP_TOOLS",
      "ORDER_NO",
      "ENABLE",
      "Key"
    ],
    "required": [
      "CATEGORY_ID",
      "KEEP_TYPE",
      "KEEP_CONTENT",
      "KEEP_TOOLS",
      "ORDER_NO"
    ],
    "fields": [
      {
        "key": "CATEGORY_ID",
        "label": "设备分类",
        "required": true
      },
      {
        "key": "KEEP_TYPE",
        "label": "保养类型",
        "required": true
      },
      {
        "key": "KEEP_CONTENT",
        "label": "保养内容事项",
        "required": true
      },
      {
        "key": "KEEP_TOOLS",
        "label": "保养工具辅料",
        "required": true
      },
      {
        "key": "ORDER_NO",
        "label": "排序",
        "required": true
      },
      {
        "key": "ENABLE",
        "label": "是否有效",
        "required": false
      },
      {
        "key": "Key",
        "label": "输入保养内容事项",
        "required": false
      }
    ],
    "example": {
      "CATEGORY_ID": "设备分类测试值",
      "KEEP_TYPE": "保养类型测试值",
      "KEEP_CONTENT": "保养内容事项测试值",
      "KEEP_TOOLS": "保养工具辅料测试值",
      "ORDER_NO": "排序测试值",
      "ENABLE": "Y",
      "Key": "输入保养内容事项测试值"
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
        "search_but"
      ],
      "testData": {
        "CATEGORY_ID": "设备分类测试值",
        "KEEP_TYPE": "保养类型测试值",
        "KEEP_CONTENT": "保养内容事项测试值",
        "KEEP_TOOLS": "保养工具辅料测试值",
        "ORDER_NO": "排序测试值",
        "ENABLE": "Y",
        "Key": "输入保养内容事项测试值"
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
      "permission": "SfcsEquipContentConfAdd",
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
          "key": "CATEGORY_ID",
          "label": "设备分类",
          "required": true,
          "example": "设备分类测试值"
        },
        {
          "key": "KEEP_TYPE",
          "label": "保养类型",
          "required": true,
          "example": "保养类型测试值"
        },
        {
          "key": "KEEP_CONTENT",
          "label": "保养内容事项",
          "required": true,
          "example": "保养内容事项测试值"
        },
        {
          "key": "KEEP_TOOLS",
          "label": "保养工具辅料",
          "required": true,
          "example": "保养工具辅料测试值"
        },
        {
          "key": "ORDER_NO",
          "label": "排序",
          "required": true,
          "example": "排序测试值"
        },
        {
          "key": "ENABLE",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Key",
          "label": "输入保养内容事项",
          "required": false,
          "example": "输入保养内容事项测试值"
        }
      ],
      "testData": {
        "CATEGORY_ID": "设备分类测试值",
        "KEEP_TYPE": "保养类型测试值",
        "KEEP_CONTENT": "保养内容事项测试值",
        "KEEP_TOOLS": "保养工具辅料测试值",
        "ORDER_NO": "排序测试值",
        "ENABLE": "Y",
        "Key": "输入保养内容事项测试值"
      }
    },
    {
      "key": "ef879b4ced-4cccae178a-dce2e",
      "type": "导出入口",
      "name": "数据导出业务入口校验",
      "label": "数据导出",
      "handler": "exportAllData2",
      "permission": "SfcsEquipContentConfExport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击数据导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "SfcsEquipContentConfedit",
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
          "key": "CATEGORY_ID",
          "label": "设备分类",
          "required": true,
          "example": "设备分类测试值"
        },
        {
          "key": "KEEP_TYPE",
          "label": "保养类型",
          "required": true,
          "example": "保养类型测试值"
        },
        {
          "key": "KEEP_CONTENT",
          "label": "保养内容事项",
          "required": true,
          "example": "保养内容事项测试值"
        },
        {
          "key": "KEEP_TOOLS",
          "label": "保养工具辅料",
          "required": true,
          "example": "保养工具辅料测试值"
        },
        {
          "key": "ORDER_NO",
          "label": "排序",
          "required": true,
          "example": "排序测试值"
        },
        {
          "key": "ENABLE",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Key",
          "label": "输入保养内容事项",
          "required": false,
          "example": "输入保养内容事项测试值"
        }
      ],
      "testData": {
        "CATEGORY_ID": "设备分类测试值",
        "KEEP_TYPE": "保养类型测试值",
        "KEEP_CONTENT": "保养内容事项测试值",
        "KEEP_TOOLS": "保养工具辅料测试值",
        "ORDER_NO": "排序测试值",
        "ENABLE": "Y",
        "Key": "输入保养内容事项测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "SfcsEquipContentConfdelete",
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
      "key": "13fd57e65b-e53930199c-9c88f",
      "type": "新增表单",
      "name": "添加图片业务入口校验",
      "label": "添加图片",
      "handler": "add_img_but",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加图片",
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
          "key": "CATEGORY_ID",
          "label": "设备分类",
          "required": true,
          "example": "设备分类测试值"
        },
        {
          "key": "KEEP_TYPE",
          "label": "保养类型",
          "required": true,
          "example": "保养类型测试值"
        },
        {
          "key": "KEEP_CONTENT",
          "label": "保养内容事项",
          "required": true,
          "example": "保养内容事项测试值"
        },
        {
          "key": "KEEP_TOOLS",
          "label": "保养工具辅料",
          "required": true,
          "example": "保养工具辅料测试值"
        },
        {
          "key": "ORDER_NO",
          "label": "排序",
          "required": true,
          "example": "排序测试值"
        },
        {
          "key": "ENABLE",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Key",
          "label": "输入保养内容事项",
          "required": false,
          "example": "输入保养内容事项测试值"
        }
      ],
      "testData": {
        "CATEGORY_ID": "设备分类测试值",
        "KEEP_TYPE": "保养类型测试值",
        "KEEP_CONTENT": "保养内容事项测试值",
        "KEEP_TOOLS": "保养工具辅料测试值",
        "ORDER_NO": "排序测试值",
        "ENABLE": "Y",
        "Key": "输入保养内容事项测试值"
      }
    }
  ]
});
