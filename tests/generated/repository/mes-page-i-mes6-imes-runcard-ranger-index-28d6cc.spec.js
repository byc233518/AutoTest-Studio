// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-runcard-ranger-index-28d6cc",
  "name": "制造执行 - 产品条码管理功能校验",
  "displayName": "产品条码管理",
  "route": "/iMES6/ImesRuncardRanger/Index",
  "sourceRoute": "/iMES6/ImesRuncardRanger/Index",
  "menuCode": "iMES6_RuncardRanger",
  "breadcrumb": "条码管理 / 产品条码管理 / 产品条码管理",
  "sourceFile": "src/views/iMES6/ImesRuncardRanger/Index.vue",
  "dataSchema": {
    "columns": [
      "WoNo",
      "Quantity",
      "Range",
      "TailLength",
      "TotalQty",
      "Digital",
      "HeaderLength",
      "FixTail",
      "VolQty",
      "FixHeader",
      "SnBegin",
      "SnEnd",
      "MachineCode",
      "PartNo",
      "PartDesc",
      "TaskType",
      "Enabled",
      "CreatedBy",
      "FileName",
      "BoardQty",
      "PrintNumber"
    ],
    "required": [
      "WoNo",
      "Range",
      "TotalQty",
      "Digital",
      "VolQty",
      "SnBegin",
      "MachineCode",
      "BoardQty",
      "PrintNumber"
    ],
    "fields": [
      {
        "key": "WoNo",
        "label": "工单",
        "required": true
      },
      {
        "key": "Quantity",
        "label": "打印张数",
        "required": false
      },
      {
        "key": "Range",
        "label": "变化位数",
        "required": true
      },
      {
        "key": "TailLength",
        "label": "固定尾位数",
        "required": false
      },
      {
        "key": "TotalQty",
        "label": "分配数量",
        "required": true
      },
      {
        "key": "Digital",
        "label": "进制",
        "required": true
      },
      {
        "key": "HeaderLength",
        "label": "固定头位数",
        "required": false
      },
      {
        "key": "FixTail",
        "label": "固定尾码",
        "required": false
      },
      {
        "key": "VolQty",
        "label": "容量",
        "required": true
      },
      {
        "key": "FixHeader",
        "label": "固定头码",
        "required": false
      },
      {
        "key": "SnBegin",
        "label": "开始流水号",
        "required": true
      },
      {
        "key": "SnEnd",
        "label": "结束流水号",
        "required": false
      },
      {
        "key": "MachineCode",
        "label": "镭雕机",
        "required": true
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "规格",
        "required": false
      },
      {
        "key": "TaskType",
        "label": "任务类型",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "CreatedBy",
        "label": "导入人员",
        "required": false
      },
      {
        "key": "FileName",
        "label": "文件名",
        "required": false
      },
      {
        "key": "BoardQty",
        "label": "拼板数",
        "required": true
      },
      {
        "key": "PrintNumber",
        "label": "打印数量",
        "required": true
      }
    ],
    "example": {
      "WoNo": "工单测试值",
      "Quantity": "打印张数测试值",
      "Range": "变化位数测试值",
      "TailLength": "固定尾位数测试值",
      "TotalQty": "1",
      "Digital": "进制测试值",
      "HeaderLength": "固定头位数测试值",
      "FixTail": "固定尾码测试值",
      "VolQty": "1",
      "FixHeader": "固定头码测试值",
      "SnBegin": "开始流水号测试值",
      "SnEnd": "结束流水号测试值",
      "MachineCode": "镭雕机测试值",
      "PartNo": "AT-001",
      "PartDesc": "规格测试值",
      "TaskType": "任务类型测试值",
      "Enabled": "Y",
      "CreatedBy": "导入人员测试值",
      "FileName": "文件名测试值",
      "BoardQty": "拼板数测试值",
      "PrintNumber": "1"
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
        "WoNo": "工单测试值",
        "Quantity": "打印张数测试值",
        "Range": "变化位数测试值",
        "TailLength": "固定尾位数测试值",
        "TotalQty": "1",
        "Digital": "进制测试值",
        "HeaderLength": "固定头位数测试值",
        "FixTail": "固定尾码测试值",
        "VolQty": "1",
        "FixHeader": "固定头码测试值",
        "SnBegin": "开始流水号测试值",
        "SnEnd": "结束流水号测试值",
        "MachineCode": "镭雕机测试值",
        "PartNo": "AT-001",
        "PartDesc": "规格测试值",
        "TaskType": "任务类型测试值",
        "Enabled": "Y",
        "CreatedBy": "导入人员测试值",
        "FileName": "文件名测试值",
        "BoardQty": "拼板数测试值",
        "PrintNumber": "1"
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
          "key": "WoNo",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "Quantity",
          "label": "打印张数",
          "required": false,
          "example": "打印张数测试值"
        },
        {
          "key": "Range",
          "label": "变化位数",
          "required": true,
          "example": "变化位数测试值"
        },
        {
          "key": "TailLength",
          "label": "固定尾位数",
          "required": false,
          "example": "固定尾位数测试值"
        },
        {
          "key": "TotalQty",
          "label": "分配数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "Digital",
          "label": "进制",
          "required": true,
          "example": "进制测试值"
        },
        {
          "key": "HeaderLength",
          "label": "固定头位数",
          "required": false,
          "example": "固定头位数测试值"
        },
        {
          "key": "FixTail",
          "label": "固定尾码",
          "required": false,
          "example": "固定尾码测试值"
        },
        {
          "key": "VolQty",
          "label": "容量",
          "required": true,
          "example": "1"
        },
        {
          "key": "FixHeader",
          "label": "固定头码",
          "required": false,
          "example": "固定头码测试值"
        },
        {
          "key": "SnBegin",
          "label": "开始流水号",
          "required": true,
          "example": "开始流水号测试值"
        },
        {
          "key": "SnEnd",
          "label": "结束流水号",
          "required": false,
          "example": "结束流水号测试值"
        },
        {
          "key": "MachineCode",
          "label": "镭雕机",
          "required": true,
          "example": "镭雕机测试值"
        },
        {
          "key": "PartNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartDesc",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "TaskType",
          "label": "任务类型",
          "required": false,
          "example": "任务类型测试值"
        },
        {
          "key": "Enabled",
          "label": "是否启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CreatedBy",
          "label": "导入人员",
          "required": false,
          "example": "导入人员测试值"
        },
        {
          "key": "FileName",
          "label": "文件名",
          "required": false,
          "example": "文件名测试值"
        },
        {
          "key": "BoardQty",
          "label": "拼板数",
          "required": true,
          "example": "拼板数测试值"
        },
        {
          "key": "PrintNumber",
          "label": "打印数量",
          "required": true,
          "example": "1"
        }
      ],
      "testData": {
        "WoNo": "工单测试值",
        "Quantity": "打印张数测试值",
        "Range": "变化位数测试值",
        "TailLength": "固定尾位数测试值",
        "TotalQty": "1",
        "Digital": "进制测试值",
        "HeaderLength": "固定头位数测试值",
        "FixTail": "固定尾码测试值",
        "VolQty": "1",
        "FixHeader": "固定头码测试值",
        "SnBegin": "开始流水号测试值",
        "SnEnd": "结束流水号测试值",
        "MachineCode": "镭雕机测试值",
        "PartNo": "AT-001",
        "PartDesc": "规格测试值",
        "TaskType": "任务类型测试值",
        "Enabled": "Y",
        "CreatedBy": "导入人员测试值",
        "FileName": "文件名测试值",
        "BoardQty": "拼板数测试值",
        "PrintNumber": "1"
      }
    },
    {
      "key": "7e002f9936-1bc2e7752b-c9dec",
      "type": "业务动作",
      "name": "保存并打印业务入口校验",
      "label": "保存并打印",
      "handler": "printSn(0)",
      "permission": "PrintSn",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存并打印",
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
      "key": "faea8c1db9-ac408a4438-f5874",
      "type": "查看详情",
      "name": "选择模板打印业务入口校验",
      "label": "选择模板打印",
      "handler": "openFilesPrintModal",
      "permission": "PrintSn",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击选择模板打印",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-97a35ad508-5bb40",
      "type": "导入入口",
      "name": "导入信息列表业务入口校验",
      "label": "导入信息列表",
      "handler": "openImportListModal",
      "permission": "ImportList",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入信息列表",
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
      "key": "ef879b4ced-sn-afb6a",
      "type": "导出入口",
      "name": "导出SN数据业务入口校验",
      "label": "导出SN数据",
      "handler": "exportSnData",
      "permission": "ExportSn",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出SN数据",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-336dc71441-eb21c",
      "type": "查看详情",
      "name": "拼板单码打印业务入口校验",
      "label": "拼板单码打印",
      "handler": "openPuzzleSinglePrintModal",
      "permission": "PrintPuzzleSingle",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击拼板单码打印",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-068cfd0afc-954fb",
      "type": "查看详情",
      "name": "拼板余码打印业务入口校验",
      "label": "拼板余码打印",
      "handler": "openPuzzleRemainingCodePrintModal",
      "permission": "PrintPuzzleRemainingCode",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击拼板余码打印",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-224c909bdf-48caa",
      "type": "查看详情",
      "name": "重复打印业务入口校验",
      "label": "重复打印",
      "handler": "openFilesPrintModal({ repeat: true, title: $t('重复打印') })",
      "permission": "RepeatPrintSn",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击重复打印",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
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
    }
  ]
});
