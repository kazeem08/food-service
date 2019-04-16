import mongoose from 'mongoose';
import Joi from 'joi';

//creating category schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

//creating category model
const Category = mongoose.model('Category', categorySchema);

//Joi validation for the schema properties
function validateCategory(category) {
	const schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required()
	};

	return Joi.validate(category, schema);
}

export { Category, categorySchema, validateCategory };
