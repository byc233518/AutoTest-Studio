// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-mold-relation-index-1a0341",
  "name": "设备管理 - 模具关系配置功能校验",
  "displayName": "模具关系配置",
  "route": "/ITPM/TpmMoldRelation/Index",
  "sourceRoute": "/ITPM/TpmMoldRelation/Index",
  "menuCode": "TpmMoldRelation",
  "breadcrumb": "设备管理 / 模具管理 / 模具关系配置",
  "sourceFile": "src/views/ITPM/TpmMoldRelation/Index.vue",
  "dataSchema": {
    "columns": [
      "Code",
      "MoldId",
      "Name",
      "ClassType",
      "PartSpecs",
      "Volume",
      "Weight",
      "PartModel",
      "Enabled",
      "Remark",
      "CavityNum",
      "LowerUsedCavity",
      "CavityLocationIsSame",
      "LifeTimeYear",
      "LifeTimeCount",
      "FormingTime",
      "ReplaceTime"
    ],
    "required": [
      "MoldId",
      "CavityNum"
    ],
    "fields": [
      {
        "key": "Code",
        "label": "模具编码",
        "required": false
      },
      {
        "key": "MoldId",
        "label": "模具名称",
        "required": true
      },
      {
        "key": "Name",
        "label": "物料名称",
        "required": false
      },
      {
        "key": "ClassType",
        "label": "物料子类",
        "required": false
      },
      {
        "key": "PartSpecs",
        "label": "物料规格",
        "required": false
      },
      {
        "key": "Volume",
        "label": "体积(cm³)",
        "required": false
      },
      {
        "key": "Weight",
        "label": "重量(KG)",
        "required": false
      },
      {
        "key": "PartModel",
        "label": "物料型号",
        "required": false
      },
      {
        "key": "Enabled",
        "label": "状态",
        "required": false
      },
      {
        "key": "Remark",
        "label": "备注",
        "required": false
      },
      {
        "key": "CavityNum",
        "label": "穴位",
        "required": true
      },
      {
        "key": "LowerUsedCavity",
        "label": "最低使用穴数",
        "required": false
      },
      {
        "key": "CavityLocationIsSame",
        "label": "穴位是否一致",
        "required": false
      },
      {
        "key": "LifeTimeYear",
        "label": "使用寿命(年)",
        "required": false
      },
      {
        "key": "LifeTimeCount",
        "label": "参考寿命次数",
        "required": false
      },
      {
        "key": "FormingTime",
        "label": "成形时间",
        "required": false
      },
      {
        "key": "ReplaceTime",
        "label": "标准换模时间(秒)",
        "required": false
      }
    ],
    "example": {
      "Code": "AT-001",
      "MoldId": "自动化样例001",
      "Name": "自动化样例001",
      "ClassType": "物料子类测试值",
      "PartSpecs": "物料规格测试值",
      "Volume": "体积(cm³)测试值",
      "Weight": "重量(KG)测试值",
      "PartModel": "物料型号测试值",
      "Enabled": "Y",
      "Remark": "自动化测试备注001",
      "CavityNum": "穴位测试值",
      "LowerUsedCavity": "最低使用穴数测试值",
      "CavityLocationIsSame": "穴位是否一致测试值",
      "LifeTimeYear": "使用寿命(年)测试值",
      "LifeTimeCount": "参考寿命次数测试值",
      "FormingTime": "2026-08-01",
      "ReplaceTime": "标准换模时间(秒)测试值"
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
      "trigger": "enter",
      "sourceHandlers": [],
      "testData": {
        "Code": "AT-001",
        "MoldId": "自动化样例001",
        "Name": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartSpecs": "物料规格测试值",
        "Volume": "体积(cm³)测试值",
        "Weight": "重量(KG)测试值",
        "PartModel": "物料型号测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "CavityNum": "穴位测试值",
        "LowerUsedCavity": "最低使用穴数测试值",
        "CavityLocationIsSame": "穴位是否一致测试值",
        "LifeTimeYear": "使用寿命(年)测试值",
        "LifeTimeCount": "参考寿命次数测试值",
        "FormingTime": "2026-08-01",
        "ReplaceTime": "标准换模时间(秒)测试值"
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
      "key": "13fd57e65b-2cd9e6ce81-526a8",
      "type": "新增表单",
      "name": "新增业务入口校验",
      "label": "新增",
      "handler": "openFormEditor",
      "permission": "Add",
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
          "key": "Code",
          "label": "模具编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "MoldId",
          "label": "模具名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Name",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartSpecs",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "Volume",
          "label": "体积(cm³)",
          "required": false,
          "example": "体积(cm³)测试值"
        },
        {
          "key": "Weight",
          "label": "重量(KG)",
          "required": false,
          "example": "重量(KG)测试值"
        },
        {
          "key": "PartModel",
          "label": "物料型号",
          "required": false,
          "example": "物料型号测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CavityNum",
          "label": "穴位",
          "required": true,
          "example": "穴位测试值"
        },
        {
          "key": "LowerUsedCavity",
          "label": "最低使用穴数",
          "required": false,
          "example": "最低使用穴数测试值"
        },
        {
          "key": "CavityLocationIsSame",
          "label": "穴位是否一致",
          "required": false,
          "example": "穴位是否一致测试值"
        },
        {
          "key": "LifeTimeYear",
          "label": "使用寿命(年)",
          "required": false,
          "example": "使用寿命(年)测试值"
        },
        {
          "key": "LifeTimeCount",
          "label": "参考寿命次数",
          "required": false,
          "example": "参考寿命次数测试值"
        },
        {
          "key": "FormingTime",
          "label": "成形时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ReplaceTime",
          "label": "标准换模时间(秒)",
          "required": false,
          "example": "标准换模时间(秒)测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "MoldId": "自动化样例001",
        "Name": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartSpecs": "物料规格测试值",
        "Volume": "体积(cm³)测试值",
        "Weight": "重量(KG)测试值",
        "PartModel": "物料型号测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "CavityNum": "穴位测试值",
        "LowerUsedCavity": "最低使用穴数测试值",
        "CavityLocationIsSame": "穴位是否一致测试值",
        "LifeTimeYear": "使用寿命(年)测试值",
        "LifeTimeCount": "参考寿命次数测试值",
        "FormingTime": "2026-08-01",
        "ReplaceTime": "标准换模时间(秒)测试值"
      }
    },
    {
      "key": "726b6ec55f-3755f56f2f-ffa07",
      "type": "删除确认",
      "name": "删除确认框与取消操作",
      "label": "删除",
      "handler": "deleteRecord(row)",
      "permission": "Delete",
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
      "key": "faea8c1db9-f7acefd2d4-206d9",
      "type": "查看详情",
      "name": "查看业务入口校验",
      "label": "查看",
      "handler": "openFormViewer(row)",
      "permission": "View",
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
      "key": "4aa22a22ac-a7f814c0a4-56bbd",
      "type": "编辑表单",
      "name": "编辑业务入口校验",
      "label": "编辑",
      "handler": "openFormEditor(row)",
      "permission": "Edit",
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
          "key": "Code",
          "label": "模具编码",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "MoldId",
          "label": "模具名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "Name",
          "label": "物料名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ClassType",
          "label": "物料子类",
          "required": false,
          "example": "物料子类测试值"
        },
        {
          "key": "PartSpecs",
          "label": "物料规格",
          "required": false,
          "example": "物料规格测试值"
        },
        {
          "key": "Volume",
          "label": "体积(cm³)",
          "required": false,
          "example": "体积(cm³)测试值"
        },
        {
          "key": "Weight",
          "label": "重量(KG)",
          "required": false,
          "example": "重量(KG)测试值"
        },
        {
          "key": "PartModel",
          "label": "物料型号",
          "required": false,
          "example": "物料型号测试值"
        },
        {
          "key": "Enabled",
          "label": "状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "Remark",
          "label": "备注",
          "required": false,
          "example": "自动化测试备注001"
        },
        {
          "key": "CavityNum",
          "label": "穴位",
          "required": true,
          "example": "穴位测试值"
        },
        {
          "key": "LowerUsedCavity",
          "label": "最低使用穴数",
          "required": false,
          "example": "最低使用穴数测试值"
        },
        {
          "key": "CavityLocationIsSame",
          "label": "穴位是否一致",
          "required": false,
          "example": "穴位是否一致测试值"
        },
        {
          "key": "LifeTimeYear",
          "label": "使用寿命(年)",
          "required": false,
          "example": "使用寿命(年)测试值"
        },
        {
          "key": "LifeTimeCount",
          "label": "参考寿命次数",
          "required": false,
          "example": "参考寿命次数测试值"
        },
        {
          "key": "FormingTime",
          "label": "成形时间",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "ReplaceTime",
          "label": "标准换模时间(秒)",
          "required": false,
          "example": "标准换模时间(秒)测试值"
        }
      ],
      "testData": {
        "Code": "AT-001",
        "MoldId": "自动化样例001",
        "Name": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartSpecs": "物料规格测试值",
        "Volume": "体积(cm³)测试值",
        "Weight": "重量(KG)测试值",
        "PartModel": "物料型号测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "CavityNum": "穴位测试值",
        "LowerUsedCavity": "最低使用穴数测试值",
        "CavityLocationIsSame": "穴位是否一致测试值",
        "LifeTimeYear": "使用寿命(年)测试值",
        "LifeTimeCount": "参考寿命次数测试值",
        "FormingTime": "2026-08-01",
        "ReplaceTime": "标准换模时间(秒)测试值"
      }
    }
  ]
});
