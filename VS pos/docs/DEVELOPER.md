# VS pos 开发者文档

## 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [核心概念](#核心概念)
- [数据管理](#数据管理)
- [函数参考](#函数参考)
- [扩展开发](#扩展开发)

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- VS Code (推荐)

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 代码检查
```bash
npm run lint
```

### 格式化代码
```bash
npm run format
```

---

## 项目结构

```
VS pos/
├── src/
│   ├── index.html          # 主程序文件 (HTML + CSS + JS)
│   ├── api-reference.js    # API 参考文档
│   └── types/
│       └── index.d.ts      # 类型定义
├── tests/                  # 测试文件
│   ├── core.test.js       # 核心功能测试
│   └── ui.test.js         # UI 组件测试
├── .vscode/               # VS Code 配置
├── docs/                  # 设计文档
└── package.json           # npm 配置
```

---

## 核心概念

### 数据存储
VS Pos 使用浏览器 `localStorage` 存储数据：

```javascript
// 保存数据
localStorage.setItem('vsevice_services', JSON.stringify(services));

// 加载数据
const data = JSON.parse(localStorage.getItem('vsevice_services'));
```

### 数据结构

#### 商品/服务
```javascript
{
  id: 'S001',
  sku: 'MAS-001',
  name: '泰式按摩',
  price: 298,
  category: 'massage',
  active: true
}
```

#### 会员
```javascript
{
  id: 'M001',
  cardNo: 'VIP001',
  name: '张三',
  level: 'gold',
  points: 5200,
  balance: 500
}
```

#### 员工
```javascript
{
  id: 'E001',
  empNo: 'EMP001',
  name: '张技师',
  role: 'technician',
  salary: 5000
}
```

---

## 数据管理

### 全局变量

| 变量 | 类型 | 说明 |
|------|------|------|
| `services` | Array | 商品/服务列表 |
| `orders` | Array | 订单列表 |
| `members` | Array | 会员列表 |
| `employees` | Array | 员工列表 |
| `invoices` | Array | 账单列表 |
| `commissions` | Array | 佣金列表 |
| `cart` | Array | 当前购物车 |
| `settings` | Object | 系统设置 |
| `features` | Object | 功能开关 |

### 保存数据

```javascript
function saveData(key, data) {
    localStorage.setItem(CONFIG.storage[key], JSON.stringify(data));
}

// 使用示例
saveData('services', services);
```

### 加载数据

```javascript
function loadData() {
    services = JSON.parse(localStorage.getItem(CONFIG.storage.services) || '[]');
    orders = JSON.parse(localStorage.getItem(CONFIG.storage.orders) || '[]');
    // ...
}
```

---

## 函数参考

### 初始化

```javascript
// 初始化应用
init();

// 加载所有数据
loadData();

// 初始化示例数据
initSampleData();
```

### 收银台

```javascript
// 添加商品到购物车
addToCart(service);

// 清空购物车
clearCart();

// 更新购物车显示
updateCart();

// 处理结账
processCheckout();

// 挂起订单
suspendOrder();

// 选择支付方式
selectPayment(el, method);

// 设置小费
setTip(btnNum);
```

### 商品管理

```javascript
// 渲染商品网格
renderItemsGrid();

// 渲染商品表格
renderItemsTable();

// 添加商品
addNewItem();

// 编辑商品
showEditItemModal(id);
updateItem(id);

// 删除商品
deleteItem(id);
```

### 会员管理

```javascript
// 搜索会员
searchMember();

// 渲染会员表格
renderMembersTable();

// 添加会员
addNewMember();

// 查看详情
showMemberDetail(id);

// 充值
showRechargeModal(id);
processRecharge(id);

// 积分调整
showPointsAdjust(id);
processPointsAdjust(id);
```

### 员工管理

```javascript
// 渲染员工表格
renderEmployeesTable();

// 添加员工
addNewEmployee();

// 编辑员工
showEditEmployeeModal(id);
updateEmployee(id);

// 考勤打卡
showTimeClock();
clockIn();
clockOut();
```

### 账单管理

```javascript
// 渲染账单
renderInvoices();

// 查看账单
viewInvoice(invoiceNo);

// 标记已付款
markInvoicePaid(invoiceNo);

// 退款
showRefundModal();
processRefund();
```

### 设置

```javascript
// 切换设置标签
switchSettingsTab(tab, el);

// 加载设置值
loadSettingsValues();

// 保存设置
saveSettings();
saveAllSettings();

// 导出所有数据
exportAllData();

// 清空所有数据
clearAllData();
```

### 工具函数

```javascript
// 显示模态框
showModal(title, content);

// 关闭模态框
closeModal();

// 计算税费
calculateTax(subtotal);

// 金额舍入
roundAmount(amount);

// 刷新面板
refreshPanel(panel);
```

---

## 扩展开发

### 添加新模块

1. 在 HTML 中添加面板：
```html
<div id="newmodule-panel" class="panel">
    <div class="page-header">
        <h2 class="page-title">新模块</h2>
    </div>
    <div id="newmoduleTable"></div>
</div>
```

2. 在导航中添加链接：
```html
<div class="nav-item" data-panel="newmodule" onclick="navigateTo('newmodule')">
    <span class="icon">📋</span>
    <span>新模块</span>
</div>
```

3. 添加渲染函数：
```javascript
function renderNewmoduleTable() {
    const table = document.getElementById('newmoduleTable');
    table.innerHTML = newmodule.map(item => `
        <div class="table-row">
            <span>${item.name}</span>
        </div>
    `).join('');
}
```

4. 在 refreshPanel 中添加：
```javascript
function refreshPanel(panel) {
    switch(panel) {
        // ...
        case 'newmodule': renderNewmoduleTable(); break;
    }
}
```

### 添加新设置页面

1. 添加标签按钮：
```html
<div class="settings-tab" onclick="switchSettingsTab('newsetting', this)">
    🆕 新设置
</div>
```

2. 添加内容区域：
```html
<div id="settings-newsetting" class="settings-content" style="display:none;">
    <div class="settings-section">
        <!-- 设置内容 -->
    </div>
</div>
```

3. 添加保存逻辑：
```javascript
// 在 saveAllSettings() 中添加
settings.newSetting = document.getElementById('newSettingInput').value;
```

---

## 最佳实践

### 代码规范
- 使用 4 空格缩进
- 变量命名使用 camelCase
- 函数命名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 使用单引号字符串

### 性能优化
- 使用 `document.getElementById()` 代替 `querySelector()`
- 缓存 DOM 引用
- 避免频繁重排重绘
- 使用事件委托

### 安全注意
- 不在 localStorage 中存储敏感信息
- 使用 `textContent` 代替 `innerHTML` 防止 XSS
- 验证用户输入

### 调试技巧
```javascript
// 使用 console.log 调试
console.log('Debug info:', data);

// 使用断点调试
debugger;

// 检查 localStorage
console.log(localStorage);
```

---

## 常见问题

### Q: 数据丢失怎么办？
A: 定期使用"系统设置 > 导出所有数据"备份数据。

### Q: 如何恢复数据？
A: 使用之前导出的 JSON 文件，通过代码导入恢复。

### Q: 如何重置系统？
A: 点击"系统设置 > 清空所有数据"，然后刷新页面。

### Q: 如何添加自定义分类？
A: 修改 `CONFIG.categoryNames` 和相关表单选项。

---

## 更新日志

### v1.0.0
- 初始版本发布
- 11个核心模块
- 10个设置页面
- localStorage 数据持久化
