// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-quality-inspection-list-index-18b724",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/QualityInspectionList/Index",
  "sourceRoute": "/iMES/QualityInspectionList/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/QualityInspectionList/Index.vue",
  "dataSchema": {
    "columns": [
      "SN",
      "SITE_ID",
      "STATUS",
      "DEFECT_CODE",
      "DEFECT_MSG",
      "DEFECT_DESCRIPTION",
      "ResultStatus",
      "OPERATION_LINE_ID",
      "BATCH_NO",
      "LINE_ID",
      "QC_TYPE",
      "ALL_QTY",
      "CHECK_QTY",
      "OPERATION_SITE_ID",
      "WO_NO",
      "FAIL_QTY",
      "REMARK",
      "PART_NO",
      "DateVal",
      "DEFECT_TYPE",
      "DEFECT_CLASS",
      "DEFECT_CATEGORY",
      "DEFECT_LEVEL_CODE",
      "OPERATION_SITE_NAME",
      "Key"
    ],
    "required": [
      "SN",
      "SITE_ID",
      "STATUS",
      "DEFECT_CODE",
      "DEFECT_MSG",
      "DEFECT_DESCRIPTION",
      "LINE_ID",
      "QC_TYPE",
      "ALL_QTY",
      "CHECK_QTY",
      "OPERATION_SITE_ID",
      "WO_NO",
      "FAIL_QTY"
    ],
    "fields": [
      {
        "key": "SN",
        "label": "产品流水号",
        "required": true
      },
      {
        "key": "SITE_ID",
        "label": "工位",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "抽检数量",
        "required": true
      },
      {
        "key": "DEFECT_CODE",
        "label": "不良代码",
        "required": true
      },
      {
        "key": "DEFECT_MSG",
        "label": "不良现象",
        "required": true
      },
      {
        "key": "DEFECT_DESCRIPTION",
        "label": "不良描述",
        "required": true
      },
      {
        "key": "ResultStatus",
        "label": "抽检结果",
        "required": false
      },
      {
        "key": "OPERATION_LINE_ID",
        "label": "线体名称",
        "required": false
      },
      {
        "key": "BATCH_NO",
        "label": "检验单号",
        "required": false
      },
      {
        "key": "LINE_ID",
        "label": "生产线体",
        "required": true
      },
      {
        "key": "QC_TYPE",
        "label": "检验类型",
        "required": true
      },
      {
        "key": "ALL_QTY",
        "label": "送检数量",
        "required": true
      },
      {
        "key": "CHECK_QTY",
        "label": "抽检数量",
        "required": true
      },
      {
        "key": "OPERATION_SITE_ID",
        "label": "工位",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "FAIL_QTY",
        "label": "不良数量",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "产品料号",
        "required": false
      },
      {
        "key": "DateVal",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "DEFECT_TYPE",
        "label": "所有不良类型",
        "required": false
      },
      {
        "key": "DEFECT_CLASS",
        "label": "所有不良种类",
        "required": false
      },
      {
        "key": "DEFECT_CATEGORY",
        "label": "所有不良类别",
        "required": false
      },
      {
        "key": "DEFECT_LEVEL_CODE",
        "label": "所有不良等级",
        "required": false
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "名称",
        "required": false
      },
      {
        "key": "Key",
        "label": "查询关键字",
        "required": false
      }
    ],
    "example": {
      "SN": "产品流水号测试值",
      "SITE_ID": "工位测试值",
      "STATUS": "1",
      "DEFECT_CODE": "不良代码测试值",
      "DEFECT_MSG": "不良现象测试值",
      "DEFECT_DESCRIPTION": "自动化测试备注001",
      "ResultStatus": "抽检结果测试值",
      "OPERATION_LINE_ID": "自动化样例001",
      "BATCH_NO": "AT-001",
      "LINE_ID": "生产线体测试值",
      "QC_TYPE": "检验类型测试值",
      "ALL_QTY": "1",
      "CHECK_QTY": "1",
      "OPERATION_SITE_ID": "工位测试值",
      "WO_NO": "AT-001",
      "FAIL_QTY": "1",
      "REMARK": "自动化测试备注001",
      "PART_NO": "AT-001",
      "DateVal": "2026-08-01",
      "DEFECT_TYPE": "所有不良类型测试值",
      "DEFECT_CLASS": "所有不良种类测试值",
      "DEFECT_CATEGORY": "所有不良类别测试值",
      "DEFECT_LEVEL_CODE": "所有不良等级测试值",
      "OPERATION_SITE_NAME": "自动化样例001",
      "Key": "查询关键字测试值"
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
        "SN": "产品流水号测试值",
        "SITE_ID": "工位测试值",
        "STATUS": "1",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_MSG": "不良现象测试值",
        "DEFECT_DESCRIPTION": "自动化测试备注001",
        "ResultStatus": "抽检结果测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "BATCH_NO": "AT-001",
        "LINE_ID": "生产线体测试值",
        "QC_TYPE": "检验类型测试值",
        "ALL_QTY": "1",
        "CHECK_QTY": "1",
        "OPERATION_SITE_ID": "工位测试值",
        "WO_NO": "AT-001",
        "FAIL_QTY": "1",
        "REMARK": "自动化测试备注001",
        "PART_NO": "AT-001",
        "DateVal": "2026-08-01",
        "DEFECT_TYPE": "所有不良类型测试值",
        "DEFECT_CLASS": "所有不良种类测试值",
        "DEFECT_CATEGORY": "所有不良类别测试值",
        "DEFECT_LEVEL_CODE": "所有不良等级测试值",
        "OPERATION_SITE_NAME": "自动化样例001",
        "Key": "查询关键字测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-2b973",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "AddClick",
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
          "key": "SN",
          "label": "产品流水号",
          "required": true,
          "example": "产品流水号测试值"
        },
        {
          "key": "SITE_ID",
          "label": "工位",
          "required": true,
          "example": "工位测试值"
        },
        {
          "key": "STATUS",
          "label": "抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "DEFECT_CODE",
          "label": "不良代码",
          "required": true,
          "example": "不良代码测试值"
        },
        {
          "key": "DEFECT_MSG",
          "label": "不良现象",
          "required": true,
          "example": "不良现象测试值"
        },
        {
          "key": "DEFECT_DESCRIPTION",
          "label": "不良描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ResultStatus",
          "label": "抽检结果",
          "required": false,
          "example": "抽检结果测试值"
        },
        {
          "key": "OPERATION_LINE_ID",
          "label": "线体名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "BATCH_NO",
          "label": "检验单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LINE_ID",
          "label": "生产线体",
          "required": true,
          "example": "生产线体测试值"
        },
        {
          "key": "QC_TYPE",
          "label": "检验类型",
          "required": true,
          "example": "检验类型测试值"
        },
        {
          "key": "ALL_QTY",
          "label": "送检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "CHECK_QTY",
          "label": "抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "OPERATION_SITE_ID",
          "label": "工位",
          "required": true,
          "example": "工位测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "FAIL_QTY",
          "label": "不良数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PART_NO",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DateVal",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DEFECT_TYPE",
          "label": "所有不良类型",
          "required": false,
          "example": "所有不良类型测试值"
        },
        {
          "key": "DEFECT_CLASS",
          "label": "所有不良种类",
          "required": false,
          "example": "所有不良种类测试值"
        },
        {
          "key": "DEFECT_CATEGORY",
          "label": "所有不良类别",
          "required": false,
          "example": "所有不良类别测试值"
        },
        {
          "key": "DEFECT_LEVEL_CODE",
          "label": "所有不良等级",
          "required": false,
          "example": "所有不良等级测试值"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Key",
          "label": "查询关键字",
          "required": false,
          "example": "查询关键字测试值"
        }
      ],
      "testData": {
        "SN": "产品流水号测试值",
        "SITE_ID": "工位测试值",
        "STATUS": "1",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_MSG": "不良现象测试值",
        "DEFECT_DESCRIPTION": "自动化测试备注001",
        "ResultStatus": "抽检结果测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "BATCH_NO": "AT-001",
        "LINE_ID": "生产线体测试值",
        "QC_TYPE": "检验类型测试值",
        "ALL_QTY": "1",
        "CHECK_QTY": "1",
        "OPERATION_SITE_ID": "工位测试值",
        "WO_NO": "AT-001",
        "FAIL_QTY": "1",
        "REMARK": "自动化测试备注001",
        "PART_NO": "AT-001",
        "DateVal": "2026-08-01",
        "DEFECT_TYPE": "所有不良类型测试值",
        "DEFECT_CLASS": "所有不良种类测试值",
        "DEFECT_CATEGORY": "所有不良类别测试值",
        "DEFECT_LEVEL_CODE": "所有不良等级测试值",
        "OPERATION_SITE_NAME": "自动化样例001",
        "Key": "查询关键字测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-34754",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "EditClick",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
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
          "key": "SN",
          "label": "产品流水号",
          "required": true,
          "example": "产品流水号测试值"
        },
        {
          "key": "SITE_ID",
          "label": "工位",
          "required": true,
          "example": "工位测试值"
        },
        {
          "key": "STATUS",
          "label": "抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "DEFECT_CODE",
          "label": "不良代码",
          "required": true,
          "example": "不良代码测试值"
        },
        {
          "key": "DEFECT_MSG",
          "label": "不良现象",
          "required": true,
          "example": "不良现象测试值"
        },
        {
          "key": "DEFECT_DESCRIPTION",
          "label": "不良描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "ResultStatus",
          "label": "抽检结果",
          "required": false,
          "example": "抽检结果测试值"
        },
        {
          "key": "OPERATION_LINE_ID",
          "label": "线体名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "BATCH_NO",
          "label": "检验单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "LINE_ID",
          "label": "生产线体",
          "required": true,
          "example": "生产线体测试值"
        },
        {
          "key": "QC_TYPE",
          "label": "检验类型",
          "required": true,
          "example": "检验类型测试值"
        },
        {
          "key": "ALL_QTY",
          "label": "送检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "CHECK_QTY",
          "label": "抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "OPERATION_SITE_ID",
          "label": "工位",
          "required": true,
          "example": "工位测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "FAIL_QTY",
          "label": "不良数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PART_NO",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DateVal",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DEFECT_TYPE",
          "label": "所有不良类型",
          "required": false,
          "example": "所有不良类型测试值"
        },
        {
          "key": "DEFECT_CLASS",
          "label": "所有不良种类",
          "required": false,
          "example": "所有不良种类测试值"
        },
        {
          "key": "DEFECT_CATEGORY",
          "label": "所有不良类别",
          "required": false,
          "example": "所有不良类别测试值"
        },
        {
          "key": "DEFECT_LEVEL_CODE",
          "label": "所有不良等级",
          "required": false,
          "example": "所有不良等级测试值"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Key",
          "label": "查询关键字",
          "required": false,
          "example": "查询关键字测试值"
        }
      ],
      "testData": {
        "SN": "产品流水号测试值",
        "SITE_ID": "工位测试值",
        "STATUS": "1",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_MSG": "不良现象测试值",
        "DEFECT_DESCRIPTION": "自动化测试备注001",
        "ResultStatus": "抽检结果测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "BATCH_NO": "AT-001",
        "LINE_ID": "生产线体测试值",
        "QC_TYPE": "检验类型测试值",
        "ALL_QTY": "1",
        "CHECK_QTY": "1",
        "OPERATION_SITE_ID": "工位测试值",
        "WO_NO": "AT-001",
        "FAIL_QTY": "1",
        "REMARK": "自动化测试备注001",
        "PART_NO": "AT-001",
        "DateVal": "2026-08-01",
        "DEFECT_TYPE": "所有不良类型测试值",
        "DEFECT_CLASS": "所有不良种类测试值",
        "DEFECT_CATEGORY": "所有不良类别测试值",
        "DEFECT_LEVEL_CODE": "所有不良等级测试值",
        "OPERATION_SITE_NAME": "自动化样例001",
        "Key": "查询关键字测试值"
      }
    },
    {
      "key": "7e002f9936-5ce60cb75d-e29a7",
      "type": "业务动作",
      "name": "审批业务入口校验",
      "label": "审批",
      "handler": "Review",
      "permission": "VerifySpotcheckHeaderReview",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审批",
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
      "key": "7e002f9936-612ea82085-89395",
      "type": "业务动作",
      "name": "取消审批业务入口校验",
      "label": "取消审批",
      "handler": "CancelReview",
      "permission": "VerifySpotcheckCancelReview",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消审批",
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
      "key": "7e002f9936-f6664b8c6d-93508",
      "type": "业务动作",
      "name": "确定(待检验)业务入口校验",
      "label": "确定(待检验)",
      "handler": "handelAuditSpotcheck($t('确定(待检验)'),2)",
      "permission": "QualityInspectionDetermine",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位确定(待检验)",
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
      "key": "7e002f9936-f53b68002d-7e171",
      "type": "业务动作",
      "name": "待审核业务入口校验",
      "label": "待审核",
      "handler": "handelAuditSpotcheck($t('待审核'),3)",
      "permission": "QualityInspectionToReviewed",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位待审核",
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
      "key": "7e002f9936-3f3d8682dd-fda56",
      "type": "业务动作",
      "name": "已审核业务入口校验",
      "label": "已审核",
      "handler": "handelAuditSpotcheck($t('已审核'),4)",
      "permission": "QualityInspectionReviewed",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位已审核",
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
      "key": "7e002f9936-8cb2643aa5-99afe",
      "type": "业务动作",
      "name": "检验业务入口校验",
      "label": "检验",
      "handler": "editClick(row, row.$index)",
      "permission": "UpdateSpotCheckIteamsData",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检验",
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
