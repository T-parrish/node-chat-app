const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

console.log(__dirname + '../publc');
console.log(publicPath);

var app = express();

// same method called behind the scenes by express
// var server = http.createServer((req, res) => {})
var server = http.createServer(app);
var io = socketIO(server);



// registers event listener -> this one is for a new connection
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Thunderdome'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A challenger appears'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		// io.emit emits something to all open connections
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('this is from the server');
		// // sends to everbody except the current socket (themself)
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt : new Date().getTime()
		// });
	});


	socket.on('disconnect', () => {
    	console.log('User disconnected');
  });
});



app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
});