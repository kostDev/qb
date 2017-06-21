$(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
var count = 0;
	// Add worker method 
	$('a#tool').click(function () {
		if(count == 0){
			$('.workbuttonsl').css('display','block');
			$('.nthinfo').css('display','none');
			count++;
		}else{
			$('.workbuttonsl').css('display','none');
			$('.nthinfo').css('display','block');
			count = 0;
		}
	});
});