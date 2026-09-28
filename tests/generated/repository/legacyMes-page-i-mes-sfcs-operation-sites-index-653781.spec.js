// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-operation-sites-index-653781",
  "name": "旧版制造执行 - 输入站点名称（未配置菜单）功能校验",
  "displayName": "输入站点名称（未配置菜单）",
  "route": "/iMES/SfcsOperationSites/Index",
  "sourceRoute": "/iMES/SfcsOperationSites/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 输入站点名称（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsOperationSites/Index.vue",
  "dataSchema": {
    "columns": [
      "OPERATION_LINE_ID",
      "OPERATION_INCN",
      "OPERATION_SITE_NAME",
      "SITE_SN",
      "ENABLED"
    ],
    "required": [
      "OPERATION_LINE_ID",
      "OPERATION_INCN",
      "OPERATION_SITE_NAME"
    ],
    "fields": [
      {
        "key": "OPERATION_LINE_ID",
        "label": "线体名称",
        "required": true
      },
      {
        "key": "OPERATION_INCN",
        "label": "工序名称",
        "required": true
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "站点名称",
        "required": true
      },
      {
        "key": "SITE_SN",
        "label": "站点条码",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "OPERATION_LINE_ID": "自动化样例001",
      "OPERATION_INCN": "自动化样例001",
      "OPERATION_SITE_NAME": "自动化样例001",
      "SITE_SN": "AT-001",
      "ENABLED": "是否激活测试值"
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
        "search_but"
      ],
      "testData": {
        "OPERATION_LINE_ID": "自动化样例001",
        "OPERATION_INCN": "自动化样例001",
        "OPERATION_SITE_NAME": "自动化样例001",
        "SITE_SN": "AT-001",
        "ENABLED": "是否激活测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
      "permission": "SfcsOperationSitesAdd",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false,
      "fields": [
        {
          "key": "OPERATION_LINE_ID",
          "label": "线体名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_INCN",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "站点名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "SITE_SN",
          "label": "站点条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "OPERATION_LINE_ID": "自动化样例001",
        "OPERATION_INCN": "自动化样例001",
        "OPERATION_SITE_NAME": "自动化样例001",
        "SITE_SN": "AT-001",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "SfcsOperationSitesEdit",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑",
        "校验源码表单字段",
        "填写可编辑字段并校验回填",
        "取消关闭且不保存"
      ],
      "assertions": [
        "表单、弹窗、抽屉或编辑路由真实打开",
        "源码字段在界面中存在",
        "取消后编辑界面关闭"
      ],
      "mutatesData": false,
      "fields": [
        {
          "key": "OPERATION_LINE_ID",
          "label": "线体名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_INCN",
          "label": "工序名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "OPERATION_SITE_NAME",
          "label": "站点名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "SITE_SN",
          "label": "站点条码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "OPERATION_LINE_ID": "自动化样例001",
        "OPERATION_INCN": "自动化样例001",
        "OPERATION_SITE_NAME": "自动化样例001",
        "SITE_SN": "AT-001",
        "ENABLED": "是否激活测试值"
      }
    }
  ]
});
