// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "tpm-page-itpm-tpm-mold-insert-index-7cd4f8",
  "name": "设备管理 - 镶件管理功能校验",
  "displayName": "镶件管理",
  "route": "/ITPM/TpmMoldInsert/Index",
  "sourceRoute": "/ITPM/TpmMoldInsert/Index",
  "menuCode": "TpmMoldInsert",
  "breadcrumb": "设备管理 / 模具管理 / 镶件管理",
  "sourceFile": "src/views/ITPM/TpmMoldInsert/Index.vue",
  "dataSchema": {
    "columns": [
      "AssetNo",
      "Code",
      "MoldPartId",
      "ClassType",
      "PartSpecs",
      "PartModel",
      "Volume",
      "Weight",
      "LifeTimeYear",
      "LifeTimeCount",
      "CavityNum",
      "LowerUsedCavity",
      "CavityLocationIsSame",
      "BillNo",
      "VendorCode",
      "BatchNo",
      "ProductId",
      "AreaName",
      "MoldLocationId",
      "ProductDate",
      "expectedEndOfLifeDate",
      "TotalUsedCount",
      "TotalKeepCount",
      "TotalRepairCount",
      "UsedCount",
      "TotalRepairHour",
      "Qty",
      "TotalQty",
      "Manager",
      "EarlyWarningKeepCount",
      "EarlyWarningLifeDay",
      "EarlyWarningKeepQty",
      "Enabled",
      "Remark",
      "MoldCode",
      "Name",
      "WoNos",
      "ReceiveCode",
      "EquipCode",
      "EQUIP_NAME",
      "CATEGORY_NAME",
      "STATUS",
      "STATION_NAME",
      "STATION",
      "UnloadType",
      "MoldInsertCode",
      "LocationAreaName",
      "LocationCode",
      "LocationName",
      "ToLocationCode"
    ],
    "required": [
      "AssetNo",
      "Code",
      "MoldPartId",
      "CavityNum",
      "VendorCode",
      "BatchNo",
      "MoldLocationId",
      "ProductDate",
      "Qty",
      "EarlyWarningKeepCount",
      "EarlyWarningLifeDay",
      "EarlyWarningKeepQty",
      "MoldCode",
      "Name",
      "EquipCode",
      "MoldInsertCode",
      "LocationCode",
      "ToLocationCode"
    ],
    "fields": [
      {
        "key": "AssetNo",
        "label": "资产编码",
        "required": true
      },
      {
        "key": "Code",
        "label": "物料编码",
        "required": true
      },
      {
        "key": "MoldPartId",
        "label": "物料名称",
        "required": true
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
        "key": "PartModel",
        "label": "物料型号",
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
        "key": "BillNo",
        "label": "关联单据-项次",
        "required": false
      },
      {
        "key": "VendorCode",
        "label": "供应商编码",
        "required": true
      },
      {
        "key": "BatchNo",
        "label": "批次号",
        "required": true
      },
      {
        "key": "ProductId",
        "label": "厂商唯一码",
        "required": false
      },
      {
        "key": "AreaName",
        "label": "储区名称",
        "required": false
      },
      {
        "key": "MoldLocationId",
        "label": "储位编码",
        "required": true
      },
      {
        "key": "ProductDate",
        "label": "生产日期",
        "required": true
      },
      {
        "key": "expectedEndOfLifeDate",
        "label": "预计报废日期",
        "required": false
      },
      {
        "key": "TotalUsedCount",
        "label": "总使用次数",
        "required": false
      },
      {
        "key": "TotalKeepCount",
        "label": "总保养次数",
        "required": false
      },
      {
        "key": "TotalRepairCount",
        "label": "总维修次数",
        "required": false
      },
      {
        "key": "UsedCount",
        "label": "当前周期使用次数",
        "required": false
      },
      {
        "key": "TotalRepairHour",
        "label": "总维修时长(H)",
        "required": false
      },
      {
        "key": "Qty",
        "label": "当前周期产量",
        "required": true
      },
      {
        "key": "TotalQty",
        "label": "总周期产量",
        "required": false
      },
      {
        "key": "Manager",
        "label": "负责人",
        "required": false
      },
      {
        "key": "EarlyWarningKeepCount",
        "label": "提前预警保养次数",
        "required": true
      },
      {
        "key": "EarlyWarningLifeDay",
        "label": "提前预警寿命天数",
        "required": true
      },
      {
        "key": "EarlyWarningKeepQty",
        "label": "提前预警保养产量",
        "required": true
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
        "key": "MoldCode",
        "label": "模具编码",
        "required": true
      },
      {
        "key": "Name",
        "label": "模具名称",
        "required": true
      },
      {
        "key": "WoNos",
        "label": "关联单号",
        "required": false
      },
      {
        "key": "ReceiveCode",
        "label": "任务单号",
        "required": false
      },
      {
        "key": "EquipCode",
        "label": "设备编码",
        "required": true
      },
      {
        "key": "EQUIP_NAME",
        "label": "设备名称",
        "required": false
      },
      {
        "key": "CATEGORY_NAME",
        "label": "设备分类",
        "required": false
      },
      {
        "key": "STATUS",
        "label": "设备状态",
        "required": false
      },
      {
        "key": "STATION_NAME",
        "label": "存放地点",
        "required": false
      },
      {
        "key": "STATION",
        "label": "机台序号",
        "required": false
      },
      {
        "key": "UnloadType",
        "label": "退模类型",
        "required": false
      },
      {
        "key": "MoldInsertCode",
        "label": "模具/镶件编码",
        "required": true
      },
      {
        "key": "LocationAreaName",
        "label": "原储区名称",
        "required": false
      },
      {
        "key": "LocationCode",
        "label": "原储位编码",
        "required": true
      },
      {
        "key": "LocationName",
        "label": "原储位名称",
        "required": false
      },
      {
        "key": "ToLocationCode",
        "label": "目的储位编码",
        "required": true
      }
    ],
    "example": {
      "AssetNo": "AT-001",
      "Code": "AT-001",
      "MoldPartId": "自动化样例001",
      "ClassType": "物料子类测试值",
      "PartSpecs": "物料规格测试值",
      "PartModel": "物料型号测试值",
      "Volume": "体积(cm³)测试值",
      "Weight": "重量(KG)测试值",
      "LifeTimeYear": "使用寿命(年)测试值",
      "LifeTimeCount": "参考寿命次数测试值",
      "CavityNum": "穴位测试值",
      "LowerUsedCavity": "最低使用穴数测试值",
      "CavityLocationIsSame": "穴位是否一致测试值",
      "BillNo": "关联单据-项次测试值",
      "VendorCode": "AT-001",
      "BatchNo": "批次号测试值",
      "ProductId": "厂商唯一码测试值",
      "AreaName": "自动化样例001",
      "MoldLocationId": "AT-001",
      "ProductDate": "2026-08-01",
      "expectedEndOfLifeDate": "2026-08-01",
      "TotalUsedCount": "总使用次数测试值",
      "TotalKeepCount": "总保养次数测试值",
      "TotalRepairCount": "总维修次数测试值",
      "UsedCount": "当前周期使用次数测试值",
      "TotalRepairHour": "总维修时长(H)测试值",
      "Qty": "当前周期产量测试值",
      "TotalQty": "总周期产量测试值",
      "Manager": "负责人测试值",
      "EarlyWarningKeepCount": "提前预警保养次数测试值",
      "EarlyWarningLifeDay": "提前预警寿命天数测试值",
      "EarlyWarningKeepQty": "提前预警保养产量测试值",
      "Enabled": "Y",
      "Remark": "自动化测试备注001",
      "MoldCode": "AT-001",
      "Name": "自动化样例001",
      "WoNos": "AT-001",
      "ReceiveCode": "AT-001",
      "EquipCode": "AT-001",
      "EQUIP_NAME": "自动化样例001",
      "CATEGORY_NAME": "设备分类测试值",
      "STATUS": "Y",
      "STATION_NAME": "存放地点测试值",
      "STATION": "1",
      "UnloadType": "退模类型测试值",
      "MoldInsertCode": "AT-001",
      "LocationAreaName": "自动化样例001",
      "LocationCode": "AT-001",
      "LocationName": "自动化样例001",
      "ToLocationCode": "AT-001"
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
        "AssetNo": "AT-001",
        "Code": "AT-001",
        "MoldPartId": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartSpecs": "物料规格测试值",
        "PartModel": "物料型号测试值",
        "Volume": "体积(cm³)测试值",
        "Weight": "重量(KG)测试值",
        "LifeTimeYear": "使用寿命(年)测试值",
        "LifeTimeCount": "参考寿命次数测试值",
        "CavityNum": "穴位测试值",
        "LowerUsedCavity": "最低使用穴数测试值",
        "CavityLocationIsSame": "穴位是否一致测试值",
        "BillNo": "关联单据-项次测试值",
        "VendorCode": "AT-001",
        "BatchNo": "批次号测试值",
        "ProductId": "厂商唯一码测试值",
        "AreaName": "自动化样例001",
        "MoldLocationId": "AT-001",
        "ProductDate": "2026-08-01",
        "expectedEndOfLifeDate": "2026-08-01",
        "TotalUsedCount": "总使用次数测试值",
        "TotalKeepCount": "总保养次数测试值",
        "TotalRepairCount": "总维修次数测试值",
        "UsedCount": "当前周期使用次数测试值",
        "TotalRepairHour": "总维修时长(H)测试值",
        "Qty": "当前周期产量测试值",
        "TotalQty": "总周期产量测试值",
        "Manager": "负责人测试值",
        "EarlyWarningKeepCount": "提前预警保养次数测试值",
        "EarlyWarningLifeDay": "提前预警寿命天数测试值",
        "EarlyWarningKeepQty": "提前预警保养产量测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "MoldCode": "AT-001",
        "Name": "自动化样例001",
        "WoNos": "AT-001",
        "ReceiveCode": "AT-001",
        "EquipCode": "AT-001",
        "EQUIP_NAME": "自动化样例001",
        "CATEGORY_NAME": "设备分类测试值",
        "STATUS": "Y",
        "STATION_NAME": "存放地点测试值",
        "STATION": "1",
        "UnloadType": "退模类型测试值",
        "MoldInsertCode": "AT-001",
        "LocationAreaName": "自动化样例001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "ToLocationCode": "AT-001"
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
          "key": "AssetNo",
          "label": "资产编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Code",
          "label": "物料编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MoldPartId",
          "label": "物料名称",
          "required": true,
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
          "key": "PartModel",
          "label": "物料型号",
          "required": false,
          "example": "物料型号测试值"
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
          "key": "BillNo",
          "label": "关联单据-项次",
          "required": false,
          "example": "关联单据-项次测试值"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "BatchNo",
          "label": "批次号",
          "required": true,
          "example": "批次号测试值"
        },
        {
          "key": "ProductId",
          "label": "厂商唯一码",
          "required": false,
          "example": "厂商唯一码测试值"
        },
        {
          "key": "AreaName",
          "label": "储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MoldLocationId",
          "label": "储位编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ProductDate",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "expectedEndOfLifeDate",
          "label": "预计报废日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "TotalUsedCount",
          "label": "总使用次数",
          "required": false,
          "example": "总使用次数测试值"
        },
        {
          "key": "TotalKeepCount",
          "label": "总保养次数",
          "required": false,
          "example": "总保养次数测试值"
        },
        {
          "key": "TotalRepairCount",
          "label": "总维修次数",
          "required": false,
          "example": "总维修次数测试值"
        },
        {
          "key": "UsedCount",
          "label": "当前周期使用次数",
          "required": false,
          "example": "当前周期使用次数测试值"
        },
        {
          "key": "TotalRepairHour",
          "label": "总维修时长(H)",
          "required": false,
          "example": "总维修时长(H)测试值"
        },
        {
          "key": "Qty",
          "label": "当前周期产量",
          "required": true,
          "example": "当前周期产量测试值"
        },
        {
          "key": "TotalQty",
          "label": "总周期产量",
          "required": false,
          "example": "总周期产量测试值"
        },
        {
          "key": "Manager",
          "label": "负责人",
          "required": false,
          "example": "负责人测试值"
        },
        {
          "key": "EarlyWarningKeepCount",
          "label": "提前预警保养次数",
          "required": true,
          "example": "提前预警保养次数测试值"
        },
        {
          "key": "EarlyWarningLifeDay",
          "label": "提前预警寿命天数",
          "required": true,
          "example": "提前预警寿命天数测试值"
        },
        {
          "key": "EarlyWarningKeepQty",
          "label": "提前预警保养产量",
          "required": true,
          "example": "提前预警保养产量测试值"
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
          "key": "MoldCode",
          "label": "模具编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "模具名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "WoNos",
          "label": "关联单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ReceiveCode",
          "label": "任务单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "EquipCode",
          "label": "设备编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "EQUIP_NAME",
          "label": "设备名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "设备分类",
          "required": false,
          "example": "设备分类测试值"
        },
        {
          "key": "STATUS",
          "label": "设备状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "STATION_NAME",
          "label": "存放地点",
          "required": false,
          "example": "存放地点测试值"
        },
        {
          "key": "STATION",
          "label": "机台序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "UnloadType",
          "label": "退模类型",
          "required": false,
          "example": "退模类型测试值"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationAreaName",
          "label": "原储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LocationCode",
          "label": "原储位编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "原储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ToLocationCode",
          "label": "目的储位编码",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "AssetNo": "AT-001",
        "Code": "AT-001",
        "MoldPartId": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartSpecs": "物料规格测试值",
        "PartModel": "物料型号测试值",
        "Volume": "体积(cm³)测试值",
        "Weight": "重量(KG)测试值",
        "LifeTimeYear": "使用寿命(年)测试值",
        "LifeTimeCount": "参考寿命次数测试值",
        "CavityNum": "穴位测试值",
        "LowerUsedCavity": "最低使用穴数测试值",
        "CavityLocationIsSame": "穴位是否一致测试值",
        "BillNo": "关联单据-项次测试值",
        "VendorCode": "AT-001",
        "BatchNo": "批次号测试值",
        "ProductId": "厂商唯一码测试值",
        "AreaName": "自动化样例001",
        "MoldLocationId": "AT-001",
        "ProductDate": "2026-08-01",
        "expectedEndOfLifeDate": "2026-08-01",
        "TotalUsedCount": "总使用次数测试值",
        "TotalKeepCount": "总保养次数测试值",
        "TotalRepairCount": "总维修次数测试值",
        "UsedCount": "当前周期使用次数测试值",
        "TotalRepairHour": "总维修时长(H)测试值",
        "Qty": "当前周期产量测试值",
        "TotalQty": "总周期产量测试值",
        "Manager": "负责人测试值",
        "EarlyWarningKeepCount": "提前预警保养次数测试值",
        "EarlyWarningLifeDay": "提前预警寿命天数测试值",
        "EarlyWarningKeepQty": "提前预警保养产量测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "MoldCode": "AT-001",
        "Name": "自动化样例001",
        "WoNos": "AT-001",
        "ReceiveCode": "AT-001",
        "EquipCode": "AT-001",
        "EQUIP_NAME": "自动化样例001",
        "CATEGORY_NAME": "设备分类测试值",
        "STATUS": "Y",
        "STATION_NAME": "存放地点测试值",
        "STATION": "1",
        "UnloadType": "退模类型测试值",
        "MoldInsertCode": "AT-001",
        "LocationAreaName": "自动化样例001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "ToLocationCode": "AT-001"
      }
    },
    {
      "key": "faea8c1db9-0c3d90083f-8d800",
      "type": "查看详情",
      "name": "架模作业业务入口校验",
      "label": "架模作业",
      "handler": "openSetupModal",
      "permission": "",
      "menuTriggerLabel": "操作作业",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击架模作业",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-92329e3645-f0a20",
      "type": "查看详情",
      "name": "退模作业业务入口校验",
      "label": "退模作业",
      "handler": "openUnloadModal",
      "permission": "",
      "menuTriggerLabel": "操作作业",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击退模作业",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "faea8c1db9-1231786e23-34c05",
      "type": "查看详情",
      "name": "转储作业业务入口校验",
      "label": "转储作业",
      "handler": "openLocChangeModal",
      "permission": "",
      "menuTriggerLabel": "操作作业",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "打开详情后关闭",
      "steps": [
        "点击转储作业",
        "校验详情区域真实打开",
        "关闭详情"
      ],
      "assertions": [
        "详情弹窗、抽屉或新路由真实打开"
      ],
      "mutatesData": false
    },
    {
      "key": "7e002f9936-24892b0b91-0f0ed",
      "type": "业务动作",
      "name": "封存业务入口校验",
      "label": "封存",
      "handler": "seal",
      "permission": "Seal",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位封存",
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
      "key": "7e002f9936-47db9a5a89-92bd5",
      "type": "业务动作",
      "name": "解封业务入口校验",
      "label": "解封",
      "handler": "unSeal",
      "permission": "UnSeal",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": true,
      "executionPolicy": "只校验入口，不执行数据变更",
      "steps": [
        "定位解封",
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
          "key": "AssetNo",
          "label": "资产编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Code",
          "label": "物料编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "MoldPartId",
          "label": "物料名称",
          "required": true,
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
          "key": "PartModel",
          "label": "物料型号",
          "required": false,
          "example": "物料型号测试值"
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
          "key": "BillNo",
          "label": "关联单据-项次",
          "required": false,
          "example": "关联单据-项次测试值"
        },
        {
          "key": "VendorCode",
          "label": "供应商编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "BatchNo",
          "label": "批次号",
          "required": true,
          "example": "批次号测试值"
        },
        {
          "key": "ProductId",
          "label": "厂商唯一码",
          "required": false,
          "example": "厂商唯一码测试值"
        },
        {
          "key": "AreaName",
          "label": "储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "MoldLocationId",
          "label": "储位编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "ProductDate",
          "label": "生产日期",
          "required": true,
          "example": "2026-08-01"
        },
        {
          "key": "expectedEndOfLifeDate",
          "label": "预计报废日期",
          "required": false,
          "example": "2026-08-01"
        },
        {
          "key": "TotalUsedCount",
          "label": "总使用次数",
          "required": false,
          "example": "总使用次数测试值"
        },
        {
          "key": "TotalKeepCount",
          "label": "总保养次数",
          "required": false,
          "example": "总保养次数测试值"
        },
        {
          "key": "TotalRepairCount",
          "label": "总维修次数",
          "required": false,
          "example": "总维修次数测试值"
        },
        {
          "key": "UsedCount",
          "label": "当前周期使用次数",
          "required": false,
          "example": "当前周期使用次数测试值"
        },
        {
          "key": "TotalRepairHour",
          "label": "总维修时长(H)",
          "required": false,
          "example": "总维修时长(H)测试值"
        },
        {
          "key": "Qty",
          "label": "当前周期产量",
          "required": true,
          "example": "当前周期产量测试值"
        },
        {
          "key": "TotalQty",
          "label": "总周期产量",
          "required": false,
          "example": "总周期产量测试值"
        },
        {
          "key": "Manager",
          "label": "负责人",
          "required": false,
          "example": "负责人测试值"
        },
        {
          "key": "EarlyWarningKeepCount",
          "label": "提前预警保养次数",
          "required": true,
          "example": "提前预警保养次数测试值"
        },
        {
          "key": "EarlyWarningLifeDay",
          "label": "提前预警寿命天数",
          "required": true,
          "example": "提前预警寿命天数测试值"
        },
        {
          "key": "EarlyWarningKeepQty",
          "label": "提前预警保养产量",
          "required": true,
          "example": "提前预警保养产量测试值"
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
          "key": "MoldCode",
          "label": "模具编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "Name",
          "label": "模具名称",
          "required": true,
          "example": "自动化样例001"
        },
        {
          "key": "WoNos",
          "label": "关联单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "ReceiveCode",
          "label": "任务单号",
          "required": false,
          "example": "AT-001"
        },
        {
          "key": "EquipCode",
          "label": "设备编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "EQUIP_NAME",
          "label": "设备名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "CATEGORY_NAME",
          "label": "设备分类",
          "required": false,
          "example": "设备分类测试值"
        },
        {
          "key": "STATUS",
          "label": "设备状态",
          "required": false,
          "example": "Y"
        },
        {
          "key": "STATION_NAME",
          "label": "存放地点",
          "required": false,
          "example": "存放地点测试值"
        },
        {
          "key": "STATION",
          "label": "机台序号",
          "required": false,
          "example": "1"
        },
        {
          "key": "UnloadType",
          "label": "退模类型",
          "required": false,
          "example": "退模类型测试值"
        },
        {
          "key": "MoldInsertCode",
          "label": "模具/镶件编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationAreaName",
          "label": "原储区名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "LocationCode",
          "label": "原储位编码",
          "required": true,
          "example": "AT-001"
        },
        {
          "key": "LocationName",
          "label": "原储位名称",
          "required": false,
          "example": "自动化样例001"
        },
        {
          "key": "ToLocationCode",
          "label": "目的储位编码",
          "required": true,
          "example": "AT-001"
        }
      ],
      "testData": {
        "AssetNo": "AT-001",
        "Code": "AT-001",
        "MoldPartId": "自动化样例001",
        "ClassType": "物料子类测试值",
        "PartSpecs": "物料规格测试值",
        "PartModel": "物料型号测试值",
        "Volume": "体积(cm³)测试值",
        "Weight": "重量(KG)测试值",
        "LifeTimeYear": "使用寿命(年)测试值",
        "LifeTimeCount": "参考寿命次数测试值",
        "CavityNum": "穴位测试值",
        "LowerUsedCavity": "最低使用穴数测试值",
        "CavityLocationIsSame": "穴位是否一致测试值",
        "BillNo": "关联单据-项次测试值",
        "VendorCode": "AT-001",
        "BatchNo": "批次号测试值",
        "ProductId": "厂商唯一码测试值",
        "AreaName": "自动化样例001",
        "MoldLocationId": "AT-001",
        "ProductDate": "2026-08-01",
        "expectedEndOfLifeDate": "2026-08-01",
        "TotalUsedCount": "总使用次数测试值",
        "TotalKeepCount": "总保养次数测试值",
        "TotalRepairCount": "总维修次数测试值",
        "UsedCount": "当前周期使用次数测试值",
        "TotalRepairHour": "总维修时长(H)测试值",
        "Qty": "当前周期产量测试值",
        "TotalQty": "总周期产量测试值",
        "Manager": "负责人测试值",
        "EarlyWarningKeepCount": "提前预警保养次数测试值",
        "EarlyWarningLifeDay": "提前预警寿命天数测试值",
        "EarlyWarningKeepQty": "提前预警保养产量测试值",
        "Enabled": "Y",
        "Remark": "自动化测试备注001",
        "MoldCode": "AT-001",
        "Name": "自动化样例001",
        "WoNos": "AT-001",
        "ReceiveCode": "AT-001",
        "EquipCode": "AT-001",
        "EQUIP_NAME": "自动化样例001",
        "CATEGORY_NAME": "设备分类测试值",
        "STATUS": "Y",
        "STATION_NAME": "存放地点测试值",
        "STATION": "1",
        "UnloadType": "退模类型测试值",
        "MoldInsertCode": "AT-001",
        "LocationAreaName": "自动化样例001",
        "LocationCode": "AT-001",
        "LocationName": "自动化样例001",
        "ToLocationCode": "AT-001"
      }
    }
  ]
});
