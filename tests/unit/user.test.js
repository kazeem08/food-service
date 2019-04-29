import { User } from '../../models/user';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
// import config from "config";
import dotenv from 'dotenv';
dotenv.config();

describe('JWT ', () => {
	it('should generate a valid token', () => {
		const payload = {
			_id: mongoose.Types.ObjectId().toHexString(),
			isAdmin: true
		};
		const user = new User(payload);
		const token = user.generateAuthToken();
		const decoded = jwt.verify(token, process.env.jwtPrivateKey);
		expect(decoded).toMatchObject(payload);
	});
});
