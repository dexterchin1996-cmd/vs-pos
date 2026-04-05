const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'vs-pos-secret-key-2024';
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'vspos.json');
const SRC_DIR = path.join(__dirname, '..', 'src');

app.use(cors());
app.use(express.json());

// JSON database
function loadDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
      saveDB({ users: [], products: [], categories: [], members: [], orders: [], employees: [], tickets: [], commissions: [], shifts: [], settings: {}, technicians: [], services: [], subscriptions: [], tasks: [], permissions: [], finance_reports: [], inventory_counts: [], inventory_transfers: [], purchase_orders: [], stock_adjustments: [], customer_groups: [], customer_history: [], loyalty_transactions: [], tax_rates: [], modifier_groups: [], modifier_options: [], receipt_templates: [], printer_settings: [], barcodes: [], item_variants: [], shift_details: [], shift_cash_transactions: [], refunds: [], returns: [], suppliers: [], dining_options: [], kitchen_printers: [], customer_displays: [], payment_types: [], api_tokens: [], webhooks: [], import_jobs: [], low_stock_alerts: [] });
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { users: [], products: [], categories: [], members: [], orders: [], employees: [], tickets: [], commissions: [], shifts: [], settings: {}, technicians: [], services: [], subscriptions: [], tasks: [], permissions: [], finance_reports: [], inventory_counts: [], inventory_transfers: [], purchase_orders: [], stock_adjustments: [], customer_groups: [], customer_history: [], loyalty_transactions: [], tax_rates: [], modifier_groups: [], modifier_options: [], receipt_templates: [], printer_settings: [], barcodes: [], item_variants: [], shift_details: [], shift_cash_transactions: [], refunds: [], returns: [], suppliers: [], dining_options: [], kitchen_printers: [], customer_displays: [], payment_types: [], api_tokens: [], webhooks: [], import_jobs: [], low_stock_alerts: [] };
  }
}
function saveDB(d) { try { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); fs.writeFileSync(DB_FILE, JSON.stringify(d, null, 2)); } catch (e) {} }
let db = loadDB();

