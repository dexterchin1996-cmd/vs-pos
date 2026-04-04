@echo off
chcp 65001 >nul
title VS POS System v2.0
cd /d "%~dp0"

echo ========================================
echo     VS POS System v2.0
echo ========================================
echo.

REM Kill existing
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

echo Starting VS POS System...
echo.

REM Start unified server (backend + frontend on ONE port)
start "VS-POS-Server" /MIN node "server\unified-server.js"

timeout /t 3 /nobreak >nul

REM Open browser
start http://localhost:3000/login.html

echo.
echo ========================================
echo     VS POS System v2.0 is Running!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Login:    http://localhost:3000/login.html
echo API:      http://localhost:3000/api/health
echo.
echo Default Login: admin / admin123
echo.
echo Keep this window open.
echo Press any key to stop.
echo ========================================
echo.
pause >nul

echo.
echo Stopping VS POS System...
taskkill /F /IM node.exe >nul 2>&1
echo Done!
