import 'babel-polyfill';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../index';
import { Category } from '../../models/category';
import { User } from '../../models/user';

describe('/api/category', () => {
	afterEach(async () => {
		await Category.remove({});
	});

	describe('GET', () => {
		it('should get all food categories', async () => {
			await Category.collection.insertMany([
				{ name: 'fruits' },
				{ name: 'protein' }
			]);
			const res = await request(app).get('/api/categories');
			expect(res.status).toBe(200);
			expect(res.body.some(g => g.name === 'fruits')).toBeTruthy();
			expect(res.body.some(g => g.name === 'protein')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('should return 404 if no category is found', async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(app).get('/api/categories/' + id);
			expect(res.status).toBe(404);
		});
		it('should return a category if a valid id is passed ', async () => {
			const category = new Category({
				name: 'swallow'
			});

			await category.save();
			const res = await request(app).get('/api/categories/' + category._id);
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name', category.name);
		});

		it('should return error if id is invalid', async () => {
			const res = await request(app).get('/api/categories/1');
			expect(res.status).toBe(404);
			// expect(res.body).toHaveProperty("name", category.name);
		});
	});

	describe('POST', () => {
		let token;
		let name;

		const exec = async () => {
			return await request(app)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send({ name });
		};
		afterEach(async () => {
			await Category.remove({});
		});
		beforeEach(async () => {
			token = new User().generateAuthToken();
			name = 'category1';
		});

		it('should return 401  if user is not logged in', async () => {
			token = '';
			const res = await exec();
			expect(res.status).toBe(401);
		});

		it('should return 400 if category is less than 5 characters', async () => {
			name = '1234';
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if category is more than 50 characters', async () => {
			name = new Array(52).join('a');
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should save the category if is valid', async () => {
			await exec();

			const category = await Category.find({ name: 'category1' });
			expect(category).not.toBeNull();
		});

		it('should have the  property in the response if is valid', async () => {
			const res = await exec();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('name', 'category1');
		});
	});

	describe('PUT /:id', () => {
		let token;
		let newName;
		let id;

		const exec = async () => {
			return await request(app)
				.put('/api/categories/' + id)
				.set('x-auth-token', token)
				.send({ name: newName });
		};
		afterEach(async () => {
			await Category.remove({});
			id = mongoose.Types.ObjectId();
		});

		beforeEach(() => {
			token = new User({ isAdmin: true }).generateAuthToken();
		});

		it('should return 404 if invalid Id is passed', async () => {
			id = 1;
			const res = await exec();
			expect(res.status).toBe(404);
		});

		it('should return 401 if user is not logged in', async () => {
			token = '';
			const res = await exec();
			expect(res.status).toBe(401);
		});

		it('should return 400 if category is less than 5 characters', async () => {
			token = '1234';
			const res = await exec();

			expect(res.status).toBe(400);
		});

		it('should return 400 if category is more than 50 characters', async () => {
			newName = new Array(52).join('a');
			const res = await exec();

			expect(res.status).toBe(400);
		});
	});
});