// Init defaults
if (db.products.length === 0) {
  db.products = [
    { id: 'P001', name: '中式按摩', category: '按摩服务', price: 168, stock: 999, unit: '次', status: 'active' },
    { id: 'P002', name: '泰式按摩', category: '按摩服务', price: 198, stock: 999, unit: '次', status: 'active' },
    { id: 'P003', name: '精油SPA', category: 'SPA服务', price: 268, stock: 999, unit: '次', status: 'active' },
    { id: 'P004', name: '面部护理', category: '美容服务', price: 188, stock: 999, unit: '次', status: 'active' },
    { id: 'P005', name: '足部按摩', category: '按摩服务', price: 128, stock: 999, unit: '次', status: 'active' },
    { id: 'P006', name: '全身推拿', category: '按摩服务', price: 298, stock: 999, unit: '次', status: 'active' },
    { id: 'P007', name: '艾灸理疗', category: '理疗服务', price: 158, stock: 999, unit: '次', status: 'active' },
    { id: 'P008', name: '拔罐刮痧', category: '理疗服务', price: 98, stock: 999, unit: '次', status: 'active' }
  ];
  db.categories = [
    { id: 'C001', name: '按摩服务', icon: 'massage', sort: 1 },
    { id: 'C002', name: 'SPA服务', icon: 'spa', sort: 2 },
    { id: 'C003', name: '美容服务', icon: 'beauty', sort: 3 },
    { id: 'C004', name: '理疗服务', icon: 'therapy', sort: 4 }
  ];
  db.members = [
    { id: 'M001', name: '张三', phone: '13800138001', balance: 1688, points: 1688, level: 'gold', join_date: '2024-01-15' },
    { id: 'M002', name: '李四', phone: '13800138002', balance: 888, points: 888, level: 'silver', join_date: '2024-02-20' },
    { id: 'M003', name: '王五', phone: '13800138003', balance: 0, points: 200, level: 'bronze', join_date: '2024-03-10' }
  ];
  db.employees = [
    { id: 'E001', emp_no: 'EMP001', name: '张技师', phone: '13800001111', role: 'technician', skills: '["按摩","SPA"]', hire_date: '2023-01-15', salary: 5000, status: 'available' },
    { id: 'E002', emp_no: 'EMP002', name: '李技师', phone: '13800002222', role: 'technician', skills: '["足疗","按摩"]', hire_date: '2023-03-20', salary: 4500, status: 'available' },
    { id: 'E003', emp_no: 'EMP003', name: '王美容师', phone: '13800003333', role: 'beautician', skills: '["美容","面部"]', hire_date: '2022-11-01', salary: 5500, status: 'busy' },
    { id: 'E004', emp_no: 'EMP004', name: '刘经理', phone: '13800004444', role: 'manager', skills: '["管理"]', hire_date: '2022-01-01', salary: 8000, status: 'available' }
  ];
  db.technicians = [
    { id: 'T001', name: '技师A', skills: '["中式按摩","泰式按摩"]', status: 'available', phone: '13900139001' },
    { id: 'T002', name: '技师B', skills: '["精油SPA","面部护理"]', status: 'available', phone: '13900139002' },
    { id: 'T003', name: '技师C', skills: '["足部按摩","全身推拿"]', status: 'busy', phone: '13900139003' }
  ];
  db.services = [
    { id: 'S001', name: '中式按摩', duration: 60, price: 168, description: '传统中式按摩手法' },
    { id: 'S002', name: '泰式按摩', duration: 60, price: 198, description: '泰式传统按摩' },
    { id: 'S003', name: '精油SPA', duration: 90, price: 268, description: '精油+按摩组合' },
    { id: 'S004', name: '面部护理', duration: 45, price: 188, description: '专业面部护理' }
  ];
  db.users.push({ id: 'U001', username: 'admin', password: bcrypt.hashSync('admin123', 10), name: '系统管理员', role: 'admin', status: 'active' });
  db.subscriptions = [
    { id: 'SUB001', plan: 'free', status: 'active', startDate: new Date().toISOString(), endDate: null, features: ['basic_pos', 'members', 'reports_basic'] },
    { id: 'SUB002', plan: 'pro', price: 99, billing: 'monthly', status: 'available', features: ['all_pos', 'advanced_reports', 'multi_store', 'api_access'] },
    { id: 'SUB003', plan: 'pro', price: 999, billing: 'yearly', status: 'available', features: ['all_pos', 'advanced_reports', 'multi_store', 'api_access', 'priority_support'] },
    { id: 'SUB004', plan: 'enterprise', price: 299, billing: 'monthly', status: 'available', features: ['all_pos', 'advanced_reports', 'multi_store', 'api_access', 'white_label', 'dedicated_support'] },
    { id: 'SUB005', plan: 'enterprise', price: 2999, billing: 'yearly', status: 'available', features: ['all_pos', 'advanced_reports', 'multi_store', 'api_access', 'white_label', 'dedicated_support', 'custom_integration'] }
  ];
  db.permissions = [
    { id: 'PERM001', role: 'admin', name: '管理员', permissions: ['all'] },
    { id: 'PERM002', role: 'manager', name: '店长', permissions: ['pos', 'members', 'reports', 'employees', 'settings_basic'] },
    { id: 'PERM003', role: 'cashier', name: '收银员', permissions: ['pos', 'members_view', 'reports_basic'] },
    { id: 'PERM004', role: 'technician', name: '技师', permissions: ['pos_basic', 'own_reports'] }
  ];
  db.tasks = [
    { id: 'TASK001', employeeId: 'E001', type: 'service', serviceName: '中式按摩', status: 'pending', assignedAt: new Date().toISOString(), completedAt: null, commission: 50 },
    { id: 'TASK002', employeeId: 'E002', type: 'service', serviceName: '精油SPA', status: 'in_progress', assignedAt: new Date().toISOString(), completedAt: null, commission: 80 }
  ];
  db.finance_reports = [];
  saveDB(db);
  console.log('Database initialized with sample data');
}

// Auth
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: '未登录' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); } catch (e) { res.status(401).json({ error: '令牌无效' }); }
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: '用户名或密码错误' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, username: user.username, name: user.name, role: user.role } });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json({ id: user.id, username: user.username, name: user.name, role: user.role });
});

