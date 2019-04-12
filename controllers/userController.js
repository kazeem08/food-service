import { User, validateUser as validate } from "../models/user";
import _ from "lodash";
import bcrypt from "bcrypt";

const routeController = {};

routeController.get = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

routeController.getbyId = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

routeController.post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ["name", "email", "phone", "isAdmin"]));
};

export { routeController as controller };
