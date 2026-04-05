# VS POS 应用程序构建脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     VS POS 应用程序构建工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/2] 安装依赖..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "安装完成!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "请选择构建目标:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[1] 电脑版 (Electron - Windows)" -ForegroundColor White
Write-Host "[2] 手机/平板 (Capacitor)" -ForegroundColor White
Write-Host "[3] PWA 网页版" -ForegroundColor White
Write-Host "[4] 启动开发服务器" -ForegroundColor White
Write-Host "[Q] 退出" -ForegroundColor White
Write-Host ""

$choice = Read-Host "请输入选项"

switch ($choice) {
    "1" {
        Write-Host "正在构建 Windows 桌面应用..." -ForegroundColor Yellow
        npm run electron:build
        Write-Host "构建完成! 安装包在 dist-electron 目录" -ForegroundColor Green
    }
    "2" {
        Write-Host "正在配置 Capacitor..." -ForegroundColor Yellow
        npx cap sync
        Write-Host "配置完成!" -ForegroundColor Green
        Write-Host "如需构建 iOS: npm run cap:open:ios" -ForegroundColor White
        Write-Host "如需构建 Android: npm run cap:open:android" -ForegroundColor White
    }
    "3" {
        Write-Host "PWA 网页版已就绪!" -ForegroundColor Green
        Write-Host "将 src 目录部署到 Web 服务器即可" -ForegroundColor White
    }
    "4" {
        Write-Host "启动开发服务器..." -ForegroundColor Yellow
        Start-Process "http://localhost:3000"
        npm run dev
    }
    "Q" {
        exit
    }
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
