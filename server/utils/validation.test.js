const expect = require('expect');
const {isRealString} = require('./validation')

// import isRealString

describe('Tests to see if inputs are real strings', () => {
	it('should reject non-string values', () => {
		var testStrings = isRealString(1234)
		expect(testStrings).toBe(false)
	});
	
	it('should reject string with only spaces', () => {
		var testStrings = isRealString('    ')
		expect(testStrings).toBe(false)
	});

	it('should allow strings with non-space characters', () => {
		var testStrings = isRealString(' LOTR   ')
		expect(testStrings).toBe(true)
	});

});