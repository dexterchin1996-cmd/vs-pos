# VS pos - Git 初始化指南

## 1. 安装 Git

### Windows
下载并安装: https://git-scm.com/download/win

安装选项:
- ✅ 使用 Git from the command line
- ✅ 使用 Windows 的 OpenSSL library
- ✅ Checkout Windows-style, commit Unix-style line endings

### Mac
```bash
# 使用 Homebrew
brew install git
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
```

---

## 2. 初始化本地仓库

打开终端/命令提示符，进入项目目录:

```bash
cd "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos"

# 初始化仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: VS pos v1.0.0"
```

---

## 3. 创建 GitHub 仓库 (可选)

### 方式一: GitHub 网页
1. 访问 https://github.com/new
2. 填写仓库名称: `vs-pos`
3. 选择 Private (私有) 或 Public (公开)
4. 点击 "Create repository"

### 方式二: GitHub CLI
```bash
# 安装 GitHub CLI
winget install GitHub.cli

# 登录
gh auth login

# 创建仓库
gh repo create vs-pos --public --source=.
```

### 方式三: Git 命令行
```bash
# 添加远程仓库 (替换为您的仓库地址)
git remote add origin https://github.com/YOUR_USERNAME/vs-pos.git

# 推送代码
git branch -M main
git push -u origin main
```

---

## 4. 首次推送代码

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/vs-pos.git

# 创建主分支
git branch -M main

# 推送到远程
git push -u origin main

# 验证
git remote -v
```

---

## 5. 日常使用

### 查看状态
```bash
git status
```

### 添加修改
```bash
git add .
# 或添加特定文件
git add src/index.html
```

### 提交
```bash
git commit -m "描述你的修改"
```

### 推送
```bash
git push
```

### 拉取
```bash
git pull
```

---

## 6. 分支管理

### 创建分支
```bash
git checkout -b feature/new-feature
```

### 切换分支
```bash
git checkout main
```

### 合并分支
```bash
git checkout main
git merge feature/new-feature
```

---

## 7. 常用命令速查

| 命令 | 说明 |
|------|------|
| `git init` | 初始化仓库 |
| `git clone url` | 克隆仓库 |
| `git status` | 查看状态 |
| `git add .` | 添加所有修改 |
| `git commit -m "msg"` | 提交 |
| `git push` | 推送到远程 |
| `git pull` | 拉取更新 |
| `git branch` | 查看分支 |
| `git checkout -b name` | 创建并切换 |
| `git log` | 查看提交历史 |
| `git diff` | 查看修改差异 |

---

## 8. .gitignore 已配置

项目已包含 `.gitignore`，会自动忽略:
- node_modules/
- .vscode-test/
- *.log
- 系统文件
