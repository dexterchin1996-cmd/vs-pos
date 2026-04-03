# VS Code 配置指南

## 📦 已安装扩展

### 必须安装 (Recommended)
| 扩展 | 功能 | 安装命令 |
|------|------|----------|
| Prettier | 代码格式化 | `ext install esbenp.prettier-vscode` |
| ESLint | JavaScript 语法检查 | `ext install dbaeumer.vscode-eslint` |

### 推荐安装 (Optional)
| 扩展 | 功能 | 安装命令 |
|------|------|----------|
| Auto Rename Tag | 自动重命名 HTML 标签 | `ext install formulahendry.auto-rename-tag` |
| HTML CSS Support | CSS 类名补全 | `ext install ecmel.vscode-html-css` |
| Path Intellisense | 文件路径补全 | `ext install christian-kohler.path-intellisense` |
| Live Server | 本地开发服务器 | `ext install ritwickdey.liveserver` |
| JavaScript Snippets | ES6 代码片段 | `ext install xabikos.JavaScriptSnippets` |
| Auto Close Tag | 自动闭合标签 | `ext install formulahendry.auto-close-tag` |
| Bracket Pair Colorizer | 括号颜色高亮 | `ext install CoenraadS.bracket-pair-colorizer` |
| GitLens | Git 可视化 | `ext install eamodio.gitlens` |
| Todo Tree | TODO 注释树 | `ext install Gruntfuggly.todo-tree` |

## ⚙️ 设置说明

### 保存时自动格式化
```json
"editor.formatOnSave": true
```

### Tab 大小
```json
"editor.tabSize": 4
```

### 字体配置
```json
"editor.fontFamily": "'Cascadia Code', 'Fira Code', Consolas"
"editor.fontSize": 14
"editor.fontLigatures": true
```

### 快捷键

| 功能 | Windows | Mac |
|------|---------|-----|
| 格式化代码 | `Shift + Alt + F` | `Shift + Option + F` |
| 快速修复 | `Ctrl + .` | `Cmd + .` |
| 代码补全 | `Ctrl + Space` | `Cmd + Space` |
| 跳转到定义 | `F12` | `F12` |
| 查找所有引用 | `Shift + F12` | `Shift + F12` |
| 重命名符号 | `F2` | `F2` |
| 折叠代码 | `Ctrl + Shift + [` | `Cmd + Shift + [` |
| 展开代码 | `Ctrl + Shift + ]` | `Cmd + Shift + ]` |
| 切换注释 | `Ctrl + /` | `Cmd + /` |

## 🚀 调试

### 启动调试
1. 按 `F5` 打开调试面板
2. 选择 "调试: VS pos"
3. 在 Chrome/Edge 中打开文件

### 断点调试
- 点击代码行号左侧设置断点
- 使用 `console.log()` 输出调试信息

## 📝 代码片段

### 使用方法
1. 按 `Ctrl + Shift + P` 打开命令面板
2. 输入 `Snippet`
3. 选择 "配置用户代码片段"
4. 选择 `javascript.json` 或 `html.json`

### VS Pos 专用片段

| 前缀 | 说明 | 示例 |
|------|------|------|
| `vsf` | 函数模板 | 生成基础函数结构 |
| `vsrender` | 数据渲染 | 生成表格渲染函数 |
| `vsmodal` | 模态框 | 生成弹窗表单 |
| `vsstat` | 统计卡片 | 生成统计数据卡片 |
| `vsfilter` | 筛选栏 | 生成搜索筛选栏 |
| `vsnav` | 导航项 | 生成侧边栏导航 |

## 📋 任务 (Tasks)

按 `Ctrl + Shift + P` 输入：

```
Tasks: Open VS pos
```
在浏览器中打开系统

```
Tasks: 格式化代码
```
使用 Prettier 格式化代码

```
Tasks: ESLint 检查
```
运行代码检查

## 🎨 主题推荐

### 深色主题
- One Dark Pro
- Dracula Official
- GitHub Dark
- Material Theme

### 浅色主题
- GitHub Light
- Solarized Light
- Atom One Light

## 📁 工作区设置

项目级别的 `.vscode/settings.json` 包含：
- 文件关联
- 格式化规则
- 代码片段
- 调试配置

## 🔧 高级配置

### 添加自定义快捷键
1. `File > Preferences > Keyboard Shortcuts`
2. 搜索命令
3. 按键绑定

### 自定义代码片段
编辑 `.vscode/*.code-snippets` 文件

### 配置 ESLint 规则
编辑 `.eslintrc.json`

### 配置 Prettier 规则
编辑 `.prettierrc`

## 💡 提示

1. **安装扩展后重启 VS Code**
2. **使用 `Ctrl + Shift + P` 快速访问所有命令**
3. **按 `F1` 查看所有可用的命令**
4. **右键点击可以获得更多选项**
5. **使用 `Alt + Click` 多行编辑**
6. **使用 `Ctrl + D` 选择下一个相同内容**

## 🐛 故障排除

### 格式化不生效
1. 检查是否安装 Prettier
2. 确保 `settings.json` 中设置了 `editor.formatOnSave`
3. 按 `Shift + Alt + F` 手动格式化

### ESLint 不工作
1. 安装 ESLint 扩展
2. 检查 `.eslintrc.json` 配置
3. 重启 VS Code

### 代码补全不显示
1. 检查 `javascript.suggest.autoImports` 设置
2. 确保没有禁用 IntelliSense

## 📚 学习资源

- [VS Code 官方文档](https://code.visualstudio.com/docs)
- [ESLint 配置指南](https://eslint.org/docs/user-guide/configuring)
- [Prettier 配置选项](https://prettier.io/docs/en/options.html)
- [VS Code API 文档](https://code.visualstudio.com/api)
