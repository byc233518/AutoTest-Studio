// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-keep-year-plan-index-c054c6",
  "name": "旧版制造执行 - 设备保养计划功能校验",
  "displayName": "设备保养计划",
  "route": "/iMES/SfcsEquipKeepYearPlan/index",
  "sourceRoute": "/iMES/SfcsEquipKeepYearPlan/index",
  "menuCode": "iMES_SfcsEquipKeepYearPlan",
  "breadcrumb": "设备管理 / 设备管理 / 设备保养计划",
  "sourceFile": "src/views/iMES/SfcsEquipKeepYearPlan/index.vue",
  "dataSchema": {
    "columns": [
      "dayType",
      "selectTime",
      "PLAN_USER",
      "PLAN_TYPE",
      "STATUS"
    ],
    "required": [],
    "fields": [
      {
        "key": "dayType",
        "label": "查询方式",
        "required": false
      },
      {
        "key": "selectTime",
        "label": "保养时间",
        "required": false
      },
      {
        "key": "PLAN_USER",
        "label": "计划保养人员",
        "required": false
      },
      {
        "key": "PLAN_TYPE",
        "label": "计划类型",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "保养状态",
        "required": false
      }
    ],
    "example": {
      "dayType": "查询方式测试值",
      "selectTime": "2026-08-01",
      "PLAN_USER": "计划保养人员测试值",
      "PLAN_TYPE": "计划类型测试值",
      "STATUS": "Y"
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
        "dayType": "查询方式测试值",
        "selectTime": "2026-08-01",
        "PLAN_USER": "计划保养人员测试值",
        "PLAN_TYPE": "计划类型测试值",
        "STATUS": "Y"
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
      "key": "13fd57e65b-2cd9e6ce81-44f7f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "handleEventPlan({})",
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
          "key": "dayType",
          "label": "查询方式",
          "required": false,
          "example": "查询方式测试值"
        },
        {
          "key": "selectTime",
          "label": "保养时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PLAN_USER",
          "label": "计划保养人员",
          "required": false,
          "example": "计划保养人员测试值"
        },
        {
          "key": "PLAN_TYPE",
          "label": "计划类型",
          "required": false,
          "example": "计划类型测试值"
        },
        {
          "key": "STATUS",
          "label": "保养状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "dayType": "查询方式测试值",
        "selectTime": "2026-08-01",
        "PLAN_USER": "计划保养人员测试值",
        "PLAN_TYPE": "计划类型测试值",
        "STATUS": "Y"
      }
    },
    {
      "key": "7e002f9936-2a490592fd-b4602",
      "type": "业务动作",
      "name": "保养报表业务入口校验",
      "label": "保养报表",
      "handler": "handleRepartTime",
      "permission": "SfcsEquipKeepYearPlanMaintain",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保养报表",
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
      "key": "7e002f9936-77dc29e9e7-5935f",
      "type": "业务动作",
      "name": "检维修报表业务入口校验",
      "label": "检维修报表",
      "handler": "handleRepartRepar",
      "permission": "SfcsEquipKeepYearPlanRepar",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位检维修报表",
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
      "key": "5f1787916c-60e2bcad85-60e2b",
      "type": "导入入口",
      "name": "导入业务入口校验",
      "label": "导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入",
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
      "key": "4aa22a22ac-a7f814c0a4-9739a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEventPlan(row)",
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
          "key": "dayType",
          "label": "查询方式",
          "required": false,
          "example": "查询方式测试值"
        },
        {
          "key": "selectTime",
          "label": "保养时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "PLAN_USER",
          "label": "计划保养人员",
          "required": false,
          "example": "计划保养人员测试值"
        },
        {
          "key": "PLAN_TYPE",
          "label": "计划类型",
          "required": false,
          "example": "计划类型测试值"
        },
        {
          "key": "STATUS",
          "label": "保养状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "dayType": "查询方式测试值",
        "selectTime": "2026-08-01",
        "PLAN_USER": "计划保养人员测试值",
        "PLAN_TYPE": "计划类型测试值",
        "STATUS": "Y"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ee1ab",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteClick(row, row.$index)",
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
    }
  ]
});
