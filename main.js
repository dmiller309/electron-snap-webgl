"use strict"

console.log("main.js 1")
const { app, BrowserWindow, ipcMain } = require('electron')
console.log("main.js 2")
const url = require('url')

let win

console.log("main.js 3")
function createWindow () {
  console.log("createWindow 1")
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      webgl: true,
      //experimentalFeatures: true,
      //experimentalCanvasFeatures: true,
      // offscreen: true,
      devTools: true
    }
  })
  console.log("createWindow 1")

  win.openDevTools()

  win.loadURL('chrome://gpu/')

  win.on('closed', () => {
    win = null
  })
}

console.log("main.js 4")
app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true')

console.log("main.js 5")
app.on('ready', createWindow)

console.log("main.js 6")
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

console.log("main.js 7")
process.on('uncaughtException', function (err) {
  console.error('uncaughtException')
  console.error(err)
})

console.log("main.js 8")
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

console.log("main.js 9")

