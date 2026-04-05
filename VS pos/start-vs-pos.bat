@echo off
chcp 65001 >nul
title VS POS System Launcher

echo ========================================
echo     VS POS System Starting...
echo ========================================
echo.

REM Start backend server
echo [1/2] Starting backend server...
start "VS POS Backend" /MIN node "%~dp0server\server.js"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Check if backend is running
echo [2/2] Starting frontend interface...
start "" http://localhost:3000/src/index.html

REM Start live server for frontend
start "VS POS Frontend" /MIN cmd /c "cd /d "%~dp0" && npx live-server src --port=3000 --host=localhost"

echo.
echo ========================================
echo     VS POS System is running!
echo ========================================
echo.
echo Backend API: http://localhost:3001/api/health
echo Frontend:    http://localhost:3000/src/index.html
echo.
echo Keep this window open while using VS POS.
echo Close it to stop all services.
echo ========================================

pause
