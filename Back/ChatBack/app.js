//////////////// start Dependencies ////////////////////////
const express = require('express'),
  logger = require('morgan'),
  http = require('http'),
  socketIo = require('socket.io'),
  config = require('./config'),
  dbConnection = require('./models/db'),
  indexRouter = require('./routes/index'),
  chatRouter = require('./routes/chat'),
  usersRouter = require('./routes/users');
//////////////// end Dependencies ///////////////////////

/////////////// start instantiation /////////////////////
const app = express(),
  server = http.createServer(app)
  io=socketIo(server);
/////////////// end instantiation ///////////////////////

/////////////// start middlewares ///////////////////////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/////////////// end middlewares /////////////////////////

/////////////// start routes ////////////////////////////
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
/////////////// end routes //////////////////////////////

///// start server and web socket configurations ////////
server.listen(config.server.port, () => {
  console.log('Running server on port %s',config.server.port);
});

io.on('connect', (socket) => {
  socket.on('message', (m) => {
      console.log('[server](message): %s', JSON.stringify(m));
      io.emit('message', m);
  });
});

///// end server and web socket configurations //////////
module.exports = app;
