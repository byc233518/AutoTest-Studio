// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-kanban-controller-index-0c7b19",
  "name": "旧版制造执行 - 产能信息（未配置菜单）功能校验",
  "displayName": "产能信息（未配置菜单）",
  "route": "/iMES/MesKanbanController/Index",
  "sourceRoute": "/iMES/MesKanbanController/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 产能信息（未配置菜单）",
  "sourceFile": "src/views/iMES/MesKanbanController/Index.vue",
  "dataSchema": {
    "columns": [
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "Key",
        "label": "查询关键字",
        "required": false
      }
    ],
    "example": {
      "Key": "查询关键字测试值"
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
        "Key": "查询关键字测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-68790",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "mesControllAdd",
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
          "key": "Key",
          "label": "查询关键字",
          "required": false,
          "example": "查询关键字测试值"
        }
      ],
      "testData": {
        "Key": "查询关键字测试值"
      }
    }
  ]
});
