const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { orders, members } = data;

router.get('/', (req, res) => {
  res.json(orders);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: '订单不存在' });
  res.json(order);
});

router.post('/', (req, res) => {
  const { memberId, items, total, paymentMethod, technicianId } = req.body;
  
  const newOrder = {
    id: 'O' + String(orders.length + 1).padStart(6, '0'),
    memberId,
    items,
    total,
    paymentMethod: paymentMethod || 'cash',
    technicianId,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  
  if (memberId) {
    const member = members.find(m => m.id === memberId);
    if (member) {
      member.points += Math.floor(total);
    }
  }
  
  res.status(201).json(newOrder);
});

router.put('/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '订单不存在' });
  orders[index] = { ...orders[index], ...req.body };
  res.json(orders[index]);
});

router.delete('/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '订单不存在' });
  orders.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
