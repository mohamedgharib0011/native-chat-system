//////////////// start Dependencies ////////////////////////
const express = require('express'),
  logger = require('morgan'),
  http = require('http'),
  socketIo = require('socket.io'),
  config = require('./config'),
  dbConnection = require('./models/db'),
  tokenvalidation = require('./middlewares/tokenvalidation'),
  indexRouter = require('./routes/index'),
  chatRouter = require('./routes/chat'),
  usersRouter = require('./routes/users');
//////////////// end Dependencies ///////////////////////



/////////////// start instantiation /////////////////////
const app = express(),
  server = http.createServer(app)
io = socketIo(server);
/////////////// end instantiation ///////////////////////

//////////////// start CORS  ///////////////////////
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, *, Content-Type, Accept");
  next();
});
//////////////// end CORS  ///////////////////////

/////////////// start middlewares ///////////////////////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/api', tokenvalidation);

/////////////// end middlewares /////////////////////////

/////////////// start routes ////////////////////////////
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/chats', chatRouter);
/////////////// end routes //////////////////////////////

///// start server and web socket configurations ////////
server.listen(config.server.port, () => {
  console.log('Running server on port %s', config.server.port);
});

io.on('connect', (socket) => {
  socket.on('message', (m) => {
    console.log('[server](message): %s', JSON.stringify(m));
    io.emit('message', m);
  });
});





///// end server and web socket configurations //////////
module.exports = app;