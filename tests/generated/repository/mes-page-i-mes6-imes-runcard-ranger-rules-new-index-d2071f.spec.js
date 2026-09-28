// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-runcard-ranger-rules-new-index-d2071f",
  "name": "制造执行 - 产品条码规则（新）功能校验",
  "displayName": "产品条码规则（新）",
  "route": "/iMES6/ImesRuncardRangerRulesNew/Index",
  "sourceRoute": "/iMES6/ImesRuncardRangerRulesNew/Index",
  "menuCode": "ImesRuncardRangerRulesNew",
  "breadcrumb": "条码管理 / 产品条码管理 / 产品条码规则（新）",
  "sourceFile": "src/views/iMES6/ImesRuncardRangerRulesNew/Index.vue",
  "dataSchema": {
    "columns": [
      "formMode",
      "IsDefault",
      "CustomerId",
      "PartTypeId",
      "PartClassId",
      "PartNo",
      "SalesOrder",
      "WoNo",
      "FixHeader",
      "RangeLength",
      "OperationId",
      "FixTail",
      "RangeStartCode",
      "Digital",
      "Enabled",
      "LabelType",
      "SqlContent",
      "RuleCode",
      "RuleName",
      "SegType",
      "FixedValue",
      "FormatValue",
      "ResetWeekType",
      "SegLength",
      "LengthPolicy",
      "RadixType",
      "ResetType",
      "StartValue",
      "Step",
      "ScopeType",
      "SourceOperationId",
      "SourceItemName",
      "MinValue",
      "DecimalPlaces",
      "RoundMode",
      "PadChar",
      "SourceUnit",
      "TargetUnit",
      "ConversionRate",
      "Key"
    ],
    "required": [
      "IsDefault",
      "RangeLength",
      "RangeStartCode",
      "Digital",
      "Enabled",
      "LabelType",
      "SqlContent",
      "RuleCode",
      "RuleName"
    ],
    "fields": [
      {
        "key": "formMode",
        "label": "流水范围类别",
        "required": false
      },
      {
        "key": "IsDefault",
        "label": "默认",
        "required": true
      },
      {
        "key": "CustomerId",
        "label": "客户",
        "required": false
      },
      {
        "key": "PartTypeId",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "PartClassId",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "SalesOrder",
        "label": "销售单号",
        "required": false
      },
      {
        "key": "WoNo",
        "label": "工单",
        "required": false
      },
      {
        "key": "FixHeader",
        "label": "前导符",
        "required": false
      },
      {
        "key": "RangeLength",
        "label": "流水范围长度",
        "required": true
      },
      {
        "key": "OperationId",
        "label": "打印工序",
        "required": false
      },
      {
        "key": "FixTail",
        "label": "结束符",
        "required": false
      },
      {
        "key": "RangeStartCode",
        "label": "流水范围开始字符",
        "required": true
      },
      {
        "key": "Digital",
        "label": "进制",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "LabelType",
        "label": "标签类型",
        "required": true
      },
      {
        "key": "SqlContent",
        "label": "数据源SQL",
        "required": true
      },
      {
        "key": "RuleCode",
        "label": "规则编码",
        "required": true
      },
      {
        "key": "RuleName",
        "label": "规则名称",
        "required": true
      },
      {
        "key": "SegType",
        "label": "占位符类型",
        "required": false
      },
      {
        "key": "FixedValue",
        "label": "固定内容",
        "required": false
      },
      {
        "key": "FormatValue",
        "label": "年份格式",
        "required": false
      },
      {
        "key": "ResetWeekType",
        "label": "周类型",
        "required": false
      },
      {
        "key": "SegLength",
        "label": "输出长度",
        "required": false
      },
      {
        "key": "LengthPolicy",
        "label": "长度处理方式",
        "required": false
      },
      {
        "key": "RadixType",
        "label": "进制类型",
        "required": false
      },
      {
        "key": "ResetType",
        "label": "重置类型",
        "required": false
      },
      {
        "key": "StartValue",
        "label": "流水起始值",
        "required": false
      },
      {
        "key": "Step",
        "label": "递进步长",
        "required": false
      },
      {
        "key": "ScopeType",
        "label": "流水号作用域",
        "required": false
      },
      {
        "key": "SourceOperationId",
        "label": "来源工序",
        "required": false
      },
      {
        "key": "SourceItemName",
        "label": "检查项名称",
        "required": false
      },
      {
        "key": "MinValue",
        "label": "默认最小值",
        "required": false
      },
      {
        "key": "DecimalPlaces",
        "label": "保留小数位",
        "required": false
      },
      {
        "key": "RoundMode",
        "label": "数值处理方式",
        "required": false
      },
      {
        "key": "PadChar",
        "label": "补位字符",
        "required": false
      },
      {
        "key": "SourceUnit",
        "label": "来源单位",
        "required": false
      },
      {
        "key": "TargetUnit",
        "label": "输出单位",
        "required": false
      },
      {
        "key": "ConversionRate",
        "label": "单位转换率",
        "required": false
      },
      {
        "key": "Key",
        "label": "规则编码 / 名称 / 料号 / 工单",
        "required": false
      }
    ],
    "example": {
      "formMode": "流水范围类别测试值",
      "IsDefault": "默认测试值",
      "CustomerId": "客户测试值",
      "PartTypeId": "物料类别测试值",
      "PartClassId": "物料子类测试值",
      "PartNo": "AT-001",
      "SalesOrder": "AT-001",
      "WoNo": "工单测试值",
      "FixHeader": "前导符测试值",
      "RangeLength": "流水范围长度测试值",
      "OperationId": "打印工序测试值",
      "FixTail": "结束符测试值",
      "RangeStartCode": "流水范围开始字符测试值",
      "Digital": "进制测试值",
      "Enabled": "是否激活测试值",
      "LabelType": "标签类型测试值",
      "SqlContent": "数据源SQL测试值",
      "RuleCode": "AT-001",
      "RuleName": "自动化样例001",
      "SegType": "占位符类型测试值",
      "FixedValue": "固定内容测试值",
      "FormatValue": "年份格式测试值",
      "ResetWeekType": "周类型测试值",
      "SegLength": "输出长度测试值",
      "LengthPolicy": "长度处理方式测试值",
      "RadixType": "进制类型测试值",
      "ResetType": "重置类型测试值",
      "StartValue": "流水起始值测试值",
      "Step": "递进步长测试值",
      "ScopeType": "流水号作用域测试值",
      "SourceOperationId": "来源工序测试值",
      "SourceItemName": "自动化样例001",
      "MinValue": "默认最小值测试值",
      "DecimalPlaces": "保留小数位测试值",
      "RoundMode": "数值处理方式测试值",
      "PadChar": "补位字符测试值",
      "SourceUnit": "来源单位测试值",
      "TargetUnit": "输出单位测试值",
      "ConversionRate": "单位转换率测试值",
      "Key": "规则编码 / 名称 / 料号 / 工单测试值"
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
        "search"
      ],
      "testData": {
        "formMode": "流水范围类别测试值",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "SalesOrder": "AT-001",
        "WoNo": "工单测试值",
        "FixHeader": "前导符测试值",
        "RangeLength": "流水范围长度测试值",
        "OperationId": "打印工序测试值",
        "FixTail": "结束符测试值",
        "RangeStartCode": "流水范围开始字符测试值",
        "Digital": "进制测试值",
        "Enabled": "是否激活测试值",
        "LabelType": "标签类型测试值",
        "SqlContent": "数据源SQL测试值",
        "RuleCode": "AT-001",
        "RuleName": "自动化样例001",
        "SegType": "占位符类型测试值",
        "FixedValue": "固定内容测试值",
        "FormatValue": "年份格式测试值",
        "ResetWeekType": "周类型测试值",
        "SegLength": "输出长度测试值",
        "LengthPolicy": "长度处理方式测试值",
        "RadixType": "进制类型测试值",
        "ResetType": "重置类型测试值",
        "StartValue": "流水起始值测试值",
        "Step": "递进步长测试值",
        "ScopeType": "流水号作用域测试值",
        "SourceOperationId": "来源工序测试值",
        "SourceItemName": "自动化样例001",
        "MinValue": "默认最小值测试值",
        "DecimalPlaces": "保留小数位测试值",
        "RoundMode": "数值处理方式测试值",
        "PadChar": "补位字符测试值",
        "SourceUnit": "来源单位测试值",
        "TargetUnit": "输出单位测试值",
        "ConversionRate": "单位转换率测试值",
        "Key": "规则编码 / 名称 / 料号 / 工单测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-d37ed",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addNewForm",
      "permission": "Add",
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
          "key": "formMode",
          "label": "流水范围类别",
          "required": false,
          "example": "流水范围类别测试值"
        },
        {
          "key": "IsDefault",
          "label": "默认",
          "required": true,
          "example": "默认测试值"
        },
        {
          "key": "CustomerId",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "PartTypeId",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "PartClassId",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "SalesOrder",
          "label": "销售单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WoNo",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "FixHeader",
          "label": "前导符",
          "required": false,
          "example": "前导符测试值"
        },
        {
          "key": "RangeLength",
          "label": "流水范围长度",
          "required": true,
          "example": "流水范围长度测试值"
        },
        {
          "key": "OperationId",
          "label": "打印工序",
          "required": false,
          "example": "打印工序测试值"
        },
        {
          "key": "FixTail",
          "label": "结束符",
          "required": false,
          "example": "结束符测试值"
        },
        {
          "key": "RangeStartCode",
          "label": "流水范围开始字符",
          "required": true,
          "example": "流水范围开始字符测试值"
        },
        {
          "key": "Digital",
          "label": "进制",
          "required": true,
          "example": "进制测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "LabelType",
          "label": "标签类型",
          "required": true,
          "example": "标签类型测试值"
        },
        {
          "key": "SqlContent",
          "label": "数据源SQL",
          "required": true,
          "example": "数据源SQL测试值"
        },
        {
          "key": "RuleCode",
          "label": "规则编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "RuleName",
          "label": "规则名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "SegType",
          "label": "占位符类型",
          "required": false,
          "example": "占位符类型测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定内容",
          "required": false,
          "example": "固定内容测试值"
        },
        {
          "key": "FormatValue",
          "label": "年份格式",
          "required": false,
          "example": "年份格式测试值"
        },
        {
          "key": "ResetWeekType",
          "label": "周类型",
          "required": false,
          "example": "周类型测试值"
        },
        {
          "key": "SegLength",
          "label": "输出长度",
          "required": false,
          "example": "输出长度测试值"
        },
        {
          "key": "LengthPolicy",
          "label": "长度处理方式",
          "required": false,
          "example": "长度处理方式测试值"
        },
        {
          "key": "RadixType",
          "label": "进制类型",
          "required": false,
          "example": "进制类型测试值"
        },
        {
          "key": "ResetType",
          "label": "重置类型",
          "required": false,
          "example": "重置类型测试值"
        },
        {
          "key": "StartValue",
          "label": "流水起始值",
          "required": false,
          "example": "流水起始值测试值"
        },
        {
          "key": "Step",
          "label": "递进步长",
          "required": false,
          "example": "递进步长测试值"
        },
        {
          "key": "ScopeType",
          "label": "流水号作用域",
          "required": false,
          "example": "流水号作用域测试值"
        },
        {
          "key": "SourceOperationId",
          "label": "来源工序",
          "required": false,
          "example": "来源工序测试值"
        },
        {
          "key": "SourceItemName",
          "label": "检查项名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MinValue",
          "label": "默认最小值",
          "required": false,
          "example": "默认最小值测试值"
        },
        {
          "key": "DecimalPlaces",
          "label": "保留小数位",
          "required": false,
          "example": "保留小数位测试值"
        },
        {
          "key": "RoundMode",
          "label": "数值处理方式",
          "required": false,
          "example": "数值处理方式测试值"
        },
        {
          "key": "PadChar",
          "label": "补位字符",
          "required": false,
          "example": "补位字符测试值"
        },
        {
          "key": "SourceUnit",
          "label": "来源单位",
          "required": false,
          "example": "来源单位测试值"
        },
        {
          "key": "TargetUnit",
          "label": "输出单位",
          "required": false,
          "example": "输出单位测试值"
        },
        {
          "key": "ConversionRate",
          "label": "单位转换率",
          "required": false,
          "example": "单位转换率测试值"
        },
        {
          "key": "Key",
          "label": "规则编码 / 名称 / 料号 / 工单",
          "required": false,
          "example": "规则编码 / 名称 / 料号 / 工单测试值"
        }
      ],
      "testData": {
        "formMode": "流水范围类别测试值",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "SalesOrder": "AT-001",
        "WoNo": "工单测试值",
        "FixHeader": "前导符测试值",
        "RangeLength": "流水范围长度测试值",
        "OperationId": "打印工序测试值",
        "FixTail": "结束符测试值",
        "RangeStartCode": "流水范围开始字符测试值",
        "Digital": "进制测试值",
        "Enabled": "是否激活测试值",
        "LabelType": "标签类型测试值",
        "SqlContent": "数据源SQL测试值",
        "RuleCode": "AT-001",
        "RuleName": "自动化样例001",
        "SegType": "占位符类型测试值",
        "FixedValue": "固定内容测试值",
        "FormatValue": "年份格式测试值",
        "ResetWeekType": "周类型测试值",
        "SegLength": "输出长度测试值",
        "LengthPolicy": "长度处理方式测试值",
        "RadixType": "进制类型测试值",
        "ResetType": "重置类型测试值",
        "StartValue": "流水起始值测试值",
        "Step": "递进步长测试值",
        "ScopeType": "流水号作用域测试值",
        "SourceOperationId": "来源工序测试值",
        "SourceItemName": "自动化样例001",
        "MinValue": "默认最小值测试值",
        "DecimalPlaces": "保留小数位测试值",
        "RoundMode": "数值处理方式测试值",
        "PadChar": "补位字符测试值",
        "SourceUnit": "来源单位测试值",
        "TargetUnit": "输出单位测试值",
        "ConversionRate": "单位转换率测试值",
        "Key": "规则编码 / 名称 / 料号 / 工单测试值"
      }
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
      "key": "7e002f9936-4edd1d0087-304a0",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "copyRule",
      "permission": "Copy",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位复制",
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
      "key": "13fd57e65b-c228d178de-2412d",
      "type": "新增表单",
      "name": "新增主码业务入口校验",
      "label": "新增主码",
      "handler": "addSegment",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增主码",
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
          "key": "formMode",
          "label": "流水范围类别",
          "required": false,
          "example": "流水范围类别测试值"
        },
        {
          "key": "IsDefault",
          "label": "默认",
          "required": true,
          "example": "默认测试值"
        },
        {
          "key": "CustomerId",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "PartTypeId",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "PartClassId",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "SalesOrder",
          "label": "销售单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "WoNo",
          "label": "工单",
          "required": false,
          "example": "工单测试值"
        },
        {
          "key": "FixHeader",
          "label": "前导符",
          "required": false,
          "example": "前导符测试值"
        },
        {
          "key": "RangeLength",
          "label": "流水范围长度",
          "required": true,
          "example": "流水范围长度测试值"
        },
        {
          "key": "OperationId",
          "label": "打印工序",
          "required": false,
          "example": "打印工序测试值"
        },
        {
          "key": "FixTail",
          "label": "结束符",
          "required": false,
          "example": "结束符测试值"
        },
        {
          "key": "RangeStartCode",
          "label": "流水范围开始字符",
          "required": true,
          "example": "流水范围开始字符测试值"
        },
        {
          "key": "Digital",
          "label": "进制",
          "required": true,
          "example": "进制测试值"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "LabelType",
          "label": "标签类型",
          "required": true,
          "example": "标签类型测试值"
        },
        {
          "key": "SqlContent",
          "label": "数据源SQL",
          "required": true,
          "example": "数据源SQL测试值"
        },
        {
          "key": "RuleCode",
          "label": "规则编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "RuleName",
          "label": "规则名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "SegType",
          "label": "占位符类型",
          "required": false,
          "example": "占位符类型测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定内容",
          "required": false,
          "example": "固定内容测试值"
        },
        {
          "key": "FormatValue",
          "label": "年份格式",
          "required": false,
          "example": "年份格式测试值"
        },
        {
          "key": "ResetWeekType",
          "label": "周类型",
          "required": false,
          "example": "周类型测试值"
        },
        {
          "key": "SegLength",
          "label": "输出长度",
          "required": false,
          "example": "输出长度测试值"
        },
        {
          "key": "LengthPolicy",
          "label": "长度处理方式",
          "required": false,
          "example": "长度处理方式测试值"
        },
        {
          "key": "RadixType",
          "label": "进制类型",
          "required": false,
          "example": "进制类型测试值"
        },
        {
          "key": "ResetType",
          "label": "重置类型",
          "required": false,
          "example": "重置类型测试值"
        },
        {
          "key": "StartValue",
          "label": "流水起始值",
          "required": false,
          "example": "流水起始值测试值"
        },
        {
          "key": "Step",
          "label": "递进步长",
          "required": false,
          "example": "递进步长测试值"
        },
        {
          "key": "ScopeType",
          "label": "流水号作用域",
          "required": false,
          "example": "流水号作用域测试值"
        },
        {
          "key": "SourceOperationId",
          "label": "来源工序",
          "required": false,
          "example": "来源工序测试值"
        },
        {
          "key": "SourceItemName",
          "label": "检查项名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MinValue",
          "label": "默认最小值",
          "required": false,
          "example": "默认最小值测试值"
        },
        {
          "key": "DecimalPlaces",
          "label": "保留小数位",
          "required": false,
          "example": "保留小数位测试值"
        },
        {
          "key": "RoundMode",
          "label": "数值处理方式",
          "required": false,
          "example": "数值处理方式测试值"
        },
        {
          "key": "PadChar",
          "label": "补位字符",
          "required": false,
          "example": "补位字符测试值"
        },
        {
          "key": "SourceUnit",
          "label": "来源单位",
          "required": false,
          "example": "来源单位测试值"
        },
        {
          "key": "TargetUnit",
          "label": "输出单位",
          "required": false,
          "example": "输出单位测试值"
        },
        {
          "key": "ConversionRate",
          "label": "单位转换率",
          "required": false,
          "example": "单位转换率测试值"
        },
        {
          "key": "Key",
          "label": "规则编码 / 名称 / 料号 / 工单",
          "required": false,
          "example": "规则编码 / 名称 / 料号 / 工单测试值"
        }
      ],
      "testData": {
        "formMode": "流水范围类别测试值",
        "IsDefault": "默认测试值",
        "CustomerId": "客户测试值",
        "PartTypeId": "物料类别测试值",
        "PartClassId": "物料子类测试值",
        "PartNo": "AT-001",
        "SalesOrder": "AT-001",
        "WoNo": "工单测试值",
        "FixHeader": "前导符测试值",
        "RangeLength": "流水范围长度测试值",
        "OperationId": "打印工序测试值",
        "FixTail": "结束符测试值",
        "RangeStartCode": "流水范围开始字符测试值",
        "Digital": "进制测试值",
        "Enabled": "是否激活测试值",
        "LabelType": "标签类型测试值",
        "SqlContent": "数据源SQL测试值",
        "RuleCode": "AT-001",
        "RuleName": "自动化样例001",
        "SegType": "占位符类型测试值",
        "FixedValue": "固定内容测试值",
        "FormatValue": "年份格式测试值",
        "ResetWeekType": "周类型测试值",
        "SegLength": "输出长度测试值",
        "LengthPolicy": "长度处理方式测试值",
        "RadixType": "进制类型测试值",
        "ResetType": "重置类型测试值",
        "StartValue": "流水起始值测试值",
        "Step": "递进步长测试值",
        "ScopeType": "流水号作用域测试值",
        "SourceOperationId": "来源工序测试值",
        "SourceItemName": "自动化样例001",
        "MinValue": "默认最小值测试值",
        "DecimalPlaces": "保留小数位测试值",
        "RoundMode": "数值处理方式测试值",
        "PadChar": "补位字符测试值",
        "SourceUnit": "来源单位测试值",
        "TargetUnit": "输出单位测试值",
        "ConversionRate": "单位转换率测试值",
        "Key": "规则编码 / 名称 / 料号 / 工单测试值"
      }
    }
  ]
});
