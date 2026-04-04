const express = require('express');
const router = express.Router();

let settings = {
  storeName: 'VS专业按摩会所',
  address: 'XX市XX区XX路123号',
  phone: '400-888-8888',
  hours: '10:00 - 22:00',
  manager: '王经理',
  earningRate: 1,
  redeemRate: 100,
  commissionRate: 60,
  discounts: { bronze: 0, silver: 5, gold: 10, diamond: 15 },
  payments: { cash: true, card: true, wechat: true, alipay: true },
  tax: { enabled: false, rate: 6, method: 'add' },
  tips: { enabled: false, percent1: 10, percent2: 15, percent3: 20, custom: true, separate: true },
  currency: { symbol: '¥', code: 'CNY', decimals: 2, rounding: 'round' },
  printer: { type: 'epson', name: '', width: 32, header: '', footer: '' }
};

router.get('/', (req, res) => {
  res.json(settings);
});

router.put('/', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

module.exports = router;
