// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-reason-config-index-2796b5",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/SfcsReasonConfig/Index",
  "sourceRoute": "/iMES/SfcsReasonConfig/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsReasonConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "REASON_TYPE",
      "REASON_CLASS",
      "REASON_CATEGORY",
      "LEVEL_CODE",
      "SOURCE",
      "REASON_CODE",
      "REASON_DESCRIPTION",
      "CHINESE_DESCRIPTION",
      "ENABLED"
    ],
    "required": [
      "REASON_TYPE",
      "REASON_CATEGORY",
      "LEVEL_CODE",
      "SOURCE",
      "REASON_CODE",
      "REASON_DESCRIPTION",
      "CHINESE_DESCRIPTION"
    ],
    "fields": [
      {
        "key": "REASON_TYPE",
        "label": "不良原因类型",
        "required": true
      },
      {
        "key": "REASON_CLASS",
        "label": "不良原因种类",
        "required": false
      },
      {
        "key": "REASON_CATEGORY",
        "label": "不良原因类别",
        "required": true
      },
      {
        "key": "LEVEL_CODE",
        "label": "不良原因等级",
        "required": true
      },
      {
        "key": "SOURCE",
        "label": "不良原因来源",
        "required": true
      },
      {
        "key": "REASON_CODE",
        "label": "不良原因代码",
        "required": true
      },
      {
        "key": "REASON_DESCRIPTION",
        "label": "英文描述",
        "required": true
      },
      {
        "key": "CHINESE_DESCRIPTION",
        "label": "中文描述",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "REASON_TYPE": "不良原因类型测试值",
      "REASON_CLASS": "不良原因种类测试值",
      "REASON_CATEGORY": "不良原因类别测试值",
      "LEVEL_CODE": "不良原因等级测试值",
      "SOURCE": "不良原因来源测试值",
      "REASON_CODE": "不良原因代码测试值",
      "REASON_DESCRIPTION": "自动化测试备注001",
      "CHINESE_DESCRIPTION": "自动化测试备注001",
      "ENABLED": "是否激活测试值"
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
        "REASON_TYPE": "不良原因类型测试值",
        "REASON_CLASS": "不良原因种类测试值",
        "REASON_CATEGORY": "不良原因类别测试值",
        "LEVEL_CODE": "不良原因等级测试值",
        "SOURCE": "不良原因来源测试值",
        "REASON_CODE": "不良原因代码测试值",
        "REASON_DESCRIPTION": "自动化测试备注001",
        "CHINESE_DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值"
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
      "key": "3d81345303-3d81345303-ef700",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "resetFormData",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-2cd9e6ce81-51611",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(null)",
      "permission": "SfcsReasonConfigAdd",
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
          "key": "REASON_TYPE",
          "label": "不良原因类型",
          "required": true,
          "example": "不良原因类型测试值"
        },
        {
          "key": "REASON_CLASS",
          "label": "不良原因种类",
          "required": false,
          "example": "不良原因种类测试值"
        },
        {
          "key": "REASON_CATEGORY",
          "label": "不良原因类别",
          "required": true,
          "example": "不良原因类别测试值"
        },
        {
          "key": "LEVEL_CODE",
          "label": "不良原因等级",
          "required": true,
          "example": "不良原因等级测试值"
        },
        {
          "key": "SOURCE",
          "label": "不良原因来源",
          "required": true,
          "example": "不良原因来源测试值"
        },
        {
          "key": "REASON_CODE",
          "label": "不良原因代码",
          "required": true,
          "example": "不良原因代码测试值"
        },
        {
          "key": "REASON_DESCRIPTION",
          "label": "英文描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CHINESE_DESCRIPTION",
          "label": "中文描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "REASON_TYPE": "不良原因类型测试值",
        "REASON_CLASS": "不良原因种类测试值",
        "REASON_CATEGORY": "不良原因类别测试值",
        "LEVEL_CODE": "不良原因等级测试值",
        "SOURCE": "不良原因来源测试值",
        "REASON_CODE": "不良原因代码测试值",
        "REASON_DESCRIPTION": "自动化测试备注001",
        "CHINESE_DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsReasonConfigSave",
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
          "key": "REASON_TYPE",
          "label": "不良原因类型",
          "required": true,
          "example": "不良原因类型测试值"
        },
        {
          "key": "REASON_CLASS",
          "label": "不良原因种类",
          "required": false,
          "example": "不良原因种类测试值"
        },
        {
          "key": "REASON_CATEGORY",
          "label": "不良原因类别",
          "required": true,
          "example": "不良原因类别测试值"
        },
        {
          "key": "LEVEL_CODE",
          "label": "不良原因等级",
          "required": true,
          "example": "不良原因等级测试值"
        },
        {
          "key": "SOURCE",
          "label": "不良原因来源",
          "required": true,
          "example": "不良原因来源测试值"
        },
        {
          "key": "REASON_CODE",
          "label": "不良原因代码",
          "required": true,
          "example": "不良原因代码测试值"
        },
        {
          "key": "REASON_DESCRIPTION",
          "label": "英文描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CHINESE_DESCRIPTION",
          "label": "中文描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "REASON_TYPE": "不良原因类型测试值",
        "REASON_CLASS": "不良原因种类测试值",
        "REASON_CATEGORY": "不良原因类别测试值",
        "LEVEL_CODE": "不良原因等级测试值",
        "SOURCE": "不良原因来源测试值",
        "REASON_CODE": "不良原因代码测试值",
        "REASON_DESCRIPTION": "自动化测试备注001",
        "CHINESE_DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值"
      }
    }
  ]
});
