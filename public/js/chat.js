$(document).ready(function(){

	//var baseUrl = 'https://intense-brook-61641.herokuapp.com/';
	var baseUrl = 'http://localhost:3000';

	var current_user_id = 1;

	$.get(baseUrl + "/messages", function(data) {
		for (i = 0; i < data.length; i++) {

			var id = data[i].sender._id;
			var img = 'images/' + data[i].sender.image;
			var name = data[i].sender.name;
			var content = data[i].content;

			var chatString = '';

			if(id == current_user_id) {
				chatString = '' +
					'<div class="chat-right">' +
						'<img class="user-image" src="' + img2 + '" alt="' + name2 + '">' +
						'<div class="chat-message">' + msg2 + '</div>' +
					'</div>' +
					'<div class="clearfix"></div>';
			} else {
				chatString = '' +
					'<div class="chat-left">' +
						'<img class="user-image" src="' + img + '" alt="' + name + '">' +
						'<div class="chat-message">' + content + '</div>' +
					'</div>' +
					'<div class="clearfix"></div>';
			}


		    $('.chat').append(chatString);
		    $('.chat').animate({scrollTop: $(document).height()}, 0);
		};
	});

});