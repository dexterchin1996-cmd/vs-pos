const API_BASE = '/api';

let _apiAvailable = null;

async function checkApiAvailability() {
  if (_apiAvailable !== null) return _apiAvailable;
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    _apiAvailable = res.ok;
  } catch {
    _apiAvailable = false;
  }
  return _apiAvailable;
}

function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
}
function lsSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function lsGetObj(key) {
  try { return JSON.parse(localStorage.getItem(key) || '{}'); }
  catch { return {}; }
}
function lsSetObj(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function makeResource(collection, storageKey) {
  return {
    async getAll() {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/${collection}`);
          if (res.ok) { const data = await res.json(); lsSet(storageKey, data); return data; }
        } catch (e) { console.warn(`API ${collection}.getAll failed, using localStorage`, e); }
      }
      return lsGet(storageKey);
    },
    async get(id) {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/${collection}/${id}`);
          if (res.ok) return await res.json();
        } catch (e) { console.warn(`API ${collection}.get failed`, e); }
      }
      return lsGet(storageKey).find(i => i.id == id);
    },
    async create(data) {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/${collection}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
          });
          if (res.ok) { const created = await res.json(); const list = lsGet(storageKey); list.push(created); lsSet(storageKey, list); return created; }
        } catch (e) { console.warn(`API ${collection}.create failed`, e); }
      }
      const list = lsGet(storageKey);
      list.push(data);
      lsSet(storageKey, list);
      return data;
    },
    async update(id, data) {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/${collection}/${id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
          });
          if (res.ok) { const updated = await res.json(); const list = lsGet(storageKey); const idx = list.findIndex(i => i.id == id); if (idx >= 0) list[idx] = updated; lsSet(storageKey, list); return updated; }
        } catch (e) { console.warn(`API ${collection}.update failed`, e); }
      }
      const list = lsGet(storageKey);
      const idx = list.findIndex(i => i.id == id);
      if (idx >= 0) { list[idx] = { ...list[idx], ...data }; lsSet(storageKey, list); }
      return list[idx];
    },
    async delete(id) {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/${collection}/${id}`, { method: 'DELETE' });
          if (res.ok) { const list = lsGet(storageKey).filter(i => i.id != id); lsSet(storageKey, list); return true; }
        } catch (e) { console.warn(`API ${collection}.delete failed`, e); }
      }
      const list = lsGet(storageKey).filter(i => i.id != id);
      lsSet(storageKey, list);
      return true;
    }
  };
}

const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = { headers: { 'Content-Type': 'application/json' }, ...options };
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    try {
      const res = await fetch(url, config);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || 'Request failed');
      }
      if (res.status === 204) return null;
      return await res.json();
    } catch (e) {
      console.error(`API Error: ${endpoint}`, e);
      throw e;
    }
  },

  products: makeResource('products', 'vsevice_services'),
  categories: makeResource('categories', 'vsevice_categories'),
  members: makeResource('members', 'vsevice_members'),
  orders: makeResource('orders', 'vsevice_orders'),
  technicians: makeResource('technicians', 'vsevice_technicians'),
  services: makeResource('services', 'vsevice_services'),
  employees: makeResource('employees', 'vsevice_employees'),
  tickets: makeResource('tickets', 'vsevice_tickets'),
  invoices: makeResource('invoices', 'vsevice_invoices'),
  commissions: makeResource('commissions', 'vsevice_commissions'),
  shifts: makeResource('shifts', 'vsevice_shifts'),
  suppliers: makeResource('suppliers', 'vsevice_suppliers'),
  taxes: makeResource('taxes', 'vsevice_taxes'),
  discounts: makeResource('discounts', 'vsevice_discounts'),
  modifiers: makeResource('modifiers', 'vsevice_modifiers'),
  paymentTypes: makeResource('payment-types', 'vsevice_payment_types'),

  membersByPhone(phone) {
    return this.members.getAll().then(list => list.find(m => m.phone === phone));
  },

  async rechargeMember(id, amount) {
    if (await checkApiAvailability()) {
      try {
        const res = await fetch(`${API_BASE}/members/${id}/recharge`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount })
        });
        if (res.ok) return await res.json();
      } catch (e) { console.warn('API rechargeMember failed', e); }
    }
    const list = lsGet('vsevice_members');
    const member = list.find(m => m.id == id);
    if (member) {
      member.balance = (member.balance || 0) + amount;
      lsSet('vsevice_members', list);
    }
    return member;
  },

  store: {
    async get() {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/store`);
          if (res.ok) return await res.json();
        } catch (e) { console.warn('API store.get failed', e); }
      }
      return lsGetObj('vsevice_settings');
    },
    async update(data) {
      if (await checkApiAvailability()) {
        try {
          const res = await fetch(`${API_BASE}/store`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
          });
          if (res.ok) return await res.json();
        } catch (e) { console.warn('API store.update failed', e); }
      }
      lsSetObj('vsevice_settings', data);
      return data;
    }
  },

  health: () => fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) }).then(r => r.json()).catch(() => ({ status: 'offline' })),

  async isAvailable() { return checkApiAvailability(); }
};

window.api = api;
