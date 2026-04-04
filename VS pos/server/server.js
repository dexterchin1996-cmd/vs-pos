const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'vs-pos-secret-key-2024';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'vspos.json');

app.use(cors());
app.use(express.json());

// JSON file-based database
function loadDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
      const initial = {
        users: [], products: [], categories: [], members: [], orders: [],
        employees: [], tickets: [], commissions: [], shifts: [], settings: {},
        technicians: [], services: []
      };
      saveDB(initial);
      return initial;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    console.error('DB load error:', e.message);
    return { users: [], products: [], categories: [], members: [], orders: [], employees: [], tickets: [], commissions: [], shifts: [], settings: {}, technicians: [], services: [] };
  }
}

function saveDB(db) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (e) {
    console.error('DB save error:', e.message);
  }
}

let db = loadDB();

// Initialize default data
function initDefaultData() {
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
  }
  if (db.categories.length === 0) {
    db.categories = [
      { id: 'C001', name: '按摩服务', icon: 'massage', sort: 1 },
      { id: 'C002', name: 'SPA服务', icon: 'spa', sort: 2 },
      { id: 'C003', name: '美容服务', icon: 'beauty', sort: 3 },
      { id: 'C004', name: '理疗服务', icon: 'therapy', sort: 4 }
    ];
  }
  if (db.members.length === 0) {
    db.members = [
      { id: 'M001', name: '张三', phone: '13800138001', balance: 1688, points: 1688, level: 'gold', join_date: '2024-01-15' },
      { id: 'M002', name: '李四', phone: '13800138002', balance: 888, points: 888, level: 'silver', join_date: '2024-02-20' },
      { id: 'M003', name: '王五', phone: '13800138003', balance: 0, points: 200, level: 'bronze', join_date: '2024-03-10' }
    ];
  }
  if (db.employees.length === 0) {
    db.employees = [
      { id: 'E001', emp_no: 'EMP001', name: '张技师', phone: '13800001111', role: 'technician', skills: '["按摩","SPA"]', hire_date: '2023-01-15', salary: 5000, status: 'available' },
      { id: 'E002', emp_no: 'EMP002', name: '李技师', phone: '13800002222', role: 'technician', skills: '["足疗","按摩"]', hire_date: '2023-03-20', salary: 4500, status: 'available' },
      { id: 'E003', emp_no: 'EMP003', name: '王美容师', phone: '13800003333', role: 'beautician', skills: '["美容","面部"]', hire_date: '2022-11-01', salary: 5500, status: 'busy' },
      { id: 'E004', emp_no: 'EMP004', name: '刘经理', phone: '13800004444', role: 'manager', skills: '["管理"]', hire_date: '2022-01-01', salary: 8000, status: 'available' }
    ];
  }
  if (db.technicians.length === 0) {
    db.technicians = [
      { id: 'T001', name: '技师A', skills: '["中式按摩","泰式按摩"]', status: 'available', phone: '13900139001' },
      { id: 'T002', name: '技师B', skills: '["精油SPA","面部护理"]', status: 'available', phone: '13900139002' },
      { id: 'T003', name: '技师C', skills: '["足部按摩","全身推拿"]', status: 'busy', phone: '13900139003' }
    ];
  }
  if (db.services.length === 0) {
    db.services = [
      { id: 'S001', name: '中式按摩', duration: 60, price: 168, description: '传统中式按摩手法' },
      { id: 'S002', name: '泰式按摩', duration: 60, price: 198, description: '泰式传统按摩' },
      { id: 'S003', name: '精油SPA', duration: 90, price: 268, description: '精油+按摩组合' },
      { id: 'S004', name: '面部护理', duration: 45, price: 188, description: '专业面部护理' }
    ];
  }
  if (db.users.length === 0) {
    db.users.push({
      id: 'U001', username: 'admin', password: bcrypt.hashSync('admin123', 10),
      name: '系统管理员', role: 'admin', status: 'active'
    });
    console.log('Default admin created: admin / admin123');
  }
  saveDB(db);
}

