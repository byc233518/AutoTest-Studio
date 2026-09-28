// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-mst-over-day-index-bc43e9",
  "name": "仓储管理 - 检验超24小时功能校验",
  "displayName": "检验超24小时",
  "route": "/ImsQcMstOverDay/Index",
  "sourceRoute": "/ImsQcMstOverDay/Index",
  "menuCode": "ImsMstOverDay",
  "breadcrumb": "报表中心 / 来料质检报表 / 检验超24小时",
  "sourceFile": "src/views/ImsQcMstOverDay/Index.vue",
  "dataSchema": {
    "columns": [
      "HiCode",
      "PartNo",
      "PartName",
      "PartDescription",
      "VendorName",
      "CheckTxt",
      "CheckBy",
      "CrackedQty",
      "DeviceId",
      "DataType",
      "Description",
      "ErpBillType",
      "ErpBillNo",
      "EdiTime",
      "Result",
      "Remark",
      "LotNo",
      "LotSize",
      "CreatedTime",
      "PartCode",
      "PartDesc",
      "VendorCode",
      "ADefect",
      "ADefectDesc",
      "BDefect",
      "BDefectDesc",
      "CDefect",
      "CDefectDesc",
      "OtherOpinion",
      "CrackQty",
      "CrackType",
      "CrackDesc",
      "Item",
      "InspectTool",
      "SampleSize",
      "MinVal",
      "MaxVal",
      "Standard",
      "value",
      "DefectLevel",
      "DefectType",
      "ChangePartCode",
      "ChangeRemark"
    ],
    "required": [
      "CrackedQty",
      "EdiTime",
      "Result",
      "PartCode",
      "ChangePartCode"
    ],
    "fields": [
      {
        "key": "HiCode",
        "label": "检验编号",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "PartName",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "PartDescription",
        "label": "规格",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商",
        "required": false
      },
      {
        "key": "CheckTxt",
        "label": "检验文本",
        "required": false
      },
      {
        "key": "CheckBy",
        "label": "检测员",
        "required": false
      },
      {
        "key": "CrackedQty",
        "label": "破坏数量",
        "required": true
      },
      {
        "key": "DeviceId",
        "label": "设备ID",
        "required": false
      },
      {
        "key": "DataType",
        "label": "破坏类型",
        "required": false
      },
      {
        "key": "Description",
        "label": "破坏原因",
        "required": false
      },
      {
        "key": "ErpBillType",
        "label": "ERP单据类型",
        "required": false
      },
      {
        "key": "ErpBillNo",
        "label": "ERP单据编号",
        "required": false
      },
      {
        "key": "EdiTime",
        "label": "过账时间",
        "required": true
      },
      {
        "key": "Result",
        "label": "检验决策",
        "required": true
      },
      {
        "key": "Remark",
        "label": "检验备注",
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
        "label": "物料编码",
        "required": true
      },
      {
        "key": "PartDesc",
        "label": "物料规格",
        "required": false
      },
      {
        "key": "VendorCode",
        "label": "供应商编号",
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
        "label": "其他意见",
        "required": false
      },
      {
        "key": "CrackQty",
        "label": "破坏数量",
        "required": false
      },
      {
        "key": "CrackType",
        "label": "破坏类型",
        "required": false
      },
      {
        "key": "CrackDesc",
        "label": "破坏原因",
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
        "key": "SampleSize",
        "label": "样本大小",
        "required": false
      },
      {
        "key": "MinVal",
        "label": "标准范围",
        "required": false
      },
      {
        "key": "MaxVal",
        "label": "至",
        "required": false
      },
      {
        "key": "Standard",
        "label": "检验标准",
        "required": false
      },
      {
        "key": "value",
        "label": "`实例值${sindex + 1}`",
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
        "key": "ChangePartCode",
        "label": "变更料号",
        "required": true
      },
      {
        "key": "ChangeRemark",
        "label": "变更备注",
        "required": false
      }
    ],
    "example": {
      "HiCode": "AT-001",
      "PartNo": "AT-001",
      "PartName": "自动化样例001",
      "PartDescription": "规格测试值",
      "VendorName": "供应商测试值",
      "CheckTxt": "检验文本测试值",
      "CheckBy": "检测员测试值",
      "CrackedQty": "1",
      "DeviceId": "AT-001",
      "DataType": "破坏类型测试值",
      "Description": "破坏原因测试值",
      "ErpBillType": "ERP单据类型测试值",
      "ErpBillNo": "AT-001",
      "EdiTime": "2026-08-01",
      "Result": "检验决策测试值",
      "Remark": "自动化测试备注001",
      "LotNo": "批次号测试值",
      "LotSize": "批次量测试值",
      "CreatedTime": "2026-08-01",
      "PartCode": "AT-001",
      "PartDesc": "物料规格测试值",
      "VendorCode": "AT-001",
      "ADefect": "A类不良原因测试值",
      "ADefectDesc": "自动化测试备注001",
      "BDefect": "B类不良原因测试值",
      "BDefectDesc": "自动化测试备注001",
      "CDefect": "C类不良原因测试值",
      "CDefectDesc": "自动化测试备注001",
      "OtherOpinion": "其他意见测试值",
      "CrackQty": "1",
      "CrackType": "破坏类型测试值",
      "CrackDesc": "破坏原因测试值",
      "Item": "检验项目测试值",
      "InspectTool": "检验工具测试值",
      "SampleSize": "样本大小测试值",
      "MinVal": "标准范围测试值",
      "MaxVal": "至测试值",
      "Standard": "检验标准测试值",
      "value": "`实例值${sindex + 1}`测试值",
      "DefectLevel": "不良等级测试值",
      "DefectType": "不良类型测试值",
      "ChangePartCode": "AT-001",
      "ChangeRemark": "自动化测试备注001"
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
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "PartDescription": "规格测试值",
        "VendorName": "供应商测试值",
        "CheckTxt": "检验文本测试值",
        "CheckBy": "检测员测试值",
        "CrackedQty": "1",
        "DeviceId": "AT-001",
        "DataType": "破坏类型测试值",
        "Description": "破坏原因测试值",
        "ErpBillType": "ERP单据类型测试值",
        "ErpBillNo": "AT-001",
        "EdiTime": "2026-08-01",
        "Result": "检验决策测试值",
        "Remark": "自动化测试备注001",
        "LotNo": "批次号测试值",
        "LotSize": "批次量测试值",
        "CreatedTime": "2026-08-01",
        "PartCode": "AT-001",
        "PartDesc": "物料规格测试值",
        "VendorCode": "AT-001",
        "ADefect": "A类不良原因测试值",
        "ADefectDesc": "自动化测试备注001",
        "BDefect": "B类不良原因测试值",
        "BDefectDesc": "自动化测试备注001",
        "CDefect": "C类不良原因测试值",
        "CDefectDesc": "自动化测试备注001",
        "OtherOpinion": "其他意见测试值",
        "CrackQty": "1",
        "CrackType": "破坏类型测试值",
        "CrackDesc": "破坏原因测试值",
        "Item": "检验项目测试值",
        "InspectTool": "检验工具测试值",
        "SampleSize": "样本大小测试值",
        "MinVal": "标准范围测试值",
        "MaxVal": "至测试值",
        "Standard": "检验标准测试值",
        "value": "`实例值${sindex + 1}`测试值",
        "DefectLevel": "不良等级测试值",
        "DefectType": "不良类型测试值",
        "ChangePartCode": "AT-001",
        "ChangeRemark": "自动化测试备注001"
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
      "key": "ef879b4ced-9fe52643a7-49232",
      "type": "导出入口",
      "name": "导出报表业务入口校验",
      "label": "导出报表",
      "handler": "exportFile()",
      "permission": "ImsQcMstOverDayExportFile",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出报表",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-aca3f67fc7-893cc",
      "type": "业务动作",
      "name": "检验报告作业业务入口校验",
      "label": "检验报告作业",
      "handler": "toReport()",
      "permission": "ImsQcDtlReportWork",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检验报告作业",
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
      "key": "7e002f9936-9a6195d517-c8936",
      "type": "业务动作",
      "name": "检验作业业务入口校验",
      "label": "检验作业",
      "handler": "toCheck()",
      "permission": "ImsQcMstCheckWork",
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
      "key": "7e002f9936-09cbc97ae2-33beb",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submit(0)",
      "permission": "ImsQcReelSubmit",
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
      "key": "7e002f9936-66fb3d12ed-a8b93",
      "type": "业务动作",
      "name": "单边提交业务入口校验",
      "label": "单边提交",
      "handler": "submit(1)",
      "permission": "ImsQcReelSubmit",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位单边提交",
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
      "key": "7e002f9936-89bd1c6c15-bda28",
      "type": "业务动作",
      "name": "切分条码业务入口校验",
      "label": "切分条码",
      "handler": "DoCut",
      "permission": "ImsQcReelCut",
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
      "key": "7e002f9936-3c977df7ce-6d0d5",
      "type": "业务动作",
      "name": "打印业务入口校验",
      "label": "打印",
      "handler": "print",
      "permission": "ImsQcReelPrint",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-269d93602a-ae877",
      "type": "查看详情",
      "name": "查看检验进度业务入口校验",
      "label": "查看检验进度",
      "handler": "rateVisible = !rateVisible",
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
      "key": "faea8c1db9-9441fa8267-4f71b",
      "type": "查看详情",
      "name": "查看图纸业务入口校验",
      "label": "查看图纸",
      "handler": "bookVisible = !bookVisible",
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
      "key": "7e002f9936-7a93a0b24b-8b5f5",
      "type": "业务动作",
      "name": "保存当前项次检验标准业务入口校验",
      "label": "保存当前项次检验标准",
      "handler": "saveValue()",
      "permission": "ImsQcReportDtlSaveValue",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存当前项次检验标准",
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
