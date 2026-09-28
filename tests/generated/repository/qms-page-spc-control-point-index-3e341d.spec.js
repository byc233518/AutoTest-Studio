// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-spc-control-point-index-3e341d",
  "name": "质量管理 - SPC分析功能校验",
  "displayName": "SPC分析",
  "route": "/SPC/ControlPoint/index",
  "sourceRoute": "/SPC/ControlPoint/index",
  "menuCode": "SpcControlPoint",
  "breadcrumb": "品质管理 / 功能菜单（SPC） / SPC分析",
  "sourceFile": "src/views/SPC/ControlPoint/index.vue",
  "dataSchema": {
    "columns": [
      "ControlGroupId",
      "PointCode",
      "ControlConfigId",
      "StatsType",
      "GraphClass",
      "Remark",
      "UpperLimit",
      "TargetValue",
      "LowerLimit",
      "Capacity",
      "GroupCount",
      "DecimalPlaces",
      "P",
      "QueryParams",
      "JudgeDiffRules",
      "AveragesProblem",
      "AveragesImprove",
      "AveragesUser",
      "AveragesRecordTime",
      "AveragesResponsor",
      "CheckRemark",
      "CheckMan",
      "CheckDate",
      "ParentId",
      "GroupCode",
      "GroupName",
      "ParamValue",
      "loseControlStatus",
      "filterText"
    ],
    "required": [
      "ControlGroupId",
      "ControlConfigId",
      "Remark",
      "UpperLimit",
      "TargetValue",
      "LowerLimit",
      "Capacity",
      "DecimalPlaces",
      "AveragesProblem",
      "AveragesImprove",
      "CheckRemark",
      "CheckMan",
      "CheckDate",
      "GroupCode",
      "GroupName"
    ],
    "fields": [
      {
        "key": "ControlGroupId",
        "label": "分类名称",
        "required": true
      },
      {
        "key": "PointCode",
        "label": "分析点编码",
        "required": false
      },
      {
        "key": "ControlConfigId",
        "label": "分析项名称",
        "required": true
      },
      {
        "key": "StatsType",
        "label": "统计类型",
        "required": false
      },
      {
        "key": "GraphClass",
        "label": "图表类型",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": true
      },
      {
        "key": "UpperLimit",
        "label": "规格上限",
        "required": true
      },
      {
        "key": "TargetValue",
        "label": "目标值",
        "required": true
      },
      {
        "key": "LowerLimit",
        "label": "规格下限",
        "required": true
      },
      {
        "key": "Capacity",
        "label": "样本容量",
        "required": true
      },
      {
        "key": "GroupCount",
        "label": "样本组数",
        "required": false
      },
      {
        "key": "DecimalPlaces",
        "label": "小数位数",
        "required": true
      },
      {
        "key": "P",
        "label": "平均不合格率(%)",
        "required": false
      },
      {
        "key": "QueryParams",
        "label": "分析图层次类型",
        "required": false
      },
      {
        "key": "JudgeDiffRules",
        "label": "判异规则",
        "required": false
      },
      {
        "key": "AveragesProblem",
        "label": "失控原因",
        "required": true
      },
      {
        "key": "AveragesImprove",
        "label": "处理措施",
        "required": true
      },
      {
        "key": "AveragesUser",
        "label": "处理人",
        "required": false
      },
      {
        "key": "AveragesRecordTime",
        "label": "处理时间",
        "required": false
      },
      {
        "key": "AveragesResponsor",
        "label": "责任人",
        "required": false
      },
      {
        "key": "CheckRemark",
        "label": "审核描述",
        "required": true
      },
      {
        "key": "CheckMan",
        "label": "审核人",
        "required": true
      },
      {
        "key": "CheckDate",
        "label": "处理时间",
        "required": true
      },
      {
        "key": "ParentId",
        "label": "父节点",
        "required": false
      },
      {
        "key": "GroupCode",
        "label": "编码",
        "required": true
      },
      {
        "key": "GroupName",
        "label": "名称",
        "required": true
      },
      {
        "key": "ParamValue",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "loseControlStatus",
        "label": "状态",
        "required": false
      },
      {
        "key": "filterText",
        "label": "输入关键字进行过滤",
        "required": false
      }
    ],
    "example": {
      "ControlGroupId": "自动化样例001",
      "PointCode": "AT-001",
      "ControlConfigId": "自动化样例001",
      "StatsType": "统计类型测试值",
      "GraphClass": "图表类型测试值",
      "Remark": "自动化测试备注001",
      "UpperLimit": "规格上限测试值",
      "TargetValue": "目标值测试值",
      "LowerLimit": "规格下限测试值",
      "Capacity": "1",
      "GroupCount": "样本组数测试值",
      "DecimalPlaces": "小数位数测试值",
      "P": "平均不合格率(%)测试值",
      "QueryParams": "分析图层次类型测试值",
      "JudgeDiffRules": "判异规则测试值",
      "AveragesProblem": "失控原因测试值",
      "AveragesImprove": "处理措施测试值",
      "AveragesUser": "处理人测试值",
      "AveragesRecordTime": "2026-08-01",
      "AveragesResponsor": "责任人测试值",
      "CheckRemark": "自动化测试备注001",
      "CheckMan": "审核人测试值",
      "CheckDate": "2026-08-01",
      "ParentId": "父节点测试值",
      "GroupCode": "AT-001",
      "GroupName": "自动化样例001",
      "ParamValue": "2026-08-01",
      "loseControlStatus": "Y",
      "filterText": "输入关键字进行过滤测试值"
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
        "ControlGroupId": "自动化样例001",
        "PointCode": "AT-001",
        "ControlConfigId": "自动化样例001",
        "StatsType": "统计类型测试值",
        "GraphClass": "图表类型测试值",
        "Remark": "自动化测试备注001",
        "UpperLimit": "规格上限测试值",
        "TargetValue": "目标值测试值",
        "LowerLimit": "规格下限测试值",
        "Capacity": "1",
        "GroupCount": "样本组数测试值",
        "DecimalPlaces": "小数位数测试值",
        "P": "平均不合格率(%)测试值",
        "QueryParams": "分析图层次类型测试值",
        "JudgeDiffRules": "判异规则测试值",
        "AveragesProblem": "失控原因测试值",
        "AveragesImprove": "处理措施测试值",
        "AveragesUser": "处理人测试值",
        "AveragesRecordTime": "2026-08-01",
        "AveragesResponsor": "责任人测试值",
        "CheckRemark": "自动化测试备注001",
        "CheckMan": "审核人测试值",
        "CheckDate": "2026-08-01",
        "ParentId": "父节点测试值",
        "GroupCode": "AT-001",
        "GroupName": "自动化样例001",
        "ParamValue": "2026-08-01",
        "loseControlStatus": "Y",
        "filterText": "输入关键字进行过滤测试值"
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
      "key": "13fd57e65b-f9b4101417-58d1b",
      "type": "新增表单",
      "name": "新增点业务入口校验",
      "label": "新增点",
      "handler": "add",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增点",
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
          "key": "ControlGroupId",
          "label": "分类名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PointCode",
          "label": "分析点编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ControlConfigId",
          "label": "分析项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StatsType",
          "label": "统计类型",
          "required": false,
          "example": "统计类型测试值"
        },
        {
          "key": "GraphClass",
          "label": "图表类型",
          "required": false,
          "example": "图表类型测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "UpperLimit",
          "label": "规格上限",
          "required": true,
          "example": "规格上限测试值"
        },
        {
          "key": "TargetValue",
          "label": "目标值",
          "required": true,
          "example": "目标值测试值"
        },
        {
          "key": "LowerLimit",
          "label": "规格下限",
          "required": true,
          "example": "规格下限测试值"
        },
        {
          "key": "Capacity",
          "label": "样本容量",
          "required": true,
          "example": "1"
        },
        {
          "key": "GroupCount",
          "label": "样本组数",
          "required": false,
          "example": "样本组数测试值"
        },
        {
          "key": "DecimalPlaces",
          "label": "小数位数",
          "required": true,
          "example": "小数位数测试值"
        },
        {
          "key": "P",
          "label": "平均不合格率(%)",
          "required": false,
          "example": "平均不合格率(%)测试值"
        },
        {
          "key": "QueryParams",
          "label": "分析图层次类型",
          "required": false,
          "example": "分析图层次类型测试值"
        },
        {
          "key": "JudgeDiffRules",
          "label": "判异规则",
          "required": false,
          "example": "判异规则测试值"
        },
        {
          "key": "AveragesProblem",
          "label": "失控原因",
          "required": true,
          "example": "失控原因测试值"
        },
        {
          "key": "AveragesImprove",
          "label": "处理措施",
          "required": true,
          "example": "处理措施测试值"
        },
        {
          "key": "AveragesUser",
          "label": "处理人",
          "required": false,
          "example": "处理人测试值"
        },
        {
          "key": "AveragesRecordTime",
          "label": "处理时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AveragesResponsor",
          "label": "责任人",
          "required": false,
          "example": "责任人测试值"
        },
        {
          "key": "CheckRemark",
          "label": "审核描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CheckMan",
          "label": "审核人",
          "required": true,
          "example": "审核人测试值"
        },
        {
          "key": "CheckDate",
          "label": "处理时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ParentId",
          "label": "父节点",
          "required": false,
          "example": "父节点测试值"
        },
        {
          "key": "GroupCode",
          "label": "编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "GroupName",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ParamValue",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "loseControlStatus",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        }
      ],
      "testData": {
        "ControlGroupId": "自动化样例001",
        "PointCode": "AT-001",
        "ControlConfigId": "自动化样例001",
        "StatsType": "统计类型测试值",
        "GraphClass": "图表类型测试值",
        "Remark": "自动化测试备注001",
        "UpperLimit": "规格上限测试值",
        "TargetValue": "目标值测试值",
        "LowerLimit": "规格下限测试值",
        "Capacity": "1",
        "GroupCount": "样本组数测试值",
        "DecimalPlaces": "小数位数测试值",
        "P": "平均不合格率(%)测试值",
        "QueryParams": "分析图层次类型测试值",
        "JudgeDiffRules": "判异规则测试值",
        "AveragesProblem": "失控原因测试值",
        "AveragesImprove": "处理措施测试值",
        "AveragesUser": "处理人测试值",
        "AveragesRecordTime": "2026-08-01",
        "AveragesResponsor": "责任人测试值",
        "CheckRemark": "自动化测试备注001",
        "CheckMan": "审核人测试值",
        "CheckDate": "2026-08-01",
        "ParentId": "父节点测试值",
        "GroupCode": "AT-001",
        "GroupName": "自动化样例001",
        "ParamValue": "2026-08-01",
        "loseControlStatus": "Y",
        "filterText": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "7e002f9936-177cd27a22-ac803",
      "type": "业务动作",
      "name": "失控点审核业务入口校验",
      "label": "失控点审核",
      "handler": "showAuditDialog",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位失控点审核",
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
      "key": "5f1787916c-5e1024da8f-be585",
      "type": "导入入口",
      "name": "导入数据业务入口校验",
      "label": "导入数据",
      "handler": "showImportDialog(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入数据",
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
      "key": "faea8c1db9-c9be30e2b9-423b8",
      "type": "查看详情",
      "name": "查看图表业务入口校验",
      "label": "查看图表",
      "handler": "previewAnalysisChart(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看图表",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-451e1",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(row)",
      "permission": "UpdateSpcControlPonit",
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
          "key": "ControlGroupId",
          "label": "分类名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PointCode",
          "label": "分析点编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ControlConfigId",
          "label": "分析项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StatsType",
          "label": "统计类型",
          "required": false,
          "example": "统计类型测试值"
        },
        {
          "key": "GraphClass",
          "label": "图表类型",
          "required": false,
          "example": "图表类型测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "UpperLimit",
          "label": "规格上限",
          "required": true,
          "example": "规格上限测试值"
        },
        {
          "key": "TargetValue",
          "label": "目标值",
          "required": true,
          "example": "目标值测试值"
        },
        {
          "key": "LowerLimit",
          "label": "规格下限",
          "required": true,
          "example": "规格下限测试值"
        },
        {
          "key": "Capacity",
          "label": "样本容量",
          "required": true,
          "example": "1"
        },
        {
          "key": "GroupCount",
          "label": "样本组数",
          "required": false,
          "example": "样本组数测试值"
        },
        {
          "key": "DecimalPlaces",
          "label": "小数位数",
          "required": true,
          "example": "小数位数测试值"
        },
        {
          "key": "P",
          "label": "平均不合格率(%)",
          "required": false,
          "example": "平均不合格率(%)测试值"
        },
        {
          "key": "QueryParams",
          "label": "分析图层次类型",
          "required": false,
          "example": "分析图层次类型测试值"
        },
        {
          "key": "JudgeDiffRules",
          "label": "判异规则",
          "required": false,
          "example": "判异规则测试值"
        },
        {
          "key": "AveragesProblem",
          "label": "失控原因",
          "required": true,
          "example": "失控原因测试值"
        },
        {
          "key": "AveragesImprove",
          "label": "处理措施",
          "required": true,
          "example": "处理措施测试值"
        },
        {
          "key": "AveragesUser",
          "label": "处理人",
          "required": false,
          "example": "处理人测试值"
        },
        {
          "key": "AveragesRecordTime",
          "label": "处理时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AveragesResponsor",
          "label": "责任人",
          "required": false,
          "example": "责任人测试值"
        },
        {
          "key": "CheckRemark",
          "label": "审核描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CheckMan",
          "label": "审核人",
          "required": true,
          "example": "审核人测试值"
        },
        {
          "key": "CheckDate",
          "label": "处理时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ParentId",
          "label": "父节点",
          "required": false,
          "example": "父节点测试值"
        },
        {
          "key": "GroupCode",
          "label": "编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "GroupName",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ParamValue",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "loseControlStatus",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        }
      ],
      "testData": {
        "ControlGroupId": "自动化样例001",
        "PointCode": "AT-001",
        "ControlConfigId": "自动化样例001",
        "StatsType": "统计类型测试值",
        "GraphClass": "图表类型测试值",
        "Remark": "自动化测试备注001",
        "UpperLimit": "规格上限测试值",
        "TargetValue": "目标值测试值",
        "LowerLimit": "规格下限测试值",
        "Capacity": "1",
        "GroupCount": "样本组数测试值",
        "DecimalPlaces": "小数位数测试值",
        "P": "平均不合格率(%)测试值",
        "QueryParams": "分析图层次类型测试值",
        "JudgeDiffRules": "判异规则测试值",
        "AveragesProblem": "失控原因测试值",
        "AveragesImprove": "处理措施测试值",
        "AveragesUser": "处理人测试值",
        "AveragesRecordTime": "2026-08-01",
        "AveragesResponsor": "责任人测试值",
        "CheckRemark": "自动化测试备注001",
        "CheckMan": "审核人测试值",
        "CheckDate": "2026-08-01",
        "ParentId": "父节点测试值",
        "GroupCode": "AT-001",
        "GroupName": "自动化样例001",
        "ParamValue": "2026-08-01",
        "loseControlStatus": "Y",
        "filterText": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-9f5bf",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(row)",
      "permission": "delSpcControlPonit",
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
      "key": "13fd57e65b-e6316deb35-dc1a3",
      "type": "新增表单",
      "name": "新增组业务入口校验",
      "label": "新增组",
      "handler": "addGroup",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增组",
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
          "key": "ControlGroupId",
          "label": "分类名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PointCode",
          "label": "分析点编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ControlConfigId",
          "label": "分析项名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StatsType",
          "label": "统计类型",
          "required": false,
          "example": "统计类型测试值"
        },
        {
          "key": "GraphClass",
          "label": "图表类型",
          "required": false,
          "example": "图表类型测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "UpperLimit",
          "label": "规格上限",
          "required": true,
          "example": "规格上限测试值"
        },
        {
          "key": "TargetValue",
          "label": "目标值",
          "required": true,
          "example": "目标值测试值"
        },
        {
          "key": "LowerLimit",
          "label": "规格下限",
          "required": true,
          "example": "规格下限测试值"
        },
        {
          "key": "Capacity",
          "label": "样本容量",
          "required": true,
          "example": "1"
        },
        {
          "key": "GroupCount",
          "label": "样本组数",
          "required": false,
          "example": "样本组数测试值"
        },
        {
          "key": "DecimalPlaces",
          "label": "小数位数",
          "required": true,
          "example": "小数位数测试值"
        },
        {
          "key": "P",
          "label": "平均不合格率(%)",
          "required": false,
          "example": "平均不合格率(%)测试值"
        },
        {
          "key": "QueryParams",
          "label": "分析图层次类型",
          "required": false,
          "example": "分析图层次类型测试值"
        },
        {
          "key": "JudgeDiffRules",
          "label": "判异规则",
          "required": false,
          "example": "判异规则测试值"
        },
        {
          "key": "AveragesProblem",
          "label": "失控原因",
          "required": true,
          "example": "失控原因测试值"
        },
        {
          "key": "AveragesImprove",
          "label": "处理措施",
          "required": true,
          "example": "处理措施测试值"
        },
        {
          "key": "AveragesUser",
          "label": "处理人",
          "required": false,
          "example": "处理人测试值"
        },
        {
          "key": "AveragesRecordTime",
          "label": "处理时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AveragesResponsor",
          "label": "责任人",
          "required": false,
          "example": "责任人测试值"
        },
        {
          "key": "CheckRemark",
          "label": "审核描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "CheckMan",
          "label": "审核人",
          "required": true,
          "example": "审核人测试值"
        },
        {
          "key": "CheckDate",
          "label": "处理时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ParentId",
          "label": "父节点",
          "required": false,
          "example": "父节点测试值"
        },
        {
          "key": "GroupCode",
          "label": "编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "GroupName",
          "label": "名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ParamValue",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "loseControlStatus",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        }
      ],
      "testData": {
        "ControlGroupId": "自动化样例001",
        "PointCode": "AT-001",
        "ControlConfigId": "自动化样例001",
        "StatsType": "统计类型测试值",
        "GraphClass": "图表类型测试值",
        "Remark": "自动化测试备注001",
        "UpperLimit": "规格上限测试值",
        "TargetValue": "目标值测试值",
        "LowerLimit": "规格下限测试值",
        "Capacity": "1",
        "GroupCount": "样本组数测试值",
        "DecimalPlaces": "小数位数测试值",
        "P": "平均不合格率(%)测试值",
        "QueryParams": "分析图层次类型测试值",
        "JudgeDiffRules": "判异规则测试值",
        "AveragesProblem": "失控原因测试值",
        "AveragesImprove": "处理措施测试值",
        "AveragesUser": "处理人测试值",
        "AveragesRecordTime": "2026-08-01",
        "AveragesResponsor": "责任人测试值",
        "CheckRemark": "自动化测试备注001",
        "CheckMan": "审核人测试值",
        "CheckDate": "2026-08-01",
        "ParentId": "父节点测试值",
        "GroupCode": "AT-001",
        "GroupName": "自动化样例001",
        "ParamValue": "2026-08-01",
        "loseControlStatus": "Y",
        "filterText": "输入关键字进行过滤测试值"
      }
    }
  ]
});
