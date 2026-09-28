// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-msd-level-rule-index-cd3f30",
  "name": "仓储管理 - 等级标准功能校验",
  "displayName": "等级标准",
  "route": "/ImsMsdLevelRule/Index",
  "sourceRoute": "/ImsMsdLevelRule/Index",
  "menuCode": "ImsMsdLevelRule",
  "breadcrumb": "仓库管理 / 湿敏管理 / 等级标准",
  "sourceFile": "src/views/ImsMsdLevelRule/Index.vue",
  "dataSchema": {
    "columns": [
      "LevelCode",
      "FloorLife",
      "MinThickness",
      "MaxThickness",
      "Temperature",
      "Humidity",
      "Description"
    ],
    "required": [
      "LevelCode",
      "FloorLife",
      "MinThickness",
      "MaxThickness",
      "Temperature",
      "Humidity"
    ],
    "fields": [
      {
        "key": "LevelCode",
        "label": "潮敏等级",
        "required": true
      },
      {
        "key": "FloorLife",
        "label": "使用周期(H)",
        "required": true
      },
      {
        "key": "MinThickness",
        "label": "最小厚度(mm)",
        "required": true
      },
      {
        "key": "MaxThickness",
        "label": "最大厚度(mm)",
        "required": true
      },
      {
        "key": "Temperature",
        "label": "暴露温度(℃)",
        "required": true
      },
      {
        "key": "Humidity",
        "label": "暴露湿度(%rh)",
        "required": true
      },
      {
        "key": "Description",
        "label": "备注说明",
        "required": false
      }
    ],
    "example": {
      "LevelCode": "潮敏等级测试值",
      "FloorLife": "使用周期(H)测试值",
      "MinThickness": "最小厚度(mm)测试值",
      "MaxThickness": "最大厚度(mm)测试值",
      "Temperature": "暴露温度(℃)测试值",
      "Humidity": "暴露湿度(%rh)测试值",
      "Description": "自动化测试备注001"
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
        "LevelCode": "潮敏等级测试值",
        "FloorLife": "使用周期(H)测试值",
        "MinThickness": "最小厚度(mm)测试值",
        "MaxThickness": "最大厚度(mm)测试值",
        "Temperature": "暴露温度(℃)测试值",
        "Humidity": "暴露湿度(%rh)测试值",
        "Description": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-58d1b",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add",
      "permission": "ImsMsdLevelRuleAdd",
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
          "key": "LevelCode",
          "label": "潮敏等级",
          "required": true,
          "example": "潮敏等级测试值"
        },
        {
          "key": "FloorLife",
          "label": "使用周期(H)",
          "required": true,
          "example": "使用周期(H)测试值"
        },
        {
          "key": "MinThickness",
          "label": "最小厚度(mm)",
          "required": true,
          "example": "最小厚度(mm)测试值"
        },
        {
          "key": "MaxThickness",
          "label": "最大厚度(mm)",
          "required": true,
          "example": "最大厚度(mm)测试值"
        },
        {
          "key": "Temperature",
          "label": "暴露温度(℃)",
          "required": true,
          "example": "暴露温度(℃)测试值"
        },
        {
          "key": "Humidity",
          "label": "暴露湿度(%rh)",
          "required": true,
          "example": "暴露湿度(%rh)测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "LevelCode": "潮敏等级测试值",
        "FloorLife": "使用周期(H)测试值",
        "MinThickness": "最小厚度(mm)测试值",
        "MaxThickness": "最大厚度(mm)测试值",
        "Temperature": "暴露温度(℃)测试值",
        "Humidity": "暴露湿度(%rh)测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-4336f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit(scope.row)",
      "permission": "ImsMsdLevelRuleEdit",
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
          "key": "LevelCode",
          "label": "潮敏等级",
          "required": true,
          "example": "潮敏等级测试值"
        },
        {
          "key": "FloorLife",
          "label": "使用周期(H)",
          "required": true,
          "example": "使用周期(H)测试值"
        },
        {
          "key": "MinThickness",
          "label": "最小厚度(mm)",
          "required": true,
          "example": "最小厚度(mm)测试值"
        },
        {
          "key": "MaxThickness",
          "label": "最大厚度(mm)",
          "required": true,
          "example": "最大厚度(mm)测试值"
        },
        {
          "key": "Temperature",
          "label": "暴露温度(℃)",
          "required": true,
          "example": "暴露温度(℃)测试值"
        },
        {
          "key": "Humidity",
          "label": "暴露湿度(%rh)",
          "required": true,
          "example": "暴露湿度(%rh)测试值"
        },
        {
          "key": "Description",
          "label": "备注说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "LevelCode": "潮敏等级测试值",
        "FloorLife": "使用周期(H)测试值",
        "MinThickness": "最小厚度(mm)测试值",
        "MaxThickness": "最大厚度(mm)测试值",
        "Temperature": "暴露温度(℃)测试值",
        "Humidity": "暴露湿度(%rh)测试值",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-73ed1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove(scope.row)",
      "permission": "ImsMsdLevelRuleRemove",
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
