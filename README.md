# JMOM 自动化测试平台

这是面向测试人员的 JMOM B/S 自动化测试平台。平台把 Playwright 脚本包装成可管理的测试场景，测试人员通过网页选择场景、上传样本数据、执行回归并查看报告。

## 一期能力

- 场景库：内置登录验证、客户主数据、供应商主数据、物料主数据。
- 样本数据：每个场景可下载 CSV 模板，上传 CSV / Excel 数据集。
- 执行中心：集中 Runner 调用 Playwright，按上传样本数据执行。
- 报告中心：保存执行状态、通过/失败数量、HTML 报告入口。
- 权限：测试人员只能维护数据和执行；维护员/管理员可发布场景。

## 启动平台

```powershell
npm install
npm start
```

默认访问地址：

- `http://localhost:46090`

默认平台账号：

| 角色 | 账号 | 密码 |
|------|------|------|
| 测试人员 | tester | Tester123! |
| 场景维护员 | maintainer | Maintainer123! |
| 管理员 | admin | Admin123! |

## JMOM 测试环境

默认被测环境来自 `Agents.md`：

- `JMOM_BASE_URL=http://172.16.100.11:46069`
- `JMOM_USERNAME=byc`
- `JMOM_PASSWORD=Abcd1234`

如需覆盖：

```powershell
$env:JMOM_BASE_URL='http://172.16.100.11:46069'
$env:JMOM_USERNAME='byc'
$env:JMOM_PASSWORD='Abcd1234'
npm start
```

## 开发与验证

```powershell
npm test
npm run test:e2e
```

平台数据默认写入：

- `platform-data/platform.sqlite`
- `platform-data/uploads/`
- `platform-data/reports/`

Playwright 原始结果仍会写入：

- `test-results/runs/<运行时间>/`

## 样本数据说明

网页中进入场景详情后，点击“下载CSV模板”，填写后上传。平台会校验必填列，校验通过后才能创建执行任务。

支持格式：

- `.csv`
- `.xlsx`

## Runner 模式

平台默认使用真实 Playwright Runner。开发测试时可使用 mock 模式快速验证平台流程：

```powershell
$env:JMOM_RUN_MODE='mock'
npm start
```
