import express from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
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
