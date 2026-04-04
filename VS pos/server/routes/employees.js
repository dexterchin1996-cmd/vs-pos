const express = require('express');
const router = express.Router();

let employees = [
  { id: 'E001', empNo: 'EMP001', name: '张技师', phone: '13800001111', role: 'technician', skills: ['按摩', 'SPA'], hireDate: '2023-01-15', salary: 5000, status: 'available', attendance: { checkIn: null, checkOut: null }, monthlyOrders: 0, monthlyCommission: 0, photo: '', active: true },
  { id: 'E002', empNo: 'EMP002', name: '李技师', phone: '13800002222', role: 'technician', skills: ['足疗', '按摩'], hireDate: '2023-03-20', salary: 4500, status: 'available', attendance: { checkIn: null, checkOut: null }, monthlyOrders: 0, monthlyCommission: 0, photo: '', active: true },
  { id: 'E003', empNo: 'EMP003', name: '王美容师', phone: '13800003333', role: 'beautician', skills: ['美容', '面部'], hireDate: '2022-11-01', salary: 5500, status: 'busy', attendance: { checkIn: null, checkOut: null }, monthlyOrders: 0, monthlyCommission: 0, photo: '', active: true },
  { id: 'E004', empNo: 'EMP004', name: '刘经理', phone: '13800004444', role: 'manager', skills: ['管理'], hireDate: '2022-01-01', salary: 8000, status: 'available', attendance: { checkIn: null, checkOut: null }, monthlyOrders: 0, monthlyCommission: 0, photo: '', active: true }
];

router.get('/', (req, res) => {
  res.json(employees);
});

router.get('/:id', (req, res) => {
  const emp = employees.find(e => e.id === req.params.id);
  if (!emp) return res.status(404).json({ error: '员工不存在' });
  res.json(emp);
});

router.post('/', (req, res) => {
  const newEmp = {
    id: 'E' + String(employees.length + 1).padStart(3, '0'),
    ...req.body,
    status: 'available',
    attendance: { checkIn: null, checkOut: null },
    monthlyOrders: 0,
    monthlyCommission: 0
  };
  employees.push(newEmp);
  res.status(201).json(newEmp);
});

router.put('/:id', (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '员工不存在' });
  employees[index] = { ...employees[index], ...req.body };
  res.json(employees[index]);
});

router.delete('/:id', (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '员工不存在' });
  employees.splice(index, 1);
  res.status(204).send();
});

router.post('/:id/clock-in', (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '员工不存在' });
  employees[index].attendance.checkIn = new Date().toISOString();
  employees[index].status = 'available';
  res.json(employees[index]);
});

router.post('/:id/clock-out', (req, res) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: '员工不存在' });
  employees[index].attendance.checkOut = new Date().toISOString();
  employees[index].status = 'off-duty';
  res.json(employees[index]);
});

module.exports = router;
