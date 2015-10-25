// module/dependancies =================================================
var express        = require('express');
var session        = require('express-session');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var path           = require('path');
var localPort      = process.env.PORT || 8080;
var routes         = require('./controllers/routes');
var ejs            = require('ejs');
var db             = require('../models');

// var User = db.User;
//==========================================================
app.use(session({ secret: 'keyboard cat',   resave: false,
  saveUninitialized: true }));
//dependancy use for main services and addons
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public/'));
app.use(cookieParser());
app.use('/api', routes);

app.get('/', function (req, res) {
  res.redirect('/api');
});

// Starting server

var server = app.listen(localPort, function () {

  var host = '0.0.0.0'; //require("os").hostname();
  var port = server.address().port;


  //db.sequelize.sync();

  console.log('Application listening at http://%s:%s', host, port);

});