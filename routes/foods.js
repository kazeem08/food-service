import express from "express";
import { Food, validateFood as validate } from "../models/food";
import { Category } from "../models/category";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";

const router = express.Router();

//route to geta particular food
router.get("/:id", (req, res) => {
  const food = Food.findById(req.params.id);
  res.find(food);
});

//route to get all foods
router.get("/", async (req, res) => {
  const foods = await Food.find().sort("name");
  res.send(foods);
});

//route to create a food
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid Category");

  const food = new Food({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name
    },
    description: req.body.description,
    price: req.body.price
  });

  await food.save();
  res.send(food);
});

//route to update a food
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const food = await Food.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: {
        _id: category._id
      },
      description: req.body.description,
      price: req.body.price
    },
    { new: true }
  );

  res.send(food);
});

//route to delete a food
router.delete("/:id", [auth, admin], async (req, res) => {
  const food = await Food.findByIdAndRemove(req.params.id);
  if (!food)
    return res.status(404).send("The food with the given ID was not found.");
  res.send(food);
});

export { router };
