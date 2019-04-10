import express from "express";
import { User, validateUser } from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.email,
    isAdmin: req.body.isAdmin
  });

  await user.save();

  res.send(user);
});

export { router };
