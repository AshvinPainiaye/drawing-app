const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;
const path = require('path')
const url = require('url')

let mainWindow
let secondWindow

function createWindow(){
    mainWindow = new BrowserWindow({width:800,height:600})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

//mainWindow.webContents.openDevTools()

mainWindow.on('closed', function(){
    mainWindow = null
})

secondWindow = new BrowserWindow({
    width:500,
    height:500,
    show:false
})
secondWindow.setAlwaysOnTop(true)

secondWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'second.html'),
    protocol: 'file:',
    slashes: true
}))

secondWindow.on('close', function (event) {
   secondWindow.hide();
   event.preventDefault();
})

}

app.on('ready', createWindow)

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('show-second',(event)=>{
  secondWindow.show()
})


ipcMain.on('color',(event, color)=>{
  mainWindow.webContents.send('color', color)
})

ipcMain.on('size',(event, size)=>{
  mainWindow.webContents.send('size', size)
})

ipcMain.on('tool',(event, tool)=>{
  mainWindow.webContents.send('tool', tool)
})
