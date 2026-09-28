// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-work-time-header-index-618e5e",
  "name": "旧版制造执行 - 取消提交（未配置菜单）功能校验",
  "displayName": "取消提交（未配置菜单）",
  "route": "/iMES/MesWorkTimeHeader/Index",
  "sourceRoute": "/iMES/MesWorkTimeHeader/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 取消提交（未配置菜单）",
  "sourceFile": "src/views/iMES/MesWorkTimeHeader/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "PART_DESC",
      "CREATE_USER",
      "PART_NAME",
      "STATUS"
    ],
    "required": [
      "PART_NO"
    ],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号：",
        "required": true
      },
      {
        "key": "PART_DESC",
        "label": "描述：",
        "required": false
      },
      {
        "key": "CREATE_USER",
        "label": "创建人：",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "品名：",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "料号：测试值",
      "PART_DESC": "描述：测试值",
      "CREATE_USER": "创建人：测试值",
      "PART_NAME": "品名：测试值",
      "STATUS": "Y"
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
        "PART_NO": "料号：测试值",
        "PART_DESC": "描述：测试值",
        "CREATE_USER": "创建人：测试值",
        "PART_NAME": "品名：测试值",
        "STATUS": "Y"
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
          "key": "PART_NO",
          "label": "料号：",
          "required": true,
          "example": "料号：测试值"
        },
        {
          "key": "PART_DESC",
          "label": "描述：",
          "required": false,
          "example": "描述：测试值"
        },
        {
          "key": "CREATE_USER",
          "label": "创建人：",
          "required": false,
          "example": "创建人：测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名：",
          "required": false,
          "example": "品名：测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "PART_NO": "料号：测试值",
        "PART_DESC": "描述：测试值",
        "CREATE_USER": "创建人：测试值",
        "PART_NAME": "品名：测试值",
        "STATUS": "Y"
      }
    },
    {
      "key": "7e002f9936-09cbc97ae2-7bbfd",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submitClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交",
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
      "key": "7e002f9936-317d201b33-2f1e0",
      "type": "业务动作",
      "name": "取消提交业务入口校验",
      "label": "取消提交",
      "handler": "CancelReviewClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消提交",
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
      "key": "7e002f9936-fe945e5a0d-df7a9",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "ReviewClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
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
      "key": "5f1787916c-3119c145de-3119c",
      "type": "导入入口",
      "name": "线体导入业务入口校验",
      "label": "线体导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击线体导入",
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
      "key": "ef879b4ced-8bf52524d7-c29ca",
      "type": "导出入口",
      "name": "导出模板业务入口校验",
      "label": "导出模板",
      "handler": "handleRequestUpload('IMPORT_RUNCARD_SN')",
      "permission": "",
      "menuTriggerLabel": "",
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
      "key": "726b6ec55f-3755f56f2f-ee1ab",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteClick(row, row.$index)",
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
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
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
          "key": "PART_NO",
          "label": "料号：",
          "required": true,
          "example": "料号：测试值"
        },
        {
          "key": "PART_DESC",
          "label": "描述：",
          "required": false,
          "example": "描述：测试值"
        },
        {
          "key": "CREATE_USER",
          "label": "创建人：",
          "required": false,
          "example": "创建人：测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名：",
          "required": false,
          "example": "品名：测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "PART_NO": "料号：测试值",
        "PART_DESC": "描述：测试值",
        "CREATE_USER": "创建人：测试值",
        "PART_NAME": "品名：测试值",
        "STATUS": "Y"
      }
    }
  ]
});
