// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-patchlineconfig-index-e7bcdf",
  "name": "旧版制造执行 - 新增线别（未配置菜单）功能校验",
  "displayName": "新增线别（未配置菜单）",
  "route": "/iMES/Patchlineconfig/Index",
  "sourceRoute": "/iMES/Patchlineconfig/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 新增线别（未配置菜单）",
  "sourceFile": "src/views/iMES/Patchlineconfig/Index.vue",
  "dataSchema": {
    "columns": [
      "DIO",
      "IP",
      "Site",
      "Control",
      "Warning",
      "VALUE",
      "MechanicsName",
      "Crew",
      "value",
      "Machine",
      "LINE_NAME",
      "LOCATION",
      "PLANT",
      "ORGANIZE_ID",
      "SMT_NAME",
      "TYPE",
      "DESCRIPTION",
      "ENABLED"
    ],
    "required": [
      "DIO",
      "IP",
      "Site",
      "Control",
      "Warning",
      "MechanicsName",
      "Crew",
      "Machine",
      "LINE_NAME",
      "LOCATION",
      "PLANT",
      "ORGANIZE_ID",
      "SMT_NAME",
      "TYPE"
    ],
    "fields": [
      {
        "key": "DIO",
        "label": "DIO端口号",
        "required": true
      },
      {
        "key": "IP",
        "label": "设备IP",
        "required": true
      },
      {
        "key": "Site",
        "label": "开始站点",
        "required": true
      },
      {
        "key": "Control",
        "label": "管控方式",
        "required": true
      },
      {
        "key": "Warning",
        "label": "预警线",
        "required": true
      },
      {
        "key": "VALUE",
        "label": "站点2",
        "required": false
      },
      {
        "key": "MechanicsName",
        "label": "机械名称",
        "required": true
      },
      {
        "key": "Crew",
        "label": "贴片机组",
        "required": true
      },
      {
        "key": "value",
        "label": "停机端口",
        "required": false
      },
      {
        "key": "Machine",
        "label": "机台序号",
        "required": true
      },
      {
        "key": "LINE_NAME",
        "label": "线别名称",
        "required": true
      },
      {
        "key": "LOCATION",
        "label": "位置",
        "required": true
      },
      {
        "key": "PLANT",
        "label": "线别类型",
        "required": true
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "SMT_NAME",
        "label": "机台名称",
        "required": true
      },
      {
        "key": "TYPE",
        "label": "机台类型",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "机台描述",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否可用",
        "required": false
      }
    ],
    "example": {
      "DIO": "DIO端口号测试值",
      "IP": "设备IP测试值",
      "Site": "开始站点测试值",
      "Control": "管控方式测试值",
      "Warning": "预警线测试值",
      "VALUE": "站点2测试值",
      "MechanicsName": "自动化样例001",
      "Crew": "贴片机组测试值",
      "value": "停机端口测试值",
      "Machine": "1",
      "LINE_NAME": "自动化样例001",
      "LOCATION": "位置测试值",
      "PLANT": "线别类型测试值",
      "ORGANIZE_ID": "组织架构测试值",
      "SMT_NAME": "自动化样例001",
      "TYPE": "机台类型测试值",
      "DESCRIPTION": "自动化测试备注001",
      "ENABLED": "是否可用测试值"
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
      "key": "13fd57e65b-96f560b9a6-fdd32",
      "type": "新增表单",
      "name": "新增线别业务入口校验",
      "label": "新增线别",
      "handler": "addLine",
      "permission": "PatchlineconfigCreateLine",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增线别",
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
          "key": "DIO",
          "label": "DIO端口号",
          "required": true,
          "example": "DIO端口号测试值"
        },
        {
          "key": "IP",
          "label": "设备IP",
          "required": true,
          "example": "设备IP测试值"
        },
        {
          "key": "Site",
          "label": "开始站点",
          "required": true,
          "example": "开始站点测试值"
        },
        {
          "key": "Control",
          "label": "管控方式",
          "required": true,
          "example": "管控方式测试值"
        },
        {
          "key": "Warning",
          "label": "预警线",
          "required": true,
          "example": "预警线测试值"
        },
        {
          "key": "VALUE",
          "label": "站点2",
          "required": false,
          "example": "站点2测试值"
        },
        {
          "key": "MechanicsName",
          "label": "机械名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Crew",
          "label": "贴片机组",
          "required": true,
          "example": "贴片机组测试值"
        },
        {
          "key": "value",
          "label": "停机端口",
          "required": false,
          "example": "停机端口测试值"
        },
        {
          "key": "Machine",
          "label": "机台序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "LINE_NAME",
          "label": "线别名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LOCATION",
          "label": "位置",
          "required": true,
          "example": "位置测试值"
        },
        {
          "key": "PLANT",
          "label": "线别类型",
          "required": true,
          "example": "线别类型测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "SMT_NAME",
          "label": "机台名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "TYPE",
          "label": "机台类型",
          "required": true,
          "example": "机台类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "机台描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        }
      ],
      "testData": {
        "DIO": "DIO端口号测试值",
        "IP": "设备IP测试值",
        "Site": "开始站点测试值",
        "Control": "管控方式测试值",
        "Warning": "预警线测试值",
        "VALUE": "站点2测试值",
        "MechanicsName": "自动化样例001",
        "Crew": "贴片机组测试值",
        "value": "停机端口测试值",
        "Machine": "1",
        "LINE_NAME": "自动化样例001",
        "LOCATION": "位置测试值",
        "PLANT": "线别类型测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "SMT_NAME": "自动化样例001",
        "TYPE": "机台类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否可用测试值"
      }
    },
    {
      "key": "4aa22a22ac-b995f2cdb6-37ee5",
      "type": "编辑表单",
      "name": "修改线别业务入口校验",
      "label": "修改线别",
      "handler": "modifyLine",
      "permission": "PatchlineconfigCreateLine",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击修改线别",
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
          "key": "DIO",
          "label": "DIO端口号",
          "required": true,
          "example": "DIO端口号测试值"
        },
        {
          "key": "IP",
          "label": "设备IP",
          "required": true,
          "example": "设备IP测试值"
        },
        {
          "key": "Site",
          "label": "开始站点",
          "required": true,
          "example": "开始站点测试值"
        },
        {
          "key": "Control",
          "label": "管控方式",
          "required": true,
          "example": "管控方式测试值"
        },
        {
          "key": "Warning",
          "label": "预警线",
          "required": true,
          "example": "预警线测试值"
        },
        {
          "key": "VALUE",
          "label": "站点2",
          "required": false,
          "example": "站点2测试值"
        },
        {
          "key": "MechanicsName",
          "label": "机械名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Crew",
          "label": "贴片机组",
          "required": true,
          "example": "贴片机组测试值"
        },
        {
          "key": "value",
          "label": "停机端口",
          "required": false,
          "example": "停机端口测试值"
        },
        {
          "key": "Machine",
          "label": "机台序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "LINE_NAME",
          "label": "线别名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LOCATION",
          "label": "位置",
          "required": true,
          "example": "位置测试值"
        },
        {
          "key": "PLANT",
          "label": "线别类型",
          "required": true,
          "example": "线别类型测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "SMT_NAME",
          "label": "机台名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "TYPE",
          "label": "机台类型",
          "required": true,
          "example": "机台类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "机台描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        }
      ],
      "testData": {
        "DIO": "DIO端口号测试值",
        "IP": "设备IP测试值",
        "Site": "开始站点测试值",
        "Control": "管控方式测试值",
        "Warning": "预警线测试值",
        "VALUE": "站点2测试值",
        "MechanicsName": "自动化样例001",
        "Crew": "贴片机组测试值",
        "value": "停机端口测试值",
        "Machine": "1",
        "LINE_NAME": "自动化样例001",
        "LOCATION": "位置测试值",
        "PLANT": "线别类型测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "SMT_NAME": "自动化样例001",
        "TYPE": "机台类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否可用测试值"
      }
    },
    {
      "key": "13fd57e65b-ddb03228ba-dc3c4",
      "type": "新增表单",
      "name": "新增机台业务入口校验",
      "label": "新增机台",
      "handler": "addSMT",
      "permission": "PatchlineconfigCreateStation",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增机台",
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
          "key": "DIO",
          "label": "DIO端口号",
          "required": true,
          "example": "DIO端口号测试值"
        },
        {
          "key": "IP",
          "label": "设备IP",
          "required": true,
          "example": "设备IP测试值"
        },
        {
          "key": "Site",
          "label": "开始站点",
          "required": true,
          "example": "开始站点测试值"
        },
        {
          "key": "Control",
          "label": "管控方式",
          "required": true,
          "example": "管控方式测试值"
        },
        {
          "key": "Warning",
          "label": "预警线",
          "required": true,
          "example": "预警线测试值"
        },
        {
          "key": "VALUE",
          "label": "站点2",
          "required": false,
          "example": "站点2测试值"
        },
        {
          "key": "MechanicsName",
          "label": "机械名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Crew",
          "label": "贴片机组",
          "required": true,
          "example": "贴片机组测试值"
        },
        {
          "key": "value",
          "label": "停机端口",
          "required": false,
          "example": "停机端口测试值"
        },
        {
          "key": "Machine",
          "label": "机台序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "LINE_NAME",
          "label": "线别名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LOCATION",
          "label": "位置",
          "required": true,
          "example": "位置测试值"
        },
        {
          "key": "PLANT",
          "label": "线别类型",
          "required": true,
          "example": "线别类型测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "SMT_NAME",
          "label": "机台名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "TYPE",
          "label": "机台类型",
          "required": true,
          "example": "机台类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "机台描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        }
      ],
      "testData": {
        "DIO": "DIO端口号测试值",
        "IP": "设备IP测试值",
        "Site": "开始站点测试值",
        "Control": "管控方式测试值",
        "Warning": "预警线测试值",
        "VALUE": "站点2测试值",
        "MechanicsName": "自动化样例001",
        "Crew": "贴片机组测试值",
        "value": "停机端口测试值",
        "Machine": "1",
        "LINE_NAME": "自动化样例001",
        "LOCATION": "位置测试值",
        "PLANT": "线别类型测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "SMT_NAME": "自动化样例001",
        "TYPE": "机台类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否可用测试值"
      }
    },
    {
      "key": "4aa22a22ac-5e0405fb97-e2448",
      "type": "编辑表单",
      "name": "修改机台业务入口校验",
      "label": "修改机台",
      "handler": "modifySMT",
      "permission": "PatchlineconfigCreateStation",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击修改机台",
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
          "key": "DIO",
          "label": "DIO端口号",
          "required": true,
          "example": "DIO端口号测试值"
        },
        {
          "key": "IP",
          "label": "设备IP",
          "required": true,
          "example": "设备IP测试值"
        },
        {
          "key": "Site",
          "label": "开始站点",
          "required": true,
          "example": "开始站点测试值"
        },
        {
          "key": "Control",
          "label": "管控方式",
          "required": true,
          "example": "管控方式测试值"
        },
        {
          "key": "Warning",
          "label": "预警线",
          "required": true,
          "example": "预警线测试值"
        },
        {
          "key": "VALUE",
          "label": "站点2",
          "required": false,
          "example": "站点2测试值"
        },
        {
          "key": "MechanicsName",
          "label": "机械名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Crew",
          "label": "贴片机组",
          "required": true,
          "example": "贴片机组测试值"
        },
        {
          "key": "value",
          "label": "停机端口",
          "required": false,
          "example": "停机端口测试值"
        },
        {
          "key": "Machine",
          "label": "机台序号",
          "required": true,
          "example": "1"
        },
        {
          "key": "LINE_NAME",
          "label": "线别名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LOCATION",
          "label": "位置",
          "required": true,
          "example": "位置测试值"
        },
        {
          "key": "PLANT",
          "label": "线别类型",
          "required": true,
          "example": "线别类型测试值"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "SMT_NAME",
          "label": "机台名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "TYPE",
          "label": "机台类型",
          "required": true,
          "example": "机台类型测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "机台描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "ENABLED",
          "label": "是否可用",
          "required": false,
          "example": "是否可用测试值"
        }
      ],
      "testData": {
        "DIO": "DIO端口号测试值",
        "IP": "设备IP测试值",
        "Site": "开始站点测试值",
        "Control": "管控方式测试值",
        "Warning": "预警线测试值",
        "VALUE": "站点2测试值",
        "MechanicsName": "自动化样例001",
        "Crew": "贴片机组测试值",
        "value": "停机端口测试值",
        "Machine": "1",
        "LINE_NAME": "自动化样例001",
        "LOCATION": "位置测试值",
        "PLANT": "线别类型测试值",
        "ORGANIZE_ID": "组织架构测试值",
        "SMT_NAME": "自动化样例001",
        "TYPE": "机台类型测试值",
        "DESCRIPTION": "自动化测试备注001",
        "ENABLED": "是否可用测试值"
      }
    }
  ]
});
