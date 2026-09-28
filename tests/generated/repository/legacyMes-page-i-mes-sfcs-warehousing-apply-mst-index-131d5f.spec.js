// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-warehousing-apply-mst-index-131d5f",
  "name": "旧版制造执行 - 开始日期（未配置菜单）功能校验",
  "displayName": "开始日期（未配置菜单）",
  "route": "/iMES/SfcsWarehousingApplyMst/Index",
  "sourceRoute": "/iMES/SfcsWarehousingApplyMst/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 开始日期（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsWarehousingApplyMst/Index.vue",
  "dataSchema": {
    "columns": [
      "PrintName",
      "PRODUCE_ORGANIZE",
      "ATTRIBUTE3",
      "ATTRIBUTE4",
      "WAREHOUSE",
      "LINE_ID",
      "ATTRIBUTE5",
      "WO_NO",
      "MATERIAL",
      "PART_NO",
      "PART_DESC",
      "PO",
      "VOLUME",
      "TOTAL",
      "UNIT",
      "BOX_TOTAL",
      "name",
      "OPERATION_ID",
      "QTY",
      "SCRAP_QTY",
      "ScrapTitle",
      "TYPE",
      "MANAGER_TYPE",
      "WIP_OPERATION",
      "woInProcessQty",
      "SN",
      "CHARGE",
      "APPLY_NO",
      "HI_CODE",
      "beginTime"
    ],
    "required": [
      "PRODUCE_ORGANIZE",
      "WAREHOUSE",
      "LINE_ID",
      "ATTRIBUTE5",
      "WO_NO",
      "VOLUME",
      "TOTAL",
      "UNIT",
      "BOX_TOTAL",
      "name",
      "OPERATION_ID",
      "QTY",
      "SCRAP_QTY",
      "TYPE",
      "MANAGER_TYPE",
      "WIP_OPERATION"
    ],
    "fields": [
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "PRODUCE_ORGANIZE",
        "label": "生产组织",
        "required": true
      },
      {
        "key": "ATTRIBUTE3",
        "label": "工厂",
        "required": false
      },
      {
        "key": "ATTRIBUTE4",
        "label": "工作中心",
        "required": false
      },
      {
        "key": "WAREHOUSE",
        "label": "入库仓库",
        "required": true
      },
      {
        "key": "LINE_ID",
        "label": "线别",
        "required": true
      },
      {
        "key": "ATTRIBUTE5",
        "label": "单据类型",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "MATERIAL",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "描述",
        "required": false
      },
      {
        "key": "PO",
        "label": "'PO号:'",
        "required": false
      },
      {
        "key": "VOLUME",
        "label": "体积",
        "required": true
      },
      {
        "key": "TOTAL",
        "label": "入库数",
        "required": true
      },
      {
        "key": "UNIT",
        "label": "生产单位",
        "required": true
      },
      {
        "key": "BOX_TOTAL",
        "label": "件数",
        "required": true
      },
      {
        "key": "name",
        "label": "管控类型",
        "required": true
      },
      {
        "key": "OPERATION_ID",
        "label": "在制工序",
        "required": true
      },
      {
        "key": "QTY",
        "label": "可转移数量",
        "required": true
      },
      {
        "key": "SCRAP_QTY",
        "label": "入库数量",
        "required": true
      },
      {
        "key": "ScrapTitle",
        "label": "入库类别",
        "required": false
      },
      {
        "key": "TYPE",
        "label": "物料条码",
        "required": true
      },
      {
        "key": "MANAGER_TYPE",
        "label": "管控类型",
        "required": true
      },
      {
        "key": "WIP_OPERATION",
        "label": "在制工序",
        "required": true
      },
      {
        "key": "woInProcessQty",
        "label": "可入库数",
        "required": false
      },
      {
        "key": "SN",
        "label": "产品条码",
        "required": false
      },
      {
        "key": "CHARGE",
        "label": "产品流水号信息",
        "required": false
      },
      {
        "key": "APPLY_NO",
        "label": "MES入库申请单号",
        "required": false
      },
      {
        "key": "HI_CODE",
        "label": "入库检验单号",
        "required": false
      },
      {
        "key": "beginTime",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "PrintName": "自动化样例001",
      "PRODUCE_ORGANIZE": "生产组织测试值",
      "ATTRIBUTE3": "工厂测试值",
      "ATTRIBUTE4": "工作中心测试值",
      "WAREHOUSE": "入库仓库测试值",
      "LINE_ID": "线别测试值",
      "ATTRIBUTE5": "单据类型测试值",
      "WO_NO": "AT-001",
      "MATERIAL": "物料类别测试值",
      "PART_NO": "AT-001",
      "PART_DESC": "自动化测试备注001",
      "PO": "'PO号:'测试值",
      "VOLUME": "体积测试值",
      "TOTAL": "入库数测试值",
      "UNIT": "生产单位测试值",
      "BOX_TOTAL": "件数测试值",
      "name": "管控类型测试值",
      "OPERATION_ID": "在制工序测试值",
      "QTY": "1",
      "SCRAP_QTY": "1",
      "ScrapTitle": "入库类别测试值",
      "TYPE": "AT-001",
      "MANAGER_TYPE": "管控类型测试值",
      "WIP_OPERATION": "在制工序测试值",
      "woInProcessQty": "可入库数测试值",
      "SN": "AT-001",
      "CHARGE": "产品流水号信息测试值",
      "APPLY_NO": "AT-001",
      "HI_CODE": "AT-001",
      "beginTime": "2026-08-01"
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
        "searchClick"
      ],
      "testData": {
        "PrintName": "自动化样例001",
        "PRODUCE_ORGANIZE": "生产组织测试值",
        "ATTRIBUTE3": "工厂测试值",
        "ATTRIBUTE4": "工作中心测试值",
        "WAREHOUSE": "入库仓库测试值",
        "LINE_ID": "线别测试值",
        "ATTRIBUTE5": "单据类型测试值",
        "WO_NO": "AT-001",
        "MATERIAL": "物料类别测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "自动化测试备注001",
        "PO": "'PO号:'测试值",
        "VOLUME": "体积测试值",
        "TOTAL": "入库数测试值",
        "UNIT": "生产单位测试值",
        "BOX_TOTAL": "件数测试值",
        "name": "管控类型测试值",
        "OPERATION_ID": "在制工序测试值",
        "QTY": "1",
        "SCRAP_QTY": "1",
        "ScrapTitle": "入库类别测试值",
        "TYPE": "AT-001",
        "MANAGER_TYPE": "管控类型测试值",
        "WIP_OPERATION": "在制工序测试值",
        "woInProcessQty": "可入库数测试值",
        "SN": "AT-001",
        "CHARGE": "产品流水号信息测试值",
        "APPLY_NO": "AT-001",
        "HI_CODE": "AT-001",
        "beginTime": "2026-08-01"
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
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
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
          "key": "PrintName",
          "label": "打印机名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PRODUCE_ORGANIZE",
          "label": "生产组织",
          "required": true,
          "example": "生产组织测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "工厂",
          "required": false,
          "example": "工厂测试值"
        },
        {
          "key": "ATTRIBUTE4",
          "label": "工作中心",
          "required": false,
          "example": "工作中心测试值"
        },
        {
          "key": "WAREHOUSE",
          "label": "入库仓库",
          "required": true,
          "example": "入库仓库测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": true,
          "example": "线别测试值"
        },
        {
          "key": "ATTRIBUTE5",
          "label": "单据类型",
          "required": true,
          "example": "单据类型测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MATERIAL",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_DESC",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PO",
          "label": "'PO号:'",
          "required": false,
          "example": "'PO号:'测试值"
        },
        {
          "key": "VOLUME",
          "label": "体积",
          "required": true,
          "example": "体积测试值"
        },
        {
          "key": "TOTAL",
          "label": "入库数",
          "required": true,
          "example": "入库数测试值"
        },
        {
          "key": "UNIT",
          "label": "生产单位",
          "required": true,
          "example": "生产单位测试值"
        },
        {
          "key": "BOX_TOTAL",
          "label": "件数",
          "required": true,
          "example": "件数测试值"
        },
        {
          "key": "name",
          "label": "管控类型",
          "required": true,
          "example": "管控类型测试值"
        },
        {
          "key": "OPERATION_ID",
          "label": "在制工序",
          "required": true,
          "example": "在制工序测试值"
        },
        {
          "key": "QTY",
          "label": "可转移数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "SCRAP_QTY",
          "label": "入库数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ScrapTitle",
          "label": "入库类别",
          "required": false,
          "example": "入库类别测试值"
        },
        {
          "key": "TYPE",
          "label": "物料条码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MANAGER_TYPE",
          "label": "管控类型",
          "required": true,
          "example": "管控类型测试值"
        },
        {
          "key": "WIP_OPERATION",
          "label": "在制工序",
          "required": true,
          "example": "在制工序测试值"
        },
        {
          "key": "woInProcessQty",
          "label": "可入库数",
          "required": false,
          "example": "可入库数测试值"
        },
        {
          "key": "SN",
          "label": "产品条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CHARGE",
          "label": "产品流水号信息",
          "required": false,
          "example": "产品流水号信息测试值"
        },
        {
          "key": "APPLY_NO",
          "label": "MES入库申请单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "HI_CODE",
          "label": "入库检验单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "beginTime",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "PrintName": "自动化样例001",
        "PRODUCE_ORGANIZE": "生产组织测试值",
        "ATTRIBUTE3": "工厂测试值",
        "ATTRIBUTE4": "工作中心测试值",
        "WAREHOUSE": "入库仓库测试值",
        "LINE_ID": "线别测试值",
        "ATTRIBUTE5": "单据类型测试值",
        "WO_NO": "AT-001",
        "MATERIAL": "物料类别测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "自动化测试备注001",
        "PO": "'PO号:'测试值",
        "VOLUME": "体积测试值",
        "TOTAL": "入库数测试值",
        "UNIT": "生产单位测试值",
        "BOX_TOTAL": "件数测试值",
        "name": "管控类型测试值",
        "OPERATION_ID": "在制工序测试值",
        "QTY": "1",
        "SCRAP_QTY": "1",
        "ScrapTitle": "入库类别测试值",
        "TYPE": "AT-001",
        "MANAGER_TYPE": "管控类型测试值",
        "WIP_OPERATION": "在制工序测试值",
        "woInProcessQty": "可入库数测试值",
        "SN": "AT-001",
        "CHARGE": "产品流水号信息测试值",
        "APPLY_NO": "AT-001",
        "HI_CODE": "AT-001",
        "beginTime": "2026-08-01"
      }
    },
    {
      "key": "7e002f9936-3ff60d1ae6-c33c2",
      "type": "业务动作",
      "name": "报废入库业务入口校验",
      "label": "报废入库",
      "handler": "ScrapAddClick(1)",
      "permission": "SfcsWarehousingApplyMstScrap",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位报废入库",
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
      "key": "7e002f9936-4dc9fe3f07-5b5a5",
      "type": "业务动作",
      "name": "强制入库业务入口校验",
      "label": "强制入库",
      "handler": "ScrapAddClick(2)",
      "permission": "SfcsWarehousingApplyMstForce",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位强制入库",
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
      "key": "ef879b4ced-188896795f-4e089",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "exportEvent",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-794da",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editModifyForm(row)",
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
          "key": "PrintName",
          "label": "打印机名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PRODUCE_ORGANIZE",
          "label": "生产组织",
          "required": true,
          "example": "生产组织测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "工厂",
          "required": false,
          "example": "工厂测试值"
        },
        {
          "key": "ATTRIBUTE4",
          "label": "工作中心",
          "required": false,
          "example": "工作中心测试值"
        },
        {
          "key": "WAREHOUSE",
          "label": "入库仓库",
          "required": true,
          "example": "入库仓库测试值"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": true,
          "example": "线别测试值"
        },
        {
          "key": "ATTRIBUTE5",
          "label": "单据类型",
          "required": true,
          "example": "单据类型测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MATERIAL",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_DESC",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PO",
          "label": "'PO号:'",
          "required": false,
          "example": "'PO号:'测试值"
        },
        {
          "key": "VOLUME",
          "label": "体积",
          "required": true,
          "example": "体积测试值"
        },
        {
          "key": "TOTAL",
          "label": "入库数",
          "required": true,
          "example": "入库数测试值"
        },
        {
          "key": "UNIT",
          "label": "生产单位",
          "required": true,
          "example": "生产单位测试值"
        },
        {
          "key": "BOX_TOTAL",
          "label": "件数",
          "required": true,
          "example": "件数测试值"
        },
        {
          "key": "name",
          "label": "管控类型",
          "required": true,
          "example": "管控类型测试值"
        },
        {
          "key": "OPERATION_ID",
          "label": "在制工序",
          "required": true,
          "example": "在制工序测试值"
        },
        {
          "key": "QTY",
          "label": "可转移数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "SCRAP_QTY",
          "label": "入库数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ScrapTitle",
          "label": "入库类别",
          "required": false,
          "example": "入库类别测试值"
        },
        {
          "key": "TYPE",
          "label": "物料条码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MANAGER_TYPE",
          "label": "管控类型",
          "required": true,
          "example": "管控类型测试值"
        },
        {
          "key": "WIP_OPERATION",
          "label": "在制工序",
          "required": true,
          "example": "在制工序测试值"
        },
        {
          "key": "woInProcessQty",
          "label": "可入库数",
          "required": false,
          "example": "可入库数测试值"
        },
        {
          "key": "SN",
          "label": "产品条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CHARGE",
          "label": "产品流水号信息",
          "required": false,
          "example": "产品流水号信息测试值"
        },
        {
          "key": "APPLY_NO",
          "label": "MES入库申请单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "HI_CODE",
          "label": "入库检验单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "beginTime",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "PrintName": "自动化样例001",
        "PRODUCE_ORGANIZE": "生产组织测试值",
        "ATTRIBUTE3": "工厂测试值",
        "ATTRIBUTE4": "工作中心测试值",
        "WAREHOUSE": "入库仓库测试值",
        "LINE_ID": "线别测试值",
        "ATTRIBUTE5": "单据类型测试值",
        "WO_NO": "AT-001",
        "MATERIAL": "物料类别测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "自动化测试备注001",
        "PO": "'PO号:'测试值",
        "VOLUME": "体积测试值",
        "TOTAL": "入库数测试值",
        "UNIT": "生产单位测试值",
        "BOX_TOTAL": "件数测试值",
        "name": "管控类型测试值",
        "OPERATION_ID": "在制工序测试值",
        "QTY": "1",
        "SCRAP_QTY": "1",
        "ScrapTitle": "入库类别测试值",
        "TYPE": "AT-001",
        "MANAGER_TYPE": "管控类型测试值",
        "WIP_OPERATION": "在制工序测试值",
        "woInProcessQty": "可入库数测试值",
        "SN": "AT-001",
        "CHARGE": "产品流水号信息测试值",
        "APPLY_NO": "AT-001",
        "HI_CODE": "AT-001",
        "beginTime": "2026-08-01"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ca875",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "detelModifyForm(row)",
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
    }
  ]
});
