import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });

  await customer.save();
  res.send(customer);
});

export {};
