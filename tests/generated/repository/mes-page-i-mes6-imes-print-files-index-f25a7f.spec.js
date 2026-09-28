// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-print-files-index-f25a7f",
  "name": "制造执行 - 标签文件上传功能校验",
  "displayName": "标签文件上传",
  "route": "/iMES6/ImesPrintFiles/Index",
  "sourceRoute": "/iMES6/ImesPrintFiles/Index",
  "menuCode": "iMES6_PrintFiles",
  "breadcrumb": "条码管理 / 产品条码管理 / 标签文件上传",
  "sourceFile": "src/views/iMES6/ImesPrintFiles/Index.vue",
  "dataSchema": {
    "columns": [
      "FileName",
      "LabelType",
      "Enabled",
      "Description",
      "FileExt",
      "LabelImageExt",
      "SqlContent",
      "CpclContent"
    ],
    "required": [
      "FileName",
      "LabelType",
      "Enabled",
      "FileExt",
      "SqlContent"
    ],
    "fields": [
      {
        "key": "FileName",
        "label": "文件名",
        "required": true
      },
      {
        "key": "LabelType",
        "label": "标签类型",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "Description",
        "label": "蓝牙打印指令",
        "required": false
      },
      {
        "key": "FileExt",
        "label": "文件",
        "required": true
      },
      {
        "key": "LabelImageExt",
        "label": "标签样式图片",
        "required": false
      },
      {
        "key": "SqlContent",
        "label": "数据源SQL",
        "required": true
      },
      {
        "key": "CpclContent",
        "label": "蓝牙打印指令",
        "required": false
      }
    ],
    "example": {
      "FileName": "文件名测试值",
      "LabelType": "标签类型测试值",
      "Enabled": "是否激活测试值",
      "Description": "蓝牙打印指令测试值",
      "FileExt": "文件测试值",
      "LabelImageExt": "标签样式图片测试值",
      "SqlContent": "数据源SQL测试值",
      "CpclContent": "蓝牙打印指令测试值"
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
        "FileName": "文件名测试值",
        "LabelType": "标签类型测试值",
        "Enabled": "是否激活测试值",
        "Description": "蓝牙打印指令测试值",
        "FileExt": "文件测试值",
        "LabelImageExt": "标签样式图片测试值",
        "SqlContent": "数据源SQL测试值",
        "CpclContent": "蓝牙打印指令测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-d37ed",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addNewForm",
      "permission": "Add",
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
          "key": "FileName",
          "label": "文件名",
          "required": true,
          "example": "文件名测试值"
        },
        {
          "key": "LabelType",
          "label": "标签类型",
          "required": true,
          "example": "标签类型测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "Description",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "FileExt",
          "label": "文件",
          "required": true,
          "example": "文件测试值"
        },
        {
          "key": "LabelImageExt",
          "label": "标签样式图片",
          "required": false,
          "example": "标签样式图片测试值"
        },
        {
          "key": "SqlContent",
          "label": "数据源SQL",
          "required": true,
          "example": "数据源SQL测试值"
        },
        {
          "key": "CpclContent",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        }
      ],
      "testData": {
        "FileName": "文件名测试值",
        "LabelType": "标签类型测试值",
        "Enabled": "是否激活测试值",
        "Description": "蓝牙打印指令测试值",
        "FileExt": "文件测试值",
        "LabelImageExt": "标签样式图片测试值",
        "SqlContent": "数据源SQL测试值",
        "CpclContent": "蓝牙打印指令测试值"
      }
    },
    {
      "key": "ef879b4ced-ebbf6890de-a1d19",
      "type": "导出入口",
      "name": "下载模板文件业务入口校验",
      "label": "下载模板文件",
      "handler": "downloadOriginTplFile(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载模板文件",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
      "key": "4aa22a22ac-a7f814c0a4-bb94e",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleCpclCode",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
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
          "key": "FileName",
          "label": "文件名",
          "required": true,
          "example": "文件名测试值"
        },
        {
          "key": "LabelType",
          "label": "标签类型",
          "required": true,
          "example": "标签类型测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "Description",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "FileExt",
          "label": "文件",
          "required": true,
          "example": "文件测试值"
        },
        {
          "key": "LabelImageExt",
          "label": "标签样式图片",
          "required": false,
          "example": "标签样式图片测试值"
        },
        {
          "key": "SqlContent",
          "label": "数据源SQL",
          "required": true,
          "example": "数据源SQL测试值"
        },
        {
          "key": "CpclContent",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        }
      ],
      "testData": {
        "FileName": "文件名测试值",
        "LabelType": "标签类型测试值",
        "Enabled": "是否激活测试值",
        "Description": "蓝牙打印指令测试值",
        "FileExt": "文件测试值",
        "LabelImageExt": "标签样式图片测试值",
        "SqlContent": "数据源SQL测试值",
        "CpclContent": "蓝牙打印指令测试值"
      }
    }
  ]
});
