import mongoose from "mongoose";
import { categorySchema } from "./category";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200
  },
  category: {
    type: categorySchema,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  }
});

const Food = mongoose.model("Food", foodSchema);

function validateFood(food) {
  const schema = {
    name: Joi.string()
      .min(4)
      .max(200)
      .required(),
    categoryId: Joi.string().required(),
    description: Joi.string()
      .min(10)
      .max(200),
    price: Joi.Number()
      .min(10)
      .max(100)
  };
  return Joi.validate(food, schema);
}

export { Food, validateFood };
