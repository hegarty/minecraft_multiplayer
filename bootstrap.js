process.env.NODE_ENV = (!process.env.NODE_ENV)? "production" : process.env.NODE_ENV;

var shelljs = require('shelljs/global');
var express = require('express');
var app = express();
var util = require('./utilities');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('flash');
require("node-jsx").install();
var bodyparser = require('body-parser');

app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended:true }));
app.use(bodyparser.json());

app.use(session({secret:'4564f6s4fdsfdfd',saveUninitialized:true,resave:true}));

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.set('views', __dirname + '/views');

var setup_passport = require('./setup_passport')(app);

var routes = require('./routes.js')(app);

var server = app.listen(1810,function() 
{
	var host = server.address().address;
  	var port = server.address().port;
  	console.log('App Environment: "'+process.env.NODE_ENV+'" listening at http://%s:%s', host, port);
});

global.io = require('socket.io')(server);


