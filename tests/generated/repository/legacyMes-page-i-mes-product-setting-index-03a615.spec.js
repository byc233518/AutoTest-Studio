// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-product-setting-index-03a615",
  "name": "旧版制造执行 - 料号（未配置菜单）功能校验",
  "displayName": "料号（未配置菜单）",
  "route": "/iMES/ProductSetting/Index",
  "sourceRoute": "/iMES/ProductSetting/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 料号（未配置菜单）",
  "sourceFile": "src/views/iMES/ProductSetting/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "ROUTE_NAME",
      "PART_NO_NEW",
      "ROUTE_NAME_NEW",
      "DESCRIPTION_NEW",
      "CONFIG_TYPE",
      "CONFIG_VALUE",
      "DESCRIPTION",
      "ENABLED",
      "part_no",
      "route_name",
      "BREAK_OPERATION_CODE",
      "IS_TEMPLATE",
      "ROUTE_ID",
      "CONTROL_CONTENT",
      "CONTROL_VALUE",
      "REMARK",
      "STATUS",
      "value2",
      "partNo",
      "VERSION",
      "Name",
      "COMPONENT_ID",
      "ODM_COMPONENT_PN",
      "RESOURCE_ID",
      "UID_ID",
      "FORMAT",
      "ChineseName",
      "Key"
    ],
    "required": [
      "PART_NO",
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
        "key": "PART_NO",
        "label": "原料号",
        "required": true
      },
      {
        "key": "ROUTE_NAME",
        "label": "原名称",
        "required": false
      },
      {
        "key": "PART_NO_NEW",
        "label": "目标料号",
        "required": false
      },
      {
        "key": "ROUTE_NAME_NEW",
        "label": "名称",
        "required": false
      },
      {
        "key": "DESCRIPTION_NEW",
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
        "key": "DESCRIPTION",
        "label": "描述",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "part_no",
        "label": "料号",
        "required": false
      },
      {
        "key": "route_name",
        "label": "制程",
        "required": false
      },
      {
        "key": "BREAK_OPERATION_CODE",
        "label": "工序",
        "required": false
      },
      {
        "key": "IS_TEMPLATE",
        "label": "是否通用模板",
        "required": false
      },
      {
        "key": "ROUTE_ID",
        "label": "工艺模板",
        "required": false
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
        "key": "VERSION",
        "label": "只读",
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
        "key": "ChineseName",
        "label": "配置类型",
        "required": false
      },
      {
        "key": "Key",
        "label": "工序名称",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "ROUTE_NAME": "自动化样例001",
      "PART_NO_NEW": "AT-001",
      "ROUTE_NAME_NEW": "自动化样例001",
      "DESCRIPTION_NEW": "规格测试值",
      "CONFIG_TYPE": "配置类型测试值",
      "CONFIG_VALUE": "配置值测试值",
      "DESCRIPTION": "自动化测试备注001",
      "ENABLED": "是否激活测试值",
      "part_no": "AT-001",
      "route_name": "制程测试值",
      "BREAK_OPERATION_CODE": "工序测试值",
      "IS_TEMPLATE": "是否通用模板测试值",
      "ROUTE_ID": "工艺模板测试值",
      "CONTROL_CONTENT": "管控内容测试值",
      "CONTROL_VALUE": "管控值测试值",
      "REMARK": "自动化测试备注001",
      "STATUS": "Y",
      "value2": "2026-08-01",
      "partNo": "AT-001",
      "VERSION": "只读测试值",
      "Name": "资源种类测试值",
      "COMPONENT_ID": "零件种类测试值",
      "ODM_COMPONENT_PN": "AT-001",
      "RESOURCE_ID": "采集资源维护测试值",
      "UID_ID": "UID种类测试值",
      "FORMAT": "格式限定测试值",
      "ChineseName": "配置类型测试值",
      "Key": "自动化样例001"
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
        "searchSOP(1)",
        "CollectPartsSearch",
        "CollectSearch",
        "CollectUIDSearch",
        "CaseSearch",
        "PalletSearch",
        "SystemClick",
        "search"
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_name": "制程测试值",
        "BREAK_OPERATION_CODE": "工序测试值",
        "IS_TEMPLATE": "是否通用模板测试值",
        "ROUTE_ID": "工艺模板测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "VERSION": "只读测试值",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "ChineseName": "配置类型测试值",
        "Key": "自动化样例001"
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
      "permission": "collectionSfcsProductComponentsAdd",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "目标料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
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
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "route_name",
          "label": "制程",
          "required": false,
          "example": "制程测试值"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "IS_TEMPLATE",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "ROUTE_ID",
          "label": "工艺模板",
          "required": false,
          "example": "工艺模板测试值"
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
          "key": "VERSION",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
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
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_name": "制程测试值",
        "BREAK_OPERATION_CODE": "工序测试值",
        "IS_TEMPLATE": "是否通用模板测试值",
        "ROUTE_ID": "工艺模板测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "VERSION": "只读测试值",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "ChineseName": "配置类型测试值",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-38d51",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "opera_edit_but(scope.row)",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "目标料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
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
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "route_name",
          "label": "制程",
          "required": false,
          "example": "制程测试值"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "IS_TEMPLATE",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "ROUTE_ID",
          "label": "工艺模板",
          "required": false,
          "example": "工艺模板测试值"
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
          "key": "VERSION",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
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
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_name": "制程测试值",
        "BREAK_OPERATION_CODE": "工序测试值",
        "IS_TEMPLATE": "是否通用模板测试值",
        "ROUTE_ID": "工艺模板测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "VERSION": "只读测试值",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "ChineseName": "配置类型测试值",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "ProductPageReview",
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
      "permission": "ProductPageCancelReview",
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
      "key": "7e002f9936-4edd1d0087-65d8c",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "copy_but(1)",
      "permission": "ProductPageCopy",
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
      "key": "7e002f9936-e4850a3376-ff586",
      "type": "业务动作",
      "name": "批量复制业务入口校验",
      "label": "批量复制",
      "handler": "copy_but(2)",
      "permission": "BatchSOPCopySaveNewBulkcopy",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位批量复制",
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
      "key": "5f1787916c-sop-5b660",
      "type": "导入入口",
      "name": "批量上传SOP业务入口校验",
      "label": "批量上传SOP",
      "handler": "handleBatchSop",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击批量上传SOP",
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
      "key": "5f1787916c-4d42a46878-4d42a",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
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
      "key": "ef879b4ced-1553af6b72-75677",
      "type": "导出入口",
      "name": "导出文档业务入口校验",
      "label": "导出文档",
      "handler": "handelExportExcel",
      "permission": "SimpleSOPRoutesExport",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出文档",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-6b23c49c71-03f5e",
      "type": "业务动作",
      "name": "拆板配置业务入口校验",
      "label": "拆板配置",
      "handler": "ConPlate",
      "permission": "SfcsProductMultiSaveData",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击拆板配置",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-184a5a33f7-75416",
      "type": "业务动作",
      "name": "产品配置业务入口校验",
      "label": "产品配置",
      "handler": "Configuration",
      "permission": "NewProductEditConfiguration",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击产品配置",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-62349c3a97-978e8",
      "type": "编辑表单",
      "name": "编辑制程业务入口校验",
      "label": "编辑制程",
      "handler": "Edited",
      "permission": "EditProcess",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑制程",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "目标料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
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
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "route_name",
          "label": "制程",
          "required": false,
          "example": "制程测试值"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "IS_TEMPLATE",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "ROUTE_ID",
          "label": "工艺模板",
          "required": false,
          "example": "工艺模板测试值"
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
          "key": "VERSION",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
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
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_name": "制程测试值",
        "BREAK_OPERATION_CODE": "工序测试值",
        "IS_TEMPLATE": "是否通用模板测试值",
        "ROUTE_ID": "工艺模板测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "VERSION": "只读测试值",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "ChineseName": "配置类型测试值",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "13fd57e65b-55bcd8a52a-64ad6",
      "type": "新增表单",
      "name": "添加工序业务入口校验",
      "label": "添加工序",
      "handler": "add_process_but",
      "permission": "NewProductEditProcess",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加工序",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "目标料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
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
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "route_name",
          "label": "制程",
          "required": false,
          "example": "制程测试值"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "IS_TEMPLATE",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "ROUTE_ID",
          "label": "工艺模板",
          "required": false,
          "example": "工艺模板测试值"
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
          "key": "VERSION",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
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
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_name": "制程测试值",
        "BREAK_OPERATION_CODE": "工序测试值",
        "IS_TEMPLATE": "是否通用模板测试值",
        "ROUTE_ID": "工艺模板测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "VERSION": "只读测试值",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "ChineseName": "配置类型测试值",
        "Key": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-03dc32caa0-99483",
      "type": "删除确认",
      "name": "删除工序确认框与取消操作",
      "label": "删除工序",
      "handler": "primary_remove_but",
      "permission": "NewProductEditDeleteProcess",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除工序",
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
      "key": "5f1787916c-a8b31ea72e-c0165",
      "type": "导入入口",
      "name": "上传资源业务入口校验",
      "label": "上传资源",
      "handler": "primary_upload_but(1)",
      "permission": "NewProductEditUploadResources",
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
      "key": "726b6ec55f-362aedce37-bfea1",
      "type": "删除确认",
      "name": "批量删除确认框与取消操作",
      "label": "批量删除",
      "handler": "batchDeleteRows",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
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
    },
    {
      "key": "726b6ec55f-3755f56f2f-2b5c3",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "opera_delete_but(scope.row,scope.$index, 'operaTable')",
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
    },
    {
      "key": "13fd57e65b-94191ce210-bb043",
      "type": "新增表单",
      "name": "添加业务入口校验",
      "label": "添加",
      "handler": "openProcessDialog",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加",
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
          "key": "PART_NO",
          "label": "原料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME",
          "label": "原名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PART_NO_NEW",
          "label": "目标料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ROUTE_NAME_NEW",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION_NEW",
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
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "part_no",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "route_name",
          "label": "制程",
          "required": false,
          "example": "制程测试值"
        },
        {
          "key": "BREAK_OPERATION_CODE",
          "label": "工序",
          "required": false,
          "example": "工序测试值"
        },
        {
          "key": "IS_TEMPLATE",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "ROUTE_ID",
          "label": "工艺模板",
          "required": false,
          "example": "工艺模板测试值"
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
          "key": "VERSION",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
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
          "key": "ChineseName",
          "label": "配置类型",
          "required": false,
          "example": "配置类型测试值"
        },
        {
          "key": "Key",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "ROUTE_NAME": "自动化样例001",
        "PART_NO_NEW": "AT-001",
        "ROUTE_NAME_NEW": "自动化样例001",
        "DESCRIPTION_NEW": "规格测试值",
        "CONFIG_TYPE": "配置类型测试值",
        "CONFIG_VALUE": "配置值测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否激活测试值",
        "part_no": "AT-001",
        "route_name": "制程测试值",
        "BREAK_OPERATION_CODE": "工序测试值",
        "IS_TEMPLATE": "是否通用模板测试值",
        "ROUTE_ID": "工艺模板测试值",
        "CONTROL_CONTENT": "管控内容测试值",
        "CONTROL_VALUE": "管控值测试值",
        "REMARK": "自动化测试备注001",
        "STATUS": "Y",
        "value2": "2026-08-01",
        "partNo": "AT-001",
        "VERSION": "只读测试值",
        "Name": "资源种类测试值",
        "COMPONENT_ID": "零件种类测试值",
        "ODM_COMPONENT_PN": "AT-001",
        "RESOURCE_ID": "采集资源维护测试值",
        "UID_ID": "UID种类测试值",
        "FORMAT": "格式限定测试值",
        "ChineseName": "配置类型测试值",
        "Key": "自动化样例001"
      }
    }
  ]
});
