// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-cutomers-complaint-index-f40faa",
  "name": "旧版制造执行 - 选择线别（未配置菜单）功能校验",
  "displayName": "选择线别（未配置菜单）",
  "route": "/iMES/SfcsCutomersComplaint/Index",
  "sourceRoute": "/iMES/SfcsCutomersComplaint/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 选择线别（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsCutomersComplaint/Index.vue",
  "dataSchema": {
    "columns": [
      "LINE_ID",
      "WO_NO",
      "PART_NO",
      "MODEL",
      "PRODUCT_DATE",
      "REWORK_QTY",
      "RETURN_QTY",
      "COMPLAINT_DATE",
      "CUSTOMERS_ID",
      "CONTENT",
      "CAUSE",
      "INTERIM_MEASURES",
      "LONG_MEASURES",
      "REMARKS"
    ],
    "required": [
      "LINE_ID",
      "PART_NO",
      "MODEL",
      "PRODUCT_DATE",
      "REWORK_QTY",
      "RETURN_QTY",
      "COMPLAINT_DATE",
      "CUSTOMERS_ID",
      "CONTENT"
    ],
    "fields": [
      {
        "key": "LINE_ID",
        "label": "产线",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": true
      },
      {
        "key": "MODEL",
        "label": "机种",
        "required": true
      },
      {
        "key": "PRODUCT_DATE",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "REWORK_QTY",
        "label": "返工数量",
        "required": true
      },
      {
        "key": "RETURN_QTY",
        "label": "退货数量",
        "required": true
      },
      {
        "key": "COMPLAINT_DATE",
        "label": "投诉日期",
        "required": true
      },
      {
        "key": "CUSTOMERS_ID",
        "label": "客户",
        "required": true
      },
      {
        "key": "CONTENT",
        "label": "投诉内容",
        "required": true
      },
      {
        "key": "CAUSE",
        "label": "原因分析",
        "required": false
      },
      {
        "key": "INTERIM_MEASURES",
        "label": "临时纠正措施",
        "required": false
      },
      {
        "key": "LONG_MEASURES",
        "label": "长期预防措施",
        "required": false
      },
      {
        "key": "REMARKS",
        "label": "备注",
        "required": false
      }
    ],
    "example": {
      "LINE_ID": "产线测试值",
      "WO_NO": "AT-001",
      "PART_NO": "AT-001",
      "MODEL": "机种测试值",
      "PRODUCT_DATE": "2026-08-01",
      "REWORK_QTY": "1",
      "RETURN_QTY": "1",
      "COMPLAINT_DATE": "2026-08-01",
      "CUSTOMERS_ID": "客户测试值",
      "CONTENT": "投诉内容测试值",
      "CAUSE": "原因分析测试值",
      "INTERIM_MEASURES": "临时纠正措施测试值",
      "LONG_MEASURES": "长期预防措施测试值",
      "REMARKS": "自动化测试备注001"
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
        "search_but"
      ],
      "testData": {
        "LINE_ID": "产线测试值",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "MODEL": "机种测试值",
        "PRODUCT_DATE": "2026-08-01",
        "REWORK_QTY": "1",
        "RETURN_QTY": "1",
        "COMPLAINT_DATE": "2026-08-01",
        "CUSTOMERS_ID": "客户测试值",
        "CONTENT": "投诉内容测试值",
        "CAUSE": "原因分析测试值",
        "INTERIM_MEASURES": "临时纠正措施测试值",
        "LONG_MEASURES": "长期预防措施测试值",
        "REMARKS": "自动化测试备注001"
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
      "key": "13fd57e65b-2cd9e6ce81-b3512",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "add_but",
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
          "label": "产线",
          "required": true,
          "example": "产线测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MODEL",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "REWORK_QTY",
          "label": "返工数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "RETURN_QTY",
          "label": "退货数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "COMPLAINT_DATE",
          "label": "投诉日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CUSTOMERS_ID",
          "label": "客户",
          "required": true,
          "example": "客户测试值"
        },
        {
          "key": "CONTENT",
          "label": "投诉内容",
          "required": true,
          "example": "投诉内容测试值"
        },
        {
          "key": "CAUSE",
          "label": "原因分析",
          "required": false,
          "example": "原因分析测试值"
        },
        {
          "key": "INTERIM_MEASURES",
          "label": "临时纠正措施",
          "required": false,
          "example": "临时纠正措施测试值"
        },
        {
          "key": "LONG_MEASURES",
          "label": "长期预防措施",
          "required": false,
          "example": "长期预防措施测试值"
        },
        {
          "key": "REMARKS",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "LINE_ID": "产线测试值",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "MODEL": "机种测试值",
        "PRODUCT_DATE": "2026-08-01",
        "REWORK_QTY": "1",
        "RETURN_QTY": "1",
        "COMPLAINT_DATE": "2026-08-01",
        "CUSTOMERS_ID": "客户测试值",
        "CONTENT": "投诉内容测试值",
        "CAUSE": "原因分析测试值",
        "INTERIM_MEASURES": "临时纠正措施测试值",
        "LONG_MEASURES": "长期预防措施测试值",
        "REMARKS": "自动化测试备注001"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-0a6da",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
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
          "label": "产线",
          "required": true,
          "example": "产线测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NO",
          "label": "料号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MODEL",
          "label": "机种",
          "required": true,
          "example": "机种测试值"
        },
        {
          "key": "PRODUCT_DATE",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "REWORK_QTY",
          "label": "返工数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "RETURN_QTY",
          "label": "退货数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "COMPLAINT_DATE",
          "label": "投诉日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "CUSTOMERS_ID",
          "label": "客户",
          "required": true,
          "example": "客户测试值"
        },
        {
          "key": "CONTENT",
          "label": "投诉内容",
          "required": true,
          "example": "投诉内容测试值"
        },
        {
          "key": "CAUSE",
          "label": "原因分析",
          "required": false,
          "example": "原因分析测试值"
        },
        {
          "key": "INTERIM_MEASURES",
          "label": "临时纠正措施",
          "required": false,
          "example": "临时纠正措施测试值"
        },
        {
          "key": "LONG_MEASURES",
          "label": "长期预防措施",
          "required": false,
          "example": "长期预防措施测试值"
        },
        {
          "key": "REMARKS",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        }
      ],
      "testData": {
        "LINE_ID": "产线测试值",
        "WO_NO": "AT-001",
        "PART_NO": "AT-001",
        "MODEL": "机种测试值",
        "PRODUCT_DATE": "2026-08-01",
        "REWORK_QTY": "1",
        "RETURN_QTY": "1",
        "COMPLAINT_DATE": "2026-08-01",
        "CUSTOMERS_ID": "客户测试值",
        "CONTENT": "投诉内容测试值",
        "CAUSE": "原因分析测试值",
        "INTERIM_MEASURES": "临时纠正措施测试值",
        "LONG_MEASURES": "长期预防措施测试值",
        "REMARKS": "自动化测试备注001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-4d9e1",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but()",
      "permission": "SfcsEquipKeepdelete",
      "menuTriggerLabel": "",
      "rowAction": false,
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
      "key": "7e002f9936-fe945e5a0d-34bbe",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "review_but",
      "permission": "SfcsEquipKeepAudit",
      "menuTriggerLabel": "",
      "rowAction": false,
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
    }
  ]
});