// CRUD
['products','categories','members','orders','employees','tickets','commissions','shifts','technicians','services','subscriptions','tasks','permissions','finance_reports','inventory_counts','inventory_transfers','purchase_orders','stock_adjustments','customer_groups','customer_history','loyalty_transactions','tax_rates','modifier_groups','modifier_options','receipt_templates','printer_settings','barcodes','item_variants','shift_details','shift_cash_transactions','refunds','returns','suppliers','payment_types','api_tokens','webhooks','import_jobs','low_stock_alerts'].forEach(col => {
  app.get(`/api/${col}`, (req, res) => res.json(db[col] || []));
  app.get(`/api/${col}/:id`, (req, res) => { const i = db[col].find(x => x.id === req.params.id); if (!i) return res.status(404).json({ error: '不存在' }); res.json(i); });
  app.post(`/api/${col}`, (req, res) => { const n = { id: req.body.id || (col[0].toUpperCase() + Date.now()), ...req.body }; db[col].push(n); saveDB(db); res.status(201).json(n); });
  app.put(`/api/${col}/:id`, (req, res) => { const i = db[col].findIndex(x => x.id === req.params.id); if (i < 0) return res.status(404).json({ error: '不存在' }); db[col][i] = { ...db[col][i], ...req.body }; saveDB(db); res.json(db[col][i]); });
  app.delete(`/api/${col}/:id`, (req, res) => { const i = db[col].findIndex(x => x.id === req.params.id); if (i < 0) return res.status(404).json({ error: '不存在' }); db[col].splice(i, 1); saveDB(db); res.status(204).send(); });
});

app.get('/api/settings', (req, res) => res.json(db.settings || {}));
app.put('/api/settings', (req, res) => { db.settings = { ...db.settings, ...req.body }; saveDB(db); res.json(db.settings); });
app.post('/api/members/:id/recharge', (req, res) => { const m = db.members.find(x => x.id === req.params.id); if (!m) return res.status(404).json({ error: '不存在' }); m.balance += req.body.amount || 0; m.points += Math.floor(req.body.amount || 0); saveDB(db); res.json(m); });
app.get('/api/backup', (req, res) => res.json({ ...db, _backupDate: new Date().toISOString() }));
app.post('/api/restore', (req, res) => { ['products','categories','members','orders','employees','tickets','commissions','shifts','technicians','services','inventory_counts','inventory_transfers','purchase_orders','stock_adjustments','customer_groups','tax_rates','modifier_groups','modifier_options','receipt_templates','printer_settings','barcodes','item_variants','refunds','returns','suppliers','payment_types'].forEach(t => { if (req.body[t]) db[t] = req.body[t]; }); saveDB(db); res.json({ status: 'ok' }); });
app.get('/api/stats', (req, res) => { const today = new Date().toISOString().split('T')[0]; const to = db.orders.filter(o => o.created_at && o.created_at.startsWith(today)); const monthStart = new Date(); monthStart.setMonth(monthStart.getMonth() - 1); const mo = db.orders.filter(o => o.created_at && new Date(o.created_at) >= monthStart); const lowStock = db.products.filter(p => (p.stock || 0) <= (p.lowStockAlert || 10)).length; res.json({ today: { count: to.length, total: to.reduce((s, o) => s + (o.total || 0), 0) }, month: { count: mo.length, total: mo.reduce((s, o) => s + (o.total || 0), 0) }, members: { count: db.members.length }, products: { count: db.products.length, lowStock }, employees: { count: db.employees.length }, openTickets: db.tickets.filter(t => t.status === 'open').length }); });
app.get('/api/health', (req, res) => res.json({ status: 'ok', version: '2.0.0', timestamp: new Date().toISOString() }));

