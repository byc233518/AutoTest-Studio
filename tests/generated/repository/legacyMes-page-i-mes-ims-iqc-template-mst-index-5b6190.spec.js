// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ims-iqc-template-mst-index-5b6190",
  "name": "旧版制造执行 - 代码（未配置菜单）功能校验",
  "displayName": "代码（未配置菜单）",
  "route": "/iMES/ImsIqcTemplateMst/Index",
  "sourceRoute": "/iMES/ImsIqcTemplateMst/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 代码（未配置菜单）",
  "sourceFile": "src/views/iMES/ImsIqcTemplateMst/Index.vue",
  "dataSchema": {
    "columns": [
      "CODE",
      "FAMILY_NAME",
      "ENABLED",
      "ORDER_NO",
      "SUB_ORDER_NO",
      "ITEM",
      "STANDARD",
      "CHECK_TOOL",
      "CHECK_METHOD",
      "SAMPLE",
      "ACCEPT",
      "REJECT",
      "DEFECT_LEVEL",
      "SAMPLE_LEVEL",
      "DESCRIPTION"
    ],
    "required": [
      "CODE",
      "ORDER_NO",
      "SUB_ORDER_NO",
      "ITEM",
      "SAMPLE_LEVEL",
      "DESCRIPTION"
    ],
    "fields": [
      {
        "key": "CODE",
        "label": "代码",
        "required": true
      },
      {
        "key": "FAMILY_NAME",
        "label": "模板描述",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "ORDER_NO",
        "label": "主序号",
        "required": true
      },
      {
        "key": "SUB_ORDER_NO",
        "label": "子序号",
        "required": true
      },
      {
        "key": "ITEM",
        "label": "检验项",
        "required": true
      },
      {
        "key": "STANDARD",
        "label": "检验标准",
        "required": false
      },
      {
        "key": "CHECK_TOOL",
        "label": "检验工具",
        "required": false
      },
      {
        "key": "CHECK_METHOD",
        "label": "检验方法",
        "required": false
      },
      {
        "key": "SAMPLE",
        "label": "抽样数",
        "required": false
      },
      {
        "key": "ACCEPT",
        "label": "允收数量",
        "required": false
      },
      {
        "key": "REJECT",
        "label": "拒收数量",
        "required": false
      },
      {
        "key": "DEFECT_LEVEL",
        "label": "缺失等级",
        "required": false
      },
      {
        "key": "SAMPLE_LEVEL",
        "label": "抽样等级",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "模板描述",
        "required": true
      }
    ],
    "example": {
      "CODE": "代码测试值",
      "FAMILY_NAME": "自动化测试备注001",
      "ENABLED": "是否激活测试值",
      "ORDER_NO": "1",
      "SUB_ORDER_NO": "1",
      "ITEM": "检验项测试值",
      "STANDARD": "检验标准测试值",
      "CHECK_TOOL": "检验工具测试值",
      "CHECK_METHOD": "检验方法测试值",
      "SAMPLE": "抽样数测试值",
      "ACCEPT": "1",
      "REJECT": "1",
      "DEFECT_LEVEL": "缺失等级测试值",
      "SAMPLE_LEVEL": "抽样等级测试值",
      "DESCRIPTION": "自动化测试备注001"
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
        "CODE": "代码测试值",
        "FAMILY_NAME": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "ORDER_NO": "1",
        "SUB_ORDER_NO": "1",
        "ITEM": "检验项测试值",
        "STANDARD": "检验标准测试值",
        "CHECK_TOOL": "检验工具测试值",
        "CHECK_METHOD": "检验方法测试值",
        "SAMPLE": "抽样数测试值",
        "ACCEPT": "1",
        "REJECT": "1",
        "DEFECT_LEVEL": "缺失等级测试值",
        "SAMPLE_LEVEL": "抽样等级测试值",
        "DESCRIPTION": "自动化测试备注001"
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
      "permission": "ImsIqcTemplateMstAdd",
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
          "key": "CODE",
          "label": "代码",
          "required": true,
          "example": "代码测试值"
        },
        {
          "key": "FAMILY_NAME",
          "label": "模板描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "ORDER_NO",
          "label": "主序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "SUB_ORDER_NO",
          "label": "子序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "ITEM",
          "label": "检验项",
          "required": true,
          "example": "检验项测试值"
        },
        {
          "key": "STANDARD",
          "label": "检验标准",
          "required": false,
          "example": "检验标准测试值"
        },
        {
          "key": "CHECK_TOOL",
          "label": "检验工具",
          "required": false,
          "example": "检验工具测试值"
        },
        {
          "key": "CHECK_METHOD",
          "label": "检验方法",
          "required": false,
          "example": "检验方法测试值"
        },
        {
          "key": "SAMPLE",
          "label": "抽样数",
          "required": false,
          "example": "抽样数测试值"
        },
        {
          "key": "ACCEPT",
          "label": "允收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "REJECT",
          "label": "拒收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DEFECT_LEVEL",
          "label": "缺失等级",
          "required": false,
          "example": "缺失等级测试值"
        },
        {
          "key": "SAMPLE_LEVEL",
          "label": "抽样等级",
          "required": true,
          "example": "抽样等级测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "模板描述",
          "required": true,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "CODE": "代码测试值",
        "FAMILY_NAME": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "ORDER_NO": "1",
        "SUB_ORDER_NO": "1",
        "ITEM": "检验项测试值",
        "STANDARD": "检验标准测试值",
        "CHECK_TOOL": "检验工具测试值",
        "CHECK_METHOD": "检验方法测试值",
        "SAMPLE": "抽样数测试值",
        "ACCEPT": "1",
        "REJECT": "1",
        "DEFECT_LEVEL": "缺失等级测试值",
        "SAMPLE_LEVEL": "抽样等级测试值",
        "DESCRIPTION": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-cff74",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editRow(row)",
      "permission": "ImsIqcTemplateMstEdit",
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
          "key": "CODE",
          "label": "代码",
          "required": true,
          "example": "代码测试值"
        },
        {
          "key": "FAMILY_NAME",
          "label": "模板描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "ORDER_NO",
          "label": "主序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "SUB_ORDER_NO",
          "label": "子序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "ITEM",
          "label": "检验项",
          "required": true,
          "example": "检验项测试值"
        },
        {
          "key": "STANDARD",
          "label": "检验标准",
          "required": false,
          "example": "检验标准测试值"
        },
        {
          "key": "CHECK_TOOL",
          "label": "检验工具",
          "required": false,
          "example": "检验工具测试值"
        },
        {
          "key": "CHECK_METHOD",
          "label": "检验方法",
          "required": false,
          "example": "检验方法测试值"
        },
        {
          "key": "SAMPLE",
          "label": "抽样数",
          "required": false,
          "example": "抽样数测试值"
        },
        {
          "key": "ACCEPT",
          "label": "允收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "REJECT",
          "label": "拒收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DEFECT_LEVEL",
          "label": "缺失等级",
          "required": false,
          "example": "缺失等级测试值"
        },
        {
          "key": "SAMPLE_LEVEL",
          "label": "抽样等级",
          "required": true,
          "example": "抽样等级测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "模板描述",
          "required": true,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "CODE": "代码测试值",
        "FAMILY_NAME": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "ORDER_NO": "1",
        "SUB_ORDER_NO": "1",
        "ITEM": "检验项测试值",
        "STANDARD": "检验标准测试值",
        "CHECK_TOOL": "检验工具测试值",
        "CHECK_METHOD": "检验方法测试值",
        "SAMPLE": "抽样数测试值",
        "ACCEPT": "1",
        "REJECT": "1",
        "DEFECT_LEVEL": "缺失等级测试值",
        "SAMPLE_LEVEL": "抽样等级测试值",
        "DESCRIPTION": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-10b2c",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row)",
      "permission": "ImsIqcTemplateMstRemove",
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
