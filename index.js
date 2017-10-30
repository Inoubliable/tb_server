var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

var mongodb = require('mongodb');
var uri = 'mongodb://tim:timtim@ds125774.mlab.com:25774/timbook';

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.use(express.static(__dirname+'/public'));

app.post('/register', (req, res) => {
	var name = parseFloat(req.body.name);
	var surname = parseFloat(req.body.surname);
	var email = parseFloat(req.body.email);

	mongodb.MongoClient.connect(uri, function(err, db) {
		var users = db.collection('users');

		users.findOne({email: email}, function(err, user) {

			if(user == null) {
				res.redirect('/login');
			} else {
				res.json({'message': 'E-mail already exists!'});
			}

			db.close();
		});
	});

});

app.get('/login', (req, res) => {

	res.sendFile(path.join(__dirname+'/public/login.html'));

});

app.get('/messages', (req, res) => {

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
				surname: 'Wayne',
				image: 'bald.jpg'
			},
			{
				name: 'Jason',
				surname: 'Mitchell',
				image: 'japanese.jpg'
			},
			{
				name: 'Vane',
				surname: 'Vane',
				image: 'Donald-Trump.jpg'
			},
			{
				name: 'Patrick',
				surname: 'Morison',
				image: 'joeblack.jpg'
			}
		];

		users.insert(userData, function(err, insertedUsers) {

			var insertedUsersData = insertedUsers.ops;

			var chats = db.collection('chats');
			var chatData = [
				{
					name: 'My chat',
					participants: [
						{
							id: insertedUserId1,
							name: insertedUserName1
						},
						{
							id: insertedUserId2,
							name: insertedUserName2
						}
					]
				}
			];

			chats.insert(chatData, function(err, insertedChat) {

				var insertedChatId1 = insertedChat.insertedIds[0];

				var messages = db.collection('messages');
				var messageData = [
					{
						chat_id: insertedChatId1,
						sender: {
							id: insertedUserId1,
							name: insertedUserName1,
							image: insertedUserImage1
						},
						content: "Hello there :)"
					},
					{
						chat_id: insertedChatId1,
						sender: {
							id: insertedUserId2,
							name: insertedUserName2,
							image: insertedUserImage2
						},
						content: "Ummmm, do I know you?"
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