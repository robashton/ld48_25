var web = require('./src/web')
  , winston = require('winston')
  , GameInstance = require('./src/gameinstance')
  , socketio = require('socket.io')

web(__dirname, function(server) {
  var io = socketio.listen(server)
  io.set('log level', 0)
  var singleInstance = new GameInstance(io)
  winston.log('Server started')
})
