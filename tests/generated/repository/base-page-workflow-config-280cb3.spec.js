// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-workflow-config-280cb3",
  "name": "基座系统 - 工作流配置功能校验",
  "displayName": "工作流配置",
  "route": "/WorkflowConfig",
  "sourceRoute": "/WorkflowConfig",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 工作流配置",
  "sourceFile": "src/views/Admin/Development/WorkflowConfig/index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "Name",
      "Category",
      "Status",
      "Description",
      "label",
      "assignee",
      "timeout",
      "expression",
      "connectTarget",
      "keyword",
      "category",
      "status"
    ],
    "required": [
      "Code",
      "Name",
      "Category"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "流程编码",
        "required": true
      },
      {
        "key": "Name",
        "label": "流程名称",
        "required": true
      },
      {
        "key": "Category",
        "label": "流程分类",
        "required": true
      },
      {
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "Description",
        "label": "描述",
        "required": false
      },
      {
        "key": "label",
        "label": "节点名称",
        "required": false
      },
      {
        "key": "assignee",
        "label": "审批人",
        "required": false
      },
      {
        "key": "timeout",
        "label": "超时(小时)",
        "required": false
      },
      {
        "key": "expression",
        "label": "条件表达式",
        "required": false
      },
      {
        "key": "connectTarget",
        "label": "连接至",
        "required": false
      },
      {
        "key": "keyword",
        "label": "搜索流程名称/编码",
        "required": false
      },
      {
        "key": "category",
        "label": "流程分类",
        "required": false
      },
      {
        "key": "status",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "Code": "AT-001",
      "Name": "自动化样例001",
      "Category": "流程分类测试值",
      "Status": "Y",
      "Description": "自动化测试备注001",
      "label": "自动化样例001",
      "assignee": "审批人测试值",
      "timeout": "超时(小时)测试值",
      "expression": "条件表达式测试值",
      "connectTarget": "连接至测试值",
      "keyword": "AT-001",
      "category": "流程分类测试值",
      "status": "Y"
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
        "Category": "流程分类测试值",
        "Status": "Y",
        "Description": "自动化测试备注001",
        "label": "自动化样例001",
        "assignee": "审批人测试值",
        "timeout": "超时(小时)测试值",
        "expression": "条件表达式测试值",
        "connectTarget": "连接至测试值",
        "keyword": "AT-001",
        "category": "流程分类测试值",
        "status": "Y"
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
      "key": "13fd57e65b-e375b2e94f-be825",
      "type": "新增表单",
      "name": "新增工作流业务入口校验",
      "label": "新增工作流",
      "handler": "handleAdd",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增工作流",
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
          "label": "流程编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "流程名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Category",
          "label": "流程分类",
          "required": true,
          "example": "流程分类测试值"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "label",
          "label": "节点名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "assignee",
          "label": "审批人",
          "required": false,
          "example": "审批人测试值"
        },
        {
          "key": "timeout",
          "label": "超时(小时)",
          "required": false,
          "example": "超时(小时)测试值"
        },
        {
          "key": "expression",
          "label": "条件表达式",
          "required": false,
          "example": "条件表达式测试值"
        },
        {
          "key": "connectTarget",
          "label": "连接至",
          "required": false,
          "example": "连接至测试值"
        },
        {
          "key": "keyword",
          "label": "搜索流程名称/编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "category",
          "label": "流程分类",
          "required": false,
          "example": "流程分类测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Category": "流程分类测试值",
        "Status": "Y",
        "Description": "自动化测试备注001",
        "label": "自动化样例001",
        "assignee": "审批人测试值",
        "timeout": "超时(小时)测试值",
        "expression": "条件表达式测试值",
        "connectTarget": "连接至测试值",
        "keyword": "AT-001",
        "category": "流程分类测试值",
        "status": "Y"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-8f1ba",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEdit(row)",
      "permission": "",
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
          "label": "流程编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "流程名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Category",
          "label": "流程分类",
          "required": true,
          "example": "流程分类测试值"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "label",
          "label": "节点名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "assignee",
          "label": "审批人",
          "required": false,
          "example": "审批人测试值"
        },
        {
          "key": "timeout",
          "label": "超时(小时)",
          "required": false,
          "example": "超时(小时)测试值"
        },
        {
          "key": "expression",
          "label": "条件表达式",
          "required": false,
          "example": "条件表达式测试值"
        },
        {
          "key": "connectTarget",
          "label": "连接至",
          "required": false,
          "example": "连接至测试值"
        },
        {
          "key": "keyword",
          "label": "搜索流程名称/编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "category",
          "label": "流程分类",
          "required": false,
          "example": "流程分类测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Category": "流程分类测试值",
        "Status": "Y",
        "Description": "自动化测试备注001",
        "label": "自动化样例001",
        "assignee": "审批人测试值",
        "timeout": "超时(小时)测试值",
        "expression": "条件表达式测试值",
        "connectTarget": "连接至测试值",
        "keyword": "AT-001",
        "category": "流程分类测试值",
        "status": "Y"
      }
    },
    {
      "key": "7e002f9936-4edd1d0087-2ffb0",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "handleCopy(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
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
      "key": "726b6ec55f-3755f56f2f-11ff8",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(row)",
      "permission": "",
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
