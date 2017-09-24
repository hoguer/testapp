var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());
// Configuring Passport
var passport = require('passport');
var index=require('./routes/index')(passport);
var Timezones=require('./routes/Timezones');
var expressSession = require('express-session');
app.use(expressSession({secret: '!Toptal_rocks!',
												resave: false,
  											saveUninitialized: true,
                        cookie: {httpOnly: false}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.options('*', cors());

app.use('/Timezones',Timezones);
app.use('/', index);

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;