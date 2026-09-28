// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-menu-index-aac1d6",
  "name": "旧版制造执行 - PC菜单（未配置菜单）功能校验",
  "displayName": "PC菜单（未配置菜单）",
  "route": "/iMES/Menu/Index",
  "sourceRoute": "/iMES/Menu/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / PC菜单（未配置菜单）",
  "sourceFile": "src/views/iMES/Menu/Index.vue",
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
      "Is_System",
      "Spread",
      "ENABLED",
      "MENU_CODE",
      "MENU_NAME",
      "P_ID",
      "LINK_URL",
      "SORT",
      "filterText",
      "filterTextPAD",
      "filterTextPDA"
    ],
    "required": [
      "Menu_Code",
      "Menu_Name",
      "MENU_EN",
      "Parent_Id",
      "Icon_Url",
      "Link_Url",
      "Target",
      "MENU_CODE",
      "MENU_NAME",
      "P_ID",
      "LINK_URL"
    ],
    "fields": [
      {
        "key": "Menu_Code",
        "label": "调用别名",
        "required": true
      },
      {
        "key": "Menu_Name",
        "label": "显示名称",
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
        "required": true
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
        "key": "Is_System",
        "label": "系统默认",
        "required": false
      },
      {
        "key": "Spread",
        "label": "是否展开",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否显示",
        "required": false
      },
      {
        "key": "MENU_CODE",
        "label": "调用别名",
        "required": true
      },
      {
        "key": "MENU_NAME",
        "label": "中文名称",
        "required": true
      },
      {
        "key": "P_ID",
        "label": "上级菜单",
        "required": true
      },
      {
        "key": "LINK_URL",
        "label": "链接地址",
        "required": true
      },
      {
        "key": "SORT",
        "label": "排序",
        "required": false
      },
      {
        "key": "filterText",
        "label": "输入关键字进行过滤",
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
      "Is_System": "系统默认测试值",
      "Spread": "是否展开测试值",
      "ENABLED": "是否显示测试值",
      "MENU_CODE": "调用别名测试值",
      "MENU_NAME": "自动化样例001",
      "P_ID": "上级菜单测试值",
      "LINK_URL": "链接地址测试值",
      "SORT": "排序测试值",
      "filterText": "输入关键字进行过滤测试值",
      "filterTextPAD": "输入关键字进行过滤测试值",
      "filterTextPDA": "输入关键字进行过滤测试值"
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
          "label": "显示名称",
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
          "required": true,
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
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "Spread",
          "label": "是否展开",
          "required": false,
          "example": "是否展开测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "MENU_CODE",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "MENU_NAME",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "P_ID",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "LINK_URL",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "SORT",
          "label": "排序",
          "required": false,
          "example": "排序测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
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
        "Is_System": "系统默认测试值",
        "Spread": "是否展开测试值",
        "ENABLED": "是否显示测试值",
        "MENU_CODE": "调用别名测试值",
        "MENU_NAME": "自动化样例001",
        "P_ID": "上级菜单测试值",
        "LINK_URL": "链接地址测试值",
        "SORT": "排序测试值",
        "filterText": "输入关键字进行过滤测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-6f89b",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleUpdatePAD(scope.row)",
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
          "key": "Menu_Code",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "Menu_Name",
          "label": "显示名称",
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
          "required": true,
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
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "Spread",
          "label": "是否展开",
          "required": false,
          "example": "是否展开测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "MENU_CODE",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "MENU_NAME",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "P_ID",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "LINK_URL",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "SORT",
          "label": "排序",
          "required": false,
          "example": "排序测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
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
        "Is_System": "系统默认测试值",
        "Spread": "是否展开测试值",
        "ENABLED": "是否显示测试值",
        "MENU_CODE": "调用别名测试值",
        "MENU_NAME": "自动化样例001",
        "P_ID": "上级菜单测试值",
        "LINK_URL": "链接地址测试值",
        "SORT": "排序测试值",
        "filterText": "输入关键字进行过滤测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-778c8",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDeletePAD(scope.row)",
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
      "key": "13fd57e65b-dfd257f78a-d5b9b",
      "type": "新增表单",
      "name": "添加按钮业务入口校验",
      "label": "添加按钮",
      "handler": "handleAddBtn",
      "permission": "",
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
          "label": "显示名称",
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
          "required": true,
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
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "Spread",
          "label": "是否展开",
          "required": false,
          "example": "是否展开测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "MENU_CODE",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "MENU_NAME",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "P_ID",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "LINK_URL",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "SORT",
          "label": "排序",
          "required": false,
          "example": "排序测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
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
        "Is_System": "系统默认测试值",
        "Spread": "是否展开测试值",
        "ENABLED": "是否显示测试值",
        "MENU_CODE": "调用别名测试值",
        "MENU_NAME": "自动化样例001",
        "P_ID": "上级菜单测试值",
        "LINK_URL": "链接地址测试值",
        "SORT": "排序测试值",
        "filterText": "输入关键字进行过滤测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "4aa22a22ac-aa11ec1a30-ec5d3",
      "type": "编辑表单",
      "name": "编辑按钮业务入口校验",
      "label": "编辑按钮",
      "handler": "handleUpdate(scope.row)",
      "permission": "MenubtnEdit",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑按钮",
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
          "label": "显示名称",
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
          "required": true,
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
          "key": "Is_System",
          "label": "系统默认",
          "required": false,
          "example": "系统默认测试值"
        },
        {
          "key": "Spread",
          "label": "是否展开",
          "required": false,
          "example": "是否展开测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否显示",
          "required": false,
          "example": "是否显示测试值"
        },
        {
          "key": "MENU_CODE",
          "label": "调用别名",
          "required": true,
          "example": "调用别名测试值"
        },
        {
          "key": "MENU_NAME",
          "label": "中文名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "P_ID",
          "label": "上级菜单",
          "required": true,
          "example": "上级菜单测试值"
        },
        {
          "key": "LINK_URL",
          "label": "链接地址",
          "required": true,
          "example": "链接地址测试值"
        },
        {
          "key": "SORT",
          "label": "排序",
          "required": false,
          "example": "排序测试值"
        },
        {
          "key": "filterText",
          "label": "输入关键字进行过滤",
          "required": false,
          "example": "输入关键字进行过滤测试值"
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
        "Is_System": "系统默认测试值",
        "Spread": "是否展开测试值",
        "ENABLED": "是否显示测试值",
        "MENU_CODE": "调用别名测试值",
        "MENU_NAME": "自动化样例001",
        "P_ID": "上级菜单测试值",
        "LINK_URL": "链接地址测试值",
        "SORT": "排序测试值",
        "filterText": "输入关键字进行过滤测试值",
        "filterTextPAD": "输入关键字进行过滤测试值",
        "filterTextPDA": "输入关键字进行过滤测试值"
      }
    },
    {
      "key": "726b6ec55f-3e0e645047-416f6",
      "type": "删除确认",
      "name": "删除按钮确认框与取消操作",
      "label": "删除按钮",
      "handler": "handleDelete(scope.row)",
      "permission": "MenubtnDeleteSub",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开确认框后取消",
      "steps": [
        "点击删除按钮",
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
