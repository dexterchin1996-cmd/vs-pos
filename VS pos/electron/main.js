const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function startBackend() {
  // Get the path to the server.js file in the packaged app
  let backendPath;
  if (process.env.NODE_ENV === 'development') {
    backendPath = path.join(__dirname, '../server/server.js');
  } else {
    // In packaged app, resources are in different locations
    const appPath = process.resourcesPath;
    backendPath = path.join(appPath, '..', 'server', 'server.js');
    
    // Fallback if the above doesn't work
    if (!fs.existsSync(backendPath)) {
      // Try alternative path structure
      backendPath = path.join(process.execPath, '..', 'resources', 'server', 'server.js');
    }
    
    // Last fallback - relative to current directory
    if (!fs.existsSync(backendPath)) {
      backendPath = path.join(__dirname, 'server', 'server.js');
    }
  }
  
  console.log('Attempting to start backend from:', backendPath);
  console.log('File exists:', fs.existsSync(backendPath));
  
  if (!fs.existsSync(backendPath)) {
    console.error('Backend server.js not found at:', backendPath);
    // Show error in UI if possible
    return;
  }
  
  backendProcess = spawn('node', [backendPath], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    shell: true,
    windowsHide: true
  });
  
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });
  
  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
  
  console.log('Backend start initiated');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, '../src/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('VS POS App Started');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});