// Subscription management
app.post('/api/subscribe', (req, res) => {
  const { plan, billing, paymentMethod } = req.body;
  const sub = db.subscriptions.find(s => s.plan === plan && s.billing === billing);
  if (!sub) return res.status(404).json({ error: '套餐不存在' });
  const activeSub = db.subscriptions.find(s => s.status === 'active');
  if (activeSub) {
    activeSub.plan = plan;
    activeSub.billing = billing;
    activeSub.startDate = new Date().toISOString();
    activeSub.features = sub.features;
    activeSub.paymentMethod = paymentMethod || 'default';
    saveDB(db);
    res.json({ status: 'ok', subscription: activeSub, message: '套餐升级成功' });
  } else {
    const newSub = { id: 'SUB' + Date.now(), plan, billing, status: 'active', startDate: new Date().toISOString(), features: sub.features, paymentMethod: paymentMethod || 'default' };
    db.subscriptions.push(newSub);
    saveDB(db);
    res.status(201).json({ status: 'ok', subscription: newSub, message: '订阅成功' });
  }
});

// Staff task management
app.post('/api/tasks/:id/complete', (req, res) => {
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: '任务不存在' });
  task.status = 'completed';
  task.completedAt = new Date().toISOString();
  saveDB(db);
  res.json(task);
});

app.post('/api/tasks/assign', (req, res) => {
  const { employeeId, type, serviceName, commission } = req.body;
  const task = { id: 'TASK' + Date.now(), employeeId, type, serviceName, status: 'pending', assignedAt: new Date().toISOString(), completedAt: null, commission: commission || 0 };
  db.tasks.push(task);
  saveDB(db);
  res.status(201).json(task);
});

// Finance report generation
app.post('/api/finance/generate', (req, res) => {
  const { period, startDate, endDate } = req.body;
  const orders = db.orders.filter(o => {
    if (!o.created_at) return false;
    const d = o.created_at.split('T')[0];
    return d >= startDate && d <= endDate;
  });
  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const totalCommission = db.commissions.filter(c => c.created_at >= startDate && c.created_at <= endDate).reduce((s, c) => s + (c.amount || 0), 0);
  const report = {
    id: 'RPT' + Date.now(),
    period,
    startDate,
    endDate,
    totalOrders: orders.length,
    totalRevenue,
    totalCommission,
    netProfit: totalRevenue - totalCommission,
    paymentBreakdown: {},
    generatedAt: new Date().toISOString()
  };
  orders.forEach(o => {
    const method = o.paymentMethod || 'cash';
    report.paymentBreakdown[method] = (report.paymentBreakdown[method] || 0) + (o.total || 0);
  });
  db.finance_reports.push(report);
  saveDB(db);
  res.status(201).json(report);
});

// Loyverse Advanced Features API Endpoints

// Inventory Count / Stocktaking
app.post('/api/inventory_counts/:id/start', (req, res) => {
  const ic = db.inventory_counts.find(x => x.id === req.params.id);
  if (!ic) return res.status(404).json({ error: '不存在' });
  ic.status = 'in_progress'; ic.startedAt = new Date().toISOString();
  saveDB(db); res.json(ic);
});
app.post('/api/inventory_counts/:id/complete', (req, res) => {
  const ic = db.inventory_counts.find(x => x.id === req.params.id);
  if (!ic) return res.status(404).json({ error: '不存在' });
  ic.status = 'completed'; ic.completedAt = new Date().toISOString();
  ic.items.forEach(item => {
    const prod = db.products.find(p => p.id === item.productId);
    if (prod) { prod.stock = item.countedQty; prod.lastStockUpdate = new Date().toISOString(); }
  });
  saveDB(db); res.json(ic);
});

// Inventory Transfer
app.post('/api/inventory_transfers/:id/confirm', (req, res) => {
  const t = db.inventory_transfers.find(x => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: '不存在' });
  t.status = 'completed'; t.completedAt = new Date().toISOString();
  t.items.forEach(item => {
    const prod = db.products.find(p => p.id === item.productId);
    if (prod) { prod.stock = (prod.stock || 0) - item.qty; }
  });
  saveDB(db); res.json(t);
});

// Purchase Order
app.post('/api/purchase_orders/:id/receive', (req, res) => {
  const po = db.purchase_orders.find(x => x.id === req.params.id);
  if (!po) return res.status(404).json({ error: '不存在' });
  po.status = 'received'; po.receivedAt = new Date().toISOString();
  po.items.forEach(item => {
    const prod = db.products.find(p => p.id === item.productId);
    if (prod) { prod.stock = (prod.stock || 0) + item.qty; }
  });
  saveDB(db); res.json(po);
});

