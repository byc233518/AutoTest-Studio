// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-all-objects-index-16cac2",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SfcsAllObjects/Index",
  "sourceRoute": "/iMES/SfcsAllObjects/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsAllObjects/Index.vue",
  "dataSchema": {
    "columns": [
      "OBJECT_NAME",
      "OBJECT_MARK",
      "OBJECT_CATEGORY",
      "ISACTIVE",
      "DESCRIPTION",
      "Key"
    ],
    "required": [
      "OBJECT_NAME",
      "OBJECT_MARK",
      "OBJECT_CATEGORY"
    ],
    "fields": [
      {
        "key": "OBJECT_NAME",
        "label": "采集类型名称",
        "required": true
      },
      {
        "key": "OBJECT_MARK",
        "label": "标记信息",
        "required": true
      },
      {
        "key": "OBJECT_CATEGORY",
        "label": "采集类型种类",
        "required": true
      },
      {
        "key": "ISACTIVE",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": false
      },
      {
        "key": "Key",
        "label": "采集名称",
        "required": false
      }
    ],
    "example": {
      "OBJECT_NAME": "自动化样例001",
      "OBJECT_MARK": "标记信息测试值",
      "OBJECT_CATEGORY": "采集类型种类测试值",
      "ISACTIVE": "Y",
      "DESCRIPTION": "自动化测试备注001",
      "Key": "自动化样例001"
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
        "OBJECT_NAME": "自动化样例001",
        "OBJECT_MARK": "标记信息测试值",
        "OBJECT_CATEGORY": "采集类型种类测试值",
        "ISACTIVE": "Y",
        "DESCRIPTION": "自动化测试备注001",
        "Key": "自动化样例001"
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
      "key": "13fd57e65b-2cd9e6ce81-f861f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent",
      "permission": "SfcsAllObjectsAdd",
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
          "key": "OBJECT_NAME",
          "label": "采集类型名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OBJECT_MARK",
          "label": "标记信息",
          "required": true,
          "example": "标记信息测试值"
        },
        {
          "key": "OBJECT_CATEGORY",
          "label": "采集类型种类",
          "required": true,
          "example": "采集类型种类测试值"
        },
        {
          "key": "ISACTIVE",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Key",
          "label": "采集名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "OBJECT_NAME": "自动化样例001",
        "OBJECT_MARK": "标记信息测试值",
        "OBJECT_CATEGORY": "采集类型种类测试值",
        "ISACTIVE": "Y",
        "DESCRIPTION": "自动化测试备注001",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsAllObjectsEdit",
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
          "key": "OBJECT_NAME",
          "label": "采集类型名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OBJECT_MARK",
          "label": "标记信息",
          "required": true,
          "example": "标记信息测试值"
        },
        {
          "key": "OBJECT_CATEGORY",
          "label": "采集类型种类",
          "required": true,
          "example": "采集类型种类测试值"
        },
        {
          "key": "ISACTIVE",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Key",
          "label": "采集名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "OBJECT_NAME": "自动化样例001",
        "OBJECT_MARK": "标记信息测试值",
        "OBJECT_CATEGORY": "采集类型种类测试值",
        "ISACTIVE": "Y",
        "DESCRIPTION": "自动化测试备注001",
        "Key": "自动化样例001"
      }
    }
  ]
});
