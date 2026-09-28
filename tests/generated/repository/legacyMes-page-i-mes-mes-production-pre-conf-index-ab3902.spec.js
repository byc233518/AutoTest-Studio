// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-production-pre-conf-index-ab3902",
  "name": "旧版制造执行 - 导出文档（未配置菜单）功能校验",
  "displayName": "导出文档（未配置菜单）",
  "route": "/iMES/MesProductionPreConf/Index",
  "sourceRoute": "/iMES/MesProductionPreConf/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 导出文档（未配置菜单）",
  "sourceFile": "src/views/iMES/MesProductionPreConf/Index.vue",
  "dataSchema": {
    "columns": [
      "CONTENT_TYPE",
      "CONTENT",
      "CONFIRM_CONTENT",
      "CREATE_TIME",
      "CREATOR",
      "CLASS_TYPE",
      "ENABLED"
    ],
    "required": [
      "CONTENT_TYPE",
      "CONTENT",
      "CONFIRM_CONTENT",
      "CREATOR",
      "CLASS_TYPE"
    ],
    "fields": [
      {
        "key": "CONTENT_TYPE",
        "label": "确认项目",
        "required": true
      },
      {
        "key": "CONTENT",
        "label": "确认内容",
        "required": true
      },
      {
        "key": "CONFIRM_CONTENT",
        "label": "确认标准",
        "required": true
      },
      {
        "key": "CREATE_TIME",
        "label": "创建时间",
        "required": false
      },
      {
        "key": "CREATOR",
        "label": "创建人员",
        "required": true
      },
      {
        "key": "CLASS_TYPE",
        "label": "工厂类别",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "CONTENT_TYPE": "确认项目测试值",
      "CONTENT": "确认内容测试值",
      "CONFIRM_CONTENT": "确认标准测试值",
      "CREATE_TIME": "2026-08-01",
      "CREATOR": "创建人员测试值",
      "CLASS_TYPE": "工厂类别测试值",
      "ENABLED": "是否激活测试值"
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
        "CONTENT_TYPE": "确认项目测试值",
        "CONTENT": "确认内容测试值",
        "CONFIRM_CONTENT": "确认标准测试值",
        "CREATE_TIME": "2026-08-01",
        "CREATOR": "创建人员测试值",
        "CLASS_TYPE": "工厂类别测试值",
        "ENABLED": "是否激活测试值"
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
      "permission": "MesProductionPreConfAdd",
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
          "key": "CONTENT_TYPE",
          "label": "确认项目",
          "required": true,
          "example": "确认项目测试值"
        },
        {
          "key": "CONTENT",
          "label": "确认内容",
          "required": true,
          "example": "确认内容测试值"
        },
        {
          "key": "CONFIRM_CONTENT",
          "label": "确认标准",
          "required": true,
          "example": "确认标准测试值"
        },
        {
          "key": "CREATE_TIME",
          "label": "创建时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "CREATOR",
          "label": "创建人员",
          "required": true,
          "example": "创建人员测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "工厂类别",
          "required": true,
          "example": "工厂类别测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "CONTENT_TYPE": "确认项目测试值",
        "CONTENT": "确认内容测试值",
        "CONFIRM_CONTENT": "确认标准测试值",
        "CREATE_TIME": "2026-08-01",
        "CREATOR": "创建人员测试值",
        "CLASS_TYPE": "工厂类别测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "ef879b4ced-1553af6b72-6304b",
      "type": "导出入口",
      "name": "导出文档业务入口校验",
      "label": "导出文档",
      "handler": "handelExportDocument",
      "permission": "MesProductionPreConfExport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出文档",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "MesProductionPreConfEdit",
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
          "key": "CONTENT_TYPE",
          "label": "确认项目",
          "required": true,
          "example": "确认项目测试值"
        },
        {
          "key": "CONTENT",
          "label": "确认内容",
          "required": true,
          "example": "确认内容测试值"
        },
        {
          "key": "CONFIRM_CONTENT",
          "label": "确认标准",
          "required": true,
          "example": "确认标准测试值"
        },
        {
          "key": "CREATE_TIME",
          "label": "创建时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "CREATOR",
          "label": "创建人员",
          "required": true,
          "example": "创建人员测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "工厂类别",
          "required": true,
          "example": "工厂类别测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "CONTENT_TYPE": "确认项目测试值",
        "CONTENT": "确认内容测试值",
        "CONFIRM_CONTENT": "确认标准测试值",
        "CREATE_TIME": "2026-08-01",
        "CREATOR": "创建人员测试值",
        "CLASS_TYPE": "工厂类别测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-9d2f7",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, {\r\n                  id: row.ID\r\n              })",
      "permission": "MesProductionPreConfRemove",
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
