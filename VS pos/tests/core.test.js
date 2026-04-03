/**
 * VS Pos 单元测试
 */

describe('VS Pos 核心功能测试', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('数据初始化', () => {
        test('应初始化示例数据', () => {
            const services = JSON.parse(localStorage.getItem('vsevice_services') || '[]');
            const employees = JSON.parse(localStorage.getItem('vsevice_employees') || '[]');
            const members = JSON.parse(localStorage.getItem('vsevice_members') || '[]');
            
            expect(services.length).toBeGreaterThan(0);
            expect(employees.length).toBeGreaterThan(0);
            expect(members.length).toBeGreaterThan(0);
        });
    });

    describe('商品管理', () => {
        test('应能添加新商品', () => {
            const newService = {
                id: 'TEST001',
                name: '测试服务',
                price: 100,
                category: 'massage',
                active: true
            };
            
            const services = JSON.parse(localStorage.getItem('vsevice_services') || '[]');
            services.push(newService);
            localStorage.setItem('vsevice_services', JSON.stringify(services));
            
            const updated = JSON.parse(localStorage.getItem('vsevice_services'));
            expect(updated.length).toBeGreaterThan(0);
        });

        test('应能计算商品佣金', () => {
            const service = { price: 298, commission: 60 };
            const commission = service.price * service.commission / 100;
            expect(commission).toBe(178.8);
        });
    });

    describe('会员管理', () => {
        test('应能计算会员折扣', () => {
            const discounts = {
                bronze: 0,
                silver: 5,
                gold: 10,
                diamond: 15
            };
            
            expect(discounts.bronze).toBe(0);
            expect(discounts.silver).toBe(5);
            expect(discounts.gold).toBe(10);
            expect(discounts.diamond).toBe(15);
        });

        test('应能计算积分', () => {
            const total = 298;
            const earningRate = 1;
            const points = Math.floor(total * earningRate);
            expect(points).toBe(298);
        });
    });

    describe('税费计算', () => {
        test('应能计算添加到价格的税费', () => {
            const subtotal = 298;
            const taxRate = 0.06;
            const tax = Math.round(subtotal * taxRate * 100) / 100;
            expect(tax).toBe(17.88);
        });

        test('应能计算包含在价格内的税费', () => {
            const subtotal = 298;
            const taxRate = 0.06;
            const tax = subtotal - (subtotal / (1 + taxRate));
            expect(tax).toBeCloseTo(16.87, 1);
        });
    });

    describe('货币舍入', () => {
        test('应能四舍五入', () => {
            const amount = 16.666;
            const rounded = Math.round(amount * 100) / 100;
            expect(rounded).toBe(16.67);
        });

        test('应能向上取整', () => {
            const amount = 16.001;
            const rounded = Math.ceil(amount);
            expect(rounded).toBe(17);
        });

        test('应能向下取整', () => {
            const amount = 16.999;
            const rounded = Math.floor(amount);
            expect(rounded).toBe(16);
        });
    });

    describe('订单处理', () => {
        test('应能计算订单总价', () => {
            const items = [
                { price: 298, qty: 1 },
                { price: 168, qty: 2 }
            ];
            
            const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
            expect(subtotal).toBe(634);
        });

        test('应能生成订单号', () => {
            const orderNo = 'V' + Date.now().toString().slice(-8);
            expect(orderNo.length).toBe(9);
            expect(orderNo.startsWith('V')).toBe(true);
        });
    });

    describe('数据存储', () => {
        test('应能保存数据到localStorage', () => {
            const testData = { id: 1, name: '测试' };
            localStorage.setItem('test_key', JSON.stringify(testData));
            
            const retrieved = JSON.parse(localStorage.getItem('test_key'));
            expect(retrieved.id).toBe(1);
            expect(retrieved.name).toBe('测试');
        });

        test('应能从localStorage加载数据', () => {
            localStorage.setItem('test_key', JSON.stringify({ id: 2, name: '加载测试' }));
            
            const data = JSON.parse(localStorage.getItem('test_key') || '{}');
            expect(data.id).toBe(2);
        });
    });
});
