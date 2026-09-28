// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-rework-new-index-14b6b9",
  "name": "旧版制造执行 - 工单信息（未配置菜单）功能校验",
  "displayName": "工单信息（未配置菜单）",
  "route": "/iMES/SfcsReworkNew/Index",
  "sourceRoute": "/iMES/SfcsReworkNew/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 工单信息（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsReworkNew/Index.vue",
  "dataSchema": {
    "columns": [
      "WO_NO",
      "PART_NO",
      "PART_MODEL",
      "ROUTE_NAME",
      "RETYPE",
      "OPERATION_TYPE",
      "NEW_WORKNO",
      "REWORK_OPERATION",
      "WORKQTY",
      "REWORK_CHOOSE_OPERATION",
      "QTY",
      "SN",
      "KEYCOMPONENTS",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PART_MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "ROUTE_NAME",
        "label": "制程",
        "required": false
      },
      {
        "key": "RETYPE",
        "label": "返工类型",
        "required": false
      },
      {
        "key": "OPERATION_TYPE",
        "label": "管控类型",
        "required": false
      },
      {
        "key": "NEW_WORKNO",
        "label": "新工单",
        "required": false
      },
      {
        "key": "REWORK_OPERATION",
        "label": "返工工序",
        "required": false
      },
      {
        "key": "WORKQTY",
        "label": "可以返工数",
        "required": false
      },
      {
        "key": "REWORK_CHOOSE_OPERATION",
        "label": "目的工序",
        "required": false
      },
      {
        "key": "QTY",
        "label": "返工数量",
        "required": false
      },
      {
        "key": "SN",
        "label": "条码",
        "required": false
      },
      {
        "key": "KEYCOMPONENTS",
        "label": "关键部件",
        "required": false
      },
      {
        "key": "Key",
        "label": "关键词",
        "required": false
      }
    ],
    "example": {
      "WO_NO": "工单测试值",
      "PART_NO": "AT-001",
      "PART_MODEL": "规格测试值",
      "ROUTE_NAME": "制程测试值",
      "RETYPE": "返工类型测试值",
      "OPERATION_TYPE": "管控类型测试值",
      "NEW_WORKNO": "新工单测试值",
      "REWORK_OPERATION": "返工工序测试值",
      "WORKQTY": "可以返工数测试值",
      "REWORK_CHOOSE_OPERATION": "目的工序测试值",
      "QTY": "1",
      "SN": "AT-001",
      "KEYCOMPONENTS": "关键部件测试值",
      "Key": "关键词测试值"
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
        "WO_NO": "工单测试值",
        "PART_NO": "AT-001",
        "PART_MODEL": "规格测试值",
        "ROUTE_NAME": "制程测试值",
        "RETYPE": "返工类型测试值",
        "OPERATION_TYPE": "管控类型测试值",
        "NEW_WORKNO": "新工单测试值",
        "REWORK_OPERATION": "返工工序测试值",
        "WORKQTY": "可以返工数测试值",
        "REWORK_CHOOSE_OPERATION": "目的工序测试值",
        "QTY": "1",
        "SN": "AT-001",
        "KEYCOMPONENTS": "关键部件测试值",
        "Key": "关键词测试值"
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
      "key": "faea8c1db9-3568775228-82d73",
      "type": "查看详情",
      "name": "返工工序业务入口校验",
      "label": "返工工序",
      "handler": "openDialogVisible",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击返工工序",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    }
  ]
});
