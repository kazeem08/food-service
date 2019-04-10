import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  }
});

const Category = mongoose.model("Category", categorySchema);

export { categorySchema };
