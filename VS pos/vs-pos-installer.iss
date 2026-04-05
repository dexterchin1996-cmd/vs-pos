; VS POS System - Inno Setup Installer Script
; Download Inno Setup from: https://jrsoftware.org/isdl.php

[Setup]
AppName=VS POS System
AppVersion=1.0.0
AppPublisher=VS POS Team
DefaultDirName={pf}\VS POS
DefaultGroupName=VS POS
OutputDir=installer
OutputBaseFilename=VS-POS-Setup
Compression=lzma2
SolidCompression=yes
PrivilegesRequired=admin
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "chinese"; MessagesFile: "compiler:Languages\ChineseSimplified.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode

[Files]
Source: "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos\src\*"; DestDir: "{app}\src"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos\server\*"; DestDir: "{app}\server"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos\package.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos\node_modules\*"; DestDir: "{app}\node_modules"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Program Files\nodejs\node.exe"; DestDir: "{app}\nodejs"; Flags: ignoreversion
Source: "C:\Program Files\nodejs\nodevars.bat"; DestDir: "{app}\nodejs"; Flags: ignoreversion

[Icons]
Name: "{group}\VS POS System"; Filename: "{app}\VS-POS-Launcher.exe"
Name: "{group}\{cm:UninstallProgram,VS POS}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\VS POS System"; Filename: "{app}\VS-POS-Launcher.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\VS-POS-Launcher.exe"; Description: "{cm:LaunchProgram,VS POS System}"; Flags: nowait postinstall skipifsilent

[Code]
procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    // Create a simple launcher executable using a batch file
    SaveStringToFile(ExpandConstant('{app}\VS-POS-Start.bat'),
      '@echo off' + #13#10 +
      'chcp 65001 >nul' + #13#10 +
      'title VS POS System' + #13#10 +
      'taskkill /F /IM node.exe 2>nul' + #13#10 +
      'timeout /t 1 /nobreak >nul' + #13#10 +
      'echo Starting VS POS System...' + #13#10 +
      'start "VS POS Backend" /MIN node "%~dp0server\server.js"' + #13#10 +
      'timeout /t 3 /nobreak >nul' + #13#10 +
      'start http://localhost:3000/src/index.html' + #13#10 +
      'echo VS POS System is running!' + #13#10 +
      'echo Backend: http://localhost:3001/api/health' + #13#10 +
      'echo Frontend: http://localhost:3000/src/index.html' + #13#10 +
      'pause' + #13#10 +
      'taskkill /F /IM node.exe >nul 2>&1', False);
  end;
end;
