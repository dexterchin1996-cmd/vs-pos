const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { members } = data;

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const member = members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: '会员不存在' });
  res.json(member);
});

router.get('/phone/:phone', (req, res) => {
  const member = members.find(m => m.phone === req.params.phone);
  if (!member) return res.status(404).json({ error: '会员不存在' });
  res.json(member);
});

router.post('/', (req, res) => {
  const newMember = {
    id: 'M' + String(members.length + 1).padStart(3, '0'),
    ...req.body,
    balance: req.body.balance || 0,
    points: req.body.points || 0,
    level: req.body.level || 'bronze',
    joinDate: new Date().toISOString().split('T')[0]
  };
  members.push(newMember);
  res.status(201).json(newMember);
});

router.put('/:id', (req, res) => {
  const index = members.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '会员不存在' });
  members[index] = { ...members[index], ...req.body };
  res.json(members[index]);
});

router.post('/:id/recharge', (req, res) => {
  const index = members.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '会员不存在' });
  const { amount } = req.body;
  members[index].balance += amount;
  members[index].points += Math.floor(amount);
  res.json(members[index]);
});

router.delete('/:id', (req, res) => {
  const index = members.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '会员不存在' });
  members.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
