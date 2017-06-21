var express = require('express');
var router = express.Router();

var postTime = require('../modules/time');
var User = require('../modules/user');

router.get('/', function(req, res){
	if(req.isAuthenticated()){
		res.render('profile',{
			title:'Profile',
			name: req.user.name,
			show: false,
			user: req.user,
			workers_count: req.user.workers.length,
			workers: req.user.workers,
			partners_count: req.user.partners.length,
			events_count: req.user.events.length
		});
		
	}else{
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
});

router.post('/active', function(req, res){
	var workerEmail = req.body.workerEmail;
	var bossName = req.user.name;
	var workerPassword = req.body.password;
	User.checkWorkerEmail(bossName, workerEmail, function (err, count) {
		if(err) throw err;
		if(count === 1){
			User.addPasswordToWorker(bossName, workerEmail, workerPassword, function(err, info) {
				if(err) throw err;
					console.log(bossName+" activate: "+ workerEmail);
			});
		}
	});
	res.redirect('/profile');
});

module.exports = router;