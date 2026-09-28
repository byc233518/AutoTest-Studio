// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-quality-stop-notice-index-74b627",
  "name": "旧版制造执行 - 审核（未配置菜单）功能校验",
  "displayName": "审核（未配置菜单）",
  "route": "/iMES/QualityStopNotice/Index",
  "sourceRoute": "/iMES/QualityStopNotice/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 审核（未配置菜单）",
  "sourceFile": "src/views/iMES/QualityStopNotice/Index.vue",
  "dataSchema": {
    "columns": [
      "PRODUCTION_DATE",
      "LINE_ID",
      "WO_NO",
      "PCB_PN",
      "MODEL",
      "DESCRIPTION",
      "TOTAL_QTY",
      "FINISHED_QTY",
      "CREATE_DEP_ID",
      "CREATE_USER",
      "RECEIPT_DEP_ID",
      "RECEIPT_USER",
      "FEEDBACK_TIME",
      "PRACTICAL_TIME",
      "EXCEPTION_DESCRIPTION",
      "EXCEPTION_FAIL_INFO",
      "EXCEPTION_FAIL_RATE",
      "EXCEPTION_IPQA_HEAD",
      "ANALYSIS_OPINION",
      "ANALYSIS_REASON",
      "ANALYSIS_QE",
      "ANALYSIS_QE_HEAD",
      "SOLUTION_METHOD",
      "SOLUTION_SIGN",
      "SOLUTION_DATE",
      "EFFECT_TRACKING",
      "EFFECT_DATE",
      "RESUME_NOTICE",
      "FILE_CODE",
      "Chinese",
      "Key"
    ],
    "required": [
      "PRODUCTION_DATE",
      "LINE_ID",
      "WO_NO",
      "DESCRIPTION",
      "TOTAL_QTY",
      "FINISHED_QTY",
      "CREATE_DEP_ID",
      "CREATE_USER",
      "FEEDBACK_TIME",
      "EXCEPTION_DESCRIPTION",
      "FILE_CODE"
    ],
    "fields": [
      {
        "key": "PRODUCTION_DATE",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "LINE_ID",
        "label": "线别",
        "required": true
      },
      {
        "key": "WO_NO",
        "label": "工单号",
        "required": true
      },
      {
        "key": "PCB_PN",
        "label": "料号",
        "required": false
      },
      {
        "key": "MODEL",
        "label": "品名",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "型号",
        "required": true
      },
      {
        "key": "TOTAL_QTY",
        "label": "生产批量",
        "required": true
      },
      {
        "key": "FINISHED_QTY",
        "label": "已生产数量",
        "required": true
      },
      {
        "key": "CREATE_DEP_ID",
        "label": "发文部门",
        "required": true
      },
      {
        "key": "CREATE_USER",
        "label": "发文人",
        "required": true
      },
      {
        "key": "RECEIPT_DEP_ID",
        "label": "收发部门",
        "required": false
      },
      {
        "key": "RECEIPT_USER",
        "label": "签收人",
        "required": false
      },
      {
        "key": "FEEDBACK_TIME",
        "label": "要求反馈时间",
        "required": true
      },
      {
        "key": "PRACTICAL_TIME",
        "label": "实际反馈时间",
        "required": false
      },
      {
        "key": "EXCEPTION_DESCRIPTION",
        "label": "品质异常描述",
        "required": true
      },
      {
        "key": "EXCEPTION_FAIL_INFO",
        "label": "不良现象",
        "required": false
      },
      {
        "key": "EXCEPTION_FAIL_RATE",
        "label": "不良率",
        "required": false
      },
      {
        "key": "EXCEPTION_IPQA_HEAD",
        "label": "IPQA主管",
        "required": false
      },
      {
        "key": "ANALYSIS_OPINION",
        "label": "QE初步分析意见",
        "required": false
      },
      {
        "key": "ANALYSIS_REASON",
        "label": "原因分析",
        "required": false
      },
      {
        "key": "ANALYSIS_QE",
        "label": "QE工程师",
        "required": false
      },
      {
        "key": "ANALYSIS_QE_HEAD",
        "label": "QE主管",
        "required": false
      },
      {
        "key": "SOLUTION_METHOD",
        "label": "应急对策及防止再发生措施",
        "required": false
      },
      {
        "key": "SOLUTION_SIGN",
        "label": "签名",
        "required": false
      },
      {
        "key": "SOLUTION_DATE",
        "label": "日期",
        "required": false
      },
      {
        "key": "EFFECT_TRACKING",
        "label": "效果追踪（品质部填写",
        "required": false
      },
      {
        "key": "EFFECT_DATE",
        "label": "日期",
        "required": false
      },
      {
        "key": "RESUME_NOTICE",
        "label": "复线通知",
        "required": false
      },
      {
        "key": "FILE_CODE",
        "label": "文件编号",
        "required": true
      },
      {
        "key": "Chinese",
        "label": "审核内容",
        "required": false
      },
      {
        "key": "Key",
        "label": "用户名/用户名称/企业微信",
        "required": false
      }
    ],
    "example": {
      "PRODUCTION_DATE": "2026-08-01",
      "LINE_ID": "线别测试值",
      "WO_NO": "AT-001",
      "PCB_PN": "AT-001",
      "MODEL": "自动化样例001",
      "DESCRIPTION": "型号测试值",
      "TOTAL_QTY": "生产批量测试值",
      "FINISHED_QTY": "1",
      "CREATE_DEP_ID": "发文部门测试值",
      "CREATE_USER": "发文人测试值",
      "RECEIPT_DEP_ID": "收发部门测试值",
      "RECEIPT_USER": "签收人测试值",
      "FEEDBACK_TIME": "2026-08-01",
      "PRACTICAL_TIME": "2026-08-01",
      "EXCEPTION_DESCRIPTION": "自动化测试备注001",
      "EXCEPTION_FAIL_INFO": "不良现象测试值",
      "EXCEPTION_FAIL_RATE": "不良率测试值",
      "EXCEPTION_IPQA_HEAD": "IPQA主管测试值",
      "ANALYSIS_OPINION": "QE初步分析意见测试值",
      "ANALYSIS_REASON": "原因分析测试值",
      "ANALYSIS_QE": "QE工程师测试值",
      "ANALYSIS_QE_HEAD": "QE主管测试值",
      "SOLUTION_METHOD": "应急对策及防止再发生措施测试值",
      "SOLUTION_SIGN": "签名测试值",
      "SOLUTION_DATE": "2026-08-01",
      "EFFECT_TRACKING": "效果追踪（品质部填写测试值",
      "EFFECT_DATE": "2026-08-01",
      "RESUME_NOTICE": "复线通知测试值",
      "FILE_CODE": "AT-001",
      "Chinese": "审核内容测试值",
      "Key": "用户名/用户名称/企业微信测试值"
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
        "PRODUCTION_DATE": "2026-08-01",
        "LINE_ID": "线别测试值",
        "WO_NO": "AT-001",
        "PCB_PN": "AT-001",
        "MODEL": "自动化样例001",
        "DESCRIPTION": "型号测试值",
        "TOTAL_QTY": "生产批量测试值",
        "FINISHED_QTY": "1",
        "CREATE_DEP_ID": "发文部门测试值",
        "CREATE_USER": "发文人测试值",
        "RECEIPT_DEP_ID": "收发部门测试值",
        "RECEIPT_USER": "签收人测试值",
        "FEEDBACK_TIME": "2026-08-01",
        "PRACTICAL_TIME": "2026-08-01",
        "EXCEPTION_DESCRIPTION": "自动化测试备注001",
        "EXCEPTION_FAIL_INFO": "不良现象测试值",
        "EXCEPTION_FAIL_RATE": "不良率测试值",
        "EXCEPTION_IPQA_HEAD": "IPQA主管测试值",
        "ANALYSIS_OPINION": "QE初步分析意见测试值",
        "ANALYSIS_REASON": "原因分析测试值",
        "ANALYSIS_QE": "QE工程师测试值",
        "ANALYSIS_QE_HEAD": "QE主管测试值",
        "SOLUTION_METHOD": "应急对策及防止再发生措施测试值",
        "SOLUTION_SIGN": "签名测试值",
        "SOLUTION_DATE": "2026-08-01",
        "EFFECT_TRACKING": "效果追踪（品质部填写测试值",
        "EFFECT_DATE": "2026-08-01",
        "RESUME_NOTICE": "复线通知测试值",
        "FILE_CODE": "AT-001",
        "Chinese": "审核内容测试值",
        "Key": "用户名/用户名称/企业微信测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-2b973",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "AddClick",
      "permission": "MesIpqaStopNoticeAdd",
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
          "key": "PRODUCTION_DATE",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": true,
          "example": "线别测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PCB_PN",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "MODEL",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION",
          "label": "型号",
          "required": true,
          "example": "型号测试值"
        },
        {
          "key": "TOTAL_QTY",
          "label": "生产批量",
          "required": true,
          "example": "生产批量测试值"
        },
        {
          "key": "FINISHED_QTY",
          "label": "已生产数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "CREATE_DEP_ID",
          "label": "发文部门",
          "required": true,
          "example": "发文部门测试值"
        },
        {
          "key": "CREATE_USER",
          "label": "发文人",
          "required": true,
          "example": "发文人测试值"
        },
        {
          "key": "RECEIPT_DEP_ID",
          "label": "收发部门",
          "required": false,
          "example": "收发部门测试值"
        },
        {
          "key": "RECEIPT_USER",
          "label": "签收人",
          "required": false,
          "example": "签收人测试值"
        },
        {
          "key": "FEEDBACK_TIME",
          "label": "要求反馈时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "PRACTICAL_TIME",
          "label": "实际反馈时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "EXCEPTION_DESCRIPTION",
          "label": "品质异常描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "EXCEPTION_FAIL_INFO",
          "label": "不良现象",
          "required": false,
          "example": "不良现象测试值"
        },
        {
          "key": "EXCEPTION_FAIL_RATE",
          "label": "不良率",
          "required": false,
          "example": "不良率测试值"
        },
        {
          "key": "EXCEPTION_IPQA_HEAD",
          "label": "IPQA主管",
          "required": false,
          "example": "IPQA主管测试值"
        },
        {
          "key": "ANALYSIS_OPINION",
          "label": "QE初步分析意见",
          "required": false,
          "example": "QE初步分析意见测试值"
        },
        {
          "key": "ANALYSIS_REASON",
          "label": "原因分析",
          "required": false,
          "example": "原因分析测试值"
        },
        {
          "key": "ANALYSIS_QE",
          "label": "QE工程师",
          "required": false,
          "example": "QE工程师测试值"
        },
        {
          "key": "ANALYSIS_QE_HEAD",
          "label": "QE主管",
          "required": false,
          "example": "QE主管测试值"
        },
        {
          "key": "SOLUTION_METHOD",
          "label": "应急对策及防止再发生措施",
          "required": false,
          "example": "应急对策及防止再发生措施测试值"
        },
        {
          "key": "SOLUTION_SIGN",
          "label": "签名",
          "required": false,
          "example": "签名测试值"
        },
        {
          "key": "SOLUTION_DATE",
          "label": "日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "EFFECT_TRACKING",
          "label": "效果追踪（品质部填写",
          "required": false,
          "example": "效果追踪（品质部填写测试值"
        },
        {
          "key": "EFFECT_DATE",
          "label": "日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "RESUME_NOTICE",
          "label": "复线通知",
          "required": false,
          "example": "复线通知测试值"
        },
        {
          "key": "FILE_CODE",
          "label": "文件编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Chinese",
          "label": "审核内容",
          "required": false,
          "example": "审核内容测试值"
        },
        {
          "key": "Key",
          "label": "用户名/用户名称/企业微信",
          "required": false,
          "example": "用户名/用户名称/企业微信测试值"
        }
      ],
      "testData": {
        "PRODUCTION_DATE": "2026-08-01",
        "LINE_ID": "线别测试值",
        "WO_NO": "AT-001",
        "PCB_PN": "AT-001",
        "MODEL": "自动化样例001",
        "DESCRIPTION": "型号测试值",
        "TOTAL_QTY": "生产批量测试值",
        "FINISHED_QTY": "1",
        "CREATE_DEP_ID": "发文部门测试值",
        "CREATE_USER": "发文人测试值",
        "RECEIPT_DEP_ID": "收发部门测试值",
        "RECEIPT_USER": "签收人测试值",
        "FEEDBACK_TIME": "2026-08-01",
        "PRACTICAL_TIME": "2026-08-01",
        "EXCEPTION_DESCRIPTION": "自动化测试备注001",
        "EXCEPTION_FAIL_INFO": "不良现象测试值",
        "EXCEPTION_FAIL_RATE": "不良率测试值",
        "EXCEPTION_IPQA_HEAD": "IPQA主管测试值",
        "ANALYSIS_OPINION": "QE初步分析意见测试值",
        "ANALYSIS_REASON": "原因分析测试值",
        "ANALYSIS_QE": "QE工程师测试值",
        "ANALYSIS_QE_HEAD": "QE主管测试值",
        "SOLUTION_METHOD": "应急对策及防止再发生措施测试值",
        "SOLUTION_SIGN": "签名测试值",
        "SOLUTION_DATE": "2026-08-01",
        "EFFECT_TRACKING": "效果追踪（品质部填写测试值",
        "EFFECT_DATE": "2026-08-01",
        "RESUME_NOTICE": "复线通知测试值",
        "FILE_CODE": "AT-001",
        "Chinese": "审核内容测试值",
        "Key": "用户名/用户名称/企业微信测试值"
      }
    },
    {
      "key": "7e002f9936-fe945e5a0d-5745e",
      "type": "业务动作",
      "name": "审核业务入口校验",
      "label": "审核",
      "handler": "AuditClick",
      "permission": "MesIpqaStopNoticeAuditBill",
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
    },
    {
      "key": "7e002f9936-62e26d2141-41b81",
      "type": "业务动作",
      "name": "批准业务入口校验",
      "label": "批准",
      "handler": "Approved",
      "permission": "MesIpqaStopNoticeApprovalBill",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位批准",
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
      "key": "4aa22a22ac-a7f814c0a4-5630f",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "edit_but(scope.row)",
      "permission": "MesIpqaStopNoticeSaveData",
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
          "key": "PRODUCTION_DATE",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "LINE_ID",
          "label": "线别",
          "required": true,
          "example": "线别测试值"
        },
        {
          "key": "WO_NO",
          "label": "工单号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PCB_PN",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "MODEL",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "DESCRIPTION",
          "label": "型号",
          "required": true,
          "example": "型号测试值"
        },
        {
          "key": "TOTAL_QTY",
          "label": "生产批量",
          "required": true,
          "example": "生产批量测试值"
        },
        {
          "key": "FINISHED_QTY",
          "label": "已生产数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "CREATE_DEP_ID",
          "label": "发文部门",
          "required": true,
          "example": "发文部门测试值"
        },
        {
          "key": "CREATE_USER",
          "label": "发文人",
          "required": true,
          "example": "发文人测试值"
        },
        {
          "key": "RECEIPT_DEP_ID",
          "label": "收发部门",
          "required": false,
          "example": "收发部门测试值"
        },
        {
          "key": "RECEIPT_USER",
          "label": "签收人",
          "required": false,
          "example": "签收人测试值"
        },
        {
          "key": "FEEDBACK_TIME",
          "label": "要求反馈时间",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "PRACTICAL_TIME",
          "label": "实际反馈时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "EXCEPTION_DESCRIPTION",
          "label": "品质异常描述",
          "required": true,
          "example": "自动化测试备注001"
        },
        {
          "key": "EXCEPTION_FAIL_INFO",
          "label": "不良现象",
          "required": false,
          "example": "不良现象测试值"
        },
        {
          "key": "EXCEPTION_FAIL_RATE",
          "label": "不良率",
          "required": false,
          "example": "不良率测试值"
        },
        {
          "key": "EXCEPTION_IPQA_HEAD",
          "label": "IPQA主管",
          "required": false,
          "example": "IPQA主管测试值"
        },
        {
          "key": "ANALYSIS_OPINION",
          "label": "QE初步分析意见",
          "required": false,
          "example": "QE初步分析意见测试值"
        },
        {
          "key": "ANALYSIS_REASON",
          "label": "原因分析",
          "required": false,
          "example": "原因分析测试值"
        },
        {
          "key": "ANALYSIS_QE",
          "label": "QE工程师",
          "required": false,
          "example": "QE工程师测试值"
        },
        {
          "key": "ANALYSIS_QE_HEAD",
          "label": "QE主管",
          "required": false,
          "example": "QE主管测试值"
        },
        {
          "key": "SOLUTION_METHOD",
          "label": "应急对策及防止再发生措施",
          "required": false,
          "example": "应急对策及防止再发生措施测试值"
        },
        {
          "key": "SOLUTION_SIGN",
          "label": "签名",
          "required": false,
          "example": "签名测试值"
        },
        {
          "key": "SOLUTION_DATE",
          "label": "日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "EFFECT_TRACKING",
          "label": "效果追踪（品质部填写",
          "required": false,
          "example": "效果追踪（品质部填写测试值"
        },
        {
          "key": "EFFECT_DATE",
          "label": "日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "RESUME_NOTICE",
          "label": "复线通知",
          "required": false,
          "example": "复线通知测试值"
        },
        {
          "key": "FILE_CODE",
          "label": "文件编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Chinese",
          "label": "审核内容",
          "required": false,
          "example": "审核内容测试值"
        },
        {
          "key": "Key",
          "label": "用户名/用户名称/企业微信",
          "required": false,
          "example": "用户名/用户名称/企业微信测试值"
        }
      ],
      "testData": {
        "PRODUCTION_DATE": "2026-08-01",
        "LINE_ID": "线别测试值",
        "WO_NO": "AT-001",
        "PCB_PN": "AT-001",
        "MODEL": "自动化样例001",
        "DESCRIPTION": "型号测试值",
        "TOTAL_QTY": "生产批量测试值",
        "FINISHED_QTY": "1",
        "CREATE_DEP_ID": "发文部门测试值",
        "CREATE_USER": "发文人测试值",
        "RECEIPT_DEP_ID": "收发部门测试值",
        "RECEIPT_USER": "签收人测试值",
        "FEEDBACK_TIME": "2026-08-01",
        "PRACTICAL_TIME": "2026-08-01",
        "EXCEPTION_DESCRIPTION": "自动化测试备注001",
        "EXCEPTION_FAIL_INFO": "不良现象测试值",
        "EXCEPTION_FAIL_RATE": "不良率测试值",
        "EXCEPTION_IPQA_HEAD": "IPQA主管测试值",
        "ANALYSIS_OPINION": "QE初步分析意见测试值",
        "ANALYSIS_REASON": "原因分析测试值",
        "ANALYSIS_QE": "QE工程师测试值",
        "ANALYSIS_QE_HEAD": "QE主管测试值",
        "SOLUTION_METHOD": "应急对策及防止再发生措施测试值",
        "SOLUTION_SIGN": "签名测试值",
        "SOLUTION_DATE": "2026-08-01",
        "EFFECT_TRACKING": "效果追踪（品质部填写测试值",
        "EFFECT_DATE": "2026-08-01",
        "RESUME_NOTICE": "复线通知测试值",
        "FILE_CODE": "AT-001",
        "Chinese": "审核内容测试值",
        "Key": "用户名/用户名称/企业微信测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-f7cf9",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "remove_but(scope.row)",
      "permission": "MesIpqaStopNoticeDeleteOneById",
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
