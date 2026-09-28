// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-process-configuration-part-work-time-index-cd7c45",
  "name": "制造执行 - 产品标准工时功能校验",
  "displayName": "产品标准工时",
  "route": "/iMES6/ProcessConfiguration/PartWorkTime/Index",
  "sourceRoute": "/iMES6/ProcessConfiguration/PartWorkTime/Index",
  "menuCode": "iMES6_PartWorkTime",
  "breadcrumb": "生产管理 / 生产计划 / 产品标准工时",
  "sourceFile": "src/views/iMES6/ProcessConfiguration/PartWorkTime/Index.vue",
  "dataSchema": {
    "columns": [
      "PartNo",
      "PartName",
      "PartDesc",
      "Version",
      "CycleTime",
      "StandardHuman",
      "StandardCapacity",
      "StanderUpph",
      "Upph",
      "Effic",
      "FirstTime",
      "Remark"
    ],
    "required": [
      "PartName",
      "CycleTime",
      "StandardHuman",
      "StandardCapacity",
      "Upph",
      "Effic",
      "FirstTime"
    ],
    "fields": [
      {
        "key": "PartNo",
        "label": "产品料号",
        "required": false
      },
      {
        "key": "PartName",
        "label": "产品名称",
        "required": true
      },
      {
        "key": "PartDesc",
        "label": "产品规格",
        "required": false
      },
      {
        "key": "Version",
        "label": "版本",
        "required": false
      },
      {
        "key": "CycleTime",
        "label": "标准工时(s/pcs)",
        "required": true
      },
      {
        "key": "StandardHuman",
        "label": "标准人力",
        "required": true
      },
      {
        "key": "StandardCapacity",
        "label": "标准产能(pcs/H)",
        "required": true
      },
      {
        "key": "StanderUpph",
        "label": "标准UPPH",
        "required": false
      },
      {
        "key": "Upph",
        "label": "UPPH(pcs/H/人)",
        "required": true
      },
      {
        "key": "Effic",
        "label": "效率(%)",
        "required": true
      },
      {
        "key": "FirstTime",
        "label": "准备时间(分钟)",
        "required": true
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "PartNo": "AT-001",
      "PartName": "自动化样例001",
      "PartDesc": "产品规格测试值",
      "Version": "版本测试值",
      "CycleTime": "标准工时(s/pcs)测试值",
      "StandardHuman": "标准人力测试值",
      "StandardCapacity": "标准产能(pcs/H)测试值",
      "StanderUpph": "标准UPPH测试值",
      "Upph": "UPPH(pcs/H/人)测试值",
      "Effic": "效率(%)测试值",
      "FirstTime": "准备时间(分钟)测试值",
      "Remark": "自动化测试备注001"
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
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "产品规格测试值",
        "Version": "版本测试值",
        "CycleTime": "标准工时(s/pcs)测试值",
        "StandardHuman": "标准人力测试值",
        "StandardCapacity": "标准产能(pcs/H)测试值",
        "StanderUpph": "标准UPPH测试值",
        "Upph": "UPPH(pcs/H/人)测试值",
        "Effic": "效率(%)测试值",
        "FirstTime": "准备时间(分钟)测试值",
        "Remark": "自动化测试备注001"
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
          "key": "PartNo",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "产品名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartDesc",
          "label": "产品规格",
          "required": false,
          "example": "产品规格测试值"
        },
        {
          "key": "Version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "CycleTime",
          "label": "标准工时(s/pcs)",
          "required": true,
          "example": "标准工时(s/pcs)测试值"
        },
        {
          "key": "StandardHuman",
          "label": "标准人力",
          "required": true,
          "example": "标准人力测试值"
        },
        {
          "key": "StandardCapacity",
          "label": "标准产能(pcs/H)",
          "required": true,
          "example": "标准产能(pcs/H)测试值"
        },
        {
          "key": "StanderUpph",
          "label": "标准UPPH",
          "required": false,
          "example": "标准UPPH测试值"
        },
        {
          "key": "Upph",
          "label": "UPPH(pcs/H/人)",
          "required": true,
          "example": "UPPH(pcs/H/人)测试值"
        },
        {
          "key": "Effic",
          "label": "效率(%)",
          "required": true,
          "example": "效率(%)测试值"
        },
        {
          "key": "FirstTime",
          "label": "准备时间(分钟)",
          "required": true,
          "example": "准备时间(分钟)测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "产品规格测试值",
        "Version": "版本测试值",
        "CycleTime": "标准工时(s/pcs)测试值",
        "StandardHuman": "标准人力测试值",
        "StandardCapacity": "标准产能(pcs/H)测试值",
        "StanderUpph": "标准UPPH测试值",
        "Upph": "UPPH(pcs/H/人)测试值",
        "Effic": "效率(%)测试值",
        "FirstTime": "准备时间(分钟)测试值",
        "Remark": "自动化测试备注001"
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
    },
    {
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
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
          "key": "PartNo",
          "label": "产品料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PartName",
          "label": "产品名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "PartDesc",
          "label": "产品规格",
          "required": false,
          "example": "产品规格测试值"
        },
        {
          "key": "Version",
          "label": "版本",
          "required": false,
          "example": "版本测试值"
        },
        {
          "key": "CycleTime",
          "label": "标准工时(s/pcs)",
          "required": true,
          "example": "标准工时(s/pcs)测试值"
        },
        {
          "key": "StandardHuman",
          "label": "标准人力",
          "required": true,
          "example": "标准人力测试值"
        },
        {
          "key": "StandardCapacity",
          "label": "标准产能(pcs/H)",
          "required": true,
          "example": "标准产能(pcs/H)测试值"
        },
        {
          "key": "StanderUpph",
          "label": "标准UPPH",
          "required": false,
          "example": "标准UPPH测试值"
        },
        {
          "key": "Upph",
          "label": "UPPH(pcs/H/人)",
          "required": true,
          "example": "UPPH(pcs/H/人)测试值"
        },
        {
          "key": "Effic",
          "label": "效率(%)",
          "required": true,
          "example": "效率(%)测试值"
        },
        {
          "key": "FirstTime",
          "label": "准备时间(分钟)",
          "required": true,
          "example": "准备时间(分钟)测试值"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "PartNo": "AT-001",
        "PartName": "自动化样例001",
        "PartDesc": "产品规格测试值",
        "Version": "版本测试值",
        "CycleTime": "标准工时(s/pcs)测试值",
        "StandardHuman": "标准人力测试值",
        "StandardCapacity": "标准产能(pcs/H)测试值",
        "StanderUpph": "标准UPPH测试值",
        "Upph": "UPPH(pcs/H/人)测试值",
        "Effic": "效率(%)测试值",
        "FirstTime": "准备时间(分钟)测试值",
        "Remark": "自动化测试备注001"
      }
    }
  ]
});
