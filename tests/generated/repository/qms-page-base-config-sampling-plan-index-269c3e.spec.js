// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "qms-page-base-config-sampling-plan-index-269c3e",
  "name": "质量管理 - 抽样方案功能校验",
  "displayName": "抽样方案",
  "route": "/BaseConfig/SamplingPlan/Index",
  "sourceRoute": "/BaseConfig/SamplingPlan/Index",
  "menuCode": "QMS_SamplingPlan",
  "breadcrumb": "功能菜单（QMS2） / 基础数据 / 抽样方案",
  "sourceFile": "src/views/BaseConfig/SamplingPlan/Index.vue",
  "dataSchema": {
    "columns": [
      "StandardType",
      "SamplingPlanName",
      "StandardId",
      "Enabled",
      "Remark",
      "SourceMstName",
      "SourceInspectionLevel",
      "TargetMstName",
      "TargetInspectionLevel"
    ],
    "required": [
      "StandardType",
      "SamplingPlanName",
      "StandardId",
      "SourceMstName",
      "SourceInspectionLevel",
      "TargetMstName",
      "TargetInspectionLevel"
    ],
    "fields": [
      {
        "key": "StandardType",
        "label": "抽样标准类型",
        "required": true
      },
      {
        "key": "SamplingPlanName",
        "label": "抽样方案名称",
        "required": true
      },
      {
        "key": "StandardId",
        "label": "检验标准名称",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "Remark",
        "label": "说明",
        "required": false
      },
      {
        "key": "SourceMstName",
        "label": "来源抽样方案",
        "required": true
      },
      {
        "key": "SourceInspectionLevel",
        "label": "来源检验等级",
        "required": true
      },
      {
        "key": "TargetMstName",
        "label": "目标抽样方案",
        "required": true
      },
      {
        "key": "TargetInspectionLevel",
        "label": "目标检验等级",
        "required": true
      }
    ],
    "example": {
      "StandardType": "抽样标准类型测试值",
      "SamplingPlanName": "自动化样例001",
      "StandardId": "自动化样例001",
      "Enabled": "Y",
      "Remark": "自动化测试备注001",
      "SourceMstName": "来源抽样方案测试值",
      "SourceInspectionLevel": "来源检验等级测试值",
      "TargetMstName": "目标抽样方案测试值",
      "TargetInspectionLevel": "目标检验等级测试值"
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
        "StandardType": "抽样标准类型测试值",
        "SamplingPlanName": "自动化样例001",
        "StandardId": "自动化样例001",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "SourceMstName": "来源抽样方案测试值",
        "SourceInspectionLevel": "来源检验等级测试值",
        "TargetMstName": "目标抽样方案测试值",
        "TargetInspectionLevel": "目标检验等级测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-526a8",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor",
      "permission": "Add",
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
          "key": "StandardType",
          "label": "抽样标准类型",
          "required": true,
          "example": "抽样标准类型测试值"
        },
        {
          "key": "SamplingPlanName",
          "label": "抽样方案名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StandardId",
          "label": "检验标准名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "SourceMstName",
          "label": "来源抽样方案",
          "required": true,
          "example": "来源抽样方案测试值"
        },
        {
          "key": "SourceInspectionLevel",
          "label": "来源检验等级",
          "required": true,
          "example": "来源检验等级测试值"
        },
        {
          "key": "TargetMstName",
          "label": "目标抽样方案",
          "required": true,
          "example": "目标抽样方案测试值"
        },
        {
          "key": "TargetInspectionLevel",
          "label": "目标检验等级",
          "required": true,
          "example": "目标检验等级测试值"
        }
      ],
      "testData": {
        "StandardType": "抽样标准类型测试值",
        "SamplingPlanName": "自动化样例001",
        "StandardId": "自动化样例001",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "SourceMstName": "来源抽样方案测试值",
        "SourceInspectionLevel": "来源检验等级测试值",
        "TargetMstName": "目标抽样方案测试值",
        "TargetInspectionLevel": "目标检验等级测试值"
      }
    },
    {
      "key": "faea8c1db9-27d960ff5e-007d5",
      "type": "查看详情",
      "name": "复制明细业务入口校验",
      "label": "复制明细",
      "handler": "openCopyEditor",
      "permission": "Copy",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击复制明细",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
      "permission": "Edit",
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
          "key": "StandardType",
          "label": "抽样标准类型",
          "required": true,
          "example": "抽样标准类型测试值"
        },
        {
          "key": "SamplingPlanName",
          "label": "抽样方案名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "StandardId",
          "label": "检验标准名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "SourceMstName",
          "label": "来源抽样方案",
          "required": true,
          "example": "来源抽样方案测试值"
        },
        {
          "key": "SourceInspectionLevel",
          "label": "来源检验等级",
          "required": true,
          "example": "来源检验等级测试值"
        },
        {
          "key": "TargetMstName",
          "label": "目标抽样方案",
          "required": true,
          "example": "目标抽样方案测试值"
        },
        {
          "key": "TargetInspectionLevel",
          "label": "目标检验等级",
          "required": true,
          "example": "目标检验等级测试值"
        }
      ],
      "testData": {
        "StandardType": "抽样标准类型测试值",
        "SamplingPlanName": "自动化样例001",
        "StandardId": "自动化样例001",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "SourceMstName": "来源抽样方案测试值",
        "SourceInspectionLevel": "来源检验等级测试值",
        "TargetMstName": "目标抽样方案测试值",
        "TargetInspectionLevel": "目标检验等级测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
