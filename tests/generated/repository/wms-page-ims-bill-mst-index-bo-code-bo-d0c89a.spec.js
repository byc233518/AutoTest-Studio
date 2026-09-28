// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-bill-mst-index-bo-code-bo-d0c89a",
  "name": "仓储管理 - 借出领料功能校验",
  "displayName": "借出领料",
  "route": "/ImsBillMst/Index/BO?code=BO",
  "sourceRoute": "/ImsBillMst/Index",
  "menuCode": "ImsLendAllocation",
  "breadcrumb": "仓库管理 / 发料调拨 / 借出领料",
  "sourceFile": "src/views/ImsBillMst/Index.vue",
  "dataSchema": {
    "columns": [
      "Mo",
      "PLSicID",
      "Description",
      "FromMo",
      "ToMo",
      "BillType",
      "Code",
      "CompanyName",
      "VendorName",
      "Status",
      "Lock",
      "Locator",
      "Pallet",
      "Reel",
      "PartNo",
      "LotCode",
      "Qty",
      "DateCode",
      "CustomerPn",
      "Mpq",
      "MadeIn",
      "MakerPn",
      "MakerName",
      "DeptName",
      "StartDate",
      "PoNo",
      "PartCode",
      "SoNo",
      "MoPartNo",
      "PlanDate",
      "Att4",
      "MoPartName",
      "MoPartDesc",
      "moDtlFormExtraDataSicId",
      "SicId",
      "Data",
      "Keyword",
      "localData",
      "LineQty",
      "searchDt",
      "FromSicCode",
      "reel_code",
      "date_code",
      "lot_code",
      "asn_no",
      "rcv_no",
      "des_locator",
      "InBillCode",
      "ReelCode",
      "SicCode",
      "BuCode",
      "LocatorCode",
      "RsvedQty",
      "Bin",
      "Sic"
    ],
    "required": [
      "Mo",
      "PLSicID",
      "FromMo",
      "ToMo",
      "Qty",
      "Data"
    ],
    "fields": [
      {
        "key": "Mo",
        "label": "工单",
        "required": true
      },
      {
        "key": "PLSicID",
        "label": "线边仓",
        "required": true
      },
      {
        "key": "Description",
        "label": "备注",
        "required": false
      },
      {
        "key": "FromMo",
        "label": "挪出工单",
        "required": true
      },
      {
        "key": "ToMo",
        "label": "挪入工单",
        "required": true
      },
      {
        "key": "BillType",
        "label": "单据类别",
        "required": false
      },
      {
        "key": "Code",
        "label": "单据编号",
        "required": false
      },
      {
        "key": "CompanyName",
        "label": "公司",
        "required": false
      },
      {
        "key": "VendorName",
        "label": "供应商",
        "required": false
      },
      {
        "key": "Status",
        "label": "单据状态",
        "required": false
      },
      {
        "key": "Lock",
        "label": "锁定",
        "required": false
      },
      {
        "key": "Locator",
        "label": "储位",
        "required": false
      },
      {
        "key": "Pallet",
        "label": "目的栈板",
        "required": false
      },
      {
        "key": "Reel",
        "label": "供应商来料条码",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "LotCode",
        "label": "批次",
        "required": false
      },
      {
        "key": "Qty",
        "label": "物料数量",
        "required": true
      },
      {
        "key": "DateCode",
        "label": "制造日期",
        "required": false
      },
      {
        "key": "CustomerPn",
        "label": "客户料号",
        "required": false
      },
      {
        "key": "Mpq",
        "label": "最小包装量",
        "required": false
      },
      {
        "key": "MadeIn",
        "label": "原产国",
        "required": false
      },
      {
        "key": "MakerPn",
        "label": "制造商料号",
        "required": false
      },
      {
        "key": "MakerName",
        "label": "制造商",
        "required": false
      },
      {
        "key": "DeptName",
        "label": "部门",
        "required": false
      },
      {
        "key": "StartDate",
        "label": "开工日期",
        "required": false
      },
      {
        "key": "PoNo",
        "label": "采购订单号",
        "required": false
      },
      {
        "key": "PartCode",
        "label": "料号",
        "required": false
      },
      {
        "key": "SoNo",
        "label": "销售订单号",
        "required": false
      },
      {
        "key": "MoPartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "PlanDate",
        "label": "生产计划日期",
        "required": false
      },
      {
        "key": "Att4",
        "label": "委外订单号",
        "required": false
      },
      {
        "key": "MoPartName",
        "label": "成品名称",
        "required": false
      },
      {
        "key": "MoPartDesc",
        "label": "成品规格型号",
        "required": false
      },
      {
        "key": "moDtlFormExtraDataSicId",
        "label": "库别",
        "required": false
      },
      {
        "key": "SicId",
        "label": "库别",
        "required": false
      },
      {
        "key": "Data",
        "label": "输入关键字搜索",
        "required": true
      },
      {
        "key": "Keyword",
        "label": "输入关键字搜索",
        "required": false
      },
      {
        "key": "localData",
        "label": "物料编码",
        "required": false
      },
      {
        "key": "LineQty",
        "label": "当前行需要的物料数量",
        "required": false
      },
      {
        "key": "searchDt",
        "label": "单号",
        "required": false
      },
      {
        "key": "FromSicCode",
        "label": "库别编码",
        "required": false
      },
      {
        "key": "reel_code",
        "label": "输入条码",
        "required": false
      },
      {
        "key": "date_code",
        "label": "生产日期",
        "required": false
      },
      {
        "key": "lot_code",
        "label": "输入生产批次",
        "required": false
      },
      {
        "key": "asn_no",
        "label": "采购入库单号",
        "required": false
      },
      {
        "key": "rcv_no",
        "label": "最后收料单号",
        "required": false
      },
      {
        "key": "des_locator",
        "label": "目的储位",
        "required": false
      },
      {
        "key": "InBillCode",
        "label": "入库单号",
        "required": false
      },
      {
        "key": "ReelCode",
        "label": "条码",
        "required": false
      },
      {
        "key": "SicCode",
        "label": "库位",
        "required": false
      },
      {
        "key": "BuCode",
        "label": "厂部",
        "required": false
      },
      {
        "key": "LocatorCode",
        "label": "输入储位",
        "required": false
      },
      {
        "key": "RsvedQty",
        "label": "预约数量",
        "required": false
      },
      {
        "key": "Bin",
        "label": "BIN值",
        "required": false
      },
      {
        "key": "Sic",
        "label": "库别",
        "required": false
      }
    ],
    "example": {
      "Mo": "工单测试值",
      "PLSicID": "线边仓测试值",
      "Description": "自动化测试备注001",
      "FromMo": "挪出工单测试值",
      "ToMo": "挪入工单测试值",
      "BillType": "单据类别测试值",
      "Code": "AT-001",
      "CompanyName": "公司测试值",
      "VendorName": "供应商测试值",
      "Status": "Y",
      "Lock": "锁定测试值",
      "Locator": "储位测试值",
      "Pallet": "目的栈板测试值",
      "Reel": "AT-001",
      "PartNo": "AT-001",
      "LotCode": "批次测试值",
      "Qty": "1",
      "DateCode": "2026-08-01",
      "CustomerPn": "AT-001",
      "Mpq": "最小包装量测试值",
      "MadeIn": "原产国测试值",
      "MakerPn": "AT-001",
      "MakerName": "制造商测试值",
      "DeptName": "部门测试值",
      "StartDate": "2026-08-01",
      "PoNo": "AT-001",
      "PartCode": "AT-001",
      "SoNo": "AT-001",
      "MoPartNo": "AT-001",
      "PlanDate": "2026-08-01",
      "Att4": "AT-001",
      "MoPartName": "自动化样例001",
      "MoPartDesc": "成品规格型号测试值",
      "moDtlFormExtraDataSicId": "库别测试值",
      "SicId": "库别测试值",
      "Data": "输入关键字搜索测试值",
      "Keyword": "输入关键字搜索测试值",
      "localData": "AT-001",
      "LineQty": "1",
      "searchDt": "AT-001",
      "FromSicCode": "AT-001",
      "reel_code": "AT-001",
      "date_code": "2026-08-01",
      "lot_code": "输入生产批次测试值",
      "asn_no": "AT-001",
      "rcv_no": "AT-001",
      "des_locator": "目的储位测试值",
      "InBillCode": "AT-001",
      "ReelCode": "AT-001",
      "SicCode": "库位测试值",
      "BuCode": "厂部测试值",
      "LocatorCode": "输入储位测试值",
      "RsvedQty": "1",
      "Bin": "BIN值测试值",
      "Sic": "库别测试值"
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
        "查询",
        "搜索"
      ],
      "trigger": "button",
      "sourceHandlers": [
        "search",
        "searchClick",
        "getImsBillDtlData()",
        "getIssueStockList()",
        "search()",
        "GetPartStockList()",
        "getStockList()"
      ],
      "testData": {
        "Mo": "工单测试值",
        "PLSicID": "线边仓测试值",
        "Description": "自动化测试备注001",
        "FromMo": "挪出工单测试值",
        "ToMo": "挪入工单测试值",
        "BillType": "单据类别测试值",
        "Code": "AT-001",
        "CompanyName": "公司测试值",
        "VendorName": "供应商测试值",
        "Status": "Y",
        "Lock": "锁定测试值",
        "Locator": "储位测试值",
        "Pallet": "目的栈板测试值",
        "Reel": "AT-001",
        "PartNo": "AT-001",
        "LotCode": "批次测试值",
        "Qty": "1",
        "DateCode": "2026-08-01",
        "CustomerPn": "AT-001",
        "Mpq": "最小包装量测试值",
        "MadeIn": "原产国测试值",
        "MakerPn": "AT-001",
        "MakerName": "制造商测试值",
        "DeptName": "部门测试值",
        "StartDate": "2026-08-01",
        "PoNo": "AT-001",
        "PartCode": "AT-001",
        "SoNo": "AT-001",
        "MoPartNo": "AT-001",
        "PlanDate": "2026-08-01",
        "Att4": "AT-001",
        "MoPartName": "自动化样例001",
        "MoPartDesc": "成品规格型号测试值",
        "moDtlFormExtraDataSicId": "库别测试值",
        "SicId": "库别测试值",
        "Data": "输入关键字搜索测试值",
        "Keyword": "输入关键字搜索测试值",
        "localData": "AT-001",
        "LineQty": "1",
        "searchDt": "AT-001",
        "FromSicCode": "AT-001",
        "reel_code": "AT-001",
        "date_code": "2026-08-01",
        "lot_code": "输入生产批次测试值",
        "asn_no": "AT-001",
        "rcv_no": "AT-001",
        "des_locator": "目的储位测试值",
        "InBillCode": "AT-001",
        "ReelCode": "AT-001",
        "SicCode": "库位测试值",
        "BuCode": "厂部测试值",
        "LocatorCode": "输入储位测试值",
        "RsvedQty": "1",
        "Bin": "BIN值测试值",
        "Sic": "库别测试值"
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
      "key": "3d81345303-3d81345303-91ef0",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "reset",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "runtime-business-buttons",
      "type": "运行时业务按钮",
      "name": "运行时权限业务按钮加载校验",
      "executionPolicy": "只读校验",
      "steps": [
        "读取当前菜单和账号真实渲染的权限按钮",
        "排除查询和重置按钮",
        "自动执行导出、下载、打印或查看等只读动作",
        "其他可能写数据的动作只验证入口"
      ],
      "assertions": [
        "至少一个运行时业务按钮可见且可用",
        "只读动作产生下载、请求或界面反馈"
      ],
      "sourceCandidates": [
        {
          "label": "新增",
          "handler": "add",
          "permission": ""
        },
        {
          "label": "确认收料",
          "handler": "receive",
          "permission": ""
        },
        {
          "label": "捡料作业",
          "handler": "partIssue",
          "permission": ""
        },
        {
          "label": "确认关单",
          "handler": "issueClose",
          "permission": ""
        },
        {
          "label": "工单合并下推",
          "handler": "openSrcCreateIOModal",
          "permission": ""
        },
        {
          "label": "业务作业",
          "handler": "",
          "permission": ""
        },
        {
          "label": "ERP同步建单",
          "handler": "hubBill",
          "permission": ""
        },
        {
          "label": "交接确认",
          "handler": "issueHandOverConfirm",
          "permission": ""
        },
        {
          "label": "ERP同步建单",
          "handler": "hub",
          "permission": ""
        },
        {
          "label": "单据作废",
          "handler": "invalid",
          "permission": ""
        },
        {
          "label": "取消收料",
          "handler": "receiveCancel()",
          "permission": ""
        },
        {
          "label": "整单取消发料",
          "handler": "issueBillCancel()",
          "permission": ""
        },
        {
          "label": "一键收料",
          "handler": "onceReceive",
          "permission": ""
        },
        {
          "label": "单据作业",
          "handler": "",
          "permission": ""
        },
        {
          "label": "合并选中",
          "handler": "merageChoosen",
          "permission": ""
        },
        {
          "label": "加入合并队列",
          "handler": "pushInMerageQuque",
          "permission": ""
        },
        {
          "label": "合并当前页",
          "handler": "merageCurrentPage",
          "permission": ""
        },
        {
          "label": "编辑",
          "handler": "edit(scope.row)",
          "permission": ""
        },
        {
          "label": "删除",
          "handler": "remove(scope.row)",
          "permission": ""
        },
        {
          "label": "强制删除",
          "handler": "handleIssueForceDelete(scope.row)",
          "permission": ""
        },
        {
          "label": "强制删除",
          "handler": "handleReceiveForceDelete(scope.row)",
          "permission": ""
        },
        {
          "label": "行作废",
          "handler": "invalidDtls",
          "permission": ""
        },
        {
          "label": "行关闭",
          "handler": "receiveCloseLine",
          "permission": ""
        },
        {
          "label": "取消收料",
          "handler": "receiveReelCancel()",
          "permission": ""
        },
        {
          "label": "行作废",
          "handler": "invalidDtlTotals",
          "permission": ""
        },
        {
          "label": "行关闭",
          "handler": "receiveCloseTotalLine",
          "permission": ""
        },
        {
          "label": "行关闭",
          "handler": "issueCloseLine",
          "permission": ""
        },
        {
          "label": "取消条码发料",
          "handler": "issueReelCancel()",
          "permission": ""
        },
        {
          "label": "行关闭",
          "handler": "issueCloseTotalLine",
          "permission": ""
        },
        {
          "label": "行作废",
          "handler": "LineCancel()",
          "permission": ""
        },
        {
          "label": "确认合并",
          "handler": "handleMakeSureMerageQuque",
          "permission": ""
        },
        {
          "label": "点击导入",
          "handler": "",
          "permission": ""
        },
        {
          "label": "下载模板",
          "handler": "downExcelTpl",
          "permission": ""
        },
        {
          "label": "新增",
          "handler": "addImsBillDtl(-1)",
          "permission": ""
        },
        {
          "label": "删除",
          "handler": "handleDeletes",
          "permission": ""
        },
        {
          "label": "确认关单",
          "handler": "close()",
          "permission": ""
        },
        {
          "label": "确认收料",
          "handler": "onceReceive()",
          "permission": ""
        },
        {
          "label": "确认",
          "handler": "save()",
          "permission": ""
        },
        {
          "label": "删除",
          "handler": "remove(row)",
          "permission": ""
        },
        {
          "label": "确认捡料",
          "handler": "issueReel()",
          "permission": ""
        },
        {
          "label": "切分库存",
          "handler": "splitbtn()",
          "permission": ""
        },
        {
          "label": "自动预约保存",
          "handler": "AddRsv",
          "permission": ""
        },
        {
          "label": "打印",
          "handler": "previewRpt()",
          "permission": ""
        },
        {
          "label": "预约单打印",
          "handler": "previewRsvStk2Rpt()",
          "permission": ""
        },
        {
          "label": "添加限定条件",
          "handler": "Addlimit(-1)",
          "permission": ""
        },
        {
          "label": "删除",
          "handler": "removelimit(row)",
          "permission": ""
        }
      ],
      "mutatesData": false
    }
  ]
});
