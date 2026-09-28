// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-product-sample-index-c7fe5d",
  "name": "旧版制造执行 - 清除（未配置菜单）功能校验",
  "displayName": "清除（未配置菜单）",
  "route": "/iMES/SfcsProductSample/Index",
  "sourceRoute": "/iMES/SfcsProductSample/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 清除（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsProductSample/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "ROUTE_NAME",
      "SAMPLE_MODE",
      "PROJECT_ID",
      "DELIVER_OPERATION_CODE",
      "SAMPLE_OPERATION_CODE",
      "MUST_SIGN_WITH_FAIL",
      "CURRENT_SAMPLE_RATIO",
      "SAMPLE_OPERATION_COUNT",
      "ENABLED"
    ],
    "required": [],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "ROUTE_NAME",
        "label": "制程",
        "required": false
      },
      {
        "key": "SAMPLE_MODE",
        "label": "抽检模式",
        "required": false
      },
      {
        "key": "PROJECT_ID",
        "label": "抽检方案",
        "required": false
      },
      {
        "key": "DELIVER_OPERATION_CODE",
        "label": "标记工序",
        "required": false
      },
      {
        "key": "SAMPLE_OPERATION_CODE",
        "label": "抽检工序",
        "required": false
      },
      {
        "key": "MUST_SIGN_WITH_FAIL",
        "label": "制程内Fail重流必检",
        "required": false
      },
      {
        "key": "CURRENT_SAMPLE_RATIO",
        "label": "当前抽检比例",
        "required": false
      },
      {
        "key": "SAMPLE_OPERATION_COUNT",
        "label": "连续抽检工序个数",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "ROUTE_NAME": "制程测试值",
      "SAMPLE_MODE": "抽检模式测试值",
      "PROJECT_ID": "抽检方案测试值",
      "DELIVER_OPERATION_CODE": "标记工序测试值",
      "SAMPLE_OPERATION_CODE": "抽检工序测试值",
      "MUST_SIGN_WITH_FAIL": "制程内Fail重流必检测试值",
      "CURRENT_SAMPLE_RATIO": "当前抽检比例测试值",
      "SAMPLE_OPERATION_COUNT": "连续抽检工序个数测试值",
      "ENABLED": "是否激活测试值"
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
        "PART_NO": "AT-001",
        "ROUTE_NAME": "制程测试值",
        "SAMPLE_MODE": "抽检模式测试值",
        "PROJECT_ID": "抽检方案测试值",
        "DELIVER_OPERATION_CODE": "标记工序测试值",
        "SAMPLE_OPERATION_CODE": "抽检工序测试值",
        "MUST_SIGN_WITH_FAIL": "制程内Fail重流必检测试值",
        "CURRENT_SAMPLE_RATIO": "当前抽检比例测试值",
        "SAMPLE_OPERATION_COUNT": "连续抽检工序个数测试值",
        "ENABLED": "是否激活测试值"
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
    }
  ]
});
