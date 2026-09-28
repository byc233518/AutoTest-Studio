// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-spc-judgment-rules-index-986b1c",
  "name": "质量管理 - SPC-判异规则功能校验",
  "displayName": "SPC-判异规则",
  "route": "/SPC/JudgmentRules/index",
  "sourceRoute": "/SPC/JudgmentRules/index",
  "menuCode": "SPC_JUDGE_DIFF_RULE",
  "breadcrumb": "品质管理 / 功能菜单（SPC） / SPC-判异规则",
  "sourceFile": "src/views/SPC/JudgmentRules/index.vue",
  "dataSchema": {
    "columns": [
      "JudgeDiffCode",
      "JudgeDiffRemark",
      "JudgeDiffSource",
      "Remark"
    ],
    "required": [
      "JudgeDiffCode",
      "JudgeDiffSource",
      "Remark"
    ],
    "fields": [
      {
        "key": "JudgeDiffCode",
        "label": "判异编码",
        "required": true
      },
      {
        "key": "JudgeDiffRemark",
        "label": "判异内容",
        "required": false
      },
      {
        "key": "JudgeDiffSource",
        "label": "判异依据",
        "required": true
      },
      {
        "key": "Remark",
        "label": "判异说明",
        "required": true
      }
    ],
    "example": {
      "JudgeDiffCode": "AT-001",
      "JudgeDiffRemark": "判异内容测试值",
      "JudgeDiffSource": "判异依据测试值",
      "Remark": "自动化测试备注001"
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
        "JudgeDiffCode": "AT-001",
        "JudgeDiffRemark": "判异内容测试值",
        "JudgeDiffSource": "判异依据测试值",
        "Remark": "自动化测试备注001"
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
          "key": "JudgeDiffCode",
          "label": "判异编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "JudgeDiffRemark",
          "label": "判异内容",
          "required": false,
          "example": "判异内容测试值"
        },
        {
          "key": "JudgeDiffSource",
          "label": "判异依据",
          "required": true,
          "example": "判异依据测试值"
        },
        {
          "key": "Remark",
          "label": "判异说明",
          "required": true,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "JudgeDiffCode": "AT-001",
        "JudgeDiffRemark": "判异内容测试值",
        "JudgeDiffSource": "判异依据测试值",
        "Remark": "自动化测试备注001"
      }
    },
    {
      "key": "5f1787916c-dc5fb7a696-dc5fb",
      "type": "导入入口",
      "name": "配置导入业务入口校验",
      "label": "配置导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导入",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-ba43305377-e9df5",
      "type": "导出入口",
      "name": "配置导出业务入口校验",
      "label": "配置导出",
      "handler": "exportData",
      "permission": "ConfigExport",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-f7acefd2d4-83c6d",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "view(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-451e1",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(row)",
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
          "key": "JudgeDiffCode",
          "label": "判异编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "JudgeDiffRemark",
          "label": "判异内容",
          "required": false,
          "example": "判异内容测试值"
        },
        {
          "key": "JudgeDiffSource",
          "label": "判异依据",
          "required": true,
          "example": "判异依据测试值"
        },
        {
          "key": "Remark",
          "label": "判异说明",
          "required": true,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "JudgeDiffCode": "AT-001",
        "JudgeDiffRemark": "判异内容测试值",
        "JudgeDiffSource": "判异依据测试值",
        "Remark": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-6bc1d",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteItem(row)",
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
