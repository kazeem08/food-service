import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";

import { Customer } from "../models/customer";
import { User } from "../models/user";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(400).send("Invalid email/password");

  const password = bcrypt.compare(req.body.password, customer.password);
  if (!password) return res.status(400).send("Invalid email/password");

  const token = customer.generateAuthToken();
  res.send(token);
});

router.post("/staff", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email/password");

  const password = bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("Invalid email/password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
}

export { router };
