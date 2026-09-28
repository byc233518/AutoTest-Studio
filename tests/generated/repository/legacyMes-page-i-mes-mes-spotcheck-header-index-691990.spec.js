// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-spotcheck-header-index-691990",
  "name": "旧版制造执行 - 全部线别（未配置菜单）功能校验",
  "displayName": "全部线别（未配置菜单）",
  "route": "/iMES/MesSpotcheckHeader/Index",
  "sourceRoute": "/iMES/MesSpotcheckHeader/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 全部线别（未配置菜单）",
  "sourceFile": "src/views/iMES/MesSpotcheckHeader/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "PART_NO",
      "PART_DESC",
      "WO_CLASS",
      "CHECK_QTY",
      "WO_NO",
      "PART_NAME",
      "WO_QTY",
      "ALL_QTY",
      "OUTER_CHECK_QTY",
      "REMARK",
      "ResultStatus",
      "SN",
      "STATUS",
      "DEFECT_CODE",
      "DEFECT_LOC",
      "DEFECT_DESCRIPTION",
      "DEFECT_MSG",
      "DEFECT_TYPE",
      "DEFECT_CLASS",
      "DEFECT_CATEGORY",
      "DEFECT_LEVEL_CODE"
    ],
    "required": [
      "LINE_ID",
      "PART_NO",
      "PART_DESC",
      "WO_CLASS",
      "CHECK_QTY",
      "WO_NO",
      "PART_NAME",
      "WO_QTY",
      "ALL_QTY",
      "OUTER_CHECK_QTY"
    ],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": true
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": true
      },
      {
        "key": "WO_CLASS",
        "label": "班次",
        "required": true
      },
      {
        "key": "CHECK_QTY",
        "label": "功能抽检数",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": true
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": true
      },
      {
        "key": "WO_QTY",
        "label": "批量",
        "required": true
      },
      {
        "key": "ALL_QTY",
        "label": "送检数",
        "required": true
      },
      {
        "key": "OUTER_CHECK_QTY",
        "label": "外观抽检数",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "ResultStatus",
        "label": "抽检结果",
        "required": false
      },
      {
        "key": "SN",
        "label": "产品流水号",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "抽检状态",
        "required": false
      },
      {
        "key": "DEFECT_CODE",
        "label": "不良代码",
        "required": false
      },
      {
        "key": "DEFECT_LOC",
        "label": "不良位号",
        "required": false
      },
      {
        "key": "DEFECT_DESCRIPTION",
        "label": "不良描述",
        "required": false
      },
      {
        "key": "DEFECT_MSG",
        "label": "不良现象",
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
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "PART_NO": "AT-001",
      "PART_DESC": "规格测试值",
      "WO_CLASS": "班次测试值",
      "CHECK_QTY": "功能抽检数测试值",
      "WO_NO": "工单测试值",
      "PART_NAME": "自动化样例001",
      "WO_QTY": "批量测试值",
      "ALL_QTY": "送检数测试值",
      "OUTER_CHECK_QTY": "外观抽检数测试值",
      "REMARK": "自动化测试备注001",
      "ResultStatus": "抽检结果测试值",
      "SN": "产品流水号测试值",
      "STATUS": "Y",
      "DEFECT_CODE": "不良代码测试值",
      "DEFECT_LOC": "不良位号测试值",
      "DEFECT_DESCRIPTION": "自动化测试备注001",
      "DEFECT_MSG": "不良现象测试值",
      "DEFECT_TYPE": "所有不良类型测试值",
      "DEFECT_CLASS": "所有不良种类测试值",
      "DEFECT_CATEGORY": "所有不良类别测试值",
      "DEFECT_LEVEL_CODE": "所有不良等级测试值"
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
        "search_but"
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "规格测试值",
        "WO_CLASS": "班次测试值",
        "CHECK_QTY": "功能抽检数测试值",
        "WO_NO": "工单测试值",
        "PART_NAME": "自动化样例001",
        "WO_QTY": "批量测试值",
        "ALL_QTY": "送检数测试值",
        "OUTER_CHECK_QTY": "外观抽检数测试值",
        "REMARK": "自动化测试备注001",
        "ResultStatus": "抽检结果测试值",
        "SN": "产品流水号测试值",
        "STATUS": "Y",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_LOC": "不良位号测试值",
        "DEFECT_DESCRIPTION": "自动化测试备注001",
        "DEFECT_MSG": "不良现象测试值",
        "DEFECT_TYPE": "所有不良类型测试值",
        "DEFECT_CLASS": "所有不良种类测试值",
        "DEFECT_CATEGORY": "所有不良类别测试值",
        "DEFECT_LEVEL_CODE": "所有不良等级测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "MesSpotcheckHeaderAdd",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": true,
          "example": "规格测试值"
        },
        {
          "key": "WO_CLASS",
          "label": "班次",
          "required": true,
          "example": "班次测试值"
        },
        {
          "key": "CHECK_QTY",
          "label": "功能抽检数",
          "required": true,
          "example": "功能抽检数测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "WO_QTY",
          "label": "批量",
          "required": true,
          "example": "批量测试值"
        },
        {
          "key": "ALL_QTY",
          "label": "送检数",
          "required": true,
          "example": "送检数测试值"
        },
        {
          "key": "OUTER_CHECK_QTY",
          "label": "外观抽检数",
          "required": true,
          "example": "外观抽检数测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ResultStatus",
          "label": "抽检结果",
          "required": false,
          "example": "抽检结果测试值"
        },
        {
          "key": "SN",
          "label": "产品流水号",
          "required": false,
          "example": "产品流水号测试值"
        },
        {
          "key": "STATUS",
          "label": "抽检状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "DEFECT_CODE",
          "label": "不良代码",
          "required": false,
          "example": "不良代码测试值"
        },
        {
          "key": "DEFECT_LOC",
          "label": "不良位号",
          "required": false,
          "example": "不良位号测试值"
        },
        {
          "key": "DEFECT_DESCRIPTION",
          "label": "不良描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "DEFECT_MSG",
          "label": "不良现象",
          "required": false,
          "example": "不良现象测试值"
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
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "规格测试值",
        "WO_CLASS": "班次测试值",
        "CHECK_QTY": "功能抽检数测试值",
        "WO_NO": "工单测试值",
        "PART_NAME": "自动化样例001",
        "WO_QTY": "批量测试值",
        "ALL_QTY": "送检数测试值",
        "OUTER_CHECK_QTY": "外观抽检数测试值",
        "REMARK": "自动化测试备注001",
        "ResultStatus": "抽检结果测试值",
        "SN": "产品流水号测试值",
        "STATUS": "Y",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_LOC": "不良位号测试值",
        "DEFECT_DESCRIPTION": "自动化测试备注001",
        "DEFECT_MSG": "不良现象测试值",
        "DEFECT_TYPE": "所有不良类型测试值",
        "DEFECT_CLASS": "所有不良种类测试值",
        "DEFECT_CATEGORY": "所有不良类别测试值",
        "DEFECT_LEVEL_CODE": "所有不良等级测试值"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-91c44",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "reviewClick",
      "permission": "MesSpotcheckHeaderAudit",
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
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "MesSpotcheckHeaderedit",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": true,
          "example": "规格测试值"
        },
        {
          "key": "WO_CLASS",
          "label": "班次",
          "required": true,
          "example": "班次测试值"
        },
        {
          "key": "CHECK_QTY",
          "label": "功能抽检数",
          "required": true,
          "example": "功能抽检数测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "WO_QTY",
          "label": "批量",
          "required": true,
          "example": "批量测试值"
        },
        {
          "key": "ALL_QTY",
          "label": "送检数",
          "required": true,
          "example": "送检数测试值"
        },
        {
          "key": "OUTER_CHECK_QTY",
          "label": "外观抽检数",
          "required": true,
          "example": "外观抽检数测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ResultStatus",
          "label": "抽检结果",
          "required": false,
          "example": "抽检结果测试值"
        },
        {
          "key": "SN",
          "label": "产品流水号",
          "required": false,
          "example": "产品流水号测试值"
        },
        {
          "key": "STATUS",
          "label": "抽检状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "DEFECT_CODE",
          "label": "不良代码",
          "required": false,
          "example": "不良代码测试值"
        },
        {
          "key": "DEFECT_LOC",
          "label": "不良位号",
          "required": false,
          "example": "不良位号测试值"
        },
        {
          "key": "DEFECT_DESCRIPTION",
          "label": "不良描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "DEFECT_MSG",
          "label": "不良现象",
          "required": false,
          "example": "不良现象测试值"
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
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "PART_NO": "AT-001",
        "PART_DESC": "规格测试值",
        "WO_CLASS": "班次测试值",
        "CHECK_QTY": "功能抽检数测试值",
        "WO_NO": "工单测试值",
        "PART_NAME": "自动化样例001",
        "WO_QTY": "批量测试值",
        "ALL_QTY": "送检数测试值",
        "OUTER_CHECK_QTY": "外观抽检数测试值",
        "REMARK": "自动化测试备注001",
        "ResultStatus": "抽检结果测试值",
        "SN": "产品流水号测试值",
        "STATUS": "Y",
        "DEFECT_CODE": "不良代码测试值",
        "DEFECT_LOC": "不良位号测试值",
        "DEFECT_DESCRIPTION": "自动化测试备注001",
        "DEFECT_MSG": "不良现象测试值",
        "DEFECT_TYPE": "所有不良类型测试值",
        "DEFECT_CLASS": "所有不良种类测试值",
        "DEFECT_CATEGORY": "所有不良类别测试值",
        "DEFECT_LEVEL_CODE": "所有不良等级测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "MesSpotcheckHeaderdelete",
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
