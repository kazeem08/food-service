import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

export { User };
