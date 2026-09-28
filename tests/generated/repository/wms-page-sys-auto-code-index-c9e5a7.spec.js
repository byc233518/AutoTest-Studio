// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-sys-auto-code-index-c9e5a7",
  "name": "仓储管理 - 编码规则功能校验",
  "displayName": "编码规则",
  "route": "/SysAutoCode/Index",
  "sourceRoute": "/SysAutoCode/Index",
  "menuCode": "SysAutoCode",
  "breadcrumb": "系统管理 / 系统配置 / 编码规则",
  "sourceFile": "src/views/SysAutoCode/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "Name",
      "Prefix",
      "DateFormat",
      "SerialNo",
      "Step",
      "Digit",
      "CountRule"
    ],
    "required": [
      "Code",
      "Name",
      "Step"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "功能编号",
        "required": true
      },
      {
        "key": "Name",
        "label": "功能名称",
        "required": true
      },
      {
        "key": "Prefix",
        "label": "编号前缀",
        "required": false
      },
      {
        "key": "DateFormat",
        "label": "编号日期格式",
        "required": false
      },
      {
        "key": "SerialNo",
        "label": "当前流水号",
        "required": false
      },
      {
        "key": "Step",
        "label": "步长",
        "required": true
      },
      {
        "key": "Digit",
        "label": "流水号位数",
        "required": false
      },
      {
        "key": "CountRule",
        "label": "流水号生成规则",
        "required": false
      }
    ],
    "example": {
      "Code": "AT-001",
      "Name": "自动化样例001",
      "Prefix": "编号前缀测试值",
      "DateFormat": "编号日期格式测试值",
      "SerialNo": "当前流水号测试值",
      "Step": "步长测试值",
      "Digit": "流水号位数测试值",
      "CountRule": "流水号生成规则测试值"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Prefix": "编号前缀测试值",
        "DateFormat": "编号日期格式测试值",
        "SerialNo": "当前流水号测试值",
        "Step": "步长测试值",
        "Digit": "流水号位数测试值",
        "CountRule": "流水号生成规则测试值"
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
      "permission": "SysAutoCodeAdd",
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
          "label": "功能编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "功能名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Prefix",
          "label": "编号前缀",
          "required": false,
          "example": "编号前缀测试值"
        },
        {
          "key": "DateFormat",
          "label": "编号日期格式",
          "required": false,
          "example": "编号日期格式测试值"
        },
        {
          "key": "SerialNo",
          "label": "当前流水号",
          "required": false,
          "example": "当前流水号测试值"
        },
        {
          "key": "Step",
          "label": "步长",
          "required": true,
          "example": "步长测试值"
        },
        {
          "key": "Digit",
          "label": "流水号位数",
          "required": false,
          "example": "流水号位数测试值"
        },
        {
          "key": "CountRule",
          "label": "流水号生成规则",
          "required": false,
          "example": "流水号生成规则测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Prefix": "编号前缀测试值",
        "DateFormat": "编号日期格式测试值",
        "SerialNo": "当前流水号测试值",
        "Step": "步长测试值",
        "Digit": "流水号位数测试值",
        "CountRule": "流水号生成规则测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "SysAutoCodeEdit",
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
          "label": "功能编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "功能名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Prefix",
          "label": "编号前缀",
          "required": false,
          "example": "编号前缀测试值"
        },
        {
          "key": "DateFormat",
          "label": "编号日期格式",
          "required": false,
          "example": "编号日期格式测试值"
        },
        {
          "key": "SerialNo",
          "label": "当前流水号",
          "required": false,
          "example": "当前流水号测试值"
        },
        {
          "key": "Step",
          "label": "步长",
          "required": true,
          "example": "步长测试值"
        },
        {
          "key": "Digit",
          "label": "流水号位数",
          "required": false,
          "example": "流水号位数测试值"
        },
        {
          "key": "CountRule",
          "label": "流水号生成规则",
          "required": false,
          "example": "流水号生成规则测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Prefix": "编号前缀测试值",
        "DateFormat": "编号日期格式测试值",
        "SerialNo": "当前流水号测试值",
        "Step": "步长测试值",
        "Digit": "流水号位数测试值",
        "CountRule": "流水号生成规则测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "SysAutoCodeDelete",
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
