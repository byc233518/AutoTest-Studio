// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-yolo-video-detect-2731c8",
  "name": "基座系统 - 视频检测功能校验",
  "displayName": "视频检测",
  "route": "/YoloVideoDetect",
  "sourceRoute": "/YoloVideoDetect",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 视频检测",
  "sourceFile": "src/views/Admin/AI/YoloVideoDetect/index.vue",
  "dataSchema": {
    "columns": [
      "selectedProject",
      "selectedModel",
      "conf",
      "fps"
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
      },
      {
        "key": "fps",
        "label": "处理帧率",
        "required": false
      }
    ],
    "example": {
      "selectedProject": "选择项目测试值",
      "selectedModel": "模型测试值",
      "conf": "置信度测试值",
      "fps": "处理帧率测试值"
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
      "key": "13fd57e65b-34ca13ca09-eb01a",
      "type": "新增表单",
      "name": "创建检测任务业务入口校验",
      "label": "创建检测任务",
      "handler": "createJob",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击创建检测任务",
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
          "key": "selectedProject",
          "label": "选择项目",
          "required": false,
          "example": "选择项目测试值"
        },
        {
          "key": "selectedModel",
          "label": "模型",
          "required": false,
          "example": "模型测试值"
        },
        {
          "key": "conf",
          "label": "置信度",
          "required": false,
          "example": "置信度测试值"
        },
        {
          "key": "fps",
          "label": "处理帧率",
          "required": false,
          "example": "处理帧率测试值"
        }
      ],
      "testData": {
        "selectedProject": "选择项目测试值",
        "selectedModel": "模型测试值",
        "conf": "置信度测试值",
        "fps": "处理帧率测试值"
      }
    },
    {
      "key": "faea8c1db9-f7acefd2d4-93c64",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "selectJob(row)",
      "permission": "",
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
      "key": "ef879b4ced-f772cb271b-b9506",
      "type": "导出入口",
      "name": "下载视频业务入口校验",
      "label": "下载视频",
      "handler": "downloadVideo(row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载视频",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-0fbaf61386-ca1f0",
      "type": "导出入口",
      "name": "下载叠框视频业务入口校验",
      "label": "下载叠框视频",
      "handler": "downloadVideo(currentJob)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载叠框视频",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-json-4e659",
      "type": "导出入口",
      "name": "下载 JSON业务入口校验",
      "label": "下载 JSON",
      "handler": "downloadEvents(currentJob)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载 JSON",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
