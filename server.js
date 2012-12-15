var
  path = require('path'),
  http = require('http'),
  paperboy = require('paperboy')

  PORT = process.env.PORT  || 8000,
  WEBROOT = path.dirname(__filename)

http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(WEBROOT, req, res)
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
    });
}).listen(PORT);

