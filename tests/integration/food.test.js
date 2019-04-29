import 'babel-polyfill';
import request from 'supertest';
import { app } from '../../index';
import { Food } from '../../models/food';
import 'express-async-errors';

describe('/api/foods', () => {
	afterAll(() => {
		app.close();
	});
	describe('GET', () => {
		it('should get all foods', async () => {
			const res = await request(app).get('/api/foods');
			expect(res.status).toBe(200);
		});
	});
});
