// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-product-index-ea8ccb",
  "name": "旧版制造执行 - 线体名称（未配置菜单）功能校验",
  "displayName": "线体名称（未配置菜单）",
  "route": "/iMES/SfcsEquipProduct/Index",
  "sourceRoute": "/iMES/SfcsEquipProduct/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 线体名称（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsEquipProduct/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "Key",
      "selectTime"
    ],
    "required": [],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线别",
        "required": false
      },
      {
        "key": "Key",
        "label": "线别名称",
        "required": false
      },
      {
        "key": "selectTime",
        "label": "开始日期",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "线别测试值",
      "Key": "自动化样例001",
      "selectTime": "2026-08-01"
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
        "searchClick",
        "handelStatisticsList"
      ],
      "testData": {
        "LINE_ID": "线别测试值",
        "Key": "自动化样例001",
        "selectTime": "2026-08-01"
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
      "key": "3d81345303-3d81345303-db70f",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "handelResetBtn",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-1553af6b72-75677",
      "type": "导出入口",
      "name": "导出文档业务入口校验",
      "label": "导出文档",
      "handler": "handelExportExcel",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出文档",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
