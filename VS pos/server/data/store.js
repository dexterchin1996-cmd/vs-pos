let products = [
  { id: 'P001', name: '中式按摩', category: '按摩服务', price: 168, stock: 999, unit: '次', status: 'active' },
  { id: 'P002', name: '泰式按摩', category: '按摩服务', price: 198, stock: 999, unit: '次', status: 'active' },
  { id: 'P003', name: '精油SPA', category: 'SPA服务', price: 268, stock: 999, unit: '次', status: 'active' },
  { id: 'P004', name: '面部护理', category: '美容服务', price: 188, stock: 999, unit: '次', status: 'active' },
  { id: 'P005', name: '足部按摩', category: '按摩服务', price: 128, stock: 999, unit: '次', status: 'active' },
  { id: 'P006', name: '全身推拿', category: '按摩服务', price: 298, stock: 999, unit: '次', status: 'active' },
  { id: 'P007', name: '艾灸理疗', category: '理疗服务', price: 158, stock: 999, unit: '次', status: 'active' },
  { id: 'P008', name: '拔罐刮痧', category: '理疗服务', price: 98, stock: 999, unit: '次', status: 'active' },
];

let categories = [
  { id: 'C001', name: '按摩服务', icon: 'massage', sort: 1 },
  { id: 'C002', name: 'SPA服务', icon: 'spa', sort: 2 },
  { id: 'C003', name: '美容服务', icon: 'beauty', sort: 3 },
  { id: 'C004', name: '理疗服务', icon: 'therapy', sort: 4 },
];

let members = [
  { id: 'M001', name: '张三', phone: '13800138001', balance: 1688, points: 1688, level: 'gold', joinDate: '2024-01-15' },
  { id: 'M002', name: '李四', phone: '13800138002', balance: 888, points: 888, level: 'silver', joinDate: '2024-02-20' },
  { id: 'M003', name: '王五', phone: '13800138003', balance: 0, points: 200, level: 'bronze', joinDate: '2024-03-10' },
];

let orders = [];
let technicians = [
  { id: 'T001', name: '技师A', skills: ['中式按摩', '泰式按摩'], status: 'available', phone: '13900139001' },
  { id: 'T002', name: '技师B', skills: ['精油SPA', '面部护理'], status: 'available', phone: '13900139002' },
  { id: 'T003', name: '技师C', skills: ['足部按摩', '全身推拿'], status: 'busy', phone: '13900139003' },
];

let services = [
  { id: 'S001', name: '中式按摩', duration: 60, price: 168, description: '传统中式按摩手法' },
  { id: 'S002', name: '泰式按摩', duration: 60, price: 198, description: '泰式传统按摩' },
  { id: 'S003', name: '精油SPA', duration: 90, price: 268, description: '精油+按摩组合' },
  { id: 'S004', name: '面部护理', duration: 45, price: 188, description: '专业面部护理' },
];

let store = {
  name: 'VS专业按摩会所',
  address: 'XX市XX区XX路123号',
  phone: '400-888-8888',
  hours: '10:00 - 22:00',
  manager: '王经理'
};

module.exports = {
  products,
  categories,
  members,
  orders,
  technicians,
  services,
  store
};
