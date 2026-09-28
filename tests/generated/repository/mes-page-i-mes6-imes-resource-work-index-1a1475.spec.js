// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-resource-work-index-1a1475",
  "name": "制造执行 - 辅料制程作业功能校验",
  "displayName": "辅料制程作业",
  "route": "/iMES6/ImesResourceWork/Index",
  "sourceRoute": "/iMES6/ImesResourceWork/Index",
  "menuCode": "ImesResourceWork",
  "breadcrumb": "生产管理 / 辅料管理 / 辅料制程作业",
  "sourceFile": "src/views/iMES6/ImesResourceWork/Index.vue",
  "dataSchema": {
    "columns": [
      "ReelCode",
      "NextOperationId"
    ],
    "required": [],
    "fields": [
      {
        "key": "ReelCode",
        "label": "辅料条码",
        "required": false
      },
      {
        "key": "NextOperationId",
        "label": "下一道流程作业",
        "required": false
      }
    ],
    "example": {
      "ReelCode": "AT-001",
      "NextOperationId": "下一道流程作业测试值"
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
      "key": "faea8c1db9-5a07f08320-526a8",
      "type": "查看详情",
      "name": "辅料上下线业务入口校验",
      "label": "辅料上下线",
      "handler": "openFormEditor",
      "permission": "UpLineAndDownLine",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击辅料上下线",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
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
