// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-equip-wave-def-index-f541e4",
  "name": "旧版制造执行 - 状态（未配置菜单）功能校验",
  "displayName": "状态（未配置菜单）",
  "route": "/iMES/SfcsEquipWaveDef/Index",
  "sourceRoute": "/iMES/SfcsEquipWaveDef/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 状态（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsEquipWaveDef/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "WO_NO",
      "WAVE",
      "PRESSURE",
      "SPEED",
      "CONER",
      "FLOW",
      "FLUX_FROM",
      "SOLDERING_FROM",
      "COLLECT_TIME",
      "CHECK_RESULT",
      "REMARK",
      "DEAL",
      "TYPE",
      "OTHER",
      "POINT",
      "COUNT",
      "STATUS"
    ],
    "required": [
      "LINE_ID",
      "WO_NO",
      "COLLECT_TIME",
      "DEAL",
      "TYPE",
      "POINT",
      "COUNT"
    ],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "线体",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单",
        "required": true
      },
      {
        "key": "WAVE",
        "label": "单双波",
        "required": false
      },
      {
        "key": "PRESSURE",
        "label": "喷雾气压",
        "required": false
      },
      {
        "key": "SPEED",
        "label": "链速",
        "required": false
      },
      {
        "key": "CONER",
        "label": "仰角",
        "required": false
      },
      {
        "key": "FLOW",
        "label": "流量",
        "required": false
      },
      {
        "key": "FLUX_FROM",
        "label": "助焊剂厂家",
        "required": false
      },
      {
        "key": "SOLDERING_FROM",
        "label": "锡焊厂家",
        "required": false
      },
      {
        "key": "COLLECT_TIME",
        "label": "抽检时间",
        "required": true
      },
      {
        "key": "CHECK_RESULT",
        "label": "审核结果",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "备注",
        "required": false
      },
      {
        "key": "DEAL",
        "label": "处理方案",
        "required": true
      },
      {
        "key": "TYPE",
        "label": "元件位置",
        "required": true
      },
      {
        "key": "OTHER",
        "label": "元件封装",
        "required": false
      },
      {
        "key": "POINT",
        "label": "元件封装",
        "required": true
      },
      {
        "key": "COUNT",
        "label": "测试值",
        "required": true
      },
      {
        "key": "STATUS",
        "label": "状态",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "线体测试值",
      "WO_NO": "工单测试值",
      "WAVE": "单双波测试值",
      "PRESSURE": "喷雾气压测试值",
      "SPEED": "链速测试值",
      "CONER": "仰角测试值",
      "FLOW": "流量测试值",
      "FLUX_FROM": "助焊剂厂家测试值",
      "SOLDERING_FROM": "锡焊厂家测试值",
      "COLLECT_TIME": "2026-08-01",
      "CHECK_RESULT": "审核结果测试值",
      "REMARK": "自动化测试备注001",
      "DEAL": "处理方案测试值",
      "TYPE": "元件位置测试值",
      "OTHER": "元件封装测试值",
      "POINT": "元件封装测试值",
      "COUNT": "测试值测试值",
      "STATUS": "Y"
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
        "LINE_ID": "线体测试值",
        "WO_NO": "工单测试值",
        "WAVE": "单双波测试值",
        "PRESSURE": "喷雾气压测试值",
        "SPEED": "链速测试值",
        "CONER": "仰角测试值",
        "FLOW": "流量测试值",
        "FLUX_FROM": "助焊剂厂家测试值",
        "SOLDERING_FROM": "锡焊厂家测试值",
        "COLLECT_TIME": "2026-08-01",
        "CHECK_RESULT": "审核结果测试值",
        "REMARK": "自动化测试备注001",
        "DEAL": "处理方案测试值",
        "TYPE": "元件位置测试值",
        "OTHER": "元件封装测试值",
        "POINT": "元件封装测试值",
        "COUNT": "测试值测试值",
        "STATUS": "Y"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "WAVE",
          "label": "单双波",
          "required": false,
          "example": "单双波测试值"
        },
        {
          "key": "PRESSURE",
          "label": "喷雾气压",
          "required": false,
          "example": "喷雾气压测试值"
        },
        {
          "key": "SPEED",
          "label": "链速",
          "required": false,
          "example": "链速测试值"
        },
        {
          "key": "CONER",
          "label": "仰角",
          "required": false,
          "example": "仰角测试值"
        },
        {
          "key": "FLOW",
          "label": "流量",
          "required": false,
          "example": "流量测试值"
        },
        {
          "key": "FLUX_FROM",
          "label": "助焊剂厂家",
          "required": false,
          "example": "助焊剂厂家测试值"
        },
        {
          "key": "SOLDERING_FROM",
          "label": "锡焊厂家",
          "required": false,
          "example": "锡焊厂家测试值"
        },
        {
          "key": "COLLECT_TIME",
          "label": "抽检时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CHECK_RESULT",
          "label": "审核结果",
          "required": false,
          "example": "审核结果测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "DEAL",
          "label": "处理方案",
          "required": true,
          "example": "处理方案测试值"
        },
        {
          "key": "TYPE",
          "label": "元件位置",
          "required": true,
          "example": "元件位置测试值"
        },
        {
          "key": "OTHER",
          "label": "元件封装",
          "required": false,
          "example": "元件封装测试值"
        },
        {
          "key": "POINT",
          "label": "元件封装",
          "required": true,
          "example": "元件封装测试值"
        },
        {
          "key": "COUNT",
          "label": "测试值",
          "required": true,
          "example": "测试值测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "WO_NO": "工单测试值",
        "WAVE": "单双波测试值",
        "PRESSURE": "喷雾气压测试值",
        "SPEED": "链速测试值",
        "CONER": "仰角测试值",
        "FLOW": "流量测试值",
        "FLUX_FROM": "助焊剂厂家测试值",
        "SOLDERING_FROM": "锡焊厂家测试值",
        "COLLECT_TIME": "2026-08-01",
        "CHECK_RESULT": "审核结果测试值",
        "REMARK": "自动化测试备注001",
        "DEAL": "处理方案测试值",
        "TYPE": "元件位置测试值",
        "OTHER": "元件封装测试值",
        "POINT": "元件封装测试值",
        "COUNT": "测试值测试值",
        "STATUS": "Y"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-a7f81",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "",
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
          "key": "LINE_ID",
          "label": "线体",
          "required": true,
          "example": "线体测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单",
          "required": true,
          "example": "工单测试值"
        },
        {
          "key": "WAVE",
          "label": "单双波",
          "required": false,
          "example": "单双波测试值"
        },
        {
          "key": "PRESSURE",
          "label": "喷雾气压",
          "required": false,
          "example": "喷雾气压测试值"
        },
        {
          "key": "SPEED",
          "label": "链速",
          "required": false,
          "example": "链速测试值"
        },
        {
          "key": "CONER",
          "label": "仰角",
          "required": false,
          "example": "仰角测试值"
        },
        {
          "key": "FLOW",
          "label": "流量",
          "required": false,
          "example": "流量测试值"
        },
        {
          "key": "FLUX_FROM",
          "label": "助焊剂厂家",
          "required": false,
          "example": "助焊剂厂家测试值"
        },
        {
          "key": "SOLDERING_FROM",
          "label": "锡焊厂家",
          "required": false,
          "example": "锡焊厂家测试值"
        },
        {
          "key": "COLLECT_TIME",
          "label": "抽检时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CHECK_RESULT",
          "label": "审核结果",
          "required": false,
          "example": "审核结果测试值"
        },
        {
          "key": "REMARK",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "DEAL",
          "label": "处理方案",
          "required": true,
          "example": "处理方案测试值"
        },
        {
          "key": "TYPE",
          "label": "元件位置",
          "required": true,
          "example": "元件位置测试值"
        },
        {
          "key": "OTHER",
          "label": "元件封装",
          "required": false,
          "example": "元件封装测试值"
        },
        {
          "key": "POINT",
          "label": "元件封装",
          "required": true,
          "example": "元件封装测试值"
        },
        {
          "key": "COUNT",
          "label": "测试值",
          "required": true,
          "example": "测试值测试值"
        },
        {
          "key": "STATUS",
          "label": "状态",
          "required": false,
          "example": "Y"
        }
      ],
      "testData": {
        "LINE_ID": "线体测试值",
        "WO_NO": "工单测试值",
        "WAVE": "单双波测试值",
        "PRESSURE": "喷雾气压测试值",
        "SPEED": "链速测试值",
        "CONER": "仰角测试值",
        "FLOW": "流量测试值",
        "FLUX_FROM": "助焊剂厂家测试值",
        "SOLDERING_FROM": "锡焊厂家测试值",
        "COLLECT_TIME": "2026-08-01",
        "CHECK_RESULT": "审核结果测试值",
        "REMARK": "自动化测试备注001",
        "DEAL": "处理方案测试值",
        "TYPE": "元件位置测试值",
        "OTHER": "元件封装测试值",
        "POINT": "元件封装测试值",
        "COUNT": "测试值测试值",
        "STATUS": "Y"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-05cc6",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "checkClick(scope.row)",
      "permission": "SfcsEquipWaveDefMstCheck",
      "menuTriggerLabel": "",
      "rowAction": true,
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
      "key": "726b6ec55f-3755f56f2f-78e8f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row)",
      "permission": "SfcsEquipWaveDefMstDel",
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
