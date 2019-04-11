import express from "express";
import bcrypt from "bcrypt";

import { Customer } from "../models/customer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.email);
  if (!customer) return res.status(400).send("Invalid email/password");

  const password = bcrypt.compare(req.body.password, customer.password);
  if (!password) return res.status(400).send("Invalid email/password");
});
