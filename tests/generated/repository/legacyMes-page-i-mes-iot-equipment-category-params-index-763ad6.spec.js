// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-iot-equipment-category-params-index-763ad6",
  "name": "旧版制造执行 - 设备分类（未配置菜单）功能校验",
  "displayName": "设备分类（未配置菜单）",
  "route": "/iMES/IotEquipmentCategoryParams/Index",
  "sourceRoute": "/iMES/IotEquipmentCategoryParams/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 设备分类（未配置菜单）",
  "sourceFile": "src/views/iMES/IotEquipmentCategoryParams/Index.vue",
  "dataSchema": {
    "columns": [
      "WARN_TYPE",
      "MIN_VALUE",
      "MAX_VALUE",
      "MIN_VALUE2",
      "MAX_VALUE2",
      "COMPUTE_TAG",
      "EQUIPMENT_ATTRIBUTE",
      "EQUIPMENT_ATTRIBUTE_CN",
      "COLLECT_TYPE"
    ],
    "required": [
      "COMPUTE_TAG"
    ],
    "fields": [
      {
        "key": "WARN_TYPE",
        "label": "报警类型",
        "required": false
      },
      {
        "key": "MIN_VALUE",
        "label": "低预警",
        "required": false
      },
      {
        "key": "MAX_VALUE",
        "label": "高预警",
        "required": false
      },
      {
        "key": "MIN_VALUE2",
        "label": "低预警2",
        "required": false
      },
      {
        "key": "MAX_VALUE2",
        "label": "高预警2",
        "required": false
      },
      {
        "key": "COMPUTE_TAG",
        "label": "标签事件",
        "required": true
      },
      {
        "key": "EQUIPMENT_ATTRIBUTE",
        "label": "参数名称",
        "required": false
      },
      {
        "key": "EQUIPMENT_ATTRIBUTE_CN",
        "label": "参数名称（中文）",
        "required": false
      },
      {
        "key": "COLLECT_TYPE",
        "label": "参数类型",
        "required": false
      }
    ],
    "example": {
      "WARN_TYPE": "报警类型测试值",
      "MIN_VALUE": "低预警测试值",
      "MAX_VALUE": "高预警测试值",
      "MIN_VALUE2": "低预警2测试值",
      "MAX_VALUE2": "高预警2测试值",
      "COMPUTE_TAG": "标签事件测试值",
      "EQUIPMENT_ATTRIBUTE": "自动化样例001",
      "EQUIPMENT_ATTRIBUTE_CN": "参数名称（中文）测试值",
      "COLLECT_TYPE": "参数类型测试值"
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
        "WARN_TYPE": "报警类型测试值",
        "MIN_VALUE": "低预警测试值",
        "MAX_VALUE": "高预警测试值",
        "MIN_VALUE2": "低预警2测试值",
        "MAX_VALUE2": "高预警2测试值",
        "COMPUTE_TAG": "标签事件测试值",
        "EQUIPMENT_ATTRIBUTE": "自动化样例001",
        "EQUIPMENT_ATTRIBUTE_CN": "参数名称（中文）测试值",
        "COLLECT_TYPE": "参数类型测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-4d682",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but(-1)",
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
          "key": "WARN_TYPE",
          "label": "报警类型",
          "required": false,
          "example": "报警类型测试值"
        },
        {
          "key": "MIN_VALUE",
          "label": "低预警",
          "required": false,
          "example": "低预警测试值"
        },
        {
          "key": "MAX_VALUE",
          "label": "高预警",
          "required": false,
          "example": "高预警测试值"
        },
        {
          "key": "MIN_VALUE2",
          "label": "低预警2",
          "required": false,
          "example": "低预警2测试值"
        },
        {
          "key": "MAX_VALUE2",
          "label": "高预警2",
          "required": false,
          "example": "高预警2测试值"
        },
        {
          "key": "COMPUTE_TAG",
          "label": "标签事件",
          "required": true,
          "example": "标签事件测试值"
        },
        {
          "key": "EQUIPMENT_ATTRIBUTE",
          "label": "参数名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "EQUIPMENT_ATTRIBUTE_CN",
          "label": "参数名称（中文）",
          "required": false,
          "example": "参数名称（中文）测试值"
        },
        {
          "key": "COLLECT_TYPE",
          "label": "参数类型",
          "required": false,
          "example": "参数类型测试值"
        }
      ],
      "testData": {
        "WARN_TYPE": "报警类型测试值",
        "MIN_VALUE": "低预警测试值",
        "MAX_VALUE": "高预警测试值",
        "MIN_VALUE2": "低预警2测试值",
        "MAX_VALUE2": "高预警2测试值",
        "COMPUTE_TAG": "标签事件测试值",
        "EQUIPMENT_ATTRIBUTE": "自动化样例001",
        "EQUIPMENT_ATTRIBUTE_CN": "参数名称（中文）测试值",
        "COLLECT_TYPE": "参数类型测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a6c71",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick",
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