initDefaultData();

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: '未登录' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: '令牌无效' });
  }
}

// ============ AUTH ROUTES ============
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, username: user.username, name: user.name, role: user.role } });
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: '缺少 Google token' });
    const ticket = await googleClient.verifyIdToken({ idToken: token, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    let user = db.users.find(u => u.username === email);
    if (!user) {
      user = { id: 'U' + Date.now(), username: email, password: '', name, role: 'cashier', status: 'active' };
      db.users.push(user);
      saveDB(db);
    }
    const jwtToken = jwt.sign({ id: user.id, username: user.username, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token: jwtToken, user: { id: user.id, username: user.username, name: user.name, role: user.role } });
  } catch (error) {
    res.status(401).json({ error: 'Google 登录验证失败' });
  }
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: '用户不存在' });
  res.json({ id: user.id, username: user.username, name: user.name, role: user.role, status: user.status });
});

// ============ GENERIC CRUD ============
function createCrudRoutes(collection) {
  app.get(`/api/${collection}`, (req, res) => res.json(db[collection] || []));
  app.get(`/api/${collection}/:id`, (req, res) => {
    const item = db[collection].find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ error: '记录不存在' });
    res.json(item);
  });
  app.post(`/api/${collection}`, (req, res) => {
    const newItem = { id: req.body.id || (collection[0].toUpperCase() + Date.now()), ...req.body };
    db[collection].push(newItem);
    saveDB(db);
    res.status(201).json(newItem);
  });
  app.put(`/api/${collection}/:id`, (req, res) => {
    const idx = db[collection].findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: '记录不存在' });
    db[collection][idx] = { ...db[collection][idx], ...req.body };
    saveDB(db);
    res.json(db[collection][idx]);
  });
  app.delete(`/api/${collection}/:id`, (req, res) => {
    const idx = db[collection].findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: '记录不存在' });
    db[collection].splice(idx, 1);
    saveDB(db);
    res.status(204).send();
  });
}

['products', 'categories', 'members', 'orders', 'employees', 'tickets', 'commissions', 'shifts', 'technicians', 'services'].forEach(createCrudRoutes);

// Settings
app.get('/api/settings', (req, res) => res.json(db.settings || {}));
app.put('/api/settings', (req, res) => { db.settings = { ...db.settings, ...req.body }; saveDB(db); res.json(db.settings); });

// Member recharge
app.post('/api/members/:id/recharge', (req, res) => {
  const member = db.members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: '会员不存在' });
  member.balance += req.body.amount || 0;
  member.points += Math.floor(req.body.amount || 0);
  saveDB(db);
  res.json(member);
});

// Backup / Restore
app.get('/api/backup', (req, res) => res.json({ ...db, _backupDate: new Date().toISOString(), _version: '2.0.0' }));
app.post('/api/restore', (req, res) => {
  const data = req.body;
  ['products', 'categories', 'members', 'orders', 'employees', 'tickets', 'commissions', 'shifts', 'technicians', 'services'].forEach(t => {
    if (data[t]) db[t] = data[t];
  });
  saveDB(db);
  res.json({ status: 'ok', message: '数据恢复成功' });
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = db.orders.filter(o => o.created_at && o.created_at.startsWith(today));
  const todayTotal = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  res.json({
    today: { count: todayOrders.length, total: todayTotal },
    month: { count: db.orders.length, total: db.orders.reduce((s, o) => s + (o.total || 0), 0) },
    members: { count: db.members.length },
    products: { count: db.products.length },
    employees: { count: db.employees.length },
    openTickets: { count: db.tickets.filter(t => t.status === 'open').length }
  });
});

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', version: '2.0.0', timestamp: new Date().toISOString(), database: 'JSON' }));

app.listen(PORT, () => {
  console.log(`VS POS API Server v2.0.0 running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_FILE}`);
  console.log(`Default admin: admin / admin123`);
});
