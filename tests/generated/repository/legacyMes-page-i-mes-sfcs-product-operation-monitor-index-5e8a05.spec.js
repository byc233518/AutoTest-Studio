// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-product-operation-monitor-index-5e8a05",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SfcsProductOperationMonitor/Index",
  "sourceRoute": "/iMES/SfcsProductOperationMonitor/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsProductOperationMonitor/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "END_OPERATION_NAME",
      "STOP_CRITERIA",
      "STOP_AND_HOLD",
      "BEGIN_OPERATION_NAME",
      "ALARM_CRITERIA",
      "COMPARE_MODE",
      "MONITOR_MODE",
      "CRITERIA_UNIT",
      "ENABLED"
    ],
    "required": [
      "PART_NO",
      "STOP_CRITERIA",
      "ALARM_CRITERIA",
      "COMPARE_MODE",
      "MONITOR_MODE",
      "CRITERIA_UNIT"
    ],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "END_OPERATION_NAME",
        "label": "结束工序",
        "required": false
      },
      {
        "key": "STOP_CRITERIA",
        "label": "中止标准",
        "required": true
      },
      {
        "key": "STOP_AND_HOLD",
        "label": "是否中止锁定",
        "required": false
      },
      {
        "key": "BEGIN_OPERATION_NAME",
        "label": "开始工序",
        "required": false
      },
      {
        "key": "ALARM_CRITERIA",
        "label": "警告标准",
        "required": true
      },
      {
        "key": "COMPARE_MODE",
        "label": "对比模式",
        "required": true
      },
      {
        "key": "MONITOR_MODE",
        "label": "监控模式",
        "required": true
      },
      {
        "key": "CRITERIA_UNIT",
        "label": "单位",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "END_OPERATION_NAME": "结束工序测试值",
      "STOP_CRITERIA": "中止标准测试值",
      "STOP_AND_HOLD": "是否中止锁定测试值",
      "BEGIN_OPERATION_NAME": "开始工序测试值",
      "ALARM_CRITERIA": "警告标准测试值",
      "COMPARE_MODE": "对比模式测试值",
      "MONITOR_MODE": "监控模式测试值",
      "CRITERIA_UNIT": "单位测试值",
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
        "searchClick"
      ],
      "testData": {
        "PART_NO": "AT-001",
        "END_OPERATION_NAME": "结束工序测试值",
        "STOP_CRITERIA": "中止标准测试值",
        "STOP_AND_HOLD": "是否中止锁定测试值",
        "BEGIN_OPERATION_NAME": "开始工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "COMPARE_MODE": "对比模式测试值",
        "MONITOR_MODE": "监控模式测试值",
        "CRITERIA_UNIT": "单位测试值",
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
      "permission": "SfcsProductOperationMonitorAdd",
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
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "END_OPERATION_NAME",
          "label": "结束工序",
          "required": false,
          "example": "结束工序测试值"
        },
        {
          "key": "STOP_CRITERIA",
          "label": "中止标准",
          "required": true,
          "example": "中止标准测试值"
        },
        {
          "key": "STOP_AND_HOLD",
          "label": "是否中止锁定",
          "required": false,
          "example": "是否中止锁定测试值"
        },
        {
          "key": "BEGIN_OPERATION_NAME",
          "label": "开始工序",
          "required": false,
          "example": "开始工序测试值"
        },
        {
          "key": "ALARM_CRITERIA",
          "label": "警告标准",
          "required": true,
          "example": "警告标准测试值"
        },
        {
          "key": "COMPARE_MODE",
          "label": "对比模式",
          "required": true,
          "example": "对比模式测试值"
        },
        {
          "key": "MONITOR_MODE",
          "label": "监控模式",
          "required": true,
          "example": "监控模式测试值"
        },
        {
          "key": "CRITERIA_UNIT",
          "label": "单位",
          "required": true,
          "example": "单位测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "END_OPERATION_NAME": "结束工序测试值",
        "STOP_CRITERIA": "中止标准测试值",
        "STOP_AND_HOLD": "是否中止锁定测试值",
        "BEGIN_OPERATION_NAME": "开始工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "COMPARE_MODE": "对比模式测试值",
        "MONITOR_MODE": "监控模式测试值",
        "CRITERIA_UNIT": "单位测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-8d1b4",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEditRow(scope.row)",
      "permission": "",
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
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "END_OPERATION_NAME",
          "label": "结束工序",
          "required": false,
          "example": "结束工序测试值"
        },
        {
          "key": "STOP_CRITERIA",
          "label": "中止标准",
          "required": true,
          "example": "中止标准测试值"
        },
        {
          "key": "STOP_AND_HOLD",
          "label": "是否中止锁定",
          "required": false,
          "example": "是否中止锁定测试值"
        },
        {
          "key": "BEGIN_OPERATION_NAME",
          "label": "开始工序",
          "required": false,
          "example": "开始工序测试值"
        },
        {
          "key": "ALARM_CRITERIA",
          "label": "警告标准",
          "required": true,
          "example": "警告标准测试值"
        },
        {
          "key": "COMPARE_MODE",
          "label": "对比模式",
          "required": true,
          "example": "对比模式测试值"
        },
        {
          "key": "MONITOR_MODE",
          "label": "监控模式",
          "required": true,
          "example": "监控模式测试值"
        },
        {
          "key": "CRITERIA_UNIT",
          "label": "单位",
          "required": true,
          "example": "单位测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "END_OPERATION_NAME": "结束工序测试值",
        "STOP_CRITERIA": "中止标准测试值",
        "STOP_AND_HOLD": "是否中止锁定测试值",
        "BEGIN_OPERATION_NAME": "开始工序测试值",
        "ALARM_CRITERIA": "警告标准测试值",
        "COMPARE_MODE": "对比模式测试值",
        "MONITOR_MODE": "监控模式测试值",
        "CRITERIA_UNIT": "单位测试值",
        "ENABLED": "是否激活测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-20c7d",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDeleteRow(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除",
        "校验删除确认提示",
        "点击取消且不删除数据"
      ],
      "assertions": [
        "出现删除确认提示",
        "取消后确认框关闭"
      ],
      "mutatesData": false
    }
  ]
});
