import 'babel-polyfill';
import request from 'supertest';
import { User } from '../../../models/user';
import { app } from '../../../index';

describe('auth middleware', () => {
	let token;

	const exec = () => {
		return request(app)
			.post('/api/categories')
			.set('x-auth-token', token) //whaever is passed will be converted to string
			.send({ name: 'category1' });
	};

	beforeEach(() => {
		token = new User().generateAuthToken();
	});
	it('should return 401 if token is not provided', async () => {
		token = '';
		const res = await exec();
		expect(res.status).toBe(401);
	});

	it('should return 400 if token is invalid', async () => {
		token = '1';
		const res = await exec();
		expect(res.status).toBe(400);
	});

	it('should return 200 if token is valid', async () => {
		const res = await exec();
		expect(res.status).toBe(200);
	});
});
