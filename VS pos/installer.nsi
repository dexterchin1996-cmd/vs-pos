; VS POS System Installer Script
; NSIS Installer Script

!include "MUI2.nsh"
!include "FileFunc.nsh"

; General settings
Name "VS POS System"
OutFile "VS-POS-Setup.exe"
InstallDir "$PROGRAMFILES\VS POS"
InstallDirRegKey HKCU "Software\VS POS" ""
RequestExecutionLevel admin

; Modern UI settings
!define MUI_ABORTWARNING
!define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\modern-install.ico"
!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\modern-uninstall.ico"

; Pages
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

; Language
!insertmacro MUI_LANGUAGE "English"

; Installer
Section "VS POS System"
  SetOutPath "$INSTDIR"
  
  ; Install Node.js runtime (bundled)
  File /r "C:\Program Files\nodejs\*.*"
  
  ; Install application files
  SetOutPath "$INSTDIR\app"
  File /r "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos\src\*.*"
  File /r "C:\Users\User\OneDrive\Documents\OPEN CODE 1\VS pos\server\*.*"
  
  ; Create start menu shortcuts
  CreateDirectory "$SMPROGRAMS\VS POS"
  CreateShortCut "$SMPROGRAMS\VS POS\VS POS.lnk" "$INSTDIR\app\VS-POS-Start.bat"
  CreateShortCut "$SMPROGRAMS\VS POS\Uninstall VS POS.lnk" "$INSTDIR\uninstall.exe"
  
  ; Create desktop shortcut
  CreateShortCut "$DESKTOP\VS POS.lnk" "$INSTDIR\app\VS-POS-Start.bat"
  
  ; Write registry
  WriteRegStr HKCU "Software\VS POS" "" "$INSTDIR"
  WriteRegStr HKCU "Software\VS POS" "InstallDir" "$INSTDIR"
  
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

; Uninstaller
Section "Uninstall"
  ; Remove registry keys
  DeleteRegKey HKCU "Software\VS POS"
  
  ; Remove files and directories
  RMDir /r "$INSTDIR\app"
  RMDir /r "$INSTDIR\nodejs"
  Delete "$INSTDIR\uninstall.exe"
  
  ; Remove shortcuts
  Delete "$DESKTOP\VS POS.lnk"
  Delete "$SMPROGRAMS\VS POS\VS POS.lnk"
  Delete "$SMPROGRAMS\VS POS\Uninstall VS POS.lnk"
  RMDir "$SMPROGRAMS\VS POS"
  
  ; Remove installation directory
  RMDir "$INSTDIR"
SectionEnd
