// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-check-index-f6220c",
  "name": "旧版制造执行 - 设备校验管理功能校验",
  "displayName": "设备校验管理",
  "route": "/iMES/SfcsEquipCheck/Index",
  "sourceRoute": "/iMES/SfcsEquipCheck/Index",
  "menuCode": "iMES_SfcsEquipCheck",
  "breadcrumb": "设备管理 / 设备管理 / 设备校验管理",
  "sourceFile": "src/views/iMES/SfcsEquipCheck/Index.vue",
  "dataSchema": {
    "columns": [
      "NAME",
      "CHECK_STATUS",
      "CHECK_NO",
      "CHECK_LAST_TIME",
      "CATEGORY_NAME",
      "CHECK_CYCLE",
      "CHECK_DATE_TIME",
      "CHECK_NEXT_TIME",
      "STATUS",
      "CHECK_USER",
      "CHECK_FIRST_TIME"
    ],
    "required": [
      "CHECK_STATUS",
      "CHECK_NO",
      "CHECK_LAST_TIME",
      "CHECK_CYCLE",
      "CHECK_DATE_TIME",
      "CHECK_NEXT_TIME",
      "STATUS",
      "CHECK_USER",
      "CHECK_FIRST_TIME"
    ],
    "fields": [
      {
        "key": "NAME",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "CHECK_STATUS",
        "label": "校验状态",
        "required": true
      },
      {
        "key": "CHECK_NO",
        "label": "校验编号",
        "required": true
      },
      {
        "key": "CHECK_LAST_TIME",
        "label": "上一次校验日期",
        "required": true
      },
      {
        "key": "CATEGORY_NAME",
        "label": "设备名称",
        "required": false
      },
      {
        "key": "CHECK_CYCLE",
        "label": "校准周期(年)",
        "required": true
      },
      {
        "key": "CHECK_DATE_TIME",
        "label": "最后校验日期",
        "required": true
      },
      {
        "key": "CHECK_NEXT_TIME",
        "label": "下一次校验日期",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "设备状态",
        "required": true
      },
      {
        "key": "CHECK_USER",
        "label": "校准人员",
        "required": true
      },
      {
        "key": "CHECK_FIRST_TIME",
        "label": "首次校验时间",
        "required": true
      }
    ],
    "example": {
      "NAME": "AT-001",
      "CHECK_STATUS": "Y",
      "CHECK_NO": "AT-001",
      "CHECK_LAST_TIME": "2026-08-01",
      "CATEGORY_NAME": "自动化样例001",
      "CHECK_CYCLE": "校准周期(年)测试值",
      "CHECK_DATE_TIME": "2026-08-01",
      "CHECK_NEXT_TIME": "2026-08-01",
      "STATUS": "Y",
      "CHECK_USER": "校准人员测试值",
      "CHECK_FIRST_TIME": "2026-08-01"
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
        "search_but"
      ],
      "testData": {
        "NAME": "AT-001",
        "CHECK_STATUS": "Y",
        "CHECK_NO": "AT-001",
        "CHECK_LAST_TIME": "2026-08-01",
        "CATEGORY_NAME": "自动化样例001",
        "CHECK_CYCLE": "校准周期(年)测试值",
        "CHECK_DATE_TIME": "2026-08-01",
        "CHECK_NEXT_TIME": "2026-08-01",
        "STATUS": "Y",
        "CHECK_USER": "校准人员测试值",
        "CHECK_FIRST_TIME": "2026-08-01"
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
      "key": "4aa22a22ac-df049fe9c8-0688e",
      "type": "编辑表单",
      "name": "批量修改业务入口校验",
      "label": "批量修改",
      "handler": "batch_but",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量修改",
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
          "key": "NAME",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CHECK_STATUS",
          "label": "校验状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "CHECK_NO",
          "label": "校验编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CHECK_LAST_TIME",
          "label": "上一次校验日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "设备名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "CHECK_CYCLE",
          "label": "校准周期(年)",
          "required": true,
          "example": "校准周期(年)测试值"
        },
        {
          "key": "CHECK_DATE_TIME",
          "label": "最后校验日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CHECK_NEXT_TIME",
          "label": "下一次校验日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "STATUS",
          "label": "设备状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "CHECK_USER",
          "label": "校准人员",
          "required": true,
          "example": "校准人员测试值"
        },
        {
          "key": "CHECK_FIRST_TIME",
          "label": "首次校验时间",
          "required": true,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "NAME": "AT-001",
        "CHECK_STATUS": "Y",
        "CHECK_NO": "AT-001",
        "CHECK_LAST_TIME": "2026-08-01",
        "CATEGORY_NAME": "自动化样例001",
        "CHECK_CYCLE": "校准周期(年)测试值",
        "CHECK_DATE_TIME": "2026-08-01",
        "CHECK_NEXT_TIME": "2026-08-01",
        "STATUS": "Y",
        "CHECK_USER": "校准人员测试值",
        "CHECK_FIRST_TIME": "2026-08-01"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "SfcsEquipmentedit",
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
          "key": "NAME",
          "label": "设备编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CHECK_STATUS",
          "label": "校验状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "CHECK_NO",
          "label": "校验编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "CHECK_LAST_TIME",
          "label": "上一次校验日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "设备名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "CHECK_CYCLE",
          "label": "校准周期(年)",
          "required": true,
          "example": "校准周期(年)测试值"
        },
        {
          "key": "CHECK_DATE_TIME",
          "label": "最后校验日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CHECK_NEXT_TIME",
          "label": "下一次校验日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "STATUS",
          "label": "设备状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "CHECK_USER",
          "label": "校准人员",
          "required": true,
          "example": "校准人员测试值"
        },
        {
          "key": "CHECK_FIRST_TIME",
          "label": "首次校验时间",
          "required": true,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "NAME": "AT-001",
        "CHECK_STATUS": "Y",
        "CHECK_NO": "AT-001",
        "CHECK_LAST_TIME": "2026-08-01",
        "CATEGORY_NAME": "自动化样例001",
        "CHECK_CYCLE": "校准周期(年)测试值",
        "CHECK_DATE_TIME": "2026-08-01",
        "CHECK_NEXT_TIME": "2026-08-01",
        "STATUS": "Y",
        "CHECK_USER": "校准人员测试值",
        "CHECK_FIRST_TIME": "2026-08-01"
      }
    }
  ]
});
