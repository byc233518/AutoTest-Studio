// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-iot-equipment-warn-index-9e44c1",
  "name": "旧版制造执行 - 取消报警（未配置菜单）功能校验",
  "displayName": "取消报警（未配置菜单）",
  "route": "/iMES/IotEquipmentWarn/Index",
  "sourceRoute": "/iMES/IotEquipmentWarn/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 取消报警（未配置菜单）",
  "sourceFile": "src/views/iMES/IotEquipmentWarn/Index.vue",
  "dataSchema": {
    "columns": [
      "EQUIPMENT_CODE",
      "QUIPMENT_ATTRIBUTE",
      "EQUIPMENT_ATTRIBUTE_CN",
      "WARN_TYPE",
      "CURRENT_VALUE",
      "MAX_VALUE",
      "MIN_VALUE",
      "ARN_GRADE",
      "WARN_CONTENT"
    ],
    "required": [],
    "fields": [
      {
        "key": "EQUIPMENT_CODE",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "QUIPMENT_ATTRIBUTE",
        "label": "报警参数",
        "required": false
      },
      {
        "key": "EQUIPMENT_ATTRIBUTE_CN",
        "label": "报警参数名称",
        "required": false
      },
      {
        "key": "WARN_TYPE",
        "label": "报警类型",
        "required": false
      },
      {
        "key": "CURRENT_VALUE",
        "label": "当前值",
        "required": false
      },
      {
        "key": "MAX_VALUE",
        "label": "最大值",
        "required": false
      },
      {
        "key": "MIN_VALUE",
        "label": "最小值",
        "required": false
      },
      {
        "key": "ARN_GRADE",
        "label": "报警等级",
        "required": false
      },
      {
        "key": "WARN_CONTENT",
        "label": "报警内容",
        "required": false
      }
    ],
    "example": {
      "EQUIPMENT_CODE": "AT-001",
      "QUIPMENT_ATTRIBUTE": "报警参数测试值",
      "EQUIPMENT_ATTRIBUTE_CN": "自动化样例001",
      "WARN_TYPE": "报警类型测试值",
      "CURRENT_VALUE": "当前值测试值",
      "MAX_VALUE": "最大值测试值",
      "MIN_VALUE": "最小值测试值",
      "ARN_GRADE": "报警等级测试值",
      "WARN_CONTENT": "报警内容测试值"
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
        "EQUIPMENT_CODE": "AT-001",
        "QUIPMENT_ATTRIBUTE": "报警参数测试值",
        "EQUIPMENT_ATTRIBUTE_CN": "自动化样例001",
        "WARN_TYPE": "报警类型测试值",
        "CURRENT_VALUE": "当前值测试值",
        "MAX_VALUE": "最大值测试值",
        "MIN_VALUE": "最小值测试值",
        "ARN_GRADE": "报警等级测试值",
        "WARN_CONTENT": "报警内容测试值"
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
    }
  ]
});
