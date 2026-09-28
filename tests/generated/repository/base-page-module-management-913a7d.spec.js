// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-module-management-913a7d",
  "name": "基座系统 - 模块管理功能校验",
  "displayName": "模块管理",
  "route": "/ModuleManagement",
  "sourceRoute": "/ModuleManagement",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 模块管理",
  "sourceFile": "src/views/Admin/System/ModuleManagement/index.vue",
  "dataSchema": {
    "columns": [
      "appModule",
      "version",
      "status",
      "Code",
      "Name",
      "Description",
      "Enabled",
      "Remark",
      "VarName",
      "EnvName",
      "UrlPrefix",
      "BasePath",
      "initFilterText",
      "ScriptType",
      "CreatedBy",
      "AcceptVersion",
      "FileName",
      "FileContent",
      "ExecSeq",
      "TableName",
      "UniqueKey",
      "OrigDataOrgId",
      "AppId",
      "AppCode",
      "AppVersion",
      "Url",
      "DbLinkCode",
      "RunningState",
      "variableName",
      "description",
      "environmentName",
      "uriPrefix",
      "enabled",
      "remark",
      "searchKeyword",
      "searchKey"
    ],
    "required": [
      "Code",
      "Name",
      "Description",
      "Enabled",
      "VarName",
      "EnvName",
      "UrlPrefix",
      "initFilterText",
      "ScriptType",
      "AcceptVersion",
      "TableName",
      "UniqueKey",
      "OrigDataOrgId",
      "AppId",
      "AppVersion",
      "variableName",
      "description",
      "environmentName",
      "uriPrefix"
    ],
    "fields": [
      {
        "key": "appModule",
        "label": "应用模块",
        "required": false
      },
      {
        "key": "version",
        "label": "版本",
        "required": false
      },
      {
        "key": "status",
        "label": "状态",
        "required": false
      },
      {
        "key": "Code",
        "label": "应用编号",
        "required": true
      },
      {
        "key": "Name",
        "label": "应用名称",
        "required": true
      },
      {
        "key": "Description",
        "label": "应用描述",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否可用",
        "required": true
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "VarName",
        "label": "API名称",
        "required": true
      },
      {
        "key": "EnvName",
        "label": "环境名称",
        "required": true
      },
      {
        "key": "UrlPrefix",
        "label": "API地址",
        "required": true
      },
      {
        "key": "BasePath",
        "label": "基础路径",
        "required": false
      },
      {
        "key": "initFilterText",
        "label": "配置项",
        "required": true
      },
      {
        "key": "ScriptType",
        "label": "脚本类型",
        "required": true
      },
      {
        "key": "CreatedBy",
        "label": "维护人",
        "required": false
      },
      {
        "key": "AcceptVersion",
        "label": "适用版本",
        "required": true
      },
      {
        "key": "FileName",
        "label": "脚本文件",
        "required": false
      },
      {
        "key": "FileContent",
        "label": "脚本内容",
        "required": false
      },
      {
        "key": "ExecSeq",
        "label": "执行顺序",
        "required": false
      },
      {
        "key": "TableName",
        "label": "表名",
        "required": true
      },
      {
        "key": "UniqueKey",
        "label": "唯一数据主键",
        "required": true
      },
      {
        "key": "OrigDataOrgId",
        "label": "原始数据组织ID",
        "required": true
      },
      {
        "key": "AppId",
        "label": "应用名称",
        "required": true
      },
      {
        "key": "AppCode",
        "label": "应用编码",
        "required": false
      },
      {
        "key": "AppVersion",
        "label": "应用版本",
        "required": true
      },
      {
        "key": "Url",
        "label": "模块地址",
        "required": false
      },
      {
        "key": "DbLinkCode",
        "label": "数据库连接",
        "required": false
      },
      {
        "key": "RunningState",
        "label": "运行状态",
        "required": false
      },
      {
        "key": "variableName",
        "label": "变量名称",
        "required": true
      },
      {
        "key": "description",
        "label": "描述",
        "required": true
      },
      {
        "key": "environmentName",
        "label": "环境名称",
        "required": true
      },
      {
        "key": "uriPrefix",
        "label": "URI前缀",
        "required": true
      },
      {
        "key": "enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "searchKeyword",
        "label": "搜索应用名称",
        "required": false
      },
      {
        "key": "searchKey",
        "label": "搜索组织名称代码",
        "required": false
      }
    ],
    "example": {
      "appModule": "应用模块测试值",
      "version": "版本测试值",
      "status": "Y",
      "Code": "AT-001",
      "Name": "自动化样例001",
      "Description": "自动化测试备注001",
      "Enabled": "是否可用测试值",
      "Remark": "自动化测试备注001",
      "VarName": "自动化样例001",
      "EnvName": "自动化样例001",
      "UrlPrefix": "API地址测试值",
      "BasePath": "基础路径测试值",
      "initFilterText": "配置项测试值",
      "ScriptType": "脚本类型测试值",
      "CreatedBy": "维护人测试值",
      "AcceptVersion": "适用版本测试值",
      "FileName": "脚本文件测试值",
      "FileContent": "脚本内容测试值",
      "ExecSeq": "执行顺序测试值",
      "TableName": "表名测试值",
      "UniqueKey": "唯一数据主键测试值",
      "OrigDataOrgId": "AT-001",
      "AppId": "自动化样例001",
      "AppCode": "AT-001",
      "AppVersion": "应用版本测试值",
      "Url": "模块地址测试值",
      "DbLinkCode": "数据库连接测试值",
      "RunningState": "Y",
      "variableName": "自动化样例001",
      "description": "自动化测试备注001",
      "environmentName": "自动化样例001",
      "uriPrefix": "URI前缀测试值",
      "enabled": "Y",
      "remark": "自动化测试备注001",
      "searchKeyword": "自动化样例001",
      "searchKey": "搜索组织名称代码测试值"
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
        "appModule": "应用模块测试值",
        "version": "版本测试值",
        "status": "Y",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Enabled": "是否可用测试值",
        "Remark": "自动化测试备注001",
        "VarName": "自动化样例001",
        "EnvName": "自动化样例001",
        "UrlPrefix": "API地址测试值",
        "BasePath": "基础路径测试值",
        "initFilterText": "配置项测试值",
        "ScriptType": "脚本类型测试值",
        "CreatedBy": "维护人测试值",
        "AcceptVersion": "适用版本测试值",
        "FileName": "脚本文件测试值",
        "FileContent": "脚本内容测试值",
        "ExecSeq": "执行顺序测试值",
        "TableName": "表名测试值",
        "UniqueKey": "唯一数据主键测试值",
        "OrigDataOrgId": "AT-001",
        "AppId": "自动化样例001",
        "AppCode": "AT-001",
        "AppVersion": "应用版本测试值",
        "Url": "模块地址测试值",
        "DbLinkCode": "数据库连接测试值",
        "RunningState": "Y",
        "variableName": "自动化样例001",
        "description": "自动化测试备注001",
        "environmentName": "自动化样例001",
        "uriPrefix": "URI前缀测试值",
        "enabled": "Y",
        "remark": "自动化测试备注001",
        "searchKeyword": "自动化样例001",
        "searchKey": "搜索组织名称代码测试值"
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
      "key": "7e002f9936-d9061d4dc4-3ef57",
      "type": "业务动作",
      "name": "通用服务配置维护业务入口校验",
      "label": "通用服务配置维护",
      "handler": "showServiceConfigDialog",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击通用服务配置维护",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-938dc33f76-f7473",
      "type": "新增表单",
      "name": "新增模块业务入口校验",
      "label": "新增模块",
      "handler": "showAddDialog",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增模块",
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
          "key": "appModule",
          "label": "应用模块",
          "required": false,
          "example": "应用模块测试值"
        },
        {
          "key": "version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Code",
          "label": "应用编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "应用描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "VarName",
          "label": "API名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "EnvName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UrlPrefix",
          "label": "API地址",
          "required": true,
          "example": "API地址测试值"
        },
        {
          "key": "BasePath",
          "label": "基础路径",
          "required": false,
          "example": "基础路径测试值"
        },
        {
          "key": "initFilterText",
          "label": "配置项",
          "required": true,
          "example": "配置项测试值"
        },
        {
          "key": "ScriptType",
          "label": "脚本类型",
          "required": true,
          "example": "脚本类型测试值"
        },
        {
          "key": "CreatedBy",
          "label": "维护人",
          "required": false,
          "example": "维护人测试值"
        },
        {
          "key": "AcceptVersion",
          "label": "适用版本",
          "required": true,
          "example": "适用版本测试值"
        },
        {
          "key": "FileName",
          "label": "脚本文件",
          "required": false,
          "example": "脚本文件测试值"
        },
        {
          "key": "FileContent",
          "label": "脚本内容",
          "required": false,
          "example": "脚本内容测试值"
        },
        {
          "key": "ExecSeq",
          "label": "执行顺序",
          "required": false,
          "example": "执行顺序测试值"
        },
        {
          "key": "TableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "UniqueKey",
          "label": "唯一数据主键",
          "required": true,
          "example": "唯一数据主键测试值"
        },
        {
          "key": "OrigDataOrgId",
          "label": "原始数据组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "AppId",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "AppCode",
          "label": "应用编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "AppVersion",
          "label": "应用版本",
          "required": true,
          "example": "应用版本测试值"
        },
        {
          "key": "Url",
          "label": "模块地址",
          "required": false,
          "example": "模块地址测试值"
        },
        {
          "key": "DbLinkCode",
          "label": "数据库连接",
          "required": false,
          "example": "数据库连接测试值"
        },
        {
          "key": "RunningState",
          "label": "运行状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "variableName",
          "label": "变量名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "environmentName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "uriPrefix",
          "label": "URI前缀",
          "required": true,
          "example": "URI前缀测试值"
        },
        {
          "key": "enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "searchKeyword",
          "label": "搜索应用名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "searchKey",
          "label": "搜索组织名称代码",
          "required": false,
          "example": "搜索组织名称代码测试值"
        }
      ],
      "testData": {
        "appModule": "应用模块测试值",
        "version": "版本测试值",
        "status": "Y",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Enabled": "是否可用测试值",
        "Remark": "自动化测试备注001",
        "VarName": "自动化样例001",
        "EnvName": "自动化样例001",
        "UrlPrefix": "API地址测试值",
        "BasePath": "基础路径测试值",
        "initFilterText": "配置项测试值",
        "ScriptType": "脚本类型测试值",
        "CreatedBy": "维护人测试值",
        "AcceptVersion": "适用版本测试值",
        "FileName": "脚本文件测试值",
        "FileContent": "脚本内容测试值",
        "ExecSeq": "执行顺序测试值",
        "TableName": "表名测试值",
        "UniqueKey": "唯一数据主键测试值",
        "OrigDataOrgId": "AT-001",
        "AppId": "自动化样例001",
        "AppCode": "AT-001",
        "AppVersion": "应用版本测试值",
        "Url": "模块地址测试值",
        "DbLinkCode": "数据库连接测试值",
        "RunningState": "Y",
        "variableName": "自动化样例001",
        "description": "自动化测试备注001",
        "environmentName": "自动化样例001",
        "uriPrefix": "URI前缀测试值",
        "enabled": "Y",
        "remark": "自动化测试备注001",
        "searchKeyword": "自动化样例001",
        "searchKey": "搜索组织名称代码测试值"
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
      "key": "4aa22a22ac-a7f814c0a4-8f1ba",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleEdit(row)",
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
          "key": "appModule",
          "label": "应用模块",
          "required": false,
          "example": "应用模块测试值"
        },
        {
          "key": "version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Code",
          "label": "应用编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "应用描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "VarName",
          "label": "API名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "EnvName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UrlPrefix",
          "label": "API地址",
          "required": true,
          "example": "API地址测试值"
        },
        {
          "key": "BasePath",
          "label": "基础路径",
          "required": false,
          "example": "基础路径测试值"
        },
        {
          "key": "initFilterText",
          "label": "配置项",
          "required": true,
          "example": "配置项测试值"
        },
        {
          "key": "ScriptType",
          "label": "脚本类型",
          "required": true,
          "example": "脚本类型测试值"
        },
        {
          "key": "CreatedBy",
          "label": "维护人",
          "required": false,
          "example": "维护人测试值"
        },
        {
          "key": "AcceptVersion",
          "label": "适用版本",
          "required": true,
          "example": "适用版本测试值"
        },
        {
          "key": "FileName",
          "label": "脚本文件",
          "required": false,
          "example": "脚本文件测试值"
        },
        {
          "key": "FileContent",
          "label": "脚本内容",
          "required": false,
          "example": "脚本内容测试值"
        },
        {
          "key": "ExecSeq",
          "label": "执行顺序",
          "required": false,
          "example": "执行顺序测试值"
        },
        {
          "key": "TableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "UniqueKey",
          "label": "唯一数据主键",
          "required": true,
          "example": "唯一数据主键测试值"
        },
        {
          "key": "OrigDataOrgId",
          "label": "原始数据组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "AppId",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "AppCode",
          "label": "应用编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "AppVersion",
          "label": "应用版本",
          "required": true,
          "example": "应用版本测试值"
        },
        {
          "key": "Url",
          "label": "模块地址",
          "required": false,
          "example": "模块地址测试值"
        },
        {
          "key": "DbLinkCode",
          "label": "数据库连接",
          "required": false,
          "example": "数据库连接测试值"
        },
        {
          "key": "RunningState",
          "label": "运行状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "variableName",
          "label": "变量名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "environmentName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "uriPrefix",
          "label": "URI前缀",
          "required": true,
          "example": "URI前缀测试值"
        },
        {
          "key": "enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "searchKeyword",
          "label": "搜索应用名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "searchKey",
          "label": "搜索组织名称代码",
          "required": false,
          "example": "搜索组织名称代码测试值"
        }
      ],
      "testData": {
        "appModule": "应用模块测试值",
        "version": "版本测试值",
        "status": "Y",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Enabled": "是否可用测试值",
        "Remark": "自动化测试备注001",
        "VarName": "自动化样例001",
        "EnvName": "自动化样例001",
        "UrlPrefix": "API地址测试值",
        "BasePath": "基础路径测试值",
        "initFilterText": "配置项测试值",
        "ScriptType": "脚本类型测试值",
        "CreatedBy": "维护人测试值",
        "AcceptVersion": "适用版本测试值",
        "FileName": "脚本文件测试值",
        "FileContent": "脚本内容测试值",
        "ExecSeq": "执行顺序测试值",
        "TableName": "表名测试值",
        "UniqueKey": "唯一数据主键测试值",
        "OrigDataOrgId": "AT-001",
        "AppId": "自动化样例001",
        "AppCode": "AT-001",
        "AppVersion": "应用版本测试值",
        "Url": "模块地址测试值",
        "DbLinkCode": "数据库连接测试值",
        "RunningState": "Y",
        "variableName": "自动化样例001",
        "description": "自动化测试备注001",
        "environmentName": "自动化样例001",
        "uriPrefix": "URI前缀测试值",
        "enabled": "Y",
        "remark": "自动化测试备注001",
        "searchKeyword": "自动化样例001",
        "searchKey": "搜索组织名称代码测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-11ff8",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "handleDelete(row)",
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
      "key": "13fd57e65b-679b34085f-be825",
      "type": "新增表单",
      "name": "新增配置业务入口校验",
      "label": "新增配置",
      "handler": "handleAdd",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增配置",
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
          "key": "appModule",
          "label": "应用模块",
          "required": false,
          "example": "应用模块测试值"
        },
        {
          "key": "version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Code",
          "label": "应用编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "应用描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "VarName",
          "label": "API名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "EnvName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UrlPrefix",
          "label": "API地址",
          "required": true,
          "example": "API地址测试值"
        },
        {
          "key": "BasePath",
          "label": "基础路径",
          "required": false,
          "example": "基础路径测试值"
        },
        {
          "key": "initFilterText",
          "label": "配置项",
          "required": true,
          "example": "配置项测试值"
        },
        {
          "key": "ScriptType",
          "label": "脚本类型",
          "required": true,
          "example": "脚本类型测试值"
        },
        {
          "key": "CreatedBy",
          "label": "维护人",
          "required": false,
          "example": "维护人测试值"
        },
        {
          "key": "AcceptVersion",
          "label": "适用版本",
          "required": true,
          "example": "适用版本测试值"
        },
        {
          "key": "FileName",
          "label": "脚本文件",
          "required": false,
          "example": "脚本文件测试值"
        },
        {
          "key": "FileContent",
          "label": "脚本内容",
          "required": false,
          "example": "脚本内容测试值"
        },
        {
          "key": "ExecSeq",
          "label": "执行顺序",
          "required": false,
          "example": "执行顺序测试值"
        },
        {
          "key": "TableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "UniqueKey",
          "label": "唯一数据主键",
          "required": true,
          "example": "唯一数据主键测试值"
        },
        {
          "key": "OrigDataOrgId",
          "label": "原始数据组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "AppId",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "AppCode",
          "label": "应用编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "AppVersion",
          "label": "应用版本",
          "required": true,
          "example": "应用版本测试值"
        },
        {
          "key": "Url",
          "label": "模块地址",
          "required": false,
          "example": "模块地址测试值"
        },
        {
          "key": "DbLinkCode",
          "label": "数据库连接",
          "required": false,
          "example": "数据库连接测试值"
        },
        {
          "key": "RunningState",
          "label": "运行状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "variableName",
          "label": "变量名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "environmentName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "uriPrefix",
          "label": "URI前缀",
          "required": true,
          "example": "URI前缀测试值"
        },
        {
          "key": "enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "searchKeyword",
          "label": "搜索应用名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "searchKey",
          "label": "搜索组织名称代码",
          "required": false,
          "example": "搜索组织名称代码测试值"
        }
      ],
      "testData": {
        "appModule": "应用模块测试值",
        "version": "版本测试值",
        "status": "Y",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Enabled": "是否可用测试值",
        "Remark": "自动化测试备注001",
        "VarName": "自动化样例001",
        "EnvName": "自动化样例001",
        "UrlPrefix": "API地址测试值",
        "BasePath": "基础路径测试值",
        "initFilterText": "配置项测试值",
        "ScriptType": "脚本类型测试值",
        "CreatedBy": "维护人测试值",
        "AcceptVersion": "适用版本测试值",
        "FileName": "脚本文件测试值",
        "FileContent": "脚本内容测试值",
        "ExecSeq": "执行顺序测试值",
        "TableName": "表名测试值",
        "UniqueKey": "唯一数据主键测试值",
        "OrigDataOrgId": "AT-001",
        "AppId": "自动化样例001",
        "AppCode": "AT-001",
        "AppVersion": "应用版本测试值",
        "Url": "模块地址测试值",
        "DbLinkCode": "数据库连接测试值",
        "RunningState": "Y",
        "variableName": "自动化样例001",
        "description": "自动化测试备注001",
        "environmentName": "自动化样例001",
        "uriPrefix": "URI前缀测试值",
        "enabled": "Y",
        "remark": "自动化测试备注001",
        "searchKeyword": "自动化样例001",
        "searchKey": "搜索组织名称代码测试值"
      }
    },
    {
      "key": "13fd57e65b-40b7de8090-8f719",
      "type": "新增表单",
      "name": "新增脚本业务入口校验",
      "label": "新增脚本",
      "handler": "handleAddScript",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增脚本",
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
          "key": "appModule",
          "label": "应用模块",
          "required": false,
          "example": "应用模块测试值"
        },
        {
          "key": "version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Code",
          "label": "应用编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "应用描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "VarName",
          "label": "API名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "EnvName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UrlPrefix",
          "label": "API地址",
          "required": true,
          "example": "API地址测试值"
        },
        {
          "key": "BasePath",
          "label": "基础路径",
          "required": false,
          "example": "基础路径测试值"
        },
        {
          "key": "initFilterText",
          "label": "配置项",
          "required": true,
          "example": "配置项测试值"
        },
        {
          "key": "ScriptType",
          "label": "脚本类型",
          "required": true,
          "example": "脚本类型测试值"
        },
        {
          "key": "CreatedBy",
          "label": "维护人",
          "required": false,
          "example": "维护人测试值"
        },
        {
          "key": "AcceptVersion",
          "label": "适用版本",
          "required": true,
          "example": "适用版本测试值"
        },
        {
          "key": "FileName",
          "label": "脚本文件",
          "required": false,
          "example": "脚本文件测试值"
        },
        {
          "key": "FileContent",
          "label": "脚本内容",
          "required": false,
          "example": "脚本内容测试值"
        },
        {
          "key": "ExecSeq",
          "label": "执行顺序",
          "required": false,
          "example": "执行顺序测试值"
        },
        {
          "key": "TableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "UniqueKey",
          "label": "唯一数据主键",
          "required": true,
          "example": "唯一数据主键测试值"
        },
        {
          "key": "OrigDataOrgId",
          "label": "原始数据组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "AppId",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "AppCode",
          "label": "应用编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "AppVersion",
          "label": "应用版本",
          "required": true,
          "example": "应用版本测试值"
        },
        {
          "key": "Url",
          "label": "模块地址",
          "required": false,
          "example": "模块地址测试值"
        },
        {
          "key": "DbLinkCode",
          "label": "数据库连接",
          "required": false,
          "example": "数据库连接测试值"
        },
        {
          "key": "RunningState",
          "label": "运行状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "variableName",
          "label": "变量名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "environmentName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "uriPrefix",
          "label": "URI前缀",
          "required": true,
          "example": "URI前缀测试值"
        },
        {
          "key": "enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "searchKeyword",
          "label": "搜索应用名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "searchKey",
          "label": "搜索组织名称代码",
          "required": false,
          "example": "搜索组织名称代码测试值"
        }
      ],
      "testData": {
        "appModule": "应用模块测试值",
        "version": "版本测试值",
        "status": "Y",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Enabled": "是否可用测试值",
        "Remark": "自动化测试备注001",
        "VarName": "自动化样例001",
        "EnvName": "自动化样例001",
        "UrlPrefix": "API地址测试值",
        "BasePath": "基础路径测试值",
        "initFilterText": "配置项测试值",
        "ScriptType": "脚本类型测试值",
        "CreatedBy": "维护人测试值",
        "AcceptVersion": "适用版本测试值",
        "FileName": "脚本文件测试值",
        "FileContent": "脚本内容测试值",
        "ExecSeq": "执行顺序测试值",
        "TableName": "表名测试值",
        "UniqueKey": "唯一数据主键测试值",
        "OrigDataOrgId": "AT-001",
        "AppId": "自动化样例001",
        "AppCode": "AT-001",
        "AppVersion": "应用版本测试值",
        "Url": "模块地址测试值",
        "DbLinkCode": "数据库连接测试值",
        "RunningState": "Y",
        "variableName": "自动化样例001",
        "description": "自动化测试备注001",
        "environmentName": "自动化样例001",
        "uriPrefix": "URI前缀测试值",
        "enabled": "Y",
        "remark": "自动化测试备注001",
        "searchKeyword": "自动化样例001",
        "searchKey": "搜索组织名称代码测试值"
      }
    },
    {
      "key": "ef879b4ced-188896795f-7f3e8",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "handleExportScript",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-60e2bcad85-60e2b",
      "type": "导入入口",
      "name": "导入业务入口校验",
      "label": "导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入",
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
      "key": "ef879b4ced-2966b6c418-4bec9",
      "type": "导出入口",
      "name": "下载脚本业务入口校验",
      "label": "下载脚本",
      "handler": "handleDownloadScript",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载脚本",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-f7acefd2d4-61f70",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "handleViewScript(row)",
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
      "key": "7e002f9936-dbef5dfb47-cb9f9",
      "type": "业务动作",
      "name": "数据库初始化业务入口校验",
      "label": "数据库初始化",
      "handler": "handleInitializeDatabase",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位数据库初始化",
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
      "key": "13fd57e65b-5293ce4361-c2456",
      "type": "新增表单",
      "name": "新增基础表业务入口校验",
      "label": "新增基础表",
      "handler": "handleAddTable",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增基础表",
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
          "key": "appModule",
          "label": "应用模块",
          "required": false,
          "example": "应用模块测试值"
        },
        {
          "key": "version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "status",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Code",
          "label": "应用编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Description",
          "label": "应用描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "Enabled",
          "label": "是否可用",
          "required": true,
          "example": "是否可用测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "VarName",
          "label": "API名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "EnvName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "UrlPrefix",
          "label": "API地址",
          "required": true,
          "example": "API地址测试值"
        },
        {
          "key": "BasePath",
          "label": "基础路径",
          "required": false,
          "example": "基础路径测试值"
        },
        {
          "key": "initFilterText",
          "label": "配置项",
          "required": true,
          "example": "配置项测试值"
        },
        {
          "key": "ScriptType",
          "label": "脚本类型",
          "required": true,
          "example": "脚本类型测试值"
        },
        {
          "key": "CreatedBy",
          "label": "维护人",
          "required": false,
          "example": "维护人测试值"
        },
        {
          "key": "AcceptVersion",
          "label": "适用版本",
          "required": true,
          "example": "适用版本测试值"
        },
        {
          "key": "FileName",
          "label": "脚本文件",
          "required": false,
          "example": "脚本文件测试值"
        },
        {
          "key": "FileContent",
          "label": "脚本内容",
          "required": false,
          "example": "脚本内容测试值"
        },
        {
          "key": "ExecSeq",
          "label": "执行顺序",
          "required": false,
          "example": "执行顺序测试值"
        },
        {
          "key": "TableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "UniqueKey",
          "label": "唯一数据主键",
          "required": true,
          "example": "唯一数据主键测试值"
        },
        {
          "key": "OrigDataOrgId",
          "label": "原始数据组织ID",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "AppId",
          "label": "应用名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "AppCode",
          "label": "应用编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "AppVersion",
          "label": "应用版本",
          "required": true,
          "example": "应用版本测试值"
        },
        {
          "key": "Url",
          "label": "模块地址",
          "required": false,
          "example": "模块地址测试值"
        },
        {
          "key": "DbLinkCode",
          "label": "数据库连接",
          "required": false,
          "example": "数据库连接测试值"
        },
        {
          "key": "RunningState",
          "label": "运行状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "variableName",
          "label": "变量名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "description",
          "label": "描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "environmentName",
          "label": "环境名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "uriPrefix",
          "label": "URI前缀",
          "required": true,
          "example": "URI前缀测试值"
        },
        {
          "key": "enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "searchKeyword",
          "label": "搜索应用名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "searchKey",
          "label": "搜索组织名称代码",
          "required": false,
          "example": "搜索组织名称代码测试值"
        }
      ],
      "testData": {
        "appModule": "应用模块测试值",
        "version": "版本测试值",
        "status": "Y",
        "Code": "AT-001",
        "Name": "自动化样例001",
        "Description": "自动化测试备注001",
        "Enabled": "是否可用测试值",
        "Remark": "自动化测试备注001",
        "VarName": "自动化样例001",
        "EnvName": "自动化样例001",
        "UrlPrefix": "API地址测试值",
        "BasePath": "基础路径测试值",
        "initFilterText": "配置项测试值",
        "ScriptType": "脚本类型测试值",
        "CreatedBy": "维护人测试值",
        "AcceptVersion": "适用版本测试值",
        "FileName": "脚本文件测试值",
        "FileContent": "脚本内容测试值",
        "ExecSeq": "执行顺序测试值",
        "TableName": "表名测试值",
        "UniqueKey": "唯一数据主键测试值",
        "OrigDataOrgId": "AT-001",
        "AppId": "自动化样例001",
        "AppCode": "AT-001",
        "AppVersion": "应用版本测试值",
        "Url": "模块地址测试值",
        "DbLinkCode": "数据库连接测试值",
        "RunningState": "Y",
        "variableName": "自动化样例001",
        "description": "自动化测试备注001",
        "environmentName": "自动化样例001",
        "uriPrefix": "URI前缀测试值",
        "enabled": "Y",
        "remark": "自动化测试备注001",
        "searchKeyword": "自动化样例001",
        "searchKey": "搜索组织名称代码测试值"
      }
    },
    {
      "key": "7e002f9936-68d0b5d8f7-4e065",
      "type": "业务动作",
      "name": "批量初始化业务入口校验",
      "label": "批量初始化",
      "handler": "handleBatchInitialize",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位批量初始化",
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
      "key": "7e002f9936-196e111309-1b623",
      "type": "业务动作",
      "name": "初始化业务入口校验",
      "label": "初始化",
      "handler": "handleInitializeTable(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位初始化",
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
