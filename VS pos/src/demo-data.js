/**
 * VS Pos - 演示数据生成器
 */

const DemoDataGenerator = {
    // 生成随机日期
    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    },
    
    // 生成随机ID
    randomId(prefix = '') {
        return prefix + Date.now().toString(36) + Math.random().toString(36).substring(2, 6).toUpperCase();
    },
    
    // 随机选择
    randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    
    // 随机整数
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // 生成服务数据
    generateServices(count = 20) {
        const services = [];
        const categories = ['massage', 'spa', 'beauty', 'health', 'package', 'product'];
        const serviceNames = {
            massage: ['泰式按摩', '中式推拿', '日式按摩', '瑞典按摩', '深层组织按摩', '热石按摩', '香薰按摩', '肩颈按摩', '腰部按摩', '足底按摩'],
            spa: ['全身SPA', '面部SPA', '草本SPA', '海盐SPA', '红酒SPA', '蜂蜜SPA', '巧克力SPA', '花瓣SPA'],
            beauty: ['面部护理', '深层清洁', '美白护理', '抗衰老护理', '眼部护理', '唇部护理', '颈部护理', '手部护理'],
            health: ['艾灸', '拔罐', '刮痧', '针灸', '理疗', '汗蒸', '泡脚', '药浴'],
            package: ['单人套餐', '双人套餐', '家庭套餐', '企业套餐', '生日特惠', '节日套餐'],
            product: ['按摩油', '护肤霜', '面膜', '精油', '沐浴露', '洗发水']
        };
        
        for (let i = 0; i < count; i++) {
            const category = this.randomChoice(categories);
            const names = serviceNames[category];
            const name = this.randomChoice(names) + (Math.random() > 0.5 ? ' (' + this.randomChoice(['基础版', '标准版', '豪华版', 'VIP版']) + ')' : '');
            
            services.push({
                id: this.randomId('S'),
                sku: `${category.toUpperCase().substring(0, 3)}-${String(i + 1).padStart(3, '0')}`,
                barcode: '69' + this.randomInt(100000000, 999999999).toString(),
                name,
                category,
                price: this.randomInt(88, 1288),
                cost: this.randomInt(20, 300),
                duration: this.randomChoice([30, 45, 60, 75, 90, 120]),
                stock: this.randomInt(0, 999),
                lowStockAlert: this.randomChoice([5, 10, 15, 20]),
                supplier: this.randomChoice(['供应商A', '供应商B', '供应商C', '进口', '本地采购']),
                tags: [category],
                commission: this.randomInt(40, 80),
                active: Math.random() > 0.1
            });
        }
        
        return services;
    },
    
    // 生成会员数据
    generateMembers(count = 50) {
        const members = [];
        const levels = ['bronze', 'silver', 'gold', 'diamond'];
        const levelDiscounts = { bronze: 0, silver: 5, gold: 10, diamond: 15 };
        const firstNames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '周', '吴', '徐', '孙', '马', '朱', '胡', '郭', '何', '林', '高', '罗'];
        const lastNames = ['伟', '芳', '娜', '敏', '静', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '桂英', '华'];
        const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安', '重庆'];
        const streets = ['建国路', '中山路', '人民路', '解放路', '建设路', '文化路', '和平路', '幸福路', '光明路', '胜利路'];
        
        for (let i = 0; i < count; i++) {
            const firstName = this.randomChoice(firstNames);
            const lastName = this.randomChoice(lastNames);
            const level = this.randomChoice(levels);
            const joinDate = this.randomDate(new Date(2022, 0, 1), new Date());
            const lastVisit = this.randomDate(joinDate, new Date());
            
            members.push({
                id: this.randomId('M'),
                cardNo: 'VIP' + String(i + 1).padStart(6, '0'),
                name: firstName + lastName,
                phone: '1' + this.randomInt(3, 9) + this.randomInt(100000000, 999999999).toString(),
                email: `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}@example.com`,
                address: this.randomChoice(cities) + this.randomChoice(strees) + this.randomInt(1, 999) + '号',
                birthday: `${this.randomInt(1970, 2000)}-${String(this.randomInt(1, 12)).padStart(2, '0')}-${String(this.randomInt(1, 28)).padStart(2, '0')}`,
                level,
                discount: levelDiscounts[level],
                points: this.randomInt(0, 50000),
                balance: this.randomInt(0, 5000),
                totalSpent: this.randomInt(500, 100000),
                visitCount: this.randomInt(1, 100),
                joinDate: joinDate.toISOString().slice(0, 10),
                lastVisit: lastVisit.toISOString().slice(0, 10),
                status: Math.random() > 0.1 ? 'active' : 'inactive',
                notes: Math.random() > 0.7 ? this.randomChoice(['VIP客户', '重要客户', '投诉过', '回头客']) : ''
            });
        }
        
        return members;
    },
    
    // 生成员工数据
    generateEmployees(count = 15) {
        const employees = [];
        const roles = ['technician', 'beautician', 'manager', 'reception'];
        const roleSalaries = { technician: 5000, beautician: 5500, manager: 8000, reception: 4000 };
        const skills = {
            technician: ['按摩', '推拿', '足疗', 'SPA'],
            beautician: ['面部护理', '化妆', '美甲', '美睫'],
            manager: ['管理', '培训'],
            reception: ['接待', '收银']
        };
        const firstNames = ['张', '李', '王', '刘', '陈', '杨', '黄', '赵', '周', '吴', '徐'];
        const lastNames = ['师傅', '技师', '美容师', '经理', '接待'];
        
        for (let i = 0; i < count; i++) {
            const role = this.randomChoice(roles);
            const firstName = this.randomChoice(firstNames);
            const hireDate = this.randomDate(new Date(2020, 0, 1), new Date());
            
            employees.push({
                id: this.randomId('E'),
                empNo: 'EMP' + String(i + 1).padStart(4, '0'),
                name: firstName + this.randomChoice(lastNames),
                phone: '1' + this.randomInt(3, 9) + this.randomInt(100000000, 999999999).toString(),
                role,
                skills: this.randomChoice(skills[role]).split('').length > 2 ? skills[role] : [this.randomChoice(skills[role])],
                hireDate: hireDate.toISOString().slice(0, 10),
                salary: roleSalaries[role] + this.randomInt(-500, 2000),
                status: this.randomChoice(['available', 'available', 'available', 'busy', 'off']),
                attendance: {
                    checkIn: Math.random() > 0.5 ? new Date().toISOString() : null,
                    checkOut: null
                },
                monthlyOrders: this.randomInt(0, 100),
                monthlyCommission: this.randomInt(0, 5000),
                active: Math.random() > 0.05
            });
        }
        
        return employees;
    },
    
    // 生成订单数据
    generateOrders(count = 100, services = [], members = []) {
        const orders = [];
        const payments = ['cash', 'card', 'wechat', 'alipay'];
        
        for (let i = 0; i < count; i++) {
            const orderDate = this.randomDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date());
            const isMember = Math.random() > 0.3 && members.length > 0;
            const member = isMember ? this.randomChoice(members) : null;
            const itemCount = this.randomInt(1, 4);
            const items = [];
            let subtotal = 0;
            
            for (let j = 0; j < itemCount; j++) {
                const service = this.randomChoice(services);
                const qty = 1;
                const price = service.price;
                subtotal += price * qty;
                items.push({
                    name: service.name,
                    price,
                    qty
                });
            }
            
            const discount = member ? subtotal * (member.discount / 100) : 0;
            const afterDiscount = subtotal - discount;
            const tax = afterDiscount * 0.06;
            const tip = Math.random() > 0.5 ? afterDiscount * (this.randomChoice([0.1, 0.15, 0.2])) : 0;
            const total = afterDiscount + tax + tip;
            
            orders.push({
                id: i + 1,
                orderNo: 'V' + Date.now().toString().slice(0, -6) + String(i).padStart(4, '0'),
                customerType: isMember ? 'member' : 'walkin',
                customerName: member ? member.name : this.randomChoice(['散客A', '散客B', '游客', '顾客']),
                memberId: member ? member.id : null,
                techName: this.randomChoice(['张技师', '李技师', '王美容师']),
                items,
                subtotal,
                discount,
                tax: Math.round(tax * 100) / 100,
                tip: Math.round(tip * 100) / 100,
                total: Math.round(total * 100) / 100,
                pointsEarned: Math.floor(total),
                payment: this.randomChoice(payments),
                status: 'completed',
                createdAt: orderDate.toISOString()
            });
        }
        
        return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    // 生成完整的演示数据
    generateAll() {
        console.log('正在生成演示数据...');
        
        const services = this.generateServices(30);
        const members = this.generateMembers(50);
        const employees = this.generateEmployees(15);
        const orders = this.generateOrders(200, services, members);
        
        console.log(`生成完成: ${services.length} 个服务, ${members.length} 个会员, ${employees.length} 个员工, ${orders.length} 个订单`);
        
        return { services, members, employees, orders };
    },
    
    // 导出为JSON
    exportAsJSON() {
        const data = this.generateAll();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vsevice_demo_data_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },
    
    // 导入数据
    importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.services) localStorage.setItem('vsevice_services', JSON.stringify(data.services));
            if (data.members) localStorage.setItem('vsevice_members', JSON.stringify(data.members));
            if (data.employees) localStorage.setItem('vsevice_employees', JSON.stringify(data.employees));
            if (data.orders) localStorage.setItem('vsevice_orders', JSON.stringify(data.orders));
            
            console.log('数据导入成功');
            return true;
        } catch (e) {
            console.error('数据导入失败:', e);
            return false;
        }
    }
};

// 导出到全局
window.DemoDataGenerator = DemoDataGenerator;
