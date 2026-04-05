@echo off
chcp 65001 >nul
title VS POS System Installer

echo ========================================
echo     VS POS System Installer
echo ========================================
echo.
echo This will install VS POS System on your computer.
echo.
pause

REM Check if Node.js is installed
echo Checking for Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed!
    echo Please install Node.js first from: https://nodejs.org
    pause
    exit /b 1
)
echo Node.js found: 
node --version
echo.

REM Set installation directory
set "INSTALL_DIR=C:\Program Files\VS POS"

REM Create installation directory
echo Creating installation directory...
mkdir "%INSTALL_DIR%" 2>nul

REM Copy application files
echo Copying application files...
xcopy /E /I /Y "%~dp0src" "%INSTALL_DIR%\src" >nul
xcopy /E /I /Y "%~dp0server" "%INSTALL_DIR%\server" >nul
xcopy /Y "%~dp0package.json" "%INSTALL_DIR\" >nul
xcopy /Y "%~dp0package-lock.json" "%INSTALL_DIR\" >nul

REM Copy node_modules if they exist
if exist "%~dp0node_modules" (
    echo Copying dependencies...
    xcopy /E /I /Y "%~dp0node_modules" "%INSTALL_DIR%\node_modules" >nul
)

REM Create launcher script
echo Creating launcher...
(
echo @echo off
echo chcp 65001 ^>nul
echo title VS POS System
echo.
echo REM Start backend server
echo start "VS POS Backend" /MIN node "%%~dp0server\server.js"
echo.
echo REM Wait for backend to start
echo timeout /t 3 /nobreak ^>nul
echo.
echo REM Open frontend in browser
echo start http://localhost:3000/src/index.html
echo.
echo echo ========================================
echo echo     VS POS System is Running!
echo echo ========================================
echo echo.
echo echo Backend API:  http://localhost:3001/api/health
echo echo Frontend:     http://localhost:3000/src/index.html
echo echo.
echo echo Keep this window open while using VS POS.
echo echo Close this window to stop all services.
echo echo ========================================
echo.
echo pause
echo.
echo echo Stopping VS POS System...
echo taskkill /F /IM node.exe ^>nul 2^>^&1
echo echo Done!
) > "%INSTALL_DIR%\VS-POS-Launcher.bat"

REM Create desktop shortcut
echo Creating desktop shortcut...
powershell -Command "$shell = New-Object -ComObject WScript.Shell; $shortcut = $shell.CreateShortcut('%USERPROFILE%\Desktop\VS POS System.lnk'); $shortcut.TargetPath = '%INSTALL_DIR%\VS-POS-Launcher.bat'; $shortcut.WorkingDirectory = '%INSTALL_DIR%'; $shortcut.Description = 'VS POS System'; $shortcut.IconLocation = '%%SystemRoot%%\System32\shell32.dll,3'; $shortcut.Save()"

REM Create start menu shortcut
echo Creating start menu shortcut...
mkdir "%APPDATA%\Microsoft\Windows\Start Menu\Programs\VS POS" 2>nul
powershell -Command "$shell = New-Object -ComObject WScript.Shell; $shortcut = $shell.CreateShortcut('%APPDATA%\Microsoft\Windows\Start Menu\Programs\VS POS\VS POS System.lnk'); $shortcut.TargetPath = '%INSTALL_DIR%\VS-POS-Launcher.bat'; $shortcut.WorkingDirectory = '%INSTALL_DIR%'; $shortcut.Description = 'VS POS System'; $shortcut.IconLocation = '%%SystemRoot%%\System32\shell32.dll,3'; $shortcut.Save()"

REM Create uninstaller
echo Creating uninstaller...
(
echo @echo off
echo chcp 65001 ^>nul
echo title Uninstall VS POS System
echo.
echo echo This will uninstall VS POS System from your computer.
echo pause
echo.
echo echo Removing files...
echo rmdir /S /Q "%INSTALL_DIR%" 2^>nul
echo.
echo echo Removing shortcuts...
echo del "%USERPROFILE%\Desktop\VS POS System.lnk" 2^>nul
echo rmdir /S /Q "%APPDATA%\Microsoft\Windows\Start Menu\Programs\VS POS" 2^>nul
echo.
echo echo VS POS System has been uninstalled.
echo pause
) > "%INSTALL_DIR%\Uninstall-VS-POS.bat"

echo.
echo ========================================
echo     Installation Complete!
echo ========================================
echo.
echo VS POS System has been installed to:
echo %INSTALL_DIR%
echo.
echo A shortcut has been created on your desktop.
echo Double-click "VS POS System" to start the application.
echo.
pause
