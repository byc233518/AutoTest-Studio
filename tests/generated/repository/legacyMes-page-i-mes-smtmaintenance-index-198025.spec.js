// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smtmaintenance-index-198025",
  "name": "旧版制造执行 - A班（未配置菜单）功能校验",
  "displayName": "A班（未配置菜单）",
  "route": "/iMES/SMTmaintenance/Index",
  "sourceRoute": "/iMES/SMTmaintenance/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / A班（未配置菜单）",
  "sourceFile": "src/views/iMES/SMTmaintenance/Index.vue",
  "dataSchema": {
    "columns": [
      "GROUP_NAME",
      "WORK_CLASS",
      "LINE_ID",
      "ORDER_NO",
      "WO_NO",
      "MODEL",
      "PART_NO",
      "ATTRIBUTE2",
      "WORK_TIME_LEN",
      "SN",
      "DEFECT_CODE",
      "DEFECT_DES",
      "QUANTITY",
      "LOCATION",
      "DEFECT_REMARK",
      "DEFECT_REASON",
      "EXCLUDE_FAULT_TEXT",
      "FAIL_PN",
      "ANALYSIS_REASON",
      "IS_OK",
      "OldODMComponentPn",
      "OldDescription",
      "OldODMComponentSn",
      "NewODMComponentPn",
      "NewDescription",
      "NewODMComponentSn",
      "ATTRIBUTE1",
      "Key",
      "STATUS",
      "datarange"
    ],
    "required": [
      "WORK_CLASS",
      "LINE_ID",
      "ORDER_NO",
      "WO_NO",
      "MODEL",
      "ATTRIBUTE2",
      "WORK_TIME_LEN",
      "DEFECT_CODE",
      "DEFECT_DES",
      "QUANTITY",
      "LOCATION",
      "DEFECT_REMARK",
      "IS_OK",
      "OldODMComponentPn",
      "NewODMComponentPn",
      "ATTRIBUTE1"
    ],
    "fields": [
      {
        "key": "GROUP_NAME",
        "label": "维修编号",
        "required": false
      },
      {
        "key": "WORK_CLASS",
        "label": "班别",
        "required": true
      },
      {
        "key": "LINE_ID",
        "label": "线别",
        "required": true
      },
      {
        "key": "ORDER_NO",
        "label": "订单号",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "MODEL",
        "label": "规格",
        "required": true
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "ATTRIBUTE2",
        "label": "送修数量",
        "required": true
      },
      {
        "key": "WORK_TIME_LEN",
        "label": "维修时长",
        "required": true
      },
      {
        "key": "SN",
        "label": "产品流水号",
        "required": false
      },
      {
        "key": "DEFECT_CODE",
        "label": "不良代码",
        "required": true
      },
      {
        "key": "DEFECT_DES",
        "label": "不良现象",
        "required": true
      },
      {
        "key": "QUANTITY",
        "label": "数量",
        "required": true
      },
      {
        "key": "LOCATION",
        "label": "不良位号",
        "required": true
      },
      {
        "key": "DEFECT_REMARK",
        "label": "不良描述",
        "required": true
      },
      {
        "key": "DEFECT_REASON",
        "label": "不良原因：",
        "required": false
      },
      {
        "key": "EXCLUDE_FAULT_TEXT",
        "label": "排除故障：",
        "required": false
      },
      {
        "key": "FAIL_PN",
        "label": "坏件料号：",
        "required": false
      },
      {
        "key": "ANALYSIS_REASON",
        "label": "原因分析：",
        "required": false
      },
      {
        "key": "IS_OK",
        "label": "维修状态",
        "required": true
      },
      {
        "key": "OldODMComponentPn",
        "label": "原零件料号",
        "required": true
      },
      {
        "key": "OldDescription",
        "label": "原零件规格",
        "required": false
      },
      {
        "key": "OldODMComponentSn",
        "label": "原零件编号",
        "required": false
      },
      {
        "key": "NewODMComponentPn",
        "label": "新零件料号",
        "required": true
      },
      {
        "key": "NewDescription",
        "label": "新零件规格",
        "required": false
      },
      {
        "key": "NewODMComponentSn",
        "label": "新零件编号",
        "required": false
      },
      {
        "key": "ATTRIBUTE1",
        "label": "送修站点",
        "required": true
      },
      {
        "key": "Key",
        "label": "查询条件",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "datarange",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "GROUP_NAME": "AT-001",
      "WORK_CLASS": "班别测试值",
      "LINE_ID": "线别测试值",
      "ORDER_NO": "AT-001",
      "WO_NO": "AT-001",
      "MODEL": "规格测试值",
      "PART_NO": "AT-001",
      "ATTRIBUTE2": "1",
      "WORK_TIME_LEN": "维修时长测试值",
      "SN": "产品流水号测试值",
      "DEFECT_CODE": "不良代码测试值",
      "DEFECT_DES": "不良现象测试值",
      "QUANTITY": "1",
      "LOCATION": "不良位号测试值",
      "DEFECT_REMARK": "自动化测试备注001",
      "DEFECT_REASON": "不良原因：测试值",
      "EXCLUDE_FAULT_TEXT": "排除故障：测试值",
      "FAIL_PN": "坏件料号：测试值",
      "ANALYSIS_REASON": "原因分析：测试值",
      "IS_OK": "Y",
      "OldODMComponentPn": "AT-001",
      "OldDescription": "原零件规格测试值",
      "OldODMComponentSn": "AT-001",
      "NewODMComponentPn": "AT-001",
      "NewDescription": "新零件规格测试值",
      "NewODMComponentSn": "AT-001",
      "ATTRIBUTE1": "送修站点测试值",
      "Key": "查询条件测试值",
      "STATUS": "Y",
      "datarange": "2026-08-01"
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
        "MstSearch"
      ],
      "testData": {
        "GROUP_NAME": "AT-001",
        "WORK_CLASS": "班别测试值",
        "LINE_ID": "线别测试值",
        "ORDER_NO": "AT-001",
        "WO_NO": "AT-001",
        "MODEL": "规格测试值",
        "PART_NO": "AT-001",
        "ATTRIBUTE2": "1",
        "WORK_TIME_LEN": "维修时长测试值",
        "SN": "产品流水号测试值",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_DES": "不良现象测试值",
        "QUANTITY": "1",
        "LOCATION": "不良位号测试值",
        "DEFECT_REMARK": "自动化测试备注001",
        "DEFECT_REASON": "不良原因：测试值",
        "EXCLUDE_FAULT_TEXT": "排除故障：测试值",
        "FAIL_PN": "坏件料号：测试值",
        "ANALYSIS_REASON": "原因分析：测试值",
        "IS_OK": "Y",
        "OldODMComponentPn": "AT-001",
        "OldDescription": "原零件规格测试值",
        "OldODMComponentSn": "AT-001",
        "NewODMComponentPn": "AT-001",
        "NewDescription": "新零件规格测试值",
        "NewODMComponentSn": "AT-001",
        "ATTRIBUTE1": "送修站点测试值",
        "Key": "查询条件测试值",
        "STATUS": "Y",
        "datarange": "2026-08-01"
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
      "key": "726b6ec55f-3755f56f2f-39bf0",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "ChilddeleteClick(row)",
      "permission": "SmtDefectsRecordsSavDTL",
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
      "key": "7e002f9936-800e250455-7c94a",
      "type": "业务动作",
      "name": "送修业务入口校验",
      "label": "送修",
      "handler": "sendBuild",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位送修",
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
      "key": "7e002f9936-fe945e5a0d-5745e",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "AuditClick",
      "permission": "SmtDefectsRecordsCheck",
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
      "key": "7e002f9936-257bd22961-da137",
      "type": "业务动作",
      "name": "取消审核业务入口校验",
      "label": "取消审核",
      "handler": "CancelAudit",
      "permission": "SmtDefectsRecordsCancelCheck",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消审核",
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
      "key": "7e002f9936-2b83a4cb9c-9f94a",
      "type": "业务动作",
      "name": "维修业务入口校验",
      "label": "维修",
      "handler": "MSTeditClick(row)",
      "permission": "SmtDefectsRecordsSaveData",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位维修",
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
