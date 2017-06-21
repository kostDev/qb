var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../modules/user');

//Get Register
router.get('/registration', function (req, res) {
	if(!req.isAuthenticated()){
		res.render('registration', {
			title: 'Registration',
			show: false
		});	
	}else{
		res.redirect('/workspace');
	}
});

//Get Login
router.get('/login', function (req, res) {
	if(!req.isAuthenticated()){
		res.render('login', {
			title: 'Login',
			show: false
		});
	}else{
		res.redirect('/workspace');
	}
});

//Post Register User
router.post('/registration', function (req, res) {
	let nUser = {
		company: req.body.company,
		name: req.body.name,
		country: req.body.country,
		email: req.body.email,
		password: req.body.password,
		typeap: req.body.typeap
	};
	//console.log(nUser.name);
	//validation
	req.checkBody('company', 'Company is required!').notEmpty();
	req.checkBody('name', 'Name is required!').notEmpty();
	req.checkBody('country', 'Country is required!').notEmpty();
	req.checkBody('email', 'Email is required!').notEmpty();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('password2', 'Confirm Password is required!').notEmpty();
	req.checkBody('password2', 'Passwords do not match! ').equals(req.body.password);
	//-------------------------------------------------------
	let errors = req.validationErrors();
	if (errors) {
		//console.log('Yes - errors');
		res.render('registration',{
			title:'Registration',
			show:false,
			errors: errors
		});
	}else{
		//console.log('No - errors');
		var newUser = new User(nUser);
		User.createUser(newUser, function (err, user) {
			if(err) throw err;
			console.log(user);
			req.flash('success_msg', 'You are registered and can now login');
			res.redirect('/users/login'); 
		});
	}

});


passport.use(new LocalStrategy({
	usernameField: 'email',
    passwordField: 'password'
},
  function(username, password, done) {
    User.getUserByUsername(username, function (err,user) {
    	if(err) throw err;
    	if(!user){
    		return done(null, false,{message: 'Unknown User'});
    	}
    	User.comparePassword(password, user.password, function (err, isMatch) {
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		}else{
    			return done(null, false, {message: 'Invalid password'});
    		}
    	});
    });
  }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{ 
  	successRedirect: '/', 
  	failureRedirect: '/login',
  	failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;