// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-collect-defects-index-002962",
  "name": "旧版制造执行 - 选择站点（未配置菜单）功能校验",
  "displayName": "选择站点（未配置菜单）",
  "route": "/iMES/SfcsCollectDefects/index",
  "sourceRoute": "/iMES/SfcsCollectDefects/index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 选择站点（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsCollectDefects/index.vue",
  "dataSchema": {
    "columns": [
      "SN",
      "DEFECTSITE",
      "MODEL",
      "PART_NO",
      "WO_WO",
      "CHINESE_DESCRIPTION",
      "CHINESE",
      "LOCATION",
      "BAD_PART_NO",
      "WORK_TIME_LEN",
      "REMARK",
      "SERIALIZED",
      "Key",
      "OPER_ID",
      "OldPartNo",
      "OldDescription",
      "OldODMComponentSn",
      "NewODMComponentPn",
      "NewODMComponentSn",
      "NewPartNo",
      "REASON_CODE",
      "REASON_TYPE",
      "REASON_CLASS",
      "REASON_CATEGORY",
      "LEVEL_CODE",
      "SOURCE",
      "REASON_DESCRIPTION",
      "ENABLED",
      "OPERATION_SITE_NAME"
    ],
    "required": [
      "CHINESE_DESCRIPTION",
      "OldPartNo",
      "NewPartNo",
      "REASON_CODE",
      "REASON_TYPE",
      "REASON_CATEGORY",
      "LEVEL_CODE",
      "SOURCE",
      "REASON_DESCRIPTION"
    ],
    "fields": [
      {
        "key": "SN",
        "label": "未维修的流水号",
        "required": false
      },
      {
        "key": "DEFECTSITE",
        "label": "不良发生站点",
        "required": false
      },
      {
        "key": "MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "WO_WO",
        "label": "工单号",
        "required": false
      },
      {
        "key": "CHINESE_DESCRIPTION",
        "label": "不良原因",
        "required": true
      },
      {
        "key": "CHINESE",
        "label": "排除故障",
        "required": false
      },
      {
        "key": "LOCATION",
        "label": "不良位号",
        "required": false
      },
      {
        "key": "BAD_PART_NO",
        "label": "坏件料号",
        "required": false
      },
      {
        "key": "WORK_TIME_LEN",
        "label": "维修时长",
        "required": false
      },
      {
        "key": "REMARK",
        "label": "请填写详细原因分析",
        "required": false
      },
      {
        "key": "SERIALIZED",
        "label": "操作区",
        "required": false
      },
      {
        "key": "Key",
        "label": "按站点查询",
        "required": false
      },
      {
        "key": "OPER_ID",
        "label": "按工序查询",
        "required": false
      },
      {
        "key": "OldPartNo",
        "label": "原零件料号",
        "required": true
      },
      {
        "key": "OldDescription",
        "label": "原零件规格",
        "required": false
      },
      {
        "key": "OldODMComponentSn",
        "label": "原零件编号",
        "required": false
      },
      {
        "key": "NewODMComponentPn",
        "label": "新零件料号",
        "required": false
      },
      {
        "key": "NewODMComponentSn",
        "label": "新零件编号",
        "required": false
      },
      {
        "key": "NewPartNo",
        "label": "新UID",
        "required": true
      },
      {
        "key": "REASON_CODE",
        "label": "不良原因代码",
        "required": true
      },
      {
        "key": "REASON_TYPE",
        "label": "不良原因类型",
        "required": true
      },
      {
        "key": "REASON_CLASS",
        "label": "不良原因种类",
        "required": false
      },
      {
        "key": "REASON_CATEGORY",
        "label": "不良原因类别",
        "required": true
      },
      {
        "key": "LEVEL_CODE",
        "label": "不良原因等级",
        "required": true
      },
      {
        "key": "SOURCE",
        "label": "不良原因来源",
        "required": true
      },
      {
        "key": "REASON_DESCRIPTION",
        "label": "英文描述",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "OPERATION_SITE_NAME",
        "label": "输入关键字搜索",
        "required": false
      }
    ],
    "example": {
      "SN": "未维修的流水号测试值",
      "DEFECTSITE": "不良发生站点测试值",
      "MODEL": "规格测试值",
      "PART_NO": "AT-001",
      "WO_WO": "AT-001",
      "CHINESE_DESCRIPTION": "不良原因测试值",
      "CHINESE": "排除故障测试值",
      "LOCATION": "不良位号测试值",
      "BAD_PART_NO": "AT-001",
      "WORK_TIME_LEN": "维修时长测试值",
      "REMARK": "请填写详细原因分析测试值",
      "SERIALIZED": "操作区测试值",
      "Key": "按站点查询测试值",
      "OPER_ID": "按工序查询测试值",
      "OldPartNo": "AT-001",
      "OldDescription": "原零件规格测试值",
      "OldODMComponentSn": "AT-001",
      "NewODMComponentPn": "AT-001",
      "NewODMComponentSn": "AT-001",
      "NewPartNo": "AT-001",
      "REASON_CODE": "不良原因代码测试值",
      "REASON_TYPE": "不良原因类型测试值",
      "REASON_CLASS": "不良原因种类测试值",
      "REASON_CATEGORY": "不良原因类别测试值",
      "LEVEL_CODE": "不良原因等级测试值",
      "SOURCE": "不良原因来源测试值",
      "REASON_DESCRIPTION": "自动化测试备注001",
      "ENABLED": "是否激活测试值",
      "OPERATION_SITE_NAME": "输入关键字搜索测试值"
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
      "key": "7e002f9936-855241c285-2fff1",
      "type": "业务动作",
      "name": "替换业务入口校验",
      "label": "替换",
      "handler": "handleReplace(row, 3)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位替换",
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
      "key": "7e002f9936-2b7b5dee07-ee8d1",
      "type": "业务动作",
      "name": "确认维修完成业务入口校验",
      "label": "确认维修完成",
      "handler": "handleSubmitRepairData",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位确认维修完成",
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
      "key": "7e002f9936-11a1eb935d-18e5b",
      "type": "业务动作",
      "name": "报废业务入口校验",
      "label": "报废",
      "handler": "handleScrap",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位报废",
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
