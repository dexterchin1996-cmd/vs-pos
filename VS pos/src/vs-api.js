const VS_API = (() => {
  const API_BASE = window.location.origin + '/api';
  const TOKEN_KEY = 'vspos_token';
  const USER_KEY = 'vspos_user';
  const CACHE_PREFIX = 'vscache_';
  const CACHE_TTL = 30000;

  const cache = {};

  function getToken() { return localStorage.getItem(TOKEN_KEY); }
  function getUser() { try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; } }
  function isAuthenticated() { return !!getToken(); }

  function getCache(key) {
    const entry = cache[key];
    if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data;
    const local = localStorage.getItem(CACHE_PREFIX + key);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Date.now() - parsed.ts < CACHE_TTL) { cache[key] = parsed; return parsed.data; }
      } catch {}
    }
    return null;
  }

  function setCache(key, data) {
    const entry = { data, ts: Date.now() };
    cache[key] = entry;
    try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry)); } catch {}
  }

  function clearCache(pattern) {
    if (pattern) {
      Object.keys(cache).forEach(k => { if (k.startsWith(pattern)) delete cache[k]; });
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(CACHE_PREFIX + pattern)) localStorage.removeItem(k);
      }
    } else {
      Object.keys(cache).forEach(k => delete cache[k]);
    }
  }

  function showToast(message, type = 'error') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || ''}</span><div class="toast-content"><div class="toast-message">${message}</div></div><button class="toast-close" onclick="this.parentElement.remove()">×</button>`;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
  }

  async function request(endpoint, options = {}) {
    const token = getToken();
    const url = `${API_BASE}${endpoint}`;
    const headers = { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}), ...options.headers };
    const config = { headers, ...options };
    if (config.body && typeof config.body === 'object') config.body = JSON.stringify(config.body);

    try {
      const res = await fetch(url, config);
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        showToast('登录已过期，请重新登录', 'warning');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        return null;
      }
      if (res.status === 204) return null;
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || '请求失败', 'error');
        throw new Error(data.error || 'Request failed');
      }
      return data;
    } catch (e) {
      if (e.message && e.message.includes('Failed to fetch')) {
        showToast('网络连接失败，请检查后端服务', 'error');
      } else if (!e.message.includes('登录已过期')) {
        showToast(e.message || '请求出错', 'error');
      }
      throw e;
    }
  }

  function resource(collection) {
    return {
      getAll(forceRefresh = false) {
        if (!forceRefresh) {
          const cached = getCache(collection);
          if (cached) return Promise.resolve(cached);
        }
        return request(`/${collection}`).then(data => { setCache(collection, data); return data; });
      },
      get(id) { return request(`/${collection}/${id}`); },
      create(data) { return request(`/${collection}`, { method: 'POST', body: data }).then(r => { clearCache(collection); return r; }); },
      update(id, data) { return request(`/${collection}/${id}`, { method: 'PUT', body: data }).then(r => { clearCache(collection); return r; }); },
      delete(id) { return request(`/${collection}/${id}`, { method: 'DELETE' }).then(r => { clearCache(collection); return r; }); }
    };
  }

  function requireAuth(redirectPage = 'login.html') {
    if (!isAuthenticated()) {
      window.location.href = redirectPage;
      return false;
    }
    return true;
  }

  function requireRole(roles) {
    const user = getUser();
    if (!user || !roles.includes(user.role)) {
      showToast('权限不足', 'error');
      return false;
    }
    return true;
  }

  function redirectToDefaultPage() {
    const user = getUser();
    if (!user) { window.location.href = 'login.html'; return; }
    const roleRoutes = { admin: 'manager.html', manager: 'manager.html', technician: 'staff.html', cashier: 'index.html' };
    window.location.href = roleRoutes[user.role] || 'index.html';
  }

  function calculateCommission(orderTotal, commissionRate = 0.6) {
    return Math.round(orderTotal * commissionRate * 100) / 100;
  }

  function exportCSV(data, filename = 'export.csv') {
    if (!data || data.length === 0) { showToast('没有数据可导出', 'warning'); return; }
    const headers = Object.keys(data[0]);
    const csv = [headers.join(','), ...data.map(row => headers.map(h => {
      const val = row[h];
      const str = val !== null && val !== undefined ? String(val) : '';
      return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str;
    }).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    showToast('文件已导出: ' + filename, 'success');
  }

  return {
    API_BASE, TOKEN_KEY, USER_KEY,
    getToken, getUser, isAuthenticated,
    request, showToast,
    resource, clearCache,
    auth: { requireAuth, requireRole, redirectToDefaultPage },
    products: resource('products'),
    categories: resource('categories'),
    members: resource('members'),
    orders: resource('orders'),
    employees: resource('employees'),
    tickets: resource('tickets'),
    commissions: resource('commissions'),
    shifts: resource('shifts'),
    technicians: resource('technicians'),
    services: resource('services'),
    subscriptions: resource('subscriptions'),
    tasks: resource('tasks'),
    permissions: resource('permissions'),
    financeReports: resource('finance_reports'),
    inventoryCounts: resource('inventory_counts'),
    inventoryTransfers: resource('inventory_transfers'),
    purchaseOrders: resource('purchase_orders'),
    stockAdjustments: resource('stock_adjustments'),
    customerGroups: resource('customer_groups'),
    customerHistory: { get(memberId) { return request(`/customer_history/${memberId}`); } },
    loyaltyTransactions: resource('loyalty_transactions'),
    taxRates: resource('tax_rates'),
    modifierGroups: resource('modifier_groups'),
    modifierOptions: resource('modifier_options'),
    receiptTemplates: resource('receipt_templates'),
    printerSettings: resource('printer_settings'),
    barcodes: resource('barcodes'),
    itemVariants: resource('item_variants'),
    shiftDetails: resource('shift_details'),
    shiftCashTransactions: resource('shift_cash_transactions'),
    refunds: resource('refunds'),
    returns: resource('returns'),
    suppliers: resource('suppliers'),
    paymentTypes: resource('payment_types'),
    stores: resource('stores'),
    lowStockAlerts: { getAll() { return request('/low_stock_alerts'); } },
    settings: {
      get() { return request('/settings'); },
      update(data) { return request('/settings', { method: 'PUT', body: data }); }
    },
    auth: {
      login(username, password) {
        return request('/auth/login', { method: 'POST', body: { username, password } }).then(data => {
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          return data;
        });
      },
      me() { return request('/auth/me'); },
      logout() { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); window.location.href = 'login.html'; },
      requireAuth, requireRole, redirectToDefaultPage
    },
    stats() { return request('/stats'); },
    subscribe(plan, billing) { return request('/subscribe', { method: 'POST', body: { plan, billing } }); },
    completeTask(id) { return request(`/tasks/${id}/complete`, { method: 'POST' }); },
    assignTask(data) { return request('/tasks/assign', { method: 'POST', body: data }); },
    generateFinanceReport(data) { return request('/finance/generate', { method: 'POST', body: data }); },
    rechargeMember(id, amount) { return request(`/members/${id}/recharge`, { method: 'POST', body: { amount } }); },
    loyaltyEarn(data) { return request('/loyalty/earn', { method: 'POST', body: data }); },
    loyaltyRedeem(data) { return request('/loyalty/redeem', { method: 'POST', body: data }); },
    createRefund(data) { return request('/refunds', { method: 'POST', body: data }); },
    createReturn(data) { return request('/returns', { method: 'POST', body: data }); },
    startInventoryCount(id) { return request(`/inventory_counts/${id}/start`, { method: 'POST' }); },
    completeInventoryCount(id) { return request(`/inventory_counts/${id}/complete`, { method: 'POST' }); },
    confirmInventoryTransfer(id) { return request(`/inventory_transfers/${id}/confirm`, { method: 'POST' }); },
    receivePurchaseOrder(id) { return request(`/purchase_orders/${id}/receive`, { method: 'POST' }); },
    assignCustomerGroup(groupId, memberIds) { return request(`/customer_groups/${groupId}/assign`, { method: 'POST', body: { memberIds } }); },
    lookupBarcode(code) { return request(`/barcodes/lookup/${code}`); },
    getItemVariants(productId) { return request(`/item_variants/product/${productId}`); },
    getSalesReport(params) { const qs = new URLSearchParams(params).toString(); return request(`/reports/sales?${qs}`); },
    getInventoryReport() { return request('/reports/inventory'); },
    getTaxReport(params) { const qs = new URLSearchParams(params).toString(); return request(`/reports/tax?${qs}`); },
    getEmployeePerformance(params) { const qs = new URLSearchParams(params).toString(); return request(`/reports/employee-performance?${qs}`); },
    getCustomerReport(params) { const qs = new URLSearchParams(params).toString(); return request(`/reports/customer?${qs}`); },
    exportAllData(format) { return request(`/export/all?format=${format || 'json'}`); },
    calculateCommission,
    exportCSV,
    showToast
  };
})();

window.VS_API = VS_API;
