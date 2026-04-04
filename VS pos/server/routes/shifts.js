const express = require('express');
const router = express.Router();

let shifts = [];

router.get('/', (req, res) => {
  res.json(shifts);
});

router.get('/:id', (req, res) => {
  const shift = shifts.find(s => s.id === req.params.id);
  if (!shift) return res.status(404).json({ error: '班次不存在' });
  res.json(shift);
});

router.post('/', (req, res) => {
  const newShift = {
    id: 'SH' + String(shifts.length + 1).padStart(4, '0'),
    ...req.body,
    status: 'open',
    createdAt: new Date().toISOString(),
    transactions: [],
    expectedCash: 0,
    actualCash: 0
  };
  shifts.push(newShift);
  res.status(201).json(newShift);
});

router.put('/:id', (req, res) => {
  const index = shifts.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '班次不存在' });
  shifts[index] = { ...shifts[index], ...req.body };
  res.json(shifts[index]);
});

router.delete('/:id', (req, res) => {
  const index = shifts.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '班次不存在' });
  shifts.splice(index, 1);
  res.status(204).send();
});

router.post('/:id/close', (req, res) => {
  const index = shifts.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '班次不存在' });
  shifts[index].status = 'closed';
  shifts[index].closedAt = new Date().toISOString();
  shifts[index].actualCash = req.body.actualCash || 0;
  shifts[index].difference = shifts[index].actualCash - shifts[index].expectedCash;
  res.json(shifts[index]);
});

router.post('/:id/transaction', (req, res) => {
  const index = shifts.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '班次不存在' });
  const tx = { id: 'TX' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  shifts[index].transactions.push(tx);
  res.json(tx);
});

module.exports = router;
