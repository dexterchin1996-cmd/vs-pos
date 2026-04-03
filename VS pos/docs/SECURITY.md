# VS Pos 安全指南

## 目录

- [数据安全](#数据安全)
- [XSS 防护](#xss-防护)
- [CSRF 防护](#csrf-防护)
- [输入验证](#输入验证)
- [敏感信息处理](#敏感信息处理)

---

## 数据安全

### 1. localStorage 安全限制

```javascript
// ❌ 不要存储敏感信息
localStorage.setItem('user', JSON.stringify({
    password: '123456',
    creditCard: '4111111111111111'
}));

// ✅ 只存储必要数据，使用加密
const safeData = {
    id: user.id,
    name: user.name,
    token: encryptedToken // 使用后即失效的令牌
};
localStorage.setItem('session', JSON.stringify(safeData));
```

### 2. 定期清理敏感数据

```javascript
function clearSensitiveData() {
    // 清除所有 localStorage
    localStorage.clear();
    
    // 或选择性清除
    const keysToKeep = ['theme', 'preferences'];
    Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
        }
    });
}

// 页面关闭时清理
window.addEventListener('beforeunload', clearSensitiveData);
```

### 3. 数据加密存储

```javascript
// 简单加密 (生产环境应使用更安全的加密库如 CryptoJS)
const SECRET_KEY = 'your-secret-key';

function encrypt(data) {
    return btoa(JSON.stringify(data).split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
    ).join('')));
}

function decrypt(encrypted) {
    return JSON.parse(atob(encrypted).split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
    ).join('')));
}

// 使用
const safeData = encrypt(sensitiveData);
localStorage.setItem('encrypted', safeData);
```

---

## XSS 防护

### 1. HTML 转义

```javascript
// ❌ 危险: 直接插入用户输入
element.innerHTML = userInput;

// ✅ 安全: 转义后再插入
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
element.innerHTML = escapeHtml(userInput);

// ✅ 更安全: 使用 textContent
element.textContent = userInput;
```

### 2. 模板字符串安全

```javascript
// ❌ 危险
const html = `<div>${userInput}</div>`;

// ✅ 安全
const html = `<div>${escapeHtml(userInput)}</div>`;
```

### 3. 使用 DOMPurify 净化 HTML

```html
<script src="dompurify.min.js"></script>
```

```javascript
// 净化 HTML
const clean = DOMPurify.sanitize(userHtml, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: ['href']
});
```

---

## CSRF 防护

### 1. 使用 SameSite Cookie

```javascript
// 设置 SameSite 属性
document.cookie = "session=xxx; SameSite=Strict; Secure";
```

### 2. 验证请求来源

```javascript
function verifyOrigin() {
    const origin = window.location.origin;
    const allowedOrigins = ['https://yourdomain.com'];
    return allowedOrigins.includes(origin);
}

// 在关键操作前验证
if (!verifyOrigin()) {
    console.error('请求来源不合法');
    return;
}
```

---

## 输入验证

### 1. 验证函数

```javascript
const Validator = {
    // 手机号
    phone(phone) {
        return /^1[3-9]\d{9}$/.test(phone);
    },
    
    // 邮箱
    email(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // 金额
    money(amount) {
        return /^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) >= 0;
    },
    
    // 整数
    integer(num) {
        return /^\d+$/.test(num);
    },
    
    // 长度限制
    length(str, min, max) {
        return str.length >= min && str.length <= max;
    },
    
    // 自定义正则
    pattern(str, regex) {
        return regex.test(str);
    }
};

// 使用
function processInput(input) {
    if (!Validator.phone(input.phone)) {
        return { valid: false, error: '手机号格式不正确' };
    }
    if (!Validator.money(input.amount)) {
        return { valid: false, error: '金额格式不正确' };
    }
    return { valid: true };
}
```

### 2. 消毒输入

```javascript
function sanitizeInput(input) {
    return input
        .trim()                    // 去除首尾空格
        .replace(/[<>]/g, '')    // 移除危险字符
        .substring(0, 1000);     // 限制长度
}
```

---

## 敏感信息处理

### 1. 脱敏显示

```javascript
function maskPhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

function maskCard(card) {
    return card.replace(/\d{12}(\d{4})/, '**** **** **** $1');
}

function maskName(name) {
    if (name.length <= 2) return '*' + name.slice(-1);
    return name.slice(0, -1) + '*';
}

// 使用
console.log(maskPhone('13812345678')); // 138****5678
console.log(maskCard('6222021234567890')); // **** **** **** 7890
```

### 2. 安全日志

```javascript
// ❌ 记录敏感信息
console.log('用户登录:', user.password);

// ✅ 只记录必要信息
console.log('用户登录:', { id: user.id, time: new Date() });
```

### 3. 错误处理不泄露信息

```javascript
// ❌ 错误: 详细错误信息
catch (error) {
    showError(`数据库错误: ${error.message}\nSQL: ${error.sql}`);
}

// ✅ 正确: 用户友好消息
catch (error) {
    console.error(error); // 记录到日志
    showError('操作失败，请稍后重试');
}
```

---

## 安全检查清单

- [ ] 不在 localStorage 存储密码或信用卡号
- [ ] 用户输入使用 escapeHtml 转义
- [ ] 使用 textContent 代替 innerHTML
- [ ] 验证所有用户输入
- [ ] 限制输入长度
- [ ] 敏感数据显示时脱敏
- [ ] 错误信息不泄露内部细节
- [ ] 定期清理过期数据
- [ ] 使用 HTTPS
- [ ] 设置 CSP (Content Security Policy)

---

## CSP 配置示例

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self' https://api.example.com;
">
```
