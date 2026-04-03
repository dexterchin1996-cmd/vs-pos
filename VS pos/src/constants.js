/**
 * VS Pos - 常量配置
 */

const CONSTANTS = {
    // 应用信息
    APP: {
        NAME: 'VS pos',
        VERSION: '1.0.0',
        AUTHOR: 'VS Pos Team',
        DESCRIPTION: '专业按摩/SPA POS系统'
    },
    
    // 数据存储键名
    STORAGE_KEYS: {
        SERVICES: 'vsevice_services',
        ORDERS: 'vsevice_orders',
        TICKETS: 'vsevice_tickets',
        INVOICES: 'vsevice_invoices',
        MEMBERS: 'vsevice_members',
        EMPLOYEES: 'vsevice_employees',
        COMMISSIONS: 'vsevice_commissions',
        SUSPENDED: 'vsevice_suspended',
        SHIFTS: 'vsevice_shifts',
        SETTINGS: 'vsevice_settings',
        FEATURES: 'vsevice_features'
    },
    
    // 商品分类
    CATEGORIES: {
        massage: { name: '按摩', icon: '💆', color: '#3498db' },
        spa: { name: 'SPA', icon: '🧖', color: '#9b59b6' },
        beauty: { name: '美容', icon: '💄', color: '#e91e63' },
        health: { name: '养生', icon: '🌿', color: '#2ecc71' },
        package: { name: '套票', icon: '🎁', color: '#f39c12' },
        product: { name: '产品', icon: '🛍️', color: '#95a5a6' },
        other: { name: '其他', icon: '📦', color: '#34495e' }
    },
    
    // 会员等级
    MEMBER_LEVELS: {
        bronze: { name: '铜卡', icon: '🥉', color: '#cd7f32', discount: 0 },
        silver: { name: '银卡', icon: '🥈', color: '#c0c0c0', discount: 5 },
        gold: { name: '金卡', icon: '🥇', color: '#ffd700', discount: 10 },
        diamond: { name: '钻卡', icon: '💎', color: '#b9f2ff', discount: 15 }
    },
    
    // 员工角色
    EMPLOYEE_ROLES: {
        technician: { name: '技师', icon: '👨‍🔧', color: '#3498db' },
        beautician: { name: '美容师', icon: '💅', color: '#e91e63' },
        manager: { name: '管理员', icon: '👔', color: '#9b59b6' },
        reception: { name: '接待', icon: '🤵', color: '#2ecc71' }
    },
    
    // 员工状态
    EMPLOYEE_STATUS: {
        available: { name: '空闲', icon: '✅', color: '#2ecc71' },
        busy: { name: '服务中', icon: '⏳', color: '#f39c12' },
        off: { name: '休息', icon: '🔴', color: '#95a5a6' }
    },
    
    // 支付方式
    PAYMENTS: {
        cash: { name: '现金', icon: '💵', color: '#27ae60' },
        card: { name: '银行卡', icon: '💳', color: '#2980b9' },
        wechat: { name: '微信', icon: '💬', color: '#2ecc71' },
        alipay: { name: '支付宝', icon: '📱', color: '#3498db' }
    },
    
    // 订单状态
    ORDER_STATUS: {
        pending: { name: '待处理', icon: '⏳', color: '#f39c12' },
        inProgress: { name: '进行中', icon: '🔄', color: '#3498db' },
        completed: { name: '已完成', icon: '✅', color: '#2ecc71' },
        cancelled: { name: '已取消', icon: '❌', color: '#e74c3c' }
    },
    
    // 账单状态
    INVOICE_STATUS: {
        paid: { name: '已付款', icon: '✅', color: '#2ecc71' },
        unpaid: { name: '待付款', icon: '⏳', color: '#f39c12' },
        refunded: { name: '已退款', icon: '↩️', color: '#e74c3c' }
    },
    
    // 班次状态
    SHIFT_STATUS: {
        open: { name: '进行中', icon: '🔓', color: '#2ecc71' },
        closed: { name: '已结束', icon: '🔒', color: '#95a5a6' }
    },
    
    // 佣金状态
    COMMISSION_STATUS: {
        pending: { name: '待结算', icon: '⏳', color: '#f39c12' },
        paid: { name: '已结算', icon: '✅', color: '#2ecc71' }
    },
    
    // 开台状态
    TICKET_STATUS: {
        open: { name: '开台', icon: '🔓', color: '#3498db' },
        occupied: { name: '使用中', icon: '⏳', color: '#f39c12' },
        closed: { name: '已结账', icon: '✅', color: '#2ecc71' },
        cancelled: { name: '已取消', icon: '❌', color: '#e74c3c' }
    },
    
    // 订单来源
    CUSTOMER_TYPES: {
        walkin: { name: '散客', icon: '🚶' },
        vip: { name: 'VIP客户', icon: '⭐' },
        member: { name: '会员', icon: '👤' }
    },
    
    // 退款原因
    REFUND_REASONS: {
        customer_request: '顾客要求',
        service_issue: '服务问题',
        quality_issue: '质量问题',
        other: '其他'
    },
    
    // 打印机类型
    PRINTER_TYPES: {
        epson: { name: 'Epson TM Series', manufacturer: 'Epson' },
        star: { name: 'Star TSP Series', manufacturer: 'Star' },
        xprinter: { name: 'Xprinter', manufacturer: 'Xprinter' },
        custom: { name: '自定义/其他', manufacturer: '' }
    },
    
    // 纸张宽度
    PAPER_WIDTHS: {
        32: { name: '32字符 (58mm)', dots: 384 },
        40: { name: '40字符 (76mm)', dots: 576 },
        48: { name: '48字符 (80mm)', dots: 576 }
    },
    
    // 货币符号
    CURRENCY_SYMBOLS: {
        CNY: '¥',
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        HKD: 'HK$',
        TWD: 'NT$'
    },
    
    // 日期格式
    DATE_FORMATS: {
        FULL: 'full',
        DATE: 'date',
        TIME: 'time',
        SHORT: 'short',
        ISO: 'iso'
    },
    
    // 小费预设
    TIP_PRESETS: [
        { id: 1, name: '10%', value: 10 },
        { id: 2, name: '15%', value: 15 },
        { id: 3, name: '20%', value: 20 }
    ],
    
    // 默认设置
    DEFAULT_SETTINGS: {
        earningRate: 1,
        redeemRate: 100,
        commissionRate: 60,
        tax: { enabled: false, rate: 6, method: 'add' },
        printer: { type: 'epson', name: '', width: 32, header: '', footer: '' },
        tips: { enabled: false, percent1: 10, percent2: 15, percent3: 20, custom: true, separate: true },
        currency: { symbol: '¥', code: 'CNY', decimals: 2, rounding: 'round' }
    },
    
    // 功能开关默认值
    DEFAULT_FEATURES: {
        shifts: true,
        timeClock: true,
        openTickets: true,
        kitchenPrinters: false,
        customerDisplays: false,
        diningOptions: false,
        lowStock: true,
        negativeStock: true,
        weightBarcodes: false
    },
    
    // 金额限制
    LIMITS: {
        MAX_AMOUNT: 999999.99,
        MIN_AMOUNT: 0,
        MAX_DISCOUNT: 100,
        MAX_TIP: 50,
        MAX_POINTS: 9999999
    },
    
    // 输入验证正则
    REGEX: {
        PHONE: /^1[3-9]\d{9}$/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ID_CARD: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
        BARCODE: /^[0-9]{8,13}$/,
        INTEGER: /^\d+$/,
        DECIMAL: /^\d+(\.\d{1,2})?$/
    },
    
    // 快捷键
    HOTKEYS: {
        NEW_ORDER: 'Ctrl+N',
        SEARCH: 'Ctrl+F',
        CHECKOUT: 'Ctrl+Enter',
        SUSPEND: 'Ctrl+S',
        CANCEL: 'Escape',
        PRINT: 'Ctrl+P'
    },
    
    // 图标映射
    ICONS: {
        add: '➕',
        edit: '✏️',
        delete: '🗑️',
        search: '🔍',
        filter: '🔽',
        export: '📥',
        import: '📤',
        print: '🖨️',
        refresh: '🔄',
        settings: '⚙️',
        help: '❓',
        warning: '⚠️',
        info: 'ℹ️',
        success: '✅',
        error: '❌',
        loading: '⏳',
        empty: '📭',
        cart: '🛒',
        user: '👤',
        money: '💰',
        chart: '📊',
        calendar: '📅',
        clock: '⏰',
        phone: '📱',
        mail: '📧',
        address: '📍'
    },
    
    // 动画时长 (ms)
    ANIMATION: {
        FAST: 150,
        NORMAL: 300,
        SLOW: 500
    },
    
    // 响应式断点
    BREAKPOINTS: {
        XS: 480,
        SM: 576,
        MD: 768,
        LG: 992,
        XL: 1200
    }
};

// 冻结常量对象防止修改
Object.freeze(CONSTANTS.APP);
Object.freeze(CONSTANTS.STORAGE_KEYS);
Object.freeze(CONSTANTS.LIMITS);
Object.freeze(CONSTANTS.REGEX);
Object.freeze(CONSTANTS.HOTKEYS);
Object.freeze(CONSTANTS.ANIMATION);
Object.freeze(CONSTANTS.BREAKPOINTS);

// 导出到全局
window.CONSTANTS = CONSTANTS;
