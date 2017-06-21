var express = require('express');
var router = express.Router();

var postTime = require('../modules/time');
var User = require('../modules/user');
//workspace = > '/workspace'
router.get('/', function(req, res){
	if(req.isAuthenticated()){
		//console.log("boss: " + req.user);
		res.render('workspace',{
		title:'Workspace',
		name: req.user.name,
		company: req.user.company,
		type: req.user.typeap,
		show: false,
		workers: req.user.workers,
		events: req.user.events,
		countEvents: req.user.events.length,
		countWorkers: req.user.workers.length
		});
		
	}else{
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
});
// catch --WorkBook --add from---
router.post('/addworker', function(req,res){
	var worker = {
		name: req.body.name,
		address: req.body.address,
		phone1: req.body.phone1,
		phone2: req.body.phone2,
		email: req.body.email,
		created: postTime.dateNow() + " " + postTime.timeNow()
	};
	//console.log("boss: " + req.user.name);
	//console.log("his worker: " + worker);
	var boss = req.user.name;
	User.pushWorkerInDB(boss, worker, function (err,info) {
		if(err) throw err;
		//console.log('info: '+ info);
		console.log(req.user.name+' add worker: '+worker.name);
	});

	res.redirect('/workspace');
});

// catch --WorkBook --edit from---
router.post('/editworker', function(req,res){
	var countField = 0;
	var bossName = req.user.name;
	var workerName = req.body.name;
	var newInfoWorker = {};
	var getWorker = {
		name: req.body.newname, // use to change!
		address: req.body.address,
		phone1: req.body.phone1,
		phone2: req.body.phone2,
		email: req.body.email,
		editTime: postTime.dateNow() + " " + postTime.timeNow()
	};
	for (var field in getWorker){
		if(getWorker[field]){
			newInfoWorker[field] = getWorker[field];
			countField++;
		}
	}
	if(countField > 1){
		User.editWorker(bossName, workerName, newInfoWorker,function(err, info) {
			if(err) throw err;

			console.log(req.user.name+' edit worker: '+workerName);
		});

		//console.log(newInfoWorker);
	}else{
		console.log('nothing');
	}

	//console.log("boss: " + req.user.name);
	//console.log("his worker: " + worker);

	res.redirect('/workspace');
});

// delete worker - WorkBook
router.post('/deleteworker', function(req,res){
	var worker = req.body.name;
	var boss = req.user.name;
	User.deleteWorker(boss, worker, function (err,info) {
		if(err) throw err;
		//console.log('info: '+ info);
		console.log(req.user.name+' delete worker: '+worker);
	});

	res.redirect('/workspace');
});

// add event - Event
router.post('/addevent', function(req,res) {
	var id = req.body.id;
	var boss = req.user.name;
	var event = {
		id: req.body.id,
		name: req.body.name,
		info: req.body.info,
		date: req.body.date,
		type: req.body.type
	};
	User.findIdEvent(boss, id, function(err, count) {
		if(count === 0){
			User.addEvent(boss, event, function(err, info) {
				if(err) throw err;
				console.log(boss +' add Event: '+ event.id);
			});
		}
	});
	res.redirect('/workspace');
});
//edit event - Event
router.post('/editevent', function(req, res) {
	var idEvent = req.body.id;
	var boss = req.user.name;
	var setEditInfo = {};
	var editInfoEvent = {
		id: req.body.newid,
		name: req.body.name,
		info: req.body.info,
		date: req.body.date,
		type: req.body.type
	}
	for(var field in editInfoEvent){
		if(editInfoEvent[field]){
			setEditInfo[field] = editInfoEvent[field];
		}
	}

	User.findIdEvent(boss, idEvent, function(err, count) {
		if(count === 1){
			User.editEvent(boss,idEvent, setEditInfo, function(err, info) {
				if(err) throw err;
				if(info) console.log(boss +' edit id: '+idEvent);
			});
		}
	});
	res.redirect('/workspace');
});
//delete event - Event
router.post('/deleteevent',function(req,res) {
	var idEvent = req.body.id;
	var boss = req.user.name;
	User.findIdEvent(boss, idEvent, function(err, count) {
		if(err) throw err;
		if(count === 1){
			User.deleteEvent(boss, idEvent, function(err, info) {
				if(err) throw err;
				console.log(boss +" delete event id: "+ idEvent);
			});
		}
	});
	res.redirect('/workspace');
});

module.exports = router;