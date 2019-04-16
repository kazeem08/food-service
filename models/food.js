import mongoose from 'mongoose';
import Joi from 'joi';
import { categorySchema } from './category';

//craeting food schema
const foodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 200
	},
	category: {
		type: categorySchema,
		required: true
	},
	description: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 200
	},
	price: {
		type: Number,
		required: true,
		min: 10,
		max: 100
	}
});

//creating Food model
const Food = mongoose.model('Food', foodSchema);

//Joi validation for food schema
function validateFood(food) {
	const schema = {
		name: Joi.string()
			.min(2)
			.max(200)
			.required(),
		categoryId: Joi.objectId().required(),
		description: Joi.string()
			.min(10)
			.max(200),
		price: Joi.number()
			.min(10)
			.max(100)
			.required()
	};

	return Joi.validate(food, schema);
}

export { Food, validateFood, foodSchema };
