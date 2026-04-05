const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const JWT_SECRET = 'vs-pos-secret-key-2024';

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

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await db.collection('users').where('username', '==', username).get();
  if (userDoc.empty) return res.status(401).json({ error: '用户名或密码错误' });
  const user = userDoc.docs[0].data();
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: '用户名或密码错误' });
  const token = jwt.sign({ id: userDoc.docs[0].id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: userDoc.docs[0].id, username: user.username, name: user.name, role: user.role } });
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const doc = await db.collection('users').doc(req.user.id).get();
  if (!doc.exists) return res.status(404).json({ error: '用户不存在' });
  const user = doc.data();
  res.json({ id: doc.id, username: user.username, name: user.name, role: user.role });
});

// Generic CRUD
function createCrudRoutes(collectionName) {
  app.get(`/api/${collectionName}`, authMiddleware, async (req, res) => {
    const snap = await db.collection(collectionName).get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
  app.get(`/api/${collectionName}/:id`, authMiddleware, async (req, res) => {
    const doc = await db.collection(collectionName).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: '不存在' });
    res.json({ id: doc.id, ...doc.data() });
  });
  app.post(`/api/${collectionName}`, authMiddleware, async (req, res) => {
    const docRef = await db.collection(collectionName).add(req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  });
  app.put(`/api/${collectionName}/:id`, authMiddleware, async (req, res) => {
    await db.collection(collectionName).doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  });
  app.delete(`/api/${collectionName}/:id`, authMiddleware, async (req, res) => {
    await db.collection(collectionName).doc(req.params.id).delete();
    res.status(204).send();
  });
}

const collections = ['products','categories','members','orders','employees','tickets','commissions','shifts','technicians','services','subscriptions','tasks','permissions','finance_reports','inventory_counts','inventory_transfers','purchase_orders','stock_adjustments','customer_groups','customer_history','loyalty_transactions','tax_rates','discounts','modifier_groups','modifier_options','receipt_templates','printer_settings','barcodes','item_variants','shift_details','shift_cash_transactions','refunds','returns','suppliers','payment_types','api_tokens','webhooks','import_jobs','low_stock_alerts','dining_options','kitchen_printers','customer_displays'];
collections.forEach(createCrudRoutes);

app.get('/api/settings', authMiddleware, async (req, res) => {
  const doc = await db.collection('settings').doc('main').get();
  res.json(doc.exists ? doc.data() : {});
});
app.put('/api/settings', authMiddleware, async (req, res) => {
  await db.collection('settings').doc('main').set(req.body, { merge: true });
  res.json(req.body);
});
app.post('/api/members/:id/recharge', authMiddleware, async (req, res) => {
  const ref = db.collection('members').doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) return res.status(404).json({ error: '不存在' });
  const data = doc.data();
  await ref.update({ balance: (data.balance || 0) + (req.body.amount || 0), points: (data.points || 0) + Math.floor(req.body.amount || 0) });
  res.json({ ...data, balance: (data.balance || 0) + (req.body.amount || 0), points: (data.points || 0) + Math.floor(req.body.amount || 0) });
});
app.get('/api/stats', authMiddleware, async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const ordersSnap = await db.collection('orders').get();
  const orders = ordersSnap.docs.map(d => d.data());
  const todayOrders = orders.filter(o => o.created_at && o.created_at.startsWith(today));
  res.json({
    today: { count: todayOrders.length, total: todayOrders.reduce((s, o) => s + (o.total || 0), 0) },
    month: { count: orders.length, total: orders.reduce((s, o) => s + (o.total || 0), 0) },
    members: { count: (await db.collection('members').count().get()).data().count },
    products: { count: (await db.collection('products').count().get()).data().count },
    employees: { count: (await db.collection('employees').count().get()).data().count }
  });
});
app.get('/api/backup', authMiddleware, async (req, res) => {
  const data = {};
  for (const col of collections) {
    const snap = await db.collection(col).get();
    data[col] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
  res.json({ ...data, _backupDate: new Date().toISOString() });
});
app.get('/api/health', (req, res) => res.json({ status: 'ok', version: '4.0.0', timestamp: new Date().toISOString(), platform: 'firebase' }));

// Seed default admin user
async function seedAdmin() {
  const usersSnap = await db.collection('users').limit(1).get();
  if (usersSnap.empty) {
    await db.collection('users').add({
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      name: '系统管理员',
      role: 'admin',
      status: 'active'
    });
    console.log('Default admin created: admin / admin123');
  }
}
seedAdmin();

exports.api = functions.https.onRequest(app);
