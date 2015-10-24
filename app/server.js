// modules =================================================
var express        = require('express');
var session        = require('express-session');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var path           = require('path');
var localPort      = process.env.PORT || 8080;
var routes         = require('./controllers/routes');
//==========================================================
app.use(session({ secret: 'keyboard cat',   resave: false,
  saveUninitialized: true }));
//dependancy use for main services and addons 
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public/'));
app.use(cookieParser());
app.use(routes);


app.use('/' ,function (req, res){
  res.send('Hello World');
});
// Starting server

var server = app.listen(localPort, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Application listening at http://%s:%s', host, port);

});