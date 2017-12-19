"use strict"

const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')

let win

function createWindow () {
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

  win.openDevTools()

  win.loadURL('chrome://gpu/')

  win.on('closed', () => {
    win = null
  })
}

app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

process.on('uncaughtException', function (err) {
  console.error('uncaughtException')
  console.error(err)
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})


