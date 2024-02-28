// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const find = require("find-process");
const path = require("path");
const fs = require("fs");
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 960, height: 540, frame: 0, webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        icon: path.join(__dirname, 'icon.ico')
    })
    ipcMain.on('close', function () {
        find('port', 3000)
            .then(function (list) {
                if (list[0] != null) {
                    process.kill(list[0].pid, 'SIGKILL');
                    app.quit()
                }
            }).catch(e => console.log(e))
    });
    ipcMain.on('hide', function () {
        mainWindow.minimize()
    });
    ipcMain.on('open', function () {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
    });
    ipcMain.on('open_project', () => {
        dialog.showOpenDialog({properties: ['openDirectory']}).then(function (response) {
            if (!response.canceled) {
                // handle fully qualified file name
                fs.readdir(response.filePaths[0], (err, files) => {
                    if (err)
                        console.log(err);
                    else {
                        mainWindow.webContents.send('set_path', {
                            path: response.filePaths[0], render: [files.map((file) => {
                                return {
                                    path: path.join(response.filePaths[0], file),
                                    name: file,
                                    isFile: fs.lstatSync(path.join(response.filePaths[0], file)).isFile(),
                                    closed: true,
                                    margin: 0
                                }
                            })
                            ]
                        });
                    }
                })
            } else {
                console.log("no file selected");
            }
        });
    })
    ipcMain.on('openDir', (event, args) => {
        const p = args.p
        const margin = args.margin
        fs.readdir(p, (err, files) => {
            if (err)
                console.log(err);
            else {
                mainWindow.webContents.send('set_files', {
                    render: [files.map((file) => {
                        return {
                            path: path.join(p, file),
                            name: file,
                            isFile: fs.lstatSync(path.join(p, file)).isFile(),
                            closed: true,
                            margin: margin + 1
                        }
                    })
                    ]
                });
            }
        })
    })
    mainWindow.maximize();
    mainWindow.loadURL('http://localhost:3000').then()
    mainWindow.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.