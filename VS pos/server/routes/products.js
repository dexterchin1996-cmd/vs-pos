const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { products } = data;

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: '产品不存在' });
  res.json(product);
});

router.post('/', (req, res) => {
  const newProduct = {
    id: 'P' + String(products.length + 1).padStart(3, '0'),
    ...req.body,
    status: 'active'
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '产品不存在' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '产品不存在' });
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
