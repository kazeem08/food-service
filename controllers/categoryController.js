import { Category, validateCategory as validate } from '../models/category';
import _ from 'lodash';

const routeController = {};

//route for getting all categories
routeController.get = async (req, res) => {
	const categories = await Category.find().or([
		{ name: 'Fruits' },
		{ name: 'category1' }
	]);
	res.send(categories);
};

//route for getting category by ID
routeController.getById = async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (!category)
		return res
			.status(404)
			.send('The category with the given ID was not found.');
	res.send(category);
};

//route for creating category
routeController.post = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const category = new Category({
		name: req.body.name
	});

	await category.save();
	res.send(category);
};

//controller for updating category
routeController.put = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const category = await Category.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	if (!category)
		return res
			.status(404)
			.send('The category with the given ID was not found.');

	res.send(category);
};

//controller for deleting category
routeController.delete = async (req, res) => {
	const category = await Category.findByIdAndRemove(req.params.id);

	if (!category)
		return res
			.status(404)
			.send('The category with the given ID was not found.');

	res.send(category);
};

export { routeController };
