// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-produce-placement-index-d4f485",
  "name": "制造执行 - 生产料单管理功能校验",
  "displayName": "生产料单管理",
  "route": "/iMES6/ProducePlacement/Index",
  "sourceRoute": "/iMES6/ProducePlacement/Index",
  "menuCode": "iMES6_ProducePlacement",
  "breadcrumb": "生产管理 / 上料防错 / 生产料单管理",
  "sourceFile": "src/views/iMES6/ProducePlacement/Index.vue",
  "dataSchema": {
    "columns": [
      "Placement",
      "LineCode",
      "StationId",
      "LineName",
      "Enabled",
      "PcbSide",
      "PartNo",
      "Version",
      "Description",
      "MultiNo",
      "StandardCapacity",
      "Checked",
      "CheckedBy",
      "CheckedTime"
    ],
    "required": [
      "Placement",
      "StationId",
      "LineName",
      "PartNo",
      "MultiNo"
    ],
    "fields": [
      {
        "key": "Placement",
        "label": "料单名称",
        "required": true
      },
      {
        "key": "LineCode",
        "label": "区域编码",
        "required": false
      },
      {
        "key": "StationId",
        "label": "机台",
        "required": true
      },
      {
        "key": "LineName",
        "label": "区域名称",
        "required": true
      },
      {
        "key": "Enabled",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "PcbSide",
        "label": "板型",
        "required": false
      },
      {
        "key": "PartNo",
        "label": "成品料号",
        "required": true
      },
      {
        "key": "Version",
        "label": "版本号",
        "required": false
      },
      {
        "key": "Description",
        "label": "料单说明",
        "required": false
      },
      {
        "key": "MultiNo",
        "label": "拼板数",
        "required": true
      },
      {
        "key": "StandardCapacity",
        "label": "标准产能(pcs/H)",
        "required": false
      },
      {
        "key": "Checked",
        "label": "是否检验",
        "required": false
      },
      {
        "key": "CheckedBy",
        "label": "检验人",
        "required": false
      },
      {
        "key": "CheckedTime",
        "label": "检验时间",
        "required": false
      }
    ],
    "example": {
      "Placement": "自动化样例001",
      "LineCode": "AT-001",
      "StationId": "机台测试值",
      "LineName": "自动化样例001",
      "Enabled": "是否激活测试值",
      "PcbSide": "板型测试值",
      "PartNo": "AT-001",
      "Version": "版本号测试值",
      "Description": "自动化测试备注001",
      "MultiNo": "拼板数测试值",
      "StandardCapacity": "标准产能(pcs/H)测试值",
      "Checked": "是否检验测试值",
      "CheckedBy": "检验人测试值",
      "CheckedTime": "2026-08-01"
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
        "Placement": "自动化样例001",
        "LineCode": "AT-001",
        "StationId": "机台测试值",
        "LineName": "自动化样例001",
        "Enabled": "是否激活测试值",
        "PcbSide": "板型测试值",
        "PartNo": "AT-001",
        "Version": "版本号测试值",
        "Description": "自动化测试备注001",
        "MultiNo": "拼板数测试值",
        "StandardCapacity": "标准产能(pcs/H)测试值",
        "Checked": "是否检验测试值",
        "CheckedBy": "检验人测试值",
        "CheckedTime": "2026-08-01"
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
          "key": "Placement",
          "label": "料单名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "LineCode",
          "label": "区域编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "StationId",
          "label": "机台",
          "required": true,
          "example": "机台测试值"
        },
        {
          "key": "LineName",
          "label": "区域名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Enabled",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "PcbSide",
          "label": "板型",
          "required": false,
          "example": "板型测试值"
        },
        {
          "key": "PartNo",
          "label": "成品料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Version",
          "label": "版本号",
          "required": false,
          "example": "版本号测试值"
        },
        {
          "key": "Description",
          "label": "料单说明",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MultiNo",
          "label": "拼板数",
          "required": true,
          "example": "拼板数测试值"
        },
        {
          "key": "StandardCapacity",
          "label": "标准产能(pcs/H)",
          "required": false,
          "example": "标准产能(pcs/H)测试值"
        },
        {
          "key": "Checked",
          "label": "是否检验",
          "required": false,
          "example": "是否检验测试值"
        },
        {
          "key": "CheckedBy",
          "label": "检验人",
          "required": false,
          "example": "检验人测试值"
        },
        {
          "key": "CheckedTime",
          "label": "检验时间",
          "required": false,
          "example": "2026-08-01"
        }
      ],
      "testData": {
        "Placement": "自动化样例001",
        "LineCode": "AT-001",
        "StationId": "机台测试值",
        "LineName": "自动化样例001",
        "Enabled": "是否激活测试值",
        "PcbSide": "板型测试值",
        "PartNo": "AT-001",
        "Version": "版本号测试值",
        "Description": "自动化测试备注001",
        "MultiNo": "拼板数测试值",
        "StandardCapacity": "标准产能(pcs/H)测试值",
        "Checked": "是否检验测试值",
        "CheckedBy": "检验人测试值",
        "CheckedTime": "2026-08-01"
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
