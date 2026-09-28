// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ims-qc-sample-scheme-index-dff3ee",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/ImsQcSampleScheme/Index",
  "sourceRoute": "/iMES/ImsQcSampleScheme/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/ImsQcSampleScheme/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_TYPE_NAME",
      "SAMPLE_LEVEL_NAME",
      "SAMPLE_CODE_NAME",
      "MIN_VALUE",
      "MAX_VALUE",
      "SAMPLE_QTY",
      "AC_QTY",
      "RE_QTY"
    ],
    "required": [
      "PART_TYPE_NAME",
      "SAMPLE_LEVEL_NAME",
      "SAMPLE_CODE_NAME",
      "MIN_VALUE",
      "MAX_VALUE",
      "SAMPLE_QTY",
      "AC_QTY",
      "RE_QTY"
    ],
    "fields": [
      {
        "key": "PART_TYPE_NAME",
        "label": "物料类别",
        "required": true
      },
      {
        "key": "SAMPLE_LEVEL_NAME",
        "label": "检验等级",
        "required": true
      },
      {
        "key": "SAMPLE_CODE_NAME",
        "label": "样本子码",
        "required": true
      },
      {
        "key": "MIN_VALUE",
        "label": "数量下限",
        "required": true
      },
      {
        "key": "MAX_VALUE",
        "label": "数量上限",
        "required": true
      },
      {
        "key": "SAMPLE_QTY",
        "label": "抽检数量",
        "required": true
      },
      {
        "key": "AC_QTY",
        "label": "允收数量",
        "required": true
      },
      {
        "key": "RE_QTY",
        "label": "拒收数量",
        "required": true
      }
    ],
    "example": {
      "PART_TYPE_NAME": "物料类别测试值",
      "SAMPLE_LEVEL_NAME": "检验等级测试值",
      "SAMPLE_CODE_NAME": "样本子码测试值",
      "MIN_VALUE": "数量下限测试值",
      "MAX_VALUE": "数量上限测试值",
      "SAMPLE_QTY": "1",
      "AC_QTY": "1",
      "RE_QTY": "1"
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
        "PART_TYPE_NAME": "物料类别测试值",
        "SAMPLE_LEVEL_NAME": "检验等级测试值",
        "SAMPLE_CODE_NAME": "样本子码测试值",
        "MIN_VALUE": "数量下限测试值",
        "MAX_VALUE": "数量上限测试值",
        "SAMPLE_QTY": "1",
        "AC_QTY": "1",
        "RE_QTY": "1"
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
      "key": "13fd57e65b-2cd9e6ce81-51611",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(null)",
      "permission": "ImsQcSampleSchemeAdd",
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
          "key": "PART_TYPE_NAME",
          "label": "物料类别",
          "required": true,
          "example": "物料类别测试值"
        },
        {
          "key": "SAMPLE_LEVEL_NAME",
          "label": "检验等级",
          "required": true,
          "example": "检验等级测试值"
        },
        {
          "key": "SAMPLE_CODE_NAME",
          "label": "样本子码",
          "required": true,
          "example": "样本子码测试值"
        },
        {
          "key": "MIN_VALUE",
          "label": "数量下限",
          "required": true,
          "example": "数量下限测试值"
        },
        {
          "key": "MAX_VALUE",
          "label": "数量上限",
          "required": true,
          "example": "数量上限测试值"
        },
        {
          "key": "SAMPLE_QTY",
          "label": "抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "AC_QTY",
          "label": "允收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "RE_QTY",
          "label": "拒收数量",
          "required": true,
          "example": "1"
        }
      ],
      "testData": {
        "PART_TYPE_NAME": "物料类别测试值",
        "SAMPLE_LEVEL_NAME": "检验等级测试值",
        "SAMPLE_CODE_NAME": "样本子码测试值",
        "MIN_VALUE": "数量下限测试值",
        "MAX_VALUE": "数量上限测试值",
        "SAMPLE_QTY": "1",
        "AC_QTY": "1",
        "RE_QTY": "1"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "ImsQcSampleSchemeSave",
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
          "key": "PART_TYPE_NAME",
          "label": "物料类别",
          "required": true,
          "example": "物料类别测试值"
        },
        {
          "key": "SAMPLE_LEVEL_NAME",
          "label": "检验等级",
          "required": true,
          "example": "检验等级测试值"
        },
        {
          "key": "SAMPLE_CODE_NAME",
          "label": "样本子码",
          "required": true,
          "example": "样本子码测试值"
        },
        {
          "key": "MIN_VALUE",
          "label": "数量下限",
          "required": true,
          "example": "数量下限测试值"
        },
        {
          "key": "MAX_VALUE",
          "label": "数量上限",
          "required": true,
          "example": "数量上限测试值"
        },
        {
          "key": "SAMPLE_QTY",
          "label": "抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "AC_QTY",
          "label": "允收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "RE_QTY",
          "label": "拒收数量",
          "required": true,
          "example": "1"
        }
      ],
      "testData": {
        "PART_TYPE_NAME": "物料类别测试值",
        "SAMPLE_LEVEL_NAME": "检验等级测试值",
        "SAMPLE_CODE_NAME": "样本子码测试值",
        "MIN_VALUE": "数量下限测试值",
        "MAX_VALUE": "数量上限测试值",
        "SAMPLE_QTY": "1",
        "AC_QTY": "1",
        "RE_QTY": "1"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
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