// Refund Processing
app.post('/api/refunds', (req, res) => {
  const refund = { id: 'REF' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  db.refunds.push(refund);
  const order = db.orders.find(o => o.id === refund.orderId || o.orderNo === refund.orderNo);
  if (order) { order.refundStatus = refund.status || 'refunded'; order.refundAmount = (order.refundAmount || 0) + refund.amount; }
  saveDB(db); res.status(201).json(refund);
});

// Returns
app.post('/api/returns', (req, res) => {
  const ret = { id: 'RET' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  db.returns.push(ret);
  const prod = db.products.find(p => p.id === ret.productId);
  if (prod && ret.returnToStock) { prod.stock = (prod.stock || 0) + ret.qty; }
  saveDB(db); res.status(201).json(ret);
});

// Customer Groups
app.post('/api/customer_groups/:id/assign', (req, res) => {
  const group = db.customer_groups.find(x => x.id === req.params.id);
  if (!group) return res.status(404).json({ error: '不存在' });
  (req.body.memberIds || []).forEach(mid => {
    const member = db.members.find(m => m.id === mid);
    if (member) { member.groupId = group.id; member.groupName = group.name; member.discount = group.discount || member.discount; }
  });
  saveDB(db); res.json(group);
});

// Customer History
app.get('/api/customer_history/:memberId', (req, res) => {
  const memberId = req.params.memberId;
  const purchases = db.orders.filter(o => o.memberId === memberId);
  const returns = db.returns.filter(r => r.memberId === memberId);
  const refunds = db.refunds.filter(r => r.memberId === memberId);
  const loyalty = db.loyalty_transactions.filter(l => l.memberId === memberId);
  res.json({ purchases, returns, refunds, loyalty, summary: { totalPurchases: purchases.length, totalReturns: returns.length, totalRefunds: refunds.length, totalSpent: purchases.reduce((s, o) => s + (o.total || 0), 0) } });
});

// Loyalty Points
app.post('/api/loyalty/earn', (req, res) => {
  const { memberId, points, reason, orderId } = req.body;
  const member = db.members.find(m => m.id === memberId);
  if (!member) return res.status(404).json({ error: '会员不存在' });
  member.points = (member.points || 0) + points;
  db.loyalty_transactions.push({ id: 'LY' + Date.now(), memberId, type: 'earn', points, reason, orderId, createdAt: new Date().toISOString() });
  saveDB(db); res.json(member);
});
app.post('/api/loyalty/redeem', (req, res) => {
  const { memberId, points, discountAmount } = req.body;
  const member = db.members.find(m => m.id === memberId);
  if (!member) return res.status(404).json({ error: '会员不存在' });
  if (member.points < points) return res.status(400).json({ error: '积分不足' });
  member.points -= points;
  db.loyalty_transactions.push({ id: 'LY' + Date.now(), memberId, type: 'redeem', points: -points, discountAmount, createdAt: new Date().toISOString() });
  saveDB(db); res.json(member);
});

// Tax Rates
app.post('/api/tax_rates', (req, res) => {
  const tax = { id: 'TAX' + Date.now(), ...req.body };
  db.tax_rates.push(tax); saveDB(db); res.status(201).json(tax);
});

// Modifier Groups
app.post('/api/modifier_groups', (req, res) => {
  const mg = { id: 'MG' + Date.now(), ...req.body };
  db.modifier_groups.push(mg); saveDB(db); res.status(201).json(mg);
});
app.post('/api/modifier_options', (req, res) => {
  const mo = { id: 'MO' + Date.now(), ...req.body };
  db.modifier_options.push(mo); saveDB(db); res.status(201).json(mo);
});

// Receipt Templates
app.post('/api/receipt_templates', (req, res) => {
  const rt = { id: 'RT' + Date.now(), ...req.body };
  db.receipt_templates.push(rt); saveDB(db); res.status(201).json(rt);
});

// Printer Settings
app.get('/api/printer_settings', (req, res) => res.json(db.printer_settings || []));
app.post('/api/printer_settings', (req, res) => {
  const ps = { id: 'PS' + Date.now(), ...req.body };
  db.printer_settings.push(ps); saveDB(db); res.status(201).json(ps);
});
app.put('/api/printer_settings/:id', (req, res) => {
  const i = db.printer_settings.findIndex(x => x.id === req.params.id);
  if (i < 0) return res.status(404).json({ error: '不存在' });
  db.printer_settings[i] = { ...db.printer_settings[i], ...req.body }; saveDB(db); res.json(db.printer_settings[i]);
});

// Barcodes
app.post('/api/barcodes', (req, res) => {
  const bc = { id: 'BC' + Date.now(), ...req.body };
  db.barcodes.push(bc); saveDB(db); res.status(201).json(bc);
});
app.get('/api/barcodes/lookup/:code', (req, res) => {
  const bc = db.barcodes.find(x => x.code === req.params.code);
  if (!bc) return res.status(404).json({ error: '条码不存在' });
  const prod = db.products.find(p => p.id === bc.productId);
  res.json({ barcode: bc, product: prod });
});

// Item Variants
app.post('/api/item_variants', (req, res) => {
  const v = { id: 'VAR' + Date.now(), ...req.body };
  db.item_variants.push(v); saveDB(db); res.status(201).json(v);
});
app.get('/api/item_variants/product/:productId', (req, res) => {
  res.json(db.item_variants.filter(v => v.productId === req.params.productId));
});

// Shift Details
app.post('/api/shift_details', (req, res) => {
  const sd = { id: 'SD' + Date.now(), ...req.body };
  db.shift_details.push(sd); saveDB(db); res.status(201).json(sd);
});

// Shift Cash Transactions
app.post('/api/shift_cash_transactions', (req, res) => {
  const sct = { id: 'SCT' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  db.shift_cash_transactions.push(sct); saveDB(db); res.status(201).json(sct);
});

// Advanced Reports
app.get('/api/reports/sales', (req, res) => {
  const { start, end, groupBy } = req.query;
  let orders = db.orders;
  if (start) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] >= start);
  if (end) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] <= end);
  const result = {};
  orders.forEach(o => {
    let key;
    switch (groupBy) {
      case 'item': key = (o.items || []).map(i => i.name).join(', '); break;
      case 'category': key = o.category || '未分类'; break;
      case 'employee': key = o.employeeName || '未分配'; break;
      case 'payment': key = o.paymentMethod || o.payment || 'cash'; break;
      case 'date': key = o.created_at ? o.created_at.split('T')[0] : 'unknown'; break;
      default: key = 'total';
    }
    if (!result[key]) result[key] = { count: 0, total: 0, tax: 0, discount: 0 };
    result[key].count++; result[key].total += o.total || 0;
    result[key].tax += o.tax || 0; result[key].discount += o.discount || 0;
  });
  res.json(result);
});

