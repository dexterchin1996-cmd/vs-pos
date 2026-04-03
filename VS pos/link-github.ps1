# VS Pos - 链接 GitHub 仓库脚本
# 在 GitHub 创建仓库后运行此脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VS Pos - 链接 GitHub 仓库" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 获取 GitHub 仓库 URL
Write-Host "请输入您的 GitHub 仓库 URL:" -ForegroundColor Yellow
Write-Host "格式: https://github.com/USERNAME/vs-pos.git" -ForegroundColor Gray
Write-Host ""
$repoUrl = Read-Host "仓库 URL"

if (-not $repoUrl) {
    Write-Host "错误: 未输入仓库 URL" -ForegroundColor Red
    Read-Host "按 Enter 键退出"
    exit 1
}

# 进入项目目录
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

Write-Host ""
Write-Host "[1/4] 项目路径: $projectPath" -ForegroundColor Yellow

# 初始化 Git (如果还没有)
Write-Host ""
Write-Host "[2/4] 检查 Git 仓库..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: VS pos v1.0.0"
    Write-Host "Git 仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "Git 仓库已存在" -ForegroundColor Green
}

# 添加远程仓库
Write-Host ""
Write-Host "[3/4] 添加远程仓库..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $repoUrl
Write-Host "远程仓库已添加: $repoUrl" -ForegroundColor Green

# 推送代码
Write-Host ""
Write-Host "[4/4] 推送代码到 GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "注意: 如果是首次推送，GitHub 可能需要您输入用户名和密码/Token" -ForegroundColor Cyan
Write-Host ""

git branch -M main
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  成功! 仓库已链接并推送" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "访问您的仓库: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "推送失败，请检查仓库 URL 是否正确" -ForegroundColor Red
}

Write-Host ""
Read-Host "按 Enter 键退出"
