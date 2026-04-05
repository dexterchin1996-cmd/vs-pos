# VS POS 应用程序下载与安装指南

## 系统要求

### 电脑版 (Windows/Mac/Linux)
- Windows 10 或更高版本
- MacOS 10.14 或更高版本
- Linux (Ubuntu 18.04+)

### 手机/平板版 (iOS/Android)
- iOS 12.0 或更高版本
- Android 7.0 (API 24) 或更高版本

---

## 下载方式

### 方式一：直接从 releases 下载

访问 GitHub Releases 页面下载预编译的安装包：
```
https://github.com/vspos/vs-pos/releases
```

| 平台 | 文件类型 | 说明 |
|------|----------|------|
| Windows | .exe / .msi | 桌面安装包 |
| Mac | .dmg | 苹果安装包 |
| Linux | .AppImage | 通用 Linux 包 |
| Android | .apk | 安卓安装包 |
| iOS | .ipa | 需通过 TestFlight 或自定义分发 |

---

### 方式二：从源码构建

#### 1. 克隆项目
```bash
git clone https://github.com/vspos/vs-pos.git
cd vs-pos
```

#### 2. 安装依赖
```bash
npm install
```

#### 3. 构建应用

**电脑版 (Windows)**
```bash
npm run electron:build
# 输出: dist-electron/VS POS Setup 1.0.0.exe
```

**手机/平板版**
```bash
# Android
npm run cap:add android
npm run cap:open android

# iOS (需要 Mac 和 Xcode)
npm run cap:add ios
npm run cap:open ios
```

**网页版 (PWA)**
```bash
# 将 src 目录部署到任何 Web 服务器
# 或使用 GitHub Pages, Vercel, Netlify
```

---

## 使用说明

### 首次启动
1. 安装应用程序
2. 确保后端服务正在运行：`cd server && node server.js`
3. 打开应用访问 `http://localhost:3000`

### 各平台功能

| 功能 | 电脑端 | 移动端 |
|------|--------|--------|
| 收银台 | ✅ | ✅ |
| 会员管理 | ✅ | ✅ |
| 技师管理 | ✅ | ✅ |
| 店铺管理 | ✅ | ✅ |
| 数据统计 | ✅ | ✅ |
| 离线使用 | ✅ (PWA) | ✅ |

---

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (Vanilla)
- **后端**: Node.js + Express
- **桌面端**: Electron
- **移动端**: Capacitor
- **PWA**: Service Worker

---

## 常见问题

### Q: 应用无法启动？
A: 确保端口 3000 和 3001 未被占用

### Q: 移动端无法连接后端？
A: 后端服务需要部署到可访问的服务器，或使用局域网 IP

### Q: 如何卸载？
A: 
- Windows: 控制面板 → 程序和功能
- Mac: 拖拽到废纸篓
- Android: 设置 → 应用 → 卸载

---

## 更新日志

### v1.0.0 (2024-04)
- 初始版本
- 收银台功能
- 会员管理
- 技师管理
- 店铺管理
- 跨平台支持 (Windows/Mac/Linux/iOS/Android/PWA)
