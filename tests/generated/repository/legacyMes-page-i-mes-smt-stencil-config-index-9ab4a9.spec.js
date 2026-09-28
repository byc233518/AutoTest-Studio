// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-smt-stencil-config-index-9ab4a9",
  "name": "旧版制造执行 - 完整导入（未配置菜单）功能校验",
  "displayName": "完整导入（未配置菜单）",
  "route": "/iMES/SmtStencilConfig/Index",
  "sourceRoute": "/iMES/SmtStencilConfig/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 完整导入（未配置菜单）",
  "sourceFile": "src/views/iMES/SmtStencilConfig/Index.vue",
  "dataSchema": {
    "columns": [
      "STENCIL_NO",
      "ENABLED",
      "ATTRIBUTE4",
      "TENSION_CONTROL_VALUE",
      "ATTRIBUTE3",
      "CUSTOM_MAX_USED_COUNT",
      "ORGANIZE_ID",
      "YEARS_CONTROL",
      "ATTRIBUTE1",
      "DESCRIPTION",
      "MAX_USED_FLAG",
      "PRODUCT_UNITAGE",
      "TENSION_CONTROL_FLAG",
      "ATTRIBUTE2",
      "PART_NO",
      "PCB_SIDE",
      "CREATE_BY",
      "PN_MODEL",
      "oldStencilNo",
      "newStencilNo",
      "Key",
      "CODE"
    ],
    "required": [
      "STENCIL_NO",
      "ENABLED",
      "CUSTOM_MAX_USED_COUNT",
      "ORGANIZE_ID",
      "MAX_USED_FLAG",
      "PART_NO",
      "PCB_SIDE",
      "CREATE_BY",
      "oldStencilNo",
      "newStencilNo"
    ],
    "fields": [
      {
        "key": "STENCIL_NO",
        "label": "网板编号",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "ATTRIBUTE4",
        "label": "本体编码",
        "required": false
      },
      {
        "key": "TENSION_CONTROL_VALUE",
        "label": "最小张力值",
        "required": false
      },
      {
        "key": "ATTRIBUTE3",
        "label": "钢网厚度(CM)",
        "required": false
      },
      {
        "key": "CUSTOM_MAX_USED_COUNT",
        "label": "最大使用数量",
        "required": true
      },
      {
        "key": "ORGANIZE_ID",
        "label": "组织架构",
        "required": true
      },
      {
        "key": "YEARS_CONTROL",
        "label": "年限管控",
        "required": false
      },
      {
        "key": "ATTRIBUTE1",
        "label": "钢网长度(CM)",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "详细描述",
        "required": false
      },
      {
        "key": "MAX_USED_FLAG",
        "label": "是否启用最大数量",
        "required": true
      },
      {
        "key": "PRODUCT_UNITAGE",
        "label": "产品连板单位值",
        "required": false
      },
      {
        "key": "TENSION_CONTROL_FLAG",
        "label": "张力值管控",
        "required": false
      },
      {
        "key": "ATTRIBUTE2",
        "label": "钢网宽度(CM)",
        "required": false
      },
      {
        "key": "PART_NO",
        "label": "产品（PCB）编号",
        "required": true
      },
      {
        "key": "PCB_SIDE",
        "label": "板底板面",
        "required": true
      },
      {
        "key": "CREATE_BY",
        "label": "创建人",
        "required": true
      },
      {
        "key": "PN_MODEL",
        "label": "品名",
        "required": false
      },
      {
        "key": "oldStencilNo",
        "label": "旧钢网编号",
        "required": true
      },
      {
        "key": "newStencilNo",
        "label": "新钢网编号",
        "required": true
      },
      {
        "key": "Key",
        "label": "钢网编号",
        "required": false
      },
      {
        "key": "CODE",
        "label": "本体编码",
        "required": false
      }
    ],
    "example": {
      "STENCIL_NO": "AT-001",
      "ENABLED": "是否激活测试值",
      "ATTRIBUTE4": "AT-001",
      "TENSION_CONTROL_VALUE": "最小张力值测试值",
      "ATTRIBUTE3": "钢网厚度(CM)测试值",
      "CUSTOM_MAX_USED_COUNT": "1",
      "ORGANIZE_ID": "组织架构测试值",
      "YEARS_CONTROL": "年限管控测试值",
      "ATTRIBUTE1": "钢网长度(CM)测试值",
      "DESCRIPTION": "自动化测试备注001",
      "MAX_USED_FLAG": "1",
      "PRODUCT_UNITAGE": "产品连板单位值测试值",
      "TENSION_CONTROL_FLAG": "张力值管控测试值",
      "ATTRIBUTE2": "钢网宽度(CM)测试值",
      "PART_NO": "AT-001",
      "PCB_SIDE": "板底板面测试值",
      "CREATE_BY": "创建人测试值",
      "PN_MODEL": "自动化样例001",
      "oldStencilNo": "AT-001",
      "newStencilNo": "AT-001",
      "Key": "AT-001",
      "CODE": "AT-001"
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
        "searchClick",
        "Productsearch",
        "searchClick2"
      ],
      "testData": {
        "STENCIL_NO": "AT-001",
        "ENABLED": "是否激活测试值",
        "ATTRIBUTE4": "AT-001",
        "TENSION_CONTROL_VALUE": "最小张力值测试值",
        "ATTRIBUTE3": "钢网厚度(CM)测试值",
        "CUSTOM_MAX_USED_COUNT": "1",
        "ORGANIZE_ID": "组织架构测试值",
        "YEARS_CONTROL": "年限管控测试值",
        "ATTRIBUTE1": "钢网长度(CM)测试值",
        "DESCRIPTION": "自动化测试备注001",
        "MAX_USED_FLAG": "1",
        "PRODUCT_UNITAGE": "产品连板单位值测试值",
        "TENSION_CONTROL_FLAG": "张力值管控测试值",
        "ATTRIBUTE2": "钢网宽度(CM)测试值",
        "PART_NO": "AT-001",
        "PCB_SIDE": "板底板面测试值",
        "CREATE_BY": "创建人测试值",
        "PN_MODEL": "自动化样例001",
        "oldStencilNo": "AT-001",
        "newStencilNo": "AT-001",
        "Key": "AT-001",
        "CODE": "AT-001"
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
      "key": "13fd57e65b-2cd9e6ce81-51611",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "insertEvent(null)",
      "permission": "SmtStencilConfigAdd",
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
          "key": "STENCIL_NO",
          "label": "网板编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "ATTRIBUTE4",
          "label": "本体编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "TENSION_CONTROL_VALUE",
          "label": "最小张力值",
          "required": false,
          "example": "最小张力值测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "钢网厚度(CM)",
          "required": false,
          "example": "钢网厚度(CM)测试值"
        },
        {
          "key": "CUSTOM_MAX_USED_COUNT",
          "label": "最大使用数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "YEARS_CONTROL",
          "label": "年限管控",
          "required": false,
          "example": "年限管控测试值"
        },
        {
          "key": "ATTRIBUTE1",
          "label": "钢网长度(CM)",
          "required": false,
          "example": "钢网长度(CM)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "详细描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MAX_USED_FLAG",
          "label": "是否启用最大数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "PRODUCT_UNITAGE",
          "label": "产品连板单位值",
          "required": false,
          "example": "产品连板单位值测试值"
        },
        {
          "key": "TENSION_CONTROL_FLAG",
          "label": "张力值管控",
          "required": false,
          "example": "张力值管控测试值"
        },
        {
          "key": "ATTRIBUTE2",
          "label": "钢网宽度(CM)",
          "required": false,
          "example": "钢网宽度(CM)测试值"
        },
        {
          "key": "PART_NO",
          "label": "产品（PCB）编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PCB_SIDE",
          "label": "板底板面",
          "required": true,
          "example": "板底板面测试值"
        },
        {
          "key": "CREATE_BY",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "PN_MODEL",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "oldStencilNo",
          "label": "旧钢网编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "newStencilNo",
          "label": "新钢网编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "钢网编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CODE",
          "label": "本体编码",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "STENCIL_NO": "AT-001",
        "ENABLED": "是否激活测试值",
        "ATTRIBUTE4": "AT-001",
        "TENSION_CONTROL_VALUE": "最小张力值测试值",
        "ATTRIBUTE3": "钢网厚度(CM)测试值",
        "CUSTOM_MAX_USED_COUNT": "1",
        "ORGANIZE_ID": "组织架构测试值",
        "YEARS_CONTROL": "年限管控测试值",
        "ATTRIBUTE1": "钢网长度(CM)测试值",
        "DESCRIPTION": "自动化测试备注001",
        "MAX_USED_FLAG": "1",
        "PRODUCT_UNITAGE": "产品连板单位值测试值",
        "TENSION_CONTROL_FLAG": "张力值管控测试值",
        "ATTRIBUTE2": "钢网宽度(CM)测试值",
        "PART_NO": "AT-001",
        "PCB_SIDE": "板底板面测试值",
        "CREATE_BY": "创建人测试值",
        "PN_MODEL": "自动化样例001",
        "oldStencilNo": "AT-001",
        "newStencilNo": "AT-001",
        "Key": "AT-001",
        "CODE": "AT-001"
      }
    },
    {
      "key": "5f1787916c-d296178d97-d2961",
      "type": "导入入口",
      "name": "完整导入业务入口校验",
      "label": "完整导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击完整导入",
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
      "key": "ef879b4ced-8dc9817282-515d2",
      "type": "导出入口",
      "name": "完整导出模板业务入口校验",
      "label": "完整导出模板",
      "handler": "exportFullTpl",
      "permission": "StencilSaveExcelData",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击完整导出模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-12add2f21f-65d8c",
      "type": "业务动作",
      "name": "复制信息业务入口校验",
      "label": "复制信息",
      "handler": "copy_but(1)",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位复制信息",
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
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
      "permission": "SmtStencilConfigEdit",
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
          "key": "STENCIL_NO",
          "label": "网板编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "ATTRIBUTE4",
          "label": "本体编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "TENSION_CONTROL_VALUE",
          "label": "最小张力值",
          "required": false,
          "example": "最小张力值测试值"
        },
        {
          "key": "ATTRIBUTE3",
          "label": "钢网厚度(CM)",
          "required": false,
          "example": "钢网厚度(CM)测试值"
        },
        {
          "key": "CUSTOM_MAX_USED_COUNT",
          "label": "最大使用数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ORGANIZE_ID",
          "label": "组织架构",
          "required": true,
          "example": "组织架构测试值"
        },
        {
          "key": "YEARS_CONTROL",
          "label": "年限管控",
          "required": false,
          "example": "年限管控测试值"
        },
        {
          "key": "ATTRIBUTE1",
          "label": "钢网长度(CM)",
          "required": false,
          "example": "钢网长度(CM)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "详细描述",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "MAX_USED_FLAG",
          "label": "是否启用最大数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "PRODUCT_UNITAGE",
          "label": "产品连板单位值",
          "required": false,
          "example": "产品连板单位值测试值"
        },
        {
          "key": "TENSION_CONTROL_FLAG",
          "label": "张力值管控",
          "required": false,
          "example": "张力值管控测试值"
        },
        {
          "key": "ATTRIBUTE2",
          "label": "钢网宽度(CM)",
          "required": false,
          "example": "钢网宽度(CM)测试值"
        },
        {
          "key": "PART_NO",
          "label": "产品（PCB）编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "PCB_SIDE",
          "label": "板底板面",
          "required": true,
          "example": "板底板面测试值"
        },
        {
          "key": "CREATE_BY",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "PN_MODEL",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "oldStencilNo",
          "label": "旧钢网编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "newStencilNo",
          "label": "新钢网编号",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Key",
          "label": "钢网编号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "CODE",
          "label": "本体编码",
          "required": false,
          "example": "AT-001"
        }
      ],
      "testData": {
        "STENCIL_NO": "AT-001",
        "ENABLED": "是否激活测试值",
        "ATTRIBUTE4": "AT-001",
        "TENSION_CONTROL_VALUE": "最小张力值测试值",
        "ATTRIBUTE3": "钢网厚度(CM)测试值",
        "CUSTOM_MAX_USED_COUNT": "1",
        "ORGANIZE_ID": "组织架构测试值",
        "YEARS_CONTROL": "年限管控测试值",
        "ATTRIBUTE1": "钢网长度(CM)测试值",
        "DESCRIPTION": "自动化测试备注001",
        "MAX_USED_FLAG": "1",
        "PRODUCT_UNITAGE": "产品连板单位值测试值",
        "TENSION_CONTROL_FLAG": "张力值管控测试值",
        "ATTRIBUTE2": "钢网宽度(CM)测试值",
        "PART_NO": "AT-001",
        "PCB_SIDE": "板底板面测试值",
        "CREATE_BY": "创建人测试值",
        "PN_MODEL": "自动化样例001",
        "oldStencilNo": "AT-001",
        "newStencilNo": "AT-001",
        "Key": "AT-001",
        "CODE": "AT-001"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-c712b",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "removeClick(\r\n                  {\r\n                    ID: row.ID,\r\n                  },\r\n                  {\r\n                    STENCIL_ID: row.ID,\r\n                    STENCIL_NO: row.STENCIL_NO,\r\n                  }\r\n                )",
      "permission": "SmtStencilConfigRemove",
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
      "key": "5f1787916c-4d42a46878-4d42a",
      "type": "导入入口",
      "name": "点击导入业务入口校验",
      "label": "点击导入",
      "handler": "",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击点击导入",
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
      "key": "ef879b4ced-1553af6b72-fca18",
      "type": "导出入口",
      "name": "导出文档业务入口校验",
      "label": "导出文档",
      "handler": "exportData2",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出文档",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-8bf52524d7-56093",
      "type": "导出入口",
      "name": "导出模板业务入口校验",
      "label": "导出模板",
      "handler": "handleExportTpl",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
