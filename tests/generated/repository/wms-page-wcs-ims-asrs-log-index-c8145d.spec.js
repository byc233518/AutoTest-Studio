// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-wcs-ims-asrs-log-index-c8145d",
  "name": "仓储管理 - 执行日志查询功能校验",
  "displayName": "执行日志查询",
  "route": "/Wcs/ImsAsrsLog/Index",
  "sourceRoute": "/Wcs/ImsAsrsLog/Index",
  "menuCode": "ImsAsrsLog",
  "breadcrumb": "仓库管理 / 立库管理 / 执行日志查询",
  "sourceFile": "src/views/Wcs/ImsAsrsLog/Index.vue",
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
      "OperCode",
      "OperName",
      "OperType",
      "OperInput",
      "OperOutput",
      "OperTips",
      "Att1",
      "Att2",
      "Att3",
      "Att4",
      "Att5"
    ],
    "required": [
      "TenantId",
      "OrganizeId",
      "CreatedTime",
      "CreatedBy",
      "CreatedOrgId",
      "UpdatedTime",
      "UpdatedBy",
      "UpdatedOrgId",
      "Deleted",
      "OperCode",
      "OperName",
      "OperType",
      "OperInput",
      "OperOutput",
      "OperTips",
      "Att1",
      "Att2",
      "Att3",
      "Att4",
      "Att5"
    ],
    "fields": [
      {
        "key": "TenantId",
        "label": "租户ID",
        "required": true
      },
      {
        "key": "OrganizeId",
        "label": "组织ID",
        "required": true
      },
      {
        "key": "CreatedTime",
        "label": "创建时间",
        "required": true
      },
      {
        "key": "CreatedBy",
        "label": "创建人",
        "required": true
      },
      {
        "key": "CreatedOrgId",
        "label": "创建人组织ID",
        "required": true
      },
      {
        "key": "UpdatedTime",
        "label": "更新时间",
        "required": true
      },
      {
        "key": "UpdatedBy",
        "label": "最后更新人",
        "required": true
      },
      {
        "key": "UpdatedOrgId",
        "label": "更新人组织ID",
        "required": true
      },
      {
        "key": "Deleted",
        "label": "删除标记",
        "required": true
      },
      {
        "key": "OperCode",
        "label": "作业码(Move/In/Out)",
        "required": true
      },
      {
        "key": "OperName",
        "label": "作业名称",
        "required": true
      },
      {
        "key": "OperType",
        "label": "作业类型",
        "required": true
      },
      {
        "key": "OperInput",
        "label": "作业前传入数据",
        "required": true
      },
      {
        "key": "OperOutput",
        "label": "作业后回传数据",
        "required": true
      },
      {
        "key": "OperTips",
        "label": "动作ID集",
        "required": true
      },
      {
        "key": "Att1",
        "label": "扩展1",
        "required": true
      },
      {
        "key": "Att2",
        "label": "扩展2",
        "required": true
      },
      {
        "key": "Att3",
        "label": "扩展3",
        "required": true
      },
      {
        "key": "Att4",
        "label": "扩展4",
        "required": true
      },
      {
        "key": "Att5",
        "label": "扩展5",
        "required": true
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
      "OperCode": "作业码(Move/In/Out)测试值",
      "OperName": "自动化样例001",
      "OperType": "作业类型测试值",
      "OperInput": "作业前传入数据测试值",
      "OperOutput": "作业后回传数据测试值",
      "OperTips": "动作ID集测试值",
      "Att1": "扩展1测试值",
      "Att2": "扩展2测试值",
      "Att3": "扩展3测试值",
      "Att4": "扩展4测试值",
      "Att5": "扩展5测试值"
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
        "TenantId": "AT-001",
        "OrganizeId": "AT-001",
        "CreatedTime": "2026-08-01",
        "CreatedBy": "创建人测试值",
        "CreatedOrgId": "AT-001",
        "UpdatedTime": "2026-08-01",
        "UpdatedBy": "最后更新人测试值",
        "UpdatedOrgId": "AT-001",
        "Deleted": "删除标记测试值",
        "OperCode": "作业码(Move/In/Out)测试值",
        "OperName": "自动化样例001",
        "OperType": "作业类型测试值",
        "OperInput": "作业前传入数据测试值",
        "OperOutput": "作业后回传数据测试值",
        "OperTips": "动作ID集测试值",
        "Att1": "扩展1测试值",
        "Att2": "扩展2测试值",
        "Att3": "扩展3测试值",
        "Att4": "扩展4测试值",
        "Att5": "扩展5测试值"
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
      "permission": "ImsAsrsLogAdd",
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
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "OrganizeId",
          "label": "组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CreatedTime",
          "label": "创建时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CreatedBy",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "CreatedOrgId",
          "label": "创建人组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "UpdatedTime",
          "label": "更新时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "UpdatedBy",
          "label": "最后更新人",
          "required": true,
          "example": "最后更新人测试值"
        },
        {
          "key": "UpdatedOrgId",
          "label": "更新人组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Deleted",
          "label": "删除标记",
          "required": true,
          "example": "删除标记测试值"
        },
        {
          "key": "OperCode",
          "label": "作业码(Move/In/Out)",
          "required": true,
          "example": "作业码(Move/In/Out)测试值"
        },
        {
          "key": "OperName",
          "label": "作业名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OperType",
          "label": "作业类型",
          "required": true,
          "example": "作业类型测试值"
        },
        {
          "key": "OperInput",
          "label": "作业前传入数据",
          "required": true,
          "example": "作业前传入数据测试值"
        },
        {
          "key": "OperOutput",
          "label": "作业后回传数据",
          "required": true,
          "example": "作业后回传数据测试值"
        },
        {
          "key": "OperTips",
          "label": "动作ID集",
          "required": true,
          "example": "动作ID集测试值"
        },
        {
          "key": "Att1",
          "label": "扩展1",
          "required": true,
          "example": "扩展1测试值"
        },
        {
          "key": "Att2",
          "label": "扩展2",
          "required": true,
          "example": "扩展2测试值"
        },
        {
          "key": "Att3",
          "label": "扩展3",
          "required": true,
          "example": "扩展3测试值"
        },
        {
          "key": "Att4",
          "label": "扩展4",
          "required": true,
          "example": "扩展4测试值"
        },
        {
          "key": "Att5",
          "label": "扩展5",
          "required": true,
          "example": "扩展5测试值"
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
        "OperCode": "作业码(Move/In/Out)测试值",
        "OperName": "自动化样例001",
        "OperType": "作业类型测试值",
        "OperInput": "作业前传入数据测试值",
        "OperOutput": "作业后回传数据测试值",
        "OperTips": "动作ID集测试值",
        "Att1": "扩展1测试值",
        "Att2": "扩展2测试值",
        "Att3": "扩展3测试值",
        "Att4": "扩展4测试值",
        "Att5": "扩展5测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsAsrsLogEdit",
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
          "key": "TenantId",
          "label": "租户ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "OrganizeId",
          "label": "组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CreatedTime",
          "label": "创建时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CreatedBy",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "CreatedOrgId",
          "label": "创建人组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "UpdatedTime",
          "label": "更新时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "UpdatedBy",
          "label": "最后更新人",
          "required": true,
          "example": "最后更新人测试值"
        },
        {
          "key": "UpdatedOrgId",
          "label": "更新人组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Deleted",
          "label": "删除标记",
          "required": true,
          "example": "删除标记测试值"
        },
        {
          "key": "OperCode",
          "label": "作业码(Move/In/Out)",
          "required": true,
          "example": "作业码(Move/In/Out)测试值"
        },
        {
          "key": "OperName",
          "label": "作业名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OperType",
          "label": "作业类型",
          "required": true,
          "example": "作业类型测试值"
        },
        {
          "key": "OperInput",
          "label": "作业前传入数据",
          "required": true,
          "example": "作业前传入数据测试值"
        },
        {
          "key": "OperOutput",
          "label": "作业后回传数据",
          "required": true,
          "example": "作业后回传数据测试值"
        },
        {
          "key": "OperTips",
          "label": "动作ID集",
          "required": true,
          "example": "动作ID集测试值"
        },
        {
          "key": "Att1",
          "label": "扩展1",
          "required": true,
          "example": "扩展1测试值"
        },
        {
          "key": "Att2",
          "label": "扩展2",
          "required": true,
          "example": "扩展2测试值"
        },
        {
          "key": "Att3",
          "label": "扩展3",
          "required": true,
          "example": "扩展3测试值"
        },
        {
          "key": "Att4",
          "label": "扩展4",
          "required": true,
          "example": "扩展4测试值"
        },
        {
          "key": "Att5",
          "label": "扩展5",
          "required": true,
          "example": "扩展5测试值"
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
        "OperCode": "作业码(Move/In/Out)测试值",
        "OperName": "自动化样例001",
        "OperType": "作业类型测试值",
        "OperInput": "作业前传入数据测试值",
        "OperOutput": "作业后回传数据测试值",
        "OperTips": "动作ID集测试值",
        "Att1": "扩展1测试值",
        "Att2": "扩展2测试值",
        "Att3": "扩展3测试值",
        "Att4": "扩展4测试值",
        "Att5": "扩展5测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsAsrsLogRemove",
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
