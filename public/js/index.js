var socket = io();

socket.on('connect', function () {
	console.log('Connected to server')
});

socket.on('disconnect', function () {
	console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
	console.log('new message', message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`)

	$('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Jimmy',
// 	text: 'Hello!'
// }, function (data) {
// 	console.log('from server: ', data);
// });

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		// grabs data value from input with name = message
		text: $('input[name=message]').val()
	}, function(data) {
		console.log('message received', data)
	});

	$('input[name=message]').val("")
});