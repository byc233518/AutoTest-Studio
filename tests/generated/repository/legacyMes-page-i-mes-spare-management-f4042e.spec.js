// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-spare-management-f4042e",
  "name": "旧版制造执行 - 备品备件功能校验",
  "displayName": "备品备件",
  "route": "/iMES/SpareManagement",
  "sourceRoute": "/iMES/SpareManagement/Index",
  "menuCode": "iMES_SpareManagement",
  "breadcrumb": "设备管理 / 备品备件",
  "sourceFile": "src/views/iMES/SpareManagement/Index.vue",
  "dataSchema": {
    "columns": [
      "SPARE_NAME",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "SPARE_NAME",
        "label": "备品名称",
        "required": false
      },
      {
        "key": "Key",
        "label": "备品规格",
        "required": false
      }
    ],
    "example": {
      "SPARE_NAME": "自动化样例001",
      "Key": "备品规格测试值"
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
        "SPARE_NAME": "自动化样例001",
        "Key": "备品规格测试值"
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
      "key": "4aa22a22ac-a7f814c0a4-a08bd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "insertEvent(1)",
      "permission": "MesSparePartManagementEdit",
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
          "key": "SPARE_NAME",
          "label": "备品名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Key",
          "label": "备品规格",
          "required": false,
          "example": "备品规格测试值"
        }
      ],
      "testData": {
        "SPARE_NAME": "自动化样例001",
        "Key": "备品规格测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-aead8",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "SpareDel",
      "permission": "MesSparePartManagementDel",
      "menuTriggerLabel": "",
      "rowAction": false,
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
      "key": "7e002f9936-cb7c9a7bb3-6ca67",
      "type": "业务动作",
      "name": "入库业务入口校验",
      "label": "入库",
      "handler": "SpareInput(true)",
      "permission": "MesSparePartManagementInput",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位入库",
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
      "key": "7e002f9936-bb22ac4a42-f9c70",
      "type": "业务动作",
      "name": "出库业务入口校验",
      "label": "出库",
      "handler": "SpareInput(false)",
      "permission": "MesSparePartManagementOutput",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位出库",
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
      "key": "5f1787916c-4d42a46878-4d42a",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "批量入库",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
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
      "key": "ef879b4ced-8bf52524d7-bcc1b",
      "type": "导出入口",
      "name": "导出模板业务入口校验",
      "label": "导出模板",
      "handler": "handleExportData",
      "permission": "",
      "menuTriggerLabel": "批量入库",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-1553af6b72-662ac",
      "type": "导出入口",
      "name": "导出文档业务入口校验",
      "label": "导出文档",
      "handler": "exportDatas",
      "permission": "MesSparePartManagementExport",
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
    }
  ]
});
