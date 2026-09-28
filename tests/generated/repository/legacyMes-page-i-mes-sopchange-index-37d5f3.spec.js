// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sopchange-index-37d5f3",
  "name": "旧版制造执行 - 返回（未配置菜单）功能校验",
  "displayName": "返回（未配置菜单）",
  "route": "/iMES/SOPchange/Index",
  "sourceRoute": "/iMES/SOPchange/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 返回（未配置菜单）",
  "sourceFile": "src/views/iMES/SOPchange/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "PART_NAME",
      "PART_DESC",
      "PART_QTY",
      "PART_LOCATION",
      "IS_SCAN",
      "ROUTE_NAME",
      "DESCRIPTION",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "PART_NO",
        "label": "零件料号",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "物料规格",
        "required": false
      },
      {
        "key": "PART_QTY",
        "label": "用量",
        "required": false
      },
      {
        "key": "PART_LOCATION",
        "label": "位置",
        "required": false
      },
      {
        "key": "IS_SCAN",
        "label": "扫描",
        "required": false
      },
      {
        "key": "ROUTE_NAME",
        "label": "名称(自动带出)",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "描述(自动带出)",
        "required": false
      },
      {
        "key": "Key",
        "label": "工序名称",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "PART_DESC": "物料规格测试值",
      "PART_QTY": "1",
      "PART_LOCATION": "位置测试值",
      "IS_SCAN": "扫描测试值",
      "ROUTE_NAME": "名称(自动带出)测试值",
      "DESCRIPTION": "描述(自动带出)测试值",
      "Key": "自动化样例001"
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
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "物料规格测试值",
        "PART_QTY": "1",
        "PART_LOCATION": "位置测试值",
        "IS_SCAN": "扫描测试值",
        "ROUTE_NAME": "名称(自动带出)测试值",
        "DESCRIPTION": "描述(自动带出)测试值",
        "Key": "自动化样例001"
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
      "key": "13fd57e65b-55bcd8a52a-64ad6",
      "type": "新增表单",
      "name": "添加工序业务入口校验",
      "label": "添加工序",
      "handler": "add_process_but",
      "permission": "AddOrModifySave",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加工序",
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
          "label": "零件料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_DESC",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PART_QTY",
          "label": "用量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PART_LOCATION",
          "label": "位置",
          "required": false,
          "example": "位置测试值"
        },
        {
          "key": "IS_SCAN",
          "label": "扫描",
          "required": false,
          "example": "扫描测试值"
        },
        {
          "key": "ROUTE_NAME",
          "label": "名称(自动带出)",
          "required": false,
          "example": "名称(自动带出)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述(自动带出)",
          "required": false,
          "example": "描述(自动带出)测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "物料规格测试值",
        "PART_QTY": "1",
        "PART_LOCATION": "位置测试值",
        "IS_SCAN": "扫描测试值",
        "ROUTE_NAME": "名称(自动带出)测试值",
        "DESCRIPTION": "描述(自动带出)测试值",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "5f1787916c-59b308c817-096f7",
      "type": "导入入口",
      "name": "上传图片业务入口校验",
      "label": "上传图片",
      "handler": "primary_upload_but(row)",
      "permission": "UploadImage",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击上传图片",
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
      "key": "4aa22a22ac-aeb2c2b407-fbd1c",
      "type": "编辑表单",
      "name": "编辑说明业务入口校验",
      "label": "编辑说明",
      "handler": "head_edit_but",
      "permission": "UpdateMsgInfo",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑说明",
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
          "label": "零件料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_DESC",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PART_QTY",
          "label": "用量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PART_LOCATION",
          "label": "位置",
          "required": false,
          "example": "位置测试值"
        },
        {
          "key": "IS_SCAN",
          "label": "扫描",
          "required": false,
          "example": "扫描测试值"
        },
        {
          "key": "ROUTE_NAME",
          "label": "名称(自动带出)",
          "required": false,
          "example": "名称(自动带出)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述(自动带出)",
          "required": false,
          "example": "描述(自动带出)测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "物料规格测试值",
        "PART_QTY": "1",
        "PART_LOCATION": "位置测试值",
        "IS_SCAN": "扫描测试值",
        "ROUTE_NAME": "名称(自动带出)测试值",
        "DESCRIPTION": "描述(自动带出)测试值",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-03dc32caa0-6f865",
      "type": "删除确认",
      "name": "删除工序确认框与取消操作",
      "label": "删除工序",
      "handler": "primary_remove_but(row, row.$index)",
      "permission": "DeleteSub",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除工序",
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
      "key": "726b6ec55f-3755f56f2f-26c1b",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "opera_delete_but(scope.row,scope.$index,scope)",
      "permission": "DeleteResource",
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
      "key": "4aa22a22ac-a7f814c0a4-38d51",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "opera_edit_but(scope.row)",
      "permission": "UpdateMsgInfo",
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
          "label": "零件料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_DESC",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PART_QTY",
          "label": "用量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PART_LOCATION",
          "label": "位置",
          "required": false,
          "example": "位置测试值"
        },
        {
          "key": "IS_SCAN",
          "label": "扫描",
          "required": false,
          "example": "扫描测试值"
        },
        {
          "key": "ROUTE_NAME",
          "label": "名称(自动带出)",
          "required": false,
          "example": "名称(自动带出)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述(自动带出)",
          "required": false,
          "example": "描述(自动带出)测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "物料规格测试值",
        "PART_QTY": "1",
        "PART_LOCATION": "位置测试值",
        "IS_SCAN": "扫描测试值",
        "ROUTE_NAME": "名称(自动带出)测试值",
        "DESCRIPTION": "描述(自动带出)测试值",
        "Key": "自动化样例001"
      }
    }
  ]
});
