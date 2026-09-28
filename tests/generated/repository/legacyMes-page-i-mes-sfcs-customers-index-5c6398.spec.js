// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-sfcs-customers-index-5c6398",
  "name": "旧版制造执行 - 暂无数据（未配置菜单）功能校验",
  "displayName": "暂无数据（未配置菜单）",
  "route": "/iMES/SfcsCustomers/Index",
  "sourceRoute": "/iMES/SfcsCustomers/Index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 暂无数据（未配置菜单）",
  "sourceFile": "src/views/iMES/SfcsCustomers/Index.vue",
  "dataSchema": {
    "columns": [
      "PARENT_ID",
      "CUSTOMER",
      "NATIONALITY",
      "ATTRIBUTE1",
      "MOBILE",
      "TEL",
      "CONTACT",
      "FAX",
      "CITY",
      "POSTAL_CODE",
      "ADDRESS",
      "STATE",
      "ENABLED",
      "Key"
    ],
    "required": [
      "CUSTOMER",
      "ATTRIBUTE1"
    ],
    "fields": [
      {
        "key": "PARENT_ID",
        "label": "父阶客户",
        "required": false
      },
      {
        "key": "CUSTOMER",
        "label": "客户名称",
        "required": true
      },
      {
        "key": "NATIONALITY",
        "label": "国家",
        "required": false
      },
      {
        "key": "ATTRIBUTE1",
        "label": "客户编码",
        "required": true
      },
      {
        "key": "MOBILE",
        "label": "移动电话号码",
        "required": false
      },
      {
        "key": "TEL",
        "label": "电话",
        "required": false
      },
      {
        "key": "CONTACT",
        "label": "联系窗口",
        "required": false
      },
      {
        "key": "FAX",
        "label": "传真号码",
        "required": false
      },
      {
        "key": "CITY",
        "label": "城市",
        "required": false
      },
      {
        "key": "POSTAL_CODE",
        "label": "邮政编码",
        "required": false
      },
      {
        "key": "ADDRESS",
        "label": "地址",
        "required": false
      },
      {
        "key": "STATE",
        "label": "省/州",
        "required": false
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": false
      },
      {
        "key": "Key",
        "label": "客户名称/国家/电话/移动电话号码",
        "required": false
      }
    ],
    "example": {
      "PARENT_ID": "父阶客户测试值",
      "CUSTOMER": "自动化样例001",
      "NATIONALITY": "国家测试值",
      "ATTRIBUTE1": "AT-001",
      "MOBILE": "移动电话号码测试值",
      "TEL": "电话测试值",
      "CONTACT": "联系窗口测试值",
      "FAX": "传真号码测试值",
      "CITY": "城市测试值",
      "POSTAL_CODE": "AT-001",
      "ADDRESS": "地址测试值",
      "STATE": "省/州测试值",
      "ENABLED": "是否激活测试值",
      "Key": "客户名称/国家/电话/移动电话号码测试值"
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
        "PARENT_ID": "父阶客户测试值",
        "CUSTOMER": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "ATTRIBUTE1": "AT-001",
        "MOBILE": "移动电话号码测试值",
        "TEL": "电话测试值",
        "CONTACT": "联系窗口测试值",
        "FAX": "传真号码测试值",
        "CITY": "城市测试值",
        "POSTAL_CODE": "AT-001",
        "ADDRESS": "地址测试值",
        "STATE": "省/州测试值",
        "ENABLED": "是否激活测试值",
        "Key": "客户名称/国家/电话/移动电话号码测试值"
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
      "permission": "SfcsCustomersAdd",
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
          "key": "PARENT_ID",
          "label": "父阶客户",
          "required": false,
          "example": "父阶客户测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "NATIONALITY",
          "label": "国家",
          "required": false,
          "example": "国家测试值"
        },
        {
          "key": "ATTRIBUTE1",
          "label": "客户编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MOBILE",
          "label": "移动电话号码",
          "required": false,
          "example": "移动电话号码测试值"
        },
        {
          "key": "TEL",
          "label": "电话",
          "required": false,
          "example": "电话测试值"
        },
        {
          "key": "CONTACT",
          "label": "联系窗口",
          "required": false,
          "example": "联系窗口测试值"
        },
        {
          "key": "FAX",
          "label": "传真号码",
          "required": false,
          "example": "传真号码测试值"
        },
        {
          "key": "CITY",
          "label": "城市",
          "required": false,
          "example": "城市测试值"
        },
        {
          "key": "POSTAL_CODE",
          "label": "邮政编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ADDRESS",
          "label": "地址",
          "required": false,
          "example": "地址测试值"
        },
        {
          "key": "STATE",
          "label": "省/州",
          "required": false,
          "example": "省/州测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "Key",
          "label": "客户名称/国家/电话/移动电话号码",
          "required": false,
          "example": "客户名称/国家/电话/移动电话号码测试值"
        }
      ],
      "testData": {
        "PARENT_ID": "父阶客户测试值",
        "CUSTOMER": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "ATTRIBUTE1": "AT-001",
        "MOBILE": "移动电话号码测试值",
        "TEL": "电话测试值",
        "CONTACT": "联系窗口测试值",
        "FAX": "传真号码测试值",
        "CITY": "城市测试值",
        "POSTAL_CODE": "AT-001",
        "ADDRESS": "地址测试值",
        "STATE": "省/州测试值",
        "ENABLED": "是否激活测试值",
        "Key": "客户名称/国家/电话/移动电话号码测试值"
      }
    },
    {
      "key": "4aa22a22ac-a7f814c0a4-99afe",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "editClick(row, row.$index)",
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
          "key": "PARENT_ID",
          "label": "父阶客户",
          "required": false,
          "example": "父阶客户测试值"
        },
        {
          "key": "CUSTOMER",
          "label": "客户名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "NATIONALITY",
          "label": "国家",
          "required": false,
          "example": "国家测试值"
        },
        {
          "key": "ATTRIBUTE1",
          "label": "客户编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MOBILE",
          "label": "移动电话号码",
          "required": false,
          "example": "移动电话号码测试值"
        },
        {
          "key": "TEL",
          "label": "电话",
          "required": false,
          "example": "电话测试值"
        },
        {
          "key": "CONTACT",
          "label": "联系窗口",
          "required": false,
          "example": "联系窗口测试值"
        },
        {
          "key": "FAX",
          "label": "传真号码",
          "required": false,
          "example": "传真号码测试值"
        },
        {
          "key": "CITY",
          "label": "城市",
          "required": false,
          "example": "城市测试值"
        },
        {
          "key": "POSTAL_CODE",
          "label": "邮政编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ADDRESS",
          "label": "地址",
          "required": false,
          "example": "地址测试值"
        },
        {
          "key": "STATE",
          "label": "省/州",
          "required": false,
          "example": "省/州测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": false,
          "example": "是否激活测试值"
        },
        {
          "key": "Key",
          "label": "客户名称/国家/电话/移动电话号码",
          "required": false,
          "example": "客户名称/国家/电话/移动电话号码测试值"
        }
      ],
      "testData": {
        "PARENT_ID": "父阶客户测试值",
        "CUSTOMER": "自动化样例001",
        "NATIONALITY": "国家测试值",
        "ATTRIBUTE1": "AT-001",
        "MOBILE": "移动电话号码测试值",
        "TEL": "电话测试值",
        "CONTACT": "联系窗口测试值",
        "FAX": "传真号码测试值",
        "CITY": "城市测试值",
        "POSTAL_CODE": "AT-001",
        "ADDRESS": "地址测试值",
        "STATE": "省/州测试值",
        "ENABLED": "是否激活测试值",
        "Key": "客户名称/国家/电话/移动电话号码测试值"
      }
    }
  ]
});
