// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-cpcl-designer-index-288b49",
  "name": "基座系统 - 功能菜单（CpclDesigner）功能校验",
  "displayName": "功能菜单（CpclDesigner）",
  "route": "/CpclDesigner/index",
  "sourceRoute": "/CpclDesigner/index",
  "menuCode": "CpclDesigner",
  "breadcrumb": "条码管理 / 物料条码管理 / 功能菜单（CpclDesigner）",
  "sourceFile": "src/views/CpclDesigner/index.vue",
  "dataSchema": {
    "columns": [
      "width",
      "height",
      "unit",
      "presetSize",
      "x",
      "data",
      "fontSize",
      "bold",
      "color",
      "thickness",
      "fill",
      "type",
      "size",
      "errorCorrectionLevel",
      "separator",
      "lineHeight",
      "columns",
      "rows",
      "borderWidth",
      "printerBrand",
      "filterType",
      "filterText",
      "cpclOutput",
      "y"
    ],
    "required": [],
    "fields": [
      {
        "key": "width",
        "label": "宽度",
        "required": false
      },
      {
        "key": "height",
        "label": "高度",
        "required": false
      },
      {
        "key": "unit",
        "label": "单位",
        "required": false
      },
      {
        "key": "presetSize",
        "label": "预设尺寸",
        "required": false
      },
      {
        "key": "x",
        "label": "位置",
        "required": false
      },
      {
        "key": "data",
        "label": "文本内容",
        "required": false
      },
      {
        "key": "fontSize",
        "label": "字体大小",
        "required": false
      },
      {
        "key": "bold",
        "label": "字体样式",
        "required": false
      },
      {
        "key": "color",
        "label": "字体颜色",
        "required": false
      },
      {
        "key": "thickness",
        "label": "线条粗细",
        "required": false
      },
      {
        "key": "fill",
        "label": "填充",
        "required": false
      },
      {
        "key": "type",
        "label": "条码类型",
        "required": false
      },
      {
        "key": "size",
        "label": "二维码大小",
        "required": false
      },
      {
        "key": "errorCorrectionLevel",
        "label": "错误纠正级别",
        "required": false
      },
      {
        "key": "separator",
        "label": "分隔符",
        "required": false
      },
      {
        "key": "lineHeight",
        "label": "行高",
        "required": false
      },
      {
        "key": "columns",
        "label": "列数",
        "required": false
      },
      {
        "key": "rows",
        "label": "行数",
        "required": false
      },
      {
        "key": "borderWidth",
        "label": "边框宽度",
        "required": false
      },
      {
        "key": "printerBrand",
        "label": "打印机品牌",
        "required": false
      },
      {
        "key": "filterType",
        "label": "全部",
        "required": false
      },
      {
        "key": "filterText",
        "label": "输入过滤条件...",
        "required": false
      },
      {
        "key": "cpclOutput",
        "label": "当前画面上没有CPCL命令",
        "required": false
      },
      {
        "key": "y",
        "label": "Y坐标",
        "required": false
      }
    ],
    "example": {
      "width": "宽度测试值",
      "height": "高度测试值",
      "unit": "单位测试值",
      "presetSize": "预设尺寸测试值",
      "x": "位置测试值",
      "data": "文本内容测试值",
      "fontSize": "字体大小测试值",
      "bold": "字体样式测试值",
      "color": "字体颜色测试值",
      "thickness": "线条粗细测试值",
      "fill": "填充测试值",
      "type": "条码类型测试值",
      "size": "二维码大小测试值",
      "errorCorrectionLevel": "错误纠正级别测试值",
      "separator": "分隔符测试值",
      "lineHeight": "行高测试值",
      "columns": "列数测试值",
      "rows": "行数测试值",
      "borderWidth": "边框宽度测试值",
      "printerBrand": "打印机品牌测试值",
      "filterType": "全部测试值",
      "filterText": "输入过滤条件...测试值",
      "cpclOutput": "当前画面上没有CPCL命令测试值",
      "y": "Y坐标测试值"
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
      "key": "ef879b4ced-188896795f-f3aa3",
      "type": "导出入口",
      "name": "导出业务入口校验",
      "label": "导出",
      "handler": "exportDesign",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-60e2bcad85-93165",
      "type": "导入入口",
      "name": "导入业务入口校验",
      "label": "导入",
      "handler": "importDesign",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入",
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
      "key": "faea8c1db9-d7d7ce790b-6435f",
      "type": "查看详情",
      "name": "配置业务入口校验",
      "label": "配置",
      "handler": "openConfig(component)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击配置",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "726b6ec55f-3755f56f2f-f53f0",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteComponent(component.id)",
      "permission": "",
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
      "key": "7e002f9936-4edd1d0087-682a3",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "copyOutput",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位复制",
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
      "key": "ef879b4ced-2b9d013177-75a2a",
      "type": "导出入口",
      "name": "下载业务入口校验",
      "label": "下载",
      "handler": "downloadOutput",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
