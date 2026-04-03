# VS pos

<div align="center">

![VS Pos Logo](https://img.shields.io/badge/VS%20pos-POS%20System-3498db?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Web%20App-orange?style=for-the-badge)

**专业按摩/SPA/POS系统** - 一款专为服务行业设计的开源POS系统

[功能特性](#功能特性) • [快速开始](#快速开始) • [开发文档](#开发文档) • [贡献指南](#贡献指南) • [更新日志](#更新日志)

</div>

---

## 功能特性

### 🎯 核心模块
| 模块 | 说明 |
|------|------|
| 🏠 收银台 | 快速结账、多支付方式、会员折扣、小费功能 |
| 🎫 开台管理 | 技师排钟、房间管理、服务状态跟踪 |
| 🧾 账单发票 | 完整账单记录、退款处理、批量打印 |
| 📦 商品管理 | SKU/条码、库存预警、成本核算、佣金设置 |
| 👥 会员管理 | 多级会员卡、积分系统、余额管理、消费记录 |
| 👤 员工管理 | 考勤打卡、业绩统计、工资结算 |
| 💰 佣金管理 | 自动计算佣金、结算追踪 |
| 📊 营业报表 | 销售统计、趋势分析、数据导出 |
| 💵 财务报表 | 支付方式分析、收支明细 |
| ⏰ 班次管理 | 交接班记录、现金盘点 |

### ⚙️ 系统设置
- 🏪 店铺信息配置
- ⚡ 营业规则设置
- 💳 支付方式管理
- 🧾 收据模板设计
- 🎛️ 功能开关控制
- 🧾 税费配置
- 🖨️ 打印机设置
- 💰 小费规则
- 💱 货币设置
- 📥 数据导入导出

---

## 快速开始

### 方式一: 直接打开
```bash
# 双击打开
src/index.html
```

### 方式二: 使用开发服务器
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方式三: VS Code 调试
1. 用 VS Code 打开项目
2. 按 `F5` 启动调试

---

## 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式设计 |
| JavaScript | 业务逻辑 |
| localStorage | 数据持久化 |
| VS Code | 开发环境 |

---

## 项目结构

```
VS pos/
├── src/
│   ├── index.html          # 主程序
│   ├── constants.js       # 常量配置
│   ├── utils.js          # 工具函数
│   ├── i18n.js           # 国际化
│   ├── demo-data.js      # 演示数据
│   └── types/            # 类型定义
├── .vscode/              # VS Code 配置
├── docs/                 # 文档
├── tests/                # 测试
└── package.json          # npm 配置
```

---

## 开发文档

| 文档 | 说明 |
|------|------|
| [开发者指南](docs/DEVELOPER.md) | 开发入门指南 |
| [API 参考](src/api-reference.js) | 函数API文档 |
| [性能优化](docs/PERFORMANCE.md) | 性能优化指南 |
| [安全指南](docs/SECURITY.md) | 安全最佳实践 |
| [贡献指南](docs/CONTRIBUTING.md) | 如何贡献代码 |

---

## 开发命令

```bash
# 安装依赖
npm install

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行测试
npm test

# 开发服务器
npm run dev
```

---

## VS Code 配置

项目已配置完整的 VS Code 开发环境：

| 配置 | 说明 |
|------|------|
| Prettier | 代码格式化 |
| ESLint | 语法检查 |
| 代码片段 | 20+ VS Pos 专用片段 |
| 调试配置 | Chrome/Edge 调试 |

---

## 截图预览

<!-- 截图占位 -->

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

详细指南请阅读 [CONTRIBUTING.md](docs/CONTRIBUTING.md)

---

## 更新日志

### v1.0.0 (2024-01-01)
- ✅ 初始版本发布
- ✅ 11个核心模块
- ✅ 10个设置页面
- ✅ localStorage 数据持久化
- ✅ 完整的开发工具链

详见 [CHANGELOG.md](docs/CHANGELOG.md)

---

## 许可证

本项目采用 ISC 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 联系方式

- 问题反馈: [GitHub Issues](https://github.com/vspos/vs-pos/issues)
- 功能建议: [GitHub Discussions](https://github.com/vspos/vs-pos/discussions)

---

<div align="center">

**如果您觉得这个项目有用，请给一个 ⭐**

</div>
