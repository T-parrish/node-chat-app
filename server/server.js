const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '../publc');
console.log(publicPath);

var app = express();

// same method called behind the scenes by express
// var server = http.createServer((req, res) => {})
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();



// registers event listener -> this one is for a new connection
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Thunderdome'));

	// socket.broadcast.emit('newMessage', generateMessage('Admin', 'A challenger appears'));

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required.');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		// console.log(users)

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has entered`));

		callback();
	});

	socket.on('createMessage', (message, callback) => {
		// console.log('createMessage', message);
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			// io.emit emits something to all open connections

			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

		}
		// io.emit emits something to all open connections
		callback('this is from the server');
		// // sends to everbody except the current socket (themself)
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt : new Date().getTime()
		// });
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}

	});


	socket.on('disconnect', () => {
    	console.log('User disconnected');
    	var user = users.removeUser(socket.id);

    	if (user) {
    		io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    		io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    	}

  });
});



app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
});