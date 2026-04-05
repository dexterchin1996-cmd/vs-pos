@echo off
chcp 65001 >nul
echo ========================================
echo     VS POS 应用程序构建工具
echo ========================================
echo.

echo [1] 安装依赖...
call npm install
echo.

echo 安装完成!
echo.
echo ========================================
echo 请选择构建目标:
echo ========================================
echo [1] 电脑版 (Electron - Windows)
echo [2] 手机/平板 (Capacitor - 需要Android Studio/Xcode)
echo [3] PWA 网页版 (可直接托管)
echo [4] 仅启动开发服务器
echo [5] 退出
echo.

set /p choice=请输入选项 (1-5):
if "%choice%"=="1" goto electron
if "%choice%"=="2" goto capacitor
if "%choice%"=="3" goto pwa
if "%choice%"=="4" goto dev
if "%choice%"=="5" exit

:electron
echo.
echo 正在构建 Windows 桌面应用...
npm run electron:build
echo.
echo 构建完成! 安装包在 dist-electron 目录
pause
exit

:capacitor
echo.
echo 正在配置 Capacitor...
npx cap sync
echo.
echo 配置完成!
echo 如需构建 iOS: npm run cap:open:ios
echo 如需构建 Android: npm run cap:open:android
pause
exit

:pwa
echo.
echo PWA 网页版已就绪!
echo 只需将 src 目录部署到任何 Web 服务器
echo 或使用 GitHub Pages, Vercel, Netlify 等
pause
exit

:dev
echo.
echo 启动开发服务器...
start http://localhost:3000
npm run dev
exit
