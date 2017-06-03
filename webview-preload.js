console.log('Webview preload')
var {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('custom', {allowServiceWorkers: true})