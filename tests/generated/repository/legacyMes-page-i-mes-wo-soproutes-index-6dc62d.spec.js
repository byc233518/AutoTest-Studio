// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-wo-soproutes-index-6dc62d",
  "name": "旧版制造执行 - 状态（未配置菜单）功能校验",
  "displayName": "状态（未配置菜单）",
  "route": "/iMES/WoSOPRoutes/Index",
  "sourceRoute": "/iMES/WoSOPRoutes/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 状态（未配置菜单）",
  "sourceFile": "src/views/iMES/WoSOPRoutes/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "ROUTE_NAME",
      "PART_NO",
      "DESCRIPTION",
      "PART_NAME",
      "VERSION",
      "MODEL",
      "CONFIG_TYPE",
      "CONFIG_VALUE",
      "ENABLED",
      "CONTROL_CONTENT",
      "CONTROL_VALUE",
      "REMARK",
      "STATUS",
      "value2",
      "partNo",
      "CURRENT_OPERATION_ID",
      "NAME",
      "REPAIR_OPERATION_ID",
      "Name",
      "COMPONENT_ID",
      "ODM_COMPONENT_PN",
      "RESOURCE_ID",
      "UID_ID",
      "FORMAT",
      "Key",
      "ChineseName",
      "part_no",
      "BREAK_OPERATION_CODE"
    ],
    "required": [
      "WO_NO",
      "CONFIG_TYPE",
      "CONFIG_VALUE",
      "ENABLED",
      "CONTROL_CONTENT",
      "CONTROL_VALUE",
      "Name",
      "COMPONENT_ID",
      "ODM_COMPONENT_PN",
      "UID_ID",
      "FORMAT"
    ],
    "fields": [
      {
        "key": "WO_NO",
        "label": "原工单号",
        "required": true
      },
      {
        "key": "ROUTE_NAME",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "规格",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "名称",
        "required": false
      },
      {
        "key": "VERSION",
        "label": "版本号",
        "required": false
      },
      {
        "key": "MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "CONFIG_TYPE",
        "label": "配置类型",
        "required": true
      },
      {
        "key": "CONFIG_VALUE",
        "label": "配置值",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "CONTROL_CONTENT",
        "label": "管控内容",
        "required": true
      },
      {
        "key": "CONTROL_VALUE",
        "label": "管控值",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "描述",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      },
      {
        "key": "value2",
        "label": "开始日期",
        "required": false
      },
      {
        "key": "partNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "CURRENT_OPERATION_ID",
        "label": "工序名称",
        "required": false
      },
      {
        "key": "NAME",
        "label": "工序名称",
        "required": false
      },
      {
        "key": "REPAIR_OPERATION_ID",
        "label": "工序名称",
        "required": false
      },
      {
        "key": "Name",
        "label": "资源种类",
        "required": true
      },
      {
        "key": "COMPONENT_ID",
        "label": "零件种类",
        "required": true
      },
      {
        "key": "ODM_COMPONENT_PN",
        "label": "零件料号",
        "required": true
      },
      {
        "key": "RESOURCE_ID",
        "label": "采集资源维护",
        "required": false
      },
      {
        "key": "UID_ID",
        "label": "UID种类",
        "required": true
      },
      {
        "key": "FORMAT",
        "label": "格式限定",
        "required": true
      },
      {
        "key": "Key",
        "label": "工序名称",
        "required": false
      },
      {
        "key": "ChineseName",
        "label": "配置类型",
        "required": false
      },
      {
        "key": "part_no",
        "label": "料号",
        "required": false
      },
      {
        "key": "BREAK_OPERATION_CODE",
        "label": "拆板工序",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "AT-001",
      "ROUTE_NAME": "AT-001",
      "PART_NO": "AT-001",
      "DESCRIPTION": "规格测试值",
      "PART_NAME": "自动化样例001",
      "VERSION": "版本号测试值",
      "MODEL": "规格测试值",
      "CONFIG_TYPE": "配置类型测试值",
      "CONFIG_VALUE": "配置值测试值",
      "ENABLED": "是否激活测试值",
      "CONTROL_CONTENT": "管控内容测试值",
      "CONTROL_VALUE": "管控值测试值",
      "REMARK": "自动化测试备注001",
      "STATUS": "Y",
      "value2": "2026-08-01",
      "partNo": "AT-001",
      "CURRENT_OPERATION_ID": "自动化样例001",
      "NAME": "自动化样例001",
      "REPAIR_OPERATION_ID": "自动化样例001",
      "Name": "资源种类测试值",
      "COMPONENT_ID": "零件种类测试值",
      "ODM_COMPONENT_PN": "AT-001",
      "RESOURCE_ID": "采集资源维护测试值",
      "UID_ID": "UID种类测试值",
      "FORMAT": "格式限定测试值",
      "Key": "自动化样例001",
      "ChineseName": "配置类型测试值",
      "part_no": "AT-001",
      "BREAK_OPERATION_CODE": "拆板工序测试值"
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
        "search_but",
        "currentSearchClick",
        "repairSearchClick",
        "searchSOP",
        "CollectPartsSearch",
        "CollectSearch",
        "CollectUIDSearch",
        "CaseSearch",
        "PalletSearch",
        "search"
      ],
      "testData": {
        "WO_NO": "AT-001",
        "ROUTE_NAME": "AT-001",
        "PART_NO": "AT-001",
        "DESCRIPTION": "规格测试值",
        "PART_NAME": "自动化样例001",
        "VERSION": "版本号测试值",
        "MODEL": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "ENABLED": "是否激活测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "CURRENT_OPERATION_ID": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_OPERATION_ID": "自动化样例001",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "Key": "自动化样例001",
        "ChineseName": "配置类型测试值",
        "part_no": "AT-001",
        "BREAK_OPERATION_CODE": "拆板工序测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-34dcd",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertRow",
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
          "key": "WO_NO",
          "label": "原工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "PART_NAME",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "VERSION",
          "label": "版本号",
          "required": false,
          "example": "版本号测试值"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "CONFIG_TYPE",
          "label": "配置类型",
          "required": true,
          "example": "配置类型测试值"
        },
        {
          "key": "CONFIG_VALUE",
          "label": "配置值",
          "required": true,
          "example": "配置值测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "CONTROL_CONTENT",
          "label": "管控内容",
          "required": true,
          "example": "管控内容测试值"
        },
        {
          "key": "CONTROL_VALUE",
          "label": "管控值",
          "required": true,
          "example": "管控值测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "partNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CURRENT_OPERATION_ID",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "REPAIR_OPERATION_ID",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Name",
          "label": "资源种类",
          "required": true,
          "example": "资源种类测试值"
        },
        {
          "key": "COMPONENT_ID",
          "label": "零件种类",
          "required": true,
          "example": "零件种类测试值"
        },
        {
          "key": "ODM_COMPONENT_PN",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "RESOURCE_ID",
          "label": "采集资源维护",
          "required": false,
          "example": "采集资源维护测试值"
        },
        {
          "key": "UID_ID",
          "label": "UID种类",
          "required": true,
          "example": "UID种类测试值"
        },
        {
          "key": "FORMAT",
          "label": "格式限定",
          "required": true,
          "example": "格式限定测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "拆板工序",
          "required": false,
          "example": "拆板工序测试值"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "ROUTE_NAME": "AT-001",
        "PART_NO": "AT-001",
        "DESCRIPTION": "规格测试值",
        "PART_NAME": "自动化样例001",
        "VERSION": "版本号测试值",
        "MODEL": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "ENABLED": "是否激活测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "CURRENT_OPERATION_ID": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_OPERATION_ID": "自动化样例001",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "Key": "自动化样例001",
        "ChineseName": "配置类型测试值",
        "part_no": "AT-001",
        "BREAK_OPERATION_CODE": "拆板工序测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-0bb9c",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "opera_edit_but(row)",
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
          "key": "WO_NO",
          "label": "原工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "PART_NAME",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "VERSION",
          "label": "版本号",
          "required": false,
          "example": "版本号测试值"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "CONFIG_TYPE",
          "label": "配置类型",
          "required": true,
          "example": "配置类型测试值"
        },
        {
          "key": "CONFIG_VALUE",
          "label": "配置值",
          "required": true,
          "example": "配置值测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "CONTROL_CONTENT",
          "label": "管控内容",
          "required": true,
          "example": "管控内容测试值"
        },
        {
          "key": "CONTROL_VALUE",
          "label": "管控值",
          "required": true,
          "example": "管控值测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "value2",
          "label": "开始日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "partNo",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CURRENT_OPERATION_ID",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "REPAIR_OPERATION_ID",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "Name",
          "label": "资源种类",
          "required": true,
          "example": "资源种类测试值"
        },
        {
          "key": "COMPONENT_ID",
          "label": "零件种类",
          "required": true,
          "example": "零件种类测试值"
        },
        {
          "key": "ODM_COMPONENT_PN",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "RESOURCE_ID",
          "label": "采集资源维护",
          "required": false,
          "example": "采集资源维护测试值"
        },
        {
          "key": "UID_ID",
          "label": "UID种类",
          "required": true,
          "example": "UID种类测试值"
        },
        {
          "key": "FORMAT",
          "label": "格式限定",
          "required": true,
          "example": "格式限定测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "拆板工序",
          "required": false,
          "example": "拆板工序测试值"
        }
      ],
      "testData": {
        "WO_NO": "AT-001",
        "ROUTE_NAME": "AT-001",
        "PART_NO": "AT-001",
        "DESCRIPTION": "规格测试值",
        "PART_NAME": "自动化样例001",
        "VERSION": "版本号测试值",
        "MODEL": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "ENABLED": "是否激活测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "CURRENT_OPERATION_ID": "自动化样例001",
        "NAME": "自动化样例001",
        "REPAIR_OPERATION_ID": "自动化样例001",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "Key": "自动化样例001",
        "ChineseName": "配置类型测试值",
        "part_no": "AT-001",
        "BREAK_OPERATION_CODE": "拆板工序测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-eb036",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "rowRemoveClick(row, $rowIndex)",
      "permission": "NewProductEditDeleteProcess",
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
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "ProductPageReview2",
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
      "key": "7e002f9936-257bd22961-413dc",
      "type": "业务动作",
      "name": "取消审核业务入口校验",
      "label": "取消审核",
      "handler": "CancelReview_but",
      "permission": "ProductPageCancelReview2",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消审核",
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
      "key": "5f1787916c-a8b31ea72e-0d151",
      "type": "导入入口",
      "name": "上传资源业务入口校验",
      "label": "上传资源",
      "handler": "primary_upload_but()",
      "permission": "NewProductEditUploadResources2",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击上传资源",
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
      "key": "726b6ec55f-362aedce37-50c58",
      "type": "删除确认",
      "name": "批量删除确认框与取消操作",
      "label": "批量删除",
      "handler": "SelectCloumDelete",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击批量删除",
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
