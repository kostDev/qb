var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/business');
var db = mongoose.connection;
//var ip = '';
// my routes --------
var routes = require('./routes/index');
var users = require('./routes/users');
var workspace = require('./routes/workspace');
var profile = require('./routes/profile');
var partners = require('./routes/partners');
// my modules -------
var postTime = require('./modules/time');

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Middleware b & c parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect Flash
app.use(flash());

app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});
// ----- my all routes ------------
app.use('/', routes); // index - homepage
app.use('/users', users); // login - log out - registration
app.use('/workspace', workspace); // workspace and all post methods
app.use('/profile', profile); // user profile
app.use('/partners', partners);
// -------------------------------

// Update page
app.get('/update', function (req, res) {
	res.render('update', {title:'Update'});
});
//About page
app.get('/about', function (req, res) {
	res.render('/about', {title:'About'});
});

// 404 page
app.use(function (req, res, next) {
	res.status(404);
	res.render('404',{
		title: '404',
		show:false});
});

// user page 500
app.use(function (err, req, res, next) {
	console.log(err.stack);
	res.status(500);
	res.render('500',{
		title: '500',
		show:false});
});

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'),function () {
	console.log('Working on: '+app.get('port')+" | server date: "
						+postTime.dateNow()+" "+postTime.timeNow());
});
