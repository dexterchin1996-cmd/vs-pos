# VS Pos 贡献指南

感谢您对 VS Pos 的关注！本文档将帮助您了解如何参与项目贡献。

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [提交规范](#提交规范)

## 行为准则

我们希望所有贡献者都能遵守以下准则：

1. **尊重他人** - 保持友好和专业的沟通
2. **包容多元** - 欢迎不同背景的贡献者
3. **建设性反馈** - 提供具体和建设性的建议
4. **保护隐私** - 不泄露用户或客户信息

## 如何贡献

### 报告问题
如果您发现问题，请提供以下信息：
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息（浏览器版本等）

### 提交代码

#### 步骤 1: Fork 项目
点击项目页面右上角的 "Fork" 按钮。

#### 步骤 2: 克隆代码
```bash
git clone https://github.com/your-username/vs-pos.git
cd vs-pos
```

#### 步骤 3: 创建分支
```bash
git checkout -b feature/your-feature-name
```

#### 步骤 4: 进行修改
按照代码规范进行开发。

#### 步骤 5: 测试
```bash
npm run lint
npm run format
```

#### 步骤 6: 提交
```bash
git add .
git commit -m "feat: 添加新功能"
```

#### 步骤 7: 推送
```bash
git push origin feature/your-feature-name
```

#### 步骤 8: 创建 Pull Request

## 开发流程

### 1. 需求分析
- 理解需求目的
- 评估影响范围
- 制定开发计划

### 2. 代码开发
- 遵循代码规范
- 添加必要注释
- 编写测试用例

### 3. 代码审查
- 自检代码
- 同事审查
- 修复问题

### 4. 合并发布
- 合并到主分支
- 更新文档
- 发布版本

## 代码规范

### HTML 规范
```html
<!-- 使用语义化标签 -->
<section>
    <header>
        <h1>标题</h1>
    </header>
    <main>
        <!-- 内容 -->
    </main>
</section>

<!-- 属性顺序 -->
<input type="text" id="name" class="form-input" placeholder="请输入">

<!-- 缩进使用 4 空格 -->
<div>
    <span>内容</span>
</div>
```

### CSS 规范
```css
/* 使用有意义的类名 */
.nav-item { }
.btn-primary { }
.table-header { }

/* 属性顺序 */
.selector {
    /* 定位 */
    position: relative;
    top: 0;
    
    /* 显示 */
    display: flex;
    visibility: visible;
    
    /* 盒模型 */
    width: 100px;
    margin: 10px;
    padding: 10px;
    
    /* 样式 */
    background: #fff;
    color: #333;
    font-size: 14px;
}
```

### JavaScript 规范
```javascript
// 变量命名
const maxCount = 100;
let currentIndex = 0;

// 函数命名
function renderItemsTable() { }
function showAddItemModal() { }

// 常量
const STORAGE_KEY = 'vsevice_services';

// 箭头函数
const multiply = (a, b) => a * b;

// 模板字符串
const html = `<div>${name}</div>`;

// 注释
/**
 * 函数说明
 * @param {string} param - 参数说明
 * @returns {Object} 返回值说明
 */
function example(param) {
    return { param };
}
```

## 提交规范

### 格式
```
<type>: <subject>

<body>

<footer>
```

### 类型
| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复问题 |
| docs | 文档更新 |
| style | 代码格式 |
| refactor | 重构 |
| test | 测试相关 |
| chore | 构建/工具 |

### 示例
```
feat: 添加商品搜索功能

添加商品名称和条码搜索功能
- 支持模糊搜索
- 高亮匹配文字

Closes #123
```

## 分支管理

### 分支命名
- `feature/功能名称` - 新功能
- `fix/问题描述` - 修复问题
- `docs/文档类型` - 文档更新
- `refactor/范围` - 重构

### 示例
```
feature/member-card
fix/cart-calculation
docs/api-reference
```

## 测试

### 单元测试
```javascript
describe('商品管理', () => {
    test('应能添加商品', () => {
        // 测试代码
    });
});
```

### 运行测试
```bash
npm test
```

## 许可证

通过贡献代码，您同意将您的代码按照项目的许可证发布。

---

再次感谢您的贡献！
