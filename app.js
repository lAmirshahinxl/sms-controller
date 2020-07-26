var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var debug = require('debug')('smsprojectserver:server');
const port = process.env.PORT || 2000;
var app = express();
var server = http.createServer(app);
app.set('port' , port);
const session = require('express-session');
var mongoose = require('mongoose');

// connect to mongo db
mongoose.set('useCreateIndex', true);
const uri = "mongodb+srv://Amirshahinx:Amirshahinx1@cluster0-rqpz5.mongodb.net/sms_project?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true , useUnifiedTopology: true });


// import routes ------------------------------>
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/loginUser');
const registerRouter = require('./routes/registerUser');
const addSmsRouter = require('./routes/addSms');
const readSmsRouter = require('./routes/readSms');
const loginWebRouter = require('./routes/Web/loginWeb');
const profileWebRouter = require('./routes/Web/profileWeb');
const registerWebRouter = require('./routes/Web/registerWeb');
const adminLoginRouter = require('./routes/Web/adminLogin');
const adminHomeRouter = require('./routes/Web/adminHome');


// view engine setup ------------------------------------------------>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// express set up ----------------------------------->
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  maxAge  : new Date(Date.now() + 3600000),
  expires : new Date(Date.now() + 3600000),
  saveUninitialized: false,
}));


//routes -------------------------------->
app.use('/', indexRouter);
app.use('/login' , loginRouter);
//app.use('/register' , registerRouter);
app.use('/addSms' , addSmsRouter);
app.use('/readSms' , readSmsRouter);
//web routes ------------------------------->
app.use('/loginWeb' , loginWebRouter);
app.use('/profileWeb' , profileWebRouter);
app.use('/registerWeb' , registerWebRouter);
app.use('/adminLogin' , adminLoginRouter);
app.use('/adminHome' , adminHomeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error' , {error : err.message , type : err.code});
});

server.listen(port);
server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('server running in address http://localhost:2000');
});