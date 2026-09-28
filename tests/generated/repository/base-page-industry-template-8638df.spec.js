// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-industry-template-8638df",
  "name": "基座系统 - 行业模板功能校验",
  "displayName": "行业模板",
  "route": "/IndustryTemplate",
  "sourceRoute": "/IndustryTemplate",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 行业模板",
  "sourceFile": "src/views/Admin/System/IndustryTemplate/index.vue",
  "dataSchema": {
    "columns": [
      "Name",
      "IndustryType",
      "Description",
      "ModuleIds",
      "MenuIds",
      "industryType",
      "status",
      "name",
      "PC",
      "PAD",
      "PDA"
    ],
    "required": [
      "Name",
      "IndustryType"
    ],
    "fields": [
      {
        "key": "Name",
        "label": "模板名称",
        "required": true
      },
      {
        "key": "IndustryType",
        "label": "行业类型",
        "required": true
      },
      {
        "key": "Description",
        "label": "模板描述",
        "required": false
      },
      {
        "key": "ModuleIds",
        "label": "关联模块配置每个应用下最多选择1个模块",
        "required": false
      },
      {
        "key": "MenuIds",
        "label": "关联功能配置",
        "required": false
      },
      {
        "key": "industryType",
        "label": "全部行业",
        "required": false
      },
      {
        "key": "status",
        "label": "全部状态",
        "required": false
      },
      {
        "key": "name",
        "label": "模板名称",
        "required": false
      },
      {
        "key": "PC",
        "label": "搜索PC端功能",
        "required": false
      },
      {
        "key": "PAD",
        "label": "搜索平板端功能",
        "required": false
      },
      {
        "key": "PDA",
        "label": "搜索移动端功能",
        "required": false
      }
    ],
    "example": {
      "Name": "自动化样例001",
      "IndustryType": "行业类型测试值",
      "Description": "自动化测试备注001",
      "ModuleIds": "关联模块配置每个应用下最多选择1个模块测试值",
      "MenuIds": "关联功能配置测试值",
      "industryType": "全部行业测试值",
      "status": "Y",
      "name": "自动化样例001",
      "PC": "搜索PC端功能测试值",
      "PAD": "搜索平板端功能测试值",
      "PDA": "搜索移动端功能测试值"
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
        "handleSearch"
      ],
      "testData": {
        "Name": "自动化样例001",
        "IndustryType": "行业类型测试值",
        "Description": "自动化测试备注001",
        "ModuleIds": "关联模块配置每个应用下最多选择1个模块测试值",
        "MenuIds": "关联功能配置测试值",
        "industryType": "全部行业测试值",
        "status": "Y",
        "name": "自动化样例001",
        "PC": "搜索PC端功能测试值",
        "PAD": "搜索平板端功能测试值",
        "PDA": "搜索移动端功能测试值"
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
      "key": "13fd57e65b-24a65b41c1-be825",
      "type": "新增表单",
      "name": "新增模板业务入口校验",
      "label": "新增模板",
      "handler": "handleAdd",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增模板",
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
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "IndustryType",
          "label": "行业类型",
          "required": true,
          "example": "行业类型测试值"
        },
        {
          "key": "Description",
          "label": "模板描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ModuleIds",
          "label": "关联模块配置每个应用下最多选择1个模块",
          "required": false,
          "example": "关联模块配置每个应用下最多选择1个模块测试值"
        },
        {
          "key": "MenuIds",
          "label": "关联功能配置",
          "required": false,
          "example": "关联功能配置测试值"
        },
        {
          "key": "industryType",
          "label": "全部行业",
          "required": false,
          "example": "全部行业测试值"
        },
        {
          "key": "status",
          "label": "全部状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "name",
          "label": "模板名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PC",
          "label": "搜索PC端功能",
          "required": false,
          "example": "搜索PC端功能测试值"
        },
        {
          "key": "PAD",
          "label": "搜索平板端功能",
          "required": false,
          "example": "搜索平板端功能测试值"
        },
        {
          "key": "PDA",
          "label": "搜索移动端功能",
          "required": false,
          "example": "搜索移动端功能测试值"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "IndustryType": "行业类型测试值",
        "Description": "自动化测试备注001",
        "ModuleIds": "关联模块配置每个应用下最多选择1个模块测试值",
        "MenuIds": "关联功能配置测试值",
        "industryType": "全部行业测试值",
        "status": "Y",
        "name": "自动化样例001",
        "PC": "搜索PC端功能测试值",
        "PAD": "搜索平板端功能测试值",
        "PDA": "搜索移动端功能测试值"
      }
    },
    {
      "key": "5f1787916c-dc5fb7a696-dc5fb",
      "type": "导入入口",
      "name": "配置导入业务入口校验",
      "label": "配置导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导入",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-ba43305377-e9df5",
      "type": "导出入口",
      "name": "配置导出业务入口校验",
      "label": "配置导出",
      "handler": "exportData",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-9fda2",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "$emit('edit', template)",
      "permission": "",
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
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "IndustryType",
          "label": "行业类型",
          "required": true,
          "example": "行业类型测试值"
        },
        {
          "key": "Description",
          "label": "模板描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ModuleIds",
          "label": "关联模块配置每个应用下最多选择1个模块",
          "required": false,
          "example": "关联模块配置每个应用下最多选择1个模块测试值"
        },
        {
          "key": "MenuIds",
          "label": "关联功能配置",
          "required": false,
          "example": "关联功能配置测试值"
        },
        {
          "key": "industryType",
          "label": "全部行业",
          "required": false,
          "example": "全部行业测试值"
        },
        {
          "key": "status",
          "label": "全部状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "name",
          "label": "模板名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "PC",
          "label": "搜索PC端功能",
          "required": false,
          "example": "搜索PC端功能测试值"
        },
        {
          "key": "PAD",
          "label": "搜索平板端功能",
          "required": false,
          "example": "搜索平板端功能测试值"
        },
        {
          "key": "PDA",
          "label": "搜索移动端功能",
          "required": false,
          "example": "搜索移动端功能测试值"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "IndustryType": "行业类型测试值",
        "Description": "自动化测试备注001",
        "ModuleIds": "关联模块配置每个应用下最多选择1个模块测试值",
        "MenuIds": "关联功能配置测试值",
        "industryType": "全部行业测试值",
        "status": "Y",
        "name": "自动化样例001",
        "PC": "搜索PC端功能测试值",
        "PAD": "搜索平板端功能测试值",
        "PDA": "搜索移动端功能测试值"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-1f158",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "$emit('audit', template)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位审核",
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
      "key": "726b6ec55f-3755f56f2f-01de1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "$emit('delete', template)",
      "permission": "",
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
