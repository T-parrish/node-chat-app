const expect = require('expect');

const {generateMessage} = require('./message')

describe('generate a new message', () => {
	it('should generate the correct message object', () => {
		var message = generateMessage({from:'jimmy',text:'so tired'})
		expect(message.from === 'jimmy')
		expect(message.text === 'so tired')
		expect(typeof message.createdAt).toBe('number')
	});
});