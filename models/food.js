import mongoose from "mongoose";
import { categorySchema } from "./category";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
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

const Food = mongoose.modell("Food", foodSchema);
