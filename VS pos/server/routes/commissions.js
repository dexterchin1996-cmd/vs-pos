const express = require('express');
const router = express.Router();

let commissions = [];

router.get('/', (req, res) => {
  res.json(commissions);
});

router.get('/:id', (req, res) => {
  const comm = commissions.find(c => c.id === req.params.id);
  if (!comm) return res.status(404).json({ error: '佣金记录不存在' });
  res.json(comm);
});

router.post('/', (req, res) => {
  const newComm = {
    id: 'C' + String(commissions.length + 1).padStart(4, '0'),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  commissions.push(newComm);
  res.status(201).json(newComm);
});

router.put('/:id', (req, res) => {
  const index = commissions.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '佣金记录不存在' });
  commissions[index] = { ...commissions[index], ...req.body };
  res.json(commissions[index]);
});

router.delete('/:id', (req, res) => {
  const index = commissions.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '佣金记录不存在' });
  commissions.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
