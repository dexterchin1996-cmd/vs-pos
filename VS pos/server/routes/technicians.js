const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { technicians } = data;

router.get('/', (req, res) => {
  res.json(technicians);
});

router.get('/:id', (req, res) => {
  const technician = technicians.find(t => t.id === req.params.id);
  if (!technician) return res.status(404).json({ error: '技师不存在' });
  res.json(technician);
});

router.post('/', (req, res) => {
  const newTechnician = {
    id: 'T' + String(technicians.length + 1).padStart(3, '0'),
    ...req.body,
    status: 'available'
  };
  technicians.push(newTechnician);
  res.status(201).json(newTechnician);
});

router.put('/:id', (req, res) => {
  const index = technicians.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '技师不存在' });
  technicians[index] = { ...technicians[index], ...req.body };
  res.json(technicians[index]);
});

router.delete('/:id', (req, res) => {
  const index = technicians.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '技师不存在' });
  technicians.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
