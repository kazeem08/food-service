import { Order, validateOrder as validate } from '../models/order';
import { Food } from '../models/food';
import { Customer } from '../models/customer';

const routeController = {};

//controller get all  orders
routeController.get = async (req, res) => {
	const orders = await Order.find().sort('name');
	res.send(orders);
};

//controller for custonme to view his order(s)
routeController.getMyOrder = async (req, res) => {
	const orders = await Order.find({ 'customer._id': req.user._id });
	res.send(orders);
};

//controller to get order by Id
routeController.getById = async (req, res) => {
	const order = await Order.findById(req.params.id);
	res.send(order);
};

//controller to get orders of a custonmer
routeController.getOrders = async (req, res) => {
	const orders = await Order.find({ 'customer._id': req.params.id });
	res.send(orders);
};

//controller to Create Order
routeController.post = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);

	const foodCollection = [];

	for (let foodItem of req.body.food) {
		const food = await Food.findById(foodItem.id);
		foodCollection.push({
			_id: food._id,
			name: food.name,
			price: food.price,
			quantity: foodItem.quantity
		});
	}

	const order = new Order({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		food: foodCollection
	});

	await order.save();
	res.send(order);
};

//controller to Update order status
routeController.put = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);

	const foodCollection = [];

	for (let foodItem of req.body.food) {
		const food = await Food.findById(foodItem.id);
		foodCollection.push({
			_id: food._id,
			name: food.name,
			quantity: foodItem.quantity
		});
	}

	const order = await Order.findByIdAndUpdate(
		req.params.id,
		{
			customer: {
				_id: customer._id,
				name: customer.name,
				phone: customer.phone
			},
			food: foodCollection,
			status: req.body.status
		},
		{ new: true }
	);

	res.send(order);
};

export { routeController };
