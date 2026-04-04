const express = require('express');
const router = express.Router();
const data = require('../data/store');

let { categories } = data;

router.get('/', (req, res) => {
  res.json(categories.sort((a, b) => a.sort - b.sort));
});

router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === req.params.id);
  if (!category) return res.status(404).json({ error: '分类不存在' });
  res.json(category);
});

router.post('/', (req, res) => {
  const newCategory = {
    id: 'C' + String(categories.length + 1).padStart(3, '0'),
    ...req.body,
    sort: categories.length + 1
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

router.put('/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '分类不存在' });
  categories[index] = { ...categories[index], ...req.body };
  res.json(categories[index]);
});

router.delete('/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '分类不存在' });
  categories.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
