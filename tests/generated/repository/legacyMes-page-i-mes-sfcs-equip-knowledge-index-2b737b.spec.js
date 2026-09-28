// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-knowledge-index-2b737b",
  "name": "旧版制造执行 - 设备知识库功能校验",
  "displayName": "设备知识库",
  "route": "/iMES/SfcsEquipKnowledge/Index",
  "sourceRoute": "/iMES/SfcsEquipKnowledge/Index",
  "menuCode": "SfcsEquipKnowledge",
  "breadcrumb": "设备管理 / 设备管理 / 设备知识库",
  "sourceFile": "src/views/iMES/SfcsEquipKnowledge/Index.vue",
  "dataSchema": {
    "columns": [
      "CATEGORY_ID",
      "REMARK",
      "NAME",
      "FILE_NO",
      "FILE_NAME"
    ],
    "required": [],
    "fields": [
      {
        "key": "CATEGORY_ID",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "NAME",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "FILE_NO",
        "label": "知识库编码",
        "required": false
      },
      {
        "key": "FILE_NAME",
        "label": "文件名称",
        "required": false
      }
    ],
    "example": {
      "CATEGORY_ID": "AT-001",
      "REMARK": "自动化测试备注001",
      "NAME": "AT-001",
      "FILE_NO": "AT-001",
      "FILE_NAME": "自动化样例001"
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
        "CATEGORY_ID": "AT-001",
        "REMARK": "自动化测试备注001",
        "NAME": "AT-001",
        "FILE_NO": "AT-001",
        "FILE_NAME": "自动化样例001"
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
      "key": "5f1787916c-a977650db1-053a0",
      "type": "导入入口",
      "name": "上传业务入口校验",
      "label": "上传",
      "handler": "addClick",
      "permission": "SfcsEquipKnowledgeAdd",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击上传",
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
      "key": "ef879b4ced-188896795f-662ac",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "exportDatas",
      "permission": "SfcsEquipKnowledgeExport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-2b9d013177-18d99",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "downClick(row)",
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
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SfcsEquipKnowledgeEdit",
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
          "key": "CATEGORY_ID",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "NAME",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "FILE_NO",
          "label": "知识库编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "FILE_NAME",
          "label": "文件名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "CATEGORY_ID": "AT-001",
        "REMARK": "自动化测试备注001",
        "NAME": "AT-001",
        "FILE_NO": "AT-001",
        "FILE_NAME": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
      "permission": "SfcsEquipKnowledgeEdit",
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
