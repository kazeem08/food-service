import { Category, validateCategory as validate } from "../models/category";
import _ from "lodash";
import bcrypt from "bcrypt";

const routeController = {};

routeController.get = async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
};

routeController.post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name
  });

  await category.save();
  res.send(category);
};

routeController.put = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
};

routeController.delete = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
};

export { routeController };
