# VS Pos 性能优化指南

## 目录

- [加载性能](#加载性能)
- [渲染性能](#渲染性能)
- [存储性能](#存储性能)
- [内存管理](#内存管理)
- [网络优化](#网络优化)

---

## 加载性能

### 1. 延迟加载非关键资源

```javascript
// 非关键 CSS 延迟加载
const loadStyles = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'optional-styles.css';
    document.head.appendChild(link);
};

// 首屏渲染后再加载
if (document.readyState === 'complete') {
    loadStyles();
} else {
    window.addEventListener('load', loadStyles);
}
```

### 2. 代码分割

将大型函数库分离：

```javascript
// utils.js - 工具函数
// constants.js - 常量配置
// demo-data.js - 演示数据生成器
// api-reference.js - API 文档
```

### 3. 压缩资源

```bash
# 使用丑化工具压缩 HTML
npx html-minifier --collapse-whitespace index.html

# 使用 UglifyJS 压缩 JavaScript
npx uglify-js src/*.js -o dist/*.min.js
```

---

## 渲染性能

### 1. 虚拟滚动 (大量数据)

```javascript
function virtualScroll(container, items, itemHeight, renderItem) {
    const scrollTop = container.scrollTop;
    const viewportHeight = container.clientHeight;
    
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(viewportHeight / itemHeight) + 2,
        items.length
    );
    
    const visibleItems = items.slice(startIndex, endIndex);
    const offset = startIndex * itemHeight;
    
    container.innerHTML = visibleItems.map(renderItem).join('');
    container.style.transform = `translateY(${offset}px)`;
}
```

### 2. 文档片段批量操作

```javascript
// ❌ 错误: 每次都触发重排
items.forEach((item, i) => {
    const div = document.createElement('div');
    div.textContent = item.name;
    container.appendChild(div);
});

// ✅ 正确: 使用 DocumentFragment 批量操作
const fragment = document.createDocumentFragment();
items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.name;
    fragment.appendChild(div);
});
container.appendChild(fragment);
```

### 3. 避免强制重排

```javascript
// ❌ 错误: 多次读取触发多次重排
element.style.height = element.scrollHeight + 'px';
element.style.width = element.scrollWidth + 'px';
element.style.margin = '10px';

// ✅ 正确: 批量读取和写入
const height = element.scrollHeight;
const width = element.scrollWidth;
element.style.height = height + 'px';
element.style.width = width + 'px';
```

---

## 存储性能

### 1. 分批存储大数组

```javascript
function saveDataInBatches(key, data, batchSize = 100) {
    const batches = Math.ceil(data.length / batchSize);
    
    for (let i = 0; i < batches; i++) {
        const batch = data.slice(i * batchSize, (i + 1) * batchSize);
        localStorage.setItem(`${key}_batch_${i}`, JSON.stringify(batch));
    }
    
    localStorage.setItem(`${key}_meta`, JSON.stringify({
        total: data.length,
        batches,
        batchSize
    }));
}
```

### 2. 增量更新

```javascript
// 只更新变化的部分，而不是整个数组
function updateItemInArray(key, itemId, updates) {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    const index = data.findIndex(item => item.id === itemId);
    
    if (index !== -1) {
        data[index] = { ...data[index], ...updates };
        localStorage.setItem(key, JSON.stringify(data));
    }
}
```

### 3. 使用 IndexedDB 存储大量数据

```javascript
const DB_NAME = 'vsevice';
const DB_VERSION = 1;
const STORE_NAME = 'data';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
    });
}

async function saveToIndexedDB(data) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    data.forEach(item => store.put(item));
    
    return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}
```

---

## 内存管理

### 1. 清理事件监听器

```javascript
// ❌ 内存泄漏
function addHandler() {
    document.addEventListener('click', handler);
}

// ✅ 正确清理
const handler = () => { /* ... */ };
function addHandler() {
    document.addEventListener('click', handler);
}
function removeHandler() {
    document.removeEventListener('click', handler);
}
```

### 2. 使用 WeakMap 保存 DOM 引用

```javascript
// ❌ 可能导致内存泄漏
const cache = new Map();
function processElement(element, data) {
    cache.set(element, data);
    // ...
}

// ✅ 使用 WeakMap，DOM 被删除时自动清理
const cache = new WeakMap();
function processElement(element, data) {
    cache.set(element, data);
    // ...
}
```

### 3. 定期清理无用数据

```javascript
function cleanupOldData(key, maxAge = 30) {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    const cutoff = Date.now() - maxAge * 24 * 60 * 60 * 1000;
    
    const filtered = data.filter(item => {
        const date = new Date(item.createdAt).getTime();
        return date > cutoff;
    });
    
    localStorage.setItem(key, JSON.stringify(filtered));
    return filtered.length;
}
```

---

## 网络优化

### 1. 缓存 API 响应

```javascript
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

async function fetchWithCache(url) {
    const cached = cache.get(url);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    cache.set(url, { data, timestamp: Date.now() });
    return data;
}
```

### 2. 防抖和节流

```javascript
// 防抖: 等待最后一次调用后执行
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 节流: 固定间隔执行
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用示例
const handleSearch = debounce((query) => {
    searchAPI(query);
}, 300);

const handleScroll = throttle(() => {
    updateScrollPosition();
}, 100);
```

### 3. 懒加载图片

```javascript
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => observer.observe(img));
}
```

---

## 性能监测

### 使用 Performance API

```javascript
// 测量关键指标
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
});

observer.observe({ entryTypes: ['measure', 'navigation'] });

// 测量特定操作
performance.mark('operation-start');
// 执行操作
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');
```

### 帧率监测

```javascript
let frames = 0;
let lastTime = performance.now();

function checkFPS() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
        console.log(`FPS: ${frames}`);
        frames = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(checkFPS);
}

requestAnimationFrame(checkFPS);
```

---

## 最佳实践清单

- [ ] 减少 DOM 节点数量
- [ ] 使用 CSS transforms 代替 top/left
- [ ] 批量 DOM 操作
- [ ] 使用 DocumentFragment
- [ ] 避免布局抖动
- [ ] 合理使用节流防抖
- [ ] 清理无用事件监听
- [ ] 分批存储大数组
- [ ] 使用虚拟滚动处理长列表
- [ ] 压缩静态资源
- [ ] 启用浏览器缓存
- [ ] 监测核心 Web Vitals
