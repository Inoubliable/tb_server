var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

var mongodb = require('mongodb');
var uri = 'mongodb://tim:timtim@ds125774.mlab.com:25774/timbook';

app.get('/chat', (req, res) => {

	mongodb.MongoClient.connect(uri, function(err, db) {
		var messages = db.collection('messages');

		messages.find().toArray(function(err, allMessages) {
			res.json(allMessages);
			db.close();
		});
	});

});

app.get('/seedData', (req, res) => {

	mongodb.MongoClient.connect(uri, function(err, db) {

		var users = db.collection('users');
		var userData = [
			{
				name: 'Alex',
				surname: 'Wayne'
			},
			{
				name: 'Jason',
				surname: 'Mitchell'
			}
		];

		users.insert(userData, function(err, insertedUser) {

			var insertedUserId1 = insertedUser.insertedIds[0];
			var insertedUserId2 = insertedUser.insertedIds[1];

			var chats = db.collection('chats');
			var chatData = [
				{
					name: 'My chat',
					participant_ids: [insertedUserId1, insertedUserId2]
				}
			];

			chats.insert(chatData, function(err, insertedChat) {

				var insertedChatId1 = insertedChat.insertedIds[0];

				var messages = db.collection('messages');
				var messageData = [
					{
						chat_id: insertedChatId1,
						sender_id: insertedUserId1,
						content: "Hello there :)"
					}
				];

				messages.insert(messageData, function(err, result) {});

			});

		});

	});

});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
	console.log('I am up on 3000');
});