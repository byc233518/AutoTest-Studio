// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "mes-page-i-mes6-imes-product-rework-components-process-rework-index-fe2625",
  "name": "制造执行 - 制程返工功能校验",
  "displayName": "制程返工",
  "route": "/iMES6/ImesProductRework/components/ProcessReworkIndex",
  "sourceRoute": "/iMES6/ImesProductRework/components/ProcessReworkIndex",
  "menuCode": "ProcessReworkRework",
  "breadcrumb": "生产管理 / 维修返工 / 制程返工",
  "sourceFile": "src/views/iMES6/ImesProductRework/components/ProcessReworkIndex.vue",
  "dataSchema": {
    "columns": [
      "LineId",
      "ReworkWoNo",
      "PartNo",
      "PartDesc",
      "RouteName",
      "ReworkOperationId",
      "WipQty",
      "Qty",
      "barcode",
      "TimeLenth",
      "Remark",
      "IsDelResource"
    ],
    "required": [
      "LineId",
      "ReworkWoNo",
      "ReworkOperationId",
      "Qty"
    ],
    "fields": [
      {
        "key": "LineId",
        "label": "区域",
        "required": true
      },
      {
        "key": "ReworkWoNo",
        "label": "工单",
        "required": true
      },
      {
        "key": "PartNo",
        "label": "料号",
        "required": false
      },
      {
        "key": "PartDesc",
        "label": "规格",
        "required": false
      },
      {
        "key": "RouteName",
        "label": "制程",
        "required": false
      },
      {
        "key": "ReworkOperationId",
        "label": "目标工序",
        "required": true
      },
      {
        "key": "WipQty",
        "label": "在制品数",
        "required": false
      },
      {
        "key": "Qty",
        "label": "返工数",
        "required": true
      },
      {
        "key": "barcode",
        "label": "返工条码",
        "required": false
      },
      {
        "key": "TimeLenth",
        "label": "返工用时(分钟)",
        "required": false
      },
      {
        "key": "Remark",
        "label": "返工说明",
        "required": false
      },
      {
        "key": "IsDelResource",
        "label": "解绑部件种类",
        "required": false
      }
    ],
    "example": {
      "LineId": "区域测试值",
      "ReworkWoNo": "工单测试值",
      "PartNo": "AT-001",
      "PartDesc": "规格测试值",
      "RouteName": "制程测试值",
      "ReworkOperationId": "目标工序测试值",
      "WipQty": "在制品数测试值",
      "Qty": "返工数测试值",
      "barcode": "AT-001",
      "TimeLenth": "返工用时(分钟)测试值",
      "Remark": "自动化测试备注001",
      "IsDelResource": "解绑部件种类测试值"
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
        "LineId": "区域测试值",
        "ReworkWoNo": "工单测试值",
        "PartNo": "AT-001",
        "PartDesc": "规格测试值",
        "RouteName": "制程测试值",
        "ReworkOperationId": "目标工序测试值",
        "WipQty": "在制品数测试值",
        "Qty": "返工数测试值",
        "barcode": "AT-001",
        "TimeLenth": "返工用时(分钟)测试值",
        "Remark": "自动化测试备注001",
        "IsDelResource": "解绑部件种类测试值"
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
      "key": "3d81345303-3d81345303-05187",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "resetForm",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "只读校验",
      "steps": [
        "填写一个可编辑查询条件",
        "点击重置",
        "校验查询条件恢复初始值"
      ],
      "assertions": [
        "重置入口可用",
        "已填写查询条件恢复初始值"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-09cbc97ae2-50b21",
      "type": "业务动作",
      "name": "提交业务入口校验",
      "label": "提交",
      "handler": "submitForm",
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
    },
    {
      "key": "726b6ec55f-3755f56f2f-d150b",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeBarcode('package', $index, row)",
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
