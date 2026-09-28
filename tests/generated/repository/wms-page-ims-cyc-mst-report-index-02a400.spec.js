// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-cyc-mst-report-index-02a400",
  "name": "仓储管理 - 盘点报表功能校验",
  "displayName": "盘点报表",
  "route": "/ImsCycMstReport/Index",
  "sourceRoute": "/ImsCycMstReport/Index",
  "menuCode": "ImsCycMstReport",
  "breadcrumb": "仓库管理 / 库存盘点 / 盘点报表",
  "sourceFile": "src/views/ImsCycMstReport/Index.vue",
  "dataSchema": {
    "columns": [
      "PartCode",
      "PartName",
      "PartDesc",
      "SicCode",
      "SicName",
      "StkQty",
      "ErpStkQty",
      "CycQty",
      "ExCycQty",
      "ReCycQty",
      "DiffCycQty",
      "DiffExCycQty",
      "DiffRCycQty",
      "ReelCount",
      "RowIndex",
      "LineNo",
      "ReelCode",
      "LocatorCode",
      "RCycQty",
      "FinalDifferenceNum"
    ],
    "required": [],
    "fields": [
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
        "key": "PartDesc",
        "label": "规格型号",
        "required": false
      },
      {
        "key": "SicCode",
        "label": "仓库编码",
        "required": false
      },
      {
        "key": "SicName",
        "label": "仓库名称",
        "required": false
      },
      {
        "key": "StkQty",
        "label": "库存数量",
        "required": false
      },
      {
        "key": "ErpStkQty",
        "label": "ERP库存数量",
        "required": false
      },
      {
        "key": "CycQty",
        "label": "初盘数量",
        "required": false
      },
      {
        "key": "ExCycQty",
        "label": "抽盘数量",
        "required": false
      },
      {
        "key": "ReCycQty",
        "label": "复盘数量",
        "required": false
      },
      {
        "key": "DiffCycQty",
        "label": "初盘差异",
        "required": false
      },
      {
        "key": "DiffExCycQty",
        "label": "抽盘差异",
        "required": false
      },
      {
        "key": "DiffRCycQty",
        "label": "复盘差异",
        "required": false
      },
      {
        "key": "ReelCount",
        "label": "条码个数",
        "required": false
      },
      {
        "key": "RowIndex",
        "label": "序号",
        "required": false
      },
      {
        "key": "LineNo",
        "label": "行号",
        "required": false
      },
      {
        "key": "ReelCode",
        "label": "条码",
        "required": false
      },
      {
        "key": "LocatorCode",
        "label": "储位",
        "required": false
      },
      {
        "key": "RCycQty",
        "label": "复盘",
        "required": false
      },
      {
        "key": "FinalDifferenceNum",
        "label": "差异",
        "required": false
      }
    ],
    "example": {
      "PartCode": "AT-001",
      "PartName": "自动化样例001",
      "PartDesc": "规格型号测试值",
      "SicCode": "AT-001",
      "SicName": "自动化样例001",
      "StkQty": "1",
      "ErpStkQty": "1",
      "CycQty": "1",
      "ExCycQty": "1",
      "ReCycQty": "1",
      "DiffCycQty": "初盘差异测试值",
      "DiffExCycQty": "抽盘差异测试值",
      "DiffRCycQty": "复盘差异测试值",
      "ReelCount": "条码个数测试值",
      "RowIndex": "1",
      "LineNo": "行号测试值",
      "ReelCode": "AT-001",
      "LocatorCode": "储位测试值",
      "RCycQty": "复盘测试值",
      "FinalDifferenceNum": "差异测试值"
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
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "规格型号测试值",
        "SicCode": "AT-001",
        "SicName": "自动化样例001",
        "StkQty": "1",
        "ErpStkQty": "1",
        "CycQty": "1",
        "ExCycQty": "1",
        "ReCycQty": "1",
        "DiffCycQty": "初盘差异测试值",
        "DiffExCycQty": "抽盘差异测试值",
        "DiffRCycQty": "复盘差异测试值",
        "ReelCount": "条码个数测试值",
        "RowIndex": "1",
        "LineNo": "行号测试值",
        "ReelCode": "AT-001",
        "LocatorCode": "储位测试值",
        "RCycQty": "复盘测试值",
        "FinalDifferenceNum": "差异测试值"
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
      "key": "ef879b4ced-a8e538398f-0747d",
      "type": "导出入口",
      "name": "清单导出业务入口校验",
      "label": "清单导出",
      "handler": "dExport",
      "permission": "ImsCycMstReportExport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击清单导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-a831d17444-07dee",
      "type": "业务动作",
      "name": "盘点差异报表业务入口校验",
      "label": "盘点差异报表",
      "handler": "differenceReport",
      "permission": "ImsCycMstDifference",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位盘点差异报表",
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
      "key": "13fd57e65b-c386b1742a-37090",
      "type": "新增表单",
      "name": "创建盈亏单业务入口校验",
      "label": "创建盈亏单",
      "handler": "createLossWinBill",
      "permission": "ImsCycMstCreateBill",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击创建盈亏单",
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
          "key": "PartDesc",
          "label": "规格型号",
          "required": false,
          "example": "规格型号测试值"
        },
        {
          "key": "SicCode",
          "label": "仓库编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "SicName",
          "label": "仓库名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "StkQty",
          "label": "库存数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "ErpStkQty",
          "label": "ERP库存数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "CycQty",
          "label": "初盘数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "ExCycQty",
          "label": "抽盘数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "ReCycQty",
          "label": "复盘数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "DiffCycQty",
          "label": "初盘差异",
          "required": false,
          "example": "初盘差异测试值"
        },
        {
          "key": "DiffExCycQty",
          "label": "抽盘差异",
          "required": false,
          "example": "抽盘差异测试值"
        },
        {
          "key": "DiffRCycQty",
          "label": "复盘差异",
          "required": false,
          "example": "复盘差异测试值"
        },
        {
          "key": "ReelCount",
          "label": "条码个数",
          "required": false,
          "example": "条码个数测试值"
        },
        {
          "key": "RowIndex",
          "label": "序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "LineNo",
          "label": "行号",
          "required": false,
          "example": "行号测试值"
        },
        {
          "key": "ReelCode",
          "label": "条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LocatorCode",
          "label": "储位",
          "required": false,
          "example": "储位测试值"
        },
        {
          "key": "RCycQty",
          "label": "复盘",
          "required": false,
          "example": "复盘测试值"
        },
        {
          "key": "FinalDifferenceNum",
          "label": "差异",
          "required": false,
          "example": "差异测试值"
        }
      ],
      "testData": {
        "PartCode": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "规格型号测试值",
        "SicCode": "AT-001",
        "SicName": "自动化样例001",
        "StkQty": "1",
        "ErpStkQty": "1",
        "CycQty": "1",
        "ExCycQty": "1",
        "ReCycQty": "1",
        "DiffCycQty": "初盘差异测试值",
        "DiffExCycQty": "抽盘差异测试值",
        "DiffRCycQty": "复盘差异测试值",
        "ReelCount": "条码个数测试值",
        "RowIndex": "1",
        "LineNo": "行号测试值",
        "ReelCode": "AT-001",
        "LocatorCode": "储位测试值",
        "RCycQty": "复盘测试值",
        "FinalDifferenceNum": "差异测试值"
      }
    },
    {
      "key": "7e002f9936-07104593fd-e9bd6",
      "type": "业务动作",
      "name": "强制关闭业务入口校验",
      "label": "强制关闭",
      "handler": "forceClose",
      "permission": "ImsCycMstForceClose",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位强制关闭",
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
      "key": "726b6ec55f-3755f56f2f-d94aa",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteCycMsts",
      "permission": "ImsCycMstDelete",
      "menuTriggerLabel": "",
      "rowAction": false,
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
      "key": "ef879b4ced-6a07938172-5e717",
      "type": "导出入口",
      "name": "导出盘卡明细业务入口校验",
      "label": "导出盘卡明细",
      "handler": "imsCycDtlExport",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出盘卡明细",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-7aa0a6ec7f-17eb4",
      "type": "导出入口",
      "name": "导出料号汇总业务入口校验",
      "label": "导出料号汇总",
      "handler": "imsPartSummaryListExport",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出料号汇总",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
