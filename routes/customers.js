import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import { Customer, validateCustomer as validate } from "../models/customer";

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer(
    _.pick(req.body, ["name", "email", "password", "phone"])
  );

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);

  await customer.save();

  res.send(_.pick(customer, ["_id", "name", "email", "phone"]));
  // res.send(customer);
});

export { router };
