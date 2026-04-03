/**
 * VS Pos - 常用工具函数库
 */

/**
 * 格式化金额
 * @param {number} amount - 金额
 * @param {string} symbol - 货币符号
 * @returns {string} 格式化后的金额
 */
function formatMoney(amount, symbol = '¥') {
    return `${symbol}${parseFloat(amount || 0).toFixed(2)}`;
}

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} format - 格式类型
 * @returns {string} 格式化后的日期
 */
function formatDate(date, format = 'full') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';
    
    switch(format) {
        case 'date':
            return d.toLocaleDateString('zh-CN');
        case 'time':
            return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        case 'short':
            return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        case 'full':
        default:
            return d.toLocaleString('zh-CN');
    }
}

/**
 * 格式化日期差
 * @param {string|Date} date - 日期
 * @returns {string} 相对时间
 */
function formatDateDiff(date) {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return formatDate(date, 'date');
}

/**
 * 生成唯一ID
 * @param {string} prefix - 前缀
 * @returns {string} 唯一ID
 */
function generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}${timestamp}${random}`.toUpperCase();
}

/**
 * 生成订单号
 * @returns {string} 订单号
 */
function generateOrderNo() {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `V${y}${m}${d}${rand}`;
}

/**
 * 生成账单号
 * @returns {string} 账单号
 */
function generateInvoiceNo() {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-8);
    return `INV${timestamp}`;
}

/**
 * 深拷贝对象
 * @param {Object} obj - 对象
 * @returns {Object} 拷贝后的对象
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
}

/**
 * 防抖函数
 * @param {Function} func - 函数
 * @param {number} wait - 等待时间
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 函数
 * @param {number} limit - 时间限制
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 验证手机号
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 */
function validatePhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

/**
 * 验证邮箱
 * @param {string} email - 邮箱
 * @returns {boolean} 是否有效
 */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 验证金额
 * @param {string|number} amount - 金额
 * @returns {boolean} 是否有效
 */
function validateMoney(amount) {
    return !isNaN(parseFloat(amount)) && parseFloat(amount) >= 0;
}

/**
 * HTML转义
 * @param {string} text - 文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * 本地存储封装
 */
const Storage = {
    /**
     * 设置数据
     * @param {string} key - 键名
     * @param {any} value - 数据
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },
    
    /**
     * 获取数据
     * @param {string} key - 键名
     * @param {any} defaultValue - 默认值
     * @returns {any} 数据
     */
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },
    
    /**
     * 删除数据
     * @param {string} key - 键名
     */
    remove(key) {
        localStorage.removeItem(key);
    },
    
    /**
     * 清空所有数据
     */
    clear() {
        localStorage.clear();
    },
    
    /**
     * 获取所有键名
     * @returns {string[]} 键名数组
     */
    keys() {
        return Object.keys(localStorage);
    },
    
    /**
     * 获取使用空间
     * @returns {number} 字节数
     */
    size() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    }
};

/**
 * 数字动画
 * @param {HTMLElement} element - 元素
 * @param {number} target - 目标数字
 * @param {number} duration - 动画时长(ms)
 */
function animateNumber(element, target, duration = 1000) {
    const start = parseFloat(element.textContent) || 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;
        
        element.textContent = Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Toast 提示
 * @param {string} message - 消息
 * @param {string} type - 类型 (success/error/warning/info)
 * @param {number} duration - 显示时长
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${getToastIcon(type)}</span>
        <span class="toast-message">${message}</span>
    `;
    
    const container = document.getElementById('toast-container') || createToastContainer();
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.innerHTML = `
        <style>
            #toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .toast {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }
            .toast.show {
                opacity: 1;
                transform: translateX(0);
            }
            .toast-success { border-left: 4px solid #2ecc71; }
            .toast-error { border-left: 4px solid #e74c3c; }
            .toast-warning { border-left: 4px solid #f39c12; }
            .toast-info { border-left: 4px solid #3498db; }
            .toast-icon { font-size: 18px; }
            .toast-message { font-size: 14px; }
        </style>
    `;
    document.body.appendChild(container);
    return container;
}

