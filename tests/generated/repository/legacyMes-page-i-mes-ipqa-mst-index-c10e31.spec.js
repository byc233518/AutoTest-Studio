// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ipqa-mst-index-c10e31",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/IpqaMst/Index",
  "sourceRoute": "/iMES/IpqaMst/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/IpqaMst/Index.vue",
  "dataSchema": {
    "columns": [
      "IPQA_TYPE",
      "PRODUCT_NAME",
      "value2",
      "CREATETIME",
      "PRODUCT_BILLNO",
      "PRODUCT_DATE",
      "PRODUCT_QTY",
      "PRODUCT_MODEL",
      "ipqa_type",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "IPQA_TYPE",
        "label": "巡检分类",
        "required": false
      },
      {
        "key": "PRODUCT_NAME",
        "label": "产品名称",
        "required": false
      },
      {
        "key": "value2",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "CREATETIME",
        "label": "巡检时间",
        "required": false
      },
      {
        "key": "PRODUCT_BILLNO",
        "label": "生产单号",
        "required": false
      },
      {
        "key": "PRODUCT_DATE",
        "label": "生产日期",
        "required": false
      },
      {
        "key": "PRODUCT_QTY",
        "label": "生产数量",
        "required": false
      },
      {
        "key": "PRODUCT_MODEL",
        "label": "产品型号",
        "required": false
      },
      {
        "key": "ipqa_type",
        "label": "巡检分类",
        "required": false
      },
      {
        "key": "Key",
        "label": "关键字",
        "required": false
      }
    ],
    "example": {
      "IPQA_TYPE": "巡检分类测试值",
      "PRODUCT_NAME": "自动化样例001",
      "value2": "2026-08-01",
      "CREATETIME": "2026-08-01",
      "PRODUCT_BILLNO": "AT-001",
      "PRODUCT_DATE": "2026-08-01",
      "PRODUCT_QTY": "1",
      "PRODUCT_MODEL": "产品型号测试值",
      "ipqa_type": "巡检分类测试值",
      "Key": "关键字测试值"
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
        "search_but"
      ],
      "testData": {
        "IPQA_TYPE": "巡检分类测试值",
        "PRODUCT_NAME": "自动化样例001",
        "value2": "2026-08-01",
        "CREATETIME": "2026-08-01",
        "PRODUCT_BILLNO": "AT-001",
        "PRODUCT_DATE": "2026-08-01",
        "PRODUCT_QTY": "1",
        "PRODUCT_MODEL": "产品型号测试值",
        "ipqa_type": "巡检分类测试值",
        "Key": "关键字测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "IpqaMstSave",
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
          "key": "IPQA_TYPE",
          "label": "巡检分类",
          "required": false,
          "example": "巡检分类测试值"
        },
        {
          "key": "PRODUCT_NAME",
          "label": "产品名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "CREATETIME",
          "label": "巡检时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCT_BILLNO",
          "label": "生产单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCT_QTY",
          "label": "生产数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PRODUCT_MODEL",
          "label": "产品型号",
          "required": false,
          "example": "产品型号测试值"
        },
        {
          "key": "ipqa_type",
          "label": "巡检分类",
          "required": false,
          "example": "巡检分类测试值"
        },
        {
          "key": "Key",
          "label": "关键字",
          "required": false,
          "example": "关键字测试值"
        }
      ],
      "testData": {
        "IPQA_TYPE": "巡检分类测试值",
        "PRODUCT_NAME": "自动化样例001",
        "value2": "2026-08-01",
        "CREATETIME": "2026-08-01",
        "PRODUCT_BILLNO": "AT-001",
        "PRODUCT_DATE": "2026-08-01",
        "PRODUCT_QTY": "1",
        "PRODUCT_MODEL": "产品型号测试值",
        "ipqa_type": "巡检分类测试值",
        "Key": "关键字测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-0a6da",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but",
      "permission": "IpqaMstedit",
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
          "key": "IPQA_TYPE",
          "label": "巡检分类",
          "required": false,
          "example": "巡检分类测试值"
        },
        {
          "key": "PRODUCT_NAME",
          "label": "产品名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "CREATETIME",
          "label": "巡检时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCT_BILLNO",
          "label": "生产单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCT_QTY",
          "label": "生产数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PRODUCT_MODEL",
          "label": "产品型号",
          "required": false,
          "example": "产品型号测试值"
        },
        {
          "key": "ipqa_type",
          "label": "巡检分类",
          "required": false,
          "example": "巡检分类测试值"
        },
        {
          "key": "Key",
          "label": "关键字",
          "required": false,
          "example": "关键字测试值"
        }
      ],
      "testData": {
        "IPQA_TYPE": "巡检分类测试值",
        "PRODUCT_NAME": "自动化样例001",
        "value2": "2026-08-01",
        "CREATETIME": "2026-08-01",
        "PRODUCT_BILLNO": "AT-001",
        "PRODUCT_DATE": "2026-08-01",
        "PRODUCT_QTY": "1",
        "PRODUCT_MODEL": "产品型号测试值",
        "ipqa_type": "巡检分类测试值",
        "Key": "关键字测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-4d9e1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but()",
      "permission": "IpqaMstdelete",
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
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "IpqaMstAudit",
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
      "key": "7e002f9936-0593602164-69a6f",
      "type": "业务动作",
      "name": "取消提交审核业务入口校验",
      "label": "取消提交审核",
      "handler": "cancel_but",
      "permission": "UnCheckBill",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消提交审核",
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
      "key": "7e002f9936-903be22a4a-28200",
      "type": "业务动作",
      "name": "提交审核业务入口校验",
      "label": "提交审核",
      "handler": "submit_but",
      "permission": "IpqaMstPostToCheck",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交审核",
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
      "key": "5f1787916c-a4dfdd91b3-13f2e",
      "type": "导入入口",
      "name": "图片预览/上传业务入口校验",
      "label": "图片预览/上传",
      "handler": "handelUpload(scope)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击图片预览/上传",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    }
  ]
});
