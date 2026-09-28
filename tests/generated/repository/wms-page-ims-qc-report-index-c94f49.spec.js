// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-report-index-c94f49",
  "name": "仓储管理 - 查看检验进度（未配置菜单）功能校验",
  "displayName": "查看检验进度（未配置菜单）",
  "route": "/ImsQcReport/Index",
  "sourceRoute": "/ImsQcReport/Index",
  "menuCode": "",
  "breadcrumb": "仓储管理 / 未配置菜单 / 查看检验进度（未配置菜单）",
  "sourceFile": "src/views/ImsQcReport/Index.vue",
  "dataSchema": {
    "columns": [
      "HiCode",
      "LotNo",
      "LotSize",
      "CreatedTime",
      "PartCode",
      "PartName",
      "PartDesc",
      "SampleSize",
      "VendorCode",
      "VendorName",
      "Remark",
      "ADefect",
      "ADefectDesc",
      "BDefect",
      "BDefectDesc",
      "CDefect",
      "CDefectDesc",
      "OtherOpinion",
      "Result",
      "Item",
      "InspectTool",
      "Standard",
      "DefectLevel",
      "DefectType",
      "V1",
      "V2",
      "V3",
      "V4",
      "V5",
      "V6",
      "V7",
      "V8",
      "V9"
    ],
    "required": [],
    "fields": [
      {
        "key": "HiCode",
        "label": "检验报告编号",
        "required": false
      },
      {
        "key": "LotNo",
        "label": "批次号",
        "required": false
      },
      {
        "key": "LotSize",
        "label": "批次量",
        "required": false
      },
      {
        "key": "CreatedTime",
        "label": "创建时间",
        "required": false
      },
      {
        "key": "PartCode",
        "label": "物料编号",
        "required": false
      },
      {
        "key": "PartName",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "物料规格",
        "required": false
      },
      {
        "key": "SampleSize",
        "label": "抽样数量",
        "required": false
      },
      {
        "key": "VendorCode",
        "label": "供应商号",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "ADefect",
        "label": "A类不良原因",
        "required": false
      },
      {
        "key": "ADefectDesc",
        "label": "A类不良描述",
        "required": false
      },
      {
        "key": "BDefect",
        "label": "B类不良原因",
        "required": false
      },
      {
        "key": "BDefectDesc",
        "label": "B类不良描述",
        "required": false
      },
      {
        "key": "CDefect",
        "label": "C类不良原因",
        "required": false
      },
      {
        "key": "CDefectDesc",
        "label": "C类不良描述",
        "required": false
      },
      {
        "key": "OtherOpinion",
        "label": "冻结/其他意见",
        "required": false
      },
      {
        "key": "Result",
        "label": "判定状态",
        "required": false
      },
      {
        "key": "Item",
        "label": "检验项目",
        "required": false
      },
      {
        "key": "InspectTool",
        "label": "检验工具",
        "required": false
      },
      {
        "key": "Standard",
        "label": "检验描述",
        "required": false
      },
      {
        "key": "DefectLevel",
        "label": "不良等级",
        "required": false
      },
      {
        "key": "DefectType",
        "label": "不良类型",
        "required": false
      },
      {
        "key": "V1",
        "label": "实例值1",
        "required": false
      },
      {
        "key": "V2",
        "label": "实例值2",
        "required": false
      },
      {
        "key": "V3",
        "label": "实例值3",
        "required": false
      },
      {
        "key": "V4",
        "label": "实例值4",
        "required": false
      },
      {
        "key": "V5",
        "label": "实例值5",
        "required": false
      },
      {
        "key": "V6",
        "label": "实例值6",
        "required": false
      },
      {
        "key": "V7",
        "label": "实例值7",
        "required": false
      },
      {
        "key": "V8",
        "label": "实例值8",
        "required": false
      },
      {
        "key": "V9",
        "label": "实例值9",
        "required": false
      }
    ],
    "example": {
      "HiCode": "AT-001",
      "LotNo": "批次号测试值",
      "LotSize": "批次量测试值",
      "CreatedTime": "2026-08-01",
      "PartCode": "AT-001",
      "PartName": "自动化样例001",
      "PartDesc": "物料规格测试值",
      "SampleSize": "1",
      "VendorCode": "供应商号测试值",
      "VendorName": "供应商测试值",
      "Remark": "自动化测试备注001",
      "ADefect": "A类不良原因测试值",
      "ADefectDesc": "自动化测试备注001",
      "BDefect": "B类不良原因测试值",
      "BDefectDesc": "自动化测试备注001",
      "CDefect": "C类不良原因测试值",
      "CDefectDesc": "自动化测试备注001",
      "OtherOpinion": "冻结/其他意见测试值",
      "Result": "Y",
      "Item": "检验项目测试值",
      "InspectTool": "检验工具测试值",
      "Standard": "自动化测试备注001",
      "DefectLevel": "不良等级测试值",
      "DefectType": "不良类型测试值",
      "V1": "实例值1测试值",
      "V2": "实例值2测试值",
      "V3": "实例值3测试值",
      "V4": "实例值4测试值",
      "V5": "实例值5测试值",
      "V6": "实例值6测试值",
      "V7": "实例值7测试值",
      "V8": "实例值8测试值",
      "V9": "实例值9测试值"
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
        "HiCode": "AT-001",
        "LotNo": "批次号测试值",
        "LotSize": "批次量测试值",
        "CreatedTime": "2026-08-01",
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "物料规格测试值",
        "SampleSize": "1",
        "VendorCode": "供应商号测试值",
        "VendorName": "供应商测试值",
        "Remark": "自动化测试备注001",
        "ADefect": "A类不良原因测试值",
        "ADefectDesc": "自动化测试备注001",
        "BDefect": "B类不良原因测试值",
        "BDefectDesc": "自动化测试备注001",
        "CDefect": "C类不良原因测试值",
        "CDefectDesc": "自动化测试备注001",
        "OtherOpinion": "冻结/其他意见测试值",
        "Result": "Y",
        "Item": "检验项目测试值",
        "InspectTool": "检验工具测试值",
        "Standard": "自动化测试备注001",
        "DefectLevel": "不良等级测试值",
        "DefectType": "不良类型测试值",
        "V1": "实例值1测试值",
        "V2": "实例值2测试值",
        "V3": "实例值3测试值",
        "V4": "实例值4测试值",
        "V5": "实例值5测试值",
        "V6": "实例值6测试值",
        "V7": "实例值7测试值",
        "V8": "实例值8测试值",
        "V9": "实例值9测试值"
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
      "key": "faea8c1db9-269d93602a-beaf4",
      "type": "查看详情",
      "name": "查看检验进度业务入口校验",
      "label": "查看检验进度",
      "handler": "rateVisible=!rateVisible",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看检验进度",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-9441fa8267-f900d",
      "type": "查看详情",
      "name": "查看图纸业务入口校验",
      "label": "查看图纸",
      "handler": "bookVisible=!bookVisible",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看图纸",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-09cbc97ae2-4b8e3",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submit()",
      "permission": "ImsQcReportDtlSubmit",
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
      "key": "7e002f9936-6dc8c7c16e-8b5f5",
      "type": "业务动作",
      "name": "保存检验标准和实例值业务入口校验",
      "label": "保存检验标准和实例值",
      "handler": "saveValue()",
      "permission": "ImsQcReportDtlSaveValue",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存检验标准和实例值",
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
