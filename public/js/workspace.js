$(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
	var countAddWorker = 0; // WorkBook -- add
	var countEditWorker = 0;// WorkBook -- edit
	var countDeleteWorker = 0; // WorkBook -- delete

	var countAddEvent = 0;
	var countEditEvent = 0;
	var countDeleteEvent = 0;
	// Add worker method 
	$('a#addwrk').click(function () {
		if(countAddWorker == 0){
			$('#borderworker').css('display','none');
			$('#addworker').css('display','block');
			countAddWorker++;
		}else{
			$('#borderworker').css('display','block');
			$('#addworker').css('display','none');
			countAddWorker = 0;
		}
	});
	// edit worker method
	$('a#editwrk').click(function() {
		if(countEditWorker== 0){
			$('#borderworker').css('display','none');
			$('#editworker').css('display','block');
			countEditWorker++;
		}else{
			$('#borderworker').css('display','block');
			$('#editworker').css('display','none');
			countEditWorker = 0;
		}		
	});
	// delete worker method
	$('a#deletewrk').click(function() {
		if(countDeleteWorker== 0){
			$('#borderworker').css('display','none');
			$('#deleteworker').css('display','block');
			countDeleteWorker++;
		}else{
			$('#borderworker').css('display','block');
			$('#deleteworker').css('display','none');
			countDeleteWorker = 0;
		}
	});

	// add event method
	$('a#addev').click(function() {
		if(countAddEvent == 0){
			$('#borderevent').css('display','none');
			$('#addevent').css('display','block');
			countAddEvent++;
		}else{
			$('#borderevent').css('display','block');
			$('#addevent').css('display','none');
			countAddEvent = 0;
		}
	});
	//edit event method 
	$('a#editev').click(function() {
		if(countEditEvent == 0){
			$('#borderevent').css('display','none');
			$('#editevent').css('display','block');
			countEditEvent++;
		}else{
			$('#borderevent').css('display','block');
			$('#editevent').css('display','none');
			countEditEvent = 0;
		}
	});

	// delete event method 
	$('a#delev').click(function() {
		if(countDeleteEvent== 0){
			$('#borderevent').css('display','none');
			$('#deleteevent').css('display','block');
			countDeleteEvent++;
		}else{
			$('#borderevent').css('display','block');
			$('#deleteevent').css('display','none');
			countDeleteEvent = 0;
		}
	});
});
document.getElementById("wrklist").onclick = function() {isEmail()};
function isEmail() {
	var info = 'Press List';
	alert(info);
}


