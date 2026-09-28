// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-mobile-page-design-352ad9",
  "name": "基座系统 - 移动端页面功能校验",
  "displayName": "移动端页面",
  "route": "/MobilePageDesign",
  "sourceRoute": "/MobilePageDesign",
  "menuCode": "",
  "breadcrumb": "基座系统 / 未配置菜单 / 移动端页面",
  "sourceFile": "src/views/MobilePageDesign/index.vue",
  "dataSchema": {
    "columns": [
      "REPORT_CODE",
      "REPORT_TITLE",
      "ICON",
      "TERMINAL",
      "PARENT_MENU_ID",
      "Link_Url",
      "selectionType",
      "viewMode",
      "name",
      "title",
      "buttonText",
      "buttonType",
      "buttonSize",
      "block",
      "disabled",
      "label",
      "apiUrl",
      "field",
      "height",
      "labelColor",
      "valueColor",
      "tableSelectModel",
      "activeTab",
      "tabs",
      "color",
      "fontSize",
      "width",
      "formatType",
      "dateFormat",
      "dictCode",
      "key",
      "formatFunction",
      "showSearch",
      "actionType",
      "service",
      "ajaxDataString",
      "method",
      "dataPath",
      "pageId",
      "mode",
      "msg",
      "status",
      "toastMode",
      "conditionEnabled",
      "conditionLeft",
      "conditionFailMsg",
      "continueOnConditionFail",
      "confirmTitle",
      "confirmContent",
      "confirmText",
      "cancelText",
      "formId",
      "idField",
      "dbId",
      "tableName",
      "cpclModel",
      "printFileId",
      "prop",
      "tabCardBatchWidth",
      "text",
      "type",
      "inputType",
      "pickerType",
      "value",
      "placeholder",
      "cardComponentBatchWidth",
      "textColor",
      "backend",
      "frontend"
    ],
    "required": [
      "actionType",
      "service",
      "method",
      "type"
    ],
    "fields": [
      {
        "key": "REPORT_CODE",
        "label": "编码",
        "required": false
      },
      {
        "key": "REPORT_TITLE",
        "label": "名称",
        "required": false
      },
      {
        "key": "ICON",
        "label": "图标",
        "required": false
      },
      {
        "key": "TERMINAL",
        "label": "发布终端",
        "required": false
      },
      {
        "key": "PARENT_MENU_ID",
        "label": "上级菜单",
        "required": false
      },
      {
        "key": "Link_Url",
        "label": "路由地址",
        "required": false
      },
      {
        "key": "selectionType",
        "label": "选择类型",
        "required": false
      },
      {
        "key": "viewMode",
        "label": "列表显示方式",
        "required": false
      },
      {
        "key": "name",
        "label": "组件名称",
        "required": false
      },
      {
        "key": "title",
        "label": "组件标题",
        "required": false
      },
      {
        "key": "buttonText",
        "label": "按钮文本",
        "required": false
      },
      {
        "key": "buttonType",
        "label": "按钮类型",
        "required": false
      },
      {
        "key": "buttonSize",
        "label": "按钮大小",
        "required": false
      },
      {
        "key": "block",
        "label": "块级按钮",
        "required": false
      },
      {
        "key": "disabled",
        "label": "禁用状态",
        "required": false
      },
      {
        "key": "label",
        "label": "查询字段",
        "required": false
      },
      {
        "key": "apiUrl",
        "label": "API地址",
        "required": false
      },
      {
        "key": "field",
        "label": "数据字段",
        "required": false
      },
      {
        "key": "height",
        "label": "卡片高度",
        "required": false
      },
      {
        "key": "labelColor",
        "label": "标签颜色",
        "required": false
      },
      {
        "key": "valueColor",
        "label": "值颜色",
        "required": false
      },
      {
        "key": "tableSelectModel",
        "label": "卡片字段",
        "required": false
      },
      {
        "key": "activeTab",
        "label": "当前激活标签",
        "required": false
      },
      {
        "key": "tabs",
        "label": "标签页列表",
        "required": false
      },
      {
        "key": "color",
        "label": "标签样式",
        "required": false
      },
      {
        "key": "fontSize",
        "label": "字体大小",
        "required": false
      },
      {
        "key": "width",
        "label": "宽度",
        "required": false
      },
      {
        "key": "formatType",
        "label": "格式化类型",
        "required": false
      },
      {
        "key": "dateFormat",
        "label": "日期格式",
        "required": false
      },
      {
        "key": "dictCode",
        "label": "字典代码",
        "required": false
      },
      {
        "key": "key",
        "label": "键值映射",
        "required": false
      },
      {
        "key": "formatFunction",
        "label": "格式化函数",
        "required": false
      },
      {
        "key": "showSearch",
        "label": "启用搜索",
        "required": false
      },
      {
        "key": "actionType",
        "label": "动作类型",
        "required": true
      },
      {
        "key": "service",
        "label": "服务地址",
        "required": true
      },
      {
        "key": "ajaxDataString",
        "label": "请求参数 (JSON)",
        "required": false
      },
      {
        "key": "method",
        "label": "请求方法",
        "required": true
      },
      {
        "key": "dataPath",
        "label": "数据路径",
        "required": false
      },
      {
        "key": "pageId",
        "label": "目标页面代码/ID",
        "required": false
      },
      {
        "key": "mode",
        "label": "打开方式",
        "required": false
      },
      {
        "key": "msg",
        "label": "提示内容",
        "required": false
      },
      {
        "key": "status",
        "label": "提示类型",
        "required": false
      },
      {
        "key": "toastMode",
        "label": "提示模式",
        "required": false
      },
      {
        "key": "conditionEnabled",
        "label": "启用条件",
        "required": false
      },
      {
        "key": "conditionLeft",
        "label": "条件判断",
        "required": false
      },
      {
        "key": "conditionFailMsg",
        "label": "条件不满足提示",
        "required": false
      },
      {
        "key": "continueOnConditionFail",
        "label": "条件不满足继续后续动作",
        "required": false
      },
      {
        "key": "confirmTitle",
        "label": "弹窗标题",
        "required": false
      },
      {
        "key": "confirmContent",
        "label": "弹窗内容",
        "required": false
      },
      {
        "key": "confirmText",
        "label": "确认按钮文本",
        "required": false
      },
      {
        "key": "cancelText",
        "label": "取消按钮文本",
        "required": false
      },
      {
        "key": "formId",
        "label": "移动表单ID",
        "required": false
      },
      {
        "key": "idField",
        "label": "主键字段名",
        "required": false
      },
      {
        "key": "dbId",
        "label": "数据库ID",
        "required": false
      },
      {
        "key": "tableName",
        "label": "数据表名",
        "required": false
      },
      {
        "key": "cpclModel",
        "label": "蓝牙打印指令",
        "required": false
      },
      {
        "key": "printFileId",
        "label": "打印模板",
        "required": false
      },
      {
        "key": "prop",
        "label": "字段名",
        "required": false
      },
      {
        "key": "tabCardBatchWidth",
        "label": "批量设置",
        "required": false
      },
      {
        "key": "text",
        "label": "按钮文本",
        "required": false
      },
      {
        "key": "type",
        "label": "按钮类型",
        "required": true
      },
      {
        "key": "inputType",
        "label": "输入类型",
        "required": false
      },
      {
        "key": "pickerType",
        "label": "选择器类型",
        "required": false
      },
      {
        "key": "value",
        "label": "选项值",
        "required": false
      },
      {
        "key": "placeholder",
        "label": "占位符",
        "required": false
      },
      {
        "key": "cardComponentBatchWidth",
        "label": "批量设置",
        "required": false
      },
      {
        "key": "textColor",
        "label": "文字颜色",
        "required": false
      },
      {
        "key": "backend",
        "label": "后端字段",
        "required": false
      },
      {
        "key": "frontend",
        "label": "前端展示字段",
        "required": false
      }
    ],
    "example": {
      "REPORT_CODE": "AT-001",
      "REPORT_TITLE": "自动化样例001",
      "ICON": "图标测试值",
      "TERMINAL": "发布终端测试值",
      "PARENT_MENU_ID": "上级菜单测试值",
      "Link_Url": "路由地址测试值",
      "selectionType": "选择类型测试值",
      "viewMode": "列表显示方式测试值",
      "name": "自动化样例001",
      "title": "组件标题测试值",
      "buttonText": "按钮文本测试值",
      "buttonType": "按钮类型测试值",
      "buttonSize": "按钮大小测试值",
      "block": "块级按钮测试值",
      "disabled": "Y",
      "label": "查询字段测试值",
      "apiUrl": "API地址测试值",
      "field": "数据字段测试值",
      "height": "卡片高度测试值",
      "labelColor": "标签颜色测试值",
      "valueColor": "值颜色测试值",
      "tableSelectModel": "卡片字段测试值",
      "activeTab": "当前激活标签测试值",
      "tabs": "标签页列表测试值",
      "color": "标签样式测试值",
      "fontSize": "字体大小测试值",
      "width": "宽度测试值",
      "formatType": "格式化类型测试值",
      "dateFormat": "日期格式测试值",
      "dictCode": "字典代码测试值",
      "key": "键值映射测试值",
      "formatFunction": "格式化函数测试值",
      "showSearch": "启用搜索测试值",
      "actionType": "动作类型测试值",
      "service": "服务地址测试值",
      "ajaxDataString": "请求参数 (JSON)测试值",
      "method": "请求方法测试值",
      "dataPath": "数据路径测试值",
      "pageId": "AT-001",
      "mode": "打开方式测试值",
      "msg": "提示内容测试值",
      "status": "提示类型测试值",
      "toastMode": "提示模式测试值",
      "conditionEnabled": "启用条件测试值",
      "conditionLeft": "条件判断测试值",
      "conditionFailMsg": "条件不满足提示测试值",
      "continueOnConditionFail": "条件不满足继续后续动作测试值",
      "confirmTitle": "弹窗标题测试值",
      "confirmContent": "弹窗内容测试值",
      "confirmText": "确认按钮文本测试值",
      "cancelText": "取消按钮文本测试值",
      "formId": "AT-001",
      "idField": "主键字段名测试值",
      "dbId": "AT-001",
      "tableName": "数据表名测试值",
      "cpclModel": "蓝牙打印指令测试值",
      "printFileId": "打印模板测试值",
      "prop": "字段名测试值",
      "tabCardBatchWidth": "批量设置测试值",
      "text": "按钮文本测试值",
      "type": "按钮类型测试值",
      "inputType": "输入类型测试值",
      "pickerType": "选择器类型测试值",
      "value": "选项值测试值",
      "placeholder": "占位符测试值",
      "cardComponentBatchWidth": "批量设置测试值",
      "textColor": "文字颜色测试值",
      "backend": "后端字段测试值",
      "frontend": "前端展示字段测试值"
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
        "添加查询字段",
        "搜索",
        "查询"
      ],
      "trigger": "button",
      "sourceHandlers": [
        "removeTabFilterField(index)"
      ],
      "testData": {
        "REPORT_CODE": "AT-001",
        "REPORT_TITLE": "自动化样例001",
        "ICON": "图标测试值",
        "TERMINAL": "发布终端测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "Link_Url": "路由地址测试值",
        "selectionType": "选择类型测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "title": "组件标题测试值",
        "buttonText": "按钮文本测试值",
        "buttonType": "按钮类型测试值",
        "buttonSize": "按钮大小测试值",
        "block": "块级按钮测试值",
        "disabled": "Y",
        "label": "查询字段测试值",
        "apiUrl": "API地址测试值",
        "field": "数据字段测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "tableSelectModel": "卡片字段测试值",
        "activeTab": "当前激活标签测试值",
        "tabs": "标签页列表测试值",
        "color": "标签样式测试值",
        "fontSize": "字体大小测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "dictCode": "字典代码测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "showSearch": "启用搜索测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "ajaxDataString": "请求参数 (JSON)测试值",
        "method": "请求方法测试值",
        "dataPath": "数据路径测试值",
        "pageId": "AT-001",
        "mode": "打开方式测试值",
        "msg": "提示内容测试值",
        "status": "提示类型测试值",
        "toastMode": "提示模式测试值",
        "conditionEnabled": "启用条件测试值",
        "conditionLeft": "条件判断测试值",
        "conditionFailMsg": "条件不满足提示测试值",
        "continueOnConditionFail": "条件不满足继续后续动作测试值",
        "confirmTitle": "弹窗标题测试值",
        "confirmContent": "弹窗内容测试值",
        "confirmText": "确认按钮文本测试值",
        "cancelText": "取消按钮文本测试值",
        "formId": "AT-001",
        "idField": "主键字段名测试值",
        "dbId": "AT-001",
        "tableName": "数据表名测试值",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "text": "按钮文本测试值",
        "type": "按钮类型测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "value": "选项值测试值",
        "placeholder": "占位符测试值",
        "cardComponentBatchWidth": "批量设置测试值",
        "textColor": "文字颜色测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值"
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
      "key": "ef879b4ced-json-93064",
      "type": "导出入口",
      "name": "导出JSON业务入口校验",
      "label": "导出JSON",
      "handler": "exportJson",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出JSON",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-json-8237c",
      "type": "导入入口",
      "name": "导入JSON业务入口校验",
      "label": "导入JSON",
      "handler": "importJson",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入JSON",
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
      "key": "7e002f9936-94f172d02f-8f6a0",
      "type": "业务动作",
      "name": "发布业务入口校验",
      "label": "发布",
      "handler": "publishConfig",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位发布",
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
      "key": "13fd57e65b-697c644264-cc47e",
      "type": "新增表单",
      "name": "添加卡片字段业务入口校验",
      "label": "添加卡片字段",
      "handler": "removeTabCardField(index)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加卡片字段",
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
          "key": "REPORT_CODE",
          "label": "编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "REPORT_TITLE",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "TERMINAL",
          "label": "发布终端",
          "required": false,
          "example": "发布终端测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "viewMode",
          "label": "列表显示方式",
          "required": false,
          "example": "列表显示方式测试值"
        },
        {
          "key": "name",
          "label": "组件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "title",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "block",
          "label": "块级按钮",
          "required": false,
          "example": "块级按钮测试值"
        },
        {
          "key": "disabled",
          "label": "禁用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "label",
          "label": "查询字段",
          "required": false,
          "example": "查询字段测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "field",
          "label": "数据字段",
          "required": false,
          "example": "数据字段测试值"
        },
        {
          "key": "height",
          "label": "卡片高度",
          "required": false,
          "example": "卡片高度测试值"
        },
        {
          "key": "labelColor",
          "label": "标签颜色",
          "required": false,
          "example": "标签颜色测试值"
        },
        {
          "key": "valueColor",
          "label": "值颜色",
          "required": false,
          "example": "值颜色测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "color",
          "label": "标签样式",
          "required": false,
          "example": "标签样式测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "width",
          "label": "宽度",
          "required": false,
          "example": "宽度测试值"
        },
        {
          "key": "formatType",
          "label": "格式化类型",
          "required": false,
          "example": "格式化类型测试值"
        },
        {
          "key": "dateFormat",
          "label": "日期格式",
          "required": false,
          "example": "日期格式测试值"
        },
        {
          "key": "dictCode",
          "label": "字典代码",
          "required": false,
          "example": "字典代码测试值"
        },
        {
          "key": "key",
          "label": "键值映射",
          "required": false,
          "example": "键值映射测试值"
        },
        {
          "key": "formatFunction",
          "label": "格式化函数",
          "required": false,
          "example": "格式化函数测试值"
        },
        {
          "key": "showSearch",
          "label": "启用搜索",
          "required": false,
          "example": "启用搜索测试值"
        },
        {
          "key": "actionType",
          "label": "动作类型",
          "required": true,
          "example": "动作类型测试值"
        },
        {
          "key": "service",
          "label": "服务地址",
          "required": true,
          "example": "服务地址测试值"
        },
        {
          "key": "ajaxDataString",
          "label": "请求参数 (JSON)",
          "required": false,
          "example": "请求参数 (JSON)测试值"
        },
        {
          "key": "method",
          "label": "请求方法",
          "required": true,
          "example": "请求方法测试值"
        },
        {
          "key": "dataPath",
          "label": "数据路径",
          "required": false,
          "example": "数据路径测试值"
        },
        {
          "key": "pageId",
          "label": "目标页面代码/ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "mode",
          "label": "打开方式",
          "required": false,
          "example": "打开方式测试值"
        },
        {
          "key": "msg",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "status",
          "label": "提示类型",
          "required": false,
          "example": "提示类型测试值"
        },
        {
          "key": "toastMode",
          "label": "提示模式",
          "required": false,
          "example": "提示模式测试值"
        },
        {
          "key": "conditionEnabled",
          "label": "启用条件",
          "required": false,
          "example": "启用条件测试值"
        },
        {
          "key": "conditionLeft",
          "label": "条件判断",
          "required": false,
          "example": "条件判断测试值"
        },
        {
          "key": "conditionFailMsg",
          "label": "条件不满足提示",
          "required": false,
          "example": "条件不满足提示测试值"
        },
        {
          "key": "continueOnConditionFail",
          "label": "条件不满足继续后续动作",
          "required": false,
          "example": "条件不满足继续后续动作测试值"
        },
        {
          "key": "confirmTitle",
          "label": "弹窗标题",
          "required": false,
          "example": "弹窗标题测试值"
        },
        {
          "key": "confirmContent",
          "label": "弹窗内容",
          "required": false,
          "example": "弹窗内容测试值"
        },
        {
          "key": "confirmText",
          "label": "确认按钮文本",
          "required": false,
          "example": "确认按钮文本测试值"
        },
        {
          "key": "cancelText",
          "label": "取消按钮文本",
          "required": false,
          "example": "取消按钮文本测试值"
        },
        {
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "idField",
          "label": "主键字段名",
          "required": false,
          "example": "主键字段名测试值"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "tableName",
          "label": "数据表名",
          "required": false,
          "example": "数据表名测试值"
        },
        {
          "key": "cpclModel",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "printFileId",
          "label": "打印模板",
          "required": false,
          "example": "打印模板测试值"
        },
        {
          "key": "prop",
          "label": "字段名",
          "required": false,
          "example": "字段名测试值"
        },
        {
          "key": "tabCardBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "type",
          "label": "按钮类型",
          "required": true,
          "example": "按钮类型测试值"
        },
        {
          "key": "inputType",
          "label": "输入类型",
          "required": false,
          "example": "输入类型测试值"
        },
        {
          "key": "pickerType",
          "label": "选择器类型",
          "required": false,
          "example": "选择器类型测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色",
          "required": false,
          "example": "文字颜色测试值"
        },
        {
          "key": "backend",
          "label": "后端字段",
          "required": false,
          "example": "后端字段测试值"
        },
        {
          "key": "frontend",
          "label": "前端展示字段",
          "required": false,
          "example": "前端展示字段测试值"
        }
      ],
      "testData": {
        "REPORT_CODE": "AT-001",
        "REPORT_TITLE": "自动化样例001",
        "ICON": "图标测试值",
        "TERMINAL": "发布终端测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "Link_Url": "路由地址测试值",
        "selectionType": "选择类型测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "title": "组件标题测试值",
        "buttonText": "按钮文本测试值",
        "buttonType": "按钮类型测试值",
        "buttonSize": "按钮大小测试值",
        "block": "块级按钮测试值",
        "disabled": "Y",
        "label": "查询字段测试值",
        "apiUrl": "API地址测试值",
        "field": "数据字段测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "tableSelectModel": "卡片字段测试值",
        "activeTab": "当前激活标签测试值",
        "tabs": "标签页列表测试值",
        "color": "标签样式测试值",
        "fontSize": "字体大小测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "dictCode": "字典代码测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "showSearch": "启用搜索测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "ajaxDataString": "请求参数 (JSON)测试值",
        "method": "请求方法测试值",
        "dataPath": "数据路径测试值",
        "pageId": "AT-001",
        "mode": "打开方式测试值",
        "msg": "提示内容测试值",
        "status": "提示类型测试值",
        "toastMode": "提示模式测试值",
        "conditionEnabled": "启用条件测试值",
        "conditionLeft": "条件判断测试值",
        "conditionFailMsg": "条件不满足提示测试值",
        "continueOnConditionFail": "条件不满足继续后续动作测试值",
        "confirmTitle": "弹窗标题测试值",
        "confirmContent": "弹窗内容测试值",
        "confirmText": "确认按钮文本测试值",
        "cancelText": "取消按钮文本测试值",
        "formId": "AT-001",
        "idField": "主键字段名测试值",
        "dbId": "AT-001",
        "tableName": "数据表名测试值",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "text": "按钮文本测试值",
        "type": "按钮类型测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "value": "选项值测试值",
        "placeholder": "占位符测试值",
        "cardComponentBatchWidth": "批量设置测试值",
        "textColor": "文字颜色测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值"
      }
    },
    {
      "key": "7e002f9936-d7d7ce790b-00eb6",
      "type": "业务动作",
      "name": "配置业务入口校验",
      "label": "配置",
      "handler": "$emit('open-event-edit', item, 'click')",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "点击入口并校验页面反馈",
      "steps": [
        "点击配置",
        "校验路由、弹窗、抽屉、下载或消息反馈"
      ],
      "assertions": [
        "操作后产生路由、弹窗、抽屉、下载或消息反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-dfd257f78a-d1f3f",
      "type": "新增表单",
      "name": "添加按钮业务入口校验",
      "label": "添加按钮",
      "handler": "removeTabButton(index)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加按钮",
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
          "key": "REPORT_CODE",
          "label": "编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "REPORT_TITLE",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "TERMINAL",
          "label": "发布终端",
          "required": false,
          "example": "发布终端测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "viewMode",
          "label": "列表显示方式",
          "required": false,
          "example": "列表显示方式测试值"
        },
        {
          "key": "name",
          "label": "组件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "title",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "block",
          "label": "块级按钮",
          "required": false,
          "example": "块级按钮测试值"
        },
        {
          "key": "disabled",
          "label": "禁用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "label",
          "label": "查询字段",
          "required": false,
          "example": "查询字段测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "field",
          "label": "数据字段",
          "required": false,
          "example": "数据字段测试值"
        },
        {
          "key": "height",
          "label": "卡片高度",
          "required": false,
          "example": "卡片高度测试值"
        },
        {
          "key": "labelColor",
          "label": "标签颜色",
          "required": false,
          "example": "标签颜色测试值"
        },
        {
          "key": "valueColor",
          "label": "值颜色",
          "required": false,
          "example": "值颜色测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "color",
          "label": "标签样式",
          "required": false,
          "example": "标签样式测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "width",
          "label": "宽度",
          "required": false,
          "example": "宽度测试值"
        },
        {
          "key": "formatType",
          "label": "格式化类型",
          "required": false,
          "example": "格式化类型测试值"
        },
        {
          "key": "dateFormat",
          "label": "日期格式",
          "required": false,
          "example": "日期格式测试值"
        },
        {
          "key": "dictCode",
          "label": "字典代码",
          "required": false,
          "example": "字典代码测试值"
        },
        {
          "key": "key",
          "label": "键值映射",
          "required": false,
          "example": "键值映射测试值"
        },
        {
          "key": "formatFunction",
          "label": "格式化函数",
          "required": false,
          "example": "格式化函数测试值"
        },
        {
          "key": "showSearch",
          "label": "启用搜索",
          "required": false,
          "example": "启用搜索测试值"
        },
        {
          "key": "actionType",
          "label": "动作类型",
          "required": true,
          "example": "动作类型测试值"
        },
        {
          "key": "service",
          "label": "服务地址",
          "required": true,
          "example": "服务地址测试值"
        },
        {
          "key": "ajaxDataString",
          "label": "请求参数 (JSON)",
          "required": false,
          "example": "请求参数 (JSON)测试值"
        },
        {
          "key": "method",
          "label": "请求方法",
          "required": true,
          "example": "请求方法测试值"
        },
        {
          "key": "dataPath",
          "label": "数据路径",
          "required": false,
          "example": "数据路径测试值"
        },
        {
          "key": "pageId",
          "label": "目标页面代码/ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "mode",
          "label": "打开方式",
          "required": false,
          "example": "打开方式测试值"
        },
        {
          "key": "msg",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "status",
          "label": "提示类型",
          "required": false,
          "example": "提示类型测试值"
        },
        {
          "key": "toastMode",
          "label": "提示模式",
          "required": false,
          "example": "提示模式测试值"
        },
        {
          "key": "conditionEnabled",
          "label": "启用条件",
          "required": false,
          "example": "启用条件测试值"
        },
        {
          "key": "conditionLeft",
          "label": "条件判断",
          "required": false,
          "example": "条件判断测试值"
        },
        {
          "key": "conditionFailMsg",
          "label": "条件不满足提示",
          "required": false,
          "example": "条件不满足提示测试值"
        },
        {
          "key": "continueOnConditionFail",
          "label": "条件不满足继续后续动作",
          "required": false,
          "example": "条件不满足继续后续动作测试值"
        },
        {
          "key": "confirmTitle",
          "label": "弹窗标题",
          "required": false,
          "example": "弹窗标题测试值"
        },
        {
          "key": "confirmContent",
          "label": "弹窗内容",
          "required": false,
          "example": "弹窗内容测试值"
        },
        {
          "key": "confirmText",
          "label": "确认按钮文本",
          "required": false,
          "example": "确认按钮文本测试值"
        },
        {
          "key": "cancelText",
          "label": "取消按钮文本",
          "required": false,
          "example": "取消按钮文本测试值"
        },
        {
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "idField",
          "label": "主键字段名",
          "required": false,
          "example": "主键字段名测试值"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "tableName",
          "label": "数据表名",
          "required": false,
          "example": "数据表名测试值"
        },
        {
          "key": "cpclModel",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "printFileId",
          "label": "打印模板",
          "required": false,
          "example": "打印模板测试值"
        },
        {
          "key": "prop",
          "label": "字段名",
          "required": false,
          "example": "字段名测试值"
        },
        {
          "key": "tabCardBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "type",
          "label": "按钮类型",
          "required": true,
          "example": "按钮类型测试值"
        },
        {
          "key": "inputType",
          "label": "输入类型",
          "required": false,
          "example": "输入类型测试值"
        },
        {
          "key": "pickerType",
          "label": "选择器类型",
          "required": false,
          "example": "选择器类型测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色",
          "required": false,
          "example": "文字颜色测试值"
        },
        {
          "key": "backend",
          "label": "后端字段",
          "required": false,
          "example": "后端字段测试值"
        },
        {
          "key": "frontend",
          "label": "前端展示字段",
          "required": false,
          "example": "前端展示字段测试值"
        }
      ],
      "testData": {
        "REPORT_CODE": "AT-001",
        "REPORT_TITLE": "自动化样例001",
        "ICON": "图标测试值",
        "TERMINAL": "发布终端测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "Link_Url": "路由地址测试值",
        "selectionType": "选择类型测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "title": "组件标题测试值",
        "buttonText": "按钮文本测试值",
        "buttonType": "按钮类型测试值",
        "buttonSize": "按钮大小测试值",
        "block": "块级按钮测试值",
        "disabled": "Y",
        "label": "查询字段测试值",
        "apiUrl": "API地址测试值",
        "field": "数据字段测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "tableSelectModel": "卡片字段测试值",
        "activeTab": "当前激活标签测试值",
        "tabs": "标签页列表测试值",
        "color": "标签样式测试值",
        "fontSize": "字体大小测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "dictCode": "字典代码测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "showSearch": "启用搜索测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "ajaxDataString": "请求参数 (JSON)测试值",
        "method": "请求方法测试值",
        "dataPath": "数据路径测试值",
        "pageId": "AT-001",
        "mode": "打开方式测试值",
        "msg": "提示内容测试值",
        "status": "提示类型测试值",
        "toastMode": "提示模式测试值",
        "conditionEnabled": "启用条件测试值",
        "conditionLeft": "条件判断测试值",
        "conditionFailMsg": "条件不满足提示测试值",
        "continueOnConditionFail": "条件不满足继续后续动作测试值",
        "confirmTitle": "弹窗标题测试值",
        "confirmContent": "弹窗内容测试值",
        "confirmText": "确认按钮文本测试值",
        "cancelText": "取消按钮文本测试值",
        "formId": "AT-001",
        "idField": "主键字段名测试值",
        "dbId": "AT-001",
        "tableName": "数据表名测试值",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "text": "按钮文本测试值",
        "type": "按钮类型测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "value": "选项值测试值",
        "placeholder": "占位符测试值",
        "cardComponentBatchWidth": "批量设置测试值",
        "textColor": "文字颜色测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值"
      }
    },
    {
      "key": "13fd57e65b-f2772f08ad-567c5",
      "type": "新增表单",
      "name": "添加字段业务入口校验",
      "label": "添加字段",
      "handler": "addSearchField",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加字段",
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
          "key": "REPORT_CODE",
          "label": "编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "REPORT_TITLE",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "TERMINAL",
          "label": "发布终端",
          "required": false,
          "example": "发布终端测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "viewMode",
          "label": "列表显示方式",
          "required": false,
          "example": "列表显示方式测试值"
        },
        {
          "key": "name",
          "label": "组件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "title",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "block",
          "label": "块级按钮",
          "required": false,
          "example": "块级按钮测试值"
        },
        {
          "key": "disabled",
          "label": "禁用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "label",
          "label": "查询字段",
          "required": false,
          "example": "查询字段测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "field",
          "label": "数据字段",
          "required": false,
          "example": "数据字段测试值"
        },
        {
          "key": "height",
          "label": "卡片高度",
          "required": false,
          "example": "卡片高度测试值"
        },
        {
          "key": "labelColor",
          "label": "标签颜色",
          "required": false,
          "example": "标签颜色测试值"
        },
        {
          "key": "valueColor",
          "label": "值颜色",
          "required": false,
          "example": "值颜色测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "color",
          "label": "标签样式",
          "required": false,
          "example": "标签样式测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "width",
          "label": "宽度",
          "required": false,
          "example": "宽度测试值"
        },
        {
          "key": "formatType",
          "label": "格式化类型",
          "required": false,
          "example": "格式化类型测试值"
        },
        {
          "key": "dateFormat",
          "label": "日期格式",
          "required": false,
          "example": "日期格式测试值"
        },
        {
          "key": "dictCode",
          "label": "字典代码",
          "required": false,
          "example": "字典代码测试值"
        },
        {
          "key": "key",
          "label": "键值映射",
          "required": false,
          "example": "键值映射测试值"
        },
        {
          "key": "formatFunction",
          "label": "格式化函数",
          "required": false,
          "example": "格式化函数测试值"
        },
        {
          "key": "showSearch",
          "label": "启用搜索",
          "required": false,
          "example": "启用搜索测试值"
        },
        {
          "key": "actionType",
          "label": "动作类型",
          "required": true,
          "example": "动作类型测试值"
        },
        {
          "key": "service",
          "label": "服务地址",
          "required": true,
          "example": "服务地址测试值"
        },
        {
          "key": "ajaxDataString",
          "label": "请求参数 (JSON)",
          "required": false,
          "example": "请求参数 (JSON)测试值"
        },
        {
          "key": "method",
          "label": "请求方法",
          "required": true,
          "example": "请求方法测试值"
        },
        {
          "key": "dataPath",
          "label": "数据路径",
          "required": false,
          "example": "数据路径测试值"
        },
        {
          "key": "pageId",
          "label": "目标页面代码/ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "mode",
          "label": "打开方式",
          "required": false,
          "example": "打开方式测试值"
        },
        {
          "key": "msg",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "status",
          "label": "提示类型",
          "required": false,
          "example": "提示类型测试值"
        },
        {
          "key": "toastMode",
          "label": "提示模式",
          "required": false,
          "example": "提示模式测试值"
        },
        {
          "key": "conditionEnabled",
          "label": "启用条件",
          "required": false,
          "example": "启用条件测试值"
        },
        {
          "key": "conditionLeft",
          "label": "条件判断",
          "required": false,
          "example": "条件判断测试值"
        },
        {
          "key": "conditionFailMsg",
          "label": "条件不满足提示",
          "required": false,
          "example": "条件不满足提示测试值"
        },
        {
          "key": "continueOnConditionFail",
          "label": "条件不满足继续后续动作",
          "required": false,
          "example": "条件不满足继续后续动作测试值"
        },
        {
          "key": "confirmTitle",
          "label": "弹窗标题",
          "required": false,
          "example": "弹窗标题测试值"
        },
        {
          "key": "confirmContent",
          "label": "弹窗内容",
          "required": false,
          "example": "弹窗内容测试值"
        },
        {
          "key": "confirmText",
          "label": "确认按钮文本",
          "required": false,
          "example": "确认按钮文本测试值"
        },
        {
          "key": "cancelText",
          "label": "取消按钮文本",
          "required": false,
          "example": "取消按钮文本测试值"
        },
        {
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "idField",
          "label": "主键字段名",
          "required": false,
          "example": "主键字段名测试值"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "tableName",
          "label": "数据表名",
          "required": false,
          "example": "数据表名测试值"
        },
        {
          "key": "cpclModel",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "printFileId",
          "label": "打印模板",
          "required": false,
          "example": "打印模板测试值"
        },
        {
          "key": "prop",
          "label": "字段名",
          "required": false,
          "example": "字段名测试值"
        },
        {
          "key": "tabCardBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "type",
          "label": "按钮类型",
          "required": true,
          "example": "按钮类型测试值"
        },
        {
          "key": "inputType",
          "label": "输入类型",
          "required": false,
          "example": "输入类型测试值"
        },
        {
          "key": "pickerType",
          "label": "选择器类型",
          "required": false,
          "example": "选择器类型测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色",
          "required": false,
          "example": "文字颜色测试值"
        },
        {
          "key": "backend",
          "label": "后端字段",
          "required": false,
          "example": "后端字段测试值"
        },
        {
          "key": "frontend",
          "label": "前端展示字段",
          "required": false,
          "example": "前端展示字段测试值"
        }
      ],
      "testData": {
        "REPORT_CODE": "AT-001",
        "REPORT_TITLE": "自动化样例001",
        "ICON": "图标测试值",
        "TERMINAL": "发布终端测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "Link_Url": "路由地址测试值",
        "selectionType": "选择类型测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "title": "组件标题测试值",
        "buttonText": "按钮文本测试值",
        "buttonType": "按钮类型测试值",
        "buttonSize": "按钮大小测试值",
        "block": "块级按钮测试值",
        "disabled": "Y",
        "label": "查询字段测试值",
        "apiUrl": "API地址测试值",
        "field": "数据字段测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "tableSelectModel": "卡片字段测试值",
        "activeTab": "当前激活标签测试值",
        "tabs": "标签页列表测试值",
        "color": "标签样式测试值",
        "fontSize": "字体大小测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "dictCode": "字典代码测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "showSearch": "启用搜索测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "ajaxDataString": "请求参数 (JSON)测试值",
        "method": "请求方法测试值",
        "dataPath": "数据路径测试值",
        "pageId": "AT-001",
        "mode": "打开方式测试值",
        "msg": "提示内容测试值",
        "status": "提示类型测试值",
        "toastMode": "提示模式测试值",
        "conditionEnabled": "启用条件测试值",
        "conditionLeft": "条件判断测试值",
        "conditionFailMsg": "条件不满足提示测试值",
        "continueOnConditionFail": "条件不满足继续后续动作测试值",
        "confirmTitle": "弹窗标题测试值",
        "confirmContent": "弹窗内容测试值",
        "confirmText": "确认按钮文本测试值",
        "cancelText": "取消按钮文本测试值",
        "formId": "AT-001",
        "idField": "主键字段名测试值",
        "dbId": "AT-001",
        "tableName": "数据表名测试值",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "text": "按钮文本测试值",
        "type": "按钮类型测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "value": "选项值测试值",
        "placeholder": "占位符测试值",
        "cardComponentBatchWidth": "批量设置测试值",
        "textColor": "文字颜色测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-04939",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeDataField(index)",
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
      "key": "13fd57e65b-c657e35441-62247",
      "type": "新增表单",
      "name": "添加标签页业务入口校验",
      "label": "添加标签页",
      "handler": "removeTab(index)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加标签页",
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
          "key": "REPORT_CODE",
          "label": "编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "REPORT_TITLE",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "TERMINAL",
          "label": "发布终端",
          "required": false,
          "example": "发布终端测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "viewMode",
          "label": "列表显示方式",
          "required": false,
          "example": "列表显示方式测试值"
        },
        {
          "key": "name",
          "label": "组件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "title",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "block",
          "label": "块级按钮",
          "required": false,
          "example": "块级按钮测试值"
        },
        {
          "key": "disabled",
          "label": "禁用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "label",
          "label": "查询字段",
          "required": false,
          "example": "查询字段测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "field",
          "label": "数据字段",
          "required": false,
          "example": "数据字段测试值"
        },
        {
          "key": "height",
          "label": "卡片高度",
          "required": false,
          "example": "卡片高度测试值"
        },
        {
          "key": "labelColor",
          "label": "标签颜色",
          "required": false,
          "example": "标签颜色测试值"
        },
        {
          "key": "valueColor",
          "label": "值颜色",
          "required": false,
          "example": "值颜色测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "color",
          "label": "标签样式",
          "required": false,
          "example": "标签样式测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "width",
          "label": "宽度",
          "required": false,
          "example": "宽度测试值"
        },
        {
          "key": "formatType",
          "label": "格式化类型",
          "required": false,
          "example": "格式化类型测试值"
        },
        {
          "key": "dateFormat",
          "label": "日期格式",
          "required": false,
          "example": "日期格式测试值"
        },
        {
          "key": "dictCode",
          "label": "字典代码",
          "required": false,
          "example": "字典代码测试值"
        },
        {
          "key": "key",
          "label": "键值映射",
          "required": false,
          "example": "键值映射测试值"
        },
        {
          "key": "formatFunction",
          "label": "格式化函数",
          "required": false,
          "example": "格式化函数测试值"
        },
        {
          "key": "showSearch",
          "label": "启用搜索",
          "required": false,
          "example": "启用搜索测试值"
        },
        {
          "key": "actionType",
          "label": "动作类型",
          "required": true,
          "example": "动作类型测试值"
        },
        {
          "key": "service",
          "label": "服务地址",
          "required": true,
          "example": "服务地址测试值"
        },
        {
          "key": "ajaxDataString",
          "label": "请求参数 (JSON)",
          "required": false,
          "example": "请求参数 (JSON)测试值"
        },
        {
          "key": "method",
          "label": "请求方法",
          "required": true,
          "example": "请求方法测试值"
        },
        {
          "key": "dataPath",
          "label": "数据路径",
          "required": false,
          "example": "数据路径测试值"
        },
        {
          "key": "pageId",
          "label": "目标页面代码/ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "mode",
          "label": "打开方式",
          "required": false,
          "example": "打开方式测试值"
        },
        {
          "key": "msg",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "status",
          "label": "提示类型",
          "required": false,
          "example": "提示类型测试值"
        },
        {
          "key": "toastMode",
          "label": "提示模式",
          "required": false,
          "example": "提示模式测试值"
        },
        {
          "key": "conditionEnabled",
          "label": "启用条件",
          "required": false,
          "example": "启用条件测试值"
        },
        {
          "key": "conditionLeft",
          "label": "条件判断",
          "required": false,
          "example": "条件判断测试值"
        },
        {
          "key": "conditionFailMsg",
          "label": "条件不满足提示",
          "required": false,
          "example": "条件不满足提示测试值"
        },
        {
          "key": "continueOnConditionFail",
          "label": "条件不满足继续后续动作",
          "required": false,
          "example": "条件不满足继续后续动作测试值"
        },
        {
          "key": "confirmTitle",
          "label": "弹窗标题",
          "required": false,
          "example": "弹窗标题测试值"
        },
        {
          "key": "confirmContent",
          "label": "弹窗内容",
          "required": false,
          "example": "弹窗内容测试值"
        },
        {
          "key": "confirmText",
          "label": "确认按钮文本",
          "required": false,
          "example": "确认按钮文本测试值"
        },
        {
          "key": "cancelText",
          "label": "取消按钮文本",
          "required": false,
          "example": "取消按钮文本测试值"
        },
        {
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "idField",
          "label": "主键字段名",
          "required": false,
          "example": "主键字段名测试值"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "tableName",
          "label": "数据表名",
          "required": false,
          "example": "数据表名测试值"
        },
        {
          "key": "cpclModel",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "printFileId",
          "label": "打印模板",
          "required": false,
          "example": "打印模板测试值"
        },
        {
          "key": "prop",
          "label": "字段名",
          "required": false,
          "example": "字段名测试值"
        },
        {
          "key": "tabCardBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "type",
          "label": "按钮类型",
          "required": true,
          "example": "按钮类型测试值"
        },
        {
          "key": "inputType",
          "label": "输入类型",
          "required": false,
          "example": "输入类型测试值"
        },
        {
          "key": "pickerType",
          "label": "选择器类型",
          "required": false,
          "example": "选择器类型测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色",
          "required": false,
          "example": "文字颜色测试值"
        },
        {
          "key": "backend",
          "label": "后端字段",
          "required": false,
          "example": "后端字段测试值"
        },
        {
          "key": "frontend",
          "label": "前端展示字段",
          "required": false,
          "example": "前端展示字段测试值"
        }
      ],
      "testData": {
        "REPORT_CODE": "AT-001",
        "REPORT_TITLE": "自动化样例001",
        "ICON": "图标测试值",
        "TERMINAL": "发布终端测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "Link_Url": "路由地址测试值",
        "selectionType": "选择类型测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "title": "组件标题测试值",
        "buttonText": "按钮文本测试值",
        "buttonType": "按钮类型测试值",
        "buttonSize": "按钮大小测试值",
        "block": "块级按钮测试值",
        "disabled": "Y",
        "label": "查询字段测试值",
        "apiUrl": "API地址测试值",
        "field": "数据字段测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "tableSelectModel": "卡片字段测试值",
        "activeTab": "当前激活标签测试值",
        "tabs": "标签页列表测试值",
        "color": "标签样式测试值",
        "fontSize": "字体大小测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "dictCode": "字典代码测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "showSearch": "启用搜索测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "ajaxDataString": "请求参数 (JSON)测试值",
        "method": "请求方法测试值",
        "dataPath": "数据路径测试值",
        "pageId": "AT-001",
        "mode": "打开方式测试值",
        "msg": "提示内容测试值",
        "status": "提示类型测试值",
        "toastMode": "提示模式测试值",
        "conditionEnabled": "启用条件测试值",
        "conditionLeft": "条件判断测试值",
        "conditionFailMsg": "条件不满足提示测试值",
        "continueOnConditionFail": "条件不满足继续后续动作测试值",
        "confirmTitle": "弹窗标题测试值",
        "confirmContent": "弹窗内容测试值",
        "confirmText": "确认按钮文本测试值",
        "cancelText": "取消按钮文本测试值",
        "formId": "AT-001",
        "idField": "主键字段名测试值",
        "dbId": "AT-001",
        "tableName": "数据表名测试值",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "text": "按钮文本测试值",
        "type": "按钮类型测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "value": "选项值测试值",
        "placeholder": "占位符测试值",
        "cardComponentBatchWidth": "批量设置测试值",
        "textColor": "文字颜色测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值"
      }
    },
    {
      "key": "13fd57e65b-tab-27a15",
      "type": "新增表单",
      "name": "添加Tab业务入口校验",
      "label": "添加Tab",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加Tab",
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
          "key": "REPORT_CODE",
          "label": "编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "REPORT_TITLE",
          "label": "名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "TERMINAL",
          "label": "发布终端",
          "required": false,
          "example": "发布终端测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "viewMode",
          "label": "列表显示方式",
          "required": false,
          "example": "列表显示方式测试值"
        },
        {
          "key": "name",
          "label": "组件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "title",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "block",
          "label": "块级按钮",
          "required": false,
          "example": "块级按钮测试值"
        },
        {
          "key": "disabled",
          "label": "禁用状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "label",
          "label": "查询字段",
          "required": false,
          "example": "查询字段测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "field",
          "label": "数据字段",
          "required": false,
          "example": "数据字段测试值"
        },
        {
          "key": "height",
          "label": "卡片高度",
          "required": false,
          "example": "卡片高度测试值"
        },
        {
          "key": "labelColor",
          "label": "标签颜色",
          "required": false,
          "example": "标签颜色测试值"
        },
        {
          "key": "valueColor",
          "label": "值颜色",
          "required": false,
          "example": "值颜色测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "color",
          "label": "标签样式",
          "required": false,
          "example": "标签样式测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "width",
          "label": "宽度",
          "required": false,
          "example": "宽度测试值"
        },
        {
          "key": "formatType",
          "label": "格式化类型",
          "required": false,
          "example": "格式化类型测试值"
        },
        {
          "key": "dateFormat",
          "label": "日期格式",
          "required": false,
          "example": "日期格式测试值"
        },
        {
          "key": "dictCode",
          "label": "字典代码",
          "required": false,
          "example": "字典代码测试值"
        },
        {
          "key": "key",
          "label": "键值映射",
          "required": false,
          "example": "键值映射测试值"
        },
        {
          "key": "formatFunction",
          "label": "格式化函数",
          "required": false,
          "example": "格式化函数测试值"
        },
        {
          "key": "showSearch",
          "label": "启用搜索",
          "required": false,
          "example": "启用搜索测试值"
        },
        {
          "key": "actionType",
          "label": "动作类型",
          "required": true,
          "example": "动作类型测试值"
        },
        {
          "key": "service",
          "label": "服务地址",
          "required": true,
          "example": "服务地址测试值"
        },
        {
          "key": "ajaxDataString",
          "label": "请求参数 (JSON)",
          "required": false,
          "example": "请求参数 (JSON)测试值"
        },
        {
          "key": "method",
          "label": "请求方法",
          "required": true,
          "example": "请求方法测试值"
        },
        {
          "key": "dataPath",
          "label": "数据路径",
          "required": false,
          "example": "数据路径测试值"
        },
        {
          "key": "pageId",
          "label": "目标页面代码/ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "mode",
          "label": "打开方式",
          "required": false,
          "example": "打开方式测试值"
        },
        {
          "key": "msg",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "status",
          "label": "提示类型",
          "required": false,
          "example": "提示类型测试值"
        },
        {
          "key": "toastMode",
          "label": "提示模式",
          "required": false,
          "example": "提示模式测试值"
        },
        {
          "key": "conditionEnabled",
          "label": "启用条件",
          "required": false,
          "example": "启用条件测试值"
        },
        {
          "key": "conditionLeft",
          "label": "条件判断",
          "required": false,
          "example": "条件判断测试值"
        },
        {
          "key": "conditionFailMsg",
          "label": "条件不满足提示",
          "required": false,
          "example": "条件不满足提示测试值"
        },
        {
          "key": "continueOnConditionFail",
          "label": "条件不满足继续后续动作",
          "required": false,
          "example": "条件不满足继续后续动作测试值"
        },
        {
          "key": "confirmTitle",
          "label": "弹窗标题",
          "required": false,
          "example": "弹窗标题测试值"
        },
        {
          "key": "confirmContent",
          "label": "弹窗内容",
          "required": false,
          "example": "弹窗内容测试值"
        },
        {
          "key": "confirmText",
          "label": "确认按钮文本",
          "required": false,
          "example": "确认按钮文本测试值"
        },
        {
          "key": "cancelText",
          "label": "取消按钮文本",
          "required": false,
          "example": "取消按钮文本测试值"
        },
        {
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "idField",
          "label": "主键字段名",
          "required": false,
          "example": "主键字段名测试值"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "tableName",
          "label": "数据表名",
          "required": false,
          "example": "数据表名测试值"
        },
        {
          "key": "cpclModel",
          "label": "蓝牙打印指令",
          "required": false,
          "example": "蓝牙打印指令测试值"
        },
        {
          "key": "printFileId",
          "label": "打印模板",
          "required": false,
          "example": "打印模板测试值"
        },
        {
          "key": "prop",
          "label": "字段名",
          "required": false,
          "example": "字段名测试值"
        },
        {
          "key": "tabCardBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "type",
          "label": "按钮类型",
          "required": true,
          "example": "按钮类型测试值"
        },
        {
          "key": "inputType",
          "label": "输入类型",
          "required": false,
          "example": "输入类型测试值"
        },
        {
          "key": "pickerType",
          "label": "选择器类型",
          "required": false,
          "example": "选择器类型测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色",
          "required": false,
          "example": "文字颜色测试值"
        },
        {
          "key": "backend",
          "label": "后端字段",
          "required": false,
          "example": "后端字段测试值"
        },
        {
          "key": "frontend",
          "label": "前端展示字段",
          "required": false,
          "example": "前端展示字段测试值"
        }
      ],
      "testData": {
        "REPORT_CODE": "AT-001",
        "REPORT_TITLE": "自动化样例001",
        "ICON": "图标测试值",
        "TERMINAL": "发布终端测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "Link_Url": "路由地址测试值",
        "selectionType": "选择类型测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "title": "组件标题测试值",
        "buttonText": "按钮文本测试值",
        "buttonType": "按钮类型测试值",
        "buttonSize": "按钮大小测试值",
        "block": "块级按钮测试值",
        "disabled": "Y",
        "label": "查询字段测试值",
        "apiUrl": "API地址测试值",
        "field": "数据字段测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "tableSelectModel": "卡片字段测试值",
        "activeTab": "当前激活标签测试值",
        "tabs": "标签页列表测试值",
        "color": "标签样式测试值",
        "fontSize": "字体大小测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "dictCode": "字典代码测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "showSearch": "启用搜索测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "ajaxDataString": "请求参数 (JSON)测试值",
        "method": "请求方法测试值",
        "dataPath": "数据路径测试值",
        "pageId": "AT-001",
        "mode": "打开方式测试值",
        "msg": "提示内容测试值",
        "status": "提示类型测试值",
        "toastMode": "提示模式测试值",
        "conditionEnabled": "启用条件测试值",
        "conditionLeft": "条件判断测试值",
        "conditionFailMsg": "条件不满足提示测试值",
        "continueOnConditionFail": "条件不满足继续后续动作测试值",
        "confirmTitle": "弹窗标题测试值",
        "confirmContent": "弹窗内容测试值",
        "confirmText": "确认按钮文本测试值",
        "cancelText": "取消按钮文本测试值",
        "formId": "AT-001",
        "idField": "主键字段名测试值",
        "dbId": "AT-001",
        "tableName": "数据表名测试值",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "text": "按钮文本测试值",
        "type": "按钮类型测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "value": "选项值测试值",
        "placeholder": "占位符测试值",
        "cardComponentBatchWidth": "批量设置测试值",
        "textColor": "文字颜色测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值"
      }
    }
  ]
});
