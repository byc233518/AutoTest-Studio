// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "base-page-dynamic-page-config-index-1bebc5",
  "name": "基座系统 - 零码开发功能校验",
  "displayName": "零码开发",
  "route": "/DynamicPageConfig/Index",
  "sourceRoute": "/DynamicPageConfig/Index",
  "menuCode": "DynamicPageConfig",
  "breadcrumb": "配置中心 / 表单管理 / 零码开发",
  "sourceFile": "src/views/DynamicPageConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "REPORT_TITLE",
      "REPORT_CODE",
      "TERMINAL",
      "REMARK",
      "REPORT_TYPE",
      "DataSourceType",
      "dbLinkId",
      "dbTableName",
      "dictionary",
      "idField",
      "parentField",
      "nameField",
      "sortField",
      "sortOrder",
      "expandLevel",
      "showSearch",
      "nodePermissions",
      "nodeAction",
      "bindField",
      "listBindField",
      "customScript",
      "DB_LINK_ID",
      "SQL",
      "SQL_SORT",
      "AutoQuery",
      "RequiredCondition",
      "ORD_IDX",
      "PARENT_STRING",
      "SUB_STRING",
      "TABLE_COLLECTION",
      "DbLinkId",
      "DbTableName",
      "Name",
      "ModuleBtnId",
      "ErrorHandling",
      "ColumnName",
      "RefType",
      "DataDicCode",
      "DataSourceId",
      "DataSourceExcelField",
      "DataSourceSaveField",
      "FixedValue",
      "CheckType",
      "CheckConfig",
      "ICON",
      "REF_FORM_ID",
      "PARENT_MENU_ID",
      "URL_ADDRESS",
      "enabled",
      "deviceTypes",
      "layout",
      "pageSize",
      "loadMode",
      "fieldName",
      "labelPosition",
      "labelWidth",
      "primaryColor",
      "backgroundColor",
      "fontSize",
      "placeholder",
      "defaultValue",
      "rules",
      "options",
      "content",
      "contentPosition",
      "direction",
      "dashed",
      "hairline",
      "columnCount",
      "gutter",
      "layoutType",
      "justify",
      "align",
      "field",
      "tabContentMaxHeight",
      "activeTab",
      "showIndex",
      "showDeleteButton",
      "selectionType",
      "label",
      "multiple",
      "maxCount",
      "maxSize",
      "accept",
      "previewSize",
      "previewImage",
      "previewFullImage",
      "imageFit",
      "uploadText",
      "deleteText",
      "required",
      "disabled",
      "showTooltip",
      "tooltipContent",
      "code",
      "buttonType",
      "size",
      "loading",
      "round",
      "square",
      "block",
      "color",
      "showTitle",
      "height",
      "labelColor",
      "valueColor",
      "activeValue",
      "inactiveValue",
      "activeColor",
      "inactiveColor",
      "dateType",
      "defaultPreset",
      "minDate",
      "maxDate",
      "clearable",
      "clearAction",
      "clearEventName",
      "popupType",
      "takeDataFieldType",
      "dataField",
      "labelFieldType",
      "labelField",
      "readonly",
      "scan",
      "suffix",
      "type",
      "optionType",
      "dictCode",
      "title",
      "minLength",
      "maxLength",
      "pattern",
      "dataFormatter",
      "showButtons",
      "actionType",
      "service",
      "mergeFormData",
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
      "targetField",
      "switchTab",
      "sourcePath",
      "appendMode",
      "silentToast",
      "scope",
      "fields",
      "failMsg",
      "focusFirstError",
      "tableName",
      "saveMode",
      "overrideApiPath",
      "commonSaveDataString",
      "Link_Url",
      "viewMode",
      "name",
      "buttonText",
      "buttonSize",
      "apiUrl",
      "tableSelectModel",
      "tabs",
      "width",
      "formatType",
      "dateFormat",
      "key",
      "formatFunction",
      "formId",
      "dbId",
      "cpclModel",
      "printFileId",
      "SQL_Content",
      "SubSQL_Content",
      "displayName",
      "format",
      "renderType",
      "textColor",
      "value",
      "text",
      "backend",
      "frontend",
      "compareLeft",
      "compareRight",
      "trueTemplate",
      "falseTemplate",
      "prop",
      "tabCardBatchWidth",
      "inputType",
      "pickerType",
      "cardComponentBatchWidth"
    ],
    "required": [
      "REPORT_TITLE",
      "REPORT_CODE",
      "TERMINAL",
      "REPORT_TYPE",
      "dbLinkId",
      "dbTableName",
      "dictionary",
      "idField",
      "nameField",
      "sortField",
      "expandLevel",
      "nodePermissions",
      "bindField",
      "DbLinkId",
      "DbTableName",
      "Name",
      "ModuleBtnId",
      "ErrorHandling",
      "RefType",
      "DataDicCode",
      "DataSourceId",
      "DataSourceExcelField",
      "DataSourceSaveField",
      "FixedValue",
      "options",
      "type",
      "actionType",
      "service",
      "method",
      "fields",
      "tabs"
    ],
    "fields": [
      {
        "key": "REPORT_TITLE",
        "label": "报表名称",
        "required": true
      },
      {
        "key": "REPORT_CODE",
        "label": "报表编码",
        "required": true
      },
      {
        "key": "TERMINAL",
        "label": "终端类型",
        "required": true
      },
      {
        "key": "REMARK",
        "label": "描述",
        "required": false
      },
      {
        "key": "REPORT_TYPE",
        "label": "页面类型",
        "required": true
      },
      {
        "key": "DataSourceType",
        "label": "数据来源类型",
        "required": false
      },
      {
        "key": "dbLinkId",
        "label": "选择数据库",
        "required": true
      },
      {
        "key": "dbTableName",
        "label": "选择数据库表",
        "required": true
      },
      {
        "key": "dictionary",
        "label": "选择字典",
        "required": true
      },
      {
        "key": "idField",
        "label": "ID字段",
        "required": true
      },
      {
        "key": "parentField",
        "label": "父节点字段",
        "required": false
      },
      {
        "key": "nameField",
        "label": "名称字段",
        "required": true
      },
      {
        "key": "sortField",
        "label": "排序字段",
        "required": true
      },
      {
        "key": "sortOrder",
        "label": "排序方式",
        "required": false
      },
      {
        "key": "expandLevel",
        "label": "初始展开层级",
        "required": true
      },
      {
        "key": "showSearch",
        "label": "是否显示搜索框",
        "required": false
      },
      {
        "key": "nodePermissions",
        "label": "节点操作权限",
        "required": true
      },
      {
        "key": "nodeAction",
        "label": "节点选中动作",
        "required": false
      },
      {
        "key": "bindField",
        "label": "树形联动字段",
        "required": true
      },
      {
        "key": "listBindField",
        "label": "列表联动字段",
        "required": false
      },
      {
        "key": "customScript",
        "label": "脚本配置",
        "required": false
      },
      {
        "key": "DB_LINK_ID",
        "label": "数据库",
        "required": false
      },
      {
        "key": "SQL",
        "label": "报表查询",
        "required": false
      },
      {
        "key": "SQL_SORT",
        "label": "排序方式",
        "required": false
      },
      {
        "key": "AutoQuery",
        "label": "开启初始化查询",
        "required": false
      },
      {
        "key": "RequiredCondition",
        "label": "开启强制条件查询",
        "required": false
      },
      {
        "key": "ORD_IDX",
        "label": "子表序号",
        "required": false
      },
      {
        "key": "PARENT_STRING",
        "label": "主表关联",
        "required": false
      },
      {
        "key": "SUB_STRING",
        "label": "子表关联",
        "required": false
      },
      {
        "key": "TABLE_COLLECTION",
        "label": "表名",
        "required": false
      },
      {
        "key": "DbLinkId",
        "label": "数据库",
        "required": true
      },
      {
        "key": "DbTableName",
        "label": "表名",
        "required": true
      },
      {
        "key": "Name",
        "label": "模板名称",
        "required": true
      },
      {
        "key": "ModuleBtnId",
        "label": "绑定按钮",
        "required": true
      },
      {
        "key": "ErrorHandling",
        "label": "错误机制",
        "required": true
      },
      {
        "key": "ColumnName",
        "label": "字段",
        "required": false
      },
      {
        "key": "RefType",
        "label": "关联类型",
        "required": true
      },
      {
        "key": "DataDicCode",
        "label": "数据字典",
        "required": true
      },
      {
        "key": "DataSourceId",
        "label": "数据源",
        "required": true
      },
      {
        "key": "DataSourceExcelField",
        "label": "导入字段",
        "required": true
      },
      {
        "key": "DataSourceSaveField",
        "label": "保存字段",
        "required": true
      },
      {
        "key": "FixedValue",
        "label": "固定值",
        "required": true
      },
      {
        "key": "CheckType",
        "label": "校验规则",
        "required": false
      },
      {
        "key": "CheckConfig",
        "label": "校验配置",
        "required": false
      },
      {
        "key": "ICON",
        "label": "图标",
        "required": false
      },
      {
        "key": "REF_FORM_ID",
        "label": "表单选择",
        "required": false
      },
      {
        "key": "PARENT_MENU_ID",
        "label": "上级菜单",
        "required": false
      },
      {
        "key": "URL_ADDRESS",
        "label": "路由地址",
        "required": false
      },
      {
        "key": "enabled",
        "label": "移动端启用",
        "required": false
      },
      {
        "key": "deviceTypes",
        "label": "设备类型",
        "required": false
      },
      {
        "key": "layout",
        "label": "列表布局",
        "required": false
      },
      {
        "key": "pageSize",
        "label": "每页显示",
        "required": false
      },
      {
        "key": "loadMode",
        "label": "加载方式",
        "required": false
      },
      {
        "key": "fieldName",
        "label": "显示字段配置",
        "required": false
      },
      {
        "key": "labelPosition",
        "label": "标签位置",
        "required": false
      },
      {
        "key": "labelWidth",
        "label": "标签宽度",
        "required": false
      },
      {
        "key": "primaryColor",
        "label": "主题色",
        "required": false
      },
      {
        "key": "backgroundColor",
        "label": "背景色",
        "required": false
      },
      {
        "key": "fontSize",
        "label": "字体大小",
        "required": false
      },
      {
        "key": "placeholder",
        "label": "占位符",
        "required": false
      },
      {
        "key": "defaultValue",
        "label": "默认值",
        "required": false
      },
      {
        "key": "rules",
        "label": "验证规则",
        "required": false
      },
      {
        "key": "options",
        "label": "选项配置",
        "required": true
      },
      {
        "key": "content",
        "label": "分割线内容",
        "required": false
      },
      {
        "key": "contentPosition",
        "label": "内容位置",
        "required": false
      },
      {
        "key": "direction",
        "label": "分割线方向",
        "required": false
      },
      {
        "key": "dashed",
        "label": "是否虚线",
        "required": false
      },
      {
        "key": "hairline",
        "label": "是否细线",
        "required": false
      },
      {
        "key": "columnCount",
        "label": "列数",
        "required": false
      },
      {
        "key": "gutter",
        "label": "列间距",
        "required": false
      },
      {
        "key": "layoutType",
        "label": "布局方式",
        "required": false
      },
      {
        "key": "justify",
        "label": "主轴对齐",
        "required": false
      },
      {
        "key": "align",
        "label": "交叉轴对齐",
        "required": false
      },
      {
        "key": "field",
        "label": "字段名称",
        "required": false
      },
      {
        "key": "tabContentMaxHeight",
        "label": "页签内容最大高度",
        "required": false
      },
      {
        "key": "activeTab",
        "label": "当前激活标签",
        "required": false
      },
      {
        "key": "showIndex",
        "label": "是否显示序号",
        "required": false
      },
      {
        "key": "showDeleteButton",
        "label": "是否显示删除按钮",
        "required": false
      },
      {
        "key": "selectionType",
        "label": "选择类型",
        "required": false
      },
      {
        "key": "label",
        "label": "组件标题",
        "required": false
      },
      {
        "key": "multiple",
        "label": "支持多选",
        "required": false
      },
      {
        "key": "maxCount",
        "label": "最大数量",
        "required": false
      },
      {
        "key": "maxSize",
        "label": "最大文件大小",
        "required": false
      },
      {
        "key": "accept",
        "label": "接受的文件类型",
        "required": false
      },
      {
        "key": "previewSize",
        "label": "预览尺寸",
        "required": false
      },
      {
        "key": "previewImage",
        "label": "显示预览",
        "required": false
      },
      {
        "key": "previewFullImage",
        "label": "支持全屏预览",
        "required": false
      },
      {
        "key": "imageFit",
        "label": "图片填充模式",
        "required": false
      },
      {
        "key": "uploadText",
        "label": "上传按钮文字",
        "required": false
      },
      {
        "key": "deleteText",
        "label": "删除按钮文字",
        "required": false
      },
      {
        "key": "required",
        "label": "是否必填",
        "required": false
      },
      {
        "key": "disabled",
        "label": "是否禁用",
        "required": false
      },
      {
        "key": "showTooltip",
        "label": "显示弹出提示",
        "required": false
      },
      {
        "key": "tooltipContent",
        "label": "提示内容",
        "required": false
      },
      {
        "key": "code",
        "label": "单据编码规则",
        "required": false
      },
      {
        "key": "buttonType",
        "label": "按钮类型",
        "required": false
      },
      {
        "key": "size",
        "label": "按钮尺寸",
        "required": false
      },
      {
        "key": "loading",
        "label": "是否加载中",
        "required": false
      },
      {
        "key": "round",
        "label": "是否圆角",
        "required": false
      },
      {
        "key": "square",
        "label": "是否方形",
        "required": false
      },
      {
        "key": "block",
        "label": "是否块级",
        "required": false
      },
      {
        "key": "color",
        "label": "按钮颜色",
        "required": false
      },
      {
        "key": "showTitle",
        "label": "是否显示标题",
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
        "key": "activeValue",
        "label": "开启时值",
        "required": false
      },
      {
        "key": "inactiveValue",
        "label": "关闭时值",
        "required": false
      },
      {
        "key": "activeColor",
        "label": "开启时颜色",
        "required": false
      },
      {
        "key": "inactiveColor",
        "label": "关闭时颜色",
        "required": false
      },
      {
        "key": "dateType",
        "label": "选择类型",
        "required": false
      },
      {
        "key": "defaultPreset",
        "label": "默认值类型",
        "required": false
      },
      {
        "key": "minDate",
        "label": "最小日期",
        "required": false
      },
      {
        "key": "maxDate",
        "label": "最大日期",
        "required": false
      },
      {
        "key": "clearable",
        "label": "支持清除",
        "required": false
      },
      {
        "key": "clearAction",
        "label": "清除动作",
        "required": false
      },
      {
        "key": "clearEventName",
        "label": "清除事件名称",
        "required": false
      },
      {
        "key": "popupType",
        "label": "弹框类型",
        "required": false
      },
      {
        "key": "takeDataFieldType",
        "label": "取值字段配置",
        "required": false
      },
      {
        "key": "dataField",
        "label": "取值字段",
        "required": false
      },
      {
        "key": "labelFieldType",
        "label": "显示字段配置",
        "required": false
      },
      {
        "key": "labelField",
        "label": "显示字段",
        "required": false
      },
      {
        "key": "readonly",
        "label": "是否只读",
        "required": false
      },
      {
        "key": "scan",
        "label": "支持扫码",
        "required": false
      },
      {
        "key": "suffix",
        "label": "输入后缀",
        "required": false
      },
      {
        "key": "type",
        "label": "组件类型",
        "required": true
      },
      {
        "key": "optionType",
        "label": "选项类型",
        "required": false
      },
      {
        "key": "dictCode",
        "label": "字典类型",
        "required": false
      },
      {
        "key": "title",
        "label": "标签页列表",
        "required": false
      },
      {
        "key": "minLength",
        "label": "最小长度",
        "required": false
      },
      {
        "key": "maxLength",
        "label": "最大长度",
        "required": false
      },
      {
        "key": "pattern",
        "label": "正则表达式",
        "required": false
      },
      {
        "key": "dataFormatter",
        "label": "数据格式化",
        "required": false
      },
      {
        "key": "showButtons",
        "label": "显示按钮",
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
        "key": "mergeFormData",
        "label": "与表单字段根级合并",
        "required": false
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
        "key": "targetField",
        "label": "联动赋值",
        "required": false
      },
      {
        "key": "switchTab",
        "label": "自动切换标签页",
        "required": false
      },
      {
        "key": "sourcePath",
        "label": "来源路径",
        "required": false
      },
      {
        "key": "appendMode",
        "label": "追加方式",
        "required": false
      },
      {
        "key": "silentToast",
        "label": "静默重置",
        "required": false
      },
      {
        "key": "scope",
        "label": "校验范围",
        "required": false
      },
      {
        "key": "fields",
        "label": "指定字段",
        "required": true
      },
      {
        "key": "failMsg",
        "label": "失败提示",
        "required": false
      },
      {
        "key": "focusFirstError",
        "label": "聚焦首个错误字段",
        "required": false
      },
      {
        "key": "tableName",
        "label": "数据表选择",
        "required": false
      },
      {
        "key": "saveMode",
        "label": "保存模式",
        "required": false
      },
      {
        "key": "overrideApiPath",
        "label": "自定义接口路径（可选）",
        "required": false
      },
      {
        "key": "commonSaveDataString",
        "label": "Data 模板 (JSON，可选)",
        "required": false
      },
      {
        "key": "Link_Url",
        "label": "路由地址",
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
        "key": "buttonText",
        "label": "按钮文本",
        "required": false
      },
      {
        "key": "buttonSize",
        "label": "按钮大小",
        "required": false
      },
      {
        "key": "apiUrl",
        "label": "API地址",
        "required": false
      },
      {
        "key": "tableSelectModel",
        "label": "卡片字段",
        "required": false
      },
      {
        "key": "tabs",
        "label": "标签页列表",
        "required": true
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
        "key": "formId",
        "label": "移动表单ID",
        "required": false
      },
      {
        "key": "dbId",
        "label": "数据库ID",
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
        "key": "SQL_Content",
        "label": "相关联SQL语句",
        "required": false
      },
      {
        "key": "SubSQL_Content",
        "label": "相关关联SQL语句",
        "required": false
      },
      {
        "key": "displayName",
        "label": "显示名称",
        "required": false
      },
      {
        "key": "format",
        "label": "格式化规则",
        "required": false
      },
      {
        "key": "renderType",
        "label": "渲染方式",
        "required": false
      },
      {
        "key": "textColor",
        "label": "文字颜色，如：",
        "required": false
      },
      {
        "key": "value",
        "label": "选项值",
        "required": false
      },
      {
        "key": "text",
        "label": "按钮文本",
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
      },
      {
        "key": "compareLeft",
        "label": "左操作数",
        "required": false
      },
      {
        "key": "compareRight",
        "label": "右操作数",
        "required": false
      },
      {
        "key": "trueTemplate",
        "label": "值模板",
        "required": false
      },
      {
        "key": "falseTemplate",
        "label": "值模板",
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
        "key": "cardComponentBatchWidth",
        "label": "批量设置",
        "required": false
      }
    ],
    "example": {
      "REPORT_TITLE": "自动化样例001",
      "REPORT_CODE": "AT-001",
      "TERMINAL": "终端类型测试值",
      "REMARK": "自动化测试备注001",
      "REPORT_TYPE": "页面类型测试值",
      "DataSourceType": "数据来源类型测试值",
      "dbLinkId": "选择数据库测试值",
      "dbTableName": "选择数据库表测试值",
      "dictionary": "选择字典测试值",
      "idField": "ID字段测试值",
      "parentField": "父节点字段测试值",
      "nameField": "名称字段测试值",
      "sortField": "排序字段测试值",
      "sortOrder": "排序方式测试值",
      "expandLevel": "初始展开层级测试值",
      "showSearch": "是否显示搜索框测试值",
      "nodePermissions": "节点操作权限测试值",
      "nodeAction": "节点选中动作测试值",
      "bindField": "树形联动字段测试值",
      "listBindField": "列表联动字段测试值",
      "customScript": "脚本配置测试值",
      "DB_LINK_ID": "数据库测试值",
      "SQL": "报表查询测试值",
      "SQL_SORT": "排序方式测试值",
      "AutoQuery": "开启初始化查询测试值",
      "RequiredCondition": "开启强制条件查询测试值",
      "ORD_IDX": "1",
      "PARENT_STRING": "主表关联测试值",
      "SUB_STRING": "子表关联测试值",
      "TABLE_COLLECTION": "表名测试值",
      "DbLinkId": "数据库测试值",
      "DbTableName": "表名测试值",
      "Name": "自动化样例001",
      "ModuleBtnId": "绑定按钮测试值",
      "ErrorHandling": "错误机制测试值",
      "ColumnName": "字段测试值",
      "RefType": "关联类型测试值",
      "DataDicCode": "数据字典测试值",
      "DataSourceId": "数据源测试值",
      "DataSourceExcelField": "导入字段测试值",
      "DataSourceSaveField": "保存字段测试值",
      "FixedValue": "固定值测试值",
      "CheckType": "校验规则测试值",
      "CheckConfig": "校验配置测试值",
      "ICON": "图标测试值",
      "REF_FORM_ID": "表单选择测试值",
      "PARENT_MENU_ID": "上级菜单测试值",
      "URL_ADDRESS": "路由地址测试值",
      "enabled": "Y",
      "deviceTypes": "设备类型测试值",
      "layout": "列表布局测试值",
      "pageSize": "每页显示测试值",
      "loadMode": "加载方式测试值",
      "fieldName": "显示字段配置测试值",
      "labelPosition": "标签位置测试值",
      "labelWidth": "标签宽度测试值",
      "primaryColor": "主题色测试值",
      "backgroundColor": "背景色测试值",
      "fontSize": "字体大小测试值",
      "placeholder": "占位符测试值",
      "defaultValue": "默认值测试值",
      "rules": "验证规则测试值",
      "options": "选项配置测试值",
      "content": "分割线内容测试值",
      "contentPosition": "内容位置测试值",
      "direction": "分割线方向测试值",
      "dashed": "是否虚线测试值",
      "hairline": "是否细线测试值",
      "columnCount": "列数测试值",
      "gutter": "列间距测试值",
      "layoutType": "布局方式测试值",
      "justify": "主轴对齐测试值",
      "align": "交叉轴对齐测试值",
      "field": "自动化样例001",
      "tabContentMaxHeight": "页签内容最大高度测试值",
      "activeTab": "当前激活标签测试值",
      "showIndex": "1",
      "showDeleteButton": "是否显示删除按钮测试值",
      "selectionType": "选择类型测试值",
      "label": "组件标题测试值",
      "multiple": "支持多选测试值",
      "maxCount": "1",
      "maxSize": "最大文件大小测试值",
      "accept": "接受的文件类型测试值",
      "previewSize": "预览尺寸测试值",
      "previewImage": "显示预览测试值",
      "previewFullImage": "支持全屏预览测试值",
      "imageFit": "图片填充模式测试值",
      "uploadText": "上传按钮文字测试值",
      "deleteText": "删除按钮文字测试值",
      "required": "是否必填测试值",
      "disabled": "是否禁用测试值",
      "showTooltip": "显示弹出提示测试值",
      "tooltipContent": "提示内容测试值",
      "code": "单据编码规则测试值",
      "buttonType": "按钮类型测试值",
      "size": "按钮尺寸测试值",
      "loading": "是否加载中测试值",
      "round": "是否圆角测试值",
      "square": "是否方形测试值",
      "block": "是否块级测试值",
      "color": "按钮颜色测试值",
      "showTitle": "是否显示标题测试值",
      "height": "卡片高度测试值",
      "labelColor": "标签颜色测试值",
      "valueColor": "值颜色测试值",
      "activeValue": "开启时值测试值",
      "inactiveValue": "关闭时值测试值",
      "activeColor": "开启时颜色测试值",
      "inactiveColor": "关闭时颜色测试值",
      "dateType": "选择类型测试值",
      "defaultPreset": "默认值类型测试值",
      "minDate": "2026-08-01",
      "maxDate": "2026-08-01",
      "clearable": "支持清除测试值",
      "clearAction": "清除动作测试值",
      "clearEventName": "自动化样例001",
      "popupType": "弹框类型测试值",
      "takeDataFieldType": "取值字段配置测试值",
      "dataField": "取值字段测试值",
      "labelFieldType": "显示字段配置测试值",
      "labelField": "显示字段测试值",
      "readonly": "是否只读测试值",
      "scan": "支持扫码测试值",
      "suffix": "输入后缀测试值",
      "type": "组件类型测试值",
      "optionType": "选项类型测试值",
      "dictCode": "字典类型测试值",
      "title": "标签页列表测试值",
      "minLength": "最小长度测试值",
      "maxLength": "最大长度测试值",
      "pattern": "正则表达式测试值",
      "dataFormatter": "数据格式化测试值",
      "showButtons": "显示按钮测试值",
      "actionType": "动作类型测试值",
      "service": "服务地址测试值",
      "mergeFormData": "与表单字段根级合并测试值",
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
      "targetField": "联动赋值测试值",
      "switchTab": "自动切换标签页测试值",
      "sourcePath": "来源路径测试值",
      "appendMode": "追加方式测试值",
      "silentToast": "静默重置测试值",
      "scope": "校验范围测试值",
      "fields": "指定字段测试值",
      "failMsg": "失败提示测试值",
      "focusFirstError": "聚焦首个错误字段测试值",
      "tableName": "数据表选择测试值",
      "saveMode": "保存模式测试值",
      "overrideApiPath": "自定义接口路径（可选）测试值",
      "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
      "Link_Url": "路由地址测试值",
      "viewMode": "列表显示方式测试值",
      "name": "自动化样例001",
      "buttonText": "按钮文本测试值",
      "buttonSize": "按钮大小测试值",
      "apiUrl": "API地址测试值",
      "tableSelectModel": "卡片字段测试值",
      "tabs": "标签页列表测试值",
      "width": "宽度测试值",
      "formatType": "格式化类型测试值",
      "dateFormat": "日期格式测试值",
      "key": "键值映射测试值",
      "formatFunction": "格式化函数测试值",
      "formId": "AT-001",
      "dbId": "AT-001",
      "cpclModel": "蓝牙打印指令测试值",
      "printFileId": "打印模板测试值",
      "SQL_Content": "相关联SQL语句测试值",
      "SubSQL_Content": "相关关联SQL语句测试值",
      "displayName": "自动化样例001",
      "format": "格式化规则测试值",
      "renderType": "渲染方式测试值",
      "textColor": "文字颜色，如：测试值",
      "value": "选项值测试值",
      "text": "按钮文本测试值",
      "backend": "后端字段测试值",
      "frontend": "前端展示字段测试值",
      "compareLeft": "左操作数测试值",
      "compareRight": "右操作数测试值",
      "trueTemplate": "值模板测试值",
      "falseTemplate": "值模板测试值",
      "prop": "字段名测试值",
      "tabCardBatchWidth": "批量设置测试值",
      "inputType": "输入类型测试值",
      "pickerType": "选择器类型测试值",
      "cardComponentBatchWidth": "批量设置测试值"
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
        "添加搜索字段",
        "添加查询字段",
        "搜索",
        "查询"
      ],
      "trigger": "button",
      "sourceHandlers": [
        "addSearchField",
        "removeTabFilterField(index)"
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-053a0",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "addClick",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "ef879b4ced-4ad38d72c9-5a84f",
      "type": "导出入口",
      "name": "脚本导出业务入口校验",
      "label": "脚本导出",
      "handler": "exportSql",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击脚本导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-dc5fb7a696-dc5fb",
      "type": "导入入口",
      "name": "配置导入业务入口校验",
      "label": "配置导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导入",
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
      "key": "ef879b4ced-ba43305377-e9df5",
      "type": "导出入口",
      "name": "配置导出业务入口校验",
      "label": "配置导出",
      "handler": "exportData",
      "permission": "",
      "menuTriggerLabel": "配置导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击配置导出",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-cefbe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(scope.row)",
      "permission": "",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-78e8f",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(scope.row)",
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
    },
    {
      "key": "13fd57e65b-884ecc62a1-39751",
      "type": "新增表单",
      "name": "新增子表业务入口校验",
      "label": "新增子表",
      "handler": "openCustomReportChild({ visible: true, chilFromData: {} })",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增子表",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "faea8c1db9-485c5e5520-67fdb",
      "type": "查看详情",
      "name": "配置脚本业务入口校验",
      "label": "配置脚本",
      "handler": "openScriptEditor",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击配置脚本",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "13fd57e65b-b047d29858-b8f05",
      "type": "新增表单",
      "name": "添加配置业务入口校验",
      "label": "添加配置",
      "handler": "GenerateAdd",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加配置",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "13fd57e65b-679b34085f-84186",
      "type": "新增表单",
      "name": "新增配置业务入口校验",
      "label": "新增配置",
      "handler": "GenerateAddSetting",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增配置",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "13fd57e65b-ce068961ea-ce068",
      "type": "新增表单",
      "name": "新增按钮业务入口校验",
      "label": "新增按钮",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增按钮",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "4aa22a22ac-8bfc466120-f2968",
      "type": "编辑表单",
      "name": "编辑按钮动作业务入口校验",
      "label": "编辑按钮动作",
      "handler": "openEditDialog(scope.row)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": true,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击编辑按钮动作",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "3d81345303-25eb4c781e-c22c2",
      "type": "重置",
      "name": "重置配置业务入口校验",
      "label": "重置配置",
      "handler": "resetConfig",
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
      "key": "13fd57e65b-db5b763bea-81cfa",
      "type": "新增表单",
      "name": "添加显示字段业务入口校验",
      "label": "添加显示字段",
      "handler": "addDisplayField",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加显示字段",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "13fd57e65b-3cca4ff424-cd42b",
      "type": "新增表单",
      "name": "添加表单控件业务入口校验",
      "label": "添加表单控件",
      "handler": "addFormControl",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加表单控件",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "ef879b4ced-json-5957f",
      "type": "导出入口",
      "name": "导出JSON业务入口校验",
      "label": "导出JSON",
      "handler": "$emit('export-json')",
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
      "key": "5f1787916c-json-6bb6d",
      "type": "导入入口",
      "name": "导入JSON业务入口校验",
      "label": "导入JSON",
      "handler": "$emit('import-json')",
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
      "key": "7e002f9936-4edd1d0087-48dc8",
      "type": "业务动作",
      "name": "复制业务入口校验",
      "label": "复制",
      "handler": "copyNestedField(tab, nestedField)",
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
      "key": "13fd57e65b-f2772f08ad-4f455",
      "type": "新增表单",
      "name": "添加字段业务入口校验",
      "label": "添加字段",
      "handler": "addCardField(field)",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "faea8c1db9-d7d7ce790b-15a65",
      "type": "查看详情",
      "name": "配置业务入口校验（查看详情）",
      "label": "配置",
      "handler": "openClearEventEditDialog(field)",
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
      "key": "13fd57e65b-aff6de897c-57306",
      "type": "新增表单",
      "name": "添加选项业务入口校验",
      "label": "添加选项",
      "handler": "addOption",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加选项",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "13fd57e65b-c657e35441-2c3f1",
      "type": "新增表单",
      "name": "添加标签页业务入口校验",
      "label": "添加标签页",
      "handler": "addTab",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "13fd57e65b-90fcf205d2-299f7",
      "type": "新增表单",
      "name": "添加列业务入口校验",
      "label": "添加列",
      "handler": "addColumn",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击添加列",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "13fd57e65b-dfd257f78a-1889e",
      "type": "新增表单",
      "name": "添加按钮业务入口校验",
      "label": "添加按钮",
      "handler": "removeButton(index)",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    },
    {
      "key": "7e002f9936-d7d7ce790b-00eb6",
      "type": "业务动作",
      "name": "配置业务入口校验（业务动作）",
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
          "key": "REPORT_TITLE",
          "label": "报表名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "REPORT_CODE",
          "label": "报表编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "TERMINAL",
          "label": "终端类型",
          "required": true,
          "example": "终端类型测试值"
        },
        {
          "key": "REMARK",
          "label": "描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "REPORT_TYPE",
          "label": "页面类型",
          "required": true,
          "example": "页面类型测试值"
        },
        {
          "key": "DataSourceType",
          "label": "数据来源类型",
          "required": false,
          "example": "数据来源类型测试值"
        },
        {
          "key": "dbLinkId",
          "label": "选择数据库",
          "required": true,
          "example": "选择数据库测试值"
        },
        {
          "key": "dbTableName",
          "label": "选择数据库表",
          "required": true,
          "example": "选择数据库表测试值"
        },
        {
          "key": "dictionary",
          "label": "选择字典",
          "required": true,
          "example": "选择字典测试值"
        },
        {
          "key": "idField",
          "label": "ID字段",
          "required": true,
          "example": "ID字段测试值"
        },
        {
          "key": "parentField",
          "label": "父节点字段",
          "required": false,
          "example": "父节点字段测试值"
        },
        {
          "key": "nameField",
          "label": "名称字段",
          "required": true,
          "example": "名称字段测试值"
        },
        {
          "key": "sortField",
          "label": "排序字段",
          "required": true,
          "example": "排序字段测试值"
        },
        {
          "key": "sortOrder",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "expandLevel",
          "label": "初始展开层级",
          "required": true,
          "example": "初始展开层级测试值"
        },
        {
          "key": "showSearch",
          "label": "是否显示搜索框",
          "required": false,
          "example": "是否显示搜索框测试值"
        },
        {
          "key": "nodePermissions",
          "label": "节点操作权限",
          "required": true,
          "example": "节点操作权限测试值"
        },
        {
          "key": "nodeAction",
          "label": "节点选中动作",
          "required": false,
          "example": "节点选中动作测试值"
        },
        {
          "key": "bindField",
          "label": "树形联动字段",
          "required": true,
          "example": "树形联动字段测试值"
        },
        {
          "key": "listBindField",
          "label": "列表联动字段",
          "required": false,
          "example": "列表联动字段测试值"
        },
        {
          "key": "customScript",
          "label": "脚本配置",
          "required": false,
          "example": "脚本配置测试值"
        },
        {
          "key": "DB_LINK_ID",
          "label": "数据库",
          "required": false,
          "example": "数据库测试值"
        },
        {
          "key": "SQL",
          "label": "报表查询",
          "required": false,
          "example": "报表查询测试值"
        },
        {
          "key": "SQL_SORT",
          "label": "排序方式",
          "required": false,
          "example": "排序方式测试值"
        },
        {
          "key": "AutoQuery",
          "label": "开启初始化查询",
          "required": false,
          "example": "开启初始化查询测试值"
        },
        {
          "key": "RequiredCondition",
          "label": "开启强制条件查询",
          "required": false,
          "example": "开启强制条件查询测试值"
        },
        {
          "key": "ORD_IDX",
          "label": "子表序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "PARENT_STRING",
          "label": "主表关联",
          "required": false,
          "example": "主表关联测试值"
        },
        {
          "key": "SUB_STRING",
          "label": "子表关联",
          "required": false,
          "example": "子表关联测试值"
        },
        {
          "key": "TABLE_COLLECTION",
          "label": "表名",
          "required": false,
          "example": "表名测试值"
        },
        {
          "key": "DbLinkId",
          "label": "数据库",
          "required": true,
          "example": "数据库测试值"
        },
        {
          "key": "DbTableName",
          "label": "表名",
          "required": true,
          "example": "表名测试值"
        },
        {
          "key": "Name",
          "label": "模板名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "ModuleBtnId",
          "label": "绑定按钮",
          "required": true,
          "example": "绑定按钮测试值"
        },
        {
          "key": "ErrorHandling",
          "label": "错误机制",
          "required": true,
          "example": "错误机制测试值"
        },
        {
          "key": "ColumnName",
          "label": "字段",
          "required": false,
          "example": "字段测试值"
        },
        {
          "key": "RefType",
          "label": "关联类型",
          "required": true,
          "example": "关联类型测试值"
        },
        {
          "key": "DataDicCode",
          "label": "数据字典",
          "required": true,
          "example": "数据字典测试值"
        },
        {
          "key": "DataSourceId",
          "label": "数据源",
          "required": true,
          "example": "数据源测试值"
        },
        {
          "key": "DataSourceExcelField",
          "label": "导入字段",
          "required": true,
          "example": "导入字段测试值"
        },
        {
          "key": "DataSourceSaveField",
          "label": "保存字段",
          "required": true,
          "example": "保存字段测试值"
        },
        {
          "key": "FixedValue",
          "label": "固定值",
          "required": true,
          "example": "固定值测试值"
        },
        {
          "key": "CheckType",
          "label": "校验规则",
          "required": false,
          "example": "校验规则测试值"
        },
        {
          "key": "CheckConfig",
          "label": "校验配置",
          "required": false,
          "example": "校验配置测试值"
        },
        {
          "key": "ICON",
          "label": "图标",
          "required": false,
          "example": "图标测试值"
        },
        {
          "key": "REF_FORM_ID",
          "label": "表单选择",
          "required": false,
          "example": "表单选择测试值"
        },
        {
          "key": "PARENT_MENU_ID",
          "label": "上级菜单",
          "required": false,
          "example": "上级菜单测试值"
        },
        {
          "key": "URL_ADDRESS",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
        },
        {
          "key": "enabled",
          "label": "移动端启用",
          "required": false,
          "example": "Y"
        },
        {
          "key": "deviceTypes",
          "label": "设备类型",
          "required": false,
          "example": "设备类型测试值"
        },
        {
          "key": "layout",
          "label": "列表布局",
          "required": false,
          "example": "列表布局测试值"
        },
        {
          "key": "pageSize",
          "label": "每页显示",
          "required": false,
          "example": "每页显示测试值"
        },
        {
          "key": "loadMode",
          "label": "加载方式",
          "required": false,
          "example": "加载方式测试值"
        },
        {
          "key": "fieldName",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelPosition",
          "label": "标签位置",
          "required": false,
          "example": "标签位置测试值"
        },
        {
          "key": "labelWidth",
          "label": "标签宽度",
          "required": false,
          "example": "标签宽度测试值"
        },
        {
          "key": "primaryColor",
          "label": "主题色",
          "required": false,
          "example": "主题色测试值"
        },
        {
          "key": "backgroundColor",
          "label": "背景色",
          "required": false,
          "example": "背景色测试值"
        },
        {
          "key": "fontSize",
          "label": "字体大小",
          "required": false,
          "example": "字体大小测试值"
        },
        {
          "key": "placeholder",
          "label": "占位符",
          "required": false,
          "example": "占位符测试值"
        },
        {
          "key": "defaultValue",
          "label": "默认值",
          "required": false,
          "example": "默认值测试值"
        },
        {
          "key": "rules",
          "label": "验证规则",
          "required": false,
          "example": "验证规则测试值"
        },
        {
          "key": "options",
          "label": "选项配置",
          "required": true,
          "example": "选项配置测试值"
        },
        {
          "key": "content",
          "label": "分割线内容",
          "required": false,
          "example": "分割线内容测试值"
        },
        {
          "key": "contentPosition",
          "label": "内容位置",
          "required": false,
          "example": "内容位置测试值"
        },
        {
          "key": "direction",
          "label": "分割线方向",
          "required": false,
          "example": "分割线方向测试值"
        },
        {
          "key": "dashed",
          "label": "是否虚线",
          "required": false,
          "example": "是否虚线测试值"
        },
        {
          "key": "hairline",
          "label": "是否细线",
          "required": false,
          "example": "是否细线测试值"
        },
        {
          "key": "columnCount",
          "label": "列数",
          "required": false,
          "example": "列数测试值"
        },
        {
          "key": "gutter",
          "label": "列间距",
          "required": false,
          "example": "列间距测试值"
        },
        {
          "key": "layoutType",
          "label": "布局方式",
          "required": false,
          "example": "布局方式测试值"
        },
        {
          "key": "justify",
          "label": "主轴对齐",
          "required": false,
          "example": "主轴对齐测试值"
        },
        {
          "key": "align",
          "label": "交叉轴对齐",
          "required": false,
          "example": "交叉轴对齐测试值"
        },
        {
          "key": "field",
          "label": "字段名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "tabContentMaxHeight",
          "label": "页签内容最大高度",
          "required": false,
          "example": "页签内容最大高度测试值"
        },
        {
          "key": "activeTab",
          "label": "当前激活标签",
          "required": false,
          "example": "当前激活标签测试值"
        },
        {
          "key": "showIndex",
          "label": "是否显示序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "showDeleteButton",
          "label": "是否显示删除按钮",
          "required": false,
          "example": "是否显示删除按钮测试值"
        },
        {
          "key": "selectionType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "label",
          "label": "组件标题",
          "required": false,
          "example": "组件标题测试值"
        },
        {
          "key": "multiple",
          "label": "支持多选",
          "required": false,
          "example": "支持多选测试值"
        },
        {
          "key": "maxCount",
          "label": "最大数量",
          "required": false,
          "example": "1"
        },
        {
          "key": "maxSize",
          "label": "最大文件大小",
          "required": false,
          "example": "最大文件大小测试值"
        },
        {
          "key": "accept",
          "label": "接受的文件类型",
          "required": false,
          "example": "接受的文件类型测试值"
        },
        {
          "key": "previewSize",
          "label": "预览尺寸",
          "required": false,
          "example": "预览尺寸测试值"
        },
        {
          "key": "previewImage",
          "label": "显示预览",
          "required": false,
          "example": "显示预览测试值"
        },
        {
          "key": "previewFullImage",
          "label": "支持全屏预览",
          "required": false,
          "example": "支持全屏预览测试值"
        },
        {
          "key": "imageFit",
          "label": "图片填充模式",
          "required": false,
          "example": "图片填充模式测试值"
        },
        {
          "key": "uploadText",
          "label": "上传按钮文字",
          "required": false,
          "example": "上传按钮文字测试值"
        },
        {
          "key": "deleteText",
          "label": "删除按钮文字",
          "required": false,
          "example": "删除按钮文字测试值"
        },
        {
          "key": "required",
          "label": "是否必填",
          "required": false,
          "example": "是否必填测试值"
        },
        {
          "key": "disabled",
          "label": "是否禁用",
          "required": false,
          "example": "是否禁用测试值"
        },
        {
          "key": "showTooltip",
          "label": "显示弹出提示",
          "required": false,
          "example": "显示弹出提示测试值"
        },
        {
          "key": "tooltipContent",
          "label": "提示内容",
          "required": false,
          "example": "提示内容测试值"
        },
        {
          "key": "code",
          "label": "单据编码规则",
          "required": false,
          "example": "单据编码规则测试值"
        },
        {
          "key": "buttonType",
          "label": "按钮类型",
          "required": false,
          "example": "按钮类型测试值"
        },
        {
          "key": "size",
          "label": "按钮尺寸",
          "required": false,
          "example": "按钮尺寸测试值"
        },
        {
          "key": "loading",
          "label": "是否加载中",
          "required": false,
          "example": "是否加载中测试值"
        },
        {
          "key": "round",
          "label": "是否圆角",
          "required": false,
          "example": "是否圆角测试值"
        },
        {
          "key": "square",
          "label": "是否方形",
          "required": false,
          "example": "是否方形测试值"
        },
        {
          "key": "block",
          "label": "是否块级",
          "required": false,
          "example": "是否块级测试值"
        },
        {
          "key": "color",
          "label": "按钮颜色",
          "required": false,
          "example": "按钮颜色测试值"
        },
        {
          "key": "showTitle",
          "label": "是否显示标题",
          "required": false,
          "example": "是否显示标题测试值"
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
          "key": "activeValue",
          "label": "开启时值",
          "required": false,
          "example": "开启时值测试值"
        },
        {
          "key": "inactiveValue",
          "label": "关闭时值",
          "required": false,
          "example": "关闭时值测试值"
        },
        {
          "key": "activeColor",
          "label": "开启时颜色",
          "required": false,
          "example": "开启时颜色测试值"
        },
        {
          "key": "inactiveColor",
          "label": "关闭时颜色",
          "required": false,
          "example": "关闭时颜色测试值"
        },
        {
          "key": "dateType",
          "label": "选择类型",
          "required": false,
          "example": "选择类型测试值"
        },
        {
          "key": "defaultPreset",
          "label": "默认值类型",
          "required": false,
          "example": "默认值类型测试值"
        },
        {
          "key": "minDate",
          "label": "最小日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "maxDate",
          "label": "最大日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "clearable",
          "label": "支持清除",
          "required": false,
          "example": "支持清除测试值"
        },
        {
          "key": "clearAction",
          "label": "清除动作",
          "required": false,
          "example": "清除动作测试值"
        },
        {
          "key": "clearEventName",
          "label": "清除事件名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "popupType",
          "label": "弹框类型",
          "required": false,
          "example": "弹框类型测试值"
        },
        {
          "key": "takeDataFieldType",
          "label": "取值字段配置",
          "required": false,
          "example": "取值字段配置测试值"
        },
        {
          "key": "dataField",
          "label": "取值字段",
          "required": false,
          "example": "取值字段测试值"
        },
        {
          "key": "labelFieldType",
          "label": "显示字段配置",
          "required": false,
          "example": "显示字段配置测试值"
        },
        {
          "key": "labelField",
          "label": "显示字段",
          "required": false,
          "example": "显示字段测试值"
        },
        {
          "key": "readonly",
          "label": "是否只读",
          "required": false,
          "example": "是否只读测试值"
        },
        {
          "key": "scan",
          "label": "支持扫码",
          "required": false,
          "example": "支持扫码测试值"
        },
        {
          "key": "suffix",
          "label": "输入后缀",
          "required": false,
          "example": "输入后缀测试值"
        },
        {
          "key": "type",
          "label": "组件类型",
          "required": true,
          "example": "组件类型测试值"
        },
        {
          "key": "optionType",
          "label": "选项类型",
          "required": false,
          "example": "选项类型测试值"
        },
        {
          "key": "dictCode",
          "label": "字典类型",
          "required": false,
          "example": "字典类型测试值"
        },
        {
          "key": "title",
          "label": "标签页列表",
          "required": false,
          "example": "标签页列表测试值"
        },
        {
          "key": "minLength",
          "label": "最小长度",
          "required": false,
          "example": "最小长度测试值"
        },
        {
          "key": "maxLength",
          "label": "最大长度",
          "required": false,
          "example": "最大长度测试值"
        },
        {
          "key": "pattern",
          "label": "正则表达式",
          "required": false,
          "example": "正则表达式测试值"
        },
        {
          "key": "dataFormatter",
          "label": "数据格式化",
          "required": false,
          "example": "数据格式化测试值"
        },
        {
          "key": "showButtons",
          "label": "显示按钮",
          "required": false,
          "example": "显示按钮测试值"
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
          "key": "mergeFormData",
          "label": "与表单字段根级合并",
          "required": false,
          "example": "与表单字段根级合并测试值"
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
          "key": "targetField",
          "label": "联动赋值",
          "required": false,
          "example": "联动赋值测试值"
        },
        {
          "key": "switchTab",
          "label": "自动切换标签页",
          "required": false,
          "example": "自动切换标签页测试值"
        },
        {
          "key": "sourcePath",
          "label": "来源路径",
          "required": false,
          "example": "来源路径测试值"
        },
        {
          "key": "appendMode",
          "label": "追加方式",
          "required": false,
          "example": "追加方式测试值"
        },
        {
          "key": "silentToast",
          "label": "静默重置",
          "required": false,
          "example": "静默重置测试值"
        },
        {
          "key": "scope",
          "label": "校验范围",
          "required": false,
          "example": "校验范围测试值"
        },
        {
          "key": "fields",
          "label": "指定字段",
          "required": true,
          "example": "指定字段测试值"
        },
        {
          "key": "failMsg",
          "label": "失败提示",
          "required": false,
          "example": "失败提示测试值"
        },
        {
          "key": "focusFirstError",
          "label": "聚焦首个错误字段",
          "required": false,
          "example": "聚焦首个错误字段测试值"
        },
        {
          "key": "tableName",
          "label": "数据表选择",
          "required": false,
          "example": "数据表选择测试值"
        },
        {
          "key": "saveMode",
          "label": "保存模式",
          "required": false,
          "example": "保存模式测试值"
        },
        {
          "key": "overrideApiPath",
          "label": "自定义接口路径（可选）",
          "required": false,
          "example": "自定义接口路径（可选）测试值"
        },
        {
          "key": "commonSaveDataString",
          "label": "Data 模板 (JSON，可选)",
          "required": false,
          "example": "Data 模板 (JSON，可选)测试值"
        },
        {
          "key": "Link_Url",
          "label": "路由地址",
          "required": false,
          "example": "路由地址测试值"
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
          "key": "buttonText",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
        },
        {
          "key": "buttonSize",
          "label": "按钮大小",
          "required": false,
          "example": "按钮大小测试值"
        },
        {
          "key": "apiUrl",
          "label": "API地址",
          "required": false,
          "example": "API地址测试值"
        },
        {
          "key": "tableSelectModel",
          "label": "卡片字段",
          "required": false,
          "example": "卡片字段测试值"
        },
        {
          "key": "tabs",
          "label": "标签页列表",
          "required": true,
          "example": "标签页列表测试值"
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
          "key": "formId",
          "label": "移动表单ID",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "dbId",
          "label": "数据库ID",
          "required": false,
          "example": "AT-001"
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
          "key": "SQL_Content",
          "label": "相关联SQL语句",
          "required": false,
          "example": "相关联SQL语句测试值"
        },
        {
          "key": "SubSQL_Content",
          "label": "相关关联SQL语句",
          "required": false,
          "example": "相关关联SQL语句测试值"
        },
        {
          "key": "displayName",
          "label": "显示名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "format",
          "label": "格式化规则",
          "required": false,
          "example": "格式化规则测试值"
        },
        {
          "key": "renderType",
          "label": "渲染方式",
          "required": false,
          "example": "渲染方式测试值"
        },
        {
          "key": "textColor",
          "label": "文字颜色，如：",
          "required": false,
          "example": "文字颜色，如：测试值"
        },
        {
          "key": "value",
          "label": "选项值",
          "required": false,
          "example": "选项值测试值"
        },
        {
          "key": "text",
          "label": "按钮文本",
          "required": false,
          "example": "按钮文本测试值"
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
        },
        {
          "key": "compareLeft",
          "label": "左操作数",
          "required": false,
          "example": "左操作数测试值"
        },
        {
          "key": "compareRight",
          "label": "右操作数",
          "required": false,
          "example": "右操作数测试值"
        },
        {
          "key": "trueTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
        },
        {
          "key": "falseTemplate",
          "label": "值模板",
          "required": false,
          "example": "值模板测试值"
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
          "key": "cardComponentBatchWidth",
          "label": "批量设置",
          "required": false,
          "example": "批量设置测试值"
        }
      ],
      "testData": {
        "REPORT_TITLE": "自动化样例001",
        "REPORT_CODE": "AT-001",
        "TERMINAL": "终端类型测试值",
        "REMARK": "自动化测试备注001",
        "REPORT_TYPE": "页面类型测试值",
        "DataSourceType": "数据来源类型测试值",
        "dbLinkId": "选择数据库测试值",
        "dbTableName": "选择数据库表测试值",
        "dictionary": "选择字典测试值",
        "idField": "ID字段测试值",
        "parentField": "父节点字段测试值",
        "nameField": "名称字段测试值",
        "sortField": "排序字段测试值",
        "sortOrder": "排序方式测试值",
        "expandLevel": "初始展开层级测试值",
        "showSearch": "是否显示搜索框测试值",
        "nodePermissions": "节点操作权限测试值",
        "nodeAction": "节点选中动作测试值",
        "bindField": "树形联动字段测试值",
        "listBindField": "列表联动字段测试值",
        "customScript": "脚本配置测试值",
        "DB_LINK_ID": "数据库测试值",
        "SQL": "报表查询测试值",
        "SQL_SORT": "排序方式测试值",
        "AutoQuery": "开启初始化查询测试值",
        "RequiredCondition": "开启强制条件查询测试值",
        "ORD_IDX": "1",
        "PARENT_STRING": "主表关联测试值",
        "SUB_STRING": "子表关联测试值",
        "TABLE_COLLECTION": "表名测试值",
        "DbLinkId": "数据库测试值",
        "DbTableName": "表名测试值",
        "Name": "自动化样例001",
        "ModuleBtnId": "绑定按钮测试值",
        "ErrorHandling": "错误机制测试值",
        "ColumnName": "字段测试值",
        "RefType": "关联类型测试值",
        "DataDicCode": "数据字典测试值",
        "DataSourceId": "数据源测试值",
        "DataSourceExcelField": "导入字段测试值",
        "DataSourceSaveField": "保存字段测试值",
        "FixedValue": "固定值测试值",
        "CheckType": "校验规则测试值",
        "CheckConfig": "校验配置测试值",
        "ICON": "图标测试值",
        "REF_FORM_ID": "表单选择测试值",
        "PARENT_MENU_ID": "上级菜单测试值",
        "URL_ADDRESS": "路由地址测试值",
        "enabled": "Y",
        "deviceTypes": "设备类型测试值",
        "layout": "列表布局测试值",
        "pageSize": "每页显示测试值",
        "loadMode": "加载方式测试值",
        "fieldName": "显示字段配置测试值",
        "labelPosition": "标签位置测试值",
        "labelWidth": "标签宽度测试值",
        "primaryColor": "主题色测试值",
        "backgroundColor": "背景色测试值",
        "fontSize": "字体大小测试值",
        "placeholder": "占位符测试值",
        "defaultValue": "默认值测试值",
        "rules": "验证规则测试值",
        "options": "选项配置测试值",
        "content": "分割线内容测试值",
        "contentPosition": "内容位置测试值",
        "direction": "分割线方向测试值",
        "dashed": "是否虚线测试值",
        "hairline": "是否细线测试值",
        "columnCount": "列数测试值",
        "gutter": "列间距测试值",
        "layoutType": "布局方式测试值",
        "justify": "主轴对齐测试值",
        "align": "交叉轴对齐测试值",
        "field": "自动化样例001",
        "tabContentMaxHeight": "页签内容最大高度测试值",
        "activeTab": "当前激活标签测试值",
        "showIndex": "1",
        "showDeleteButton": "是否显示删除按钮测试值",
        "selectionType": "选择类型测试值",
        "label": "组件标题测试值",
        "multiple": "支持多选测试值",
        "maxCount": "1",
        "maxSize": "最大文件大小测试值",
        "accept": "接受的文件类型测试值",
        "previewSize": "预览尺寸测试值",
        "previewImage": "显示预览测试值",
        "previewFullImage": "支持全屏预览测试值",
        "imageFit": "图片填充模式测试值",
        "uploadText": "上传按钮文字测试值",
        "deleteText": "删除按钮文字测试值",
        "required": "是否必填测试值",
        "disabled": "是否禁用测试值",
        "showTooltip": "显示弹出提示测试值",
        "tooltipContent": "提示内容测试值",
        "code": "单据编码规则测试值",
        "buttonType": "按钮类型测试值",
        "size": "按钮尺寸测试值",
        "loading": "是否加载中测试值",
        "round": "是否圆角测试值",
        "square": "是否方形测试值",
        "block": "是否块级测试值",
        "color": "按钮颜色测试值",
        "showTitle": "是否显示标题测试值",
        "height": "卡片高度测试值",
        "labelColor": "标签颜色测试值",
        "valueColor": "值颜色测试值",
        "activeValue": "开启时值测试值",
        "inactiveValue": "关闭时值测试值",
        "activeColor": "开启时颜色测试值",
        "inactiveColor": "关闭时颜色测试值",
        "dateType": "选择类型测试值",
        "defaultPreset": "默认值类型测试值",
        "minDate": "2026-08-01",
        "maxDate": "2026-08-01",
        "clearable": "支持清除测试值",
        "clearAction": "清除动作测试值",
        "clearEventName": "自动化样例001",
        "popupType": "弹框类型测试值",
        "takeDataFieldType": "取值字段配置测试值",
        "dataField": "取值字段测试值",
        "labelFieldType": "显示字段配置测试值",
        "labelField": "显示字段测试值",
        "readonly": "是否只读测试值",
        "scan": "支持扫码测试值",
        "suffix": "输入后缀测试值",
        "type": "组件类型测试值",
        "optionType": "选项类型测试值",
        "dictCode": "字典类型测试值",
        "title": "标签页列表测试值",
        "minLength": "最小长度测试值",
        "maxLength": "最大长度测试值",
        "pattern": "正则表达式测试值",
        "dataFormatter": "数据格式化测试值",
        "showButtons": "显示按钮测试值",
        "actionType": "动作类型测试值",
        "service": "服务地址测试值",
        "mergeFormData": "与表单字段根级合并测试值",
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
        "targetField": "联动赋值测试值",
        "switchTab": "自动切换标签页测试值",
        "sourcePath": "来源路径测试值",
        "appendMode": "追加方式测试值",
        "silentToast": "静默重置测试值",
        "scope": "校验范围测试值",
        "fields": "指定字段测试值",
        "failMsg": "失败提示测试值",
        "focusFirstError": "聚焦首个错误字段测试值",
        "tableName": "数据表选择测试值",
        "saveMode": "保存模式测试值",
        "overrideApiPath": "自定义接口路径（可选）测试值",
        "commonSaveDataString": "Data 模板 (JSON，可选)测试值",
        "Link_Url": "路由地址测试值",
        "viewMode": "列表显示方式测试值",
        "name": "自动化样例001",
        "buttonText": "按钮文本测试值",
        "buttonSize": "按钮大小测试值",
        "apiUrl": "API地址测试值",
        "tableSelectModel": "卡片字段测试值",
        "tabs": "标签页列表测试值",
        "width": "宽度测试值",
        "formatType": "格式化类型测试值",
        "dateFormat": "日期格式测试值",
        "key": "键值映射测试值",
        "formatFunction": "格式化函数测试值",
        "formId": "AT-001",
        "dbId": "AT-001",
        "cpclModel": "蓝牙打印指令测试值",
        "printFileId": "打印模板测试值",
        "SQL_Content": "相关联SQL语句测试值",
        "SubSQL_Content": "相关关联SQL语句测试值",
        "displayName": "自动化样例001",
        "format": "格式化规则测试值",
        "renderType": "渲染方式测试值",
        "textColor": "文字颜色，如：测试值",
        "value": "选项值测试值",
        "text": "按钮文本测试值",
        "backend": "后端字段测试值",
        "frontend": "前端展示字段测试值",
        "compareLeft": "左操作数测试值",
        "compareRight": "右操作数测试值",
        "trueTemplate": "值模板测试值",
        "falseTemplate": "值模板测试值",
        "prop": "字段名测试值",
        "tabCardBatchWidth": "批量设置测试值",
        "inputType": "输入类型测试值",
        "pickerType": "选择器类型测试值",
        "cardComponentBatchWidth": "批量设置测试值"
      }
    }
  ]
});
