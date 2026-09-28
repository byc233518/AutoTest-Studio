// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-routes-flow-design-temp-index-7f7ffa",
  "name": "制造执行 - 工艺模板功能校验",
  "displayName": "工艺模板",
  "route": "/iMES6/RoutesFlowDesignTemp/Index",
  "sourceRoute": "/iMES6/RoutesFlowDesignTemp/Index",
  "menuCode": "RoutesFlowDesignTemp",
  "breadcrumb": "基础设定 / 工艺配置 / 工艺模板",
  "sourceFile": "src/views/iMES6/RoutesFlowDesignTemp/Index.vue",
  "dataSchema": {
    "columns": [
      "Name",
      "RouteType",
      "RouteClassName",
      "Enabled",
      "Description",
      "operationName",
      "repairOperationId",
      "reworkOperationId",
      "isControl",
      "isPass",
      "remark",
      "Version",
      "RouteTypeName",
      "RoutesTempName",
      "ObejctId",
      "PartNo",
      "DataFormat"
    ],
    "required": [
      "Name",
      "RouteType",
      "Description",
      "operationName",
      "repairOperationId",
      "reworkOperationId",
      "ObejctId",
      "PartNo",
      "DataFormat"
    ],
    "fields": [
      {
        "key": "Name",
        "label": "工艺名称",
        "required": true
      },
      {
        "key": "RouteType",
        "label": "类型",
        "required": true
      },
      {
        "key": "RouteClassName",
        "label": "车间",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "Description",
        "label": "描述",
        "required": true
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
        "key": "ObejctId",
        "label": "零件名称",
        "required": true
      },
      {
        "key": "PartNo",
        "label": "零件料号",
        "required": true
      },
      {
        "key": "DataFormat",
        "label": "格式限定",
        "required": true
      }
    ],
    "example": {
      "Name": "自动化样例001",
      "RouteType": "类型测试值",
      "RouteClassName": "车间测试值",
      "Enabled": "Y",
      "Description": "自动化测试备注001",
      "operationName": "工序测试值",
      "repairOperationId": "维修工序测试值",
      "reworkOperationId": "返工工序测试值",
      "isControl": "工序管控测试值",
      "isPass": "是否扫码过站测试值",
      "remark": "自动化测试备注001",
      "Version": "只读测试值",
      "RouteTypeName": "只读测试值",
      "RoutesTempName": "只读测试值",
      "ObejctId": "自动化样例001",
      "PartNo": "AT-001",
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
        "Name": "自动化样例001",
        "RouteType": "类型测试值",
        "RouteClassName": "车间测试值",
        "Enabled": "Y",
        "Description": "自动化测试备注001",
        "operationName": "工序测试值",
        "repairOperationId": "维修工序测试值",
        "reworkOperationId": "返工工序测试值",
        "isControl": "工序管控测试值",
        "isPass": "是否扫码过站测试值",
        "remark": "自动化测试备注001",
        "Version": "只读测试值",
        "RouteTypeName": "只读测试值",
        "RoutesTempName": "只读测试值",
        "ObejctId": "自动化样例001",
        "PartNo": "AT-001",
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
          "key": "Name",
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
          "key": "RouteClassName",
          "label": "车间",
          "required": false,
          "example": "车间测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
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
          "key": "ObejctId",
          "label": "零件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartNo",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "DataFormat",
          "label": "格式限定",
          "required": true,
          "example": "格式限定测试值"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "RouteType": "类型测试值",
        "RouteClassName": "车间测试值",
        "Enabled": "Y",
        "Description": "自动化测试备注001",
        "operationName": "工序测试值",
        "repairOperationId": "维修工序测试值",
        "reworkOperationId": "返工工序测试值",
        "isControl": "工序管控测试值",
        "isPass": "是否扫码过站测试值",
        "remark": "自动化测试备注001",
        "Version": "只读测试值",
        "RouteTypeName": "只读测试值",
        "RoutesTempName": "只读测试值",
        "ObejctId": "自动化样例001",
        "PartNo": "AT-001",
        "DataFormat": "格式限定测试值"
      }
    },
    {
      "key": "7e002f9936-94f172d02f-34bbe",
      "type": "业务动作",
      "name": "发布业务入口校验",
      "label": "发布",
      "handler": "review_but",
      "permission": "Review",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位发布",
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
      "key": "7e002f9936-2761f9be64-413dc",
      "type": "业务动作",
      "name": "取消发布业务入口校验",
      "label": "取消发布",
      "handler": "CancelReview_but",
      "permission": "CancelReview",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位取消发布",
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
          "key": "Name",
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
          "key": "RouteClassName",
          "label": "车间",
          "required": false,
          "example": "车间测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
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
          "key": "ObejctId",
          "label": "零件名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartNo",
          "label": "零件料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "DataFormat",
          "label": "格式限定",
          "required": true,
          "example": "格式限定测试值"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "RouteType": "类型测试值",
        "RouteClassName": "车间测试值",
        "Enabled": "Y",
        "Description": "自动化测试备注001",
        "operationName": "工序测试值",
        "repairOperationId": "维修工序测试值",
        "reworkOperationId": "返工工序测试值",
        "isControl": "工序管控测试值",
        "isPass": "是否扫码过站测试值",
        "remark": "自动化测试备注001",
        "Version": "只读测试值",
        "RouteTypeName": "只读测试值",
        "RoutesTempName": "只读测试值",
        "ObejctId": "自动化样例001",
        "PartNo": "AT-001",
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
