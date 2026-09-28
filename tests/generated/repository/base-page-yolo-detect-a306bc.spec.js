// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-yolo-detect-a306bc",
  "name": "基座系统 - 图像检测功能校验",
  "displayName": "图像检测",
  "route": "/YoloDetect",
  "sourceRoute": "/YoloDetect",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 图像检测",
  "sourceFile": "src/views/Admin/AI/YoloDetect/index.vue",
  "dataSchema": {
    "columns": [
      "selectedProject",
      "selectedModel",
      "conf"
    ],
    "required": [],
    "fields": [
      {
        "key": "selectedProject",
        "label": "选择项目",
        "required": false
      },
      {
        "key": "selectedModel",
        "label": "模型",
        "required": false
      },
      {
        "key": "conf",
        "label": "置信度",
        "required": false
      }
    ],
    "example": {
      "selectedProject": "选择项目测试值",
      "selectedModel": "模型测试值",
      "conf": "置信度测试值"
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
    }
  ]
});
