const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { services } = data;

router.get('/', (req, res) => {
  res.json(services);
});

router.get('/:id', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: '服务不存在' });
  res.json(service);
});

router.post('/', (req, res) => {
  const newService = {
    id: 'S' + String(services.length + 1).padStart(3, '0'),
    ...req.body
  };
  services.push(newService);
  res.status(201).json(newService);
});

router.put('/:id', (req, res) => {
  const index = services.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '服务不存在' });
  services[index] = { ...services[index], ...req.body };
  res.json(services[index]);
});

router.delete('/:id', (req, res) => {
  const index = services.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '服务不存在' });
  services.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
