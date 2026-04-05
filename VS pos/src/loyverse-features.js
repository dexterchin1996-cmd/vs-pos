const LoyverseFeatures = (() => {
  function generateBarcode(productId, type = 'EAN13') {
    const code = String(productId).padStart(12, '0');
    let sum = 0;
    for (let i = 0; i < 12; i++) { sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3); }
    const checkDigit = (10 - (sum % 10)) % 10;
    return { code: code + checkDigit, type, productId };
  }

  function calculateTax(amount, taxRate, isInclusive = false) {
    if (!taxRate || taxRate === 0) return 0;
    if (isInclusive) { return amount - amount / (1 + taxRate / 100); }
    return amount * (taxRate / 100);
  }

  function calculateDiscount(subtotal, type, value) {
    if (type === 'percent') return subtotal * (value / 100);
    if (type === 'fixed') return Math.min(value, subtotal);
    return 0;
  }

  function roundAmount(amount, rule = 'round', interval = 0.01) {
    if (interval === 0.01 || !interval) {
      switch (rule) {
        case 'floor': return Math.floor(amount * 100) / 100;
        case 'ceil': return Math.ceil(amount * 100) / 100;
        case 'round': default: return Math.round(amount * 100) / 100;
      }
    }
    const rounded = Math.round(amount / interval) * interval;
    return Math.round(rounded * 100) / 100;
  }

  function printReceipt(order, settings) {
    const s = settings || {};
    const header = s.receiptHeader || s.shopName || 'VS POS';
    const footer = s.receiptFooter || '谢谢惠顾，欢迎下次光临！';
    let content = `${'='.repeat(32)}\n`;
    content += `        ${header}\n`;
    content += `${'='.repeat(32)}\n`;
    content += `订单号: ${order.orderNo || order.id}\n`;
    content += `时间: ${new Date(order.createdAt || order.created_at).toLocaleString()}\n`;
    if (order.employeeName) content += `员工: ${order.employeeName}\n`;
    if (order.customerName) content += `客户: ${order.customerName}\n`;
    content += `${'-'.repeat(32)}\n`;
    (order.items || []).forEach(item => {
      content += `${item.name}\n`;
      content += `  ${item.qty} x ¥${item.price.toFixed(2)} = ¥${(item.qty * item.price).toFixed(2)}\n`;
    });
    content += `${'-'.repeat(32)}\n`;
    content += `小计: ¥${(order.subtotal || 0).toFixed(2)}\n`;
    if (order.discount > 0) content += `折扣: -¥${order.discount.toFixed(2)}\n`;
    if (order.tax > 0) content += `税费: ¥${order.tax.toFixed(2)}\n`;
    if (order.tip > 0) content += `小费: ¥${order.tip.toFixed(2)}\n`;
    content += `${'='.repeat(32)}\n`;
    content += `总计: ¥${(order.total || 0).toFixed(2)}\n`;
    content += `${'='.repeat(32)}\n`;
    content += `支付方式: ${order.paymentMethod || order.payment || '现金'}\n`;
    if (order.paymentMethod === 'cash' && order.cashReceived) {
      content += `实收: ¥${order.cashReceived.toFixed(2)}\n`;
      content += `找零: ¥${(order.cashReceived - order.total).toFixed(2)}\n`;
    }
    content += `${'-'.repeat(32)}\n`;
    content += `  ${footer}\n`;
    content += `${'='.repeat(32)}\n`;
    const printWindow = window.open('', '', 'width=300,height=600');
    if (printWindow) {
      printWindow.document.write('<pre style="font-family: monospace; font-size: 12px; white-space: pre-wrap;">' + content + '</pre>');
      printWindow.document.close();
      printWindow.print();
    }
    return content;
  }

  function cancelReceipt(order, reason) {
    order.cancelledAt = new Date().toISOString();
    order.cancelReason = reason;
    order.status = 'cancelled';
    return order;
  }

  function processRefund(order, items, reason) {
    const refundAmount = items.reduce((sum, item) => {
      const orig = (order.items || []).find(i => i.name === item.name);
      return sum + (orig ? orig.price * item.qty : 0);
    }, 0);
    return {
      id: 'REF' + Date.now(),
      orderId: order.id,
      orderNo: order.orderNo,
      items,
      amount: refundAmount,
      reason,
      refundedBy: 'current_user',
      createdAt: new Date().toISOString()
    };
  }

  function processReturn(order, items, returnToStock, reason) {
    const returnAmount = items.reduce((sum, item) => {
      const orig = (order.items || []).find(i => i.name === item.name);
      return sum + (orig ? orig.price * item.qty : 0);
    }, 0);
    return {
      id: 'RET' + Date.now(),
      orderId: order.id,
      orderNo: order.orderNo,
      items,
      amount: returnAmount,
      returnToStock,
      reason,
      createdAt: new Date().toISOString()
    };
  }

  function splitBillByItems(order, splits) {
    const result = [];
    splits.forEach(split => {
      const splitTotal = split.items.reduce((sum, item) => {
        const orig = (order.items || []).find(i => i.name === item.name);
        return sum + (orig ? orig.price * item.qty : 0);
      }, 0);
      result.push({ items: split.items, total: splitTotal, paymentMethod: split.paymentMethod });
    });
    return result;
  }

  function splitBillByPercentage(order, percentages) {
    const total = order.total || 0;
    return percentages.map(pct => ({
      percentage: pct,
      total: roundAmount(total * pct / 100),
      paymentMethod: 'cash'
    }));
  }

  function splitBillByAmount(order, amounts) {
    return amounts.map(amt => ({
      amount: amt,
      paymentMethod: 'cash'
    }));
  }

  function createInventoryCount(products, name, location) {
    return {
      id: 'IC' + Date.now(),
      name,
      location: location || '主店',
      status: 'draft',
      items: products.map(p => ({
        productId: p.id,
        name: p.name,
        expectedQty: p.stock || 0,
        countedQty: null,
        variance: 0
      })),
      createdAt: new Date().toISOString()
    };
  }

  function createInventoryTransfer(items, fromLocation, toLocation, notes) {
    return {
      id: 'IT' + Date.now(),
      items,
      fromLocation,
      toLocation,
      status: 'draft',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };
  }

  function createPurchaseOrder(supplier, items, notes) {
    const total = items.reduce((sum, item) => sum + (item.cost * item.qty), 0);
    return {
      id: 'PO' + Date.now(),
      supplierId: supplier,
      supplierName: supplier,
      items,
      total,
      status: 'draft',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };
  }

  function createStockAdjustment(items, reason, notes) {
    return {
      id: 'SA' + Date.now(),
      items,
      reason,
      notes: notes || '',
      createdAt: new Date().toISOString()
    };
  }

  function exportToCSV(data, filename) {
    if (!data || data.length === 0) return;
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
  }

  function exportToExcel(data, filename) {
    exportToCSV(data, filename.replace('.xlsx', '.csv'));
  }

  function exportToPDF(data, filename) {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    if (!data || data.length === 0) { printWindow.document.write('<p>没有数据</p>'); return; }
    const headers = Object.keys(data[0]);
    let html = '<html><head><title>' + filename + '</title><style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:12px;}th{background:#f5f5f5;font-weight:600;}</style></head><body>';
    html += '<h2>' + filename + '</h2>';
    html += '<table><thead><tr>' + headers.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>';
    data.forEach(row => {
      html += '<tr>' + headers.map(h => '<td>' + (row[h] || '') + '</td>').join('') + '</tr>';
    });
    html += '</tbody></table></body></html>';
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  }

  function scanBarcode(input, products) {
    const trimmed = input.trim();
    let product = products.find(p => p.barcode === trimmed);
    if (!product) product = products.find(p => p.sku === trimmed);
    if (!product) product = products.find(p => p.id === trimmed);
    return product || null;
  }

  function generateQRCode(text) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
  }

  function createCustomerGroup(name, discount, description) {
    return {
      id: 'CG' + Date.now(),
      name,
      discount: discount || 0,
      description: description || '',
      memberCount: 0,
      createdAt: new Date().toISOString()
    };
  }

  function createLoyaltyTransaction(memberId, type, points, reason, orderId) {
    return {
      id: 'LY' + Date.now(),
      memberId,
      type,
      points,
      reason: reason || '',
      orderId: orderId || '',
      createdAt: new Date().toISOString()
    };
  }

  function calculateLoyaltyPoints(totalSpent, earningRate = 1) {
    return Math.floor(totalSpent * earningRate);
  }

  function calculateLoyaltyDiscount(points, redeemRate = 100) {
    return Math.floor(points / redeemRate);
  }

  function createModifierGroup(name, options, required = false, multiSelect = false) {
    return {
      id: 'MG' + Date.now(),
      name,
      options: options.map((opt, idx) => ({ id: 'MO' + Date.now() + idx, ...opt })),
      required,
      multiSelect,
      createdAt: new Date().toISOString()
    };
  }

  function createTaxRate(name, rate, isInclusive = false, appliesTo = 'all') {
    return {
      id: 'TAX' + Date.now(),
      name,
      rate,
      isInclusive,
      appliesTo,
      active: true,
      createdAt: new Date().toISOString()
    };
  }

  function createReceiptTemplate(name, header, footer, showLogo = true, showTax = true, showDiscount = true) {
    return {
      id: 'RT' + Date.now(),
      name,
      header: header || '',
      footer: footer || '',
      showLogo,
      showTax,
      showDiscount,
      isDefault: false,
      createdAt: new Date().toISOString()
    };
  }

  function openCashDrawer() {
    try {
      if (window.print) {
        const printWindow = window.open('', '', 'width=1,height=1');
        if (printWindow) {
          printWindow.document.write('\x1B\x70\x00\x3C\xFF');
          printWindow.document.close();
          printWindow.close();
        }
      }
    } catch (e) { console.warn('Cash drawer open failed:', e); }
  }

  function initBarcodeScanner(onScan) {
    let buffer = '';
    let timeout;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && buffer.length > 0) {
        clearTimeout(timeout);
        onScan(buffer);
        buffer = '';
      } else if (e.key.length === 1) {
        buffer += e.key;
        clearTimeout(timeout);
        timeout = setTimeout(() => { buffer = ''; }, 100);
      }
    });
  }

  return {
    generateBarcode, calculateTax, calculateDiscount, roundAmount,
    printReceipt, cancelReceipt, processRefund, processReturn,
    splitBillByItems, splitBillByPercentage, splitBillByAmount,
    createInventoryCount, createInventoryTransfer, createPurchaseOrder, createStockAdjustment,
    exportToCSV, exportToExcel, exportToPDF,
    scanBarcode, generateQRCode,
    createCustomerGroup, createLoyaltyTransaction, calculateLoyaltyPoints, calculateLoyaltyDiscount,
    createModifierGroup, createTaxRate, createReceiptTemplate,
    openCashDrawer, initBarcodeScanner
  };
})();

window.LoyverseFeatures = LoyverseFeatures;
