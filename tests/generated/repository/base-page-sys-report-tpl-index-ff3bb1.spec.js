// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-sys-report-tpl-index-ff3bb1",
  "name": "基座系统 - 打印模板功能校验",
  "displayName": "打印模板",
  "route": "/SysReportTpl/Index",
  "sourceRoute": "/SysReportTpl/Index",
  "menuCode": "SysReportTpl",
  "breadcrumb": "系统管理 / 系统配置 / 打印模板",
  "sourceFile": "src/views/SysReportTpl/Index.vue",
  "dataSchema": {
    "columns": [
      "BillType",
      "PaperType",
      "DataSource",
      "AppId",
      "ApiUrl",
      "PrintLabelName",
      "Description",
      "PathName",
      "Orgs",
      "hiprintImportTplJsonDraft",
      "hiprintTestDataJsonDraft"
    ],
    "required": [
      "BillType",
      "PaperType",
      "DataSource",
      "AppId",
      "ApiUrl",
      "PrintLabelName",
      "Description",
      "PathName",
      "Orgs"
    ],
    "fields": [
      {
        "key": "BillType",
        "label": "单据类型",
        "required": true
      },
      {
        "key": "PaperType",
        "label": "纸张说明",
        "required": true
      },
      {
        "key": "DataSource",
        "label": "数据来源",
        "required": true
      },
      {
        "key": "AppId",
        "label": "应用",
        "required": true
      },
      {
        "key": "ApiUrl",
        "label": "接口地址",
        "required": true
      },
      {
        "key": "PrintLabelName",
        "label": "标签模版",
        "required": true
      },
      {
        "key": "Description",
        "label": "模版名称",
        "required": true
      },
      {
        "key": "PathName",
        "label": "路径及名称",
        "required": true
      },
      {
        "key": "Orgs",
        "label": "组织",
        "required": true
      },
      {
        "key": "hiprintImportTplJsonDraft",
        "label": "将模板 JSON 粘贴到此处",
        "required": false
      },
      {
        "key": "hiprintTestDataJsonDraft",
        "label": "{\"name\":\"示例\",\"qty\":1}",
        "required": false
      }
    ],
    "example": {
      "BillType": "单据类型测试值",
      "PaperType": "自动化测试备注001",
      "DataSource": "数据来源测试值",
      "AppId": "应用测试值",
      "ApiUrl": "接口地址测试值",
      "PrintLabelName": "标签模版测试值",
      "Description": "自动化样例001",
      "PathName": "自动化样例001",
      "Orgs": "组织测试值",
      "hiprintImportTplJsonDraft": "将模板 JSON 粘贴到此处测试值",
      "hiprintTestDataJsonDraft": "{\"name\":\"示例\",\"qty\":1}测试值"
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
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
        "DataSource": "数据来源测试值",
        "AppId": "应用测试值",
        "ApiUrl": "接口地址测试值",
        "PrintLabelName": "标签模版测试值",
        "Description": "自动化样例001",
        "PathName": "自动化样例001",
        "Orgs": "组织测试值",
        "hiprintImportTplJsonDraft": "将模板 JSON 粘贴到此处测试值",
        "hiprintTestDataJsonDraft": "{\"name\":\"示例\",\"qty\":1}测试值"
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
      "permission": "SysReportTplAdd",
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
          "key": "BillType",
          "label": "单据类型",
          "required": true,
          "example": "单据类型测试值"
        },
        {
          "key": "PaperType",
          "label": "纸张说明",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "DataSource",
          "label": "数据来源",
          "required": true,
          "example": "数据来源测试值"
        },
        {
          "key": "AppId",
          "label": "应用",
          "required": true,
          "example": "应用测试值"
        },
        {
          "key": "ApiUrl",
          "label": "接口地址",
          "required": true,
          "example": "接口地址测试值"
        },
        {
          "key": "PrintLabelName",
          "label": "标签模版",
          "required": true,
          "example": "标签模版测试值"
        },
        {
          "key": "Description",
          "label": "模版名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PathName",
          "label": "路径及名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Orgs",
          "label": "组织",
          "required": true,
          "example": "组织测试值"
        },
        {
          "key": "hiprintImportTplJsonDraft",
          "label": "将模板 JSON 粘贴到此处",
          "required": false,
          "example": "将模板 JSON 粘贴到此处测试值"
        },
        {
          "key": "hiprintTestDataJsonDraft",
          "label": "{\"name\":\"示例\",\"qty\":1}",
          "required": false,
          "example": "{\"name\":\"示例\",\"qty\":1}测试值"
        }
      ],
      "testData": {
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
        "DataSource": "数据来源测试值",
        "AppId": "应用测试值",
        "ApiUrl": "接口地址测试值",
        "PrintLabelName": "标签模版测试值",
        "Description": "自动化样例001",
        "PathName": "自动化样例001",
        "Orgs": "组织测试值",
        "hiprintImportTplJsonDraft": "将模板 JSON 粘贴到此处测试值",
        "hiprintTestDataJsonDraft": "{\"name\":\"示例\",\"qty\":1}测试值"
      }
    },
    {
      "key": "5f1787916c-2a0f659600-2a0f6",
      "type": "导入入口",
      "name": "模版上传/下载业务入口校验",
      "label": "模版上传/下载",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击模版上传/下载",
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
      "key": "5f1787916c-76ca6275b6-4a5bf",
      "type": "导入入口",
      "name": "模板上传业务入口校验",
      "label": "模板上传",
      "handler": "beforeclickUpload",
      "permission": "",
      "menuTriggerLabel": "模版上传/下载",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击模板上传",
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
      "key": "ef879b4ced-5f0860c306-e4792",
      "type": "导出入口",
      "name": "模版下载业务入口校验",
      "label": "模版下载",
      "handler": "down_tpl",
      "permission": "SysReportTplDown",
      "menuTriggerLabel": "模版上传/下载",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击模版下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-4f31035cfa-06067",
      "type": "业务动作",
      "name": "打印测试业务入口校验",
      "label": "打印测试",
      "handler": "preview_data",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印测试",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "SysReportTplEdit",
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
          "key": "BillType",
          "label": "单据类型",
          "required": true,
          "example": "单据类型测试值"
        },
        {
          "key": "PaperType",
          "label": "纸张说明",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "DataSource",
          "label": "数据来源",
          "required": true,
          "example": "数据来源测试值"
        },
        {
          "key": "AppId",
          "label": "应用",
          "required": true,
          "example": "应用测试值"
        },
        {
          "key": "ApiUrl",
          "label": "接口地址",
          "required": true,
          "example": "接口地址测试值"
        },
        {
          "key": "PrintLabelName",
          "label": "标签模版",
          "required": true,
          "example": "标签模版测试值"
        },
        {
          "key": "Description",
          "label": "模版名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PathName",
          "label": "路径及名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Orgs",
          "label": "组织",
          "required": true,
          "example": "组织测试值"
        },
        {
          "key": "hiprintImportTplJsonDraft",
          "label": "将模板 JSON 粘贴到此处",
          "required": false,
          "example": "将模板 JSON 粘贴到此处测试值"
        },
        {
          "key": "hiprintTestDataJsonDraft",
          "label": "{\"name\":\"示例\",\"qty\":1}",
          "required": false,
          "example": "{\"name\":\"示例\",\"qty\":1}测试值"
        }
      ],
      "testData": {
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
        "DataSource": "数据来源测试值",
        "AppId": "应用测试值",
        "ApiUrl": "接口地址测试值",
        "PrintLabelName": "标签模版测试值",
        "Description": "自动化样例001",
        "PathName": "自动化样例001",
        "Orgs": "组织测试值",
        "hiprintImportTplJsonDraft": "将模板 JSON 粘贴到此处测试值",
        "hiprintTestDataJsonDraft": "{\"name\":\"示例\",\"qty\":1}测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "SysReportTplRemove",
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
