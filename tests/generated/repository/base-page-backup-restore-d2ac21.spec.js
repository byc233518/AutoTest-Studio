// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-backup-restore-d2ac21",
  "name": "基座系统 - 备份恢复功能校验",
  "displayName": "备份恢复",
  "route": "/BackupRestore",
  "sourceRoute": "/BackupRestore",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 备份恢复",
  "sourceFile": "src/views/Admin/Operations/BackupRestore/index.vue",
  "dataSchema": {
    "columns": [
      "name",
      "type",
      "scope",
      "description",
      "backupId",
      "options",
      "enabled",
      "frequency",
      "time",
      "retentionDays",
      "path"
    ],
    "required": [],
    "fields": [
      {
        "key": "name",
        "label": "备份名称",
        "required": false
      },
      {
        "key": "type",
        "label": "备份类型",
        "required": false
      },
      {
        "key": "scope",
        "label": "备份范围",
        "required": false
      },
      {
        "key": "description",
        "label": "备份描述",
        "required": false
      },
      {
        "key": "backupId",
        "label": "选择备份",
        "required": false
      },
      {
        "key": "options",
        "label": "恢复选项",
        "required": false
      },
      {
        "key": "enabled",
        "label": "启用自动备份",
        "required": false
      },
      {
        "key": "frequency",
        "label": "备份频率",
        "required": false
      },
      {
        "key": "time",
        "label": "备份时间",
        "required": false
      },
      {
        "key": "retentionDays",
        "label": "保留天数",
        "required": false
      },
      {
        "key": "path",
        "label": "备份路径",
        "required": false
      }
    ],
    "example": {
      "name": "自动化样例001",
      "type": "备份类型测试值",
      "scope": "备份范围测试值",
      "description": "自动化测试备注001",
      "backupId": "选择备份测试值",
      "options": "恢复选项测试值",
      "enabled": "启用自动备份测试值",
      "frequency": "备份频率测试值",
      "time": "2026-08-01",
      "retentionDays": "保留天数测试值",
      "path": "备份路径测试值"
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
      "key": "13fd57e65b-f4587bf8b2-b0984",
      "type": "新增表单",
      "name": "创建备份业务入口校验",
      "label": "创建备份",
      "handler": "createBackup",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击创建备份",
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
          "key": "name",
          "label": "备份名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "type",
          "label": "备份类型",
          "required": false,
          "example": "备份类型测试值"
        },
        {
          "key": "scope",
          "label": "备份范围",
          "required": false,
          "example": "备份范围测试值"
        },
        {
          "key": "description",
          "label": "备份描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "backupId",
          "label": "选择备份",
          "required": false,
          "example": "选择备份测试值"
        },
        {
          "key": "options",
          "label": "恢复选项",
          "required": false,
          "example": "恢复选项测试值"
        },
        {
          "key": "enabled",
          "label": "启用自动备份",
          "required": false,
          "example": "启用自动备份测试值"
        },
        {
          "key": "frequency",
          "label": "备份频率",
          "required": false,
          "example": "备份频率测试值"
        },
        {
          "key": "time",
          "label": "备份时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "retentionDays",
          "label": "保留天数",
          "required": false,
          "example": "保留天数测试值"
        },
        {
          "key": "path",
          "label": "备份路径",
          "required": false,
          "example": "备份路径测试值"
        }
      ],
      "testData": {
        "name": "自动化样例001",
        "type": "备份类型测试值",
        "scope": "备份范围测试值",
        "description": "自动化测试备注001",
        "backupId": "选择备份测试值",
        "options": "恢复选项测试值",
        "enabled": "启用自动备份测试值",
        "frequency": "备份频率测试值",
        "time": "2026-08-01",
        "retentionDays": "保留天数测试值",
        "path": "备份路径测试值"
      }
    },
    {
      "key": "ef879b4ced-2b9d013177-2341d",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "downloadBackup(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-b14d4",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteBackup(scope.row)",
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
    },
    {
      "key": "7e002f9936-bb79ec7c15-f611f",
      "type": "业务动作",
      "name": "保存设置业务入口校验",
      "label": "保存设置",
      "handler": "saveScheduleSettings",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保存设置",
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
