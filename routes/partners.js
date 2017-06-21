var express = require('express');
var router = express.Router();

var postTime = require('../modules/time');
var User = require('../modules/user');

router.get('/', function(req, res){
	if(req.isAuthenticated()){
		res.render('partners',{
			title:'Partners',
			name: req.user.name,
			company: req.user.company,
			partners: req.user.partners,
			type: req.user.typeap,
			show: false//, user: req.user
		});
		
	}else{
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
});

// catch --Partner --add from---
router.post('/add', function(req,res){
	var bossName = req.user.name;
	var count = req.user.partners.length;
	var partnerInfo = {
		id: count + 1,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		type: req.body.type,
		email: req.body.email,
		created: postTime.dateNow() + " " + postTime.timeNow()
	};
	User.addPartner(bossName, partnerInfo, function(err,info) {
		if(err) throw err;
		console.log(bossName + ' add partner: '+ info);
	});
	res.redirect('/partners');
});
module.exports = router;