import { Food, validateFood as validate } from '../models/food';
import { Category } from '../models/category';
import _ from 'lodash';
import bcrypt from 'bcrypt';

const routeController = {};

//controller to get food by Id
routeController.getById = async (req, res) => {
	const food = await Food.findById(req.params.id);
	res.send(food);
};

//controller to Get all foods
routeController.get = async (req, res) => {
	const foods = await Food.find().sort('name');
	res.send(foods);
};

//controller to create food
routeController.post = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const category = await Category.findById(req.body.categoryId);
	if (!category) return res.status(400).send('Invalid Category');

	const food = new Food({
		name: req.body.name,
		category: {
			_id: category._id,
			name: category.name
		},
		description: req.body.description,
		price: req.body.price
	});

	await food.save();
	res.send(food);
};

//controller to update food
routeController.put = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const category = await Category.findById(req.body.categoryId);
	if (!category) return res.status(400).send('Invalid Category');

	const food = await Food.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			category: {
				_id: category._id
			},
			description: req.body.description,
			price: req.body.price
		},
		{ new: true }
	);

	res.send(food);
};

//controller to delete food
routeController.delete = async (req, res) => {
	const food = await Food.findByIdAndRemove(req.params.id);
	if (!food)
		return res.status(404).send('The food with the given ID was not found.');
	res.send(food);
};

export { routeController };
