import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
// import config from 'config';
import dotenv from 'dotenv';
dotenv.config();

//creating user schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 200
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 8,
		maxlength: 100
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 100
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

const jwtKey = process.env.jwtPrivateKey;

//token generation method
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, jwtKey);
	return token;
};

//creating user model
const User = mongoose.model('User', userSchema);

//Joi validation for user schema
function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(200)
			.required(),
		email: Joi.string()
			.min(8)
			.max(100)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.max(100)
			.required(),
		isAdmin: Joi.boolean()
	};

	return Joi.validate(user, schema);
}

export { User, validateUser };
