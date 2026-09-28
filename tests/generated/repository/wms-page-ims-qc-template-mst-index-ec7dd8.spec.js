// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-template-mst-index-ec7dd8",
  "name": "仓储管理 - 子类报告模板功能校验",
  "displayName": "子类报告模板",
  "route": "/ImsQcTemplateMst/Index",
  "sourceRoute": "/ImsQcTemplateMst/Index",
  "menuCode": "ImsQcTemplateMst",
  "breadcrumb": "品质管理 / 方案模板 / 子类报告模板",
  "sourceFile": "src/views/ImsQcTemplateMst/Index.vue",
  "dataSchema": {
    "columns": [
      "ClassType",
      "Name",
      "Description",
      "SectionId",
      "OperationId",
      "TplType",
      "DefectLevel",
      "MeasureType",
      "SampleType",
      "KeyLevel",
      "Data"
    ],
    "required": [
      "ClassType",
      "Name",
      "TplType",
      "DefectLevel",
      "MeasureType",
      "SampleType",
      "KeyLevel"
    ],
    "fields": [
      {
        "key": "ClassType",
        "label": "物料子类",
        "required": true
      },
      {
        "key": "Name",
        "label": "模板名称",
        "required": true
      },
      {
        "key": "Description",
        "label": "模板说明",
        "required": false
      },
      {
        "key": "SectionId",
        "label": "工段",
        "required": false
      },
      {
        "key": "OperationId",
        "label": "工序",
        "required": false
      },
      {
        "key": "TplType",
        "label": "业务类型",
        "required": true
      },
      {
        "key": "DefectLevel",
        "label": "不良等级",
        "required": true
      },
      {
        "key": "MeasureType",
        "label": "计量方式",
        "required": true
      },
      {
        "key": "SampleType",
        "label": "抽样方式",
        "required": true
      },
      {
        "key": "KeyLevel",
        "label": "重要程度",
        "required": true
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "ClassType": "物料子类测试值",
      "Name": "自动化样例001",
      "Description": "自动化测试备注001",
      "SectionId": "工段测试值",
      "OperationId": "工序测试值",
      "TplType": "业务类型测试值",
      "DefectLevel": "不良等级测试值",
      "MeasureType": "计量方式测试值",
      "SampleType": "抽样方式测试值",
      "KeyLevel": "重要程度测试值",
      "Data": "输入关键字搜索测试值"
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
        "search"
      ],
      "testData": {
        "ClassType": "物料子类测试值",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "SectionId": "工段测试值",
        "OperationId": "工序测试值",
        "TplType": "业务类型测试值",
        "DefectLevel": "不良等级测试值",
        "MeasureType": "计量方式测试值",
        "SampleType": "抽样方式测试值",
        "KeyLevel": "重要程度测试值",
        "Data": "输入关键字搜索测试值"
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
      "permission": "ImsQcTemplateMstAdd",
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
          "key": "ClassType",
          "label": "物料子类",
          "required": true,
          "example": "物料子类测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "模板说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "SectionId",
          "label": "工段",
          "required": false,
          "example": "工段测试值"
        },
        {
          "key": "OperationId",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "TplType",
          "label": "业务类型",
          "required": true,
          "example": "业务类型测试值"
        },
        {
          "key": "DefectLevel",
          "label": "不良等级",
          "required": true,
          "example": "不良等级测试值"
        },
        {
          "key": "MeasureType",
          "label": "计量方式",
          "required": true,
          "example": "计量方式测试值"
        },
        {
          "key": "SampleType",
          "label": "抽样方式",
          "required": true,
          "example": "抽样方式测试值"
        },
        {
          "key": "KeyLevel",
          "label": "重要程度",
          "required": true,
          "example": "重要程度测试值"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "ClassType": "物料子类测试值",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "SectionId": "工段测试值",
        "OperationId": "工序测试值",
        "TplType": "业务类型测试值",
        "DefectLevel": "不良等级测试值",
        "MeasureType": "计量方式测试值",
        "SampleType": "抽样方式测试值",
        "KeyLevel": "重要程度测试值",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "7e002f9936-4edd1d0087-ee61d",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "copy(scope.row)",
      "permission": "ImsQcTemplateMstCopy",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位复制",
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
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsQcTemplateMstEdit",
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
          "key": "ClassType",
          "label": "物料子类",
          "required": true,
          "example": "物料子类测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "模板说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "SectionId",
          "label": "工段",
          "required": false,
          "example": "工段测试值"
        },
        {
          "key": "OperationId",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "TplType",
          "label": "业务类型",
          "required": true,
          "example": "业务类型测试值"
        },
        {
          "key": "DefectLevel",
          "label": "不良等级",
          "required": true,
          "example": "不良等级测试值"
        },
        {
          "key": "MeasureType",
          "label": "计量方式",
          "required": true,
          "example": "计量方式测试值"
        },
        {
          "key": "SampleType",
          "label": "抽样方式",
          "required": true,
          "example": "抽样方式测试值"
        },
        {
          "key": "KeyLevel",
          "label": "重要程度",
          "required": true,
          "example": "重要程度测试值"
        },
        {
          "key": "Data",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        }
      ],
      "testData": {
        "ClassType": "物料子类测试值",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "SectionId": "工段测试值",
        "OperationId": "工序测试值",
        "TplType": "业务类型测试值",
        "DefectLevel": "不良等级测试值",
        "MeasureType": "计量方式测试值",
        "SampleType": "抽样方式测试值",
        "KeyLevel": "重要程度测试值",
        "Data": "输入关键字搜索测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsQcTemplateMstDelete",
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
