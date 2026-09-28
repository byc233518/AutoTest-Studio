// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-yolo-projects-4b8abb",
  "name": "基座系统 - 模型训练功能校验",
  "displayName": "模型训练",
  "route": "/YoloProjects",
  "sourceRoute": "/YoloProjects",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 模型训练",
  "sourceFile": "src/views/Admin/AI/YoloProjects/index.vue",
  "dataSchema": {
    "columns": [
      "project_id",
      "display_name",
      "classesText",
      "trainRatio",
      "duplicateCopies",
      "model",
      "epochs",
      "imgsz",
      "run_name",
      "conf"
    ],
    "required": [],
    "fields": [
      {
        "key": "project_id",
        "label": "项目ID",
        "required": false
      },
      {
        "key": "display_name",
        "label": "显示名称",
        "required": false
      },
      {
        "key": "classesText",
        "label": "类别",
        "required": false
      },
      {
        "key": "trainRatio",
        "label": "训练集比例",
        "required": false
      },
      {
        "key": "duplicateCopies",
        "label": "扩增份数",
        "required": false
      },
      {
        "key": "model",
        "label": "基础模型",
        "required": false
      },
      {
        "key": "epochs",
        "label": "训练轮次",
        "required": false
      },
      {
        "key": "imgsz",
        "label": "图片尺寸",
        "required": false
      },
      {
        "key": "run_name",
        "label": "运行名称",
        "required": false
      },
      {
        "key": "conf",
        "label": "置信度",
        "required": false
      }
    ],
    "example": {
      "project_id": "AT-001",
      "display_name": "自动化样例001",
      "classesText": "类别测试值",
      "trainRatio": "训练集比例测试值",
      "duplicateCopies": "扩增份数测试值",
      "model": "基础模型测试值",
      "epochs": "训练轮次测试值",
      "imgsz": "图片尺寸测试值",
      "run_name": "自动化样例001",
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
    },
    {
      "key": "5f1787916c-5e1024da8f-c6cff",
      "type": "导入入口",
      "name": "导入数据业务入口校验",
      "label": "导入数据",
      "handler": "openImport(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入数据",
        "校验导入界面和文件选择控件",
        "关闭且不上传文件"
      ],
      "assertions": [
        "导入界面真实打开",
        "存在文件选择控件"
      ],
      "mutatesData": false
    }
  ]
});
