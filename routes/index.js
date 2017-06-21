var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', function (req, res) {
	if(req.isAuthenticated()){
		res.redirect('/workspace');
	}else{
		res.render('index', {
		title: 'Home',
		show: true
		});
	}

});

module.exports = router;