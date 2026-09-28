// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-lookups-index-8ffac3",
  "name": "旧版制造执行 - 生产参数配置功能校验",
  "displayName": "生产参数配置",
  "route": "/iMES/SfcsLookups/Index",
  "sourceRoute": "/iMES/SfcsLookups/Index",
  "menuCode": "iMES_SfcsLookups",
  "breadcrumb": "系统管理 / 配置字典 / 生产参数配置",
  "sourceFile": "src/views/iMES/SfcsLookups/Index.vue",
  "dataSchema": {
    "columns": [
      "KIND",
      "CODE",
      "DESCRIPTION",
      "CHINESE",
      "CATEGORY",
      "ENABLED",
      "Key",
      "MEANING"
    ],
    "required": [
      "KIND",
      "CODE"
    ],
    "fields": [
      {
        "key": "KIND",
        "label": "类型",
        "required": true
      },
      {
        "key": "CODE",
        "label": "键值",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "英文描述",
        "required": false
      },
      {
        "key": "CHINESE",
        "label": "中文描述",
        "required": false
      },
      {
        "key": "CATEGORY",
        "label": "种类",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "Key",
        "label": "键值/描述",
        "required": false
      },
      {
        "key": "MEANING",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "KIND": "类型测试值",
      "CODE": "键值测试值",
      "DESCRIPTION": "自动化测试备注001",
      "CHINESE": "自动化测试备注001",
      "CATEGORY": "种类测试值",
      "ENABLED": "是否激活测试值",
      "Key": "自动化测试备注001",
      "MEANING": "输入关键字搜索测试值"
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
        "searchQueryList",
        "searchClick"
      ],
      "testData": {
        "KIND": "类型测试值",
        "CODE": "键值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "CHINESE": "自动化测试备注001",
        "CATEGORY": "种类测试值",
        "ENABLED": "是否激活测试值",
        "Key": "自动化测试备注001",
        "MEANING": "输入关键字搜索测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
      "permission": "SfcsLookupsAdd",
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
          "key": "KIND",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "CODE",
          "label": "键值",
          "required": true,
          "example": "键值测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "英文描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CHINESE",
          "label": "中文描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CATEGORY",
          "label": "种类",
          "required": false,
          "example": "种类测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "Key",
          "label": "键值/描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MEANING",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "KIND": "类型测试值",
        "CODE": "键值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "CHINESE": "自动化测试备注001",
        "CATEGORY": "种类测试值",
        "ENABLED": "是否激活测试值",
        "Key": "自动化测试备注001",
        "MEANING": "输入关键字搜索测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsLookupsEdit",
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
          "key": "KIND",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "CODE",
          "label": "键值",
          "required": true,
          "example": "键值测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "英文描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CHINESE",
          "label": "中文描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CATEGORY",
          "label": "种类",
          "required": false,
          "example": "种类测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "Key",
          "label": "键值/描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MEANING",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "KIND": "类型测试值",
        "CODE": "键值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "CHINESE": "自动化测试备注001",
        "CATEGORY": "种类测试值",
        "ENABLED": "是否激活测试值",
        "Key": "自动化测试备注001",
        "MEANING": "输入关键字搜索测试值"
      }
    }
  ]
});
