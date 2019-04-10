import mongoose from "mongoose";

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
