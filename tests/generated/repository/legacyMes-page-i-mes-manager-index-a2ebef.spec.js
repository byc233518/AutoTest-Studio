// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-manager-index-a2ebef",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/Manager/Index",
  "sourceRoute": "/iMES/Manager/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/Manager/Index.vue",
  "dataSchema": {
    "columns": [
      "USER_NAME",
      "ROLE_ID",
      "NICK_NAME",
      "ORGANIZE_ID_STRING",
      "MOBILE",
      "WORK_WECHAT_ID",
      "EMAIL",
      "ENABLED",
      "REMARK",
      "Key",
      "TRAIN_NAME",
      "MEANING"
    ],
    "required": [
      "USER_NAME",
      "ROLE_ID",
      "NICK_NAME",
      "ORGANIZE_ID_STRING",
      "MOBILE",
      "EMAIL",
      "REMARK",
      "TRAIN_NAME"
    ],
    "fields": [
      {
        "key": "USER_NAME",
        "label": "用户账号",
        "required": true
      },
      {
        "key": "ROLE_ID",
        "label": "所属角色",
        "required": true
      },
      {
        "key": "NICK_NAME",
        "label": "用户昵称",
        "required": true
      },
      {
        "key": "ORGANIZE_ID_STRING",
        "label": "请选择组织架构",
        "required": true
      },
      {
        "key": "MOBILE",
        "label": "手机号码",
        "required": true
      },
      {
        "key": "WORK_WECHAT_ID",
        "label": "企业微信ID",
        "required": false
      },
      {
        "key": "EMAIL",
        "label": "邮箱",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否可用",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": true
      },
      {
        "key": "Key",
        "label": "用户账号",
        "required": false
      },
      {
        "key": "TRAIN_NAME",
        "label": "技能名称",
        "required": true
      },
      {
        "key": "MEANING",
        "label": "技能名称",
        "required": false
      }
    ],
    "example": {
      "USER_NAME": "用户账号测试值",
      "ROLE_ID": "所属角色测试值",
      "NICK_NAME": "用户昵称测试值",
      "ORGANIZE_ID_STRING": "请选择组织架构测试值",
      "MOBILE": "手机号码测试值",
      "WORK_WECHAT_ID": "AT-001",
      "EMAIL": "邮箱测试值",
      "ENABLED": "是否可用测试值",
      "REMARK": "自动化测试备注001",
      "Key": "用户账号测试值",
      "TRAIN_NAME": "自动化样例001",
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
        "handleFilter"
      ],
      "testData": {
        "USER_NAME": "用户账号测试值",
        "ROLE_ID": "所属角色测试值",
        "NICK_NAME": "用户昵称测试值",
        "ORGANIZE_ID_STRING": "请选择组织架构测试值",
        "MOBILE": "手机号码测试值",
        "WORK_WECHAT_ID": "AT-001",
        "EMAIL": "邮箱测试值",
        "ENABLED": "是否可用测试值",
        "REMARK": "自动化测试备注001",
        "Key": "用户账号测试值",
        "TRAIN_NAME": "自动化样例001",
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
      "key": "13fd57e65b-2cd9e6ce81-f4a4f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "handleCreate",
      "permission": "ManagerAdd",
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
          "key": "USER_NAME",
          "label": "用户账号",
          "required": true,
          "example": "用户账号测试值"
        },
        {
          "key": "ROLE_ID",
          "label": "所属角色",
          "required": true,
          "example": "所属角色测试值"
        },
        {
          "key": "NICK_NAME",
          "label": "用户昵称",
          "required": true,
          "example": "用户昵称测试值"
        },
        {
          "key": "ORGANIZE_ID_STRING",
          "label": "请选择组织架构",
          "required": true,
          "example": "请选择组织架构测试值"
        },
        {
          "key": "MOBILE",
          "label": "手机号码",
          "required": true,
          "example": "手机号码测试值"
        },
        {
          "key": "WORK_WECHAT_ID",
          "label": "企业微信ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "EMAIL",
          "label": "邮箱",
          "required": true,
          "example": "邮箱测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Key",
          "label": "用户账号",
          "required": false,
          "example": "用户账号测试值"
        },
        {
          "key": "TRAIN_NAME",
          "label": "技能名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MEANING",
          "label": "技能名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "USER_NAME": "用户账号测试值",
        "ROLE_ID": "所属角色测试值",
        "NICK_NAME": "用户昵称测试值",
        "ORGANIZE_ID_STRING": "请选择组织架构测试值",
        "MOBILE": "手机号码测试值",
        "WORK_WECHAT_ID": "AT-001",
        "EMAIL": "邮箱测试值",
        "ENABLED": "是否可用测试值",
        "REMARK": "自动化测试备注001",
        "Key": "用户账号测试值",
        "TRAIN_NAME": "自动化样例001",
        "MEANING": "自动化样例001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-ad0b7",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEdit(scope)",
      "permission": "Manageredit",
      "menuTriggerLabel": "",
      "rowAction": false,
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
          "key": "USER_NAME",
          "label": "用户账号",
          "required": true,
          "example": "用户账号测试值"
        },
        {
          "key": "ROLE_ID",
          "label": "所属角色",
          "required": true,
          "example": "所属角色测试值"
        },
        {
          "key": "NICK_NAME",
          "label": "用户昵称",
          "required": true,
          "example": "用户昵称测试值"
        },
        {
          "key": "ORGANIZE_ID_STRING",
          "label": "请选择组织架构",
          "required": true,
          "example": "请选择组织架构测试值"
        },
        {
          "key": "MOBILE",
          "label": "手机号码",
          "required": true,
          "example": "手机号码测试值"
        },
        {
          "key": "WORK_WECHAT_ID",
          "label": "企业微信ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "EMAIL",
          "label": "邮箱",
          "required": true,
          "example": "邮箱测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Key",
          "label": "用户账号",
          "required": false,
          "example": "用户账号测试值"
        },
        {
          "key": "TRAIN_NAME",
          "label": "技能名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MEANING",
          "label": "技能名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "USER_NAME": "用户账号测试值",
        "ROLE_ID": "所属角色测试值",
        "NICK_NAME": "用户昵称测试值",
        "ORGANIZE_ID_STRING": "请选择组织架构测试值",
        "MOBILE": "手机号码测试值",
        "WORK_WECHAT_ID": "AT-001",
        "EMAIL": "邮箱测试值",
        "ENABLED": "是否可用测试值",
        "REMARK": "自动化测试备注001",
        "Key": "用户账号测试值",
        "TRAIN_NAME": "自动化样例001",
        "MEANING": "自动化样例001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-3ddbb",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(scope)",
      "permission": "Managerdelete",
      "menuTriggerLabel": "",
      "rowAction": false,
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
