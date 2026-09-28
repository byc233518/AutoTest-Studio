// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-mold-keep-task-index-8bfff9",
  "name": "设备管理 - 保养任务管理功能校验",
  "displayName": "保养任务管理",
  "route": "/ITPM/TpmMoldKeepTask/Index",
  "sourceRoute": "/ITPM/TpmMoldKeepTask/Index",
  "menuCode": "TpmMoldKeepTask",
  "breadcrumb": "设备管理 / 模具管理 / 保养任务管理",
  "sourceFile": "src/views/ITPM/TpmMoldKeepTask/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "MoldInsertCode",
      "LocationCode",
      "LocationName",
      "MoldInsertId",
      "LocationAreaName",
      "ClassType",
      "PartCode",
      "PartName",
      "Status",
      "SolutionId",
      "Remark",
      "PartType",
      "MoldPartId",
      "RepairDesc",
      "KeepPeriodStr",
      "MaintenanceTime",
      "KeepPlanName",
      "KeepThresholdCount",
      "UsedTime",
      "KeepResult",
      "KeepRemark"
    ],
    "required": [
      "Code",
      "MoldInsertId",
      "MaintenanceTime",
      "KeepResult"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "任务单号",
        "required": true
      },
      {
        "key": "MoldInsertCode",
        "label": "模具/镶件编码",
        "required": false
      },
      {
        "key": "LocationCode",
        "label": "目的储位编码",
        "required": false
      },
      {
        "key": "LocationName",
        "label": "目的储位名称",
        "required": false
      },
      {
        "key": "MoldInsertId",
        "label": "模具/镶件名称",
        "required": true
      },
      {
        "key": "LocationAreaName",
        "label": "储区名称",
        "required": false
      },
      {
        "key": "ClassType",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "PartCode",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "PartName",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "SolutionId",
        "label": "保养方案",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "PartType",
        "label": "物料类型",
        "required": false
      },
      {
        "key": "MoldPartId",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "RepairDesc",
        "label": "报修描述",
        "required": false
      },
      {
        "key": "KeepPeriodStr",
        "label": "周期类型",
        "required": false
      },
      {
        "key": "MaintenanceTime",
        "label": "保养起止时间",
        "required": true
      },
      {
        "key": "KeepPlanName",
        "label": "保养计划名称",
        "required": false
      },
      {
        "key": "KeepThresholdCount",
        "label": "保养阈值",
        "required": false
      },
      {
        "key": "UsedTime",
        "label": "保养时长",
        "required": false
      },
      {
        "key": "KeepResult",
        "label": "保养结果",
        "required": true
      },
      {
        "key": "KeepRemark",
        "label": "保养备注",
        "required": false
      }
    ],
    "example": {
      "Code": "AT-001",
      "MoldInsertCode": "AT-001",
      "LocationCode": "AT-001",
      "LocationName": "自动化样例001",
      "MoldInsertId": "自动化样例001",
      "LocationAreaName": "自动化样例001",
      "ClassType": "物料子类测试值",
      "PartCode": "AT-001",
      "PartName": "自动化样例001",
      "Status": "Y",
      "SolutionId": "保养方案测试值",
      "Remark": "自动化测试备注001",
      "PartType": "物料类型测试值",
      "MoldPartId": "自动化样例001",
      "RepairDesc": "自动化测试备注001",
      "KeepPeriodStr": "周期类型测试值",
      "MaintenanceTime": "2026-08-01",
      "KeepPlanName": "自动化样例001",
      "KeepThresholdCount": "保养阈值测试值",
      "UsedTime": "保养时长测试值",
      "KeepResult": "保养结果测试值",
      "KeepRemark": "自动化测试备注001"
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
        "Code": "AT-001",
        "MoldInsertCode": "AT-001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "MoldInsertId": "自动化样例001",
        "LocationAreaName": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "Status": "Y",
        "SolutionId": "保养方案测试值",
        "Remark": "自动化测试备注001",
        "PartType": "物料类型测试值",
        "MoldPartId": "自动化样例001",
        "RepairDesc": "自动化测试备注001",
        "KeepPeriodStr": "周期类型测试值",
        "MaintenanceTime": "2026-08-01",
        "KeepPlanName": "自动化样例001",
        "KeepThresholdCount": "保养阈值测试值",
        "UsedTime": "保养时长测试值",
        "KeepResult": "保养结果测试值",
        "KeepRemark": "自动化测试备注001"
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
      "key": "13fd57e65b-21796f106f-526a8",
      "type": "新增表单",
      "name": "新增保养业务入口校验",
      "label": "新增保养",
      "handler": "openFormEditor",
      "permission": "Add",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增保养",
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
          "key": "Code",
          "label": "任务单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocationCode",
          "label": "目的储位编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "目的储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MoldInsertId",
          "label": "模具/镶件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LocationAreaName",
          "label": "储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartCode",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SolutionId",
          "label": "保养方案",
          "required": false,
          "example": "保养方案测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PartType",
          "label": "物料类型",
          "required": false,
          "example": "物料类型测试值"
        },
        {
          "key": "MoldPartId",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "RepairDesc",
          "label": "报修描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "KeepPeriodStr",
          "label": "周期类型",
          "required": false,
          "example": "周期类型测试值"
        },
        {
          "key": "MaintenanceTime",
          "label": "保养起止时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "KeepPlanName",
          "label": "保养计划名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "KeepThresholdCount",
          "label": "保养阈值",
          "required": false,
          "example": "保养阈值测试值"
        },
        {
          "key": "UsedTime",
          "label": "保养时长",
          "required": false,
          "example": "保养时长测试值"
        },
        {
          "key": "KeepResult",
          "label": "保养结果",
          "required": true,
          "example": "保养结果测试值"
        },
        {
          "key": "KeepRemark",
          "label": "保养备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "MoldInsertCode": "AT-001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "MoldInsertId": "自动化样例001",
        "LocationAreaName": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "Status": "Y",
        "SolutionId": "保养方案测试值",
        "Remark": "自动化测试备注001",
        "PartType": "物料类型测试值",
        "MoldPartId": "自动化样例001",
        "RepairDesc": "自动化测试备注001",
        "KeepPeriodStr": "周期类型测试值",
        "MaintenanceTime": "2026-08-01",
        "KeepPlanName": "自动化样例001",
        "KeepThresholdCount": "保养阈值测试值",
        "UsedTime": "保养时长测试值",
        "KeepResult": "保养结果测试值",
        "KeepRemark": "自动化测试备注001"
      }
    },
    {
      "key": "7e002f9936-f0c10dc8f0-62f79",
      "type": "业务动作",
      "name": "任务确认业务入口校验",
      "label": "任务确认",
      "handler": "taskConfirm",
      "permission": "ConfirmReceive",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位任务确认",
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
      "key": "faea8c1db9-b68bbbe1eb-9022e",
      "type": "查看详情",
      "name": "保养作业业务入口校验",
      "label": "保养作业",
      "handler": "openFormTaskWork",
      "permission": "KeepWork",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击保养作业",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-df64bc0acc-d7f48",
      "type": "业务动作",
      "name": "打印单据业务入口校验",
      "label": "打印单据",
      "handler": "reportPrint",
      "permission": "PrintOrder",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印单据",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-bdd41ed27f-7e096",
      "type": "查看详情",
      "name": "归还业务入口校验",
      "label": "归还",
      "handler": "openTakeOut($t('归还'),2)",
      "permission": "OutReturnBack",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击归还",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
      "key": "13fd57e65b-e350ac8449-b0f93",
      "type": "新增表单",
      "name": "新增维修业务入口校验",
      "label": "新增维修",
      "handler": "openFormRepiar",
      "permission": "AddRepair",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增维修",
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
          "key": "Code",
          "label": "任务单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocationCode",
          "label": "目的储位编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "目的储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MoldInsertId",
          "label": "模具/镶件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LocationAreaName",
          "label": "储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartCode",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SolutionId",
          "label": "保养方案",
          "required": false,
          "example": "保养方案测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PartType",
          "label": "物料类型",
          "required": false,
          "example": "物料类型测试值"
        },
        {
          "key": "MoldPartId",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "RepairDesc",
          "label": "报修描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "KeepPeriodStr",
          "label": "周期类型",
          "required": false,
          "example": "周期类型测试值"
        },
        {
          "key": "MaintenanceTime",
          "label": "保养起止时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "KeepPlanName",
          "label": "保养计划名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "KeepThresholdCount",
          "label": "保养阈值",
          "required": false,
          "example": "保养阈值测试值"
        },
        {
          "key": "UsedTime",
          "label": "保养时长",
          "required": false,
          "example": "保养时长测试值"
        },
        {
          "key": "KeepResult",
          "label": "保养结果",
          "required": true,
          "example": "保养结果测试值"
        },
        {
          "key": "KeepRemark",
          "label": "保养备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "MoldInsertCode": "AT-001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "MoldInsertId": "自动化样例001",
        "LocationAreaName": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "Status": "Y",
        "SolutionId": "保养方案测试值",
        "Remark": "自动化测试备注001",
        "PartType": "物料类型测试值",
        "MoldPartId": "自动化样例001",
        "RepairDesc": "自动化测试备注001",
        "KeepPeriodStr": "周期类型测试值",
        "MaintenanceTime": "2026-08-01",
        "KeepPlanName": "自动化样例001",
        "KeepThresholdCount": "保养阈值测试值",
        "UsedTime": "保养时长测试值",
        "KeepResult": "保养结果测试值",
        "KeepRemark": "自动化测试备注001"
      }
    },
    {
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
      "permission": "Edit",
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
          "key": "Code",
          "label": "任务单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocationCode",
          "label": "目的储位编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "目的储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MoldInsertId",
          "label": "模具/镶件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LocationAreaName",
          "label": "储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartCode",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "SolutionId",
          "label": "保养方案",
          "required": false,
          "example": "保养方案测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PartType",
          "label": "物料类型",
          "required": false,
          "example": "物料类型测试值"
        },
        {
          "key": "MoldPartId",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "RepairDesc",
          "label": "报修描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "KeepPeriodStr",
          "label": "周期类型",
          "required": false,
          "example": "周期类型测试值"
        },
        {
          "key": "MaintenanceTime",
          "label": "保养起止时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "KeepPlanName",
          "label": "保养计划名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "KeepThresholdCount",
          "label": "保养阈值",
          "required": false,
          "example": "保养阈值测试值"
        },
        {
          "key": "UsedTime",
          "label": "保养时长",
          "required": false,
          "example": "保养时长测试值"
        },
        {
          "key": "KeepResult",
          "label": "保养结果",
          "required": true,
          "example": "保养结果测试值"
        },
        {
          "key": "KeepRemark",
          "label": "保养备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "MoldInsertCode": "AT-001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "MoldInsertId": "自动化样例001",
        "LocationAreaName": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "Status": "Y",
        "SolutionId": "保养方案测试值",
        "Remark": "自动化测试备注001",
        "PartType": "物料类型测试值",
        "MoldPartId": "自动化样例001",
        "RepairDesc": "自动化测试备注001",
        "KeepPeriodStr": "周期类型测试值",
        "MaintenanceTime": "2026-08-01",
        "KeepPlanName": "自动化样例001",
        "KeepThresholdCount": "保养阈值测试值",
        "UsedTime": "保养时长测试值",
        "KeepResult": "保养结果测试值",
        "KeepRemark": "自动化测试备注001"
      }
    },
    {
      "key": "faea8c1db9-dc2a51c7cb-628c7",
      "type": "查看详情",
      "name": "选择保养计划业务入口校验",
      "label": "选择保养计划",
      "handler": "openTableSelector",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击选择保养计划",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    }
  ]
});
