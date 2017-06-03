const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

// start the server
const http = require('http')
const serverHandler = require('./server')
var server = http.createServer(serverHandler)
server.listen(8080)

// config the protocol
electron.protocol.registerStandardSchemes(['custom'], { secure: true })

function createWindow () {
  // register the custom protocol
  electron.protocol.registerServiceWorkerSchemes(['custom'])
  electron.protocol.registerHttpProtocol('custom',
    (request, cb) => {
      cb({
        method: request.method,
        url: 'http://localhost:8080/' + request.url
      })
    }, err => {
      if (err) throw err
    }
  )

  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
