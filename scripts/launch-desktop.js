/**
 * Mostly copied from
 * https://github.com/electron/electron-quick-start/blob/f8ae670ce85ce7329580b1085e37abb62ea3566b/main.js
 */

// Check that desktop version has been built
const paths = require('../config/paths');
const fs = require('fs');
try {
    fs.statSync(paths.appDesktopBuild, (err, stat) => err);
} catch (e) {
    // TODO: customize the colors in the output with https://nodejs.org/api/console.html#console_console_dir_obj_options
    console.log(`Please build the desktop version with 'npm run build:desktop', then try again.`);
    process.exit(1);
}


const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        // path.dirname(__dirname) will return the parent folder
        pathname: path.join(path.dirname(__dirname), 'desktop', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

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
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
