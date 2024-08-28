var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { slowDown } = require('express-slow-down');

var indexRouter = require('./routes/index');
var tokenRouter = require('./routes/token');
var mainRouter = require('./routes/main');

var app = express();

const microsoftLimiter = slowDown({
	windowMs: 20 * 1000, // 15 minutes
	delayAfter: 2, // Allow 1 request per 20 seconsds.
	delayMs: (hits) => hits * 5000, // Add 100 ms of delay to every request after the 5th one.
	maxDelayMs: 30000
})
const schoolwareLimiter = slowDown({
	windowMs: 60 * 1000, // 15 minutes
	delayAfter: 10, // Allow 1 request per 20 seconsds.
	delayMs: (hits) => hits * 1000, // Add 100 ms of delay to every request after the 5th one.
	maxDelayMs: 30000
})
const generalLimiter = slowDown({
	windowMs: 5 * 60 * 1000, // 15 minutes
	delayAfter: 200, // Allow 1 request per 20 seconsds.
	delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the 5th one.
	maxDelayMs: 5000
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1 /* number of proxies between user and server */)
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/token/microsoft", microsoftLimiter);
app.use("/token/schoolware", schoolwareLimiter);
app.use("/main", generalLimiter);

app.use('/', indexRouter);
app.use('/token', tokenRouter);
app.use('/main', mainRouter);


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
  res.render('error');
});

module.exports = app;