app.get('/api/reports/inventory', (req, res) => {
  const products = db.products.map(p => ({
    id: p.id, name: p.name, category: p.category, stock: p.stock || 0,
    lowStockAlert: p.lowStockAlert || 10, isLowStock: (p.stock || 0) <= (p.lowStockAlert || 10),
    stockValue: (p.stock || 0) * (p.cost || p.price || 0),
    supplier: p.supplier || '-', lastStockUpdate: p.lastStockUpdate || '-'
  }));
  const adjustments = db.stock_adjustments || [];
  const transfers = db.inventory_transfers || [];
  res.json({ products, adjustments: adjustments.length, transfers: transfers.length, lowStockCount: products.filter(p => p.isLowStock).length });
});

app.get('/api/reports/tax', (req, res) => {
  const { start, end } = req.query;
  let orders = db.orders;
  if (start) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] >= start);
  if (end) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] <= end);
  const taxByRate = {};
  orders.forEach(o => {
    const rate = o.taxRate || settings.tax?.rate || 0;
    if (!taxByRate[rate]) taxByRate[rate] = { taxableSales: 0, taxCollected: 0, count: 0 };
    taxByRate[rate].taxableSales += (o.subtotal || 0);
    taxByRate[rate].taxCollected += (o.tax || 0);
    taxByRate[rate].count++;
  });
  res.json({ taxByRate, totalTaxCollected: Object.values(taxByRate).reduce((s, t) => s + t.taxCollected, 0), period: { start, end } });
});

