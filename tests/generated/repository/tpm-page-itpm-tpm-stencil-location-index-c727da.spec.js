// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-stencil-location-index-c727da",
  "name": "设备管理 - 钢网储位功能校验",
  "displayName": "钢网储位",
  "route": "/ITPM/TpmStencilLocation/Index",
  "sourceRoute": "/ITPM/TpmStencilLocation/Index",
  "menuCode": "TpmStencilLocation",
  "breadcrumb": "生产管理 / 钢网管理 / 钢网储位",
  "sourceFile": "src/views/ITPM/TpmStencilLocation/Index.vue",
  "dataSchema": {
    "columns": [
      "Location",
      "LocationName",
      "Region",
      "Shelf",
      "Side",
      "Row",
      "Col",
      "Lvl",
      "LocPrefix",
      "ShelfRange",
      "LvlRange",
      "ColRange",
      "SpaceMark",
      "ShelfDigit",
      "LvlDigit",
      "ColDigit"
    ],
    "required": [
      "Location",
      "LocationName",
      "Region",
      "Shelf",
      "Side",
      "LocPrefix",
      "ShelfRange",
      "LvlRange",
      "ColRange",
      "SpaceMark",
      "ShelfDigit",
      "LvlDigit",
      "ColDigit"
    ],
    "fields": [
      {
        "key": "Location",
        "label": "储位编号",
        "required": true
      },
      {
        "key": "LocationName",
        "label": "储位名称",
        "required": true
      },
      {
        "key": "Region",
        "label": "区域",
        "required": true
      },
      {
        "key": "Shelf",
        "label": "货架号",
        "required": true
      },
      {
        "key": "Side",
        "label": "货架面",
        "required": true
      },
      {
        "key": "Row",
        "label": "排",
        "required": false
      },
      {
        "key": "Col",
        "label": "列",
        "required": false
      },
      {
        "key": "Lvl",
        "label": "层",
        "required": false
      },
      {
        "key": "LocPrefix",
        "label": "储位前缀",
        "required": true
      },
      {
        "key": "ShelfRange",
        "label": "货架号范围",
        "required": true
      },
      {
        "key": "LvlRange",
        "label": "货架层号范围",
        "required": true
      },
      {
        "key": "ColRange",
        "label": "货架列号范围",
        "required": true
      },
      {
        "key": "SpaceMark",
        "label": "间隔符",
        "required": true
      },
      {
        "key": "ShelfDigit",
        "label": "货架号位数",
        "required": true
      },
      {
        "key": "LvlDigit",
        "label": "货架层号位数",
        "required": true
      },
      {
        "key": "ColDigit",
        "label": "货架列号位数",
        "required": true
      }
    ],
    "example": {
      "Location": "AT-001",
      "LocationName": "自动化样例001",
      "Region": "区域测试值",
      "Shelf": "货架号测试值",
      "Side": "货架面测试值",
      "Row": "排测试值",
      "Col": "列测试值",
      "Lvl": "层测试值",
      "LocPrefix": "储位前缀测试值",
      "ShelfRange": "货架号范围测试值",
      "LvlRange": "货架层号范围测试值",
      "ColRange": "货架列号范围测试值",
      "SpaceMark": "间隔符测试值",
      "ShelfDigit": "货架号位数测试值",
      "LvlDigit": "货架层号位数测试值",
      "ColDigit": "货架列号位数测试值"
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
        "Location": "AT-001",
        "LocationName": "自动化样例001",
        "Region": "区域测试值",
        "Shelf": "货架号测试值",
        "Side": "货架面测试值",
        "Row": "排测试值",
        "Col": "列测试值",
        "Lvl": "层测试值",
        "LocPrefix": "储位前缀测试值",
        "ShelfRange": "货架号范围测试值",
        "LvlRange": "货架层号范围测试值",
        "ColRange": "货架列号范围测试值",
        "SpaceMark": "间隔符测试值",
        "ShelfDigit": "货架号位数测试值",
        "LvlDigit": "货架层号位数测试值",
        "ColDigit": "货架列号位数测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-526a8",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor",
      "permission": "Add",
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
          "key": "Location",
          "label": "储位编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "储位名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Region",
          "label": "区域",
          "required": true,
          "example": "区域测试值"
        },
        {
          "key": "Shelf",
          "label": "货架号",
          "required": true,
          "example": "货架号测试值"
        },
        {
          "key": "Side",
          "label": "货架面",
          "required": true,
          "example": "货架面测试值"
        },
        {
          "key": "Row",
          "label": "排",
          "required": false,
          "example": "排测试值"
        },
        {
          "key": "Col",
          "label": "列",
          "required": false,
          "example": "列测试值"
        },
        {
          "key": "Lvl",
          "label": "层",
          "required": false,
          "example": "层测试值"
        },
        {
          "key": "LocPrefix",
          "label": "储位前缀",
          "required": true,
          "example": "储位前缀测试值"
        },
        {
          "key": "ShelfRange",
          "label": "货架号范围",
          "required": true,
          "example": "货架号范围测试值"
        },
        {
          "key": "LvlRange",
          "label": "货架层号范围",
          "required": true,
          "example": "货架层号范围测试值"
        },
        {
          "key": "ColRange",
          "label": "货架列号范围",
          "required": true,
          "example": "货架列号范围测试值"
        },
        {
          "key": "SpaceMark",
          "label": "间隔符",
          "required": true,
          "example": "间隔符测试值"
        },
        {
          "key": "ShelfDigit",
          "label": "货架号位数",
          "required": true,
          "example": "货架号位数测试值"
        },
        {
          "key": "LvlDigit",
          "label": "货架层号位数",
          "required": true,
          "example": "货架层号位数测试值"
        },
        {
          "key": "ColDigit",
          "label": "货架列号位数",
          "required": true,
          "example": "货架列号位数测试值"
        }
      ],
      "testData": {
        "Location": "AT-001",
        "LocationName": "自动化样例001",
        "Region": "区域测试值",
        "Shelf": "货架号测试值",
        "Side": "货架面测试值",
        "Row": "排测试值",
        "Col": "列测试值",
        "Lvl": "层测试值",
        "LocPrefix": "储位前缀测试值",
        "ShelfRange": "货架号范围测试值",
        "LvlRange": "货架层号范围测试值",
        "ColRange": "货架列号范围测试值",
        "SpaceMark": "间隔符测试值",
        "ShelfDigit": "货架号位数测试值",
        "LvlDigit": "货架层号位数测试值",
        "ColDigit": "货架列号位数测试值"
      }
    },
    {
      "key": "13fd57e65b-bfbe4e18fc-e8877",
      "type": "新增表单",
      "name": "批量新增业务入口校验",
      "label": "批量新增",
      "handler": "openBatchEditor",
      "permission": "BatchBuild",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击批量新增",
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
          "key": "Location",
          "label": "储位编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "储位名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Region",
          "label": "区域",
          "required": true,
          "example": "区域测试值"
        },
        {
          "key": "Shelf",
          "label": "货架号",
          "required": true,
          "example": "货架号测试值"
        },
        {
          "key": "Side",
          "label": "货架面",
          "required": true,
          "example": "货架面测试值"
        },
        {
          "key": "Row",
          "label": "排",
          "required": false,
          "example": "排测试值"
        },
        {
          "key": "Col",
          "label": "列",
          "required": false,
          "example": "列测试值"
        },
        {
          "key": "Lvl",
          "label": "层",
          "required": false,
          "example": "层测试值"
        },
        {
          "key": "LocPrefix",
          "label": "储位前缀",
          "required": true,
          "example": "储位前缀测试值"
        },
        {
          "key": "ShelfRange",
          "label": "货架号范围",
          "required": true,
          "example": "货架号范围测试值"
        },
        {
          "key": "LvlRange",
          "label": "货架层号范围",
          "required": true,
          "example": "货架层号范围测试值"
        },
        {
          "key": "ColRange",
          "label": "货架列号范围",
          "required": true,
          "example": "货架列号范围测试值"
        },
        {
          "key": "SpaceMark",
          "label": "间隔符",
          "required": true,
          "example": "间隔符测试值"
        },
        {
          "key": "ShelfDigit",
          "label": "货架号位数",
          "required": true,
          "example": "货架号位数测试值"
        },
        {
          "key": "LvlDigit",
          "label": "货架层号位数",
          "required": true,
          "example": "货架层号位数测试值"
        },
        {
          "key": "ColDigit",
          "label": "货架列号位数",
          "required": true,
          "example": "货架列号位数测试值"
        }
      ],
      "testData": {
        "Location": "AT-001",
        "LocationName": "自动化样例001",
        "Region": "区域测试值",
        "Shelf": "货架号测试值",
        "Side": "货架面测试值",
        "Row": "排测试值",
        "Col": "列测试值",
        "Lvl": "层测试值",
        "LocPrefix": "储位前缀测试值",
        "ShelfRange": "货架号范围测试值",
        "LvlRange": "货架层号范围测试值",
        "ColRange": "货架列号范围测试值",
        "SpaceMark": "间隔符测试值",
        "ShelfDigit": "货架号位数测试值",
        "LvlDigit": "货架层号位数测试值",
        "ColDigit": "货架列号位数测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "BatchDelete",
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
      "key": "7e002f9936-d13d32ef8c-d7f48",
      "type": "业务动作",
      "name": "条码打印业务入口校验",
      "label": "条码打印",
      "handler": "reportPrint",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击条码打印",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
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
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
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
          "key": "Location",
          "label": "储位编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "储位名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Region",
          "label": "区域",
          "required": true,
          "example": "区域测试值"
        },
        {
          "key": "Shelf",
          "label": "货架号",
          "required": true,
          "example": "货架号测试值"
        },
        {
          "key": "Side",
          "label": "货架面",
          "required": true,
          "example": "货架面测试值"
        },
        {
          "key": "Row",
          "label": "排",
          "required": false,
          "example": "排测试值"
        },
        {
          "key": "Col",
          "label": "列",
          "required": false,
          "example": "列测试值"
        },
        {
          "key": "Lvl",
          "label": "层",
          "required": false,
          "example": "层测试值"
        },
        {
          "key": "LocPrefix",
          "label": "储位前缀",
          "required": true,
          "example": "储位前缀测试值"
        },
        {
          "key": "ShelfRange",
          "label": "货架号范围",
          "required": true,
          "example": "货架号范围测试值"
        },
        {
          "key": "LvlRange",
          "label": "货架层号范围",
          "required": true,
          "example": "货架层号范围测试值"
        },
        {
          "key": "ColRange",
          "label": "货架列号范围",
          "required": true,
          "example": "货架列号范围测试值"
        },
        {
          "key": "SpaceMark",
          "label": "间隔符",
          "required": true,
          "example": "间隔符测试值"
        },
        {
          "key": "ShelfDigit",
          "label": "货架号位数",
          "required": true,
          "example": "货架号位数测试值"
        },
        {
          "key": "LvlDigit",
          "label": "货架层号位数",
          "required": true,
          "example": "货架层号位数测试值"
        },
        {
          "key": "ColDigit",
          "label": "货架列号位数",
          "required": true,
          "example": "货架列号位数测试值"
        }
      ],
      "testData": {
        "Location": "AT-001",
        "LocationName": "自动化样例001",
        "Region": "区域测试值",
        "Shelf": "货架号测试值",
        "Side": "货架面测试值",
        "Row": "排测试值",
        "Col": "列测试值",
        "Lvl": "层测试值",
        "LocPrefix": "储位前缀测试值",
        "ShelfRange": "货架号范围测试值",
        "LvlRange": "货架层号范围测试值",
        "ColRange": "货架列号范围测试值",
        "SpaceMark": "间隔符测试值",
        "ShelfDigit": "货架号位数测试值",
        "LvlDigit": "货架层号位数测试值",
        "ColDigit": "货架列号位数测试值"
      }
    }
  ]
});
