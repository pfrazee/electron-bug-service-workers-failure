var fs = require('fs')

module.exports = function (req, res) {
  var url = req.url.slice('/custom://app/'.length)
  console.log(url)
  res.writeHead(200, 'OK', {
    'Content-Type': url.endsWith('.js') ? 'application/javascript' : 'text/html'
  })
  fs.createReadStream('./swapp/' + url).pipe(res)
}