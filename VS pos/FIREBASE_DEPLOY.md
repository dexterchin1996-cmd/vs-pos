# VS Cloud POS - Firebase 部署指南

## 🚀 一键部署到 Firebase (web.app)

### 第 1 步：登录 Firebase
```bash
firebase login
```
浏览器会打开，用你的 **Google 账号** 登录。

### 第 2 步：初始化项目
```bash
firebase init hosting
```
选择：
- **Use an existing project** 或 **Create a new project**
- 项目名：`vs-pos-cloud`（或你喜欢的名字）
- Public directory: `src`
- Single-page app: **No**
- GitHub: **No**

### 第 3 步：部署
```bash
firebase deploy --only hosting
```

部署完成后，你会得到：
```
https://vs-pos-cloud.web.app
```

---

## 📋 完整功能列表（同 Loyverse POS）

### VS Terminal (收银台)
- ✅ 销售点单（网格/列表视图）
- ✅ 挂单管理（保存/取单/合并）
- ✅ 条码扫描
- ✅ 会员识别（手机搜索）
- ✅ 折扣和修饰符
- ✅ 税费计算（含税/不含税）
- ✅ 多种支付方式（现金/卡/微信/支付宝）
- ✅ 拆分支付
- ✅ 退款/退货处理
- ✅ 收据打印（热敏打印机）
- ✅ 小费管理
- ✅ 班次开/关

### VS Manager (商家后台)
- ✅ 实时仪表盘
- ✅ 员工管理（添加/编辑/删除/权限）
- ✅ 商品管理（分类/变体/条码）
- ✅ 高级库存（盘点/调拨/采购订单/调整）
- ✅ 客户管理（分组/历史/积分/信用）
- ✅ 套餐订阅（免费/Pro/企业版）
- ✅ 财务报告（营收/利润/税务）
- ✅ 数据导出（CSV/Excel/PDF）
- ✅ 系统设置（店铺/税/折扣/修饰符/收据模板）
- ✅ 硬件设置（打印机/钱箱/客户显示器）

### VS Staff (员工端)
- ✅ 工单接收和完成
- ✅ 忙闲状态切换
- ✅ 个人佣金查看
- ✅ 班次打卡
- ✅ 业绩报告

### VS Finance (财务报表)
- ✅ 营收统计（日/周/月/年）
- ✅ 利润核算
- ✅ 税务报告
- ✅ 支付分布
- ✅ 数据导出

---

## 🔑 默认登录

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | admin | admin123 |

---

## 🌐 访问地址

部署后访问：`https://你的项目名.web.app`
