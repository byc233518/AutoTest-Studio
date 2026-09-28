// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-wcs-ims-asrs-task-index-842d3f",
  "name": "仓储管理 - 任务管理功能校验",
  "displayName": "任务管理",
  "route": "/Wcs/ImsAsrsTask/Index",
  "sourceRoute": "/Wcs/ImsAsrsTask/Index",
  "menuCode": "ImsAsrsTask",
  "breadcrumb": "仓库管理 / 立库管理 / 任务管理",
  "sourceFile": "src/views/Wcs/ImsAsrsTask/Index.vue",
  "dataSchema": {
    "columns": [
      "TaskId",
      "TaskType",
      "TaskLevel",
      "BillCode",
      "ContainerCode",
      "ContainerType",
      "StoreCode",
      "DeviceCode",
      "FromPositionType",
      "FromPosition",
      "ToPositionType",
      "ToPosition",
      "Status"
    ],
    "required": [
      "TaskId",
      "TaskType",
      "TaskLevel",
      "BillCode",
      "ContainerCode",
      "ContainerType",
      "StoreCode",
      "DeviceCode",
      "FromPositionType",
      "FromPosition",
      "ToPositionType",
      "ToPosition",
      "Status"
    ],
    "fields": [
      {
        "key": "TaskId",
        "label": "任务编号",
        "required": true
      },
      {
        "key": "TaskType",
        "label": "任务类型",
        "required": true
      },
      {
        "key": "TaskLevel",
        "label": "任务等级",
        "required": true
      },
      {
        "key": "BillCode",
        "label": "单据号",
        "required": true
      },
      {
        "key": "ContainerCode",
        "label": "容器号",
        "required": true
      },
      {
        "key": "ContainerType",
        "label": "容器类型",
        "required": true
      },
      {
        "key": "StoreCode",
        "label": "区位码",
        "required": true
      },
      {
        "key": "DeviceCode",
        "label": "设备码",
        "required": true
      },
      {
        "key": "FromPositionType",
        "label": "起始位置类型",
        "required": true
      },
      {
        "key": "FromPosition",
        "label": "起始位置",
        "required": true
      },
      {
        "key": "ToPositionType",
        "label": "目标位置类型",
        "required": true
      },
      {
        "key": "ToPosition",
        "label": "目标位置",
        "required": true
      },
      {
        "key": "Status",
        "label": "处理状态",
        "required": true
      }
    ],
    "example": {
      "TaskId": "AT-001",
      "TaskType": "任务类型测试值",
      "TaskLevel": "任务等级测试值",
      "BillCode": "单据号测试值",
      "ContainerCode": "容器号测试值",
      "ContainerType": "容器类型测试值",
      "StoreCode": "区位码测试值",
      "DeviceCode": "设备码测试值",
      "FromPositionType": "起始位置类型测试值",
      "FromPosition": "起始位置测试值",
      "ToPositionType": "目标位置类型测试值",
      "ToPosition": "目标位置测试值",
      "Status": "Y"
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
        "TaskId": "AT-001",
        "TaskType": "任务类型测试值",
        "TaskLevel": "任务等级测试值",
        "BillCode": "单据号测试值",
        "ContainerCode": "容器号测试值",
        "ContainerType": "容器类型测试值",
        "StoreCode": "区位码测试值",
        "DeviceCode": "设备码测试值",
        "FromPositionType": "起始位置类型测试值",
        "FromPosition": "起始位置测试值",
        "ToPositionType": "目标位置类型测试值",
        "ToPosition": "目标位置测试值",
        "Status": "Y"
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
      "key": "13fd57e65b-2cd9e6ce81-58d1b",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add",
      "permission": "ImsAsrsTaskAdd",
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
          "key": "TaskId",
          "label": "任务编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TaskType",
          "label": "任务类型",
          "required": true,
          "example": "任务类型测试值"
        },
        {
          "key": "TaskLevel",
          "label": "任务等级",
          "required": true,
          "example": "任务等级测试值"
        },
        {
          "key": "BillCode",
          "label": "单据号",
          "required": true,
          "example": "单据号测试值"
        },
        {
          "key": "ContainerCode",
          "label": "容器号",
          "required": true,
          "example": "容器号测试值"
        },
        {
          "key": "ContainerType",
          "label": "容器类型",
          "required": true,
          "example": "容器类型测试值"
        },
        {
          "key": "StoreCode",
          "label": "区位码",
          "required": true,
          "example": "区位码测试值"
        },
        {
          "key": "DeviceCode",
          "label": "设备码",
          "required": true,
          "example": "设备码测试值"
        },
        {
          "key": "FromPositionType",
          "label": "起始位置类型",
          "required": true,
          "example": "起始位置类型测试值"
        },
        {
          "key": "FromPosition",
          "label": "起始位置",
          "required": true,
          "example": "起始位置测试值"
        },
        {
          "key": "ToPositionType",
          "label": "目标位置类型",
          "required": true,
          "example": "目标位置类型测试值"
        },
        {
          "key": "ToPosition",
          "label": "目标位置",
          "required": true,
          "example": "目标位置测试值"
        },
        {
          "key": "Status",
          "label": "处理状态",
          "required": true,
          "example": "Y"
        }
      ],
      "testData": {
        "TaskId": "AT-001",
        "TaskType": "任务类型测试值",
        "TaskLevel": "任务等级测试值",
        "BillCode": "单据号测试值",
        "ContainerCode": "容器号测试值",
        "ContainerType": "容器类型测试值",
        "StoreCode": "区位码测试值",
        "DeviceCode": "设备码测试值",
        "FromPositionType": "起始位置类型测试值",
        "FromPosition": "起始位置测试值",
        "ToPositionType": "目标位置类型测试值",
        "ToPosition": "目标位置测试值",
        "Status": "Y"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsAsrsTaskEdit",
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
          "key": "TaskId",
          "label": "任务编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TaskType",
          "label": "任务类型",
          "required": true,
          "example": "任务类型测试值"
        },
        {
          "key": "TaskLevel",
          "label": "任务等级",
          "required": true,
          "example": "任务等级测试值"
        },
        {
          "key": "BillCode",
          "label": "单据号",
          "required": true,
          "example": "单据号测试值"
        },
        {
          "key": "ContainerCode",
          "label": "容器号",
          "required": true,
          "example": "容器号测试值"
        },
        {
          "key": "ContainerType",
          "label": "容器类型",
          "required": true,
          "example": "容器类型测试值"
        },
        {
          "key": "StoreCode",
          "label": "区位码",
          "required": true,
          "example": "区位码测试值"
        },
        {
          "key": "DeviceCode",
          "label": "设备码",
          "required": true,
          "example": "设备码测试值"
        },
        {
          "key": "FromPositionType",
          "label": "起始位置类型",
          "required": true,
          "example": "起始位置类型测试值"
        },
        {
          "key": "FromPosition",
          "label": "起始位置",
          "required": true,
          "example": "起始位置测试值"
        },
        {
          "key": "ToPositionType",
          "label": "目标位置类型",
          "required": true,
          "example": "目标位置类型测试值"
        },
        {
          "key": "ToPosition",
          "label": "目标位置",
          "required": true,
          "example": "目标位置测试值"
        },
        {
          "key": "Status",
          "label": "处理状态",
          "required": true,
          "example": "Y"
        }
      ],
      "testData": {
        "TaskId": "AT-001",
        "TaskType": "任务类型测试值",
        "TaskLevel": "任务等级测试值",
        "BillCode": "单据号测试值",
        "ContainerCode": "容器号测试值",
        "ContainerType": "容器类型测试值",
        "StoreCode": "区位码测试值",
        "DeviceCode": "设备码测试值",
        "FromPositionType": "起始位置类型测试值",
        "FromPosition": "起始位置测试值",
        "ToPositionType": "目标位置类型测试值",
        "ToPosition": "目标位置测试值",
        "Status": "Y"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsAsrsTaskRemove",
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
