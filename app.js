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

var token = '20263b27cb491cf7f59ed84f5faf7d7cfb32b4deeb1c6e0b4705251ccad4c117';

//algorithm that builds GET url based values from interface

var visualPercentage = 55; 
var linguisticPercentage = 0;
var logicalPercentage = 0;
var resourceType = "";

if (visualPercentage >= 33) {
  resourceType += "video";
}; 
if (linguisticPercentage >= 33) {
  resourceType += "audio";
}; 
if (logicalPercentage >= 33) {
  resourceType += "homework";
}; 



//---GETS TOKEN ---
// request({
//   method: 'POST',
//   url: 'https://partner.opened.com/1/oauth/get_token',
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   },
//   body: "{  \"client_id\": \"ddf17d90372621bd68210dd3428dcd8e260719a5882a50900a864828e56d9501\",  \"secret\": \"58f50cd0d4491a194576a28df70d6c29cac6b352df68537afa45bd3943eb2e7f\",  \"username\": \"jweiss\"}"
// }, function (error, response, body) {
//   console.log('Status:', response.statusCode);
//   console.log('Headers:', JSON.stringify(response.headers));
//   console.log('Response:', body);
// });


request({
  method: 'GET',
  url: 'https://private-anon-c2d294fdb-opened.apiary-proxy.com/1/resources.json/?descriptive=English&limit=3&offset=0&resource_type=video&featured=true&embeddable=true',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer fd3b9bb16c867dec58058a32a32bef4d7e69700bbbfc5639cde44e734f253428'
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', JSON.parse(body));

  var newData = response.body.resources; 
  console.log("body object:", newData)

  // newData.map(function(obj){
  //   return obj.share_url; 
  // });

  // console.log("Body data:", newData);

  // TODO -- map and print arrays of each item with only title and share_url


  //reach into body JSON object
  //grab each share_url 
  //plug each share_URL into an iframe

});  


