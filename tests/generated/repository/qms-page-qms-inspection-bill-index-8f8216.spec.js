// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-qms-inspection-bill-index-8f8216",
  "name": "质量管理 - 仓库检验作业功能校验",
  "displayName": "仓库检验作业",
  "route": "/QMS/InspectionBill/index",
  "sourceRoute": "/QMS/InspectionBill/index",
  "menuCode": "IqcInspection",
  "breadcrumb": "功能菜单（QMS2） / 检验作业 / 仓库检验作业",
  "sourceFile": "src/views/QMS/InspectionBill/index.vue",
  "dataSchema": {
    "columns": [
      "inspectionTypeName",
      "IsUrgent",
      "IsTrial",
      "RefNo",
      "RefType",
      "PartNo",
      "PartId",
      "PartSpec",
      "PartClass",
      "LotNo",
      "RefQty",
      "VendorCode",
      "VendorId",
      "statusName",
      "StandardId",
      "Remarks",
      "InspectionTypeName",
      "InspectionNo",
      "PartName",
      "VendorName",
      "InspectorName",
      "InspectionTime",
      "SampleQty",
      "DefectQty",
      "DestroyQty",
      "AuditResult",
      "AcceptQty",
      "RejectQty",
      "workSummary",
      "standardRangeText",
      "InspectionStandard",
      "ChangeRefNo",
      "ChangeRemarks"
    ],
    "required": [
      "PartId",
      "RefQty",
      "VendorId"
    ],
    "fields": [
      {
        "key": "inspectionTypeName",
        "label": "检验类型",
        "required": false
      },
      {
        "key": "IsUrgent",
        "label": "是否紧急",
        "required": false
      },
      {
        "key": "IsTrial",
        "label": "试用标识",
        "required": false
      },
      {
        "key": "RefNo",
        "label": "关联单号",
        "required": false
      },
      {
        "key": "RefType",
        "label": "关联单号类型",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "PartId",
        "label": "物料名称",
        "required": true
      },
      {
        "key": "PartSpec",
        "label": "物料规格",
        "required": false
      },
      {
        "key": "PartClass",
        "label": "物料分组",
        "required": false
      },
      {
        "key": "LotNo",
        "label": "批次号",
        "required": false
      },
      {
        "key": "RefQty",
        "label": "送检数",
        "required": true
      },
      {
        "key": "VendorCode",
        "label": "供应商编码",
        "required": false
      },
      {
        "key": "VendorId",
        "label": "供应商名称",
        "required": true
      },
      {
        "key": "statusName",
        "label": "状态",
        "required": false
      },
      {
        "key": "StandardId",
        "label": "抽样标准",
        "required": false
      },
      {
        "key": "Remarks",
        "label": "备注",
        "required": false
      },
      {
        "key": "InspectionTypeName",
        "label": "检验类型",
        "required": false
      },
      {
        "key": "InspectionNo",
        "label": "检验单号",
        "required": false
      },
      {
        "key": "PartName",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商名称",
        "required": false
      },
      {
        "key": "InspectorName",
        "label": "检验员",
        "required": false
      },
      {
        "key": "InspectionTime",
        "label": "检验时间",
        "required": false
      },
      {
        "key": "SampleQty",
        "label": "应抽数",
        "required": false
      },
      {
        "key": "DefectQty",
        "label": "不良数量",
        "required": false
      },
      {
        "key": "DestroyQty",
        "label": "破坏数量",
        "required": false
      },
      {
        "key": "AuditResult",
        "label": "检验决策",
        "required": false
      },
      {
        "key": "AcceptQty",
        "label": "宽收数量",
        "required": false
      },
      {
        "key": "RejectQty",
        "label": "拒收数量",
        "required": false
      },
      {
        "key": "workSummary",
        "label": "作业情况",
        "required": false
      },
      {
        "key": "standardRangeText",
        "label": "标准范围",
        "required": false
      },
      {
        "key": "InspectionStandard",
        "label": "检验标准",
        "required": false
      },
      {
        "key": "ChangeRefNo",
        "label": "变更料号",
        "required": false
      },
      {
        "key": "ChangeRemarks",
        "label": "变更备注",
        "required": false
      }
    ],
    "example": {
      "inspectionTypeName": "检验类型测试值",
      "IsUrgent": "是否紧急测试值",
      "IsTrial": "试用标识测试值",
      "RefNo": "AT-001",
      "RefType": "关联单号类型测试值",
      "PartNo": "AT-001",
      "PartId": "自动化样例001",
      "PartSpec": "物料规格测试值",
      "PartClass": "物料分组测试值",
      "LotNo": "批次号测试值",
      "RefQty": "送检数测试值",
      "VendorCode": "AT-001",
      "VendorId": "自动化样例001",
      "statusName": "Y",
      "StandardId": "抽样标准测试值",
      "Remarks": "自动化测试备注001",
      "InspectionTypeName": "检验类型测试值",
      "InspectionNo": "AT-001",
      "PartName": "自动化样例001",
      "VendorName": "自动化样例001",
      "InspectorName": "检验员测试值",
      "InspectionTime": "2026-08-01",
      "SampleQty": "应抽数测试值",
      "DefectQty": "1",
      "DestroyQty": "1",
      "AuditResult": "检验决策测试值",
      "AcceptQty": "1",
      "RejectQty": "1",
      "workSummary": "作业情况测试值",
      "standardRangeText": "标准范围测试值",
      "InspectionStandard": "检验标准测试值",
      "ChangeRefNo": "AT-001",
      "ChangeRemarks": "自动化测试备注001"
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
        "inspectionTypeName": "检验类型测试值",
        "IsUrgent": "是否紧急测试值",
        "IsTrial": "试用标识测试值",
        "RefNo": "AT-001",
        "RefType": "关联单号类型测试值",
        "PartNo": "AT-001",
        "PartId": "自动化样例001",
        "PartSpec": "物料规格测试值",
        "PartClass": "物料分组测试值",
        "LotNo": "批次号测试值",
        "RefQty": "送检数测试值",
        "VendorCode": "AT-001",
        "VendorId": "自动化样例001",
        "statusName": "Y",
        "StandardId": "抽样标准测试值",
        "Remarks": "自动化测试备注001",
        "InspectionTypeName": "检验类型测试值",
        "InspectionNo": "AT-001",
        "PartName": "自动化样例001",
        "VendorName": "自动化样例001",
        "InspectorName": "检验员测试值",
        "InspectionTime": "2026-08-01",
        "SampleQty": "应抽数测试值",
        "DefectQty": "1",
        "DestroyQty": "1",
        "AuditResult": "检验决策测试值",
        "AcceptQty": "1",
        "RejectQty": "1",
        "workSummary": "作业情况测试值",
        "standardRangeText": "标准范围测试值",
        "InspectionStandard": "检验标准测试值",
        "ChangeRefNo": "AT-001",
        "ChangeRemarks": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-2dae2",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor()",
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
          "key": "inspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "IsUrgent",
          "label": "是否紧急",
          "required": false,
          "example": "是否紧急测试值"
        },
        {
          "key": "IsTrial",
          "label": "试用标识",
          "required": false,
          "example": "试用标识测试值"
        },
        {
          "key": "RefNo",
          "label": "关联单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "RefType",
          "label": "关联单号类型",
          "required": false,
          "example": "关联单号类型测试值"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartId",
          "label": "物料名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartSpec",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PartClass",
          "label": "物料分组",
          "required": false,
          "example": "物料分组测试值"
        },
        {
          "key": "LotNo",
          "label": "批次号",
          "required": false,
          "example": "批次号测试值"
        },
        {
          "key": "RefQty",
          "label": "送检数",
          "required": true,
          "example": "送检数测试值"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorId",
          "label": "供应商名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "statusName",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "StandardId",
          "label": "抽样标准",
          "required": false,
          "example": "抽样标准测试值"
        },
        {
          "key": "Remarks",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "InspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "InspectionNo",
          "label": "检验单号",
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
          "key": "VendorName",
          "label": "供应商名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "InspectorName",
          "label": "检验员",
          "required": false,
          "example": "检验员测试值"
        },
        {
          "key": "InspectionTime",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "SampleQty",
          "label": "应抽数",
          "required": false,
          "example": "应抽数测试值"
        },
        {
          "key": "DefectQty",
          "label": "不良数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DestroyQty",
          "label": "破坏数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "AuditResult",
          "label": "检验决策",
          "required": false,
          "example": "检验决策测试值"
        },
        {
          "key": "AcceptQty",
          "label": "宽收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "RejectQty",
          "label": "拒收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "workSummary",
          "label": "作业情况",
          "required": false,
          "example": "作业情况测试值"
        },
        {
          "key": "standardRangeText",
          "label": "标准范围",
          "required": false,
          "example": "标准范围测试值"
        },
        {
          "key": "InspectionStandard",
          "label": "检验标准",
          "required": false,
          "example": "检验标准测试值"
        },
        {
          "key": "ChangeRefNo",
          "label": "变更料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ChangeRemarks",
          "label": "变更备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "inspectionTypeName": "检验类型测试值",
        "IsUrgent": "是否紧急测试值",
        "IsTrial": "试用标识测试值",
        "RefNo": "AT-001",
        "RefType": "关联单号类型测试值",
        "PartNo": "AT-001",
        "PartId": "自动化样例001",
        "PartSpec": "物料规格测试值",
        "PartClass": "物料分组测试值",
        "LotNo": "批次号测试值",
        "RefQty": "送检数测试值",
        "VendorCode": "AT-001",
        "VendorId": "自动化样例001",
        "statusName": "Y",
        "StandardId": "抽样标准测试值",
        "Remarks": "自动化测试备注001",
        "InspectionTypeName": "检验类型测试值",
        "InspectionNo": "AT-001",
        "PartName": "自动化样例001",
        "VendorName": "自动化样例001",
        "InspectorName": "检验员测试值",
        "InspectionTime": "2026-08-01",
        "SampleQty": "应抽数测试值",
        "DefectQty": "1",
        "DestroyQty": "1",
        "AuditResult": "检验决策测试值",
        "AcceptQty": "1",
        "RejectQty": "1",
        "workSummary": "作业情况测试值",
        "standardRangeText": "标准范围测试值",
        "InspectionStandard": "检验标准测试值",
        "ChangeRefNo": "AT-001",
        "ChangeRemarks": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-11ff8",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(row)",
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
      "key": "13fd57e65b-d22ba317af-c77a0",
      "type": "新增表单",
      "name": "创建检验报告业务入口校验",
      "label": "创建检验报告",
      "handler": "handleCreateReport()",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击创建检验报告",
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
          "key": "inspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "IsUrgent",
          "label": "是否紧急",
          "required": false,
          "example": "是否紧急测试值"
        },
        {
          "key": "IsTrial",
          "label": "试用标识",
          "required": false,
          "example": "试用标识测试值"
        },
        {
          "key": "RefNo",
          "label": "关联单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "RefType",
          "label": "关联单号类型",
          "required": false,
          "example": "关联单号类型测试值"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartId",
          "label": "物料名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartSpec",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PartClass",
          "label": "物料分组",
          "required": false,
          "example": "物料分组测试值"
        },
        {
          "key": "LotNo",
          "label": "批次号",
          "required": false,
          "example": "批次号测试值"
        },
        {
          "key": "RefQty",
          "label": "送检数",
          "required": true,
          "example": "送检数测试值"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorId",
          "label": "供应商名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "statusName",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "StandardId",
          "label": "抽样标准",
          "required": false,
          "example": "抽样标准测试值"
        },
        {
          "key": "Remarks",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "InspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "InspectionNo",
          "label": "检验单号",
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
          "key": "VendorName",
          "label": "供应商名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "InspectorName",
          "label": "检验员",
          "required": false,
          "example": "检验员测试值"
        },
        {
          "key": "InspectionTime",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "SampleQty",
          "label": "应抽数",
          "required": false,
          "example": "应抽数测试值"
        },
        {
          "key": "DefectQty",
          "label": "不良数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DestroyQty",
          "label": "破坏数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "AuditResult",
          "label": "检验决策",
          "required": false,
          "example": "检验决策测试值"
        },
        {
          "key": "AcceptQty",
          "label": "宽收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "RejectQty",
          "label": "拒收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "workSummary",
          "label": "作业情况",
          "required": false,
          "example": "作业情况测试值"
        },
        {
          "key": "standardRangeText",
          "label": "标准范围",
          "required": false,
          "example": "标准范围测试值"
        },
        {
          "key": "InspectionStandard",
          "label": "检验标准",
          "required": false,
          "example": "检验标准测试值"
        },
        {
          "key": "ChangeRefNo",
          "label": "变更料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ChangeRemarks",
          "label": "变更备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "inspectionTypeName": "检验类型测试值",
        "IsUrgent": "是否紧急测试值",
        "IsTrial": "试用标识测试值",
        "RefNo": "AT-001",
        "RefType": "关联单号类型测试值",
        "PartNo": "AT-001",
        "PartId": "自动化样例001",
        "PartSpec": "物料规格测试值",
        "PartClass": "物料分组测试值",
        "LotNo": "批次号测试值",
        "RefQty": "送检数测试值",
        "VendorCode": "AT-001",
        "VendorId": "自动化样例001",
        "statusName": "Y",
        "StandardId": "抽样标准测试值",
        "Remarks": "自动化测试备注001",
        "InspectionTypeName": "检验类型测试值",
        "InspectionNo": "AT-001",
        "PartName": "自动化样例001",
        "VendorName": "自动化样例001",
        "InspectorName": "检验员测试值",
        "InspectionTime": "2026-08-01",
        "SampleQty": "应抽数测试值",
        "DefectQty": "1",
        "DestroyQty": "1",
        "AuditResult": "检验决策测试值",
        "AcceptQty": "1",
        "RejectQty": "1",
        "workSummary": "作业情况测试值",
        "standardRangeText": "标准范围测试值",
        "InspectionStandard": "检验标准测试值",
        "ChangeRefNo": "AT-001",
        "ChangeRemarks": "自动化测试备注001"
      }
    },
    {
      "key": "7e002f9936-9a6195d517-d29ff",
      "type": "业务动作",
      "name": "检验作业业务入口校验",
      "label": "检验作业",
      "handler": "handleInspection()",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检验作业",
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
      "key": "7e002f9936-486596a11a-0b677",
      "type": "业务动作",
      "name": "检验提交业务入口校验",
      "label": "检验提交",
      "handler": "handleSubmitReport()",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检验提交",
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
      "key": "ef879b4ced-87775b1430-e0567",
      "type": "导出入口",
      "name": "下载报告业务入口校验",
      "label": "下载报告",
      "handler": "handleDownloadReport()",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载报告",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-b93a6f04ed-40240",
      "type": "业务动作",
      "name": "条码作业业务入口校验",
      "label": "条码作业",
      "handler": "handleBarcodeWork()",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击条码作业",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-f7acefd2d4-da32c",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormEditor(row, true)",
      "permission": "",
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
          "key": "inspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "IsUrgent",
          "label": "是否紧急",
          "required": false,
          "example": "是否紧急测试值"
        },
        {
          "key": "IsTrial",
          "label": "试用标识",
          "required": false,
          "example": "试用标识测试值"
        },
        {
          "key": "RefNo",
          "label": "关联单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "RefType",
          "label": "关联单号类型",
          "required": false,
          "example": "关联单号类型测试值"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartId",
          "label": "物料名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartSpec",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PartClass",
          "label": "物料分组",
          "required": false,
          "example": "物料分组测试值"
        },
        {
          "key": "LotNo",
          "label": "批次号",
          "required": false,
          "example": "批次号测试值"
        },
        {
          "key": "RefQty",
          "label": "送检数",
          "required": true,
          "example": "送检数测试值"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorId",
          "label": "供应商名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "statusName",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "StandardId",
          "label": "抽样标准",
          "required": false,
          "example": "抽样标准测试值"
        },
        {
          "key": "Remarks",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "InspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "InspectionNo",
          "label": "检验单号",
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
          "key": "VendorName",
          "label": "供应商名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "InspectorName",
          "label": "检验员",
          "required": false,
          "example": "检验员测试值"
        },
        {
          "key": "InspectionTime",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "SampleQty",
          "label": "应抽数",
          "required": false,
          "example": "应抽数测试值"
        },
        {
          "key": "DefectQty",
          "label": "不良数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DestroyQty",
          "label": "破坏数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "AuditResult",
          "label": "检验决策",
          "required": false,
          "example": "检验决策测试值"
        },
        {
          "key": "AcceptQty",
          "label": "宽收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "RejectQty",
          "label": "拒收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "workSummary",
          "label": "作业情况",
          "required": false,
          "example": "作业情况测试值"
        },
        {
          "key": "standardRangeText",
          "label": "标准范围",
          "required": false,
          "example": "标准范围测试值"
        },
        {
          "key": "InspectionStandard",
          "label": "检验标准",
          "required": false,
          "example": "检验标准测试值"
        },
        {
          "key": "ChangeRefNo",
          "label": "变更料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ChangeRemarks",
          "label": "变更备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "inspectionTypeName": "检验类型测试值",
        "IsUrgent": "是否紧急测试值",
        "IsTrial": "试用标识测试值",
        "RefNo": "AT-001",
        "RefType": "关联单号类型测试值",
        "PartNo": "AT-001",
        "PartId": "自动化样例001",
        "PartSpec": "物料规格测试值",
        "PartClass": "物料分组测试值",
        "LotNo": "批次号测试值",
        "RefQty": "送检数测试值",
        "VendorCode": "AT-001",
        "VendorId": "自动化样例001",
        "statusName": "Y",
        "StandardId": "抽样标准测试值",
        "Remarks": "自动化测试备注001",
        "InspectionTypeName": "检验类型测试值",
        "InspectionNo": "AT-001",
        "PartName": "自动化样例001",
        "VendorName": "自动化样例001",
        "InspectorName": "检验员测试值",
        "InspectionTime": "2026-08-01",
        "SampleQty": "应抽数测试值",
        "DefectQty": "1",
        "DestroyQty": "1",
        "AuditResult": "检验决策测试值",
        "AcceptQty": "1",
        "RejectQty": "1",
        "workSummary": "作业情况测试值",
        "standardRangeText": "标准范围测试值",
        "InspectionStandard": "检验标准测试值",
        "ChangeRefNo": "AT-001",
        "ChangeRemarks": "自动化测试备注001"
      }
    },
    {
      "key": "7e002f9936-3cf040a2cc-22214",
      "type": "业务动作",
      "name": "检验完成业务入口校验",
      "label": "检验完成",
      "handler": "handleComplete",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检验完成",
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
      "key": "7e002f9936-31244a0728-a2a19",
      "type": "业务动作",
      "name": "完成并提交业务入口校验",
      "label": "完成并提交",
      "handler": "handleCompleteAndSubmit",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位完成并提交",
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
      "key": "faea8c1db9-c61eaaa579-ec35c",
      "type": "查看详情",
      "name": "查看检验文件业务入口校验",
      "label": "查看检验文件",
      "handler": "handleViewFile",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看检验文件",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-eb99028a7a-58bd3",
      "type": "新增表单",
      "name": "添加检验项目业务入口校验",
      "label": "添加检验项目",
      "handler": "handleAddItem",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加检验项目",
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
          "key": "inspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "IsUrgent",
          "label": "是否紧急",
          "required": false,
          "example": "是否紧急测试值"
        },
        {
          "key": "IsTrial",
          "label": "试用标识",
          "required": false,
          "example": "试用标识测试值"
        },
        {
          "key": "RefNo",
          "label": "关联单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "RefType",
          "label": "关联单号类型",
          "required": false,
          "example": "关联单号类型测试值"
        },
        {
          "key": "PartNo",
          "label": "物料编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartId",
          "label": "物料名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartSpec",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "PartClass",
          "label": "物料分组",
          "required": false,
          "example": "物料分组测试值"
        },
        {
          "key": "LotNo",
          "label": "批次号",
          "required": false,
          "example": "批次号测试值"
        },
        {
          "key": "RefQty",
          "label": "送检数",
          "required": true,
          "example": "送检数测试值"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "VendorId",
          "label": "供应商名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "statusName",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "StandardId",
          "label": "抽样标准",
          "required": false,
          "example": "抽样标准测试值"
        },
        {
          "key": "Remarks",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "InspectionTypeName",
          "label": "检验类型",
          "required": false,
          "example": "检验类型测试值"
        },
        {
          "key": "InspectionNo",
          "label": "检验单号",
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
          "key": "VendorName",
          "label": "供应商名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "InspectorName",
          "label": "检验员",
          "required": false,
          "example": "检验员测试值"
        },
        {
          "key": "InspectionTime",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "SampleQty",
          "label": "应抽数",
          "required": false,
          "example": "应抽数测试值"
        },
        {
          "key": "DefectQty",
          "label": "不良数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DestroyQty",
          "label": "破坏数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "AuditResult",
          "label": "检验决策",
          "required": false,
          "example": "检验决策测试值"
        },
        {
          "key": "AcceptQty",
          "label": "宽收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "RejectQty",
          "label": "拒收数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "workSummary",
          "label": "作业情况",
          "required": false,
          "example": "作业情况测试值"
        },
        {
          "key": "standardRangeText",
          "label": "标准范围",
          "required": false,
          "example": "标准范围测试值"
        },
        {
          "key": "InspectionStandard",
          "label": "检验标准",
          "required": false,
          "example": "检验标准测试值"
        },
        {
          "key": "ChangeRefNo",
          "label": "变更料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ChangeRemarks",
          "label": "变更备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "inspectionTypeName": "检验类型测试值",
        "IsUrgent": "是否紧急测试值",
        "IsTrial": "试用标识测试值",
        "RefNo": "AT-001",
        "RefType": "关联单号类型测试值",
        "PartNo": "AT-001",
        "PartId": "自动化样例001",
        "PartSpec": "物料规格测试值",
        "PartClass": "物料分组测试值",
        "LotNo": "批次号测试值",
        "RefQty": "送检数测试值",
        "VendorCode": "AT-001",
        "VendorId": "自动化样例001",
        "statusName": "Y",
        "StandardId": "抽样标准测试值",
        "Remarks": "自动化测试备注001",
        "InspectionTypeName": "检验类型测试值",
        "InspectionNo": "AT-001",
        "PartName": "自动化样例001",
        "VendorName": "自动化样例001",
        "InspectorName": "检验员测试值",
        "InspectionTime": "2026-08-01",
        "SampleQty": "应抽数测试值",
        "DefectQty": "1",
        "DestroyQty": "1",
        "AuditResult": "检验决策测试值",
        "AcceptQty": "1",
        "RejectQty": "1",
        "workSummary": "作业情况测试值",
        "standardRangeText": "标准范围测试值",
        "InspectionStandard": "检验标准测试值",
        "ChangeRefNo": "AT-001",
        "ChangeRemarks": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-7f9e8783d7-1c0d1",
      "type": "删除确认",
      "name": "删除检验项目确认框与取消操作",
      "label": "删除检验项目",
      "handler": "handleDeleteItems",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除检验项目",
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
      "key": "7e002f9936-66f2b8b09f-63d6a",
      "type": "业务动作",
      "name": "保存结果业务入口校验",
      "label": "保存结果",
      "handler": "handleSaveItem",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存结果",
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
      "key": "5f1787916c-59b308c817-b3695",
      "type": "导入入口",
      "name": "上传图片业务入口校验",
      "label": "上传图片",
      "handler": "handleUploadImage",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
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
      "key": "7e002f9936-09cbc97ae2-11727",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "handleSubmit",
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
      "key": "7e002f9936-89bd1c6c15-f8bb4",
      "type": "业务动作",
      "name": "切分条码业务入口校验",
      "label": "切分条码",
      "handler": "handleSplit",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位切分条码",
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
      "key": "7e002f9936-d025c802d0-04c89",
      "type": "业务动作",
      "name": "打印条码业务入口校验",
      "label": "打印条码",
      "handler": "handlePrint",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印条码",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    }
  ]
});
