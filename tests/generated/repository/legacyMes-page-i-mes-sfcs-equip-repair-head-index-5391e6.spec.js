// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-repair-head-index-5391e6",
  "name": "旧版制造执行 - 设备点检维修功能校验",
  "displayName": "设备点检维修",
  "route": "/iMES/SfcsEquipRepairHead/Index",
  "sourceRoute": "/iMES/SfcsEquipRepairHead/Index",
  "menuCode": "iMES_SfcsEquipRepairHead",
  "breadcrumb": "设备管理 / 设备管理 / 设备点检维修",
  "sourceFile": "src/views/iMES/SfcsEquipRepairHead/Index.vue",
  "dataSchema": {
    "columns": [
      "REPAIR_STATUS",
      "REPAIR_CONTENT",
      "USER_AGE",
      "CATEGORY",
      "STATUS",
      "NAME",
      "accessoryName",
      "accessoryNorm"
    ],
    "required": [],
    "fields": [
      {
        "key": "REPAIR_STATUS",
        "label": "维修结果",
        "required": false
      },
      {
        "key": "REPAIR_CONTENT",
        "label": "维修内容",
        "required": false
      },
      {
        "key": "USER_AGE",
        "label": "维修配件",
        "required": false
      },
      {
        "key": "CATEGORY",
        "label": "设备分类",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "所有设备状态",
        "required": false
      },
      {
        "key": "NAME",
        "label": "设备编号",
        "required": false
      },
      {
        "key": "accessoryName",
        "label": "配件名称",
        "required": false
      },
      {
        "key": "accessoryNorm",
        "label": "配件规格",
        "required": false
      }
    ],
    "example": {
      "REPAIR_STATUS": "维修结果测试值",
      "REPAIR_CONTENT": "维修内容测试值",
      "USER_AGE": "维修配件测试值",
      "CATEGORY": "设备分类测试值",
      "STATUS": "Y",
      "NAME": "AT-001",
      "accessoryName": "自动化样例001",
      "accessoryNorm": "配件规格测试值"
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
        "doFilter"
      ],
      "testData": {
        "REPAIR_STATUS": "维修结果测试值",
        "REPAIR_CONTENT": "维修内容测试值",
        "USER_AGE": "维修配件测试值",
        "CATEGORY": "设备分类测试值",
        "STATUS": "Y",
        "NAME": "AT-001",
        "accessoryName": "自动化样例001",
        "accessoryNorm": "配件规格测试值"
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
      "key": "7e002f9936-fd56d1c537-dc9a6",
      "type": "业务动作",
      "name": "维修设备业务入口校验",
      "label": "维修设备",
      "handler": "service_but(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位维修设备",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    }
  ]
});
