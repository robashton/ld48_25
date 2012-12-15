var send = require('send')
var http = require('http')
var url = require('url')
var path = require('path')

var server = http.createServer(function(req, res) {
    function error(err) {
      res.statusCode = err.status || 500
      res.end(err.message)
    }
    function redirect() {
      res.statusCode = 301
      res.setHeader('Location', req.url + '/')
      res.end('Redirecting to ' + req.url + '/')
    }
    send(req, url.parse(req.url).pathname)
      .root(__dirname)
      .on('error', error)
      .on('directory', redirect)
      .pipe(res)
  
}).listen(8000);

