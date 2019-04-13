import { Order, validateOrder as validate } from "../models/order";
import { Food } from "../models/food";
import { Customer } from "../models/customer";

const routeController = {};

routeController.get = async (req, res) => {
  const order = await Order.find().sort("name");
  res.send(order);
};

routeController.getMyOrder = async (req, res) => {
  const orders = await Order.find({ "customer._id": req.user._id });
  res.send(orders);
};

routeController.getById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.send(order);
};

routeController.getOrders = async (req, res) => {
  const orders = await Order.find({ "customer._id": req.params.id });
  res.send(orders);
};

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
