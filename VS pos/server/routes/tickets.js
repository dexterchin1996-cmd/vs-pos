const express = require('express');
const router = express.Router();

let tickets = [];

router.get('/', (req, res) => {
  res.json(tickets);
});

router.get('/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: '开台不存在' });
  res.json(ticket);
});

router.post('/', (req, res) => {
  const newTicket = {
    id: 'T' + String(tickets.length + 1).padStart(4, '0'),
    ...req.body,
    status: 'open',
    createdAt: new Date().toISOString(),
    items: req.body.items || [],
    total: 0
  };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

router.put('/:id', (req, res) => {
  const index = tickets.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '开台不存在' });
  tickets[index] = { ...tickets[index], ...req.body };
  res.json(tickets[index]);
});

router.delete('/:id', (req, res) => {
  const index = tickets.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '开台不存在' });
  tickets.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
