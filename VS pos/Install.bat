@echo off
chcp 65001 >nul
title VS POS System Installer

echo ========================================
echo     VS POS System Installer
echo ========================================
echo.
echo Installing VS POS System...
echo.

set "INSTALL_DIR=C:\VS-POS"

mkdir "%INSTALL_DIR%" 2>nul
mkdir "%INSTALL_DIR%\src" 2>nul
mkdir "%INSTALL_DIR%\server" 2>nul
mkdir "%INSTALL_DIR%\server\routes" 2>nul
mkdir "%INSTALL_DIR%\server\data" 2>nul

echo Copying files...
xcopy /E /I /Y "%~dp0src\*.*" "%INSTALL_DIR%\src\" >nul 2>&1
xcopy /E /I /Y "%~dp0server\*.*" "%INSTALL_DIR%\server\" >nul 2>&1
xcopy /E /I /Y "%~dp0server\routes\*.*" "%INSTALL_DIR%\server\routes\" >nul 2>&1
xcopy /E /I /Y "%~dp0server\data\*.*" "%INSTALL_DIR%\server\data\" >nul 2>&1

echo Creating launcher...
echo @echo off>"%INSTALL_DIR%\VS-POS.exe.bat"
echo chcp 65001 ^>nul>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo title VS POS System>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo cd /d "%%~dp0">>"%INSTALL_DIR%\VS-POS.exe.bat"
echo start "VS-POS-Backend" /MIN node "server\server.js">>"%INSTALL_DIR%\VS-POS.exe.bat"
echo timeout /t 3 /nobreak ^>nul>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo start http://localhost:3000/src/index.html>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo echo VS POS System is Running!>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo echo Keep this window open.>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo echo Press any key to stop.>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo pause ^>nul>>"%INSTALL_DIR%\VS-POS.exe.bat"
echo taskkill /F /IM node.exe /FI "WINDOWTITLE eq VS-POS-Backend*" ^>nul 2^>^&1>>"%INSTALL_DIR%\VS-POS.exe.bat"

echo Creating desktop shortcut...
set DESKTOP=%USERPROFILE%\Desktop
set SHORTCUT=%DESKTOP%\VS POS System.lnk
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%DESKTOP%\VS-POS-System.lnk'); $Shortcut.TargetPath = 'C:\VS-POS\VS-POS.exe.bat'; $Shortcut.WorkingDirectory = 'C:\VS-POS'; $Shortcut.Description = 'VS POS System'; $Shortcut.Save()"

echo.
echo ========================================
echo     Installation Complete!
echo ========================================
echo.
echo Installed to: C:\VS-POS
echo.
echo Double-click "VS-POS-System" on your desktop to start.
echo.
pause
