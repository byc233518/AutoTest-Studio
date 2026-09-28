// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-tenant-management-ddd7f7",
  "name": "基座系统 - 租户管理功能校验",
  "displayName": "租户管理",
  "route": "/TenantManagement",
  "sourceRoute": "/TenantManagement",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 租户管理",
  "sourceFile": "src/views/Admin/System/TenantManagement/index.vue",
  "dataSchema": {
    "columns": [
      "Name",
      "Code",
      "DataType",
      "DbLink",
      "UserLimit",
      "OrgLimit",
      "ContactName",
      "ContactPhone",
      "Email",
      "Industry",
      "Address",
      "Description",
      "ThemeColor",
      "LoginPageText",
      "SystemFullName",
      "SystemAliasEng",
      "SystemAlias",
      "IndustryTplId",
      "templateDisplayName",
      "AuthorityCode",
      "ORGANIZE_NAME",
      "ORGANIZE_CODE",
      "PARENT_ORGANIZE_ID",
      "ORG_SHAPE",
      "REF_TENANT_INDUSTRY_ID",
      "SHAPE_TYPE",
      "ENABLED",
      "REMARK"
    ],
    "required": [
      "Name",
      "Code",
      "DataType",
      "DbLink",
      "ContactName",
      "ContactPhone",
      "IndustryTplId",
      "AuthorityCode",
      "ORGANIZE_NAME",
      "ORGANIZE_CODE",
      "REF_TENANT_INDUSTRY_ID"
    ],
    "fields": [
      {
        "key": "Name",
        "label": "租户名称",
        "required": true
      },
      {
        "key": "Code",
        "label": "企业代码",
        "required": true
      },
      {
        "key": "DataType",
        "label": "租户数据类型",
        "required": true
      },
      {
        "key": "DbLink",
        "label": "数据库链接",
        "required": true
      },
      {
        "key": "UserLimit",
        "label": "用户配额",
        "required": false
      },
      {
        "key": "OrgLimit",
        "label": "组织配额",
        "required": false
      },
      {
        "key": "ContactName",
        "label": "联系人",
        "required": true
      },
      {
        "key": "ContactPhone",
        "label": "联系电话",
        "required": true
      },
      {
        "key": "Email",
        "label": "联系邮箱",
        "required": false
      },
      {
        "key": "Industry",
        "label": "行业",
        "required": false
      },
      {
        "key": "Address",
        "label": "公司地址",
        "required": false
      },
      {
        "key": "Description",
        "label": "备注",
        "required": false
      },
      {
        "key": "ThemeColor",
        "label": "主题色",
        "required": false
      },
      {
        "key": "LoginPageText",
        "label": "登录页文字",
        "required": false
      },
      {
        "key": "SystemFullName",
        "label": "系统全称",
        "required": false
      },
      {
        "key": "SystemAliasEng",
        "label": "系统英文简称",
        "required": false
      },
      {
        "key": "SystemAlias",
        "label": "系统中文别名",
        "required": false
      },
      {
        "key": "IndustryTplId",
        "label": "行业模板",
        "required": true
      },
      {
        "key": "templateDisplayName",
        "label": "行业模板",
        "required": false
      },
      {
        "key": "AuthorityCode",
        "label": "授权码",
        "required": true
      },
      {
        "key": "ORGANIZE_NAME",
        "label": "组织名称",
        "required": true
      },
      {
        "key": "ORGANIZE_CODE",
        "label": "组织代码",
        "required": true
      },
      {
        "key": "PARENT_ORGANIZE_ID",
        "label": "上级组织",
        "required": false
      },
      {
        "key": "ORG_SHAPE",
        "label": "组织形态",
        "required": false
      },
      {
        "key": "REF_TENANT_INDUSTRY_ID",
        "label": "应用行业模板",
        "required": true
      },
      {
        "key": "SHAPE_TYPE",
        "label": "形态类型",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "状态",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "Name": "自动化样例001",
      "Code": "企业代码测试值",
      "DataType": "租户数据类型测试值",
      "DbLink": "数据库链接测试值",
      "UserLimit": "用户配额测试值",
      "OrgLimit": "组织配额测试值",
      "ContactName": "联系人测试值",
      "ContactPhone": "联系电话测试值",
      "Email": "联系邮箱测试值",
      "Industry": "行业测试值",
      "Address": "公司地址测试值",
      "Description": "自动化测试备注001",
      "ThemeColor": "主题色测试值",
      "LoginPageText": "登录页文字测试值",
      "SystemFullName": "系统全称测试值",
      "SystemAliasEng": "系统英文简称测试值",
      "SystemAlias": "系统中文别名测试值",
      "IndustryTplId": "行业模板测试值",
      "templateDisplayName": "行业模板测试值",
      "AuthorityCode": "授权码测试值",
      "ORGANIZE_NAME": "自动化样例001",
      "ORGANIZE_CODE": "组织代码测试值",
      "PARENT_ORGANIZE_ID": "上级组织测试值",
      "ORG_SHAPE": "组织形态测试值",
      "REF_TENANT_INDUSTRY_ID": "应用行业模板测试值",
      "SHAPE_TYPE": "形态类型测试值",
      "ENABLED": "Y",
      "REMARK": "自动化测试备注001"
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
        "Name": "自动化样例001",
        "Code": "企业代码测试值",
        "DataType": "租户数据类型测试值",
        "DbLink": "数据库链接测试值",
        "UserLimit": "用户配额测试值",
        "OrgLimit": "组织配额测试值",
        "ContactName": "联系人测试值",
        "ContactPhone": "联系电话测试值",
        "Email": "联系邮箱测试值",
        "Industry": "行业测试值",
        "Address": "公司地址测试值",
        "Description": "自动化测试备注001",
        "ThemeColor": "主题色测试值",
        "LoginPageText": "登录页文字测试值",
        "SystemFullName": "系统全称测试值",
        "SystemAliasEng": "系统英文简称测试值",
        "SystemAlias": "系统中文别名测试值",
        "IndustryTplId": "行业模板测试值",
        "templateDisplayName": "行业模板测试值",
        "AuthorityCode": "授权码测试值",
        "ORGANIZE_NAME": "自动化样例001",
        "ORGANIZE_CODE": "组织代码测试值",
        "PARENT_ORGANIZE_ID": "上级组织测试值",
        "ORG_SHAPE": "组织形态测试值",
        "REF_TENANT_INDUSTRY_ID": "应用行业模板测试值",
        "SHAPE_TYPE": "形态类型测试值",
        "ENABLED": "Y",
        "REMARK": "自动化测试备注001"
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
      "key": "13fd57e65b-eed541bc43-be825",
      "type": "新增表单",
      "name": "新增租户业务入口校验",
      "label": "新增租户",
      "handler": "handleAdd",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增租户",
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
          "label": "租户名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Code",
          "label": "企业代码",
          "required": true,
          "example": "企业代码测试值"
        },
        {
          "key": "DataType",
          "label": "租户数据类型",
          "required": true,
          "example": "租户数据类型测试值"
        },
        {
          "key": "DbLink",
          "label": "数据库链接",
          "required": true,
          "example": "数据库链接测试值"
        },
        {
          "key": "UserLimit",
          "label": "用户配额",
          "required": false,
          "example": "用户配额测试值"
        },
        {
          "key": "OrgLimit",
          "label": "组织配额",
          "required": false,
          "example": "组织配额测试值"
        },
        {
          "key": "ContactName",
          "label": "联系人",
          "required": true,
          "example": "联系人测试值"
        },
        {
          "key": "ContactPhone",
          "label": "联系电话",
          "required": true,
          "example": "联系电话测试值"
        },
        {
          "key": "Email",
          "label": "联系邮箱",
          "required": false,
          "example": "联系邮箱测试值"
        },
        {
          "key": "Industry",
          "label": "行业",
          "required": false,
          "example": "行业测试值"
        },
        {
          "key": "Address",
          "label": "公司地址",
          "required": false,
          "example": "公司地址测试值"
        },
        {
          "key": "Description",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ThemeColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "LoginPageText",
          "label": "登录页文字",
          "required": false,
          "example": "登录页文字测试值"
        },
        {
          "key": "SystemFullName",
          "label": "系统全称",
          "required": false,
          "example": "系统全称测试值"
        },
        {
          "key": "SystemAliasEng",
          "label": "系统英文简称",
          "required": false,
          "example": "系统英文简称测试值"
        },
        {
          "key": "SystemAlias",
          "label": "系统中文别名",
          "required": false,
          "example": "系统中文别名测试值"
        },
        {
          "key": "IndustryTplId",
          "label": "行业模板",
          "required": true,
          "example": "行业模板测试值"
        },
        {
          "key": "templateDisplayName",
          "label": "行业模板",
          "required": false,
          "example": "行业模板测试值"
        },
        {
          "key": "AuthorityCode",
          "label": "授权码",
          "required": true,
          "example": "授权码测试值"
        },
        {
          "key": "ORGANIZE_NAME",
          "label": "组织名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ORGANIZE_CODE",
          "label": "组织代码",
          "required": true,
          "example": "组织代码测试值"
        },
        {
          "key": "PARENT_ORGANIZE_ID",
          "label": "上级组织",
          "required": false,
          "example": "上级组织测试值"
        },
        {
          "key": "ORG_SHAPE",
          "label": "组织形态",
          "required": false,
          "example": "组织形态测试值"
        },
        {
          "key": "REF_TENANT_INDUSTRY_ID",
          "label": "应用行业模板",
          "required": true,
          "example": "应用行业模板测试值"
        },
        {
          "key": "SHAPE_TYPE",
          "label": "形态类型",
          "required": false,
          "example": "形态类型测试值"
        },
        {
          "key": "ENABLED",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "Code": "企业代码测试值",
        "DataType": "租户数据类型测试值",
        "DbLink": "数据库链接测试值",
        "UserLimit": "用户配额测试值",
        "OrgLimit": "组织配额测试值",
        "ContactName": "联系人测试值",
        "ContactPhone": "联系电话测试值",
        "Email": "联系邮箱测试值",
        "Industry": "行业测试值",
        "Address": "公司地址测试值",
        "Description": "自动化测试备注001",
        "ThemeColor": "主题色测试值",
        "LoginPageText": "登录页文字测试值",
        "SystemFullName": "系统全称测试值",
        "SystemAliasEng": "系统英文简称测试值",
        "SystemAlias": "系统中文别名测试值",
        "IndustryTplId": "行业模板测试值",
        "templateDisplayName": "行业模板测试值",
        "AuthorityCode": "授权码测试值",
        "ORGANIZE_NAME": "自动化样例001",
        "ORGANIZE_CODE": "组织代码测试值",
        "PARENT_ORGANIZE_ID": "上级组织测试值",
        "ORG_SHAPE": "组织形态测试值",
        "REF_TENANT_INDUSTRY_ID": "应用行业模板测试值",
        "SHAPE_TYPE": "形态类型测试值",
        "ENABLED": "Y",
        "REMARK": "自动化测试备注001"
      }
    },
    {
      "key": "faea8c1db9-f7acefd2d4-0fed0",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "handleView(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击查看",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-e718a",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEdit(scope.row)",
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
          "key": "Name",
          "label": "租户名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Code",
          "label": "企业代码",
          "required": true,
          "example": "企业代码测试值"
        },
        {
          "key": "DataType",
          "label": "租户数据类型",
          "required": true,
          "example": "租户数据类型测试值"
        },
        {
          "key": "DbLink",
          "label": "数据库链接",
          "required": true,
          "example": "数据库链接测试值"
        },
        {
          "key": "UserLimit",
          "label": "用户配额",
          "required": false,
          "example": "用户配额测试值"
        },
        {
          "key": "OrgLimit",
          "label": "组织配额",
          "required": false,
          "example": "组织配额测试值"
        },
        {
          "key": "ContactName",
          "label": "联系人",
          "required": true,
          "example": "联系人测试值"
        },
        {
          "key": "ContactPhone",
          "label": "联系电话",
          "required": true,
          "example": "联系电话测试值"
        },
        {
          "key": "Email",
          "label": "联系邮箱",
          "required": false,
          "example": "联系邮箱测试值"
        },
        {
          "key": "Industry",
          "label": "行业",
          "required": false,
          "example": "行业测试值"
        },
        {
          "key": "Address",
          "label": "公司地址",
          "required": false,
          "example": "公司地址测试值"
        },
        {
          "key": "Description",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ThemeColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "LoginPageText",
          "label": "登录页文字",
          "required": false,
          "example": "登录页文字测试值"
        },
        {
          "key": "SystemFullName",
          "label": "系统全称",
          "required": false,
          "example": "系统全称测试值"
        },
        {
          "key": "SystemAliasEng",
          "label": "系统英文简称",
          "required": false,
          "example": "系统英文简称测试值"
        },
        {
          "key": "SystemAlias",
          "label": "系统中文别名",
          "required": false,
          "example": "系统中文别名测试值"
        },
        {
          "key": "IndustryTplId",
          "label": "行业模板",
          "required": true,
          "example": "行业模板测试值"
        },
        {
          "key": "templateDisplayName",
          "label": "行业模板",
          "required": false,
          "example": "行业模板测试值"
        },
        {
          "key": "AuthorityCode",
          "label": "授权码",
          "required": true,
          "example": "授权码测试值"
        },
        {
          "key": "ORGANIZE_NAME",
          "label": "组织名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ORGANIZE_CODE",
          "label": "组织代码",
          "required": true,
          "example": "组织代码测试值"
        },
        {
          "key": "PARENT_ORGANIZE_ID",
          "label": "上级组织",
          "required": false,
          "example": "上级组织测试值"
        },
        {
          "key": "ORG_SHAPE",
          "label": "组织形态",
          "required": false,
          "example": "组织形态测试值"
        },
        {
          "key": "REF_TENANT_INDUSTRY_ID",
          "label": "应用行业模板",
          "required": true,
          "example": "应用行业模板测试值"
        },
        {
          "key": "SHAPE_TYPE",
          "label": "形态类型",
          "required": false,
          "example": "形态类型测试值"
        },
        {
          "key": "ENABLED",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "Name": "自动化样例001",
        "Code": "企业代码测试值",
        "DataType": "租户数据类型测试值",
        "DbLink": "数据库链接测试值",
        "UserLimit": "用户配额测试值",
        "OrgLimit": "组织配额测试值",
        "ContactName": "联系人测试值",
        "ContactPhone": "联系电话测试值",
        "Email": "联系邮箱测试值",
        "Industry": "行业测试值",
        "Address": "公司地址测试值",
        "Description": "自动化测试备注001",
        "ThemeColor": "主题色测试值",
        "LoginPageText": "登录页文字测试值",
        "SystemFullName": "系统全称测试值",
        "SystemAliasEng": "系统英文简称测试值",
        "SystemAlias": "系统中文别名测试值",
        "IndustryTplId": "行业模板测试值",
        "templateDisplayName": "行业模板测试值",
        "AuthorityCode": "授权码测试值",
        "ORGANIZE_NAME": "自动化样例001",
        "ORGANIZE_CODE": "组织代码测试值",
        "PARENT_ORGANIZE_ID": "上级组织测试值",
        "ORG_SHAPE": "组织形态测试值",
        "REF_TENANT_INDUSTRY_ID": "应用行业模板测试值",
        "SHAPE_TYPE": "形态类型测试值",
        "ENABLED": "Y",
        "REMARK": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-416f6",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(scope.row)",
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
