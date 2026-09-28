// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-mes-tongs-info-index-a70352",
  "name": "旧版制造执行 - 工装治具作业管理功能校验",
  "displayName": "工装治具作业管理",
  "route": "/iMES/MesTongsInfo/Index",
  "sourceRoute": "/iMES/MesTongsInfo/Index",
  "menuCode": "iMES_MesTongsInfo",
  "breadcrumb": "设备管理 / 工装治具 / 工装治具作业管理",
  "sourceFile": "src/views/iMES/MesTongsInfo/Index.vue",
  "dataSchema": {
    "columns": [
      "APPLY_ID",
      "FixtureCategory",
      "TONGS_MODEL",
      "PRINCIPAL",
      "APPLY_QTY",
      "Source",
      "STORE_NAME",
      "APPLY_SURPLUS_QTY",
      "STORE_CODE",
      "ORGANIZE_ID",
      "STATUS",
      "REMARK",
      "ACTIVE_TIMES",
      "LEFT_TIMES",
      "REPAIR_RESULT",
      "CODE",
      "TONGS_TYPE",
      "DEPARTMENT",
      "SOURCES",
      "ACTIVE",
      "UserName",
      "remark",
      "ACTIVE_TIMES_ENABLED",
      "PART_DESC",
      "PART_NAME",
      "VERSION",
      "code",
      "DESC",
      "NAME",
      "MEANING"
    ],
    "required": [
      "ORGANIZE_ID",
      "ACTIVE_TIMES",
      "CODE",
      "TONGS_TYPE",
      "DEPARTMENT",
      "SOURCES"
    ],
    "fields": [
      {
        "key": "APPLY_ID",
        "label": "申请编号",
        "required": false
      },
      {
        "key": "FixtureCategory",
        "label": "工装名称",
        "required": false
      },
      {
        "key": "TONGS_MODEL",
        "label": "型号",
        "required": false
      },
      {
        "key": "PRINCIPAL",
        "label": "负责人",
        "required": false
      },
      {
        "key": "APPLY_QTY",
        "label": "申请数量",
        "required": false
      },
      {
        "key": "Source",
        "label": "来源",
        "required": false
      },
      {
        "key": "STORE_NAME",
        "label": "储位名称",
        "required": false
      },
      {
        "key": "APPLY_SURPLUS_QTY",
        "label": "待入库数量",
        "required": false
      },
      {
        "key": "STORE_CODE",
        "label": "储位编码",
        "required": false
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "描述",
        "required": false
      },
      {
        "key": "ACTIVE_TIMES",
        "label": "使用寿命次数",
        "required": true
      },
      {
        "key": "LEFT_TIMES",
        "label": "剩余次数",
        "required": false
      },
      {
        "key": "REPAIR_RESULT",
        "label": "维修状态",
        "required": false
      },
      {
        "key": "CODE",
        "label": "工装编码",
        "required": true
      },
      {
        "key": "TONGS_TYPE",
        "label": "所有工装名称",
        "required": true
      },
      {
        "key": "DEPARTMENT",
        "label": "所有部门",
        "required": true
      },
      {
        "key": "SOURCES",
        "label": "所有来源",
        "required": true
      },
      {
        "key": "ACTIVE",
        "label": "所有激活状态",
        "required": false
      },
      {
        "key": "UserName",
        "label": "领用人",
        "required": false
      },
      {
        "key": "remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "ACTIVE_TIMES_ENABLED",
        "label": "启用寿命次数管控",
        "required": false
      },
      {
        "key": "PART_DESC",
        "label": "规格",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": false
      },
      {
        "key": "VERSION",
        "label": "版本号",
        "required": false
      },
      {
        "key": "code",
        "label": "输入工装编码（回车加入到列表中）",
        "required": false
      },
      {
        "key": "DESC",
        "label": "备注",
        "required": false
      },
      {
        "key": "NAME",
        "label": "输入储位名称",
        "required": false
      },
      {
        "key": "MEANING",
        "label": "名称",
        "required": false
      }
    ],
    "example": {
      "APPLY_ID": "AT-001",
      "FixtureCategory": "自动化样例001",
      "TONGS_MODEL": "型号测试值",
      "PRINCIPAL": "负责人测试值",
      "APPLY_QTY": "1",
      "Source": "来源测试值",
      "STORE_NAME": "自动化样例001",
      "APPLY_SURPLUS_QTY": "1",
      "STORE_CODE": "AT-001",
      "ORGANIZE_ID": "组织架构测试值",
      "STATUS": "是否激活测试值",
      "REMARK": "自动化测试备注001",
      "ACTIVE_TIMES": "使用寿命次数测试值",
      "LEFT_TIMES": "剩余次数测试值",
      "REPAIR_RESULT": "Y",
      "CODE": "AT-001",
      "TONGS_TYPE": "自动化样例001",
      "DEPARTMENT": "所有部门测试值",
      "SOURCES": "所有来源测试值",
      "ACTIVE": "Y",
      "UserName": "领用人测试值",
      "remark": "自动化测试备注001",
      "ACTIVE_TIMES_ENABLED": "启用寿命次数管控测试值",
      "PART_DESC": "规格测试值",
      "PART_NAME": "自动化样例001",
      "VERSION": "版本号测试值",
      "code": "输入工装编码（回车加入到列表中）测试值",
      "DESC": "自动化测试备注001",
      "NAME": "自动化样例001",
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
        "searchClick"
      ],
      "testData": {
        "APPLY_ID": "AT-001",
        "FixtureCategory": "自动化样例001",
        "TONGS_MODEL": "型号测试值",
        "PRINCIPAL": "负责人测试值",
        "APPLY_QTY": "1",
        "Source": "来源测试值",
        "STORE_NAME": "自动化样例001",
        "APPLY_SURPLUS_QTY": "1",
        "STORE_CODE": "AT-001",
        "ORGANIZE_ID": "组织架构测试值",
        "STATUS": "是否激活测试值",
        "REMARK": "自动化测试备注001",
        "ACTIVE_TIMES": "使用寿命次数测试值",
        "LEFT_TIMES": "剩余次数测试值",
        "REPAIR_RESULT": "Y",
        "CODE": "AT-001",
        "TONGS_TYPE": "自动化样例001",
        "DEPARTMENT": "所有部门测试值",
        "SOURCES": "所有来源测试值",
        "ACTIVE": "Y",
        "UserName": "领用人测试值",
        "remark": "自动化测试备注001",
        "ACTIVE_TIMES_ENABLED": "启用寿命次数管控测试值",
        "PART_DESC": "规格测试值",
        "PART_NAME": "自动化样例001",
        "VERSION": "版本号测试值",
        "code": "输入工装编码（回车加入到列表中）测试值",
        "DESC": "自动化测试备注001",
        "NAME": "自动化样例001",
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
      "key": "7e002f9936-b93335714c-be2a7",
      "type": "业务动作",
      "name": "申请入库业务入口校验",
      "label": "申请入库",
      "handler": "registeredClick",
      "permission": "ApplyGoStore",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位申请入库",
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
      "key": "7e002f9936-cb7c9a7bb3-cce50",
      "type": "业务动作",
      "name": "入库业务入口校验",
      "label": "入库",
      "handler": "warehouseClick",
      "permission": "MesTongsInfoWarehousing",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位入库",
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
      "key": "7e002f9936-f36a5da7a9-2b37b",
      "type": "业务动作",
      "name": "领用业务入口校验",
      "label": "领用",
      "handler": "useClick",
      "permission": "MesTongsInfoUse",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位领用",
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
      "key": "7e002f9936-94f3894877-89af2",
      "type": "业务动作",
      "name": "保养业务入口校验",
      "label": "保养",
      "handler": "maintainClick",
      "permission": "MesTongsInfomaintenance",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位保养",
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
      "key": "7e002f9936-2b83a4cb9c-66791",
      "type": "业务动作",
      "name": "维修业务入口校验",
      "label": "维修",
      "handler": "serviceClick",
      "permission": "MesTongsInfoservice",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位维修",
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
      "key": "5f1787916c-4c831be9b9-4c831",
      "type": "导入入口",
      "name": "导入工装信息业务入口校验",
      "label": "导入工装信息",
      "handler": "",
      "permission": "MesTongsInfoImport",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入工装信息",
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
      "key": "ef879b4ced-ccc60c8ae1-65d29",
      "type": "导出入口",
      "name": "导出工装信息业务入口校验",
      "label": "导出工装信息",
      "handler": "handleImportBtn(\r\n                      2,\r\n                      'exportData',\r\n                      'MES_TONGS_INFO',\r\n                      '工装信息'\r\n                    )",
      "permission": "MesTongsInfoExport",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出工装信息",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-45f1fdce90-cdffb",
      "type": "导出入口",
      "name": "导出工装信息模板业务入口校验",
      "label": "导出工装信息模板",
      "handler": "handleImportBtn(3, 'MES_TONGS_INFO')",
      "permission": "MesTongsInfoExportTpl",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出工装信息模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-06e0b925fb-06e0b",
      "type": "导入入口",
      "name": "导入产品信息业务入口校验",
      "label": "导入产品信息",
      "handler": "",
      "permission": "MesTongsInfoImports",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入产品信息",
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
      "key": "ef879b4ced-14f3866c9c-8d776",
      "type": "导出入口",
      "name": "导出产品信息业务入口校验",
      "label": "导出产品信息",
      "handler": "handleImportBtn(\r\n                        2,\r\n                        'getCategoryData1',\r\n                        'MES_TONGS_PART',\r\n                        '工装产品信息'\r\n                      )",
      "permission": "MesTongsInfoExports",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出产品信息",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-fe03e5fb39-d14db",
      "type": "导出入口",
      "name": "导出产品信息模板业务入口校验",
      "label": "导出产品信息模板",
      "handler": "handleImportBtn(3, 'MES_TONGS_PART')",
      "permission": "MesTongsInfoExportTpls",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出产品信息模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "MesTongsInfoedit",
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
          "key": "APPLY_ID",
          "label": "申请编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "FixtureCategory",
          "label": "工装名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "TONGS_MODEL",
          "label": "型号",
          "required": false,
          "example": "型号测试值"
        },
        {
          "key": "PRINCIPAL",
          "label": "负责人",
          "required": false,
          "example": "负责人测试值"
        },
        {
          "key": "APPLY_QTY",
          "label": "申请数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "Source",
          "label": "来源",
          "required": false,
          "example": "来源测试值"
        },
        {
          "key": "STORE_NAME",
          "label": "储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "APPLY_SURPLUS_QTY",
          "label": "待入库数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "STORE_CODE",
          "label": "储位编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "STATUS",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ACTIVE_TIMES",
          "label": "使用寿命次数",
          "required": true,
          "example": "使用寿命次数测试值"
        },
        {
          "key": "LEFT_TIMES",
          "label": "剩余次数",
          "required": false,
          "example": "剩余次数测试值"
        },
        {
          "key": "REPAIR_RESULT",
          "label": "维修状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "CODE",
          "label": "工装编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TONGS_TYPE",
          "label": "所有工装名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "DEPARTMENT",
          "label": "所有部门",
          "required": true,
          "example": "所有部门测试值"
        },
        {
          "key": "SOURCES",
          "label": "所有来源",
          "required": true,
          "example": "所有来源测试值"
        },
        {
          "key": "ACTIVE",
          "label": "所有激活状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "UserName",
          "label": "领用人",
          "required": false,
          "example": "领用人测试值"
        },
        {
          "key": "remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ACTIVE_TIMES_ENABLED",
          "label": "启用寿命次数管控",
          "required": false,
          "example": "启用寿命次数管控测试值"
        },
        {
          "key": "PART_DESC",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "VERSION",
          "label": "版本号",
          "required": false,
          "example": "版本号测试值"
        },
        {
          "key": "code",
          "label": "输入工装编码（回车加入到列表中）",
          "required": false,
          "example": "输入工装编码（回车加入到列表中）测试值"
        },
        {
          "key": "DESC",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "NAME",
          "label": "输入储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MEANING",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "APPLY_ID": "AT-001",
        "FixtureCategory": "自动化样例001",
        "TONGS_MODEL": "型号测试值",
        "PRINCIPAL": "负责人测试值",
        "APPLY_QTY": "1",
        "Source": "来源测试值",
        "STORE_NAME": "自动化样例001",
        "APPLY_SURPLUS_QTY": "1",
        "STORE_CODE": "AT-001",
        "ORGANIZE_ID": "组织架构测试值",
        "STATUS": "是否激活测试值",
        "REMARK": "自动化测试备注001",
        "ACTIVE_TIMES": "使用寿命次数测试值",
        "LEFT_TIMES": "剩余次数测试值",
        "REPAIR_RESULT": "Y",
        "CODE": "AT-001",
        "TONGS_TYPE": "自动化样例001",
        "DEPARTMENT": "所有部门测试值",
        "SOURCES": "所有来源测试值",
        "ACTIVE": "Y",
        "UserName": "领用人测试值",
        "remark": "自动化测试备注001",
        "ACTIVE_TIMES_ENABLED": "启用寿命次数管控测试值",
        "PART_DESC": "规格测试值",
        "PART_NAME": "自动化样例001",
        "VERSION": "版本号测试值",
        "code": "输入工装编码（回车加入到列表中）测试值",
        "DESC": "自动化测试备注001",
        "NAME": "自动化样例001",
        "MEANING": "自动化样例001"
      }
    }
  ]
});
