// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-prod-routes-index-bafc95",
  "name": "制造执行 - 产品工艺配置功能校验",
  "displayName": "产品工艺配置",
  "route": "/iMES6/ProdRoutes/Index",
  "sourceRoute": "/iMES6/ProdRoutes/Index",
  "menuCode": "iMES6_ProdRoutes",
  "breadcrumb": "基础设定 / 工艺配置 / 产品工艺配置",
  "sourceFile": "src/views/iMES6/ProdRoutes/Index.vue",
  "dataSchema": {
    "columns": [
      "PartNo",
      "RoutesTempMstId",
      "RouteName",
      "RouteType",
      "Enabled",
      "IsTempLate",
      "Description",
      "PartName",
      "PartDesc",
      "operationName",
      "repairOperationId",
      "reworkOperationId",
      "isControl",
      "isPass",
      "remark",
      "Version",
      "RouteTypeName",
      "RoutesTempName",
      "Name",
      "ObejctId",
      "DataFormat"
    ],
    "required": [
      "PartNo",
      "RouteName",
      "RouteType",
      "Description",
      "operationName",
      "repairOperationId",
      "reworkOperationId",
      "Name",
      "ObejctId",
      "DataFormat"
    ],
    "fields": [
      {
        "key": "PartNo",
        "label": "料号",
        "required": true
      },
      {
        "key": "RoutesTempMstId",
        "label": "来源模板",
        "required": false
      },
      {
        "key": "RouteName",
        "label": "工艺名称",
        "required": true
      },
      {
        "key": "RouteType",
        "label": "类型",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "IsTempLate",
        "label": "是否通用模板",
        "required": false
      },
      {
        "key": "Description",
        "label": "描述",
        "required": true
      },
      {
        "key": "PartName",
        "label": "品名",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "规格",
        "required": false
      },
      {
        "key": "operationName",
        "label": "工序",
        "required": true
      },
      {
        "key": "repairOperationId",
        "label": "维修工序",
        "required": true
      },
      {
        "key": "reworkOperationId",
        "label": "返工工序",
        "required": true
      },
      {
        "key": "isControl",
        "label": "工序管控",
        "required": false
      },
      {
        "key": "isPass",
        "label": "是否扫码过站",
        "required": false
      },
      {
        "key": "remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "Version",
        "label": "只读",
        "required": false
      },
      {
        "key": "RouteTypeName",
        "label": "只读",
        "required": false
      },
      {
        "key": "RoutesTempName",
        "label": "只读",
        "required": false
      },
      {
        "key": "Name",
        "label": "资源名称",
        "required": true
      },
      {
        "key": "ObejctId",
        "label": "零件名称",
        "required": true
      },
      {
        "key": "DataFormat",
        "label": "格式限定",
        "required": true
      }
    ],
    "example": {
      "PartNo": "AT-001",
      "RoutesTempMstId": "来源模板测试值",
      "RouteName": "自动化样例001",
      "RouteType": "类型测试值",
      "Enabled": "Y",
      "IsTempLate": "是否通用模板测试值",
      "Description": "自动化测试备注001",
      "PartName": "自动化样例001",
      "PartDesc": "规格测试值",
      "operationName": "工序测试值",
      "repairOperationId": "维修工序测试值",
      "reworkOperationId": "返工工序测试值",
      "isControl": "工序管控测试值",
      "isPass": "是否扫码过站测试值",
      "remark": "自动化测试备注001",
      "Version": "只读测试值",
      "RouteTypeName": "只读测试值",
      "RoutesTempName": "只读测试值",
      "Name": "自动化样例001",
      "ObejctId": "自动化样例001",
      "DataFormat": "格式限定测试值"
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
        "search"
      ],
      "testData": {
        "PartNo": "AT-001",
        "RoutesTempMstId": "来源模板测试值",
        "RouteName": "自动化样例001",
        "RouteType": "类型测试值",
        "Enabled": "Y",
        "IsTempLate": "是否通用模板测试值",
        "Description": "自动化测试备注001",
        "PartName": "自动化样例001",
        "PartDesc": "规格测试值",
        "operationName": "工序测试值",
        "repairOperationId": "维修工序测试值",
        "reworkOperationId": "返工工序测试值",
        "isControl": "工序管控测试值",
        "isPass": "是否扫码过站测试值",
        "remark": "自动化测试备注001",
        "Version": "只读测试值",
        "RouteTypeName": "只读测试值",
        "RoutesTempName": "只读测试值",
        "Name": "自动化样例001",
        "ObejctId": "自动化样例001",
        "DataFormat": "格式限定测试值"
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
          "key": "PartNo",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "RoutesTempMstId",
          "label": "来源模板",
          "required": false,
          "example": "来源模板测试值"
        },
        {
          "key": "RouteName",
          "label": "工艺名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "RouteType",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "IsTempLate",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "PartName",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PartDesc",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "operationName",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "repairOperationId",
          "label": "维修工序",
          "required": true,
          "example": "维修工序测试值"
        },
        {
          "key": "reworkOperationId",
          "label": "返工工序",
          "required": true,
          "example": "返工工序测试值"
        },
        {
          "key": "isControl",
          "label": "工序管控",
          "required": false,
          "example": "工序管控测试值"
        },
        {
          "key": "isPass",
          "label": "是否扫码过站",
          "required": false,
          "example": "是否扫码过站测试值"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Version",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
        },
        {
          "key": "RouteTypeName",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
        },
        {
          "key": "RoutesTempName",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
        },
        {
          "key": "Name",
          "label": "资源名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ObejctId",
          "label": "零件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "DataFormat",
          "label": "格式限定",
          "required": true,
          "example": "格式限定测试值"
        }
      ],
      "testData": {
        "PartNo": "AT-001",
        "RoutesTempMstId": "来源模板测试值",
        "RouteName": "自动化样例001",
        "RouteType": "类型测试值",
        "Enabled": "Y",
        "IsTempLate": "是否通用模板测试值",
        "Description": "自动化测试备注001",
        "PartName": "自动化样例001",
        "PartDesc": "规格测试值",
        "operationName": "工序测试值",
        "repairOperationId": "维修工序测试值",
        "reworkOperationId": "返工工序测试值",
        "isControl": "工序管控测试值",
        "isPass": "是否扫码过站测试值",
        "remark": "自动化测试备注001",
        "Version": "只读测试值",
        "RouteTypeName": "只读测试值",
        "RoutesTempName": "只读测试值",
        "Name": "自动化样例001",
        "ObejctId": "自动化样例001",
        "DataFormat": "格式限定测试值"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "Review",
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
      "permission": "CancelReview",
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
      "key": "7e002f9936-e4850a3376-ff586",
      "type": "业务动作",
      "name": "批量复制业务入口校验",
      "label": "批量复制",
      "handler": "copy_but(2)",
      "permission": "Copy",
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
      "key": "5f1787916c-sop-0bf75",
      "type": "导入入口",
      "name": "批量上传SOP业务入口校验",
      "label": "批量上传SOP",
      "handler": "$refs.BatchSopDialog.handleLoadData()",
      "permission": "BatchSop",
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
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-20462",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openBasicFormEditor('Edit', row)",
      "permission": "Edit",
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
          "key": "PartNo",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "RoutesTempMstId",
          "label": "来源模板",
          "required": false,
          "example": "来源模板测试值"
        },
        {
          "key": "RouteName",
          "label": "工艺名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "RouteType",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "IsTempLate",
          "label": "是否通用模板",
          "required": false,
          "example": "是否通用模板测试值"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "PartName",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PartDesc",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "operationName",
          "label": "工序",
          "required": true,
          "example": "工序测试值"
        },
        {
          "key": "repairOperationId",
          "label": "维修工序",
          "required": true,
          "example": "维修工序测试值"
        },
        {
          "key": "reworkOperationId",
          "label": "返工工序",
          "required": true,
          "example": "返工工序测试值"
        },
        {
          "key": "isControl",
          "label": "工序管控",
          "required": false,
          "example": "工序管控测试值"
        },
        {
          "key": "isPass",
          "label": "是否扫码过站",
          "required": false,
          "example": "是否扫码过站测试值"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Version",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
        },
        {
          "key": "RouteTypeName",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
        },
        {
          "key": "RoutesTempName",
          "label": "只读",
          "required": false,
          "example": "只读测试值"
        },
        {
          "key": "Name",
          "label": "资源名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ObejctId",
          "label": "零件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "DataFormat",
          "label": "格式限定",
          "required": true,
          "example": "格式限定测试值"
        }
      ],
      "testData": {
        "PartNo": "AT-001",
        "RoutesTempMstId": "来源模板测试值",
        "RouteName": "自动化样例001",
        "RouteType": "类型测试值",
        "Enabled": "Y",
        "IsTempLate": "是否通用模板测试值",
        "Description": "自动化测试备注001",
        "PartName": "自动化样例001",
        "PartDesc": "规格测试值",
        "operationName": "工序测试值",
        "repairOperationId": "维修工序测试值",
        "reworkOperationId": "返工工序测试值",
        "isControl": "工序管控测试值",
        "isPass": "是否扫码过站测试值",
        "remark": "自动化测试备注001",
        "Version": "只读测试值",
        "RouteTypeName": "只读测试值",
        "RoutesTempName": "只读测试值",
        "Name": "自动化样例001",
        "ObejctId": "自动化样例001",
        "DataFormat": "格式限定测试值"
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
      "key": "5f1787916c-a8b31ea72e-f5385",
      "type": "导入入口",
      "name": "上传资源业务入口校验",
      "label": "上传资源",
      "handler": "primary_upload_but",
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
    }
  ]
});
