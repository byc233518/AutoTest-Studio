// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-andon-call-rule-config-index-571249",
  "name": "旧版制造执行 - 消息规则配置功能校验",
  "displayName": "消息规则配置",
  "route": "/iMES/AndonCallRuleConfig/Index",
  "sourceRoute": "/iMES/AndonCallRuleConfig/Index",
  "menuCode": "iMES_AndonCallRuleConfig",
  "breadcrumb": "品质管理 / 消息中心 / 消息规则配置",
  "sourceFile": "src/views/iMES/AndonCallRuleConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "CALL_CATEGORY_CODE",
      "CALL_TYPE_CODE",
      "CALL_TITLE",
      "ENABLED",
      "RULE_TYPE",
      "RULE",
      "RULE_UNIT",
      "ATTRIBUTE1",
      "Key",
      "CALL_TITLES"
    ],
    "required": [
      "CALL_CATEGORY_CODE",
      "CALL_TYPE_CODE",
      "CALL_TITLE",
      "ATTRIBUTE1"
    ],
    "fields": [
      {
        "key": "CALL_CATEGORY_CODE",
        "label": "消息种类",
        "required": true
      },
      {
        "key": "CALL_TYPE_CODE",
        "label": "消息类型",
        "required": true
      },
      {
        "key": "CALL_TITLE",
        "label": "消息标题",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "RULE_TYPE",
        "label": "规则类型",
        "required": false
      },
      {
        "key": "RULE",
        "label": "规则内容",
        "required": false
      },
      {
        "key": "RULE_UNIT",
        "label": "时间单位",
        "required": false
      },
      {
        "key": "ATTRIBUTE1",
        "label": "通知类型",
        "required": true
      },
      {
        "key": "Key",
        "label": "消息标题",
        "required": false
      },
      {
        "key": "CALL_TITLES",
        "label": "消息标题",
        "required": false
      }
    ],
    "example": {
      "CALL_CATEGORY_CODE": "消息种类测试值",
      "CALL_TYPE_CODE": "消息类型测试值",
      "CALL_TITLE": "消息标题测试值",
      "ENABLED": "是否激活测试值",
      "RULE_TYPE": "规则类型测试值",
      "RULE": "规则内容测试值",
      "RULE_UNIT": "时间单位测试值",
      "ATTRIBUTE1": "通知类型测试值",
      "Key": "消息标题测试值",
      "CALL_TITLES": "消息标题测试值"
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
        "CALL_CATEGORY_CODE": "消息种类测试值",
        "CALL_TYPE_CODE": "消息类型测试值",
        "CALL_TITLE": "消息标题测试值",
        "ENABLED": "是否激活测试值",
        "RULE_TYPE": "规则类型测试值",
        "RULE": "规则内容测试值",
        "RULE_UNIT": "时间单位测试值",
        "ATTRIBUTE1": "通知类型测试值",
        "Key": "消息标题测试值",
        "CALL_TITLES": "消息标题测试值"
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
      "permission": "AndonCallRuleConfigAdd",
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
          "key": "CALL_CATEGORY_CODE",
          "label": "消息种类",
          "required": true,
          "example": "消息种类测试值"
        },
        {
          "key": "CALL_TYPE_CODE",
          "label": "消息类型",
          "required": true,
          "example": "消息类型测试值"
        },
        {
          "key": "CALL_TITLE",
          "label": "消息标题",
          "required": true,
          "example": "消息标题测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "RULE_TYPE",
          "label": "规则类型",
          "required": false,
          "example": "规则类型测试值"
        },
        {
          "key": "RULE",
          "label": "规则内容",
          "required": false,
          "example": "规则内容测试值"
        },
        {
          "key": "RULE_UNIT",
          "label": "时间单位",
          "required": false,
          "example": "时间单位测试值"
        },
        {
          "key": "ATTRIBUTE1",
          "label": "通知类型",
          "required": true,
          "example": "通知类型测试值"
        },
        {
          "key": "Key",
          "label": "消息标题",
          "required": false,
          "example": "消息标题测试值"
        },
        {
          "key": "CALL_TITLES",
          "label": "消息标题",
          "required": false,
          "example": "消息标题测试值"
        }
      ],
      "testData": {
        "CALL_CATEGORY_CODE": "消息种类测试值",
        "CALL_TYPE_CODE": "消息类型测试值",
        "CALL_TITLE": "消息标题测试值",
        "ENABLED": "是否激活测试值",
        "RULE_TYPE": "规则类型测试值",
        "RULE": "规则内容测试值",
        "RULE_UNIT": "时间单位测试值",
        "ATTRIBUTE1": "通知类型测试值",
        "Key": "消息标题测试值",
        "CALL_TITLES": "消息标题测试值"
      }
    },
    {
      "key": "7e002f9936-673609fa24-99afe",
      "type": "业务动作",
      "name": "配置规则业务入口校验",
      "label": "配置规则",
      "handler": "editClick(row, row.$index)",
      "permission": "AndonCallRuleConfigEdit",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击配置规则",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "AndonCallRuleConfigDelete",
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
