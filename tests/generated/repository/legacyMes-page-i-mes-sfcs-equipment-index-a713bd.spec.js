// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equipment-index-a713bd",
  "name": "旧版制造执行 - 设备信息维护功能校验",
  "displayName": "设备信息维护",
  "route": "/iMES/SfcsEquipment/Index",
  "sourceRoute": "/iMES/SfcsEquipment/Index",
  "menuCode": "iMES_Equipment_Manage",
  "breadcrumb": "设备管理 / 设备管理 / 设备信息维护",
  "sourceFile": "src/views/iMES/SfcsEquipment/Index.vue",
  "dataSchema": {
    "columns": [
      "NAME",
      "EQUIP_NAME",
      "PROPERTY_NO",
      "MODEL",
      "STATION_ID",
      "VENDOR",
      "USER_AGE",
      "STATUS",
      "ACTIVE_TIMES_ENABLED",
      "ACTIVE_TIMES",
      "CATEGORY",
      "PRODUCT_NO",
      "USER_PART",
      "POWER",
      "BUY_TIME",
      "END_TIME",
      "ENABLE",
      "IS_CHECK",
      "STATION"
    ],
    "required": [
      "NAME",
      "EQUIP_NAME",
      "PROPERTY_NO",
      "MODEL",
      "STATION_ID",
      "VENDOR",
      "USER_AGE",
      "STATUS",
      "ACTIVE_TIMES",
      "CATEGORY",
      "PRODUCT_NO",
      "USER_PART",
      "POWER",
      "BUY_TIME",
      "END_TIME"
    ],
    "fields": [
      {
        "key": "NAME",
        "label": "设备编号",
        "required": true
      },
      {
        "key": "EQUIP_NAME",
        "label": "设备名称",
        "required": true
      },
      {
        "key": "PROPERTY_NO",
        "label": "资产编码",
        "required": true
      },
      {
        "key": "MODEL",
        "label": "设备型号",
        "required": true
      },
      {
        "key": "STATION_ID",
        "label": "存放地点",
        "required": true
      },
      {
        "key": "VENDOR",
        "label": "生产厂家",
        "required": true
      },
      {
        "key": "USER_AGE",
        "label": "使用年限",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "设备状态",
        "required": true
      },
      {
        "key": "ACTIVE_TIMES_ENABLED",
        "label": "是否启用寿命次数管控",
        "required": false
      },
      {
        "key": "ACTIVE_TIMES",
        "label": "使用寿命次数",
        "required": true
      },
      {
        "key": "CATEGORY",
        "label": "设备分类",
        "required": true
      },
      {
        "key": "PRODUCT_NO",
        "label": "出厂编号",
        "required": true
      },
      {
        "key": "USER_PART",
        "label": "使用部门",
        "required": true
      },
      {
        "key": "POWER",
        "label": "电压/功率",
        "required": true
      },
      {
        "key": "BUY_TIME",
        "label": "进厂时间",
        "required": true
      },
      {
        "key": "END_TIME",
        "label": "报废时间",
        "required": true
      },
      {
        "key": "ENABLE",
        "label": "是否有效",
        "required": false
      },
      {
        "key": "IS_CHECK",
        "label": "是否校准",
        "required": false
      },
      {
        "key": "STATION",
        "label": "机台序号",
        "required": false
      }
    ],
    "example": {
      "NAME": "AT-001",
      "EQUIP_NAME": "自动化样例001",
      "PROPERTY_NO": "AT-001",
      "MODEL": "设备型号测试值",
      "STATION_ID": "存放地点测试值",
      "VENDOR": "生产厂家测试值",
      "USER_AGE": "使用年限测试值",
      "STATUS": "Y",
      "ACTIVE_TIMES_ENABLED": "是否启用寿命次数管控测试值",
      "ACTIVE_TIMES": "使用寿命次数测试值",
      "CATEGORY": "设备分类测试值",
      "PRODUCT_NO": "AT-001",
      "USER_PART": "使用部门测试值",
      "POWER": "电压/功率测试值",
      "BUY_TIME": "2026-08-01",
      "END_TIME": "2026-08-01",
      "ENABLE": "Y",
      "IS_CHECK": "是否校准测试值",
      "STATION": "1"
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
        "EQUIP_NAME": "自动化样例001",
        "PROPERTY_NO": "AT-001",
        "MODEL": "设备型号测试值",
        "STATION_ID": "存放地点测试值",
        "VENDOR": "生产厂家测试值",
        "USER_AGE": "使用年限测试值",
        "STATUS": "Y",
        "ACTIVE_TIMES_ENABLED": "是否启用寿命次数管控测试值",
        "ACTIVE_TIMES": "使用寿命次数测试值",
        "CATEGORY": "设备分类测试值",
        "PRODUCT_NO": "AT-001",
        "USER_PART": "使用部门测试值",
        "POWER": "电压/功率测试值",
        "BUY_TIME": "2026-08-01",
        "END_TIME": "2026-08-01",
        "ENABLE": "Y",
        "IS_CHECK": "是否校准测试值",
        "STATION": "1"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "SfcsEquipmentAdd",
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
          "key": "NAME",
          "label": "设备编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "EQUIP_NAME",
          "label": "设备名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PROPERTY_NO",
          "label": "资产编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MODEL",
          "label": "设备型号",
          "required": true,
          "example": "设备型号测试值"
        },
        {
          "key": "STATION_ID",
          "label": "存放地点",
          "required": true,
          "example": "存放地点测试值"
        },
        {
          "key": "VENDOR",
          "label": "生产厂家",
          "required": true,
          "example": "生产厂家测试值"
        },
        {
          "key": "USER_AGE",
          "label": "使用年限",
          "required": true,
          "example": "使用年限测试值"
        },
        {
          "key": "STATUS",
          "label": "设备状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "ACTIVE_TIMES_ENABLED",
          "label": "是否启用寿命次数管控",
          "required": false,
          "example": "是否启用寿命次数管控测试值"
        },
        {
          "key": "ACTIVE_TIMES",
          "label": "使用寿命次数",
          "required": true,
          "example": "使用寿命次数测试值"
        },
        {
          "key": "CATEGORY",
          "label": "设备分类",
          "required": true,
          "example": "设备分类测试值"
        },
        {
          "key": "PRODUCT_NO",
          "label": "出厂编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "USER_PART",
          "label": "使用部门",
          "required": true,
          "example": "使用部门测试值"
        },
        {
          "key": "POWER",
          "label": "电压/功率",
          "required": true,
          "example": "电压/功率测试值"
        },
        {
          "key": "BUY_TIME",
          "label": "进厂时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "报废时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ENABLE",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "IS_CHECK",
          "label": "是否校准",
          "required": false,
          "example": "是否校准测试值"
        },
        {
          "key": "STATION",
          "label": "机台序号",
          "required": false,
          "example": "1"
        }
      ],
      "testData": {
        "NAME": "AT-001",
        "EQUIP_NAME": "自动化样例001",
        "PROPERTY_NO": "AT-001",
        "MODEL": "设备型号测试值",
        "STATION_ID": "存放地点测试值",
        "VENDOR": "生产厂家测试值",
        "USER_AGE": "使用年限测试值",
        "STATUS": "Y",
        "ACTIVE_TIMES_ENABLED": "是否启用寿命次数管控测试值",
        "ACTIVE_TIMES": "使用寿命次数测试值",
        "CATEGORY": "设备分类测试值",
        "PRODUCT_NO": "AT-001",
        "USER_PART": "使用部门测试值",
        "POWER": "电压/功率测试值",
        "BUY_TIME": "2026-08-01",
        "END_TIME": "2026-08-01",
        "ENABLE": "Y",
        "IS_CHECK": "是否校准测试值",
        "STATION": "1"
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
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "EQUIP_NAME",
          "label": "设备名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PROPERTY_NO",
          "label": "资产编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MODEL",
          "label": "设备型号",
          "required": true,
          "example": "设备型号测试值"
        },
        {
          "key": "STATION_ID",
          "label": "存放地点",
          "required": true,
          "example": "存放地点测试值"
        },
        {
          "key": "VENDOR",
          "label": "生产厂家",
          "required": true,
          "example": "生产厂家测试值"
        },
        {
          "key": "USER_AGE",
          "label": "使用年限",
          "required": true,
          "example": "使用年限测试值"
        },
        {
          "key": "STATUS",
          "label": "设备状态",
          "required": true,
          "example": "Y"
        },
        {
          "key": "ACTIVE_TIMES_ENABLED",
          "label": "是否启用寿命次数管控",
          "required": false,
          "example": "是否启用寿命次数管控测试值"
        },
        {
          "key": "ACTIVE_TIMES",
          "label": "使用寿命次数",
          "required": true,
          "example": "使用寿命次数测试值"
        },
        {
          "key": "CATEGORY",
          "label": "设备分类",
          "required": true,
          "example": "设备分类测试值"
        },
        {
          "key": "PRODUCT_NO",
          "label": "出厂编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "USER_PART",
          "label": "使用部门",
          "required": true,
          "example": "使用部门测试值"
        },
        {
          "key": "POWER",
          "label": "电压/功率",
          "required": true,
          "example": "电压/功率测试值"
        },
        {
          "key": "BUY_TIME",
          "label": "进厂时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "END_TIME",
          "label": "报废时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "ENABLE",
          "label": "是否有效",
          "required": false,
          "example": "Y"
        },
        {
          "key": "IS_CHECK",
          "label": "是否校准",
          "required": false,
          "example": "是否校准测试值"
        },
        {
          "key": "STATION",
          "label": "机台序号",
          "required": false,
          "example": "1"
        }
      ],
      "testData": {
        "NAME": "AT-001",
        "EQUIP_NAME": "自动化样例001",
        "PROPERTY_NO": "AT-001",
        "MODEL": "设备型号测试值",
        "STATION_ID": "存放地点测试值",
        "VENDOR": "生产厂家测试值",
        "USER_AGE": "使用年限测试值",
        "STATUS": "Y",
        "ACTIVE_TIMES_ENABLED": "是否启用寿命次数管控测试值",
        "ACTIVE_TIMES": "使用寿命次数测试值",
        "CATEGORY": "设备分类测试值",
        "PRODUCT_NO": "AT-001",
        "USER_PART": "使用部门测试值",
        "POWER": "电压/功率测试值",
        "BUY_TIME": "2026-08-01",
        "END_TIME": "2026-08-01",
        "ENABLE": "Y",
        "IS_CHECK": "是否校准测试值",
        "STATION": "1"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "SfcsEquipmentdelete",
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
