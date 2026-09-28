// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-device-docking-configuration-site-index-982aec",
  "name": "旧版制造执行 - 输入关键字搜索（未配置菜单）功能校验",
  "displayName": "输入关键字搜索（未配置菜单）",
  "route": "/iMES/DeviceDockingConfigurationSite/Index",
  "sourceRoute": "/iMES/DeviceDockingConfigurationSite/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 输入关键字搜索（未配置菜单）",
  "sourceFile": "src/views/iMES/DeviceDockingConfigurationSite/Index.vue",
  "dataSchema": {
    "columns": [
      "EQUIPMENT_CODE",
      "OPERATION_SITE_ID",
      "OPERATION_SITE2_ID",
      "CHECK_ROUTE",
      "OPERATOR",
      "OPERATOR2",
      "RETESTS_QTY",
      "PCB_SIDE",
      "ENABLED",
      "OPERATION_SITE_NAME",
      "OPERATION_SITE_Name",
      "OPERATION_SITE2_Name"
    ],
    "required": [
      "EQUIPMENT_CODE",
      "OPERATION_SITE_ID",
      "OPERATION_SITE2_ID",
      "PCB_SIDE"
    ],
    "fields": [
      {
        "key": "EQUIPMENT_CODE",
        "label": "设备编码",
        "required": true
      },
      {
        "key": "OPERATION_SITE_ID",
        "label": "轨道1站点",
        "required": true
      },
      {
        "key": "OPERATION_SITE2_ID",
        "label": "轨道2站点",
        "required": true
      },
      {
        "key": "CHECK_ROUTE",
        "label": "校验过站业务",
        "required": false
      },
      {
        "key": "OPERATOR",
        "label": "轨道1操作员",
        "required": false
      },
      {
        "key": "OPERATOR2",
        "label": "轨道2操作员",
        "required": false
      },
      {
        "key": "RETESTS_QTY",
        "label": "NG允许重测次数",
        "required": false
      },
      {
        "key": "PCB_SIDE",
        "label": "板底/板面",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "输入关键字搜索",
        "required": false
      },
      {
        "key": "OPERATION_SITE_Name",
        "label": "站点",
        "required": false
      },
      {
        "key": "OPERATION_SITE2_Name",
        "label": "站点",
        "required": false
      }
    ],
    "example": {
      "EQUIPMENT_CODE": "AT-001",
      "OPERATION_SITE_ID": "轨道1站点测试值",
      "OPERATION_SITE2_ID": "轨道2站点测试值",
      "CHECK_ROUTE": "校验过站业务测试值",
      "OPERATOR": "轨道1操作员测试值",
      "OPERATOR2": "轨道2操作员测试值",
      "RETESTS_QTY": "NG允许重测次数测试值",
      "PCB_SIDE": "板底/板面测试值",
      "ENABLED": "Y",
      "OPERATION_SITE_NAME": "输入关键字搜索测试值",
      "OPERATION_SITE_Name": "站点测试值",
      "OPERATION_SITE2_Name": "站点测试值"
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
        "searchsiteForm",
        "search_but"
      ],
      "testData": {
        "EQUIPMENT_CODE": "AT-001",
        "OPERATION_SITE_ID": "轨道1站点测试值",
        "OPERATION_SITE2_ID": "轨道2站点测试值",
        "CHECK_ROUTE": "校验过站业务测试值",
        "OPERATOR": "轨道1操作员测试值",
        "OPERATOR2": "轨道2操作员测试值",
        "RETESTS_QTY": "NG允许重测次数测试值",
        "PCB_SIDE": "板底/板面测试值",
        "ENABLED": "Y",
        "OPERATION_SITE_NAME": "输入关键字搜索测试值",
        "OPERATION_SITE_Name": "站点测试值",
        "OPERATION_SITE2_Name": "站点测试值"
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
          "key": "EQUIPMENT_CODE",
          "label": "设备编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "OPERATION_SITE_ID",
          "label": "轨道1站点",
          "required": true,
          "example": "轨道1站点测试值"
        },
        {
          "key": "OPERATION_SITE2_ID",
          "label": "轨道2站点",
          "required": true,
          "example": "轨道2站点测试值"
        },
        {
          "key": "CHECK_ROUTE",
          "label": "校验过站业务",
          "required": false,
          "example": "校验过站业务测试值"
        },
        {
          "key": "OPERATOR",
          "label": "轨道1操作员",
          "required": false,
          "example": "轨道1操作员测试值"
        },
        {
          "key": "OPERATOR2",
          "label": "轨道2操作员",
          "required": false,
          "example": "轨道2操作员测试值"
        },
        {
          "key": "RETESTS_QTY",
          "label": "NG允许重测次数",
          "required": false,
          "example": "NG允许重测次数测试值"
        },
        {
          "key": "PCB_SIDE",
          "label": "板底/板面",
          "required": true,
          "example": "板底/板面测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        },
        {
          "key": "OPERATION_SITE_Name",
          "label": "站点",
          "required": false,
          "example": "站点测试值"
        },
        {
          "key": "OPERATION_SITE2_Name",
          "label": "站点",
          "required": false,
          "example": "站点测试值"
        }
      ],
      "testData": {
        "EQUIPMENT_CODE": "AT-001",
        "OPERATION_SITE_ID": "轨道1站点测试值",
        "OPERATION_SITE2_ID": "轨道2站点测试值",
        "CHECK_ROUTE": "校验过站业务测试值",
        "OPERATOR": "轨道1操作员测试值",
        "OPERATOR2": "轨道2操作员测试值",
        "RETESTS_QTY": "NG允许重测次数测试值",
        "PCB_SIDE": "板底/板面测试值",
        "ENABLED": "Y",
        "OPERATION_SITE_NAME": "输入关键字搜索测试值",
        "OPERATION_SITE_Name": "站点测试值",
        "OPERATION_SITE2_Name": "站点测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
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
          "key": "EQUIPMENT_CODE",
          "label": "设备编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "OPERATION_SITE_ID",
          "label": "轨道1站点",
          "required": true,
          "example": "轨道1站点测试值"
        },
        {
          "key": "OPERATION_SITE2_ID",
          "label": "轨道2站点",
          "required": true,
          "example": "轨道2站点测试值"
        },
        {
          "key": "CHECK_ROUTE",
          "label": "校验过站业务",
          "required": false,
          "example": "校验过站业务测试值"
        },
        {
          "key": "OPERATOR",
          "label": "轨道1操作员",
          "required": false,
          "example": "轨道1操作员测试值"
        },
        {
          "key": "OPERATOR2",
          "label": "轨道2操作员",
          "required": false,
          "example": "轨道2操作员测试值"
        },
        {
          "key": "RETESTS_QTY",
          "label": "NG允许重测次数",
          "required": false,
          "example": "NG允许重测次数测试值"
        },
        {
          "key": "PCB_SIDE",
          "label": "板底/板面",
          "required": true,
          "example": "板底/板面测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "输入关键字搜索",
          "required": false,
          "example": "输入关键字搜索测试值"
        },
        {
          "key": "OPERATION_SITE_Name",
          "label": "站点",
          "required": false,
          "example": "站点测试值"
        },
        {
          "key": "OPERATION_SITE2_Name",
          "label": "站点",
          "required": false,
          "example": "站点测试值"
        }
      ],
      "testData": {
        "EQUIPMENT_CODE": "AT-001",
        "OPERATION_SITE_ID": "轨道1站点测试值",
        "OPERATION_SITE2_ID": "轨道2站点测试值",
        "CHECK_ROUTE": "校验过站业务测试值",
        "OPERATOR": "轨道1操作员测试值",
        "OPERATOR2": "轨道2操作员测试值",
        "RETESTS_QTY": "NG允许重测次数测试值",
        "PCB_SIDE": "板底/板面测试值",
        "ENABLED": "Y",
        "OPERATION_SITE_NAME": "输入关键字搜索测试值",
        "OPERATION_SITE_Name": "站点测试值",
        "OPERATION_SITE2_Name": "站点测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-78e8f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row)",
      "permission": "IotEquipmentSitesDeleteOneById",
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
