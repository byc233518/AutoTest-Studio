// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-batch-manager-index-926ac2",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/MesBatchManager/Index",
  "sourceRoute": "/iMES/MesBatchManager/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/MesBatchManager/Index.vue",
  "dataSchema": {
    "columns": [
      "time",
      "LOC_NO",
      "LINE_NAME",
      "WO_NO",
      "PRODUCTION_TIME",
      "PRODUCTION_QTY",
      "PART_NO",
      "CODE",
      "DESCRIPTION",
      "CARTON_NO",
      "QTY",
      "PrintName",
      "LINE_ID",
      "Key"
    ],
    "required": [
      "LOC_NO",
      "QTY"
    ],
    "fields": [
      {
        "key": "time",
        "label": "打印日期",
        "required": false
      },
      {
        "key": "LOC_NO",
        "label": "批次号",
        "required": true
      },
      {
        "key": "LINE_NAME",
        "label": "线别",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "PRODUCTION_TIME",
        "label": "生产日期",
        "required": false
      },
      {
        "key": "PRODUCTION_QTY",
        "label": "生产数量",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "CODE",
        "label": "条码编号",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "规格",
        "required": false
      },
      {
        "key": "CARTON_NO",
        "label": "周转箱编号",
        "required": false
      },
      {
        "key": "QTY",
        "label": "数量",
        "required": true
      },
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "LINE_ID",
        "label": "线别",
        "required": false
      },
      {
        "key": "Key",
        "label": "工单号",
        "required": false
      }
    ],
    "example": {
      "time": "2026-08-01",
      "LOC_NO": "批次号测试值",
      "LINE_NAME": "线别测试值",
      "WO_NO": "工单测试值",
      "PRODUCTION_TIME": "2026-08-01",
      "PRODUCTION_QTY": "1",
      "PART_NO": "AT-001",
      "CODE": "AT-001",
      "DESCRIPTION": "规格测试值",
      "CARTON_NO": "AT-001",
      "QTY": "1",
      "PrintName": "自动化样例001",
      "LINE_ID": "线别测试值",
      "Key": "AT-001"
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
        "searchClick",
        "searchPrint"
      ],
      "testData": {
        "time": "2026-08-01",
        "LOC_NO": "批次号测试值",
        "LINE_NAME": "线别测试值",
        "WO_NO": "工单测试值",
        "PRODUCTION_TIME": "2026-08-01",
        "PRODUCTION_QTY": "1",
        "PART_NO": "AT-001",
        "CODE": "AT-001",
        "DESCRIPTION": "规格测试值",
        "CARTON_NO": "AT-001",
        "QTY": "1",
        "PrintName": "自动化样例001",
        "LINE_ID": "线别测试值",
        "Key": "AT-001"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
      "permission": "MesBatchManagerAdd",
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
          "key": "time",
          "label": "打印日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LOC_NO",
          "label": "批次号",
          "required": true,
          "example": "批次号测试值"
        },
        {
          "key": "LINE_NAME",
          "label": "线别",
          "required": false,
          "example": "线别测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "PRODUCTION_TIME",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCTION_QTY",
          "label": "生产数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CODE",
          "label": "条码编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "CARTON_NO",
          "label": "周转箱编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "QTY",
          "label": "数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "PrintName",
          "label": "打印机名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": false,
          "example": "线别测试值"
        },
        {
          "key": "Key",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "time": "2026-08-01",
        "LOC_NO": "批次号测试值",
        "LINE_NAME": "线别测试值",
        "WO_NO": "工单测试值",
        "PRODUCTION_TIME": "2026-08-01",
        "PRODUCTION_QTY": "1",
        "PART_NO": "AT-001",
        "CODE": "AT-001",
        "DESCRIPTION": "规格测试值",
        "CARTON_NO": "AT-001",
        "QTY": "1",
        "PrintName": "自动化样例001",
        "LINE_ID": "线别测试值",
        "Key": "AT-001"
      }
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
          "key": "time",
          "label": "打印日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LOC_NO",
          "label": "批次号",
          "required": true,
          "example": "批次号测试值"
        },
        {
          "key": "LINE_NAME",
          "label": "线别",
          "required": false,
          "example": "线别测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "PRODUCTION_TIME",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCTION_QTY",
          "label": "生产数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CODE",
          "label": "条码编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "CARTON_NO",
          "label": "周转箱编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "QTY",
          "label": "数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "PrintName",
          "label": "打印机名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": false,
          "example": "线别测试值"
        },
        {
          "key": "Key",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "time": "2026-08-01",
        "LOC_NO": "批次号测试值",
        "LINE_NAME": "线别测试值",
        "WO_NO": "工单测试值",
        "PRODUCTION_TIME": "2026-08-01",
        "PRODUCTION_QTY": "1",
        "PART_NO": "AT-001",
        "CODE": "AT-001",
        "DESCRIPTION": "规格测试值",
        "CARTON_NO": "AT-001",
        "QTY": "1",
        "PrintName": "自动化样例001",
        "LINE_ID": "线别测试值",
        "Key": "AT-001"
      }
    },
    {
      "key": "ef879b4ced-2b9d013177-ca6ed",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "downClick(row, row.$index)",
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
      "key": "13fd57e65b-9f4d154194-c6d6a",
      "type": "新增表单",
      "name": "新增打印业务入口校验",
      "label": "新增打印",
      "handler": "openPrint",
      "permission": "SaveMesBatchPring",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增打印",
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
          "key": "time",
          "label": "打印日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LOC_NO",
          "label": "批次号",
          "required": true,
          "example": "批次号测试值"
        },
        {
          "key": "LINE_NAME",
          "label": "线别",
          "required": false,
          "example": "线别测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "PRODUCTION_TIME",
          "label": "生产日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PRODUCTION_QTY",
          "label": "生产数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CODE",
          "label": "条码编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "CARTON_NO",
          "label": "周转箱编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "QTY",
          "label": "数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "PrintName",
          "label": "打印机名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": false,
          "example": "线别测试值"
        },
        {
          "key": "Key",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "time": "2026-08-01",
        "LOC_NO": "批次号测试值",
        "LINE_NAME": "线别测试值",
        "WO_NO": "工单测试值",
        "PRODUCTION_TIME": "2026-08-01",
        "PRODUCTION_QTY": "1",
        "PART_NO": "AT-001",
        "CODE": "AT-001",
        "DESCRIPTION": "规格测试值",
        "CARTON_NO": "AT-001",
        "QTY": "1",
        "PrintName": "自动化样例001",
        "LINE_ID": "线别测试值",
        "Key": "AT-001"
      }
    }
  ]
});
