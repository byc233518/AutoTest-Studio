// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-operation-sites-controller-index-d29179",
  "name": "旧版制造执行 - 安灯管理功能校验",
  "displayName": "安灯管理",
  "route": "/iMES/SfcsOperationSitesController/Index",
  "sourceRoute": "/iMES/SfcsOperationSitesController/Index",
  "menuCode": "iMES_SfcsOperationSitesController",
  "breadcrumb": "品质管理 / 消息中心 / 安灯管理",
  "sourceFile": "src/views/iMES/SfcsOperationSitesController/Index.vue",
  "dataSchema": {
    "columns": [
      "fmtCallTypeNanme",
      "CALL_CODE",
      "CALL_CONTENT",
      "OPERATION_LINE_ID",
      "cuMachineDev",
      "cuLinkeType",
      "key31",
      "key32",
      "key33",
      "key34",
      "key35",
      "CALL_TITLE",
      "key"
    ],
    "required": [
      "key31",
      "key32",
      "key33",
      "key34",
      "key35"
    ],
    "fields": [
      {
        "key": "fmtCallTypeNanme",
        "label": "消息类型",
        "required": false
      },
      {
        "key": "CALL_CODE",
        "label": "模板代码",
        "required": false
      },
      {
        "key": "CALL_CONTENT",
        "label": "消息内容",
        "required": false
      },
      {
        "key": "OPERATION_LINE_ID",
        "label": "站点",
        "required": false
      },
      {
        "key": "cuMachineDev",
        "label": "设备类型",
        "required": false
      },
      {
        "key": "cuLinkeType",
        "label": "连接方式",
        "required": false
      },
      {
        "key": "key31",
        "label": "端口",
        "required": true
      },
      {
        "key": "key32",
        "label": "波特率",
        "required": true
      },
      {
        "key": "key33",
        "label": "校验位",
        "required": true
      },
      {
        "key": "key34",
        "label": "数据位",
        "required": true
      },
      {
        "key": "key35",
        "label": "停止位",
        "required": true
      },
      {
        "key": "CALL_TITLE",
        "label": "关键词",
        "required": false
      },
      {
        "key": "key",
        "label": "关键字",
        "required": false
      }
    ],
    "example": {
      "fmtCallTypeNanme": "消息类型测试值",
      "CALL_CODE": "模板代码测试值",
      "CALL_CONTENT": "消息内容测试值",
      "OPERATION_LINE_ID": "站点测试值",
      "cuMachineDev": "设备类型测试值",
      "cuLinkeType": "连接方式测试值",
      "key31": "端口测试值",
      "key32": "波特率测试值",
      "key33": "校验位测试值",
      "key34": "数据位测试值",
      "key35": "停止位测试值",
      "CALL_TITLE": "关键词测试值",
      "key": "关键字测试值"
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
        "search(false)"
      ],
      "testData": {
        "fmtCallTypeNanme": "消息类型测试值",
        "CALL_CODE": "模板代码测试值",
        "CALL_CONTENT": "消息内容测试值",
        "OPERATION_LINE_ID": "站点测试值",
        "cuMachineDev": "设备类型测试值",
        "cuLinkeType": "连接方式测试值",
        "key31": "端口测试值",
        "key32": "波特率测试值",
        "key33": "校验位测试值",
        "key34": "数据位测试值",
        "key35": "停止位测试值",
        "CALL_TITLE": "关键词测试值",
        "key": "关键字测试值"
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
