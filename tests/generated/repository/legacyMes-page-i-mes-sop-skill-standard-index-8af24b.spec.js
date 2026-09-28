// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sop-skill-standard-index-8af24b",
  "name": "旧版制造执行 - 清空（未配置菜单）功能校验",
  "displayName": "清空（未配置菜单）",
  "route": "/iMES/SopSkillStandard/Index",
  "sourceRoute": "/iMES/SopSkillStandard/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清空（未配置菜单）",
  "sourceFile": "src/views/iMES/SopSkillStandard/Index.vue",
  "dataSchema": {
    "columns": [
      "TRAIN_NAME",
      "STANDARD",
      "NAME",
      "DESC",
      "MEANING"
    ],
    "required": [
      "STANDARD",
      "MEANING"
    ],
    "fields": [
      {
        "key": "TRAIN_NAME",
        "label": "技能名称",
        "required": false
      },
      {
        "key": "STANDARD",
        "label": "评判标准",
        "required": true
      },
      {
        "key": "NAME",
        "label": "工序名称",
        "required": false
      },
      {
        "key": "DESC",
        "label": "工序描述",
        "required": false
      },
      {
        "key": "MEANING",
        "label": "技能名称",
        "required": true
      }
    ],
    "example": {
      "TRAIN_NAME": "自动化样例001",
      "STANDARD": "评判标准测试值",
      "NAME": "自动化样例001",
      "DESC": "自动化测试备注001",
      "MEANING": "自动化样例001"
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
        "TRAIN_NAME": "自动化样例001",
        "STANDARD": "评判标准测试值",
        "NAME": "自动化样例001",
        "DESC": "自动化测试备注001",
        "MEANING": "自动化样例001"
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
      "key": "13fd57e65b-db34cf508e-5630f",
      "type": "新增表单",
      "name": "添加技能业务入口校验",
      "label": "添加技能",
      "handler": "edit_but(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加技能",
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
          "key": "TRAIN_NAME",
          "label": "技能名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "STANDARD",
          "label": "评判标准",
          "required": true,
          "example": "评判标准测试值"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESC",
          "label": "工序描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MEANING",
          "label": "技能名称",
          "required": true,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "TRAIN_NAME": "自动化样例001",
        "STANDARD": "评判标准测试值",
        "NAME": "自动化样例001",
        "DESC": "自动化测试备注001",
        "MEANING": "自动化样例001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-67cff",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "skillDetailsEdit(scope.row)",
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
          "key": "TRAIN_NAME",
          "label": "技能名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "STANDARD",
          "label": "评判标准",
          "required": true,
          "example": "评判标准测试值"
        },
        {
          "key": "NAME",
          "label": "工序名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESC",
          "label": "工序描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MEANING",
          "label": "技能名称",
          "required": true,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "TRAIN_NAME": "自动化样例001",
        "STANDARD": "评判标准测试值",
        "NAME": "自动化样例001",
        "DESC": "自动化测试备注001",
        "MEANING": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-50dd4",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "skillDetailsDelete(scope.row)",
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
