$(document).ready(function(){

	//var baseUrl = 'https://intense-brook-61641.herokuapp.com/';
	var baseUrl = 'http://localhost:3000';

	$('.register-btn').click(function(event) {
		$.post(baseUrl + '/register', function(data) {
			$('body').html(data);
		});
	});

	$('.login-btn').click(function(event) {
		$.get('/login', function(data) {
			/*optional stuff to do after success */
		});
	});

});