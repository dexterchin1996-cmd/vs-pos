@echo off
chcp 65001 >nul
echo ========================================
echo   VS Pos - 链接 GitHub 仓库
echo ========================================
echo.
echo 请在 GitHub 创建仓库后运行此脚本
echo.

set /p REPO_URL="请输入 GitHub 仓库 URL: "

cd /d "%~dp0"

echo.
echo [1/4] 检查 Git 仓库...
if not exist ".git" (
    echo 初始化 Git 仓库...
    git init
    git add .
    git commit -m "Initial commit: VS pos v1.0.0"
) else (
    echo Git 仓库已存在
)

echo.
echo [2/4] 添加远程仓库...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo [3/4] 推送代码...
git branch -M main
git push -u origin main --force

echo.
echo ========================================
echo   完成!
echo ========================================
echo.
echo 访问您的仓库: %REPO_URL%
echo.

pause
