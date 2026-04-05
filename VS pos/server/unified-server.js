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
      saveDB({ users: [], products: [], categories: [], members: [], orders: [], employees: [], tickets: [], commissions: [], shifts: [], settings: {}, technicians: [], services: [], subscriptions: [], tasks: [], permissions: [], finance_reports: [] });
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { users: [], products: [], categories: [], members: [], orders: [], employees: [], tickets: [], commissions: [], shifts: [], settings: {}, technicians: [], services: [], subscriptions: [], tasks: [], permissions: [], finance_reports: [] };
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
['products','categories','members','orders','employees','tickets','commissions','shifts','technicians','services','subscriptions','tasks','permissions','finance_reports'].forEach(col => {
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
app.post('/api/restore', (req, res) => { ['products','categories','members','orders','employees','tickets','commissions','shifts','technicians','services'].forEach(t => { if (req.body[t]) db[t] = req.body[t]; }); saveDB(db); res.json({ status: 'ok' }); });
app.get('/api/stats', (req, res) => { const today = new Date().toISOString().split('T')[0]; const to = db.orders.filter(o => o.created_at && o.created_at.startsWith(today)); res.json({ today: { count: to.length, total: to.reduce((s, o) => s + (o.total || 0), 0) }, members: { count: db.members.length }, products: { count: db.products.length }, employees: { count: db.employees.length } }); });
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
