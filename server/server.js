const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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
	console.log('New user connected')
	socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
});