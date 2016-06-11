var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
console.log('running!');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//start API calls to OpenEd partner server (http://docs.opened.apiary.io/#reference)
var request = require('request');

var token = 'a9973d2e38400632e9a6806953f29e766b0bc71d96c1f9559c8f357e72dec995';

var visualPercentage = 55; 

if (visualPercentage >= 33){
    request({
  method: 'GET',
  url: 'https://private-anon-c2d294fdb-opened.apiary-mock.com/1/resources.json/?descriptive=World%20War%20II&url=http%3A%2F%2Fyoutube_video.com&limit=10&offset=0&standard_group=2&category=12&standard=K.G.2&area=11&subject=110&grades_range=K-5&grade_group=46&publisher=BrightStorm&resource_type=video&contribution_name=LearningRegistry&license=free%2C%20premium%2C%20paid%2C%20all&schema_org=false&effectiveness=60-80&standard_ids=%5B123%5D&featured=true&embeddable=true',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': token,
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

};