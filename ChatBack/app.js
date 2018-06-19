//////////////// start Dependencies ////////////////////////
const express = require('express'),
  logger = require('morgan'),
  http = require('http'),
  socketIo = require('socket.io'),
  config = require('./config'),
  cors = require('cors'),
  dbConnection = require('./models/db'),
  tokenvalidation = require('./middlewares/token.validator.middleware.js'),
  indexRouter = require('./routes/index'),
  chatRouter = require('./routes/chat'),
  ChatMessage = require('./models/chatMessage'),
  User = require('./models/user'),
  usersRouter = require('./routes/users');
//////////////// end Dependencies ///////////////////////



/////////////// start instantiation /////////////////////
const app = express(),
  server = http.createServer(app)
io = socketIo(server);
/////////////// end instantiation ///////////////////////

/////////////// start middlewares ///////////////////////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
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
  console.log("************ connection established: ");

  socket.on('message', (m) => {
    ChatMessage.create(m, function (err, data) {
      io.emit('message', m);
    });
  });

  socket.on('onlinestatus', (onlineStaus) => {
    User.findOneAndUpdate({_id:onlineStaus.userId}, {online:onlineStaus.status},(error,user)=>{
      console.log("************ new user connected: " + onlineStaus.userId);
      io.emit('onlinestatus', onlineStaus);
    })
  });
});





///// end server and web socket configurations //////////
module.exports = app;