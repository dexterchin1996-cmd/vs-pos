@echo off
chcp 65001 >nul
echo ========================================
echo   VS Pos - Git 初始化脚本
echo ========================================
echo.

REM 检查 Git 是否安装
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Git 未安装!
    echo.
    echo 请先安装 Git:
    echo   https://git-scm.com/download/win
    echo.
    echo 或使用 winget 安装:
    echo   winget install --id Git.Git -e --source winget
    echo.
    pause
    exit /b 1
)

echo [1/5] 检查 Git 安装...
git --version
echo.

echo [2/5] 进入项目目录...
cd /d "%~dp0"
echo 当前目录: %cd%
echo.

echo [3/5] 检查 Git 仓库...
if exist ".git" (
    echo 已经是 Git 仓库
) else (
    echo 初始化 Git 仓库...
    git init
    echo Git 仓库已初始化
)
echo.

echo [4/5] 配置用户信息...
git config user.name "VS Pos Developer"
git config user.email "developer@vsevice.local"
echo 用户信息已配置
echo.

echo [5/5] 首次提交...
git add .
git commit -m "Initial commit: VS pos v1.0.0"
echo 代码已提交
echo.

echo ========================================
echo   Git 初始化完成!
echo ========================================
echo.
echo 后续步骤:
echo   1. 在 GitHub 创建仓库: https://github.com/new
echo   2. 链接远程仓库:
echo      git remote add origin https://github.com/YOUR_NAME/vs-pos.git
echo   3. 推送代码:
echo      git push -u origin main
echo.

echo 当前状态:
git status --short
echo.

pause