app.get('/api/reports/employee-performance', (req, res) => {
  const { start, end } = req.query;
  let orders = db.orders;
  if (start) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] >= start);
  if (end) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] <= end);
  const byEmployee = {};
  orders.forEach(o => {
    const emp = o.employeeName || '未分配';
    if (!byEmployee[emp]) byEmployee[emp] = { orders: 0, totalSales: 0, avgOrder: 0, commissions: 0 };
    byEmployee[emp].orders++; byEmployee[emp].totalSales += o.total || 0;
  });
  Object.values(byEmployee).forEach(e => { e.avgOrder = e.totalSales / e.orders; });
  db.commissions.filter(c => {
    if (!start && !end) return true;
    if (!c.createdAt) return false;
    if (start && c.createdAt.split('T')[0] < start) return false;
    if (end && c.createdAt.split('T')[0] > end) return false;
    return true;
  }).forEach(c => {
    if (byEmployee[c.employeeName]) byEmployee[c.employeeName].commissions += c.amount || 0;
  });
  res.json(byEmployee);
});

app.get('/api/reports/customer', (req, res) => {
  const { start, end } = req.query;
  let orders = db.orders;
  if (start) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] >= start);
  if (end) orders = orders.filter(o => o.created_at && o.created_at.split('T')[0] <= end);
  const byCustomer = {};
  orders.forEach(o => {
    const cust = o.customerName || o.memberId || '散客';
    if (!byCustomer[cust]) byCustomer[cust] = { visits: 0, totalSpent: 0, lastVisit: '' };
    byCustomer[cust].visits++; byCustomer[cust].totalSpent += o.total || 0;
    if (o.created_at > byCustomer[cust].lastVisit) byCustomer[cust].lastVisit = o.created_at;
  });
  const topCustomers = Object.entries(byCustomer).sort((a, b) => b[1].totalSpent - a[1].totalSpent).slice(0, 10);
  const newCustomers = db.members.filter(m => {
    if (!start) return true;
    return m.join_date >= start;
  });
  res.json({ byCustomer, topCustomers: topCustomers.map(([name, data]) => ({ name, ...data })), newCustomers: newCustomers.length });
});

// Export all data
app.get('/api/export/all', (req, res) => {
  const format = req.query.format || 'json';
  if (format === 'csv') {
    const collections = ['products', 'members', 'orders', 'employees', 'categories'];
    const result = {};
    collections.forEach(col => {
      if (db[col] && db[col].length > 0) {
        const headers = Object.keys(db[col][0]);
        const csv = [headers.join(','), ...db[col].map(row => headers.map(h => {
          const val = row[h]; const str = val !== null && val !== undefined ? String(val) : '';
          return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str;
        }).join(','))].join('\n');
        result[col] = csv;
      }
    });
    res.json(result);
  } else {
    res.json(db);
  }
});

// Low stock alerts
app.get('/api/low_stock_alerts', (req, res) => {
  const alerts = db.products.filter(p => (p.stock || 0) <= (p.lowStockAlert || 10)).map(p => ({
    productId: p.id, name: p.name, currentStock: p.stock, lowStockAlert: p.lowStockAlert, supplier: p.supplier
  }));
  res.json(alerts);
});

// Multi-store
app.get('/api/stores', (req, res) => res.json(db.stores || [{ id: 'STORE001', name: '主店', address: '', status: 'active' }]));
app.post('/api/stores', (req, res) => {
  const store = { id: 'STORE' + Date.now(), ...req.body };
  if (!db.stores) db.stores = [];
  db.stores.push(store); saveDB(db); res.status(201).json(store);
});

// Serve frontend static files
app.use(express.static(SRC_DIR));

// Catch-all: serve login.html for unknown routes
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2' };
app.get('*', (req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/login.html';
  const fp = path.join(SRC_DIR, url);
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
});

app.listen(PORT, () => {
  console.log('========================================');
  console.log('  VS POS System v2.0');
  console.log('========================================');
  console.log('  Frontend: http://localhost:' + PORT);
  console.log('  Login:    http://localhost:' + PORT + '/login.html');
  console.log('  API:      http://localhost:' + PORT + '/api/health');
  console.log('  Default:  admin / admin123');
  console.log('========================================');
});
