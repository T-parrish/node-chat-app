var socket = io();

socket.on('connect', function () {
	console.log('Connected to server')

	socket.emit('createMessage', {
		from: 'Taylor',
		text: 'cool beans'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
	console.log('new message', message);
});