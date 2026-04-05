@echo off
chcp 65001 >nul
title VS POS - Deploy to Firebase

echo ========================================
echo     VS POS Firebase Deployment
echo ========================================
echo.

REM Install Firebase CLI if needed
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Firebase CLI...
    npm install -g firebase-tools
)

REM Login to Firebase
echo.
echo Please login to Firebase...
firebase login

REM Initialize project
echo.
echo Initializing Firebase project...
firebase init hosting --project vs-pos-cloud

REM Deploy
echo.
echo Deploying to Firebase Hosting...
firebase deploy --only hosting

echo.
echo ========================================
echo     Deployment Complete!
echo ========================================
echo.
echo Your app is live at:
echo https://vs-pos-cloud.web.app
echo.
pause
