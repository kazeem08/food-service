import mongoose from 'mongoose';
import Joi from 'joi';

//Creating customize schema
const foodSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 200
	},
	price: {
		type: Number,
		required: true,
		min: 10
	},
	quantity: {
		type: Number,
		required: true,
		min: 1
	}
});

//creating order schema
const orderSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: { type: String, required: true, minlength: 6, maxlength: 80 },
			phone: {
				type: String,
				required: true,
				min: 5,
				max: 20
			}
		})
	},
	food: {
		type: [foodSchema]
	},

	status: {
		type: String,
		default: 'Pending'
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	}
});

//Ctraeting order model
const Order = mongoose.model('Order', orderSchema);

//Joi validation for validating order schema
function validateOrder(order) {
	const schema = {
		customerId: Joi.objectId().required(),
		food: Joi.array().required(),
		status: Joi.string()
	};
	return Joi.validate(order, schema);
}

export { Order, validateOrder };
