// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-pallet-sweep-index-d6dad0",
  "name": "旧版制造执行 - 工单（未配置菜单）功能校验",
  "displayName": "工单（未配置菜单）",
  "route": "/iMES/PalletSweep/Index",
  "sourceRoute": "/iMES/PalletSweep/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 工单（未配置菜单）",
  "sourceFile": "src/views/iMES/PalletSweep/Index.vue",
  "dataSchema": {
    "columns": [
      "InputData",
      "OldValue",
      "Pallet_NO",
      "DefinedQty",
      "CurrentQty",
      "LabelTemplate",
      "WoNoBer",
      "OPERATION_LINE_ID",
      "StationID",
      "PrintName",
      "FILE_NAME",
      "Key",
      "OPERATION_SITE_NAME"
    ],
    "required": [],
    "fields": [
      {
        "key": "InputData",
        "label": "输入箱号条码",
        "required": false
      },
      {
        "key": "OldValue",
        "label": "旧值",
        "required": false
      },
      {
        "key": "Pallet_NO",
        "label": "栈板号",
        "required": false
      },
      {
        "key": "DefinedQty",
        "label": "容量",
        "required": false
      },
      {
        "key": "CurrentQty",
        "label": "已装数量",
        "required": false
      },
      {
        "key": "LabelTemplate",
        "label": "标签模板",
        "required": false
      },
      {
        "key": "WoNoBer",
        "label": "工单",
        "required": false
      },
      {
        "key": "OPERATION_LINE_ID",
        "label": "线体名称",
        "required": false
      },
      {
        "key": "StationID",
        "label": "工位",
        "required": false
      },
      {
        "key": "PrintName",
        "label": "打印机名称",
        "required": false
      },
      {
        "key": "FILE_NAME",
        "label": "标签名称",
        "required": false
      },
      {
        "key": "Key",
        "label": "工单",
        "required": false
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "名称",
        "required": false
      }
    ],
    "example": {
      "InputData": "AT-001",
      "OldValue": "旧值测试值",
      "Pallet_NO": "栈板号测试值",
      "DefinedQty": "1",
      "CurrentQty": "1",
      "LabelTemplate": "标签模板测试值",
      "WoNoBer": "工单测试值",
      "OPERATION_LINE_ID": "自动化样例001",
      "StationID": "工位测试值",
      "PrintName": "自动化样例001",
      "FILE_NAME": "自动化样例001",
      "Key": "工单测试值",
      "OPERATION_SITE_NAME": "自动化样例001"
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
        "InputData": "AT-001",
        "OldValue": "旧值测试值",
        "Pallet_NO": "栈板号测试值",
        "DefinedQty": "1",
        "CurrentQty": "1",
        "LabelTemplate": "标签模板测试值",
        "WoNoBer": "工单测试值",
        "OPERATION_LINE_ID": "自动化样例001",
        "StationID": "工位测试值",
        "PrintName": "自动化样例001",
        "FILE_NAME": "自动化样例001",
        "Key": "工单测试值",
        "OPERATION_SITE_NAME": "自动化样例001"
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
