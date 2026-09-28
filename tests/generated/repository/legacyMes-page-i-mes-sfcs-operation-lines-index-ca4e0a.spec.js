// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-operation-lines-index-ca4e0a",
  "name": "旧版制造执行 - 数据导出（未配置菜单）功能校验",
  "displayName": "数据导出（未配置菜单）",
  "route": "/iMES/SfcsOperationLines/Index",
  "sourceRoute": "/iMES/SfcsOperationLines/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 数据导出（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsOperationLines/Index.vue",
  "dataSchema": {
    "columns": [
      "PHYSICAL_LOCATION",
      "LINE",
      "OPERATION_LINE_NAME",
      "LINE_TYPE",
      "ORGANIZE_ID",
      "ATTRIBUTE3",
      "ENABLED"
    ],
    "required": [
      "PHYSICAL_LOCATION",
      "LINE",
      "OPERATION_LINE_NAME",
      "LINE_TYPE",
      "ORGANIZE_ID"
    ],
    "fields": [
      {
        "key": "PHYSICAL_LOCATION",
        "label": "车间名称",
        "required": true
      },
      {
        "key": "LINE",
        "label": "线体序号",
        "required": true
      },
      {
        "key": "OPERATION_LINE_NAME",
        "label": "线体名称",
        "required": true
      },
      {
        "key": "LINE_TYPE",
        "label": "工段",
        "required": true
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "ATTRIBUTE3",
        "label": "'ERP线体'",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "PHYSICAL_LOCATION": "自动化样例001",
      "LINE": "1",
      "OPERATION_LINE_NAME": "自动化样例001",
      "LINE_TYPE": "工段测试值",
      "ORGANIZE_ID": "组织架构测试值",
      "ATTRIBUTE3": "'ERP线体'测试值",
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
        "PHYSICAL_LOCATION": "自动化样例001",
        "LINE": "1",
        "OPERATION_LINE_NAME": "自动化样例001",
        "LINE_TYPE": "工段测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "ATTRIBUTE3": "'ERP线体'测试值",
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
      "permission": "SfcsOperationLinesAdd",
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
          "key": "PHYSICAL_LOCATION",
          "label": "车间名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LINE",
          "label": "线体序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "OPERATION_LINE_NAME",
          "label": "线体名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LINE_TYPE",
          "label": "工段",
          "required": true,
          "example": "工段测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "'ERP线体'",
          "required": false,
          "example": "'ERP线体'测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "PHYSICAL_LOCATION": "自动化样例001",
        "LINE": "1",
        "OPERATION_LINE_NAME": "自动化样例001",
        "LINE_TYPE": "工段测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "ATTRIBUTE3": "'ERP线体'测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "ef879b4ced-4cccae178a-dce2e",
      "type": "导出入口",
      "name": "数据导出业务入口校验",
      "label": "数据导出",
      "handler": "exportAllData2",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击数据导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "SfcsOperationLinesEdit",
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
          "key": "PHYSICAL_LOCATION",
          "label": "车间名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LINE",
          "label": "线体序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "OPERATION_LINE_NAME",
          "label": "线体名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LINE_TYPE",
          "label": "工段",
          "required": true,
          "example": "工段测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "'ERP线体'",
          "required": false,
          "example": "'ERP线体'测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "PHYSICAL_LOCATION": "自动化样例001",
        "LINE": "1",
        "OPERATION_LINE_NAME": "自动化样例001",
        "LINE_TYPE": "工段测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "ATTRIBUTE3": "'ERP线体'测试值",
        "ENABLED": "是否激活测试值"
      }
    }
  ]
});
