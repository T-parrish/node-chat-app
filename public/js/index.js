var socket = io();

socket.on('connect', function () {
	console.log('Connected to server')
});

socket.on('disconnect', function () {
	console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a')
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	
	// var formattedTime = moment(message.createdAt).format('h:mm a')
	// var li = $('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`)

	// $('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Jimmy',
// 	text: 'Hello!'
// }, function (data) {
// 	console.log('from server: ', data);
// });

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a')
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		createdAt: formattedTime,
		from: message.from,
		url: message.url
	});
	// var li = $('<li></li>');
	// var a = $('<a target="_blank"> My Current Location </a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	$('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
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

var locationButton = $('#send-location')

locationButton.on('click', function () {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
		console.log(position);
	}, function() {
		locationButton.removeAttr('disabled');
		alert('Unable to fetch location');
	})
});


