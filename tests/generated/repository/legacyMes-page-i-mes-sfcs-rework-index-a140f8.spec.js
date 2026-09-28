// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-rework-index-a140f8",
  "name": "旧版制造执行 - 产品信息（未配置菜单）功能校验",
  "displayName": "产品信息（未配置菜单）",
  "route": "/iMES/SfcsRework/Index",
  "sourceRoute": "/iMES/SfcsRework/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 产品信息（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsRework/Index.vue",
  "dataSchema": {
    "columns": [
      "MODEL",
      "PART_NO",
      "WO_NO",
      "ROUTENAME",
      "RETYPE",
      "NEW_WORKNO",
      "SN",
      "Key"
    ],
    "required": [],
    "fields": [
      {
        "key": "MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": false
      },
      {
        "key": "ROUTENAME",
        "label": "制程",
        "required": false
      },
      {
        "key": "RETYPE",
        "label": "返工类型",
        "required": false
      },
      {
        "key": "NEW_WORKNO",
        "label": "新工单号",
        "required": false
      },
      {
        "key": "SN",
        "label": "返工数据",
        "required": false
      },
      {
        "key": "Key",
        "label": "关键词",
        "required": false
      }
    ],
    "example": {
      "MODEL": "规格测试值",
      "PART_NO": "AT-001",
      "WO_NO": "工单测试值",
      "ROUTENAME": "制程测试值",
      "RETYPE": "返工类型测试值",
      "NEW_WORKNO": "AT-001",
      "SN": "返工数据测试值",
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
        "MODEL": "规格测试值",
        "PART_NO": "AT-001",
        "WO_NO": "工单测试值",
        "ROUTENAME": "制程测试值",
        "RETYPE": "返工类型测试值",
        "NEW_WORKNO": "AT-001",
        "SN": "返工数据测试值",
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
      "key": "faea8c1db9-82d8caeac9-82d73",
      "type": "查看详情",
      "name": "返工数据业务入口校验",
      "label": "返工数据",
      "handler": "openDialogVisible",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击返工数据",
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
