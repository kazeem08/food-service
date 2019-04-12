import { Customer, validateCustomer as validate } from "../models/customer";
import _ from "lodash";
import bcrypt from "bcrypt";

const customerController = {};

customerController.get = async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
};

customerController.post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("Customer already registered");

  customer = new Customer(
    _.pick(req.body, ["name", "email", "password", "phone"])
  );

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);

  await customer.save();

  res.send(_.pick(customer, ["_id", "name", "email", "phone"]));
};

export { customerController };
