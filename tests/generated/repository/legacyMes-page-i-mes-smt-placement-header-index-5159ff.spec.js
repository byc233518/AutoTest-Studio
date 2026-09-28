// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-placement-header-index-5159ff",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/SmtPlacementHeader/Index",
  "sourceRoute": "/iMES/SmtPlacementHeader/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtPlacementHeader/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "PLACEMENT",
      "STATION_ID",
      "ENABLED",
      "LOCATION",
      "PNDESC",
      "PCB_SIDE",
      "HI_OUTPUT_TIME",
      "STANDARD_CAPACITY",
      "CHECKED",
      "CHECKED_BY",
      "CHECKED_TIME",
      "DESCRIPTION",
      "DUAL_TRACK",
      "PATH",
      "Placement",
      "Part_NO",
      "Stations",
      "MultiNo"
    ],
    "required": [
      "PART_NO",
      "PLACEMENT",
      "STATION_ID",
      "PCB_SIDE",
      "HI_OUTPUT_TIME",
      "STANDARD_CAPACITY",
      "PATH",
      "Placement",
      "Part_NO",
      "Stations",
      "MultiNo"
    ],
    "fields": [
      {
        "key": "PART_NO",
        "label": "成品料号",
        "required": true
      },
      {
        "key": "PLACEMENT",
        "label": "料单名",
        "required": true
      },
      {
        "key": "STATION_ID",
        "label": "机台",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "LOCATION",
        "label": "站位",
        "required": false
      },
      {
        "key": "PNDESC",
        "label": "料号描述",
        "required": false
      },
      {
        "key": "PCB_SIDE",
        "label": "类型",
        "required": true
      },
      {
        "key": "HI_OUTPUT_TIME",
        "label": "HI时间",
        "required": true
      },
      {
        "key": "STANDARD_CAPACITY",
        "label": "标准产能",
        "required": true
      },
      {
        "key": "CHECKED",
        "label": "是否检验",
        "required": false
      },
      {
        "key": "CHECKED_BY",
        "label": "检验人",
        "required": false
      },
      {
        "key": "CHECKED_TIME",
        "label": "检验时间",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "描述",
        "required": false
      },
      {
        "key": "DUAL_TRACK",
        "label": "是否双轨道",
        "required": false
      },
      {
        "key": "PATH",
        "label": "料单路径",
        "required": true
      },
      {
        "key": "Placement",
        "label": "料单名",
        "required": true
      },
      {
        "key": "Part_NO",
        "label": "成品料号",
        "required": true
      },
      {
        "key": "Stations",
        "label": "机台",
        "required": true
      },
      {
        "key": "MultiNo",
        "label": "拼板数",
        "required": true
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "PLACEMENT": "料单名测试值",
      "STATION_ID": "机台测试值",
      "ENABLED": "是否激活测试值",
      "LOCATION": "站位测试值",
      "PNDESC": "自动化测试备注001",
      "PCB_SIDE": "类型测试值",
      "HI_OUTPUT_TIME": "2026-08-01",
      "STANDARD_CAPACITY": "标准产能测试值",
      "CHECKED": "是否检验测试值",
      "CHECKED_BY": "检验人测试值",
      "CHECKED_TIME": "2026-08-01",
      "DESCRIPTION": "自动化测试备注001",
      "DUAL_TRACK": "是否双轨道测试值",
      "PATH": "料单路径测试值",
      "Placement": "料单名测试值",
      "Part_NO": "AT-001",
      "Stations": "机台测试值",
      "MultiNo": "拼板数测试值"
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
      "key": "4aa22a22ac-6180eac0a8-373cf",
      "type": "编辑表单",
      "name": "编辑料单业务入口校验",
      "label": "编辑料单",
      "handler": "editMaterials",
      "permission": "EditView",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑料单",
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
          "key": "PART_NO",
          "label": "成品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PLACEMENT",
          "label": "料单名",
          "required": true,
          "example": "料单名测试值"
        },
        {
          "key": "STATION_ID",
          "label": "机台",
          "required": true,
          "example": "机台测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "LOCATION",
          "label": "站位",
          "required": false,
          "example": "站位测试值"
        },
        {
          "key": "PNDESC",
          "label": "料号描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PCB_SIDE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "HI_OUTPUT_TIME",
          "label": "HI时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "STANDARD_CAPACITY",
          "label": "标准产能",
          "required": true,
          "example": "标准产能测试值"
        },
        {
          "key": "CHECKED",
          "label": "是否检验",
          "required": false,
          "example": "是否检验测试值"
        },
        {
          "key": "CHECKED_BY",
          "label": "检验人",
          "required": false,
          "example": "检验人测试值"
        },
        {
          "key": "CHECKED_TIME",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "DUAL_TRACK",
          "label": "是否双轨道",
          "required": false,
          "example": "是否双轨道测试值"
        },
        {
          "key": "PATH",
          "label": "料单路径",
          "required": true,
          "example": "料单路径测试值"
        },
        {
          "key": "Placement",
          "label": "料单名",
          "required": true,
          "example": "料单名测试值"
        },
        {
          "key": "Part_NO",
          "label": "成品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Stations",
          "label": "机台",
          "required": true,
          "example": "机台测试值"
        },
        {
          "key": "MultiNo",
          "label": "拼板数",
          "required": true,
          "example": "拼板数测试值"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PLACEMENT": "料单名测试值",
        "STATION_ID": "机台测试值",
        "ENABLED": "是否激活测试值",
        "LOCATION": "站位测试值",
        "PNDESC": "自动化测试备注001",
        "PCB_SIDE": "类型测试值",
        "HI_OUTPUT_TIME": "2026-08-01",
        "STANDARD_CAPACITY": "标准产能测试值",
        "CHECKED": "是否检验测试值",
        "CHECKED_BY": "检验人测试值",
        "CHECKED_TIME": "2026-08-01",
        "DESCRIPTION": "自动化测试备注001",
        "DUAL_TRACK": "是否双轨道测试值",
        "PATH": "料单路径测试值",
        "Placement": "料单名测试值",
        "Part_NO": "AT-001",
        "Stations": "机台测试值",
        "MultiNo": "拼板数测试值"
      }
    },
    {
      "key": "5f1787916c-3f919178aa-3f919",
      "type": "导入入口",
      "name": "料单上传业务入口校验",
      "label": "料单上传",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击料单上传",
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
      "key": "5f1787916c-ai-b4f50",
      "type": "导入入口",
      "name": "AI料单上传业务入口校验",
      "label": "AI料单上传",
      "handler": "upLoadAIMaterials",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击AI料单上传",
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
      "key": "5f1787916c-f162424d91-30918",
      "type": "导入入口",
      "name": "三星料单上传业务入口校验",
      "label": "三星料单上传",
      "handler": "upLoadTxtMaterials",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击三星料单上传",
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
      "key": "5f1787916c-ri-2fbbb",
      "type": "导入入口",
      "name": "RI料单上传业务入口校验",
      "label": "RI料单上传",
      "handler": "upLoadRIMaterials",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击RI料单上传",
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
      "key": "5f1787916c-f4ea2ef492-ec7cc",
      "type": "导入入口",
      "name": "西门子料单上传业务入口校验",
      "label": "西门子料单上传",
      "handler": "upLoadSimensMaterials",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击西门子料单上传",
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
      "key": "5f1787916c-hs-668-9a563",
      "type": "导入入口",
      "name": "和西HS-668料单上传业务入口校验",
      "label": "和西HS-668料单上传",
      "handler": "upLoadXHS668Materials",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击和西HS-668料单上传",
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
      "key": "5f1787916c-txv2-x2-s-1c029",
      "type": "导入入口",
      "name": "西门子TXV2和X2S上传业务入口校验",
      "label": "西门子TXV2和X2S上传",
      "handler": "upLoadTxv2AndX2s",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击西门子TXV2和X2S上传",
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
      "key": "5f1787916c-hx-plg-ecu-s3-e4663",
      "type": "导入入口",
      "name": "HX-PLG-ECU-S3上传业务入口校验",
      "label": "HX-PLG-ECU-S3上传",
      "handler": "upLoadHXPLGECUS3",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击HX-PLG-ECU-S3上传",
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
      "key": "5f1787916c-juki-a1693",
      "type": "导入入口",
      "name": "JUKI系列料单上传业务入口校验",
      "label": "JUKI系列料单上传",
      "handler": "upLoadSimensJUKIMaterials",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击JUKI系列料单上传",
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
      "key": "5f1787916c-67d38b0ca6-c68c4",
      "type": "导入入口",
      "name": "雅马哈料单上传业务入口校验",
      "label": "雅马哈料单上传",
      "handler": "upLoadSETYamahaFLAG",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击雅马哈料单上传",
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
      "key": "5f1787916c-vm-6068e",
      "type": "导入入口",
      "name": "松下料单上传-VM业务入口校验",
      "label": "松下料单上传-VM",
      "handler": "upLoadSETPanasonicFLAG",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击松下料单上传-VM",
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
      "key": "5f1787916c-ai-514c1",
      "type": "导入入口",
      "name": "诺贝AI料单上传业务入口校验",
      "label": "诺贝AI料单上传",
      "handler": "upLoadSETNUOBEIFLAG",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击诺贝AI料单上传",
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
      "key": "5f1787916c-e0a22bff9f-e931e",
      "type": "导入入口",
      "name": "伊莱特雅马哈料单上传业务入口校验",
      "label": "伊莱特雅马哈料单上传",
      "handler": "upLoadYiLaiTeYamahaFlagUpload",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击伊莱特雅马哈料单上传",
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
      "key": "5f1787916c-ai-dfde4",
      "type": "导入入口",
      "name": "伊莱特AI料单上传业务入口校验",
      "label": "伊莱特AI料单上传",
      "handler": "upLoadYiLaiTeFlagUpload",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击伊莱特AI料单上传",
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
      "key": "5f1787916c-npm-34b84",
      "type": "导入入口",
      "name": "松下料单上传-NPM业务入口校验",
      "label": "松下料单上传-NPM",
      "handler": "upLoadSETPanasonicNPMFLAG",
      "permission": "",
      "menuTriggerLabel": "料单上传",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击松下料单上传-NPM",
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
      "key": "13fd57e65b-2cd9e6ce81-1a76f",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick(null)",
      "permission": "",
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
          "key": "PART_NO",
          "label": "成品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PLACEMENT",
          "label": "料单名",
          "required": true,
          "example": "料单名测试值"
        },
        {
          "key": "STATION_ID",
          "label": "机台",
          "required": true,
          "example": "机台测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "LOCATION",
          "label": "站位",
          "required": false,
          "example": "站位测试值"
        },
        {
          "key": "PNDESC",
          "label": "料号描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "PCB_SIDE",
          "label": "类型",
          "required": true,
          "example": "类型测试值"
        },
        {
          "key": "HI_OUTPUT_TIME",
          "label": "HI时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "STANDARD_CAPACITY",
          "label": "标准产能",
          "required": true,
          "example": "标准产能测试值"
        },
        {
          "key": "CHECKED",
          "label": "是否检验",
          "required": false,
          "example": "是否检验测试值"
        },
        {
          "key": "CHECKED_BY",
          "label": "检验人",
          "required": false,
          "example": "检验人测试值"
        },
        {
          "key": "CHECKED_TIME",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "DESCRIPTION",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "DUAL_TRACK",
          "label": "是否双轨道",
          "required": false,
          "example": "是否双轨道测试值"
        },
        {
          "key": "PATH",
          "label": "料单路径",
          "required": true,
          "example": "料单路径测试值"
        },
        {
          "key": "Placement",
          "label": "料单名",
          "required": true,
          "example": "料单名测试值"
        },
        {
          "key": "Part_NO",
          "label": "成品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Stations",
          "label": "机台",
          "required": true,
          "example": "机台测试值"
        },
        {
          "key": "MultiNo",
          "label": "拼板数",
          "required": true,
          "example": "拼板数测试值"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PLACEMENT": "料单名测试值",
        "STATION_ID": "机台测试值",
        "ENABLED": "是否激活测试值",
        "LOCATION": "站位测试值",
        "PNDESC": "自动化测试备注001",
        "PCB_SIDE": "类型测试值",
        "HI_OUTPUT_TIME": "2026-08-01",
        "STANDARD_CAPACITY": "标准产能测试值",
        "CHECKED": "是否检验测试值",
        "CHECKED_BY": "检验人测试值",
        "CHECKED_TIME": "2026-08-01",
        "DESCRIPTION": "自动化测试备注001",
        "DUAL_TRACK": "是否双轨道测试值",
        "PATH": "料单路径测试值",
        "Placement": "料单名测试值",
        "Part_NO": "AT-001",
        "Stations": "机台测试值",
        "MultiNo": "拼板数测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-a01be",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(row, row.$index)",
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
      "key": "5f1787916c-a977650db1-f4953",
      "type": "导入入口",
      "name": "上传业务入口校验",
      "label": "上传",
      "handler": "openUploadModal",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击上传",
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
      "key": "7e002f9936-09cbc97ae2-09dd6",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "saveData",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位提交",
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
