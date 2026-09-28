// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-collect-products-index-d30967",
  "name": "旧版制造执行 - 当前用户（未配置菜单）功能校验",
  "displayName": "当前用户（未配置菜单）",
  "route": "/iMES/CollectProducts/Index",
  "sourceRoute": "/iMES/CollectProducts/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 当前用户（未配置菜单）",
  "sourceFile": "src/views/iMES/CollectProducts/Index.vue",
  "dataSchema": {
    "columns": [
      "startTime",
      "sn",
      "OldValue",
      "Remark",
      "LabelTemplate",
      "CapacityReportQty",
      "DefectReportQty",
      "DEFECT_LOC",
      "isRework",
      "OPERATION_LINE_ID",
      "StationID",
      "PrintName",
      "DATA",
      "StationName",
      "FILE_NAME",
      "OPERATION_SITE_NAME"
    ],
    "required": [],
    "fields": [
      {
        "key": "startTime",
        "label": "开始时间",
        "required": false
      },
      {
        "key": "sn",
        "label": "当前SN",
        "required": false
      },
      {
        "key": "OldValue",
        "label": "旧值",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "LabelTemplate",
        "label": "标签模板",
        "required": false
      },
      {
        "key": "CapacityReportQty",
        "label": "良品数量",
        "required": false
      },
      {
        "key": "DefectReportQty",
        "label": "不良数量",
        "required": false
      },
      {
        "key": "DEFECT_LOC",
        "label": "不良位号",
        "required": false
      },
      {
        "key": "isRework",
        "label": "是否返工",
        "required": false
      },
      {
        "key": "OPERATION_LINE_ID",
        "label": "线体名称",
        "required": false
      },
      {
        "key": "StationID",
        "label": "工位",
        "required": false
      },
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "DATA",
        "label": "输入数据",
        "required": false
      },
      {
        "key": "StationName",
        "label": "工位",
        "required": false
      },
      {
        "key": "FILE_NAME",
        "label": "标签名称",
        "required": false
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "名称",
        "required": false
      }
    ],
    "example": {
      "startTime": "2026-08-01",
      "sn": "当前SN测试值",
      "OldValue": "旧值测试值",
      "Remark": "自动化测试备注001",
      "LabelTemplate": "标签模板测试值",
      "CapacityReportQty": "1",
      "DefectReportQty": "1",
      "DEFECT_LOC": "不良位号测试值",
      "isRework": "是否返工测试值",
      "OPERATION_LINE_ID": "自动化样例001",
      "StationID": "工位测试值",
      "PrintName": "自动化样例001",
      "DATA": "输入数据测试值",
      "StationName": "工位测试值",
      "FILE_NAME": "自动化样例001",
      "OPERATION_SITE_NAME": "自动化样例001"
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
        "startTime": "2026-08-01",
        "sn": "当前SN测试值",
        "OldValue": "旧值测试值",
        "Remark": "自动化测试备注001",
        "LabelTemplate": "标签模板测试值",
        "CapacityReportQty": "1",
        "DefectReportQty": "1",
        "DEFECT_LOC": "不良位号测试值",
        "isRework": "是否返工测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "StationID": "工位测试值",
        "PrintName": "自动化样例001",
        "DATA": "输入数据测试值",
        "StationName": "工位测试值",
        "FILE_NAME": "自动化样例001",
        "OPERATION_SITE_NAME": "自动化样例001"
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
      "key": "7e002f9936-33c630ac26-47b2e",
      "type": "业务动作",
      "name": "提交报工业务入口校验",
      "label": "提交报工",
      "handler": "batchSubmit",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交报工",
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
      "key": "7e002f9936-da5e0a52a7-9d156",
      "type": "业务动作",
      "name": "撤销报工业务入口校验",
      "label": "撤销报工",
      "handler": "batchReset",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位撤销报工",
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
      "key": "4aa22a22ac-c9c77517fe-1354e",
      "type": "编辑表单",
      "name": "修改业务入口校验",
      "label": "修改",
      "handler": "startDisabled = !startDisabled",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击修改",
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
          "key": "startTime",
          "label": "开始时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "sn",
          "label": "当前SN",
          "required": false,
          "example": "当前SN测试值"
        },
        {
          "key": "OldValue",
          "label": "旧值",
          "required": false,
          "example": "旧值测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "LabelTemplate",
          "label": "标签模板",
          "required": false,
          "example": "标签模板测试值"
        },
        {
          "key": "CapacityReportQty",
          "label": "良品数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DefectReportQty",
          "label": "不良数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DEFECT_LOC",
          "label": "不良位号",
          "required": false,
          "example": "不良位号测试值"
        },
        {
          "key": "isRework",
          "label": "是否返工",
          "required": false,
          "example": "是否返工测试值"
        },
        {
          "key": "OPERATION_LINE_ID",
          "label": "线体名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "StationID",
          "label": "工位",
          "required": false,
          "example": "工位测试值"
        },
        {
          "key": "PrintName",
          "label": "打印机名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DATA",
          "label": "输入数据",
          "required": false,
          "example": "输入数据测试值"
        },
        {
          "key": "StationName",
          "label": "工位",
          "required": false,
          "example": "工位测试值"
        },
        {
          "key": "FILE_NAME",
          "label": "标签名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "startTime": "2026-08-01",
        "sn": "当前SN测试值",
        "OldValue": "旧值测试值",
        "Remark": "自动化测试备注001",
        "LabelTemplate": "标签模板测试值",
        "CapacityReportQty": "1",
        "DefectReportQty": "1",
        "DEFECT_LOC": "不良位号测试值",
        "isRework": "是否返工测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "StationID": "工位测试值",
        "PrintName": "自动化样例001",
        "DATA": "输入数据测试值",
        "StationName": "工位测试值",
        "FILE_NAME": "自动化样例001",
        "OPERATION_SITE_NAME": "自动化样例001"
      }
    },
    {
      "key": "7e002f9936-09cbc97ae2-c5f5e",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "handleSnSubmit",
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
    }
  ]
});
