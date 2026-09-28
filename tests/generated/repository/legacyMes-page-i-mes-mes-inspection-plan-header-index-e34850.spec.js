// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-inspection-plan-header-index-e34850",
  "name": "旧版制造执行 - 检验方案新增/编辑（未配置菜单）功能校验",
  "displayName": "检验方案新增/编辑（未配置菜单）",
  "route": "/iMES/MesInspectionPlanHeader/Index",
  "sourceRoute": "/iMES/MesInspectionPlanHeader/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 检验方案新增/编辑（未配置菜单）",
  "sourceFile": "src/views/iMES/MesInspectionPlanHeader/Index.vue",
  "dataSchema": {
    "columns": [
      "CREATE_USER",
      "AUDITOR",
      "STATE",
      "VERSION",
      "CREATE_TIME",
      "AUDIT_TIME",
      "INSPECTION_TYPE",
      "INSPECTION_ITEM",
      "DESCRIPTION",
      "QUANTITATIVE",
      "SAMPLING_RATE",
      "INSPECTION_NAME",
      "ITEM_NO"
    ],
    "required": [
      "VERSION",
      "INSPECTION_TYPE",
      "INSPECTION_ITEM",
      "QUANTITATIVE",
      "SAMPLING_RATE",
      "INSPECTION_NAME",
      "ITEM_NO"
    ],
    "fields": [
      {
        "key": "CREATE_USER",
        "label": "创建人",
        "required": false
      },
      {
        "key": "AUDITOR",
        "label": "审核人",
        "required": false
      },
      {
        "key": "STATE",
        "label": "检验状态",
        "required": false
      },
      {
        "key": "VERSION",
        "label": "版本",
        "required": true
      },
      {
        "key": "CREATE_TIME",
        "label": "创建时间",
        "required": false
      },
      {
        "key": "AUDIT_TIME",
        "label": "审核时间",
        "required": false
      },
      {
        "key": "INSPECTION_TYPE",
        "label": "检验类别",
        "required": true
      },
      {
        "key": "INSPECTION_ITEM",
        "label": "检验项目",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": false
      },
      {
        "key": "QUANTITATIVE",
        "label": "是否量化",
        "required": true
      },
      {
        "key": "SAMPLING_RATE",
        "label": "抽检比例",
        "required": true
      },
      {
        "key": "INSPECTION_NAME",
        "label": "检验名称",
        "required": true
      },
      {
        "key": "ITEM_NO",
        "label": "项次号",
        "required": true
      }
    ],
    "example": {
      "CREATE_USER": "创建人测试值",
      "AUDITOR": "审核人测试值",
      "STATE": "Y",
      "VERSION": "版本测试值",
      "CREATE_TIME": "2026-08-01",
      "AUDIT_TIME": "2026-08-01",
      "INSPECTION_TYPE": "检验类别测试值",
      "INSPECTION_ITEM": "检验项目测试值",
      "DESCRIPTION": "自动化测试备注001",
      "QUANTITATIVE": "是否量化测试值",
      "SAMPLING_RATE": "抽检比例测试值",
      "INSPECTION_NAME": "自动化样例001",
      "ITEM_NO": "项次号测试值"
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
        "CREATE_USER": "创建人测试值",
        "AUDITOR": "审核人测试值",
        "STATE": "Y",
        "VERSION": "版本测试值",
        "CREATE_TIME": "2026-08-01",
        "AUDIT_TIME": "2026-08-01",
        "INSPECTION_TYPE": "检验类别测试值",
        "INSPECTION_ITEM": "检验项目测试值",
        "DESCRIPTION": "自动化测试备注001",
        "QUANTITATIVE": "是否量化测试值",
        "SAMPLING_RATE": "抽检比例测试值",
        "INSPECTION_NAME": "自动化样例001",
        "ITEM_NO": "项次号测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-f861f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent",
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
          "key": "CREATE_USER",
          "label": "创建人",
          "required": false,
          "example": "创建人测试值"
        },
        {
          "key": "AUDITOR",
          "label": "审核人",
          "required": false,
          "example": "审核人测试值"
        },
        {
          "key": "STATE",
          "label": "检验状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "VERSION",
          "label": "版本",
          "required": true,
          "example": "版本测试值"
        },
        {
          "key": "CREATE_TIME",
          "label": "创建时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AUDIT_TIME",
          "label": "审核时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "INSPECTION_TYPE",
          "label": "检验类别",
          "required": true,
          "example": "检验类别测试值"
        },
        {
          "key": "INSPECTION_ITEM",
          "label": "检验项目",
          "required": true,
          "example": "检验项目测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "QUANTITATIVE",
          "label": "是否量化",
          "required": true,
          "example": "是否量化测试值"
        },
        {
          "key": "SAMPLING_RATE",
          "label": "抽检比例",
          "required": true,
          "example": "抽检比例测试值"
        },
        {
          "key": "INSPECTION_NAME",
          "label": "检验名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ITEM_NO",
          "label": "项次号",
          "required": true,
          "example": "项次号测试值"
        }
      ],
      "testData": {
        "CREATE_USER": "创建人测试值",
        "AUDITOR": "审核人测试值",
        "STATE": "Y",
        "VERSION": "版本测试值",
        "CREATE_TIME": "2026-08-01",
        "AUDIT_TIME": "2026-08-01",
        "INSPECTION_TYPE": "检验类别测试值",
        "INSPECTION_ITEM": "检验项目测试值",
        "DESCRIPTION": "自动化测试备注001",
        "QUANTITATIVE": "是否量化测试值",
        "SAMPLING_RATE": "抽检比例测试值",
        "INSPECTION_NAME": "自动化样例001",
        "ITEM_NO": "项次号测试值"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-df7a9",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "ReviewClick",
      "permission": "",
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
      "key": "4aa22a22ac-a7f814c0a4-cefbe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(scope.row)",
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
          "key": "CREATE_USER",
          "label": "创建人",
          "required": false,
          "example": "创建人测试值"
        },
        {
          "key": "AUDITOR",
          "label": "审核人",
          "required": false,
          "example": "审核人测试值"
        },
        {
          "key": "STATE",
          "label": "检验状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "VERSION",
          "label": "版本",
          "required": true,
          "example": "版本测试值"
        },
        {
          "key": "CREATE_TIME",
          "label": "创建时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "AUDIT_TIME",
          "label": "审核时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "INSPECTION_TYPE",
          "label": "检验类别",
          "required": true,
          "example": "检验类别测试值"
        },
        {
          "key": "INSPECTION_ITEM",
          "label": "检验项目",
          "required": true,
          "example": "检验项目测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "QUANTITATIVE",
          "label": "是否量化",
          "required": true,
          "example": "是否量化测试值"
        },
        {
          "key": "SAMPLING_RATE",
          "label": "抽检比例",
          "required": true,
          "example": "抽检比例测试值"
        },
        {
          "key": "INSPECTION_NAME",
          "label": "检验名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ITEM_NO",
          "label": "项次号",
          "required": true,
          "example": "项次号测试值"
        }
      ],
      "testData": {
        "CREATE_USER": "创建人测试值",
        "AUDITOR": "审核人测试值",
        "STATE": "Y",
        "VERSION": "版本测试值",
        "CREATE_TIME": "2026-08-01",
        "AUDIT_TIME": "2026-08-01",
        "INSPECTION_TYPE": "检验类别测试值",
        "INSPECTION_ITEM": "检验项目测试值",
        "DESCRIPTION": "自动化测试备注001",
        "QUANTITATIVE": "是否量化测试值",
        "SAMPLING_RATE": "抽检比例测试值",
        "INSPECTION_NAME": "自动化样例001",
        "ITEM_NO": "项次号测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a5cb3",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row,0)",
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
