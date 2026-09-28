// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-menu-index-c66a90",
  "name": "基座系统 - 菜单管理功能校验",
  "displayName": "菜单管理",
  "route": "/Menu/Index",
  "sourceRoute": "/Menu/Index",
  "menuCode": "menu_manager",
  "breadcrumb": "系统管理 / 系统配置 / 菜单管理",
  "sourceFile": "src/views/Menu/Index.vue",
  "dataSchema": {
    "columns": [
      "Menu_Code",
      "Menu_Name",
      "MENU_EN",
      "Parent_Id",
      "Icon_Url",
      "Link_Url",
      "Target",
      "Sort",
      "COLUMNS",
      "application",
      "RefAppVersion",
      "PARAM_INFO",
      "Is_System",
      "ENABLED",
      "PrintTemplateIds",
      "filterText",
      "APP_ID",
      "filterTextPAD",
      "filterTextPDA",
      "BillType",
      "PaperType",
      "Description"
    ],
    "required": [
      "Menu_Code",
      "Menu_Name",
      "MENU_EN",
      "Parent_Id",
      "Link_Url",
      "Target",
      "PARAM_INFO"
    ],
    "fields": [
      {
        "key": "Menu_Code",
        "label": "调用别名",
        "required": true
      },
      {
        "key": "Menu_Name",
        "label": "中文名称",
        "required": true
      },
      {
        "key": "MENU_EN",
        "label": "英文名称",
        "required": true
      },
      {
        "key": "Parent_Id",
        "label": "上级菜单",
        "required": true
      },
      {
        "key": "Icon_Url",
        "label": "菜单图标",
        "required": false
      },
      {
        "key": "Link_Url",
        "label": "链接地址",
        "required": true
      },
      {
        "key": "Target",
        "label": "窗口打开方式",
        "required": true
      },
      {
        "key": "Sort",
        "label": "排序数字",
        "required": false
      },
      {
        "key": "COLUMNS",
        "label": "列数",
        "required": false
      },
      {
        "key": "application",
        "label": "应用",
        "required": false
      },
      {
        "key": "RefAppVersion",
        "label": "指定版本",
        "required": false
      },
      {
        "key": "PARAM_INFO",
        "label": "参数配置",
        "required": true
      },
      {
        "key": "Is_System",
        "label": "系统默认",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否显示",
        "required": false
      },
      {
        "key": "PrintTemplateIds",
        "label": "打印模版",
        "required": false
      },
      {
        "key": "filterText",
        "label": "输入关键字进行过滤",
        "required": false
      },
      {
        "key": "APP_ID",
        "label": "默认主应用",
        "required": false
      },
      {
        "key": "filterTextPAD",
        "label": "输入关键字进行过滤",
        "required": false
      },
      {
        "key": "filterTextPDA",
        "label": "输入关键字进行过滤",
        "required": false
      },
      {
        "key": "BillType",
        "label": "单据类型",
        "required": false
      },
      {
        "key": "PaperType",
        "label": "纸张说明",
        "required": false
      },
      {
        "key": "Description",
        "label": "说明",
        "required": false
      }
    ],
    "example": {
      "Menu_Code": "调用别名测试值",
      "Menu_Name": "自动化样例001",
      "MENU_EN": "自动化样例001",
      "Parent_Id": "上级菜单测试值",
      "Icon_Url": "菜单图标测试值",
      "Link_Url": "链接地址测试值",
      "Target": "窗口打开方式测试值",
      "Sort": "排序数字测试值",
      "COLUMNS": "列数测试值",
      "application": "应用测试值",
      "RefAppVersion": "指定版本测试值",
      "PARAM_INFO": "参数配置测试值",
      "Is_System": "系统默认测试值",
      "ENABLED": "是否显示测试值",
      "PrintTemplateIds": "打印模版测试值",
      "filterText": "输入关键字进行过滤测试值",
      "APP_ID": "默认主应用测试值",
      "filterTextPAD": "输入关键字进行过滤测试值",
      "filterTextPDA": "输入关键字进行过滤测试值",
      "BillType": "单据类型测试值",
      "PaperType": "自动化测试备注001",
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
        "Menu_Code": "调用别名测试值",
        "Menu_Name": "自动化样例001",
        "MENU_EN": "自动化样例001",
        "Parent_Id": "上级菜单测试值",
        "Icon_Url": "菜单图标测试值",
        "Link_Url": "链接地址测试值",
        "Target": "窗口打开方式测试值",
        "Sort": "排序数字测试值",
        "COLUMNS": "列数测试值",
        "application": "应用测试值",
        "RefAppVersion": "指定版本测试值",
        "PARAM_INFO": "参数配置测试值",
        "Is_System": "系统默认测试值",
        "ENABLED": "是否显示测试值",
        "PrintTemplateIds": "打印模版测试值",
        "filterText": "输入关键字进行过滤测试值",
        "APP_ID": "默认主应用测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值",
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
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
      "key": "13fd57e65b-2cd9e6ce81-00a91",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "handlerAdd",
      "permission": "MenuAdd",
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
          "key": "Menu_Code",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "Menu_Name",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MENU_EN",
          "label": "英文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Parent_Id",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "Icon_Url",
          "label": "菜单图标",
          "required": false,
          "example": "菜单图标测试值"
        },
        {
          "key": "Link_Url",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "Target",
          "label": "窗口打开方式",
          "required": true,
          "example": "窗口打开方式测试值"
        },
        {
          "key": "Sort",
          "label": "排序数字",
          "required": false,
          "example": "排序数字测试值"
        },
        {
          "key": "COLUMNS",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "application",
          "label": "应用",
          "required": false,
          "example": "应用测试值"
        },
        {
          "key": "RefAppVersion",
          "label": "指定版本",
          "required": false,
          "example": "指定版本测试值"
        },
        {
          "key": "PARAM_INFO",
          "label": "参数配置",
          "required": true,
          "example": "参数配置测试值"
        },
        {
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "PrintTemplateIds",
          "label": "打印模版",
          "required": false,
          "example": "打印模版测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "APP_ID",
          "label": "默认主应用",
          "required": false,
          "example": "默认主应用测试值"
        },
        {
          "key": "filterTextPAD",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "filterTextPDA",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "BillType",
          "label": "单据类型",
          "required": false,
          "example": "单据类型测试值"
        },
        {
          "key": "PaperType",
          "label": "纸张说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Description",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Menu_Code": "调用别名测试值",
        "Menu_Name": "自动化样例001",
        "MENU_EN": "自动化样例001",
        "Parent_Id": "上级菜单测试值",
        "Icon_Url": "菜单图标测试值",
        "Link_Url": "链接地址测试值",
        "Target": "窗口打开方式测试值",
        "Sort": "排序数字测试值",
        "COLUMNS": "列数测试值",
        "application": "应用测试值",
        "RefAppVersion": "指定版本测试值",
        "PARAM_INFO": "参数配置测试值",
        "Is_System": "系统默认测试值",
        "ENABLED": "是否显示测试值",
        "PrintTemplateIds": "打印模版测试值",
        "filterText": "输入关键字进行过滤测试值",
        "APP_ID": "默认主应用测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值",
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-ec5d3",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleUpdate(scope.row)",
      "permission": "MenubtnEdit",
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
          "key": "Menu_Code",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "Menu_Name",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MENU_EN",
          "label": "英文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Parent_Id",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "Icon_Url",
          "label": "菜单图标",
          "required": false,
          "example": "菜单图标测试值"
        },
        {
          "key": "Link_Url",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "Target",
          "label": "窗口打开方式",
          "required": true,
          "example": "窗口打开方式测试值"
        },
        {
          "key": "Sort",
          "label": "排序数字",
          "required": false,
          "example": "排序数字测试值"
        },
        {
          "key": "COLUMNS",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "application",
          "label": "应用",
          "required": false,
          "example": "应用测试值"
        },
        {
          "key": "RefAppVersion",
          "label": "指定版本",
          "required": false,
          "example": "指定版本测试值"
        },
        {
          "key": "PARAM_INFO",
          "label": "参数配置",
          "required": true,
          "example": "参数配置测试值"
        },
        {
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "PrintTemplateIds",
          "label": "打印模版",
          "required": false,
          "example": "打印模版测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "APP_ID",
          "label": "默认主应用",
          "required": false,
          "example": "默认主应用测试值"
        },
        {
          "key": "filterTextPAD",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "filterTextPDA",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "BillType",
          "label": "单据类型",
          "required": false,
          "example": "单据类型测试值"
        },
        {
          "key": "PaperType",
          "label": "纸张说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Description",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Menu_Code": "调用别名测试值",
        "Menu_Name": "自动化样例001",
        "MENU_EN": "自动化样例001",
        "Parent_Id": "上级菜单测试值",
        "Icon_Url": "菜单图标测试值",
        "Link_Url": "链接地址测试值",
        "Target": "窗口打开方式测试值",
        "Sort": "排序数字测试值",
        "COLUMNS": "列数测试值",
        "application": "应用测试值",
        "RefAppVersion": "指定版本测试值",
        "PARAM_INFO": "参数配置测试值",
        "Is_System": "系统默认测试值",
        "ENABLED": "是否显示测试值",
        "PrintTemplateIds": "打印模版测试值",
        "filterText": "输入关键字进行过滤测试值",
        "APP_ID": "默认主应用测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值",
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
        "Description": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-416f6",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(scope.row)",
      "permission": "MenubtnDeleteSub",
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
      "key": "13fd57e65b-dfd257f78a-d5b9b",
      "type": "新增表单",
      "name": "添加按钮业务入口校验",
      "label": "添加按钮",
      "handler": "handleAddBtn",
      "permission": "btnAddsub",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加按钮",
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
          "key": "Menu_Code",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "Menu_Name",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "MENU_EN",
          "label": "英文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Parent_Id",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "Icon_Url",
          "label": "菜单图标",
          "required": false,
          "example": "菜单图标测试值"
        },
        {
          "key": "Link_Url",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "Target",
          "label": "窗口打开方式",
          "required": true,
          "example": "窗口打开方式测试值"
        },
        {
          "key": "Sort",
          "label": "排序数字",
          "required": false,
          "example": "排序数字测试值"
        },
        {
          "key": "COLUMNS",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "application",
          "label": "应用",
          "required": false,
          "example": "应用测试值"
        },
        {
          "key": "RefAppVersion",
          "label": "指定版本",
          "required": false,
          "example": "指定版本测试值"
        },
        {
          "key": "PARAM_INFO",
          "label": "参数配置",
          "required": true,
          "example": "参数配置测试值"
        },
        {
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "PrintTemplateIds",
          "label": "打印模版",
          "required": false,
          "example": "打印模版测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "APP_ID",
          "label": "默认主应用",
          "required": false,
          "example": "默认主应用测试值"
        },
        {
          "key": "filterTextPAD",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "filterTextPDA",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
        },
        {
          "key": "BillType",
          "label": "单据类型",
          "required": false,
          "example": "单据类型测试值"
        },
        {
          "key": "PaperType",
          "label": "纸张说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "Description",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Menu_Code": "调用别名测试值",
        "Menu_Name": "自动化样例001",
        "MENU_EN": "自动化样例001",
        "Parent_Id": "上级菜单测试值",
        "Icon_Url": "菜单图标测试值",
        "Link_Url": "链接地址测试值",
        "Target": "窗口打开方式测试值",
        "Sort": "排序数字测试值",
        "COLUMNS": "列数测试值",
        "application": "应用测试值",
        "RefAppVersion": "指定版本测试值",
        "PARAM_INFO": "参数配置测试值",
        "Is_System": "系统默认测试值",
        "ENABLED": "是否显示测试值",
        "PrintTemplateIds": "打印模版测试值",
        "filterText": "输入关键字进行过滤测试值",
        "APP_ID": "默认主应用测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值",
        "BillType": "单据类型测试值",
        "PaperType": "自动化测试备注001",
        "Description": "自动化测试备注001"
      }
    }
  ]
});
