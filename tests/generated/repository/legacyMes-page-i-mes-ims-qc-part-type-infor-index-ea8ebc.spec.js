// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ims-qc-part-type-infor-index-ea8ebc",
  "name": "旧版制造执行 - 高级筛选（未配置菜单）功能校验",
  "displayName": "高级筛选（未配置菜单）",
  "route": "/iMES/ImsQcPartTypeInfor/Index",
  "sourceRoute": "/iMES/ImsQcPartTypeInfor/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 高级筛选（未配置菜单）",
  "sourceFile": "src/views/iMES/ImsQcPartTypeInfor/Index.vue",
  "dataSchema": {
    "columns": [
      "PART_NO",
      "PART_NAME",
      "MODEL",
      "TYPE_NAME",
      "CLASS_TYPE",
      "UNIT",
      "CUSTOMER",
      "CUSTOMER_PN",
      "DESCRIPTION"
    ],
    "required": [],
    "fields": [
      {
        "key": "PART_NO",
        "label": "料号",
        "required": false
      },
      {
        "key": "PART_NAME",
        "label": "品名",
        "required": false
      },
      {
        "key": "MODEL",
        "label": "规格",
        "required": false
      },
      {
        "key": "TYPE_NAME",
        "label": "物料类别",
        "required": false
      },
      {
        "key": "CLASS_TYPE",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "UNIT",
        "label": "基本单位",
        "required": false
      },
      {
        "key": "CUSTOMER",
        "label": "客户",
        "required": false
      },
      {
        "key": "CUSTOMER_PN",
        "label": "客户料号",
        "required": false
      },
      {
        "key": "DESCRIPTION",
        "label": "品名",
        "required": false
      }
    ],
    "example": {
      "PART_NO": "AT-001",
      "PART_NAME": "自动化样例001",
      "MODEL": "规格测试值",
      "TYPE_NAME": "物料类别测试值",
      "CLASS_TYPE": "物料子类测试值",
      "UNIT": "基本单位测试值",
      "CUSTOMER": "客户测试值",
      "CUSTOMER_PN": "AT-001",
      "DESCRIPTION": "自动化样例001"
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
        "searchClick()"
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "MODEL": "规格测试值",
        "TYPE_NAME": "物料类别测试值",
        "CLASS_TYPE": "物料子类测试值",
        "UNIT": "基本单位测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_PN": "AT-001",
        "DESCRIPTION": "自动化样例001"
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
      "key": "3d81345303-3d81345303-1ac74",
      "type": "重置",
      "name": "重置业务入口校验",
      "label": "重置",
      "handler": "cleanClick",
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
      "key": "13fd57e65b-2cd9e6ce81-2cd9e",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "",
      "permission": "ImsQcPartTypeInforAdd",
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
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "TYPE_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "UNIT",
          "label": "基本单位",
          "required": false,
          "example": "基本单位测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "MODEL": "规格测试值",
        "TYPE_NAME": "物料类别测试值",
        "CLASS_TYPE": "物料子类测试值",
        "UNIT": "基本单位测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_PN": "AT-001",
        "DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "13fd57e65b-c35eca59e8-d7cd5",
      "type": "新增表单",
      "name": "新增物料信息业务入口校验",
      "label": "新增物料信息",
      "handler": "handleAddEvent('MaterialDialog')",
      "permission": "",
      "menuTriggerLabel": "新增",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增物料信息",
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
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "TYPE_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "UNIT",
          "label": "基本单位",
          "required": false,
          "example": "基本单位测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "MODEL": "规格测试值",
        "TYPE_NAME": "物料类别测试值",
        "CLASS_TYPE": "物料子类测试值",
        "UNIT": "基本单位测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_PN": "AT-001",
        "DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "13fd57e65b-c9f0691bb8-1c6a3",
      "type": "新增表单",
      "name": "新增物料子类业务入口校验",
      "label": "新增物料子类",
      "handler": "handleAddEvent('SubclassDialog')",
      "permission": "",
      "menuTriggerLabel": "新增",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增物料子类",
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
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "TYPE_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "UNIT",
          "label": "基本单位",
          "required": false,
          "example": "基本单位测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "MODEL": "规格测试值",
        "TYPE_NAME": "物料类别测试值",
        "CLASS_TYPE": "物料子类测试值",
        "UNIT": "基本单位测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_PN": "AT-001",
        "DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "13fd57e65b-7f0c983287-667a3",
      "type": "新增表单",
      "name": "新增物料类别业务入口校验",
      "label": "新增物料类别",
      "handler": "handleAddEvent('CategoryDialog')",
      "permission": "",
      "menuTriggerLabel": "新增",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "填写表单后取消",
      "steps": [
        "点击新增物料类别",
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
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "TYPE_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "UNIT",
          "label": "基本单位",
          "required": false,
          "example": "基本单位测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "MODEL": "规格测试值",
        "TYPE_NAME": "物料类别测试值",
        "CLASS_TYPE": "物料子类测试值",
        "UNIT": "基本单位测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_PN": "AT-001",
        "DESCRIPTION": "自动化样例001"
      }
    },
    {
      "key": "5f1787916c-90f4dbf5aa-75f54",
      "type": "导入入口",
      "name": "导入物料信息业务入口校验",
      "label": "导入物料信息",
      "handler": "tableName='SFCS_PN'",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入物料信息",
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
      "key": "ef879b4ced-a75d1f0f5b-ec142",
      "type": "导出入口",
      "name": "导出物料信息业务入口校验",
      "label": "导出物料信息",
      "handler": "handleImportBtn(2, 'getSfcsPnData', 'SFCS_PN', '物料信息')",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出物料信息",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-40064768b2-a8fa6",
      "type": "导出入口",
      "name": "导出物料模板业务入口校验",
      "label": "导出物料模板",
      "handler": "handleImportBtn(3, 'SFCS_PN')",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出物料模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-a97311b5bb-e5cc6",
      "type": "导入入口",
      "name": "导入子类信息业务入口校验",
      "label": "导入子类信息",
      "handler": "tableName='IMS_PART_CLASS_TYPE'",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入子类信息",
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
      "key": "ef879b4ced-f342b311c7-817d1",
      "type": "导出入口",
      "name": "导出子类信息业务入口校验",
      "label": "导出子类信息",
      "handler": "handleImportBtn(\r\n                        2,\r\n                        'getCategoryData1',\r\n                        'IMS_PART_CLASS_TYPE',\r\n                        '物料子类'\r\n                      )",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出子类信息",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-adc10ab46a-97387",
      "type": "导出入口",
      "name": "导出子类模板业务入口校验",
      "label": "导出子类模板",
      "handler": "handleImportBtn(3, 'IMS_PART_CLASS_TYPE')",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出子类模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "5f1787916c-23caaabfd0-1d309",
      "type": "导入入口",
      "name": "导入类别信息业务入口校验",
      "label": "导入类别信息",
      "handler": "tableName='IMS_PART_TYPE'",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "打开导入界面但不上传",
      "steps": [
        "展开导入/导出菜单",
        "点击导入类别信息",
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
      "key": "ef879b4ced-b6251ecd89-f586e",
      "type": "导出入口",
      "name": "导出类别信息业务入口校验",
      "label": "导出类别信息",
      "handler": "handleImportBtn(\r\n                        2,\r\n                        'getCategoryData',\r\n                        'IMS_PART_TYPE',\r\n                        '物料类别维护'\r\n                      )",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出类别信息",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "ef879b4ced-70c12b649e-4efc0",
      "type": "导出入口",
      "name": "导出类别模板业务入口校验",
      "label": "导出类别模板",
      "handler": "handleImportBtn(3, 'IMS_PART_TYPE')",
      "permission": "",
      "menuTriggerLabel": "导入/导出",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击导出类别模板",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-40943",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "handleAddEvent('MaterialDialog', row)",
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
          "key": "PART_NO",
          "label": "料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "PART_NAME",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MODEL",
          "label": "规格",
          "required": false,
          "example": "规格测试值"
        },
        {
          "key": "TYPE_NAME",
          "label": "物料类别",
          "required": false,
          "example": "物料类别测试值"
        },
        {
          "key": "CLASS_TYPE",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "UNIT",
          "label": "基本单位",
          "required": false,
          "example": "基本单位测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户",
          "required": false,
          "example": "客户测试值"
        },
        {
          "key": "CUSTOMER_PN",
          "label": "客户料号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "DESCRIPTION",
          "label": "品名",
          "required": false,
          "example": "自动化样例001"
        }
      ],
      "testData": {
        "PART_NO": "AT-001",
        "PART_NAME": "自动化样例001",
        "MODEL": "规格测试值",
        "TYPE_NAME": "物料类别测试值",
        "CLASS_TYPE": "物料子类测试值",
        "UNIT": "基本单位测试值",
        "CUSTOMER": "客户测试值",
        "CUSTOMER_PN": "AT-001",
        "DESCRIPTION": "自动化样例001"
      }
    }
  ]
});
