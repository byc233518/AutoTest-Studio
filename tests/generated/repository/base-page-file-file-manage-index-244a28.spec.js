// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-file-file-manage-index-244a28",
  "name": "基座系统 - 文件预览功能校验",
  "displayName": "文件预览",
  "route": "/File/FileManage/Index",
  "sourceRoute": "/File/FileManage/Index",
  "menuCode": "FileManage",
  "breadcrumb": "系统管理 / 文件管理 / 文件预览",
  "sourceFile": "src/views/File/FileManage/Index.vue",
  "dataSchema": {
    "columns": [
      "查询关键字"
    ],
    "required": [],
    "fields": [
      {
        "key": "查询关键字",
        "label": "查询关键字",
        "required": false
      }
    ],
    "example": {
      "查询关键字": "查询关键字测试值"
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
        "查询关键字": "查询关键字测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-e3524",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openEditor",
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
          "key": "查询关键字",
          "label": "查询关键字",
          "required": false,
          "example": "查询关键字测试值"
        }
      ],
      "testData": {
        "查询关键字": "查询关键字测试值"
      }
    },
    {
      "key": "faea8c1db9-f7acefd2d4-cb779",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "previewClick(scope.row)",
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
      "key": "ef879b4ced-2b9d013177-89875",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "downloadClick(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-78e8f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row)",
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
