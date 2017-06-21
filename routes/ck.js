var name = 'Kostya Godson Nigga'

var ul = function(oldName) {
	var newName = '';
	for (var n = 0; n < oldName.length;n++){
		if(oldName[n] === ' '){
			newName +='_';
		}else{
			newName +=oldName[n];
			}
	}
	return newName;
}
console.log(ul(name,nName));