/**
 * 确认对话框
 * @param {string} message - 消息
 * @returns {Promise<boolean>} 用户选择
 */
function confirmAsync(message) {
    return new Promise((resolve) => {
        showModal('确认', `
            <div style="text-align:center;padding:20px;">
                <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
                <p style="font-size:16px;margin-bottom:24px;">${message}</p>
                <div style="display:flex;gap:12px;justify-content:center;">
                    <button class="btn btn-outline" onclick="closeModal();resolve(false);">取消</button>
                    <button class="btn btn-primary" onclick="closeModal();resolve(true);">确定</button>
                </div>
            </div>
        `);
    });
}

/**
 * 打印函数
 * @param {string} content - 打印内容
 */
function printContent(content) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>打印</title>
            <style>
                body { font-family: 'SimSun', monospace; padding: 20px; }
                pre { white-space: pre-wrap; font-family: inherit; }
            </style>
        </head>
        <body>${content}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

/**
 * 下载文件
 * @param {string} content - 文件内容
 * @param {string} filename - 文件名
 * @param {string} type - 文件类型
 */
function downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * 复制到剪贴板
 * @param {string} text - 文本
 * @returns {Promise<boolean>} 是否成功
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('已复制到剪贴板', 'success');
        return true;
    } catch (err) {
        console.error('Copy failed:', err);
        return false;
    }
}

/**
 * 获取URL参数
 * @param {string} name - 参数名
 * @returns {string|null} 参数值
 */
function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * 设置URL参数
 * @param {Object} params - 参数对象
 */
function setUrlParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key]);
    });
    window.history.pushState({}, '', url);
}

/**
 * 导出为CSV
 * @param {Array} data - 数据数组
 * @param {string[]} headers - 表头
 * @param {string} filename - 文件名
 */
function exportToCSV(data, headers, filename = 'export.csv') {
    const csv = [
        headers.join(','),
        ...data.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const BOM = '\uFEFF';
    downloadFile(BOM + csv, filename, 'text/csv;charset=utf-8');
}

/**
 * 从CSV导入
 * @param {string} text - CSV文本
 * @returns {Array} 解析后的数据
 */
function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map(line => {
        const cells = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                cells.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        cells.push(current.trim());
        return cells;
    });
}

/**
 * 计算百分比
 * @param {number} value - 数值
 * @param {number} total - 总数
 * @param {number} decimals - 小数位
 * @returns {string} 百分比字符串
 */
function calcPercentage(value, total, decimals = 1) {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(decimals)}%`;
}

/**
 * 随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机数
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 随机字符串
 * @param {number} length - 长度
 * @returns {string} 随机字符串
 */
function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * 颜色工具
 */
const ColorUtils = {
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },
    
    lighten(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        const amt = Math.round(2.55 * percent);
        return this.rgbToHex(
            Math.min(255, rgb.r + amt),
            Math.min(255, rgb.g + amt),
            Math.min(255, rgb.b + amt)
        );
    },
    
    darken(hex, percent) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        const amt = Math.round(2.55 * percent);
        return this.rgbToHex(
            Math.max(0, rgb.r - amt),
            Math.max(0, rgb.g - amt),
            Math.max(0, rgb.b - amt)
        );
    }
};

// 导出到全局
window.Utils = {
    formatMoney,
    formatDate,
    formatDateDiff,
    generateId,
    generateOrderNo,
    generateInvoiceNo,
    deepClone,
    debounce,
    throttle,
    validatePhone,
    validateEmail,
    validateMoney,
    escapeHtml,
    Storage,
    animateNumber,
    showToast,
    confirmAsync,
    printContent,
    downloadFile,
    copyToClipboard,
    getUrlParam,
    setUrlParams,
    exportToCSV,
    parseCSV,
    calcPercentage,
    randomInt,
    randomString,
    ColorUtils
};
