// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-qc-dtl-urgent-index-829bef",
  "name": "仓储管理 - 急料维护功能校验",
  "displayName": "急料维护",
  "route": "/ImsQcDtlUrgent/Index",
  "sourceRoute": "/ImsQcDtlUrgent/Index",
  "menuCode": "ImsQcDtlUrgent",
  "breadcrumb": "品质管理 / 基础配置 / 急料维护",
  "sourceFile": "src/views/ImsQcDtlUrgent/Index.vue",
  "dataSchema": {
    "columns": [
      "UrgentFlag",
      "UrgentLevel",
      "UrgentRemark",
      "UrgentTime"
    ],
    "required": [
      "UrgentLevel",
      "UrgentRemark",
      "UrgentTime"
    ],
    "fields": [
      {
        "key": "UrgentFlag",
        "label": "是否急料",
        "required": false
      },
      {
        "key": "UrgentLevel",
        "label": "急料等级",
        "required": true
      },
      {
        "key": "UrgentRemark",
        "label": "急料描述",
        "required": true
      },
      {
        "key": "UrgentTime",
        "label": "急料需求时间",
        "required": true
      }
    ],
    "example": {
      "UrgentFlag": "是否急料测试值",
      "UrgentLevel": "急料等级测试值",
      "UrgentRemark": "自动化测试备注001",
      "UrgentTime": "2026-08-01"
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
        "UrgentFlag": "是否急料测试值",
        "UrgentLevel": "急料等级测试值",
        "UrgentRemark": "自动化测试备注001",
        "UrgentTime": "2026-08-01"
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
