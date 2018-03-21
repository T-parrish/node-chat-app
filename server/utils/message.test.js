const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message')

describe('generate a new message', () => {
	it('should generate the correct message object', () => {
		var message = generateMessage({from:'jimmy',text:'so tired'})
		expect(message.from === 'jimmy')
		expect(message.text === 'so tired')
		expect(typeof message.createdAt).toBeTruthy()
	});
});

describe('generate location message', () => {
	it ('should generate correct location object', () => {
		var message = generateLocationMessage({
			from: 'Admin',
			latitude: '35.603549199999996',
			longitude: '139.7074624'
		});

		expect(message.from === 'Admin')
		expect(message.url === 'https://www.google.com/maps?q=35.603549199999996,139.7074624')
		expect(message.createdAt).toBeTruthy()
	});
});