var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



//User Schema
var UserSchema = mongoose.Schema({
	company:{
		type: String,
		index:true
	},
	name:{
		type: String
	},
	country:{
		type: String
	},
	email:{
		type: String
	},
	password:{
		type: String
	},
	typeap:{
		type: String
	},
	workers: [],
	events: [],
	partners:[]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function (username, callback) {
	var query = {email: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback ){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
//check email
module.exports.checkWorkerEmail = function (bossName, workerEmail, callback) {
	var findWorkerEmail = {
		name: bossName,
		'workers.email': workerEmail
	};
	User.find(findWorkerEmail).count(callback);
}

// work book - add edit delete
module.exports.pushWorkerInDB = function (bossName, worker, callback) {
	var myWorker = {$push: {'workers':worker}};
	var myBoss = {name: bossName};
	User.update(myBoss, myWorker, callback);
}

module.exports.editWorker = function (bossName, workerName, newWorkerInfo, callback) {
	var editInfo = {};
	var searchInfoUser = {
		'name':bossName,
		'workers.name':workerName
	};
	//make object to work for 'workers.name' -> 'workers.$.'
	for (var field in newWorkerInfo) {
		editInfo['workers.$.'+field] = newWorkerInfo[field];
	}
	// send this info - for change older info
	var setEditInfo = {
		$set:editInfo
	}
	User.update(searchInfoUser, setEditInfo, callback);
}

module.exports.deleteWorker = function(boss, workerName, callback) {
	var nboss = {name: boss};
	var delworker = {$pull:{'workers':{'name':workerName}}};
	User.update(nboss,delworker,callback);
}
// ------------------------

module.exports.addEvent = function(boss, event, callback) {
	var Boss = {name:boss};
	var setEvent = {$push:{'events':event}};
	User.update(Boss, setEvent, callback);
}

module.exports.editEvent = function(boss, eventId, editEventInfo, callback) {
	var findUserEvent = {name:boss, 'events.id':eventId};
	var editInfo = {};
	for (var field in editEventInfo){
		editInfo['events.$.'+field] = editEventInfo[field];
	}
	var setEditInfo = {
		$set:editInfo
	};
	User.update(findUserEvent, setEditInfo, callback);
}

module.exports.findIdEvent = function(boss,idEvent,callback) {
	var findByIdEvent = {name:boss, 'events.id':idEvent};
	User.find(findByIdEvent).count(callback);
}

module.exports.deleteEvent = function(boss, idEvent, callback ) {
	var Boss = {name:boss};
	var delEvent = {$pull:{'events':{'id':idEvent}}};
	User.update(Boss, delEvent, callback);
}
// Partners

module.exports.addPartner = function(bossName, partner,callback) {
	var boss = {name: bossName};
	var setPartner = {$push:{'partners':partner}};
	User.update(boss, setPartner, callback);
}

module.exports.deletePartner = function(boss, partnerEmail, callback ) {
	var Boss = {name:boss};
	var delPartner = {$pull:{'partners':{'email':partnerEmail}}};
	User.update(Boss, delPartner, callback);
}
// --- profile & config 
module.exports.addPasswordToWorker = function (bossName, workerEmail,workerPassword, callback) {
	var findBossAndWorker = {
		name: bossName,
		'workers.email': workerEmail
	};
	var setWorkerPassword = {$set:{'workers.$.password':workerPassword}};
	User.update(findBossAndWorker, setWorkerPassword, callback);
}