// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "legacyMes-page-i-mes-ims-qc-check-item-index-6611c2",
  "name": "旧版制造执行 - 是否激活（未配置菜单）功能校验",
  "displayName": "是否激活（未配置菜单）",
  "route": "/iMES/ImsQcCheckItem/index",
  "sourceRoute": "/iMES/ImsQcCheckItem/index",
  "menuCode": "",
  "breadcrumb": "旧版制造执行 / 未配置菜单 / 是否激活（未配置菜单）",
  "sourceFile": "src/views/iMES/ImsQcCheckItem/index.vue",
  "dataSchema": {
    "columns": [
      "CLASS_CODE",
      "ITEMTYPE",
      "CODE",
      "ITEM",
      "DESCRIPTION",
      "QUA_TYPE",
      "ENABLED",
      "SAMPLE_QTY",
      "AC",
      "RE",
      "ATT1",
      "CREATED_BY",
      "UPDATED_BY",
      "CHECKDATA_NAME"
    ],
    "required": [
      "CLASS_CODE",
      "ITEMTYPE",
      "CODE",
      "ITEM",
      "DESCRIPTION",
      "QUA_TYPE",
      "ENABLED",
      "SAMPLE_QTY",
      "AC",
      "RE",
      "ATT1",
      "CREATED_BY",
      "UPDATED_BY",
      "CHECKDATA_NAME"
    ],
    "fields": [
      {
        "key": "CLASS_CODE",
        "label": "检验项类型编码",
        "required": true
      },
      {
        "key": "ITEMTYPE",
        "label": "检验项类型",
        "required": true
      },
      {
        "key": "CODE",
        "label": "编码",
        "required": true
      },
      {
        "key": "ITEM",
        "label": "检验项(CN)",
        "required": true
      },
      {
        "key": "DESCRIPTION",
        "label": "检验内容",
        "required": true
      },
      {
        "key": "QUA_TYPE",
        "label": "有无量化",
        "required": true
      },
      {
        "key": "ENABLED",
        "label": "是否激活",
        "required": true
      },
      {
        "key": "SAMPLE_QTY",
        "label": "固定抽检数量",
        "required": true
      },
      {
        "key": "AC",
        "label": "固定接收数量",
        "required": true
      },
      {
        "key": "RE",
        "label": "固定拒收数量",
        "required": true
      },
      {
        "key": "ATT1",
        "label": "检验项(EN)",
        "required": true
      },
      {
        "key": "CREATED_BY",
        "label": "创建人",
        "required": true
      },
      {
        "key": "UPDATED_BY",
        "label": "修改人",
        "required": true
      },
      {
        "key": "CHECKDATA_NAME",
        "label": "量化数据源",
        "required": true
      }
    ],
    "example": {
      "CLASS_CODE": "AT-001",
      "ITEMTYPE": "检验项类型测试值",
      "CODE": "AT-001",
      "ITEM": "检验项(CN)测试值",
      "DESCRIPTION": "检验内容测试值",
      "QUA_TYPE": "有无量化测试值",
      "ENABLED": "是否激活测试值",
      "SAMPLE_QTY": "1",
      "AC": "1",
      "RE": "1",
      "ATT1": "检验项(EN)测试值",
      "CREATED_BY": "创建人测试值",
      "UPDATED_BY": "修改人测试值",
      "CHECKDATA_NAME": "量化数据源测试值"
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
        "getLoadData"
      ],
      "testData": {
        "CLASS_CODE": "AT-001",
        "ITEMTYPE": "检验项类型测试值",
        "CODE": "AT-001",
        "ITEM": "检验项(CN)测试值",
        "DESCRIPTION": "检验内容测试值",
        "QUA_TYPE": "有无量化测试值",
        "ENABLED": "是否激活测试值",
        "SAMPLE_QTY": "1",
        "AC": "1",
        "RE": "1",
        "ATT1": "检验项(EN)测试值",
        "CREATED_BY": "创建人测试值",
        "UPDATED_BY": "修改人测试值",
        "CHECKDATA_NAME": "量化数据源测试值"
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
          "key": "CLASS_CODE",
          "label": "检验项类型编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ITEMTYPE",
          "label": "检验项类型",
          "required": true,
          "example": "检验项类型测试值"
        },
        {
          "key": "CODE",
          "label": "编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ITEM",
          "label": "检验项(CN)",
          "required": true,
          "example": "检验项(CN)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "检验内容",
          "required": true,
          "example": "检验内容测试值"
        },
        {
          "key": "QUA_TYPE",
          "label": "有无量化",
          "required": true,
          "example": "有无量化测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "SAMPLE_QTY",
          "label": "固定抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "AC",
          "label": "固定接收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "RE",
          "label": "固定拒收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ATT1",
          "label": "检验项(EN)",
          "required": true,
          "example": "检验项(EN)测试值"
        },
        {
          "key": "CREATED_BY",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "UPDATED_BY",
          "label": "修改人",
          "required": true,
          "example": "修改人测试值"
        },
        {
          "key": "CHECKDATA_NAME",
          "label": "量化数据源",
          "required": true,
          "example": "量化数据源测试值"
        }
      ],
      "testData": {
        "CLASS_CODE": "AT-001",
        "ITEMTYPE": "检验项类型测试值",
        "CODE": "AT-001",
        "ITEM": "检验项(CN)测试值",
        "DESCRIPTION": "检验内容测试值",
        "QUA_TYPE": "有无量化测试值",
        "ENABLED": "是否激活测试值",
        "SAMPLE_QTY": "1",
        "AC": "1",
        "RE": "1",
        "ATT1": "检验项(EN)测试值",
        "CREATED_BY": "创建人测试值",
        "UPDATED_BY": "修改人测试值",
        "CHECKDATA_NAME": "量化数据源测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-2eb81",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "delClick",
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
          "key": "CLASS_CODE",
          "label": "检验项类型编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ITEMTYPE",
          "label": "检验项类型",
          "required": true,
          "example": "检验项类型测试值"
        },
        {
          "key": "CODE",
          "label": "编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ITEM",
          "label": "检验项(CN)",
          "required": true,
          "example": "检验项(CN)测试值"
        },
        {
          "key": "DESCRIPTION",
          "label": "检验内容",
          "required": true,
          "example": "检验内容测试值"
        },
        {
          "key": "QUA_TYPE",
          "label": "有无量化",
          "required": true,
          "example": "有无量化测试值"
        },
        {
          "key": "ENABLED",
          "label": "是否激活",
          "required": true,
          "example": "是否激活测试值"
        },
        {
          "key": "SAMPLE_QTY",
          "label": "固定抽检数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "AC",
          "label": "固定接收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "RE",
          "label": "固定拒收数量",
          "required": true,
          "example": "1"
        },
        {
          "key": "ATT1",
          "label": "检验项(EN)",
          "required": true,
          "example": "检验项(EN)测试值"
        },
        {
          "key": "CREATED_BY",
          "label": "创建人",
          "required": true,
          "example": "创建人测试值"
        },
        {
          "key": "UPDATED_BY",
          "label": "修改人",
          "required": true,
          "example": "修改人测试值"
        },
        {
          "key": "CHECKDATA_NAME",
          "label": "量化数据源",
          "required": true,
          "example": "量化数据源测试值"
        }
      ],
      "testData": {
        "CLASS_CODE": "AT-001",
        "ITEMTYPE": "检验项类型测试值",
        "CODE": "AT-001",
        "ITEM": "检验项(CN)测试值",
        "DESCRIPTION": "检验内容测试值",
        "QUA_TYPE": "有无量化测试值",
        "ENABLED": "是否激活测试值",
        "SAMPLE_QTY": "1",
        "AC": "1",
        "RE": "1",
        "ATT1": "检验项(EN)测试值",
        "CREATED_BY": "创建人测试值",
        "UPDATED_BY": "修改人测试值",
        "CHECKDATA_NAME": "量化数据源测试值"
      }
    }
  ]
});
