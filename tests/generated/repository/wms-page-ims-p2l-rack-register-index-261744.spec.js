// 本文件由 scripts/generate-repository-scenarios.mjs 根据真实菜单和页面源码生成。
// workflows 中的步骤、测试数据、断言和数据安全策略由共享 Playwright 执行器逐条执行。
const { defineRepositoryScenario } = require('../../support/repository-scenario');

defineRepositoryScenario({
  "key": "wms-page-ims-p2l-rack-register-index-261744",
  "name": "仓储管理 - 电子货架注册功能校验",
  "displayName": "电子货架注册",
  "route": "/ImsP2lRackRegister/Index",
  "sourceRoute": "/ImsP2lRackRegister/Index",
  "menuCode": "ImsP2lRackRegister",
  "breadcrumb": "基础设定 / 仓库建模 / 电子货架注册",
  "sourceFile": "src/views/ImsP2lRackRegister/Index.vue",
  "dataSchema": {
    "columns": [
      "Name",
      "Region",
      "Comp",
      "Wh",
      "Pa",
      "Sa",
      "Floor",
      "Dpt",
      "Capacity",
      "Lvl",
      "Locked",
      "Len",
      "Width",
      "Height",
      "ServerIp",
      "Port",
      "RackAddress",
      "RackCode",
      "Location",
      "Brand",
      "ShelfType",
      "CodePrefix",
      "RackNo",
      "FrontSide",
      "BackSide",
      "LevelStart",
      "LevelEnd",
      "ColStart",
      "ColEnd"
    ],
    "required": [
      "Name",
      "Region",
      "Comp",
      "Wh",
      "Pa",
      "Sa",
      "Floor",
      "ServerIp",
      "Port",
      "RackAddress",
      "RackCode",
      "Location",
      "Brand",
      "ShelfType"
    ],
    "fields": [
      {
        "key": "Name",
        "label": "储位名称",
        "required": true
      },
      {
        "key": "Region",
        "label": "区域",
        "required": true
      },
      {
        "key": "Comp",
        "label": "公司",
        "required": true
      },
      {
        "key": "Wh",
        "label": "仓库",
        "required": true
      },
      {
        "key": "Pa",
        "label": "捡料区",
        "required": true
      },
      {
        "key": "Sa",
        "label": "储存区",
        "required": true
      },
      {
        "key": "Floor",
        "label": "楼层",
        "required": true
      },
      {
        "key": "Dpt",
        "label": "部门",
        "required": false
      },
      {
        "key": "Capacity",
        "label": "容量",
        "required": false
      },
      {
        "key": "Lvl",
        "label": "层",
        "required": false
      },
      {
        "key": "Locked",
        "label": "锁定",
        "required": false
      },
      {
        "key": "Len",
        "label": "长",
        "required": false
      },
      {
        "key": "Width",
        "label": "宽",
        "required": false
      },
      {
        "key": "Height",
        "label": "高",
        "required": false
      },
      {
        "key": "ServerIp",
        "label": "货架服务器地址",
        "required": true
      },
      {
        "key": "Port",
        "label": "货架服务器端口",
        "required": true
      },
      {
        "key": "RackAddress",
        "label": "货架硬件地址",
        "required": true
      },
      {
        "key": "RackCode",
        "label": "货架号",
        "required": true
      },
      {
        "key": "Location",
        "label": "货架位置",
        "required": true
      },
      {
        "key": "Brand",
        "label": "货架品牌",
        "required": true
      },
      {
        "key": "ShelfType",
        "label": "货架类型",
        "required": true
      },
      {
        "key": "CodePrefix",
        "label": "货位编码前缀",
        "required": false
      },
      {
        "key": "RackNo",
        "label": "货架编号",
        "required": false
      },
      {
        "key": "FrontSide",
        "label": "正面",
        "required": false
      },
      {
        "key": "BackSide",
        "label": "背面",
        "required": false
      },
      {
        "key": "LevelStart",
        "label": "起始层",
        "required": false
      },
      {
        "key": "LevelEnd",
        "label": "终止层",
        "required": false
      },
      {
        "key": "ColStart",
        "label": "起始列",
        "required": false
      },
      {
        "key": "ColEnd",
        "label": "终止列",
        "required": false
      }
    ],
    "example": {
      "Name": "自动化样例001",
      "Region": "区域测试值",
      "Comp": "公司测试值",
      "Wh": "仓库测试值",
      "Pa": "捡料区测试值",
      "Sa": "储存区测试值",
      "Floor": "楼层测试值",
      "Dpt": "部门测试值",
      "Capacity": "1",
      "Lvl": "层测试值",
      "Locked": "锁定测试值",
      "Len": "长测试值",
      "Width": "宽测试值",
      "Height": "高测试值",
      "ServerIp": "货架服务器地址测试值",
      "Port": "货架服务器端口测试值",
      "RackAddress": "货架硬件地址测试值",
      "RackCode": "货架号测试值",
      "Location": "货架位置测试值",
      "Brand": "货架品牌测试值",
      "ShelfType": "货架类型测试值",
      "CodePrefix": "货位编码前缀测试值",
      "RackNo": "AT-001",
      "FrontSide": "正面测试值",
      "BackSide": "背面测试值",
      "LevelStart": "起始层测试值",
      "LevelEnd": "终止层测试值",
      "ColStart": "起始列测试值",
      "ColEnd": "终止列测试值"
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
      "key": "5f1787916c-60e2bcad85-60e2b",
      "type": "导入入口",
      "name": "导入业务入口校验",
      "label": "导入",
      "handler": "",
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
      "key": "ef879b4ced-995e04b44c-83a8a",
      "type": "导出入口",
      "name": "模板下载业务入口校验",
      "label": "模板下载",
      "handler": "downExcelTpl",
      "permission": "",
      "menuTriggerLabel": "",
      "rowAction": false,
      "sourceMutatesData": false,
      "executionPolicy": "执行导出并校验下载或反馈",
      "steps": [
        "展开导入/导出菜单",
        "点击模板下载",
        "校验下载、弹窗或操作反馈"
      ],
      "assertions": [
        "产生下载、弹窗或明确操作反馈"
      ],
      "mutatesData": false
    }
  ]
});
