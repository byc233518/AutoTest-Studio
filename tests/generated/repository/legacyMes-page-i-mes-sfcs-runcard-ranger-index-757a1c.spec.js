// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-runcard-ranger-index-757a1c",
  "name": "旧版制造执行 - 导入SN（未配置菜单）功能校验",
  "displayName": "导入SN（未配置菜单）",
  "route": "/iMES/SfcsRuncardRanger/Index",
  "sourceRoute": "/iMES/SfcsRuncardRanger/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 导入SN（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsRuncardRanger/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "RANGE",
      "TAIL_LENGTH",
      "HEADER_LENGTH",
      "SN_BEGIN",
      "DIGITAL",
      "QUANTITY",
      "FIX_TAIL",
      "FIX_HEADER",
      "SN_END",
      "PrintName",
      "BoardQty",
      "printFileId",
      "PrintNumber",
      "PART_NO",
      "PART_TYPE",
      "PART_PN",
      "PART_EAN",
      "CUSTOMER",
      "CUSTOMER_MODEL",
      "CUSTOMER_CODE",
      "SUPPLY_LOCATION",
      "DELIVERY_LOCATION",
      "HARDWARE_VERSION",
      "SOFTWARE_VERSION",
      "COLOUR",
      "CUSTOMER_BATCH_NO",
      "MAIN_CARD_IMEI",
      "MINOR_CARD_IMEI",
      "EQUIP_CODE",
      "SN_CONFIG_VALUE",
      "SN2_CONFIG_VALUE",
      "PART_DESC",
      "TASK_TYPE",
      "MACHINE_CODE",
      "MEANING",
      "ENABLED",
      "USER_NAME"
    ],
    "required": [
      "WO_NO",
      "RANGE",
      "TAIL_LENGTH",
      "SN_BEGIN",
      "DIGITAL",
      "QUANTITY",
      "BoardQty"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单",
        "required": true
      },
      {
        "key": "RANGE",
        "label": "变化位数",
        "required": true
      },
      {
        "key": "TAIL_LENGTH",
        "label": "固定尾位数",
        "required": true
      },
      {
        "key": "HEADER_LENGTH",
        "label": "固定头位数",
        "required": false
      },
      {
        "key": "SN_BEGIN",
        "label": "开始流水号",
        "required": true
      },
      {
        "key": "DIGITAL",
        "label": "进制",
        "required": true
      },
      {
        "key": "QUANTITY",
        "label": "数量",
        "required": true
      },
      {
        "key": "FIX_TAIL",
        "label": "固定尾码",
        "required": false
      },
      {
        "key": "FIX_HEADER",
        "label": "固定头码",
        "required": false
      },
      {
        "key": "SN_END",
        "label": "结束流水号",
        "required": false
      },
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "BoardQty",
        "label": "拼板数",
        "required": true
      },
      {
        "key": "printFileId",
        "label": "打印标签类型",
        "required": false
      },
      {
        "key": "PrintNumber",
        "label": "打印数量",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "成品料号",
        "required": false
      },
      {
        "key": "PART_TYPE",
        "label": "产品类别",
        "required": false
      },
      {
        "key": "PART_PN",
        "label": "产品代码（PN）",
        "required": false
      },
      {
        "key": "PART_EAN",
        "label": "商品代码(EAN)",
        "required": false
      },
      {
        "key": "CUSTOMER",
        "label": "客户",
        "required": false
      },
      {
        "key": "CUSTOMER_MODEL",
        "label": "客户机型",
        "required": false
      },
      {
        "key": "CUSTOMER_CODE",
        "label": "客户代码",
        "required": false
      },
      {
        "key": "SUPPLY_LOCATION",
        "label": "发货地",
        "required": false
      },
      {
        "key": "DELIVERY_LOCATION",
        "label": "交货地",
        "required": false
      },
      {
        "key": "HARDWARE_VERSION",
        "label": "硬件版本",
        "required": false
      },
      {
        "key": "SOFTWARE_VERSION",
        "label": "软件版本",
        "required": false
      },
      {
        "key": "COLOUR",
        "label": "颜色",
        "required": false
      },
      {
        "key": "CUSTOMER_BATCH_NO",
        "label": "客户批次号",
        "required": false
      },
      {
        "key": "MAIN_CARD_IMEI",
        "label": "主卡IMEI",
        "required": false
      },
      {
        "key": "MINOR_CARD_IMEI",
        "label": "副卡IMEI",
        "required": false
      },
      {
        "key": "EQUIP_CODE",
        "label": "镭雕机编号",
        "required": false
      },
      {
        "key": "SN_CONFIG_VALUE",
        "label": "流水号",
        "required": false
      },
      {
        "key": "SN2_CONFIG_VALUE",
        "label": "流水号2",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": false
      },
      {
        "key": "TASK_TYPE",
        "label": "任务类型",
        "required": false
      },
      {
        "key": "MACHINE_CODE",
        "label": "镭雕机栏位",
        "required": false
      },
      {
        "key": "MEANING",
        "label": "名称",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否启用",
        "required": false
      },
      {
        "key": "USER_NAME",
        "label": "用户名",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "工单测试值",
      "RANGE": "变化位数测试值",
      "TAIL_LENGTH": "固定尾位数测试值",
      "HEADER_LENGTH": "固定头位数测试值",
      "SN_BEGIN": "开始流水号测试值",
      "DIGITAL": "进制测试值",
      "QUANTITY": "1",
      "FIX_TAIL": "固定尾码测试值",
      "FIX_HEADER": "固定头码测试值",
      "SN_END": "结束流水号测试值",
      "PrintName": "自动化样例001",
      "BoardQty": "拼板数测试值",
      "printFileId": "打印标签类型测试值",
      "PrintNumber": "1",
      "PART_NO": "AT-001",
      "PART_TYPE": "产品类别测试值",
      "PART_PN": "产品代码（PN）测试值",
      "PART_EAN": "商品代码(EAN)测试值",
      "CUSTOMER": "客户测试值",
      "CUSTOMER_MODEL": "客户机型测试值",
      "CUSTOMER_CODE": "客户代码测试值",
      "SUPPLY_LOCATION": "发货地测试值",
      "DELIVERY_LOCATION": "交货地测试值",
      "HARDWARE_VERSION": "硬件版本测试值",
      "SOFTWARE_VERSION": "软件版本测试值",
      "COLOUR": "颜色测试值",
      "CUSTOMER_BATCH_NO": "客户批次号测试值",
      "MAIN_CARD_IMEI": "主卡IMEI测试值",
      "MINOR_CARD_IMEI": "副卡IMEI测试值",
      "EQUIP_CODE": "AT-001",
      "SN_CONFIG_VALUE": "流水号测试值",
      "SN2_CONFIG_VALUE": "流水号2测试值",
      "PART_DESC": "规格测试值",
      "TASK_TYPE": "任务类型测试值",
      "MACHINE_CODE": "镭雕机栏位测试值",
      "MEANING": "自动化样例001",
      "ENABLED": "Y",
      "USER_NAME": "用户名测试值"
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
        "WO_NO": "工单测试值",
        "RANGE": "变化位数测试值",
        "TAIL_LENGTH": "固定尾位数测试值",
        "HEADER_LENGTH": "固定头位数测试值",
        "SN_BEGIN": "开始流水号测试值",
        "DIGITAL": "进制测试值",
        "QUANTITY": "1",
        "FIX_TAIL": "固定尾码测试值",
        "FIX_HEADER": "固定头码测试值",
        "SN_END": "结束流水号测试值",
        "PrintName": "自动化样例001",
        "BoardQty": "拼板数测试值",
        "printFileId": "打印标签类型测试值",
        "PrintNumber": "1",
        "PART_NO": "AT-001",
        "PART_TYPE": "产品类别测试值",
        "PART_PN": "产品代码（PN）测试值",
        "PART_EAN": "商品代码(EAN)测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_MODEL": "客户机型测试值",
        "CUSTOMER_CODE": "客户代码测试值",
        "SUPPLY_LOCATION": "发货地测试值",
        "DELIVERY_LOCATION": "交货地测试值",
        "HARDWARE_VERSION": "硬件版本测试值",
        "SOFTWARE_VERSION": "软件版本测试值",
        "COLOUR": "颜色测试值",
        "CUSTOMER_BATCH_NO": "客户批次号测试值",
        "MAIN_CARD_IMEI": "主卡IMEI测试值",
        "MINOR_CARD_IMEI": "副卡IMEI测试值",
        "EQUIP_CODE": "AT-001",
        "SN_CONFIG_VALUE": "流水号测试值",
        "SN2_CONFIG_VALUE": "流水号2测试值",
        "PART_DESC": "规格测试值",
        "TASK_TYPE": "任务类型测试值",
        "MACHINE_CODE": "镭雕机栏位测试值",
        "MEANING": "自动化样例001",
        "ENABLED": "Y",
        "USER_NAME": "用户名测试值"
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
      "key": "7e002f9936-3c977df7ce-9e151",
      "type": "业务动作",
      "name": "打印业务入口校验",
      "label": "打印",
      "handler": "printClick(1)",
      "permission": "SfcsRuncardRangerPrintSnRanger",
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
      "key": "7e002f9936-ac408a4438-6dfd6",
      "type": "业务动作",
      "name": "选择模板打印业务入口校验",
      "label": "选择模板打印",
      "handler": "printerBatchCustomTemplateClick()",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击选择模板打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-97a35ad508-00357",
      "type": "导入入口",
      "name": "导入信息列表业务入口校验",
      "label": "导入信息列表",
      "handler": "openImportInfoList",
      "permission": "LoadImportRuncardSnData",
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
      "key": "ef879b4ced-sn-44ae4",
      "type": "导出入口",
      "name": "导出SN数据业务入口校验",
      "label": "导出SN数据",
      "handler": "ExportSnClick",
      "permission": "SfcsRuncardRangerExportSNRangerData",
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
      "key": "7e002f9936-336dc71441-7a0a3",
      "type": "业务动作",
      "name": "拼板单码打印业务入口校验",
      "label": "拼板单码打印",
      "handler": "JigsawClick(1)",
      "permission": "PrintPuzzleSingleCode",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击拼板单码打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-068cfd0afc-79bfc",
      "type": "业务动作",
      "name": "拼板余码打印业务入口校验",
      "label": "拼板余码打印",
      "handler": "JigsawClick(2)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击拼板余码打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-224c909bdf-d2bba",
      "type": "业务动作",
      "name": "重复打印业务入口校验",
      "label": "重复打印",
      "handler": "printerBatchClick()",
      "permission": "PrintPuzzleRemainingCodeBySN",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击重复打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-edbaf",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "delRuncardData()",
      "permission": "",
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
    }
  ]
});
