// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-msd-runcard-view-index-5ae960",
  "name": "仓储管理 - MSD管理功能校验",
  "displayName": "MSD管理",
  "route": "/ImsMsdRuncardView/Index",
  "sourceRoute": "/ImsMsdRuncardView/Index",
  "menuCode": "ImsMsdRuncardView",
  "breadcrumb": "仓库管理 / 湿敏管理 / MSD管理",
  "sourceFile": "src/views/ImsMsdRuncardView/Index.vue",
  "dataSchema": {
    "columns": [
      "TenantId",
      "OrganizeId",
      "CreatedTime",
      "CreatedBy",
      "CreatedOrgId",
      "UpdatedTime",
      "UpdatedBy",
      "UpdatedOrgId",
      "Deleted",
      "ReelCode",
      "CurrentAction",
      "Temperature",
      "Humidity",
      "TotalOpenTime",
      "Status",
      "Operator",
      "BeginTime",
      "EndTime",
      "FloorLifeEndTime",
      "LevelCode",
      "Thickness",
      "ActionLocation",
      "Description",
      "Att1",
      "Att2",
      "Att3",
      "Att4",
      "Att5",
      "Num1",
      "Num2",
      "Num3",
      "Num4",
      "Num5",
      "Dt1",
      "Dt2",
      "Dt3",
      "Dt4",
      "Dt5"
    ],
    "required": [],
    "fields": [
      {
        "key": "TenantId",
        "label": "租户ID",
        "required": false
      },
      {
        "key": "OrganizeId",
        "label": "组织ID",
        "required": false
      },
      {
        "key": "CreatedTime",
        "label": "创建时间",
        "required": false
      },
      {
        "key": "CreatedBy",
        "label": "创建人",
        "required": false
      },
      {
        "key": "CreatedOrgId",
        "label": "创建人组织ID",
        "required": false
      },
      {
        "key": "UpdatedTime",
        "label": "更新时间",
        "required": false
      },
      {
        "key": "UpdatedBy",
        "label": "最后更新人",
        "required": false
      },
      {
        "key": "UpdatedOrgId",
        "label": "更新人组织ID",
        "required": false
      },
      {
        "key": "Deleted",
        "label": "删除标记",
        "required": false
      },
      {
        "key": "ReelCode",
        "label": "条码号",
        "required": false
      },
      {
        "key": "CurrentAction",
        "label": "当前管控代码",
        "required": false
      },
      {
        "key": "Temperature",
        "label": "环境温度",
        "required": false
      },
      {
        "key": "Humidity",
        "label": "环境湿度",
        "required": false
      },
      {
        "key": "TotalOpenTime",
        "label": "总计暴露时间",
        "required": false
      },
      {
        "key": "Status",
        "label": "状态",
        "required": false
      },
      {
        "key": "Operator",
        "label": "作业人员",
        "required": false
      },
      {
        "key": "BeginTime",
        "label": "管控开始时间",
        "required": false
      },
      {
        "key": "EndTime",
        "label": "管控结束时间",
        "required": false
      },
      {
        "key": "FloorLifeEndTime",
        "label": "生命完结时间",
        "required": false
      },
      {
        "key": "LevelCode",
        "label": "潮敏等级",
        "required": false
      },
      {
        "key": "Thickness",
        "label": "厚度",
        "required": false
      },
      {
        "key": "ActionLocation",
        "label": "作业地点",
        "required": false
      },
      {
        "key": "Description",
        "label": "备注说明",
        "required": false
      },
      {
        "key": "Att1",
        "label": "扩展1",
        "required": false
      },
      {
        "key": "Att2",
        "label": "扩展2",
        "required": false
      },
      {
        "key": "Att3",
        "label": "扩展3",
        "required": false
      },
      {
        "key": "Att4",
        "label": "扩展4",
        "required": false
      },
      {
        "key": "Att5",
        "label": "扩展5",
        "required": false
      },
      {
        "key": "Num1",
        "label": "备用数值1",
        "required": false
      },
      {
        "key": "Num2",
        "label": "备用数值2",
        "required": false
      },
      {
        "key": "Num3",
        "label": "备用数值3",
        "required": false
      },
      {
        "key": "Num4",
        "label": "备用数值4",
        "required": false
      },
      {
        "key": "Num5",
        "label": "备用数值5",
        "required": false
      },
      {
        "key": "Dt1",
        "label": "备用日期1",
        "required": false
      },
      {
        "key": "Dt2",
        "label": "备用日期2",
        "required": false
      },
      {
        "key": "Dt3",
        "label": "备用日期3",
        "required": false
      },
      {
        "key": "Dt4",
        "label": "备用日期4",
        "required": false
      },
      {
        "key": "Dt5",
        "label": "备用日期5",
        "required": false
      }
    ],
    "example": {
      "TenantId": "AT-001",
      "OrganizeId": "AT-001",
      "CreatedTime": "2026-08-01",
      "CreatedBy": "创建人测试值",
      "CreatedOrgId": "AT-001",
      "UpdatedTime": "2026-08-01",
      "UpdatedBy": "最后更新人测试值",
      "UpdatedOrgId": "AT-001",
      "Deleted": "删除标记测试值",
      "ReelCode": "条码号测试值",
      "CurrentAction": "当前管控代码测试值",
      "Temperature": "环境温度测试值",
      "Humidity": "环境湿度测试值",
      "TotalOpenTime": "2026-08-01",
      "Status": "Y",
      "Operator": "作业人员测试值",
      "BeginTime": "2026-08-01",
      "EndTime": "2026-08-01",
      "FloorLifeEndTime": "2026-08-01",
      "LevelCode": "潮敏等级测试值",
      "Thickness": "厚度测试值",
      "ActionLocation": "作业地点测试值",
      "Description": "自动化测试备注001",
      "Att1": "扩展1测试值",
      "Att2": "扩展2测试值",
      "Att3": "扩展3测试值",
      "Att4": "扩展4测试值",
      "Att5": "扩展5测试值",
      "Num1": "备用数值1测试值",
      "Num2": "备用数值2测试值",
      "Num3": "备用数值3测试值",
      "Num4": "备用数值4测试值",
      "Num5": "备用数值5测试值",
      "Dt1": "备用日期1测试值",
      "Dt2": "备用日期2测试值",
      "Dt3": "备用日期3测试值",
      "Dt4": "备用日期4测试值",
      "Dt5": "备用日期5测试值"
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
        "imsMsdRuncardHistorySearch()"
      ],
      "testData": {
        "TenantId": "AT-001",
        "OrganizeId": "AT-001",
        "CreatedTime": "2026-08-01",
        "CreatedBy": "创建人测试值",
        "CreatedOrgId": "AT-001",
        "UpdatedTime": "2026-08-01",
        "UpdatedBy": "最后更新人测试值",
        "UpdatedOrgId": "AT-001",
        "Deleted": "删除标记测试值",
        "ReelCode": "条码号测试值",
        "CurrentAction": "当前管控代码测试值",
        "Temperature": "环境温度测试值",
        "Humidity": "环境湿度测试值",
        "TotalOpenTime": "2026-08-01",
        "Status": "Y",
        "Operator": "作业人员测试值",
        "BeginTime": "2026-08-01",
        "EndTime": "2026-08-01",
        "FloorLifeEndTime": "2026-08-01",
        "LevelCode": "潮敏等级测试值",
        "Thickness": "厚度测试值",
        "ActionLocation": "作业地点测试值",
        "Description": "自动化测试备注001",
        "Att1": "扩展1测试值",
        "Att2": "扩展2测试值",
        "Att3": "扩展3测试值",
        "Att4": "扩展4测试值",
        "Att5": "扩展5测试值",
        "Num1": "备用数值1测试值",
        "Num2": "备用数值2测试值",
        "Num3": "备用数值3测试值",
        "Num4": "备用数值4测试值",
        "Num5": "备用数值5测试值",
        "Dt1": "备用日期1测试值",
        "Dt2": "备用日期2测试值",
        "Dt3": "备用日期3测试值",
        "Dt4": "备用日期4测试值",
        "Dt5": "备用日期5测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-5fe92",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addImsMsdRuncardHistory(0)",
      "permission": "",
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
          "key": "TenantId",
          "label": "租户ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "OrganizeId",
          "label": "组织ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CreatedTime",
          "label": "创建时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "CreatedBy",
          "label": "创建人",
          "required": false,
          "example": "创建人测试值"
        },
        {
          "key": "CreatedOrgId",
          "label": "创建人组织ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "UpdatedTime",
          "label": "更新时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "UpdatedBy",
          "label": "最后更新人",
          "required": false,
          "example": "最后更新人测试值"
        },
        {
          "key": "UpdatedOrgId",
          "label": "更新人组织ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "Deleted",
          "label": "删除标记",
          "required": false,
          "example": "删除标记测试值"
        },
        {
          "key": "ReelCode",
          "label": "条码号",
          "required": false,
          "example": "条码号测试值"
        },
        {
          "key": "CurrentAction",
          "label": "当前管控代码",
          "required": false,
          "example": "当前管控代码测试值"
        },
        {
          "key": "Temperature",
          "label": "环境温度",
          "required": false,
          "example": "环境温度测试值"
        },
        {
          "key": "Humidity",
          "label": "环境湿度",
          "required": false,
          "example": "环境湿度测试值"
        },
        {
          "key": "TotalOpenTime",
          "label": "总计暴露时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "Status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Operator",
          "label": "作业人员",
          "required": false,
          "example": "作业人员测试值"
        },
        {
          "key": "BeginTime",
          "label": "管控开始时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "EndTime",
          "label": "管控结束时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "FloorLifeEndTime",
          "label": "生命完结时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "LevelCode",
          "label": "潮敏等级",
          "required": false,
          "example": "潮敏等级测试值"
        },
        {
          "key": "Thickness",
          "label": "厚度",
          "required": false,
          "example": "厚度测试值"
        },
        {
          "key": "ActionLocation",
          "label": "作业地点",
          "required": false,
          "example": "作业地点测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Att1",
          "label": "扩展1",
          "required": false,
          "example": "扩展1测试值"
        },
        {
          "key": "Att2",
          "label": "扩展2",
          "required": false,
          "example": "扩展2测试值"
        },
        {
          "key": "Att3",
          "label": "扩展3",
          "required": false,
          "example": "扩展3测试值"
        },
        {
          "key": "Att4",
          "label": "扩展4",
          "required": false,
          "example": "扩展4测试值"
        },
        {
          "key": "Att5",
          "label": "扩展5",
          "required": false,
          "example": "扩展5测试值"
        },
        {
          "key": "Num1",
          "label": "备用数值1",
          "required": false,
          "example": "备用数值1测试值"
        },
        {
          "key": "Num2",
          "label": "备用数值2",
          "required": false,
          "example": "备用数值2测试值"
        },
        {
          "key": "Num3",
          "label": "备用数值3",
          "required": false,
          "example": "备用数值3测试值"
        },
        {
          "key": "Num4",
          "label": "备用数值4",
          "required": false,
          "example": "备用数值4测试值"
        },
        {
          "key": "Num5",
          "label": "备用数值5",
          "required": false,
          "example": "备用数值5测试值"
        },
        {
          "key": "Dt1",
          "label": "备用日期1",
          "required": false,
          "example": "备用日期1测试值"
        },
        {
          "key": "Dt2",
          "label": "备用日期2",
          "required": false,
          "example": "备用日期2测试值"
        },
        {
          "key": "Dt3",
          "label": "备用日期3",
          "required": false,
          "example": "备用日期3测试值"
        },
        {
          "key": "Dt4",
          "label": "备用日期4",
          "required": false,
          "example": "备用日期4测试值"
        },
        {
          "key": "Dt5",
          "label": "备用日期5",
          "required": false,
          "example": "备用日期5测试值"
        }
      ],
      "testData": {
        "TenantId": "AT-001",
        "OrganizeId": "AT-001",
        "CreatedTime": "2026-08-01",
        "CreatedBy": "创建人测试值",
        "CreatedOrgId": "AT-001",
        "UpdatedTime": "2026-08-01",
        "UpdatedBy": "最后更新人测试值",
        "UpdatedOrgId": "AT-001",
        "Deleted": "删除标记测试值",
        "ReelCode": "条码号测试值",
        "CurrentAction": "当前管控代码测试值",
        "Temperature": "环境温度测试值",
        "Humidity": "环境湿度测试值",
        "TotalOpenTime": "2026-08-01",
        "Status": "Y",
        "Operator": "作业人员测试值",
        "BeginTime": "2026-08-01",
        "EndTime": "2026-08-01",
        "FloorLifeEndTime": "2026-08-01",
        "LevelCode": "潮敏等级测试值",
        "Thickness": "厚度测试值",
        "ActionLocation": "作业地点测试值",
        "Description": "自动化测试备注001",
        "Att1": "扩展1测试值",
        "Att2": "扩展2测试值",
        "Att3": "扩展3测试值",
        "Att4": "扩展4测试值",
        "Att5": "扩展5测试值",
        "Num1": "备用数值1测试值",
        "Num2": "备用数值2测试值",
        "Num3": "备用数值3测试值",
        "Num4": "备用数值4测试值",
        "Num5": "备用数值5测试值",
        "Dt1": "备用日期1测试值",
        "Dt2": "备用日期2测试值",
        "Dt3": "备用日期3测试值",
        "Dt4": "备用日期4测试值",
        "Dt5": "备用日期5测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-5147a",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeImsMsdRuncardHistory()",
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
