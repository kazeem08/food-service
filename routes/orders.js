import express from "express";
import { Order, validateOrder as validate } from "../models/order";

const router = express.Router();

router.get("/", async (req, res) => {
  const order = await Order.find().sort("name");
  res.send(order);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.send(order);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = {
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    food: {
      _id: food._id
    },
    quantity: req.params.quantity
  };

  order.save();
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Order.findByIdAndUpdate(req.params.id, {
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    food: {
      _id: food._id
    },
    quantity: req.params.quantity,
    status: req.params.status
  });

  res.send(order);
});

export { router };
