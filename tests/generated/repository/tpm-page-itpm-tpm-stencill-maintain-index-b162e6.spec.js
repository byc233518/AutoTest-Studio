// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-stencill-maintain-index-b162e6",
  "name": "设备管理 - 钢网保养功能校验",
  "displayName": "钢网保养",
  "route": "/ITPM/TpmStencillMaintain/Index",
  "sourceRoute": "/ITPM/TpmStencillMaintain/Index",
  "menuCode": "TpmStencillMaintain",
  "breadcrumb": "生产管理 / 钢网管理 / 钢网保养",
  "sourceFile": "src/views/ITPM/TpmStencillMaintain/Index.vue",
  "dataSchema": {
    "columns": [
      "StencilNo",
      "Status",
      "ResultStatus",
      "Remark"
    ],
    "required": [
      "StencilNo",
      "Remark"
    ],
    "fields": [
      {
        "key": "StencilNo",
        "label": "钢网编号",
        "required": true
      },
      {
        "key": "Status",
        "label": "当前状态",
        "required": false
      },
      {
        "key": "ResultStatus",
        "label": "维护后状态",
        "required": false
      },
      {
        "key": "Remark",
        "label": "维护保养备注",
        "required": true
      }
    ],
    "example": {
      "StencilNo": "AT-001",
      "Status": "Y",
      "ResultStatus": "Y",
      "Remark": "自动化测试备注001"
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
        "StencilNo": "AT-001",
        "Status": "Y",
        "ResultStatus": "Y",
        "Remark": "自动化测试备注001"
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
      "key": "7e002f9936-e27f404aed-09dd6",
      "type": "业务动作",
      "name": "钢网保养业务入口校验",
      "label": "钢网保养",
      "handler": "saveData",
      "permission": "SaveData",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位钢网保养",
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
