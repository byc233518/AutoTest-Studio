// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-resource-proess-index-c24de9",
  "name": "旧版制造执行 - 刷新（未配置菜单）功能校验",
  "displayName": "刷新（未配置菜单）",
  "route": "/iMES/SmtResourceProess/Index",
  "sourceRoute": "/iMES/SmtResourceProess/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 刷新（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtResourceProess/Index.vue",
  "dataSchema": {
    "columns": [
      "resourceNo",
      "nextOperationId",
      "CN_DESC",
      "BATCH_NO",
      "REEL_NO",
      "OPERATOR",
      "PART_NO",
      "PART_NAME",
      "PART_DESC",
      "REMARK"
    ],
    "required": [
      "CN_DESC",
      "BATCH_NO",
      "REEL_NO"
    ],
    "fields": [
      {
        "key": "resourceNo",
        "label": "辅料条码",
        "required": false
      },
      {
        "key": "nextOperationId",
        "label": "下一道流程作业",
        "required": false
      },
      {
        "key": "CN_DESC",
        "label": "冰箱储位",
        "required": true
      },
      {
        "key": "BATCH_NO",
        "label": "批次号",
        "required": true
      },
      {
        "key": "REEL_NO",
        "label": "辅料条码",
        "required": true
      },
      {
        "key": "OPERATOR",
        "label": "作业员",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "物料编号",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "物料描述",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "resourceNo": "AT-001",
      "nextOperationId": "下一道流程作业测试值",
      "CN_DESC": "冰箱储位测试值",
      "BATCH_NO": "批次号测试值",
      "REEL_NO": "AT-001",
      "OPERATOR": "作业员测试值",
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "PART_DESC": "自动化测试备注001",
      "REMARK": "自动化测试备注001"
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
        "resourceNo": "AT-001",
        "nextOperationId": "下一道流程作业测试值",
        "CN_DESC": "冰箱储位测试值",
        "BATCH_NO": "批次号测试值",
        "REEL_NO": "AT-001",
        "OPERATOR": "作业员测试值",
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "PART_DESC": "自动化测试备注001",
        "REMARK": "自动化测试备注001"
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
      "key": "7e002f9936-11a1eb935d-d4ebb",
      "type": "业务动作",
      "name": "报废业务入口校验",
      "label": "报废",
      "handler": "scrapped",
      "permission": "ProcessResourceGiveOut",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位报废",
        "校验按钮可见且可用",
        "不点击以避免修改业务数据"
      ],
      "assertions": [
        "数据变更入口可见且可用",
        "测试过程不点击、不写入业务数据"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-a3e24ee2ba-f8469",
      "type": "业务动作",
      "name": "进入下一流程作业业务入口校验",
      "label": "进入下一流程作业",
      "handler": "handleToNext",
      "permission": "ProcessResourceRuncard",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击进入下一流程作业",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    }
  ]
});
