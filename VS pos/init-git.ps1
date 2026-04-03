# VS Pos - Git 快速初始化脚本
# 使用方法: 右键点击此文件 > "使用 PowerShell 运行"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VS Pos - Git 初始化脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Git 是否安装
Write-Host "[1/5] 检查 Git 安装..." -ForegroundColor Yellow
$gitPath = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitPath) {
    Write-Host "错误: Git 未安装" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先安装 Git:" -ForegroundColor Yellow
    Write-Host "  https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "或使用 winget 安装:" -ForegroundColor Yellow
    Write-Host "  winget install --id Git.Git -e --source winget" -ForegroundColor Cyan
    Read-Host "按 Enter 键退出"
    exit 1
}

Write-Host "Git 已安装: $($gitPath.Source)" -ForegroundColor Green

# 获取项目路径
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath
Write-Host ""
Write-Host "[2/5] 项目路径: $projectPath" -ForegroundColor Yellow

# 检查是否已有 .git
Write-Host ""
Write-Host "[3/5] 检查 Git 仓库..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "已经是 Git 仓库" -ForegroundColor Green
} else {
    Write-Host "初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    Write-Host "Git 仓库已初始化" -ForegroundColor Green
}

# 配置用户信息 (如果未配置)
Write-Host ""
Write-Host "[4/5] 配置用户信息..." -ForegroundColor Yellow
$userName = git config user.name 2>$null
$userEmail = git config user.email 2>$null

if (-not $userName) {
    Write-Host "请输入您的 Git 用户名:"
    $newName = Read-Host
    git config user.name $newName
    Write-Host "用户名已设置: $newName" -ForegroundColor Green
}

if (-not $userEmail) {
    Write-Host "请输入您的 Git 邮箱:"
    $newEmail = Read-Host
    git config user.email $newEmail
    Write-Host "邮箱已设置: $newEmail" -ForegroundColor Green
}

# 提交代码
Write-Host ""
Write-Host "[5/5] 首次提交..." -ForegroundColor Yellow
git add .
$status = git status --short

if ($status) {
    git commit -m "Initial commit: VS pos v1.0.0 - 专业按摩/SPA POS系统"
    Write-Host "代码已提交" -ForegroundColor Green
} else {
    Write-Host "没有需要提交的内容" -ForegroundColor Green
}

# 完成
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Git 初始化完成!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "后续步骤:" -ForegroundColor Yellow
Write-Host "1. 在 GitHub 创建仓库: https://github.com/new" -ForegroundColor White
Write-Host "2. 链接远程仓库:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_NAME/vs-pos.git" -ForegroundColor Gray
Write-Host "3. 推送代码:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""

# 显示当前状态
Write-Host "当前状态:" -ForegroundColor Yellow
git status --short

Write-Host ""
Read-Host "按 Enter 键退出"
