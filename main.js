// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

const open = require('open');
// const serve = require('electron-serve');

// const loadURL = serve({directory: 'localfiles'});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    icon: path.join(__dirname, 'images/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL('https://wallet.atomex.me');

  // await loadURL(mainWindow);

  // mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    open(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
