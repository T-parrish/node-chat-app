const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Taylor',
			room: 'drum and bass'
		}, {
			id: '2',
			name: 'Jimmy',
			room: 'drum and bass'
		}, {
			id: '3',
			name: 'Lemmiwinks',
			room: 'Southpark'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Taylor',
			room: 'Drum and bass'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toMatchObject([user])
	});

	it('should return names for drum and bass room', () => {
		var userList = users.getUserList('drum and bass');

		expect(userList).toMatchObject(['Taylor', 'Jimmy']);
	});

	it('should return names for Southpark room', () => {
		var userList = users.getUserList('Southpark');

		expect(userList).toMatchObject(['Lemmiwinks']);
	});

	it('should return names from ID input', () => {
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe('2');
	});

	it('should not find a user', () => {
		var userId = '4';
		var user = users.getUser(userId);

		expect(user).toBe(undefined);
	});

	it('should remove a user', () => {
		var userId = '3';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		var userId = '99';
		var user = users.removeUser(userId);

		expect(user).toBe(undefined);
		expect(users.users.length).toBe(3);
	});
});