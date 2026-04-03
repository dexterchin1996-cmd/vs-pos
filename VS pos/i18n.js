/**
 * VS Pos - 国际化 (i18n) 支持
 */

const i18n = {
    currentLocale: 'zh-CN',
    
    locales: {
        'zh-CN': {
            // 应用名称
            appName: 'VS pos',
            appDescription: '专业按摩/SPA POS系统',
            
            // 导航
            nav: {
                pos: '收银台',
                tickets: '开台管理',
                invoices: '账单发票',
                items: '商品管理',
                members: '会员管理',
                employees: '员工管理',
                commissions: '佣金管理',
                reports: '营业报表',
                finance: '财务报表',
                shifts: '班次管理',
                settings: '系统设置'
            },
            
            // 操作按钮
            actions: {
                add: '添加',
                edit: '编辑',
                delete: '删除',
                save: '保存',
                cancel: '取消',
                confirm: '确认',
                search: '搜索',
                filter: '筛选',
                export: '导出',
                import: '导入',
                print: '打印',
                refresh: '刷新',
                close: '关闭',
                view: '查看',
                checkout: '结账',
                suspend: '挂单',
                resume: '取单'
            },
            
            // 状态
            status: {
                active: '正常',
                inactive: '禁用',
                pending: '待处理',
                completed: '已完成',
                cancelled: '已取消',
                paid: '已付款',
                unpaid: '待付款',
                refunded: '已退款',
                available: '空闲',
                busy: '服务中',
                off: '休息'
            },
            
            // 会员等级
            memberLevels: {
                bronze: '铜卡',
                silver: '银卡',
                gold: '金卡',
                diamond: '钻卡'
            },
            
            // 分类
            categories: {
                massage: '按摩',
                spa: 'SPA',
                beauty: '美容',
                health: '养生',
                package: '套票',
                product: '产品',
                other: '其他'
            },
            
            // 支付方式
            payments: {
                cash: '现金',
                card: '银行卡',
                wechat: '微信',
                alipay: '支付宝'
            },
            
            // 员工角色
            roles: {
                technician: '技师',
                beautician: '美容师',
                manager: '管理员',
                reception: '接待'
            },
            
            // 表单标签
            form: {
                name: '名称',
                phone: '电话',
                email: '邮箱',
                address: '地址',
                price: '价格',
                cost: '成本',
                stock: '库存',
                discount: '折扣',
                points: '积分',
                balance: '余额',
                total: '总计',
                subtotal: '小计',
                tax: '税费',
                tip: '小费',
                date: '日期',
                time: '时间',
                note: '备注'
            },
            
            // 统计标签
            stats: {
                total: '总计',
                count: '数量',
                amount: '金额',
                average: '平均'
            },
            
            // 消息
            messages: {
                saveSuccess: '保存成功',
                saveFailed: '保存失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                operationSuccess: '操作成功',
                operationFailed: '操作失败',
                confirmDelete: '确定要删除吗？',
                confirmCancel: '确定要取消吗？',
                noData: '暂无数据',
                loadFailed: '加载失败'
            },
            
            // 时间
            time: {
                today: '今天',
                yesterday: '昨天',
                thisWeek: '本周',
                thisMonth: '本月',
                lastMonth: '上月',
                now: '刚刚',
                minutesAgo: '{n}分钟前',
                hoursAgo: '{n}小时前',
                daysAgo: '{n}天前'
            }
        },
        
        'en-US': {
            // Application
            appName: 'VS pos',
            appDescription: 'Professional Massage/SPA POS System',
            
            // Navigation
            nav: {
                pos: 'POS',
                tickets: 'Tickets',
                invoices: 'Invoices',
                items: 'Items',
                members: 'Members',
                employees: 'Employees',
                commissions: 'Commissions',
                reports: 'Reports',
                finance: 'Finance',
                shifts: 'Shifts',
                settings: 'Settings'
            },
            
            // Actions
            actions: {
                add: 'Add',
                edit: 'Edit',
                delete: 'Delete',
                save: 'Save',
                cancel: 'Cancel',
                confirm: 'Confirm',
                search: 'Search',
                filter: 'Filter',
                export: 'Export',
                import: 'Import',
                print: 'Print',
                refresh: 'Refresh',
                close: 'Close',
                view: 'View',
                checkout: 'Checkout',
                suspend: 'Suspend',
                resume: 'Resume'
            },
            
            // Status
            status: {
                active: 'Active',
                inactive: 'Inactive',
                pending: 'Pending',
                completed: 'Completed',
                cancelled: 'Cancelled',
                paid: 'Paid',
                unpaid: 'Unpaid',
                refunded: 'Refunded',
                available: 'Available',
                busy: 'Busy',
                off: 'Off Duty'
            },
            
            // Member Levels
            memberLevels: {
                bronze: 'Bronze',
                silver: 'Silver',
                gold: 'Gold',
                diamond: 'Diamond'
            },
            
            // Categories
            categories: {
                massage: 'Massage',
                spa: 'SPA',
                beauty: 'Beauty',
                health: 'Health',
                package: 'Package',
                product: 'Product',
                other: 'Other'
            },
            
            // Payments
            payments: {
                cash: 'Cash',
                card: 'Card',
                wechat: 'WeChat',
                alipay: 'Alipay'
            },
            
            // Roles
            roles: {
                technician: 'Technician',
                beautician: 'Beautician',
                manager: 'Manager',
                reception: 'Receptionist'
            },
            
            // Form Labels
            form: {
                name: 'Name',
                phone: 'Phone',
                email: 'Email',
                address: 'Address',
                price: 'Price',
                cost: 'Cost',
                stock: 'Stock',
                discount: 'Discount',
                points: 'Points',
                balance: 'Balance',
                total: 'Total',
                subtotal: 'Subtotal',
                tax: 'Tax',
                tip: 'Tip',
                date: 'Date',
                time: 'Time',
                note: 'Note'
            },
            
            // Stats
            stats: {
                total: 'Total',
                count: 'Count',
                amount: 'Amount',
                average: 'Average'
            },
            
            // Messages
            messages: {
                saveSuccess: 'Save successful',
                saveFailed: 'Save failed',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                operationSuccess: 'Operation successful',
                operationFailed: 'Operation failed',
                confirmDelete: 'Are you sure to delete?',
                confirmCancel: 'Are you sure to cancel?',
                noData: 'No data',
                loadFailed: 'Load failed'
            },
            
            // Time
            time: {
                today: 'Today',
                yesterday: 'Yesterday',
                thisWeek: 'This Week',
                thisMonth: 'This Month',
                lastMonth: 'Last Month',
                now: 'Just now',
                minutesAgo: '{n} minutes ago',
                hoursAgo: '{n} hours ago',
                daysAgo: '{n} days ago'
            }
        },
        
        'zh-TW': {
            appName: 'VS pos',
            appDescription: '專業按摩/SPA POS系統',
            nav: {
                pos: '收銀台',
                tickets: '開台管理',
                invoices: '帳單發票',
                items: '商品管理',
                members: '會員管理',
                employees: '員工管理',
                commissions: '佣金管理',
                reports: '營業報表',
                finance: '財務報表',
                shifts: '班次管理',
                settings: '系統設置'
            },
            actions: {
                add: '添加',
                edit: '編輯',
                delete: '刪除',
                save: '保存',
                cancel: '取消',
                confirm: '確認',
                search: '搜索',
                filter: '篩選',
                export: '導出',
                import: '導入',
                print: '打印',
                refresh: '刷新',
                close: '關閉'
            },
            status: {
                active: '正常',
                inactive: '禁用',
                pending: '待處理',
                completed: '已完成',
                cancelled: '已取消',
                paid: '已付款',
                unpaid: '待付款',
                refunded: '已退款',
                available: '空閒',
                busy: '服務中',
                off: '休息'
            },
            memberLevels: {
                bronze: '銅卡',
                silver: '銀卡',
                gold: '金卡',
                diamond: '鑽卡'
            },
            categories: {
                massage: '按摩',
                spa: 'SPA',
                beauty: '美容',
                health: '養生',
                package: '套票',
                product: '產品',
                other: '其他'
            },
            payments: {
                cash: '現金',
                card: '銀行卡',
                wechat: '微信',
                alipay: '支付寶'
            },
            roles: {
                technician: '技師',
                beautician: '美容師',
                manager: '管理員',
                reception: '接待'
            },
            form: {
                name: '名稱',
                phone: '電話',
                email: '郵箱',
                address: '地址',
                price: '價格',
                cost: '成本',
                stock: '庫存',
                discount: '折扣',
                points: '積分',
                balance: '餘額',
                total: '總計',
                subtotal: '小計',
                tax: '稅費',
                tip: '小費',
                date: '日期',
                time: '時間',
                note: '備註'
            },
            stats: {
                total: '總計',
                count: '數量',
                amount: '金額',
                average: '平均'
            },
            messages: {
                saveSuccess: '保存成功',
                saveFailed: '保存失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                operationSuccess: '操作成功',
                operationFailed: '操作失敗',
                confirmDelete: '確定要刪除嗎？',
                confirmCancel: '確定要取消嗎？',
                noData: '暫無數據',
                loadFailed: '加載失敗'
            },
            time: {
                today: '今天',
                yesterday: '昨天',
                thisWeek: '本週',
                thisMonth: '本月',
                lastMonth: '上月',
                now: '剛剛',
                minutesAgo: '{n}分鐘前',
                hoursAgo: '{n}小時前',
                daysAgo: '{n}天前'
            }
        }
    },
    
    /**
     * 获取翻译
     * @param {string} key - 键名 (如 'nav.pos', 'actions.add')
     * @param {Object} params - 替换参数
     * @returns {string} 翻译后的文本
     */
    t(key, params = {}) {
        const locale = this.locales[this.currentLocale] || this.locales['zh-CN'];
        let value = this.getNestedValue(locale, key);
        
        if (value === undefined) {
            value = this.getNestedValue(this.locales['zh-CN'], key) || key;
        }
        
        // 替换参数
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                value = value.replace(`{${param}}`, params[param]);
            });
        }
        
        return value;
    },
    
    /**
     * 获取嵌套值
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    },
    
    /**
     * 设置语言
     */
    setLocale(locale) {
        if (this.locales[locale]) {
            this.currentLocale = locale;
            localStorage.setItem('locale', locale);
            return true;
        }
        return false;
    },
    
    /**
     * 获取当前语言
     */
    getLocale() {
        return this.currentLocale;
    },
    
    /**
     * 获取所有可用语言
     */
    getAvailableLocales() {
        return Object.keys(this.locales).map(code => ({
            code,
            name: this.locales[code].appName
        }));
    }
};

// 初始化语言设置
i18n.setLocale(localStorage.getItem('locale') || 'zh-CN');

// 快捷方法
function t(key, params) {
    return i18n.t(key, params);
}

// 导出
window.i18n = i18n;
window.t = t;
